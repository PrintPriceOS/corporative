/**
 * scripts/test_partner_onboarding_honesty.mjs
 * 
 * Verificación funcional y de seguridad para el formulario de onboarding de imprentas:
 * 1. Regresión de cabeceras de proxy: rechazo de cabeceras no acreditadas (cf-connecting-ip sin Cloudflare, XFF arbitrario).
 * 2. Validación estándar IPv4/IPv6 (RFC 791 / RFC 4291 vía node:net): rechazo estricto de strings malformadas.
 * 3. Aislamiento estricto de contadores de rate limiting (sin contador global compartido para IP null).
 * 4. Recorrido público real: verificación de que PartnerOnboardingFlow es código sin uso en app/,
 *    con enlaces canónicos directos en /contact/partner y /for-printhouses hacia https://control.printprice.pro/printhouse/register.
 * 5. Si el componente se inspecciona o visita, aviso previo de arquitectura para no obligar a 6 pasos.
 * 6. Garantía de honestidad en actions.ts: nunca devuelve success: true, estado INTEGRATION_PENDING, cero PII en logs.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { 
  isValidIp, 
  resolveTrustedClientIp, 
  isRateLimited, 
  recordSubmissionAttempt, 
  resetRateLimitStore,
  isEmailDomainAllowed,
  auditLeadQuality,
  sanitizeText
} from '../lib/security.ts';

console.log('─────────────────────────────────────────────────────────────────────────────');
console.log('🧪 PPOS TEST SUITE: Proxy Trust, Rate Limiting & Onboarding Honesty');
console.log('─────────────────────────────────────────────────────────────────────────────');

let passedTests = 0;
function pass(label) {
  passedTests++;
  console.log(`  ✓ [TEST ${passedTests}] ${label}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. REGRESIONES DE CONFIANZA DE PROXY Y CABECERAS FALSIFICADAS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[1/5] Verificando confianza de proxy y rechazo de cabeceras falsificadas...');

// Test 1.1: Validación estándar IPv4/IPv6 (node:net RFC parser)
assert.equal(isValidIp('127.0.0.1'), true, 'IPv4 válida');
assert.equal(isValidIp('198.51.100.42'), true, 'IPv4 válida');
assert.equal(isValidIp('2001:db8::1'), true, 'IPv6 válida');
assert.equal(isValidIp('::1'), true, 'IPv6 localhost válida');
// Rechazo de strings malformadas que superaban regex permisivas
assert.equal(isValidIp(':::'), false, 'Triple colon debe rechazarse');
assert.equal(isValidIp('1234::5678::90ab'), false, 'Doble :: en IPv6 debe rechazarse');
assert.equal(isValidIp('256.0.0.1'), false, 'Octeto > 255 debe rechazarse');
assert.equal(isValidIp('1.2.3.4.5'), false, 'Cinco octetos debe rechazarse');
assert.equal(isValidIp('unknown'), false, 'String no numérica debe rechazarse');
assert.equal(isValidIp(''), false, 'String vacía debe rechazarse');
pass('Validación estándar IPv4/IPv6 estricta: rechaza sintaxis malformadas y bypasses');

// Test 1.2: cf-connecting-ip falsificado sin acreditación de Cloudflare es estrictamente ignorado
const unaccreditedCf = { get: (name) => (name === 'cf-connecting-ip' ? '198.51.100.42' : null) };
assert.equal(
  resolveTrustedClientIp(unaccreditedCf, { trustCloudflareProxy: false }), 
  null, 
  'cf-connecting-ip sin acreditación previa debe ignorarse para evitar spoofing'
);
pass('cf-connecting-ip falsificado se ignora cuando Cloudflare no está expresamente acreditado');

// Test 1.3: cf-connecting-ip SÍ se acepta si Cloudflare está acreditado
assert.equal(
  resolveTrustedClientIp(unaccreditedCf, { trustCloudflareProxy: true }), 
  '198.51.100.42', 
  'cf-connecting-ip se acepta solo con acreditación explícita'
);
pass('cf-connecting-ip solo se admite bajo cadena de proxy Cloudflare expresamente acreditada');

// Test 1.4: X-Forwarded-For falsificado por cliente es estrictamente ignorado
const spoofedXff = { get: (name) => (name === 'x-forwarded-for' ? '203.0.113.1, 10.0.0.1' : null) };
assert.equal(
  resolveTrustedClientIp(spoofedXff), 
  null, 
  'X-Forwarded-For no debe usarse como fallback arbitrario sin cadena de proxy verificada'
);
pass('X-Forwarded-For arbitrario no se adopta como fallback inseguro');

// Test 1.5: X-Real-IP del proxy local Nginx/Plesk acreditado es aceptado
const nginxAccredited = { get: (name) => (name === 'x-real-ip' ? '198.51.100.99' : null) };
assert.equal(
  resolveTrustedClientIp(nginxAccredited), 
  '198.51.100.99', 
  'X-Real-IP inyectado por Nginx local se acepta como IP acreditada'
);
pass('X-Real-IP del proxy local se acepta como fuente acreditada');

// Test 1.6: Prioridad de X-Real-IP frente a cf-connecting-ip o XFF no acreditados
const mixedHeaders = {
  get: (name) => {
    if (name === 'cf-connecting-ip') return '1.2.3.4'; // Intento de spoofing
    if (name === 'x-forwarded-for') return '5.6.7.8';  // Intento de spoofing
    if (name === 'x-real-ip') return '198.51.100.99';  // TCP remote_addr fijado por Nginx
    return null;
  }
};
assert.equal(
  resolveTrustedClientIp(mixedHeaders, { trustCloudflareProxy: false }),
  '198.51.100.99',
  'Debe resolver a X-Real-IP legítimo ignorando cabeceras falsificadas del cliente'
);
pass('Aislamiento de cabeceras: X-Real-IP prevalece sobre cabeceras cliente manipuladas');

// ─────────────────────────────────────────────────────────────────────────────
// 2. AISLAMIENTO DEL CONTADOR Y PREVENCIÓN DE BLOQUEO GLOBAL
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[2/5] Verificando aislamiento de contadores de rate limiting...');

// Test 2.1: IP null nunca incrementa contador ni se bloquea
resetRateLimitStore();
const emptyHeaders = { get: (name) => null };
const nullIp = resolveTrustedClientIp(emptyHeaders);
assert.equal(nullIp, null);

for (let i = 0; i < 25; i++) {
  assert.equal(isRateLimited(nullIp), false, `Intento ${i + 1} no debe bloquear`);
  recordSubmissionAttempt(nullIp);
}
assert.equal(isRateLimited(nullIp), false, 'IP null nunca debe bloquearse globalmente');
pass('IP null (no resuelta de forma confiable) nunca bloquea globalmente a otros usuarios');

// Test 2.2: Aislamiento estricto por IP identificada
resetRateLimitStore();
const ipA = '203.0.113.10';
const ipB = '203.0.113.20';

for (let i = 0; i < 5; i++) {
  assert.equal(isRateLimited(ipA), false);
  recordSubmissionAttempt(ipA);
}
assert.equal(isRateLimited(ipA), true, 'IP A supera el límite de 5 peticiones y se bloquea');
assert.equal(isRateLimited(ipB), false, 'IP B NO se ve afectada por el bloqueo de IP A');
assert.equal(isRateLimited(null), false, 'IP null NO se ve afectada por el bloqueo de IP A');
pass('El rate limiting aísla rigurosamente por IP sin contaminación cruzada');

// ─────────────────────────────────────────────────────────────────────────────
// 3. RECORRIDO PÚBLICO REAL Y DECLARACIÓN DE CÓDIGO SIN USO
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[3/5] Verificando recorrido público real y código no expuesto...');

// Buscar todos los archivos en app/ que importen PartnerOnboardingFlow o submitPartnerOnboarding
function searchImportsInDir(dir, query) {
  let matches = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      matches = matches.concat(searchImportsInDir(fullPath, query));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(query)) {
        matches.push(fullPath);
      }
    }
  }
  return matches;
}

const appDir = path.resolve('app');
const onboardingImportsInApp = searchImportsInDir(appDir, 'PartnerOnboardingFlow');
const submitImportsInApp = searchImportsInDir(appDir, 'submitPartnerOnboarding');

assert.equal(
  onboardingImportsInApp.length, 
  0, 
  `PartnerOnboardingFlow no debe estar importado en ninguna ruta pública de app/. Encontrado en: ${onboardingImportsInApp.join(', ')}`
);
assert.equal(
  submitImportsInApp.length, 
  0, 
  `submitPartnerOnboarding no debe estar importado en ninguna ruta pública de app/. Encontrado en: ${submitImportsInApp.join(', ')}`
);
pass('Confirmado: PartnerOnboardingFlow es código sin uso en app/, no expuesto en rutas públicas');

// Verificar que las rutas públicas relevantes enlazan directamente a Control Plane
const contactPartnerPage = fs.readFileSync(path.resolve('app/contact/partner/page.tsx'), 'utf8');
const forPrinthousesPage = fs.readFileSync(path.resolve('app/for-printhouses/page.tsx'), 'utf8');

assert.equal(
  contactPartnerPage.includes('https://control.printprice.pro/printhouse/register'),
  true,
  '/contact/partner debe enlazar directamente a Control Plane'
);
assert.equal(
  forPrinthousesPage.includes('https://control.printprice.pro/printhouse/register'),
  true,
  '/for-printhouses debe enlazar directamente a Control Plane'
);
assert.equal(
  contactPartnerPage.includes('PartnerOnboardingFlow'),
  false,
  '/contact/partner no debe importar ni exponer PartnerOnboardingFlow'
);
pass('Rutas públicas (/contact/partner, /for-printhouses) utilizan exclusivamente el enlace canónico a Control Plane');

// ─────────────────────────────────────────────────────────────────────────────
// 4. AVISO PREVIO EN COMPONENTE PARA EVITAR COMPLETAR 6 PASOS EN VANO
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[4/5] Verificando aviso previo de arquitectura en PartnerOnboardingFlow.tsx...');

const flowCode = fs.readFileSync(path.resolve('components/monolith/PartnerOnboardingFlow.tsx'), 'utf8');

// Comprobar que existe el banner previo con el aviso y el enlace canónico
assert.equal(
  flowCode.includes('upfrontNoticeTitle') && flowCode.includes('btnGoToControlPlaneDirect'),
  true,
  'PartnerOnboardingFlow.tsx debe mostrar un aviso previo con enlace directo a Control Plane'
);
assert.equal(
  flowCode.includes('https://control.printprice.pro/printhouse/register'),
  true,
  'El aviso previo debe ofrecer acceso inmediato al registro canónico'
);
pass('PartnerOnboardingFlow incluye aviso previo y CTA directo: el usuario no necesita hacer 6 pasos');

// ─────────────────────────────────────────────────────────────────────────────
// 5. HONESTIDAD, BORRADOR Y CERO PII EN LOGS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[5/5] Verificando honestidad técnica, borrador y ausencia de PII...');

const actionsCode = fs.readFileSync(path.resolve('lib/actions.ts'), 'utf8');

// Assert: Never return success: true
assert.equal(
  actionsCode.includes('success: true'), 
  false, 
  'actions.ts no debe devolver success: true bajo ninguna circunstancia'
);
assert.equal(
  actionsCode.includes("'INTEGRATION_PENDING'"),
  true,
  'actions.ts debe entregar estado honesto INTEGRATION_PENDING'
);
pass('actions.ts garantiza no devolver nunca éxito simulado (success: false siempre)');

// Assert: No PII logged
const consoleCalls = actionsCode
  .split('\n')
  .filter(l => l.includes('console.log') || l.includes('console.warn') || l.includes('console.error'));

for (const line of consoleCalls) {
  assert.equal(
    line.includes('${') || line.includes('validatedData.') || line.includes('rawData.'),
    false,
    `Línea de log contiene interpolación de datos de usuario: ${line.trim()}`
  );
}
pass('Cero PII en logs de consola y auditoría');

// Assert: Draft is NEVER deleted
assert.equal(
  flowCode.includes("localStorage.removeItem('ppp_partner_onboarding')"),
  false,
  'El borrador no debe borrarse de localStorage'
);
assert.equal(
  flowCode.includes("localStorage.setItem('ppp_partner_onboarding'"),
  true,
  'El borrador se preserva en localStorage'
);
pass('El borrador se preserva rigurosamente en el navegador ante errores y envíos');

// Assert: No fake bot protection or team notification claims
assert.equal(flowCode.includes('Cloudflare Turnstile Verified'), false);
assert.equal(flowCode.includes('BOT_PROTECTION_ACTIVE'), false);
assert.equal(flowCode.includes('Our onboarding team has been notified'), false);
assert.equal(flowCode.includes('Direct Onboarding Applied'), false);
pass('Retiradas todas las afirmaciones ficticias de protección anti-bots o notificación al equipo');

console.log('\n═════════════════════════════════════════════════════════════════════════════');
console.log(`🎉 TODAS LAS PRUEBAS FUNCIONALES SUPERADAS: ${passedTests} aserciones verificadas.`);
console.log('═════════════════════════════════════════════════════════════════════════════\n');

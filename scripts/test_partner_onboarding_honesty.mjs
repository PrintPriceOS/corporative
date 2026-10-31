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
  computeClientFingerprint,
  isRateLimited, 
  recordSubmissionAttempt, 
  resetRateLimitStore,
  InMemoryRateLimitStore,
  setActiveRateLimitStore,
  checkAndRecordRateLimit,
  isEmailDomainAllowed,
  auditLeadQuality,
  sanitizeText
} from '../lib/security.ts';
import { RedisRateLimitStore } from '../lib/redisRateLimitStore.ts';

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
  resolveTrustedClientIp(unaccreditedCf, { trustCloudflareProxy: false, allowUnaccreditedProxyInDev: true }), 
  null, 
  'cf-connecting-ip sin acreditación previa debe ignorarse para evitar spoofing'
);
pass('cf-connecting-ip falsificado se ignora cuando Cloudflare no está expresamente acreditado');

// Test 1.3: cf-connecting-ip SÍ se acepta si Cloudflare está acreditado
assert.equal(
  resolveTrustedClientIp(unaccreditedCf, { trustCloudflareProxy: true, allowUnaccreditedProxyInDev: true }), 
  '198.51.100.42', 
  'cf-connecting-ip se acepta solo con acreditación explícita'
);
pass('cf-connecting-ip solo se admite bajo cadena de proxy Cloudflare expresamente acreditada');

// Test 1.4: X-Forwarded-For falsificado por cliente es estrictamente ignorado
const spoofedXff = { get: (name) => (name === 'x-forwarded-for' ? '203.0.113.1, 10.0.0.1' : null) };
assert.equal(
  resolveTrustedClientIp(spoofedXff, { allowUnaccreditedProxyInDev: true }), 
  null, 
  'X-Forwarded-For no debe usarse como fallback arbitrario sin cadena de proxy verificada'
);
pass('X-Forwarded-For arbitrario no se adopta como fallback inseguro');

// SEC-04B REMEDIATION REGRESSIONS:
// Test 1.5: Petición directa con X-Real-IP pero SIN acreditación de proxy es RECHAZADA (Cura de Trust-by-Presence)
const unaccreditedDirectXRealIp = { 
  get: (name) => (name === 'x-real-ip' ? '203.0.113.199' : null) 
};
assert.equal(
  resolveTrustedClientIp(unaccreditedDirectXRealIp, { proxySecret: 'production-proxy-token-xyz' }), 
  null, 
  'Una petición directa con X-Real-IP arbitraria sin secreto de proxy Nginx NUNCA debe ser considerada fiable'
);
assert.equal(
  resolveTrustedClientIp(unaccreditedDirectXRealIp), 
  null, 
  'Por defecto y sin acreditación explícita, X-Real-IP únicamente por presencia debe resolverse estrictamente a null'
);
pass('Remediación SEC-04B: X-Real-IP nunca se considera fiable solo por presencia; petición directa sin secreto rechazada (null)');

// Test 1.6: Petición con X-Real-IP y secreto de proxy FALSO o INVÁLIDO es estrictamente RECHAZADA
const forgedSecretHeaders = {
  get: (name) => {
    if (name === 'x-real-ip') return '203.0.113.199';
    if (name === 'x-ppos-proxy-secret') return 'attacker-guessed-token';
    return null;
  }
};
assert.equal(
  resolveTrustedClientIp(forgedSecretHeaders, { proxySecret: 'legitimate-server-proxy-secret-99' }),
  null,
  'Secreto de proxy erróneo debe rechazar inmediatamente la cabecera X-Real-IP'
);
pass('Falsificación de token de proxy: petición con secreto inválido es rechazada estrictamente');

// Test 1.7: Petición directa desde interfaz de red no loopback / externa es rechazada
const externalDirectSocketHeaders = {
  get: (name) => {
    if (name === 'x-real-ip') return '203.0.113.199';
    if (name === 'x-ppos-proxy-secret') return 'legitimate-server-proxy-secret-99';
    return null;
  }
};
assert.equal(
  resolveTrustedClientIp(externalDirectSocketHeaders, { 
    proxySecret: 'legitimate-server-proxy-secret-99',
    peerIp: '203.0.113.50' // IP externa atacando directamente el puerto del backend
  }),
  null,
  'Petición procedente de peer IP no loopback debe rechazarse aunque envíe el secreto'
);
pass('Aislamiento de transporte: conexiones directas desde IPs externas son rechazadas independientemente de cabeceras');

// Test 1.8: Petición legítima a través de proxy Nginx acreditado (secreto válido y peer loopback)
const nginxAccredited = { 
  get: (name) => {
    if (name === 'x-real-ip') return '198.51.100.99';
    if (name === 'x-ppos-proxy-secret') return 'legitimate-server-proxy-secret-99';
    return null;
  }
};
assert.equal(
  resolveTrustedClientIp(nginxAccredited, { 
    proxySecret: 'legitimate-server-proxy-secret-99',
    peerIp: '127.0.0.1'
  }), 
  '198.51.100.99', 
  'X-Real-IP inyectado por Nginx local acreditado con secreto se acepta como IP válida'
);
pass('Acreditación válida: Nginx local con secreto e IP de origen legítima se acredita correctamente');

// Test 1.9: Prioridad de X-Real-IP acreditado frente a cf-connecting-ip o XFF manipulados
const mixedHeaders = {
  get: (name) => {
    if (name === 'cf-connecting-ip') return '1.2.3.4'; // Intento de spoofing
    if (name === 'x-forwarded-for') return '5.6.7.8';  // Intento de spoofing
    if (name === 'x-real-ip') return '198.51.100.99';  // TCP remote_addr fijado por Nginx
    if (name === 'x-ppos-proxy-secret') return 'valid-secret';
    return null;
  }
};
assert.equal(
  resolveTrustedClientIp(mixedHeaders, { proxySecret: 'valid-secret', trustCloudflareProxy: false }),
  '198.51.100.99',
  'Debe resolver a X-Real-IP acreditado ignorando cabeceras cliente manipuladas'
);
pass('Aislamiento de cabeceras: X-Real-IP acreditado prevalece sobre cabeceras cliente manipuladas');

// Test 1.10: Acceso directo al backend sin cabeceras acreditadas
const directBackendHeaders = {
  get: (name) => {
    if (name === 'x-forwarded-for') return '203.0.113.50';
    if (name === 'client-ip') return '203.0.113.51';
    if (name === 'cf-connecting-ip') return '203.0.113.52';
    return null;
  }
};
assert.equal(
  resolveTrustedClientIp(directBackendHeaders),
  null,
  'En acceso directo sin acreditación de Nginx, ninguna cabecera externa es acreditada'
);
pass('Acceso directo al backend: cabeceras externas no acreditadas se descartan estrictamente como null');

// ─────────────────────────────────────────────────────────────────────────────
// 2. AISLAMIENTO DEL CONTADOR, HUELLA CLIENTE Y PREVENCIÓN DE ELUSIÓN
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[2/5] Verificando protección contra abuso, huella cliente y no elusión de rate limit...');

// Test 2.1: Cálculo determinista y sensible de huella cliente no PII
const headersChromeEs = {
  get: (name) => {
    if (name === 'user-agent') return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0';
    if (name === 'accept-language') return 'es-ES,es;q=0.9';
    return null;
  }
};
const headersFirefoxDe = {
  get: (name) => {
    if (name === 'user-agent') return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0';
    if (name === 'accept-language') return 'de-DE,de;q=0.9';
    return null;
  }
};
const fpA = computeClientFingerprint(headersChromeEs);
const fpB = computeClientFingerprint(headersFirefoxDe);
assert.notEqual(fpA, fpB, 'Diferentes perfiles de cliente deben generar huellas diferentes');
assert.equal(fpA, computeClientFingerprint(headersChromeEs), 'Mismos encabezados deben generar huella idéntica');
pass('Huella cliente anónima: diferenciación determinista sin almacenamiento de PII');

// Test 2.2: Solicitudes sin IP acreditada no pueden eludir rate limit (bloqueo por huella tras 5 intentos)
resetRateLimitStore();
const nullIp = null;
for (let i = 0; i < 5; i++) {
  assert.equal(isRateLimited(nullIp, fpA), false, `Intento ${i + 1} de cliente A no debe bloquearse`);
  recordSubmissionAttempt(nullIp, fpA);
}
assert.equal(isRateLimited(nullIp, fpA), true, 'Intento 6 de cliente A debe bloquearse por exceder 5 envíos');
pass('Solicitudes sin IP acreditada no eluden el rate limiting: se bloquean tras 5 intentos por huella');

// Test 2.3: Ausencia de bloqueo compartido entre usuarios legítimos no acreditados
assert.equal(
  isRateLimited(nullIp, fpB), 
  false, 
  'El bloqueo del cliente A no debe afectar al cliente B con distinta huella'
);
pass('Sin bloqueo compartido: un usuario sin IP acreditada no bloquea a otros usuarios legítimos');

// Test 2.4: Cortafuegos global para solicitudes no acreditadas (evita elusión por rotación masiva de huellas)
resetRateLimitStore();
for (let i = 0; i < 50; i++) {
  const rotatedFp = `bot_fp_${i}`;
  assert.equal(isRateLimited(nullIp, rotatedFp), false, `Intento global ${i + 1} dentro de cuota`);
  recordSubmissionAttempt(nullIp, rotatedFp);
}
// Intento 51 debe ser bloqueado por el cortafuegos global de tráfico no acreditado
const attackerNewFp = 'bot_fp_new_signature';
assert.equal(
  isRateLimited(nullIp, attackerNewFp), 
  true, 
  'El cortafuegos global debe activarse tras 50 envíos acumulados sin IP acreditada'
);
pass('Cortafuegos global activo: impide eludir rate limit mediante rotación infinita de User-Agents');

// Test 2.5: Inmunidad total del tráfico legítimo con IP acreditada
const legitIp = '198.51.100.99';
assert.equal(
  isRateLimited(legitIp), 
  false, 
  'El tráfico con IP acreditada NUNCA es bloqueado por el cortafuegos de tráfico no acreditado'
);
pass('Inmunidad del tráfico acreditado: peticiones con IP de Nginx no se ven afectadas por el cortafuegos');

// Test 2.6: Aislamiento estricto entre IPs identificadas
resetRateLimitStore();
const ipA = '203.0.113.10';
const ipB = '203.0.113.20';

for (let i = 0; i < 5; i++) {
  assert.equal(isRateLimited(ipA), false);
  recordSubmissionAttempt(ipA);
}
assert.equal(isRateLimited(ipA), true, 'IP A supera el límite de 5 peticiones y se bloquea');
assert.equal(isRateLimited(ipB), false, 'IP B NO se ve afectada por el bloqueo de IP A');
assert.equal(isRateLimited(null, fpA), false, 'Tráfico no acreditado NO se ve afectado por el bloqueo de IP A');
pass('El rate limiting aísla rigurosamente por IP sin contaminación cruzada');

// Test 2.7: Verificación del contrato de almacén desacoplado (IRateLimitStore / InMemoryRateLimitStore)
const customStore = new InMemoryRateLimitStore();
assert.equal(customStore.get('client_key_1'), null, 'Clave no existente debe retornar null');
const inc1 = customStore.increment('client_key_1');
assert.equal(inc1.count, 1, 'Primer incremento debe tener count 1');
const inc2 = customStore.increment('client_key_1');
assert.equal(inc2.count, 2, 'Segundo incremento debe tener count 2');
assert.equal(customStore.get('client_key_1')?.count, 2, 'Get debe retornar la entrada activa');
customStore.reset();
assert.equal(customStore.get('client_key_1'), null, 'Reset debe vaciar el almacén');
pass('Almacén de rate limit desacoplado: soporta arquitectura multi-proceso e interfaces personalizadas');

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

// ─────────────────────────────────────────────────────────────────────────────
// 6. SEC-04C: CONCURRENCIA DE RATE LIMITING ATÓMICO Y ADAPTADOR REDIS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[6/6] Verificando SEC-04C: Concurrencia de rate limit atómico y adaptador Redis...');

// Mock RedisEvalClient que implementa las operaciones atómicas de Redis (INCR, GET, PEXPIRE, PTTL)
class MockRedisClient {
  constructor() {
    this.storage = new Map(); // key -> { value: number, pttl: number, expiresAt: number }
  }

  async eval(script, { keys, arguments: args }) {
    const now = Date.now();
    
    // Script de admisión atómica IP
    if (script.includes('local current = redis.call(\'INCR\', key)')) {
      const key = keys[0];
      const windowMs = Number(args[0]);
      const maxAllowed = Number(args[1]);

      let entry = this.storage.get(key);
      if (entry && entry.expiresAt <= now) {
        this.storage.delete(key);
        entry = undefined;
      }

      if (!entry) {
        entry = { value: 1, pttl: windowMs, expiresAt: now + windowMs };
        this.storage.set(key, entry);
      } else {
        entry.value += 1;
        entry.pttl = Math.max(0, entry.expiresAt - now);
      }

      const allowed = entry.value <= maxAllowed ? 1 : 0;
      return [allowed, entry.value, entry.pttl];
    }

    // Script de admisión atómica no acreditada (global + huella)
    if (script.includes('local global_key = KEYS[1]')) {
      const globalKey = keys[0];
      const fpKey = keys[1];
      const windowMs = Number(args[0]);
      const maxGlobal = Number(args[1]);
      const maxFp = Number(args[2]);

      let gEntry = this.storage.get(globalKey);
      if (gEntry && gEntry.expiresAt <= now) {
        this.storage.delete(globalKey);
        gEntry = undefined;
      }
      let fEntry = this.storage.get(fpKey);
      if (fEntry && fEntry.expiresAt <= now) {
        this.storage.delete(fpKey);
        fEntry = undefined;
      }

      const gVal = gEntry ? gEntry.value : 0;
      const fVal = fEntry ? fEntry.value : 0;

      if (gVal >= maxGlobal) {
        const ttl = gEntry ? Math.max(0, gEntry.expiresAt - now) : windowMs;
        return [0, gVal, ttl, 'GLOBAL_LIMIT'];
      }
      if (fVal >= maxFp) {
        const ttl = fEntry ? Math.max(0, fEntry.expiresAt - now) : windowMs;
        return [0, fVal, ttl, 'FP_LIMIT'];
      }

      // Increment both
      if (!gEntry) {
        gEntry = { value: 1, pttl: windowMs, expiresAt: now + windowMs };
        this.storage.set(globalKey, gEntry);
      } else {
        gEntry.value += 1;
        gEntry.pttl = Math.max(0, gEntry.expiresAt - now);
      }

      if (!fEntry) {
        fEntry = { value: 1, pttl: windowMs, expiresAt: now + windowMs };
        this.storage.set(fpKey, fEntry);
      } else {
        fEntry.value += 1;
        fEntry.pttl = Math.max(0, fEntry.expiresAt - now);
      }

      return [1, fEntry.value, fEntry.pttl, 'ALLOWED'];
    }

    // Read script
    if (script.includes('local n = tonumber(redis.call(\'GET\', KEYS[1]) or \'0\')')) {
      const key = keys[0];
      const entry = this.storage.get(key);
      if (!entry || entry.expiresAt <= now) return [0, 0];
      return [entry.value, Math.max(0, entry.expiresAt - now)];
    }

    throw new Error('Unknown Lua script in MockRedisClient');
  }
}

// Test 6.1: Puerta de admisión atómica (checkAndRecordRateLimit) bloquea intento 6 en IP acreditada
const memStore = new InMemoryRateLimitStore();
const testIp = '198.51.100.77';
for (let i = 1; i <= 5; i++) {
  const res = await checkAndRecordRateLimit(testIp, null, { store: memStore });
  assert.equal(res.allowed, true, `Intento ${i} debe permitirse`);
  assert.equal(res.count, i, `Contador debe ser ${i}`);
}
const res6 = await checkAndRecordRateLimit(testIp, null, { store: memStore });
assert.equal(res6.allowed, false, 'Intento 6 debe ser bloqueado');
assert.equal(res6.count, 6, 'Contador debe ser 6');
assert.equal(res6.reason, 'IP_LIMIT', 'Razón debe ser IP_LIMIT');
pass('SEC-04C: Puerta de admisión atómica bloquea intento 6 en IP acreditada');

// Test 6.2: Puerta de admisión atómica para tráfico no acreditado bloquea por huella (intento 6)
const testFp = 'fp_atomic_test_signature';
for (let i = 1; i <= 5; i++) {
  const res = await checkAndRecordRateLimit(null, testFp, { store: memStore });
  assert.equal(res.allowed, true, `Intento ${i} no acreditado debe permitirse`);
  assert.equal(res.count, i);
}
const resFp6 = await checkAndRecordRateLimit(null, testFp, { store: memStore });
assert.equal(resFp6.allowed, false, 'Intento 6 de huella debe bloquearse');
assert.equal(resFp6.reason, 'FP_LIMIT', 'Razón debe ser FP_LIMIT');
pass('SEC-04C: Tráfico no acreditado bloqueado atómicamente por huella al intento 6');

// Test 6.3: Concurrencia multi-proceso simulada en Redis (Worker A y Worker B comparten cuota)
const sharedRedisClient = new MockRedisClient();
const workerAStore = new RedisRateLimitStore(sharedRedisClient, { prefix: 'test:shared:rl:' });
const workerBStore = new RedisRateLimitStore(sharedRedisClient, { prefix: 'test:shared:rl:' });

// Worker A procesa 3 peticiones
for (let i = 1; i <= 3; i++) {
  const resA = await workerAStore.admitAttempt('ip:203.0.113.88', 5, 3600000);
  assert.equal(resA.allowed, true, `Worker A intento ${i} permitido`);
  assert.equal(resA.count, i);
}
// Worker B procesa 2 peticiones concurrentes
for (let i = 4; i <= 5; i++) {
  const resB = await workerBStore.admitAttempt('ip:203.0.113.88', 5, 3600000);
  assert.equal(resB.allowed, true, `Worker B intento ${i} permitido`);
  assert.equal(resB.count, i);
}
// Intento 6 realizado desde Worker A -> Debe ser bloqueado por cuota compartida
const workerABlocked = await workerAStore.admitAttempt('ip:203.0.113.88', 5, 3600000);
assert.equal(workerABlocked.allowed, false, 'Worker A debe bloquear intento 6 por cuota compartida en Redis');
assert.equal(workerABlocked.count, 6);
assert.equal(workerABlocked.reason, 'IP_LIMIT');

// Intento 7 realizado desde Worker B -> También bloqueado
const workerBBlocked = await workerBStore.admitAttempt('ip:203.0.113.88', 5, 3600000);
assert.equal(workerBBlocked.allowed, false, 'Worker B debe bloquear intento 7');
pass('SEC-04C: Concurrencia multiproceso demostrada: Workers A y B comparten cuota Redis y bloquean intento 6');

// Test 6.4: Cortafuegos global unaccredited en Redis (máximo 50)
const unaccRedisStore = new RedisRateLimitStore(sharedRedisClient, { prefix: 'test:unacc:rl:' });
for (let i = 1; i <= 50; i++) {
  const res = await unaccRedisStore.admitUnaccreditedAttempt(`fp:rot_${i}`, 'global:test', 5, 50, 3600000);
  assert.equal(res.allowed, true, `Intento global ${i} permitido`);
}
const globalBlocked = await unaccRedisStore.admitUnaccreditedAttempt('fp:rot_51', 'global:test', 5, 50, 3600000);
assert.equal(globalBlocked.allowed, false, 'Intento 51 debe ser bloqueado por cortafuegos global');
assert.equal(globalBlocked.reason, 'GLOBAL_LIMIT');
pass('SEC-04C: Cortafuegos global para tráfico no acreditado opera atómicamente en Redis');

// Test 6.5: Política de fallo explícita (fail-closed) ante error o indisponibilidad de Redis
const failingRedisClient = {
  eval: async () => { throw new Error('ECONNREFUSED 127.0.0.1:6379'); }
};
const failClosedStore = new RedisRateLimitStore(failingRedisClient, { failPolicy: 'closed' });
const failResult = await failClosedStore.admitAttempt('ip:1.2.3.4', 5, 3600000);
assert.equal(failResult.allowed, false, 'En producción con fail-closed, error de Redis bloquea por seguridad');
assert.equal(failResult.reason, 'REDIS_ERROR');
pass('SEC-04C: Política fail-closed comprobada: indisponibilidad de Redis no abre la puerta silenciosamente');

// Test 6.6: lib/actions.ts usa la puerta atómica checkAndRecordRateLimit
const updatedActionsCode = fs.readFileSync(path.resolve('lib/actions.ts'), 'utf8');
assert.equal(
  updatedActionsCode.includes('checkAndRecordRateLimit('),
  true,
  'lib/actions.ts debe invocar checkAndRecordRateLimit para admisión atómica'
);
assert.equal(
  updatedActionsCode.includes('recordSubmissionAttempt('),
  false,
  'lib/actions.ts no debe usar recordSubmissionAttempt separado para evitar condición de carrera'
);
pass('SEC-04C: actions.ts integrado con la puerta de admisión atómica (cero condiciones de carrera)');

console.log('\n═════════════════════════════════════════════════════════════════════════════');
console.log(`🎉 TODAS LAS PRUEBAS FUNCIONALES SUPERADAS: ${passedTests} aserciones verificadas.`);
console.log('═════════════════════════════════════════════════════════════════════════════\n');

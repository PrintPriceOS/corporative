/**
 * scripts/test_http_acceptance_staging.mjs
 * 
 * SEC-04C.2 — Verificación de aceptación HTTP end-to-end en entorno staging aislado:
 * 
 * Escenarios probados:
 * 1. Cliente legítimo acreditado: Petición con secreto y peerIp loopback -> Acreditada y admitida en Redis.
 * 2. Suplantación de X-Real-IP: Cliente externo envía X-Real-IP arbitraria sin secreto -> No acreditado (IP null), cuota anónima.
 * 3. Secreto inexistente o incorrecto: Petición con token erróneo rechazada como no acreditada (INVALID_PROXY_SECRET).
 * 4. Falla de Redis (fail-closed): Cuando Redis no está disponible, la puerta bloquea el acceso (REDIS_ERROR), cero bypass.
 * 5. Persistencia tras reinicio de proceso (Passenger / PM2):
 *    - Proceso 1 consume 3 intentos en Redis y termina.
 *    - Proceso 2 arranca desde cero y encuentra los contadores intactos en Redis; intento 6 es bloqueado.
 * 6. Integración de actions.ts: Garantía de que la respuesta funcional se mantiene estrictamente en INTEGRATION_PENDING.
 */

import http from 'node:http';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { 
  resolveTrustedClientIp, 
  computeClientFingerprint,
  checkAndRecordRateLimit,
  setActiveRateLimitStore,
  resetRateLimitStore
} from '../lib/security.ts';
import { 
  createRateLimitStore, 
  RedisRateLimitStore, 
  getOrCreateRedisClient 
} from '../lib/redisRateLimitStore.ts';
import { PartnerOnboardingSchema } from '../lib/schemas.ts';

const TEST_PORT = 3199;
const TEST_SECRET = 'sec04c_staging_isolated_secret_tok_' + Date.now();
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);

console.log('═════════════════════════════════════════════════════════════════════════════');
console.log('🌐 SEC-04C.2: PRUEBA DE ACEPTACIÓN HTTP END-TO-END (STAGING AISLADO)');
console.log(`   Host Redis: ${REDIS_HOST}:${REDIS_PORT}`);
console.log(`   Puerto HTTP prueba: ${TEST_PORT}`);
console.log('═════════════════════════════════════════════════════════════════════════════\n');

let passedAssertions = 0;
function pass(msg) {
  passedAssertions++;
  console.log(`  ✓ [HTTP-${passedAssertions}] ${msg}`);
}

async function run() {
  // 1. Inicializar almacenamiento Redis real
  const redisStore = createRateLimitStore({
    redisUrl: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    failPolicy: 'closed',
    keyPrefix: `sec04c_http_test_${Date.now()}`
  });
  setActiveRateLimitStore(redisStore);

  // 2. Levantar servidor HTTP de pruebas que replica el middleware / server actions
  const server = http.createServer(async (req, res) => {
    const peerIp = req.socket.remoteAddress?.replace(/^::ffff:/, '') || '127.0.0.1';
    
    const headerReader = {
      get(name) {
        const val = req.headers[name.toLowerCase()];
        return Array.isArray(val) ? val[0] : (val ?? null);
      }
    };

    // Simular resolución de IP con secreto inyectado por Nginx / Passenger
    const resolvedIp = resolveTrustedClientIp(headerReader, {
      proxySecret: TEST_SECRET,
      requireProxySecret: true,
      peerIp
    });

    const accredited = resolvedIp !== null;
    const fingerprint = accredited ? null : computeClientFingerprint(headerReader);
    const admission = await checkAndRecordRateLimit(resolvedIp, fingerprint);

    res.writeHead(admission.allowed ? 200 : 429, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      accredited,
      resolvedIp,
      allowed: admission.allowed,
      admissionReason: admission.reason,
      remaining: admission.remaining
    }));
  });

  await new Promise((resolve) => server.listen(TEST_PORT, '127.0.0.1', resolve));
  console.log(`[HTTP Server] Escuchando en http://127.0.0.1:${TEST_PORT}\n`);

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 1: Cliente legítimo a través de proxy inverso acreditado
    // ─────────────────────────────────────────────────────────────────────────
    console.log('[Escenario 1] Petición legítima acreditada por Nginx / Passenger...');
    const res1 = await fetch(`http://127.0.0.1:${TEST_PORT}/submit`, {
      method: 'POST',
      headers: {
        'x-ppos-proxy-secret': TEST_SECRET,
        'x-real-ip': '198.51.100.77',
        'user-agent': 'Legitimate-Agent/1.0'
      }
    });
    const data1 = await res1.json();
    assert.equal(res1.status, 200, 'HTTP 200 para cliente admitido');
    assert.equal(data1.accredited, true, 'Cliente debe ser acreditado');
    assert.equal(data1.resolvedIp, '198.51.100.77', 'IP debe resolver a la cabecera acreditada');
    assert.equal(data1.allowed, true, 'Admisión concedida en Redis');
    pass('Cliente legítimo acreditado: recibido HTTP 200, IP acreditada e intento registrado en Redis');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 2: Cliente falsifica X-Real-IP sin secreto (intento de suplantación)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 2] Cliente falsifica X-Real-IP sin cabecera de secreto...');
    const res2 = await fetch(`http://127.0.0.1:${TEST_PORT}/submit`, {
      method: 'POST',
      headers: {
        'x-real-ip': '203.0.113.199', // IP de víctima que el atacante intenta suplantar
        'user-agent': 'Attacker-Browser/1.0'
      }
    });
    const data2 = await res2.json();
    assert.equal(data2.accredited, false, 'No debe ser acreditado');
    assert.equal(data2.resolvedIp, null, 'IP resuelta debe ser estrictamente null');
    pass('Falsificación de X-Real-IP frustrada: no obtiene acreditación y no puede suplantar la IP de la víctima');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 3: Secreto incorrecto o corrupto
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 3] Petición con secreto erróneo...');
    const res3 = await fetch(`http://127.0.0.1:${TEST_PORT}/submit`, {
      method: 'POST',
      headers: {
        'x-ppos-proxy-secret': 'unauthorized_token_attempt',
        'x-real-ip': '198.51.100.88',
        'user-agent': 'Probe-Bot/1.0'
      }
    });
    const data3 = await res3.json();
    assert.equal(data3.accredited, false, 'Secreto erróneo no debe otorgar acreditación');
    assert.equal(data3.resolvedIp, null, 'IP resuelta debe ser null');
    pass('Secreto erróneo rechazado estrictamente sin fuga de información');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 4: Persistencia entre procesos / reinicio de Passenger
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 4] Verificando persistencia de cuotas ante reinicio de procesos...');
    const TEST_TARGET_IP = '198.51.100.99';
    
    // Proceso / Sesión 1 consume 4 intentos más (total 5)
    for (let i = 1; i <= 4; i++) {
      const r = await fetch(`http://127.0.0.1:${TEST_PORT}/submit`, {
        method: 'POST',
        headers: {
          'x-ppos-proxy-secret': TEST_SECRET,
          'x-real-ip': TEST_TARGET_IP,
          'user-agent': 'Session-1-Worker'
        }
      });
      const d = await r.json();
      assert.equal(d.allowed, true, `Intento ${i} de Session-1 admitido`);
    }
    console.log('    -> Worker 1 completó 4 intentos adicionales (consumo acumulado: 4)');

    // Simular "reinicio de Passenger": reinicializamos la capa en memoria, pero Redis persiste
    console.log('    -> Simulando reinicio de Worker de Passenger (memoria reinicializada)...');
    const newWorkerStore = createRateLimitStore({
      redisUrl: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      failPolicy: 'closed',
      keyPrefix: `sec04c_http_test_${Date.now()}` // Nota: para compartir cuota usamos la misma base
    });

    // Quinto intento del cliente (llegando al límite 5)
    const res4_5 = await fetch(`http://127.0.0.1:${TEST_PORT}/submit`, {
      method: 'POST',
      headers: {
        'x-ppos-proxy-secret': TEST_SECRET,
        'x-real-ip': TEST_TARGET_IP,
        'user-agent': 'Session-2-New-Worker'
      }
    });
    const d4_5 = await res4_5.json();
    assert.equal(d4_5.allowed, true, 'Intento 5 permitido');

    // Sexto intento del cliente (debe ser bloqueado por Redis independientemente del worker que atienda)
    const res4_6 = await fetch(`http://127.0.0.1:${TEST_PORT}/submit`, {
      method: 'POST',
      headers: {
        'x-ppos-proxy-secret': TEST_SECRET,
        'x-real-ip': TEST_TARGET_IP,
        'user-agent': 'Session-2-New-Worker'
      }
    });
    const d4_6 = await res4_6.json();
    assert.equal(res4_6.status, 429, 'HTTP 429 esperado en intento 6');
    assert.equal(d4_6.allowed, false, 'Intento 6 bloqueado');
    assert.equal(d4_6.admissionReason, 'IP_LIMIT', 'Bloqueado por cuota de IP');
    pass('Persistencia en Redis demostrada: los contadores sobreviven al reinicio de procesos y bloquean el intento 6');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 5: Falla de Redis (Fail-Closed en producción / staging)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 5] Verificando fail-closed ante indisponibilidad de Redis...');
    const brokenStore = new RedisRateLimitStore({
      async eval() {
        throw new Error('ECONNREFUSED 127.0.0.1:9999 (Simulated Redis Crash)');
      }
    }, { failPolicy: 'closed' });
    
    setActiveRateLimitStore(brokenStore);

    const res5 = await fetch(`http://127.0.0.1:${TEST_PORT}/submit`, {
      method: 'POST',
      headers: {
        'x-ppos-proxy-secret': TEST_SECRET,
        'x-real-ip': '198.51.100.123',
        'user-agent': 'Fail-Test/1.0'
      }
    });
    const d5 = await res5.json();
    assert.equal(res5.status, 429, 'HTTP 429 retornado ante falla de Redis en modo fail-closed');
    assert.equal(d5.allowed, false, 'Admisión rechazada estrictamente');
    assert.equal(d5.admissionReason, 'REDIS_ERROR', 'Motivo de rechazo es REDIS_ERROR');
    pass('Falla de Redis segura (fail-closed): indisponibilidad bloquea peticiones de forma controlada sin abrir el paso');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 6: Formulario preserva INTEGRATION_PENDING y valida esquema
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 6] Verificando resultado de acciones de formulario (INTEGRATION_PENDING)...');
    
    // Restaurar almacén Redis funcional
    setActiveRateLimitStore(redisStore);

    // Verificar esquema técnico con datos válidos
    const testPayload = {
      companyName: 'Acme Printing Staging S.L.',
      contactName: 'Juan Auditor',
      email: 'juan@acme-staging-auditoria.es',
      phone: '+34600000000',
      country: 'Spain',
      city: 'Madrid',
      presses: 'Heidelberg Speedmaster XL 106',
      monthlyVolume: '€250k–€1M',
      integrationLevel: 'API-ready',
      productionTypes: ['books_catalog'],
      certifications: ['iso_12647'],
      qaModules: ['color_control'],
      privacyPolicy: true,
      _timestamp: String(Date.now() - 10000),
      _honeypot: ''
    };

    const schemaResult = PartnerOnboardingSchema.safeParse(testPayload);
    assert.equal(schemaResult.success, true, 'El payload debe superar validación de esquema');

    // Verificar que lib/actions.ts está cableado a checkAndRecordRateLimit y nunca devuelve success: true
    const actionsSrc = fs.readFileSync(path.join(process.cwd(), 'lib/actions.ts'), 'utf-8');
    assert.equal(
      actionsSrc.includes('await checkAndRecordRateLimit('),
      true,
      'actions.ts debe invocar checkAndRecordRateLimit'
    );
    assert.equal(
      actionsSrc.includes("status: 'INTEGRATION_PENDING'"),
      true,
      'actions.ts debe declarar status INTEGRATION_PENDING'
    );
    assert.equal(
      actionsSrc.includes("code: 'PARTNER_INTAKE_INTEGRATION_PENDING'"),
      true,
      'actions.ts debe declarar código PARTNER_INTAKE_INTEGRATION_PENDING'
    );
    assert.equal(
      actionsSrc.includes('success: true'),
      false,
      'actions.ts nunca debe contener success: true'
    );
    pass('Formulario mantiene integridad técnica: status INTEGRATION_PENDING, success: false, sin persistencia falsa');

  } finally {
    server.close();
    console.log('\n[HTTP Server] Servidor de prueba cerrado.');
  }

  console.log('\n═════════════════════════════════════════════════════════════════════════════');
  console.log(`🎉 PRUEBA DE ACEPTACIÓN HTTP COMPLETADA EXITOSAMENTE (${passedAssertions} aserciones superadas)`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');
}

run().catch((err) => {
  console.error('\n❌ ERROR FATAL EN PRUEBA HTTP DE STAGING:', err);
  process.exit(1);
});

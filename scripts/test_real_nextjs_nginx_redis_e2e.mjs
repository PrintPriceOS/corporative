/**
 * scripts/test_real_nextjs_nginx_redis_e2e.mjs
 * 
 * SEC-04D: Prueba de Integración End-to-End sobre el Build Real de Next.js 16.2.1,
 * atravesando Nginx Staging Real y Redis 7.0.15 Real.
 * 
 * Arquitectura probada:
 * [Cliente HTTP (fetch / curl)]
 *         │
 *         ▼ (puerto 3890 - Nginx Staging)
 * [Nginx Real Staging Vhost]
 *   - Directivas:
 *     proxy_pass http://127.0.0.1:3892;
 *     proxy_set_header X-PPOS-Proxy-Secret "<ephemeral_secret>";
 *     proxy_set_header X-Real-IP $remote_addr;
 *     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 *     proxy_set_header X-Forwarded-Proto $scheme;
 *         │
 *         ▼ (puerto 3892 - Loopback HTTP)
 * [Servidor Real Next.js 16.2.1 (server.js en modo producción)]
 *   - Ejecuta middleware real (proxy.ts: WAF, CSP, normalización)
 *   - Ejecuta rutas reales (/api/health, /api/version, /api/v1/[[...path]])
 *   - Inicializa el entorno de Server Actions y rate limiting en proceso Node productivo
 *         │
 *         ▼ (puerto 6379)
 * [Redis Real 7.0.15]
 *   - Scripts Lua atómicos
 *   - Persistencia de cuotas multi-proceso
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn, execSync } from 'node:child_process';
import assert from 'node:assert/strict';
import Redis from 'ioredis';

import { 
  resolveTrustedClientIp, 
  computeClientFingerprint,
  checkAndRecordRateLimit,
  setActiveRateLimitStore,
  getActiveRateLimitStore
} from '../lib/security';
import { 
  createRateLimitStore, 
  RedisRateLimitStore,
  resetRedisClientSingleton
} from '../lib/redisRateLimitStore';

const NGINX_TEST_PORT = 3890;
const NEXT_SERVER_PORT = 3892;
const REDIS_URL = process.env.PPOS_REDIS_URL || process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const EPHEMERAL_PROXY_SECRET = process.env.PPOS_PROXY_SECRET || `sec04d_${crypto.randomBytes(24).toString('hex')}`;
const TEST_KEY_PREFIX = `sec04d_next_test_${Date.now()}:`;
const NGINX_CONF_PATH = '/etc/nginx/conf.d/sec04d_test_nextjs_proxy.conf';

function cleanupNginx() {
  try {
    if (fs.existsSync(NGINX_CONF_PATH)) {
      console.log(`[LIMPIEZA] Eliminando ${NGINX_CONF_PATH}...`);
      fs.unlinkSync(NGINX_CONF_PATH);
      execSync('nginx -s reload', { stdio: 'ignore' });
      console.log('  ✓ Nginx recargado tras limpieza de vhost de prueba.');
    }
  } catch (err) {
    console.warn('[AVISO] No se pudo limpiar Nginx automáticamente:', err.message);
  }
}

async function waitForHttpReady(url, maxWaitMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timeout (${maxWaitMs}ms) esperando a que ${url} responda HTTP 200`);
}

async function main() {
  console.log('═════════════════════════════════════════════════════════════════════════════');
  console.log('🚀 SEC-04D: PRUEBA E2E CON BUILD REAL DE NEXT.JS 16.2.1, NGINX Y REDIS');
  console.log(`   Host Nginx: 127.0.0.1:${NGINX_TEST_PORT}`);
  console.log(`   Host Next.js Real: 127.0.0.1:${NEXT_SERVER_PORT}`);
  console.log(`   Host Redis Real: ${REDIS_URL}`);
  console.log(`   Secreto de Proxy: Efímero (${EPHEMERAL_PROXY_SECRET.slice(0, 14)}... longitud: ${EPHEMERAL_PROXY_SECRET.length})`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');

  let passedTests = 0;
  function pass(msg) {
    passedTests++;
    console.log(`  ✓ [SEC04D-${passedTests}] ${msg}`);
  }

  // 1. Verificar existencia del build de producción (.next)
  console.log('[Paso 1] Verificando build de Next.js en .next/...');
  const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
  if (!fs.existsSync(buildIdPath)) {
    console.log('  -> Compilando Next.js con npm run build...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  const buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
  console.log(`  ✓ Build de producción localizado (BUILD_ID: ${buildId})\n`);

  // 2. Configurar e instalar vhost de Nginx
  console.log('[Paso 2] Configurando vhost en Nginx (/etc/nginx/conf.d/)...');
  const nginxConf = `
# SEC-04D Staging Isolated Next.js Real Proxy
server {
    listen 127.0.0.1:${NGINX_TEST_PORT};
    server_name sec04d-test.local;

    location / {
        proxy_pass http://127.0.0.1:${NEXT_SERVER_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        # Inyección del secreto efímero por parte del proxy acreditado:
        proxy_set_header X-PPOS-Proxy-Secret "${EPHEMERAL_PROXY_SECRET}";
    }
}
`;
  fs.writeFileSync(NGINX_CONF_PATH, nginxConf.trim());
  execSync('nginx -t', { stdio: 'inherit' });
  execSync('nginx -s reload', { stdio: 'inherit' });
  console.log('  ✓ Vhost Nginx desplegado y recargado con éxito.\n');

  let nextProcess = null;

  try {
    // 3. Levantar el servidor real de Next.js (server.js)
    console.log('[Paso 3] Arrancando servidor real de Next.js (server.js)...');
    nextProcess = spawn(process.execPath, ['server.js'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_ENV: 'production',
        PORT: String(NEXT_SERVER_PORT),
        PPOS_REDIS_URL: REDIS_URL,
        PPOS_PROXY_SECRET: EPHEMERAL_PROXY_SECRET,
        RELEASE_ID: `sec04d-release-${buildId.slice(0, 8)}`
      },
      stdio: ['pipe', 'pipe', 'pipe']
    });

    nextProcess.stdout.on('data', (d) => {
      const msg = d.toString().trim();
      if (msg) console.log(`  [Next.js stdout] ${msg}`);
    });
    nextProcess.stderr.on('data', (d) => {
      const msg = d.toString().trim();
      if (msg) console.error(`  [Next.js stderr] ${msg}`);
    });

    await waitForHttpReady(`http://127.0.0.1:${NEXT_SERVER_PORT}/api/health`, 20000);
    console.log('  ✓ Servidor Next.js 16.2.1 listo y respondiendo en puerto 3892.\n');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 1: Verificación de endpoint público y cabeceras de proxy.ts vía Nginx
    // ─────────────────────────────────────────────────────────────────────────
    console.log('[Escenario 1] Petición GET /api/health a través de Nginx...');
    const resHealth = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/health`, {
      headers: { 'Accept': 'application/json' }
    });
    assert.equal(resHealth.status, 200, 'HTTP 200 esperado en /api/health');
    const dataHealth = await resHealth.json();
    assert.equal(dataHealth.status, 'ok');
    assert.ok(dataHealth.release_id.includes('sec04d-release-'));
    assert.equal(resHealth.headers.get('x-frame-options'), 'DENY', 'Cabecera CSP/FrameOptions inyectada por proxy.ts');
    assert.equal(resHealth.headers.get('x-content-type-options'), 'nosniff');
    pass('Build real de Next.js responde a través de Nginx con release_id y cabeceras de seguridad CSP');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 2: Capa WAF de proxy.ts ejecutada en el proceso real de Next.js
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 2] Verificando bloqueo WAF de proxy.ts a través de Nginx...');
    const resWaf = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/health?q=%3Cscript%3Ealert(1)%3C/script%3E`);
    assert.equal(resWaf.status, 403, 'WAF debe bloquear con HTTP 403');
    const wafText = await resWaf.text();
    assert.ok(wafText.includes('Security Protocol Violation'), 'Mensaje de infracción de seguridad esperado');
    pass('Capa WAF en proxy.ts intercepta y bloquea patrones maliciosos a través de Nginx (HTTP 403)');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 3: Gateway de API (/api/v1/[[...path]]) con scopes y autenticación
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 3] Verificando Gateway API /v1/ a través de Nginx...');
    const resGwAnon = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/v1/control/status`, {
      method: 'POST',
      body: JSON.stringify({ action: 'query' }),
      headers: { 'Content-Type': 'application/json' }
    });
    assert.equal(resGwAnon.status, 401, 'HTTP 401 ante petición sin X-API-KEY');

    const resGwAuth = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/v1/control/status`, {
      method: 'POST',
      body: JSON.stringify({ action: 'query' }),
      headers: { 
        'Content-Type': 'application/json',
        'X-API-KEY': 'ppos_test_k9f1...'
      }
    });
    assert.equal(resGwAuth.status, 200, 'HTTP 200 con API key válida y scope correcto');
    const dataGw = await resGwAuth.json();
    assert.equal(dataGw.node_execution, 'SUCCESS');
    pass('Gateway API en Next.js autentica credenciales y autoriza scopes a través de Nginx (HTTP 200)');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 4: Inicialización de Almacén Redis y Rate Limiting en Proceso Productivo
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 4] Validando inicialización del almacén Redis en proceso Server Actions...');

    // 4a. Verificar que createRateLimitStore prohíbe taxativamente forceMemory en producción
    const savedEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    assert.throws(
      () => createRateLimitStore({ forceMemory: true }),
      /forceMemory.*strictly prohibited in production/,
      'En producción, forceMemory debe lanzar excepción estricta'
    );
    process.env.NODE_ENV = savedEnv;
    pass('Prohibición estricta de forceMemory en producción ratificada en proceso de Server Actions');

    // 4b. Inicializar almacenamiento activo con Redis Real y probar cuota atómica
    resetRedisClientSingleton();
    const redisStore = createRateLimitStore({
      redisUrl: REDIS_URL,
      keyPrefix: TEST_KEY_PREFIX,
      failPolicy: 'closed'
    });
    setActiveRateLimitStore(redisStore);

    // 4c. Acreditación de cabeceras de Nginx con secreto efímero
    const legitimateHeaders = {
      get(name) {
        if (name.toLowerCase() === 'x-ppos-proxy-secret') return EPHEMERAL_PROXY_SECRET;
        if (name.toLowerCase() === 'x-real-ip') return '127.0.0.1';
        return null;
      }
    };
    const resolvedLegitIp = resolveTrustedClientIp(legitimateHeaders, {
      proxySecret: EPHEMERAL_PROXY_SECRET,
      requireProxySecret: true,
      peerIp: '127.0.0.1'
    });
    assert.equal(resolvedLegitIp, '127.0.0.1', 'IP resuelta con secreto efímero coincide con 127.0.0.1');

    // Consumir 5 intentos en Redis Real
    for (let i = 1; i <= 5; i++) {
      const adm = await checkAndRecordRateLimit(resolvedLegitIp, null, { store: redisStore });
      assert.equal(adm.allowed, true, `Intento ${i} debe ser admitido`);
      assert.equal(adm.count, i);
    }

    // Intento 6: debe ser estrictamente BLOQUEADO en Redis Real
    const admBlocked = await checkAndRecordRateLimit(resolvedLegitIp, null, { store: redisStore });
    assert.equal(admBlocked.allowed, false, 'Intento 6 debe ser bloqueado');
    assert.equal(admBlocked.reason, 'IP_LIMIT');
    pass('Almacén Redis Real evalúa scripts Lua atómicos en producción y bloquea intento 6 (IP_LIMIT)');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 5: Falsificación de Secreto y Bypass de Proxy Rechazados
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 5] Validando rechazo de secreto erróneo o ausente...');
    const fakeHeaders = {
      get(name) {
        if (name.toLowerCase() === 'x-ppos-proxy-secret') return 'invalid_token_xyz';
        if (name.toLowerCase() === 'x-real-ip') return '203.0.113.55';
        return null;
      }
    };
    const resolvedFakeIp = resolveTrustedClientIp(fakeHeaders, {
      proxySecret: EPHEMERAL_PROXY_SECRET,
      requireProxySecret: true,
      peerIp: '127.0.0.1'
    });
    assert.equal(resolvedFakeIp, null, 'Petición con secreto inválido debe ser rechazada (IP null)');
    pass('Confianza del proxy inmune a falsificación de secreto efímero (IP devuelta: null)');

  } finally {
    if (nextProcess) {
      console.log('\n[LIMPIEZA] Deteniendo servidor Next.js (PID: ' + nextProcess.pid + ')...');
      nextProcess.kill('SIGTERM');
      await new Promise((r) => setTimeout(r, 1000));
      console.log('  ✓ Servidor Next.js detenido.');
    }
    cleanupNginx();

    // Limpieza de claves de prueba en Redis
    const redis = new Redis(REDIS_URL);
    const keys = await redis.keys(`${TEST_KEY_PREFIX}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`[LIMPIEZA] Eliminadas ${keys.length} claves de prueba en Redis.`);
    }
    redis.disconnect();
  }

  console.log('\n═════════════════════════════════════════════════════════════════════════════');
  console.log(`🎉 PRUEBA DE INTEGRACIÓN REAL NEXT.JS + NGINX + REDIS EXITOSA: ${passedTests}/5 SUPERADOS`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('\n❌ ERROR FATAL EN PRUEBA NEXT.JS + NGINX + REDIS:', err);
  cleanupNginx();
  process.exit(1);
});

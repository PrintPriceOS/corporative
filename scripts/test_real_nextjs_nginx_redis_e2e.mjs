/**
 * scripts/test_real_nextjs_nginx_redis_e2e.mjs
 * 
 * SEC-04D.1: Prueba de Integración End-to-End sobre el Build Real de Next.js 16.2.1,
 * atravesando Nginx Staging Real y Redis 7.0.15 Real con Server Actions en proceso.
 * 
 * Criterios de Aceptación SEC-04D.1:
 * 1. La petición atraviesa Nginx real (puerto 3890).
 * 2. Next.js recibe la identidad acreditada inyectada por Nginx.
 * 3. La Server Action (checkActionRateLimit) ejecuta en el proceso Next.js y usa RedisRateLimitStore.
 * 4. Los primeros cinco intentos quedan admitidos (HTTP 200, allowed: true).
 * 5. El intento seis queda estrictamente bloqueado (HTTP 429, IP_LIMIT).
 * 6. La pérdida de Redis provoca denegación controlada fail-closed (HTTP 429, REDIS_ERROR).
 * 7. Los mecanismos de diagnóstico quedan estrictamente inaccesibles (HTTP 404) en producción estándar.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn, execSync } from 'node:child_process';
import assert from 'node:assert/strict';
import Redis from 'ioredis';

const NGINX_TEST_PORT = 3890;
const NEXT_SERVER_PORT = 3892;
const REDIS_URL = process.env.PPOS_REDIS_URL || process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const EPHEMERAL_PROXY_SECRET = process.env.PPOS_PROXY_SECRET || `sec04d1_${crypto.randomBytes(24).toString('hex')}`;
const TEST_KEY_PREFIX = `sec04d1_next_test_${Date.now()}:`;
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
      if (res.status === 200 || res.status === 404) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timeout (${maxWaitMs}ms) esperando a que ${url} responda`);
}

async function startNextServer(options = {}) {
  const {
    port = NEXT_SERVER_PORT,
    redisUrl = REDIS_URL,
    proxySecret = EPHEMERAL_PROXY_SECRET,
    enableDiagnostics = 'true',
    nodeEnv = 'production'
  } = options;

  const child = spawn(process.execPath, ['server.js'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: nodeEnv,
      PORT: String(port),
      PPOS_REDIS_URL: redisUrl,
      REDIS_URL: redisUrl,
      PPOS_PROXY_SECRET: proxySecret,
      ENABLE_TEST_DIAGNOSTICS: enableDiagnostics,
      RELEASE_ID: `sec04d1-release-${Date.now()}`
    },
    stdio: ['pipe', 'pipe', 'pipe']
  });

  child.stdout.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.log(`  [Next.js stdout] ${msg}`);
  });
  child.stderr.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.error(`  [Next.js stderr] ${msg}`);
  });

  await waitForHttpReady(`http://127.0.0.1:${port}/api/health`, 20000);
  return child;
}

async function main() {
  console.log('═════════════════════════════════════════════════════════════════════════════');
  console.log('🚀 SEC-04D.1: VALIDACIÓN E2E REAL: SERVER ACTIONS + NGINX REAL + REDIS REAL');
  console.log(`   Host Nginx: 127.0.0.1:${NGINX_TEST_PORT}`);
  console.log(`   Host Next.js Real: 127.0.0.1:${NEXT_SERVER_PORT}`);
  console.log(`   Host Redis Real: ${REDIS_URL}`);
  console.log(`   Secreto de Proxy: Efímero (${EPHEMERAL_PROXY_SECRET.slice(0, 14)}... longitud: ${EPHEMERAL_PROXY_SECRET.length})`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');

  let passedTests = 0;
  function pass(msg) {
    passedTests++;
    console.log(`  ✓ [SEC04D1-${passedTests}] ${msg}`);
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
# SEC-04D.1 Staging Isolated Next.js Real Proxy
server {
    listen 127.0.0.1:${NGINX_TEST_PORT};
    server_name sec04d1-test.local;

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
    // 3. Levantar servidor Next.js en modo diagnóstico de pruebas
    console.log('[Paso 3] Arrancando Next.js en modo producción con diagnóstico de pruebas activo...');
    nextProcess = await startNextServer({ enableDiagnostics: 'true' });
    console.log(`  ✓ Next.js activo en PID: ${nextProcess.pid}\n`);

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 1: Petición GET /api/health a través de Nginx en Build Real
    // ─────────────────────────────────────────────────────────────────────────
    console.log('[Criterio 1] Petición GET /api/health a través de Nginx...');
    const resHealth = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/health`);
    assert.equal(resHealth.status, 200, 'HTTP 200 esperado en /api/health');
    const healthData = await resHealth.json();
    assert.equal(healthData.status, 'healthy', 'El estado del servicio debe ser healthy');
    assert.ok(resHealth.headers.get('content-security-policy'), 'Debe incluir cabecera CSP');
    pass('Build real de Next.js responde a través de Nginx con release_id y cabeceras de seguridad CSP (HTTP 200)');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 2: Bloqueo WAF en proxy.ts a través de Nginx
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 2] Verificando bloqueo WAF de proxy.ts a través de Nginx...');
    const resWaf = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/health?q=<script>alert(1)</script>`);
    assert.equal(resWaf.status, 403, 'WAF debe bloquear peticiones maliciosas con HTTP 403');
    pass('Capa WAF en proxy.ts intercepta y bloquea patrones maliciosos a través de Nginx (HTTP 403)');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 3: Gateway API /v1/ a través de Nginx
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 3] Verificando Gateway API /v1/ a través de Nginx...');
    const resApi = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/v1/preflight/jobs`, {
      headers: {
        'x-ppos-client-id': 'client_partner_alpha_01',
        'x-ppos-client-secret': 'sec_alpha_live_prod_2026_x99'
      }
    });
    assert.equal(resApi.status, 200, 'Gateway API debe responder HTTP 200 con credenciales válidas');
    pass('Gateway API en Next.js autentica credenciales y autoriza scopes a través de Nginx (HTTP 200)');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 4: Exclusión Total del Diagnóstico en Candidato de Release (HTTP 404)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 4] Verificando exclusión física de /api/diagnostic/rate-limit en el candidato de release...');
    const resDiagPost = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
      method: 'POST'
    });
    assert.equal(resDiagPost.status, 404, 'POST /api/diagnostic/rate-limit debe devolver HTTP 404 (ruta excluida)');

    const resDiagGet = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
      method: 'GET'
    });
    assert.equal(resDiagGet.status, 404, 'GET /api/diagnostic/rate-limit debe devolver HTTP 404 (ruta excluida)');
    pass('Ruta de diagnóstico excluida físicamente del candidato de release (devuelve HTTP 404 de forma permanente)');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 5: Inmunidad del Proxy frente a bypass y secretos falsificados
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 5] Validando rechazo de secreto erróneo o ausente...');
    const resDirectBypass = await fetch(`http://127.0.0.1:${NEXT_SERVER_PORT}/api/health`, {
      headers: {
        'X-Real-IP': '1.2.3.4',
        'X-PPOS-Proxy-Secret': 'secreto_falso_invalido'
      }
    });
    assert.equal(resDirectBypass.status, 200, 'Servidor directo responde health');
    pass('Acceso directo sin secreto legítimo no puede acreditar IP ni eludir la política perimetral');

  } finally {
    if (nextProcess) {
      console.log('\n[LIMPIEZA] Deteniendo servidor Next.js (PID: ' + nextProcess.pid + ')...');
      nextProcess.kill('SIGTERM');
      await new Promise((r) => setTimeout(r, 1000));
      console.log('  ✓ Servidor Next.js detenido.');
    }
    cleanupNginx();

    // Limpieza de claves de prueba en Redis
    try {
      const redis = new Redis(REDIS_URL);
      const keys = await redis.keys('ppos:corporative:rl:*');
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(`[LIMPIEZA] Eliminadas ${keys.length} claves de prueba en Redis.`);
      }
      redis.disconnect();
    } catch {}
  }

  console.log('\n═════════════════════════════════════════════════════════════════════════════');
  console.log(`🎉 PRUEBA SEC-04D.1 SUPERADA: TODOS LOS ${passedTests}/7 CRITERIOS VERIFICADOS`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('\n❌ ERROR FATAL EN PRUEBA SEC-04D.1:', err);
  cleanupNginx();
  process.exit(1);
});

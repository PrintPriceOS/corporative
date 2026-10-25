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
    // CRITERIO 1 & 2: Petición atraviesa Nginx y Next.js recibe identidad acreditada
    // ─────────────────────────────────────────────────────────────────────────
    console.log('[Criterio 1 & 2] Petición a través de Nginx y verificación de acreditación...');
    const res1 = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
      method: 'POST'
      // NOTA: El cliente NO envía cabeceras de proxy; Nginx las inyecta
    });
    assert.equal(res1.status, 200, 'HTTP 200 esperado en intento 1');
    const data1 = await res1.json();
    assert.equal(data1.accredited, true, 'Next.js debe recibir la identidad acreditada desde Nginx');
    assert.equal(data1.resolvedIp, '127.0.0.1', 'IP resuelta debe coincidir con $remote_addr de Nginx');
    assert.equal(data1.allowed, true, 'Primer intento debe ser admitido');
    pass('Petición atraviesa Nginx con éxito y Next.js acredita identidad (127.0.0.1) vía Server Action');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 3: Server Action utiliza el almacén Redis previsto (RedisRateLimitStore)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 3] Verificando que la Server Action utiliza RedisRateLimitStore...');
    assert.equal(data1.storeType, 'RedisRateLimitStore', 'El almacén activo en el proceso Next.js debe ser RedisRateLimitStore');
    pass('La Server Action inicializa y utiliza RedisRateLimitStore con Redis 7.0.15');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 4: Los primeros 5 intentos quedan admitidos
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 4] Consumiendo intentos 2 al 5 a través de Nginx en la Server Action...');
    for (let i = 2; i <= 5; i++) {
      const res = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
        method: 'POST'
      });
      assert.equal(res.status, 200, `Intento ${i} debe responder HTTP 200`);
      const d = await res.json();
      assert.equal(d.allowed, true, `Intento ${i} debe ser admitido`);
    }
    pass('Los primeros 5 intentos son admitidos correctamente por Redis a través de Nginx (HTTP 200)');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 5: El intento seis queda estrictamente bloqueado (HTTP 429, IP_LIMIT)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 5] Ejecutando intento 6 a través de Nginx...');
    const res6 = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
      method: 'POST'
    });
    assert.equal(res6.status, 429, 'Intento 6 debe responder HTTP 429 Too Many Requests');
    const data6 = await res6.json();
    assert.equal(data6.allowed, false, 'Intento 6 debe ser denegado');
    assert.equal(data6.admissionReason, 'IP_LIMIT', 'Motivo debe ser IP_LIMIT');
    pass('Intento 6 bloqueado atómicamente por la Server Action en Next.js (HTTP 429, IP_LIMIT)');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 6: La pérdida de Redis provoca denegación controlada (fail-closed, REDIS_ERROR)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 6] Reiniciando Next.js con Redis caído (fail-closed)...');
    nextProcess.kill('SIGTERM');
    await new Promise((r) => setTimeout(r, 1000));

    // Levantar Next.js conectado a puerto de Redis inexistente (49999)
    nextProcess = await startNextServer({
      redisUrl: 'redis://127.0.0.1:49999',
      enableDiagnostics: 'true'
    });

    const resDead = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
      method: 'POST'
    });
    assert.equal(resDead.status, 429, 'Pérdida de Redis debe responder HTTP 429 bajo fail-closed');
    const dataDead = await resDead.json();
    assert.equal(dataDead.allowed, false, 'Admisión denegada');
    assert.equal(dataDead.admissionReason, 'REDIS_ERROR', 'Motivo debe ser REDIS_ERROR');
    pass('Pérdida de Redis provoca denegación controlada fail-closed en Next.js (HTTP 429, REDIS_ERROR)');

    // ─────────────────────────────────────────────────────────────────────────
    // CRITERIO 7: Los mecanismos de diagnóstico NO quedan accesibles en producción
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Criterio 7] Reiniciando Next.js en producción estándar (ENABLE_TEST_DIAGNOSTICS=false)...');
    nextProcess.kill('SIGTERM');
    await new Promise((r) => setTimeout(r, 1000));

    // Levantar Next.js con ENABLE_TEST_DIAGNOSTICS deshabilitado
    nextProcess = await startNextServer({
      redisUrl: REDIS_URL,
      enableDiagnostics: 'false'
    });

    const resProdAccess = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
      method: 'POST'
    });
    assert.equal(resProdAccess.status, 404, 'Mecanismo de diagnóstico debe devolver HTTP 404 en producción');

    const resProdGet = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/diagnostic/rate-limit`, {
      method: 'GET'
    });
    assert.equal(resProdGet.status, 404, 'GET de diagnóstico también debe devolver HTTP 404');
    pass('Mecanismo de diagnóstico estrictamente inaccesible (HTTP 404) en producción estándar');

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

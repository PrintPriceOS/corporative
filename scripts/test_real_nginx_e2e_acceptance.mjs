/**
 * scripts/test_real_nginx_e2e_acceptance.mjs
 * 
 * SEC-04C.3: Prueba de Aceptación HTTP End-to-End con Nginx Real, Backend Node.js y Redis Real
 * 
 * Arquitectura de la prueba:
 * [Cliente HTTP (curl/fetch)]
 *         │
 *         ▼ (puerto 3890 - Nginx Real)
 * [Nginx Staging Vhost Aislado]
 *   - Directiva: proxy_set_header X-PPOS-Proxy-Secret "<secreto_proxy>";
 *   - Directiva: proxy_set_header X-Real-IP $remote_addr;
 *   - Sobrescritura obligatoria de cabeceras cliente
 *         │
 *         ▼ (puerto 3891 - Loopback HTTP)
 * [Backend Node.js / Server Actions Sandbox]
 *   - resolveTrustedClientIp (acreditación con secreto y peerIp loopback)
 *   - checkAndRecordRateLimit (evaluación atómica Lua)
 *         │
 *         ▼ (puerto 6379)
 * [Redis Real 7.0.15]
 *   - Persistencia de cuotas
 *   - Coherencia TTL
 * 
 * Escenarios probados:
 * 1. Cliente legítimo a través de Nginx (sin secreto en cliente -> Nginx lo inyecta -> HTTP 200).
 * 2. Suplantación de X-Real-IP neutralizada por Nginx (Nginx sobrescribe con $remote_addr).
 * 3. Intento de bypass directo al puerto del backend (sin secreto -> no acreditado -> cuota anónima).
 * 4. Reciclado real de procesos Node (Worker 1 termina -> Worker 2 arranca -> contadores preservados en Redis).
 * 5. Falla de Redis (fail-closed a través de Nginx -> HTTP 429 con REDIS_ERROR, cero bypass).
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';
import assert from 'node:assert/strict';
import Redis from 'ioredis';

import crypto from 'node:crypto';
import { 
  resolveTrustedClientIp, 
  computeClientFingerprint,
  checkAndRecordRateLimit,
  setActiveRateLimitStore
} from '../lib/security';
import { 
  createRateLimitStore, 
  RedisRateLimitStore,
  resetRedisClientSingleton
} from '../lib/redisRateLimitStore';

const NGINX_TEST_PORT = 3890;
const BACKEND_PORT = 3891;
const PROXY_SECRET = process.env.PPOS_PROXY_SECRET || `sec04d_ephemeral_${crypto.randomBytes(32).toString('hex')}`;
const REDIS_URL = process.env.PPOS_REDIS_URL || process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const TEST_KEY_PREFIX = `sec04c_nginx_test_${Date.now()}:`;
const NGINX_CONF_PATH = '/etc/nginx/conf.d/sec04c_test_proxy.conf';

// Subproceso Worker del Backend HTTP
if (process.argv[2] === '--backend-worker') {
  const customRedisUrl = process.argv[3] || REDIS_URL;
  const failPolicy = process.argv[4] || 'closed';
  const customKeyPrefix = process.argv[5] || TEST_KEY_PREFIX;

  let store;
  if (customRedisUrl.includes('dead')) {
    store = new RedisRateLimitStore({
      async eval() {
        throw new Error('ECONNREFUSED: Redis is dead (simulated)');
      }
    }, { failPolicy: 'closed' });
  } else {
    store = createRateLimitStore({
      redisUrl: customRedisUrl,
      failPolicy,
      keyPrefix: customKeyPrefix
    });
  }
  setActiveRateLimitStore(store);

  const server = http.createServer(async (req, res) => {
    const peerIp = req.socket.remoteAddress?.replace(/^::ffff:/, '') || '127.0.0.1';
    const headerReader = {
      get(name) {
        const val = req.headers[name.toLowerCase()];
        return Array.isArray(val) ? val[0] : (val ?? null);
      }
    };

    const resolvedIp = resolveTrustedClientIp(headerReader, {
      proxySecret: PROXY_SECRET,
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
      rawXRealIp: req.headers['x-real-ip'] || null,
      hasSecretHeader: Boolean(req.headers['x-ppos-proxy-secret']),
      allowed: admission.allowed,
      admissionReason: admission.reason,
      remaining: admission.remaining
    }));
  });

  server.listen(BACKEND_PORT, '127.0.0.1', () => {
    console.log(`[BACKEND_WORKER_READY] PID:${process.pid}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });
} else {
  // Proceso Principal: Orquestador del Test End-to-End
  runMaster().catch((err) => {
    console.error('\n❌ ERROR EN TEST REAL NGINX E2E:', err);
    cleanupNginx();
    process.exit(1);
  });
}

function cleanupNginx() {
  try {
    if (fs.existsSync(NGINX_CONF_PATH)) {
      console.log(`[LIMPIEZA] Eliminando ${NGINX_CONF_PATH}...`);
      fs.unlinkSync(NGINX_CONF_PATH);
      execSync('nginx -s reload', { stdio: 'ignore' });
      console.log('  ✓ Nginx recargado tras limpieza de vhost de prueba');
    }
  } catch (err) {
    console.warn('[AVISO] No se pudo limpiar Nginx automáticamente:', err.message);
  }
}

async function spawnWorker(redisUrl = REDIS_URL, failPolicy = 'closed', keyPrefix = TEST_KEY_PREFIX) {
  return new Promise((resolve, reject) => {
    const tsxBin = path.join(process.cwd(), 'node_modules', '.bin', process.platform === 'win32' ? 'tsx.cmd' : 'tsx');
    const hasTsx = fs.existsSync(tsxBin);
    const runner = hasTsx ? tsxBin : process.execPath;
    const args = [
      process.argv[1],
      '--backend-worker',
      redisUrl,
      failPolicy,
      keyPrefix
    ];

    const child = spawn(runner, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'staging', PPOS_PROXY_SECRET: PROXY_SECRET }
    });

    let stdout = '';
    let started = false;

    child.stdout.on('data', (d) => {
      const text = d.toString();
      stdout += text;
      if (text.includes('[BACKEND_WORKER_READY]') && !started) {
        started = true;
        resolve(child);
      }
    });

    child.stderr.on('data', (d) => {
      console.error(`[Worker ${child.pid} ERR]:`, d.toString().trim());
    });

    child.on('exit', (code) => {
      if (!started) {
        reject(new Error(`Worker falló al arrancar con código ${code}: ${stdout}`));
      }
    });

    setTimeout(() => {
      if (!started) {
        child.kill();
        reject(new Error('Timeout esperando arranque de Worker'));
      }
    }, 5000);
  });
}

async function runMaster() {
  console.log('═════════════════════════════════════════════════════════════════════════════');
  console.log('🌐 SEC-04C.3: PRUEBA DE ACEPTACIÓN REAL HTTP: CLIENTE -> NGINX -> NODE -> REDIS');
  console.log(`   Host Nginx: 127.0.0.1:${NGINX_TEST_PORT}`);
  console.log(`   Host Backend Node: 127.0.0.1:${BACKEND_PORT}`);
  console.log(`   Host Redis Real: ${REDIS_URL}`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');

  let passedTests = 0;
  function pass(msg) {
    passedTests++;
    console.log(`  ✓ [NGINX-REAL-${passedTests}] ${msg}`);
  }

  // 1. Configurar vhost aislado en Nginx
  console.log('[Paso 1] Desplegando configuración de proxy en Nginx (/etc/nginx/conf.d/)...');
  const nginxConfig = `
# SEC-04C.3 Isolated Staging Test Proxy
server {
    listen 127.0.0.1:${NGINX_TEST_PORT};
    server_name sec04c-test.local;

    location / {
        proxy_pass http://127.0.0.1:${BACKEND_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        # Inyección del secreto seguro por parte del proxy acreditado:
        proxy_set_header X-PPOS-Proxy-Secret "${PROXY_SECRET}";
    }
}
`;

  fs.writeFileSync(NGINX_CONF_PATH, nginxConfig.trim());
  console.log(`  ✓ Archivo ${NGINX_CONF_PATH} creado.`);

  // Validar sintaxis Nginx y recargar
  execSync('nginx -t', { stdio: 'inherit' });
  execSync('nginx -s reload', { stdio: 'inherit' });
  console.log('  ✓ Nginx validado (nginx -t) y recargado con el vhost de prueba.\n');

  let currentWorker = null;

  try {
    // 2. Arrancar Worker 1 de Node
    console.log('[Paso 2] Arrancando Worker 1 de Node...');
    currentWorker = await spawnWorker(REDIS_URL, 'closed', TEST_KEY_PREFIX);
    console.log(`  ✓ Worker 1 activo en PID: ${currentWorker.pid}\n`);

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 1: Cliente legítimo a través de Nginx
    // (El cliente NO envía secreto; Nginx lo inyecta por configuración segura)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('[Escenario 1] Petición cliente a través de Nginx (sin secreto en cliente)...');
    const res1 = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/submit`, {
      method: 'POST',
      headers: {
        'User-Agent': 'Legitimate-Visitor/1.0',
        'Accept': 'application/json'
        // NOTA VITAL: Cliente NO envía 'x-ppos-proxy-secret'
      }
    });

    assert.equal(res1.status, 200, 'HTTP 200 retornado por la puerta de seguridad');
    const data1 = await res1.json();
    assert.equal(data1.accredited, true, 'Debe ser acreditado');
    assert.equal(data1.hasSecretHeader, true, 'Nginx debe haber inyectado la cabecera X-PPOS-Proxy-Secret');
    assert.equal(data1.allowed, true, 'Admisión concedida por Redis');
    assert.equal(data1.resolvedIp, '127.0.0.1', 'IP resuelta coincide con el remote_addr de Nginx');
    pass('Cliente legítimo vía Nginx: petición aceptada, secreto inyectado por proxy, admitido en Redis (HTTP 200)');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 2: Intento de falsificación de X-Real-IP a través de Nginx
    // (Cliente envía X-Real-IP: 203.0.113.199; Nginx debe sobrescribirla)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 2] Cliente intenta falsificar X-Real-IP a través de Nginx...');
    const res2 = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/submit`, {
      method: 'POST',
      headers: {
        'X-Real-IP': '203.0.113.199', // IP de la víctima
        'User-Agent': 'Attacker-Browser/1.0'
      }
    });

    const data2 = await res2.json();
    // Nginx reemplaza el X-Real-IP entrante por $remote_addr (127.0.0.1)
    assert.equal(data2.rawXRealIp, '127.0.0.1', 'Nginx debe haber sobrescrito X-Real-IP con 127.0.0.1');
    assert.notEqual(data2.resolvedIp, '203.0.113.199', 'El backend NO debe adoptar la IP falsificada');
    pass('Falsificación de X-Real-IP frustrada por Nginx: $remote_addr sobrescribe cualquier cabecera cliente');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 3: Intento de bypass directo al backend (sin pasar por Nginx)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 3] Intento de acceso directo al backend (puerto 3891, eludiendo Nginx)...');
    const res3 = await fetch(`http://127.0.0.1:${BACKEND_PORT}/api/submit`, {
      method: 'POST',
      headers: {
        'X-Real-IP': '203.0.113.199',
        'User-Agent': 'Direct-Probe/1.0'
      }
    });

    const data3 = await res3.json();
    assert.equal(data3.accredited, false, 'Sin secreto de proxy, el acceso directo no debe ser acreditado');
    assert.equal(data3.resolvedIp, null, 'IP resuelta debe ser null');
    assert.equal(data3.hasSecretHeader, false, 'No hay secreto inyectado');
    pass('Bypass directo frustrado: conexiones directas sin secreto de proxy quedan sin acreditar (IP null)');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 4: Reciclado real de procesos Node y persistencia en Redis
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 4] Verificando persistencia ante reciclado REAL de procesos OS...');
    
    // Escenarios 1 y 2 consumieron ya 2 intentos sobre la IP 127.0.0.1 en Worker 1.
    // Consumir 1 intento adicional en Worker 1 para acumular exactamente 3 intentos.
    const resW1_3 = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/submit`, {
      method: 'POST',
      headers: { 'User-Agent': 'Recycle-Test/1.0' }
    });
    const dataW1_3 = await resW1_3.json();
    assert.equal(dataW1_3.allowed, true, 'Intento 3 debe ser admitido por Worker 1');
    console.log(`    -> Worker 1 (PID: ${currentWorker.pid}) procesó 3 intentos acumulados para 127.0.0.1.`);

    // FINALIZAR COMPLETAMENTE EL PROCESO WORKER 1 (Simulando reciclado / muerte de Passenger)
    console.log(`    -> Terminando proceso Worker 1 (PID: ${currentWorker.pid})...`);
    currentWorker.kill('SIGTERM');
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('    -> Worker 1 finalizado.');

    // ARRANCAR WORKER 2 COMO UN PROCESO OS COMPLETAMENTE NUEVO
    console.log('    -> Arrancando Worker 2 como nuevo proceso independiente...');
    const worker2 = await spawnWorker(REDIS_URL, 'closed', TEST_KEY_PREFIX);
    currentWorker = worker2;
    console.log(`  ✓ Worker 2 activo en nuevo PID: ${worker2.pid}`);

    // Intentos 4 y 5 con Worker 2 a través de Nginx: deben permitirse (máximo por IP = 5)
    for (let i = 4; i <= 5; i++) {
      const r = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/submit`, {
        method: 'POST',
        headers: { 'User-Agent': 'Recycle-Test/2.0' }
      });
      const d = await r.json();
      assert.equal(d.allowed, true, `Intento ${i} debe ser admitido`);
    }
    console.log('    -> Worker 2 admitió intentos 4 y 5 (acumulado: 5).');

    // Intento 6 a través de Nginx: debe ser BLOQUEADO por cuota acumulada en Redis
    const resBlocked = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/submit`, {
      method: 'POST',
      headers: { 'User-Agent': 'Recycle-Test/2.0' }
    });
    const dataBlocked = await resBlocked.json();
    assert.equal(resBlocked.status, 429, 'HTTP 429 esperado en intento 6');
    assert.equal(dataBlocked.allowed, false, 'Intento 6 bloqueado por cuota');
    assert.equal(dataBlocked.admissionReason, 'IP_LIMIT', 'Razón es IP_LIMIT');
    pass('Reciclado real de procesos comprobado: Worker 2 hereda la cuota intacta de Redis y bloquea el intento 6');

    // ─────────────────────────────────────────────────────────────────────────
    // ESCENARIO 5: Falla de Redis (Fail-Closed en Nginx Real)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Escenario 5] Verificando fail-closed ante indisponibilidad de Redis...');
    
    // Matar Worker 2
    currentWorker.kill('SIGTERM');
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Arrancar Worker 3 configurado con Redis caído
    const workerDead = await spawnWorker('dead', 'closed', TEST_KEY_PREFIX);
    currentWorker = workerDead;
    console.log(`    -> Worker 3 (Redis caído) activo en PID: ${workerDead.pid}`);

    const resDead = await fetch(`http://127.0.0.1:${NGINX_TEST_PORT}/api/submit`, {
      method: 'POST',
      headers: { 'User-Agent': 'Fail-Closed-Check/1.0' }
    });

    assert.equal(resDead.status, 429, 'HTTP 429 ante falla de Redis');
    const dataDead = await resDead.json();
    assert.equal(dataDead.allowed, false, 'Admisión denegada');
    assert.equal(dataDead.admissionReason, 'REDIS_ERROR', 'Razón debe ser REDIS_ERROR');
    pass('Fail-closed ante falla de Redis verificado a través de Nginx real (HTTP 429, REDIS_ERROR, cero bypass)');

  } finally {
    if (currentWorker) {
      currentWorker.kill('SIGTERM');
    }
    cleanupNginx();

    // Limpieza de claves en Redis
    const redis = new Redis(REDIS_URL);
    const keys = await redis.keys(`${TEST_KEY_PREFIX}*`);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`[LIMPIEZA] Eliminadas ${keys.length} claves de prueba en Redis.`);
    }
    redis.disconnect();
  }

  console.log('\n═════════════════════════════════════════════════════════════════════════════');
  console.log(`🎉 PRUEBA DE ACEPTACIÓN REAL NGINX COMPLETADA: ${passedTests}/5 ESCENARIOS SUPERADOS`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');
}

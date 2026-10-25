/**
 * scripts/test_real_redis_multiprocess_runner.mjs
 * 
 * SEC-04C.2 Phase B — Self-Contained Real Redis Multi-Process Concurrency Runner
 * Executes on real Redis 7.0.15 with two independent child processes (Process A and Process B).
 */

import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import Redis from 'ioredis';

const REDIS_URL = process.env.PPOS_REDIS_URL || process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const TEST_PREFIX = `ppos:test:sec04c:${Date.now()}:`;
const SHARED_IP_KEY = 'ip:203.0.113.88';
const SHARED_FP_KEY = 'fp:shared_client_fingerprint_xyz';
const GLOBAL_UNACC_KEY = 'unaccredited:global';
const WINDOW_MS = 3600000; // 1 hour

// Lua scripts
const ATOMIC_ADMIT_SCRIPT = `
local key = KEYS[1]
local window_ms = tonumber(ARGV[1])
local max_allowed = tonumber(ARGV[2])

local current = redis.call('INCR', key)
if current == 1 then
  redis.call('PEXPIRE', key, window_ms)
end

local ttl = redis.call('PTTL', key)
if ttl < 0 then
  redis.call('PEXPIRE', key, window_ms)
  ttl = window_ms
end

local allowed = 0
if current <= max_allowed then
  allowed = 1
end

return {allowed, current, ttl}
`;

const ATOMIC_UNACCREDITED_ADMIT_SCRIPT = `
local global_key = KEYS[1]
local fp_key = KEYS[2]
local window_ms = tonumber(ARGV[1])
local max_global = tonumber(ARGV[2])
local max_fp = tonumber(ARGV[3])

local global_val = tonumber(redis.call('GET', global_key) or '0')
local fp_val = tonumber(redis.call('GET', fp_key) or '0')

if global_val >= max_global then
  local ttl = redis.call('PTTL', global_key)
  return {0, global_val, ttl, 'GLOBAL_LIMIT'}
end

if fp_val >= max_fp then
  local ttl = redis.call('PTTL', fp_key)
  return {0, fp_val, ttl, 'FP_LIMIT'}
end

local new_global = redis.call('INCR', global_key)
if new_global == 1 then
  redis.call('PEXPIRE', global_key, window_ms)
end

local new_fp = redis.call('INCR', fp_key)
if new_fp == 1 then
  redis.call('PEXPIRE', fp_key, window_ms)
end

local ttl = redis.call('PTTL', fp_key)
return {1, new_fp, ttl, 'ALLOWED'}
`;

class RedisRateLimitStore {
  constructor(client, options = {}) {
    this.client = client;
    this.prefix = options.prefix || 'ppos:corporative:rl:';
    this.defaultWindowMs = options.windowMs || 3600000;
    this.failPolicy = options.failPolicy || 'closed';
  }

  key(k) { return this.prefix + k; }

  async admitAttempt(k, maxAttempts = 5, windowMs = this.defaultWindowMs) {
    try {
      const raw = await this.client.eval(ATOMIC_ADMIT_SCRIPT, 1, this.key(k), String(windowMs), String(maxAttempts));
      const allowed = Number(raw[0]) === 1;
      const count = Number(raw[1]);
      const ttlMs = Number(raw[2]);
      return { allowed, count, ttlMs, reason: allowed ? 'ALLOWED' : 'IP_LIMIT' };
    } catch (err) {
      if (this.failPolicy === 'closed') {
        return { allowed: false, count: maxAttempts + 1, ttlMs: windowMs, reason: 'REDIS_ERROR' };
      }
      return { allowed: true, count: 1, ttlMs: windowMs, reason: 'ALLOWED' };
    }
  }

  async admitUnaccreditedAttempt(fpK, globalK = 'unaccredited:global', maxFp = 5, maxGlobal = 50, windowMs = this.defaultWindowMs) {
    try {
      const raw = await this.client.eval(ATOMIC_UNACCREDITED_ADMIT_SCRIPT, 2, this.key(globalK), this.key(fpK), String(windowMs), String(maxGlobal), String(maxFp));
      const allowed = Number(raw[0]) === 1;
      const count = Number(raw[1]);
      const ttlMs = Number(raw[2]);
      const reasonTag = String(raw[3]);
      return { allowed, count, ttlMs, reason: reasonTag };
    } catch (err) {
      if (this.failPolicy === 'closed') {
        return { allowed: false, count: maxFp + 1, ttlMs: windowMs, reason: 'REDIS_ERROR' };
      }
      return { allowed: true, count: 1, ttlMs: windowMs, reason: 'ALLOWED' };
    }
  }
}

// Worker process handler
if (process.argv[2] === '--worker') {
  const payload = JSON.parse(process.argv[3]);
  const client = new Redis(payload.redisUrl, { connectTimeout: 3000, commandTimeout: 2000, maxRetriesPerRequest: 1 });
  const store = new RedisRateLimitStore(client, { prefix: payload.prefix });

  try {
    const { task, args } = payload;
    if (task === 'consume_ip') {
      const results = [];
      for (let i = 0; i < args.count; i++) {
        const res = await store.admitAttempt(args.key, args.max || 5, WINDOW_MS);
        results.push(res);
      }
      console.log(JSON.stringify({ status: 'ok', results }));
    } else if (task === 'consume_unaccredited') {
      const results = [];
      for (let i = 0; i < args.count; i++) {
        const res = await store.admitUnaccreditedAttempt(args.fpKey, args.globalKey, args.maxFp || 5, args.maxGlobal || 50, WINDOW_MS);
        results.push(res);
      }
      console.log(JSON.stringify({ status: 'ok', results }));
    } else if (task === 'fail_closed_test') {
      const deadClient = new Redis('redis://127.0.0.1:63999', { connectTimeout: 500, commandTimeout: 500, maxRetriesPerRequest: 0, retryStrategy: () => null });
      const deadStore = new RedisRateLimitStore(deadClient, { prefix: payload.prefix, failPolicy: 'closed' });
      const res = await deadStore.admitAttempt('ip:fail.test', 5, WINDOW_MS);
      try { deadClient.disconnect(); } catch {}
      console.log(JSON.stringify({ status: 'ok', result: res }));
    }
    client.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Worker error:', err);
    try { client.disconnect(); } catch {}
    process.exit(1);
  }
}

// Orchestrator Helper to run a worker
function runWorker(workerName, task, args = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ task, args, prefix: TEST_PREFIX, redisUrl: REDIS_URL });
    const scriptPath = process.argv[1];
    const child = spawn(process.execPath, [
      scriptPath,
      '--worker',
      payload
    ], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, PPOS_REDIS_URL: REDIS_URL }
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', d => { stdout += d.toString(); });
    child.stderr.on('data', d => { stderr += d.toString(); });

    child.on('close', code => {
      if (code !== 0) {
        return reject(new Error(`Worker [${workerName}] failed (code ${code}): ${stderr || stdout}`));
      }
      try {
        const lastLine = stdout.trim().split('\n').pop();
        const parsed = JSON.parse(lastLine);
        resolve({ workerName, stdout, result: parsed });
      } catch (e) {
        resolve({ workerName, stdout, raw: stdout });
      }
    });
  });
}

// Orchestrator
async function runOrchestrator() {
  console.log('═════════════════════════════════════════════════════════════════════════════');
  console.log('🧪 PPOS REAL REDIS MULTI-PROCESS CONCURRENCY TEST (SEC-04C.2)');
  console.log('═════════════════════════════════════════════════════════════════════════════');
  console.log(`Connecting to Real Redis at: ${REDIS_URL}`);

  const redis = new Redis(REDIS_URL, { connectTimeout: 5000, commandTimeout: 3000 });
  
  // 1. Verify Redis connectivity
  const pong = await redis.ping();
  assert.equal(pong, 'PONG', 'Redis PING must return PONG');
  const info = await redis.info('server');
  const versionMatch = info.match(/redis_version:([^\r\n]+)/);
  const redisVersion = versionMatch ? versionMatch[1] : 'unknown';
  console.log(`✓ Real Redis connected successfully (Version: ${redisVersion})`);

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // TEST 1: Process A consumes 3 attempts on IP
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Fase B.1] Proceso A ejecuta 3 intentos...');
    const outA1 = await runWorker('Proceso A', 'consume_ip', { key: SHARED_IP_KEY, count: 3, max: 5 });
    const resultsA1 = outA1.result.results;
    assert.equal(resultsA1.length, 3);
    assert.equal(resultsA1[0].allowed, true);
    assert.equal(resultsA1[0].count, 1);
    assert.equal(resultsA1[1].allowed, true);
    assert.equal(resultsA1[1].count, 2);
    assert.equal(resultsA1[2].allowed, true);
    assert.equal(resultsA1[2].count, 3);
    console.log('  ✓ Proceso A completó 3 intentos admitidos (contadores: 1, 2, 3)');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 2: Process B consumes 2 attempts on same IP
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Fase B.2] Proceso B ejecuta 2 intentos sobre la misma clave...');
    const outB1 = await runWorker('Proceso B', 'consume_ip', { key: SHARED_IP_KEY, count: 2, max: 5 });
    const resultsB1 = outB1.result.results;
    assert.equal(resultsB1.length, 2);
    assert.equal(resultsB1[0].allowed, true);
    assert.equal(resultsB1[0].count, 4);
    assert.equal(resultsB1[1].allowed, true);
    assert.equal(resultsB1[1].count, 5);
    console.log('  ✓ Proceso B completó 2 intentos admitidos (contadores: 4, 5)');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 3: Attempt 6 executed from Process A -> Must be REJECTED
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Fase B.3] Proceso A ejecuta el intento 6...');
    const outA2 = await runWorker('Proceso A', 'consume_ip', { key: SHARED_IP_KEY, count: 1, max: 5 });
    const resA6 = outA2.result.results[0];
    assert.equal(resA6.allowed, false, 'Intento 6 desde Proceso A debe ser rechazado');
    assert.equal(resA6.count, 6);
    assert.equal(resA6.reason, 'IP_LIMIT');
    console.log('  ✓ Proceso A fue bloqueado en intento 6 (allowed: false, reason: IP_LIMIT)');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 4: Attempt 7 executed from Process B -> Must be REJECTED
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Fase B.4] Proceso B ejecuta el intento 7...');
    const outB2 = await runWorker('Proceso B', 'consume_ip', { key: SHARED_IP_KEY, count: 1, max: 5 });
    const resB7 = outB2.result.results[0];
    assert.equal(resB7.allowed, false, 'Intento 7 desde Proceso B debe ser rechazado');
    assert.equal(resB7.count, 7);
    assert.equal(resB7.reason, 'IP_LIMIT');
    console.log('  ✓ Proceso B fue bloqueado en intento 7 (allowed: false, reason: IP_LIMIT)');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 5: Verify TTL coherence in real Redis
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Fase B.5] Verificando coherencia del TTL en Redis...');
    const actualTtl = await redis.pttl(`${TEST_PREFIX}${SHARED_IP_KEY}`);
    assert.equal(actualTtl > 0, true, 'TTL en Redis debe ser positivo');
    assert.equal(actualTtl <= WINDOW_MS, true, 'TTL debe ser <= 3600000 ms');
    console.log(`  ✓ TTL coherente en Redis: ${actualTtl} ms restantes (~${Math.round(actualTtl / 60000)} minutos)`);

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 6: Multi-process unaccredited cap (fingerprint + global circuit breaker)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Fase B.6] Verificando cuota de tráfico no acreditado en múltiples procesos...');
    // Proceso A consume 3 de huella
    const outUnaccA = await runWorker('Proceso A', 'consume_unaccredited', { fpKey: SHARED_FP_KEY, globalKey: GLOBAL_UNACC_KEY, count: 3, maxFp: 5, maxGlobal: 50 });
    assert.equal(outUnaccA.result.results[2].allowed, true);
    assert.equal(outUnaccA.result.results[2].count, 3);

    // Proceso B consume 2 de huella
    const outUnaccB = await runWorker('Proceso B', 'consume_unaccredited', { fpKey: SHARED_FP_KEY, globalKey: GLOBAL_UNACC_KEY, count: 2, maxFp: 5, maxGlobal: 50 });
    assert.equal(outUnaccB.result.results[1].allowed, true);
    assert.equal(outUnaccB.result.results[1].count, 5);

    // Proceso A intenta el 6to de huella -> Bloqueado por FP_LIMIT
    const outUnaccA6 = await runWorker('Proceso A', 'consume_unaccredited', { fpKey: SHARED_FP_KEY, globalKey: GLOBAL_UNACC_KEY, count: 1, maxFp: 5, maxGlobal: 50 });
    assert.equal(outUnaccA6.result.results[0].allowed, false);
    assert.equal(outUnaccA6.result.results[0].reason, 'FP_LIMIT');
    console.log('  ✓ Límite de huella compartido entre procesos: intento 6 bloqueado (FP_LIMIT)');

    // Proceso B satura el cortafuegos global (45 restantes para llegar a 50)
    for (let i = 6; i <= 50; i++) {
      await redis.incr(`${TEST_PREFIX}${GLOBAL_UNACC_KEY}`);
    }
    // Proceso A intenta con nueva huella -> Bloqueado por GLOBAL_LIMIT
    const outUnaccGlobal = await runWorker('Proceso A', 'consume_unaccredited', { fpKey: 'fp:new_rotated_bot', globalKey: GLOBAL_UNACC_KEY, count: 1, maxFp: 5, maxGlobal: 50 });
    assert.equal(outUnaccGlobal.result.results[0].allowed, false);
    assert.equal(outUnaccGlobal.result.results[0].reason, 'GLOBAL_LIMIT');
    console.log('  ✓ Cortafuegos global no acreditado (50 envíos) bloquea intentos subsiguientes (GLOBAL_LIMIT)');

    // ─────────────────────────────────────────────────────────────────────────
    // TEST 7: Fail-closed verification
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n[Fase B.7] Verificando política fail-closed ante indisponibilidad de Redis...');
    const outFailClosed = await runWorker('Proceso A', 'fail_closed_test', {});
    assert.equal(outFailClosed.result.result.allowed, false, 'Ante indisponibilidad de Redis, la puerta debe cerrarse');
    assert.equal(outFailClosed.result.result.reason, 'REDIS_ERROR');
    console.log('  ✓ Política fail-closed demostrada: indisponibilidad de Redis bloquea por seguridad (REDIS_ERROR)');

    console.log('\n═════════════════════════════════════════════════════════════════════════════');
    console.log('🎉 TODAS LAS PRUEBAS DE CONCURRENCIA REAL EN REDIS SUPERADAS');
    console.log('═════════════════════════════════════════════════════════════════════════════\n');

  } finally {
    // Clean up test keys
    const testKeys = await redis.keys(`${TEST_PREFIX}*`);
    if (testKeys.length > 0) {
      await redis.del(...testKeys);
      console.log(`[LIMPIEZA] Eliminadas ${testKeys.length} claves de prueba aisladas.`);
    }
    redis.disconnect();
  }
}

if (process.argv[2] !== '--worker') {
  runOrchestrator().catch(err => {
    console.error('Test error:', err);
    process.exit(1);
  });
}

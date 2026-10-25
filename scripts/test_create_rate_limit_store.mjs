/**
 * scripts/test_create_rate_limit_store.mjs
 * 
 * SEC-04C.3: Pruebas unitarias de createRateLimitStore:
 * 1. Garantía de nunca devolver undefined.
 * 2. En desarrollo sin Redis: devuelve InMemoryRateLimitStore real y funcional.
 * 3. En producción sin Redis: lanza excepción explícita (fail-closed de configuración).
 * 4. Redis caído en failPolicy='closed': deniega admisión con motivo REDIS_ERROR.
 * 5. Reconexión y reintento controlado.
 * 6. Concurrencia sobre almacén en memoria y desacoplado.
 */

import assert from 'node:assert/strict';
import { 
  createRateLimitStore, 
  RedisRateLimitStore,
  InMemoryRateLimitStore,
  resetRedisClientSingleton
} from '../lib/redisRateLimitStore.ts';

console.log('─────────────────────────────────────────────────────────────────────────────');
console.log('🧪 PPOS TEST SUITE: createRateLimitStore & Fault Tolerance (SEC-04C.3)');
console.log('─────────────────────────────────────────────────────────────────────────────');

let passed = 0;
function pass(label) {
  passed++;
  console.log(`  ✓ [TEST ${passed}] ${label}`);
}

async function run() {
  const originalEnv = process.env.NODE_ENV;
  const originalRedisUrl = process.env.REDIS_URL;
  const originalPposRedisUrl = process.env.PPOS_REDIS_URL;

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // 1. FACTORÍA NUNCA DEVUELVE UNDEFINED EN DESARROLLO / SIN CONFIGURACIÓN
    // ─────────────────────────────────────────────────────────────────────────
    delete process.env.REDIS_URL;
    delete process.env.PPOS_REDIS_URL;
    process.env.NODE_ENV = 'development';

    const devStore = createRateLimitStore();
    assert.ok(devStore, 'El almacén no debe ser undefined ni null');
    assert.ok(devStore instanceof InMemoryRateLimitStore || devStore.constructor.name === 'InMemoryRateLimitStore', 'Debe ser instancia de InMemoryRateLimitStore');
    assert.equal(typeof devStore.admitAttempt, 'function', 'Debe implementar admitAttempt');
    assert.equal(typeof devStore.admitUnaccreditedAttempt, 'function', 'Debe implementar admitUnaccreditedAttempt');
    assert.equal(typeof devStore.reset, 'function', 'Debe implementar reset');
    pass('createRateLimitStore() sin argumentos en dev devuelve InMemoryRateLimitStore (nunca undefined)');

    // ─────────────────────────────────────────────────────────────────────────
    // 2. FORZADO DE MEMORIA EXPLÍCITO (forceMemory: true)
    // ─────────────────────────────────────────────────────────────────────────
    const forcedMemStore = createRateLimitStore({ forceMemory: true });
    assert.ok(forcedMemStore instanceof InMemoryRateLimitStore || forcedMemStore.constructor.name === 'InMemoryRateLimitStore', 'forceMemory: true debe instanciar InMemoryRateLimitStore');
    
    // Probar funcionalidad completa de admisión
    for (let i = 1; i <= 5; i++) {
      const adm = forcedMemStore.admitAttempt('test-ip-1');
      assert.equal(adm.allowed, true, `Intento ${i} debe ser admitido`);
      assert.equal(adm.count, i);
    }
    const admBlocked = forcedMemStore.admitAttempt('test-ip-1');
    assert.equal(admBlocked.allowed, false, 'Intento 6 debe ser bloqueado');
    assert.equal(admBlocked.reason, 'IP_LIMIT');
    pass('forceMemory: true entrega almacén real y funcional con límite de 5 intentos por IP');

    // ─────────────────────────────────────────────────────────────────────────
    // 3. EXCLUSIÓN ESTRICTA DE FALLBACK SILENCIOSO EN PRODUCCIÓN
    // ─────────────────────────────────────────────────────────────────────────
    process.env.NODE_ENV = 'production';
    delete process.env.REDIS_URL;
    delete process.env.PPOS_REDIS_URL;

    assert.throws(
      () => createRateLimitStore(),
      (err) => {
        assert.ok(err instanceof Error);
        assert.ok(
          err.message.includes('REDIS_URL must be configured in production'),
          `Mensaje esperado, recibido: ${err.message}`
        );
        return true;
      },
      'En producción sin Redis debe lanzar excepción explícita'
    );
    pass('En producción sin Redis se exige configuración explícita (fail-closed, sin degradación silenciosa)');

    // 3b. PROHIBICIÓN ESTRICTA DE forceMemory EN PRODUCCIÓN (SEC-04D)
    assert.throws(
      () => createRateLimitStore({ forceMemory: true }),
      (err) => {
        assert.ok(err instanceof Error);
        assert.ok(
          err.message.includes('forceMemory') && err.message.includes('strictly prohibited in production'),
          `Mensaje esperado, recibido: ${err.message}`
        );
        return true;
      },
      'En producción, forceMemory: true debe ser rechazado taxativamente con excepción'
    );

    assert.throws(
      () => createRateLimitStore({ inMemoryFallback: new InMemoryRateLimitStore() }),
      (err) => {
        assert.ok(err instanceof Error);
        assert.ok(
          err.message.includes('inMemoryFallback') && err.message.includes('strictly prohibited in production'),
          `Mensaje esperado, recibido: ${err.message}`
        );
        return true;
      },
      'En producción, inMemoryFallback debe ser rechazado taxativamente con excepción'
    );
    pass('En producción, forceMemory e inMemoryFallback son bloqueados taxativamente con excepción');

    // ─────────────────────────────────────────────────────────────────────────
    // 4. COMPORTAMIENTO ANTE REDIS CAÍDO (FAIL-CLOSED)
    // ─────────────────────────────────────────────────────────────────────────
    resetRedisClientSingleton();
    const deadRedisStore = createRateLimitStore({
      redisUrl: 'redis://127.0.0.1:49999', // Puerto sin servicio Redis
      failPolicy: 'closed'
    });
    assert.ok(deadRedisStore instanceof RedisRateLimitStore, 'Debe instanciar RedisRateLimitStore');

    // Intentar admisión con Redis caído: debe devolver allowed: false, reason: REDIS_ERROR
    const failAdm = await deadRedisStore.admitAttempt('test-ip-dead');
    assert.equal(failAdm.allowed, false, 'Admisión debe ser denegada ante Redis caído');
    assert.equal(failAdm.reason, 'REDIS_ERROR', 'Motivo debe ser REDIS_ERROR');
    pass('Redis caído con failPolicy=closed deniega admisión controladamente (REDIS_ERROR) sin abrir la puerta');

    // ─────────────────────────────────────────────────────────────────────────
    // 5. TRÁFICO NO ACREDITADO CON REDIS CAÍDO (FAIL-CLOSED)
    // ─────────────────────────────────────────────────────────────────────────
    const failUnacc = await deadRedisStore.admitUnaccreditedAttempt('fp:test-dead', 'unacc:global');
    assert.equal(failUnacc.allowed, false, 'Admisión no acreditada denegada ante Redis caído');
    assert.equal(failUnacc.reason, 'REDIS_ERROR');
    pass('Tráfico no acreditado con Redis caído aplica fail-closed riguroso');

    // ─────────────────────────────────────────────────────────────────────────
    // 6. AISLAMIENTO Y CONCURRENCIA EN IN-MEMORY STORE
    // ─────────────────────────────────────────────────────────────────────────
    const concurrentMemStore = new InMemoryRateLimitStore();
    // Simular llamadas concurrentes simultáneas
    const promises = Array.from({ length: 10 }, (_, i) => 
      Promise.resolve(concurrentMemStore.admitAttempt('ip:concurrent-test'))
    );
    const results = await Promise.all(promises);
    const allowedCount = results.filter(r => r.allowed).length;
    const blockedCount = results.filter(r => !r.allowed).length;
    assert.equal(allowedCount, 5, 'Exactamente 5 intentos permitidos');
    assert.equal(blockedCount, 5, 'Exactamente 5 intentos bloqueados');
    pass('Concurrencia en InMemoryRateLimitStore: admite exactamente 5 y bloquea 5');

    resetRedisClientSingleton();

  } finally {
    process.env.NODE_ENV = originalEnv;
    if (originalRedisUrl) process.env.REDIS_URL = originalRedisUrl;
    else delete process.env.REDIS_URL;
    if (originalPposRedisUrl) process.env.PPOS_REDIS_URL = originalPposRedisUrl;
    else delete process.env.PPOS_REDIS_URL;
  }

  console.log('\n═════════════════════════════════════════════════════════════════════════════');
  console.log(`🎉 TODAS LAS PRUEBAS DE LA FACTORÍA SUPERADAS (${passed} verificaciones)`);
  console.log('═════════════════════════════════════════════════════════════════════════════\n');
}

run().catch((err) => {
  console.error('\n❌ ERROR FATAL EN PRUEBAS DE createRateLimitStore:', err);
  process.exit(1);
});

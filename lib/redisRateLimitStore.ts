/**
 * PPOS SEC-04C: Redis-backed Atomic Rate Limit Store
 * 
 * Implements atomic fixed-window quotas using Redis Lua scripts:
 * 1. Single atomic admission operation: checks quota and increments in one evaluation.
 * 2. Concurrency-safe: Attempt 6 is atomically rejected across any number of workers.
 * 3. Multi-key unaccredited quota: atomically enforces per-fingerprint and global circuit breaker.
 * 4. Pluggable client interface (RedisEvalClient) compatible with node-redis and ioredis.
 * 5. Explicit failure policy: in production, fails closed on Redis downtime to prevent unmetered abuse.
 */
import IORedis from 'ioredis';
import { InMemoryRateLimitStore, type IRateLimitStore } from './inMemoryRateLimitStore';
export { InMemoryRateLimitStore, type IRateLimitStore };

export interface RateLimitEntry {
    count: number;
    timestamp: number;
}

export interface RateLimitAdmission {
    allowed: boolean;
    count: number;
    ttlMs: number;
    reason?: 'ALLOWED' | 'IP_LIMIT' | 'FP_LIMIT' | 'GLOBAL_LIMIT' | 'REDIS_ERROR';
}

export interface RedisEvalClient {
    eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<unknown>;
}

export interface RedisStoreOptions {
    prefix?: string;
    windowMs?: number;
    failPolicy?: 'closed' | 'open';
}

// Lua Script 1: Atomic Admission for accredited IP
// Increments counter, sets TTL on first creation, and checks threshold atomically.
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

// Lua Script 2: Atomic Admission for unaccredited traffic (Fingerprint + Global cap)
// Enforces global circuit breaker and per-client fingerprint simultaneously without race conditions.
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

const READ_SCRIPT = `
local n = tonumber(redis.call('GET', KEYS[1]) or '0')
local ttl = redis.call('PTTL', KEYS[1])
return {n, ttl}
`;

export class RedisRateLimitStore {
    private client: RedisEvalClient;
    private prefix: string;
    private defaultWindowMs: number;
    private failPolicy: 'closed' | 'open';

    constructor(
        client: RedisEvalClient,
        options?: RedisStoreOptions
    ) {
        this.client = client;
        this.prefix = options?.prefix ?? 'ppos:corporative:rl:';
        this.defaultWindowMs = options?.windowMs ?? 3600000; // 1 hour default
        this.failPolicy = options?.failPolicy ?? (process.env.NODE_ENV === 'production' ? 'closed' : 'open');

        if (!Number.isSafeInteger(this.defaultWindowMs) || this.defaultWindowMs <= 0) {
            throw new Error('Invalid default rate limit window');
        }
        if (!/^[-\w:]+$/.test(this.prefix)) {
            throw new Error('Invalid Redis key prefix format');
        }
    }

    private key(key: string): string {
        if (!key || key.length > 256) {
            throw new Error('Invalid rate-limit key: length must be between 1 and 256 characters');
        }
        return this.prefix + key;
    }

    private parseTuple(value: unknown): [number, number] {
        if (!Array.isArray(value) || value.length < 2) {
            throw new Error('Invalid Redis response structure: expected array');
        }
        const count = Number(value[0]);
        const ttl = Number(value[1]);
        if (!Number.isSafeInteger(count) || count < 0 || !Number.isSafeInteger(ttl)) {
            throw new Error('Invalid Redis counter or TTL received');
        }
        return [count, ttl];
    }

    /**
     * Reads current usage for a key without incrementing.
     */
    async get(key: string): Promise<RateLimitEntry | null> {
        try {
            const raw = await this.client.eval(READ_SCRIPT, {
                keys: [this.key(key)],
                arguments: []
            });
            const [count, ttl] = this.parseTuple(raw);
            if (count === 0 || ttl <= 0) return null;
            return { count, timestamp: Date.now() - (this.defaultWindowMs - ttl) };
        } catch (err) {
            if (this.failPolicy === 'closed') {
                console.error('[SECURITY][REDIS_STORE] Error reading key from Redis:', err);
                throw err;
            }
            return null;
        }
    }

    /**
     * Increments a key by 1 and updates TTL.
     */
    async increment(key: string, windowMs: number = this.defaultWindowMs): Promise<RateLimitEntry> {
        if (!Number.isSafeInteger(windowMs) || windowMs <= 0) {
            throw new Error('Invalid rate-limit windowMs');
        }
        const raw = await this.client.eval(ATOMIC_ADMIT_SCRIPT, {
            keys: [this.key(key)],
            arguments: [String(windowMs), '999999'] // High threshold for pure increment
        });
        if (!Array.isArray(raw) || raw.length < 3) {
            throw new Error('Invalid response from Redis atomic admission script');
        }
        const count = Number(raw[1]);
        const ttl = Number(raw[2]);
        return { count, timestamp: Date.now() - (windowMs - ttl) };
    }

    /**
     * Single atomic admission check-and-record for accredited IP:
     * Increments count and checks against max in one atomic Lua evaluation.
     */
    async admitAttempt(
        key: string,
        maxAttempts: number = 5,
        windowMs: number = this.defaultWindowMs
    ): Promise<RateLimitAdmission> {
        try {
            const raw = await this.client.eval(ATOMIC_ADMIT_SCRIPT, {
                keys: [this.key(key)],
                arguments: [String(windowMs), String(maxAttempts)]
            });

            if (!Array.isArray(raw) || raw.length < 3) {
                throw new Error('Invalid response from Redis admission script');
            }

            const allowed = Number(raw[0]) === 1;
            const count = Number(raw[1]);
            const ttlMs = Number(raw[2]);

            return {
                allowed,
                count,
                ttlMs,
                reason: allowed ? 'ALLOWED' : 'IP_LIMIT'
            };
        } catch (err) {
            console.error('[SECURITY][REDIS_STORE] Admission check failed:', err);
            if (this.failPolicy === 'closed') {
                // In production, fail closed to prevent DDoS or brute force during Redis outage
                return {
                    allowed: false,
                    count: maxAttempts + 1,
                    ttlMs: windowMs,
                    reason: 'REDIS_ERROR'
                };
            }
            return {
                allowed: true,
                count: 1,
                ttlMs: windowMs,
                reason: 'ALLOWED'
            };
        }
    }

    /**
     * Single atomic admission check-and-record for unaccredited traffic:
     * Atomically checks and increments both per-fingerprint and global circuit breaker.
     */
    async admitUnaccreditedAttempt(
        fpKey: string,
        globalKey: string = 'unaccredited:global',
        maxFp: number = 5,
        maxGlobal: number = 50,
        windowMs: number = this.defaultWindowMs
    ): Promise<RateLimitAdmission> {
        try {
            const raw = await this.client.eval(ATOMIC_UNACCREDITED_ADMIT_SCRIPT, {
                keys: [this.key(globalKey), this.key(fpKey)],
                arguments: [String(windowMs), String(maxGlobal), String(maxFp)]
            });

            if (!Array.isArray(raw) || raw.length < 4) {
                throw new Error('Invalid response from Redis unaccredited admission script');
            }

            const allowed = Number(raw[0]) === 1;
            const count = Number(raw[1]);
            const ttlMs = Number(raw[2]);
            const reasonTag = String(raw[3]);

            return {
                allowed,
                count,
                ttlMs,
                reason: reasonTag as 'ALLOWED' | 'FP_LIMIT' | 'GLOBAL_LIMIT'
            };
        } catch (err) {
            console.error('[SECURITY][REDIS_STORE] Unaccredited admission check failed:', err);
            if (this.failPolicy === 'closed') {
                return {
                    allowed: false,
                    count: maxFp + 1,
                    ttlMs: windowMs,
                    reason: 'REDIS_ERROR'
                };
            }
            return {
                allowed: true,
                count: 1,
                ttlMs: windowMs,
                reason: 'ALLOWED'
            };
        }
    }

    async reset(): Promise<void> {
        throw new Error('Global Redis reset intentionally unsupported: use an isolated test key prefix instead');
    }
}

/**
 * Adapter wrapping real ioredis instance to satisfy RedisEvalClient interface.
 */
export class IORedisEvalAdapter implements RedisEvalClient {
    private client: any;

    constructor(client: any) {
        this.client = client;
    }

    async eval(script: string, options: { keys: string[]; arguments: string[] }): Promise<unknown> {
        return await this.client.eval(
            script,
            options.keys.length,
            ...options.keys,
            ...options.arguments
        );
    }
}

let redisClientSingleton: any = null;

/**
 * Manages singleton Redis connection per process with controlled timeouts.
 */
export function getOrCreateRedisClient(redisUrl?: string, customOptions?: Record<string, any>): any {
    const targetUrl = redisUrl || (typeof process !== 'undefined' ? (process.env?.PPOS_REDIS_URL || process.env?.REDIS_URL) : undefined);
    if (!targetUrl) {
        throw new Error('REDIS_URL or PPOS_REDIS_URL is not configured');
    }

    if (!redisClientSingleton) {
        redisClientSingleton = new IORedis(targetUrl, {
            connectTimeout: 5000,
            commandTimeout: 3000,
            maxRetriesPerRequest: 1,
            enableReadyCheck: true,
            lazyConnect: false,
            retryStrategy(times: number) {
                if (times > 3) return null; // Do not hang web worker indefinitely
                return Math.min(times * 100, 1000);
            },
            ...customOptions
        });

        redisClientSingleton.on('error', (err: any) => {
            console.error('[SECURITY][REDIS_CONNECTION] Redis client connection error:', err?.message || err);
        });
    }

    return redisClientSingleton;
}

export function resetRedisClientSingleton() {
    if (redisClientSingleton) {
        try {
            redisClientSingleton.disconnect();
        } catch {}
        redisClientSingleton = null;
    }
}

/**
 * SEC-04C Factory: Produces appropriate rate limit store based on environment.
 * - If REDIS_URL or PPOS_REDIS_URL is set: connects to Redis. Fails closed on error (no silent fallback).
 * - If in production without Redis: throws explicit configuration error (no silent degradation).
 * - In development or test without Redis: uses InMemoryRateLimitStore.
 */
export function createRateLimitStore(options?: {
    redisUrl?: string;
    failPolicy?: 'closed' | 'open';
    forceMemory?: boolean;
    inMemoryFallback?: IRateLimitStore;
    keyPrefix?: string;
    defaultWindowMs?: number;
}): IRateLimitStore {
    const redisUrl = options?.redisUrl || (typeof process !== 'undefined' ? (process.env?.PPOS_REDIS_URL || process.env?.REDIS_URL) : undefined);
    const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';

    // 1. Explicit memory opt-in (development or isolated unit tests)
    if (options?.forceMemory || (!redisUrl && !isProduction)) {
        return options?.inMemoryFallback ?? new InMemoryRateLimitStore({ defaultWindowMs: options?.defaultWindowMs });
    }

    // 2. Production with missing Redis configuration: fail closed
    if (!redisUrl && isProduction) {
        console.error('[SECURITY][RATE_LIMIT_STORE] Production requires REDIS_URL or PPOS_REDIS_URL. Missing configuration.');
        throw new Error('REDIS_URL must be configured in production environment for multi-process quota consistency.');
    }

    // 3. Connect to real Redis
    const client = getOrCreateRedisClient(redisUrl);
    const adapter = new IORedisEvalAdapter(client);
    return new RedisRateLimitStore(adapter, {
        prefix: options?.keyPrefix,
        windowMs: options?.defaultWindowMs,
        failPolicy: options?.failPolicy ?? (isProduction ? 'closed' : 'open')
    });
}

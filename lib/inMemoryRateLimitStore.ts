/**
 * lib/inMemoryRateLimitStore.ts
 * 
 * SEC-04C: In-Memory Rate Limit Store implementation.
 * Used exclusively for local development, testing, or explicit in-memory fallback.
 * Strictly forbidden as a silent fallback in production.
 */

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

export interface IRateLimitStore {
    readonly storeType?: string;
    get(key: string): Promise<RateLimitEntry | null> | RateLimitEntry | null;
    increment(key: string, windowMs: number): Promise<RateLimitEntry> | RateLimitEntry;
    admitAttempt(key: string, maxAttempts: number, windowMs: number): Promise<RateLimitAdmission> | RateLimitAdmission;
    admitUnaccreditedAttempt(
        fpKey: string,
        globalKey: string,
        maxFp: number,
        maxGlobal: number,
        windowMs: number
    ): Promise<RateLimitAdmission> | RateLimitAdmission;
    reset(): Promise<void> | void;
}

const DEFAULT_RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const DEFAULT_MAX_SUBMISSIONS_PER_IP = 5;
const DEFAULT_MAX_SUBMISSIONS_PER_FINGERPRINT = 5;
const DEFAULT_MAX_UNACCREDITED_GLOBAL_LIMIT = 50;

export class InMemoryRateLimitStore implements IRateLimitStore {
    readonly storeType: string = 'InMemoryRateLimitStore';
    private store = new Map<string, RateLimitEntry>();
    private defaultWindowMs: number;

    constructor(options?: { defaultWindowMs?: number }) {
        this.defaultWindowMs = options?.defaultWindowMs ?? DEFAULT_RATE_LIMIT_WINDOW;
    }

    get(key: string): RateLimitEntry | null {
        const entry = this.store.get(key);
        if (!entry) return null;
        if (Date.now() - entry.timestamp > this.defaultWindowMs) {
            this.store.delete(key);
            return null;
        }
        return entry;
    }

    increment(key: string, windowMs: number = this.defaultWindowMs): RateLimitEntry {
        const now = Date.now();
        const existing = this.get(key);
        if (existing) {
            existing.count += 1;
            return existing;
        }
        const newEntry: RateLimitEntry = { count: 1, timestamp: now };
        this.store.set(key, newEntry);
        return newEntry;
    }

    admitAttempt(
        key: string,
        maxAttempts: number = DEFAULT_MAX_SUBMISSIONS_PER_IP,
        windowMs: number = this.defaultWindowMs
    ): RateLimitAdmission {
        const now = Date.now();
        const existing = this.get(key);
        if (existing) {
            existing.count += 1;
            const allowed = existing.count <= maxAttempts;
            const ttlMs = Math.max(0, windowMs - (now - existing.timestamp));
            return { allowed, count: existing.count, ttlMs, reason: allowed ? 'ALLOWED' : 'IP_LIMIT' };
        }
        const newEntry: RateLimitEntry = { count: 1, timestamp: now };
        this.store.set(key, newEntry);
        return { allowed: true, count: 1, ttlMs: windowMs, reason: 'ALLOWED' };
    }

    admitUnaccreditedAttempt(
        fpKey: string,
        globalKey: string = 'unaccredited:global',
        maxFp: number = DEFAULT_MAX_SUBMISSIONS_PER_FINGERPRINT,
        maxGlobal: number = DEFAULT_MAX_UNACCREDITED_GLOBAL_LIMIT,
        windowMs: number = this.defaultWindowMs
    ): RateLimitAdmission {
        const now = Date.now();
        const globalEntry = this.get(globalKey);
        const fpEntry = this.get(fpKey);

        if (globalEntry && globalEntry.count >= maxGlobal) {
            const ttlMs = Math.max(0, windowMs - (now - globalEntry.timestamp));
            return { allowed: false, count: globalEntry.count, ttlMs, reason: 'GLOBAL_LIMIT' };
        }

        if (fpEntry && fpEntry.count >= maxFp) {
            const ttlMs = Math.max(0, windowMs - (now - fpEntry.timestamp));
            return { allowed: false, count: fpEntry.count, ttlMs, reason: 'FP_LIMIT' };
        }

        const newGlobalCount = (globalEntry ? globalEntry.count + 1 : 1);
        this.store.set(globalKey, { count: newGlobalCount, timestamp: globalEntry?.timestamp ?? now });

        const newFpCount = (fpEntry ? fpEntry.count + 1 : 1);
        this.store.set(fpKey, { count: newFpCount, timestamp: fpEntry?.timestamp ?? now });

        const fpTtl = Math.max(0, windowMs - (now - (fpEntry?.timestamp ?? now)));
        return { allowed: true, count: newFpCount, ttlMs: fpTtl, reason: 'ALLOWED' };
    }

    reset(): void {
        this.store.clear();
    }
}

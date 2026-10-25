/**
 * PPOS Security Utilities (v2.5)
 * Hardened validation for production-grade infrastructure.
 */

import { isIP } from 'node:net';
import { createHash } from 'node:crypto';

// 1. FILE SCANNING BYTES (PDF Header)
const PDF_MAGIC_BYTES = [0x25, 0x50, 0x44, 0x46]; // %PDF

export async function validateRemoteFile(url: string) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        
        // 1. CONTENT TYPE AUDIT
        const contentType = response.headers.get('content-type');
        if (contentType !== 'application/pdf') {
            return { valid: false, error: "INVALID_MIME", message: `MIME type ${contentType} rejected. Only application/pdf allowed.` };
        }

        // 2. PAYLOAD SIZE AUDIT
        const contentLength = parseInt(response.headers.get('content-length') || '0', 10);
        if (contentLength > 500 * 1024 * 1024) { // 500MB max for high-res print
            return { valid: false, error: "PAYLOAD_TOO_LARGE", message: "File exceeds PPOS infrastructure limit (500MB)." };
        }

        // 3. SIGNATURE AUDIT (Fetch first 4 bytes)
        const sigResponse = await fetch(url, { headers: { Range: 'bytes=0-3' } });
        const buffer = await sigResponse.arrayBuffer();
        const firstBytes = new Uint8Array(buffer);
        
        const isPdf = PDF_MAGIC_BYTES.every((b, i) => b === firstBytes[i]);
        if (!isPdf) {
            return { valid: false, error: "INVALID_SIGNATURE", message: "File signature does not match PDF standard. Malicious payload suspected." };
        }

        return { valid: true };
    } catch (err) {
        return { valid: false, error: "REACHABILITY_FAILED", message: "Origin storage unreachable for security audit." };
    }
}

// 2. INPUT SANITIZATION (Strict text cleanup)
export function sanitizeText(text: string) {
    if (!text) return '';
    // Strip HTML and script patterns
    return text
        .replace(/<[^>]*>?/gm, '') // Strip HTML
        .replace(/href|src|onclick|onload/gi, 'REDACTED') // Redact attributes
        .trim();
}

// 3. DISPOSABLE EMAIL BLOCKER (Extended list)
const DISPOSABLE_DOMAINS = ['tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com'];
export function isEmailDomainAllowed(email: string) {
    const domain = email.split('@')[1];
    return !DISPOSABLE_DOMAINS.includes(domain?.toLowerCase());
}

// 4. LEAD QUALITY AUDIT (Detect fake profiles)
export function auditLeadQuality(data: any) {
    const { companyName, email, website } = data;

    // Reject obvious bot patterns in company names
    const suspiciousPatterns = [/^[asdfghjkl]{5,}$/i, /^\d+$/];
    if (suspiciousPatterns.some(p => p.test(companyName))) return false;

    // Realistic length checks
    if (companyName.length < 3 || companyName.length > 100) return false;

    // Check for "Test" or "123" leads
    const testKeywords = ['test', 'demo', 'fake', 'asdf'];
    if (testKeywords.some(kw => companyName.toLowerCase().includes(kw))) return false;

    // Simple Email Domain Check (In prod use real MX check, here we verify structure)
    const domain = email.split('@')[1];
    if (!domain || domain.split('.').length < 2) return false;

    return true;
}

// 5. CLIENT IP & RATE LIMITING HELPERS
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS_PER_IP = 5;
const MAX_SUBMISSIONS_PER_FINGERPRINT = 5;
const MAX_UNACCREDITED_GLOBAL_LIMIT = 50;

const ipSubmissions = new Map<string, { count: number; timestamp: number }>();
const fingerprintSubmissions = new Map<string, { count: number; timestamp: number }>();
const unaccreditedGlobalSubmissions = { count: 0, timestamp: Date.now() };

/**
 * Standard IPv4 / IPv6 validation using Node.js built-in RFC-compliant parser.
 * Replaces permissive regexes that could accept malformed strings.
 */
export function isValidIp(ip: string): boolean {
    if (!ip || typeof ip !== 'string') return false;
    const trimmed = ip.trim();
    const version = isIP(trimmed);
    return version === 4 || version === 6;
}

export interface HeaderReader {
    get(name: string): string | null;
}

export interface ProxyTrustConfig {
    /**
     * If true, trusts `cf-connecting-ip` from Cloudflare edge.
     * MUST be set only when the domain is actively proxied by Cloudflare and traffic reaches origin through it.
     */
    trustCloudflareProxy?: boolean;

    /**
     * Shared secret expected from the accredited reverse proxy (Nginx).
     * In Nginx: `proxy_set_header X-PPOS-Proxy-Secret "<secret>";`
     * If configured or required, requests lacking a matching secret header are treated as unaccredited
     * direct connections and proxy headers (X-Real-IP, CF-Connecting-IP) are STRICTLY REJECTED (returns null).
     */
    proxySecret?: string;

    /**
     * If true, strictly requires the proxy secret to accept any reverse proxy header.
     * When omitted, defaults to true if PPOS_PROXY_SECRET is set or NODE_ENV === 'production'.
     */
    requireProxySecret?: boolean;

    /**
     * Expected header name for the proxy secret. Defaults to 'x-ppos-proxy-secret'.
     */
    proxySecretHeader?: string;

    /**
     * Optional peer IP address (e.g. from socket / connection) to verify transport origin.
     * If provided and not in trustedPeerIps, proxy headers are rejected.
     */
    peerIp?: string;

    /**
     * List of trusted peer IPs (defaults to loopback: 127.0.0.1, ::1, ::ffff:127.0.0.1).
     */
    trustedPeerIps?: string[];

    /**
     * Explicit opt-in for unaccredited local dev environments ONLY. Never active in production.
     */
    allowUnaccreditedProxyInDev?: boolean;
}

const DEFAULT_PROXY_SECRET_HEADER = 'x-ppos-proxy-secret';
const TRUSTED_LOCAL_PEERS = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];

/**
 * Resolves client identifier strictly from accredited reverse proxy headers.
 * 
 * INFRASTRUCTURE TRUST AUDIT & MODEL (SEC-04B):
 * 1. Trust-by-Presence Vulnerability Remediation:
 *    Previously, `X-Real-IP` was trusted merely because the header was present and had valid IP syntax.
 *    In an unisolated network or direct-access scenario (e.g. external connections arriving at Node.js directly),
 *    an attacker could send an arbitrary `X-Real-IP: 203.0.113.199` header and impersonate any identity or bypass
 *    IP-based limits.
 * 2. Accreditation via Shared Proxy Secret:
 *    The accredited reverse proxy (Nginx) terminats TLS, strips any client-provided `X-PPOS-Proxy-Secret`,
 *    and injects an internal secret header: `proxy_set_header X-PPOS-Proxy-Secret "<secret>";`.
 *    The backend only trusts `X-Real-IP` if this cryptographic secret matches `process.env.PPOS_PROXY_SECRET`
 *    or `config.proxySecret`. Direct requests lacking this secret are strictly rejected (`null`).
 * 3. Network Transport Verification:
 *    If peer IP is provided, it must belong to trusted local loopback addresses.
 * 4. Privacy & Rate Limiting Protection:
 *    When `resolveTrustedClientIp` returns `null` (unaccredited traffic), the request is governed by:
 *    - Per-client fingerprint rate limiting (max 5 / hour) to isolate distinct legitimate users.
 *    - Global unaccredited circuit breaker (max 50 / hour) to prevent rate limit evasion or distributed abuse.
 */
export function resolveTrustedClientIp(
    headerList: HeaderReader,
    config?: ProxyTrustConfig
): string | null {
    const configuredSecret = 
        config?.proxySecret ?? 
        (typeof process !== 'undefined' ? process.env?.PPOS_PROXY_SECRET : undefined);

    const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
    const requireSecret = config?.requireProxySecret ?? (!!configuredSecret || isProduction);

    // 1. Transport Peer IP Verification (if runtime provides socket remoteAddress)
    if (config?.peerIp) {
        const allowedPeers = config.trustedPeerIps ?? TRUSTED_LOCAL_PEERS;
        if (!allowedPeers.includes(config.peerIp.trim())) {
            // Direct external socket connection bypassing reverse proxy
            return null;
        }
    }

    // 2. Secret-Based Proxy Accreditation
    if (requireSecret) {
        if (!configuredSecret) {
            // Fail-closed default: secret required but not configured
            return null;
        }
        const secretHeader = (config?.proxySecretHeader ?? DEFAULT_PROXY_SECRET_HEADER).toLowerCase();
        const incomingSecret = headerList.get(secretHeader)?.trim();
        if (!incomingSecret || incomingSecret !== configuredSecret) {
            // Direct access or spoofed request lacking accredited proxy secret header
            return null;
        }
    } else if (!config?.allowUnaccreditedProxyInDev) {
        // Without explicit dev opt-in, never trust X-Real-IP solely by presence
        return null;
    }

    // 3. Cloudflare edge IP: only accepted if Cloudflare proxy chain is explicitly accredited
    const isCloudflareAccredited = 
        config?.trustCloudflareProxy ?? 
        (typeof process !== 'undefined' && process.env?.TRUST_CLOUDFLARE_PROXY === 'true');

    if (isCloudflareAccredited) {
        const cfIp = headerList.get('cf-connecting-ip')?.trim();
        if (cfIp && isValidIp(cfIp)) {
            return cfIp;
        }
    }

    // 4. Accredited local reverse proxy: X-Real-IP populated by Nginx from $remote_addr
    const realIp = headerList.get('x-real-ip')?.trim();
    if (realIp && isValidIp(realIp)) {
        return realIp;
    }

    // 5. Fallback: no accredited IP header found
    return null;
}

/**
 * Computes a non-PII anonymous client fingerprint from HTTP headers.
 * Generates distinct buckets for legitimate visitors whose IP cannot be accredited,
 * ensuring they are not indiscriminately locked out by other unaccredited users.
 * 
 * GDPR & PRIVACY AUDIT:
 * - Zero PII: Excludes IP addresses, cookies, names, emails, and persistent device IDs.
 * - One-way hash: Uses SHA-256 with server-side ephemeral salt.
 * - Ephemeral: Stored strictly in memory during the rate limit window (1 hour), never persisted to DB.
 * - Legal Basis: GDPR Art. 6(1)(f) (Legitimate interest for network defense & anti-abuse)
 *   and ePrivacy Directive Art. 5(3) security exemption.
 */
export function computeClientFingerprint(headerList: HeaderReader, salt?: string): string {
    const serverSalt = salt ?? (typeof process !== 'undefined' ? process.env?.FINGERPRINT_SALT : '') ?? '';
    const ua = headerList.get('user-agent') || 'no-ua';
    const lang = headerList.get('accept-language') || 'no-lang';
    const secChUa = headerList.get('sec-ch-ua') || '';
    const encoding = headerList.get('accept-encoding') || '';
    const raw = `${ua}:::${lang}:::${secChUa}:::${encoding}:::${serverSalt}`;
    return createHash('sha256').update(raw).digest('hex').slice(0, 24);
}

/**
 * Evaluates whether a submission should be rate-limited:
 * 1. Accredited IP: Strictly isolated per IP (max 5 submissions / hour).
 * 2. Unaccredited requests (null IP):
 *    a) Global unaccredited circuit breaker: If aggregate unaccredited submissions reach
 *       MAX_UNACCREDITED_GLOBAL_LIMIT (50/hour), blocks further unaccredited requests to prevent
 *       attackers from evading rate limiting by stripping headers or cycling random user-agents.
 *    b) Per-fingerprint rate limiting: If clientFingerprint is supplied, isolates each unique
 *       browser signature (max 5 submissions / hour), ensuring legitimate users do not share a single bucket.
 */
export function isRateLimited(
    ip: string | null,
    clientFingerprint?: string | null
): boolean {
    const now = Date.now();

    // 1. Check accredited IP
    if (ip) {
        const entry = ipSubmissions.get(ip);
        if (entry && (now - entry.timestamp) > RATE_LIMIT_WINDOW) {
            ipSubmissions.delete(ip);
            return false;
        }
        return !!(entry && entry.count >= MAX_SUBMISSIONS_PER_IP);
    }

    // 2. Unaccredited requests protection:
    // 2a. Global unaccredited circuit breaker to prevent infinite bypass
    if ((now - unaccreditedGlobalSubmissions.timestamp) > RATE_LIMIT_WINDOW) {
        unaccreditedGlobalSubmissions.count = 0;
        unaccreditedGlobalSubmissions.timestamp = now;
    }
    if (unaccreditedGlobalSubmissions.count >= MAX_UNACCREDITED_GLOBAL_LIMIT) {
        return true;
    }

    // 2b. Per-client fingerprint rate limit (isolates legitimate users)
    if (clientFingerprint) {
        const fpEntry = fingerprintSubmissions.get(clientFingerprint);
        if (fpEntry && (now - fpEntry.timestamp) > RATE_LIMIT_WINDOW) {
            fingerprintSubmissions.delete(clientFingerprint);
            return false;
        }
        return !!(fpEntry && fpEntry.count >= MAX_SUBMISSIONS_PER_FINGERPRINT);
    }

    return false;
}

export function recordSubmissionAttempt(
    ip: string | null,
    clientFingerprint?: string | null
) {
    const now = Date.now();

    // 1. Record accredited IP
    if (ip) {
        const entry = ipSubmissions.get(ip);
        if (entry && (now - entry.timestamp) < RATE_LIMIT_WINDOW) {
            entry.count += 1;
        } else {
            ipSubmissions.set(ip, { count: 1, timestamp: now });
        }
        return;
    }

    // 2. Record unaccredited traffic:
    // Update aggregate unaccredited counter
    if ((now - unaccreditedGlobalSubmissions.timestamp) < RATE_LIMIT_WINDOW) {
        unaccreditedGlobalSubmissions.count += 1;
    } else {
        unaccreditedGlobalSubmissions.count = 1;
        unaccreditedGlobalSubmissions.timestamp = now;
    }

    // Update per-client fingerprint counter
    if (clientFingerprint) {
        const fpEntry = fingerprintSubmissions.get(clientFingerprint);
        if (fpEntry && (now - fpEntry.timestamp) < RATE_LIMIT_WINDOW) {
            fpEntry.count += 1;
        } else {
            fingerprintSubmissions.set(clientFingerprint, { count: 1, timestamp: now });
        }
    }
}

export function resetRateLimitStore() {
    ipSubmissions.clear();
    fingerprintSubmissions.clear();
    unaccreditedGlobalSubmissions.count = 0;
    unaccreditedGlobalSubmissions.timestamp = Date.now();
}

/**
 * Multi-Process Rate Limiting Architecture (SEC-04B):
 * In clustered or multi-worker Passenger environments (e.g. Passenger pool size > 1),
 * in-memory Maps are local to each Node.js process and do not synchronize.
 * 
 * To ensure consistent quotas across multiple processes, the IRateLimitStore interface
 * provides a pluggable store contract that can be backed by Redis (using atomic INCR and PEXPIRE)
 * or in-memory stores for single-process / test environments.
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

export class InMemoryRateLimitStore implements IRateLimitStore {
    private store = new Map<string, RateLimitEntry>();

    get(key: string): RateLimitEntry | null {
        const entry = this.store.get(key);
        if (!entry) return null;
        if (Date.now() - entry.timestamp > RATE_LIMIT_WINDOW) {
            this.store.delete(key);
            return null;
        }
        return entry;
    }

    increment(key: string, windowMs: number = RATE_LIMIT_WINDOW): RateLimitEntry {
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

    admitAttempt(key: string, maxAttempts: number = MAX_SUBMISSIONS_PER_IP, windowMs: number = RATE_LIMIT_WINDOW): RateLimitAdmission {
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
        maxFp: number = MAX_SUBMISSIONS_PER_FINGERPRINT,
        maxGlobal: number = MAX_UNACCREDITED_GLOBAL_LIMIT,
        windowMs: number = RATE_LIMIT_WINDOW
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

let activeStore: IRateLimitStore = new InMemoryRateLimitStore();

export function setActiveRateLimitStore(store: IRateLimitStore) {
    activeStore = store;
}

export function getActiveRateLimitStore(): IRateLimitStore {
    return activeStore;
}

/**
 * Single Atomic Admission Gate (SEC-04C):
 * Performs check-and-record in one atomic operation.
 * Concurrency-safe across worker processes, rejecting attempt 6 under concurrent load.
 */
export async function checkAndRecordRateLimit(
    ip: string | null,
    clientFingerprint?: string | null,
    options?: { store?: IRateLimitStore }
): Promise<RateLimitAdmission> {
    const store = options?.store ?? activeStore;

    if (ip) {
        return await store.admitAttempt(`ip:${ip}`, MAX_SUBMISSIONS_PER_IP, RATE_LIMIT_WINDOW);
    }

    const fpKey = clientFingerprint ? `fp:${clientFingerprint}` : 'fp:unknown';
    return await store.admitUnaccreditedAttempt(
        fpKey,
        'unaccredited:global',
        MAX_SUBMISSIONS_PER_FINGERPRINT,
        MAX_UNACCREDITED_GLOBAL_LIMIT,
        RATE_LIMIT_WINDOW
    );
}


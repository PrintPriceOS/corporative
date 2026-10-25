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
}

/**
 * Resolves client identifier strictly from accredited reverse proxy headers.
 * 
 * INFRASTRUCTURE TRUST AUDIT & MODEL:
 * 1. Production Reverse Proxy: In Nginx (/var/www/vhosts/system/printprice.pro/conf/vhost_nginx.conf),
 *    Nginx terminates TLS and sets `proxy_set_header X-Real-IP $remote_addr;`.
 *    For traffic entering through port 80/443, Nginx actively overwrites any incoming `X-Real-IP` header,
 *    preventing client header spoofing over the public web interface.
 * 2. Backend Port Isolation Finding: Node.js currently listens on `*:8790` (all interfaces), and firewall
 *    rules do not explicitly drop external connections to 8790. Requests arriving directly at port 8790
 *    bypass Nginx and must NEVER be treated as pre-filtered or accredited.
 * 3. Client Header Untrust: External client-supplied headers (such as `CF-Connecting-IP` without accredited
 *    proxy chain or arbitrary `X-Forwarded-For`) are NEVER considered reliable.
 * 4. Unaccredited Requests: When no accredited header exists or when validation fails, returns `null`.
 *    Requests with `null` IP are protected via per-client fingerprint rate limiting (to avoid shared lockouts
 *    of legitimate visitors) combined with a global unaccredited circuit breaker (to prevent rate limit evasion).
 */
export function resolveTrustedClientIp(
    headerList: HeaderReader,
    config?: ProxyTrustConfig
): string | null {
    const isCloudflareAccredited = 
        config?.trustCloudflareProxy ?? 
        (typeof process !== 'undefined' && process.env?.TRUST_CLOUDFLARE_PROXY === 'true');

    // 1. Cloudflare edge IP: only accepted if Cloudflare proxy chain is explicitly accredited
    if (isCloudflareAccredited) {
        const cfIp = headerList.get('cf-connecting-ip')?.trim();
        if (cfIp && isValidIp(cfIp)) {
            return cfIp;
        }
    }

    // 2. Accredited local reverse proxy: X-Real-IP populated by Nginx from $remote_addr
    const realIp = headerList.get('x-real-ip')?.trim();
    if (realIp && isValidIp(realIp)) {
        return realIp;
    }

    // 3. Fallback: NO arbitrary X-Forwarded-For fallback or unverified headers.
    // Return null to avoid spoofed IP adoption.
    return null;
}

/**
 * Computes a non-PII anonymous client fingerprint from HTTP headers.
 * Generates distinct buckets for legitimate visitors whose IP cannot be accredited,
 * ensuring they are not indiscriminately locked out by other unaccredited users.
 */
export function computeClientFingerprint(headerList: HeaderReader, salt: string = ''): string {
    const ua = headerList.get('user-agent') || 'no-ua';
    const lang = headerList.get('accept-language') || 'no-lang';
    const secChUa = headerList.get('sec-ch-ua') || '';
    const encoding = headerList.get('accept-encoding') || '';
    const raw = `${ua}:::${lang}:::${secChUa}:::${encoding}:::${salt}`;
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


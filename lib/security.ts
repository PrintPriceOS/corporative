/**
 * PPOS Security Utilities (v2.5)
 * Hardened validation for production-grade infrastructure.
 */

import { isIP } from 'node:net';

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
const ipSubmissions = new Map<string, { count: number; timestamp: number }>();

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
 * INFRASTRUCTURE TRUST MODEL:
 * 1. PrintPrice OS production host (212.227.79.67) runs Nginx on Plesk as the local reverse
 *    proxy forwarding to the internal Node.js server. Nginx sets `proxy_set_header X-Real-IP $remote_addr`.
 *    Because Node.js listens on internal loopback (127.0.0.1), `X-Real-IP` represents the actual TCP
 *    remote address connecting to Nginx and cannot be spoofed by incoming client headers.
 * 2. `CF-Connecting-IP` is trusted ONLY when Cloudflare edge proxying is actively accredited
 *    (via `config.trustCloudflareProxy` or `process.env.TRUST_CLOUDFLARE_PROXY === 'true'`).
 *    Blindly trusting `CF-Connecting-IP` when DNS points directly to the host allows header spoofing.
 * 3. `X-Forwarded-For` is NOT used as an arbitrary fallback because clients can prepend spoofed IPs
 *    into the header, making leftmost-entry parsing an insecure default.
 * 4. If no accredited header is present or if validation fails, returns `null`.
 *    Requests with `null` IP NEVER share a global rate limit bucket or lock each other out.
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
    // Return null to avoid spoofed IP adoption or shared lockout buckets.
    return null;
}

export function isRateLimited(ip: string | null): boolean {
    // CRITICAL: Never lump unresolvable requests into a shared 'unknown' bucket.
    if (!ip) return false;

    const now = Date.now();
    const entry = ipSubmissions.get(ip);

    if (entry && (now - entry.timestamp) > RATE_LIMIT_WINDOW) {
        ipSubmissions.delete(ip);
        return false;
    }

    if (entry && entry.count >= MAX_SUBMISSIONS_PER_IP) {
        return true;
    }

    return false;
}

export function recordSubmissionAttempt(ip: string | null) {
    if (!ip) return;
    const now = Date.now();
    const entry = ipSubmissions.get(ip);
    if (entry && (now - entry.timestamp) < RATE_LIMIT_WINDOW) {
        entry.count += 1;
    } else {
        ipSubmissions.set(ip, { count: 1, timestamp: now });
    }
}

export function resetRateLimitStore() {
    ipSubmissions.clear();
}


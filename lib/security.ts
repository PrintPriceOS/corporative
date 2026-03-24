/**
 * PPOS Security Utilities (v2.4)
 * Hardened validation for production-grade infrastructure.
 */

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

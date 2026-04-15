import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. REGISTRY: Valid API Keys & Scopes (Mock database)
const VALID_KEYS = [
    { key: "ppos_test_k9f1...", owner: "internal_test", scopes: ["budget:read", "preflight:write", "control:read"] },
    { key: "ppos_agent_d9f0...", owner: "publishing_agent_v1", scopes: ["budget:all", "preflight:all", "control:all", "agents:execute"] }
];

// Helper: Scoped permission check
const hasPermission = (keyData: any, scopeRequired: string) => {
    return keyData.scopes.includes(scopeRequired) || keyData.scopes.includes(scopeRequired.split(':')[0] + ':all');
};

export async function POST(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    const { path: pathSegments } = await params;
    const path = pathSegments?.join('/') || 'root';
    const apiKey = request.headers.get('x-api-key');

    // 1. AUTHENTICATIONAudit: API Key required
    if (!apiKey) {
        return NextResponse.json({
            error: "UNAUTHORIZED",
            message: "X-API-KEY header required for this infrastructure node."
        }, { status: 401 });
    }

    const keyData = VALID_KEYS.find(k => k.key === apiKey);
    if (!keyData) {
        return NextResponse.json({
            error: "FORBIDDEN",
            message: "Invalid API key profile detected."
        }, { status: 403 });
    }

    // 2. AUTHORIZATION: Scope check per path
    let requiredScope = '';
    if (path.startsWith('budget')) requiredScope = 'budget:write';
    if (path.startsWith('preflight')) requiredScope = 'preflight:write';
    if (path.startsWith('control')) requiredScope = 'control:write';
    if (path.startsWith('agents')) requiredScope = 'agents:execute';

    if (requiredScope && !hasPermission(keyData, requiredScope)) {
        return NextResponse.json({
            error: "FORBIDDEN",
            message: `Scope '${requiredScope}' required for path: /v1/${path}`
        }, { status: 403 });
    }

    // 3. INPUT SCANNING: Payload size limit
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json({
            error: "PAYLOAD_TOO_LARGE",
            message: "Payload exceeds infrastructure limit (5MB)."
        }, { status: 413 });
    }

    // 4. MALICIOUS PAYLOAD SCAN (Simplified)
    const bodyText = await request.text();
    const suspiciousPatterns = ['<script', 'javascript:', 'drop table', '--', 'UNION SELECT'];
    if (suspiciousPatterns.some(p => bodyText.toLowerCase().includes(p))) {
        console.warn(`[SECURITY][INJECTION_DETECTED] Suspicious payload from ${keyData.owner} at /v1/${path}`);
        return NextResponse.json({
            error: "SECURITY_PROTOCOL_ENFORCED",
            message: "Payload rejected by infrastructure guardrail."
        }, { status: 400 });
    }

    // 5. REDIRECT OR MOCK RESPONSE
    // In a real system, proxy to internal backend service here
    return NextResponse.json({
        node_execution: "SUCCESS",
        node: "PPOS_GATEWAY_V2.4",
        path: `/v1/${path}`,
        trace_id: `trc_${Math.random().toString(36).substr(2, 9)}`,
        status: "consistent"
    });
}

// Support GET for status/audit
export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    // Audit logic for GET endpoints...
    return POST(request, { params }); // Share security layer
}

import { NextRequest, NextResponse } from 'next/server';
import {
  detectLocaleFromPrompt,
  resolveConciergeKnowledge,
  SupportedLocale,
} from '@/lib/dot-knowledge';
import { generateDottyReply, ChatMessageTurn } from '@/lib/dotty-knowledge';
import {
  MAX_PAYLOAD_BYTES,
  MAX_PROMPT_CHARS,
  MAX_HISTORY_TURNS,
  computeDailyIpHash,
  extractClientCountry,
  validateConciergeOrigin,
  checkConciergeRateLimit,
  checkDailyCircuitBreaker,
  verifyTurnstileIfConfigured,
  getRateLimitMessage,
  getInputTooLongMessage,
} from '@/lib/concierge-guard';
import {
  recordConciergeAudit,
  sanitizeQuestionPreview,
  ConciergeAuditStatus,
} from '@/lib/concierge-audit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ipHash = computeDailyIpHash(request);
  const country = extractClientCountry(request);
  let effectiveLocale: SupportedLocale = 'es';
  let inputLength = 0;
  let historyTurns = 0;
  let questionPreview = '';

  const logAudit = async (status: ConciergeAuditStatus) => {
    await recordConciergeAudit({
      ts: new Date().toISOString(),
      ipHash,
      country,
      locale: effectiveLocale,
      status,
      inputLength,
      historyTurns,
      latencyMs: Date.now() - startTime,
      questionPreview,
    });
  };

  try {
    // 1. Strict Origin & Referer Guard
    const originCheck = validateConciergeOrigin(request);
    if (!originCheck.allowed) {
      await logAudit('origin_blocked');
      return NextResponse.json(
        { error: 'Forbidden: Unauthorized origin' },
        { status: 403 }
      );
    }

    // 2. Payload Size Limit (Max 8 KB)
    const contentLengthHeader = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLengthHeader > MAX_PAYLOAD_BYTES) {
      await logAudit('payload_too_large');
      return NextResponse.json(
        { error: 'Payload Too Large (max 8 KB)' },
        { status: 413 }
      );
    }

    const rawBodyText = await request.text().catch(() => '');
    if (Buffer.byteLength(rawBodyText, 'utf8') > MAX_PAYLOAD_BYTES) {
      await logAudit('payload_too_large');
      return NextResponse.json(
        { error: 'Payload Too Large (max 8 KB)' },
        { status: 413 }
      );
    }

    let body: Record<string, any> = {};
    try {
      body = rawBodyText ? JSON.parse(rawBodyText) : {};
    } catch {
      await logAudit('bad_request');
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const rawPrompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const requestedLocale = typeof body.locale === 'string' ? body.locale : 'es';
    inputLength = rawPrompt.length;
    questionPreview = sanitizeQuestionPreview(rawPrompt);
    effectiveLocale = detectLocaleFromPrompt(rawPrompt || 'hola', requestedLocale);

    if (!rawPrompt) {
      await logAudit('bad_request');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // 3. Input Message Length Cap (Max 500 chars -> 400 Bad Request)
    if (rawPrompt.length > MAX_PROMPT_CHARS) {
      const msg = getInputTooLongMessage(effectiveLocale);
      await logAudit('input_too_long');
      return NextResponse.json(
        {
          error: `Prompt exceeds maximum allowed length (${MAX_PROMPT_CHARS} chars)`,
          reply: msg.reply,
          ctas: msg.ctas,
          detectedLocale: effectiveLocale,
        },
        { status: 400 }
      );
    }

    // 4. Optional Cloudflare Turnstile Hook (active when TURNSTILE_SECRET_KEY is configured)
    const turnstileCheck = await verifyTurnstileIfConfigured(
      request,
      body['cf-turnstile-response'] || body.turnstileToken
    );
    if (!turnstileCheck.ok) {
      await logAudit('turnstile_blocked');
      return NextResponse.json(
        { error: 'Forbidden: Turnstile challenge verification failed' },
        { status: 403 }
      );
    }

    // 5. Rate Limiting per IP Hash (10 req/min, 40 req/hour)
    const rateLimit = await checkConciergeRateLimit(ipHash);
    if (!rateLimit.allowed) {
      const msg = getRateLimitMessage(effectiveLocale);
      await logAudit('rate_limited');
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          reply: msg.reply,
          ctas: msg.ctas,
          detectedLocale: effectiveLocale,
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      );
    }

    // 6. Sanitize & Slice Multi-Turn History (Last 6 turns, strictly user/assistant only, no 'system' spoofing)
    const rawHistory = Array.isArray(body.history)
      ? body.history
      : Array.isArray(body.messages)
      ? body.messages
      : [];

    const filteredHistory: ChatMessageTurn[] = [];
    for (const item of rawHistory) {
      if (
        item &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim()
      ) {
        filteredHistory.push({
          role: item.role,
          content: item.content.trim().slice(0, 1200),
        });
      }
    }

    const history = filteredHistory.slice(-MAX_HISTORY_TURNS);
    historyTurns = history.length;

    // 7. Global Daily Circuit Breaker (Default: 1500 calls/day)
    const circuit = await checkDailyCircuitBreaker();
    if (!circuit.allowed) {
      const fallback = resolveConciergeKnowledge(rawPrompt, effectiveLocale);
      await logAudit('circuit_breaker_fallback');
      return NextResponse.json(
        {
          reply: fallback.text,
          ctas: fallback.ctas || [],
          detectedLocale: effectiveLocale,
          intent: fallback.intent,
          source: 'circuit_breaker_fallback',
        },
        {
          status: 200,
          headers: { 'Cache-Control': 'no-store, max-age=0' },
        }
      );
    }

    // 8. Execute Dotty LLM Reasoning Engine (with automatic graceful fallback)
    const result = await generateDottyReply(history, rawPrompt, effectiveLocale);
    const auditStatus: ConciergeAuditStatus =
      result.source === 'llm' ? 'ok' : 'fallback';

    await logAudit(auditStatus);

    return NextResponse.json(
      {
        reply: result.reply,
        ctas: result.ctas || [],
        detectedLocale: result.detectedLocale,
        intent: result.intent,
        source: result.source,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err) {
    await logAudit('fallback');
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMsg },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { detectLocaleFromPrompt, SupportedLocale } from '@/lib/dot-knowledge';
import { generateDottyReply, ChatMessageTurn } from '@/lib/dotty-knowledge';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const rawPrompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const requestedLocale = (body.locale || 'es') as string;

    if (!rawPrompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Safety limit on prompt length
    if (rawPrompt.length > 2000) {
      return NextResponse.json(
        { error: 'Prompt exceeds maximum allowed length (2000 chars)' },
        { status: 413 }
      );
    }

    // Extract multi-turn history if provided
    const rawHistory = Array.isArray(body.history)
      ? body.history
      : Array.isArray(body.messages)
      ? body.messages
      : [];

    const history: ChatMessageTurn[] = [];
    for (const item of rawHistory) {
      if (
        item &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim()
      ) {
        history.push({
          role: item.role,
          content: item.content.trim(),
        });
      }
    }

    // Determine target locale (prompt language takes precedence over UI locale)
    const effectiveLocale: SupportedLocale = detectLocaleFromPrompt(rawPrompt, requestedLocale);

    // Call Dotty LLM Reasoning Engine (with automatic graceful fallback)
    const result = await generateDottyReply(history, rawPrompt, effectiveLocale);

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
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMsg },
      { status: 500 }
    );
  }
}

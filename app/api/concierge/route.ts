import { NextRequest, NextResponse } from 'next/server';
import {
  detectLocaleFromPrompt,
  resolveConciergeKnowledge,
  SupportedLocale,
} from '@/lib/dot-knowledge';

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

    // Determine target locale (prompt language takes precedence over UI locale)
    const effectiveLocale: SupportedLocale = detectLocaleFromPrompt(rawPrompt, requestedLocale);

    // Resolve concierge knowledge answer
    const answer = resolveConciergeKnowledge(rawPrompt, effectiveLocale);

    return NextResponse.json(
      {
        reply: answer.text,
        ctas: answer.ctas || [],
        detectedLocale: effectiveLocale,
        intent: answer.intent,
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

import { NextRequest, NextResponse } from 'next/server';
import { checkActionRateLimit } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // SEC-04D.1: In normal production, test diagnostics are strictly inaccessible (404)
  if (process.env.ENABLE_TEST_DIAGNOSTICS !== 'true') {
    return new NextResponse(null, { status: 404 });
  }

  const result = await checkActionRateLimit();
  return NextResponse.json(result, { status: result.allowed ? 200 : 429 });
}

export async function GET(req: NextRequest) {
  if (process.env.ENABLE_TEST_DIAGNOSTICS !== 'true') {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.json({ status: 'diagnostic_active' }, { status: 200 });
}

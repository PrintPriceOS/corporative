import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, INDEXNOW_KEY, INDEXNOW_KEY_LOCATION } from '@/lib/seo';
import sitemap from '@/app/sitemap';

export const dynamic = 'force-dynamic';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

function getDefaultUrlList(): string[] {
  const entries = sitemap();
  return entries.map((item) => item.url);
}

export async function GET() {
  const urlList = getDefaultUrlList();
  return NextResponse.json({
    ok: true,
    protocol: 'IndexNow 2.0',
    host: new URL(BASE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    indexedUrlCount: urlList.length,
    urlList,
  });
}

export async function POST(request: NextRequest) {
  try {
    let customUrls: string[] | undefined;
    try {
      const body = await request.json();
      if (Array.isArray(body?.urlList) && body.urlList.length > 0) {
        customUrls = body.urlList.filter((u: unknown) => typeof u === 'string' && u.startsWith(BASE_URL));
      }
    } catch {
      // Body is optional; fall back to full sitemap URL list
    }

    const urlList = customUrls && customUrls.length > 0 ? customUrls : getDefaultUrlList();
    const host = new URL(BASE_URL).hostname;

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      ok: response.ok || response.status === 202,
      indexNowStatus: response.status,
      submittedCount: urlList.length,
      host,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'IndexNow submission error',
      },
      { status: 500 }
    );
  }
}

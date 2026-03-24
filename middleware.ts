import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. CANONICAL ENFORCEMENT & URL NORMALIZATION
  // Ensure lowercase and no trailing slashes (except root)
  if (pathname !== '/' && pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(pathname.slice(0, -1), request.url), 301);
  }

  // 2. WAF LAYER - BLOCK MALICIOUS PATTERNS
  // Block common SQLi/XSS/SEO-poisoning patterns in query strings
  const searchValues = Array.from(searchParams.values()).join(' ');
  const maliciousRegex = /(<script|union\s+select|select\s+\*|drop\s+table|--|alert\(|javascript:)/i;
  
  if (maliciousRegex.test(searchValues) || maliciousRegex.test(pathname)) {
     console.warn(`[SECURITY][WAF_BLOCK] Suspicious pattern in URL: ${pathname}${searchValues}`);
     return new NextResponse("Security Protocol Violation", { status: 403 });
  }

  // 3. ANTI-SCRAPING / SEO-POISONING
  // Reject URLs with excessive query parameters (bot footprint)
  if (searchParams.size > 10) {
     return new NextResponse("Request rejected by infrastructure policy.", { status: 400 });
  }

  const response = NextResponse.next();

  // 4. SECURITY HEADERS
  // Content Security Policy (Monolith v2.4 Hardened)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://challenges.cloudflare.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

// Ensure middleware runs for all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

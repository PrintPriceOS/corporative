/**
 * lib/concierge-guard.ts
 *
 * Defense-in-depth security guard for POST /api/concierge (Dotty AI Assistant):
 * 1. Strict Origin & Referer validation in production (https://printprice.pro, https://www.printprice.pro).
 * 2. GDPR-compliant daily rotating SHA-256 IP hashing (never stores raw IP addresses).
 * 3. Per-ipHash rate limiting: max 10 requests / minute and 40 requests / hour (Redis-backed across PM2 cluster workers with in-memory fallback).
 * 4. Daily global Circuit Breaker (CONCIERGE_DAILY_MAX_CALLS, default 1500) to prevent Denial-of-Wallet attacks.
 * 5. Cloudflare Turnstile verification hook (active automatically when TURNSTILE_SECRET_KEY is defined).
 */

import { createHash } from 'node:crypto';
import { NextRequest } from 'next/server';
import { SupportedLocale } from './dot-knowledge';
import { getOrCreateRedisClient } from './redisRateLimitStore';

export const MAX_PAYLOAD_BYTES = 8 * 1024; // 8 KB
export const MAX_PROMPT_CHARS = 500;
export const MAX_HISTORY_TURNS = 6;
export const RATE_LIMIT_PER_MINUTE = 10;
export const RATE_LIMIT_PER_HOUR = 40;
export const DEFAULT_DAILY_MAX_CALLS = 1500;

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const ALLOWED_PROD_ORIGINS = new Set([
  'https://printprice.pro',
  'https://www.printprice.pro',
]);

// In-memory fallback stores for local development or when Redis is unavailable
interface WindowCounter {
  count: number;
  resetAt: number;
}

const memMinuteStore = new Map<string, WindowCounter>();
const memHourStore = new Map<string, WindowCounter>();
const memDailyCircuitStore = new Map<string, WindowCounter>();

/**
 * Returns current UTC date string YYYY-MM-DD
 */
export function getUtcDateKey(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/**
 * Extracts raw client IP from Cloudflare or reverse proxy headers for ephemeral hashing only.
 * Never persisted in plaintext.
 */
function extractEphemeralClientIp(req: NextRequest): string {
  const cfIp = req.headers.get('cf-connecting-ip')?.trim();
  const cfRay = req.headers.get('cf-ray')?.trim();
  if (cfIp && cfRay) return cfIp;

  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  if (cfIp) return cfIp;

  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }

  const ua = req.headers.get('user-agent') || 'unknown-ua';
  const lang = req.headers.get('accept-language') || 'unknown-lang';
  return `anon:${ua}:${lang}`;
}

/**
 * GDPR-compliant SHA-256 IP hash with a daily rotating salt.
 */
export function computeDailyIpHash(req: NextRequest): string {
  const rawIp = extractEphemeralClientIp(req);
  const dateKey = getUtcDateKey();
  const baseSalt =
    process.env.FINGERPRINT_SALT ||
    process.env.PPOS_PROXY_SECRET ||
    'ppos-dotty-gdpr-daily-salt';
  const dailySalt = `${dateKey}:::${baseSalt}`;

  return createHash('sha256')
    .update(`${rawIp}:::${dailySalt}`)
    .digest('hex')
    .slice(0, 16);
}

/**
 * Extracts 2-letter ISO country code from Cloudflare header if present.
 */
export function extractClientCountry(req: NextRequest): string {
  const country = req.headers.get('cf-ipcountry')?.trim().toUpperCase();
  if (country && /^[A-Z]{2}$/.test(country)) {
    return country;
  }
  return 'XX';
}

/**
 * Validates Origin / Referer header against allowed origins.
 * - Rejects any explicit Origin that is not printprice.pro (or localhost in non-production).
 * - In production, requires Origin or Referer to match https://printprice.pro or https://www.printprice.pro.
 */
export function validateConciergeOrigin(req: NextRequest): { allowed: boolean; origin: string | null } {
  const isProd = process.env.NODE_ENV === 'production';
  const originHeader = req.headers.get('origin')?.trim() || null;
  const refererHeader = req.headers.get('referer')?.trim() || null;

  const isAllowedOriginUrl = (urlStr: string): boolean => {
    try {
      const parsed = new URL(urlStr);
      const normalized = `${parsed.protocol}//${parsed.host}`.toLowerCase();
      if (ALLOWED_PROD_ORIGINS.has(normalized)) return true;
      if (!isProd && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // If Origin header is provided, it MUST strictly match allowed origins in all environments
  if (originHeader) {
    return {
      allowed: isAllowedOriginUrl(originHeader),
      origin: originHeader,
    };
  }

  // If Origin is omitted, inspect Referer
  if (refererHeader) {
    return {
      allowed: isAllowedOriginUrl(refererHeader),
      origin: refererHeader,
    };
  }

  // In production, requests lacking both Origin and Referer are blocked
  if (isProd) {
    return { allowed: false, origin: null };
  }

  return { allowed: true, origin: null };
}

/**
 * Helper to increment a counter in Redis (if configured) or in-memory Map fallback.
 */
async function incrementWindowCounter(
  redisKey: string,
  memMap: Map<string, WindowCounter>,
  windowMs: number
): Promise<number> {
  const redisUrl = process.env.PPOS_REDIS_URL || process.env.REDIS_URL;
  if (redisUrl) {
    try {
      const client = getOrCreateRedisClient(redisUrl);
      const count = await client.incr(redisKey);
      if (count === 1) {
        await client.pexpire(redisKey, windowMs);
      } else {
        const pttl = await client.pttl(redisKey);
        if (pttl < 0) {
          await client.pexpire(redisKey, windowMs);
        }
      }
      return Number(count);
    } catch (err) {
      console.warn('[CONCIERGE-GUARD] Redis counter fallback to memory:', (err as Error)?.message);
    }
  }

  const now = Date.now();
  const existing = memMap.get(redisKey);
  if (existing && now < existing.resetAt) {
    existing.count += 1;
    return existing.count;
  }
  const entry: WindowCounter = { count: 1, resetAt: now + windowMs };
  memMap.set(redisKey, entry);
  return 1;
}

/**
 * Checks per-ipHash rate limits:
 * - Max 10 requests / minute
 * - Max 40 requests / hour
 */
export async function checkConciergeRateLimit(ipHash: string): Promise<{
  allowed: boolean;
  minuteCount: number;
  hourCount: number;
  retryAfterSeconds: number;
}> {
  const minKey = `ppos:concierge:rl:min:${ipHash}`;
  const hrKey = `ppos:concierge:rl:hr:${ipHash}`;

  const [minuteCount, hourCount] = await Promise.all([
    incrementWindowCounter(minKey, memMinuteStore, MINUTE_MS),
    incrementWindowCounter(hrKey, memHourStore, HOUR_MS),
  ]);

  if (minuteCount > RATE_LIMIT_PER_MINUTE) {
    return {
      allowed: false,
      minuteCount,
      hourCount,
      retryAfterSeconds: 60,
    };
  }

  if (hourCount > RATE_LIMIT_PER_HOUR) {
    return {
      allowed: false,
      minuteCount,
      hourCount,
      retryAfterSeconds: 300,
    };
  }

  return {
    allowed: true,
    minuteCount,
    hourCount,
    retryAfterSeconds: 0,
  };
}

/**
 * Checks and increments the Daily Global LLM Circuit Breaker.
 * Default limit: CONCIERGE_DAILY_MAX_CALLS (1500 calls/day).
 */
export async function checkDailyCircuitBreaker(): Promise<{
  allowed: boolean;
  dailyCount: number;
  maxDailyCalls: number;
}> {
  const rawMax = parseInt(process.env.CONCIERGE_DAILY_MAX_CALLS || '', 10);
  const maxDailyCalls = Number.isFinite(rawMax) && rawMax > 0 ? rawMax : DEFAULT_DAILY_MAX_CALLS;
  const dateKey = getUtcDateKey();
  const dailyKey = `ppos:concierge:cb:daily:${dateKey}`;

  const dailyCount = await incrementWindowCounter(dailyKey, memDailyCircuitStore, DAY_MS);

  return {
    allowed: dailyCount <= maxDailyCalls,
    dailyCount,
    maxDailyCalls,
  };
}

/**
 * Optional Cloudflare Turnstile verification hook.
 * If TURNSTILE_SECRET_KEY is configured in environment variables, validates X-Turnstile-Token
 * (or bodyToken) against https://challenges.cloudflare.com/turnstile/v0/siteverify.
 * If TURNSTILE_SECRET_KEY is not set yet, passes through without blocking legitimate traffic.
 */
export async function verifyTurnstileIfConfigured(
  req: NextRequest,
  bodyToken?: string
): Promise<{ ok: boolean; enforced: boolean }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secretKey) {
    return { ok: true, enforced: false };
  }

  const token =
    req.headers.get('x-turnstile-token')?.trim() ||
    req.headers.get('cf-turnstile-response')?.trim() ||
    (typeof bodyToken === 'string' ? bodyToken.trim() : '');

  if (!token) {
    return { ok: false, enforced: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.set('secret', secretKey);
    formData.set('response', token);
    const cfIp = req.headers.get('cf-connecting-ip')?.trim();
    if (cfIp) {
      formData.set('remoteip', cfIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    if (!res.ok) {
      return { ok: false, enforced: true };
    }

    const data = (await res.json()) as { success?: boolean };
    return { ok: Boolean(data.success), enforced: true };
  } catch (err) {
    console.error('[CONCIERGE-GUARD] Turnstile verification error:', err);
    return { ok: false, enforced: true };
  }
}

/**
 * Localized polite responses for rate limiting (429) and input length limits (400).
 */
export function getRateLimitMessage(locale: SupportedLocale): {
  reply: string;
  ctas: Array<{ label: string; href: string; external: boolean }>;
} {
  if (locale === 'de') {
    return {
      reply:
        'Du hast sehr viele Anfragen in kurzer Zeit gesendet. Bitte warte etwa **eine Minute**, bevor du die nächste Frage stellst, oder kontaktiere direkt unser Vertriebsteam.',
      ctas: [{ label: 'Vertriebsteam kontaktieren ➔', href: '/contact', external: false }],
    };
  }
  if (locale === 'en') {
    return {
      reply:
        'You have sent several requests in a short period. Please wait about **one minute** before sending another message, or reach out directly to our sales team.',
      ctas: [{ label: 'Contact Sales Team ➔', href: '/contact', external: false }],
    };
  }
  return {
    reply:
      'Has enviado muchas consultas seguidas en poco tiempo. Por favor, espera **un minuto** antes de enviar tu siguiente pregunta o contacta directamente con nuestro equipo comercial.',
    ctas: [{ label: 'Contactar con Ventas ➔', href: '/contact', external: false }],
  };
}

export function getInputTooLongMessage(locale: SupportedLocale): {
  reply: string;
  ctas: Array<{ label: string; href: string; external: boolean }>;
} {
  if (locale === 'de') {
    return {
      reply: `Deine Nachricht überschreitet das Limit von **${MAX_PROMPT_CHARS} Zeichen**. Bitte fasse deine Frage etwas kürzer zusammen, damit ich dir präzise helfen kann.`,
      ctas: [{ label: 'Vertriebsteam kontaktieren ➔', href: '/contact', external: false }],
    };
  }
  if (locale === 'en') {
    return {
      reply: `Your message exceeds the maximum length of **${MAX_PROMPT_CHARS} characters**. Please shorten your question slightly so I can assist you accurately.`,
      ctas: [{ label: 'Contact Sales Team ➔', href: '/contact', external: false }],
    };
  }
  return {
    reply: `Tu mensaje supera el límite máximo de **${MAX_PROMPT_CHARS} caracteres**. Por favor, resume tu consulta de forma más breve para que pueda ayudarte con precisión.`,
    ctas: [{ label: 'Contactar con Ventas ➔', href: '/contact', external: false }],
  };
}

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import {
  computeDailyIpHash,
  extractClientCountry,
  validateConciergeOrigin,
  getUtcDateKey,
} from '@/lib/concierge-guard';
import { sanitizeText, isEmailDomainAllowed } from '@/lib/security';
import { getOrCreateRedisClient } from '@/lib/redisRateLimitStore';

export const runtime = 'nodejs';

const MAX_LEAD_PAYLOAD_BYTES = 12 * 1024; // 12 KB
const MAX_LEADS_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

const memLeadRateStore = new Map<string, { count: number; resetAt: number }>();

const CommercialLeadSchema = z.object({
  profile: z.enum(['print_house', 'publisher', 'developer', 'paper_supplier']),
  companyName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  country: z.string().min(2).max(60),
  estimatedVolume: z.string().max(100).optional().default(''),
  message: z.string().max(800).optional().default(''),
  locale: z.enum(['es', 'en', 'de']).optional().default('es'),
  _honeypot: z.string().max(0).optional().default(''),
});

const PROFILE_PLAN_MAP: Record<
  'print_house' | 'publisher' | 'developer' | 'paper_supplier',
  {
    planCode: string;
    planLabel: { es: string; en: string; de: string };
    assignedChannel: string;
  }
> = {
  print_house: {
    planCode: 'PRINTHOUSE_LICENSE_500_YR_4PCT',
    planLabel: {
      es: 'Licencia Imprenta (500 € / año + 4% comisión Marketplace)',
      en: 'Printhouse License (€500 / year + 4% Marketplace fee)',
      de: 'Druckerei-Lizenz (500 € / Jahr + 4 % Marketplace-Gebühr)',
    },
    assignedChannel: 'ecosystem@printprice.pro',
  },
  developer: {
    planCode: 'DEVELOPER_API_MCP_45_MO',
    planLabel: {
      es: 'Plan Desarrolladores API Keys & MCP (45 € / mes)',
      en: 'Developer API Keys & MCP Plan (€45 / month)',
      de: 'Entwickler API-Keys & MCP Tarif (45 € / Monat)',
    },
    assignedChannel: 'api-support@printprice.pro',
  },
  publisher: {
    planCode: 'PUBLISHER_ZERO_SUB_PAY_PER_RUN',
    planLabel: {
      es: 'Editorial / Autor (0 € / mes · Sin suscripción obligatoria)',
      en: 'Publisher / Author (€0 / month · No mandatory subscription)',
      de: 'Verlag / Autor (0 € / Monat · Kein Pflicht-Abo)',
    },
    assignedChannel: 'info@printprice.pro',
  },
  paper_supplier: {
    planCode: 'PAPER_SUPPLIER_HUB_FEDERATION',
    planLabel: {
      es: 'Paper Supplier Hub (Catálogo Maestro de Sustratos)',
      en: 'Paper Supplier Hub (Master Substrate Catalog)',
      de: 'Paper Supplier Hub (Master-Substratkatalog)',
    },
    assignedChannel: 'ecosystem@printprice.pro',
  },
};

async function checkLeadRateLimit(ipHash: string): Promise<boolean> {
  const key = `ppos:leads:rl:hr:${ipHash}`;
  const redisUrl = process.env.PPOS_REDIS_URL || process.env.REDIS_URL;

  if (redisUrl) {
    try {
      const client = getOrCreateRedisClient(redisUrl);
      const count = await client.incr(key);
      if (count === 1) {
        await client.pexpire(key, HOUR_MS);
      }
      return Number(count) <= MAX_LEADS_PER_HOUR;
    } catch {
      // fallback to memory
    }
  }

  const now = Date.now();
  const existing = memLeadRateStore.get(key);
  if (existing && now < existing.resetAt) {
    existing.count += 1;
    return existing.count <= MAX_LEADS_PER_HOUR;
  }
  memLeadRateStore.set(key, { count: 1, resetAt: now + HOUR_MS });
  return true;
}

export async function POST(request: NextRequest) {
  const ipHash = computeDailyIpHash(request);
  const countryHeader = extractClientCountry(request);

  // 1. Strict Origin validation
  const originCheck = validateConciergeOrigin(request);
  if (!originCheck.allowed) {
    return NextResponse.json({ error: 'Forbidden: Unauthorized origin' }, { status: 403 });
  }

  // 2. Payload size cap
  const rawText = await request.text().catch(() => '');
  if (!rawText || Buffer.byteLength(rawText, 'utf8') > MAX_LEAD_PAYLOAD_BYTES) {
    return NextResponse.json({ error: 'Invalid or oversized payload' }, { status: 413 });
  }

  let rawBody: Record<string, unknown> = {};
  try {
    rawBody = JSON.parse(rawText);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // 3. Rate limit check (5 submissions / hour per ipHash)
  const allowed = await checkLeadRateLimit(ipHash);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  // 4. Schema validation
  const parsed = CommercialLeadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed. Please check all required fields.' },
      { status: 400 }
    );
  }

  const data = parsed.data;
  if (data._honeypot) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
  }

  if (!isEmailDomainAllowed(data.email)) {
    return NextResponse.json(
      { error: 'Disposable email addresses are not permitted for commercial onboarding.' },
      { status: 400 }
    );
  }

  const cleanCompany = sanitizeText(data.companyName);
  const cleanContact = sanitizeText(data.contactName);
  const cleanCountry = sanitizeText(data.country);
  const cleanVolume = sanitizeText(data.estimatedVolume);
  const cleanMessage = sanitizeText(data.message);
  const profileInfo = PROFILE_PLAN_MAP[data.profile];

  // 5. Automatic Lead Qualification Tier
  let qualificationTier: 'HIGH_PRIORITY' | 'FAST_TRACK' | 'STANDARD' = 'STANDARD';
  if (data.profile === 'print_house' || data.profile === 'developer') {
    qualificationTier = 'HIGH_PRIORITY';
  } else if (cleanVolume && (cleanVolume.includes('50') || cleanVolume.includes('100') || cleanVolume.includes('25'))) {
    qualificationTier = 'FAST_TRACK';
  }

  const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${ipHash.slice(0, 4).toUpperCase()}`;
  const ts = new Date().toISOString();

  const leadRecord = {
    leadId,
    ts,
    ipHash,
    geoCountry: countryHeader,
    locale: data.locale,
    profile: data.profile,
    planCode: profileInfo.planCode,
    assignedChannel: profileInfo.assignedChannel,
    qualificationTier,
    targetSlaMinutes: 15,
    companyName: cleanCompany,
    contactName: cleanContact,
    email: data.email.toLowerCase().trim(),
    country: cleanCountry,
    estimatedVolume: cleanVolume,
    message: cleanMessage,
    webhookDispatched: false,
  };

  // 6. Optional Real-Time n8n / CRM Webhook Dispatch (HMAC-SHA256 signed)
  const webhookUrl =
    process.env.PPOS_N8N_LEAD_WEBHOOK_URL?.trim() ||
    process.env.PPOS_CRM_WEBHOOK_URL?.trim();

  if (webhookUrl) {
    try {
      const payloadStr = JSON.stringify(leadRecord);
      const secret = process.env.PPOS_PROXY_SECRET || 'ppos-lead-webhook-secret';
      const signature = createHmac('sha256', secret).update(payloadStr).digest('hex');

      const whRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-PPOS-Signature-256': `sha256=${signature}`,
          'X-PPOS-Event': 'commercial.lead.qualified',
        },
        body: payloadStr,
      });
      leadRecord.webhookDispatched = whRes.ok;
    } catch (err) {
      console.warn('[LEADS-API] Non-fatal webhook dispatch warning:', (err as Error)?.message);
    }
  }

  // 7. Persist to daily rotated JSONL log
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    await fs.promises.mkdir(logsDir, { recursive: true });
    const dateKey = getUtcDateKey(new Date(ts));
    const dailyFile = path.join(logsDir, `commercial-leads-${dateKey}.jsonl`);
    const currentFile = path.join(logsDir, 'commercial-leads.jsonl');
    const line = JSON.stringify(leadRecord) + '\n';

    await Promise.all([
      fs.promises.appendFile(dailyFile, line, 'utf8'),
      fs.promises.appendFile(currentFile, line, 'utf8'),
    ]);
  } catch (err) {
    console.warn('[LEADS-API] Non-fatal error persisting lead log:', (err as Error)?.message);
  }

  const locale = data.locale;
  const confirmationText =
    locale === 'de'
      ? `Vielen Dank, **${cleanContact}**! Deine Anfrage für **${cleanCompany}** (${profileInfo.planLabel.de}) wurde mit der Referenz **${leadId}** registriert. Unser Team (${profileInfo.assignedChannel}) meldet sich innerhalb der nächsten **15 Minuten** (SLA) bei dir.`
      : locale === 'en'
      ? `Thank you, **${cleanContact}**! Your request for **${cleanCompany}** (${profileInfo.planLabel.en}) has been registered under reference **${leadId}**. Our specialist desk (${profileInfo.assignedChannel}) will respond within **15 minutes** (SLA).`
      : `¡Gracias, **${cleanContact}**! Tu solicitud para **${cleanCompany}** (${profileInfo.planLabel.es}) ha quedado registrada con la referencia **${leadId}**. Nuestro equipo especialista (${profileInfo.assignedChannel}) te responderá en menos de **15 minutos** (SLA).`;

  return NextResponse.json(
    {
      ok: true,
      leadId,
      profile: data.profile,
      planCode: profileInfo.planCode,
      planLabel: profileInfo.planLabel[locale],
      assignedChannel: profileInfo.assignedChannel,
      qualificationTier,
      targetSlaMinutes: 15,
      confirmationText,
    },
    {
      status: 201,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    }
  );
}

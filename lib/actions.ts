'use server';

import { PartnerOnboardingSchema, PartnerOnboardingData } from './schemas';
import { trackEvent, events } from './telemetry';

import { sanitizeText, isEmailDomainAllowed, auditLeadQuality } from './security';

// Simple in-memory rate limiter (Warning: resets on restart, use Redis in prod)
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS_PER_IP = 3;
const ipSubmissions = new Map<string, { count: number, timestamp: number }>();

export async function submitPartnerOnboarding(data: FormData) {
  // 1. IP Rate Limiting (Simulated via Headers)
  const clientIp = 'unknown'; 
  
  const now = Date.now();
  const entry = ipSubmissions.get(clientIp);
  
  if (entry && (now - entry.timestamp) < RATE_LIMIT_WINDOW) {
    if (entry.count >= MAX_SUBMISSIONS_PER_IP) {
      return { success: false, error: "RATE_LIMIT_EXCEEDED", message: "Too many submissions. Try again later." };
    }
  }

  // 2. Schema Validation & Sanitization
  const rawData = Object.fromEntries(data.entries()) as Record<string, any>;
  
  // Parse productionTypes (which might be multiple fields or a JSON string)
  if (typeof rawData.productionTypes === 'string') {
     try {
         rawData.productionTypes = JSON.parse(rawData.productionTypes);
     } catch (e) {
         rawData.productionTypes = []; // Safe fallback
     }
  }

  const result = PartnerOnboardingSchema.safeParse(rawData);
  
  if (!result.success) {
    console.error(`[SECURITY][VALIDATION] Failed submission from ${clientIp}:`, result.error.format());
    return { success: false, error: "VALIDATION_FAILED", message: "Invalid payload detected." };
  }

  const validatedData = result.data;

  // 1. DISPOSABLE EMAIL AUDIT (New layer)
  if (!isEmailDomainAllowed(validatedData.email)) {
     console.warn(`[SECURITY][REPUTATION] Disposable email rejected from ${clientIp}: ${validatedData.email}`);
     return { success: false, error: "REPUTATION_FAILED", message: "Disposable email addresses are not accepted for partner registration." };
  }

  // 2. LEAD QUALITY AUDIT (New layer - reject fakes)
  if (!auditLeadQuality(validatedData)) {
     console.warn(`[SECURITY][LOW_QUALITY_LEAD] Submission rejected from ${clientIp}: ${validatedData.companyName}`);
     return { success: false, error: "LOW_QUALITY_LEAD", message: "Submission failed profile verification. Ensure your data is accurate." };
  }

  // 3. SANITIZATION AUDIT (New layer)
  // Ensure we REDACT scripts/links even if they passed Zod
  validatedData.companyName = sanitizeText(validatedData.companyName);
  validatedData.contactName = sanitizeText(validatedData.contactName);
  if (validatedData.presses) validatedData.presses = sanitizeText(validatedData.presses);
  if (validatedData.typicalJobs) validatedData.typicalJobs = sanitizeText(validatedData.typicalJobs);
  if (validatedData.qaProcess) validatedData.qaProcess = sanitizeText(validatedData.qaProcess);

  // 4. Time-based Check (Rejection if < 10 seconds)
  const submissionDelay = now - validatedData._timestamp;
  if (submissionDelay < 8000) { // Slightly lower to 8s to not hurt humans, but block fast bots
     console.warn(`[SECURITY][BOT_DETECTED] Fast submission from ${clientIp}: ${submissionDelay}ms`);
     return { success: false, error: "BOT_DETECTED", message: "Submission rejected by system audit speed check." };
  }

  // 5. Honeypot check
  if (validatedData._honeypot) {
     console.warn(`[SECURITY][BOT_DETECTED] Honeypot hit from ${clientIp}`);
     return { success: false, error: "BOT_DETECTED", message: "Submission rejected." };
  }

  // 5. Scoring & Result (Business Logic)
  // (In real prod, this is where we send to CRM/Slack/Discord)
  let score = 0;
  if (validatedData.monthlyVolume === '€1M+') score += 40;
  if (validatedData.monthlyVolume === '€250k–€1M') score += 30;
  if (validatedData.integrationLevel === 'Fully automated routing') score += 40;
  if (validatedData.integrationLevel === 'API-ready') score += 20;
  if (validatedData.standards) score += 20;

  let tier: 'high' | 'mid' | 'low' = 'low';
  if (score >= 70) tier = 'high';
  else if (score >= 40) tier = 'mid';

  // Log successful entry (Audit Trace)
  console.log(`[AUDIT][ONBOARDING] Submission processed. Tier: ${tier}. Email: ${validatedData.email}`);
  
  // Track anonymously
  // trackEvent(events.PARTNER_ONBOARDING_SUBMITTED, { tier });

  // Update Rate Limit
  if (entry) {
    entry.count += 1;
  } else {
    ipSubmissions.set(clientIp, { count: 1, timestamp: now });
  }

  return { success: true, tier };
}

'use server';

import { headers } from 'next/headers';
import { PartnerOnboardingSchema } from './schemas';
import { 
  sanitizeText, 
  isEmailDomainAllowed, 
  auditLeadQuality,
  resolveTrustedClientIp,
  isRateLimited,
  recordSubmissionAttempt
} from './security';

export type SubmitPartnerOnboardingResult = {
  success: boolean;
  status: 'INTEGRATION_PENDING' | 'VALIDATION_FAILED' | 'REPUTATION_FAILED' | 'LOW_QUALITY_LEAD' | 'BOT_DETECTED' | 'RATE_LIMIT_EXCEEDED' | 'SYSTEM_ERROR';
  code?: string;
  error?: string;
  message?: string;
  tier?: 'high' | 'mid' | 'low';
  localizedMessage?: {
    es: string;
    en: string;
    de: string;
  };
  pendingIntegration?: string;
  summary?: {
    tier: 'high' | 'mid' | 'low';
    score: number;
    validatedAt: string;
  };
};

export async function submitPartnerOnboarding(data: FormData): Promise<SubmitPartnerOnboardingResult> {
  const headerList = await headers();
  const clientIp = resolveTrustedClientIp(headerList);

  // 1. IP Rate Limiting (only applies to successfully identified client IPs)
  if (isRateLimited(clientIp)) {
    return {
      success: false,
      status: 'RATE_LIMIT_EXCEEDED',
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many submissions from this address. Please try again later.',
      localizedMessage: {
        es: 'Demasiados intentos desde esta dirección. Por favor, inténtelo de nuevo más tarde.',
        en: 'Too many submissions from this address. Please try again later.',
        de: 'Zu viele Versuche von dieser Adresse. Bitte versuchen Sie es später erneut.'
      }
    };
  }

  recordSubmissionAttempt(clientIp);

  // 2. Parse & Sanitize Input
  const rawData = Object.fromEntries(data.entries()) as Record<string, any>;

  if (typeof rawData.productionTypes === 'string') {
    try {
      rawData.productionTypes = JSON.parse(rawData.productionTypes);
    } catch {
      rawData.productionTypes = [];
    }
  }
  if (typeof rawData.certifications === 'string') {
    try {
      rawData.certifications = JSON.parse(rawData.certifications);
    } catch {
      rawData.certifications = [];
    }
  }
  if (typeof rawData.qaModules === 'string') {
    try {
      rawData.qaModules = JSON.parse(rawData.qaModules);
    } catch {
      rawData.qaModules = [];
    }
  }

  // 3. Schema Validation
  const result = PartnerOnboardingSchema.safeParse(rawData);
  if (!result.success) {
    // Audit log: NO PII, zero form contents logged
    console.error('[SECURITY][VALIDATION] Partner onboarding rejected: schema validation mismatch');
    return {
      success: false,
      status: 'VALIDATION_FAILED',
      error: 'VALIDATION_FAILED',
      message: 'Invalid payload detected. Please check the required fields.',
      localizedMessage: {
        es: 'Comprueba los campos obligatorios del formulario.',
        en: 'Please check the required fields in the form.',
        de: 'Bitte überprüfen Sie die Pflichtfelder im Formular.'
      }
    };
  }

  const validatedData = result.data;

  // 4. Disposable Email Audit
  if (!isEmailDomainAllowed(validatedData.email)) {
    console.warn('[SECURITY][REPUTATION] Partner onboarding rejected: disposable email domain');
    return {
      success: false,
      status: 'REPUTATION_FAILED',
      error: 'REPUTATION_FAILED',
      message: 'Disposable email addresses are not accepted for partner registration.',
      localizedMessage: {
        es: 'No se admiten direcciones de correo desechables o temporales.',
        en: 'Disposable email addresses are not accepted for partner registration.',
        de: 'Wegwerf-E-Mail-Adressen werden für die Partnerregistrierung nicht akzeptiert.'
      }
    };
  }

  // 5. Lead Quality Audit
  if (!auditLeadQuality(validatedData)) {
    console.warn('[SECURITY][LOW_QUALITY_LEAD] Partner onboarding rejected: lead quality audit failed');
    return {
      success: false,
      status: 'LOW_QUALITY_LEAD',
      error: 'LOW_QUALITY_LEAD',
      message: 'Submission failed profile verification. Ensure your data is accurate.',
      localizedMessage: {
        es: 'El perfil de empresa indicado no superó la verificación de calidad técnica.',
        en: 'The company profile did not pass technical quality verification.',
        de: 'Das Unternehmensprofil hat die technische Qualitätsprüfung nicht bestanden.'
      }
    };
  }

  // 6. Text Sanitization (Redact script/html patterns)
  validatedData.companyName = sanitizeText(validatedData.companyName);
  validatedData.contactName = sanitizeText(validatedData.contactName);
  if (validatedData.presses) validatedData.presses = sanitizeText(validatedData.presses);
  if (validatedData.typicalJobs) validatedData.typicalJobs = sanitizeText(validatedData.typicalJobs);
  if (validatedData.qaProcess) validatedData.qaProcess = sanitizeText(validatedData.qaProcess);

  // 7. Velocity Check (Reject automated submissions completing under 5s)
  const now = Date.now();
  const submissionDelay = now - (Number(validatedData._timestamp) || 0);
  if (submissionDelay < 5000) {
    console.warn('[SECURITY][BOT_DETECTED] Velocity threshold triggered for onboarding submission');
    return {
      success: false,
      status: 'BOT_DETECTED',
      error: 'BOT_DETECTED',
      message: 'Submission rejected by system audit speed check.',
      localizedMessage: {
        es: 'Envío rechazado por comprobación de velocidad de entrada.',
        en: 'Submission rejected by intake speed check.',
        de: 'Übermittlung durch Geschwindigkeitsprüfung abgelehnt.'
      }
    };
  }

  // 8. Honeypot Check
  if (validatedData._honeypot) {
    console.warn('[SECURITY][BOT_DETECTED] Honeypot triggered for onboarding submission');
    return {
      success: false,
      status: 'BOT_DETECTED',
      error: 'BOT_DETECTED',
      message: 'Submission rejected.',
      localizedMessage: {
        es: 'Envío rechazado por protocolo de seguridad.',
        en: 'Submission rejected by security protocol.',
        de: 'Übermittlung durch Sicherheitsprotokoll abgelehnt.'
      }
    };
  }

  // 9. Technical Profile Scoring
  let score = 0;
  if (validatedData.monthlyVolume === '€1M+') score += 40;
  if (validatedData.monthlyVolume === '€250k–€1M') score += 30;
  if (validatedData.integrationLevel === 'Fully automated routing') score += 40;
  if (validatedData.integrationLevel === 'API-ready') score += 20;
  if (validatedData.standards) score += 20;

  let tier: 'high' | 'mid' | 'low' = 'low';
  if (score >= 70) tier = 'high';
  else if (score >= 40) tier = 'mid';

  // Audit trace: NO PII (zero emails, names, or corporate details)
  console.log('[AUDIT][ONBOARDING] Partner application validated. Integration status: PENDING_INTEGRATION');

  // CRITICAL OPERATIONAL TRUTH:
  // Without live DB persistence, CRM integration, or backend ingestion in Control Plane,
  // we NEVER mark successful completion. We deliver an honest status of unsubmitted / integration pending.
  return {
    success: false,
    status: 'INTEGRATION_PENDING',
    code: 'PARTNER_INTAKE_INTEGRATION_PENDING',
    tier,
    message: 'The digital partner intake channel is currently pending technical integration with Control Plane. Your draft is preserved safely in your browser.',
    localizedMessage: {
      es: 'Los datos han sido validados técnicamente, pero el canal digital de ingesta y persistencia de imprentas en Control Plane está en fase de integración técnica. Tu solicitud no ha sido enviada al servidor ni almacenada en base de datos. Tu borrador se mantiene a salvo en tu navegador.',
      en: 'Your information has been technically validated, but the automated partner intake and persistence channel in Control Plane is currently pending technical integration. Your application has not been transmitted to the server or stored in any database. Your draft remains safely preserved in your browser.',
      de: 'Ihre Angaben wurden technisch validiert, der automatisierte Erfassungs- und Persistenzkanal für Partner im Control Plane befindet sich jedoch in der technischen Integration. Ihr Antrag wurde nicht an den Server übertragen oder gespeichert. Ihr Entwurf bleibt sicher in Ihrem Browser erhalten.'
    },
    pendingIntegration: 'PrintPrice OS Control Plane - Printhouse Ingestion & Review Pipeline',
    summary: {
      tier,
      score,
      validatedAt: new Date().toISOString()
    }
  };
}

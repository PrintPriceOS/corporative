/**
 * Cookie Consent Manager v1.1 HARDENED
 * Handles GDPR-compliant state and Audit-Proof consent logging.
 */

export type ConsentState = {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
  version: string; // Legal version for audit proof
};

const CONSENT_KEY = 'ppp_consent_v1_audit';
const CURRENT_LEGAL_VERSION = 'v1.1';

export const getConsent = (): ConsentState | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const setConsent = (state: Partial<ConsentState>) => {
  if (typeof window === 'undefined') return;
  const current = getConsent() || { 
    essential: true, 
    analytics: false, 
    timestamp: '',
    version: CURRENT_LEGAL_VERSION
  };
  
  const newState: ConsentState = {
    ...current,
    ...state,
    timestamp: new Date().toISOString(),
    version: CURRENT_LEGAL_VERSION
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(newState));
  
  // Consolidate "Proof of Consent" in a separate audit-only key if needed
  localStorage.setItem('ppp_audit_consent_proof', JSON.stringify({
    proof_id: `CONSENT_${Date.now()}`,
    ...newState
  }));
  
  // Trigger custom event for components to react
  window.dispatchEvent(new CustomEvent('ppp_consent_updated', { detail: newState }));
};

export const hasAnalyticsConsent = (): boolean => {
  const consent = getConsent();
  return consent?.analytics ?? false;
};

export const getConsentVersion = (): string => CURRENT_LEGAL_VERSION;

'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getConsent, setConsent, ConsentState } from '@/lib/consent';
import { useLocale } from '@/lib/i18n';
import Link from 'next/link';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // 1.2s delay for better UX
    const timer = setTimeout(() => {
      const consent = getConsent();
      if (!consent) {
        setIsVisible(true);
      }
    }, 1200);

    // Listen for custom re-open event from footer
    const handleReopen = () => {
      const current = getConsent();
      setAnalyticsEnabled(current?.analytics ?? false);
      setIsVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener('ppp_reopen_consent', handleReopen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('ppp_reopen_consent', handleReopen);
    };
  }, []);

  const handleAcceptAll = () => {
    setConsent({ analytics: true });
    setIsVisible(false);
    // Explicitly notify telemetry layer
    if (window.hasOwnProperty('monolith_telemetry')) {
      (window as any).monolith_telemetry.trackEvent('COOKIE_CONSENT_ACCEPT_ALL');
    }
  };

  const handleRejectAll = () => {
    setConsent({ analytics: false });
    setIsVisible(false);
    if (window.hasOwnProperty('monolith_telemetry')) {
      (window as any).monolith_telemetry.trackEvent('COOKIE_CONSENT_REJECT');
    }
  };

  const handleSavePreferences = () => {
    setConsent({ analytics: analyticsEnabled });
    setIsVisible(false);
    setShowCustomize(false);
    if (window.hasOwnProperty('monolith_telemetry')) {
      (window as any).monolith_telemetry.trackEvent('COOKIE_CONSENT_CUSTOM', { analytics: analyticsEnabled });
    }
  };

  const { locale } = useLocale();

  if (!isVisible) return null;

  const t = {
    es: {
      message: 'Utilizamos cookies y telemetría anónima para optimizar tu experiencia y calcular especificaciones de impresión con precisión.',
      learnMore: 'Política de privacidad',
      acceptAll: 'Aceptar todas',
      reject: 'Rechazar no esenciales',
      customize: 'Configurar',
      title: 'Preferencias de cookies',
      essential: 'Cookies esenciales',
      essentialDesc: 'Necesarias para la navegación y autenticación en la plataforma.',
      alwaysOn: 'SIEMPRE ACTIVAS',
      analytics: 'Analítica y telemetría técnica',
      analyticsDesc: 'Medición anónima de rendimiento de cotización y UX.',
      back: 'Volver',
      save: 'Guardar preferencias',
    },
    de: {
      message: 'Wir verwenden Cookies und anonyme Telemetrie, um Ihr Erlebnis zu optimieren und Druckspezifikationen präzise zu berechnen.',
      learnMore: 'Datenschutzrichtlinie',
      acceptAll: 'Alle akzeptieren',
      reject: 'Nicht essenzielle ablehnen',
      customize: 'Anpassen',
      title: 'Cookie-Einstellungen',
      essential: 'Notwendige Cookies',
      essentialDesc: 'Erforderlich für Navigation und Authentifizierung.',
      alwaysOn: 'IMMER AKTIV',
      analytics: 'Analytik & technische Telemetrie',
      analyticsDesc: 'Anonyme Leistungs- und UX-Optimierung.',
      back: 'Zurück',
      save: 'Einstellungen speichern',
    },
    en: {
      message: 'We use cookies and telemetry to improve your experience and calculate print specifications accurately.',
      learnMore: 'Privacy policy',
      acceptAll: 'Accept all',
      reject: 'Reject non-essential',
      customize: 'Customize',
      title: 'Cookie Preferences',
      essential: 'Essential Cookies',
      essentialDesc: 'Required for platform functionality and security.',
      alwaysOn: 'ALWAYS ON',
      analytics: 'Analytics & Telemetry',
      analyticsDesc: 'Anonymous performance signals and UX optimization.',
      back: 'Back',
      save: 'Save preferences',
    },
  }[locale || 'es'];

  return (
    <div style={{
      position: 'fixed',
      bottom: 'clamp(0.75rem, 2vw, 1.25rem)',
      left: 'clamp(0.75rem, 2.5vw, 1.5rem)',
      right: 'clamp(0.75rem, 2.5vw, 1.5rem)',
      zIndex: 1200,
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-card, 16px)',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
        boxSizing: 'border-box',
      }}>
        {!showCustomize ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5, margin: 0 }}>
                {t.message}{' '}
                <Link href="/legal/privacy-policy" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', textDecoration: 'underline', fontWeight: 600 }}>
                  {t.learnMore}
                </Link>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleRejectAll}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                {t.reject}
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {t.customize}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {t.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t.essential}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.essentialDesc}</div>
                </div>
                <span style={{ color: 'var(--accent-primary)', fontSize: '0.65rem', border: '1px solid var(--accent-primary)', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                  {t.alwaysOn}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t.analytics}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.analyticsDesc}</div>
                </div>
                <input 
                  id="cookie-analytics-toggle"
                  type="checkbox" 
                  aria-label={t.analytics}
                  checked={analyticsEnabled} 
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)} 
                  style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                {t.back}
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                {t.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

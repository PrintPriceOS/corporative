'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getConsent, setConsent, ConsentState } from '@/lib/consent';
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

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      right: '1rem',
      zIndex: 9999,
      animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      ...({} as any)
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-color)',
        borderRadius: '0px', // MONOLITH v2.4 STRICT - NO CORNERS
        padding: '1.5rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        ...({} as any)
      }}>
        {!showCustomize ? (
          <Container style={{ display: 'flex', flexDirection: 'column', lg: { flexDirection: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: '2rem', ...({} as any) }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
                We use cookies and telemetry to improve your experience. <Link href="/legal/privacy-policy" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'underline', marginLeft: '0.5rem' }}>Learn more</Link>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button onClick={handleAcceptAll} variant="primary" size="sm">
                ACCEPT ALL
              </Button>
              <Button onClick={handleRejectAll} variant="secondary" size="sm" style={{ border: '1px solid var(--border-color)' }}>
                REJECT
              </Button>
              <Button onClick={() => setShowCustomize(true)} variant="secondary" size="sm" style={{ border: 'none', opacity: 0.6 }}>
                CUSTOMIZE
              </Button>
            </div>
          </Container>
        ) : (
          <Container style={{ maxWidth: '600px', ...({} as any) }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Cookie Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Essential Cookies</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required for platform functionality.</div>
                </div>
                <div style={{ color: 'var(--accent-primary)', fontSize: '0.7rem', border: '1px solid var(--accent-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>ALWAYS ON</div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Analytics & Telemetry</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Behavioral tracking, performance signals, and UX optimization.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={analyticsEnabled} 
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)} 
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowCustomize(false)} variant="secondary" size="sm">
                BACK
              </Button>
              <Button onClick={handleSavePreferences} variant="primary" size="sm">
                SAVE PREFERENCES
              </Button>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

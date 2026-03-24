'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initTelemetry } from '@/lib/telemetry';
import { getConsent } from '@/lib/consent';

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Initial State Check
    const consent = getConsent();
    const shouldTrack = consent?.analytics || false;

    if (shouldTrack) {
      // Initialize on first load AND on every soft navigation if consent exists
      initTelemetry();
    }

    // 2. React to Consent Updates (Banner interaction)
    const handleConsentUpdate = (event: any) => {
      const newConsent = event.detail;
      if (newConsent.analytics) {
        initTelemetry();
      }
    };

    window.addEventListener('ppp_consent_updated', handleConsentUpdate);
    return () => {
      window.removeEventListener('ppp_consent_updated', handleConsentUpdate);
    };
  }, [pathname]); // Keep pathname to track navigations IF consent is granted

  return <>{children}</>;
};

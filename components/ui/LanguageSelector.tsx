'use client';

import React from 'react';
import { useLocale, Locale } from '@/lib/i18n';

export const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const languages: { code: Locale; label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <div
      role="group"
      aria-label="Seleccionar idioma / Select language / Sprache wählen"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border-color)',
        padding: '2px',
        gap: '2px',
      }}
    >
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLocale(lang.code)}
            aria-pressed={isActive}
            style={{
              border: 'none',
              background: isActive ? 'var(--accent-primary)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease, color 0.15s ease',
            }}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

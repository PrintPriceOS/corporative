'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import Link from 'next/link';
import ShapeGrid from '../ui/ShapeGrid';
import { trackEvent, events } from '@/lib/telemetry';
import { useLocale } from '@/lib/i18n';

/**
 * ACTION CTA v3.4 - "UNIVERSAL MONOLITH"
 * 
 * Re-engineered to support custom content while maintaining 
 * the interactive ShapeGrid background.
 */

interface ActionCTAProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  slogan?: string;
  trackingAction?: string;
  footerNote?: string;
  children?: React.ReactNode;
}

export const ActionCTA: React.FC<ActionCTAProps> = ({
  title,
  description,
  buttonLabel,
  buttonHref = "https://budget.printprice.pro/",
  secondaryButtonLabel,
  secondaryButtonHref,
  slogan,
  trackingAction = "final_cta_calculation",
  footerNote,
  children
}) => {
  const { locale } = useLocale();

  const finalTitle = title || (
    locale === 'es'
      ? '¿Listo para optimizar tu cadena de producción?'
      : locale === 'de'
      ? 'Bereit, Ihre Produktionskette zu optimieren?'
      : 'Ready to optimize your production chain?'
  );

  const finalDescription = description || (
    locale === 'es'
      ? 'Presupuesto técnico estructurado y validación de archivos editoriales conectando autores y editoriales con talleres homologados.'
      : locale === 'de'
      ? 'Strukturierte technische Kalkulation und forensische Druckdatenprüfung verbinden Autoren und Verlage mit zertifizierten Druckereien.'
      : 'Structured technical pricing and forensic prepress validation connecting creators and publishers with certified print shops.'
  );

  const finalButtonLabel = buttonLabel || (
    locale === 'es' ? 'CALCULAR MI COSTE ➔' : locale === 'de' ? 'KOSTEN BERECHNEN ➔' : 'CALCULATE MY COST ➔'
  );

  const finalSlogan = slogan || (
    locale === 'es' ? 'INICIA TU CÁLCULO DE IMPRESIÓN' : locale === 'de' ? 'STARTEN SIE IHRE DRUCKKALKULATION' : 'START YOUR PRINT CALCULATION'
  );

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: '650px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0e0e0f', // DEEP MONOLITH BLACK
        color: '#e5e2e3',
        padding: '5rem 2rem',
        borderTop: '1px solid var(--border-color)'
      }}
      data-monolith-section="action-cta"
    >
      {/* 1. BACKGROUND LAYER (Full Section Coverage) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <ShapeGrid
          speed={0.4}
          squareSize={65}
          direction="diagonal"
          borderColor="rgba(133, 0, 0, 0.15)"
          hoverFillColor="rgba(255, 0, 0, 0.35)"
          shape="square"
          hoverTrailAmount={12}
        />
      </div>

      {/* 2. GRADIENT VIGNETTE (Adds depth and focus) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(14, 14, 15, 0.8) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      {/* 3. CONTENT LAYER (Centered Technical Hub) */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px', textAlign: 'center', pointerEvents: 'none' }}>
        <style>{`
          .action-cta-title {
            font-size: clamp(2.2rem, 7vw, 4.5rem);
            letter-spacing: -0.04em;
            margin-bottom: 1.5rem;
            color: #e5e2e3;
            font-family: var(--font-display);
            line-height: 1.1;
            text-wrap: balance;
            overflow-wrap: break-word;
          }
          .action-cta-buttons {
            display: flex;
            gap: 1.25rem;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
          }
          .action-cta-btn {
            min-width: 240px;
            white-space: nowrap;
          }
          @media (max-width: 768px) {
            .action-cta-title {
              font-size: clamp(1.75rem, 6.5vw, 2.4rem) !important;
              line-height: 1.2 !important;
            }
            .action-cta-buttons {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 0.75rem !important;
            }
            .action-cta-buttons > * {
              width: 100% !important;
            }
            .action-cta-btn {
              width: 100% !important;
              min-width: 0 !important;
              padding: 0.85rem 1.25rem !important;
              font-size: clamp(0.85rem, 3.8vw, 0.95rem) !important;
              white-space: nowrap !important;
              justify-content: center !important;
            }
          }
        `}</style>

        <Container>
          {slogan === 'PRICE IT. FIX IT. PRINT IT.' ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                marginBottom: '2rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                background: 'rgba(220, 0, 0, 0.08)',
                border: '1px solid rgba(220, 0, 0, 0.3)',
              }}
            >
              <span>PRICE IT.</span>
              <span style={{ color: '#dc0000' }}>FIX IT.</span>
              <span>PRINT IT.</span>
            </div>
          ) : (
            <div
              className="technical-text"
              style={{
                color: '#dc0000',
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                marginBottom: '2rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}
            >
              {finalSlogan}
            </div>
          )}

          <h2 className="action-cta-title">
            {finalTitle}
          </h2>

          <p style={{
            color: '#8d8d91',
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            marginBottom: '3.5rem',
            maxWidth: '750px',
            marginInline: 'auto',
            lineHeight: 1.55,
            fontWeight: 400,
            textWrap: 'pretty'
          }}>
            {finalDescription}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', pointerEvents: 'auto', width: '100%' }}>
            <div className="action-cta-buttons">
              <Link
                href={buttonHref}
                style={{ textDecoration: 'none' }}
                onClick={() => trackEvent(events.DECISION_MADE, { action: trackingAction })}
              >
                <Button size="lg" className="action-cta-btn">
                  {finalButtonLabel}
                </Button>
              </Link>

              {secondaryButtonLabel && secondaryButtonHref && (
                <Link href={secondaryButtonHref} style={{ textDecoration: 'none' }}>
                  <Button variant="ghost" size="lg" className="action-cta-btn" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                    {secondaryButtonLabel}
                  </Button>
                </Link>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.5 }} className="technical-text">
              <span style={{ fontSize: '0.7rem' }}>{locale === 'es' ? 'RED TÉCNICA DE PRODUCCIÓN' : locale === 'de' ? 'TECHNISCHES PRODUKTIONSNETZWERK' : 'TECHNICAL PRODUCTION NETWORK'}</span>
              <span style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '0.7rem' }}>{locale === 'es' ? 'FEDERACIÓN DE TALLERES HOMOLOGADOS' : locale === 'de' ? 'FEDERATION ZERTIFIZIERTER DRUCKEREIEN' : 'CERTIFIED WORKSHOP FEDERATION'}</span>
            </div>

            {footerNote && (
              <p className="technical-text" style={{ fontSize: '0.75rem', opacity: 0.6, maxWidth: '650px', marginInline: 'auto', lineHeight: 1.6, letterSpacing: '0.05em', marginTop: '0.5rem' }}>
                {footerNote}
              </p>
            )}

            {children}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ActionCTA;

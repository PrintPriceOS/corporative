'use client';

import React, { useEffect, useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { trackEvent, events } from '@/lib/telemetry';

import Hyperspeed from '../ui/effects/Hyperspeed';
import { hyperspeedPresets } from '../ui/effects/HyperSpeedPresets';
import { Logo } from '../brand/Logo';
import Particles from '../ui/effects/Particles';

interface HeroPlatformProps {
  label: string;
  title?: string | React.ReactNode;
  slogan?: string[]; // ["PRICE IT.", "FIX IT.", "PRINT IT."]
  subheadline?: string | React.ReactNode;
  primaryAction?: { label: string; href: string; sublabel?: string };
  secondaryAction?: { label: string; href: string };
  isHeadlineSlogan?: boolean;
  variant?: 'hyperspeed' | 'particles';
  rightContent?: React.ReactNode;
}

export const HeroPlatform: React.FC<HeroPlatformProps> = ({ 
  label, 
  title, 
  slogan, 
  subheadline,
  primaryAction, 
  secondaryAction,
  isHeadlineSlogan = true,
  variant = 'hyperspeed',
  rightContent
}) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (slogan) {
      const timers = slogan.map((_, index) => 
        setTimeout(() => setVisibleLines(index + 1), (index + 1) * 150)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [slogan]);

  const backgroundEffect = (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 0, 
      opacity: 1.0,
      pointerEvents: 'none',
      ...({} as any)
    }}>
      {variant === 'hyperspeed' ? (
        <Hyperspeed effectOptions={hyperspeedPresets.two} />
      ) : (
        <Particles
          particleColors={["#c70000"]}
          particleCount={800}
          particleSpread={15}
          speed={0.5}
          particleBaseSize={12}
          moveParticlesOnHover={true}
          particleHoverFactor={1.2}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={3}
          cameraDistance={15}
        />
      )}
    </div>
  );

  return (
    <div className="hero-dark">
      <Section 
        background={backgroundEffect}
        style={{ 
          paddingTop: 'clamp(6rem, 15vw, 12rem)', 
          position: 'relative', 
          overflow: 'hidden',
          background: '#131314', // FORCED DARK
          color: '#e5e2e3',      // FORCED DARK
          ...({} as any) 
        }}
      >
        <style>{`
          .hero-label {
            color: #dc0000;
            font-size: clamp(0.7rem, 2vw, 0.8rem);
            text-transform: uppercase;
            letter-spacing: 0.15rem;
            margin-bottom: clamp(1.25rem, 3.5vw, 2rem);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 700;
            line-height: 1.4;
          }
          .hero-title {
            font-size: clamp(2.4rem, 6.5vw, 4.5rem);
            line-height: 1.08;
            letter-spacing: -0.04em;
            margin-bottom: clamp(1rem, 3vw, 1.5rem);
            color: #e5e2e3;
            text-wrap: balance;
            overflow-wrap: break-word;
            word-break: normal;
            hyphens: auto;
          }
          .hero-slogan-headline {
            font-size: clamp(2.5rem, 9.5vw, 5.5rem);
            line-height: 0.95;
            letter-spacing: -0.06em;
            margin-bottom: clamp(1rem, 3vw, 1.5rem);
            color: #e5e2e3;
            display: flex;
            flex-direction: column;
          }
          .hero-subheadline {
            font-size: clamp(1.05rem, 3.5vw, 1.4rem);
            color: #8d8d91;
            line-height: 1.5;
            margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
            max-width: 650px;
            font-weight: 500;
            letter-spacing: -0.01em;
            text-wrap: pretty;
            overflow-wrap: break-word;
          }
          .hero-slogan-inline {
            display: flex;
            gap: 1.25rem;
            margin-bottom: clamp(2rem, 5vw, 3.5rem);
            font-size: clamp(0.8rem, 2.5vw, 1.15rem);
            font-weight: 900;
            letter-spacing: 0.08em;
            color: #8d8d91;
            flex-wrap: wrap;
          }
          .hero-actions {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            align-items: flex-start;
            transition: opacity 1s ease;
          }
          .hero-buttons-row {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
          }
          .hero-btn {
            white-space: nowrap;
            padding: 0.95rem 1.75rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 48px;
            box-sizing: border-box;
          }
          @media (max-width: 768px) {
            .hero-label {
              letter-spacing: 0.08rem !important;
              font-size: 0.68rem !important;
              flex-wrap: wrap;
              gap: 0.5rem;
            }
            .hero-title {
              font-size: clamp(1.75rem, 7vw, 2.4rem) !important;
              line-height: 1.18 !important;
              letter-spacing: -0.025em !important;
              margin-bottom: 1.25rem !important;
            }
            .hero-slogan-headline {
              font-size: clamp(2.2rem, 9vw, 3.5rem) !important;
              line-height: 0.98 !important;
              letter-spacing: -0.04em !important;
            }
            .hero-subheadline {
              font-size: clamp(0.95rem, 3.8vw, 1.15rem) !important;
              line-height: 1.55 !important;
              margin-bottom: 2rem !important;
            }
            .hero-slogan-inline {
              gap: 0.75rem 1.25rem !important;
              margin-bottom: 2rem !important;
            }
            .hero-actions {
              width: 100%;
            }
            .hero-buttons-row {
              flex-direction: column;
              width: 100%;
              gap: 0.75rem;
            }
            .hero-buttons-row > * {
              width: 100%;
            }
            .hero-btn {
              width: 100% !important;
              padding: 0.85rem 1.25rem !important;
              font-size: clamp(0.85rem, 3.8vw, 0.95rem) !important;
              white-space: nowrap !important;
              text-align: center !important;
              justify-content: center !important;
              min-height: 46px !important;
            }
          }
          @media (max-width: 480px) {
            .hero-title {
              font-size: clamp(1.55rem, 7.5vw, 2rem) !important;
              line-height: 1.2 !important;
              letter-spacing: -0.02em !important;
            }
            .hero-slogan-headline {
              font-size: clamp(1.95rem, 9vw, 2.6rem) !important;
              line-height: 1 !important;
              letter-spacing: -0.03em !important;
            }
          }
        `}</style>
        
        {/* CONTENT LAYER */}
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          display: rightContent ? 'grid' : 'block',
          gridTemplateColumns: rightContent ? 'repeat(auto-fit, minmax(min(500px, 100%), 1fr))' : 'none',
          gap: '4rem',
          alignItems: 'center',
          ...({} as any) 
        }}>
          <div>
            <span className="hero-label technical-text">
              <Logo size={24} />
              {label}
            </span>

          {title ? (
            <h1 className="hero-title">
              {title}
            </h1>
          ) : slogan && isHeadlineSlogan && (
            <h1 className="hero-slogan-headline">
              {slogan.map((line, i) => (
                <span 
                  key={i} 
                  style={{ 
                    color: line.includes('FIX') ? '#dc0000' : 'inherit',
                    opacity: visibleLines > i ? 1 : 0,
                    transform: visibleLines > i ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>
          )}

          {slogan && !isHeadlineSlogan && (
            <div className="hero-slogan-inline technical-text">
                {slogan.map((line, i) => (
                    <span key={i} style={{ color: line.includes('FIX') ? '#dc0000' : 'inherit' }}>{line}</span>
                ))}
            </div>
          )}

          {subheadline && (
            <div className="hero-subheadline">
              {subheadline}
            </div>
          )}

          <div 
            className="hero-actions"
            style={{ 
              opacity: (slogan ? visibleLines === slogan.length : true) ? 1 : 0,
              ...({} as any) 
            }}
          >
            <div className="hero-buttons-row">
              {primaryAction && (
                <Link 
                    href={primaryAction.href} 
                    data-monolith-action="hero_slogan_engaged"
                    onClick={() => {
                        trackEvent(events.HERO_PRIMARY_CLICK, { label: primaryAction.label });
                        trackEvent(events.DECISION_MADE, { action: "hero_primary_audit" });
                    }}
                    style={{ textDecoration: 'none' }}
                >
                  <Button 
                    size="lg" 
                    className="hero-btn"
                  >
                    {primaryAction.label}
                  </Button>
                </Link>
              )}
              {secondaryAction && (
                <Link 
                  href={secondaryAction.href} 
                  data-monolith-action={`hero_secondary_explore_${secondaryAction.label}`}
                  onClick={() => {
                      trackEvent(events.HERO_SECONDARY_CLICK, { label: secondaryAction.label });
                      trackEvent(events.DECISION_MADE, { action: "hero_secondary_explore" });
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="hero-btn"
                    style={{ 
                      color: '#e5e2e3', 
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    {secondaryAction.label}
                  </Button>
                </Link>
              )}
            </div>

            {primaryAction?.sublabel && (
              <span className="technical-text" style={{ 
                  fontSize: '0.65rem', 
                  color: '#8d8d91', // Hardcoded Gray
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  opacity: 0.7,
                  maxWidth: '560px',
                  lineHeight: 1.5,
                  ...({} as any) 
              }}>
                  {primaryAction.sublabel}
              </span>
            )}
          </div>
          </div>
          {rightContent && (
            <div style={{ position: 'relative', zIndex: 2 }}>
              {rightContent}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

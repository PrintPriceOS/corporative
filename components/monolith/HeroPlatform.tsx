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
          .hero-actions {
            display: flex;
            gap: 2rem;
            align-items: flex-start;
            transition: opacity 1s ease;
          }
          @media (max-width: 768px) {
            .hero-actions {
              flex-direction: column;
              width: 100%;
            }
            .hero-actions > * { width: 100%; }
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
            <span className="technical-text" style={{ 
            color: '#dc0000', // Hardcoded Red Accent
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2rem',
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: 700,
            ...({} as any)
          }}>
            <Logo size={24} />
            {label}
          </span>

          {title ? (
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 10vw, 5.5rem)', 
              lineHeight: 0.95, 
              letterSpacing: '-0.06em',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              color: '#e5e2e3',
              ...({} as any)
            }}>
              {title}
            </h1>
          ) : slogan && isHeadlineSlogan && (
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 10vw, 5.5rem)', 
              lineHeight: 0.95, 
              letterSpacing: '-0.06em',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              color: '#e5e2e3',
              display: 'flex',
              flexDirection: 'column',
              ...({} as any)
            }}>
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
            <div className="technical-text" style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
                fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)',
                fontWeight: 900,
                letterSpacing: '0.1em',
                color: '#8d8d91'
            }}>
                {slogan.map((line, i) => (
                    <span key={i} style={{ color: line.includes('FIX') ? '#dc0000' : 'inherit' }}>{line}</span>
                ))}
            </div>
          )}

          {subheadline && (
            <div style={{ 
              fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', 
              color: '#8d8d91', // Hardcoded Gray
              lineHeight: 1.4, 
              marginBottom: 'clamp(3rem, 8vw, 5rem)', 
              maxWidth: '650px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              opacity: 1,
              transition: 'opacity 1s ease',
              ...({} as any)
            }}>
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
            {primaryAction && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'auto', ...({} as any) }}>
                <Link 
                    href={primaryAction.href} 
                    style={{ width: 'inherit' }}
                    data-monolith-action="hero_slogan_engaged"
                    onClick={() => {
                        trackEvent(events.HERO_PRIMARY_CLICK, { label: primaryAction.label });
                        trackEvent(events.DECISION_MADE, { action: "hero_primary_audit" });
                    }}
                >
                  <Button size="lg" style={{ width: '100%' }}>{primaryAction.label}</Button>
                </Link>
                {primaryAction.sublabel && (
                    <span className="technical-text" style={{ 
                        fontSize: '0.65rem', 
                        color: '#8d8d91', // Hardcoded Gray
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        opacity: 0.7,
                        ...({} as any) 
                    }}>
                        {primaryAction.sublabel}
                    </span>
                )}
              </div>
            )}
            {secondaryAction && (
              <Link 
                href={secondaryAction.href} 
                data-monolith-action={`hero_secondary_explore_${secondaryAction.label}`}
                onClick={() => {
                    trackEvent(events.HERO_SECONDARY_CLICK, { label: secondaryAction.label });
                    trackEvent(events.DECISION_MADE, { action: "hero_secondary_explore" });
                }}
              >
                <Button variant="secondary" size="lg" style={{ width: '100%', color: '#e5e2e3', borderColor: 'rgba(255,255,255,0.1)' }}>{secondaryAction.label}</Button>
              </Link>
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

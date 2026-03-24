'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import Link from 'next/link';
import ShapeGrid from '../ui/ShapeGrid';
import { trackEvent, events } from '@/lib/telemetry';

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
}

export const ActionCTA: React.FC<ActionCTAProps> = ({
  title = "Ready to optimize your production chain?",
  description = "Join the nodes of the world's first production operating system. Get exact costs and validate your files in seconds.",
  buttonLabel = "CALCULATE MY COST",
  buttonHref = "https://budget.printprice.pro/",
  secondaryButtonLabel,
  secondaryButtonHref,
  slogan = "START YOUR PRINT CALCULATION",
  trackingAction = "final_cta_calculation"
}) => {
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
        padding: '0 2rem'
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
        <Container>
            <div
                className="technical-text"
                style={{ 
                    color: '#dc0000', 
                    fontSize: '0.75rem', 
                    letterSpacing: '0.3em', 
                    marginBottom: '2.5rem', 
                    fontWeight: 800,
                    textTransform: 'uppercase'
                }}
            >
                {slogan}
            </div>
            
            <h2 style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
                letterSpacing: '-0.05em', 
                marginBottom: '1.5rem',
                color: '#e5e2e3',
                fontFamily: 'var(--font-display)',
                lineHeight: 1.05
            }}>
                {title}
            </h2>
            
            <p style={{ 
                color: '#8d8d91', 
                fontSize: 'clamp(1rem, 3vw, 1.4rem)', 
                marginBottom: '4.5rem', 
                maxWidth: '750px', 
                marginInline: 'auto', 
                lineHeight: 1.5,
                fontWeight: 400
            }}>
              {description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', pointerEvents: 'auto' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link
                        href={buttonHref}
                        onClick={() => trackEvent(events.DECISION_MADE, { action: trackingAction })}
                    >
                        <Button size="lg" style={{ minWidth: '280px' }}>
                            {buttonLabel}
                        </Button>
                    </Link>

                    {secondaryButtonLabel && secondaryButtonHref && (
                        <Link href={secondaryButtonHref}>
                            <Button variant="ghost" size="lg" style={{ minWidth: '220px', borderColor: 'rgba(255,255,255,0.1)' }}>
                                {secondaryButtonLabel}
                            </Button>
                        </Link>
                    )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.5 }} className="technical-text">
                    <span style={{ fontSize: '0.7rem' }}>NODES AVAILABLE: 1,280</span>
                    <span style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '0.7rem' }}>REGION: GLOBAL EDGE</span>
                </div>
            </div>
        </Container>
      </div>
    </div>
  );
};

export default ActionCTA;

'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '../ui/Icon';

const nodes = [
  { name: 'Specs', icon: 'specs' },
  { name: 'Price', icon: 'price' },
  { name: 'House', icon: 'factory' },
  { name: 'Fix', icon: 'fix' },
  { name: 'Print', icon: 'print' },
];

export const ProcessRail: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Media query for responsive switch
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);

    let frameId: number;
    const startTime = performance.now();
    const cycleDuration = 8000;

    const update = (now: number) => {
      const elapsed = (now - startTime) % cycleDuration;
      setProgress(elapsed / cycleDuration);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frameId);
      mql.removeEventListener('change', handler);
    };
  }, []);

  const travelProgress = Math.min(progress / 0.75, 1);
  const isReady = progress > 0.75;
  const nodeIndex = isReady ? -1 : Math.round(travelProgress * (nodes.length - 1));

  const paddingSide = isMobile ? '1.5rem' : '5rem';
  const paddingTopBottomNum = isMobile ? 6 : 4;
  const paddingTopBottom = `${paddingTopBottomNum}rem`;

  return (
    <div style={{ marginBottom: 'clamp(4rem, 10vw, 6rem)', position: 'relative', width: '100%', overflow: 'hidden', ...({} as any) }}>
      <div style={{ 
        background: 'var(--bg-secondary)', 
        padding: `${paddingTopBottom} ${paddingSide}`, 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: isMobile ? '4rem' : '0',
        position: 'relative',
        minHeight: isMobile ? '600px' : 'auto',
        ...({} as any)
      }} data-monolith-action="flow_animated_viewed">
        
        {/* Baseline */}
        <div style={{ 
          position: 'absolute', 
          top: isMobile ? paddingTopBottom : `calc(${paddingTopBottomNum}rem + 1.75rem)`, 
          left: isMobile ? '50%' : paddingSide, 
          right: isMobile ? 'auto' : paddingSide,
          bottom: isMobile ? paddingTopBottom : 'auto',
          width: isMobile ? '1px' : 'auto',
          height: isMobile ? 'auto' : '1px',
          background: 'rgba(128,128,128,0.1)',
          zIndex: 0,
          ...({} as any) 
        }} />

        {/* Animated Signal */}
        {!isReady && (
          <div style={{ 
            position: 'absolute',
            top: isMobile 
              ? `calc(${paddingTopBottom} + ${travelProgress * (100 - paddingTopBottomNum * 2)}%)`
              : `calc(${paddingTopBottomNum}rem + 1.75rem)`,
            left: isMobile 
              ? '50%'
              : `calc(${paddingSide} + ${travelProgress * (100)}% - ${travelProgress * 10}rem)`,
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '2px' : '100px',
            height: isMobile ? '100px' : '2px',
            background: isMobile 
              ? 'linear-gradient(180deg, transparent, var(--accent-primary), transparent)'
              : 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
            boxShadow: '0 0 20px var(--accent-primary)',
            zIndex: 1,
            opacity: travelProgress < 0.05 ? travelProgress * 20 : (travelProgress > 0.95 ? (1 - travelProgress) * 20 : 1),
            pointerEvents: 'none',
            ...({} as any)
          }} />
        )}

        {nodes.map((node, i) => {
          const isActive = nodeIndex === i;
          return (
            <div key={node.name} style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'row' : 'column', 
              alignItems: 'center', 
              gap: isMobile ? '1rem' : '1.5rem', 
              width: '100%',
              justifyContent: isMobile ? 'center' : 'center',
              position: 'relative',
              zIndex: 2,
              ...({} as any) 
            }}>
              {/* Left Label (Mobile: Right Align) */}
              <span className="technical-text" style={{ 
                fontSize: '0.65rem', 
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', 
                opacity: isActive ? 1 : 0.7,
                fontWeight: isActive ? 800 : 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                flex: isMobile ? 1 : 'none',
                textAlign: isMobile ? 'right' : 'center',
                paddingRight: isMobile ? '3rem' : '0',
                transition: 'all 0.15s ease-out',
                ...({} as any)
              }}>
                {node.name}
              </span>

              {/* Icon Container */}
              <div style={{
                display: 'flex',
                height: isMobile ? '3rem' : '3.5rem',
                width: isMobile ? '3rem' : '3.5rem',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                border: isActive ? '1px solid var(--accent-primary)' : '1px solid rgba(128,128,128,0.2)',
                background: isActive ? 'rgba(255,0,0,0.05)' : 'rgba(128,128,128,0.05)',
                boxShadow: isActive ? '0 0 25px rgba(255,0,0,0.15)' : 'none',
                transition: 'all 0.15s ease-out',
                ...({} as any)
              }}>
                <Icon name={node.icon as any} size={isMobile ? 20 : 24} style={{ color: isActive ? 'var(--accent-primary)' : 'rgba(128,128,128,0.4)' }} />
              </div>
              
              {/* Right Description (Mobile: Left Align) */}
              {isMobile ? (
                 <span className="technical-text" style={{ 
                    fontSize: '0.55rem', 
                    opacity: isActive ? 0.4 : 0.1,
                    letterSpacing: '0.05em',
                    flex: 1,
                    paddingLeft: '3rem',
                    textAlign: 'left'
                 }}>
                    {i === 0 && "Technical Input"}
                    {i === 1 && "Cost Calibration"}
                    {i === 2 && "Node Assignment"}
                    {i === 3 && "Asset Verification"}
                    {i === 4 && "Final Delivery"}
                 </span>
              ) : null}
            </div>
          );
        })}

        {/* READY Indicator */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '2rem' : '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          ...({} as any)
        }}>
           <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)', ...({} as any) }} />
           <span className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', letterSpacing: '0.2em' }}>PRODUCTION READY</span>
        </div>
      </div>
    </div>
  );
};

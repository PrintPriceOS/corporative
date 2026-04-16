'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '../ui/Icon';

const flowSteps = [
  { label: 'UPLOAD', status: 'RECEIVED', icon: 'web' },
  { label: 'ANALYZE', status: 'DETECTED', icon: 'activity' },
  { label: 'VALIDATE', status: 'ENFORCED', icon: 'policy' },
  { label: 'FIX', status: 'FIXED', icon: 'fix' },
  { label: 'READY', status: 'CERTIFIED', icon: 'print' },
];

export const PreflightDiagnosticPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 2500);

    return () => {
      clearInterval(interval);
      mql.removeEventListener('change', handler);
    };
  }, []);

  return (
    <div style={{ 
      background: 'var(--bg-secondary)', 
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '4rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h4 className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1rem', fontWeight: 900 }}>OPERATIONAL FLOW / preflight_v3</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>
            From raw file to production-ready output — automatically.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '3rem' : '1rem',
          position: 'relative',
          padding: isMobile ? '0 2rem' : '0'
        }}>
          {/* Connecting Line */}
          {!isMobile && (
            <div style={{ 
              position: 'absolute', 
              top: '1.75rem', 
              left: '5rem', 
              right: '5rem', 
              height: '1px', 
              background: 'rgba(255,255,255,0.05)',
              zIndex: 0 
            }} />
          )}

          {flowSteps.map((step, i) => {
            const isActive = activeStep === i;
            const isCompleted = activeStep > i;

            return (
              <div key={step.label} style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative',
                zIndex: 1,
                opacity: isActive ? 1 : 0.4,
                transition: 'all 0.4s ease'
              }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.1)',
                  background: isActive ? 'rgba(220, 0, 0, 0.05)' : 'var(--bg-primary)',
                  boxShadow: isActive ? '0 0 30px rgba(220, 0, 0, 0.15)' : 'none',
                  transition: 'all 0.4s ease'
                }}>
                  <Icon 
                    name={step.icon as any} 
                    size={22} 
                    style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)' }} 
                  />
                </div>

                <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
                  <div className="technical-text" style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 900, 
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem'
                  }}>
                    {step.label}
                  </div>
                  <div className="technical-text" style={{ 
                    fontSize: '0.6rem', 
                    opacity: 0.6,
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)'
                  }}>
                    {step.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Grid Pattern - Subtle Monolith v2.5 */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
    </div>
  );
};

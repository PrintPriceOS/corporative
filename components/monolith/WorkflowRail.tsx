'use client';

import React from 'react';
import Link from 'next/link';
import { trackEvent, events } from '@/lib/telemetry';

interface WorkflowStep {
  label: string;
  status: string;
  href?: string;
}

interface WorkflowRailProps {
  steps: WorkflowStep[];
  title: string;
}

export const WorkflowRail: React.FC<WorkflowRailProps> = ({ steps, title }) => {
  return (
    <div style={{ 
      background: 'var(--bg-secondary)', 
      padding: 'clamp(2rem, 8vw, 5rem)', 
      position: 'relative',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      ...({} as any) 
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem',
        ...({} as any) 
      }}>
        <h4 className="technical-text" style={{ 
          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', 
          color: 'var(--text-primary)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em',
          marginBottom: '1rem',
          ...({} as any)
        }}>
          {title} / real-time
        </h4>
        {steps.map((step, i) => {
          const content = (
            <div key={i} style={{ 
              background: 'var(--bg-primary)', 
              padding: '1.25rem 2rem', 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: step.href ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              borderLeft: step.status === 'READY' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              ...({} as any) 
            }} className={step.href ? "workflow-step-link" : ""}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', ...({} as any) }}>
                <div style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    background: step.status === 'DONE' || step.status === 'VALIDATED' || step.status === 'MATCHED' || step.status === 'READY' || step.status === 'OPTIMIZED' ? 'var(--accent-primary)' : 'var(--text-muted)',
                    opacity: step.status === 'READY' ? 1 : 0.6,
                    ...({} as any)
                }} />
                <code className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', ...({} as any) }}>{step.label}</code>
              </div>
              <code className="technical-text" style={{ 
                  fontSize: '0.7rem', 
                  color: step.status === 'READY' ? 'var(--accent-primary)' : 'var(--text-primary)', 
                  fontWeight: step.status === 'READY' ? 800 : 400,
                  ...({} as any) 
              }}>{step.status}</code>
            </div>
          );

          return step.href ? (
            <Link 
                href={step.href} 
                key={i} 
                onClick={() => trackEvent(events.WORKFLOW_STEP_CLICK, { step: step.label, href: step.href })}
            >
                {content}
            </Link>
          ) : content;
        })}
      </div>
      {/* Signature Texture (Monolith Rail) */}
      <div style={{ 
        position: 'absolute', 
        right: '2.5rem', 
        top: '50%', 
        width: '1px', 
        height: '80%', 
        transform: 'translateY(-50%)',
        background: 'var(--accent-primary)',
        opacity: 0.2,
        boxShadow: '0 0 10px var(--accent-primary)',
        ...({} as any)
      }} />
    </div>
  );
};

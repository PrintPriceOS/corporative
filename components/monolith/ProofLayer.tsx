'use client';

import React from 'react';
import { Section } from '../ui/Section';
import BorderGlow from '../ui/effects/BorderGlow';
import { Icon } from '../ui/Icon';

export const ProofLayer: React.FC = () => {
  return (
    <Section variant="secondary" showGrid={false} style={{ padding: 'var(--section-padding) 1.5rem', ...({} as any) }} data-monolith-action="proof_viewed">
      <style>{`
        @keyframes item-entry {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-item {
          opacity: 0;
          animation: item-entry 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }

        .system-panel-refined {
          border: 1px solid rgba(220, 0, 0, 0.1) !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .system-panel-refined:hover {
          border-color: rgba(220, 0, 0, 0.3) !important;
          box-shadow: 0 20px 40px rgba(220, 0, 0, 0.05);
          transform: translateY(-4px);
        }
      `}</style>

      <div style={{ marginBottom: 'clamp(4rem, 10vw, 8rem)', textAlign: 'center', ...({} as any) }}>
        <h4 className="technical-text" style={{ 
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', 
            color: 'var(--accent-primary)', 
            marginBottom: '1.5rem',
            letterSpacing: '0.2em',
            ...({} as any)
        }}>MANUAL VS AUTOMATED</h4>
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', letterSpacing: '-0.05em', fontWeight: 800, ...({} as any) }}>From manual guesswork <br/> to production certainty</h2>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', 
        gap: '3rem',
        position: 'relative',
        ...({} as any)
      }}>
        {/* BRIDGE INDICATOR (Desktop Only) */}
        <div className="hidden lg:flex" style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 10,
            background: 'var(--bg-secondary)',
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            boxShadow: '0 0 30px rgba(0,0,0,0.5)',
            ...({} as any)
        }}>
            <span style={{ fontSize: '1.5rem' }}>→</span>
        </div>

        {/* LEFT SIDE: THE PAIN */}
        <BorderGlow 
            key="proof-before"
            borderRadius={0}
            backgroundColor="transparent"
            className="product-card-glow"
            colors={['#333', '#111']} 
        >
            <div style={{ padding: 'clamp(2.5rem, 8vw, 5rem)', background: 'rgba(var(--text-primary-rgb, 128,128,128), 0.03)', height: '100%', ...({} as any) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--text-muted)', opacity: 0.5 }} />
                    <h3 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Manual Process / Legacy</h3>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2.5rem', ...({} as any) }}>
                    <li style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', opacity: 0.6, fontWeight: 400 }}>
                        <span style={{ color: 'var(--accent-primary)', marginRight: '1rem', opacity: 0.5 }}>✕</span>
                        You don’t know the real cost
                    </li>
                    <li style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', opacity: 0.6, fontWeight: 400 }}>
                        <span style={{ color: 'var(--accent-primary)', marginRight: '1rem', opacity: 0.5 }}>✕</span>
                        You fix files manually, again and again
                    </li>
                    <li style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', opacity: 0.6, fontWeight: 400 }}>
                        <span style={{ color: 'var(--accent-primary)', marginRight: '1rem', opacity: 0.5 }}>✕</span>
                        You choose printers without real data
                    </li>
                </ul>
            </div>
        </BorderGlow>

        {/* RIGHT SIDE: THE SOLUTION */}
        <BorderGlow 
            key="proof-after"
            borderRadius={0}
            backgroundColor="var(--bg-surface-glass)"
            className="product-card-glow system-panel-refined"
            colors={['#ff4d4d', '#ff0000', '#990000']} 
        >
            <div style={{ padding: 'clamp(2.5rem, 8vw, 5rem)', height: '100%', ...({} as any) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }} />
                    <h3 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900 }}>PrintPrice Engine / Monolith</h3>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2rem', ...({} as any) }}>
                    <li className="animate-item delay-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,0,0,0.03)', padding: '1.5rem', border: '1px solid rgba(255,0,0,0.1)', ...({} as any) }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Exact cost — instantly</span>
                        <span className="technical-text" style={{ fontSize: '0.6rem', padding: '0.4rem 0.8rem', background: 'var(--accent-primary)', color: '#fff', fontWeight: 900 }}>OPTIMIZED</span>
                    </li>
                    <li className="animate-item delay-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,0,0,0.03)', padding: '1.5rem', border: '1px solid rgba(255,0,0,0.1)', ...({} as any) }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Files validated — automatically</span>
                        <span className="technical-text" style={{ fontSize: '0.6rem', padding: '0.4rem 0.8rem', background: 'var(--accent-primary)', color: '#fff', fontWeight: 900 }}>VALIDATED</span>
                    </li>
                    <li className="animate-item delay-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,0,0,0.03)', padding: '1.5rem', border: '1px solid rgba(255,0,0,0.1)', ...({} as any) }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Best printer — selected for you</span>
                        <span className="technical-text" style={{ fontSize: '0.6rem', padding: '0.4rem 0.8rem', background: 'var(--accent-primary)', color: '#fff', fontWeight: 900 }}>READY</span>
                    </li>
                </ul>
            </div>
        </BorderGlow>
      </div>

      <div style={{ marginTop: 'clamp(4rem, 10vw, 6rem)', textAlign: 'center', ...({} as any) }}>
        <p className="technical-text" style={{ fontSize: '1.3rem', color: 'var(--accent-primary)', letterSpacing: '0.05em', fontWeight: 900, marginBottom: '0.5rem' }}>
            All decisions, in minutes.
        </p>
        <p className="technical-text" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', fontWeight: 600, opacity: 0.8 }}>
            From uncertainty to production-ready — instantly.
        </p>
        
        <div style={{ marginTop: '3rem', opacity: 0.15, fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.5em' }} className="technical-text">
            PRICE IT → FIX IT → PRINT IT
        </div>
      </div>
    </Section>
  );
};

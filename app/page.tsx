'use client';

import React from "react";
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ProductSurfaceGrid } from "@/components/monolith/ProductSurfaceGrid";
import { WorkflowRail } from "@/components/monolith/WorkflowRail";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProofLayer } from "@/components/monolith/ProofLayer";
import { FAQSection } from "@/components/monolith/FAQSection";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ProcessRail } from "@/components/monolith/ProcessRail";
import { trackEvent, events } from "@/lib/telemetry";
import { ActionCTA } from "@/components/monolith/ActionCTA";

import BorderGlow from "@/components/ui/effects/BorderGlow";

export default function Home() {
  return (
    <div className="landing-page">
      {/* 
        HERO SECTION - Growth Engine v1.6
        Optimized for Clarity and Transactional Intent
      */}
      <HeroPlatform
        label="Production Intelligence / v2.5 Certified"
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        subheadline={<>Know the exact cost. Fix your files <br /> Get the best printer instantly.</>}
        primaryAction={{
          label: "Calculate my print cost",
          href: "https://budget.printprice.pro/",
          sublabel: "Takes 2–3 minutes · No registration required · Instant result"
        }}
        secondaryAction={{ label: "View Manufacturing Assets", href: "/platform" }}
      />

      {/* 
        BENEFITS HUB - Redline v1.1
        From "Outcomes" to "What You Get"
      */}
      <ProductSurfaceGrid
        title="From cost to production, in minutes"
        subtitle="Know your cost, validate your files, and find the right printer — instantly."
        showGrid={false}
        showNumbers={true}
        products={[
          {
            name: 'Exact Print Cost',
            description: 'No estimates. Real numbers in seconds. Real validated production costs.',
            code: 'COST',
            status: 'LIVE',
            href: 'https://budget.printprice.pro/',
            ctaText: 'Calculate cost',
            icon: 'calculator'
          },
          {
            name: 'Forensic Validation',
            description: 'Automated file check. Every substrate and ink validated before print.',
            code: 'VALIDATE',
            status: 'VALIDATED',
            href: '/products/preflight',
            ctaText: 'Validate files',
            icon: 'shield'
          },
          {
            name: 'Intelligent Matching',
            description: 'The best manufacturing node automatically selected for your project.',
            code: 'SELECT',
            status: 'OPTIMIZED',
            href: '/products/control',
            ctaText: 'Find node',
            icon: 'command'
          },
          {
            name: 'Live Orchestration',
            description: 'Track production flow with zero lead time errors and smart routing.',
            code: 'ORCHESTRATE',
            status: 'READY',
            href: '/products/control',
            ctaText: 'Track flow',
            icon: 'orchestration'
          },
        ]}
      />

      {/* 
        PROCESS & EXAMPLE - Growth Engine v1.6.1 (Humanized Adjustment)
        Reducing Mental Friction to Zero
      */}
      <Section showGrid={false}>
        <ProcessRail />

        <style>{`
          .how-it-works-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: clamp(2rem, 10vw, 8rem);
            align-items: start;
            width: 100%;
          }
          
          @keyframes pulse-node {
            0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
          }

          @keyframes flow-path {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 200%; }
          }

          .animate-pulse-green {
            animation: pulse-node 2s infinite;
          }

          .animate-flow-path {
            background-size: 100% 200%;
            animation: flow-path 4s linear infinite;
          }

          @media (max-width: 1024px) {
            .how-it-works-grid {
              grid-template-columns: 1fr;
              gap: 4rem;
            }
          }
        `}</style>

        <div className="how-it-works-grid">
          <div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', letterSpacing: '-0.05em', marginBottom: 'clamp(2rem, 5vw, 4rem)', ...({} as any) }}>How It Works</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: 'clamp(4rem, 10vw, 6rem)', position: 'relative', ...({} as any) }}>
              {/* Vertical Connector Path - ANIMATED */}
              <div
                className="animate-flow-path"
                style={{
                  position: 'absolute',
                  top: '2rem',
                  left: '1.25rem',
                  bottom: '1rem',
                  width: '2px',
                  background: 'linear-gradient(to bottom, var(--accent-primary) 0%, transparent 50%, var(--accent-primary) 100%)',
                  opacity: 0.15,
                  zIndex: 0
                }}
              />

              <div style={{ display: 'flex', gap: '2.5rem', position: 'relative', zIndex: 1, ...({} as any) }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 900 }}>01</span>
                </div>
                <div>
                  <h3 className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>PRICE IT.</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Get the exact cost in seconds.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2.5rem', position: 'relative', zIndex: 1, ...({} as any) }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 900 }}>02</span>
                </div>
                <div>
                  <h3 className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>FIX IT.</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Automatically detect and fix file issues.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2.5rem', position: 'relative', zIndex: 1, ...({} as any) }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 900 }}>03</span>
                </div>
                <div>
                  <h3 className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>PRINT IT.</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Send your project to the best printer.</p>
                </div>
              </div>
            </div>

            {/* REAL EXAMPLE NODE - REFINED */}
            <BorderGlow
              borderRadius={0}
              backgroundColor="var(--bg-surface-glass)"
              colors={['#ff4d4d', '#ff0000', '#990000']}
            >
              <div style={{
                padding: 'clamp(2rem, 6vw, 4rem)',
                ...({} as any)
              }}
              >
                <div className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '1.5rem', letterSpacing: '0.2em' }}>OPERATIONAL CASE STUDY</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'center', ...({} as any) }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>2,000 Hardcover Books</span>
                  <div className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '0.25rem 0.5rem', fontWeight: 800 }}>VERIFIED SAVINGS</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem', ...({} as any) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '1rem', ...({} as any) }}>
                    <span>Traditional Market Quote</span>
                    <span>€12,400</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', ...({} as any) }}>
                    <span>PrintPrice Pro Cost</span>
                    <span style={{ color: 'var(--accent-primary)' }}>€9,870</span>
                  </div>
                </div>

                <div style={{
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  padding: '1.5rem',
                  textAlign: 'center',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  letterSpacing: '-0.03em',
                  ...({} as any)
                }}>
                  SAVE €2,530 PER RUN
                </div>
              </div>
            </BorderGlow>
          </div>

          <div style={{ paddingTop: 'clamp(0rem, 5vw, 6rem)', width: '100%', ...({} as any) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', ...({} as any) }}>
              <h4 className="technical-text" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', ...({} as any) }}>SYSTEM STATE</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="animate-pulse-green" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff00' }} />
                <span className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.8 }}>ONLINE / OPS-ACTIVE</span>
              </div>
            </div>

            <WorkflowRail
              title="Execution Pipeline"
              steps={[
                { label: "ESTIMATION", status: "DONE", href: "https://budget.printprice.pro/" },
                { label: "FILES", status: "VALIDATED", href: "/products/preflight" },
                { label: "ORCHESTRATION", status: "READY", href: "/products/control" },
              ]}
            />

            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              border: '1px solid var(--accent-primary)',
              background: 'rgba(220, 0, 0, 0.03)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              ...({} as any)
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(220, 0, 0, 0.3)'
              }}>
                <Icon name="activity" size={20} style={{ color: '#fff' }} />
              </div>
              <div>
                <div className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900 }}>PRODUCTION READY</div>
                <div className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.85 }}>OPTIMIZED NODE ASSIGNED / READY FOR ACTIVATION</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PROOF LAYER */}
      <ProofLayer />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* FINAL CTA - PROJECTION v3.0 */}
      <ActionCTA />
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { trackEvent, events } from "@/lib/telemetry";
import Link from "next/link";

type UserType = "print_house" | "publisher" | "author" | "developer";

interface RouteConfig {
  id: UserType;
  title: string;
  description: string;
  cta: string;
  subtext: string;
  reason: string;
  icon: any;
  href: string;
  category: string;
}

const ROUTES: RouteConfig[] = [
  {
    id: "publisher",
    title: "Publisher",
    category: "OPERATIONAL WORKFLOW",
    description: "Calculate costs, validate files, and start production. Real-world, production-grade efficiency.",
    cta: "Start my project →",
    subtext: "→ Starts pricing workflow",
    reason: "Because you're exploring production tools",
    icon: "publisher",
    href: "https://budget.printprice.pro"
  },
  {
    id: "developer",
    title: "Developer",
    category: "TECHNICAL CONTROL",
    description: "Integrate pricing, validation, and production via API. Full technical control and automation.",
    cta: "Get API access →",
    subtext: "→ Opens API port",
    reason: "Because you explored technical documentation",
    icon: "developer",
    href: "/developers"
  },
  {
    id: "print_house",
    title: "Print House",
    category: "PARTNER ONBOARDING",
    description: "Receive validated production jobs and grow your capacity. Join the global supply network.",
    cta: "Become a partner →",
    subtext: "→ Starts partner onboarding",
    reason: "Because you're exploring operational solutions",
    icon: "factory",
    href: "/contact/partner"
  },
  {
    id: "author",
    title: "Author",
    category: "LIGHTWEIGHT TOOLS",
    description: "Fix your PDF or estimate printing cost in seconds. Simple, fast, zero friction.",
    cta: "Check my file →",
    subtext: "→ Upload or estimate instantly",
    reason: "Because you're looking for quick wins",
    icon: "author",
    href: "/products/preflight"
  }
];

export default function ContactPage() {
  const [inferredType, setInferredType] = useState<UserType | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    trackEvent(events.CONSULT_VIEW);

    const historyRaw = typeof window !== 'undefined' ? localStorage.getItem('ppos_telemetry_history') || '[]' : '[]';
    const history = JSON.parse(historyRaw);
    const paths = history.map((ev: any) => ev.path || '');
    
    let type: UserType | null = null;
    let conf = 0;
    
    if (paths.some((p: string) => p.includes('/developers') || p.includes('/docs'))) {
      type = "developer"; conf = 0.9;
    } else if (paths.some((p: string) => p.includes('/products/budget'))) {
      type = "publisher"; conf = 0.8;
    } else if (paths.some((p: string) => p.includes('/products/preflight'))) {
      type = "author"; conf = 0.7;
    } else if (paths.some((p: string) => p.includes('/solutions') || p.includes('/platform') || p.includes('/governance'))) {
      type = "print_house"; conf = 0.6;
    }

    setInferredType(type);
    setConfidence(conf);

    if (type) {
      trackEvent(events.INTENT_INFERRED, { inferred_user_type: type, confidence_score: conf });
    }
  }, []);

  const handleAction = (route: RouteConfig) => {
    trackEvent(events.INTENT_SELECTED, { 
        selected_user_type: route.id, 
        inferred_user_type: inferredType,
        is_recommended: route.id === inferredType 
    });
    
    setSelectedId(route.id);
    setIsTransitioning(true);
    
    setTimeout(() => {
        window.location.href = route.href;
    }, 400);
  };

  if (!mounted) return null;

  const recommendedRoute = inferredType ? ROUTES.find(r => r.id === inferredType) : null;
  const showRecommendation = inferredType && confidence > 0.6 && !showAll;

  return (
    <div className={`contact-page ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}`}>
      <HeroPlatform 
        label="ROUTING LAYER / v2.4"
        title={<>START WITH THE <br/> <span style={{ color: 'var(--accent-primary)' }}>RIGHT WORKFLOW</span></>}
        subheadline="Fastest way to pricing, validation, production, or API access. The system will guide you."
        isHeadlineSlogan={false}
      />

      <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '4rem', opacity: 0.5 }}>
          <p className="technical-text" style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}>PRICE IT → FIX IT → PRINT IT</p>
      </div>

      <Section variant="secondary">
        {showRecommendation && recommendedRoute ? (
          <div 
            style={{ 
                maxWidth: '900px', 
                margin: '0 auto',
                opacity: isTransitioning && selectedId !== recommendedRoute.id ? 0 : 1,
                transform: isTransitioning && selectedId === recommendedRoute.id ? 'scale(1.02)' : 'none',
                transition: 'all 0.4s ease'
            }}
            data-monolith-action="intent_recommended_shown"
          >
            <div style={{ 
              background: 'var(--bg-primary)', 
              border: '1px solid var(--accent-primary)', 
              padding: 'clamp(2rem, 5vw, 5rem)',
              position: 'relative',
              boxShadow: '0 0 50px rgba(255, 0, 0, 0.05)'
            }}>
                <div style={{ 
                    position: 'absolute', top: 0, left: '2rem', 
                    background: 'var(--accent-primary)', color: '#fff', 
                    padding: '0.35rem 1rem', fontSize: '0.7rem', 
                    fontWeight: 900, transform: 'translateY(-50%)',
                    letterSpacing: '0.15em'
                }}>
                    RECOMMENDED FOR YOU
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 4rem)', alignItems: 'center' }}>
                        <div style={{ 
                            width: '4.5rem', height: '4.5rem', background: 'var(--bg-secondary)', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            color: 'var(--accent-primary)', flexShrink: 0 
                        }}>
                            <Icon name={recommendedRoute.icon} size={36} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.04em' }}>
                                {recommendedRoute.title} Integration
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} className="technical-text">
                                {recommendedRoute.reason}
                            </p>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '60ch', lineHeight: 1.5 }}>
                            {recommendedRoute.description}
                        </p>
                        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Button 
                                    size="lg" 
                                    onClick={() => handleAction(recommendedRoute)}
                                    data-monolith-action="intent_recommended_clicked"
                                >
                                    {recommendedRoute.cta}
                                </Button>
                                <span className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.5, marginLeft: '4px' }}>{recommendedRoute.subtext}</span>
                            </div>
                            
                            <button 
                                onClick={() => { setShowAll(true); trackEvent(events.INTENT_OVERRIDE_CLICKED); }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.15em', paddingBottom: '2px', borderBottom: '1px solid currentColor' }}
                                data-monolith-action="intent_override_clicked"
                            >
                                I'm looking for something else
                            </button>
                        </div>
                    </div>
                </div>
                
                <div style={{ marginTop: '4rem', opacity: 0.4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="technical-text" style={{ fontSize: '0.65rem', fontWeight: 800 }}>STATE: CONFIDENT</div>
                    <div className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.6 }}>SYSTEM_INFERRED_v2.4</div>
                </div>
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem',
            opacity: 1,
            transition: 'opacity 0.4s ease'
          }}>
            {ROUTES.map((route) => (
              <div 
                key={route.id} 
                className={`intent-card ${selectedId === route.id ? 'selected' : ''} ${selectedId && selectedId !== route.id ? 'dimmed' : ''}`}
                style={{
                  padding: '3.5rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ 
                      width: '3.5rem', height: '3.5rem', background: 'var(--bg-secondary)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      marginBottom: '2.5rem', color: 'var(--accent-primary)' 
                  }}>
                    <Icon name={route.icon} size={28} />
                  </div>
                  <h4 className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '0.15em' }}>{route.category}</h4>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.04em' }}>{route.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '3rem' }}>{route.description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <Button 
                        variant="secondary" 
                        style={{ width: '100%' }}
                        onClick={() => handleAction(route)}
                        data-monolith-action="intent_selected"
                    >
                        {route.cta}
                    </Button>
                    <span className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.4, marginLeft: '2px' }}>{route.subtext}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section variant="primary">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Trusted by publishers and print houses worldwide</h3>
            <p className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.5, letterSpacing: '0.15em' }}>FROM FILE TO PRODUCTION — FULLY AUTOMATED</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
          {[
            { label: 'Global Sales', val: 'sales@printprice.pro' },
            { label: 'Partnerships', val: 'ecosystem@printprice.pro' },
            { label: 'Technical Ops', val: 'api-support@printprice.pro' },
          ].map((channel, i) => (
            <div key={i}>
              <h4 className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>{channel.label}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 800 }}>{channel.val}</p>
            </div>
          ))}
        </div>
      </Section>

      <style jsx>{`
        .intent-card:hover {
            border-color: var(--accent-primary) !important;
            box-shadow: 0 10px 40px rgba(255, 0, 0, 0.03);
        }
        .dimmed {
            opacity: 0.3;
            filter: grayscale(1);
        }
        .selected {
            border-color: var(--accent-primary) !important;
            transform: scale(1.02);
            z-index: 10;
        }
      `}</style>
    </div>
  );
}

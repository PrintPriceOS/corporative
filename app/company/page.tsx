import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";

export default function CompanyPage() {
  return (
    <div className="company-page">
      {/* Company Hero - Monolith Narrative */}
      <Section variant="primary" style={{ paddingTop: '10rem', ...({} as any) }}>
        <span className="technical-text" style={{ 
          color: 'var(--accent-primary)', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.2rem',
          marginBottom: '1.5rem',
          display: 'block',
          fontWeight: 900,
          ...({} as any)
        }}>
          ENGINEERING PRINCIPLES
        </span>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', 
          lineHeight: 0.95, 
          letterSpacing: '-0.06em',
          marginBottom: '2.5rem',
          maxWidth: '850px',
          ...({} as any)
        }}>
          ENGINEERING <br/>
          <span style={{ color: 'var(--accent-primary)' }}>PRODUCTION CERTAINTY</span>
        </h1>
        <p style={{ 
            fontSize: '1.4rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.5, 
            marginBottom: '2rem',
            maxWidth: '600px',
            ...({} as any)
        }}>
          We build the infrastructure that calculates, validates, and controls print production at scale. 
          From cost calculation to production control — every step is engineered, not guessed.
        </p>
        <p className="technical-text" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 800, opacity: 0.9, letterSpacing: '0.05em' }}>
            No estimates. No assumptions. No uncontrolled outcomes.
        </p>
      </Section>

      {/* Trust Signals Strip - UPGRADED TO LIVING SIGNALS v1.1.99.0 */}
      <div style={{ background: 'var(--bg-secondary)', padding: '5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background signal line */}
        <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: 0, 
            width: '100%', 
            height: '1px', 
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05) 50%, transparent)', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
        }}>
            <div style={{ 
                width: '150px', 
                height: '100%', 
                background: 'linear-gradient(to right, transparent, var(--accent-primary), transparent)', 
                opacity: 0.1,
                animation: 'monolith-sweep 6s infinite linear' 
            }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
            {[
                { icon: 'factory', label: 'Real production data — not estimates', status: 'VERIFIED' }, 
                { icon: 'orchestration', label: 'Every job is traceable', status: 'ACTIVE' }, 
                { icon: 'audit', label: 'Deterministic execution only', status: 'ENFORCED' }, 
                { icon: 'observability', label: 'No hidden states', status: 'VISIBLE' }
            ].map((item, i) => (
                <div key={i} className="trust-item" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.5rem', 
                    opacity: 0.6,
                    transition: 'all 0.4s ease',
                    cursor: 'default',
                    ...({} as any)
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: '32px', 
                        height: '32px', 
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        color: 'var(--accent-primary)',
                        transition: 'all 0.4s ease',
                    }}>
                        <Icon name={item.icon as any} size={16} />
                    </div>

                    <span className="technical-text" style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 900, 
                        letterSpacing: '0.1em',
                        transition: 'color 0.4s ease'
                    }}>{item.label}</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem' }}>
                        <div style={{ 
                            width: '4px', 
                            height: '4px', 
                            background: item.status === 'ENFORCED' ? 'var(--accent-primary)' : '#00ff00', 
                            borderRadius: '50%',
                            boxShadow: `0 0 8px ${item.status === 'ENFORCED' ? 'var(--accent-primary)' : '#00ff00'}`,
                            animation: 'monolith-pulse 2.5s infinite ease-in-out'
                        }}></div>
                        <span className="technical-text" style={{ fontSize: '0.65rem', fontWeight: 900, color: item.status === 'ENFORCED' ? 'var(--accent-primary)' : '#00ff00', opacity: 0.9 }}>{item.status}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* What we build Section */}
      <Section variant="primary" style={{ paddingBlock: '8rem' }}>
        <div style={{ marginBottom: '6rem', ...({} as any) }}>
          <h2 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '1.5rem', ...({} as any) }}>What we build</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '550px', ...({} as any) }}>
            Our focus is on the four pillars of modern production infrastructure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
          {[
            { tag: 'CALCULATE', icon: 'calculator', title: 'Pricing Algorithms', desc: 'We calculate real production costs — materials, processes, and constraints. No more manual estimates.' },
            { tag: 'VALIDATE', icon: 'shield', title: 'Validation Systems', desc: 'We verify files and enforce production rules before a single drop of ink is spent.' },
            { tag: 'CONTROL', icon: 'orchestration', title: 'Orchestration Logic', desc: 'We route, schedule, and control jobs across distributed manufacturing infrastructure.' },
            { tag: 'ENFORCE', icon: 'policy', title: 'Governance Layer', desc: 'Every decision is logged, enforced, and fully traceable. Mission-critical audit trails.' },
          ].map((feature, i) => (
            <div key={i} style={{ gridColumn: 'auto', height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{
                  padding: '3rem',
                  position: 'relative',
                  height: '100%'
                }}>
                  <div style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                  }}>
                    <Icon name={feature.icon as any} size={20} />
                  </div>
                  <span className="technical-text" style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--accent-primary)', 
                    opacity: 0.8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '1rem',
                    display: 'block',
                    fontWeight: 900
                  }}>{feature.tag}</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{feature.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* System Narrative - NEW */}
      <Section variant="secondary" style={{ paddingBlock: '8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '8rem', alignItems: 'center' }}>
            <div>
                <h2 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '2rem' }}>Built as a system, <br/> not a product</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '550px' }}>
                    Each module is part of a single, interconnected operating system. We don't build separate tools; we engineer the unified layer for print production.
                </p>
                
                <h4 className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '0.15em' }}>CORE SYSTEM MODULES</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {[
                        { label: 'Budget', icon: 'calculator', val: 'Cost Calculation' },
                        { label: 'Preflight', icon: 'shield', val: 'Validation' },
                        { label: 'Control', icon: 'command', val: 'Orchestration' },
                        { label: 'Governance', icon: 'policy', val: 'Enforcement' },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Icon name={item.icon as any} size={12} />
                                {item.label}
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{item.val}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '4rem', border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                <h4 className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '0.1em' }}>What this gives you</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                        { label: 'The real cost before printing', icon: 'calculator' },
                        { label: 'Files validated before production', icon: 'shield' },
                        { label: 'Jobs routed automatically', icon: 'orchestration' },
                        { label: 'Production fully traceable', icon: 'history' }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                            <Icon name={item.icon as any} size={16} style={{ color: 'var(--accent-primary)', opacity: 0.8 }} />
                            <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em' }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </Section>

      {/* Final Pass - Monolith Authority */}
      <Section variant="primary" style={{ paddingBlock: '10rem' }}>
        <div style={{ 
          padding: 'clamp(4rem, 10vw, 8rem)', 
          background: 'var(--bg-secondary)', 
          textAlign: 'center', 
          position: 'relative',
          ...({} as any) 
        }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.05em', marginBottom: '1.5rem', ...({} as any) }}>Run your production <br/> on PrintPrice OS.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '4rem', maxWidth: '550px', marginInline: 'auto', ...({} as any) }}>
            See how your production workflow would run on a system built for absolute certainty.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="https://budget.printprice.pro">
                    <Button size="lg">Start a project →</Button>
                </Link>
                <Link href="/contact">
                    <Button variant="secondary" size="lg">Talk to an architect →</Button>
                </Link>
            </div>
            <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.1em' }}>NO SETUP REQUIRED</span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '10rem', opacity: 0.4 }}>
            <p className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, maxWidth: '600px', marginInline: 'auto', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                PRINTPRICE OS IS BUILT FOR PRODUCTION ENVIRONMENTS <br/> WHERE ERRORS ARE NOT ACCEPTABLE.
            </p>
        </div>
      </Section>
    </div>
  );
}

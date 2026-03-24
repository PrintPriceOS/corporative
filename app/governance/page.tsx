import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Production Governance & Compliance",
  description: "Ensure deterministic execution and forensic auditability in print manufacturing. Discover how PrintPrice OS enforces structural policy across every production run.",
  canonical: "/governance"
});

export default function GovernancePage() {
  return (
    <div className="governance-page">
      {/* Governance Hero - Monolith Narrative */}
      <Section variant="primary" style={{ paddingTop: '10rem' }}>
        <span className="technical-text" style={{ 
          color: 'var(--accent-primary)', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.2rem',
          marginBottom: '1.5rem',
          display: 'block',
          fontWeight: 900
        }}>
          PRODUCTION CONTROL / v2.4-certified
        </span>
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', 
          lineHeight: 0.95, 
          letterSpacing: '-0.06em',
          marginBottom: '2.5rem'
        }}>
          YOUR PRODUCTION <br/>
          <span style={{ color: 'var(--accent-primary)' }}>CANNOT FAIL</span>
        </h1>
        <p style={{ 
            fontSize: '1.4rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.5, 
            marginBottom: '4rem',
            maxWidth: '650px'
        }}>
          Every production run — validated, controlled, and safe. We enforce structural policy 
          automatically to ensure zero errors and deterministic execution.
        </p>
        <div className="technical-text" style={{ fontSize: '0.75rem', opacity: 0.6, letterSpacing: '0.1em', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <span>EVERY ACTION IS RECORDED</span>
          <span>•</span>
          <span>NOTHING HAPPENS SILENTLY</span>
          <span>•</span>
          <span>EVERY DECISION IS TRACEABLE</span>
        </div>
      </Section>

      {/* How it works Section - NEW */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '8rem', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '6rem' }}>
              <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>SYSTEM TRUST</h4>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.05em', marginBottom: '2rem', lineHeight: 1.1 }}>How the system stays trustworthy</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '50ch' }}>
                We translate complex control into operational safety. Every action follows a deterministic path, ensuring zero unpredictable behavior and complete accountability.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {[
                { icon: 'history', title: 'Every action is recorded', desc: 'Each operation generates a verifiable record (Evidence Envelope). Nothing happens silently.' },
                { icon: 'command', title: 'Deterministic execution', desc: 'The same input always produces the same result. No unpredictable behavior or undefined states.' },
                { icon: 'policy', title: 'Rules enforced automatically', desc: 'Production follows strict rules (Policy Engine) that prevent invalid states and unsafe actions.' },
                { icon: 'eye', title: 'Full audit trail', desc: 'Every step — from pricing to production — is traceable, reviewable, and cryptographically signed.' },
                { icon: 'shield', title: 'Verified system actors', desc: 'Only validated components and trusted partners can participate in the production ecosystem.' },
                { icon: 'alert', title: 'Failures are controlled', desc: 'Errors are detected and handled by a structured error model — never silent, never random.' },
              ].map((item, i) => (
                <div key={i} style={{ gridColumn: 'auto', height: '100%' }}>
                  <SystemCardHover borderRadius={0}>
                    <div style={{ padding: '2.5rem', height: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Icon name={item.icon as any} size={18} style={{ color: 'var(--accent-primary)', opacity: 0.8 }} />
                        <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', opacity: 0.3 }}></div>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </SystemCardHover>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '4rem', opacity: 0.5, borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
              <div className="technical-text" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 800 }}>BUSINESS IMPACT:</div>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', fontSize: '0.8rem', fontWeight: 700 }}>
                <li>• NO COSTLY PRODUCTION ERRORS</li>
                <li>• NO REPRINTS</li>
                <li>• NO SURPRISE DELAYS</li>
              </ul>
            </div>
          </div>

          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '4rem', 
            border: '1px solid var(--accent-primary)',
            position: 'sticky',
            top: '8rem'
          }}>
            <h4 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '2rem' }}>EXAMPLE: FAILURE PREVENTED</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)' }}></div>
                    <span className="technical-text" style={{ fontSize: '0.9rem', fontWeight: 800 }}>INVALID FILE DETECTED</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.5 }}>
                    <div style={{ width: '8px', height: '8px', border: '1px solid currentColor' }}></div>
                    <span className="technical-text" style={{ fontSize: '0.8rem' }}>Validation blocked</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.5 }}>
                    <div style={{ width: '8px', height: '8px', border: '1px solid currentColor' }}></div>
                    <span className="technical-text" style={{ fontSize: '0.8rem' }}>Policy enforced</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#00ff00' }}>
                    <div style={{ width: '8px', height: '8px', background: 'currentColor' }}></div>
                    <span className="technical-text" style={{ fontSize: '0.9rem', fontWeight: 900 }}>PRODUCTION STOPPED SAFELY</span>
                </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Governance Principles - Upgraded */}
      <Section variant="primary">
        <div style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>Core Principles</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
            Three non-negotiable pillars of production assurance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem' }}>
          {[
            { tag: 'Safety', icon: 'shield', title: 'Validated Production', desc: 'The system identifies and isolates rogue agents or contract violations in real-time. Automatic policy enforcement prevents invalid production states.' },
            { tag: 'Audit', icon: 'history', title: 'Fully Traceable', desc: 'Every decision from the Pricing Engine to the Control Plane is logged with a forensic audit trail and verifiable evidence envelopes.' },
            { tag: 'Control', icon: 'command', title: 'Always Consistent', desc: 'Designed for mission-critical manufacturing. Backed by deterministic execution to ensure predictable results at every node.' },
          ].map((feature, i) => (
            <div key={i} style={{ gridColumn: 'auto', height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{
                  padding: '3rem',
                  height: '100%',
                  position: 'relative'
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

      {/* Security Section - Tonal Separation */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8rem', alignItems: 'center', ...({} as any) }}>
          <div>
            <h2 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '2rem', ...({} as any) }}>System <br/> Integrity</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem', ...({} as any) }}>
              Our platform adheres to the v2.4 Enterprise Assurance Baseline. 
              We don't just provide tools; we provide a safe foundation for mission-critical production environments.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', ...({} as any) }}>
                <span className="technical-text" style={{ fontSize: '0.75rem', opacity: 0.6, color: 'var(--text-primary)', fontWeight: 800 }}>SOC-2 COMPLIANT</span>
                <span className="technical-text" style={{ fontSize: '0.75rem', opacity: 0.6, color: 'var(--text-primary)', fontWeight: 800 }}>EEA CERTIFIED</span>
            </div>
          </div>
          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '5rem', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-color)',
            ...({} as any)
          }}>
             <div style={{ textAlign: 'left', width: '100%', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 900 }}>SYSTEM STATUS</h4>
                    <div className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.4 }}>REFRESH: 1.2s AGO</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6 }}>VALIDATION</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 10px #00ff00' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.7rem', color: '#00ff00', fontWeight: 900 }}>ACTIVE</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6 }}>POLICY</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 10px #00ff00' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.7rem', color: '#00ff00', fontWeight: 900 }}>ENFORCED</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6 }}>AUDIT</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 10px #00ff00' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.7rem', color: '#00ff00', fontWeight: 900 }}>LOGGED</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6 }}>STATE</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 10px #00ff00' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.7rem', color: '#00ff00', fontWeight: 900 }}>CONSISTENT</span>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Signature Glow Effect */}
             <div style={{ 
               width: '100%', 
               height: '2px', 
               background: 'var(--accent-primary)',
               boxShadow: '0 0 20px var(--accent-primary)',
               opacity: 0.4,
               ...({} as any)
             }} />
             <div className="technical-text" style={{ 
               fontSize: '0.65rem', 
               color: 'var(--text-muted)', 
               marginTop: '2rem',
               textTransform: 'uppercase',
               letterSpacing: '0.2rem',
               fontWeight: 900,
               ...({} as any)
             }}>
               Layer 0 Trust Protocol / Verifiable Execution
             </div>
          </div>
        </div>
      </Section>

      <ActionCTA 
        slogan="ACTIVATE SECURE FLOW"
        title="Run a validated project"
        description="Every step tracked. Every decision controlled. From file to production — fully safe."
        buttonLabel="Start a secure production flow"
        buttonHref="https://control.printprice.pro"
        trackingAction="governance_cta_run_project"
      />
    </div>
  );
}

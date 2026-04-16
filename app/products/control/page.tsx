import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Production Control & Orchestration Plane",
  description: "Orchestrate every job, queue, and node in real-time. The PrintPrice Control Plane provides full observability and structural governance for print manufacturing.",
  canonical: "/products/control"
});

export default function ControlPage() {
  const features = [
    { 
        icon: 'orchestration', 
        tag: 'ORCHESTRATION', 
        title: 'Job Orchestration', 
        desc: 'Every job tracked, routed, and executed across your production system. Controlled from initiation to delivery.' 
    },
    { 
        icon: 'queue', 
        tag: 'QUEUES', 
        title: 'Queue & Routing Control', 
        desc: 'Control job distribution, load balancing, and real-time execution flow across your manufacturing nodes.' 
    },
    { 
        icon: 'eye', 
        tag: 'OBSERVABILITY', 
        title: 'System Observability', 
        desc: 'Real-time visibility into workers, queue depth, and infrastructure health. No hidden states, no silent failures.' 
    },
    { 
        icon: 'history', 
        tag: 'GOVERNANCE', 
        title: 'Governance & Audit', 
        desc: 'Every action logged, every decision traceable, every rule enforced by the system core.' 
    },
    { 
        icon: 'alert', 
        tag: 'INTELLIGENCE', 
        title: 'Anomaly Detection', 
        desc: 'Detect failures, bottlenecks, and system anomalies in real time. Predict and prevent production delays.' 
    },
  ];

  return (
    <div className="product-page" data-monolith-action="control_view">
      {/* Product Hero - Monolith Enforcement */}
      <HeroPlatform
        label="PRODUCTION CONTROL LAYER"
        title={<>CONTROL YOUR ENTIRE <br /> <span style={{ color: 'var(--accent-primary)' }}>PRODUCTION SYSTEM</span></>}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline="From pricing to production — every step controlled, tracked, and enforced. Orchestrate every job, queue, and node in real time."
        primaryAction={{ label: "Open control center →", href: "https://control.printprice.pro" }}
        secondaryAction={{ label: "View live system →", href: "#system-sim" }}
        variant="particles"
      />

      {/* AUTHORITY TAGLINE */}
      <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '6rem', opacity: 0.6 }}>
        <p className="technical-text" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
            EVERY JOB HAS A TRACE • NO HIDDEN STATES • EVERY DECISION IS LOGGED
        </p>
      </div>

      {/* SYSTEM STATE SIMULATION */}
      <Section variant="primary" id="system-sim">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '8rem', alignItems: 'center' }}>
            <div data-monolith-action="control_feature_view">
                <h4 className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', marginBottom: '1.5rem', letterSpacing: '0.2em', fontWeight: 900 }}>SYSTEM VISIBILITY</h4>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.05em', marginBottom: '2rem', lineHeight: 1.1 }}>Inside the <br/> Control Plane</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
                    {[
                        'Global job tracking', 'Queue monitoring', 'Worker orchestration', 'Policy enforcement', 'Audit explorer', 'Anomaly detection'
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '4px', height: '4px', background: 'var(--accent-primary)' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{item}</span>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '4rem' }}>
                    <Link href="/governance" style={{ textDecoration: 'none' }}>
                        <span className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', borderBottom: '1px solid currentColor', paddingBottom: '2px', fontWeight: 900 }}>ENFORCED BY GOVERNANCE LAYER →</span>
                    </Link>
                </div>
            </div>

            <div style={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                padding: '3rem',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
            }} data-monolith-action="control_live_view">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                    <h5 className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.4 }}>CONTROL_STATE_v2.5</h5>
                    <div className="technical-text" style={{ fontSize: '0.6rem', color: '#00ff00', background: 'rgba(0,255,0,0.05)', padding: '0.2rem 0.5rem', fontWeight: 900 }}>SYSTEM: ACTIVE</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '1rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem' }}>JOB_REGISTRY</span>
                        <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-primary)' }}>RUNNING [142]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '1rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem' }}>QUEUE_DEPTH</span>
                        <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900 }}>ACTIVE</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '1rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem' }}>WORKER_NODES</span>
                        <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, color: '#00ff00' }}>HEALTHY</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '1rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem' }}>POLICY_LAYER</span>
                        <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900 }}>ENFORCED</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem' }}>AUDIT_ENGINE</span>
                        <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900 }}>LOGGED</span>
                    </div>
                </div>
            </div>
        </div>
      </Section>

      {/* Feature Grid - No-Line Rule */}
      <Section variant="secondary" id="features">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.4rem',
        }}>
          {features.map((feature, i) => (
            <div key={i} style={{ gridColumn: 'auto', height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{
                  padding: 'clamp(2rem, 5vw, 4rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                        <div style={{ 
                            display: 'flex', 
                            height: '3.5rem', 
                            width: '3.5rem', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            background: 'rgba(255,255,255,0.03)'
                        }}>
                            <Icon name={feature.icon as any} size={28} style={{ color: 'var(--accent-primary)' }} />
                        </div>
                        <span className="technical-text" style={{ 
                            fontSize: '0.6rem', 
                            color: 'var(--accent-primary)', 
                            opacity: 0.8,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2rem',
                            fontWeight: 900
                        }}>{feature.tag}</span>
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>{feature.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, opacity: 0.8 }}>{feature.desc}</p>
                  </div>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* Control Plane Preview Section - NEW (v1.1.92.0) */}
      <Section variant="primary" id="preview">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>Real-time operations view</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            Track jobs, queues, workers, and governance in one operational layer. 
            A productized window into the core orchestration brain.
          </p>
        </div>

        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '2px', 
          border: '1px solid var(--border-color)', 
          boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* THE PREVIEW CONTAINER */}
          <div style={{ background: 'var(--bg-primary)', padding: 'clamp(2rem, 5vw, 4rem)', position: 'relative', overflow: 'hidden' }}>
            {/* 1. TOP STATUS BAR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', opacity: 0.8 }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="technical-text" style={{ fontSize: '0.65rem', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '1.5rem', fontWeight: 900 }}>PRODUCTION ENVIRONMENT</span>
                <span className="technical-text" style={{ fontSize: '0.65rem', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '1.5rem', fontWeight: 800 }}>v2.5_CERTIFIED_OS_CORE</span>
                <span className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.6 }}>REGION: EU-WEST-1</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="pulse-dot" style={{ width: '6px', height: '6px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 10px #00ff00' }}></div>
                <span className="technical-text" style={{ fontSize: '0.65rem', color: '#00ff00', fontWeight: 900, letterSpacing: '0.1em' }}>LIVE SYSTEM FEED</span>
              </div>
            </div>

            {/* 2. KPI ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
              {[
                { label: 'Global Job Registry', val: '1,250' },
                { label: 'SLA Success Rate', val: '98.0%' },
                { label: 'System Mean Latency', val: '450ms' },
                { label: 'Active Queue Depth', val: '0' },
              ].map((kpi, i) => (
                <div key={i} style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <div className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.4, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 900 }}>{kpi.label}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>{kpi.val}</div>
                </div>
              ))}
            </div>

            {/* 3. MIDDLE PANEL (GOVERNANCE) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h4 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '0.1em' }}>ACTIVE GOVERNANCE BLOCKS</h4>
                    <span className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.3 }}>v1.1.92</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem', opacity: 0.8 }}>Regional Data Sovereignty Protocol</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '4px', height: '4px', background: 'var(--accent-primary)' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-primary)' }}>ENFORCED</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem', opacity: 0.8 }}>Tenant Isolation v2.0 (Forensic)</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '4px', height: '4px', background: 'var(--accent-primary)' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-primary)' }}>ENFORCED</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="technical-text" style={{ fontSize: '0.8rem', opacity: 0.8 }}>Deterministic Execution Lock</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '4px', height: '4px', background: '#00ff00' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.7rem', fontWeight: 900, color: '#00ff00' }}>STABLE</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* 4. WORKER HEALTH PANEL */}
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h4 className="technical-text" style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 900, letterSpacing: '0.1em' }}>WORKER CLUSTER: NODE_POOL_01</h4>
                    <span className="technical-text" style={{ fontSize: '0.6rem', opacity: 0.3 }}>64 NODES ACTIVE</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: '0.4rem' }}>
                    {Array.from({ length: 32 }).map((_, i) => (
                        <div key={i} style={{ 
                            height: '1.25rem', 
                            background: i === 14 || i === 23 ? 'var(--accent-primary)' : '#00ff00', 
                            opacity: i === 14 || i === 23 ? 0.3 : 0.6,
                            transition: 'opacity 0.3s ease'
                        }}></div>
                    ))}
                </div>
                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', background: '#00ff00' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: 800 }}>HEALTHY</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)' }}></div>
                            <span className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: 800 }}>SCALING</span>
                        </div>
                    </div>
                    <span className="technical-text" style={{ fontSize: '0.7rem', fontWeight: 900, color: '#00ff00' }}>SYSTEM NOMINAL</span>
                </div>
              </div>
            </div>

            {/* Faded bottom overflow to look like a crop */}
            <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                height: '100px', 
                background: 'linear-gradient(to top, var(--bg-primary), transparent)',
                zIndex: 2
            }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 6rem)', marginTop: '5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Every job tracked', intent: 'visibility' },
                { label: 'Every rule enforced', intent: 'policy' },
                { label: 'Every action logged', intent: 'audit' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', opacity: 0.5 }}>
                  <div style={{ width: '12px', height: '1px', background: 'var(--accent-primary)' }}></div>
                  <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</span>
                </div>
              ))}
        </div>
      </Section>

      {/* Final CTA - Monolith Authority */}
      <ActionCTA
        slogan="ACTIVATE ORCHESTRATOR"
        title="Run your production with full control"
        description="Every job tracked. Every decision enforced. Open the core operational brain of your production ecosystem."
        buttonLabel="Open control center →"
        buttonHref="https://control.printprice.pro"
        trackingAction="control_open"
      />
    </div>
  );
}

'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Container } from "@/components/ui/Container";

export default function AIAgentCorePage() {
  const agentExecuteRequest = `{
  "intent": "price_validate_route",
  "input": {
    "specs": {
      "product_type": "book",
      "quantity": 2000,
      "binding": "hardcover"
    },
    "file_url": "https://storage.example.com/files/book.pdf",
    "delivery_country": "DE"
  },
  "options": {
    "auto_fix": true,
    "auto_route": true,
    "profiles": ["book_interior_standard", "book_cover_standard"]
  },
  "agent": {
    "name": "publishing_assistant",
    "session_id": "sess_123",
    "user_type": "publisher"
  }
}`;

  const agentExecuteResponse = `{
  "execution_id": "agt_01JX8S...",
  "status": "running",
  "steps": [
    { "name": "budget_estimate", "status": "completed" },
    { "name": "preflight_validation", "status": "completed" },
    { "name": "production_routing", "status": "running" }
  ],
  "trace_id": "trc_d9f0..."
}`;

  const budgetRequest = `{
  "job_name": "Hardcover Book 2000 copies",
  "product_type": "book",
  "quantity": 2000,
  "binding": "hardcover",
  "delivery_country": "DE"
}`;

  const budgetResponse = `{
  "estimate_id": "est_01JX8P...",
  "status": "calculated",
  "currency": "EUR",
  "total_cost": 9870.00,
  "lead_time_days": 12
}`;

  const preflightRequest = `{
  "file_url": "https://storage.example.com/files/book.pdf",
  "profile": "book_interior_standard",
  "auto_fix": true,
  "return_artifacts": true
}`;

  const preflightResponse = `{
  "job_id": "pfj_01JX8Q...",
  "status": "queued",
  "profile": "book_interior_standard",
  "auto_fix": true
}`;

  const traceResponse = `{
  "trace_id": "trc_d9f0...",
  "status": "consistent",
  "events": [
    {
      "service": "budget",
      "action": "estimate_calculated",
      "timestamp": "2026-03-24T10:10:22Z"
    },
    {
      "service": "preflight",
      "action": "issues_fixed",
      "timestamp": "2026-03-24T10:11:02Z"
    },
    {
      "service": "control",
      "action": "partner_routed",
      "timestamp": "2026-03-24T10:11:44Z"
    }
  ],
  "policy_state": "enforced",
  "audit_state": "logged"
}`;

  return (
    <div className="ai-agent-portal" style={{ background: 'var(--bg-primary)' }}>
      {/* 1. HERO SECTION */}
      <HeroPlatform 
        label="AI AGENTS / API EXECUTION LAYER"
        title={<>LET AI RUN YOUR <br/> <span style={{ color: 'var(--accent-primary)' }}>PRINT PRODUCTION</span></>}
        slogan={["PROMPT.", "API.", "PRINT."]}
        isHeadlineSlogan={false}
        subheadline="Connect AI agents to pricing, validation, and production through PrintPrice OS. From prompt to printed output — fully controlled."
        primaryAction={{ label: "Get API access →", href: "/contact" }}
        secondaryAction={{ label: "See the flow ↓", href: "#flow" }}
        variant="particles"
      />
      
      <div style={{ textAlign: 'center', marginTop: '-4rem', marginBottom: '6rem', opacity: 0.6 }}>
          <p className="technical-text" style={{ fontSize: '0.75rem', letterSpacing: '0.3rem', fontWeight: 900 }}>PRICE IT → FIX IT → PRINT IT</p>
      </div>

      <Container style={{ marginBottom: '12rem' }}>
          <HeroSignalRail />
      </Container>


      {/* 2. FROM PROMPT TO PRODUCTION */}
      <Section variant="secondary" id="flow">
        <Container>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>EXECUTION_SEQUENCING</h4>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>From prompt to production</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '2rem', maxWidth: '700px', marginInline: 'auto' }}>
                    One request can trigger pricing, validation, routing, and production readiness across the system.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', border: '1px solid var(--border-color)', padding: '4rem 2rem', background: 'var(--bg-primary)' }}>
                {[
                    { node: '01', label: 'User prompt', icon: 'activity', state: 'RECEIVED' },
                    { node: '02', label: 'AI parses specs', icon: 'pipeline', state: 'SUCCESS' },
                    { node: '03', label: 'Budget estimate', icon: 'calculator', state: 'CALCULATED' },
                    { node: '04', label: 'Preflight validation', icon: 'shield', state: 'VALIDATED' },
                    { node: '05', label: 'Control Plane routing', icon: 'node', state: 'ROUTED' },
                    { node: '06', label: 'Production-ready job', icon: 'factory', state: 'READY' }
                ].map((step, i) => (
                    <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                        <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                            <Icon name={step.icon as any} size={24} style={{ color: step.state === 'READY' ? 'var(--accent-primary)' : 'inherit' }} />
                        </div>
                        <p className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', fontWeight: 900 }}>STAGE_{step.node}</p>
                        <p style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{step.label}</p>
                        <div className="technical-text" style={{ 
                            fontSize: '0.55rem', padding: '0.25rem 0.5rem', 
                            background: step.state === 'READY' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)', 
                            color: step.state === 'READY' ? 'white' : 'var(--text-secondary)',
                            fontWeight: 900, letterSpacing: '0.1em', display: 'inline-block' 
                        }}>
                            {step.state}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                <p className="technical-text" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>EVERY STEP IS DETERMINISTIC, AUDITABLE, AND POLICY-ENFORCED.</p>
            </div>
        </Container>
      </Section>


      {/* 3. WHAT YOUR AGENT CAN DO */}
      <Section variant="primary">
        <Container>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em' }}>What your agent can do</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1.5rem' }}>
                    PrintPrice OS gives AI agents controlled access to real production operations.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {[
                    { icon: 'calculator', endpoint: 'POST /v1/budget/estimate', title: 'Generate exact quotes', desc: 'Get real production pricing based on specs, quantity, materials, and destination.' },
                    { icon: 'shield', endpoint: 'POST /v1/preflight/jobs', title: 'Validate and fix files', desc: 'Detect print issues, apply automatic fixes, and certify output before production.' },
                    { icon: 'factory', endpoint: 'POST /v1/control/jobs', title: 'Create production jobs', desc: 'Turn estimates and validated files into routed production jobs.' },
                    { icon: 'activity', endpoint: 'GET /v1/control/jobs/{id}', title: 'Track execution', desc: 'Monitor job state, matched partner, and execution progress in real time.' }
                ].map((card, i) => (
                    <SystemCardHover key={i} borderRadius={0}>
                        <div style={{ padding: '3rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '2.5rem', color: 'var(--accent-primary)' }}>
                                <Icon name={card.icon as any} size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{card.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>{card.desc}</p>
                            <div className="technical-text" style={{ 
                                marginTop: 'auto', fontSize: '0.65rem', color: 'var(--accent-primary)', 
                                fontWeight: 900, borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' 
                            }}>
                                {card.endpoint}
                            </div>
                        </div>
                    </SystemCardHover>
                ))}
            </div>
        </Container>
      </Section>


      {/* 4. SINGLE EXECUTION ENDPOINT */}
      <Section variant="secondary">
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>One call. Full execution flow.</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1.5rem' }}>
                    For AI agents, the fastest path is a unified execution endpoint.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <CodeBlock code={agentExecuteRequest} language="json" title="POST /v1/agents/execute" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <CodeBlock code={agentExecuteResponse} language="json" title="Response" />
                    <div style={{ padding: '2rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <p className="technical-text" style={{ fontWeight: 900, fontSize: '0.8rem', color: 'var(--accent-primary)' }}>ONE EXECUTION ID. <br/> FULL SYSTEM ORCHESTRATION.</p>
                    </div>
                </div>
            </div>
          </Container>
      </Section>


      {/* 5. MODULAR API ACCESS */}
      <Section variant="primary">
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>Use the full flow or call each layer directly</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                {/* Column 1: Budget */}
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Budget API</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        Calculate real production cost from structured specs.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <CodeBlock code={budgetRequest} language="json" title="POST /v1/budget/estimate" />
                        <CodeBlock code={budgetResponse} language="json" title="Response" />
                    </div>
                </div>

                {/* Column 2: Preflight */}
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Preflight API</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                        Validate and auto-fix print files before production.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <CodeBlock code={preflightRequest} language="json" title="POST /v1/preflight/jobs" />
                        <CodeBlock code={preflightResponse} language="json" title="Response" />
                    </div>
                </div>
            </div>
          </Container>
      </Section>


      {/* 6. WHY AGENTS CAN TRUST THE SYSTEM */}
      <Section variant="secondary">
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>Why this works in the real world</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1.5rem' }}>
                    AI can trigger execution, but the OS controls the outcome.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '4rem', marginBottom: '8rem' }}>
                {[
                    { title: 'Real pricing', desc: 'Not generated guesses. Real production logic.' },
                    { title: 'Validation enforced', desc: 'Files are checked and corrected before production.' },
                    { title: 'Routing controlled', desc: 'Jobs are routed through system rules, not freeform automation.' },
                    { title: 'Audit logged', desc: 'Every action generates a traceable system record.' }
                ].map((block, i) => (
                    <div key={i}>
                        <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
                            <Icon name="shield" size={24} />
                        </div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{block.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.7 }}>{block.desc}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem', background: 'var(--bg-primary)', padding: '2rem 4rem', border: '1px solid var(--border-color)' }}>
                    {[
                        { label: "POLICY", val: "ENFORCED" },
                        { label: "AUDIT", val: "LOGGED" },
                        { label: "STATE", val: "CONSISTENT" },
                        { label: "ROUTING", val: "ACTIVE" }
                    ].map((st, i) => (
                        <div key={i}>
                            <p className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', opacity: 0.6, marginBottom: '0.5rem' }}>{st.label}</p>
                            <p className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900 }}>{st.val}</p>
                        </div>
                    ))}
                </div>
            </div>
          </Container>
      </Section>


      {/* 7. TRACEABILITY */}
      <Section variant="primary">
          <Container>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'center' }}>
                <div>
                    <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>FORENSIC_VISIBILITY</h4>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.04em' }}>Every execution has a trace</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem' }}>
                        AI actions are visible, reviewable, and governed. Nothing happens without a record.
                    </p>
                    <div style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '2rem', marginTop: '2rem' }}>
                        <p className="technical-text" style={{ fontSize: '0.9rem', fontWeight: 700 }}>GET /v1/audit/trace/{'{trace_id}'}</p>
                    </div>
                </div>
                <div>
                    <CodeBlock code={traceResponse} language="json" title="System Audit Trace" />
                </div>
            </div>
          </Container>
      </Section>


      {/* 8. WHAT TEAMS ARE BUILDING */}
      <Section variant="secondary">
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>ECOSYSTEM_NODES</h4>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 800 }}>What teams are building</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {[
                    { label: "AI Publishing Assistants", desc: "Automating the design-to-delivery pipeline for independent publishers." },
                    { label: "Print Procurement Agents", desc: "Real-time selection and routing for high-volume enterprise production." },
                    { label: "Autonomous Prepress Pipelines", desc: "Fixing and preparing thousands of files per hour without manual touchpoints." },
                    { label: "ERP / MIS Automation Layers", desc: "Integrating legacy systems with current production capacity via intelligent bridges." }
                ].map((useCase, i) => (
                    <div key={i} style={{ padding: '3rem', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{useCase.label}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, opacity: 0.7 }}>{useCase.desc}</p>
                    </div>
                ))}
            </div>
          </Container>
      </Section>


      {/* 9. FINAL CTA */}
      <ActionCTA 
        slogan="ACTIVATE AGENTIC PRODUCTION"
        title="Your AI can now operate in the real world"
        description="Pricing, validation, and production — through one execution layer. Join the companies building the future of manufacturing."
        buttonLabel="Start Building with PrintPrice OS →"
        buttonHref="/contact"
        secondaryButtonLabel="Read API Docs"
        secondaryButtonHref="/docs/api"
        trackingAction="ai_agent_final_cta_activate"
      />
      
      <div style={{ textAlign: 'center', paddingBottom: '6rem', opacity: 0.4 }}>
          <span className="technical-text" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', fontWeight: 900 }}>DETERMINISTIC EXECUTION. REAL PRODUCTION OUTCOMES.</span>
      </div>
    </div>
  );
}

// SUPPORT COMPONENT: SIGNAL RAIL
const HeroSignalRail = () => {
    const nodes = ['PROMPT', 'AGENT', 'BUDGET', 'PREFLIGHT', 'CONTROL', 'PRINT'];
    return (
        <div style={{ position: 'relative', height: '140px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 4rem', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '4rem', right: '4rem', height: '1px', background: 'var(--border-color)', opacity: 0.3 }}></div>
            
            {/* Animated Signal - Red Line sweep */}
            <div style={{ 
                position: 'absolute', top: 'calc(50% - 1px)', left: '4rem', height: '3px', background: 'var(--accent-primary)', 
                width: '0', animation: 'signalSweep 4s infinite cubic-bezier(0.1, 0.7, 0.1, 1)',
                boxShadow: '0 0 15px var(--accent-primary)', zIndex: 1
            }}></div>
            <style>{`
                @keyframes signalSweep {
                    0% { width: 0; left: 4rem; opacity: 0; }
                    5% { opacity: 1; }
                    80% { width: calc(100% - 8rem); opacity: 1; }
                    100% { width: calc(100% - 8rem); opacity: 0; }
                }
            `}</style>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 2 }}>
                {nodes.map((node, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--border-color)', margin: '0 auto 1.5rem', transform: 'rotate(45deg)' }}></div>
                        <div className="technical-text" style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.15em' }}>{node}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

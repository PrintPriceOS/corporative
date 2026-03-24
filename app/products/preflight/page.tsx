import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { WorkflowRail } from "@/components/monolith/WorkflowRail";
import { PreflightDiagnosticPipeline } from "@/components/monolith/PreflightDiagnosticPipeline";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "PDF Preflight & File Fixing Tool",
  description: "Detect and fix print file issues automatically. Ensure your files are production-ready with automated PDF validation and correction.",
  image: "/og/preflight.png",
  canonical: "/products/preflight"
});

export default function PreflightPage() {
  return (
    <div className="product-page">
      {/* Product Hero - High Authority Activation */}
      <HeroPlatform 
        label="SYSTEM ENGINE / FIX-IT LAYER"
        title={<>FIX YOUR FILES <br/> BEFORE <br/> <span style={{ color: 'var(--accent-primary)' }}>PRODUCTION</span></>}
        slogan={["PLAN.", "FIX.", "SCALE."]}
        isHeadlineSlogan={false}
        subheadline="Detect, fix, and certify your print files automatically — before they reach production. Automated file validation and correction for real production workflows."
        primaryAction={{ label: "Check my file →", href: "#" }}
        secondaryAction={{ label: "View technical specs →", href: "#engine" }}
      />

      {/* Visual Reinforcement - Diagnostic Pipeline */}
      <PreflightDiagnosticPipeline />

      {/* Instant Clarity - What it actually does */}
      <Section variant="primary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
                <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>CORE OPERATION</h4>
                <h2 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '2.5rem', lineHeight: 1.1 }}>One engine. <br/> Zero errors.</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.5, marginBottom: '3.5rem', maxWidth: '45ch' }}>
                    Preflight isn't just a file checker. It is the deterministic correction layer that sits between your pricing and production, ensuring every file is valid, fixed, and safe to print.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                        { icon: 'shield', text: 'Detects real production issues instantly' },
                        { icon: 'fix', text: 'Fixes structure and color errors automatically' },
                        { icon: 'policy', text: 'Validates against strict production rules' },
                        { icon: 'print', text: 'Generates production-ready outputs' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <Icon name={item.icon as any} size={18} style={{ color: 'var(--accent-primary)' }} />
                            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <WorkflowRail 
                title="ORCHESTRATION FLOW"
                steps={[
                    { label: "PRICE IT", status: "DONE" },
                    { label: "FIX IT (PREFLIGHT)", status: "READY" },
                    { label: "PRINT IT", status: "PENDING" },
                ]}
            />
        </div>
      </Section>

      {/* Validation Engine & Fix Pipeline */}
      <Section variant="secondary" id="engine">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
            {/* Validation Engine */}
            <div>
                <div style={{ height: '3px', width: '40px', background: 'var(--accent-primary)', marginBottom: '2rem' }}></div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Validation Engine</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Every file is evaluated against real production policies. Our rule-based engine performs a deterministic analysis of geometry, color, and structure. No guessing.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {['Geometry Enforcement', 'Color Policy Validation', 'Ink Coverage Audit', 'Structural Integrity'].map(rule => (
                        <li key={rule} className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 900 }}>[ {rule} ]</li>
                    ))}
                </ul>
            </div>

            {/* Automatic Fix Pipeline */}
            <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Fix Pipeline</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Correct errors automatically. From bleed generation to color conversion, our pipeline modifies files in real-time to match production requirements.
                </p>
                <div style={{ background: 'var(--bg-primary)', padding: '2rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.6rem' }}>RAW_ASSET</span>
                        <div style={{ width: '20px', height: '1px', background: 'var(--accent-primary)', alignSelf: 'center' }}></div>
                        <span className="technical-text" style={{ fontSize: '0.6rem' }}>FIXED_OUTPUT</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '60%', background: 'var(--accent-primary)', animation: 'monolith-pulse 2s infinite' }}></div>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.55rem', opacity: 0.5 }}>- GENERATING_BLEED</span>
                        <span className="technical-text" style={{ fontSize: '0.55rem', opacity: 0.5 }}>- CONVERTING_STREAMS</span>
                        <span className="technical-text" style={{ fontSize: '0.55rem', opacity: 0.5 }}>- EMBEDDING_FONTS</span>
                    </div>
                </div>
            </div>

            {/* Distributed Processing */}
            <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Scale on demand</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Your files are processed by a distributed network of async workers. Not your device. Handle gigabyte-level PDFs without local processing lag.
                </p>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>120+</div>
                        <div className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>NODES ACTIVE</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>∞</div>
                        <div className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>SCALABILITY</div>
                    </div>
                </div>
            </div>
        </div>
      </Section>

      {/* Outcome Cards - Tier 2 Interaction */}
      <Section variant="primary">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>SYSTEM CAPABILITIES</h4>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.05em' }}>Built for certainty</h2>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.4rem'
        }}>
          {[
            { icon: 'shield', tag: 'CERTAINTY', title: 'Detect production issues', desc: 'Identify bleeds, font errors, and resolution gaps before they reach the press. Catch what humans miss.' },
            { icon: 'fix', tag: 'AUTONOMY', title: 'Fix files automatically', desc: 'Apply automated remediation pipelines. Correct color spaces and generate missing data without manual work.' },
            { icon: 'alert', tag: 'SECURITY', title: 'Prevent costly print errors', desc: 'Stop unprintable files from entering your queue. Save time, material, and reputation automatically.' },
          ].map((feature, i) => (
            <div key={i} style={{ gridColumn: 'auto', height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{ padding: '4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', height: '3.5rem', width: '3.5rem', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                            <Icon name={feature.icon as any} size={28} style={{ color: 'var(--accent-primary)' }} />
                        </div>
                        <span className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.2rem', fontWeight: 900 }}>{feature.tag}</span>
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

      {/* Real Problems Audit */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start' }}>
            <div>
                <h2 style={{ fontSize: '2.5rem', letterSpacing: '-0.05em', marginBottom: '2rem' }}>Audit-ready specs.</h2>
                <div style={{ background: 'var(--accent-primary)', height: '4px', width: '60px', marginBottom: '2.5rem' }}></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                    Every file passes through a forensic-level audit. We detect and resolve the technical debt that causes production failures.
                </p>
                <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.7rem' }}>PDF_ENGINE</span>
                        <span className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900 }}>v3.12_COMPLIANT</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="technical-text" style={{ fontSize: '0.7rem' }}>POLICIES_ACTIVE</span>
                        <span className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900 }}>64_RULES_ENFORCED</span>
                    </div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                {[
                    { title: "Missing Bleed", desc: "Generated automatically from image metadata." },
                    { title: "Font Embedding", desc: "Forced embedding and subset validation." },
                    { title: "Low Resolution", desc: "Interpolation analysis and threshold enforcement." },
                    { title: "Ink Limit", desc: "Dynamic TAC reduction and ink calibration." },
                    { title: "Color Profiles", desc: "Deterministic ICC conversion and verification." },
                    { title: "Incompatibility", desc: "Automatic PDF/X-4 remediation and sealing." },
                ].map((prob, i) => (
                    <div key={i}>
                        <h4 className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontWeight: 900 }}>RESOLVED</h4>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 800 }}>{prob.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.7 }}>{prob.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </Section>

      {/* Target Segments */}
      <Section variant="primary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
            {[
                { person: "Publishers", icon: "publisher", benefit: "Reduce expensive reprints and late-stage delivery failures." },
                { person: "Print Houses", icon: "factory", benefit: "Enforce incoming file standards without manual prepress labor." },
                { person: "Authors", icon: "author", benefit: "Fix technical errors instantly and move to production with confidence." },
                { person: "Developers", icon: "code", benefit: "Integrate high-precision validation directly into your own app or API." },
            ].map((p, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                        <Icon name={p.icon as any} size={32} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{p.person}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{p.benefit}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* Final CTA - Monolith Authority */}
      <ActionCTA 
        slogan="VALIDATE YOUR FILES NOW"
        title="Stop printing errors."
        description="Avoid costly reprints and production delays. Get validation results in seconds. No signup required."
        buttonLabel="Check my file now →"
        buttonHref="#"
        trackingAction="preflight_cta_final_v2"
      />
      
      <div style={{ textAlign: 'center', paddingBottom: '6rem', opacity: 0.4 }}>
          <span className="technical-text" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>POWERED BY GHOSTSCRIPT + POPPLER POLICY PIPELINES</span>
      </div>
    </div>
  );
}

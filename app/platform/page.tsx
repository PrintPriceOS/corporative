import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ProductSurfaceGrid } from "@/components/monolith/ProductSurfaceGrid";
import { WorkflowRail } from "@/components/monolith/WorkflowRail";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";

export default function PlatformPage() {
  return (
    <div className="platform-page">
      {/* Intro Section - Monolith Enforcement (Refined Copy v1.2) */}
      <HeroPlatform 
        label="PLATFORM OVERVIEW"
        title={<>FROM COST TO <br/> PRODUCTION IN <br/> <span style={{ color: 'var(--accent-primary)' }}>ONE PLATFORM</span></>}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline="Replace manual workflows with a single system that handles pricing, validation, and production. Calculate costs, validate files, and route production — automatically."
        primaryAction={{ label: "Explore the platform →", href: "#architecture" }}
        secondaryAction={{ label: "Talk to an expert", href: "/contact" }}
        variant="particles"
      />

      {/* The 7 Surfaces Grid - Specialized Component Enforcement (Refined Copy v1.2) */}
      <div id="architecture">
        <ProductSurfaceGrid 
          title="Platform Architecture"
          subtitle="Each module powers a specific part of your print workflow — from pricing to production."
          variant="secondary"
          showGrid={false}
          products={[
              // CORE FLOW
              { 
                category: 'CORE FLOW',
                name: 'Pricing Engine', 
                description: 'Calculate exact printing costs in seconds.', 
                code: 'budget.printprice.pro', 
                status: 'CORE', 
                priority: true,
                href: 'https://budget.printprice.pro/', 
                ctaText: 'Open pricing',
                icon: 'calculator'
              },
              { 
                category: 'CORE FLOW',
                name: 'File Validation', 
                description: 'Validate your files before production. Avoid costly errors.', 
                code: 'preflight.printprice.pro', 
                status: 'VALIDATOR', 
                priority: true,
                href: '/products/preflight', 
                ctaText: 'Validate files',
                icon: 'shield'
              },
              { 
                category: 'CORE FLOW',
                name: 'Mockup Generator', 
                description: 'Generate high-fidelity 3D book mockups in seconds.', 
                code: 'mockup.printprice.pro', 
                status: 'VISUALIZER', 
                priority: true,
                href: '/products/mockup', 
                ctaText: 'Create mockup',
                icon: 'camera'
              },
              // OPERATIONS
              { 
                category: 'OPERATIONS',
                name: 'Control Plane', 
                description: 'Monitor, track, and orchestrate every job and infrastructure node.', 
                code: 'control.printprice.pro', 
                status: 'ORCHESTRATOR', 
                href: '/products/control', 
                ctaText: 'Open Control Plane',
                icon: 'activity'
              },
              // PLATFORM
              { 
                category: 'PLATFORM',
                name: 'PrintPrice.pro', 
                description: 'Start here. Explore the platform and run your first production audit.', 
                code: 'gateway', 
                status: 'HUB', 
                href: '/', 
                ctaText: 'Explore platform',
                icon: 'activity'
              },
              // DEVELOPERS
              { 
                category: 'DEVELOPERS',
                name: 'API Portal', 
                description: 'Programmable access to every platform capability.', 
                code: 'api.printprice.pro', 
                status: 'DEVS', 
                href: '/developers', 
                ctaText: 'Explore API',
                icon: 'developer'
              },
              { 
                category: 'DEVELOPERS',
                name: 'Documentation', 
                description: 'Technical documentation and system audit logs.', 
                code: 'docs.printprice.pro', 
                status: 'KNOWLEDGE', 
                href: '/docs', 
                ctaText: 'Read docs',
                icon: 'specs'
              },
          ]}
        />
      </div>

      {/* The Workflow Section - Workflow Visualization (Refined Clickable v1.2) */}
      <Section variant="primary" showGrid={false}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: 'clamp(3rem, 10vw, 8rem)', alignItems: 'center', ...({} as any) }}>
          <div>
            <h4 className="technical-text" style={{ 
                fontSize: '0.7rem', 
                color: 'var(--accent-primary)', 
                marginBottom: '1.5rem',
                letterSpacing: '0.2em',
                fontWeight: 900
            }}>AUTOMATION LAYER</h4>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', letterSpacing: '-0.05em', marginBottom: '2rem', lineHeight: 1.1, ...({} as any) }}>Everything connected. <br/> Nothing manual.</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.15rem', marginBottom: '3.5rem', maxWidth: '45ch', ...({} as any) }}>
              Your data flows automatically across the system.  
              Calculate costs, validate files, and trigger production — <strong>without manual handoffs.</strong>
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem', ...({} as any) }}>
              {[
                'No manual handoffs between tools',
                'Real-time system visibility',
                'Automatic decision flow across modules'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, ...({} as any) }}>
                  <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)', ...({} as any) }}></div>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.3, fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.3em' }} className="technical-text">
                <span>PRICE IT</span>
                <span>→</span>
                <span>FIX IT</span>
                <span>→</span>
                <span>VISUALIZE</span>
                <span>→</span>
                <span>PRINT IT</span>
            </div>
          </div>

          <div style={{ position: 'relative', ...({} as any) }}>
            <WorkflowRail 
              title="SYSTEM FLOW — LIVE"
              steps={[
                  { label: 'Cost calculated', status: 'DONE', href: 'https://budget.printprice.pro/' },
                  { label: 'Files validated', status: 'VALIDATED', href: '/products/preflight' },
                  { label: 'Visuals generated', status: 'READY', href: '/products/mockup' },
                  { label: 'Production ready', status: 'READY', href: '/products/control' },
              ]}
            />
            
            {/* Contextual Status Label */}
            <div className="technical-text" style={{ 
                position: 'absolute', 
                bottom: '-2rem', 
                right: 0, 
                fontSize: '0.6rem', 
                opacity: 0.4,
                letterSpacing: '0.1em'
            }}>
                ID: PRD_LOG_8392 / STATUS: ACTIVE_MONITORING
            </div>
          </div>
        </div>

        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '3rem', textAlign: 'center', opacity: 0.6, ...({} as any) }}>
            <p className="technical-text" style={{ fontSize: '0.9rem', letterSpacing: '0.15em', fontWeight: 800 }}>
                NO MANUAL STEPS. NO BROKEN WORKFLOWS.
            </p>
        </div>
      </Section>
      {/* Final platform CTA */}
      <ActionCTA 
        slogan="ARCHITECTURE REVIEW"
        title="Converge Your Infrastructure."
        description="Speak with a platform architect to evaluate how PrintPrice Pro can replace your current fragmented production tools."
        buttonLabel="Consult an Architect"
        buttonHref="/contact"
        trackingAction="platform_cta_architect"
      />
    </div>
  );
}

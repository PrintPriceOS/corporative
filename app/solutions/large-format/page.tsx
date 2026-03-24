import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";

export default function LargeFormatSolution() {
  return (
    <div className="solution-page">
      {/* Solution Hero - Monolith Enforcement */}
      <HeroPlatform 
        label="Industry Segments / vertical_large-format"
        title={<>GRAND SCALE <br/> ORCHESTRATION</>}
        subheadline="Scale the grandest ideas with orchestration designed for massive files, complex tiling, and distributed installation project management. High-resolution telemetry."
        primaryAction={{ label: "Consult an Expert", href: "/contact" }}
      />

      {/* Feature Grid - No-Line Rule */}
      <Section variant="secondary">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.4rem'
        }}>
          {[
            { icon: 'layers', tag: 'Division', title: 'Tiling Hub', desc: 'Automated job breakdown for massive prints. Manage every tile as a sub-job with centralized color consistency.' },
            { icon: 'node', tag: 'Capacity', title: 'Distributed Flow', desc: 'Route grand-format jobs to high-capacity nodes while maintaining real-time status and telemetry visibility.' },
            { icon: 'web', tag: 'Outreach', title: 'Site Management', desc: 'Track field operations, measurements, and final photography through the CRM customer portal. End-to-end.' },
          ].map((feature, i) => (
            <div key={i} style={{ gridColumn: 'auto', height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{ padding: '3rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Icon name={feature.icon as any} size={20} style={{ color: 'var(--accent-primary)' }} />
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', opacity: 0.3 }}></div>
                  </div>
                  <span className="technical-text" style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--accent-primary)', 
                    opacity: 0.8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '1rem',
                    display: 'block'
                  }}>{feature.tag}</span>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', letterSpacing: '-0.02em', fontWeight: 800 }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{feature.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA - Monolith Authority */}
      <ActionCTA 
        slogan="GRAND SCALE PRODUCTION"
        title="Scale Your Grand Vision."
        description="Optimize your large-format production workflows with PrintPrice Pro on the monolith."
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        trackingAction="large_format_cta_expert"
      />
    </div>
  );
}

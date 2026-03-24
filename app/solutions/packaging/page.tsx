import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";

export default function PackagingSolution() {
  return (
    <div className="solution-page">
      {/* Solution Hero - Monolith Enforcement */}
      <HeroPlatform 
        label="Industry Segments / vertical_packaging"
        title={<>PACKAGING <br/> PRECISION</>}
        subheadline="From folding cartons to complex corrugated structures. Solve the structural debt of high-precision packaging production with substrate-aware algorithms."
        primaryAction={{ label: "Consult an Architect", href: "/contact" }}
      />

      {/* Feature Grid - No-Line Rule */}
      <Section variant="secondary">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.4rem'
        }}>
          {[
            { icon: 'box', tag: 'Logic', title: 'Structural Hub', desc: 'Our engine understands dielines, bleeds, and fold lines, ensuring every budget accounts for structural complexity.' },
            { icon: 'specs', tag: 'Yield', title: 'Substrate Sync', desc: 'Real-time pricing for specialized boards, foils, and coatings with dynamic yield and waste calculations.' },
            { icon: 'shield', tag: 'Audit', title: 'Automated QC', desc: 'Preflight for packaging goes beyond colors, validating glue areas, knockout zones, and barcode integrity.' },
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
        slogan="STRUCTURAL PRECISION"
        title="Architected for Packaging."
        description="Speak with an automation expert specializing in Packaging and high-stakes structural manufacturing."
        buttonLabel="Consult an Architect"
        buttonHref="/contact"
        trackingAction="packaging_cta_architect"
      />
    </div>
  );
}

import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";

export default function CommercialSolution() {
  return (
    <div className="solution-page">
      {/* Solution Hero - Monolith Enforcement */}
      <HeroPlatform 
        label="Industry Segments / vertical_commercial"
        title={<>THROUGHPUT <br/> AUTOMATION</>}
        subheadline="Optimize high-volume throughput with automated orchestration designed for rapid turnarounds and seamless MIS integration. Zero administrative debt."
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
            { icon: 'activity', tag: 'Velocity', title: 'Flow Velocity', desc: 'Automate the transition from quote to production to minimize administrative debt and manual bottlenecks.' },
            { icon: 'layers', tag: 'Yield', title: 'Automated Ganging', desc: 'Intelligent layout orchestration to maximize sheet yield across high-volume digital or offset runs. Automatic logic.' },
            { icon: 'web', tag: 'Interface', title: 'Self-Service Hub', desc: 'Enable clients to reorder, track status, and manage assets without manual intervention. Premium portal layer.' },
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
        slogan="MAXIMUM THROUGHPUT"
        title="Master High-Volume Production."
        description="Leverage enterprise automation for your commercial print operations on the monolith."
        buttonLabel="Talk to an Architect"
        buttonHref="/contact"
        trackingAction="commercial_cta_architect"
      />
    </div>
  );
}

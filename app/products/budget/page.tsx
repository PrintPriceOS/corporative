import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Print Cost Calculator & Estimator",
  description: "Calculate exact printing costs in seconds with our high-precision Pricing Engine. No guesswork—real production costs for books, packaging, and commercial print.",
  canonical: "/products/budget"
});

export default function BudgetPage() {
  return (
    <div className="product-page">
      {/* Product Hero - Monolith Enforcement */}
      <HeroPlatform 
        label="PRICING MODULE"
        title={<>CALCULATE REAL <br/> PRINT COSTS <br/> <span style={{ color: 'var(--accent-primary)' }}>IN SECONDS</span></>}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline="Get exact printing costs in seconds. No estimates. No guesswork. Real production costs instantly — based on your exact specs."
        primaryAction={{ label: "Calculate my print cost →", href: "https://budget.printprice.pro" }}
        secondaryAction={{ label: "See how it works →", href: "#features" }}
        variant="particles"
        rightContent={
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '16/9', 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Real video integration */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: 0.8
              }}
            >
              <source src="/videos/budget.webm" type="video/webm" />
            </video>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              width: '100%', 
              height: '40%', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              zIndex: 1
            }}></div>
          </div>
        }
      />

      {/* Feature Grid - No-Line Rule */}
      <Section variant="secondary" id="features">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.4rem', 
          ...({} as any) 
        }}>
          {[
            { icon: 'calculator', tag: 'ACCURACY', title: 'Exact Cost — Instantly', desc: 'No estimates. Real pricing based on your specifications. Our engine handles material, labor, and overheads automatically.' },
            { icon: 'activity', tag: 'CONNECTIVITY', title: 'Works with your systems', desc: 'Seamlessly sync with your existing ERP or MIS. Connect your tools and keep your data in sync across the platform.' },
            { icon: 'factory', tag: 'PRODUCTION', title: 'Handles complex projects', desc: 'From simple books to complex multi-component production — fully calculated and ready for execution.' },
          ].map((feature, i) => (
            <div key={i} style={{ gridColumn: 'auto', height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{
                  padding: 'clamp(2rem, 5vw, 4rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%'
                }}>
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
                        letterSpacing: '0.2em',
                        fontWeight: 900
                    }}>{feature.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, opacity: 0.8 }}>{feature.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA - Monolith Authority */}
      <ActionCTA 
        slogan="START YOUR PRICING ENGINE"
        title="Start your first calculation"
        description="Calculate your print cost now with extreme precision. No credit card required. Accurate in seconds."
        buttonLabel="Calculate my cost →"
        buttonHref="https://budget.printprice.pro"
        trackingAction="budget_cta_calculate_final"
      />
    </div>
  );
}

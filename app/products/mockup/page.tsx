import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { WorkflowRail } from "@/components/monolith/WorkflowRail";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "AI Book Mockup Generator | Print Price Pro",
  description: "Generate high-fidelity book mockups from a single cover image. AI-powered workstation for realistic print visualization.",
  image: "/og/mockup.png",
  canonical: "/products/mockup"
});

export default function MockupPage() {
  return (
    <div className="product-page">
      {/* Product Hero - High Authority Activation */}
      <HeroPlatform 
        label="SYSTEM ENGINE / VISUALIZATION LAYER"
        title={<>RETAIL-READY <br/> BOOK <br/> <span style={{ color: 'var(--accent-primary)' }}>MOCKUPS</span></>}
        slogan={["UPLOAD.", "RENDER.", "SELL."]}
        isHeadlineSlogan={false}
        subheadline="Create realistic book visuals from a single cover image. Our AI-driven workstation provides total control over binding, texture, and perspective for production-grade visualization."
        primaryAction={{ label: "Launch Workstation →", href: "https://mockup.printprice.pro/" }}
        secondaryAction={{ label: "Watch how it works →", href: "#workflow" }}
        variant="particles"
      />

      {/* Instant Clarity - Render Pipeline */}
      <Section variant="primary" id="workflow">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
                <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>RENDER PIPELINE</h4>
                <h2 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '2.5rem', lineHeight: 1.1 }}>From cover to <br/> reality.</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.5, marginBottom: '3.5rem', maxWidth: '45ch' }}>
                    Mockup Engine is a controlled render workstation designed for precision. It transforms your 2D designs into high-fidelity 3D assets ready for retail and marketing.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                        { icon: 'camera', text: 'Multi-perspective AI rendering' },
                        { icon: 'target', text: 'Precise physical property control' },
                        { icon: 'image', text: 'High-resolution textures and finishes' },
                        { icon: 'download', text: 'Batch export and gallery management' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <Icon name={item.icon as any} size={18} style={{ color: 'var(--accent-primary)' }} />
                            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <WorkflowRail 
                title="VISUALIZATION FLOW"
                steps={[
                    { label: "UPLOAD COVER", status: "DONE" },
                    { label: "CONFIGURE SPECS", status: "READY" },
                    { label: "AI RENDER", status: "PENDING" },
                ]}
            />
        </div>
      </Section>

      {/* Control Surface & AI Engine */}
      <Section variant="secondary" id="engine">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
            {/* Physical Parameters */}
            <div>
                <div style={{ height: '3px', width: '40px', background: 'var(--accent-primary)', marginBottom: '2rem' }}></div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Physical Control</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Configure every detail of the physical book. From spine width to binding type, our engine understands the physics of print.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {['Binding Type (Hardcover/Softcover)', 'Spine Width Calculation', 'Material Texture Simulation', 'Case Wrap Enforcement'].map(rule => (
                        <li key={rule} className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 900 }}>[ {rule} ]</li>
                    ))}
                </ul>
            </div>

            {/* AI Visualization Engine */}
            <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>AI Engine</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Powered by Google Gemini. Our advanced AI model generates realistic lighting and perspectives that match your exact configuration.
                </p>
                <div style={{ background: 'var(--bg-primary)', padding: '2rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.6rem' }}>2D_COVER</span>
                        <div style={{ width: '20px', height: '1px', background: 'var(--accent-primary)', alignSelf: 'center' }}></div>
                        <span className="technical-text" style={{ fontSize: '0.6rem' }}>3D_MOCKUP</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '85%', background: 'var(--accent-primary)', animation: 'monolith-pulse 2s infinite' }}></div>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span className="technical-text" style={{ fontSize: '0.55rem', opacity: 0.5 }}>- ANALYZING_LIGHTING</span>
                        <span className="technical-text" style={{ fontSize: '0.55rem', opacity: 0.5 }}>- APPLYING_TEXTURES</span>
                        <span className="technical-text" style={{ fontSize: '0.55rem', opacity: 0.5 }}>- GENERATING_PERSPECTIVE</span>
                    </div>
                </div>
            </div>

            {/* Output Management */}
            <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Batch Assets</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Don't settle for one view. Generate entire multi-perspective preview sets and export them in one click for all your retail platforms.
                </p>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>V.2.5</div>
                        <div className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>MOCKUP_STATION</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>FAST</div>
                        <div className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>BATCH_GEN</div>
                    </div>
                </div>
            </div>
        </div>
      </Section>

      {/* Outcome Cards - System Capabilities */}
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
            { icon: 'target', tag: 'PRECISION', title: 'High-Fidelity Renders', desc: 'Every mockup is rendered with high-resolution textures and realistic lighting environments that reflect your material choices.' },
            { icon: 'shield', tag: 'SECURITY', title: 'Gated Workstation', desc: 'Secure backend handling (BFF) ensures your assets and data stay within a production-hardened environment.' },
            { icon: 'specs', tag: 'CONTROLS', title: 'Controlled Dimensions', desc: 'Support for a wide range of formats and dimensions, from small pocketbooks to massive art folios.' },
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

      {/* Target Segments */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
            {[
                { person: "Authors", icon: "author", benefit: "Visualize your book before it hits the press. Perfect for social media promos and crowdfunding." },
                { person: "Publishers", icon: "publisher", benefit: "Quickly generate retail previews for Amazon and other platforms at scale without manual work." },
                { person: "Designers", icon: "code", benefit: "Present your book cover designs in a realistic, physical context that resonates with clients." },
                { person: "Marketing Teams", icon: "activity", benefit: "Create high-impact visual campaigns with multi-perspective asset sets in seconds." },
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
        slogan="START RENDERING NOW"
        title="Visualize your success."
        description="Stop basing your marketing on flat images. Create high-fidelity mockups that match your physical production specs perfectly."
        buttonLabel="Go to Mockup Workstation →"
        buttonHref="https://mockup.printprice.pro/"
        trackingAction="mockup_cta_final_v1"
      />
      
      <div style={{ textAlign: 'center', paddingBottom: '6rem', opacity: 0.4 }}>
          <span className="technical-text" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>POWERED BY GOOGLE GEMINI + MONOLITH RENDERING ENGINE</span>
      </div>
    </div>
  );
}

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "API for Print Manufacturing & Automation",
  description: "Integrate budgeting, PDF preflight, and production routing directly into your app. Explore the PrintPrice OS API for automated manufacturing workflows.",
  canonical: "/developers"
});

export default function DeveloperPortal() {
  const quickstartCode = `// Initialize SDK
import { ppos } from '@ppos/sdk';

const client = new ppos.Client({
  apiKey: process.env.PPOS_KEY,
  environment: 'production'
});

// Perform System Health Check
const status = await client.control.health();
console.log(\`Node status: \${status.id} [\${status.state}]\`);`;

  const budgetCode = `// POST /v1/budget/estimate
const response = await fetch('https://api.printprice.pro/v1/budget/estimate', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_KEY' },
  body: JSON.stringify({
    component: 'folding-carton',
    quantity: 5000,
    materials: ['300gsm-sbs'],
    dieline: 'v12-structure'
  })
});

const result = await response.json();
console.log(result.price.certified);`;

  const preflightCode = `// POST /v1/preflight/verify
const audit = await ppos.preflight.verify({
  fileUrl: 'https://storage.net/job-123.pdf',
  policies: ['enterprise-v2-compliance'],
  autoFix: true,
  callback: 'https://your-webhook.com'
});

console.log(audit.status.id);`;

  return (
    <div className="developer-portal">
      {/* Dev Hero - Monolith Refined v1.2 */}
      <HeroPlatform 
        label="DEVELOPER TOOLS"
        title={<>BUILD ON THE <br/> <span style={{ color: 'var(--accent-primary)' }}>PRINT API</span></>}
        slogan={["ESTIMATE", "VALIDATE", "PRODUCE via API"]}
        isHeadlineSlogan={false}
        subheadline="Calculate costs, validate files, and route production — all via API. Integrate pricing, preflight, and production into your system effortlessly."
        primaryAction={{ label: "Get API access →", href: "/contact" }}
        secondaryAction={{ label: "View API docs →", href: "https://docs.printprice.pro" }}
      />

      {/* Quickstart Section - REFINED Activation Node v1.2 */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: 'clamp(3rem, 10vw, 8rem)', alignItems: 'center', ...({} as any) }}>
          <div>
            <h4 className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', marginBottom: '1.5rem', letterSpacing: '0.2em', fontWeight: 900 }}>ACTIVATION NODE</h4>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '-0.04em', lineHeight: 1.1, ...({} as any) }}>Start in seconds</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '3.5rem', maxWidth: '45ch', ...({} as any) }}>
              Make your first pricing or validation call in seconds. Our SDK allows for seamless integration of print intelligence into any application.
            </p>
            <Link href="https://docs.printprice.pro/quickstart">
              <Button size="lg">Get Started →</Button>
            </Link>
          </div>
          <CodeBlock code={quickstartCode} title="client-init.js" language="javascript" />
        </div>
      </Section>

      {/* API Implementation Grid - Tonal Layering */}
      <Section variant="primary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: 'clamp(4rem, 10vw, 8rem)', ...({} as any) }}>
          <div>
            <span className="technical-text" style={{ color: 'var(--accent-primary)', opacity: 0.6, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', display: 'block', fontWeight: 900 }}>POST /v1/budget</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.5rem', ...({} as any) }}>Estimate cost via API</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '40ch', ...({} as any) }}>
              Get real print costs based on your specs — instantly. Sync your e-commerce or internal tools with our precision pricing engine.
            </p>
            <CodeBlock code={budgetCode} title="create-estimate.js" language="javascript" />
          </div>
          <div>
            <span className="technical-text" style={{ color: 'var(--accent-primary)', opacity: 0.6, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', display: 'block', fontWeight: 900 }}>POST /v1/preflight</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.5rem', ...({} as any) }}>Validate files automatically</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '40ch', ...({} as any) }}>
              Run preflight checks and fix errors before production. Automate PDF remediation and ensure standards-compliance.
            </p>
            <CodeBlock code={preflightCode} title="trigger-verification.js" language="javascript" />
          </div>
        </div>
      </Section>

      {/* What You Can Build Section */}
      <Section variant="secondary">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>USE CASES</h4>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.05em' }}>What you can build</h2>
          </div>
          <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2rem' 
          }}>
              {[
                  { icon: 'web', title: 'Automated Quoting', desc: 'Build self-service estimate portals for your clients.' },
                  { icon: 'activity', title: 'AI Production Agents', desc: 'Let autonomous agents trigger and route jobs from prompts.' },
                  { icon: 'pipeline', title: 'Validation Pipelines', desc: 'Validate and fix thousands of files in background workers.' },
                  { icon: 'node', title: 'Production Routing', desc: 'Orchestrate job delivery to the best production nodes.' }
              ].map((caseItem, i) => (
                  <Link key={i} href={caseItem.title === 'AI Production Agents' ? '/ai-agent' : '#'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <SystemCardHover borderRadius={0}>
                        <div style={{ padding: '3rem', height: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <Icon name={caseItem.icon as any} size={20} style={{ color: 'var(--accent-primary)' }} />
                                <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', opacity: 0.3 }}></div>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>{caseItem.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{caseItem.desc}</p>
                        </div>
                    </SystemCardHover>
                  </Link>
              ))}
          </div>
      </Section>

      {/* Ready to Build Section - Monolith Authority */}
      <ActionCTA 
        slogan="START BUILDING WITH THE API"
        title="Ready to Deploy?"
        description="No setup friction. Live in minutes. Get your API key and start automating your print production lifecycle today."
        buttonLabel="Get API Access →"
        buttonHref="/contact"
        trackingAction="developers_cta_access"
      />
    </div>
  );
}

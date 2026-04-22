'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { PartnerOnboardingFlow } from "@/components/monolith/PartnerOnboardingFlow";
import { FAQSection, FAQGroup } from "@/components/monolith/FAQSection";

const PARTNER_FAQs: FAQGroup[] = [
  {
    category: "Network & Growth",
    items: [
      { 
        id: "types_of_jobs", 
        q: "What types of print jobs will we receive?", 
        a: "You will mostly get book printing projects like: Paperbacks with perfect binding (B&W or color), Hardcovers with dust jackets or printed covers, and Special projects like spiral-bound or board books. Extra services like foil stamping or embossing are matched if you offer them. We match jobs to your skills, location, and capacity; you decide which jobs to accept via your dashboard." 
      },
      { 
        id: "control_jobs", 
        q: "Can we set minimum order values or reject specific jobs?", 
        a: "Yes, you have full control. In your Partner Portal you can set minimum quantities (e.g., 50+ copies), acceptable formats/finishes (e.g., 'no foil stamping'), geographic preferences, and capacity limits (e.g., pause at 80% capacity). You always say yes or no to each job; we never assign work automatically without your approval." 
      },
      { 
        id: "pause_intake", 
        q: "What happens if we are at capacity or need to pause?", 
        a: "You can pause new jobs anytime via the 'Pause Intake' button in your dashboard. Accepted jobs remain your responsibility with no penalties for pausing. For planned maintenance or vacations, notifying your Account Manager is helpful but not required. High-performance partners (95%+ on-time delivery) receive priority when they resume." 
      }
    ]
  },
  {
    category: "Finance & Logistics",
    items: [
      { 
        id: "commission_fees", 
        q: "What commission or fees does PrintPrice Pro charge?", 
        a: "We keep it simple: No monthly fees to join. We take a percentage only when you complete and get paid for an order (usually 12-18%, depending on volume). File checking, customer acquisition, and payment processing are included. You see your exact earnings and our fee before accepting any job (e.g., on a €1,000 job, you might receive €850 and PrintPrice Pro keeps €150)." 
      },
      { 
        id: "payment_terms", 
        q: "What are the payment terms?", 
        a: "The customer pays PrintPrice Pro upfront or on agreed terms. You invoice us upon job completion and quality check. We pay you within 15 days via bank transfer, Wise, or PayPal in your local currency with no extra exchange fees. You are fully protected from customer chargebacks." 
      },
      { 
        id: "customer_service", 
        q: "Who handles customer service, reprints, and returns?", 
        a: "We share responsibility: We handle pre-sale support and file checking. If a production error occurs, the partner covers the reprint and shipping. For customer errors (wrong file approved), the customer pays. Shipping delays are managed by PrintPrice Pro via carrier claims. You'll receive a clear Partner Playbook with all guidelines." 
      }
    ]
  },
  {
    category: "Requirements & Quality",
    items: [
      { 
        id: "equipment_needed", 
        q: "What equipment and capabilities do we need to join?", 
        a: "To join as a book partner, you need digital or offset presses (B&W/Color), perfect binding equipment, the ability to work with PDF/X-1a or PDF/X-4, and a workflow that supports 24-72 hour short-run turnarounds. Reliable internet and a robust internal quality control process are essential." 
      },
      { 
        id: "file_formats", 
        q: "What file formats and specs are required?", 
        a: "We accept PDF/X-1a, PDF/X-4, and high-res print-ready PDFs. Our system automatically validates bleed, trim, color space, and fonts before routing to you. We provide full technical specs (trim, paper, binding, finish) and pre-flight reports for every job." 
      },
      { 
        id: "quality_control", 
        q: "How is quality controlled and approved?", 
        a: "We use three layers: 1. Automatic system validation. 2. Partner approval of proofs before the full run. 3. Random post-production checks and publisher feedback. Partners with 98%+ quality ratings get faster routing, bonus payments, and 'Verified Partner' status." 
      },
      { 
        id: "approval_process", 
        q: "What is the approval process to become a partner?", 
        a: "Our onboarding takes 5-7 business days: 1. Application review. 2. 30-minute technical call. 3. Paid test job to verify quality. 4. Dashboard activation. There are no long-term contracts; you can pause or leave with 30 days notice." 
      }
    ]
  },
  {
    category: "Technical Integration",
    items: [
      { 
        id: "mis_erp_integration", 
        q: "Do we need to integrate with our MIS or ERP system?", 
        a: "No, integration is optional. You can manage everything manually via email and the partner dashboard. For high-volume partners, we offer REST API (webhooks), CSV/SFTP batching, and Zapier/Make.com connectors. Our tech team provides integration support at no extra cost." 
      }
    ]
  },
  {
    category: "Getting Started",
    items: [
      { 
        id: "first_job_timing", 
        q: "How quickly can we get our first job after approval?", 
        a: "Most partners receive their first job within 2-3 days of activation, depending on location, capability matches, and response speed (responding within 2 hours is recommended). Tip: A 100% complete profile with work photos significantly increases visibility." 
      },
      {
        id: "ready_to_join",
        q: "Ready to join the network?",
        a: "Start your 21-day trial today and see how PrintPrice Pro can grow your business. For any questions, chat with us on WhatsApp (+371 20 899 797) or email partners@printprice.pro"
      }
    ]
  }
];

export default function PartnerOnboarding() {
  return (
    <div className="partner-page">
      {/* Partner Hero - Monolith Expansion */}
      <HeroPlatform
        label="PARTNER ONBOARDING / v2.5"
        title={<>EXPAND YOUR <br /> <span style={{ color: 'var(--accent-primary)' }}>PRODUCTION NETWORK</span></>}
        slogan={["TRUSTED.", "INTEGRATED.", "SCALED."]}
        isHeadlineSlogan={false}
        subheadline="Join the PrintPrice OS ecosystem. Receive fully validated job assets and grow your production capacity without manual sales overhead."
        primaryAction={{ label: "Register as a partner →", href: "#onboarding" }}
        secondaryAction={{ label: "View integration specs →", href: "/docs/api/overview" }}
      />

      {/* Onboarding Flow Section */}
      <Section variant="primary" id="onboarding">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 900 }}>QUALIFICATION ENGINE</h4>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.05em' }}>Start Onboarding</h2>
        </div>

        <PartnerOnboardingFlow />
      </Section>

      {/* Trust Elements */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
          {[
            { icon: 'shield', title: 'Only production-ready jobs', desc: 'Stop wasting time on broken files. Every job accepted through the OS is pre-validated.' },
            { icon: 'calculator', title: 'No manual quoting required', desc: 'Receive jobs matched to your specific machine profiles and cost models automatically.' },
            { icon: 'history', title: 'Full audit trace per job', desc: 'Complete accountability in the supply chain. Every action is registered in the immutable monolith log.' },
          ].map((feature, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                <Icon name={feature.icon as any} size={28} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partner FAQs */}
      <FAQSection 
        label="PARTNER FAQ"
        title="Scaling your facility."
        subtitle="Answers for printing houses joining the PrintPrice OS network."
        data={PARTNER_FAQs}
      />

      <ActionCTA 
        slogan="READY TO JOIN?"
        title="Start your 21-day trial today."
        description="See how PrintPrice Pro can help grow your printing business. Have questions? Chat with us on WhatsApp (+371 20 899 797) or email partners@printprice.pro"
        buttonLabel="Register as a Partner →"
        buttonHref="#onboarding"
        trackingAction="partner_ready_to_join"
      />

      {/* Footer System info */}
      <div style={{ textAlign: 'center', paddingBottom: '6rem', opacity: 0.4 }}>
        <span className="technical-text" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>POWERED BY PRINTPRICE OS / NETWORK LAYER</span>
      </div>
    </div>
  );
}

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
        id: "receive_orders", 
        q: "How do we receive orders from PrintPrice Pro?", 
        a: "Your facility becomes a production node for budget.printprice.pro. Customers get instant quotes matched to your capability, sending pre-validated orders directly to your partner dashboard." 
      },
      { 
        id: "responsibility", 
        q: "Who is responsible for production and delivery?", 
        a: "You are. Our partners manage the entire manufacturing cycle and final delivery. PrintPrice Pro provides the technical matching and file validation layer; you provide the craftsmanship and fulfillment." 
      }
    ]
  },
  {
    category: "Technical Tools",
    items: [
      { 
        id: "preflight_access", 
        q: "Do we get access to preflight tools?", 
        a: "Yes. All qualified partners get full access to preflight.printprice.pro. This workstation allows you to perform deep forensic audits and automated fixes on customer PDFs before they hit your press." 
      },
      { 
        id: "validation_benefit", 
        q: "How does the validation layer help our facility?", 
        a: "Every job routed to your facility has already passed through our automated validation. This virtually eliminates pre-press overhead and avoids costly production stops due to file errors." 
      }
    ]
  },
  {
    category: "Management & Control",
    items: [
      { 
        id: "control_plane", 
        q: "How do we manage our pricing and costs?", 
        a: "All partners have full access to the Control Plane at control.printprice.pro. Here you can configure your exact production parameters, including paper costs, transport zones, and technical signatures (32p, 24p, 16p) to ensure automated quotes are always accurate." 
      },
      { 
        id: "order_management", 
        q: "How are orders tracked and managed?", 
        a: "You can monitor every order (e.g., PPP-17APJM-E07D7) via your dashboard. Each order includes a full breakdown of technical specs like binding method, interior paper weight, and finishing options, along with real-time status updates." 
      }
    ]
  },
  {
    category: "Finance & Logistics",
    items: [
      { 
        id: "payments", 
        q: "How and when do we receive payments?", 
        a: "Payments are processed through our automated settlement system. Once an order is marked as delivered and verified by the customer, the funds are cleared according to your specific partner agreement terms." 
      },
      { 
        id: "shipping", 
        q: "Who manages shipping and logistics?", 
        a: "As the production node, you are responsible for secure packaging and coordinating with the carrier. Our system integrates with major logistics providers to allow you to generate labels and track shipments directly from the Control Plane." 
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

      {/* Footer System info */}
      <div style={{ textAlign: 'center', paddingBottom: '6rem', opacity: 0.4 }}>
        <span className="technical-text" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>POWERED BY PRINTPRICE OS / NETWORK LAYER</span>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { PartnerOnboardingFlow } from "@/components/monolith/PartnerOnboardingFlow";

export default function PartnerOnboarding() {
  return (
    <div className="partner-page">
      {/* Partner Hero - Monolith Expansion */}
      <HeroPlatform
        label="PARTNER ONBOARDING / v2.4"
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

      {/* Footer System info */}
      <div style={{ textAlign: 'center', paddingBottom: '6rem', opacity: 0.4 }}>
        <span className="technical-text" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>POWERED BY PRINTPRICE OS / NETWORK LAYER</span>
      </div>
    </div>
  );
}

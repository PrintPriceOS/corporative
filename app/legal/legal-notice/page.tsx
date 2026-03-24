'use client';

import React from 'react';
import { Section } from '@/components/ui/Section';

export default function LegalNoticePage() {
  return (
    <Section variant="primary" style={{ paddingTop: '12rem', paddingBottom: '8rem', ...({} as any) }}>
      <div style={{ maxWidth: '800px', marginInline: 'auto', ...({} as any) }}>
        <h4 className="technical-text" style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', letterSpacing: '0.2rem' }}>
          REGULATORY DOCUMENT / v1.0
        </h4>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.04em' }}>Legal Notice (Imprint)</h1>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', fontSize: '0.8rem', opacity: 0.5 }} className="technical-text">
          <span>LAST UPDATED: 2026-03-23</span>
          <span>VERSION: v1.1 HARDENED</span>
        </div>
        
        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>Company Identity</h3>
            <p>
              <strong>Print Price Pro SIA</strong><br />
              Bruņinieku iela 60-8<br />
              Latgales priekšpilsēta, Rīga<br />
              LV-1009, Latvia
            </p>
            <p>
              <strong>Registration Number</strong>: 40203631570<br />
              <strong>VAT ID</strong>: LV40203631570
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>Represented by:</h3>
            <p>Board of Directors</p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>Contact:</h3>
            <p>Email: <a href="mailto:info@printprice.pro" style={{ color: 'var(--accent-primary)' }}>info@printprice.pro</a></p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>Responsibility for Content:</h3>
            <p>
              While we take great care in the creation and maintenance of this website, we cannot make any claims or guarantees for the exact accuracy or completeness of the technical pricing estimations generated. The content is for informational purposes only.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>External Links:</h3>
            <p>
              Our website contains links to third-party websites (independent printers, manufacturers). We have no influence over the content of these sites and assume no liability for their accuracy, availability, or legal compliance.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>Intellectual Property:</h3>
            <p>
              The Platform, its algorithms, Monolith design system, and technical content are the intellectual property of Print Price Pro SIA and are protected by international copyright and industrial property laws.
            </p>
          </section>
        </div>

        <div style={{ marginTop: '8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <p className="technical-text" style={{ fontSize: '0.8rem', opacity: 0.5 }}>
            PRINT PRICE PRO / DOCUMENT AUTHENTICITY SECURED // 2026-03-23
          </p>
        </div>
      </div>
    </Section>
  );
}

'use client';

import React from 'react';
import { Section } from '@/components/ui/Section';

export default function PrivacyPolicyPage() {
  return (
    <Section variant="primary" style={{ paddingTop: '12rem', paddingBottom: '8rem', ...({} as any) }}>
      <div style={{ maxWidth: '800px', marginInline: 'auto', ...({} as any) }}>
        <h4 className="technical-text" style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', letterSpacing: '0.2rem' }}>
          REGULATORY DOCUMENT / v1.1 HARDENED
        </h4>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.04em' }}>Privacy Policy (GDPR)</h1>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', fontSize: '0.8rem', opacity: 0.5 }} className="technical-text">
          <span>LAST UPDATED: 2026-03-23</span>
          <span>VERSION: v1.1 HARDENED</span>
        </div>
        
        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          
          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>1. Data Controller</h3>
            <p>
              Print Price Pro SIA<br />
              Registration Number: 40203631570<br />
              Address: Bruņinieku iela 60-8, Rīga, LV-1009, Latvia<br />
              Email: <a href="mailto:privacy@printprice.pro" style={{ color: 'var(--accent-primary)' }}>privacy@printprice.pro</a>
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>2. Data We Collect</h3>
            <p>We may collect the following categories of data:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li><strong>Identity Data</strong>: Name, company name, email address, and contact details.</li>
              <li><strong>Technical Data</strong>: Project specifications, uploaded files, and production requirements.</li>
              <li><strong>Behavioral Data</strong>: Interaction data such as clicks, scroll depth, session duration, and decision latency.</li>
              <li><strong>Device Data</strong>: IP address, browser type, operating system, and device identifiers.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>3. Legal Basis for Processing</h3>
            <p>We process personal data under the following legal bases:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li><strong>Contractual Necessity</strong>: To provide pricing estimations, file validation, and matchmaking services.</li>
              <li><strong>Legitimate Interest</strong>: To improve system performance, analytics, and user experience.</li>
              <li><strong>Consent</strong>: For optional cookies and marketing communications.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>4. Behavioral Profiling & Telemetry</h3>
            <p style={{ marginTop: '1rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
              We use advanced telemetry systems to analyze how users interact with the Platform.
            </p>
            <p>This includes:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li>Session behavior.</li>
              <li>Interaction patterns.</li>
              <li>Inferred user type (e.g., business or developer).</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>This profiling:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li>is used solely for optimization and UX improvement.</li>
              <li>does NOT produce legal or significant effects on users.</li>
              <li>does NOT involve automated decision-making with legal consequences.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>5. Data Sharing with Printers</h3>
            <p>
              To provide our services, we may share project specifications, technical requirements, and uploaded files with selected independent printing providers ("Printers"). 
            </p>
            <p style={{ marginTop: '1rem' }}>
              This sharing is strictly limited to the purpose of quotation and production evaluation. We do not sell personal data to third parties.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>6. International Data Transfers</h3>
            <p>
              As Print Price Pro operates globally, your data may be transferred to printers or service providers outside the European Economic Area (EEA). In such cases, we ensure appropriate safeguards are in place, including contractual agreements and standard data protection clauses.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>7. Data Retention</h3>
            <p>
              We retain personal data only for as long as necessary to provide our services, comply with legal obligations, and improve system performance. Project and interaction data may be stored for analytical and optimization purposes. Users may request deletion of their data at any time.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>8. Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect personal data, including secure data storage, access control systems, and encryption where appropriate. However, no system can guarantee absolute security.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>9. Your GDPR Rights</h3>
            <p>Under the GDPR, you have the following rights:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li>Right of Access.</li>
              <li>Right to Rectification.</li>
              <li>Right to Erasure.</li>
              <li>Right to Restrict Processing.</li>
              <li>Right to Object.</li>
              <li>Right to Data Portability.</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              You also have the right to lodge a complaint with your local data protection authority. To exercise your rights, contact: <strong>privacy@printprice.pro</strong>.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>10. Cookies & Tracking</h3>
            <p>
              We use cookies and similar technologies to ensure basic functionality, analyze usage, and improve performance. Where required, we obtain your consent before using non-essential cookies. For more details, see our Cookie Policy.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>11. Updates</h3>
            <p>
              We may update this Privacy Policy from time to time. Changes will take effect upon publication on this page.
            </p>
          </section>

        </div>

        <div style={{ marginTop: '8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <p className="technical-text" style={{ fontSize: '0.8rem', opacity: 0.5 }}>
            PRINT PRICE PRO / DATA PROTECTION FRAMEWORK // HARDENED v1.1 // 2026-03-23
          </p>
        </div>
      </div>
    </Section>
  );
}

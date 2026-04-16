'use client';

import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function PartnerTermsPage() {
  const printTerms = () => {
    window.print();
  };

  return (
    <main style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: '4rem 2rem' }}>
      <Section variant="primary" style={{ maxWidth: '900px', margin: '0 auto', background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', borderBottom: '2px solid #000', paddingBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#000' }}>Partner Terms</h1>
            <p style={{ opacity: 0.6, fontSize: '0.8rem', color: '#000' }}>Print House / Production Node Agreement (v1.0)</p>
          </div>
          <Button onClick={printTerms} style={{ background: '#000', color: '#fff', borderRadius: '0' }}>SAVE AS PDF / PRINT</Button>
        </div>

        <div style={{ fontFamily: 'monospace', color: '#000' }}>
          {[
            { title: "1. Scope", text: "These Partner Terms govern the commercial relationship between Print Price Pro SIA (“PrintPrice Pro”, “we”, “us”) and the printing company or production partner (“Partner”, “you”)." },
            { title: "2. Nature of the Relationship", text: "PrintPrice Pro operates an orchestration system that connects validated demand with qualified partners.\nPrintPrice Pro is not the manufacturer. The Partner remains the independent production entity." },
            { title: "3. Partner Admission and Qualification", text: "Admission is subject to criteria. The Partner must provide accurate info on legal entity, capabilities, and machinery." },
            { title: "4. Partner Obligations", text: "Maintain accurate capability and production info at all times. Manufacture jobs within accepted specifications. Use approved workflows only." },
            { title: "5. PrintPrice Pro Obligations", text: "Operate the system with care and provide Partner with relevant job specifications and assets." },
            { title: "6. No Volume Guarantee", text: "Admission to the network does not guarantee any minimum jobs or exclusivity." },
            { title: "7. Job Acceptance and Execution", text: "Routed jobs become binding only when accepted in the designated workflow. Once accepted, Partner is responsible for timely fulfillment." },
            { title: "8. Quality, Defects, and Non-Conformity", text: "Partner is responsible for production quality. Defective jobs may require reprint or remediation." },
            { title: "9. Pricing, Fees, and Commercial Terms", text: "Commercial terms include routed job pricing and platform fees communicated during onboarding." },
            { title: "10. Non-Circumvention", text: "Partner shall not circumvent PrintPrice Pro to avoid fees or governance obligations." },
            { title: "11. Confidentiality", text: "Partner shall keep all non-public information received through the platform confidential." },
            { title: "12. Intellectual Property", text: "Customer files and metadata remain the property of their owners." },
            { title: "13. Data Protection", text: "Parties shall comply with applicable data protection laws, including GDPR." },
            { title: "14. Technical Integration and System Use", text: "Partner shall use authorized credentials and not interfere with platform security." },
            { title: "15. Audit and Monitoring", text: "PrintPrice Pro may retain logs for dispute resolution and quality review." },
            { title: "16. Suspension and Termination", text: "PrintPrice Pro may suspend access for breach of terms or quality failure." },
            { title: "17. Governing Law and Jurisdiction", text: "Terms are governed by Latvian law. Disputes are subject to the exclusive jurisdiction of the courts of Riga." }
          ].map((section, idx) => (
            <div key={idx} style={{ marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#000', fontSize: '1rem', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase' }}>{section.title}</h4>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333', whiteSpace: 'pre-wrap' }}>{section.text}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem', border: '1px solid #000', fontFamily: 'monospace', fontSize: '0.9rem' }}>
          <p style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Print Price Pro SIA</p>
          <p>Bruņinieku iela 60-8</p>
          <p>Latgales priekšpilsēta, Rīga, LV-1009, Latvia</p>
          <p>Registration No.: 40203631570</p>
          <p>VAT ID: LV40203631570</p>
          <p>Email: info@printprice.pro</p>
        </div>

        <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #eee', fontSize: '0.8rem', opacity: 0.5 }}>
          PrintPrice Pro Legal Document Repository / v2.5
        </div>
      </Section>
      
      <style jsx global>{`
        @media print {
          button { display: none !important; }
          main { padding: 0 !important; }
        }
      `}</style>
    </main>
  );
}

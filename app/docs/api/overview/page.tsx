import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';

export default function ApiOverviewPage() {
  return (
    <div className="doc-content">
      <Section variant="primary">
        <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
          API Overview
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem', lineHeight: 1.6 }}>
          Integration is the lifeblood of the PrintPrice Pro ecosystem. Our API allows you to programmatically 
          orchestrate printing, calculation, and validation tasks with ease.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '5rem' }}>
          <div style={{ padding: '2rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
            <h4 className="technical-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>CORE CAPABILITIES</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
              <li>Price estimation from specifications</li>
              <li>File validation and preflight checks</li>
              <li>Production job routing and tracking</li>
            </ul>
          </div>
          <div style={{ padding: '2rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
            <h4 className="technical-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>AUTHENTICATION</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              All API calls require an <code>X-API-KEY</code> header for authentication. 
              Obtain your key from the Control Plane.
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 700 }}>Integration Tiers</h2>
        <div style={{ marginBottom: '4rem' }}>
           <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
             We offer multiple levels of integration depending on your role in the ecosystem.
           </p>
           <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none', padding: 0 }}>
             <li style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.5rem' }}>
                <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Partner API (Printhouses)</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Receive job notifications, update production status, and manage node capacity.</p>
             </li>
             <li style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.5rem' }}>
                <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Merchant API (Retailers)</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Request instant calculations and initiate manufacturing workflows directly from your ERP.</p>
             </li>
           </ul>
        </div>

        <div style={{ background: 'rgba(220, 0, 0, 0.05)', border: '1px solid var(--accent-primary)', padding: '3rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Need specific integration details?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            Our architects are available to guide you through complex enterprise deployments.
          </p>
          <Link href="/contact" className="nav-link-technical" style={{ fontWeight: 800, color: 'var(--accent-primary)', display: 'inline-block' }}>
            REQUEST ARCHITECT REVIEW →
          </Link>
        </div>
      </Section>
    </div>
  );
}

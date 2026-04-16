import React from 'react';

export default function IntegrationContractsPage() {
  return (
    <div className="docs-content">
      <span className="technical-text" style={{ 
        fontSize: '0.75rem', 
        fontWeight: 500, 
        textTransform: 'uppercase', 
        color: 'var(--accent-primary)',
        letterSpacing: '0.15em',
        marginBottom: '1rem',
        display: 'block'
      }}>API / v2.5</span>
      
      <h1 style={{ fontSize: '3rem', letterSpacing: '-0.06em', marginBottom: '2rem' }}>
        Integration <br/> Contracts
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        Integration contracts define the protocol by which internal or external systems communicate. 
        PrintPrice Pro provides a set of standardized contracts for data exchange, job status, and cost.
      </p>

      <section style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.25rem' }}>Core Contracts Available</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>Job Creation:</strong> POST /v1/jobs</li>
          <li><strong>Specification:</strong> GET /v1/specs</li>
          <li><strong>Status Update:</strong> PATCH /v1/jobs/status</li>
          <li><strong>Cost Quote:</strong> GET /v1/quote</li>
        </ul>
      </section>

      <div style={{ padding: '2rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Need full API details?</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Explore our complete technical documentation for end-to-end integration: 
          <a href="https://docs.printprice.pro/docs/api" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem', fontWeight: 700 }}>Read full API docs →</a>
        </p>
      </div>
    </div>
  );
}

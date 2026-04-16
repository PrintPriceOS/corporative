import React from 'react';

export default function DeploymentBlueprintPage() {
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
      }}>Infrastructure / v2.5</span>
      
      <h1 style={{ fontSize: '3rem', letterSpacing: '-0.06em', marginBottom: '2rem' }}>
        Deployment <br/> Blueprint
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        A guide to the strategic deployment of PrintPrice Pro infrastructure. 
        Each deployment blueprint is designed to optimize latency, production reliability, 
        and cost for specific manufacturing regions.
      </p>

      <section style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Core Architecture Components</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>Control Nodes:</strong> Orchestrates jobs and monitors health.</li>
          <li><strong>Production Nodes:</strong> The physical manufacturing facilities.</li>
          <li><strong>Edge Data Layer:</strong> High-performance caching for substrate pricing.</li>
        </ul>
      </section>

      <div style={{ background: 'var(--bg-secondary)', padding: '2rem', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Looking for full deployment guides?</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Explore our complete technical documentation for end-to-end infrastructure: 
          <a href="https://docs.printprice.pro/docs/infrastructure" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem', fontWeight: 700 }}>Read full infra docs →</a>
        </p>
      </div>
    </div>
  );
}

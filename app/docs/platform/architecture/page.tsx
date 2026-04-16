import React from 'react';

export default function ArchitecturePage() {
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
      }}>Platform / v2.5</span>
      
      <h1 style={{ fontSize: '3.5rem', letterSpacing: '-0.06em', marginBottom: '2rem' }}>
        System Architecture
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '4rem' }}>
        The PrintPrice platform is a distributed system of specialized engines designed to orchestrate the global print industry. 
        It combines pricing intelligence, PDF preflight analysis, production constraints modeling, and manufacturing network routing.
      </p>

      <h2 style={{ fontSize: '2rem', letterSpacing: '-0.04em', marginBottom: '1.5rem', marginTop: '4rem' }}>High-Level Architecture</h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
        The platform is composed of several specialized engines that work together through a unified data model:
      </p>
      
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: 0 }}>
        <li style={{ background: 'var(--bg-secondary)', padding: '2rem', borderLeft: '3px solid var(--accent-primary)' }}>
          <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>1. Book Pricing Engine (BPE)</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>The economic core. Calculates precise manufacturing costs based on substrates, inks, and binding types.</p>
        </li>
        <li style={{ background: 'var(--bg-secondary)', padding: '2rem', borderLeft: '3px solid var(--accent-primary)' }}>
          <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>2. Preflight Engine</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Handles deterministic PDF analysis and automated file resolution (Auto-Fix).</p>
        </li>
        <li style={{ background: 'var(--bg-secondary)', padding: '2rem', borderLeft: '3px solid var(--accent-primary)' }}>
          <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>3. Production Intelligence Layer</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Models manufacturing constraints and substrate compatibility for global facilities.</p>
        </li>
        <li style={{ background: 'var(--bg-secondary)', padding: '2rem', borderLeft: '3px solid var(--accent-primary)' }}>
          <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>4. Matchmaker & Routing</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Matches jobs to the optimal production node based on price, quality, and location.</p>
        </li>
      </ul>

      <h2 style={{ fontSize: '2rem', letterSpacing: '-0.04em', marginBottom: '1.5rem', marginTop: '4rem' }}>System Flow</h2>
      <div style={{ padding: '2.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8, fontSize: '0.8rem' }} className="technical-text">
          <span>SPECIFICATION</span>
          <span>→</span>
          <span>ANALYSIS</span>
          <span>→</span>
          <span>ORCHESTRATION</span>
          <span>→</span>
          <span>PRODUCTION</span>
        </div>
      </div>
    </div>
  );
}

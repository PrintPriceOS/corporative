import React from 'react';

export default function SystemDataModelPage() {
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
      
      <h1 style={{ fontSize: '3rem', letterSpacing: '-0.04em', marginBottom: '2rem' }}>
        System Data <br/> Model
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        PrintPrice Pro uses a canonical data model to ensure perfect alignment between every stage of the printed book's lifecycle. 
        It defines how specifications (specs), physical assets (files), and manufacturing results (jobs) are linked.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h4 className="technical-text" style={{ fontSize: '0.65rem', marginBottom: '1rem', fontWeight: 800 }}>CORE ENTITIES</h4>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li><strong>Job:</strong> The top-level orchestration object.</li>
          <li><strong>Specification:</strong> Total physical parameters of the book.</li>
          <li><strong>Asset:</strong> The forensic data extracted from production files.</li>
          <li><strong>Node:</strong> The manufacturing facility selected for execution.</li>
        </ul>
      </section>

      <div style={{ marginTop: '4rem', padding: '2rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          For deep schema definitions and field-level documentation, visit the 
          <a href="https://docs.printprice.pro/docs/platform/system-data-model" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem', fontWeight: 700 }}>Full Specs →</a>
        </p>
      </div>
    </div>
  );
}

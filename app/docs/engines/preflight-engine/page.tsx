import React from 'react';

export default function PreflightEnginePage() {
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
      }}>Core Engines / v2.5</span>
      
      <h1 style={{ fontSize: '3.5rem', letterSpacing: '-0.06em', marginBottom: '2rem' }}>
        Preflight <br/> Engine
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '4rem' }}>
        The Preflight Engine is the technical analysis layer of the PrintPrice platform. 
        It transforms raw PDF files into structured production metrics using forensic analysis of every graphical and structural asset.
      </p>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.25rem' }}>Core Purpose</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Rather than just identifying "errors," the Preflight Engine determines a job's <strong>manufacturability</strong>. 
          By cross-referencing file data with the physical capabilities of specific print nodes, it accurately predicts 
          production success before a single drop of ink is expended.
        </p>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>Forensic Capabilities</h2>
        <div style={{ padding: '3rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: 0 }}>
             {[
               'Resolution Analysis for every image asset.',
               'Substrate Bleed and Spine-specific margin checks.',
               'Ink Limit Density (TAC) and Color Space (D50) validation.',
               'Font Licensing and Subset embedding verification.',
               'Deterministic Intent Detection (Auto-Mapping specs to file reality).'
             ].map((cap, i) => (
                <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '4px', height: '4px', background: 'var(--accent-primary)', ...({} as any) }}></div>
                  {cap}
                </li>
             ))}
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>Integration Flow</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.3, fontSize: '0.7rem' }} className="technical-text">
            <span>PARSE</span>
            <span>→</span>
            <span>VALIDATE</span>
            <span>→</span>
            <span>REPORT</span>
            <span>→</span>
            <span>READY_FOR_SHIP</span>
        </div>
      </section>
    </div>
  );
}

import React from 'react';

export default function ProductionPipelinePage() {
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
        Production <br/> Pipeline
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '4rem' }}>
        The PrintPrice production pipeline transforms raw specifications and uploaded assets into validated, 
        manufacturable, and optimally routed production jobs — without manual intervention.
      </p>

      <section style={{ marginBottom: '5rem' }}>
         <h2 style={{ fontSize: '2rem', marginBottom: '2rem', letterSpacing: '-0.04em' }}>The 8 Stages of Production</h2>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: 0 }}>
            <div style={{ padding: '2rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>STAGE 01-03: DEFINITION</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Requirement Specifications</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>Define the project's physical and commercial parameters through the Pricing Engine.</p>
            </div>
            <div style={{ padding: '2rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>STAGE 04-05: ANALYSIS & VALIDATION</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Asset Forensic Check</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>The Preflight Engine Analyzes every graphical asset for compliance and intent auto-detection.</p>
            </div>
            <div style={{ padding: '2rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>STAGE 06-08: ORCHESTRATION</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Target Node Selection</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>Matchmaker Engine identifies and routes to the optimal production facility from the network.</p>
            </div>
         </div>
      </section>

      <div style={{ background: 'var(--accent-primary)', color: '#fff', padding: '3.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Zero-Manual Handoff.</h3>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>The entire pipeline is deterministic, governed by the System Data Model to eliminate errors and delays.</p>
      </div>
    </div>
  );
}

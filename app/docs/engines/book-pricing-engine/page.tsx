import React from 'react';

export default function PricingEnginePage() {
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
        Book Pricing <br/> Engine
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '4rem' }}>
        The Book Pricing Engine (BPE) is the economic heart of the PrintPrice Pro ecosystem. 
        It provides high-precision manufacturing cost calculations based on live substrate, ink, and facility capability data.
      </p>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.25rem' }}>Core Inputs</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>The engine uses a deterministic model that takes into account every manufacturing variable:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
          {['Page Counts (Text & Covers)', 'Substrate Grammage & Bulk', 'Ink Coverage Metrics', 'Binding Architecture', 'Ship-to Geography', 'Node Capacity'].map(input => (
            <div key={input} style={{ background: 'var(--bg-primary)', padding: '1.25rem', fontSize: '0.9rem' }}>{input}</div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
         <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>How it Works</h2>
         <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Unlike traditional estimates, the BPE runs a full simulation of the manufacturing run across every compatible node. 
            It doesn't just calculate a price; it calculates <strong>attainable manufacturing cost</strong>.
         </p>
         <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
            <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', marginBottom: '1.25rem', letterSpacing: '0.2em', fontWeight: 800 }}>DETERMINISTIC PIPELINE</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>1. Input Normalization</li>
              <li>2. Substrate Availability Check</li>
              <li>3. Node Capability Intersection</li>
              <li>4. Economic Model Execution</li>
              <li>5. Final Quote Generation</li>
            </ul>
         </div>
      </section>
    </div>
  );
}

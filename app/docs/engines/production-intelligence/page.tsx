import React from 'react';

export default function ProductionIntelligencePage() {
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
      
      <h1 style={{ fontSize: '3rem', letterSpacing: '-0.06em', marginBottom: '2rem' }}>
        Production <br/> Intelligence
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        Production Intelligence (PI) is the bridge between human intent and machine execution. 
        The PI layer knows specifically how books are made and automatically determines the 
        physical manufacturing path for a job.
      </p>

      <div style={{ padding: '2.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Core Intelligence Areas</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>Binding Intelligence:</strong> Evaluates spine width and bulk for perfect binding.</li>
          <li><strong>Paper Compatibility:</strong> Cross-checks grammage with specific production nodes.</li>
          <li><strong>Intent Estimation:</strong> Detecting specifications from uploaded asset data.</li>
        </ul>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          For detailed technical specs and algorithms, visit our 
          <a href="https://docs.printprice.pro/docs/engines/production-intelligence" style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem', fontWeight: 700 }}>Full Documentation →</a>
        </p>
      </div>
    </div>
  );
}

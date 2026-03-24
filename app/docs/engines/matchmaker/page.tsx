import React from 'react';

export default function MatchmakerEnginePage() {
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
      }}>Core Engines / v2.4</span>
      
      <h1 style={{ fontSize: '3.5rem', letterSpacing: '-0.06em', marginBottom: '2rem' }}>
        Matchmaker <br/> Engine
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '4rem' }}>
        The Matchmaker Engine is the operational routing brain of PrintPrice Pro. 
        It solves the complex "optimal producer" problem by cross-referencing job requirements with node capacity, 
        quality benchmarks, and lead time constraints.
      </p>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.25rem' }}>Dynamic Selection Logic</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
           Traditional routing is static. The Matchmaker Engine is dynamic, recalculating the optimal node 
           based on real-time telemetry from every facility in the network.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
           {['Facility Capacity', 'Historical Quality Scores', 'Geographical Offset', 'Cost-to-Node Efficiency', 'Substrate Specificity'].map(logic => (
              <div key={logic} style={{ background: 'var(--bg-primary)', padding: '1.25rem', fontSize: '0.9rem' }}>{logic}</div>
           ))}
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>How Matchmaker Pairs Jobs</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
           The engine uses a weighted scoring matrix that ensures every manufacturing request is routed to a node 
           that can execute it with 100% fidelity at the lowest possible cost.
        </p>
        <div style={{ padding: '2.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', textAlign: 'center' }}>
            <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', marginBottom: '1.25rem', letterSpacing: '0.2em', fontWeight: 800 }}>ROUTING MATRIX</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', fontSize: '1.5rem', fontWeight: 900 }}>
              <span style={{ color: 'var(--accent-primary)' }}>JOB</span>
              <span>+</span>
              <span style={{ color: 'var(--accent-primary)' }}>NODE</span>
              <span>=</span>
              <span>RESULT</span>
            </div>
        </div>
      </section>
    </div>
  );
}

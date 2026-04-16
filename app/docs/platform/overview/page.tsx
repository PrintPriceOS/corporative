import React from 'react';

export default function DocsOverviewPage() {
  return (
    <div className="docs-content">
      <span className="technical-text" style={{ 
        fontSize: '0.75rem', 
        fontWeight: 500, 
        textTransform: 'uppercase', 
        color: 'var(--accent-primary)',
        letterSpacing: '0.15em',
        marginBottom: '1rem',
        display: 'block',
        ...({} as any)
      }}>Platform / v2.5</span>
      <h1 style={{ fontSize: '3.5rem', letterSpacing: '-0.06em', marginBottom: '2rem', ...({} as any) }}>Platform <br/> Overview</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '4rem', ...({} as any) }}>
        PrintPrice Pro is a high-performance operating system designed to orchestrate complex print production workflows. 
        It replaces manual coordination with a unified, self-observing infrastructure layer.
      </p>

      <h2 style={{ fontSize: '2rem', letterSpacing: '-0.04em', marginBottom: '1.5rem', marginTop: '4rem', ...({} as any) }}>Core Architecture</h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', ...({} as any) }}>
        The platform consists of specialized engines coordinated by a centralized control plane. 
        Each engine is autonomous but shares a common data model to ensure seamless 
        information flow across all manufacturing surfaces.
      </p>

      <div style={{ 
        padding: '3rem', 
        background: 'var(--bg-secondary)', 
        position: 'relative',
        marginTop: '4rem',
        ...({} as any) 
      }}>
        <h4 className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>System Capabilities</h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', ...({} as any) }}>
          {[
            'Real-time pricing for multi-variant jobs.',
            'AI-driven preflight and resolution auto-fix.',
            'Production node status monitoring.',
            'Customer order lifecycle management.'
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)', ...({} as any) }}>
              <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)', ...({} as any) }}></div>
              {item}
            </li>
          ))}
        </ul>
        {/* Signature Texture */}
        <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '2px',
            height: '100%',
            background: 'var(--accent-primary)',
            opacity: 0.2,
            ...({} as any)
        }} />
      </div>
    </div>
  );
}

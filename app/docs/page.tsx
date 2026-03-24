import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SystemCardHover } from '@/components/ui/effects/SystemCardHover';
import { Icon } from '@/components/ui/Icon';

export default function DocsPage() {
  const sections = [
    {
      title: "Platform Overview",
      desc: "Comprehensive technical roadmap of the PrintPrice Pro ecosystem. v2.4 certified.",
      href: "/docs/platform/overview",
      id: "P-01",
      icon: "web"
    },
    {
      title: "Core Engines",
      desc: "Technical deep-dives into algorithms powering pricing, preflight, and intelligence.",
      href: "/docs/engines/book-pricing-engine",
      id: "E-02",
      icon: "pipeline"
    },
    {
      title: "Integration Contracts",
      desc: "Standard protocols for connecting third-party systems to the monolith logic.",
      href: "/docs/api/integration-contracts",
      id: "I-03",
      icon: "node"
    },
    {
      title: "Deployment Blueprint",
      desc: "Infrastructure configuration for self-protecting production nodes.",
      href: "/docs/infrastructure/deployment-blueprint",
      id: "D-04",
      icon: "specs"
    }
  ];

  return (
    <div className="docs-hub">
      <span className="technical-text" style={{ 
        color: 'var(--accent-primary)', 
        opacity: 0.8,
        fontSize: '0.75rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em',
        marginBottom: '1.5rem',
        display: 'block'
      }}>System Knowledge / monolith_log</span>
      <h1 style={{ 
        fontSize: '4rem', 
        letterSpacing: '-0.06em',
        marginBottom: '1.5rem'
      }}>
        SYSTEM <br/>
        DOCUMENTATION
      </h1>
      <p style={{ 
        fontSize: '1.25rem', 
        color: 'var(--text-secondary)', 
        lineHeight: 1.6, 
        marginBottom: '4rem',
        maxWidth: '650px'
      }}>
        The technical knowledge hub for the PrintPrice Pro ecosystem. This documentation 
        covers the architectural blueprint and integration standards of the OS.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '1.4rem'
      }}>
        {sections.map((sec) => (
          <Link key={sec.title} href={sec.href} style={{ textDecoration: 'none' }}>
            <SystemCardHover borderRadius={0}>
              <div style={{ padding: '3rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                        <Icon name={sec.icon as any} size={24} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <span className="technical-text" style={{ 
                        fontSize: '0.65rem', 
                        color: 'var(--text-muted)',
                        fontWeight: 900
                    }}>{sec.id}</span>
                </div>
                
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{sec.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '3rem', opacity: 0.8 }}>{sec.desc}</p>
                
                <div style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--accent-primary)', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em',
                    fontFamily: 'var(--font-technical)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    EXPLORE DOCS 
                    <div style={{ width: '20px', height: '1px', background: 'currentColor' }}></div>
                </div>
              </div>
            </SystemCardHover>
          </Link>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const categories = [
    {
      title: "Platform",
      items: [
        { name: "Overview", href: "/docs/platform/overview" },
        { name: "Architecture", href: "/docs/platform/architecture" },
        { name: "Production Pipeline", href: "/docs/platform/production-pipeline" },
        { name: "System Data Model", href: "/docs/platform/system-data-model" },
      ]
    },
    {
      title: "Core Engines",
      items: [
        { name: "Book Pricing Engine", href: "/docs/engines/book-pricing-engine" },
        { name: "Preflight Engine", href: "/docs/engines/preflight-engine" },
        { name: "Production Intelligence", href: "/docs/engines/production-intelligence" },
        { name: "Matchmaker Engine", href: "/docs/engines/matchmaker" },
      ]
    },
    {
      title: "API",
      items: [
        { name: "API Overview", href: "/docs/api/overview" },
        { name: "Integration Contracts", href: "/docs/api/integration-contracts" },
      ]
    },
    {
      title: "Infrastructure",
      items: [
        { name: "Deployment Blueprint", href: "/docs/infrastructure/deployment-blueprint" },
      ]
    }
  ];

  return (
    <div className="docs-layout" style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      ...({} as any)
    }}>
      {/* Sidebar - Tonal Separation (SOLID Monolith) */}
      <aside style={{ 
        width: '300px', 
        padding: '4rem 2rem',
        position: 'sticky',
        top: '64px',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        background: 'var(--bg-secondary)', // SOLID background for tonal separation
        zIndex: 10,
        ...({} as any)
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', ...({} as any) }}>
          {categories.map((cat) => (
            <div key={cat.title}>
              <h5 className="technical-text" style={{ 
                fontSize: '0.7rem', 
                fontWeight: 500, 
                textTransform: 'uppercase', 
                color: 'var(--accent-primary)', 
                opacity: 0.8,
                letterSpacing: '0.15em',
                marginBottom: '1.25rem',
                ...({} as any)
              }}>{cat.title}</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', ...({} as any) }}>
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-monolith)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      ...({} as any)
                    }} className="docs-nav-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            background: 'rgba(220, 0, 0, 0.05)', 
            border: '1px solid var(--accent-primary)',
            borderRadius: '2px'
          }}>
            <h6 className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>EXTERNAL_CORE</h6>
            <a href="https://docs.printprice.pro/" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              EXPLORE FULL DOCS →
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area - Editorial Focus */}
      <main style={{ 
        flex: 1, 
        padding: '6rem 5rem', 
        maxWidth: '1000px',
        marginInline: 'auto',
        ...({} as any)
      }}>
        <div style={{ maxWidth: '750px', ...({} as any) }}>
            {children}
        </div>
      </main>
    </div>
  );
}

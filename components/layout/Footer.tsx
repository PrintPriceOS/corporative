'use client';

import React from 'react';
import { Container } from '../ui/Container';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { Icon } from '../ui/Icon';

export const Footer: React.FC = () => {
  const headingStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '0.75rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '2rem',
    color: 'var(--text-primary)',
    ...({} as any)
  };

  const linkStyle = {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    transition: 'color var(--transition-monolith)',
    ...({} as any)
  };

  return (
    <footer className="site-footer" style={{
      background: 'var(--bg-secondary)',
      padding: 'clamp(4rem, 10vw, var(--section-padding)) 0 4rem',
      marginTop: 'auto',
      ...({} as any)
    }}>
      <Container className="footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 45%, 200px), 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)',
        ...({} as any)
      }}>
        <div className="footer-brand" style={{ gridColumn: '1 / -1', marginBottom: '1rem', ...({} as any) }}>
          <style>{`
            @media (max-width: 639px) {
              .footer-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 2.5rem 1rem !important;
              }
              .footer-links h4 {
                margin-bottom: 1.25rem !important;
                font-size: 0.7rem !important;
              }
              .footer-brand {
                margin-bottom: 2rem !important;
              }
              .social-links {
                justify-content: flex-start !important;
              }
            }
            .social-link {
              color: var(--text-secondary);
              transition: all var(--transition-monolith);
              display: flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border: 1px solid var(--border-color);
              background: rgba(255, 255, 255, 0.02);
            }
            .social-link:hover {
              color: #ffffff !important;
              border-color: var(--accent-primary) !important;
              background: rgba(220, 0, 0, 0.1) !important;
              box-shadow: 0 0 15px rgba(220, 0, 0, 0.2);
              transform: translateY(-2px);
            }
            @media (min-width: 1024px) {
              .footer-brand { grid-column: auto !important; margin-bottom: 0 !important; }
            }
          `}</style>
          <Link href="/" style={{ 
            fontSize: '1rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)', 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            ...({} as any) 
          }}>
            <Logo size={28} />
            <span>
              <span style={{ color: 'var(--accent-primary)' }}>PrintPrice</span> Pro
            </span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.8', maxWidth: '400px', marginBottom: '1.5rem', ...({} as any) }}>
            Know your print cost.<br />
            Fix your files.<br />
            Choose the best printer.
          </p>
          <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', opacity: 0.6, letterSpacing: '0.1rem', fontWeight: 800 }}>
            PRICE IT. FIX IT. PRINT IT.
          </div>
          <div className="social-links" style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', ...({} as any) }}>
            <Link href="https://x.com/PRINTPRICEPRO" target="_blank" className="social-link" title="Follow us on X">
              <Icon name="x" size={16} />
            </Link>
            <Link href="https://www.linkedin.com/company/print-price-pro/" target="_blank" className="social-link" title="Connect on LinkedIn">
              <Icon name="linkedin" size={16} />
            </Link>
            <Link href="https://www.facebook.com/printpricepro" target="_blank" className="social-link" title="Visit our Facebook">
              <Icon name="facebook" size={16} />
            </Link>
            <Link href="https://www.tiktok.com/@printpricepro" target="_blank" className="social-link" title="Follow us on TikTok">
              <Icon name="tiktok" size={16} />
            </Link>
          </div>
        </div>
        
        <div className="footer-links">
          <h4 style={headingStyle}>Platform</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', ...({} as any) }}>
            <li><Link href="/platform" className="nav-link-technical" style={linkStyle}>Overview</Link></li>
            <li><Link href="/products/budget" className="nav-link-technical" style={linkStyle}>Pricing Engine</Link></li>
            <li><Link href="/products/preflight" className="nav-link-technical" style={linkStyle}>File Validation</Link></li>
            <li><Link href="/products/control" className="nav-link-technical" style={linkStyle}>Control Plane</Link></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4 style={headingStyle}>Resources</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', ...({} as any) }}>
            <li><Link href="https://docs.printprice.pro" className="nav-link-technical" style={linkStyle}>Documentation</Link></li>
            <li><Link href="https://api.printprice.pro" className="nav-link-technical" style={linkStyle}>API</Link></li>
            <li><Link href="/developers" className="nav-link-technical" style={linkStyle}>Developer Portal</Link></li>
            <li><Link href="/ai-agent" className="nav-link-technical" style={linkStyle}>AI Agent</Link></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4 style={headingStyle}>Connect</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', ...({} as any) }}>
            <li><Link href="/company" className="nav-link-technical" style={linkStyle}>The Lab</Link></li>
            <li><Link href="/contact" className="nav-link-technical" style={linkStyle}>Architects</Link></li>
            <li><Link href="/governance" className="nav-link-technical" style={linkStyle}>Governance</Link></li>
            <li><Link href="/contact/partner" className="nav-link-technical" style={linkStyle}>Supply Network</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 style={headingStyle}>Legal</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, listStyle: 'none' }}>
              <li><Link href="/legal/terms-of-service" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.85rem' }}>Terms</Link></li>
              <li><Link href="/legal/privacy-policy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.85rem' }}>Privacy</Link></li>
              <li><Link href="/legal/legal-notice" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.85rem' }}>Legal</Link></li>
              <li>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('ppp_reopen_consent'))}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    color: 'var(--text-secondary)', 
                    cursor: 'pointer', 
                    fontSize: '0.85rem', 
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'color 0.2s'
                  }}
                >
                  Cookies
                </button>
              </li>
            </ul>
        </div>
      </Container>
      
      <Container style={{
        marginTop: 'clamp(4rem, 10vw, 8rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-technical)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        ...({} as any)
      }}>
        <div style={{ opacity: 0.5 }}>
          We use analytics and telemetry to improve your experience. No personal data is sold.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ opacity: 0.8 }}>© 2026 PrintPrice Pro (v2.4) — Print Price Pro SIA</span>
            <span style={{ opacity: 0.5, fontSize: '0.65rem' }}>
              Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Latvia
            </span>
            <span style={{ opacity: 0.5, fontSize: '0.65rem' }}>
              Registration Number: 40203631570 — VAT ID: LV40203631570
            </span>
          </div>
          <span>Infrastructure by PrintPrice OS</span>
        </div>
      </Container>
    </footer>
  );
};

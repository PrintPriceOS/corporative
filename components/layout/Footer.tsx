'use client';

import React from 'react';
import { Container } from '../ui/Container';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { Icon } from '../ui/Icon';
import { useLocale } from '@/lib/i18n';

export const Footer: React.FC = () => {
  const { dict } = useLocale();

  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: '1.25rem',
    color: 'var(--text-primary)',
  };

  const linkStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
    lineHeight: 1.6,
  };

  return (
    <footer
      className="site-footer"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: 'clamp(3.5rem, 6vw, 5rem) 0 2.5rem',
        marginTop: 'auto',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem 2rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Info Column */}
          <div style={{ gridColumn: 'span 1', maxWidth: '320px' }}>
            <Link
              href="/"
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none',
                marginBottom: '1rem',
              }}
            >
              <Logo size={28} />
              <span>
                <span style={{ color: 'var(--accent-primary)' }}>PrintPrice</span> Pro
              </span>
            </Link>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                marginBottom: '1.25rem',
              }}
            >
              {dict.footer.brandDesc}
            </p>

            {/* Invariable Core Slogan */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                marginBottom: '1.5rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(220, 0, 0, 0.08)',
                border: '1px solid var(--accent-border)',
              }}
            >
              <span style={{ color: 'var(--text-primary)' }}>PRICE IT.</span>
              <span style={{ color: 'var(--accent-primary)' }}>FIX IT.</span>
              <span style={{ color: 'var(--text-primary)' }}>PRINT IT.</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://x.com/PRINTPRICEPRO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguir en X"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                <Icon name="x" size={15} />
              </a>
              <a
                href="https://www.linkedin.com/company/print-price-pro/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conectar en LinkedIn"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                <Icon name="linkedin" size={15} />
              </a>
              <a
                href="https://www.facebook.com/printpricepro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Página de Facebook"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                <Icon name="facebook" size={15} />
              </a>
            </div>
          </div>

          {/* Para quién */}
          <div>
            <h4 style={headingStyle}>{dict.footer.forWhom}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/for-authors" style={linkStyle}>{dict.nav.authors}</Link></li>
              <li><Link href="/for-publishers" style={linkStyle}>{dict.nav.publishers}</Link></li>
              <li><Link href="/for-printhouses" style={linkStyle}>{dict.nav.printhouses}</Link></li>
              <li><Link href="/for-paper-suppliers" style={linkStyle}>{dict.nav.suppliers}</Link></li>
            </ul>
          </div>

          {/* Productos principales */}
          <div>
            <h4 style={headingStyle}>{dict.nav.products}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link href="/products/budget" style={linkStyle}>
                  Price it (Calculador)
                </Link>
              </li>
              <li>
                <Link href="/products/preflight" style={{ ...linkStyle, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Fix it (Preflight PDF)
                </Link>
              </li>
              <li>
                <Link href="/products/print" style={linkStyle}>
                  Print it (Marketplace)
                </Link>
              </li>
              <li>
                <Link href="/products/mockup" style={linkStyle}>
                  Maqueta 3D (Visor de libro)
                </Link>
              </li>
            </ul>
          </div>

          {/* Espacio Operativo & Recursos */}
          <div>
            <h4 style={headingStyle}>{dict.footer.resources}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="https://control.printprice.pro/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Control Plane (Imprentas) ↗
                </a>
              </li>
              <li>
                <a href="https://docs.printprice.pro/docs/platform/paper-supplier-hub" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {dict.nav.paperHub} ↗
                </a>
              </li>
              <li>
                <a href="https://docs.printprice.pro/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {dict.nav.docs} ↗
                </a>
              </li>
              <li>
                <Link href="/developers" style={linkStyle}>
                  {dict.nav.developers}
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa & Legal */}
          <div>
            <h4 style={headingStyle}>{dict.footer.companyLegal}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/contact" style={linkStyle}>{dict.nav.contact}</Link></li>
              <li><Link href="/legal/terms-of-service" style={linkStyle}>Terms of Service</Link></li>
              <li><Link href="/legal/privacy-policy" style={linkStyle}>Privacy Policy</Link></li>
              <li><Link href="/legal/legal-notice" style={linkStyle}>Legal Notice</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('ppp_reopen_consent'))}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  {dict.footer.cookies}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            <div>{dict.footer.rights}</div>
            <div style={{ fontSize: '0.725rem', marginTop: '0.2rem', opacity: 0.8 }}>
              Bruņinieku iela 60-8, Rīga, LV-1009, Latvia · Reg. No: 40203631570 · VAT: LV40203631570
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>PRICE IT. FIX IT. PRINT IT.</span>
            <span>· PrintPrice OS</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

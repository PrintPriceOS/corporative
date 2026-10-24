'use client';

import React from 'react';
import { Container } from '../ui/Container';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { Icon } from '../ui/Icon';

export const Footer: React.FC = () => {
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
                marginBottom: '1rem',
              }}
            >
              Tu libro, del archivo al papel. Software operativo y conectividad técnica para autores, editoriales, talleres y proveedores.
            </p>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent-primary)',
                fontWeight: 800,
                letterSpacing: '0.05em',
                marginBottom: '1.5rem',
              }}
            >
              PRICE IT. FIX IT. PRINT IT.
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
            <h4 style={headingStyle}>Para quién</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/for-authors" style={linkStyle}>Autores y Particulares</Link></li>
              <li><Link href="/for-publishers" style={linkStyle}>Editoriales &amp; Publishers</Link></li>
              <li><Link href="/for-printhouses" style={linkStyle}>Imprentas &amp; Talleres</Link></li>
              <li><Link href="/for-paper-suppliers" style={linkStyle}>Proveedores de Papel</Link></li>
            </ul>
          </div>

          {/* Herramientas */}
          <div>
            <h4 style={headingStyle}>Herramientas</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="https://budget.printprice.pro/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Espacio de Presupuestación ↗
                </a>
              </li>
              <li><Link href="/products/preflight" style={linkStyle}>Comprobador Técnico (Preflight)</Link></li>
              <li><Link href="/products/mockup" style={linkStyle}>Visualizador 3D de Libro</Link></li>
              <li>
                <a href="https://control.printprice.pro/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Control Plane (Imprentas) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 style={headingStyle}>Recursos</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="https://docs.printprice.pro/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Documentación Técnica ↗
                </a>
              </li>
              <li>
                <a href="https://docs.printprice.pro/docs/quickstart" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Guías de Inicio ↗
                </a>
              </li>
              <li><Link href="/developers" style={linkStyle}>Desarrolladores &amp; API</Link></li>
              <li>
                <a href="https://docs.printprice.pro/docs/platform/paper-supplier-hub" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  Paper Supplier Hub ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa & Legal */}
          <div>
            <h4 style={headingStyle}>Empresa &amp; Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/contact" style={linkStyle}>Contacto &amp; Soporte</Link></li>
              <li><Link href="/legal/terms-of-service" style={linkStyle}>Términos de Servicio</Link></li>
              <li><Link href="/legal/privacy-policy" style={linkStyle}>Política de Privacidad</Link></li>
              <li><Link href="/legal/legal-notice" style={linkStyle}>Aviso Legal</Link></li>
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
                  Configuración de Cookies
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
            <div>© 2026 PrintPrice Pro — Print Price Pro SIA</div>
            <div style={{ fontSize: '0.725rem', marginTop: '0.2rem', opacity: 0.8 }}>
              Bruņinieku iela 60-8, Rīga, LV-1009, Latvia · Reg. No: 40203631570 · VAT: LV40203631570
            </div>
          </div>
          <div>
            Software e infraestructura técnica por PrintPrice OS
          </div>
        </div>
      </Container>
    </footer>
  );
};

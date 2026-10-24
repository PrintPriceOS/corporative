'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Icon } from '../ui/Icon';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Logo } from '../brand/Logo';

interface StakeholderOption {
  title: string;
  desc: string;
  badge: string;
  href: string;
  icon: string;
}

const STAKEHOLDERS: StakeholderOption[] = [
  {
    title: 'Autores y Particulares',
    desc: 'Imprime tu libro sin mínimos, valida tu PDF y calcula costes.',
    badge: 'PARTICULARES',
    href: '/for-authors',
    icon: 'book',
  },
  {
    title: 'Editoriales & Publishers',
    desc: 'Organiza catálogos, compara offset vs digital y controla costes.',
    badge: 'EDITORIAL',
    href: '/for-publishers',
    icon: 'layers',
  },
  {
    title: 'Imprentas & Talleres',
    desc: 'Configura maquinaria, calibra encuadernación y recibe archivos validados.',
    badge: 'TALLER',
    href: '/for-printhouses',
    icon: 'factory',
  },
  {
    title: 'Proveedores de Papel',
    desc: 'Publica tu catálogo maestro de sustratos y conecta tarifas con imprentas.',
    badge: 'SUMINISTROS',
    href: '/for-paper-suppliers',
    icon: 'specs',
  },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWhoOpen, setIsWhoOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const whoDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  // Close modals on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsWhoOpen(false);
      setIsResourcesOpen(false);
      setIsLoginModalOpen(false);
      setIsStartModalOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (whoDropdownRef.current && !whoDropdownRef.current.contains(e.target as Node)) {
        setIsWhoOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(e.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className="site-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1500,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}
      >
        <Container
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.875rem',
            paddingBottom: '0.875rem',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            <Logo size={32} />
            <span>
              <span style={{ color: 'var(--accent-primary)' }}>PrintPrice</span> Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
            aria-label="Navegación principal"
          >
            {/* Para quién Dropdown */}
            <div ref={whoDropdownRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setIsWhoOpen(!isWhoOpen);
                  setIsResourcesOpen(false);
                }}
                onMouseEnter={() => setIsWhoOpen(true)}
                aria-expanded={isWhoOpen}
                aria-haspopup="true"
                style={{
                  background: 'none',
                  border: 'none',
                  color: isWhoOpen ? 'var(--text-primary)' : 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.25rem',
                }}
              >
                <span>Para quién</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    transition: 'transform 0.2s ease',
                    transform: isWhoOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    opacity: 0.6,
                  }}
                >
                  ▼
                </span>
              </button>

              {isWhoOpen && (
                <div
                  onMouseLeave={() => setIsWhoOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    left: 0,
                    width: '380px',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-dropdown)',
                    padding: '0.75rem',
                    zIndex: 1600,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  {STAKEHOLDERS.map((stk) => (
                    <Link
                      key={stk.title}
                      href={stk.href}
                      onClick={() => setIsWhoOpen(false)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-input)',
                        textDecoration: 'none',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.2rem',
                        transition: 'background-color 0.15s ease',
                      }}
                      className="nav-dropdown-item"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.925rem' }}>{stk.title}</span>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.45rem',
                            borderRadius: 'var(--radius-pill)',
                            background: 'var(--accent-container)',
                            color: 'var(--accent-primary)',
                          }}
                        >
                          {stk.badge}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {stk.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#how-it-works" style={{ color: 'inherit', textDecoration: 'none' }}>
              Cómo funciona
            </Link>

            <Link href="/#comparativas" style={{ color: 'inherit', textDecoration: 'none' }}>
              Comparativas
            </Link>

            {/* Recursos Dropdown */}
            <div ref={resourcesDropdownRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setIsResourcesOpen(!isResourcesOpen);
                  setIsWhoOpen(false);
                }}
                onMouseEnter={() => setIsResourcesOpen(true)}
                aria-expanded={isResourcesOpen}
                aria-haspopup="true"
                style={{
                  background: 'none',
                  border: 'none',
                  color: isResourcesOpen ? 'var(--text-primary)' : 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.25rem',
                }}
              >
                <span>Recursos</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    transition: 'transform 0.2s ease',
                    transform: isResourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    opacity: 0.6,
                  }}
                >
                  ▼
                </span>
              </button>

              {isResourcesOpen && (
                <div
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    left: 0,
                    width: '320px',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-dropdown)',
                    padding: '0.75rem',
                    zIndex: 1600,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <a
                    href="https://docs.printprice.pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsResourcesOpen(false)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-input)',
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                    }}
                    className="nav-dropdown-item"
                  >
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Documentación Oficial ↗</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      Manuales técnicos y guías de plataforma
                    </span>
                  </a>

                  <Link
                    href="/developers"
                    onClick={() => setIsResourcesOpen(false)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-input)',
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                    }}
                    className="nav-dropdown-item"
                  >
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Desarrolladores &amp; API</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      Especificaciones OpenAPI y webhooks
                    </span>
                  </Link>

                  <a
                    href="https://docs.printprice.pro/docs/platform/paper-supplier-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsResourcesOpen(false)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-input)',
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                    }}
                    className="nav-dropdown-item"
                  >
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Paper Supplier Hub ↗</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      Catálogo maestro y federación de sustratos
                    </span>
                  </a>
                </div>
              )}
            </div>

            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
              Contacto
            </Link>
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />

            {/* Iniciar sesión Trigger */}
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-btn)',
              }}
            >
              Iniciar sesión
            </button>

            {/* Empezar Trigger */}
            <button
              type="button"
              onClick={() => setIsStartModalOpen(true)}
              className="btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
            >
              Empezar
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil de navegación"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-primary)',
            zIndex: 1400,
            padding: '5rem 1.5rem 3rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Para quién
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {STAKEHOLDERS.map((stk) => (
                <Link
                  key={stk.title}
                  href={stk.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-input)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>{stk.title}</span>
                    <span style={{ fontSize: '0.65rem', background: 'var(--accent-container)', color: 'var(--accent-primary)', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-pill)' }}>
                      {stk.badge}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{stk.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.05rem', fontWeight: 600 }}>
            <Link href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              Cómo funciona
            </Link>
            <Link href="/#comparativas" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              Comparativas
            </Link>
            <a href="https://docs.printprice.pro/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              Documentación ↗
            </a>
            <Link href="/developers" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              Desarrolladores &amp; API
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              Contacto
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '0.875rem' }}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsStartModalOpen(true);
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem' }}
            >
              Empezar
            </button>
          </div>
        </div>
      )}

      {/* Accessible Iniciar Sesión Modal */}
      {isLoginModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 id="login-modal-title" style={{ fontSize: '1.35rem', margin: 0 }}>
                Elige tu espacio de acceso
              </h3>
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                aria-label="Cerrar modal"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              PrintPrice Pro cuenta con dos accesos especializados según tu función en la cadena de impresión:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="https://budget.printprice.pro/"
                className="rounded-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--accent-container)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  €
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>
                    Espacio de Presupuestación (Budget)
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    Para autores, editoriales y clientes que calculan presupuestos y gestionan libros.
                  </div>
                </div>
              </a>

              <a
                href="https://control.printprice.pro/"
                className="rounded-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--accent-container)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  ⚙️
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>
                    Control Plane
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    Para directores de taller gráfico, operarios de imprenta y proveedores de papel.
                  </div>
                </div>
              </a>
            </div>

            <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ¿Primera vez en PrintPrice? Selecciona arriba tu espacio o consulta las guías de inicio.
            </div>
          </div>
        </div>
      )}

      {/* Accessible Empezar Modal */}
      {isStartModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="start-modal-title"
          onClick={() => setIsStartModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '560px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 id="start-modal-title" style={{ fontSize: '1.35rem', margin: 0 }}>
                ¿Cómo deseas empezar?
              </h3>
              <button
                type="button"
                onClick={() => setIsStartModalOpen(false)}
                aria-label="Cerrar modal"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Selecciona el recorrido que mejor se adapte a tu necesidad técnica:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <Link
                href="/for-authors"
                onClick={() => setIsStartModalOpen(false)}
                className="rounded-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Autor o Particular</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Imprime tu libro personal sin CIF ni volumen mínimo
                  </div>
                </div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>➔</span>
              </Link>

              <Link
                href="/for-publishers"
                onClick={() => setIsStartModalOpen(false)}
                className="rounded-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sello Editorial</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Presupuesta tiradas escalonadas y gestiona catálogos
                  </div>
                </div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>➔</span>
              </Link>

              <a
                href="https://control.printprice.pro/printhouse/register"
                className="rounded-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Taller Gráfico o Imprenta</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Configura tu parque de maquinaria y recibe artes finales preflight
                  </div>
                </div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>↗</span>
              </a>

              <a
                href="https://control.printprice.pro/supplier/register"
                className="rounded-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Proveedor de Papel</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Publica catálogo maestro y conecta tus ofertas comerciales
                  </div>
                </div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

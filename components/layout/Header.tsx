'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Icon } from '../ui/Icon';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';
import { Logo } from '../brand/Logo';
import { useLocale } from '@/lib/i18n';

export const Header: React.FC = () => {
  const { dict, locale } = useLocale();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWhoOpen, setIsWhoOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const whoDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  const STAKEHOLDERS = [
    {
      title: dict.nav.authors,
      desc: dict.nav.authorsDesc,
      badge: '01',
      href: '/for-authors',
    },
    {
      title: dict.nav.publishers,
      desc: dict.nav.publishersDesc,
      badge: '02',
      href: '/for-publishers',
    },
    {
      title: dict.nav.printhouses,
      desc: dict.nav.printhousesDesc,
      badge: '03',
      href: '/for-printhouses',
    },
    {
      title: dict.nav.suppliers,
      desc: dict.nav.suppliersDesc,
      badge: '04',
      href: '/for-paper-suppliers',
    },
  ];

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

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isLoginModalOpen || isStartModalOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isMobileMenuOpen, isLoginModalOpen, isStartModalOpen]);

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
              fontSize: 'clamp(1rem, 3.8vw, 1.25rem)',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.4rem, 1.5vw, 0.65rem)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <Logo size={28} />
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
              gap: 'clamp(0.5rem, 1vw, 1.35rem)',
              fontSize: '0.875rem',
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
                <span>{dict.nav.forWhom}</span>
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
              {dict.nav.howItWorks}
            </Link>

            <Link href="/#comparativas" style={{ color: 'inherit', textDecoration: 'none' }}>
              {dict.nav.comparisons}
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
                <span>{dict.nav.resources}</span>
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
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{dict.nav.docs} ↗</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      {dict.nav.docsDesc}
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
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{dict.nav.developers}</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      {dict.nav.developersDesc}
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
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{dict.nav.paperHub} ↗</span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      {dict.nav.paperHubDesc}
                    </span>
                  </a>
                </div>
              )}
            </div>

            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Action CTAs, Language Selector & Theme Toggle */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 0.8vw, 0.75rem)', flexShrink: 0 }}>
            <LanguageSelector />
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
                fontSize: '0.875rem',
                cursor: 'pointer',
                padding: '0.45rem clamp(0.5rem, 0.8vw, 0.75rem)',
                borderRadius: 'var(--radius-btn)',
                whiteSpace: 'nowrap',
              }}
            >
              {dict.nav.login}
            </button>

            {/* Empezar Trigger */}
            <button
              type="button"
              onClick={() => setIsStartModalOpen(true)}
              className="btn-primary"
              style={{ padding: '0.5rem clamp(0.75rem, 1vw, 1.25rem)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
            >
              {dict.nav.start}
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.25rem, 1.5vw, 0.5rem)', flexShrink: 0 }}>
            <div className="header-lang-wrapper">
              <LanguageSelector />
            </div>
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
                padding: '0.35rem',
                minWidth: '40px',
                minHeight: '40px',
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
            zIndex: 1800,
            padding: 'clamp(4.5rem, 12vh, 6rem) clamp(1rem, 4vw, 2rem) 3rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Mobile Drawer Language & Theme Switcher Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {locale === 'es' ? 'Idioma' : locale === 'de' ? 'Sprache' : 'Language'}
            </span>
            <LanguageSelector />
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              {dict.nav.forWhom}
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
              {dict.nav.howItWorks}
            </Link>
            <Link href="/#comparativas" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              {dict.nav.comparisons}
            </Link>
            <a href="https://docs.printprice.pro/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              {dict.nav.docs} ↗
            </a>
            <Link href="/developers" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              {dict.nav.developers}
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
              {dict.nav.contact}
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
              {dict.nav.login}
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
              {dict.nav.start}
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
                {dict.modals.loginTitle}
              </h3>
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                aria-label={dict.modals.close}
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
              {dict.modals.loginSub}
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
                    {dict.modals.loginBudgetTitle}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    {dict.modals.loginBudgetDesc}
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
                    {dict.modals.loginControlTitle}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    {dict.modals.loginControlDesc}
                  </div>
                </div>
              </a>
            </div>

            <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {dict.modals.loginNote}
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
                {dict.modals.startTitle}
              </h3>
              <button
                type="button"
                onClick={() => setIsStartModalOpen(false)}
                aria-label={dict.modals.close}
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
              {dict.modals.startSub}
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
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dict.modals.startAuthorTitle}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {dict.modals.startAuthorDesc}
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
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dict.modals.startPublisherTitle}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {dict.modals.startPublisherDesc}
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
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dict.modals.startPrinterTitle}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {dict.modals.startPrinterDesc}
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
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dict.modals.startSupplierTitle}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {dict.modals.startSupplierDesc}
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

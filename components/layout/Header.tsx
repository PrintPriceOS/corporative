'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Logo } from '../brand/Logo';

const PRODUCT_ITEMS = [
  { name: "Pricing Engine", desc: "Exact print cost calculation", icon: "calculator" as const, badge: "CORE", href: "/products/budget" },
  { name: "File Validation", desc: "Validate production files", icon: "shield" as const, badge: "CORE", href: "/products/preflight" },
  { name: "Control Plane", desc: "Manage jobs and infrastructure", icon: "activity" as const, badge: "LIVE", href: "/products/control" },
  { name: "Developers", desc: "Integrate the system", icon: "code" as const, badge: "DEV", href: "/developers" },
  { name: "Documentation", desc: "Complete system architecture & specs", icon: "specs" as const, badge: "DOCS", href: "/docs/platform/overview" },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { name: "Platform", href: "/platform" },
    { name: "Products", href: "/products", isMega: true },
    { name: "Solutions", href: "/solutions" },
    { name: "Developers", href: "/developers" },
    { name: "Are you a Printhouse?", href: "/contact/partner" },
  ];

  const handleMouseEnter = () => {
     if (timeoutRef.current) clearTimeout(timeoutRef.current);
     setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 150);
  };

  return (
    <header className="site-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1500,
      background: 'var(--bg-secondary)', 
      padding: '1.25rem 0',
      borderBottom: '1px solid var(--border-color)',
      transition: 'all 0.2s ease',
      ...({} as any)
    }}>
      <Container className="header-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        ...({} as any)
      }}>
        <Link href="/" className="logo" style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-display)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 101,
          color: 'var(--text-primary)',
          ...({} as any)
        }}>
          <Logo size={36} />
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-primary)' }}>PrintPrice</span>&nbsp;Pro
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="main-nav desktop-only" style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-display)',
          ...({} as any)
        }}>
          {navLinks.map(link => (
            <div 
              key={link.name} 
              onMouseEnter={link.isMega ? handleMouseEnter : undefined}
              onMouseLeave={link.isMega ? handleMouseLeave : undefined}
              style={{ position: 'relative' }}
            >
                {link.isMega ? (
                    <Link href={link.href} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="nav-link nav-link-technical">
                        {link.name}
                        <div style={{ transform: isProductsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', opacity: 0.4 }}>
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5"/></svg>
                        </div>
                    </Link>
                ) : (
                    <Link href={link.href} className="nav-link nav-link-technical">{link.name}</Link>
                )}

                {link.isMega && isProductsOpen && (
                    <div 
                        className="mega-menu"
                        style={{
                            position: 'fixed', // Fixed to page top
                            top: '4.5rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'min(1200px, 95vw)',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                            display: 'grid',
                            gridTemplateColumns: '1fr 280px',
                            zIndex: 1600,
                            padding: '1.5rem',
                            ...({} as any)
                        }}
                    >
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap: '1px',
                            background: 'var(--border-color)', // Border color for grid
                            border: '1px solid var(--border-color)',
                            ...({} as any)
                        }}>
                            {PRODUCT_ITEMS.map(item => (
                                <Link 
                                    key={item.name} 
                                    href={item.href}
                                    style={{
                                        background: 'var(--bg-primary)',
                                        padding: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.25rem',
                                        transition: 'background 0.2s ease',
                                        ...({} as any)
                                    }}
                                    className="mega-item"
                                    onClick={() => setIsProductsOpen(false)}
                                >
                                    <div className="mega-item-icon-box" style={{ 
                                        height: '2.5rem', width: '2.5rem', 
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-color)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--accent-primary)',
                                        transition: 'all 0.2s ease',
                                        ...({} as any) 
                                    }}>
                                        <Icon name={item.icon} size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                            <span className="mega-item-title" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, transition: 'color 0.2s ease' }}>{item.name}</span>
                                            {item.badge && (
                                                <span style={{ 
                                                    fontSize: '0.6rem', padding: '0.1rem 0.4rem', border: '1px solid var(--border-color)', 
                                                    color: 'var(--text-secondary)', borderRadius: '2px', letterSpacing: '0.05em' 
                                                }}>{item.badge}</span>
                                            )}
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'none', letterSpacing: '0' }}>{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        <div style={{ 
                            padding: '2rem 1.5rem', 
                            background: 'var(--bg-secondary)', 
                            borderLeft: '1px solid var(--border-color)',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            ...({} as any) 
                        }}>
                             <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 800 }}>
                                PRICE IT. FIX IT. PRINT IT.
                             </div>
                             <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'none', lineHeight: 1.5, ...({} as any) }}>
                                From estimate to production. The operating system for modern print nodes.
                             </p>
                             <div style={{ marginTop: '2rem' }}>
                                <Link href="/solutions" className="nav-link-technical" style={{ fontSize: '0.65rem', borderBottom: '1px solid var(--accent-primary)', paddingBottom: '2px' }}>
                                    VIEW SOLUTIONS →
                                </Link>
                             </div>
                        </div>
                    </div>
                )}
            </div>
          ))}
        </nav>
        
        <div className="cta-group desktop-only" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', ...({} as any) }}>
          <ThemeToggle />
          <Link href="/contact" className="nav-link-technical" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            Consult
          </Link>
          <Link href="https://control.printprice.pro">
            <Button size="sm">Get Managed</Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-only">
            <ThemeToggle />
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    zIndex: 200,
                    ...({} as any)
                }}
            >
                <Icon name={isMenuOpen ? 'close' : 'menu'} size={24} />
            </button>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-primary)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            padding: '8rem 2rem 4rem',
            overflowY: 'auto',
            ...({} as any)
          }}>
            <style>{`
              .mobile-nav-link {
                font-size: 2.2rem;
                font-family: var(--font-display);
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: -0.04em;
                margin-bottom: 2.5rem;
                display: block;
                color: var(--text-primary);
                transition: color 0.2s;
              }
              .mobile-nav-link:active .technical-text,
              .mobile-nav-link:hover .technical-text {
                color: var(--accent-primary) !important;
                opacity: 1 !important;
                text-shadow: 0 0 10px rgba(220, 0, 0, 0.4);
              }
              .mobile-sub-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.5rem 0;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                transition: all 0.2s;
              }
              .mobile-sub-item:active {
                padding-left: 0.5rem;
                background: rgba(220, 0, 0, 0.03);
              }
            `}</style>
            <div style={{ flex: 1 }}>
              {navLinks.map((link, i) => (
                <div key={link.name}>
                  {link.isMega ? (
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div 
                            className="mobile-nav-link" 
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}
                            onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <span className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', opacity: 0.5 }}>0{i+1}.</span>
                                {link.name}
                            </span>
                            <div style={{ transform: isMobileProductsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', opacity: 0.3 }}>
                                <Icon name="menu" size={20} />
                            </div>
                        </div>
                        {isMobileProductsOpen && (
                            <div style={{ paddingLeft: '2.5rem', marginBottom: '1rem' }}>
                                {PRODUCT_ITEMS.map(item => (
                                    <Link 
                                        key={item.name} 
                                        href={item.href} 
                                        className="mobile-sub-item"
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                    >
                                        <div style={{ color: 'var(--text-primary)' }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-primary)' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{item.desc}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <span className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', opacity: 0.5 }}>0{i+1}.</span>
                            {link.name}
                        </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="technical-text" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', letterSpacing: '0.2rem', fontWeight: 900, marginBottom: '-1rem' }}>SYSTEM_ACTIONS</div>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button size="lg" style={{ width: '100%' }}>Consult an Architect</Button>
                </Link>
                <Link href="https://control.printprice.pro" style={{ textAlign: 'center' }}>
                    <span className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>GET MANAGED ACCESS / REGISTRY V2.4</span>
                </Link>
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 1024px) {
            .desktop-only { display: none !important; }
            .mobile-only { display: flex !important; align-items: center; }
          }
          @media (min-width: 1025px) {
            .mobile-only { display: none !important; }
          }
          .mega-item:hover {
            background: var(--bg-secondary) !important;
          }
          .mega-item:hover .mega-item-title {
            color: var(--accent-primary) !important;
          }
          .mega-item:hover .mega-item-icon-box {
            background: var(--accent-primary) !important;
            border-color: var(--accent-primary) !important;
            color: white !important;
            box-shadow: 0 0 15px rgba(220, 0, 0, 0.4);
          }
        `}</style>
      </Container>
    </header>
  );
};

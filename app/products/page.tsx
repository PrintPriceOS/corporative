'use client';

import React from 'react';
import Link from 'next/link';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { useLocale } from '@/lib/i18n';

export default function ProductsHubPage() {
  const { locale } = useLocale();

  const products = [
    {
      code: '01 / PRICE IT',
      name: locale === 'es' ? 'Calculador de Precios' : locale === 'de' ? 'Preiskalkulator' : 'Price Calculator',
      slogan: 'PRICE IT.',
      badge: locale === 'es' ? 'CALCULACIÓN DETERMINISTA' : locale === 'de' ? 'DETERMINISTISCHE KALKULATION' : 'DETERMINISTIC PRICING',
      description: locale === 'es'
        ? 'Calcula costes reales de imprenta al instante para libros, catálogos y packaging. Conoce el punto de cruce exacto entre digital y offset sin intermediarios.'
        : locale === 'de'
        ? 'Berechnen Sie sofort reale Druckkosten für Bücher und Kataloge. Finden Sie den exakten Break-Even zwischen Digital- und Offsetdruck.'
        : 'Calculate exact printing costs instantly for books and catalogs. Discover the exact crossover point between digital and offset press runs.',
      href: 'https://budget.printprice.pro/',
      internalHref: '/products/budget',
      cta: locale === 'es' ? 'Calcular precio ➔' : locale === 'de' ? 'Preis kalkulieren ➔' : 'Calculate price ➔',
      icon: '💶',
      primary: true
    },
    {
      code: '02 / FIX IT',
      name: 'PrintPrice Preflight',
      slogan: 'FIX IT.',
      badge: locale === 'es' ? 'ANÁLISIS FORENSE' : locale === 'de' ? 'FORENSISCHE PRÜFUNG' : 'FORENSIC AUDIT',
      description: locale === 'es'
        ? 'Comprueba sangrados, cajas de página, resolución de imágenes, tipografías y espacios de color en tu PDF. Diagnósticos claros y correcciones técnicas sin trampas.'
        : locale === 'de'
        ? 'Prüfen Sie Beschnitt, Seitenboxen, Bildauflösung, Schriften und Farbräume in Ihrem PDF mit verständlichen Handlungsempfehlungen.'
        : 'Audit bleeds, page boxes, image DPI, typography, and color profiles in your PDF. Clear actionable diagnostics and safe technical remediation.',
      href: 'https://preflight.printprice.pro/',
      internalHref: '/products/preflight',
      cta: locale === 'es' ? 'Comprobar PDF ➔' : locale === 'de' ? 'PDF prüfen ➔' : 'Check PDF ➔',
      icon: '✓',
      primary: true
    },
    {
      code: '03 / PRINT IT',
      name: locale === 'es' ? 'Marketplace de Impresión' : locale === 'de' ? 'Druckauftrags-Marketplace' : 'Print Marketplace',
      slogan: 'PRINT IT.',
      badge: locale === 'es' ? 'MATCHMAKER INDUSTRIAL' : locale === 'de' ? 'INDUSTRIELLES MATCHING' : 'INDUSTRIAL MATCHING',
      description: locale === 'es'
        ? 'Encuentra la imprenta industrial homologada para tu proyecto. Enrutamiento algorítmico según maquinaria real, pliegos y especificaciones acordadas en el pedido.'
        : locale === 'de'
        ? 'Finden Sie den optimalen Druckbetrieb für Ihr Projekt. Algorithmische Zuweisung nach realen Maschinenprofilen, Bogenformaten und den im Auftrag vereinbarten Spezifikationen.'
        : 'Find the optimal vetted printing plant for your job. Algorithmic routing based on real press machinery, sheet sizes, and agreed order specifications.',
      href: '/products/print',
      internalHref: '/products/print',
      cta: locale === 'es' ? 'Explorar Marketplace ➔' : locale === 'de' ? 'Marketplace erkunden ➔' : 'Explore Marketplace ➔',
      icon: '🏭',
      primary: true
    }
  ];

  const supportingTools = [
    {
      name: 'Mockup 3D Engine',
      role: locale === 'es' ? 'Herramienta complementaria de visualización' : locale === 'de' ? 'Komplementäres Visualisierungstool' : 'Complementary visualization tool',
      desc: locale === 'es'
        ? 'Simulación 3D fidedigna en navegador para verificar lomos, márgenes interiores y caída de páginas antes de encargar la tirada.'
        : locale === 'de'
        ? 'Interaktive 3D-Browsersimulation zur Prüfung von Buchrücken, Bundsteg und Seitenaufschlag vor Auftragserteilung.'
        : 'Realistic browser 3D book simulation to preview spines, inner gutters, and page flow before commissioning the run.',
      href: '/products/mockup',
      icon: '📖'
    },
    {
      name: 'Control Plane',
      role: locale === 'es' ? 'Espacio operativo para imprentas y papeleras' : locale === 'de' ? 'Arbeitsumgebung für Druckereien & Papierlieferanten' : 'Operational space for printhouses & paper mills',
      desc: locale === 'es'
        ? 'Panel técnico y operativo donde los talleres modelan sus máquinas y reciben órdenes de trabajo verificadas. No es la entrada para compradores.'
        : locale === 'de'
        ? 'Technisches Dashboard für Druckereien zur Maschinenmodellierung und Auftragsannahme. Kein Portal für Endkunden.'
        : 'Technical operational dashboard where printing plants configure machines and pull verified job tickets. Not a buyer portal.',
      href: 'https://control.printprice.pro/',
      icon: '⚙️'
    },
    {
      name: 'Paper Supplier Hub',
      role: locale === 'es' ? 'Federación de catálogo y aprovisionamiento' : locale === 'de' ? 'Papierkatalog-Föderation & Beschaffung' : 'Master catalog federation & paper procurement',
      desc: locale === 'es'
        ? 'Capacidad del ecosistema para que fabricantes y distribuidores publiquen tarifas de resmas y bobinas conectadas al cálculo del taller.'
        : locale === 'de'
        ? 'Schnittstelle für Papierhersteller und -händler zur Einspeisung von Bogen- und Rollenpreisen direkt in die Kalkulation.'
        : 'Ecosystem substrate module enabling paper mills and distributors to publish real-time stock and prices into press cost models.',
      href: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub',
      icon: '📜'
    }
  ];

  return (
    <div className="products-hub-page">
      {/* Hero */}
      <HeroPlatform
        label="PRINTPRICE PRO / ARQUITECTURA DE PRODUCTO"
        title="PRICE IT. FIX IT. PRINT IT."
        slogan={['PRICE IT.', 'FIX IT.', 'PRINT IT.']}
        isHeadlineSlogan={true}
        subheadline={
          locale === 'es'
            ? 'Los tres pilares para hacer realidad tu producción gráfica: calcula el coste real, prepara tu archivo con rigor forense y encarga la fabricación a talleres homologados.'
            : locale === 'de'
            ? 'Die drei Säulen für Ihre Druckproduktion: Exakte Kostenkalkulation, forensische Druckdatenprüfung und Fertigung bei zertifizierten Partnerbetrieben.'
            : 'The three pillars of print manufacturing: calculate true costs, forensically prepare print files, and commission production with vetted plants.'
        }
        variant="particles"
      />

      {/* 3 Core Products */}
      <Section variant="secondary">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '1rem' }}>
              PRODUCTOS PRINCIPALES
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              Qué puedes hacer con PrintPrice Pro
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Tres herramientas concebidas para transformar el archivo digital en un libro físico perfecto.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: '2rem'
            }}
          >
            {products.map((p, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-primary)',
                  padding: '2.5rem 2rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-dropdown)',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{p.icon}</span>
                    <span
                      className="technical-text"
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--accent-container)',
                        color: 'var(--accent-primary)'
                      }}
                    >
                      {p.slogan}
                    </span>
                  </div>

                  <span className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    {p.code}
                  </span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '1rem' }}>
                    {p.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {p.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={p.href}
                    className="btn-primary"
                    style={{ flex: '1 1 auto', textAlign: 'center', padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
                  >
                    {p.cta}
                  </a>
                  {p.internalHref !== p.href && (
                    <Link
                      href={p.internalHref}
                      className="btn-secondary"
                      style={{ padding: '0.75rem 1rem', fontSize: '0.9rem' }}
                    >
                      Detalles
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Supporting Ecosystem Tools */}
      <Section variant="primary">
        <Container>
          <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
            <span className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.15em', fontWeight: 800 }}>
              HERRAMIENTAS COMPLEMENTARIAS
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              Capacidades integradas del ecosistema
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Visualización 3D y espacios operativos que complementan los tres productos principales.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              gap: '1.5rem'
            }}
          >
            {supportingTools.map((tool, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{tool.icon}</span>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{tool.name}</h4>
                      <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)' }}>
                        {tool.role}
                      </span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {tool.desc}
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  {tool.href.startsWith('http') ? (
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'inline-block' }}
                    >
                      Acceder ↗
                    </a>
                  ) : (
                    <Link
                      href={tool.href}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'inline-block' }}
                    >
                      Ver herramienta
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

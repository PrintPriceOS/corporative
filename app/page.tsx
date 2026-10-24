'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { useLocale } from '@/lib/i18n';

export default function Home() {
  const { dict, locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'authors' | 'printers'>('authors');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const STAKEHOLDER_CARDS = [
    {
      id: 'authors',
      title: dict.home.authorsTitle,
      tagline: dict.home.authorsTagline,
      description: dict.home.authorsDesc,
      badge: dict.home.authorsBadge,
      href: '/for-authors',
      ctaText: dict.home.authorsCta,
      icon: '📖',
    },
    {
      id: 'publishers',
      title: dict.home.publishersTitle,
      tagline: dict.home.publishersTagline,
      description: dict.home.publishersDesc,
      badge: dict.home.publishersBadge,
      href: '/for-publishers',
      ctaText: dict.home.publishersCta,
      icon: '📚',
    },
    {
      id: 'printhouses',
      title: dict.home.printhousesTitle,
      tagline: dict.home.printhousesTagline,
      description: dict.home.printhousesDesc,
      badge: dict.home.printhousesBadge,
      href: '/for-printhouses',
      ctaText: dict.home.printhousesCta,
      icon: '⚙️',
    },
    {
      id: 'suppliers',
      title: dict.home.suppliersTitle,
      tagline: dict.home.suppliersTagline,
      description: dict.home.suppliersDesc,
      badge: dict.home.suppliersBadge,
      href: '/for-paper-suppliers',
      ctaText: dict.home.suppliersCta,
      icon: '📄',
    },
  ];

  const COMPARISON_AUTHORS = [
    {
      feature: locale === 'es' ? 'Cálculo de presupuesto inmediato sin registro' : locale === 'de' ? 'Sofortige Kalkulation ohne Registrierungspflicht' : 'Instant budget estimate without compulsory signup',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      lulu: locale === 'es' ? 'Mediante módulo / registro' : locale === 'de' ? 'Über Modul / Registrierung' : 'Via module / registration',
      gelato: locale === 'es' ? 'Mediante integración B2B' : locale === 'de' ? 'Über B2B-Integration' : 'Via B2B integration',
      notes: locale === 'es' ? 'Budget calcula sin crear cuenta previa ni solicitar cotización manual.' : locale === 'de' ? 'Budget kalkuliert sofort ohne Vorab-Konto.' : 'Budget estimates immediately without prior account creation.',
    },
    {
      feature: locale === 'es' ? 'Comprobación técnica de PDF (Preflight de libros)' : locale === 'de' ? 'Technische PDF-Prüfung (Buch-Preflight)' : 'Technical PDF preflight check for books',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      lulu: locale === 'es' ? 'Disponible (básico)' : locale === 'de' ? 'Verfügbar (Basis)' : 'Available (basic)',
      gelato: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Verifica sangres de 3 mm, espacios de color CMYK, resolución a 300 DPI y TAC.' : locale === 'de' ? 'Prüft 3 mm Beschnitt, CMYK-Farbräume, 300 DPI und TAC.' : 'Verifies 3 mm bleeds, CMYK color spaces, 300 DPI and TAC.',
    },
    {
      feature: locale === 'es' ? 'Visualización 3D interactiva de lomo y cubiertas' : locale === 'de' ? 'Interaktive 3D-Vorschau von Rücken und Umschlag' : 'Interactive 3D preview of spine and covers',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      lulu: locale === 'es' ? 'No confirmado' : locale === 'de' ? 'Nicht bestätigt' : 'Not confirmed',
      gelato: locale === 'es' ? 'No confirmado' : locale === 'de' ? 'Nicht bestätigt' : 'Not confirmed',
      notes: locale === 'es' ? 'Simulación orientativa en navegador basada en gramaje y número de páginas.' : locale === 'de' ? 'Orientierende Browser-Simulation nach Papiergrammatur.' : 'Guidance browser simulation calculated from basis weight and pages.',
    },
    {
      feature: locale === 'es' ? 'Elección de taller o conexión con imprenta propia' : locale === 'de' ? 'Wahl des Betriebs oder eigene Druckerei anbinden' : 'Choice of print plant or connect own printhouse',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      lulu: locale === 'es' ? 'Red cerrada de Lulu' : locale === 'de' ? 'Geschlossenes Lulu-Netzwerk' : 'Lulu closed network',
      gelato: locale === 'es' ? 'Red cerrada de Gelato' : locale === 'de' ? 'Geschlossenes Gelato-Netzwerk' : 'Gelato closed network',
      notes: locale === 'es' ? 'Permite seleccionar de la red o conectar las máquinas de tu taller homologado.' : locale === 'de' ? 'Erlaubt Netzwerk-Auswahl oder Anbindung eigener Maschinen.' : 'Allows selecting from network or binding own plant machines.',
    },
    {
      feature: locale === 'es' ? 'Distribución en librerías globales (Amazon / Ingrams)' : locale === 'de' ? 'Globaler Buchhandelsvertrieb (Amazon / Ingrams)' : 'Global retail distribution (Amazon / Ingrams)',
      printprice: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      lulu: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      gelato: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Lulu y Gelato disponen de red de distribución y venta minorista bajo demanda.' : locale === 'de' ? 'Lulu und Gelato bieten eigene Buchhandels-Vertriebskanäle.' : 'Lulu and Gelato provide direct retail print-on-demand networks.',
    },
  ];

  const COMPARISON_PRINTERS = [
    {
      feature: locale === 'es' ? 'Modelado de máquinas (pliegos, makeready, mermas)' : locale === 'de' ? 'Maschinenmodellierung (Bogen, Rüstzeit, Makulatur)' : 'Machine profiling (sheets, makeready, waste)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      printiq: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      printvis: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      tharstern: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Configuración de costes horarios, tamaños de pliego, pinzas y velocidades.' : locale === 'de' ? 'Stundensätze, Bogenformate, Greiferränder und Laufgeschwindigkeiten.' : 'Hourly rates, sheet formats, gripper margins and run speeds.',
    },
    {
      feature: locale === 'es' ? 'Catálogo federado de papel (sustratos técnicos)' : locale === 'de' ? 'Föderierter Substratkatalog (Papiere)' : 'Federated paper catalog (technical substrates)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      printiq: locale === 'es' ? 'Disponible (módulo compras)' : locale === 'de' ? 'Verfügbar (Einkaufsmodul)' : 'Available (procurement)',
      printvis: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      tharstern: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      notes: locale === 'es' ? 'Paper Supplier Hub separa estrictamente el coste de fabricación y el porte.' : locale === 'de' ? 'Paper Supplier Hub trennt strikt Materialpreis und Frachtkosten.' : 'Paper Supplier Hub strictly decouples material from freight.',
    },
    {
      feature: locale === 'es' ? 'Trazabilidad de evidencia inmutable (evidenceId)' : locale === 'de' ? 'Unveränderliche Evidenz-Rückverfolgbarkeit' : 'Immutable evidence audit trace (evidenceId)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      printiq: locale === 'es' ? 'Mediante auditoría' : locale === 'de' ? 'Über Audit-Protokoll' : 'Via audit log',
      printvis: locale === 'es' ? 'Mediante registro ERP' : locale === 'de' ? 'Über ERP-Buchungsjournal' : 'Via ERP journal',
      tharstern: locale === 'es' ? 'Mediante histórico' : locale === 'de' ? 'Über Auftragshistorie' : 'Via job history',
      notes: locale === 'es' ? 'Hash e identificador único que vincula presupuesto y archivo validado.' : locale === 'de' ? 'Eindeutiger kryptografischer Hash verbindet Budget und geprüfte Datei.' : 'Cryptographic hash binding quote to validated artwork file.',
    },
    {
      feature: locale === 'es' ? 'ERP/MIS contable y laboral integral' : locale === 'de' ? 'Vollständiges Buchhaltungs- und Lohn-ERP' : 'Full accounting and payroll MIS/ERP',
      printprice: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      printiq: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      printvis: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      tharstern: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'PrintPrice OS se integra como motor de cotización e inteligencia técnica.' : locale === 'de' ? 'PrintPrice OS fungiert als fokussierter Kalkulations- und Preflight-Motor.' : 'PrintPrice OS integrates as the specialized pricing and preflight engine.',
    },
  ];

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* 
        HERO SECTION WITH FLOATING RED DOT PARTICLES (User Signature Banner)
      */}
      <HeroPlatform
        variant="particles"
        label={dict.home.heroLabel}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={true}
        subheadline={
          <>
            <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.5rem' }}>
              {dict.home.heroTitle}
            </span>
            <span>{dict.home.heroSubtitle}</span>
          </>
        }
        primaryAction={{
          label: dict.home.heroCtaPrimary,
          href: "https://budget.printprice.pro/",
          sublabel: `${dict.home.heroCheck1} · ${dict.home.heroCheck2} · ${dict.home.heroCheck3}`,
        }}
        secondaryAction={{
          label: dict.home.heroCtaSecondary,
          href: "#how-it-works",
        }}
        rightContent={
          <div
            className="rounded-card"
            style={{
              background: 'rgba(24, 24, 27, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              maxWidth: '460px',
              marginLeft: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
                TECHNICAL BOOK PROFILE
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                PREFLIGHT READY
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Format:</span>
                <span style={{ fontWeight: 600 }}>150 × 210 mm (A5 Custom)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Extent:</span>
                <span style={{ fontWeight: 600 }}>240 pages (B&amp;W 1+1)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Substrate:</span>
                <span style={{ fontWeight: 600 }}>80 gsm Munken Pure Cream</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Binding:</span>
                <span style={{ fontWeight: 600 }}>Thread Sewn Softcover + Flaps</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Calculated Spine:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>14.8 mm ±0.2mm</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>evidenceId: sha256:7f8e...4b</span>
              <a href="https://budget.printprice.pro/" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                {dict.nav.start} ➔
              </a>
            </div>
          </div>
        }
      />

      {/* 4 Stakeholder Cards Section */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              PRICE IT. FIX IT. PRINT IT.
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.home.stakeholdersHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.home.stakeholdersSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {STAKEHOLDER_CARDS.map((card) => (
              <div
                key={card.id}
                className="rounded-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '2rem' }}>{card.icon}</span>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--accent-container)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {card.tagline}
                  </p>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {card.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={card.href}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    {card.ctaText} ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Cómo funciona / How it works */}
      <section
        id="how-it-works"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="pill-badge">
                PRICE IT. FIX IT. PRINT IT.
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.home.howHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.home.howSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                01
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRICE IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.home.step1Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.home.step1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                02
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                CALCULATE
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.home.step2Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.home.step2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                03
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                FIX IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.home.step3Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.home.step3Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                04
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.home.step4Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.home.step4Desc}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Capacidades Técnicas Disponibles */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              PRICE IT. FIX IT. PRINT IT.
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.home.capsHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.home.capsSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>💶</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Budget (Pricing Engine)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {locale === 'es'
                  ? 'Cálculo instantáneo por servidor. Identifica con rigor el punto de cruce de costes entre tiradas cortas digitales y tiradas medias/largas en offset.'
                  : locale === 'de'
                  ? 'Sofortige Serverkalkulation. Identifiziert präzise den Schnittpunkt zwischen Digitaldruck- und Bogenoffsetauflagen.'
                  : 'Instant server calculation. Accurately identifies the cost crossover point between short digital runs and medium/long offset runs.'}
              </p>
              <a href="https://budget.printprice.pro/" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Budget Engine ↗
              </a>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🛡️</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Preflight (File Validation)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {locale === 'es'
                  ? 'Inspección automática de parámetros de impresión: sangres perimetrales de 3 mm, espacio de color CMYK, sobreimpresiones y cobertura máxima de tinta (TAC).'
                  : locale === 'de'
                  ? 'Automatische Prüfung der Druckparameter: 3 mm Beschnittzugabe, CMYK-Farbraum, Überdrucken und maximale Farbdeckung (TAC).'
                  : 'Automated inspection of print parameters: 3 mm perimeter bleeds, CMYK color space, overprints, and total area coverage (TAC).'}
              </p>
              <Link href="/products/preflight" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Preflight Engine ➔
              </Link>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>📐</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Mockup Engine 3D</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {locale === 'es'
                  ? 'Previsualización 3D en navegador con grosor de lomo calculado según el gramaje del papel y número de páginas. Permite verificar la orientación de cubiertas.'
                  : locale === 'de'
                  ? '3D-Vorschau im Browser mit Buchrückendicke, berechnet nach Papiergewicht und Seitenzahl. Kontrolliert Umschlagorientierung vor dem Druck.'
                  : '3D browser preview with spine thickness computed from paper basis weight and page count. Validates cover orientation before print.'}
              </p>
              <Link href="/products/mockup" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Mockup Engine ➔
              </Link>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🏭</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Control Plane (Printhouse Hub)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {locale === 'es'
                  ? 'Consola para directores de taller: modelado de prensas, calibración de encuadernación, gestión de órdenes de trabajo y trazabilidad inmutable mediante hash de evidencia.'
                  : locale === 'de'
                  ? 'Betriebskonsole für Druckereien: Maschinenmodellierung, Weiterverarbeitungskalibrierung und Auftragsverwaltung mit Evidenz-Hash.'
                  : 'Plant management console: press profiling, bindery calibration, job order intake, and immutable trace via evidence hash.'}
              </p>
              <a href="https://control.printprice.pro/" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Control Plane ↗
              </a>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>📦</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Paper Supplier Hub</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {locale === 'es'
                  ? 'Catálogo maestro federado para fabricantes y distribuidores de papel. Separación rigurosa de coste de fabricación vs. tarifas logísticas de transporte.'
                  : locale === 'de'
                  ? 'Föderierter Hauptkatalog für Papierhersteller und Großhändler mit strikter Trennung von Materialpreis und Frachtkosten.'
                  : 'Federated master substrate catalog for paper mills and distributors. Strict decoupling between manufacturing cost and freight.'}
              </p>
              <a href="https://docs.printprice.pro/docs/platform/paper-supplier-hub" target="_blank" rel="noopener noreferrer" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Paper Supplier Hub ↗
              </a>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🔌</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>API &amp; Developer Specs</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {locale === 'es'
                  ? 'Especificaciones OpenAPI para conectar tiendas online, sistemas editoriales y software de gestión de taller (MIS/ERP) existentes.'
                  : locale === 'de'
                  ? 'OpenAPI-Spezifikationen zur Anbindung von Webshops, Verlagssystemen und vorhandener Druckerei-MIS/ERP-Software.'
                  : 'OpenAPI specs for connecting online bookshops, publishing platforms, and existing printhouse MIS/ERP systems.'}
              </p>
              <Link href="/developers" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Developer Portal ➔
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Comparativas Objetivas */}
      <section
        id="comparativas"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              PRICE IT. FIX IT. PRINT IT.
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.home.compHeading}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {dict.home.compSubtitle}
            </p>

            {/* Selector de Pestañas */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--bg-primary)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-color)',
                marginTop: '1.5rem',
                gap: '0.25rem',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('authors')}
                style={{
                  border: 'none',
                  background: activeTab === 'authors' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'authors' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {dict.home.tabAuthors}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('printers')}
                style={{
                  border: 'none',
                  background: activeTab === 'printers' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'printers' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {dict.home.tabPrinters}
              </button>
            </div>
          </div>

          {/* Tabla Bloque A */}
          {activeTab === 'authors' && (
            <>
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th style={{ width: '32%' }}>{dict.home.compFeature}</th>
                      <th style={{ width: '18%', color: 'var(--accent-primary)' }}>PrintPrice Pro</th>
                      <th style={{ width: '18%' }}>Lulu</th>
                      <th style={{ width: '18%' }}>GelatoConnect</th>
                      <th style={{ width: '14%' }}>{dict.home.compScope}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_AUTHORS.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{row.feature}</td>
                        <td>
                          <span className="badge-available">{row.printprice}</span>
                        </td>
                        <td>
                          <span className={row.lulu.includes('Disponible') || row.lulu.includes('Available') || row.lulu.includes('Verfügbar') ? 'badge-available' : 'badge-module'}>
                            {row.lulu}
                          </span>
                        </td>
                        <td>
                          <span className={row.gelato.includes('Disponible') || row.gelato.includes('Available') || row.gelato.includes('Verfügbar') ? 'badge-available' : 'badge-integration'}>
                            {row.gelato}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-scroll-hint" role="note" aria-label="Desplazamiento horizontal disponible">
                <span>⇄ {locale === 'es' ? 'Desliza horizontalmente para ver todas las columnas' : locale === 'de' ? 'Horizontal wischen für alle Spalten' : 'Scroll horizontally to view all columns'}</span>
              </div>
            </>
          )}

          {/* Tabla Bloque B */}
          {activeTab === 'printers' && (
            <>
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th style={{ width: '28%' }}>{dict.home.compFeature}</th>
                      <th style={{ width: '16%', color: 'var(--accent-primary)' }}>PrintPrice Pro</th>
                      <th style={{ width: '15%' }}>printIQ</th>
                      <th style={{ width: '15%' }}>PrintVis</th>
                      <th style={{ width: '14%' }}>Tharstern</th>
                      <th style={{ width: '12%' }}>{dict.home.compScope}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_PRINTERS.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{row.feature}</td>
                        <td>
                          <span className={row.printprice.includes('Disponible') || row.printprice.includes('Available') || row.printprice.includes('Verfügbar') ? 'badge-available' : 'badge-integration'}>
                            {row.printprice}
                          </span>
                        </td>
                        <td>
                          <span className={row.printiq.includes('Disponible') || row.printiq.includes('Available') || row.printiq.includes('Verfügbar') ? 'badge-available' : 'badge-module'}>
                            {row.printiq}
                          </span>
                        </td>
                        <td>
                          <span className={row.printvis.includes('Disponible') || row.printvis.includes('Available') || row.printvis.includes('Verfügbar') ? 'badge-available' : 'badge-integration'}>
                            {row.printvis}
                          </span>
                        </td>
                        <td>
                          <span className={row.tharstern.includes('Disponible') || row.tharstern.includes('Available') || row.tharstern.includes('Verfügbar') ? 'badge-available' : 'badge-integration'}>
                            {row.tharstern}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-scroll-hint" role="note" aria-label="Desplazamiento horizontal disponible">
                <span>⇄ {locale === 'es' ? 'Desliza horizontalmente para ver todas las columnas' : locale === 'de' ? 'Horizontal wischen für alle Spalten' : 'Scroll horizontally to view all columns'}</span>
              </div>
            </>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {locale === 'es'
              ? '* Metodología: Datos cotejados a partir de manuales públicos de producto, páginas de producto oficiales y documentación técnica (octubre 2026).'
              : locale === 'de'
              ? '* Methodik: Öffentliche Produktdokumentationen und technische Spezifikationen (Stand: Oktober 2026).'
              : '* Methodology: Cross-checked against public product documentation and verified specs (as of October 2026).'}
          </div>
        </Container>
      </section>

      {/* FAQ Segmentada */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
                PRICE IT. FIX IT. PRINT IT.
              </span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
                {dict.home.faqHeading}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                {dict.home.faqSubtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  q: locale === 'es' ? '¿El cálculo en Budget es un presupuesto exacto o una estimación?' : locale === 'de' ? 'Ist die Budget-Kalkulation verbindlich oder eine Schätzung?' : 'Is the Budget calculation a binding quote or an estimate?',
                  a: locale === 'es' ? 'El cálculo en Budget es una estimación técnica basada en las matrices de costes calibradas por las imprentas adscritas y los precios vigentes de papel. La cotización final se confirma al subir el archivo definitivo y verificar condiciones especiales de taller.' : locale === 'de' ? 'Die Budget-Berechnung ist eine präzise technische Schätzung basierend auf den hinterlegten Maschinenkosten der Druckereien und aktuellen Papierpreisen.' : 'The Budget calculation is an accurate technical estimate based on machine cost matrices calibrated by member print plants and live paper rates.',
                },
                {
                  q: locale === 'es' ? '¿Un autor particular necesita empresa, CIF o facturación B2B?' : locale === 'de' ? 'Benötigen Autoren einen Gewerbenachweis oder USt-IdNr.?' : 'Do individual authors need a company or corporate tax ID?',
                  a: locale === 'es' ? 'No. El espacio de presupuestación está diseñado para que cualquier persona particular o autor independiente pueda configurar su libro, comprobar sus archivos y conocer los costes sin necesidad de constituir una empresa.' : locale === 'de' ? 'Nein. Privatpersonen und Selfpublisher können Bücher ohne Gewerbeanmeldung konfigurieren, prüfen und kalkulieren.' : 'No. The quoting space is designed so that any individual author can configure their book, validate files, and see costs without corporate registration.',
                },
                {
                  q: locale === 'es' ? '¿Qué revisa el sistema de Preflight en mi PDF?' : locale === 'de' ? 'Was genau prüft das Preflight-System in meinem PDF?' : 'What does the Preflight engine check in my PDF?',
                  a: locale === 'es' ? 'Preflight analiza que el documento cumpla las dimensiones de corte deseadas, incluya 3 mm de sangre por lado para evitar filos blancos, mantenga las imágenes con resolución óptima (300 DPI recomendados) y no exceda la cobertura total de tinta (TAC).' : locale === 'de' ? 'Preflight prüft 3 mm Beschnittzugabe, 300 DPI Bildauflösung, CMYK-Farbräume und maximale Farbdeckung (TAC).' : 'Preflight verifies trim dimensions, 3 mm perimeter bleeds to eliminate white borders, 300 DPI image resolution, and total area coverage (TAC).',
                },
                {
                  q: locale === 'es' ? '¿Cómo se garantiza la confidencialidad de las imprentas en Control Plane?' : locale === 'de' ? 'Wie wird die Vertraulichkeit der Druckereidaten gewährleistet?' : 'How is printhouse data confidentiality guaranteed in Control Plane?',
                  a: locale === 'es' ? 'PrintPrice OS aplica un aislamiento estricto de tenants (multi-tenant con control de acceso basado en roles RBAC). Tus costes horarios de máquina, mermas de taller, acuerdos con proveedores y márgenes son estrictamente privados.' : locale === 'de' ? 'PrintPrice OS setzt strikte Mandantentrennung (Multi-Tenant mit RBAC) um. Stundensätze, Makulaturen und Margen bleiben absolut vertraulich.' : 'PrintPrice OS enforces strict tenant isolation (multi-tenant with role-based access control RBAC). Machine rates, waste matrices, and margins remain strictly private.',
                },
                {
                  q: locale === 'es' ? '¿Puedo integrar PrintPrice con mi tienda online o sistema ERP?' : locale === 'de' ? 'Kann PrintPrice an Onlineshops oder ERP-Systeme angebunden werden?' : 'Can I integrate PrintPrice with my online shop or ERP system?',
                  a: locale === 'es' ? 'Sí. Disponemos de especificaciones OpenAPI y webhooks para recibir solicitudes de presupuesto, enviar archivos validados e integrar el motor de cálculo en tus flujos existentes.' : locale === 'de' ? 'Ja. OpenAPI-Spezifikationen und Webhooks ermöglichen die nahtlose Anbindung an bestehende Webshops und ERP-Systeme.' : 'Yes. OpenAPI specs and webhooks allow receiving quote requests, submitting preflighted files, and integrating the calculation engine into existing pipelines.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    borderColor: openFaq === index ? 'var(--accent-primary)' : 'var(--border-color)',
                  }}
                  onClick={() => toggleFaq(index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                      {faq.q}
                    </h3>
                    <span style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', fontWeight: 700, lineHeight: 1 }}>
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </div>

                  {openFaq === index && (
                    <p style={{ marginTop: '0.85rem', marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Final de Cierre con Slogan Invariable */}
      <section
        style={{
          padding: 'clamp(4.5rem, 8vw, 6.5rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <Container>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(220, 0, 0, 0.08)',
                border: '1px solid var(--accent-border)',
              }}
            >
              <span>PRICE IT.</span>
              <span style={{ color: 'var(--accent-primary)' }}>FIX IT.</span>
              <span>PRINT IT.</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginBottom: '1rem', fontWeight: 800 }}>
              {dict.home.ctaCloseHeading}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {dict.home.ctaCloseSubtitle}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
              >
                {dict.home.ctaClosePrimary}
              </a>
              <Link
                href="/contact"
                className="btn-secondary"
                style={{ padding: '0.9rem 1.75rem', fontSize: '1rem' }}
              >
                {dict.home.ctaCloseSecondary}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

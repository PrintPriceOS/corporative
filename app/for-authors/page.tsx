'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { useLocale } from '@/lib/i18n';

export default function ForAuthorsPage() {
  const { dict, locale } = useLocale();

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 
        Hero Banner with Floating Red Particles & Slogan
      */}
      <HeroPlatform
        variant="particles"
        label="PRINTPRICE FOR AUTHORS"
        title={dict.authorsPage.heroTitle}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline={dict.authorsPage.heroSubtitle}
        primaryAction={{
          label: dict.authorsPage.ctaPrimary,
          href: "https://budget.printprice.pro/",
          sublabel: dict.authorsPage.badgeNote,
        }}
        secondaryAction={{
          label: dict.authorsPage.ctaSecondary,
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
              maxWidth: '440px',
              marginLeft: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
                {locale === 'es' ? 'CASO DE EJEMPLO · DEMOSTRACIÓN' : locale === 'de' ? 'BEISPIEL · DEMONSTRATION' : 'SAMPLE CASE · DEMONSTRATION'}
              </span>
              <span style={{ fontSize: '0.65rem', background: 'var(--accent-container)', color: 'var(--accent-primary)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                {locale === 'es' ? 'SIN MÍNIMO' : locale === 'de' ? 'KEIN MINIMUM' : 'NO MINIMUM'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Format:</span>
                <span style={{ fontWeight: 600 }}>148 × 210 mm (A5)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Pages:</span>
                <span style={{ fontWeight: 600 }}>180 pages</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Paper:</span>
                <span style={{ fontWeight: 600 }}>90 gsm Book Cream</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Binding:</span>
                <span style={{ fontWeight: 600 }}>Paperback with Gloss Lamination</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Preflight Status:</span>
                <span style={{ fontWeight: 700, color: '#22c55e' }}>
                  {locale === 'es' ? '✓ Sangrado validado según perfil' : locale === 'de' ? '✓ Beschnitt nach Profil geprüft' : '✓ Bleed validated for profile'}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <a href="https://budget.printprice.pro/" className="btn-primary" style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}>
                {dict.authorsPage.ctaPrimary}
              </a>
            </div>
          </div>
        }
      />

      {/* 
        HOW IT WORKS SECTION FOR AUTHORS
      */}
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
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="pill-badge">
                PRICE IT. FIX IT. PRINT IT.
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.authorsPage.howHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.authorsPage.howSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.authorsPage.step1Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.authorsPage.step1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                02
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                CONFIG
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.authorsPage.step2Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.authorsPage.step2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                03
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                FIX IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.authorsPage.step3Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.authorsPage.step3Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                04
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.authorsPage.step4Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.authorsPage.step4Desc}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Capacidades & Herramientas: The 3 Core Pillars for Authors */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              {dict.authorsPage.toolsHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.authorsPage.toolsSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {/* Tool 1: Price it */}
            <div className="rounded-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                  💶
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.authorsPage.tool1Title}</h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {dict.authorsPage.tool1Desc}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                <a href="https://budget.printprice.pro/" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {locale === 'es' ? 'Calcular precio ➔' : locale === 'de' ? 'Preis kalkulieren ➔' : 'Calculate price ➔'}
                </a>
              </div>
            </div>

            {/* Tool 2: Fix it */}
            <div className="rounded-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  {dict.authorsPage.tool2Title}
                </h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {dict.authorsPage.tool2Desc}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <a href="https://preflight.printprice.pro/" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {locale === 'es' ? 'Comprobar mi PDF ➔' : locale === 'de' ? 'Mein PDF prüfen ➔' : 'Check my PDF ➔'}
                </a>
                <Link href="/products/preflight" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {locale === 'es' ? 'Ver detalles' : locale === 'de' ? 'Details' : 'Details'}
                </Link>
              </div>
            </div>

            {/* Tool 3: Print it */}
            <div className="rounded-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                  🏭
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.authorsPage.tool3Title}</h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {dict.authorsPage.tool3Desc}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                <a href="https://budget.printprice.pro/" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {locale === 'es' ? 'Encargar producción ➔' : locale === 'de' ? 'Druckauftrag erteilen ➔' : 'Commission printing ➔'}
                </a>
                <Link href="/products/print" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {locale === 'es' ? 'Cómo funciona' : locale === 'de' ? 'Ablauf' : 'How it works'}
                </Link>
              </div>
            </div>
          </div>

          {/* Complementary Tool: Maqueta 3D */}
          <div
            className="rounded-card"
            style={{
              padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.04) 0%, var(--bg-secondary) 100%)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.75rem, 2vw, 1.25rem)', flexWrap: 'wrap', flex: '1 1 260px' }}>
              <span style={{ fontSize: '2rem', lineHeight: 1 }}>📖</span>
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.975rem', lineHeight: 1.4 }}>
                    {locale === 'es' ? 'Herramienta complementaria de visualización: Maqueta 3D Interactiva' : locale === 'de' ? 'Ergänzende 3D-Vorschau: Interaktives Buch-Mockup' : 'Complementary visualization tool: Interactive 3D Mockup'}
                  </span>
                  <span style={{ fontSize: '0.625rem', background: 'var(--accent-container)', color: 'var(--accent-primary)', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 800 }}>
                    COMPLEMENTARIA
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {locale === 'es'
                    ? 'Visualiza la cubierta, contraportada y grosor de lomo calculado en tu navegador antes de encargar la tirada física.'
                    : locale === 'de'
                    ? 'Prüfen Sie Umschlag, Rückenstärke und Aufschlagverhalten direkt im Browser vor Auftragserteilung.'
                    : 'Preview cover, back, and computed spine thickness in your browser before ordering the physical run.'}
                </p>
              </div>
            </div>

            <Link
              href="/products/mockup"
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
            >
              {locale === 'es' ? 'Ver Maqueta 3D ➔' : locale === 'de' ? '3D-Mockup ansehen ➔' : 'View 3D Mockup ➔'}
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ Específica */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '2rem', textAlign: 'center' }}>
              {dict.authorsPage.faqHeading}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿Hay número mínimo de ejemplares?' : locale === 'de' ? 'Gibt es eine Mindestauflage?' : 'Is there a minimum order quantity?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'No. Gracias a las tecnologías de impresión digital industrial, puedes presupuestar e imprimir desde un único ejemplar de prueba hasta tiradas de varios miles en offset.'
                    : locale === 'de'
                    ? 'Nein. Dank digitaler Buchdrucktechnologien können Sie ab einem Einzelexemplar bis hin zu Tausenden im Offsetdruck kalkulieren.'
                    : 'No. Powered by modern digital press technology, you can quote and print from a single proof copy up to several thousand in offset.'}
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿La maqueta 3D es una prueba física contractual?' : locale === 'de' ? 'Ist das 3D-Modell ein farbverbindlicher Proof?' : 'Is the 3D mockup a physical contract proof?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'Es una simulación digital volumétrica basada en el gramaje del papel y número de páginas para comprobar la orientación y el lomo. No sustituye la prueba física de contrato en imprenta.'
                    : locale === 'de'
                    ? 'Es ist eine volumetrische Simulation zur Prüfung des Buchrückens. Sie ersetzt keinen physikalischen Andruck.'
                    : 'It is a volumetric digital simulation based on basis weight and page count to check orientation and spine thickness. It does not replace a physical press contract proof.'}
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                PRICE IT. FIX IT. PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                {dict.authorsPage.finalCtaHeading}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {dict.authorsPage.finalCtaSub}
              </p>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
              >
                {dict.authorsPage.finalCtaBtn}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

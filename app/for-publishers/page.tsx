'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { useLocale } from '@/lib/i18n';
import { BarChart3, Library, SearchCheck } from 'lucide-react';

export default function ForPublishersPage() {
  const { dict, locale } = useLocale();

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* 
        Hero Banner with Floating Red Particles & Slogan
      */}
      <HeroPlatform
        variant="particles"
        label="PRINTPRICE FOR PUBLISHERS"
        title={dict.publishersPage.heroTitle}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline={dict.publishersPage.heroSubtitle}
        primaryAction={{
          label: dict.publishersPage.ctaPrimary,
          href: "https://budget.printprice.pro/",
          sublabel: dict.publishersPage.badgeNote,
        }}
        secondaryAction={{
          label: dict.publishersPage.ctaSecondary,
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
                {locale === 'es' ? 'MATRIZ EDITORIAL' : locale === 'de' ? 'VERLAGSMATRIX' : 'PUBLISHER RUN MATRIX'}
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                {locale === 'es' ? 'CRUCE DIGITAL/OFFSET' : locale === 'de' ? 'DIGITAL/OFFSET' : 'DIGITAL/OFFSET'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Run 300 copies:</span>
                <span style={{ fontWeight: 600 }}>€3.42 / unit (Digital)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Run 500 copies:</span>
                <span style={{ fontWeight: 600 }}>€2.68 / unit (Digital)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Run 1,000 copies:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>€1.79 / unit (Offset Crossover)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Run 3,000 copies:</span>
                <span style={{ fontWeight: 600 }}>€1.14 / unit (Offset)</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <a href="https://budget.printprice.pro/" className="btn-primary" style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}>
                {dict.publishersPage.ctaPrimary}
              </a>
            </div>
          </div>
        }
      />

      {/* 
        HOW IT WORKS SECTION FOR PUBLISHERS
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
              {dict.publishersPage.howHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.publishersPage.howSubtitle}
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
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.publishersPage.step1Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.publishersPage.step1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                02
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                MATRIX
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.publishersPage.step2Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.publishersPage.step2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                03
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                FIX IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.publishersPage.step3Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.publishersPage.step3Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                04
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.publishersPage.step4Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.publishersPage.step4Desc}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Capacidades & Herramientas */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              {dict.publishersPage.toolsHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.publishersPage.toolsSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <BarChart3 size={24} strokeWidth={1.75} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.publishersPage.tool1Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.publishersPage.tool1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Library size={24} strokeWidth={1.75} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.publishersPage.tool2Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.publishersPage.tool2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <SearchCheck size={24} strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  {locale === 'es' ? 'Preflight Editorial: Revisión de Archivos' : locale === 'de' ? 'Verlags-Preflight: Dateiprüfung' : 'Publisher Preflight: File Review'}
                </h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {locale === 'es'
                    ? 'Revisión exhaustiva de archivos y preparación de entregas antes de enviar a imprenta. Detecta discrepancias de lomo, fuentes no incrustadas y perfiles de color en novedades y reediciones.'
                    : locale === 'de'
                    ? 'Gründliche Dateiprüfung und Druckdatenaufbereitung vor Drucklegung. Erkennt Rückenbreitenabweichungen, fehlende Schriften und Farbprofile bei Neuerscheinungen und Nachdrucken.'
                    : 'Thorough file review and delivery prep before sending to print. Catch spine mismatches, unembedded fonts, and color profiles across new titles and reprints.'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <a href="https://preflight.printprice.pro/" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {locale === 'es' ? 'Auditar entrega ➔' : locale === 'de' ? 'Druckdaten prüfen ➔' : 'Audit files ➔'}
                </a>
                <Link href="/products/preflight" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  {locale === 'es' ? 'Ver producto' : locale === 'de' ? 'Produkt' : 'Product'}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Específica */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '2rem', textAlign: 'center' }}>
              {dict.publishersPage.faqHeading}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿Cómo se gestionan las reediciones?' : locale === 'de' ? 'Wie werden Nachauflagen verwaltet?' : 'How are reprint runs managed?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'Cada título presupuestado mantiene sus parámetros guardados. Cuando requieras una reedición, puedes recalcular instantáneamente sobre la misma ficha técnica o ajustar tirada según demanda.'
                    : locale === 'de'
                    ? 'Jeder Titel speichert seine Spezifikationen. Nachdrucke können sofort mit denselben Parametern neu kalkuliert werden.'
                    : 'Each quoted title preserves its technical specs. Reprints can be requoted on demand with unchanged parameters or adjusted runs.'}
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿Qué opciones de encuadernación editorial soportáis?' : locale === 'de' ? 'Welche buchbinderischen Verfahren werden unterstützt?' : 'Which bindery options are supported?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'Soportamos rústica cosida con hilo vegetal, fresada con cola PUR de alta resistencia, tapa dura con lomo recto o curvo, cabezadas, cinta de registro y sobrecubiertas con solapas.'
                    : locale === 'de'
                    ? 'Fadenheftung, PUR-Klebebindung, Hardcover mit geradem oder rundem Rücken, Kapitalband und Leseband.'
                    : 'Thread sewn softcover, high-durability PUR perfect binding, casebound hardcovers with straight or round spine, headbands and ribbon markers.'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final Action CTA with animated grid background */}
      <ActionCTA
        slogan="PRICE IT. FIX IT. PRINT IT."
        title={dict.publishersPage.finalCtaHeading}
        description={dict.publishersPage.finalCtaSub}
        buttonLabel={dict.publishersPage.finalCtaBtn}
        buttonHref="https://budget.printprice.pro/"
        secondaryButtonLabel={locale === 'es' ? 'Contactar asesor ➔' : locale === 'de' ? 'Berater kontaktieren ➔' : 'Contact advisor ➔'}
        secondaryButtonHref="/contact"
        trackingAction="publishers_final_cta"
      />
    </main>
  );
}

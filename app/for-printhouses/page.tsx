'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { useLocale } from '@/lib/i18n';

export default function ForPrinthousesPage() {
  const { dict, locale } = useLocale();

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 
        Hero Banner with Floating Red Particles & Slogan
      */}
      <HeroPlatform
        variant="particles"
        label="PRINTPRICE FOR PRINTHOUSES"
        title={dict.printhousesPage.heroTitle}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline={dict.printhousesPage.heroSubtitle}
        primaryAction={{
          label: dict.printhousesPage.ctaPrimary,
          href: "https://control.printprice.pro/printhouse/register",
          sublabel: dict.printhousesPage.badgeNote,
        }}
        secondaryAction={{
          label: dict.printhousesPage.ctaSecondary,
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
                {locale === 'es' ? 'PERFIL DE TALLER' : locale === 'de' ? 'BETRIEBSPROFIL' : 'PLANT PROFILE'}
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                CONTROL PLANE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Presses:</span>
                <span style={{ fontWeight: 600 }}>Heidelberg Speedmaster XL 106</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Digital Line:</span>
                <span style={{ fontWeight: 600 }}>HP Indigo 12000 HD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Sheet format:</span>
                <span style={{ fontWeight: 600 }}>Max 750 × 1060 mm</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Bindery:</span>
                <span style={{ fontWeight: 600 }}>Muller Martini Alegro PUR</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tenant Isolation:</span>
                <span style={{ fontWeight: 700, color: '#22c55e' }}>✓ Multi-Tenant RBAC Active</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <a href="https://control.printprice.pro/printhouse/register" className="btn-primary" style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}>
                {dict.printhousesPage.ctaPrimary}
              </a>
            </div>
          </div>
        }
      />

      {/* 
        HOW IT WORKS SECTION FOR PRINTHOUSES
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
              {dict.printhousesPage.howHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.printhousesPage.howSubtitle}
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
                ONBOARDING
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.printhousesPage.step1Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.printhousesPage.step1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                02
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRESSES
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.printhousesPage.step2Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.printhousesPage.step2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                03
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                BINDERY &amp; PAPER
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.printhousesPage.step3Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.printhousesPage.step3Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                04
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.printhousesPage.step4Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.printhousesPage.step4Desc}
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
              {dict.printhousesPage.toolsHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.printhousesPage.toolsSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                ⚙️
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.printhousesPage.tool1Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.printhousesPage.tool1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                ✂️
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.printhousesPage.tool2Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.printhousesPage.tool2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                📦
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.printhousesPage.tool3Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.printhousesPage.tool3Desc}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Específica */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '2rem', textAlign: 'center' }}>
              {dict.printhousesPage.faqHeading}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿Quién calcula los costes y con qué fórmulas?' : locale === 'de' ? 'Wer berechnet die Kosten und nach welchen Formeln?' : 'Who calculates the costs and with what formulas?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'Los cálculos son resueltos exclusivamente por el motor del servidor de PrintPrice OS aplicando tus matrices de imposición, horas de máquina, mermas calibradas y consumo exacto de papel.'
                    : locale === 'de'
                    ? 'Die Berechnungen werden exklusiv vom Server-Rechenkern anhand Ihrer hinterlegten Ausschieß- und Maschinenmatrizen gelöst.'
                    : 'Calculations are resolved exclusively by the PrintPrice OS server engine applying your machine imposition matrices, calibrated makeready and exact paper consumption.'}
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿Mis tarifas son públicas para otros talleres?' : locale === 'de' ? 'Sind meine Tarife für andere Druckereien sichtbar?' : 'Are my rates visible to other printhouses?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'No. PrintPrice OS mantiene un aislamiento estricto de tenants (multi-tenant con RBAC estricto). Tus costes, márgenes y acuerdos son confidenciales y privados para tu organización.'
                    : locale === 'de'
                    ? 'Nein. PrintPrice OS erzwingt strikte Mandantentrennung (Multi-Tenant mit RBAC). Ihre Kosten und Margen bleiben absolut vertraulich.'
                    : 'No. PrintPrice OS enforces strict tenant isolation (multi-tenant with RBAC). Your machine costs, markups and commercial terms are strictly confidential to your organization.'}
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                PRICE IT. FIX IT. PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                {dict.printhousesPage.finalCtaHeading}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {dict.printhousesPage.finalCtaSub}
              </p>
              <a
                href="https://control.printprice.pro/printhouse/register"
                className="btn-primary"
                style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
              >
                {dict.printhousesPage.finalCtaBtn}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

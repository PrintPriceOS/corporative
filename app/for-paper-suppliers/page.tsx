'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { useLocale } from '@/lib/i18n';
import { FileText, Truck, TrendingUp } from 'lucide-react';

export default function ForPaperSuppliersPage() {
  const { dict, locale } = useLocale();

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* 
        Hero Banner with Floating Red Particles & Slogan
      */}
      <HeroPlatform
        variant="particles"
        label="PRINTPRICE FOR PAPER SUPPLIERS"
        title={dict.suppliersPage.heroTitle}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline={dict.suppliersPage.heroSubtitle}
        primaryAction={{
          label: dict.suppliersPage.ctaPrimary,
          href: "https://control.printprice.pro/supplier/register",
          sublabel: dict.suppliersPage.badgeNote,
        }}
        secondaryAction={{
          label: dict.suppliersPage.ctaSecondary,
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
                {locale === 'es' ? 'CATÁLOGO DE SUSTRATOS' : locale === 'de' ? 'SUBSTRATKATALOG' : 'SUBSTRATE CATALOG'}
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                PAPER HUB
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Product:</span>
                <span style={{ fontWeight: 600 }}>Arctic Volume White</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Basis Weight:</span>
                <span style={{ fontWeight: 600 }}>115 g/m² (Caliper 1.1)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Sheet Size:</span>
                <span style={{ fontWeight: 600 }}>700 × 1000 mm (B1)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Mill Price:</span>
                <span style={{ fontWeight: 600 }}>€1,240 / ton (Ex-works)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Freight Separation:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>Decoupled Logistical Porte</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <a href="https://control.printprice.pro/supplier/register" className="btn-primary" style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}>
                {dict.suppliersPage.ctaPrimary}
              </a>
            </div>
          </div>
        }
      />

      {/* 
        HOW IT WORKS SECTION FOR PAPER SUPPLIERS
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
              {dict.suppliersPage.howHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.suppliersPage.howSubtitle}
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
                SUPPLIER ONBOARDING
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.suppliersPage.step1Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.suppliersPage.step1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                02
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                CATALOG
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.suppliersPage.step2Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.suppliersPage.step2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                03
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRICE IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.suppliersPage.step3Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.suppliersPage.step3Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                04
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.suppliersPage.step4Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.suppliersPage.step4Desc}
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
              {dict.suppliersPage.toolsHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.suppliersPage.toolsSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <FileText size={24} strokeWidth={1.75} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.suppliersPage.tool1Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.suppliersPage.tool1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Truck size={24} strokeWidth={1.75} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.suppliersPage.tool2Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.suppliersPage.tool2Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <TrendingUp size={24} strokeWidth={1.75} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dict.suppliersPage.tool3Title}</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.suppliersPage.tool3Desc}
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
              {dict.suppliersPage.faqHeading}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿Es PrintPrice un intermediario de venta de papel?' : locale === 'de' ? 'Ist PrintPrice ein Zwischenhändler für Papier?' : 'Is PrintPrice an intermediary paper reseller?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'No. PrintPrice OS es la plataforma de software operativo que conecta el catálogo técnico y las tarifas del proveedor directamente con las matrices de cálculo de las imprentas. La relación comercial y la facturación de aprovisionamiento se gestionan según vuestros acuerdos directos.'
                    : locale === 'de'
                    ? 'Nein. PrintPrice OS ist eine neutrale Softwareplattform, die Ihren Substratkatalog direkt in die Kalkulation der Druckereien einbindet.'
                    : 'No. PrintPrice OS is the operating software platform linking your technical catalog and price breaks directly into printhouse calculation engines. Commercial relationships and invoicing follow your direct agreements.'}
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {locale === 'es' ? '¿Por qué se separa el coste de papel del de transporte?' : locale === 'de' ? 'Warum werden Material- und Frachtkosten getrennt?' : 'Why are paper and transport costs decoupled?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {locale === 'es'
                    ? 'Para aportar transparencia absoluta al impresor. El taller conoce con certeza el coste franco fábrica del sustrato y el porte logístico según su ubicación geográfica, eliminando discrepancias en el cálculo final.'
                    : locale === 'de'
                    ? 'Für vollständige Transparenz: Die Druckerei kennt exakt den Ab-Werk-Preis sowie die Frachtkosten für ihren Standort.'
                    : 'To ensure complete transparency for the print plant. The plant knows the exact ex-works mill price and regional transport rate, eliminating surprises in job estimates.'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final Action CTA with animated grid background */}
      <ActionCTA
        slogan="PRICE IT. FIX IT. PRINT IT."
        title={dict.suppliersPage.finalCtaHeading}
        description={dict.suppliersPage.finalCtaSub}
        buttonLabel={dict.suppliersPage.finalCtaBtn}
        buttonHref="https://control.printprice.pro/supplier/register"
        secondaryButtonLabel={locale === 'es' ? 'Portal de partners ➔' : locale === 'de' ? 'Partner-Portal ➔' : 'Partner portal ➔'}
        secondaryButtonHref="/contact/partner"
        trackingAction="suppliers_final_cta"
      />
    </main>
  );
}

'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { useLocale } from "@/lib/i18n";

export default function PackagingSolution() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'SECTOR PRODUCTIVO / PACKAGING & ESTUCHERÍA',
      heroTitle: 'PRECISIÓN ESTRUCTURAL EN PACKAGING',
      heroSub: 'Desde estuches plegables (folding cartons) hasta cajas de microcanal. Resuelve el cálculo de troquel, hendidos y selección de cartoncillos con algoritmos de imposición geométrica.',
      heroBtn: 'Consultar con un especialista ➔',
      features: [
        { icon: 'box', tag: 'Estructura', title: 'Comprensión de Troquel', desc: 'El motor reconoce líneas de corte, hendido, sangrado y perforación para calcular el rendimiento de pliego y tiempo de troquelado.' },
        { icon: 'specs', tag: 'Material', title: 'Sincronización de Sustratos', desc: 'Costes vinculados a cartoncillos estucados, folding SBS y cartones ondulados con cálculo exacto de mermas de arranque.' },
        { icon: 'shield', tag: 'Preflight', title: 'Control de Calidad Específico', desc: 'Validación técnica de zonas de reserva de barniz, áreas de encolado, códigos de barras legibles y sangrados en pestañas.' },
      ],
      ctaSlogan: 'PRECISIÓN ESTRUCTURAL',
      ctaTitle: 'Ingeniería aplicada al packaging',
      ctaDesc: 'Calcula con exactitud troqueles, materiales y acabados en estuches y embalajes con PrintPrice OS.',
      ctaBtn: 'Hablar con un especialista ➔'
    },
    en: {
      heroLabel: 'INDUSTRY SEGMENTS / PACKAGING & CARTONS',
      heroTitle: 'PACKAGING STRUCTURAL PRECISION',
      heroSub: 'From folding cartons to corrugated microflute boxes. Solve dieline complexity, creasing matrices, and substrate yield with geometry-aware algorithms.',
      heroBtn: 'Consult a specialist ➔',
      features: [
        { icon: 'box', tag: 'Dielines', title: 'Structural Dieline Engine', desc: 'The engine recognizes cut, crease, perforation, and glue flap lines to determine sheet yields and die-cutting cycle times.' },
        { icon: 'specs', tag: 'Substrates', title: 'Board & Caliper Sync', desc: 'Real-time calculation for folding boxboards (FBB), solid bleached sulfate (SBS), and corrugated boards with setup waste optimization.' },
        { icon: 'shield', tag: 'Preflight', title: 'Packaging-Specific QC', desc: 'Automated inspection of varnish knockout zones, glue seam clearances, UPC barcode readability, and flap bleeds.' },
      ],
      ctaSlogan: 'STRUCTURAL PRECISION',
      ctaTitle: 'Engineered for Packaging Manufacturing',
      ctaDesc: 'Calculate dielines, specialized boards, and finishes for retail cartons with PrintPrice OS.',
      ctaBtn: 'Speak with an architect ➔'
    },
    de: {
      heroLabel: 'INDUSTRIESCHWERPUNKT / VERPACKUNG & FALTSCHACHTELN',
      heroTitle: 'STRUKTURELLE PRÄZISION IM PACKAGING',
      heroSub: 'Von Faltschachteln bis zur Feinkartonage. Beherrschen Sie Stanzkonturen, Rillungen und Materialausbeute mit geometrischen Berechnungsalgorithmen.',
      heroBtn: 'Fachberatung anfragen ➔',
      features: [
        { icon: 'box', tag: 'Stanzkontur', title: 'Stanz- & Rillungslogik', desc: 'Die Engine unterscheidet Schneid-, Rill- und Perforationslinien zur exakten Berechnung von Bogenlayout und Stanzzeiten.' },
        { icon: 'specs', tag: 'Kartonagen', title: 'Substrat- und Dickenabstimmung', desc: 'Echtzeitkalkulation für Chromosulfatkarton (SBS), Faltschachtelkarton (GC1/GC2) und Wellpappen mit Rüstmakulatur-Optimierung.' },
        { icon: 'shield', tag: 'Preflight', title: 'Verpackungsspezifische Prüfung', desc: 'Prüfung von Lackaussparungen, Klebelaschen, EAN/UPC-Strichcode-Lesbarkeit und Anschnitt an Schachtellaschen.' },
      ],
      ctaSlogan: 'STRUKTURELLE PRÄZISION',
      ctaTitle: 'Präzise Ingenieursleistung für Verpackungen',
      ctaDesc: 'Kalkulieren Sie Stanzformen, Spezialkartons und Veredelungen für Verpackungen mit PrintPrice OS.',
      ctaBtn: 'Mit Spezialisten sprechen ➔'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="solution-page">
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroBtn, href: "/contact" }}
      />

      <Section variant="secondary">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {t.features.map((feature, i) => (
            <div key={i} style={{ height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Icon name={feature.icon as any} size={20} style={{ color: 'var(--accent-primary)' }} />
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', opacity: 0.3 }}></div>
                  </div>
                  <span className="technical-text" style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--accent-primary)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em',
                    marginBottom: '0.75rem',
                    display: 'block',
                    fontWeight: 900
                  }}>{feature.tag}</span>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', letterSpacing: '-0.02em', fontWeight: 800 }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginTop: 'auto' }}>{feature.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      <ActionCTA 
        slogan={t.ctaSlogan}
        title={t.ctaTitle}
        description={t.ctaDesc}
        buttonLabel={t.ctaBtn}
        buttonHref="/contact"
        trackingAction="packaging_cta_talk_expert"
      />
    </div>
  );
}

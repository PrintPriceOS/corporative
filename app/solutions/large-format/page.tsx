'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { useLocale } from "@/lib/i18n";

export default function LargeFormatSolution() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'SECTOR PRODUCTIVO / GRAN FORMATO & ROTULACIÓN',
      heroTitle: 'ORQUESTACIÓN DE GRAN FORMATO',
      heroSub: 'Diseñado para lonas, vinilos, paneles y rotulación comercial: gestión de archivos masivos, panelado automático y control de corte digital con trazabilidad.',
      heroBtn: 'Consultar con un especialista ➔',
      features: [
        { icon: 'layers', tag: 'Panelado', title: 'División en Franjas (Tiling)', desc: 'Desglose automatizado para gigantografías con solapes configurables y verificación de continuidad cromática.' },
        { icon: 'node', tag: 'Capacidad', title: 'Distribución por Maquinaria', desc: 'Asigna trabajos a plotters UV, látex o mesas de corte según la bobina, rigidez de sustrato y dimensiones.' },
        { icon: 'web', tag: 'Montaje', title: 'Ficha de Instalación', desc: 'Genera planos y cotas técnicas para equipos de colocación en exterior e interior sin errores de replanteo.' },
      ],
      ctaSlogan: 'GRAN FORMATO Y ROTULACIÓN',
      ctaTitle: 'Escala tu capacidad en gran formato',
      ctaDesc: 'Optimiza la validación de archivos pesados y la gestión de paneles con PrintPrice OS.',
      ctaBtn: 'Hablar con un especialista ➔'
    },
    en: {
      heroLabel: 'INDUSTRY SEGMENTS / LARGE FORMAT & SIGNAGE',
      heroTitle: 'GRAND SCALE ORCHESTRATION',
      heroSub: 'Engineered for banners, vinyl, rigid boards, and retail signage: massive file preflight, automated tiling, and flatbed cutting integration with full traceability.',
      heroBtn: 'Consult a specialist ➔',
      features: [
        { icon: 'layers', tag: 'Tiling', title: 'Automated Panel Tiling', desc: 'Automated breakdown for oversized graphics with configurable overlaps and visual alignment marks.' },
        { icon: 'node', tag: 'Capacity', title: 'Press Routing', desc: 'Route grand-format jobs to roll-to-roll UV, latex, or flatbed cutters based on substrate roll width and rigidity.' },
        { icon: 'web', tag: 'Installation', title: 'Field Spec Sheets', desc: 'Generate installation blueprints, measurements, and panel diagrams for on-site finishing teams.' },
      ],
      ctaSlogan: 'GRAND SCALE PRODUCTION',
      ctaTitle: 'Scale Your Large-Format Vision',
      ctaDesc: 'Streamline heavy file intake, resolution checks, and panel tiling with PrintPrice OS.',
      ctaBtn: 'Speak with an expert ➔'
    },
    de: {
      heroLabel: 'INDUSTRIESCHWERPUNKT / GROSSFORMAT & WERBETECHNIK',
      heroTitle: 'GROSSFORMAT-ORCHESTRIERUNG',
      heroSub: 'Entwickelt für Banner, Folien, Plattendirektdruck und Werbetechnik: Prüfung riesiger Druckdateien, automatische Kachelung und Ansteuerung digitaler Fräs- und Schneidtische.',
      heroBtn: 'Fachberatung anfragen ➔',
      features: [
        { icon: 'layers', tag: 'Kachelung', title: 'Automatisches Tiling', desc: 'Automatische Aufteilung übergroßer Formate in Druckbahnen mit einstellbarer Überlappung und Farbkonsistenz.' },
        { icon: 'node', tag: 'Maschinen', title: 'Kapazitätsverteilung', desc: 'Weiterleitung von Großformatjobs an UV-, Latex- oder Flachbettanlagen je nach Medienbreite und Steifigkeit.' },
        { icon: 'web', tag: 'Montage', title: 'Montageanweisungen', desc: 'Generieren Sie Maßskizzen und Montagepläne für Verklebeteams vor Ort ohne Missverständnisse.' },
      ],
      ctaSlogan: 'PRODUKTION IM GROSSEN MASSSTAB',
      ctaTitle: 'Großformat-Kapazitäten skalieren',
      ctaDesc: 'Optimieren Sie Dateiprüfung, Auflösungsprüfung und Kachelung mit PrintPrice OS.',
      ctaBtn: 'Mit Experten sprechen ➔'
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
        trackingAction="large_format_cta_talk_expert"
      />
    </div>
  );
}

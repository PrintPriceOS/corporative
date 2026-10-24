'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { useLocale } from "@/lib/i18n";

export default function CommercialSolution() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'SECTOR PRODUCTIVO / IMPRESIÓN COMERCIAL',
      heroTitle: 'AUTOMATIZACIÓN DE VOLUMEN COMERCIAL',
      heroSub: 'Optimiza la producción de folletos, catálogos y papelería corporativa con imposición inteligente, cálculo de pliego y sincronización técnica directa.',
      heroBtn: 'Consultar con un especialista ➔',
      features: [
        { icon: 'activity', tag: 'Velocidad', title: 'Flujo Continuo', desc: 'Automatiza la transición del presupuesto a la imposición de taller para minimizar demoras operativas.' },
        { icon: 'layers', tag: 'Rendimiento', title: 'Optimización de Pliego', desc: 'Aprovechamiento de hoja en tiradas digitales u offset con cálculo automático de mermas y pinzas.' },
        { icon: 'web', tag: 'Portal', title: 'Área B2B', desc: 'Permite a tus clientes corporativos reordenar trabajos con especificaciones técnicas inalteradas.' },
      ],
      ctaSlogan: 'IMPRESIÓN COMERCIAL EFICIENTE',
      ctaTitle: 'Controla tiradas de alto volumen',
      ctaDesc: 'Calcula con precisión sustratos, barnices y plegados para tiradas comerciales en PrintPrice OS.',
      ctaBtn: 'Hablar con un especialista ➔'
    },
    en: {
      heroLabel: 'INDUSTRY SEGMENTS / COMMERCIAL PRINT',
      heroTitle: 'COMMERCIAL VOLUME AUTOMATION',
      heroSub: 'Optimize the production of brochures, catalogs, and corporate collateral with automated imposition, sheet yield calculation, and direct prepress sync.',
      heroBtn: 'Consult a specialist ➔',
      features: [
        { icon: 'activity', tag: 'Velocity', title: 'Continuous Flow', desc: 'Automate the transition from quote to plant work order to eliminate administrative bottlenecks.' },
        { icon: 'layers', tag: 'Yield', title: 'Automated Ganging', desc: 'Intelligent sheet yield orchestration to maximize output across high-volume digital or offset runs.' },
        { icon: 'web', tag: 'Interface', title: 'Self-Service B2B Hub', desc: 'Enable enterprise clients to reorder jobs and manage assets against validated specifications.' },
      ],
      ctaSlogan: 'HIGH-VOLUME PRINTING',
      ctaTitle: 'Master High-Volume Production',
      ctaDesc: 'Leverage deterministic cost calculation and file validation for commercial print operations.',
      ctaBtn: 'Speak with an architect ➔'
    },
    de: {
      heroLabel: 'INDUSTRIESCHWERPUNKT / AKZIDENZDRUCK',
      heroTitle: 'AUTOMATISIERUNG FÜR AKZIDENZAUFTRÄGE',
      heroSub: 'Optimieren Sie die Fertigung von Broschüren, Katalogen und Geschäftsdrucksachen mit automatischer Ausschießlogik, Bogenausnutzung und Vorstufen-Prüfung.',
      heroBtn: 'Fachberatung anfragen ➔',
      features: [
        { icon: 'activity', tag: 'Geschwindigkeit', title: 'Durchgängiger Workflow', desc: 'Automatisieren Sie den Übergang vom Angebot zur Maschinenkarte ohne manuelle Schnittstellen.' },
        { icon: 'layers', tag: 'Ausbeute', title: 'Bogenoptimierung', desc: 'Intelligente Bogennutzung zur Maximierung des Fortdrucks im Digital- und Bogenoffsetdruck.' },
        { icon: 'web', tag: 'Portal', title: 'B2B-Kundenbereich', desc: 'Ermöglichen Sie Geschäftskunden Nachbestellungen mit identischen technischen Vorgaben.' },
      ],
      ctaSlogan: 'EFFIZIENTER AKZIDENZDRUCK',
      ctaTitle: 'Großauflagen sicher beherrschen',
      ctaDesc: 'Nutzen Sie deterministische Preiskalkulation und PDF-Prüfung für Akzidenzdruckereien.',
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
        trackingAction="commercial_cta_talk_expert"
      />
    </div>
  );
}

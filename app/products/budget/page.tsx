'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { useLocale } from "@/lib/i18n";

export default function BudgetPage() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'MOTOR DE PRESUPUESTO / PRICE IT',
      heroTitle: 'CALCULA COSTES REALES DE IMPRESIÓN EN SEGUNDOS',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Obtén presupuestos técnicos de libros y publicaciones al instante. Costes de fabricación calculados en servidor a partir de especificaciones de pliegos, gramajes y matrices de taller.',
      heroCtaPrimary: 'Calcular mi presupuesto de libro ➔',
      heroCtaSecondary: 'Ver características técnicas ↓',
      features: [
        { 
          icon: 'calculator', 
          tag: 'INGENIERÍA DE COSTES', 
          title: 'Presupuesto Técnico al Instante', 
          desc: 'Cálculo estructurado basado en tus especificaciones: pliegos, gramajes, tintas y operaciones de encuadernación conforme a tarifas de planta.' 
        },
        { 
          icon: 'activity', 
          tag: 'CONECTIVIDAD B2B', 
          title: 'Sincronizado con Talleres', 
          desc: 'Conectado a las matrices de máquinas de nuestra red de imprentas asociadas y catálogos de proveedores de papel.' 
        },
        { 
          icon: 'factory', 
          tag: 'COMPLEJIDAD EDITORIAL', 
          title: 'Proyectos Editoriales Completos', 
          desc: 'Desde tiradas cortas en rústica fresada PUR hasta grandes volúmenes en tapa dura cosida con acabados especiales.' 
        },
      ],
      ctaSlogan: 'MOTOR DE PRESUPUESTO PRICE IT',
      ctaTitle: 'Inicia tu primer cálculo de costes',
      ctaDesc: 'Calcula el presupuesto de tu libro con rigor técnico en segundos. Sin trámites innecesarios.',
      ctaBtn: 'Calcular presupuesto ahora ➔'
    },
    en: {
      heroLabel: 'PRICING ENGINE / PRICE IT',
      heroTitle: 'CALCULATE REAL PRINT COSTS IN SECONDS',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Get instant manufacturing budgets for books and print jobs. Server-side production pricing resolved against technical specs and real shop matrices.',
      heroCtaPrimary: 'Calculate my book budget ➔',
      heroCtaSecondary: 'Explore technical capabilities ↓',
      features: [
        { 
          icon: 'calculator', 
          tag: 'COST ENGINEERING', 
          title: 'Instant Technical Estimate', 
          desc: 'Structured calculation based on your physical specifications: sheet layouts, basis weights, inks, and bindery according to plant matrices.' 
        },
        { 
          icon: 'activity', 
          tag: 'B2B CONNECTIVITY', 
          title: 'Connected to Plant Matrices', 
          desc: 'Directly linked to machine hourly rates and makeready waste tables across partner facilities and paper suppliers.' 
        },
        { 
          icon: 'factory', 
          tag: 'EDITORIAL COMPLEXITY', 
          title: 'Complex Multi-Component Books', 
          desc: 'From short-run digital softcovers with PUR binding to massive offset runs in section-sewn hardcover with foil stamping.' 
        },
      ],
      ctaSlogan: 'PRICE IT PRICING ENGINE',
      ctaTitle: 'Start your first cost calculation',
      ctaDesc: 'Determine your print costs with technical exactness in seconds. Without unnecessary paperwork.',
      ctaBtn: 'Calculate cost now ➔'
    },
    de: {
      heroLabel: 'KALKULATIONSMOTOR / PRICE IT',
      heroTitle: 'ECHTE DRUCKKOSTEN IN SEKUNDEN BERECHNEN',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Erhalten Sie sofortige Fertigungsangebote für Bücher und Druckwerke. Serverseitige Preiskalkulation nach verifizierten Druckereimatrizen.',
      heroCtaPrimary: 'Buchangebot berechnen ➔',
      heroCtaSecondary: 'Funktionen ansehen ↓',
      features: [
        { 
          icon: 'calculator', 
          tag: 'KOSTENINGENIEURWESEN', 
          title: 'Sofortige technische Vorkalkulation', 
          desc: 'Strukturierte Berechnung nach Ihren Spezifikationen: Bogenformate, Grammaturen, Farbräume und Weiterverarbeitung nach Betriebstarifen.' 
        },
        { 
          icon: 'activity', 
          tag: 'B2B-KONNEKTIVITÄT', 
          title: 'Mit Druckereien vernetzt', 
          desc: 'Direkt angebunden an Maschinen-Stundensätze und Rüsttabellen unserer Partnerdruckereien und Papierhändler.' 
        },
        { 
          icon: 'factory', 
          tag: 'VERLAGSKOMPLEXITÄT', 
          title: 'Anspruchsvolle Buchprojekte', 
          desc: 'Von Kleinauflagen im Softcover mit PUR-Klebebindung bis zu Großauflagen im fadengehefteten Hardcover mit Veredelung.' 
        },
      ],
      ctaSlogan: 'PRICE IT KALKULATIONSMOTOR',
      ctaTitle: 'Starten Sie Ihre erste Kalkulation',
      ctaDesc: 'Berechnen Sie Ihre Druckkosten mit technischer Präzision in wenigen Sekunden.',
      ctaBtn: 'Jetzt Angebot kalkulieren ➔'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="product-page">
      {/* Product Hero */}
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroCtaPrimary, href: "https://budget.printprice.pro" }}
        secondaryAction={{ label: t.heroCtaSecondary, href: "#features" }}
        variant="particles"
        rightContent={
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '16/9', 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: 0.8
              }}
            >
              <source src="/videos/budget.webm" type="video/webm" />
            </video>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              width: '100%', 
              height: '40%', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              zIndex: 1
            }}></div>
          </div>
        }
      />

      {/* Feature Grid */}
      <Section variant="secondary" id="features">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {t.features.map((feature, i) => (
            <div key={i} style={{ height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{
                  padding: 'clamp(2rem, 5vw, 3.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      height: '3.5rem', 
                      width: '3.5rem', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      border: '1px solid var(--border-color)', 
                      background: 'rgba(255,255,255,0.03)'
                    }}>
                      <Icon name={feature.icon as any} size={28} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <span className="technical-text" style={{ 
                      fontSize: '0.65rem', 
                      color: 'var(--accent-primary)', 
                      opacity: 0.8, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.15em', 
                      fontWeight: 900 
                    }}>
                      {feature.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: 'auto' }}>{feature.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <ActionCTA 
        slogan={t.ctaSlogan}
        title={t.ctaTitle}
        description={t.ctaDesc}
        buttonLabel={t.ctaBtn}
        buttonHref="https://budget.printprice.pro"
        trackingAction="budget_cta_calculate_final"
      />
    </div>
  );
}

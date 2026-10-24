'use client';

import React from 'react';
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { useLocale } from "@/lib/i18n";

export default function CompanyPage() {
  const { locale } = useLocale();

  const content = {
    es: {
      label: 'PRINCIPIOS DE INGENIERÍA',
      titlePrimary: 'INGENIERÍA Y',
      titleAccent: 'CERTEZA PRODUCTIVA',
      subheadline: 'Construimos la infraestructura que calcula, valida y coordina la producción gráfica a escala. Del cálculo de costes al control de taller: cada fase se diseña con rigor técnico.',
      badgeLine: 'Sin estimaciones a ciegas. Sin suposiciones. Con control metódico de procesos.',
      trustSignals: [
        { icon: 'factory', label: 'Datos técnicos reales de producción', status: 'VERIFICADO' },
        { icon: 'orchestration', label: 'Registro verificable de cada pedido', status: 'ACTIVO' },
        { icon: 'audit', label: 'Ejecución determinista de cálculo', status: 'APLICADO' },
        { icon: 'observability', label: 'Estados de trabajo transparentes', status: 'VISIBLE' }
      ],
      whatWeBuildHeading: 'Qué construimos',
      whatWeBuildSub: 'Nos centramos en los cuatro pilares de la infraestructura gráfica moderna.',
      features: [
        { tag: 'CALCULAR', icon: 'calculator', title: 'Algoritmos de Presupuesto', desc: 'Calculamos costes reales de fabricación: sustratos, procesos mecánicos y restricciones técnicas de taller.' },
        { tag: 'VALIDAR', icon: 'shield', title: 'Sistemas de Preflight', desc: 'Verificamos geometrías, tintas y resoluciones antes de iniciar cualquier proceso de impresión física.' },
        { tag: 'CONTROLAR', icon: 'orchestration', title: 'Lógica de Coordinación', desc: 'Optimizamos la asignación y seguimiento de trabajos en una red de talleres y proveedores de papel.' },
        { tag: 'GOBERNAR', icon: 'policy', title: 'Capa de Trazabilidad', desc: 'Cada decisión queda registrada y vinculada a las especificaciones del pedido acordadas.' }
      ],
      narrativeHeading: 'Diseñado como sistema integral, no como herramientas aisladas',
      narrativeSub: 'Cada módulo forma parte de un entorno operativo interconectado. No creamos utilidades inconexas; desarrollamos la capa unificada para la producción gráfica.',
      modulesLabel: 'MÓDULOS PRINCIPALES',
      modules: [
        { label: 'Budget (Price It)', icon: 'calculator', val: 'Cálculo de Costes' },
        { label: 'Preflight (Fix It)', icon: 'shield', val: 'Validación Técnica' },
        { label: 'Print It', icon: 'command', val: 'Marketplace de Talleres' },
        { label: 'Control Plane', icon: 'policy', val: 'Espacio Operativo B2B' }
      ],
      givesYouLabel: 'Qué aporta a tu operativa',
      givesYouItems: [
        { label: 'Coste de fabricación antes de lanzar el trabajo', icon: 'calculator' },
        { label: 'PDFs auditados antes de entrar a máquina', icon: 'shield' },
        { label: 'Enrutamiento según capacidades acreditadas', icon: 'orchestration' },
        { label: 'Registro técnico de archivo y pedido', icon: 'history' }
      ],
      ctaHeading: 'Gestiona tu producción con PrintPrice OS',
      ctaSub: 'Descubre cómo fluye tu operativa en un sistema concebido para la exactitud técnica.',
      ctaPrimary: 'Calcular proyecto ➔',
      ctaSecondary: 'Contactar con el equipo técnico ➔',
      noSetup: 'SIN CUOTAS FIJAS OBLIGATORIAS',
      footerNote: 'PRINTPRICE OS ESTÁ CONCEBIDO PARA ENTORNOS DE PRODUCCIÓN GRÁFICA RIGUROSOS Y PROFESIONALES.'
    },
    en: {
      label: 'ENGINEERING PRINCIPLES',
      titlePrimary: 'ENGINEERING',
      titleAccent: 'PRODUCTION CERTAINTY',
      subheadline: 'We build the infrastructure that calculates, validates, and coordinates print manufacturing at scale. From cost determination to production control — every stage is engineered with technical precision.',
      badgeLine: 'No blind estimates. No guesswork. Structured and controlled outcomes.',
      trustSignals: [
        { icon: 'factory', label: 'Real production data — not estimates', status: 'VERIFIED' },
        { icon: 'orchestration', label: 'Verifiable order and job records', status: 'ACTIVE' },
        { icon: 'audit', label: 'Deterministic execution logic', status: 'ENFORCED' },
        { icon: 'observability', label: 'Transparent production states', status: 'VISIBLE' }
      ],
      whatWeBuildHeading: 'What we build',
      whatWeBuildSub: 'Our focus is on the four pillars of modern print manufacturing infrastructure.',
      features: [
        { tag: 'CALCULATE', icon: 'calculator', title: 'Pricing Algorithms', desc: 'We calculate real manufacturing costs: substrates, mechanical operations, and shop constraints.' },
        { tag: 'VALIDATE', icon: 'shield', title: 'Preflight Systems', desc: 'We verify geometry, inks, and resolution before physical ink meets the paper.' },
        { tag: 'CONTROL', icon: 'orchestration', title: 'Coordination Logic', desc: 'We optimize routing, scheduling, and tracking across specialized print houses and paper suppliers.' },
        { tag: 'GOVERN', icon: 'policy', title: 'Traceability Layer', desc: 'Every decision is logged and tied to agreed order specifications for forensic accountability.' }
      ],
      narrativeHeading: 'Built as a cohesive system, not isolated utilities',
      narrativeSub: 'Each module is part of a single, interconnected operating system. We don’t build disjointed tools; we engineer the unified layer for print production.',
      modulesLabel: 'CORE SYSTEM MODULES',
      modules: [
        { label: 'Budget (Price It)', icon: 'calculator', val: 'Cost Calculation' },
        { label: 'Preflight (Fix It)', icon: 'shield', val: 'Technical Validation' },
        { label: 'Print It', icon: 'command', val: 'Manufacturing Marketplace' },
        { label: 'Control Plane', icon: 'policy', val: 'B2B Operations Space' }
      ],
      givesYouLabel: 'What this gives you',
      givesYouItems: [
        { label: 'Real production cost before printing', icon: 'calculator' },
        { label: 'Files validated prior to prepress intake', icon: 'shield' },
        { label: 'Routing matched to audited capabilities', icon: 'orchestration' },
        { label: 'Verifiable technical order logs', icon: 'history' }
      ],
      ctaHeading: 'Run your production on PrintPrice OS',
      ctaSub: 'See how your production workflow performs on a system engineered for technical exactness.',
      ctaPrimary: 'Start a project ➔',
      ctaSecondary: 'Contact technical team ➔',
      noSetup: 'NO MANDATORY FIXED FEES',
      footerNote: 'PRINTPRICE OS IS ENGINEERED FOR DEMANDING INDUSTRIAL AND PROFESSIONAL PRINT ENVIRONMENTS.'
    },
    de: {
      label: 'INGENIEURSPRINZIPIEN',
      titlePrimary: 'INGENIEURSWESEN &',
      titleAccent: 'PRODUKTIONSSICHERHEIT',
      subheadline: 'Wir entwickeln die Infrastruktur zur Berechnung, Prüfung und Koordination industrieller Druckproduktion. Von der Kostenkalkulation bis zur Maschinensteuerung: Jeder Schritt wird technisch präzise gesteuert.',
      badgeLine: 'Keine Schätzungen ins Blaue. Keine Annahmen. Methodische Prozesskontrolle.',
      trustSignals: [
        { icon: 'factory', label: 'Echte Produktionsdaten statt Schätzwerte', status: 'VERIFIZIERT' },
        { icon: 'orchestration', label: 'Nachvollziehbare Protokolle jedes Auftrags', status: 'AKTIV' },
        { icon: 'audit', label: 'Deterministische Berechnungslogik', status: 'ANGEWANDT' },
        { icon: 'observability', label: 'Transparente Produktionsschritte', status: 'SICHTBAR' }
      ],
      whatWeBuildHeading: 'Was wir entwickeln',
      whatWeBuildSub: 'Unser Schwerpunkt liegt auf den vier Säulen moderner Druckinfrastruktur.',
      features: [
        { tag: 'KALKULIEREN', icon: 'calculator', title: 'Kalkulationsalgorithmen', desc: 'Wir berechnen reale Fertigungskosten: Substrate, Rüstzeiten und werkstattspezifische Maschinenparameter.' },
        { tag: 'PRÜFEN', icon: 'shield', title: 'Preflight-Systeme', desc: 'Wir prüfen Geometrien, Farbräume und Auflösungen, bevor Druckfarbe auf Papier trifft.' },
        { tag: 'STEUERN', icon: 'orchestration', title: 'Koordinationslogik', desc: 'Wir optimieren die Auftragsverteilung und Terminierung über Druckereien und Papierlieferanten.' },
        { tag: 'PROTOKOLLIEREN', icon: 'policy', title: 'Rückverfolgbarkeit', desc: 'Jede Entscheidung wird protokolliert und den vereinbarten Auftragsspezifikationen zugeordnet.' }
      ],
      narrativeHeading: 'Als geschlossenes System konzipiert, nicht als Einzellösungen',
      narrativeSub: 'Jedes Modul ist Teil eines zusammenhängenden Betriebssystems. Wir bauen keine isolierten Tools, sondern die einheitliche Schicht für die Druckindustrie.',
      modulesLabel: 'KERNMODULE DES SYSTEMS',
      modules: [
        { label: 'Budget (Price It)', icon: 'calculator', val: 'Kostenkalkulation' },
        { label: 'Preflight (Fix It)', icon: 'shield', val: 'Technische Vorabprüfung' },
        { label: 'Print It', icon: 'command', val: 'Druckerei-Marktplatz' },
        { label: 'Control Plane', icon: 'policy', val: 'B2B-Betriebsportal' }
      ],
      givesYouLabel: 'Ihr betrieblicher Mehrwert',
      givesYouItems: [
        { label: 'Echte Fertigungskosten vor Druckbeginn', icon: 'calculator' },
        { label: 'PDF-Validierung vor dem Maschineneinlauf', icon: 'shield' },
        { label: 'Auftragsweiterleitung nach echten Maschinenprofilen', icon: 'orchestration' },
        { label: 'Verifizierbare technische Auftragsprotokolle', icon: 'history' }
      ],
      ctaHeading: 'Steuern Sie Ihre Druckproduktion mit PrintPrice OS',
      ctaSub: 'Erleben Sie, wie Ihre Produktionskette auf einem System läuft, das für technische Zuverlässigkeit entwickelt wurde.',
      ctaPrimary: 'Projekt kalkulieren ➔',
      ctaSecondary: 'Technisches Team kontaktieren ➔',
      noSetup: 'KEINE VERPFLICHTENDEN FIXGEBÜHREN',
      footerNote: 'PRINTPRICE OS WURDE FÜR ANSPRUCHSVOLLE INDUSTRIELLE DRUCKUMGEBUNGEN ENTWICKELT.'
    }
  };

  const t = content[locale] || content.es;

  return (
    <div className="company-page">
      {/* Company Hero */}
      <Section variant="primary" style={{ paddingTop: '10rem' }}>
        <span className="technical-text" style={{ 
          color: 'var(--accent-primary)', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.2rem',
          marginBottom: '1.5rem',
          display: 'block',
          fontWeight: 900
        }}>
          {t.label}
        </span>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 7vw, 5rem)', 
          lineHeight: 1.05, 
          letterSpacing: '-0.05em',
          marginBottom: '2.5rem',
          maxWidth: '850px'
        }}>
          {t.titlePrimary} <br/>
          <span style={{ color: 'var(--accent-primary)' }}>{t.titleAccent}</span>
        </h1>
        <p style={{ 
          fontSize: '1.35rem', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.6, 
          marginBottom: '2rem',
          maxWidth: '680px'
        }}>
          {t.subheadline}
        </p>
        <p className="technical-text" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 800, opacity: 0.9, letterSpacing: '0.05em' }}>
          {t.badgeLine}
        </p>
      </Section>

      {/* Trust Signals Strip */}
      <div style={{ background: 'var(--bg-secondary)', padding: '4rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          {t.trustSignals.map((item, i) => (
            <div key={i} className="trust-item" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.25rem', 
              opacity: 0.8,
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '32px', 
                height: '32px', 
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--accent-primary)'
              }}>
                <Icon name={item.icon as any} size={16} />
              </div>
              <span className="technical-text" style={{ 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                letterSpacing: '0.05em'
              }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
                <span className="technical-text" style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What we build Section */}
      <Section variant="primary" style={{ paddingBlock: '8rem' }}>
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', letterSpacing: '-0.04em', marginBottom: '1.25rem' }}>{t.whatWeBuildHeading}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: 1.6 }}>
            {t.whatWeBuildSub}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {t.features.map((feature, i) => (
            <div key={i} style={{ height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.75rem'
                  }}>
                    <Icon name={feature.icon as any} size={20} />
                  </div>
                  <span className="technical-text" style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--accent-primary)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em',
                    marginBottom: '0.75rem',
                    fontWeight: 900
                  }}>{feature.tag}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.65, marginTop: 'auto' }}>{feature.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* System Narrative */}
      <Section variant="secondary" style={{ paddingBlock: '8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', letterSpacing: '-0.04em', marginBottom: '1.5rem', lineHeight: 1.15 }}>
              {t.narrativeHeading}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '550px' }}>
              {t.narrativeSub}
            </p>
            
            <h4 className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>
              {t.modulesLabel}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {t.modules.map((item, i) => (
                <div key={i} style={{ padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <div className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name={item.icon as any} size={13} />
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '3.5rem', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h4 className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '0.1em', color: 'var(--accent-primary)' }}>
              {t.givesYouLabel}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {t.givesYouItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Icon name={item.icon as any} size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Final Action CTA */}
      <Section variant="primary" style={{ paddingBlock: '8rem' }}>
        <div style={{ 
          padding: 'clamp(3rem, 8vw, 6rem)', 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', letterSpacing: '-0.04em', marginBottom: '1.25rem' }}>
            {t.ctaHeading}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto', lineHeight: 1.6 }}>
            {t.ctaSub}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://budget.printprice.pro" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                {t.ctaPrimary}
              </a>
              <Link href="/contact" className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                {t.ctaSecondary}
              </Link>
            </div>
            <span className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.1em' }}>
              {t.noSetup}
            </span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '6rem', opacity: 0.6 }}>
          <p className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, maxWidth: '650px', marginInline: 'auto', lineHeight: 1.6, letterSpacing: '0.05em' }}>
            {t.footerNote}
          </p>
        </div>
      </Section>
    </div>
  );
}

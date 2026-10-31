'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ProductSurfaceGrid } from "@/components/monolith/ProductSurfaceGrid";
import { WorkflowRail } from "@/components/monolith/WorkflowRail";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { useLocale } from "@/lib/i18n";

export default function PlatformPage() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'ARQUITECTURA DE PLATAFORMA',
      heroTitle: 'DEL PRESUPUESTO A LA PRODUCCIÓN EN UNA SOLA PLATAFORMA',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Sustituye procesos manuales dispersos por un sistema integrado que calcula costes, audita PDFs y conecta con talleres asociados con trazabilidad técnica.',
      heroCtaPrimary: 'Explorar arquitectura ➔',
      heroCtaSecondary: 'Contactar con el equipo técnico',
      gridTitle: 'Arquitectura de módulos de PrintPrice OS',
      gridSubtitle: 'Cada módulo resuelve una fase crítica del ciclo de vida gráfico, desde el presupuesto inicial hasta el taller.',
      products: [
        { 
          category: 'FLUJO PRINCIPAL',
          name: 'Motor de Presupuesto (Price It)', 
          description: 'Calcula costes de impresión en segundos con matrices de máquinas reales.', 
          code: 'budget.printprice.pro', 
          status: 'CORE', 
          priority: true,
          href: 'https://budget.printprice.pro/', 
          ctaText: 'Abrir presupuestador',
          icon: 'calculator'
        },
        { 
          category: 'FLUJO PRINCIPAL',
          name: 'Validación de Archivos (Fix It)', 
          description: 'Audita PDFs técnicos antes de imprenta. Detecta sangrados, tintas y resoluciones.', 
          code: 'preflight.printprice.pro', 
          status: 'VALIDADOR', 
          priority: true,
          href: '/products/preflight', 
          ctaText: 'Comprobar PDFs',
          icon: 'shield'
        },
        { 
          category: 'MARKETPLACE',
          name: 'Marketplace Gráfico (Print It)', 
          description: 'Conecta con imprentas asociadas en Europa con cobro directo de taller.', 
          code: 'printprice.pro/products/print', 
          status: 'RED B2B', 
          priority: true,
          href: '/products/print', 
          ctaText: 'Ver marketplace',
          icon: 'layers'
        },
        { 
          category: 'COMPLEMENTO',
          name: 'Generador de Maquetas 3D', 
          description: 'Visualiza la cubierta y grosor del libro en 3D interactivo.', 
          code: 'mockup.printprice.pro', 
          status: 'VISUALIZADOR', 
          priority: false,
          href: '/products/mockup', 
          ctaText: 'Crear maqueta',
          icon: 'camera'
        },
        { 
          category: 'ESPACIO OPERATIVO',
          name: 'Control Plane', 
          description: 'Consola técnica oficial para talleres de impresión y distribuidores de papel.', 
          code: 'control.printprice.pro', 
          status: 'ORQUESTADOR', 
          href: 'https://control.printprice.pro', 
          ctaText: 'Acceso a Control Plane',
          icon: 'activity'
        },
        { 
          category: 'DESARROLLADORES',
          name: 'Portal API & SDK', 
          description: 'Acceso programable a los motores de cálculo, preflight e imposición.', 
          code: 'api.printprice.pro', 
          status: 'API REST', 
          href: '/developers', 
          ctaText: 'Explorar API',
          icon: 'developer'
        },
        { 
          category: 'DOCUMENTACIÓN',
          name: 'Documentación de Plataforma', 
          description: 'Especificaciones técnicas, contratos de integración y guías de arquitectura.', 
          code: 'docs.printprice.pro', 
          status: 'MANUAL', 
          href: 'https://docs.printprice.pro', 
          ctaText: 'Ver documentación ↗',
          icon: 'specs'
        },
      ],
      flowBadge: 'CAPA DE INTEGRACIÓN',
      flowTitle: 'Datos técnicos unificados. Sin traspasos a ciegas.',
      flowDesc: 'Los datos técnicos fluyen de manera continua entre los distintos módulos: el presupuesto define los pliegos, el preflight valida las geometrías y el pedido se formaliza con especificaciones acordadas.',
      flowChecks: [
        'Cero desfases entre el presupuesto y el archivo final',
        'Trazabilidad técnica vinculada a cada pedido',
        'Cálculo resuelto en servidor con parámetros contrastados'
      ],
      flowSteps: [
        { label: 'Coste calculado', status: 'COMPLETO', href: 'https://budget.printprice.pro/' },
        { label: 'Archivo auditado', status: 'VALIDADO', href: '/products/preflight' },
        { label: 'Maqueta 3D generada', status: 'LISTO', href: '/products/mockup' },
        { label: 'Taller asignado', status: 'PRODUCCIÓN', href: '/products/print' },
      ],
      flowRailTitle: 'FLUJO TÉCNICO VERIFICADO',
      footerLine: 'DATOS DETERMINISTAS. TRAZABILIDAD EN CADA PASO DE PRODUCCIÓN.',
      ctaSectionTitle: 'Evalúa la integración en tu operativa',
      ctaSectionDesc: 'Conversa con nuestros especialistas para adaptar PrintPrice OS al flujo de trabajo de tu editorial o imprenta.',
      ctaSectionBtn: 'Consultar con un especialista ➔'
    },
    en: {
      heroLabel: 'PLATFORM ARCHITECTURE',
      heroTitle: 'FROM PRICING TO PRODUCTION IN ONE PLATFORM',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Replace fragmented manual handoffs with a unified system that determines production costs, audits PDFs, and coordinates printing with technical precision.',
      heroCtaPrimary: 'Explore architecture ➔',
      heroCtaSecondary: 'Contact technical team',
      gridTitle: 'PrintPrice OS Module Architecture',
      gridSubtitle: 'Each module addresses a critical stage of the print lifecycle, from early budgeting to physical press intake.',
      products: [
        { 
          category: 'CORE FLOW',
          name: 'Pricing Engine (Price It)', 
          description: 'Calculate real manufacturing costs in seconds based on press and finishing matrices.', 
          code: 'budget.printprice.pro', 
          status: 'CORE', 
          priority: true,
          href: 'https://budget.printprice.pro/', 
          ctaText: 'Open pricing tool',
          icon: 'calculator'
        },
        { 
          category: 'CORE FLOW',
          name: 'File Preflight (Fix It)', 
          description: 'Audit production PDFs before press delivery. Verify bleeds, color spaces, and resolution.', 
          code: 'preflight.printprice.pro', 
          status: 'VALIDATOR', 
          priority: true,
          href: '/products/preflight', 
          ctaText: 'Audit PDF files',
          icon: 'shield'
        },
        { 
          category: 'MARKETPLACE',
          name: 'Print Marketplace (Print It)', 
          description: 'Connect with specialized European print houses with direct workshop billing.', 
          code: 'printprice.pro/products/print', 
          status: 'B2B NETWORK', 
          priority: true,
          href: '/products/print', 
          ctaText: 'View marketplace',
          icon: 'layers'
        },
        { 
          category: 'COMPLEMENTARY',
          name: '3D Mockup Generator', 
          description: 'Visualize book cover geometry and estimated spine bulk in interactive 3D.', 
          code: 'mockup.printprice.pro', 
          status: 'VISUALIZER', 
          priority: false,
          href: '/products/mockup', 
          ctaText: 'Create mockup',
          icon: 'camera'
        },
        { 
          category: 'OPERATIONS SPACE',
          name: 'Control Plane', 
          description: 'Official operational console for print houses and paper suppliers.', 
          code: 'control.printprice.pro', 
          status: 'ORCHESTRATOR', 
          href: 'https://control.printprice.pro', 
          ctaText: 'Access Control Plane',
          icon: 'activity'
        },
        { 
          category: 'DEVELOPERS',
          name: 'API & SDK Portal', 
          description: 'Programmable access to pricing engines, preflight verification, and routing.', 
          code: 'api.printprice.pro', 
          status: 'REST API', 
          href: '/developers', 
          ctaText: 'Explore API',
          icon: 'developer'
        },
        { 
          category: 'DOCUMENTATION',
          name: 'Platform Documentation', 
          description: 'Technical specs, integration contracts, and architecture blueprints.', 
          code: 'docs.printprice.pro', 
          status: 'DOCS', 
          href: 'https://docs.printprice.pro', 
          ctaText: 'Read documentation ↗',
          icon: 'specs'
        },
      ],
      flowBadge: 'INTEGRATION LAYER',
      flowTitle: 'Unified technical data. Zero blind handoffs.',
      flowDesc: 'Technical parameters flow continuously between modules: pricing establishes sheet layouts, preflight audits page boxes, and orders are executed against agreed specifications.',
      flowChecks: [
        'Zero discrepancy between estimate parameters and final PDF',
        'Technical order logging linked to every job',
        'Server-side calculation against verified machine matrices'
      ],
      flowSteps: [
        { label: 'Cost determined', status: 'DONE', href: 'https://budget.printprice.pro/' },
        { label: 'PDF validated', status: 'VALIDATED', href: '/products/preflight' },
        { label: '3D preview generated', status: 'READY', href: '/products/mockup' },
        { label: 'Shop assigned', status: 'PRODUCTION', href: '/products/print' },
      ],
      flowRailTitle: 'VERIFIED TECHNICAL FLOW',
      footerLine: 'DETERMINISTIC DATA. ACCOUNTABILITY AT EVERY PRODUCTION STEP.',
      ctaSectionTitle: 'Evaluate platform integration',
      ctaSectionDesc: 'Speak with our engineering specialists to adapt PrintPrice OS to your publishing or print facility workflow.',
      ctaSectionBtn: 'Consult an architect ➔'
    },
    de: {
      heroLabel: 'PLATTFORMARCHITEKTUR',
      heroTitle: 'VOM ANGEBOT BIS ZUR PRODUKTION IN EINER PLATTFORM',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Ersetzen Sie isolierte manuelle Schritte durch ein integriertes System, das Fertigungskosten berechnet, Druck-PDFs prüft und Aufträge technisch koordiniert.',
      heroCtaPrimary: 'Architektur erkunden ➔',
      heroCtaSecondary: 'Technisches Team kontaktieren',
      gridTitle: 'Modul-Architektur von PrintPrice OS',
      gridSubtitle: 'Jedes Modul steuert eine entscheidende Phase im Lebenszyklus der Druckproduktion – von der Kalkulation bis zur Druckmaschine.',
      products: [
        { 
          category: 'KERN-WORKFLOW',
          name: 'Kalkulationsmotor (Price It)', 
          description: 'Berechnet Druckkosten in Sekunden auf Basis realer Maschinenmatrizen.', 
          code: 'budget.printprice.pro', 
          status: 'CORE', 
          priority: true,
          href: 'https://budget.printprice.pro/', 
          ctaText: 'Kalkulator öffnen',
          icon: 'calculator'
        },
        { 
          category: 'KERN-WORKFLOW',
          name: 'Dateivalidierung (Fix It)', 
          description: 'Prüft Druck-PDFs vor der Drucklegung auf Anschnitt, Farbräume und Auflösungen.', 
          code: 'preflight.printprice.pro', 
          status: 'VALIDATOR', 
          priority: true,
          href: '/products/preflight', 
          ctaText: 'PDF prüfen',
          icon: 'shield'
        },
        { 
          category: 'MARKTPLATZ',
          name: 'Druckmarktplatz (Print It)', 
          description: 'Direkte Verbindung zu europäischen Partnerdruckereien mit Abrechnung durch den Betrieb.', 
          code: 'printprice.pro/products/print', 
          status: 'B2B-NETZWERK', 
          priority: true,
          href: '/products/print', 
          ctaText: 'Marktplatz ansehen',
          icon: 'layers'
        },
        { 
          category: 'KOMPLEMENTÄR',
          name: '3D-Buch-Mockup', 
          description: 'Visualisiert Umschlaggestaltung und berechnete Rückenbreite interaktiv in 3D.', 
          code: 'mockup.printprice.pro', 
          status: 'VISUALISIERER', 
          priority: false,
          href: '/products/mockup', 
          ctaText: 'Mockup erstellen',
          icon: 'camera'
        },
        { 
          category: 'BETRIEBSPORTAL',
          name: 'Control Plane', 
          description: 'Offizielle technische Konsole für Druckereien und Papiergroßhändler.', 
          code: 'control.printprice.pro', 
          status: 'ORCHESTRATOR', 
          href: 'https://control.printprice.pro', 
          ctaText: 'Control Plane öffnen',
          icon: 'activity'
        },
        { 
          category: 'ENTWICKLER',
          name: 'API & SDK Portal', 
          description: 'Programmierbarer Zugriff auf Preiskalkulation, Preflight und Ausschusslogik.', 
          code: 'api.printprice.pro', 
          status: 'REST-API', 
          href: '/developers', 
          ctaText: 'API erkunden',
          icon: 'developer'
        },
        { 
          category: 'DOKUMENTATION',
          name: 'Plattform-Dokumentation', 
          description: 'Technische Spezifikationen, Integrationsverträge und Systemarchitektur.', 
          code: 'docs.printprice.pro', 
          status: 'DOKU', 
          href: 'https://docs.printprice.pro', 
          ctaText: 'Doku ansehen ↗',
          icon: 'specs'
        },
      ],
      flowBadge: 'INTEGRATIONSSCHICHT',
      flowTitle: 'Einheitliche technische Daten. Keine Medienbrüche.',
      flowDesc: 'Technische Daten fließen durchgängig zwischen den Modulen: Die Kalkulation definiert die Bogenformate, der Preflight prüft die Geometrien und der Auftrag wird nach Spezifikation gefertigt.',
      flowChecks: [
        'Keine Abweichungen zwischen Angebot und endgültiger PDF-Datei',
        'Technische Auftragsprotokolle für jeden Druckauftrag',
        'Serverbasierte Berechnung nach verifizierten Maschinenparametern'
      ],
      flowSteps: [
        { label: 'Kosten kalkuliert', status: 'ERLEDIGT', href: 'https://budget.printprice.pro/' },
        { label: 'PDF geprüft', status: 'VALIDIERT', href: '/products/preflight' },
        { label: '3D-Vorschau erzeugt', status: 'BEREIT', href: '/products/mockup' },
        { label: 'Druckerei zugeordnet', status: 'PRODUKTION', href: '/products/print' },
      ],
      flowRailTitle: 'VERIFIZIERTER TECHNISCHER ABLAUF',
      footerLine: 'DETERMINISTISCHE DATEN. ZUVERLÄSSIGKEIT IN JEDER FERTIGUNGSPHASE.',
      ctaSectionTitle: 'Bewerten Sie die Integration in Ihren Betrieb',
      ctaSectionDesc: 'Sprechen Sie mit unseren Technik-Spezialisten über den Einsatz von PrintPrice OS in Ihrem Verlag oder Ihrer Druckerei.',
      ctaSectionBtn: 'Fachberatung anfragen ➔'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="platform-page">
      {/* Intro Section */}
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroCtaPrimary, href: "#architecture" }}
        secondaryAction={{ label: t.heroCtaSecondary, href: "/contact" }}
        variant="particles"
      />

      {/* The Surfaces Grid */}
      <div id="architecture">
        <ProductSurfaceGrid 
          title={t.gridTitle}
          subtitle={t.gridSubtitle}
          variant="secondary"
          showGrid={false}
          products={t.products as any}
        />
      </div>

      {/* The Workflow Section */}
      <Section variant="primary" showGrid={false}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: 'clamp(3rem, 8vw, 6rem)', alignItems: 'center' }}>
          <div>
            <h4 className="technical-text" style={{ 
              fontSize: '0.75rem', 
              color: 'var(--accent-primary)', 
              marginBottom: '1.25rem',
              letterSpacing: '0.15em',
              fontWeight: 900
            }}>
              {t.flowBadge}
            </h4>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', letterSpacing: '-0.04em', marginBottom: '1.75rem', lineHeight: 1.15 }}>
              {t.flowTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.15rem', marginBottom: '2.5rem', maxWidth: '50ch' }}>
              {t.flowDesc}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem', padding: 0 }}>
              {t.flowChecks.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)', flexShrink: 0 }}></div>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.6, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em' }} className="technical-text">
              <span style={{ color: 'var(--text-primary)' }}>PRICE IT</span>
              <span style={{ color: 'var(--accent-primary)' }}>→</span>
              <span style={{ color: 'var(--accent-primary)' }}>FIX IT</span>
              <span style={{ color: 'var(--accent-primary)' }}>→</span>
              <span style={{ color: 'var(--text-primary)' }}>PRINT IT</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <WorkflowRail 
              title={t.flowRailTitle}
              steps={t.flowSteps}
            />
            
            <div className="technical-text" style={{ 
              position: 'absolute', 
              bottom: '-2rem', 
              right: 0, 
              fontSize: '0.65rem', 
              opacity: 0.6,
              letterSpacing: '0.08em'
            }}>
              STATUS: ARCHITECTURE_VALIDATED
            </div>
          </div>
        </div>

        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '3rem', textAlign: 'center', opacity: 0.7 }}>
          <p className="technical-text" style={{ fontSize: '0.85rem', letterSpacing: '0.12em', fontWeight: 800, color: 'var(--accent-primary)' }}>
            {t.footerLine}
          </p>
        </div>
      </Section>

      {/* Final platform CTA */}
      <ActionCTA 
        slogan="PRINTPRICE OS ARQUITECTURA"
        title={t.ctaSectionTitle}
        description={t.ctaSectionDesc}
        buttonLabel={t.ctaSectionBtn}
        buttonHref="/contact"
        trackingAction="platform_cta_architect"
      />
    </div>
  );
}

'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

export default function ControlPage() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'ESPACIO OPERATIVO / CONTROL PLANE',
      heroTitle: 'CONSOLA OPERATIVA PARA IMPRENTAS Y PROVEEDORES',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'El espacio técnico de trabajo para talleres gráficos y proveedores de papel: calibración de maquinaria, configuración de pliegos, conexión de catálogo maestro y recepción de pedidos verificados.',
      heroCtaPrimary: 'Acceder a Control Plane ➔',
      heroCtaSecondary: 'Ver consola técnica ↓',
      authorityTag: 'TRAZABILIDAD EN CADA PEDIDO • SIN ESTADOS OCULTOS • ESPECIFICACIONES VINCULADAS',
      visibilityBadge: 'VISIBILIDAD OPERATIVA',
      visibilityHeading: 'Dentro de Control Plane',
      visibilityChecks: [
        'Seguimiento técnico de pedidos',
        'Monitorización de colas de taller',
        'Gestión de parque de máquinas',
        'Políticas de validación de entrada',
        'Histórico auditable de trabajos',
        'Detección de anomalías en archivo'
      ],
      governanceLink: 'VER CAPA DE GOBERNANZA Y REGLAS TÉCNICAS ➔',
      statusEnv: 'ENTORNO DE TALLER B2B',
      statusArch: 'ARQUITECTURA PRINTPRICE OS',
      statusRegion: 'REGIÓN: UE (CENTROS DE DATOS EUROPEOS)',
      statusFeed: 'CONSOLA EN VIVO',
      kpis: [
        { label: 'Registro de Trabajos', val: '1.250' },
        { label: 'Cumplimiento de Especificaciones', val: '98,0%' },
        { label: 'Latencia de Verificación', val: '450ms' },
        { label: 'Colas en Retención', val: '0' },
      ],
      features: [
        { 
          icon: 'orchestration', 
          tag: 'COORDINACIÓN', 
          title: 'Coordinación de Trabajos', 
          desc: 'Cada encargo gráfico se monitoriza con especificaciones técnicas vinculadas al pedido acordado.' 
        },
        { 
          icon: 'queue', 
          tag: 'COLAS Y FLUJO', 
          title: 'Control de Colas en Planta', 
          desc: 'Organiza la entrada de artes finales validadas por preflight a tus colas de preimpresión e imposición.' 
        },
        { 
          icon: 'eye', 
          tag: 'OBSERVABILIDAD', 
          title: 'Trazabilidad de Taller', 
          desc: 'Visibilidad completa sobre estados de trabajo, pliegos asignados y mermas sin pasos intermedios oscuros.' 
        },
        { 
          icon: 'history', 
          tag: 'GOBERNANZA', 
          title: 'Registro de Especificaciones', 
          desc: 'Cada decisión técnica queda registrada para respaldar la calidad y resolver cualquier discrepancia de fabricación.' 
        },
        { 
          icon: 'alert', 
          tag: 'PREVENCIÓN', 
          title: 'Detección de Inconsistencias', 
          desc: 'Identifica defectos de archivo antes de imprimir: sangrado, tintas directas no convertidas o cajas de corte erróneas.' 
        },
      ],
      operationsViewTitle: 'Vista operativa en tiempo real',
      operationsViewSub: 'Gestiona máquinas, sustratos y pedidos en una consola diseñada para la realidad técnica de las plantas gráficas.',
      governanceTitle: 'POLÍTICAS ACTIVAS EN PLATAFORMA',
      governanceItems: [
        { name: 'Protocolo de Soberanía y Residencia de Datos en la UE', status: 'APLICADO' },
        { name: 'Aislamiento Estricto de Datos de Taller (Multi-Tenant)', status: 'APLICADO' },
        { name: 'Bloqueo de Ejecución Determinista de Cálculo', status: 'ESTABLE' },
      ],
      clusterTitle: 'ESTADO DE NODOS DE PREFLIGHT',
      clusterNodes: '32 NODOS DISPONIBLES',
      systemNominal: 'ESTADO TÉCNICO NOMINAL',
      substrip: ['CADA TRABAJO AUDITADO', 'ESPECIFICACIONES VINCULADAS', 'HISTÓRICO PRESERVADO'],
      ctaSlogan: 'ESPACIO OPERATIVO CANÓNICO',
      ctaTitle: 'Conecta tu taller a Control Plane',
      ctaDesc: 'Configura tus máquinas y recibe artes finales preflight auditadas con tarifas basadas en tus costes reales.',
      ctaBtn: 'Abrir Control Plane ➔'
    },
    en: {
      heroLabel: 'OPERATIONS SPACE / CONTROL PLANE',
      heroTitle: 'OPERATIONAL CONSOLE FOR PRINTERS & SUPPLIERS',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'The technical working console for print houses and paper suppliers: machinery calibration, press sheet configuration, master paper catalog linking, and intake of audited jobs.',
      heroCtaPrimary: 'Access Control Plane ➔',
      heroCtaSecondary: 'Explore technical console ↓',
      authorityTag: 'TRACEABILITY IN EVERY ORDER • NO HIDDEN STATES • LINKED SPECIFICATIONS',
      visibilityBadge: 'OPERATIONAL VISIBILITY',
      visibilityHeading: 'Inside the Control Plane',
      visibilityChecks: [
        'Technical order tracking',
        'Plant intake queue monitoring',
        'Press & finishing fleet profiling',
        'Intake validation policies',
        'Auditable production history',
        'File anomaly detection'
      ],
      governanceLink: 'EXPLORE GOVERNANCE & TECHNICAL POLICIES ➔',
      statusEnv: 'B2B MANUFACTURING ENVIRONMENT',
      statusArch: 'PRINTPRICE OS ARCHITECTURE',
      statusRegion: 'REGION: EU (EUROPEAN DATA CENTERS)',
      statusFeed: 'LIVE CONSOLE',
      kpis: [
        { label: 'Job Registry', val: '1,250' },
        { label: 'Specification Compliance', val: '98.0%' },
        { label: 'Verification Latency', val: '450ms' },
        { label: 'Held Inactive Queues', val: '0' },
      ],
      features: [
        { 
          icon: 'orchestration', 
          tag: 'ORCHESTRATION', 
          title: 'Job Coordination', 
          desc: 'Every print job is monitored against agreed specifications tied directly to the confirmed work order.' 
        },
        { 
          icon: 'queue', 
          tag: 'QUEUES & FLOW', 
          title: 'Press Intake Queues', 
          desc: 'Manage the flow of preflight-verified production files into your prepress RIP and imposition queues.' 
        },
        { 
          icon: 'eye', 
          tag: 'OBSERVABILITY', 
          title: 'Facility Observability', 
          desc: 'Complete transparency into production states, assigned sheet sizes, and makeready without hidden handoffs.' 
        },
        { 
          icon: 'history', 
          tag: 'GOVERNANCE', 
          title: 'Specification Logging', 
          desc: 'Every technical parameter is permanently logged to uphold quality standards and support dispute resolution.' 
        },
        { 
          icon: 'alert', 
          tag: 'PREVENTION', 
          title: 'Inconsistency Detection', 
          desc: 'Identify prepress anomalies before physical plate making: missing bleeds, unmapped spot inks, or wrong trim boxes.' 
        },
      ],
      operationsViewTitle: 'Real-time operations view',
      operationsViewSub: 'Manage presses, paper stocks, and job orders in an operational layer built for industrial reality.',
      governanceTitle: 'ACTIVE PLATFORM POLICIES',
      governanceItems: [
        { name: 'EU Data Sovereignty & Hosting Protocol', status: 'ENFORCED' },
        { name: 'Strict Tenant Commercial Data Isolation', status: 'ENFORCED' },
        { name: 'Deterministic Calculation Lock', status: 'STABLE' },
      ],
      clusterTitle: 'PREFLIGHT WORKER CLUSTER',
      clusterNodes: '32 NODES AVAILABLE',
      systemNominal: 'SYSTEM NOMINAL',
      substrip: ['EVERY JOB AUDITED', 'LINKED SPECIFICATIONS', 'PRESERVED HISTORY'],
      ctaSlogan: 'CANONICAL OPERATIONS SPACE',
      ctaTitle: 'Connect your facility to Control Plane',
      ctaDesc: 'Profile your presses and receive audited preflight files with pricing calculated from your actual shop rates.',
      ctaBtn: 'Open Control Plane ➔'
    },
    de: {
      heroLabel: 'BETRIEBSPORTAL / CONTROL PLANE',
      heroTitle: 'BETRIEBSKONSOLE FÜR DRUCKEREIEN & PAPIERHÄNDLER',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Die technische Arbeitskonsole für Druckereien und Papierlieferanten: Maschinenkalibrierung, Bogenformat-Hinterlegung, Masterkatalog-Verbindung und geprüfte Auftragseingänge.',
      heroCtaPrimary: 'Control Plane öffnen ➔',
      heroCtaSecondary: 'Betriebskonsole ansehen ↓',
      authorityTag: 'RÜCKVERFOLGBARKEIT JEDES AUFTRAGS • KEINE VERDECKTEN STATUS • GEBUNDENE SPEZIFIKATIONEN',
      visibilityBadge: 'BETRIEBLICHE TRANSPARENZ',
      visibilityHeading: 'Im Inneren des Control Plane',
      visibilityChecks: [
        'Technische Auftragsverfolgung',
        'Überwachung von Vorstufen-Warteschlangen',
        'Profilierung des Maschinenparks',
        'Eingangsprüfungs-Richtlinien',
        'Auditierbare Auftragshistorie',
        'Erkennung technischer PDF-Abweichungen'
      ],
      governanceLink: 'GOVERNANCE & TECHNISCHE REGELN ANSEHEN ➔',
      statusEnv: 'B2B-PRODUKTIONSUMGEBUNG',
      statusArch: 'PRINTPRICE OS ARCHITEKTUR',
      statusRegion: 'REGION: EU (EUROPÄISCHE RECHENZENTREN)',
      statusFeed: 'LIVE-KONSOLE',
      kpis: [
        { label: 'Auftragsverzeichnis', val: '1.250' },
        { label: 'Spezifikationstreue', val: '98,0%' },
        { label: 'Prüflatenz', val: '450ms' },
        { label: 'Blockierte Warteschlangen', val: '0' },
      ],
      features: [
        { 
          icon: 'orchestration', 
          tag: 'KOORDINATION', 
          title: 'Auftragskoordination', 
          desc: 'Jeder Druckauftrag wird anhand der im Auftrag vereinbarten technischen Spezifikationen überwacht.' 
        },
        { 
          icon: 'queue', 
          tag: 'WARTESCHLANGEN', 
          title: 'Steuerung der Betriebswarteschlange', 
          desc: 'Verwalten Sie den Zulauf preflight-geprüfter Druckdaten in Ihre RIP- und Ausschießsysteme.' 
        },
        { 
          icon: 'eye', 
          tag: 'TRANSPARENZ', 
          title: 'Betriebstransparenz', 
          desc: 'Lückenlose Sicht auf Produktionsschritte, Bogenformate und Rüstzeiten ohne Medienbrüche.' 
        },
        { 
          icon: 'history', 
          tag: 'GOVERNANCE', 
          title: 'Protokollierte Spezifikationen', 
          desc: 'Jeder Parameter wird revisionssicher gespeichert, um Qualitätsstandards zu sichern und Reklamationen vorzubeugen.' 
        },
        { 
          icon: 'alert', 
          tag: 'PRÄVENTION', 
          title: 'Fehlerfrüherkennung', 
          desc: 'Erkennt Vorstufenfehler vor der Plattenbelichtung: fehlender Anschnitt, Sonderfarben oder falsche TrimBoxes.' 
        },
      ],
      operationsViewTitle: 'Echtzeit-Betriebsübersicht',
      operationsViewSub: 'Steuern Sie Maschinen, Papiere und Aufträge in einer Konsole, die für die industrielle Druckpraxis gebaut wurde.',
      governanceTitle: 'AKTIVE SYSTEMRICHTLINIEN',
      governanceItems: [
        { name: 'EU-Datensouveränität & Hosting-Protokoll', status: 'ANGEWANDT' },
        { name: 'Strikte Mandantentrennung für Betriebsdaten', status: 'ANGEWANDT' },
        { name: 'Deterministische Berechnungssperre', status: 'STABIL' },
      ],
      clusterTitle: 'PREFLIGHT-WORKER-CLUSTER',
      clusterNodes: '32 KNOTEN VERFÜGBAR',
      systemNominal: 'SYSTEMSTATUS NOMINAL',
      substrip: ['JEDER AUFTRAG GEPRÜFT', 'GEBUNDENE SPEZIFIKATIONEN', 'GESICHERTE HISTORIE'],
      ctaSlogan: 'OFFIZIELLES BETRIEBSPORTAL',
      ctaTitle: 'Verbinden Sie Ihre Druckerei mit Control Plane',
      ctaDesc: 'Hinterlegen Sie Ihren Maschinenpark und erhalten Sie geprüfte Druckdateien mit Preisen basierend auf Ihren realen Kosten.',
      ctaBtn: 'Control Plane öffnen ➔'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="product-page" data-monolith-action="control_view">
      {/* Product Hero */}
      <HeroPlatform
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroCtaPrimary, href: "https://control.printprice.pro" }}
        secondaryAction={{ label: t.heroCtaSecondary, href: "#preview" }}
        variant="particles"
      />

      {/* Authority Tagline */}
      <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '5rem', opacity: 0.7 }}>
        <p className="technical-text" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--accent-primary)', fontWeight: 800 }}>
          {t.authorityTag}
        </p>
      </div>

      {/* System State Simulation */}
      <Section variant="primary" id="preview">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '1.25rem', letterSpacing: '0.15em', fontWeight: 900 }}>
              {t.visibilityBadge}
            </h4>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', letterSpacing: '-0.04em', marginBottom: '1.5rem', lineHeight: 1.15 }}>
              {t.visibilityHeading}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2.5rem' }}>
              {t.visibilityChecks.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)', flexShrink: 0 }}></div>
                  <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3.5rem' }}>
              <Link href="/governance" style={{ textDecoration: 'none' }}>
                <span className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', borderBottom: '1px solid currentColor', paddingBottom: '2px', fontWeight: 900 }}>
                  {t.governanceLink}
                </span>
              </Link>
            </div>
          </div>

          <div style={{ 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--border-color)', 
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h5 className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6 }}>{t.statusArch}</h5>
              <div className="technical-text" style={{ fontSize: '0.7rem', color: '#00cc66', background: 'rgba(0,204,102,0.1)', padding: '0.2rem 0.5rem', fontWeight: 900 }}>
                {t.statusFeed}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                <span className="technical-text" style={{ fontSize: '0.8rem' }}>JOB_REGISTRY</span>
                <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent-primary)' }}>RUNNING [142]</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                <span className="technical-text" style={{ fontSize: '0.8rem' }}>QUEUE_DEPTH</span>
                <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900 }}>ACTIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                <span className="technical-text" style={{ fontSize: '0.8rem' }}>WORKER_NODES</span>
                <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900, color: '#00cc66' }}>HEALTHY</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                <span className="technical-text" style={{ fontSize: '0.8rem' }}>POLICY_LAYER</span>
                <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900 }}>ENFORCED</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="technical-text" style={{ fontSize: '0.8rem' }}>AUDIT_LOG</span>
                <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900 }}>RECORDED</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Feature Grid */}
      <Section variant="secondary" id="features">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {t.features.map((feature, i) => (
            <div key={i} style={{ height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{
                  padding: '2.5rem',
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
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: 'auto' }}>{feature.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* Real-time KPI Console Preview */}
      <Section variant="primary">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', marginBottom: '1rem' }}>{t.operationsViewTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            {t.operationsViewSub}
          </p>
        </div>

        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '2px', 
          border: '1px solid var(--border-color)', 
          boxShadow: '0 40px 80px rgba(0,0,0,0.2)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ background: 'var(--bg-primary)', padding: 'clamp(2rem, 5vw, 3.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="technical-text" style={{ fontSize: '0.7rem', fontWeight: 900 }}>{t.statusEnv}</span>
                <span className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.7 }}>{t.statusRegion}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', background: '#00cc66', borderRadius: '50%' }}></div>
                <span className="technical-text" style={{ fontSize: '0.7rem', color: '#00cc66', fontWeight: 900 }}>{t.systemNominal}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
              {t.kpis.map((kpi, i) => (
                <div key={i} style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <div className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.5rem', fontWeight: 800 }}>{kpi.label}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{kpi.val}</div>
                </div>
              ))}
            </div>

            <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', background: 'rgba(255,255,255,0.01)' }}>
              <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                {t.governanceTitle}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {t.governanceItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: idx < t.governanceItems.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                    <span className="technical-text" style={{ fontSize: '0.8rem', opacity: 0.8 }}>{item.name}</span>
                    <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 5rem)', marginTop: '4rem', flexWrap: 'wrap' }}>
          {t.substrip.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.7 }}>
              <div style={{ width: '8px', height: '1px', background: 'var(--accent-primary)' }}></div>
              <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.1em' }}>{item}</span>
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
        buttonHref="https://control.printprice.pro"
        trackingAction="control_open"
      />
    </div>
  );
}

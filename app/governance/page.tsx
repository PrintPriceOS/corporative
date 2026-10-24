'use client';

import React from 'react';
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { useLocale } from "@/lib/i18n";

export default function GovernancePage() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'CONTROL DE PRODUCCIÓN & POLÍTICAS TÉCNICAS',
      heroTitle: 'PRODUCCIÓN VERIFICABLE Y DETERMINISTA',
      heroSlogan: ["REGISTRO", "CONTROL", "TRAZABILIDAD"],
      heroSub: 'Validación técnica previa, control estructurado de estados y trazabilidad en cada fase. Aplicamos políticas deterministas para evitar anomalías en máquina y sobrecostes imprevistos.',
      heroCtaPrimary: 'Abrir Control Plane ➔',
      heroCtaSecondary: 'Ver principios técnicos ↓',
      substrip: [
        'CADA ACCIÓN QUEDA REGISTRADA',
        'SIN EJECUCIONES SILENCIOSAS',
        'TRAZABILIDAD TÉCNICA DE PEDIDO'
      ],
      systemTrustLabel: 'CONFIANZA DEL SISTEMA',
      systemTrustTitle: 'Cómo mantenemos la fiabilidad del sistema',
      systemTrustSub: 'Traducimos la complejidad de la preimpresión en seguridad operativa. Cada cálculo y validación sigue un flujo determinista para eliminar comportamientos imprevisibles.',
      systemTrustItems: [
        { icon: 'history', title: 'Registro técnico de cada acción', desc: 'Cada operación genera un registro verificable vinculado al pedido. Ningún cambio de estado ocurre en silencio.' },
        { icon: 'command', title: 'Ejecución determinista', desc: 'Los mismos parámetros de entrada y archivo generan exactamente el mismo resultado de cálculo e imposición.' },
        { icon: 'policy', title: 'Políticas técnicas automáticas', desc: 'El motor evalúa reglas de sangrado, perfiles de color y resolución impidiendo avanzar con archivos manifiestamente corruptos.' },
        { icon: 'eye', title: 'Trazabilidad de especificaciones', desc: 'Desde el presupuesto hasta la orden de taller, los requisitos quedan vinculados al contrato del pedido acordado.' },
        { icon: 'shield', title: 'Aislamiento estricto de actores', desc: 'Las imprentas y distribuidores operan con partición multi-tenant completa, protegiendo sus costes de maquinaria.' },
        { icon: 'alert', title: 'Control estructurado de anomalías', desc: 'Los errores se detectan y notifican con mensajes claros de subsanación técnica sin suposiciones.' }
      ],
      impactLabel: 'IMPACTO OPERATIVO:',
      impactItems: [
        '• MENOS PARADAS INNECESARIAS EN TALLER',
        '• REDUCCIÓN DE REIMPRESIONES POR FALLO DE ARCHIVO',
        '• PARÁMETROS TÉCNICOS TRANSPARENTES'
      ],
      failureBlockTitle: 'EJEMPLO: ANOMALÍA CONTROLADA',
      failureSteps: [
        'ARCHIVO CON SANGRADO INSUFICIENTE DETECTADO',
        'Alerta técnica emitida al usuario',
        'Política de guillotinado aplicada',
        'PEDIDO DETENIDO ANTES DE MÁQUINA'
      ],
      principlesHeading: 'Principios Fundamentales',
      principlesSub: 'Tres pilares metodológicos de control en fabricación gráfica.',
      principles: [
        { tag: 'Seguridad', icon: 'shield', title: 'Validación Previa', desc: 'El sistema audita geometrías y cajas de página antes de formalizar la producción, evitando sorpresas al pie de máquina.' },
        { tag: 'Auditoría', icon: 'history', title: 'Registro Técnico', desc: 'Cada presupuesto y archivo final conserva su registro técnico verificable y sus tolerancias acordadas.' },
        { tag: 'Control', icon: 'command', title: 'Rigor Determinista', desc: 'Diseñado para imprentas industriales y editoriales: cálculo en servidor con parámetros contrastados.' }
      ],
      integrityHeading: 'Integridad y Alojamiento',
      integritySub: 'Infraestructura alojada en centros de datos de la Unión Europea bajo el marco del RGPD y con estricta separación multi-tenant de datos comerciales.',
      integrityBadges: [
        'ALOJAMIENTO EN LA UNIÓN EUROPEA',
        'DISEÑO SEGÚN PRINCIPIOS RGPD'
      ],
      statusLabel: 'ESTADO DE SERVICIOS TÉCNICOS',
      statusRefresh: 'REFRESCO EN TIEMPO REAL',
      statusItems: [
        { name: 'PREFLIGHT ENGINE', val: 'ACTIVO' },
        { name: 'MOTOR DE PRECIOS', val: 'APLICADO' },
        { name: 'TRAZABILIDAD', val: 'REGISTRADO' },
        { name: 'ESTADO DEL SISTEMA', val: 'CONSISTENTE' }
      ],
      layerTrust: 'PROTOCOLO DE CONTROL TÉCNICO Y TRAZABILIDAD / PRINTPRICE OS',
      ctaSlogan: 'ESPACIO OPERATIVO',
      ctaTitle: 'Inicia un proyecto con control técnico',
      ctaDesc: 'Especificaciones claras, validación forense y enrutamiento con imprentas adscritas.',
      ctaBtn: 'Acceder a Control Plane ➔'
    },
    en: {
      heroLabel: 'PRODUCTION CONTROL & TECHNICAL POLICIES',
      heroTitle: 'VERIFIABLE & DETERMINISTIC PRODUCTION',
      heroSlogan: ["RECORD", "CONTROL", "TRACEABILITY"],
      heroSub: 'Prior technical validation, structured state management, and traceability at every stage. We apply deterministic rules to prevent press room anomalies and unexpected reprints.',
      heroCtaPrimary: 'Open Control Plane ➔',
      heroCtaSecondary: 'View technical principles ↓',
      substrip: [
        'EVERY ACTION IS LOGGED',
        'NO SILENT EXECUTIONS',
        'TECHNICAL ORDER TRACEABILITY'
      ],
      systemTrustLabel: 'SYSTEM TRUST',
      systemTrustTitle: 'How we maintain system reliability',
      systemTrustSub: 'We translate prepress complexity into operational safety. Every calculation and validation follows a deterministic path to eliminate unpredictable behavior.',
      systemTrustItems: [
        { icon: 'history', title: 'Verifiable record of every action', desc: 'Each operation generates a verifiable log tied to the job. No status changes occur silently.' },
        { icon: 'command', title: 'Deterministic execution', desc: 'The exact same input parameters and source file always produce the identical calculation and imposition result.' },
        { icon: 'policy', title: 'Automatic technical policies', desc: 'The engine inspects bleeds, color spaces, and resolution, preventing corrupt or broken files from proceeding.' },
        { icon: 'eye', title: 'Specification traceability', desc: 'From initial quote to plant work order, technical requirements remain linked to agreed order specifications.' },
        { icon: 'shield', title: 'Strict actor isolation', desc: 'Print houses and paper merchants operate under complete multi-tenant partitioning, protecting commercial rates.' },
        { icon: 'alert', title: 'Structured anomaly handling', desc: 'Issues are flagged with clear technical remediation instructions, without guessing or hidden states.' }
      ],
      impactLabel: 'OPERATIONAL IMPACT:',
      impactItems: [
        '• FEWER UNNECESSARY PRESS ROOM DELAYS',
        '• REDUCTION IN FILE-RELATED REPRINTS',
        '• TRANSPARENT TECHNICAL SPECIFICATIONS'
      ],
      failureBlockTitle: 'EXAMPLE: CONTROLLED ANOMALY',
      failureSteps: [
        'INSUFFICIENT BLEED DETECTED IN PDF',
        'Technical advisory issued to customer',
        'Trimming safety policy applied',
        'JOB SAFELY BLOCKED BEFORE PRESS TIME'
      ],
      principlesHeading: 'Core Principles',
      principlesSub: 'Three methodological pillars for manufacturing control in the graphic arts.',
      principles: [
        { tag: 'Safety', icon: 'shield', title: 'Prior Preflight Validation', desc: 'The system audits geometry and page boxes before committing jobs to press, eliminating surprises at the guillotine.' },
        { tag: 'Audit', icon: 'history', title: 'Technical Logging', desc: 'Every quote and final file preserves a verifiable technical record with agreed specifications.' },
        { tag: 'Control', icon: 'command', title: 'Deterministic Rigor', desc: 'Engineered for industrial print houses and publishers: server-side calculation with verified matrices.' }
      ],
      integrityHeading: 'System Integrity & Hosting',
      integritySub: 'Infrastructure hosted in European Union data centers under GDPR compliance standards, featuring strict multi-tenant isolation for commercial data.',
      integrityBadges: [
        'HOSTED IN THE EUROPEAN UNION',
        'GDPR-ALIGNED BY DESIGN'
      ],
      statusLabel: 'TECHNICAL SERVICES STATUS',
      statusRefresh: 'REAL-TIME REFRESH',
      statusItems: [
        { name: 'PREFLIGHT ENGINE', val: 'ACTIVE' },
        { name: 'PRICING ENGINE', val: 'ENFORCED' },
        { name: 'AUDIT LOGGING', val: 'RECORDED' },
        { name: 'SYSTEM INTEGRITY', val: 'CONSISTENT' }
      ],
      layerTrust: 'TECHNICAL GOVERNANCE & TRACEABILITY PROTOCOL / PRINTPRICE OS',
      ctaSlogan: 'OPERATIONS SPACE',
      ctaTitle: 'Run a project with technical governance',
      ctaDesc: 'Agreed specifications, forensic validation, and routing to specialized partner plants.',
      ctaBtn: 'Access Control Plane ➔'
    },
    de: {
      heroLabel: 'PRODUKTIONSKONTROLLE & TECHNISCHE REGELN',
      heroTitle: 'VERIFIZIERBARE & DETERMINISTISCHE PRODUKTION',
      heroSlogan: ["PROTOKOLL", "KONTROLLE", "RÜCKVERFOLGBARKEIT"],
      heroSub: 'Vorherige technische Validierung, strukturierte Prozesskontrolle und Nachvollziehbarkeit in jeder Phase. Deterministische Regeln verhindern Maschinenausfälle und Fehldrucke.',
      heroCtaPrimary: 'Control Plane öffnen ➔',
      heroCtaSecondary: 'Technische Grundsätze ansehen ↓',
      substrip: [
        'JEDE AKTION WIRD PROTOKOLLIERT',
        'KEINE GERÄUSCHLOSEN STATUSÄNDERUNGEN',
        'TECHNISCHE AUFTRAGSRÜCKVERFOLGBARKEIT'
      ],
      systemTrustLabel: 'SYSTEMVERLÄSSLICHKEIT',
      systemTrustTitle: 'Wie wir Systemzuverlässigkeit gewährleisten',
      systemTrustSub: 'Wir übersetzen Vorstufenkomplexität in betriebliche Sicherheit. Jede Berechnung und Prüfung folgt einem deterministischen Pfad.',
      systemTrustItems: [
        { icon: 'history', title: 'Verifizierbares Protokoll jeder Aktion', desc: 'Jeder Vorgang erzeugt ein manipulationssicheres Protokoll. Kein Statuswechsel erfolgt unbemerkt.' },
        { icon: 'command', title: 'Deterministische Ausführung', desc: 'Identische Eingabeparameter und PDF-Dateien führen stets zum exakt gleichen Kalkulationsergebnis.' },
        { icon: 'policy', title: 'Automatische technische Richtlinien', desc: 'Die Engine prüft Anschnitt, Farbräume und Auflösung und stoppt fehlerhafte Druckdaten vor Maschinenbeginn.' },
        { icon: 'eye', title: 'Rückverfolgbare Spezifikationen', desc: 'Von der Kalkulation bis zur Betriebskarte bleiben alle Parameter an die vereinbarten Spezifikationen gebunden.' },
        { icon: 'shield', title: 'Strikte Mandantentrennung', desc: 'Druckereien und Papierhändler agieren in isolierten Mandantenbereichen zum Schutz ihrer Betriebsdaten.' },
        { icon: 'alert', title: 'Strukturiertes Fehlermanagement', desc: 'Abweichungen werden mit verständlichen Korrekturhinweisen gemeldet – ohne unklare Systemzustände.' }
      ],
      impactLabel: 'BETRIEBLICHER NUTZEN:',
      impactItems: [
        '• WENIGER MASCHINENSTILLSTÄNDE IN DER DRUCKEREI',
        '• REDUZIERTE NEUDRUCKE DURCH DATEIFEHLER',
        '• TRANSPARENTE TECHNISCHE SPEZIFIKATIONEN'
      ],
      failureBlockTitle: 'BEISPIEL: KONTROLLIERTE ABWEICHUNG',
      failureSteps: [
        'UNZUREICHENDER ANSCHNITT IN DER DATEI ERKANNT',
        'Technischer Korrekturhinweis an den Auftraggeber',
        'Schnittrichtlinie angewendet',
        'AUFTRAG VOR MASCHINENEINLAUF GESTOPPT'
      ],
      principlesHeading: 'Kernprinzipien',
      principlesSub: 'Drei methodische Säulen für verlässliche industrielle Druckherstellung.',
      principles: [
        { tag: 'Sicherheit', icon: 'shield', title: 'Vorabprüfung', desc: 'Das System prüft Geometrien und PageBoxes vor der Freigabe, um Überraschungen an der Schneidemaschine auszuschließen.' },
        { tag: 'Audit', icon: 'history', title: 'Technisches Protokoll', desc: 'Jedes Angebot und jede Druckdatei behält ein verifizierbares technisches Protokoll mit vereinbarten Toleranzen.' },
        { tag: 'Kontrolle', icon: 'command', title: 'Deterministische Strenge', desc: 'Entwickelt für Industriedruckereien und Verlage: serverbasierte Kalkulation nach realen Maschinenwerten.' }
      ],
      integrityHeading: 'Systemintegrität & Serverstandort',
      integritySub: 'Infrastruktur gehostet in Rechenzentren der Europäischen Union nach DSGVO-Standards mit strikter Mandantentrennung für Betriebsdaten.',
      integrityBadges: [
        'HOSTING IN DER EUROPÄISCHEN UNION',
        'DSGVO-KONFORMES SYSTEMDESIGN'
      ],
      statusLabel: 'STATUS TECHNISCHER DIENSTE',
      statusRefresh: 'ECHTZEIT-AKTUALISIERUNG',
      statusItems: [
        { name: 'PREFLIGHT ENGINE', val: 'AKTIV' },
        { name: 'KALKULATIONSMOTOR', val: 'ANGEWANDT' },
        { name: 'PROTOKOLLIERUNG', val: 'ERFASST' },
        { name: 'SYSTEMINTEGRITÄT', val: 'KONSISTENT' }
      ],
      layerTrust: 'TECHNISCHES GOVERNANCE- & AUDITPROTOKOLL / PRINTPRICE OS',
      ctaSlogan: 'BETRIEBSPORTAL',
      ctaTitle: 'Auftrag mit technischer Kontrolle starten',
      ctaDesc: 'Vereinbarte Spezifikationen, deterministische Vorabprüfung und qualifizierte Partnerbetriebe.',
      ctaBtn: 'Control Plane öffnen ➔'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="governance-page">
      {/* Governance Hero */}
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroCtaPrimary, href: "https://control.printprice.pro" }}
        secondaryAction={{ label: t.heroCtaSecondary, href: "#principles" }}
        variant="particles"
      />

      <div className="technical-text" style={{ textAlign: 'center', marginTop: '-3rem', marginBottom: '6rem', fontSize: '0.75rem', opacity: 0.7, letterSpacing: '0.12em', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span>{t.substrip[0]}</span>
        <span>•</span>
        <span>{t.substrip[1]}</span>
        <span>•</span>
        <span>{t.substrip[2]}</span>
      </div>

      {/* How it works Section */}
      <Section variant="secondary" id="principles">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '6rem', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '4rem' }}>
              <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '1.25rem', fontWeight: 900 }}>
                {t.systemTrustLabel}
              </h4>
              <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', letterSpacing: '-0.04em', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                {t.systemTrustTitle}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '50ch' }}>
                {t.systemTrustSub}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {t.systemTrustItems.map((item, i) => (
                <div key={i} style={{ height: '100%' }}>
                  <SystemCardHover borderRadius={0}>
                    <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <Icon name={item.icon as any} size={18} style={{ color: 'var(--accent-primary)' }} />
                        <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', opacity: 0.3 }}></div>
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: 'auto' }}>{item.desc}</p>
                    </div>
                  </SystemCardHover>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '3.5rem', opacity: 0.8, borderTop: '1px solid var(--border-color)', paddingTop: '1.75rem' }}>
              <div className="technical-text" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {t.impactLabel}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.75rem', padding: 0, fontSize: '0.85rem', fontWeight: 700 }}>
                {t.impactItems.map((impact, idx) => (
                  <li key={idx}>{impact}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '3.5rem', 
            border: '1px solid var(--accent-primary)',
            position: 'sticky',
            top: '8rem'
          }}>
            <h4 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '0.1em' }}>
              {t.failureBlockTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', flexShrink: 0 }}></div>
                <span className="technical-text" style={{ fontSize: '0.85rem', fontWeight: 800 }}>{t.failureSteps[0]}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.6 }}>
                <div style={{ width: '8px', height: '8px', border: '1px solid currentColor', flexShrink: 0 }}></div>
                <span className="technical-text" style={{ fontSize: '0.8rem' }}>{t.failureSteps[1]}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.6 }}>
                <div style={{ width: '8px', height: '8px', border: '1px solid currentColor', flexShrink: 0 }}></div>
                <span className="technical-text" style={{ fontSize: '0.8rem' }}>{t.failureSteps[2]}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#00cc66' }}>
                <div style={{ width: '8px', height: '8px', background: 'currentColor', flexShrink: 0 }}></div>
                <span className="technical-text" style={{ fontSize: '0.85rem', fontWeight: 900 }}>{t.failureSteps[3]}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Governance Principles */}
      <Section variant="primary">
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', marginBottom: '1.25rem' }}>{t.principlesHeading}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: 1.6 }}>
            {t.principlesSub}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {t.principles.map((feature, i) => (
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

      {/* Security & System Integrity Section */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>{t.integrityHeading}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              {t.integritySub}
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {t.integrityBadges.map((badge, idx) => (
                <span key={idx} className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800, padding: '0.35rem 0.75rem', border: '1px solid var(--accent-border)', background: 'rgba(220, 0, 0, 0.05)' }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '3.5rem', 
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ width: '100%', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 900 }}>{t.statusLabel}</h4>
                <div className="technical-text" style={{ fontSize: '0.65rem', opacity: 0.6 }}>{t.statusRefresh}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {t.statusItems.map((status, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: idx < t.statusItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: '0.5rem' }}>
                    <span className="technical-text" style={{ fontSize: '0.75rem', opacity: 0.7 }}>{status.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '6px', height: '6px', background: '#00cc66', borderRadius: '50%' }}></div>
                      <span className="technical-text" style={{ fontSize: '0.75rem', color: '#00cc66', fontWeight: 900 }}>{status.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ 
              width: '100%', 
              height: '2px', 
              background: 'var(--accent-primary)',
              opacity: 0.5
            }} />
            <div className="technical-text" style={{ 
              fontSize: '0.7rem', 
              color: 'var(--text-muted)', 
              marginTop: '1.5rem',
              letterSpacing: '0.1em',
              fontWeight: 800
            }}>
              {t.layerTrust}
            </div>
          </div>
        </div>
      </Section>

      <ActionCTA 
        slogan={t.ctaSlogan}
        title={t.ctaTitle}
        description={t.ctaDesc}
        buttonLabel={t.ctaBtn}
        buttonHref="https://control.printprice.pro"
        trackingAction="governance_cta_run_project"
      />
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n';

export default function PrivacyPolicyPage() {
  const { locale } = useLocale();

  const printDocument = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const openCookiePreferences = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ppp_reopen_consent'));
    }
  };

  const t = {
    es: {
      back: '← Volver al Centro Legal y de Confianza',
      badge: 'POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS (RGPD)',
      title: 'Política de Privacidad de PrintPrice Pro',
      draftNotice: 'BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Documento marco conforme al Reglamento General de Protección de Datos (RGPD UE 2016/679) y la normativa letona de protección de datos. En proceso de dictamen formal.',
      version: 'Versión: 2026.1-draft',
      lastUpdated: 'Última actualización: Octubre 2026',
      printBtn: 'Imprimir / PDF',
      cookiesBtn: 'Configurar Cookies',
      sec1Title: '1. Responsable del Tratamiento de los Datos',
      sec1Text: 'El responsable del tratamiento de los datos personales recopilados a través de este portal y sus aplicaciones es:',
      companyInfo: 'Print Price Pro SIA (Reg. Mercantil: 40203631570, IVA: LV40203631570), con domicilio social en Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia. Contacto de privacidad:',
      sec2Title: '2. Categorías de Datos Objeto de Tratamiento',
      sec2List: [
        'Datos identificativos y de contacto (nombre, correo profesional, empresa, teléfono y dirección fiscal).',
        'Datos técnicos del encargo editorial (dimensiones, paginación, tipo de papel, encuadernación y acabados).',
        'Archivos técnicos de impresión (archivos PDF de interior y cubierta facilitados para preflight o producción).',
        'Datos técnicos de navegación y telemetría (dirección IP anonimizada, navegador, resolución y registros de error).',
      ],
      sec3Title: '3. Finalidades y Bases Jurídicas del Tratamiento',
      sec3Text: 'Tratamos sus datos personales exclusivamente bajo las siguientes bases legitimadoras:',
      sec3List: [
        'Ejecución contractual o medidas precontractuales (Art. 6.1.b RGPD): cálculo de presupuestos en PRICE IT, validación técnica en FIX IT y enrutamiento a talleres en PRINT IT.',
        'Interés legítimo (Art. 6.1.f RGPD): garantizar la seguridad informática de la plataforma, prevenir fraudes y optimizar el rendimiento técnico.',
        'Consentimiento expreso (Art. 6.1.a RGPD): activación de cookies analíticas no esenciales o suscripción voluntaria a boletines informativos.',
      ],
      sec4Title: '4. Telemetría y Decisiones Automatizadas',
      sec4Text: 'Nuestros sistemas emplean herramientas deterministas de verificación de archivos y telemetría de rendimiento técnico. PrintPrice Pro NO realiza elaboración de perfiles comerciales invasivos ni toma decisiones automatizadas que produzcan efectos jurídicos sobre los usuarios en el sentido del artículo 22 del RGPD.',
      sec5Title: '5. Destinatarios y Subencargados del Tratamiento',
      sec5Text: 'Para la ejecución del servicio, los datos técnicos del encargo se comparten de forma segura con el taller de impresión seleccionado para su cotización o fabricación. Asimismo, empleamos proveedores de infraestructura en la Unión Europea (alojamiento en centros de datos con certificación ISO 27001 en Alemania / Finlandia). En el caso de la herramienta complementaria Mockup 3D, el procesamiento visual se realiza en servidores de Google Cloud ubicados en la UE sin que los archivos se utilicen para entrenar modelos de IA.',
      sec6Title: '6. Plazos de Conservación de los Datos',
      sec6Text: 'Los datos de presupuestos y pedidos se conservan durante los plazos fiscales y mercantiles exigidos por la legislación letona. Los archivos PDF cargados temporalmente para comprobación rápida en FIX IT o generación de mockups se purgan automáticamente transcurridos los periodos técnicos de retención.',
      sec7Title: '7. Derechos del Interesado y Autoridad de Control',
      sec7Text: 'Usted puede ejercitar en cualquier momento sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición mediante solicitud a privacy@printprice.pro. Si considera que sus derechos han sido vulnerados, puede presentar una reclamación ante la Inspección Estatal de Datos de Letonia (Datu valsts inspekcija — DVI, dvi.gov.lv) o ante la autoridad de protección de datos de su país de residencia en la UE.',
    },
    en: {
      back: '← Return to Legal & Trust Center',
      badge: 'PRIVACY POLICY & DATA PROTECTION (GDPR)',
      title: 'PrintPrice Pro Privacy Policy',
      draftNotice: 'DRAFT PENDING FORMAL LEGAL APPROVAL / BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA',
      draftDesc: 'Comprehensive privacy framework in accordance with Regulation (EU) 2016/679 (GDPR) and Latvian data protection laws. Subject to formal legal certification.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Last updated: October 2026',
      printBtn: 'Print / PDF',
      cookiesBtn: 'Cookie Settings',
      sec1Title: '1. Data Controller Identification',
      sec1Text: 'The controller responsible for processing personal data across this website and associated applications is:',
      companyInfo: 'Print Price Pro SIA (Reg. No. 40203631570, VAT: LV40203631570), with registered address at Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Latvia. Dedicated privacy contact:',
      sec2Title: '2. Categories of Personal Data Processed',
      sec2List: [
        'Contact and identification data (name, business email, company name, phone, billing address).',
        'Job specification data (book formats, page count, binding choice, substrate specs).',
        'Uploaded print assets (interior and cover PDF files provided for preflight validation or routing).',
        'Technical telemetry data (anonymized IP addresses, browser agent, resolution, and error logs).',
      ],
      sec3Title: '3. Purposes and Legal Bases for Processing',
      sec3Text: 'We process personal data strictly in accordance with recognized GDPR legal bases:',
      sec3List: [
        'Contract performance or pre-contractual steps (Art. 6(1)(b) GDPR): generating estimates in PRICE IT, preflight auditing in FIX IT, and marketplace routing in PRINT IT.',
        'Legitimate interest (Art. 6(1)(f) GDPR): maintaining platform infrastructure security, detecting abuse, and optimizing server performance.',
        'Explicit consent (Art. 6(1)(a) GDPR): activating non-essential analytical cookies or opting into newsletter updates.',
      ],
      sec4Title: '4. Telemetry and Automated Processing',
      sec4Text: 'Our platform uses deterministic file validation and performance telemetry. PrintPrice Pro does NOT engage in invasive behavioral profiling or automated decisions producing legal effects pursuant to Article 22 GDPR.',
      sec5Title: '5. Data Recipients and Subprocessors',
      sec5Text: 'Technical specifications are transmitted securely to selected printing houses solely for order execution. Core infrastructure is hosted in ISO 27001 certified data centers within the EU (Frankfurt / Helsinki). Visual processing for the optional 3D Mockup tool utilizes Google Cloud Vertex AI instances in the EU with explicit zero-training commitments.',
      sec6Title: '6. Data Retention Policies',
      sec6Text: 'Commercial records and invoices are retained pursuant to statutory Latvian commercial retention periods. Temporary PDF files uploaded for preflight inspection are purged automatically after operational processing.',
      sec7Title: '7. Data Subject Rights & Supervisory Authority',
      sec7Text: 'You may exercise your rights of access, rectification, erasure, restriction, objection, and portability by emailing privacy@printprice.pro. You also have the right to lodge a complaint with the Latvian Data State Inspectorate (Datu valsts inspekcija — DVI, dvi.gov.lv) or your local EU supervisory authority.',
    },
    de: {
      back: '← Zurück zum Rechts- und Vertrauenszentrum',
      badge: 'DATENSCHUTZERKLÄRUNG (DSGVO)',
      title: 'PrintPrice Pro Datenschutzerklärung',
      draftNotice: 'ENTWURF VORBEHALTLICH RECHTLICHER PRÜFUNG / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Datenschutzrahmenwerk gemäß Verordnung (EU) 2016/679 (DSGVO) und dem Recht der Republik Lettland. Veröffentlicht unter juristischem Vorbehalt.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Letzte Aktualisierung: Oktober 2026',
      printBtn: 'Drucken / PDF',
      cookiesBtn: 'Cookie-Einstellungen',
      sec1Title: '1. Verantwortliche Stelle',
      sec1Text: 'Verantwortlicher für die Datenverarbeitung auf dieser Website und den verbundenen Systemen ist:',
      companyInfo: 'Print Price Pro SIA (Reg.-Nr. 40203631570, USt-IdNr. LV40203631570), Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Lettland. Datenschutz-Kontakt:',
      sec2Title: '2. Kategorien verarbeiteter Daten',
      sec2List: [
        'Kontaktdaten (Name, geschäftliche E-Mail, Unternehmen, Anschrift).',
        'Technische Auftragsdaten (Buchformate, Seitenzahlen, Papiersorten, Bindung).',
        'Druckdaten und Dateien (PDF-Dateien für Preflight-Prüfung oder Produktionsausführung).',
        'Technische Telemetriedaten (anonymisierte IP-Adressen, Browser-Typ, Systemdiagnosen).',
      ],
      sec3Title: '3. Zwecke und Rechtsgrundlagen der Verarbeitung',
      sec3Text: 'Die Verarbeitung personenbezogener Daten erfolgt ausschließlich auf folgenden Rechtsgrundlagen:',
      sec3List: [
        'Vertragserfüllung oder vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO): Kalkulation in PRICE IT, Preflight in FIX IT, Auftragsrouting in PRINT IT.',
        'Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO): Gewährleistung der Plattformsicherheit und Fehleranalyse.',
        'Einwilligung (Art. 6 Abs. 1 lit. a DSGVO): Aktivierung optionaler Analyse-Cookies.',
      ],
      sec4Title: '4. Telemetrie und automatisierte Entscheidungen',
      sec4Text: 'Unsere Systeme arbeiten deterministisch. Es findet keine automatisierte Entscheidungsfindung mit rechtlicher Wirkung im Sinne von Art. 22 DSGVO statt.',
      sec5Title: '5. Empfänger und Auftragsverarbeiter',
      sec5Text: 'Auftragsdaten werden sicher an die ausgewählte Druckerei weitergeleitet. Serverinfrastrukturen werden ausschließlich in zertifizierten Rechenzentren innerhalb der Europäischen Union betrieben.',
      sec6Title: '6. Speicherdauer',
      sec6Text: 'Buchhalterische Daten werden nach gesetzlichen Fristen aufbewahrt. Für reine Preflight-Tests hochgeladene PDF-Dateien werden nach der technischen Analyse automatisch bereinigt.',
      sec7Title: '7. Betroffenenrechte und Aufsichtsbehörde',
      sec7Text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Datenübertragbarkeit via privacy@printprice.pro sowie das Beschwerderecht bei der lettischen Datenschutzbehörde (Datu valsts inspekcija — DVI, dvi.gov.lv).',
    },
  }[locale];

  return (
    <Section variant="primary" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <Container>
        <div style={{ maxWidth: '860px', marginInline: 'auto' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <Link
              href="/legal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-mono)',
                transition: 'color 0.15s ease',
              }}
            >
              {t.back}
            </Link>
          </div>

          {/* Draft Disclaimer Notice */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(220, 0, 0, 0.06)',
              border: '1px solid rgba(220, 0, 0, 0.3)',
              marginBottom: '2.5rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem',
              }}
            >
              {t.draftNotice}
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.draftDesc}
            </p>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-primary)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}
              >
                {t.badge}
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: 'var(--text-primary)' }}>
                {t.title}
              </h1>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                <span>{t.version}</span>
                <span>•</span>
                <span>{t.lastUpdated}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={openCookiePreferences}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {t.cookiesBtn}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={printDocument}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {t.printBtn}
              </Button>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0 3rem' }} />

          {/* Structured Document Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec1Title}
              </h2>
              <p style={{ marginBottom: '1rem' }}>{t.sec1Text}</p>
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.925rem',
                }}
              >
                <p style={{ margin: 0, marginBottom: '0.5rem' }}>{t.companyInfo}</p>
                <a href="mailto:privacy@printprice.pro" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  privacy@printprice.pro
                </a>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec2Title}
              </h2>
              <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {t.sec2List.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec3Title}
              </h2>
              <p style={{ marginBottom: '1rem' }}>{t.sec3Text}</p>
              <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {t.sec3List.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec4Title}
              </h2>
              <p>{t.sec4Text}</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec5Title}
              </h2>
              <p>{t.sec5Text}</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec6Title}
              </h2>
              <p>{t.sec6Text}</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec7Title}
              </h2>
              <p>{t.sec7Text}</p>
            </section>

          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <span>Print Price Pro SIA • GDPR & Privacy Governance</span>
            <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
              {t.back}
            </Link>
          </div>

        </div>
      </Container>
    </Section>
  );
}

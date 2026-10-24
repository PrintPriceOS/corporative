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
      back: '← Volver al Centro Legal',
      badge: 'DOCUMENTO REGULATORIO / POLÍTICA VIGENTE',
      title: 'Política de Privacidad (RGPD)',
      lastUpdated: 'Última actualización: 23 de marzo de 2026',
      version: 'Versión: v1.1',
      printBtn: 'Imprimir / PDF',
      cookiesBtn: 'Preferencias de cookies',
      sec1Title: '1. Responsable del Tratamiento',
      sec1Text: 'El responsable del tratamiento de los datos personales tratados a través de esta plataforma es:',
      companyInfo: 'Print Price Pro SIA (Reg. Mercantil: 40203631570, IVA: LV40203631570), con domicilio social en Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia.',
      privacyContact: 'Contacto de privacidad y protección de datos:',
      sec2Title: '2. Categorías de Datos que Tratamos',
      sec2List: [
        'Datos identificativos y de contacto: Nombre, empresa, dirección de correo electrónico, teléfono y dirección de facturación/envío.',
        'Datos técnicos del proyecto editorial: Formatos, paginación, tipo de encuadernación, gramajes y especificaciones acordadas.',
        'Archivos técnicos de impresión: Archivos PDF facilitados voluntariamente para preflight o producción gráfica.',
        'Datos de navegación y telemetría técnica: Dirección IP anonimizada, tipo de navegador y eventos de interacción técnica (sujetos a consentimiento para telemetría opcional).',
      ],
      sec3Title: '3. Bases Jurídicas del Tratamiento',
      sec3Text: 'Tratamos sus datos personales bajo las siguientes bases jurídicas reconocidas por el RGPD (Reglamento UE 2016/679):',
      sec3List: [
        'Ejecución del contrato o aplicación de medidas precontractuales (Art. 6.1.b RGPD): Cálculo de presupuestos, validación técnica de archivos en preflight y enrutamiento a talleres de impresión.',
        'Interés legítimo (Art. 6.1.f RGPD): Seguridad de la red, prevención de fraudes y mantenimiento de la infraestructura técnica de la plataforma.',
        'Consentimiento informado (Art. 6.1.a RGPD): Uso de cookies analíticas y telemetría técnica opcional.',
      ],
      sec4Title: '4. Telemetría Técnica y Decisiones Automatizadas',
      sec4Text: 'La plataforma utiliza telemetría técnica para monitorizar la velocidad de cálculo y optimizar la usabilidad del sistema. El sistema NO realiza elaboración de perfiles comerciales invasivos ni adopta decisiones basadas únicamente en el tratamiento automatizado que produzcan efectos jurídicos sobre los usuarios con arreglo al artículo 22 del RGPD.',
      sec5Title: '5. Comunicación de Datos a Terceros',
      sec5Text: 'Para la cotización y fabricación de pedidos, los datos técnicos del encargo se comunican de forma segura a las imprentas independientes seleccionadas. Asimismo, la infraestructura técnica de servidores opera en centros de datos ubicados en la Unión Europea.',
      sec6Title: '6. Plazos de Conservación',
      sec6Text: 'Los datos mercantiles y de pedidos se conservan durante los periodos legalmente exigidos por la legislación letona. Los archivos PDF cargados temporalmente para comprobaciones de preflight se purgan automáticamente tras concluir el procesamiento operativo.',
      sec7Title: '7. Derechos del Usuario y Autoridad de Control',
      sec7Text: 'Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición contactando con privacy@printprice.pro. Asimismo, tiene derecho a formular una reclamación ante la Inspección Estatal de Datos de Letonia (Datu valsts inspekcija — DVI, www.dvi.gov.lv) o ante la autoridad de control de su residencia en la Unión Europea.',
      footerTag: 'PRINT PRICE PRO / POLÍTICA DE PRIVACIDAD VIGENTE // RĪGA, LETONIA',
    },
    en: {
      back: '← Return to Legal Center',
      badge: 'REGULATORY DOCUMENT / CURRENT POLICY',
      title: 'Privacy Policy (GDPR)',
      lastUpdated: 'Last updated: March 23, 2026',
      version: 'Version: v1.1',
      printBtn: 'Print / PDF',
      cookiesBtn: 'Cookie preferences',
      sec1Title: '1. Data Controller',
      sec1Text: 'The controller responsible for processing personal data across this platform is:',
      companyInfo: 'Print Price Pro SIA (Commercial Reg. No.: 40203631570, VAT ID: LV40203631570), Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Latvia.',
      privacyContact: 'Data privacy contact:',
      sec2Title: '2. Categories of Data Processed',
      sec2List: [
        'Identity & contact details: Name, business email, organization, phone number, and delivery/billing address.',
        'Technical project specifications: Trim size, page count, binding type, substrate weights, and production parameters.',
        'Uploaded print assets: PDF files submitted for preflight inspection or production routing.',
        'Technical telemetry: Anonymized IP addresses, browser agent, and system interaction logs (strictly subject to consent for non-essential telemetry).',
      ],
      sec3Title: '3. Legal Bases for Processing',
      sec3Text: 'We process personal data under recognized GDPR legal grounds (Regulation EU 2016/679):',
      sec3List: [
        'Performance of contract or pre-contractual steps (Art. 6(1)(b) GDPR): Generating price estimates, validating PDF assets, and routing orders to production.',
        'Legitimate interest (Art. 6(1)(f) GDPR): Maintaining infrastructure security, preventing abuse, and optimizing server performance.',
        'Consent (Art. 6(1)(a) GDPR): Non-essential analytics and technical telemetry preferences.',
      ],
      sec4Title: '4. Telemetry and Automated Decisions',
      sec4Text: 'Platform telemetry evaluates calculation speeds and UX performance. PrintPrice Pro does NOT engage in invasive profiling or automated decision-making that produces legal effects concerning users under Article 22 GDPR.',
      sec5Title: '5. Data Sharing with Third Parties',
      sec5Text: 'To fulfill quotation and production requests, relevant project specifications are securely transmitted to designated print partners. Platform infrastructure is hosted in data centers within the European Union.',
      sec6Title: '6. Retention Periods',
      sec6Text: 'Commercial records are stored pursuant to statutory Latvian commercial retention requirements. Temporary PDF files uploaded for preflight inspection are purged automatically after technical processing.',
      sec7Title: '7. Data Subject Rights & Supervisory Authority',
      sec7Text: 'You may exercise your rights of access, rectification, erasure, restriction, objection, and portability by emailing privacy@printprice.pro. You also have the right to lodge a complaint with the Latvian Data State Inspectorate (Datu valsts inspekcija — DVI, www.dvi.gov.lv) or your local EU supervisory authority.',
      footerTag: 'PRINT PRICE PRO / IN-FORCE PRIVACY POLICY // RĪGA, LATVIA',
    },
    de: {
      back: '← Zurück zum Rechtszentrum',
      badge: 'RECHTLICHES DOKUMENT / GÜLTIGE DATENSCHUTZERKLÄRUNG',
      title: 'Datenschutzerklärung (DSGVO)',
      lastUpdated: 'Letzte Aktualisierung: 23. März 2026',
      version: 'Version: v1.1',
      printBtn: 'Drucken / PDF',
      cookiesBtn: 'Cookie-Einstellungen',
      sec1Title: '1. Verantwortliche Stelle',
      sec1Text: 'Verantwortlicher für die Datenverarbeitung auf dieser Plattform ist:',
      companyInfo: 'Print Price Pro SIA (Reg.-Nr.: 40203631570, USt-IdNr.: LV40203631570), Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Lettland.',
      privacyContact: 'Datenschutz-Kontakt:',
      sec2Title: '2. Kategorien verarbeiteter Daten',
      sec2List: [
        'Kontaktdaten: Name, geschäftliche E-Mail, Unternehmen, Telefon und Rechnungsanschrift.',
        'Auftragsdaten: Buchformate, Seitenzahlen, Bindungsarten und Papierspezifikationen.',
        'Druckdaten: Hochgeladene PDF-Dateien zur Preflight-Prüfung oder Fertigung.',
        'Telemetriedaten: Anonymisierte IP-Adressen und Systemdiagnosen (nur bei Einwilligung für optionale Analytik).',
      ],
      sec3Title: '3. Rechtsgrundlagen',
      sec3Text: 'Die Verarbeitung erfolgt nach Art. 6 Abs. 1 DSGVO:',
      sec3List: [
        'Vertragserfüllung oder vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO): Preiskalkulation, Druckdatenprüfung und Auftragsvermittlung.',
        'Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO): Plattformsicherheit und Fehlerprävention.',
        'Einwilligung (Art. 6 Abs. 1 lit. a DSGVO): Optionale Analyse-Cookies.',
      ],
      sec4Title: '4. Telemetrie und automatisierte Entscheidungen',
      sec4Text: 'Es findet keine automatisierte Entscheidungsfindung mit rechtlicher Wirkung im Sinne von Art. 22 DSGVO statt.',
      sec5Title: '5. Datenweitergabe an Partner',
      sec5Text: 'Auftragsdaten werden zweckgebunden an die ausführende Druckerei übermittelt. Server werden innerhalb der Europäischen Union betrieben.',
      sec6Title: '6. Aufbewahrungsfristen',
      sec6Text: 'Buchhalterische Daten unterliegen den gesetzlichen Fristen. Für reine Preflight-Tests hochgeladene PDF-Dateien werden nach der technischen Analyse automatisch gelöscht.',
      sec7Title: '7. Betroffenenrechte und Aufsichtsbehörde',
      sec7Text: 'Sie haben das Recht auf Auskunft, Berichtigung und Löschung via privacy@printprice.pro sowie das Beschwerderecht bei der lettischen Aufsichtsbehörde (Datu valsts inspekcija — DVI, www.dvi.gov.lv).',
      footerTag: 'PRINT PRICE PRO / GÜLTIGE DATENSCHUTZERKLÄRUNG // RĪGA, LETTLAND',
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
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>{t.privacyContact}</span>
                  <a href="mailto:privacy@printprice.pro" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    privacy@printprice.pro
                  </a>
                </div>
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
            <span>{t.footerTag}</span>
            <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
              {t.back}
            </Link>
          </div>

        </div>
      </Container>
    </Section>
  );
}

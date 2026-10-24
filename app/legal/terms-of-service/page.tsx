'use client';

import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n';

export default function TermsOfServicePage() {
  const { locale } = useLocale();

  const printDocument = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const t = {
    es: {
      back: '← Volver al Centro Legal y de Confianza',
      badge: 'CONDICIONES GENERALES DE PLATAFORMA',
      title: 'Términos de Servicio de PrintPrice Pro',
      draftNotice: 'BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Este marco regula el acceso técnico a las superficies de software de PrintPrice Pro. Refleja las directrices comerciales confirmadas y se encuentra en fase de validación regulatoria.',
      version: 'Versión: 2026.1-draft',
      lastUpdated: 'Última actualización: Octubre 2026',
      printBtn: 'Imprimir / PDF',
      sec1Title: '1. Objeto y Naturaleza de la Plataforma',
      sec1Text: 'Print Price Pro SIA ("la Plataforma", "PrintPrice Pro") opera una infraestructura de software y enrutamiento técnico para la industria gráfica que comprende las herramientas PRICE IT (cálculo), FIX IT (preflight), PRINT IT (marketplace de producción), Mockup 3D (visualizador) y Control Plane (gestión para talleres y proveedores). Salvo indicación expresa en contrario, PrintPrice Pro no fabrica materialmente productos impresos ni comercializa papel físico.',
      sec2Title: '2. Relación de Intermediación y Contratación',
      sec2Text: 'En las operaciones canalizadas a través de PRINT IT, el contrato de compraventa y confección del producto impreso se perfecciona de forma directa y exclusiva entre el cliente (autor o editorial) y el taller de impresión seleccionado. La imprenta vende y factura directamente al comprador. PrintPrice Pro no es parte de dicho contrato de fabricación ni asume la condición de fabricante.',
      sec3Title: '3. Estimaciones, Matrices y Precios Deterministas',
      sec3Text: 'Los costes y viabilidades calculados en PRICE IT se fundamentan en algoritmos deterministas y matrices de costes configuradas por los talleres. Dichas cifras tienen carácter informativo y de optimización técnica hasta que la orden queda formalizada y aceptada con las especificaciones acordadas en el pedido.',
      sec4Title: '4. Auditoría Preflight y Visualización Mockup 3D',
      sec4Text: 'El módulo FIX IT ejecuta una comprobación técnica determinista basada en estándares PDF/X e ISO 15930. El módulo Mockup 3D es una herramienta de simulación visual para previsualización digital y marketing, y bajo ningún concepto sustituye a una prueba física de color certificada (proof ISO 12647) ni garantiza el tacto o comportamiento mecánico del sustrato.',
      sec5Title: '5. Propiedad Intelectual y Licencia Operativa',
      sec5Text: 'El usuario conserva la plena titularidad y derechos de propiedad intelectual sobre los archivos, maquetas y textos cargados en la plataforma. Al cargarlos, otorga a PrintPrice Pro y al taller adjudicatario una licencia no exclusiva, limitada y estrictamente necesaria para el análisis técnico, preflight y producción del encargo.',
      sec6Title: '6. Responsabilidad del Usuario sobre los Contenidos',
      sec6Text: 'El usuario declara disponer de todas las autorizaciones legítimas sobre los contenidos que procesa y garantiza que sus archivos no infringen derechos de terceros ni vulneran la legalidad aplicable (contenidos ilícitos, difamatorios o violaciones de propiedad intelectual).',
      sec7Title: '7. Limitación de Responsabilidad',
      sec7Text: 'En la medida permitida por el derecho leton y comunitario, Print Price Pro SIA responde únicamente del funcionamiento diligente de sus sistemas de software. No responde de defectos materiales de impresión, mermas de producción atribuibles al taller ejecutor, retrasos logísticos del transportista ni de inconsistencias derivadas de archivos técnicos defectuosos aportados por el cliente.',
      sec8Title: '8. Ley Aplicable y Jurisdicción',
      sec8Text: 'Las presentes condiciones se rigen por la legislación de la República de Letonia. Cualquier controversia que no pueda resolverse amistosamente se someterá a los tribunales competentes de Rīga, Letonia, sin perjuicio de las normas imperativas de protección de los consumidores.',
    },
    en: {
      back: '← Return to Legal & Trust Center',
      badge: 'GENERAL PLATFORM TERMS OF SERVICE',
      title: 'PrintPrice Pro Terms of Service',
      draftNotice: 'DRAFT PENDING FORMAL LEGAL APPROVAL / BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA',
      draftDesc: 'This framework governs technical access to PrintPrice Pro software services. It reflects confirmed business decisions and remains subject to formal legal review.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Last updated: October 2026',
      printBtn: 'Print / PDF',
      sec1Title: '1. Scope and Nature of the Platform',
      sec1Text: 'Print Price Pro SIA ("the Platform", "PrintPrice Pro") operates software infrastructure and routing tools for the print manufacturing sector, comprising PRICE IT (cost engine), FIX IT (preflight), PRINT IT (marketplace), Mockup 3D (visual tool), and Control Plane (workshop operations). Unless explicitly agreed otherwise in writing, PrintPrice Pro does not manufacture physical goods nor sell physical paper.',
      sec2Title: '2. Intermediation Role & Manufacturing Contracts',
      sec2Text: 'For transactions routed through PRINT IT, the underlying manufacturing and purchase contract is executed directly between the buyer (author or publisher) and the designated print shop. The printer sells and invoices the customer directly. PrintPrice Pro is not a party to the manufacturing agreement.',
      sec3Title: '3. Deterministic Pricing and Technical Estimates',
      sec3Text: 'Estimates generated by PRICE IT are calculated using deterministic algorithms and verified partner matrices. All cost indications serve technical optimization purposes and become binding solely upon order confirmation based on agreed specifications.',
      sec4Title: '4. Preflight Verification and 3D Mockup Advisory',
      sec4Text: 'FIX IT performs deterministic preflight checks according to PDF/X and ISO 15930 industry standards. The Mockup 3D tool provides simulated visual rendering for marketing and pre-production evaluation; it does NOT constitute a contractually binding physical color proof (ISO 12647) or guarantee substrate texture.',
      sec5Title: '5. Intellectual Property and Operational License',
      sec5Text: 'Users retain 100% intellectual property ownership over all uploaded files, books, and metadata. By uploading assets, the user grants PrintPrice Pro and assigned printing partners a limited, non-exclusive license strictly necessary to analyze, inspect, and fulfill the job.',
      sec6Title: '6. User Responsibility and Acceptable Use',
      sec6Text: 'The user warrants that they possess all legal rights and licenses for the uploaded materials and that such content does not infringe upon third-party rights or applicable statutory law.',
      sec7Title: '7. Limitation of Liability',
      sec7Text: 'To the fullest extent permitted under Latvian and European law, Print Price Pro SIA is liable only for the deliberate technical delivery of its digital software services. We assume no liability for third-party production defects, transit delays, or errors resulting from flawed source files.',
      sec8Title: '8. Governing Law and Jurisdiction',
      sec8Text: 'These Terms of Service are governed by the substantive laws of the Republic of Latvia. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Rīga, Latvia, subject to mandatory consumer protection provisions.',
    },
    de: {
      back: '← Zurück zum Rechts- und Vertrauenszentrum',
      badge: 'ALLGEMEINE PLATTFORMBEDINGUNGEN',
      title: 'PrintPrice Pro Nutzungsbedingungen',
      draftNotice: 'ENTWURF VORBEHALTLICH RECHTLICHER PRÜFUNG / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Diese Bedingungen regeln den technischen Zugang zu den Softwarediensten von PrintPrice Pro. Sie spiegeln bestätigte Geschäftsentscheidungen wider und stehen unter juristischem Vorbehalt.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Letzte Aktualisierung: Oktober 2026',
      printBtn: 'Drucken / PDF',
      sec1Title: '1. Gegenstand und Rolle der Plattform',
      sec1Text: 'Print Price Pro SIA („die Plattform“, „PrintPrice Pro“) betreibt Software- und Routing-Infrastruktur für die Druckindustrie: PRICE IT (Kalkulationsengine), FIX IT (Preflight), PRINT IT (Marktplatz), Mockup 3D (visuelle Buchvorschau) und Control Plane (Betriebsumgebung). Sofern nicht ausdrücklich schriftlich vereinbart, stellt PrintPrice Pro keine physischen Druckprodukte her und vertreibt kein Rohpapier.',
      sec2Title: '2. Vermittlungsrolle und Produktionsverträge',
      sec2Text: 'Bei über PRINT IT vermittelten Aufträgen kommt der Kauf- und Herstellungsvertrag unmittelbar und ausschließlich zwischen dem Besteller (Autor/Verlag) und der ausgewählten Druckerei zustande. Die Druckerei verkauft und fakturiert direkt an den Kunden. PrintPrice Pro ist nicht Vertragspartei des Druckvertrags.',
      sec3Title: '3. Deterministische Kalkulation und Preisangaben',
      sec3Text: 'Die in PRICE IT berechneten Beträge basieren auf deterministischen Formeln und hinterlegten Maschinenmatrizen. Alle Preisangaben sind indikativ und werden erst mit den im Auftrag vereinbarten Spezifikationen verbindlich.',
      sec4Title: '4. Preflight-Prüfung und 3D-Mockup Hinweis',
      sec4Text: 'FIX IT führt deterministische Prüfungen nach ISO 15930 (PDF/X) durch. Das 3D-Mockup ist ein rein visuelles Werkzeug für Digitalmarketing und stellt keinen farbverbindlichen Kontraktproof (ISO 12647) dar.',
      sec5Title: '5. Urheberrechte und operative Nutzungslizenz',
      sec5Text: 'Nutzer behalten sämtliche Rechte an ihren hochgeladenen Dateien und Manuskripten. Dem Betreiber und der ausführenden Druckerei wird lediglich eine auf die Auftragsabwicklung beschränkte Nutzungslizenz eingeräumt.',
      sec6Title: '6. Verantwortung für Dateiinhalte',
      sec6Text: 'Der Nutzer versichert, über sämtliche erforderlichen Nutzungs- und Urheberrechte an den Dateien zu verfügen und keine geltenden Rechtsvorschriften oder Rechte Dritter zu verletzen.',
      sec7Title: '7. Haftungsbeschränkung',
      sec7Text: 'Print Price Pro SIA haftet nach lettischem und EU-Recht für die ordnungsgemäße Bereitstellung der Software. Eine Haftung für Produktionsfehler der Werkstatt, Transportschäden oder Fehler fehlerhafter Kundendateien ist ausgeschlossen.',
      sec8Title: '8. Anwendbares Recht und Gerichtsstand',
      sec8Text: 'Es gilt das Recht der Republik Lettland. Gerichtsstand für alle Streitigkeiten ist, soweit gesetzlich zulässig, Rīga, Lettland.',
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

            <Button
              variant="secondary"
              size="sm"
              onClick={printDocument}
              style={{ fontFamily: 'var(--font-mono)', alignSelf: 'flex-start' }}
            >
              {t.printBtn}
            </Button>
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0 3rem' }} />

          {/* Structured Document Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            
            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec1Title}
              </h2>
              <p>{t.sec1Text}</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec2Title}
              </h2>
              <p>{t.sec2Text}</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec3Title}
              </h2>
              <p>{t.sec3Text}</p>
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

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec8Title}
              </h2>
              <p>{t.sec8Text}</p>
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
            <span>Print Price Pro SIA • Rigorous Print Software</span>
            <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
              {t.back}
            </Link>
          </div>

        </div>
      </Container>
    </Section>
  );
}

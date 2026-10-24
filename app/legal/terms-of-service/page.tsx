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
      back: '← Volver al Centro Legal',
      badge: 'DOCUMENTO REGULATORIO / CONDICIONES VIGENTES',
      title: 'Términos de Servicio (Terms of Service)',
      lastUpdated: 'Última actualización: 23 de marzo de 2026',
      version: 'Versión: v1.1',
      printBtn: 'Imprimir / PDF',
      sec1Title: '1. Función de la Plataforma',
      sec1Text: 'Print Price Pro ("la Plataforma") es un sistema de inteligencia técnica y enrutamiento operativo gestionado por Print Price Pro SIA. La plataforma proporciona estimación de costes, validación técnica de archivos (preflight) y herramientas de enrutamiento a producción.',
      sec1Note: 'IMPORTANTE: Print Price Pro SIA no es una empresa de impresión, fabricante físico ni vendedora de productos impresos materiales. No poseemos, operamos ni controlamos las instalaciones industriales de impresión que fabrican los pedidos.',
      sec2Title: '2. Relación de Intermediación Mercantil',
      sec2Text: 'La plataforma actúa como intermediario tecnológico. Cualquier contrato de producción, pedido de compra o acuerdo para la confección y entrega de productos físicos se establece de forma directa y exclusiva entre el usuario (cliente) y la imprenta ejecutora. Print Price Pro SIA no es parte de dichos contratos de fabricación y no asume responsabilidad directa por su ejecución material.',
      sec3Title: '3. Precios y Estimaciones',
      sec3Text: 'Todos los precios, plazos y especificaciones generados por la plataforma tienen carácter indicativo y de optimización técnica. No constituyen una oferta contractual vinculante por parte de Print Price Pro ni de la imprenta hasta su confirmación en el pedido. El precio y condiciones definitivas se rigen por las especificaciones acordadas en el pedido formalizado.',
      sec4Title: '4. Herramientas Automatizadas de Validación',
      sec4Text: 'La plataforma utiliza algoritmos y herramientas de software automatizadas para validar archivos de producción y optimizar flujos de trabajo. Si bien aplicamos rigurosos estándares técnicos, el usuario mantiene la responsabilidad final sobre la adecuación de sus contenidos originales.',
      sec5Title: '5. Responsabilidad del Usuario sobre los Archivos',
      sec5Text: 'El usuario es el único responsable de la integridad técnica y la legalidad de los archivos que carga en el sistema. La comprobación mediante preflight es una asistencia técnica consultiva y no exime al cliente de verificar que sus archivos cumplen los requisitos de producción acordados.',
      sec6Title: '6. Limitación de Responsabilidad',
      sec6Text: 'En la medida permitida por la legislación letona y europea aplicable, Print Price Pro SIA no será responsable de defectos de fabricación imputables a terceros talleres, mermas de impresión de la fábrica, retrasos en la entrega logística o inconsistencias técnicas derivadas de archivos fuente defectuosos facilitados por el cliente.',
      sec7Title: '7. Derechos de Propiedad Intelectual',
      sec7Text: 'El usuario conserva la plena titularidad y todos los derechos de autor sobre sus archivos, textos y cubiertas. Al cargarlos en el sistema, otorga a Print Price Pro y a las imprentas asignadas una licencia no exclusiva y limitada estrictamente a los fines operativos de comprobación técnica, cotización y fabricación del encargo solicitado.',
      sec8Title: '8. Comunicación de Datos a Imprentas',
      sec8Text: 'Al utilizar los servicios de intermediación, el usuario autoriza expresamente a Print Price Pro a transmitir las especificaciones técnicas del proyecto y los archivos necesarios a las imprentas pertinentes con el fin exclusivo de cotizar y ejecutar el encargo.',
      sec9Title: '9. Pagos y Régimen Comercial',
      sec9Text: 'La imprenta factura y cobra directamente al comprador los importes acordados por los trabajos de impresión. Print Price Pro SIA factura periódicamente a las imprentas registradas las comisiones acordadas por los servicios de intermediación en la plataforma.',
      sec10Title: '10. Ley Aplicable y Jurisdicción',
      sec10Text: 'Los presentes términos se rigen por las leyes de la República de Letonia. Cualquier controversia se someterá a la jurisdicción de los tribunales competentes de Rīga, Letonia, sin perjuicio de los derechos imperativos reconocidos a los consumidores en la Unión Europea.',
      footerTag: 'PRINT PRICE PRO / CONDICIONES GENERALES VIGENTES // RĪGA, LETONIA',
    },
    en: {
      back: '← Return to Legal Center',
      badge: 'REGULATORY DOCUMENT / CURRENT TERMS',
      title: 'Terms of Service',
      lastUpdated: 'Last updated: March 23, 2026',
      version: 'Version: v1.1',
      printBtn: 'Print / PDF',
      sec1Title: '1. The Platform Role',
      sec1Text: 'Print Price Pro ("the Platform") is a production intelligence and matchmaking system operated by Print Price Pro SIA. The Platform provides pricing estimation, file validation (preflight), and manufacturing routing services.',
      sec1Note: 'IMPORTANT: Print Price Pro SIA is NOT a printing company, physical manufacturer, or seller of physical printed goods. We do not own, operate, or control the industrial printing facilities that fulfill orders.',
      sec2Title: '2. Intermediary Relationship',
      sec2Text: 'The Platform acts solely as a technical intermediary. Any production contract, purchase order, or manufacturing agreement is strictly between the User and the independent Print House. Print Price Pro SIA is not a party to these contracts and assumes no direct liability for manufacturing performance.',
      sec3Title: '3. Pricing & Estimates',
      sec3Text: 'All prices, lead times, and specifications generated by the Platform are INDICATIVE ONLY. They do not constitute a binding offer from Print Price Pro or the Print House until finalized. Final terms and pricing are governed strictly by the specifications agreed in each confirmed order.',
      sec4Title: '4. Automated Decision & Preflight Tools',
      sec4Text: 'The Platform utilizes automated algorithms to inspect production files and optimize routing. While we maintain rigorous technical accuracy, users retain responsibility for their source assets.',
      sec5Title: '5. User Responsibility',
      sec5Text: 'Users are solely responsible for the technical integrity and legal compliance of the files they upload. The Platform preflight check is an advisory technical tool and does not relieve the User of their obligation to verify files against production requirements.',
      sec6Title: '6. Limitation of Liability',
      sec6Text: 'To the maximum extent permitted by applicable Latvian and European law, Print Price Pro SIA shall not be liable for manufacturing defects caused by third-party print shops, logistical delays, or errors arising from defective source assets supplied by the user.',
      sec7Title: '7. Intellectual Property & Content Rights',
      sec7Text: 'The User retains full ownership of all submitted files and content. By uploading assets, the User grants Print Price Pro and assigned print partners a limited, non-exclusive license strictly necessary to validate, quote, and fulfill the production job.',
      sec8Title: '8. Data Transmission to Printers',
      sec8Text: 'By utilizing routing services, the User authorizes Print Price Pro to share project specifications and relevant files with selected printing partners for quotation and fulfillment purposes.',
      sec9Title: '9. Payments and Commercial Terms',
      sec9Text: 'Print shops invoice and collect payment directly from the buyer for manufacturing jobs. Print Price Pro SIA invoices registered print shops periodically for platform marketplace commissions.',
      sec10Title: '10. Governing Law & Dispute Resolution',
      sec10Text: 'These terms are governed by the laws of the Republic of Latvia. Any disputes shall be subject to the jurisdiction of the competent courts of Rīga, Latvia, without prejudice to mandatory European consumer protection laws.',
      footerTag: 'PRINT PRICE PRO / CURRENT TERMS OF SERVICE // RĪGA, LATVIA',
    },
    de: {
      back: '← Zurück zum Rechtszentrum',
      badge: 'RECHTLICHES DOKUMENT / GÜLTIGE NUTZUNGSBEDINGUNGEN',
      title: 'Nutzungsbedingungen (Terms of Service)',
      lastUpdated: 'Letzte Aktualisierung: 23. März 2026',
      version: 'Version: v1.1',
      printBtn: 'Drucken / PDF',
      sec1Title: '1. Rolle der Plattform',
      sec1Text: 'Print Price Pro („die Plattform“) ist ein System für Produktionsintelligenz und Auftragsvermittlung der Print Price Pro SIA. Die Plattform bietet Preiskalkulation, Druckdatenprüfung (Preflight) und Produktionsrouting.',
      sec1Note: 'WICHTIG: Print Price Pro SIA ist kein Druckereibetrieb, kein physischer Hersteller und kein Verkäufer von Druckwaren. Wir betreiben keine eigenen Druckmaschinen.',
      sec2Title: '2. Vermittlungsverhältnis',
      sec2Text: 'Die Plattform agiert als technischer Vermittler. Druckverträge und Fertigungsaufträge kommen unmittelbar zwischen dem Kunden und der unabhängigen Druckerei zustande.',
      sec3Title: '3. Preisschätzungen und Berechnungen',
      sec3Text: 'Alle über die Plattform berechneten Preise und Lieferzeiten sind indikativ. Verbindliche Konditionen richten sich ausschließlich nach den im bestätigten Auftrag vereinbarten Spezifikationen.',
      sec4Title: '4. Automatisierte Prüfwerkzeuge',
      sec4Text: 'Die Plattform nutzt deterministische Algorithmen zur Dateiprüfung. Die Vorabprüfung dient der Unterstützung und entbindet den Nutzer nicht von der Prüfung seiner Daten.',
      sec5Title: '5. Verantwortung für Dateiinhalte',
      sec5Text: 'Der Nutzer trägt die Verantwortung für die inhaltliche und rechtliche Zulässigkeit der hochgeladenen Druckdaten.',
      sec6Title: '6. Haftungsbeschränkung',
      sec6Text: 'Print Price Pro SIA haftet nach Maßgabe des lettischen und europäischen Rechts für die Softwarebereitstellung, nicht jedoch für herstellungsbedingte Druckmängel der Werkstatt.',
      sec7Title: '7. Geistiges Eigentum',
      sec7Text: 'Nutzer behalten sämtliche Rechte an ihren hochgeladenen Werken und gewähren lediglich eine zweckgebundene Lizenz zur Auftragsabwicklung.',
      sec8Title: '8. Datenweitergabe an Druckereien',
      sec8Text: 'Zur Angebotserstellung und Produktion werden auftragsrelevante Parameter und Dateien sicher an ausgewählte Partnerwerkstätten übermittelt.',
      sec9Title: '9. Zahlungsabwicklung',
      sec9Text: 'Die Druckerei rechnet die Fertigung direkt mit dem Besteller ab. Print Price Pro SIA berechnet den Partnerdruckereien vertragliche Vermittlungsprovisionen.',
      sec10Title: '10. Anwendbares Recht',
      sec10Text: 'Es gilt das Recht der Republik Lettland. Gerichtsstand ist Rīga, Lettland.',
      footerTag: 'PRINT PRICE PRO / GÜLTIGE NUTZUNGSBEDINGUNGEN // RĪGA, LETTLAND',
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
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: '3px solid var(--accent-primary)',
                  fontSize: '0.9rem',
                }}
              >
                {t.sec1Note}
              </div>
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

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec9Title}
              </h2>
              <p>{t.sec9Text}</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec10Title}
              </h2>
              <p>{t.sec10Text}</p>
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

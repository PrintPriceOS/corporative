'use client';

import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n';

export default function PartnerTermsPage() {
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
      title: 'Condiciones para Imprentas y Partners',
      lastUpdated: 'Última actualización: 23 de marzo de 2026',
      version: 'Versión: v1.1',
      printBtn: 'Imprimir / PDF',
      sec1Title: '1. Objeto y Alcance del Acuerdo',
      sec1Text: 'Las presentes Condiciones para Partners regulan la relación comercial entre Print Price Pro SIA («PrintPrice Pro») y la empresa titular de una planta gráfica o taller de impresión («Partner» o «Imprenta») registrada en el sistema de producción de PrintPrice OS.',
      sec2Title: '2. Naturaleza de la Relación y Fabricante Independiente',
      sec2Text: 'PrintPrice Pro opera un sistema de software y enrutamiento técnico que conecta demanda verificada con talleres de impresión. PrintPrice Pro NO es el fabricante. La Imprenta actúa en todo momento como el fabricante industrial independiente y el vendedor mercantil directo frente al cliente final.',
      sec3Title: '3. Parámetros Técnicos y Maquinaria',
      sec3Text: 'El Partner se compromete a mantener fielmente actualizados en Control Plane sus parámetros de pliego (mínimo/máximo), tecnologías de impresión (offset/digital), mermas técnicas y costes de preparación para garantizar cotizaciones deterministas fiables.',
      sec4Title: '4. Aceptación Vinculante de Pedidos',
      sec4Text: 'Los trabajos enrutados adquieren carácter vinculante únicamente cuando la Imprenta los acepta en el flujo de trabajo designado en Control Plane. Una vez aceptado el encargo, la Imprenta queda obligada a fabricar y entregar la obra conforme a las especificaciones acordadas en el pedido.',
      sec5Title: '5. Calidad, Defectos y Exclusiones',
      sec5Text: 'La Imprenta es responsable de la calidad de fabricación industrial (fallos de registro, manchas, encuadernación defectuosa). La Imprenta no responderá de erratas o fallos en el contenido del archivo si éste fue expresamente aprobado por el cliente tras el informe de preflight.',
      sec6Title: '6. Régimen Comercial y Facturación Directa',
      sec6List: [
        'Facturación y cobro directo: La Imprenta factura y cobra directamente al comprador el importe íntegro del encargo acordado a través de sus propios medios de cobro.',
        'Comisión mensual de marketplace: PrintPrice Pro factura mensualmente a la Imprenta una comisión del 4 % por los servicios de intermediación respecto de las transacciones originadas a través de PRINT IT.',
        'Sin cuotas fijas aprobadas: No existen cuotas mensuales de mantenimiento, costes de alta ni consumos mínimos obligatorios aprobados en estas condiciones vigentes.',
      ],
      sec7Title: '7. Ausencia de Garantía de Volumen',
      sec7Text: 'La admisión en la red no constituye una garantía de volumen mínimo de pedidos ni otorga exclusividad territorial.',
      sec8Title: '8. No Elusión (Non-Circumvention) y Confidencialidad',
      sec8Text: 'El Partner no eludirá la plataforma para desviar transacciones originadas a través de PRINT IT. Asimismo, mantendrá la más estricta confidencialidad sobre los archivos y obras recibidas, utilizándolos exclusivamente para la fabricación del pedido.',
      sec9Title: '9. Protección de Datos',
      sec9Text: 'Las partes tratarán los datos personales conforme a la normativa aplicable (RGPD). Cuando la Imprenta facture y envíe directamente al comprador, actúa como responsable independiente para sus propios fines fiscales y de entrega.',
      sec10Title: '10. Ley Aplicable y Jurisdicción',
      sec10Text: 'Estas condiciones se rigen por la legislación de la República de Letonia. Cualquier controversia se someterá a la jurisdicción exclusiva de los tribunales de Rīga, Letonia.',
      footerTag: 'PRINT PRICE PRO / CONDICIONES DE PARTNERS VIGENTES // RĪGA, LETONIA',
    },
    en: {
      back: '← Return to Legal Center',
      badge: 'REGULATORY DOCUMENT / CURRENT TERMS',
      title: 'Partner Terms (Print Houses)',
      lastUpdated: 'Last updated: March 23, 2026',
      version: 'Version: v1.1',
      printBtn: 'Print / PDF',
      sec1Title: '1. Scope of the Agreement',
      sec1Text: 'These Partner Terms govern the commercial relationship between Print Price Pro SIA ("PrintPrice Pro") and the printing company or production node ("Partner" or "Print House") registered in PrintPrice OS.',
      sec2Title: '2. Nature of the Relationship & Independent Manufacturer',
      sec2Text: 'PrintPrice Pro operates an orchestration and routing software system connecting validated demand with qualified partners. PrintPrice Pro is NOT the manufacturer. The Partner remains at all times the independent industrial manufacturing entity and the direct seller to the customer.',
      sec3Title: '3. Technical Fleet Parameters',
      sec3Text: 'The Partner commits to maintaining accurate press specs, sheet sizes, digital/offset capabilities, and makeready waste rates in Control Plane to ensure deterministic quotation integrity.',
      sec4Title: '4. Binding Job Acceptance',
      sec4Text: 'Routed jobs become binding only when accepted through the designated workflow in Control Plane. Once accepted, the Partner is responsible for manufacturing and fulfillment according to the agreed order specifications.',
      sec5Title: '5. Quality, Defects & Exclusions',
      sec5Text: 'The Partner is responsible for manufacturing quality (registration flaws, improper folding, binding defects). The Partner is not liable for typographical errors or pre-existing image flaws in client files approved after preflight inspection.',
      sec6Title: '6. Commercial Terms & Direct Billing',
      sec6List: [
        'Direct customer billing: The Partner invoices and collects payment directly from the customer for manufacturing orders.',
        'Monthly 4% fee: PrintPrice Pro invoices the Partner monthly for a 4% marketplace commission on net manufacturing revenue collected for jobs originated via PRINT IT.',
        'Zero approved recurring fixed fees: No mandatory monthly maintenance fees, sign-up fees, or minimum volume commitments are approved under these current terms.',
      ],
      sec7Title: '7. No Volume Guarantee',
      sec7Text: 'Admission to the production network does not guarantee any minimum order volume or geographical exclusivity.',
      sec8Title: '8. Non-Circumvention & Confidentiality',
      sec8Text: 'The Partner shall not circumvent PrintPrice Pro to avoid agreed fees for transactions originated via PRINT IT. All customer manuscripts and print files must be kept strictly confidential and used solely for fulfilling the specific job.',
      sec9Title: '9. Data Protection',
      sec9Text: 'Parties comply with applicable data protection laws (GDPR). When the Partner directly bills and ships to the customer, it acts as an independent data controller for its own invoicing and delivery operations.',
      sec10Title: '10. Governing Law & Jurisdiction',
      sec10Text: 'These terms are governed by the laws of the Republic of Latvia. Any dispute shall be subject to the exclusive jurisdiction of the competent courts of Rīga, Latvia.',
      footerTag: 'PRINT PRICE PRO / CURRENT PARTNER TERMS // RĪGA, LATVIA',
    },
    de: {
      back: '← Zurück zum Rechtszentrum',
      badge: 'RECHTLICHES DOKUMENT / GÜLTIGE BEDINGUNGEN',
      title: 'Partnerbedingungen für Druckereien',
      lastUpdated: 'Letzte Aktualisierung: 23. März 2026',
      version: 'Version: v1.1',
      printBtn: 'Drucken / PDF',
      sec1Title: '1. Vertragsgegenstand',
      sec1Text: 'Diese Partnerbedingungen regeln das Geschäftsverhältnis zwischen Print Price Pro SIA („PrintPrice Pro“) und der im Netzwerk registrierten Druckerei („Partner“ oder „Druckerei“).',
      sec2Title: '2. Rolle und Direkthersteller-Status',
      sec2Text: 'PrintPrice Pro betreibt Routing- und Kalkulationssoftware. PrintPrice Pro ist nicht der Hersteller. Die Druckerei bleibt jederzeit unabhängiger industrieller Hersteller und direkter Verkäufer gegenüber dem Kunden.',
      sec3Title: '3. Technische Maschinenparameter',
      sec3Text: 'Der Partner pflegt seine Maschinenprofile, Bogenformate und Rüstzeiten wahrheitsgetreu in Control Plane.',
      sec4Title: '4. Verbindliche Auftragsannahme',
      sec4Text: 'Vermittelte Aufträge werden verbindlich, sobald die Druckerei diese in Control Plane annimmt. Nach Annahme ist die Druckerei zur fristgerechten Fertigung gemäß den vereinbarten Spezifikationen verpflichtet.',
      sec5Title: '5. Qualität und Mängelhaftung',
      sec5Text: 'Die Druckerei haftet für herstellungsbedingte Mängel. Für Druckfehler in freigegebenen Kundendateien haftet die Druckerei nicht.',
      sec6Title: '6. Vergütung und Direktabrechnung',
      sec6List: [
        'Direktabrechnung: Die Druckerei rechnet direkt mit dem Besteller ab und vereinnahmt den Rechnungsbetrag.',
        'Monatliche 4 % Provision: PrintPrice Pro stellt der Druckerei monatlich 4 % Marktplatzprovision für über PRINT IT vermittelte Aufträge in Rechnung.',
        'Keine fixen Monatsgebühren: Es bestehen keine genehmigten monatlichen Grundgebühren oder Mindestumsatzpflichten.',
      ],
      sec7Title: '7. Kein Mindestvolumen',
      sec7Text: 'Die Aufnahme in das Netzwerk begründet keinen Anspruch auf ein Mindestauftragsvolumen.',
      sec8Title: '8. Umgehungsverbot und Vertraulichkeit',
      sec8Text: 'Der Partner verpflichtet sich, keine über PRINT IT angebahnten Aufträge zur Umgehung der Provision zu verlagern. Kundendaten sind streng vertraulich zu behandeln.',
      sec9Title: '9. Datenschutz',
      sec9Text: 'Die Parteien beachten die DSGVO. Bei Direktfakturierung agiert die Druckerei für ihre eigenen Abrechnungs- und Lieferprozesse als eigenständiger Verantwortlicher.',
      sec10Title: '10. Anwendbares Recht',
      sec10Text: 'Es gilt das Recht der Republik Lettland. Gerichtsstand ist Rīga, Lettland.',
      footerTag: 'PRINT PRICE PRO / GÜLTIGE PARTNERBEDINGUNGEN // RĪGA, LETTLAND',
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
              <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {t.sec6List.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
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

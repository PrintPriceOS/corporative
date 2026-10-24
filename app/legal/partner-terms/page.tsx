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
      back: '← Volver al Centro Legal y de Confianza',
      badge: 'CONDICIONES GENERALES PARA IMPRENTAS Y TALLERES',
      title: 'Condiciones de Adhesión para Imprentas',
      draftNotice: 'BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Regula la participación de talleres gráficos en la red de producción PRINT IT y el uso de Control Plane. Refleja las directrices comerciales confirmadas y se encuentra en fase de validación regulatoria.',
      version: 'Versión: 2026.1-draft',
      lastUpdated: 'Última actualización: Octubre 2026',
      printBtn: 'Imprimir / PDF',
      sec1Title: '1. Objeto y Condición de Vendedor Directo',
      sec1Text: 'Print Price Pro SIA («PrintPrice») proporciona infraestructura tecnológica (Control Plane, cálculo algorítmico, preflight y enrutamiento en PRINT IT) para conectar talleres gráficos con compradores profesionales y autores. La Imprenta actúa en todo momento como fabricante industrial independiente y vendedora mercantil directa frente al comprador.',
      sec2Title: '2. Parámetros Técnicos, Maquinaria y Veracidad',
      sec2Text: 'La Imprenta se compromete a mantener fielmente calibrados en Control Plane sus formatos de pliego (mínimo/máximo), velocidades efectivas, tecnologías (digital/offset), mermas de arranque y costes horarios de makeready. La exactitud de estos datos es indispensable para la fiabilidad de las cotizaciones.',
      sec3Title: '3. Aceptación Vinculante de Pedidos',
      sec3Text: 'Una solicitud u orden enrutada adquiere carácter vinculante para la Imprenta en el momento de su aceptación formal en Control Plane. Una vez aceptado el encargo, la Imprenta queda obligada a fabricar y expedir el producto conforme a las especificaciones acordadas en el pedido y el archivo PDF validado por el preflight.',
      sec4Title: '4. Calidad, Tolerancias y Subsanación de Defectos',
      sec4Text: 'La Imprenta responde de los defectos de fabricación imputables a su proceso industrial (fallos de registro, manchas, plegado erróneo o roturas de encuadernación), debiendo proceder a la reimpresión o compensación técnica diligente. La Imprenta no responderá de erratas o fallos en el contenido del archivo si éste fue expresamente aprobado por el cliente tras el informe de preflight.',
      sec5Title: '5. Régimen Económico: Facturación Directa y Comisión del 4 %',
      sec5List: [
        'Cobro directo al cliente: La Imprenta factura y cobra directamente al comprador el importe íntegro del encargo mediante sus propios medios o pasarelas autorizadas.',
        'Comisión mensual del 4 %: PrintPrice facturará mensualmente a la Imprenta una comisión del 4 % sobre el importe neto de fabricación cobrado respecto de los pedidos originados a través de PRINT IT.',
        'Aprovisionamiento de papel: La comisión del 4 % NO es aplicable a las partidas de compra de papel o consumibles entre la Imprenta y distribuidores de papel.',
        'Ausencia de cuotas fijas aprobadas: No existen cuotas mensuales de mantenimiento, costes de alta ni consumos mínimos obligatorios aprobados en este borrador.',
      ],
      sec6Title: '6. No Elusión (Non-Circumvention) y Confidencialidad',
      sec6Text: 'La Imprenta se compromete a no eludir la plataforma para desviar transacciones originadas a través de PRINT IT con el fin de evitar la comisión aplicable. Asimismo, tratará con estricta confidencialidad los manuscritos, obras protegidas y archivos de clientes, utilizándolos exclusivamente para la fabricación del pedido.',
      sec7Title: '7. Ausencia de Garantía de Volumen',
      sec7Text: 'La integración en Control Plane y la red PRINT IT no constituye garantía de volumen mínimo ni exclusividad territorial, distribuyéndose las órdenes según compatibilidad técnica, cercanía geográfica y competitividad objetiva.',
      sec8Title: '8. Ley Aplicable y Jurisdicción',
      sec8Text: 'Estas condiciones se rigen por el derecho sustantivo de la República de Letonia, sometiéndose cualquier discrepancia a la jurisdicción exclusiva de los tribunales de Rīga, Letonia.',
    },
    en: {
      back: '← Return to Legal & Trust Center',
      badge: 'GENERAL TERMS FOR PRINT HOUSES & PRODUCTION NODES',
      title: 'Partner Terms for Print Houses',
      draftNotice: 'DRAFT PENDING FORMAL LEGAL APPROVAL / BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA',
      draftDesc: 'Governs print workshop participation in the PRINT IT marketplace and use of Control Plane. Reflects confirmed business decisions and remains subject to formal legal review.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Last updated: October 2026',
      printBtn: 'Print / PDF',
      sec1Title: '1. Scope and Direct Seller Status',
      sec1Text: 'Print Price Pro SIA ("PrintPrice") provides technical routing and operational infrastructure (Control Plane, deterministic pricing, preflight inspection, and PRINT IT marketplace matchmaking). The Print House acts at all times as the independent industrial manufacturer and direct seller to the customer.',
      sec2Title: '2. Technical Parameters, Machine Fleet & Accuracy',
      sec2Text: 'The Print House commits to maintaining accurate parameters in Control Plane regarding sheet sizes, speeds, press types (digital/offset), makeready waste rates, and hourly rates. Accurate profiles are required to maintain algorithmic estimation integrity.',
      sec3Title: '3. Binding Job Acceptance',
      sec3Text: 'Routed production orders become contractually binding upon formal acceptance within Control Plane. Once accepted, the Print House is obligated to produce and dispatch the books in strict accordance with the agreed specifications and preflight-validated PDF assets.',
      sec4Title: '4. Quality, Defect Remediation & Exclusions',
      sec4Text: 'The Print House is responsible for industrial manufacturing non-conformities (registration flaws, ink defects, improper folding, binding failures). The Print House is not responsible for typos or low-resolution image flaws pre-existing in customer assets once signed off following preflight validation.',
      sec5Title: '5. Commercial Model: Direct Billing & 4% Platform Fee',
      sec5List: [
        'Direct customer billing: The Print House invoices and collects production amounts directly from the buyer through its own payment accounts.',
        'Monthly 4% fee: PrintPrice invoices the Print House monthly for a 4% marketplace commission on the net manufacturing turnover collected for jobs originated via PRINT IT.',
        'Paper procurement exclusion: The 4% platform fee does NOT apply to raw paper purchases or paper merchant transactions.',
        'Zero approved recurring fixed fees: No mandatory monthly maintenance fees, sign-up fees, or minimum volume commitments are approved under this draft.',
      ],
      sec6Title: '6. Non-Circumvention and Asset Confidentiality',
      sec6Text: 'The Print House agrees not to circumvent the platform to divert business originated through PRINT IT to bypass agreed fees. Furthermore, all customer manuscripts, cover art, and business data must be treated under strict confidentiality and used exclusively for fulfilling the specific job.',
      sec7Title: '7. No Volume Guarantee',
      sec7Text: 'Registration in Control Plane does not guarantee any minimum order volume or geographical exclusivity; routing is determined algorithmically by technical fit and logistical suitability.',
      sec8Title: '8. Governing Law and Jurisdiction',
      sec8Text: 'These terms are governed by the laws of the Republic of Latvia. Any legal dispute shall be submitted to the exclusive jurisdiction of the competent courts of Rīga, Latvia.',
    },
    de: {
      back: '← Zurück zum Rechts- und Vertrauenszentrum',
      badge: 'ALLGEMEINE BEDINGUNGEN FÜR DRUCKEREIEN',
      title: 'Partnerbedingungen für Druckereien',
      draftNotice: 'ENTWURF VORBEHALTLICH RECHTLICHER PRÜFUNG / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Regelt die Einbindung von Druckbetrieben in PRINT IT und die Nutzung von Control Plane. Basiert auf bestätigten kaufmännischen Entscheidungen.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Letzte Aktualisierung: Oktober 2026',
      printBtn: 'Drucken / PDF',
      sec1Title: '1. Vertragsgegenstand und Direkthersteller-Status',
      sec1Text: 'Print Price Pro SIA („PrintPrice“) stellt technologische Software (Control Plane, Preflight, Routing) bereit. Die Druckerei agiert jederzeit als unabhängiger industrieller Hersteller und direkter kaufmännischer Verkäufer gegenüber dem Kunden.',
      sec2Title: '2. Technische Maschinenprofile und Datenwahrheit',
      sec2Text: 'Die Druckerei verpflichtet sich zur wahrheitsgetreuen Pflege ihrer Bogenformate, Maschinengeschwindigkeiten, Rüstzeiten und Stundensätze in Control Plane.',
      sec3Title: '3. Verbindliche Auftragsannahme',
      sec3Text: 'Ein vermittelter Auftrag wird mit der Annahme in Control Plane verbindlich. Die Druckerei ist verpflichtet, das Werk gemäß den im Auftrag vereinbarten Spezifikationen und den geprüften PDF-Daten herzustellen.',
      sec4Title: '4. Qualitätsmängel und Nachbesserung',
      sec4Text: 'Die Druckerei haftet für herstellungsbedingte Mängel (Passerfehler, Farbabweichungen, mangelhafte Bindung). Für Fehler in den vom Kunden freigegebenen Quelldateien haftet die Werkstatt nicht.',
      sec5Title: '5. Vergütung: Direktabrechnung und 4 % Plattformprovision',
      sec5List: [
        'Direktabrechnung: Die Druckerei stellt dem Besteller den Fertigungsbetrag direkt in Rechnung und vereinnahmt diesen unmittelbar.',
        'Monatliche 4 % Provision: PrintPrice stellt der Druckerei monatlich eine Provision von 4 % auf den vereinnahmten Netto-Fertigungsumsatz für über PRINT IT vermittelte Aufträge in Rechnung.',
        'Keine Provision auf Papier: Die Provision fällt NICHT auf den Rohpapiereinkauf an.',
        'Keine fixen Monatsgebühren: Es bestehen keine genehmigten monatlichen Grundgebühren oder Mindestumsatzpflichten.',
      ],
      sec6Title: '6. Umgehungsverbot und Vertraulichkeit',
      sec6Text: 'Die Druckerei verpflichtet sich, keine über PRINT IT angebahnten Kundenbeziehungen zur Umgehung der Plattformprovision zu verlagern. Kundendateien sind streng vertraulich zu behandeln.',
      sec7Title: '7. Kein Mindestvolumen',
      sec7Text: 'Die Aufnahme in das Netzwerk begründet keinen Anspruch auf ein Mindestauftragsvolumen.',
      sec8Title: '8. Anwendbares Recht und Gerichtsstand',
      sec8Text: 'Es gilt das Recht der Republik Lettland. Ausschließlicher Gerichtsstand ist Rīga, Lettland.',
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
              <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {t.sec5List.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
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
            <span>Print Price Pro SIA • Partner & Node Governance</span>
            <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
              {t.back}
            </Link>
          </div>

        </div>
      </Container>
    </Section>
  );
}

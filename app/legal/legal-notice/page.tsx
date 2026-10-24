'use client';

import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n';

export default function LegalNoticePage() {
  const { locale } = useLocale();

  const printDocument = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const t = {
    es: {
      back: '← Volver al Centro Legal y de Confianza',
      badge: 'AVISO LEGAL Y DATOS IDENTIFICATIVOS (IMPRINT)',
      title: 'Aviso Legal e Información Corporativa',
      draftNotice: 'BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Este documento refleja la información corporativa e identificativa real de la entidad titular conforme a la legislación letona y de la UE. Publicado para máxima transparencia técnica.',
      version: 'Versión: 2026.1-draft',
      lastUpdated: 'Última actualización: Octubre 2026',
      printBtn: 'Imprimir / PDF',
      sec1Title: '1. Identificación del Titular del Sitio Web',
      sec1Text: 'En cumplimiento de la legislación aplicable de la Unión Europea y de la República de Letonia (Ley de la Sociedad de la Información — Informācijas sabiedrības pakalpojumu likums), se informa a los usuarios de los datos identificativos y de contacto de la entidad titular de la plataforma PrintPrice Pro:',
      companyName: 'Denominación Social:',
      legalForm: 'Forma Jurídica:',
      legalFormVal: 'Sociedad de Responsabilidad Limitada (Sabiedrība ar ierobežotu atbildību — SIA), constituida conforme al derecho de la República de Letonia.',
      regNumber: 'Número de Registro Mercantil:',
      regNumberVal: '40203631570 (Registro de Empresas de la República de Letonia / Latvijas Republikas Uzņēmumu reģistrs).',
      vatId: 'Número de Identificación Fiscal / IVA (VAT ID):',
      vatIdVal: 'LV40203631570',
      address: 'Domicilio Social:',
      addressVal: 'Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia.',
      emailContact: 'Correo Electrónico de Contacto General:',
      emailPrivacy: 'Correo Electrónico de Privacidad y RGPD:',
      sec2Title: '2. Objeto y Alcance del Sitio Web',
      sec2Text: 'El sitio web printprice.pro y sus subdominios asociados constituyen la plataforma corporativa e informativa de PrintPrice OS, un entorno tecnológico modular para la industria gráfica que comprende: PRICE IT (cálculo de costes determinista), FIX IT (preflight determinista), PRINT IT (marketplace de producción gráfica), Mockup 3D (visualizador complementario de libros) y Control Plane (espacio operativo para talleres y proveedores de papel).',
      sec2Note: 'Print Price Pro SIA opera exclusivamente como proveedor tecnológico de software y enrutamiento técnico. Salvo estipulación expresa en contrario, Print Price Pro SIA no actúa como fabricante material de productos impresos ni como distribuidor físico de papel.',
      sec3Title: '3. Propiedad Intelectual e Industrial',
      sec3Text: 'Todos los contenidos de la plataforma (códigos fuente, especificaciones de cálculo, marcas, logotipos, arquitecturas y textos técnicos) son propiedad exclusiva de Print Price Pro SIA o se explotan bajo autorización legítima. Queda prohibida su reproducción o explotación no autorizada.',
      sec4Title: '4. Responsabilidad sobre Contenidos y Enlaces Externos',
      sec4Text: 'Print Price Pro SIA vela por la exactitud de la información técnica disponible. Sin embargo, los cálculos y especificaciones indicativas quedan supeditados a la confirmación técnica y contractual de cada pedido con el taller ejecutor. La plataforma no se responsabiliza del contenido de sitios web de terceros enlazados.',
      sec5Title: '5. Legislación Aplicable y Resolución de Conflictos',
      sec5Text: 'El presente aviso se rige por el derecho de la República de Letonia. Para reclamaciones en el ámbito de consumo europeo, los usuarios pueden acudir al Centro de Protección de los Derechos de los Consumidores de Letonia (PTAC — ptac.gov.lv) o a la plataforma ODR de la Comisión Europea.',
    },
    en: {
      back: '← Return to Legal & Trust Center',
      badge: 'LEGAL NOTICE & COMPANY IMPRINT',
      title: 'Legal Notice & Corporate Information',
      draftNotice: 'DRAFT PENDING FORMAL LEGAL APPROVAL / BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA',
      draftDesc: 'This document reflects the corporate identity and regulatory information of the operating entity under Latvian and EU law. Published for transparent technical governance.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Last updated: October 2026',
      printBtn: 'Print / PDF',
      sec1Title: '1. Identification of the Website Operator',
      sec1Text: 'In compliance with applicable European Union and Republic of Latvia legislation (Information Society Services Law — Informācijas sabiedrības pakalpojumu likums), the identifying information of the corporate entity operating PrintPrice Pro is provided below:',
      companyName: 'Company Name:',
      legalForm: 'Legal Form:',
      legalFormVal: 'Limited Liability Company (Sabiedrība ar ierobežotu atbildību — SIA), organized under the laws of the Republic of Latvia.',
      regNumber: 'Commercial Registration Number:',
      regNumberVal: '40203631570 (Enterprise Register of the Republic of Latvia / Latvijas Republikas Uzņēmumu reģistrs).',
      vatId: 'VAT Registration Number (VAT ID):',
      vatIdVal: 'LV40203631570',
      address: 'Registered Address:',
      addressVal: 'Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Latvia.',
      emailContact: 'General Inquiries Email:',
      emailPrivacy: 'Data Privacy & GDPR Email:',
      sec2Title: '2. Purpose and Scope of the Platform',
      sec2Text: 'The website printprice.pro and its subdomains provide the corporate and technical interface of PrintPrice OS, comprising: PRICE IT (deterministic cost engine), FIX IT (deterministic preflight inspection), PRINT IT (print matchmaking marketplace), Mockup 3D (visual preview tool for digital promotion), and Control Plane (operating environment for print shops and paper distributors).',
      sec2Note: 'Print Price Pro SIA operates strictly as a software and connectivity technology provider. Unless explicitly agreed otherwise in writing, Print Price Pro SIA does not act as a physical manufacturer of printed products nor as a paper merchant.',
      sec3Title: '3. Intellectual and Industrial Property',
      sec3Text: 'All platform content, design systems, algorithms, source code, logos, and technical documentation are the exclusive intellectual property of Print Price Pro SIA or licensed from third parties. Unauthorized reproduction or reverse engineering is prohibited.',
      sec4Title: '4. Liability for Technical Content and Outbound Links',
      sec4Text: 'While Print Price Pro SIA ensures rigorous software performance, all calculations and estimates are indicative and subject to agreed order specifications. Print Price Pro SIA assumes no liability for external third-party links or content.',
      sec5Title: '5. Governing Law and Dispute Resolution',
      sec5Text: 'This Legal Notice is governed by the laws of the Republic of Latvia. Consumers within the European Union may submit disputes to the Latvian Consumer Rights Protection Centre (PTAC — ptac.gov.lv) or the European Commission Online Dispute Resolution platform.',
    },
    de: {
      back: '← Zurück zum Rechts- und Vertrauenszentrum',
      badge: 'IMPRESSUM UND UNTERNEHMENSANGABEN',
      title: 'Impressum und rechtliche Hinweise',
      draftNotice: 'ENTWURF VORBEHALTLICH RECHTLICHER PRÜFUNG / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Dieses Dokument enthält die satzungsmäßigen und rechtlichen Angaben des Betreibers gemäß lettischem und EU-Recht. Veröffentlicht im Sinne maximaler Transparenz.',
      version: 'Version: 2026.1-draft',
      lastUpdated: 'Letzte Aktualisierung: Oktober 2026',
      printBtn: 'Drucken / PDF',
      sec1Title: '1. Angaben gemäß Teledienstrecht / Betreiberidentität',
      sec1Text: 'Gemäß den Vorschriften der Europäischen Union und der Republik Lettland (Gesetz über die Dienste der Informationsgesellschaft — Informācijas sabiedrības pakalpojumu likums) werden folgende Betreiberangaben mitgeteilt:',
      companyName: 'Firmenname / Handelsbezeichnung:',
      legalForm: 'Rechtsform:',
      legalFormVal: 'Gesellschaft mit beschränkter Haftung (Sabiedrība ar ierobežotu atbildību — SIA), gegründet nach dem Recht der Republik Lettland.',
      regNumber: 'Handelsregisternummer:',
      regNumberVal: '40203631570 (Unternehmensregister der Republik Lettland / Latvijas Republikas Uzņēmumu reģistrs).',
      vatId: 'Umsatzsteuer-Identifikationsnummer (USt-IdNr.):',
      vatIdVal: 'LV40203631570',
      address: 'Sitz der Gesellschaft:',
      addressVal: 'Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Lettland.',
      emailContact: 'Allgemeiner Kontakt per E-Mail:',
      emailPrivacy: 'Datenschutz & DSGVO E-Mail:',
      sec2Title: '2. Gegenstand und Umfang der Plattform',
      sec2Text: 'Die Website printprice.pro sowie verbundene Subdomänen bilden die Betriebs- und Informationsschnittstelle von PrintPrice OS: PRICE IT (deterministische Kalkulation), FIX IT (deterministisches Preflight), PRINT IT (Produktions-Marktplatz), Mockup 3D (visuelle Buchvorschau) und Control Plane (Betriebsumgebung für Werkstätten und Papierlieferanten).',
      sec2Note: 'Print Price Pro SIA agiert ausschließlich als technologischer Softwareanbieter. Print Price Pro SIA ist, sofern nicht ausdrücklich schriftlich vereinbart, weder physischer Druckhersteller noch Papierhändler.',
      sec3Title: '3. Geistiges Eigentum und Urheberrecht',
      sec3Text: 'Sämtliche Inhalte der Plattform (Quellcode, Kalkulationsmatrizen, Marken, Logos und technische Dokumentationen) sind ausschließliches geistiges Eigentum der Print Price Pro SIA oder lizenziert.',
      sec4Title: '4. Haftung für Inhalte und externe Links',
      sec4Text: 'Trotz sorgfältiger technischer Pflege sind automatisierte Berechnungen indikativ und verbindlich erst mit der Auftragsbestätigung. Für Inhalte verlinkter externer Dritter wird keine Haftung übernommen.',
      sec5Title: '5. Anwendbares Recht und Streitbeilegung',
      sec5Text: 'Es gilt das Recht der Republik Lettland. Verbraucher in der Europäischen Union können sich an das lettische Verbraucherschutzzentrum (PTAC — ptac.gov.lv) wenden.',
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
              <p style={{ marginBottom: '1.25rem' }}>{t.sec1Text}</p>
              
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  fontSize: '0.925rem',
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{t.companyName} </strong>
                  <span>Print Price Pro SIA</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{t.legalForm} </strong>
                  <span>{t.legalFormVal}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{t.regNumber} </strong>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{t.regNumberVal}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{t.vatId} </strong>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{t.vatIdVal}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{t.address} </strong>
                  <span>{t.addressVal}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{t.emailContact} </strong>
                  <a href="mailto:info@printprice.pro" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
                    info@printprice.pro
                  </a>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{t.emailPrivacy} </strong>
                  <a href="mailto:privacy@printprice.pro" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
                    privacy@printprice.pro
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t.sec2Title}
              </h2>
              <p style={{ marginBottom: '1rem' }}>{t.sec2Text}</p>
              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: '3px solid var(--accent-primary)',
                  fontSize: '0.9rem',
                }}
              >
                {t.sec2Note}
              </div>
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
            <span>Print Price Pro SIA • Legal & Trust Governance</span>
            <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
              {t.back}
            </Link>
          </div>

        </div>
      </Container>
    </Section>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useLocale } from '@/lib/i18n';

type RoleKey = 'authors' | 'publishers' | 'printers' | 'suppliers';

export default function LegalTrustCenterPage() {
  const { locale } = useLocale();
  const [activeRole, setActiveRole] = useState<RoleKey>('authors');

  const printPage = () => {
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
      badge: 'CENTRO LEGAL, DE CONFIANZA Y GOBERNANZA TÉCNICA',
      title: 'Marco Regulatorio y Documentación Legal Vigente',
      subtitle: 'Acceso centralizado a los documentos contractuales vigentes, políticas de privacidad y directrices operativas de PrintPrice Pro SIA.',
      printBtn: 'Imprimir / PDF',
      cookiesBtn: 'Preferencias de cookies',
      approvedDocsTitle: 'Documentos Legales Vigentes y Aplicables',
      approvedDocsSub: 'Los siguientes documentos regulan el uso de la plataforma, el tratamiento de datos y las relaciones comerciales activas:',
      docs: [
        {
          id: 'terms',
          title: 'Términos de Servicio de la Plataforma',
          version: 'Versión v1.1',
          desc: 'Regula el acceso al software, estimaciones algorítmicas, preflight, delimitación de responsabilidades y la intermediación técnica.',
          href: '/legal/terms-of-service',
          status: 'Vigente',
        },
        {
          id: 'privacy',
          title: 'Política de Privacidad (RGPD)',
          version: 'Versión v1.1',
          desc: 'Bases jurídicas conforme al Reglamento (UE) 2016/679, tratamiento de archivos PDF, derechos de los usuarios y contacto con DVI.',
          href: '/legal/privacy-policy',
          status: 'Vigente',
        },
        {
          id: 'imprint',
          title: 'Aviso Legal e Identidad Corporativa (Imprint)',
          version: 'Versión v1.1',
          desc: 'Datos registrales de Print Price Pro SIA (Reg. 40203631570, IVA LV40203631570, Rīga), propiedad intelectual y responsabilidad editorial.',
          href: '/legal/legal-notice',
          status: 'Vigente',
        },
        {
          id: 'partners',
          title: 'Condiciones para Imprentas y Partners',
          version: 'Versión v1.1',
          desc: 'Regula la participación de talleres gráficos en PRINT IT, calibración de maquinaria, facturación directa y comisión mensual del 4 %.',
          href: '/legal/partner-terms',
          status: 'Vigente',
        },
      ],
      readDocBtn: 'Consultar documento vigente ➔',
      rolesHeading: 'Marco Operativo por Perfil en la Cadena Gráfica',
      rolesSub: 'Comprende cómo se articulan los derechos, contratos y flujos económicos según tu actividad:',
      roles: {
        authors: {
          title: 'Autores y Particulares',
          desc: 'Personas físicas o creadores que encargan la fabricación de sus obras personales.',
          points: [
            'Contrato de fabricación directo: La compraventa y fabricación se formaliza directamente con la imprenta ejecutora seleccionada.',
            'Bienes confeccionados según especificaciones: Conforme al Art. 16(c) de la Directiva 2011/83/UE, los libros personalizados están exentos del derecho legal de desistimiento de 14 días una vez iniciada la producción. Esta excepción no afecta en ningún caso a los derechos legales del consumidor por defectos de fabricación o faltas de conformidad del taller.',
            'Propiedad intelectual íntegra: El autor conserva en todo momento el 100 % de los derechos sobre su manuscrito y cubierta.',
          ],
        },
        publishers: {
          title: 'Editoriales y Clientes B2B',
          desc: 'Sellos editoriales, instituciones y empresas que gestionan catálogos y tiradas profesionales.',
          points: [
            'Relación mercantil directa B2B: Facturación directa y condiciones comerciales acordadas con las imprentas de la red.',
            'Trazabilidad técnica por pedido: Cada orden queda asociada al informe determinista de preflight y las especificaciones técnicas confirmadas.',
            'Acuerdos de tratamiento de datos: Cuando se traten datos personales por cuenta del cliente corporativo, se formalizarán los acuerdos pertinentes con arreglo al Art. 28 del RGPD.',
          ],
        },
        printers: {
          title: 'Imprentas y Talleres Gráficos',
          desc: 'Talleres industriales y centros de producción gráfica registrados en Control Plane.',
          points: [
            'Condición de vendedor directo: La imprenta factura y cobra directamente al comprador. PrintPrice Pro no actúa como revendedor.',
            'Comisión mensual del 4 %: Se aplica una comisión de marketplace del 4 % sobre el importe neto de fabricación cobrado para pedidos canalizados por PRINT IT.',
            'Responsabilidad de fabricación: El taller responde de la calidad industrial del producto (registro, corte, encuadernación), mientras que la plataforma responde del funcionamiento de sus herramientas de software.',
          ],
        },
        suppliers: {
          title: 'Proveedores de Papel',
          desc: 'Distribuidores y fabricantes de sustratos que conectan sus referencias en el catálogo maestro.',
          points: [
            'Conectividad de catálogo: Publicación de referencias de papel para su consideración técnica en el motor de cálculo editorial.',
            'Relación comercial autónoma: Las transacciones de suministro de papel se conciertan directamente entre las imprentas y los distribuidores.',
            'Régimen comercial en definición: Las condiciones y posibles esquemas tarifarios para distribuidores se encuentran actualmente en fase de diseño técnico.',
          ],
        },
      },
      consultationNoticeTitle: 'Modernización Regulatoria y Documentación Técnica Interna',
      consultationNoticeText: 'PrintPrice Pro mantiene en fase de consulta técnica y regulatoria una serie de propuestas de actualización contractual (incluyendo matrices de modelos de negocio, inventarios de cookies y políticas específicas de uso aceptable). Dichos textos se conservan en la documentación técnica del repositorio (docs/implementation/legal-trust-center/) para su revisión por la asesoría jurídica y la dirección, no siendo aplicables a los usuarios hasta su formal aprobación y publicación oficial.',
      metadata: {
        entity: 'Entidad titular: Print Price Pro SIA',
        registration: 'Registro Mercantil: 40203631570 | IVA: LV40203631570',
        headquarters: 'Domicilio: Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia',
        contact: 'Canales oficiales: info@printprice.pro | privacy@printprice.pro',
      },
    },
    en: {
      badge: 'LEGAL, TRUST & GOVERNANCE CENTER',
      title: 'Regulatory Framework & In-Force Legal Documentation',
      subtitle: 'Centralized access to in-force contractual terms, privacy policies, and operational governance from PrintPrice Pro SIA.',
      printBtn: 'Print / PDF',
      cookiesBtn: 'Cookie preferences',
      approvedDocsTitle: 'Applicable In-Force Legal Documents',
      approvedDocsSub: 'The following approved documents govern platform access, data protection, and active commercial relationships:',
      docs: [
        {
          id: 'terms',
          title: 'Platform Terms of Service',
          version: 'Version v1.1',
          desc: 'Governs software access, algorithmic estimations, preflight tools, allocation of liabilities, and technical routing.',
          href: '/legal/terms-of-service',
          status: 'In Force',
        },
        {
          id: 'privacy',
          title: 'Privacy Policy (GDPR)',
          version: 'Version v1.1',
          desc: 'Legal bases under Regulation (EU) 2016/679, PDF asset processing, user rights, and contact with the Latvian DVI.',
          href: '/legal/privacy-policy',
          status: 'In Force',
        },
        {
          id: 'imprint',
          title: 'Legal Notice & Corporate Identity (Imprint)',
          version: 'Version v1.1',
          desc: 'Statutory corporate information for Print Price Pro SIA (Reg. 40203631570, VAT LV40203631570, Rīga), IP rights, and editorial notices.',
          href: '/legal/legal-notice',
          status: 'In Force',
        },
        {
          id: 'partners',
          title: 'Partner Terms (Print Houses)',
          version: 'Version v1.1',
          desc: 'Governs print workshop participation in PRINT IT, press profiling, direct customer billing, and the monthly 4% platform fee.',
          href: '/legal/partner-terms',
          status: 'In Force',
        },
      ],
      readDocBtn: 'View in-force document ➔',
      rolesHeading: 'Operational Framework by Ecosystem Role',
      rolesSub: 'Understand how rights, contracts, and financial flows operate based on your specific activity:',
      roles: {
        authors: {
          title: 'Authors & Individuals',
          desc: 'Individual creators or authors ordering book manufacturing for personal projects.',
          points: [
            'Direct manufacturing agreement: The sales and production agreement is executed directly with the assigned print shop.',
            'Custom goods statutory exception: Pursuant to Article 16(c) of Directive 2011/83/EU, personalized custom goods are exempt from the statutory 14-day cooling-off withdrawal right once production commences. This exception does not prejudice the consumer statutory rights regarding manufacturing defects or non-conformity.',
            'Full intellectual property ownership: Authors retain 100% intellectual property ownership of their manuscripts and artwork.',
          ],
        },
        publishers: {
          title: 'Publishers & B2B Clients',
          desc: 'Publishing houses, corporate clients, and organizations managing professional print runs.',
          points: [
            'Direct B2B commercial terms: Direct billing and commercial terms executed with participating printing facilities.',
            'Order-level technical traceability: Every job is tied to deterministic preflight audit logs and confirmed order specifications.',
            'Data processing agreements: Data processing terms pursuant to Article 28 GDPR apply where personal data is processed on behalf of corporate clients.',
          ],
        },
        printers: {
          title: 'Print Houses & Production Nodes',
          desc: 'Industrial printing facilities registered in Control Plane.',
          points: [
            'Direct seller status: The print shop invoices and collects payment directly from the buyer. PrintPrice Pro is not a reseller.',
            'Monthly 4% platform fee: A 4% marketplace commission applies to net manufacturing revenue collected on jobs routed via PRINT IT.',
            'Manufacturing liability: The print facility is responsible for industrial print quality (registration, trimming, binding), while PrintPrice Pro is responsible for software operation.',
          ],
        },
        suppliers: {
          title: 'Paper Suppliers',
          desc: 'Paper mills and distributors connecting paper grades into the master catalog.',
          points: [
            'Master catalog federation: Integration of substrate specs for consideration in the cost engine.',
            'Independent supply contracts: Paper procurement transactions are concluded directly between print shops and paper distributors.',
            'Commercial framework under definition: Commercial terms and distribution mechanisms remain currently under technical design.',
          ],
        },
      },
      consultationNoticeTitle: 'Internal Regulatory Documentation & Draft Modernization',
      consultationNoticeText: 'PrintPrice Pro maintains ongoing regulatory review dossiers and draft proposals (including contract matrices, cookie inventories, and acceptable use guidelines) stored in repository technical documentation (docs/implementation/legal-trust-center/). These drafts remain subject to formal review and do not apply to users until officially approved and promulgated.',
      metadata: {
        entity: 'Operating entity: Print Price Pro SIA',
        registration: 'Enterprise Registry: 40203631570 | VAT ID: LV40203631570',
        headquarters: 'Registered Office: Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Latvia',
        contact: 'Official channels: info@printprice.pro | privacy@printprice.pro',
      },
    },
    de: {
      badge: 'RECHTS-, VERTRAUENS- & GOVERNANCE-ZENTRUM',
      title: 'Regulatorisches Rahmenwerk & Gültige Dokumente',
      subtitle: 'Zentraler Zugang zu den gültigen Vertragsbedingungen, Datenschutzrichtlinien und Betriebsgrundsätzen der Print Price Pro SIA.',
      printBtn: 'Drucken / PDF',
      cookiesBtn: 'Cookie-Einstellungen',
      approvedDocsTitle: 'Gültige und anwendbare Rechtsdokumente',
      approvedDocsSub: 'Die folgenden genehmigten Dokumente regeln die Plattformnutzung, den Datenschutz und die aktiven Geschäftsbeziehungen:',
      docs: [
        {
          id: 'terms',
          title: 'Allgemeine Nutzungsbedingungen',
          version: 'Version v1.1',
          desc: 'Regelt den Softwarezugang, algorithmische Kalkulationen, Preflight, Haftungsgrenzen und das technische Routing.',
          href: '/legal/terms-of-service',
          status: 'Gültig',
        },
        {
          id: 'privacy',
          title: 'Datenschutzerklärung (DSGVO)',
          version: 'Version v1.1',
          desc: 'Rechtsgrundlagen gemäß DSGVO, Umgang mit PDF-Druckdaten, Betroffenenrechte und Aufsichtsbehörde (DVI).',
          href: '/legal/privacy-policy',
          status: 'Gültig',
        },
        {
          id: 'imprint',
          title: 'Impressum & Unternehmensangaben',
          version: 'Version v1.1',
          desc: 'Pflichtangaben der Print Price Pro SIA (Reg.-Nr. 40203631570, USt-IdNr. LV40203631570, Rīga), Urheberrecht und Haftungsausschluss.',
          href: '/legal/legal-notice',
          status: 'Gültig',
        },
        {
          id: 'partners',
          title: 'Partnerbedingungen für Druckereien',
          version: 'Version v1.1',
          desc: 'Bedingungen für Druckbetriebe in PRINT IT, Maschinenprofile, Direktabrechnung und 4 % Plattformprovision.',
          href: '/legal/partner-terms',
          status: 'Gültig',
        },
      ],
      readDocBtn: 'Gültiges Dokument ansehen ➔',
      rolesHeading: 'Betriebsmodell nach Rollen im Druckökosystem',
      rolesSub: 'Erfahren Sie, wie Verträge und Zahlungsströme für Ihr Profil ausgestaltet sind:',
      roles: {
        authors: {
          title: 'Autoren & Selbstdrucker',
          desc: 'Privatpersonen und Autoren, die Buchprojekte in Auftrag geben.',
          points: [
            'Direkter Herstellungsvertrag: Der Kauf- und Werkvertrag wird unmittelbar mit der ausführenden Druckerei geschlossen.',
            'Gesetzliche Ausnahme vom Widerrufsrecht: Gemäß Art. 16 lit. c der Richtlinie 2011/83/EU besteht bei individuell angefertigten Waren kein 14-tägiges Widerrufsrecht nach Produktionsbeginn. Gesetzliche Gewährleistungsrechte bei herstellungsbedingten Druckmängeln bleiben davon unberührt.',
            'Vollständiges Urheberrecht: Autoren behalten alle Rechte an Manuskript und Cover.',
          ],
        },
        publishers: {
          title: 'Verlage & B2B-Kunden',
          desc: 'Verlage, Institutionen und Unternehmen mit professionellen Druckauflagen.',
          points: [
            'Direkte B2B-Konditionen: Direktabrechnung und kaufmännische Vereinbarungen mit den Produktionsstätten.',
            'Technische Nachvollziehbarkeit: Jeder Auftrag ist mit dem deterministischen Preflight-Bericht verknüpft.',
            'Auftragsverarbeitung: Soweit personenbezogene Daten im Auftrag verarbeitet werden, gelten die Vorgaben von Art. 28 DSGVO.',
          ],
        },
        printers: {
          title: 'Druckereien & Produktionsbetriebe',
          desc: 'In Control Plane registrierte Druckwerkstätten.',
          points: [
            'Direktverkäufer-Status: Die Druckerei rechnet direkt mit dem Besteller ab. PrintPrice Pro ist kein Wiederverkäufer.',
            'Monatliche 4 % Provision: Für über PRINT IT vermittelte Aufträge wird eine Provision von 4 % auf den Netto-Fertigungsumsatz fällig.',
            'Herstellungshaftung: Die Werkstatt haftet für die industrielle Ausführung (Passer, Bindung, Schnitt), die Plattform für die Softwarefunktion.',
          ],
        },
        suppliers: {
          title: 'Papierlieferanten',
          desc: 'Händler und Hersteller, die Papiersorten in den Masterkatalog einbinden.',
          points: [
            'Kataloganbindung: Bereitstellung von Spezifikationen für die Kalkulationsengine.',
            'Autonome Lieferverträge: Papierbestellungen werden direkt zwischen Druckereien und Großhändlern abgewickelt.',
            'Kommerzieller Rahmen: Vertriebskonditionen befinden sich in der technischen Ausarbeitung.',
          ],
        },
      },
      consultationNoticeTitle: 'Regulatorische Entwürfe & Interne Dokumentation',
      consultationNoticeText: 'PrintPrice Pro pflegt Entwürfe zur regulatorischen Modernisierung im Dokumentationsbereich des Repositoriums (docs/implementation/legal-trust-center/). Diese Entwürfe dienen der Vorbereitung durch Geschäftsführung und Rechtsberatung und entfalten vor ihrer formellen Genehmigung keine rechtliche Wirkung für Nutzer.',
      metadata: {
        entity: 'Betreiberin: Print Price Pro SIA',
        registration: 'Handelsregister: 40203631570 | USt-IdNr.: LV40203631570',
        headquarters: 'Sitz: Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Lettland',
        contact: 'Offizielle Kanäle: info@printprice.pro | privacy@printprice.pro',
      },
    },
  }[locale];

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <Section variant="primary" style={{ paddingTop: '8rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
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
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.15 }}>
                  {t.title}
                </h1>
                <p style={{ marginTop: '1.25rem', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px' }}>
                  {t.subtitle}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button variant="secondary" size="sm" onClick={openCookiePreferences} style={{ fontFamily: 'var(--font-mono)' }}>
                  {t.cookiesBtn}
                </Button>
                <Button variant="secondary" size="sm" onClick={printPage} style={{ fontFamily: 'var(--font-mono)' }}>
                  {t.printBtn}
                </Button>
              </div>
            </div>

            {/* Corporate Identification Card */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '0.75rem 1.5rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
              }}
            >
              <div>{t.metadata.entity}</div>
              <div>{t.metadata.registration}</div>
              <div>{t.metadata.headquarters}</div>
              <div>{t.metadata.contact}</div>
            </div>

          </div>
        </Container>
      </Section>

      {/* In-Force Documents Grid */}
      <Section variant="secondary" style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                {t.approvedDocsTitle}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                {t.approvedDocsSub}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {t.docs.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.25rem',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(0, 200, 83, 0.1)',
                          color: '#00c853',
                          border: '1px solid rgba(0, 200, 83, 0.3)',
                          fontWeight: 700,
                        }}
                      >
                        {doc.status} • {doc.version}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                      {doc.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {doc.desc}
                    </p>
                  </div>

                  <Link
                    href={doc.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--accent-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      textDecoration: 'none',
                    }}
                  >
                    {t.readDocBtn}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Operational Role Tabs */}
      <Section variant="primary" style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                {t.rolesHeading}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                {t.rolesSub}
              </p>
            </div>

            {/* Role Navigation Pills */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem',
              }}
            >
              {(['authors', 'publishers', 'printers', 'suppliers'] as RoleKey[]).map((rk) => (
                <button
                  key={rk}
                  onClick={() => setActiveRole(rk)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: 'var(--radius-pill)',
                    background: activeRole === rk ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    color: activeRole === rk ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor: activeRole === rk ? 'var(--accent-primary)' : 'var(--border-color)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {t.roles[rk].title}
                </button>
              ))}
            </div>

            {/* Role Content Card */}
            <div
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {t.roles[activeRole].title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {t.roles[activeRole].desc}
              </p>

              <ul style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {t.roles[activeRole].points.map((pt, idx) => (
                  <li key={idx} style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Governance & Consultation Notice */}
            <div
              style={{
                marginTop: '4rem',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed var(--border-color)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                ℹ️ {t.consultationNoticeTitle}
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t.consultationNoticeText}
              </p>
            </div>

          </div>
        </Container>
      </Section>

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useLocale } from '@/lib/i18n';

type ProfileKey = 'authors' | 'publishers' | 'printers' | 'suppliers' | 'general';
type DocumentKey = 
  | 'terms_authors'
  | 'terms_publishers'
  | 'terms_printers'
  | 'terms_suppliers'
  | 'legal_notice'
  | 'general_terms'
  | 'privacy'
  | 'cookies'
  | 'ai_policy'
  | 'cancellations'
  | 'acceptable_use'
  | 'dpa';

export default function LegalTrustCenterPage() {
  const { locale } = useLocale();
  const [activeProfile, setActiveProfile] = useState<ProfileKey>('authors');
  const [activeDoc, setActiveDoc] = useState<DocumentKey>('terms_authors');

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
      badge: 'CENTRO LEGAL, DE CONFIANZA Y GOBERNANZA TÉCNICA',
      title: 'Marco Contractual y Términos de Servicio',
      subtitle: 'Información jurídica transparente, delimitación de responsabilidades y políticas de privacidad estructuradas por perfil operativo.',
      draftNotice: 'BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA / DRAFT PENDING FORMAL LEGAL APPROVAL',
      draftDesc: 'Este marco documental refleja las decisiones comerciales confirmadas de PrintPrice Pro y las propuestas técnicas en curso. Se publica con fines de transparencia operativa y no constituye contrato definitivo hasta su formalización.',
      profilesTitle: 'Selecciona tu perfil en la cadena gráfica',
      profiles: {
        authors: { title: 'Autores y Particulares', subtitle: 'Impresión personal sin trámites B2B', icon: 'author' },
        publishers: { title: 'Editoriales y Clientes Pro', subtitle: 'Catálogos, volumen y tiradas', icon: 'publisher' },
        printers: { title: 'Imprentas y Talleres', subtitle: 'Parque de máquinas y recepción', icon: 'factory' },
        suppliers: { title: 'Proveedores de Papel', subtitle: 'Catálogo maestro y tarifas', icon: 'layers' },
        general: { title: 'Documentación General', subtitle: 'Políticas transversales y privacidad', icon: 'shield' },
      },
      actions: {
        print: 'Imprimir / Guardar en PDF',
        cookies: 'Preferencias de cookies',
        contact: 'Canal de reclamaciones',
        fullTextTab: 'Texto íntegro articulado',
        summaryTab: 'Resumen en lenguaje claro',
      },
      metadata: {
        version: 'Versión: 2026.1-draft',
        effectiveDate: 'Fecha de actualización: Octubre 2026',
        jurisdiction: 'Entidad: Print Price Pro SIA (Reg. 40203631570, Rīga, Letonia)',
        prevalence: 'Idioma prevalente: Pendiente de dictamen jurídico (paridad informativa ES / EN / DE)',
      },
      docsListTitle: 'Documentos aplicables a este perfil',
    },
    en: {
      badge: 'LEGAL, TRUST & TECHNICAL GOVERNANCE CENTER',
      title: 'Contractual Framework & Terms of Service',
      subtitle: 'Transparent legal documentation, allocation of liabilities, and privacy policies structured by operational profile.',
      draftNotice: 'DRAFT PENDING FORMAL LEGAL APPROVAL / ENTWURF VORBEHALTLICH RECHTLICHER PRÜFUNG',
      draftDesc: 'This documentation reflects confirmed commercial decisions and ongoing technical implementation. It is published for operational transparency and remains subject to final legal sign-off.',
      profilesTitle: 'Select your role in the print ecosystem',
      profiles: {
        authors: { title: 'Authors & Individuals', subtitle: 'Personal book printing without B2B hurdles', icon: 'author' },
        publishers: { title: 'Publishers & B2B', subtitle: 'Catalogs, volume orders, and specs', icon: 'publisher' },
        printers: { title: 'Print Houses & Plants', subtitle: 'Press profiling and job intake', icon: 'factory' },
        suppliers: { title: 'Paper Suppliers', subtitle: 'Master catalog federation and rates', icon: 'layers' },
        general: { title: 'General Policies', subtitle: 'Cross-cutting privacy and platform terms', icon: 'shield' },
      },
      actions: {
        print: 'Print / Save as PDF',
        cookies: 'Cookie preferences',
        contact: 'Official claims channel',
        fullTextTab: 'Full contractual text',
        summaryTab: 'Plain language summary',
      },
      metadata: {
        version: 'Version: 2026.1-draft',
        effectiveDate: 'Last updated: October 2026',
        jurisdiction: 'Entity: Print Price Pro SIA (Reg. 40203631570, Rīga, Latvia)',
        prevalence: 'Governing language: Pending formal legal opinion (informative parity ES / EN / DE)',
      },
      docsListTitle: 'Applicable documents for this profile',
    },
    de: {
      badge: 'RECHTS-, VERTRAUENS- & GOVERNANCE-ZENTRUM',
      title: 'Vertragliches Rahmenwerk & Nutzungsbedingungen',
      subtitle: 'Transparente rechtliche Dokumentation, Haftungsverteilung und Datenschutzrichtlinien, gegliedert nach betrieblichem Profil.',
      draftNotice: 'ENTWURF VORBEHALTLICH RECHTLICHER PRÜFUNG / DRAFT PENDING LEGAL APPROVAL',
      draftDesc: 'Dieses Dokumentenwerk spiegelt die bestätigten geschäftlichen Entscheidungen von PrintPrice Pro wider. Es dient der Transparenz und stellt bis zur formalen Unterzeichnung einen Entwurf dar.',
      profilesTitle: 'Wählen Sie Ihre Funktion im Druckökosystem',
      profiles: {
        authors: { title: 'Autoren & Selbstdrucker', subtitle: 'Persönlicher Buchdruck ohne B2B-Hürden', icon: 'author' },
        publishers: { title: 'Verlage & Geschäftskunden', subtitle: 'Kataloge, Staffelpreise und Auflagen', icon: 'publisher' },
        printers: { title: 'Druckereien & Betriebe', subtitle: 'Maschinenprofilierung und Auftragseingang', icon: 'factory' },
        suppliers: { title: 'Papierlieferanten', subtitle: 'Masterkatalog und Großhandelspreise', icon: 'layers' },
        general: { title: 'Allgemeine Dokumente', subtitle: 'Plattformrichtlinien und Datenschutz', icon: 'shield' },
      },
      actions: {
        print: 'Drucken / Als PDF speichern',
        cookies: 'Cookie-Einstellungen',
        contact: 'Offizieller Reklamationskanal',
        fullTextTab: 'Vollständiger Vertragstext',
        summaryTab: 'Verständliche Zusammenfassung',
      },
      metadata: {
        version: 'Version: 2026.1-draft',
        effectiveDate: 'Stand: Oktober 2026',
        jurisdiction: 'Rechtsträger: Print Price Pro SIA (Reg. 40203631570, Rīga, Lettland)',
        prevalence: 'Maßgebliche Sprache: Vorbehaltlich juristischem Gutachten (inhaltliche Parität ES / EN / DE)',
      },
      docsListTitle: 'Geltende Dokumente für dieses Profil',
    }
  }[locale] || {
    badge: 'CENTRO LEGAL Y DE CONFIANZA',
    title: 'Marco Contractual y Términos de Servicio',
    subtitle: 'Información jurídica transparente y políticas de privacidad por perfil.',
    draftNotice: 'BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA',
    draftDesc: 'Documento en borrador sujeto a aprobación formal.',
    profilesTitle: 'Selecciona tu perfil',
    profiles: {
      authors: { title: 'Autores y Particulares', subtitle: 'Impresión personal', icon: 'author' },
      publishers: { title: 'Editoriales', subtitle: 'Volumen y catálogos', icon: 'publisher' },
      printers: { title: 'Imprentas', subtitle: 'Maquinaria y taller', icon: 'factory' },
      suppliers: { title: 'Proveedores de Papel', subtitle: 'Catálogo y tarifas', icon: 'layers' },
      general: { title: 'General', subtitle: 'Políticas transversales', icon: 'shield' },
    },
    actions: {
      print: 'Imprimir',
      cookies: 'Cookies',
      contact: 'Reclamaciones',
      fullTextTab: 'Texto íntegro',
      summaryTab: 'Resumen claro',
    },
    metadata: {
      version: 'Versión: 2026.1-draft',
      effectiveDate: 'Octubre 2026',
      jurisdiction: 'Print Price Pro SIA (Reg. 40203631570, Letonia)',
      prevalence: 'Idioma: Pendiente',
    },
    docsListTitle: 'Documentos aplicables',
  };

  // Content library for documents
  const DOCS_DATA: Record<DocumentKey, {
    title: { es: string; en: string; de: string };
    summary: { es: string[]; en: string[]; de: string[] };
    fullText: { es: string; en: string; de: string };
    slug: string;
  }> = {
    terms_authors: {
      title: {
        es: 'Condiciones para Particulares y Autores Independientes',
        en: 'Terms for Independent Authors & Individuals',
        de: 'Bedingungen für Autoren und Privatkunden',
      },
      summary: {
        es: [
          'La Imprenta seleccionada es quien te vende y fabrica físicamente el libro; PrintPrice es la plataforma tecnológica de cotización y revisión.',
          'Conserva el 100 % de tus derechos de autor; solo concedes permiso técnico para procesar y fabricar tu encargo.',
          'Fix It (Preflight) revisa sangrados, márgenes y resolución de portada e interior antes de la entrada a taller.',
          'Precio final transparente antes de pagar, con impuestos y gastos de envío desglosados sin suscripciones ocultas.',
          'Derecho de desistimiento: admisible antes de que empiece la fabricación física. Una vez iniciada la impresión del producto personalizado (art. 16.c Directiva 2011/83/UE), no cabe cancelación unilateral.',
          'Garantía legal por defectos de fabricación (páginas sueltas, manchas, errores de corte): derecho a reimpresión sin coste o abono.',
          'Fuero de consumo: tienes derecho a acudir a los juzgados de tu propio domicilio; no se impone sumisión exclusiva a Letonia.',
        ],
        en: [
          'The chosen print house is the direct seller and physical manufacturer of your book; PrintPrice is the software platform.',
          'You retain 100% of your copyright; you only grant limited technical permission to process and produce your order.',
          'Fix It (Preflight) validates bleeds, margins, and resolution before jobs enter the press room.',
          'Transparent all-inclusive final pricing before payment, with itemized VAT and shipping costs and no hidden subscriptions.',
          'Right of withdrawal: available before physical printing begins. Once production of custom goods starts (Art. 16.c Directive 2011/83/EU), unilateral cancellation is excluded.',
          'Legal warranty for manufacturing defects (loose pages, press stains, trimming errors): right to free reprint or refund.',
          'Consumer forum: you retain the right to litigate before the courts of your own EU country of residence; no exclusive foreign jurisdiction is imposed.',
        ],
        de: [
          'Die ausgewählte Druckerei ist die direkte Verkäuferin und Herstellerin Ihres Buches; PrintPrice stellt die Software bereit.',
          'Sie behalten 100 % Ihrer Urheberrechte; Sie gewähren lediglich eine technische Lizenz zur Auftragsabwicklung.',
          'Fix It (Preflight) prüft Anschnitt, Ränder und Auflösung, bevor das Buch an die Druckmaschine geht.',
          'Transparenter Endpreis vor der Zahlung, inklusive ausgewiesener MwSt. und Versandkosten – ohne versteckte Abos.',
          'Widerrufsrecht: möglich vor Beginn der physischen Fertigung. Nach Beginn der Fertigung individuell angefertigter Waren (Art. 16.c RL 2011/83/EU) besteht kein Widerrufsrecht.',
          'Gesetzliche Gewährleistung bei Herstellungsfehlern (lose Seiten, Farbflecken, Schnittfehler): Recht auf kostenlosen Nachdruck oder Erstattung.',
          'Verbrauchergerichtsstand: Sie können Klagen an Ihrem Wohnsitz in der EU erheben; kein erzwungener Gerichtsstand in Lettland.',
        ]
      },
      fullText: {
        es: `1. IDENTIDAD DEL VENDEDOR: En las compras formalizadas a través de PRINT IT, la imprenta adjudicataria es el fabricante y vendedor mercantil directo de la obra física. PrintPrice Pro actúa como plataforma tecnológica de intermediación.
2. DERECHOS DE AUTOR: El autor conserva íntegramente la titularidad sobre su obra. La licencia otorgada a la plataforma y al taller se circunscribe a la verificación técnica y producción del encargo.
3. PRECIO Y PAGOS: Todos los presupuestos reflejan el precio total con IVA y transporte. No existen cuotas de suscripción obligatorias para autores.
4. DESISTIMIENTO Y CANCELACIONES: Conforme al art. 16.c de la Directiva 2011/83/UE, no asiste derecho de desistimiento una vez iniciada la impresión física de bienes confeccionados según especificaciones del consumidor. Cancelaciones antes de entrar a máquina darán derecho a reembolso deduciendo costes de gestión técnica justificados.
5. CALIDAD Y SUBSANACIÓN: La imprenta responderá de los defectos mecánicos imputables a su proceso industrial mediante reimpresión preferente o abono.`,
        en: `1. SELLER IDENTITY: In orders executed through PRINT IT, the partner print house is the direct seller and physical manufacturer. PrintPrice Pro operates as an intermediary technology platform.
2. COPYRIGHT: The author retains full ownership of their work. The license granted is strictly limited to preflight verification and order fulfillment.
3. PRICING & PAYMENTS: All estimates show total cost including VAT and freight. No mandatory subscription fees apply to authors.
4. WITHDRAWAL & CANCELLATIONS: Under Art. 16.c of Directive 2011/83/EU, the right of withdrawal is excluded once physical printing of customized goods has commenced. Cancellations before press start entitle the author to a refund less reasonable prepress handling costs.
5. QUALITY & REMEDIATION: The print house is strictly liable for mechanical production defects, remediated via priority reprint or refund.`,
        de: `1. VERKÄUFERIDENTITÄT: Bei Bestellungen über PRINT IT ist die Partnerdruckerei die direkte Verkäuferin und Herstellerin. PrintPrice Pro fungiert als vermittelnde Technologieplattform.
2. URHEBERRECHT: Der Autor behält das uneingeschränkte Urheberrecht. Die eingeräumte Lizenz beschränkt sich streng auf technische Prüfung und Fertigung.
3. PREISE & ZAHLUNG: Alle Angebote verstehen sich als Endpreise inklusive MwSt. und Versand. Es gibt keine verpflichtenden Abogebühren für Autoren.
4. WIDERRUF: Gemäß Art. 16.c der Richtlinie 2011/83/EU ist das Widerrufsrecht bei Beginn der physischen Druckproduktion kundenspezifischer Waren ausgeschlossen.
5. QUALITÄT: Die Druckerei haftet für herstellungsbedingte Mängel durch kostenfreien Nachdruck oder Preisminderung.`,
      },
      slug: '/legal/terms-authors',
    },
    terms_printers: {
      title: {
        es: 'Condiciones para Imprentas y Talleres Asociados',
        en: 'Terms for Partner Print Houses & Plants',
        de: 'Bedingungen für Druckereien und Partnerbetriebe',
      },
      summary: {
        es: [
          'La Imprenta actúa como vendedora directa y fabricante de los pedidos recibidos a través de PRINT IT, facturando y cobrando directamente al cliente.',
          'Obligación de mantener actualizadas las especificaciones de maquinaria, pliegos mínimo/máximo, mermas de arranque y costes de encuadernación en Control Plane.',
          'Cada pedido formalizado queda estrictamente vinculado al archivo PDF auditado por preflight y al registro técnico de especificaciones acordadas.',
          'Comisión de plataforma del 4 % (propuesta): facturada mensualmente por PrintPrice sobre la base neta de producción cobrada (excluyendo IVA y portes desglosados).',
          'Los clientes propios que la imprenta gestione en Control Plane no devengan comisión del 4 % de marketplace.',
          'Confidencialidad rigurosa sobre los archivos de los clientes; prohibición de desvío o uso de las obras para otros fines.',
          'Suspensión motivada con preaviso de 30 días conforme al Reglamento P2B, salvo causas de fraude o cese mercantil.',
        ],
        en: [
          'The print house acts as direct seller and manufacturer for orders received via PRINT IT, invoicing and collecting payment directly from the client.',
          'Obligation to keep press specifications, sheet limits, setup waste, and bindery hourly rates current within Control Plane.',
          'Every executed order is bound to the preflight-audited PDF file and the recorded agreed technical specifications.',
          '4% platform fee (proposed): invoiced monthly by PrintPrice based on net collected manufacturing value (excluding VAT and itemized freight).',
          'A shop’s own private clients managed inside Control Plane do not incur the 4% marketplace fee.',
          'Strict confidentiality regarding customer files; prohibited diversion or secondary use of client works.',
          'Motivated suspension with 30-day notice under P2B Regulation, except in cases of fraud or commercial termination.',
        ],
        de: [
          'Die Druckerei agiert als direkte Verkäuferin und Herstellerin für Aufträge aus PRINT IT und rechnet direkt mit dem Kunden ab.',
          'Pflicht zur Pflege der realen Maschinenparameter, Bogenformate, Rüstzeiten und Bindearten im Control Plane.',
          'Jeder verbindliche Auftrag ist an die preflight-geprüfte PDF-Datei und das Spezifikationsprotokoll gebunden.',
          '4 % Plattformgebühr (Vorschlag): monatliche Abrechnung durch PrintPrice auf den vereinnahmten Netto-Fertigungswert (ohne MwSt. und Fracht).',
          'Eigene Werkstattkunden im Control Plane unterliegen nicht der 4 % Marktplatz-Provision.',
          'Strikte Vertraulichkeit bezüglich der Kundendateien; Verbot jeglicher zweckfremder Nutzung.',
          'Begründete Aussetzung mit 30 Tagen Frist gemäß P2B-Verordnung, außer bei Betrug oder Insolvenz.',
        ]
      },
      fullText: {
        es: `1. CONDICIÓN MERCANTIL: La Imprenta asume la condición de fabricante y vendedora de los trabajos formalizados en PRINT IT.
2. PARÁMETROS DE TALLER: La Imprenta mantendrá calibrados sus costes horarios, formatos de pliego y mermas en Control Plane.
3. COMISIÓN DEL 4 %: PrintPrice facturará mensualmente una comisión del 4 % sobre el importe neto de fabricación cobrado de pedidos del marketplace.
4. CALIDAD Y GARANTÍA: La Imprenta responderá de los defectos mecánicos de producción mediante reimpresión o nota de abono.
5. CONFIDENCIALIDAD: Queda prohibida la reproducción no autorizada de las obras de los clientes.`,
        en: `1. COMMERCIAL STATUS: The Print House assumes the role of seller and manufacturer for jobs routed through PRINT IT.
2. PRESS PARAMETERS: The Print House shall maintain press formats, hourly rates, and makeready waste calibrated in Control Plane.
3. 4% PLATFORM FEE: PrintPrice invoices a 4% monthly fee on net manufacturing revenue collected from marketplace orders.
4. QUALITY & WARRANTY: The Print House is liable for mechanical manufacturing defects via priority reprint or credit note.
5. CONFIDENTIALITY: Unauthorized reproduction or secondary use of client files is strictly prohibited.`,
        de: `1. GESCHÄFTSSTATUS: Die Druckerei ist Verkäuferin und Herstellerin der über PRINT IT geschlossenen Verträge.
2. MASCHINENPARAMETER: Die Druckerei pflegt Bogenformate, Stundensätze und Rüstmakulatur im Control Plane.
3. 4 % PROVISION: PrintPrice stellt monatlich 4 % auf den vereinnahmten Netto-Fertigungswert aus Marktplatzaufträgen in Rechnung.
4. GEWÄHRLEISTUNG: Die Druckerei haftet für Fertigungsmängel durch Nachdruck oder Gutschrift.
5. VERTRAULICHKEIT: Unautorisierte Weitergabe oder Nutzung von Kundendateien ist untersagt.`,
      },
      slug: '/legal/partner-terms',
    },
    terms_publishers: {
      title: {
        es: 'Condiciones para Editoriales y Clientes Profesionales',
        en: 'Terms for Publishers & Corporate Clients',
        de: 'Bedingungen für Verlage und Geschäftskunden',
      },
      summary: {
        es: [
          'Diseñado para sellos editoriales, universidades y empresas que cotizan y contratan tiradas de libros y publicaciones.',
          'La Editorial conserva todos los derechos sobre sus obras y garantiza disponer de las licencias de autor preceptivas.',
          'Validación técnica mediante Preflight: la Editorial autoriza el PDF final antes del inicio de producción.',
          'Contratación mercantil directa con la imprenta adjudicataria, con facturación y entrega directa de taller.',
          'Separación transparente entre costes de papel, impresión y transporte logístico.',
        ],
        en: [
          'Engineered for book publishing houses, universities, and B2B clients budgeting and ordering print runs.',
          'The publisher retains all IP rights and warrants having obtained all requisite author publishing rights.',
          'Technical preflight sign-off: the publisher formally approves the final PDF prior to manufacturing start.',
          'Direct B2B procurement contract with the partner print house, with direct invoicing and plant delivery.',
          'Transparent disaggregation of paper substrate costs, printing, and logistical freight.',
        ],
        de: [
          'Entwickelt für Verlage, Universitäten und Unternehmen, die Buchauflagen kalkulieren und in Auftrag geben.',
          'Der Verlag behält alle Urheberrechte und gewährleistet das Vorliegen der erforderlichen Verlagsrechte.',
          'Preflight-Freigabe: Der Verlag autorisiert die finale PDF-Datei vor Druckbeginn.',
          'Direkter B2B-Vertrag mit der Partnerdruckerei, mit direkter Rechnungsstellung und Werkslieferung.',
          'Transparente Trennung von Papierkosten, Fertigung und Fracht.',
        ]
      },
      fullText: {
        es: `1. ÁMBITO B2B: Condiciones mercantiles para editoriales y entidades jurídicas.
2. TITULARIDAD EDITORIAL: La Editorial garantiza contar con los derechos de edición y autor sobre los títulos procesados.
3. PREFLIGHT SIGN-OFF: La orden vinculante se formaliza tras la validación técnica del informe de preflight.
4. RELACIÓN CON EL TALLER: La Imprenta adjudicataria emite la factura y asume la garantía de conformidad de la tirada.`,
        en: `1. B2B SCOPE: Commercial terms governing publishers and corporate business entities.
2. PUBLISHER RIGHTS: The Publisher warrants holding valid publishing rights for all submitted titles.
3. PREFLIGHT SIGN-OFF: The binding production order is sealed upon formal validation of the preflight report.
4. SHOP RELATIONSHIP: The assigned Print House issues invoices and provides mechanical quality warranty.`,
        de: `1. B2B-GELTUNGSBEREICH: Kaufmännische Bedingungen für Verlage und Unternehmen.
2. VERLAGSRECHTE: Der Verlag gewährleistet das Vorliegen aller erforderlichen Urheber- und Verlagsrechte.
3. PREFLIGHT-FREIGABE: Der verbindliche Auftrag wird nach technischer Prüfung des Preflight-Reports erteilt.
4. DRUCKEREIBEZIEHUNG: Die Druckerei stellt die Rechnung und haftet für die Qualität der Auflage.`,
      },
      slug: '/legal/terms-publishers',
    },
    terms_suppliers: {
      title: {
        es: 'Condiciones para Proveedores y Distribuidores de Papel',
        en: 'Terms for Paper Suppliers & Merchants',
        de: 'Bedingungen für Papiergroßhändler und Hersteller',
      },
      summary: {
        es: [
          'Regula la publicación y federación de referencias en el Paper Supplier Hub para su conexión con los motores de cálculo.',
          'Distinción obligatoria entre Ficha Técnica (gramaje, mano, formato, fibra), Oferta Comercial (precio, mínimos) y Stock.',
          'La comisión del 4 % del marketplace de impresión no se aplica automáticamente al aprovisionamiento de papel.',
          'Prohibición de sustituciones de marcas o calidades de papel sin la previa aceptación expresa de la imprenta compradora.',
          'La confirmación informática de recepción no extingue el derecho de la imprenta a reclamar por defectos ocultos de fabricación del papel.',
          'Diferenciación estricta entre precio del papel y portes logísticos desglosados.',
        ],
        en: [
          'Governs master substrate catalog federation in Paper Supplier Hub and integration into pricing engines.',
          'Mandatory separation between Technical Specs (gsm, bulk, grain, certifications), Commercial Offers, and Stock.',
          'The 4% print marketplace fee does not apply automatically to paper procurement.',
          'Strict prohibition of brand or substrate substitutions without prior written approval from the purchasing shop.',
          'Electronic intake receipt does not waive the print house’s right to claim for latent manufacturing defects in the paper.',
          'Strict disaggregation between paper base price and logistical freight.',
        ],
        de: [
          'Regelt die Veröffentlichung im Paper Supplier Hub und die Integration in die Kalkulationsmotoren der Druckereien.',
          'Pflicht zur Trennung von technischem Datenblatt (Grammatur, Volumen, Laufrichtung), Angebotspreisen und Lagerstatus.',
          'Die 4 % Marktplatz-Provision gilt nicht automatisch für die Papierbeschaffung.',
          'Verbot von Substratsubstitutionen ohne ausdrückliche Genehmigung der kaufenden Druckerei.',
          'Die elektronische Wareneingangsbestätigung schließt Mängelrügen wegen versteckter Papiermängel nicht aus.',
          'Transparente Trennung von Papierpreis ab Werk und Frachtkosten.',
        ]
      },
      fullText: {
        es: `1. CATALOGACIÓN TÉCNICA: El Proveedor publicará fichas normalizadas con gramaje, volumen específico (mano) y sentido de fibra.
2. RFQ Y PEDIDOS: Las solicitudes de cotización son orientativas; la orden de compra vincula tras su confirmación de stock y precio.
3. RÉGIMEN ECONÓMICO: No aplica el 4 % de comisión del marketplace a las compras de papel.
4. CALIDAD Y SUSTITUCIONES: Queda prohibida la entrega de papeles equivalentes sin autorización expresa del taller.`,
        en: `1. CATALOG SPECIFICATIONS: The Supplier shall publish standardized sheets including gsm, caliper/bulk, and grain direction.
2. RFQ & ORDERS: RFQs are non-binding; purchase orders become binding upon explicit confirmation of stock and price.
3. ECONOMIC TERMS: The 4% marketplace fee does not apply to paper transactions.
4. QUALITY & SUBSTITUTIONS: Delivering alternative paper brands without explicit shop authorization is prohibited.`,
        de: `1. DATENBLÄTTER: Der Lieferant hinterlegt normalisierte Datenblätter mit Grammatur, Volumen und Laufrichtung.
2. ANFRAGEN & AUFTRÄGE: Preisanfragen sind unverbindlich; Bestellungen werden mit Bestätigung verbindlich.
3. PROVISIONEN: Die 4 % Marktplatzgebühr findet auf Papierbeschaffungen keine Anwendung.
4. SUBSTITUTION: Die Lieferung alternativer Papiersorten ohne Genehmigung ist unzulässig.`,
      },
      slug: '/legal/terms-suppliers',
    },
    general_terms: {
      title: {
        es: 'Condiciones Generales de Plataforma',
        en: 'General Platform Terms of Service',
        de: 'Allgemeine Plattform-Nutzungsbedingungen',
      },
      summary: {
        es: [
          'Rigen el uso general de la web y de los módulos de software operados por Print Price Pro SIA.',
          'PrintPrice es un proveedor tecnológico; no es fabricante de papel ni imprenta física.',
          'El usuario conserva todos los derechos sobre sus archivos; licencia técnica limitada únicamente a la prestación del servicio.',
          'Cero entrenamiento de modelos fundacionales de inteligencia artificial con los archivos cargados por los usuarios.',
          'Preaviso de 15 días para modificaciones contractuales con clientes profesionales conforme al Reglamento P2B.',
        ],
        en: [
          'Governs the overarching use of the platform and tools operated by Print Price Pro SIA.',
          'PrintPrice is a technology software provider; it is neither a paper merchant nor a physical printing facility.',
          'Users retain full IP ownership; limited license granted exclusively for service execution.',
          'Zero training of foundation AI models with customer files or graphics.',
          '15-day prior notice for material contract modifications with business users under P2B Regulation.',
        ],
        de: [
          'Regelt die Nutzung der Plattform und Module von Print Price Pro SIA.',
          'PrintPrice ist Softwareanbieter, keine Druckerei und kein Papierhändler.',
          'Nutzer behalten alle Urheberrechte; rein technische Nutzungslizenz.',
          'Kein Training von KI-Modellen mit Benutzerdateien.',
          '15 Tage Vorankündigung bei wesentlichen Vertragsänderungen für Geschäftskunden gemäß P2B.',
        ]
      },
      fullText: {
        es: `1. ROL DE PLATAFORMA: Print Price Pro SIA opera como proveedor de software y plataforma de intermediación técnica.
2. ARCHIVOS DEL USUARIO: La titularidad de los contenidos corresponde exclusivamente al usuario. No se entrenan modelos de IA con los archivos aportados.
3. PAGOS Y COMISIONES: En PRINT IT, la imprenta cobra al cliente y PrintPrice liquida posteriormente su 4 % mensual de comisión técnica.
4. LEY Y JURISDICCIÓN: Letonia (B2B). En relaciones con consumidores (B2C), rige la protección de su Estado miembro de residencia.`,
        en: `1. PLATFORM ROLE: Print Price Pro SIA operates as a software and technical matchmaking platform.
2. USER ASSETS: Content ownership remains solely with the user. User files are never used to train AI models.
3. PAYMENTS & FEES: In PRINT IT, the print house collects from the buyer and PrintPrice invoices a 4% monthly fee.
4. GOVERNING LAW: Latvia for B2B. Consumer protection rules of the consumer's country of residence apply in B2C.`,
        de: `1. ROLLE: Print Price Pro SIA ist Software- und Vermittlungsplattform.
2. DATEIEN: Das Urheberrecht verbleibt beim Nutzer. Keine Nutzung von Dateien zum KI-Training.
3. ZAHLUNG: Die Druckerei rechnet mit dem Kunden ab; PrintPrice liquidiert 4 % monatliche Provision.
4. RECHT: Lettland (B2B); Verbraucherschutzrecht des Wohnsitzstaates (B2C).`,
      },
      slug: '/legal/terms-of-service',
    },
    privacy: {
      title: {
        es: 'Política de Privacidad (RGPD)',
        en: 'Privacy Policy (GDPR)',
        de: 'Datenschutzerklärung (DSGVO)',
      },
      summary: {
        es: [
          'Responsable: Print Price Pro SIA (Rīga, Letonia). Contacto directo: privacy@printprice.pro.',
          'Finalidades legítimas delimitadas: gestión de cuenta, presupuestación, preflight, pedidos, facturación contable y seguridad.',
          'No utilizamos consentimiento como base universal; aplicamos ejecución de contrato (art. 6.1.b) y obligaciones legales (art. 6.1.c).',
          'Alojamiento de bases de datos y cálculo en la Unión Europea (Alemania / Finlandia).',
          'Los archivos PDF temporales se purgan periódicamente (7 a 30 días tras el análisis), salvo formalización de pedido.',
          'Derechos de acceso, rectificación, supresión y reclamación ante la Datu valsts inspekcija (DVI) de Letonia.',
        ],
        en: [
          'Data Controller: Print Price Pro SIA (Rīga, Latvia). Contact: privacy@printprice.pro.',
          'Legitimate processing purposes: account management, quoting, preflight, orders, fiscal invoicing, and security.',
          'Consent is not used as a universal catch-all; processing is grounded on contract performance (Art. 6.1.b) and legal duties (Art. 6.1.c).',
          'Primary compute and databases hosted within the European Union (Germany / Finland).',
          'Temporary preflight PDF files are purged after 7 to 30 days unless linked to a confirmed order.',
          'Rights to access, rectify, erase, and lodge complaints with Data State Inspectorate (DVI) of Latvia.',
        ],
        de: [
          'Verantwortlicher: Print Price Pro SIA (Rīga, Lettland). Kontakt: privacy@printprice.pro.',
          'Zwecke: Kontoverwaltung, Kalkulation, Preflight, Aufträge, Buchhaltung und Systemsicherheit.',
          'Rechtsgrundlagen: Vertragserfüllung (Art. 6.1.b) und rechtliche Pflichten (Art. 6.1.c).',
          'Server und Datenbanken in der Europäischen Union (Deutschland / Finnland).',
          'Temporäre PDF-Dateien werden nach 7 bis 30 Tagen automatisch gelöscht, sofern kein Auftrag erteilt wird.',
          'Rechte auf Auskunft, Berichtigung, Löschung sowie Beschwerde bei der DVI in Lettland.',
        ]
      },
      fullText: {
        es: `1. RESPONSABLE: Print Price Pro SIA, Bruņinieku iela 60-8, Rīga, LV-1009, Letonia. Correo: privacy@printprice.pro.
2. BASES JURÍDICAS: Art. 6.1.b (contrato), Art. 6.1.c (obligación fiscal contable), Art. 6.1.f (seguridad técnica).
3. DESTINATARIOS: La imprenta seleccionada para entrega de pedidos y proveedores de infraestructura en la UE.
4. RETENCIÓN: Documentos contables: 10 años (Ley letona). Archivos temporales de preflight: purga a 7-30 días.
5. AUTORIDAD DE CONTROL: Datu valsts inspekcija (DVI), Elijas iela 17, Rīga, LV-1050, Letonia.`,
        en: `1. CONTROLLER: Print Price Pro SIA, Bruņinieku iela 60-8, Rīga, LV-1009, Latvia. Email: privacy@printprice.pro.
2. LEGAL BASES: Art. 6.1.b (contract), Art. 6.1.c (legal obligation), Art. 6.1.f (legitimate security interest).
3. RECIPIENTS: The assigned print house for manufacturing/delivery and EU-hosted infrastructure providers.
4. RETENTION: Fiscal records: 10 years (Latvian law). Temporary preflight files: purged after 7-30 days.
5. SUPERVISORY AUTHORITY: Datu valsts inspekcija (DVI), Elijas iela 17, Rīga, LV-1050, Latvia.`,
        de: `1. VERANTWORTLICHER: Print Price Pro SIA, Bruņinieku iela 60-8, Rīga, LV-1009, Lettland. privacy@printprice.pro.
2. RECHTSGRUNDLAGEN: Art. 6.1.b (Vertrag), Art. 6.1.c (Gesetz), Art. 6.1.f (Sicherheit).
3. EMPFÄNGER: Die beauftragte Druckerei und EU-Hosting-Dienstleister.
4. SPEICHERUNG: Steuerbelege: 10 Jahre. Temporäre Preflight-Dateien: 7 bis 30 Tage.
5. AUFSICHTSBEHÖRDE: Datu valsts inspekcija (DVI), Elijas iela 17, Rīga, LV-1050, Lettland.`,
      },
      slug: '/legal/privacy-policy',
    },
    cookies: {
      title: {
        es: 'Política de Cookies y Almacenamiento Local',
        en: 'Cookie & Local Storage Policy',
        de: 'Cookie- & Speicherrichtlinie',
      },
      summary: {
        es: [
          'Inventario real: ppp_consent_v1 (decisión de cookies), ppos_locale (idioma elegido), ppos_telemetry_history (telemetría opcional).',
          'Cero cookies de publicidad de terceros (sin Meta Pixel ni Google Ads por defecto).',
          'Botones de Aceptar, Rechazar y Configurar con el mismo contraste y facilidad de acceso.',
          'Enlace persistente en el pie de página para cambiar o retirar el consentimiento en cualquier momento.',
        ],
        en: [
          'Real inventory: ppp_consent_v1 (consent state), ppos_locale (chosen language), ppos_telemetry_history (optional telemetry).',
          'Zero third-party advertising trackers (no Meta Pixel or Google Ads trackers loaded by default).',
          'Equal prominence for Accept, Reject, and Configure options.',
          'Persistent link in the footer to modify or withdraw consent at any time.',
        ],
        de: [
          'Echtes Inventar: ppp_consent_v1 (Zustimmung), ppos_locale (Sprache), ppos_telemetry_history (optionale Telemetrie).',
          'Keine Werbetracker von Drittanbietern (weder Meta Pixel noch Google Ads standardmäßig).',
          'Gleichwertige Schaltflächen für Akzeptieren, Ablehnen und Anpassen.',
          'Persistenter Link im Footer zum jederzeitigen Ändern oder Widerrufen der Einwilligung.',
        ]
      },
      fullText: {
        es: `1. INVENTARIO: Empleamos almacenamiento técnico esencial (preferencias de idioma y consentimiento) y telemetría interna opcional.
2. SIN RASTREADORES PUBLICITARIOS: No vendemos datos ni cargamos píxeles publicitarios de terceros.
3. GESTIÓN: Puede retirar el consentimiento en cualquier momento pulsando "Configuración de Cookies" en el pie de página.`,
        en: `1. INVENTORY: We utilize essential technical storage (language and consent preferences) and optional technical telemetry.
2. NO ADVERTISING TRACKERS: We do not sell data or load third-party marketing pixels.
3. PREFERENCES: You may withdraw or modify consent at any time via "Cookie Preferences" in the footer.`,
        de: `1. INVENTAR: Wir nutzen essenzielle technische Speicher (Sprache, Zustimmung) und optionale technische Telemetrie.
2. KEINE WERBETRACKER: Wir verkaufen keine Daten und binden keine Werbepixel ein.
3. WIDERRUF: Über "Cookie-Einstellungen" im Footer können Sie Ihre Auswahl jederzeit anpassen.`,
      },
      slug: '/legal/cookie-policy',
    },
    ai_policy: {
      title: {
        es: 'Política de IA, Automatización y Determinismo',
        en: 'AI, Automation & Determinism Policy',
        de: 'KI-, Automatisierungs- & Determinismus-Richtlinie',
      },
      summary: {
        es: [
          'Diferenciación estricta: Preflight e imposición son 100 % deterministas (algoritmos matemáticos y normas ISO).',
          'Mockup 3D utiliza modelos de visión e IA generativa (Google Gemini en centros de datos de la UE) como complemento visual.',
          'Garantía: los archivos de los clientes no se utilizan para entrenar modelos fundacionales de IA.',
          'Una maqueta 3D no es una prueba física contractual de color ni muestra de papel.',
          'Fix It (Preflight) es un análisis forense de PDF; no garantiza el resultado si el archivo original contiene defectos estéticos o de texto aprobados por el cliente.',
        ],
        en: [
          'Strict separation: Preflight and imposition are 100% deterministic (mathematical algorithms and ISO standards).',
          '3D Mockup uses vision and generative models (Google Gemini in EU data centers) as a visual marketing aid.',
          'Guarantee: customer files are never used to train foundation AI models.',
          'A 3D mockup is not a certified physical contract color proof or substrate sample.',
          'Fix It (Preflight) is forensic PDF analysis; it does not replace human editorial sign-off.',
        ],
        de: [
          'Strikte Trennung: Preflight und Ausschießlogik sind 100 % deterministisch (mathematische Algorithmen nach ISO).',
          '3D-Mockups nutzen Bildmodelle (Google Gemini in EU-Rechenzentren) als visuelle Marketing-Vorschau.',
          'Garantie: Kundendateien werden nicht zum Training von KI-Modellen verwendet.',
          'Ein 3D-Mockup ist kein farbverbindlicher Kontrakt-Proof und kein Papiermuster.',
          'Fix It (Preflight) ist eine forensische Dateiprüfung, ersetzt jedoch nicht das Lektorat.',
        ]
      },
      fullText: {
        es: `1. DETERMINISMO: El cálculo de precios y la validación de PDF siguen algoritmos reproducibles sin conjeturas estocásticas.
2. ASISTENCIA DE IA: El generador de maquetas 3D utiliza modelos de visión para proyectar sombras comerciales.
3. PROHIBICIÓN DE ENTRENAMIENTO: Los archivos de los usuarios no entrenan modelos de terceros.
4. LÍMITES TÉCNICOS: Las maquetas digitales no constituyen prueba contractual de color certificado ni muestra física de sustrato.`,
        en: `1. DETERMINISM: Pricing calculation and PDF verification follow reproducible algorithms without stochastic guessing.
2. AI ASSISTANCE: The 3D mockup generator utilizes vision models to project studio shadows and commercial perspective.
3. NO MODEL TRAINING: User files are strictly prohibited from being used to train third-party foundation models.
4. TECHNICAL LIMITS: Digital mockups do not constitute certified contract color proofs or physical paper samples.`,
        de: `1. DETERMINISMUS: Kalkulation und PDF-Prüfung folgen reproduzierbaren Algorithmen ohne stochastische Schätzungen.
2. KI-ASSISTENZ: Der Mockup-Generator nutzt Bildmodelle zur Erzeugung realistischer Schatten für Werbezwecke.
3. KEIN TRAINING: Dateien von Nutzern werden niemals zum Trainieren externer KI-Modelle verwendet.
4. GRENZEN: Digitale Mockups stellen weder verbindliche Kontrakt-Proofs noch physische Papiermuster dar.`,
      },
      slug: '/legal/ai-policy',
    },
    cancellations: {
      title: {
        es: 'Política de Cancelaciones, Devoluciones y Reclamaciones',
        en: 'Cancellations, Returns & Claims Policy',
        de: 'Stornierungs-, Rückgabe- & Reklamationsrichtlinie',
      },
      summary: {
        es: [
          'Diferenciación nítida de 5 causas: defecto de fabricación, error de archivo original, daño de transporte, cambio de opinión y fallo de plataforma.',
          'Defectos de fabricación imputables a la imprenta: derecho a reimpresión gratuita o abono proporcional.',
          'Errores en el archivo original aprobado por el cliente: no imputables al taller.',
          'Daños de transporte: notificación con fotos y reserva en albarán para activación de seguro logístico.',
          'Cancelación previa al inicio físico de tirada: admisible con reembolso de costes no ejecutados.',
        ],
        en: [
          'Clear distinction between 5 causes: manufacturing defects, original file errors, freight damages, mind changes, and platform glitches.',
          'Shop manufacturing defects: entitlement to priority free reprint or proportionate refund.',
          'Errors present in the customer-approved original file: not attributable to the print plant.',
          'Freight damage: notify with photos and bill-of-lading reservation to trigger carrier claims.',
          'Pre-press cancellation: admissible prior to physical plate making with refund of uncommitted costs.',
        ],
        de: [
          'Klare Unterscheidung von 5 Ursachen: Fertigungsmängel, Fehler in der Originaldatei, Transportschäden, Stornierung und Systemfehler.',
          'Fertigungsmängel der Druckerei: Anspruch auf kostenlosen Nachdruck oder Erstattung.',
          'Vom Kunden freigegebene Dateifehler: nicht der Druckerei anzulasten.',
          'Transportschäden: Vermerk auf dem Frachtbrief und Fotodokumentation zur Schadensabwicklung.',
          'Stornierung vor Plattenbelichtung: zulässig mit Erstattung nicht entstandener Kosten.',
        ]
      },
      fullText: {
        es: `1. CLASIFICACIÓN DE INCIDENCIAS: Se analizan según la causa raíz técnica.
2. DEFECTOS DE TALLER: Defectos de encuadernación, corte o entintado dan derecho a reimpresión preferente sin coste.
3. ERRORES DE ARCHIVO: Errores contenidos en el PDF aprobado formalmente por el cliente son responsabilidad de éste.
4. TRANSPORTE: Daños externos deben registrarse al recibir el paquete para tramitar el seguro logístico.`,
        en: `1. INCIDENT CLASSIFICATION: Claims are evaluated based on their verified technical root cause.
2. SHOP DEFECTS: Binding, trimming, or inking faults warrant priority reprint without additional cost.
3. FILE ERRORS: Defects originating from the customer-approved source PDF are the customer’s responsibility.
4. FREIGHT: Packaging damage must be noted upon delivery to initiate logistics carrier claims.`,
        de: `1. EINSTUFUNG: Reklamationen werden nach technischer Ursache geprüft.
2. FERTIGUNGSMÄNGEL: Bindungs-, Schnitt- oder Farbmängel begründen kostenlosen Nachdruck.
3. DATEIFEHLER: Fehler in der vom Kunden freigegebenen PDF-Datei liegen in dessen Verantwortung.
4. VERSAND: Äußerliche Schäden müssen bei Zustellung vermerkt werden.`,
      },
      slug: '/legal/cancellations-claims',
    },
    acceptable_use: {
      title: {
        es: 'Política de Uso Aceptable y Contenidos (DSA)',
        en: 'Acceptable Use & Content Policy (DSA)',
        de: 'Richtlinie zur zulässigen Nutzung & Inhalte (DSA)',
      },
      summary: {
        es: [
          'Prohibición tajante de material ilícito, explotación infantil, violencia, odio y vulneración de derechos de propiedad intelectual.',
          'Prohibición de abusos técnicos: ingeniería inversa, saturación maliciosa o intentos de eludir comisiones.',
          'Canal oficial de notificación y retirada de contenidos ilícitos (Notice & Action, art. 16 DSA): info@printprice.pro.',
          'Medidas graduadas y proporcionadas con derecho a recurso técnico.',
        ],
        en: [
          'Strict prohibition of unlawful content, CSAM, hate speech, violence, and intellectual property infringement.',
          'Prohibition of technical abuse: reverse engineering, malicious load spikes, or fee circumvention.',
          'Official DSA Notice and Action channel (Art. 16 DSA): info@printprice.pro.',
          'Graduated and proportionate enforcement measures with right to technical appeal.',
        ],
        de: [
          'Strikter Ausschluss rechtswidriger Inhalte, Gewaltdarstellungen, Hassrede und Urheberrechtsverletzungen.',
          'Verbot technischer Angriffe: Reverse Engineering, Scraping oder Umgehung von Plattformgebühren.',
          'Offizieller Melde- und Abhilfekanal nach DSA (Art. 16): info@printprice.pro.',
          'Verhältnismäßige Maßnahmen mit technischer Beschwerdemöglichkeit.',
        ]
      },
      fullText: {
        es: `1. USOS PROHIBIDOS: Contenidos que vulneren derechos de autor, normativas de protección de menores o leyes de orden público.
2. ABUSO TÉCNICO: Intentos de elusión de aislamiento multi-tenant o alteración de algoritmos de tarificación.
3. CANAL DSA: Notificaciones sobre presuntos contenidos infractores a info@printprice.pro para su revisión diligente.`,
        en: `1. PROHIBITED USES: Content violating copyright, child safety regulations, or criminal statutes.
2. TECHNICAL INTEGRITY: Attempts to breach multi-tenant barriers or tamper with pricing algorithms are prohibited.
3. DSA CHANNEL: Notices regarding allegedly infringing materials should be submitted to info@printprice.pro.`,
        de: `1. UNZULÄSSIGE INHALTE: Urheberrechtsverletzungen, Jugendschutzverstöße und rechtswidrige Inhalte.
2. TECHNISCHE INTEGRITÄT: Angriffe auf Mandantentrennung oder Algorithmen sind untersagt.
3. DSA-MELDESTELLE: Hinweise auf Rechtsverstöße an info@printprice.pro zur Prüfung.`,
      },
      slug: '/legal/acceptable-use',
    },
    dpa: {
      title: {
        es: 'Acuerdo de Tratamiento de Datos (DPA) y Subencargados',
        en: 'Data Processing Agreement (DPA) & Subprocessors',
        de: 'Auftragsverarbeitungsvertrag (AVV) & Unterauftragnehmer',
      },
      summary: {
        es: [
          'Aplica cuando una Imprenta o Cliente Profesional gestiona datos de terceros en Control Plane (PrintPrice como Encargado).',
          'Obligaciones conformes al Art. 28 RGPD: tratamiento bajo instrucciones, deber de confidencialidad y medidas técnicas robustas.',
          'Subencargados de infraestructura verificados en la UE: Hetzner Online GmbH (Alemania), Amazon Web Services (Alemania/Irlanda), Google Cloud (Bélgica/Alemania para computación visual).',
          'Notificación de incidentes de seguridad en un plazo máximo de 48 horas tras su detección.',
          'Devolución o borrado de datos al rescindir la relación contractual de software.',
        ],
        en: [
          'Applies when a Print House or B2B Client manages third-party data within Control Plane (PrintPrice as Processor).',
          'Article 28 GDPR terms: processing under documented instructions, confidentiality, and robust security measures.',
          'Verified infrastructure subprocessors located in the EU: Hetzner Online GmbH (Germany), AWS (Germany/Ireland), Google Cloud (Belgium/Germany for visual rendering).',
          'Security incident notification within a maximum of 48 hours following confirmation.',
          'Full return or erasure of data upon contract conclusion.',
        ],
        de: [
          'Gilt, wenn eine Druckerei oder ein Verlag Drittdaten im Control Plane verwaltet (PrintPrice als Auftragsverarbeiter).',
          'Bedingungen nach Art. 28 DSGVO: weisungsgebundene Verarbeitung, Vertraulichkeit und angemessene TOMs.',
          'Verifizierte Unterauftragnehmer in der EU: Hetzner Online GmbH (Deutschland), AWS (EU-Regionen), Google Cloud (Belgien/Deutschland).',
          'Meldung von Sicherheitsvorfällen binnen 48 Stunden nach Kenntnisnahme.',
          'Vollständige Rückgabe oder Löschung der Daten nach Vertragsende.',
        ]
      },
      fullText: {
        es: `1. OBJETO ART. 28 RGPD: Prestación de servicios SaaS en Control Plane por cuenta de la imprenta.
2. MEDIDAS DE SEGURIDAD: Cifrado en reposo y tránsito, aislamiento estricto multi-tenant y auditorías de acceso.
3. SUBENCARGADOS: Hetzner Online GmbH (compute/hosting), AWS EMEA (almacenamiento/backups), Google Cloud EMEA (renderizado visual en la UE).
4. ASISTENCIA: Soporte en el ejercicio de derechos de los interesados y notificación de brechas en 48 horas.`,
        en: `1. ARTICLE 28 GDPR SCOPE: Provision of SaaS tools in Control Plane on behalf of the customer.
2. SECURITY MEASURES: Encryption in transit and at rest, multi-tenant isolation, and access logging.
3. SUBPROCESSORS: Hetzner Online GmbH (compute), AWS EMEA (storage/backups), Google Cloud EMEA (visual compute in EU).
4. ASSISTANCE: Support with data subject rights and 48-hour breach notification.`,
        de: `1. GEGENSTAND ART. 28 DSGVO: Bereitstellung von SaaS-Funktionen im Control Plane im Auftrag der Druckerei.
2. SICHERHEIT: Verschlüsselung, Mandantentrennung und Zugriffsprotokollierung.
3. UNTERAUFTRAGNEHMER: Hetzner Online GmbH (Compute), AWS EMEA (Storage/Backups), Google Cloud EMEA (Visual Compute in EU).
4. UNTERSTÜTZUNG: Meldung von Vorfällen binnen 48 Stunden und Unterstützung bei Betroffenenrechten.`,
      },
      slug: '/legal/data-processing-agreement',
    },
    legal_notice: {
      title: {
        es: 'Aviso Legal y Datos Identificativos (Imprint)',
        en: 'Legal Notice & Company Imprint',
        de: 'Impressum und Anbieterkennzeichnung',
      },
      summary: {
        es: [
          'Titular de la plataforma: Print Price Pro SIA.',
          'Registro Mercantil de Letonia: 40203631570 | NIF / IVA: LV40203631570.',
          'Domicilio: Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia.',
          'Contacto oficial: info@printprice.pro.',
          'Alcance del servicio tecnológico y delimitación frente a la fabricación material de imprenta.',
        ],
        en: [
          'Platform Operator: Print Price Pro SIA.',
          'Latvian Commercial Register: 40203631570 | VAT ID: LV40203631570.',
          'Registered Office: Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Latvia.',
          'Official Contact: info@printprice.pro.',
          'Software intermediary scope and distinct role relative to physical manufacturing.',
        ],
        de: [
          'Plattformbetreiber: Print Price Pro SIA.',
          'Lettisches Handelsregister: 40203631570 | USt-IdNr.: LV40203631570.',
          'Sitz der Gesellschaft: Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Lettland.',
          'Offizieller Kontakt: info@printprice.pro.',
          'Rolle als Softwareplattform im Unterschied zur physischen Druckherstellung.',
        ]
      },
      fullText: {
        es: `Print Price Pro SIA
Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia
Registro Mercantil: 40203631570
VAT ID: LV40203631570
Contacto: info@printprice.pro
Representada por el Consejo de Administración.`,
        en: `Print Price Pro SIA
Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Latvia
Company Registration No.: 40203631570
VAT ID: LV40203631570
Contact: info@printprice.pro
Represented by the Board of Directors.`,
        de: `Print Price Pro SIA
Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Lettland
Handelsregister-Nr.: 40203631570
USt-IdNr.: LV40203631570
Kontakt: info@printprice.pro
Vertreten durch die Geschäftsführung.`,
      },
      slug: '/legal/legal-notice',
    },
  };

  // Grouping documents by profile
  const PROFILE_DOCS: Record<ProfileKey, DocumentKey[]> = {
    authors: ['terms_authors', 'cancellations', 'privacy', 'cookies', 'ai_policy'],
    publishers: ['terms_publishers', 'general_terms', 'cancellations', 'privacy', 'ai_policy'],
    printers: ['terms_printers', 'dpa', 'general_terms', 'privacy', 'ai_policy'],
    suppliers: ['terms_suppliers', 'general_terms', 'privacy', 'acceptable_use'],
    general: ['legal_notice', 'general_terms', 'privacy', 'cookies', 'ai_policy', 'cancellations', 'acceptable_use', 'dpa'],
  };

  const currentDocs = PROFILE_DOCS[activeProfile];
  const activeDocData = DOCS_DATA[activeDoc] || DOCS_DATA.terms_authors;
  const currentLocale = (locale as 'es' | 'en' | 'de') || 'es';

  const handleProfileSelect = (p: ProfileKey) => {
    setActiveProfile(p);
    const docs = PROFILE_DOCS[p];
    if (!docs.includes(activeDoc)) {
      setActiveDoc(docs[0]);
    }
  };

  return (
    <div className="legal-trust-center-page" style={{ minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Hero Header */}
      <section style={{ 
        padding: 'clamp(5rem, 8vw, 7.5rem) 0 3.5rem', 
        background: 'var(--bg-secondary)', 
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}>
        <Container>
          <div style={{ maxWidth: '900px' }}>
            <span className="pill-badge" style={{ marginBottom: '1.25rem', color: 'var(--accent-primary)', borderColor: 'var(--accent-border)' }}>
              {t.badge}
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', letterSpacing: '-0.04em', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              {t.title}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              {t.subtitle}
            </p>

            {/* Regulatory Notice Banner */}
            <div style={{ 
              background: 'rgba(220, 0, 0, 0.06)', 
              borderLeft: '4px solid var(--accent-primary)', 
              padding: '1.25rem 1.75rem',
              borderRadius: '0 var(--radius-card) var(--radius-card) 0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
                  ⚠️ {t.draftNotice}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {t.draftDesc}
              </p>
            </div>

            {/* Utility Quick Actions Bar */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button onClick={printDocument} variant="secondary" size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="specs" size={16} />
                {t.actions.print}
              </Button>
              <Button onClick={openCookiePreferences} variant="secondary" size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="shield" size={16} />
                {t.actions.cookies}
              </Button>
              <Link href="/contact" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', textDecoration: 'none' }}>
                {t.actions.contact}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Hub Section */}
      <Section showGrid={false} style={{ paddingTop: '3.5rem' }}>
        <Container>
          {/* Profile Switcher Tabs */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="technical-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '1.25rem', fontWeight: 800 }}>
              {t.profilesTitle}
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '1rem' 
            }}>
              {(['authors', 'publishers', 'printers', 'suppliers', 'general'] as ProfileKey[]).map((pKey) => {
                const pInfo = t.profiles[pKey];
                const isSelected = activeProfile === pKey;
                return (
                  <button
                    key={pKey}
                    onClick={() => handleProfileSelect(pKey)}
                    type="button"
                    style={{
                      padding: '1.25rem',
                      background: isSelected ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                      border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-card)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 10px 25px rgba(220, 0, 0, 0.08)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <div style={{ 
                        color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Icon name={pInfo.icon as any} size={20} />
                      </div>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {pInfo.title}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                      {pInfo.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document Content Workspace */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', 
            gap: '2.5rem',
            alignItems: 'start' 
          }}>
            {/* Left Nav: Documents available in this profile */}
            <div style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-card)',
              padding: '1.75rem',
              position: 'sticky',
              top: '6rem'
            }}>
              <h3 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
                {t.docsListTitle}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentDocs.map((docKey) => {
                  const doc = DOCS_DATA[docKey];
                  const isSelected = activeDoc === docKey;
                  const docTitle = doc.title[currentLocale] || doc.title.es;
                  return (
                    <button
                      key={docKey}
                      onClick={() => setActiveDoc(docKey)}
                      type="button"
                      style={{
                        padding: '0.875rem 1rem',
                        background: isSelected ? 'var(--bg-primary)' : 'transparent',
                        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid transparent',
                        borderRadius: 'var(--radius-sm)',
                        color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        fontWeight: isSelected ? 800 : 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {docTitle}
                    </button>
                  );
                })}
              </div>

              {/* Document Metadata Box */}
              <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ marginBottom: '0.35rem', fontWeight: 700 }}>{t.metadata.version}</div>
                <div style={{ marginBottom: '0.35rem' }}>{t.metadata.effectiveDate}</div>
                <div style={{ marginBottom: '0.35rem' }}>{t.metadata.jurisdiction}</div>
                <div style={{ opacity: 0.8 }}>{t.metadata.prevalence}</div>
              </div>
            </div>

            {/* Right Panel: Selected Document Viewer */}
            <div style={{ 
              background: 'var(--bg-primary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-card)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)'
            }}>
              {/* Document Header */}
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.75rem', marginBottom: '2.5rem' }}>
                <span className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '0.15em' }}>
                  {t.draftNotice}
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.03em', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                  {activeDocData.title[currentLocale] || activeDocData.title.es}
                </h2>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>{t.metadata.version}</span>
                  <span>•</span>
                  <span>{t.metadata.effectiveDate}</span>
                </div>
              </div>

              {/* Section 1: Plain Language Summary */}
              <div style={{ 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-card)',
                padding: '2rem',
                marginBottom: '3rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <Icon name="shield" size={20} style={{ color: 'var(--accent-primary)' }} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                    {t.actions.summaryTab}
                  </h3>
                </div>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(activeDocData.summary[currentLocale] || activeDocData.summary.es).map((point, idx) => (
                    <li key={idx} style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 2: Full Contractual Text */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                  {t.actions.fullTextTab}
                </h3>
                <div style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '2rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border-color)',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '600px',
                  overflowY: 'auto'
                }}>
                  {activeDocData.fullText[currentLocale] || activeDocData.fullText.es}
                </div>
              </div>

              {/* Document Footer Controls */}
              <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <Button onClick={printDocument} variant="secondary" size="sm">
                  {t.actions.print} ➔
                </Button>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {t.metadata.jurisdiction}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <style jsx global>{`
        @media print {
          header, footer, nav, .site-footer, button, .pill-badge, .technical-text {
            display: none !important;
          }
          body, .legal-trust-center-page {
            background: #fff !important;
            color: #000 !important;
            padding: 0 !important;
          }
          .legal-trust-center-page * {
            box-shadow: none !important;
            border-color: #ccc !important;
            color: #000 !important;
          }
        }
      `}</style>
    </div>
  );
}

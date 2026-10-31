'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { useLocale } from '@/lib/i18n';
import {
  FileText,
  Truck,
  TrendingUp,
  Layers,
  Database,
  Ruler,
  ShieldCheck,
  PackageCheck,
  Settings,
  BarChart3,
} from 'lucide-react';

type SupplierModuleId = 'dashboard' | 'catalog' | 'orders' | 'settings';

export default function ForPaperSuppliersPage() {
  const { locale } = useLocale();
  const [activeModule, setActiveModule] = useState<SupplierModuleId>('catalog');

  const content = {
    es: {
      heroLabel: 'PAPER SUPPLIER HUB · FEDERACIÓN DE SUSTRATOS & TARIFAS EX-WORKS',
      heroTitle: 'PUBLICA TU CATÁLOGO MAESTRO Y CONECTA TUS PAPELES CON LOS MOTORES DE IMPRENTA',
      heroSlogan: ['FEDERATE.', 'CALIBRATE.', 'SUPPLY AT SCALE.'],
      heroSub:
        'El portal operativo B2B en Control Plane para papeleras y distribuidores de papel. Estandariza gramajes, volumen específico (mano/bulk), espesor en micrómetros (µm), formatos de pliego B1/B2/SRA3 y tarifas por escalones con disociación estricta entre precio franco fábrica (Ex-Works) y porte regional.',
      ctaPrimary: 'Registrar proveedor en Paper Hub ➔',
      ctaSecondary: 'Explorar módulos del portal ↓',
      badgeNote: '✓ CALIBRE (µm) VINCULADO A SPINE-04 · PRECIO EX-WORKS ≠ PORTE · FLUJO RFQ B2B',

      // Hero Right Card (100% localized)
      cardHeader: 'FICHA FEDERADA · PAPER SUPPLIER HUB',
      cardBadge: 'SYNC ACTIVO · SPINE-04 & BPE',
      cardRows: [
        { k: 'Referencia Maestra:', v: 'Arctic Volume White (Estucado Mate Vol.)' },
        { k: 'Gramaje & Calibre:', v: '115 g/m² · Mano 1,10 · 126,5 µm', highlight: true },
        { k: 'Formato & Fibra:', v: '700 × 1.000 mm (B1) · Fibra Larga (LG)' },
        { k: 'Certificación & Blancura:', v: 'FSC Mix Credit · CIE 145 / ISO 96%' },
        { k: 'Tarifa Base (Ex-Works):', v: '1.240,00 € / t (Escala ≥ 5 Palets)' },
        { k: 'Porte Logístico:', v: 'Desacoplado por Zona Postal (Mfg ≠ Freight)', accent: true },
      ],
      cardFooterNote: 'Propagación instantánea a calculadores de imprentas autorizadas',
      cardCta: 'Acceder a Paper Supplier Hub ➔',

      // Section 1: 4 Interactive Modules of Paper Supplier Hub
      hubPill: 'ARQUITECTURA DE CONTROL PLANE PARA PROVEEDORES',
      hubTitle: 'Cuatro módulos dedicados en control.printprice.pro/supplier',
      hubSub:
        'A diferencia de los directorios estáticos, Paper Supplier Hub inyecta tus especificaciones físicas y escalas de precio directamente en el cálculo diario de las plantas gráficas.',
      modules: {
        dashboard: {
          route: '/supplier/dashboard',
          badge: '01 / TELEMETRÍA COMERCIAL',
          title: 'Dashboard de Demanda y Presupuestos Activos',
          desc: 'Visualiza en tiempo real cuántas cotizaciones editoriales e industriales están prescribiendo tus familias de papel, qué gramajes concentran mayor volumen de pliegos y el estado de las órdenes de aprovisionamiento activas.',
          metrics: [
            'Volumen total en toneladas y pliegos B1/B2 cotizados en la red.',
            'Alertas de rotura de stock o sustitución automática por lote equivalente.',
            'Trazabilidad de imprentas vinculadas con acuerdos de tarifa privada o pública.',
          ],
        },
        catalog: {
          route: '/supplier/catalog',
          badge: '02 / CATÁLOGO MAESTRO & CALIBRE (µm)',
          title: 'Gestión de Sustratos, Mano (Bulk) y Formatos',
          desc: 'Define cada referencia con precisión física de laboratorio. Cuando actualizas el factor de mano (bulk) o el calibre en micrómetros (µm), el motor SPINE-04 recalcula automáticamente el grosor del lomo en todas las editoriales e imprentas conectadas.',
          metrics: [
            'Atributos físicos: GSM (g/m²), Bulk (cm³/g), Calibre (µm), Opacidad (%) y Rigidez.',
            'Formatos de pliego (65×90, 70×100, 72×102, SRA3) y dirección de fibra (LG/SG).',
            'Importación masiva CSV/API y etiquetas medioambientales (FSC, PEFC, EU Ecolabel).',
          ],
        },
        orders: {
          route: '/supplier/orders',
          badge: '03 / APROVISIONAMIENTO & RFQ',
          title: 'Recepción de Pedidos de Papel y Reservas de Lote',
          desc: 'Recibe solicitudes de cotización (RFQ) y órdenes de suministro directamente vinculadas a trabajos de impresión aprobados en Control Plane, con especificación exacta de pliegos necesarios (incluyendo merma de arranque).',
          metrics: [
            'Cálculo exacto de resmas, palets y kilogramos brutos requeridos por orden.',
            'Confirmación de disponibilidad de lote y ventana de entrega en planta gráfica.',
            'Historial auditable de entregas sin comisiones de intermediación ocultas.',
          ],
        },
        settings: {
          route: '/supplier/settings',
          badge: '04 / ZONAS DE PORTE & GOBERNANZA',
          title: 'Matrices de Precio Ex-Works vs. Zonas de Transporte',
          desc: 'Configura tus escalas de precio por volumen (€/tonelada o €/1.000 pliegos) separadas matemáticamente de tus tablas de porte por código postal, protegiendo tu margen ante fluctuaciones de combustible.',
          metrics: [
            'Escalones por peso (< 500 kg, 1–3 t, 3–10 t, camión completo 24 t).',
            'Tarifas privadas por tenant (imprenta específica) o tarifas de red.',
            'Separación estricta: Sustrato Franco Fábrica ≠ Recargo de Corte ≠ Flete.',
          ],
        },
      },

      // Section 2: 4-Step Onboarding Flow
      stepsPill: 'FLUJO DE FEDERACIÓN EN 4 PASOS',
      stepsTitle: 'Cómo conectar tus papeles con las calculadoras de imprentas y editoriales',
      stepsSub: 'Sin intermediación comercial opaca: tú mantienes la facturación directa con cada taller gráfico.',
      steps: [
        {
          num: '01',
          tag: 'ALTA VERIFICADA',
          title: 'Registro en /supplier/register',
          desc: 'Da de alta tu distribuidora o fábrica papelera con verificación fiscal europea y asignación de tenant aislado en Control Plane.',
        },
        {
          num: '02',
          tag: 'CARGA DE SUSTRATOS',
          title: 'Normalización Física (µm / Bulk)',
          desc: 'Publica tus gamas de estucados, offsets, ahuesados editoriales y cartón gris (1,20 g/cm³) con sus calibres reales verificados.',
        },
        {
          num: '03',
          tag: 'MATRIZ COMERCIAL',
          title: 'Escalas Ex-Works + Porte',
          desc: 'Establece tramos de precio por volumen y matriz de transporte regional desacoplada para que cada imprenta vea su coste exacto en planta.',
        },
        {
          num: '04',
          tag: 'PRESCRIPCIÓN EN VIVO',
          title: 'Sincronización con BPE y SPINE-04',
          desc: 'Tus papeles aparecen como opción certificada en los presupuestos de editoriales y en las colas de compra de los talleres asociados.',
        },
      ],

      // Section 3: 6 Capabilities Grid
      capsPill: 'VENTAJAS COMPETITIVAS PARA DISTRIBUIDORES DE PAPEL',
      capsTitle: 'Por qué federar tu catálogo técnico en PrintPrice OS',
      capsSub: 'Transforma tus tarifas PDF estáticas en datos ejecutables por los motores de imposición y logística.',
      caps: [
        {
          badge: '01 / SPINE-04 LINK',
          title: 'Sincronización Directa con el Cálculo de Lomo',
          desc: 'Los diseñadores y editoriales eligen papeles por su mano (bulk). Al publicar tu calibre exacto en µm, garantizas que las cubiertas se diseñen para tu papel específico.',
          icon: Ruler,
        },
        {
          badge: '02 / COST DECOUPLING',
          title: 'Disociación Franco Fábrica vs. Porte',
          desc: 'Evita que el encarecimiento del transporte distorsione el precio percibido de tu papel. El impresor ve por separado el valor de la celulosa y el coste de entrega.',
          icon: Truck,
        },
        {
          badge: '03 / SHEET IMPOSITION',
          title: 'Optimización de Formatos B1, B2 y Bobina',
          desc: 'El motor BPE evalúa tus formatos reales en stock (65×90, 70×100, 72×102 mm) frente al libro solicitado para minimizar el recorte y priorizar tus formatos disponibles.',
          icon: Layers,
        },
        {
          badge: '04 / MASS & CUBING',
          title: 'Alimentación del Motor de Cubicaje 3D',
          desc: 'El gramaje real de tus papeles interiores y cartulinas alimenta directamente el cálculo de peso neto del libro, cajas FEFCO 0201 y Euro-palets EPAL.',
          icon: PackageCheck,
        },
        {
          badge: '05 / TENANT PRIVACY',
          title: 'Tarifas Privadas por Imprenta (RBAC)',
          desc: 'Publica un catálogo técnico abierto para prescripción editorial manteniendo confidenciales los descuentos y rappels pactados con cada imprenta cliente.',
          icon: ShieldCheck,
        },
        {
          badge: '06 / API & CSV SYNC',
          title: 'Actualización Programática vía API REST',
          desc: 'Conecta tu ERP papelero mediante GET/POST /api/admin/materials/catalog para actualizar stocks, lotes y precios por tonelada sin trabajo manual.',
          icon: Database,
        },
      ],

      // FAQ
      faqHeading: 'Preguntas frecuentes de proveedores y distribuidores de papel',
      faqs: [
        {
          q: '¿Es PrintPrice Pro un bróker o revendedor que intermedia en la facturación del papel?',
          a: 'No. PrintPrice OS es infraestructura tecnológica neutral. Nosotros conectamos tus fichas técnicas y tus matrices de precios con los motores de cálculo de las imprentas y editoriales, pero el pedido comercial y la factura se emiten directamente entre tu distribuidora y el taller gráfico.',
        },
        {
          q: '¿Por qué es tan importante el calibre en micrómetros (µm) y la mano (bulk) dentro de la plataforma?',
          a: 'En la industria del libro, una variación de mano de 1.15 a 1.30 en un libro de 400 páginas altera el lomo varios milímetros y cambia el número de libros que caben por caja FEFCO 0201. Al tener tu calibre certificado en Paper Supplier Hub, tanto SPINE-04 como el motor de paletizado 3D trabajan con la física exacta de tu papel.',
        },
        {
          q: '¿Puedo mantener ocultas mis tarifas especiales para ciertos talleres gráficos?',
          a: 'Sí. El sistema soporta aislamiento multi-tenant estricto. Puedes publicar las características técnicas de tus papeles para que las editoriales los prescriban, mientras que cada imprenta autenticada solo visualiza la tarifa que tú le hayas autorizado.',
        },
      ],

      finalCtaHeading: 'Integra tu catálogo de sustratos en la capa de inteligencia gráfica',
      finalCtaSub:
        'Registra tu cuenta de proveedor en Control Plane y posiciona tus familias de papel en el momento exacto en que se decide cada tirada.',
      finalCtaBtn: 'Registrar proveedor de papel ➔',
      finalCtaSec: 'Ver documentación de Paper Hub ↗',
    },

    en: {
      heroLabel: 'PAPER SUPPLIER HUB · SUBSTRATE FEDERATION & EX-WORKS PRICING',
      heroTitle: 'PUBLISH YOUR MASTER CATALOG & CONNECT SUBSTRATES TO PRESS ENGINES',
      heroSlogan: ['FEDERATE.', 'CALIBRATE.', 'SUPPLY AT SCALE.'],
      heroSub:
        'The B2B operational portal in Control Plane for paper mills and merchants. Standardize basis weights (GSM), bulk factors, physical caliper in microns (µm), B1/B2/SRA3 sheet formats, and tiered pricing with strict mathematical separation between Ex-Works mill rates and regional freight.',
      ctaPrimary: 'Register in Paper Supplier Hub ➔',
      ctaSecondary: 'Explore portal modules ↓',
      badgeNote: '✓ MICRON (µm) LINKED TO SPINE-04 · EX-WORKS ≠ FREIGHT · B2B RFQ WORKFLOW',

      cardHeader: 'FEDERATED SPEC · PAPER SUPPLIER HUB',
      cardBadge: 'LIVE SYNC · SPINE-04 & BPE',
      cardRows: [
        { k: 'Master Reference:', v: 'Arctic Volume White (Coated Matte Bulk)' },
        { k: 'Basis Weight & Caliper:', v: '115 g/m² · Bulk 1.10 · 126.5 µm', highlight: true },
        { k: 'Sheet Size & Grain:', v: '700 × 1,000 mm (B1) · Long Grain (LG)' },
        { k: 'Certification & Whiteness:', v: 'FSC Mix Credit · CIE 145 / ISO 96%' },
        { k: 'Base Mill Rate (Ex-Works):', v: '€1,240.00 / ton (Tier ≥ 5 Pallets)' },
        { k: 'Logistics Freight:', v: 'Decoupled by Postal Zone (Mfg ≠ Freight)', accent: true },
      ],
      cardFooterNote: 'Instant propagation to authorized printhouse estimators',
      cardCta: 'Open Paper Supplier Hub ➔',

      hubPill: 'CONTROL PLANE ARCHITECTURE FOR PAPER MERCHANTS',
      hubTitle: 'Four dedicated operational modules at control.printprice.pro/supplier',
      hubSub:
        'Unlike static directories, Paper Supplier Hub injects your physical substrate specs and volume tiers directly into the live estimating engines of partner print plants.',
      modules: {
        dashboard: {
          route: '/supplier/dashboard',
          badge: '01 / COMMERCIAL TELEMETRY',
          title: 'Demand Dashboard & Active Quote Analytics',
          desc: 'Track in real time how many publishing and commercial estimates specify your paper lines, which basis weights drive the highest B1/B2 sheet volume, and the status of active supply orders.',
          metrics: [
            'Total tonnage and B1/B2 sheet volume quoted across the network.',
            'Stockout alerts and governed equivalent-grade substitution rules.',
            'Full visibility of linked printhouses under public or private rate cards.',
          ],
        },
        catalog: {
          route: '/supplier/catalog',
          badge: '02 / MASTER CATALOG & CALIPER (µm)',
          title: 'Substrate, Bulk Factor & Sheet Format Management',
          desc: 'Define every stock with laboratory precision. Updating a bulk factor or micron caliper (µm) automatically updates SPINE-04 spine geometry across all connected publishers and printhouses.',
          metrics: [
            'Physical attributes: GSM (g/m²), Bulk (cm³/g), Caliper (µm), Opacity (%), and Stiffness.',
            'Press sheet formats (65×90, 70×100, 72×102, SRA3) and grain direction (LG/SG).',
            'Bulk CSV/API ingestion and eco-certifications (FSC, PEFC, EU Ecolabel).',
          ],
        },
        orders: {
          route: '/supplier/orders',
          badge: '03 / PROCUREMENT & RFQ',
          title: 'Paper Supply Orders & Lot Reservations',
          desc: 'Receive Request for Quotes (RFQs) and supply orders directly tied to confirmed print jobs in Control Plane, including exact press sheet counts (net run + makeready waste).',
          metrics: [
            'Exact calculation of reams, pallets, and gross kilograms required per job.',
            'Lot availability confirmation and plant dock delivery scheduling.',
            'Auditable supply history with zero hidden broker commissions.',
          ],
        },
        settings: {
          route: '/supplier/settings',
          badge: '04 / FREIGHT ZONES & GOVERNANCE',
          title: 'Ex-Works Rate Tiers vs. Regional Freight Matrices',
          desc: 'Configure volume price breaks (€/ton or €/1,000 sheets) mathematically decoupled from postal-zone transport tables, protecting your mill margins from fuel volatility.',
          metrics: [
            'Weight brackets (< 500 kg, 1–3 t, 3–10 t, full 24 t truckload).',
            'Tenant-scoped private pricing for contracted printhouses.',
            'Strict invariant: Ex-Works Substrate ≠ Sheeting Surcharge ≠ Freight.',
          ],
        },
      },

      stepsPill: '4-STEP FEDERATION WORKFLOW',
      stepsTitle: 'How to connect your substrates to printhouse and publisher calculators',
      stepsSub: 'Zero opaque brokerage: you retain direct commercial invoicing with every printing plant.',
      steps: [
        {
          num: '01',
          tag: 'VERIFIED ONBOARDING',
          title: 'Register at /supplier/register',
          desc: 'Onboard your paper merchant or mill account with EU tax verification and an isolated Control Plane tenant.',
        },
        {
          num: '02',
          tag: 'SUBSTRATE INGESTION',
          title: 'Physical Normalization (µm / Bulk)',
          desc: 'Publish coated, uncoated, book cream, and greyboard (1.20 g/cm³) lines with certified physical calipers.',
        },
        {
          num: '03',
          tag: 'COMMERCIAL MATRIX',
          title: 'Ex-Works Tiers + Regional Freight',
          desc: 'Set volume price breaks and decoupled regional delivery matrices so each plant sees accurate landed substrate costs.',
        },
        {
          num: '04',
          tag: 'LIVE PRESCRIPTION',
          title: 'BPE & SPINE-04 Synchronization',
          desc: 'Your paper grades appear as certified options in publisher quotes and printhouse procurement queues.',
        },
      ],

      capsPill: 'COMPETITIVE ADVANTAGES FOR PAPER SUPPLIERS',
      capsTitle: 'Why federate your technical catalog on PrintPrice OS',
      capsSub: 'Turn static PDF price lists into live executable data inside sheet imposition and 3D logistics engines.',
      caps: [
        {
          badge: '01 / SPINE-04 LINK',
          title: 'Direct Synchronization with Spine Geometry',
          desc: 'Publishers select book papers by bulk. Publishing your exact micron caliper (µm) ensures cover spreads are engineered specifically for your stock.',
          icon: Ruler,
        },
        {
          badge: '02 / COST DECOUPLING',
          title: 'Ex-Works Mill Price vs. Freight Separation',
          desc: 'Prevent regional transport surcharges from distorting your perceived paper price. Printers see pulp value and delivery freight separately.',
          icon: Truck,
        },
        {
          badge: '03 / SHEET IMPOSITION',
          title: 'B1, B2 & Web Reel Format Optimization',
          desc: 'The BPE solver evaluates your actual stocked sheet dimensions (65×90, 70×100, 72×102 cm) against trim sizes to minimize trim waste.',
          icon: Layers,
        },
        {
          badge: '04 / MASS & CUBING',
          title: 'Feeds the 3D Pallet Cubing Solver',
          desc: 'Your certified GSM and board densities feed directly into net book weight, FEFCO 0201 cartonization, and EUR-EPAL pallet weight calculations.',
          icon: PackageCheck,
        },
        {
          badge: '05 / TENANT PRIVACY',
          title: 'Printhouse-Specific Private Tariffs (RBAC)',
          desc: 'Expose technical specs publicly for publisher specification while restricting negotiated €/ton discounts strictly to authorized printhouse tenants.',
          icon: ShieldCheck,
        },
        {
          badge: '06 / API & CSV SYNC',
          title: 'Programmatic Catalog Sync via REST API',
          desc: 'Connect your paper ERP via GET/POST /api/admin/materials/catalog to synchronize stock availability, lots, and ton pricing automatically.',
          icon: Database,
        },
      ],

      faqHeading: 'Frequently Asked Questions for Paper Suppliers & Distributors',
      faqs: [
        {
          q: 'Is PrintPrice Pro a paper broker or intermediary reseller?',
          a: 'No. PrintPrice OS is neutral operating infrastructure. We connect your technical substrate catalogs and price matrices directly into printhouse and publisher calculation engines, while commercial invoicing remains 100% direct between your firm and the printing plant.',
        },
        {
          q: 'Why are micron caliper (µm) and bulk factor so critical on the platform?',
          a: 'In book manufacturing, shifting bulk from 1.15 to 1.30 on a 400-page title changes spine width by several millimeters and alters how many books fit inside a FEFCO 0201 carton. By federating certified calipers in Paper Supplier Hub, both SPINE-04 and the 3D cubing engine compute with your exact physical stock.',
        },
        {
          q: 'Can I keep negotiated customer rates confidential between different printhouses?',
          a: 'Yes. Control Plane enforces strict multi-tenant RBAC isolation. Publishers can browse and specify your technical paper grades by GSM and bulk, while each authenticated printhouse only sees the specific commercial rate card you authorized for their tenant.',
        },
      ],

      finalCtaHeading: 'Integrate your substrate catalog into the industrial intelligence layer',
      finalCtaSub:
        'Register your supplier account in Control Plane and position your paper lines at the exact moment every print run is quoted.',
      finalCtaBtn: 'Register paper supplier ➔',
      finalCtaSec: 'Read Paper Hub Docs ↗',
    },

    de: {
      heroLabel: 'PAPER SUPPLIER HUB · SUBSTRAT-FÖDERATION & AB-WERK-TARIFE',
      heroTitle: 'HAUPTKATALOG PUBLIZIEREN & PAPIERE MIT DRUCKEREI-ENGINES VERBINDEN',
      heroSlogan: ['FEDERATE.', 'CALIBRATE.', 'SUPPLY AT SCALE.'],
      heroSub:
        'Das operative B2B-Portal in der Control Plane für Papierfabriken und Papiergroßhändler. Standardisieren Sie Grammaturen, spezifisches Volumen (Bulk), physikalische Dicke in Mikrometern (µm), B1/B2/SRA3-Bogenformate und Mengenstaffeln mit strikter Trennung zwischen Ab-Werk-Papierpreis und Regionalfracht.',
      ctaPrimary: 'Im Paper Supplier Hub registrieren ➔',
      ctaSecondary: 'Portal-Module ansehen ↓',
      badgeNote: '✓ MIKROMETER (µm) MIT SPINE-04 VERKNÜPFT · AB-WERK ≠ FRACHT · B2B-RFQ-WORKFLOW',

      cardHeader: 'FÖDERIERTE SPEZIFIKATION · PAPER SUPPLIER HUB',
      cardBadge: 'LIVE-SYNC · SPINE-04 & BPE',
      cardRows: [
        { k: 'Master-Referenz:', v: 'Arctic Volume White (Bilderdruck Matt Vol.)' },
        { k: 'Grammatur & Dicke:', v: '115 g/m² · Volumen 1,10 · 126,5 µm', highlight: true },
        { k: 'Bogenformat & Lauf:', v: '700 × 1.000 mm (B1) · Schmalbahn (LG)' },
        { k: 'Zertifikat & Weiße:', v: 'FSC Mix Credit · CIE 145 / ISO 96%' },
        { k: 'Basispreis (Ab Werk):', v: '1.240,00 € / t (Staffel ≥ 5 Paletten)' },
        { k: 'Logistikfracht:', v: 'Entkoppelt nach PLZ-Zone (Material ≠ Fracht)', accent: true },
      ],
      cardFooterNote: 'Sofortige Synchronisation mit autorisierten Druckereikalkulatoren',
      cardCta: 'Paper Supplier Hub öffnen ➔',

      hubPill: 'CONTROL-PLANE-ARCHITEKTUR FÜR PAPIERGROSSHÄNDLER',
      hubTitle: 'Vier spezialisierte Module unter control.printprice.pro/supplier',
      hubSub:
        'Anders als statische Verzeichnisse speist der Paper Supplier Hub Ihre physikalischen Papierdaten und Preisstaffeln direkt in die Echtzeit-Kalkulation der Partnerdruckereien ein.',
      modules: {
        dashboard: {
          route: '/supplier/dashboard',
          badge: '01 / KOMMERZIELLE TELEMETRIE',
          title: 'Nachfrage-Dashboard & Angebotsanalyse',
          desc: 'Verfolgen Sie in Echtzeit, wie viele Verlags- und Industriekalkulationen Ihre Papiersorten spezifizieren, welche Grammaturen das höchste B1/B2-Bogenvolumen erzeugen und welche Abrufe aktiv sind.',
          metrics: [
            'Gesamttonnage und kalkuliertes B1/B2-Bogenvolumen im Netzwerk.',
            'Bestandswarnungen und gesteuerte Ersatzpapier-Regeln.',
            'Transparenz über verknüpfte Druckereien mit Standard- oder Hauspreisen.',
          ],
        },
        catalog: {
          route: '/supplier/catalog',
          badge: '02 / STAMMKATALOG & DICKE (µm)',
          title: 'Substrat-, Volumen- (Bulk) & Formatverwaltung',
          desc: 'Hinterlegen Sie jede Sorte mit Laborpräzision. Wenn Sie das Volumen oder die Dicke in Mikrometern (µm) aktualisieren, passt SPINE-04 sofort die Rückenbreitenberechnung bei allen Verlagen und Druckereien an.',
          metrics: [
            'Physikalische Werte: Grammatur (g/m²), Volumen (cm³/g), Dicke (µm), Opazität (%) & Steifigkeit.',
            'Bogenformate (65×90, 70×100, 72×102, SRA3) und Laufrichtung (SB/BB).',
            'CSV/API-Massenimport sowie Umweltzertifikate (FSC, PEFC, EU Ecolabel).',
          ],
        },
        orders: {
          route: '/supplier/orders',
          badge: '03 / BESCHAFFUNG & RFQ',
          title: 'Papierbestellungen & Chargenreservierung',
          desc: 'Empfangen Sie Preisanfragen (RFQs) und Bestellungen direkt verknüpft mit freigegebenen Druckaufträgen in der Control Plane – inklusive exakter Bogenanzahl (Nettoauflage + Rüstmakulatur).',
          metrics: [
            'Exakte Berechnung von Riesen, Paletten und Bruttogewicht pro Auftrag.',
            'Chargenbestätigung und Lieferzeitfenster für die Druckerei-Rampe.',
            'Revisionssichere Lieferhistorie ohne versteckte Vermittlungsprovisionen.',
          ],
        },
        settings: {
          route: '/supplier/settings',
          badge: '04 / FRACHTZONEN & GOVERNANCE',
          title: 'Ab-Werk-Preisstaffeln vs. Regionale Frachtmatrizen',
          desc: 'Konfigurieren Sie Mengenstaffeln (€/Tonne oder €/1.000 Bogen) mathematisch getrennt von Ihren PLZ-Frachtzonen, um Ihre Materialmarge vor Diesel- und Frachtschwankungen zu schützen.',
          metrics: [
            'Gewichtsstufen (< 500 kg, 1–3 t, 3–10 t, 24 t Komplettladung).',
            'Mandantenspezifische Hauspreise für Vertragsdruckereien.',
            'Strikte Invariante: Ab-Werk-Papierpreis ≠ Formatierungsaufschlag ≠ Fracht.',
          ],
        },
      },

      stepsPill: 'FÖDERATIONS-WORKFLOW IN 4 SCHRITTEN',
      stepsTitle: 'So verbinden Sie Ihre Papiere mit den Kalkulatoren von Druckereien und Verlagen',
      stepsSub: 'Kein intransparenter Zwischenhandel: Die Abrechnung erfolgt weiterhin direkt zwischen Ihnen und der Druckerei.',
      steps: [
        {
          num: '01',
          tag: 'VERIFIZIERTES ONBOARDING',
          title: 'Registrierung unter /supplier/register',
          desc: 'Registrieren Sie Ihr Handelsunternehmen oder Werk mit EU-USt-IdNr. und eigenem Mandantenbereich in der Control Plane.',
        },
        {
          num: '02',
          tag: 'SUBSTRAT-IMPORT',
          title: 'Physikalische Normalisierung (µm / Bulk)',
          desc: 'Veröffentlichen Sie Bilderdruck-, Offset-, Werkdruckpapiere und Graupappe (1,20 g/cm³) mit zertifizierten Dickenwerten.',
        },
        {
          num: '03',
          tag: 'PREISMATRIX',
          title: 'Ab-Werk-Staffeln + Regionalfracht',
          desc: 'Definieren Sie Mengenstaffeln und entkoppelte Transporttarife, damit jede Druckerei ihren exakten Einstandspreis sieht.',
        },
        {
          num: '04',
          tag: 'LIVE-SPEZIFIKATION',
          title: 'BPE & SPINE-04 Synchronisation',
          desc: 'Ihre Papiersorten erscheinen als geprüfte Option in Verlagskalkulationen und Einkaufswarteschlangen der Druckereien.',
        },
      ],

      capsPill: 'WETTBEWERBSVORTEILE FÜR PAPIERLIEFERANTEN',
      capsTitle: 'Warum Sie Ihren technischen Katalog in PrintPrice OS föderieren sollten',
      capsSub: 'Verwandeln Sie statische PDF-Preislisten in ausführbare Echtzeitdaten für Bogenmontage und 3D-Logistik.',
      caps: [
        {
          badge: '01 / SPINE-04 LINK',
          title: 'Direkte Kopplung an die Buchrückenberechnung',
          desc: 'Verlage wählen Werkdruckpapiere nach Volumen. Mit Ihrer exakten Dicke in µm stellen Sie sicher, dass Umschläge exakt für Ihr Papier konstruiert werden.',
          icon: Ruler,
        },
        {
          badge: '02 / COST DECOUPLING',
          title: 'Trennung von Ab-Werk-Preis und Fracht',
          desc: 'Verhindern Sie, dass steigende Speditionskosten Ihren Papierpreis verzerren. Der Drucker sieht Materialwert und Logistikfracht separat.',
          icon: Truck,
        },
        {
          badge: '03 / SHEET IMPOSITION',
          title: 'Optimierung von B1-, B2- und Rollenformaten',
          desc: 'Die BPE-Engine prüft Ihre real lagernden Bogenformate (65×90, 70×100, 72×102 cm) gegen das Buchformat für minimalen Beschnittverlust.',
          icon: Layers,
        },
        {
          badge: '04 / MASS & CUBING',
          title: 'Datenquelle für die 3D-Palettierung',
          desc: 'Ihre zertifizierten Grammaturen und Pappendichten fließen direkt in Buchnettogewicht, FEFCO 0201 Kartons und EPAL-Palettengewichte ein.',
          icon: PackageCheck,
        },
        {
          badge: '05 / TENANT PRIVACY',
          title: 'Kundenspezifische Hauspreise (RBAC)',
          desc: 'Machen Sie technische Papierdaten für Verlage sichtbar, während individuelle €/t-Konditionen strikt auf berechtigte Druckerei-Mandanten beschränkt bleiben.',
          icon: ShieldCheck,
        },
        {
          badge: '06 / API & CSV SYNC',
          title: 'Automatischer Katalogabgleich per REST-API',
          desc: 'Verbinden Sie Ihr ERP über GET/POST /api/admin/materials/catalog, um Bestände, Chargen und Tonnenpreise automatisiert zu pflegen.',
          icon: Database,
        },
      ],

      faqHeading: 'Häufig gestellte Fragen von Papierlieferanten & Großhändlern',
      faqs: [
        {
          q: 'Ist PrintPrice Pro ein Papiermakler oder Zwischenhändler?',
          a: 'Nein. PrintPrice OS ist eine neutrale Software-Infrastruktur. Wir binden Ihren technischen Substratkatalog und Ihre Preismatrizen direkt in die Kalkulationsmotoren der Druckereien und Verlage ein. Bestellung und Rechnungsstellung erfolgen zu 100% direkt zwischen Ihnen und der Druckerei.',
        },
        {
          q: 'Warum sind Dicke in Mikrometern (µm) und Volumen (Bulk) so entscheidend?',
          a: 'Bei einem Buch mit 400 Seiten verändert ein Volumenwechsel von 1,15 auf 1,30 die Rückenbreite um mehrere Millimeter und bestimmt, wie viele Bücher in einen FEFCO 0201 Karton passen. Durch Ihren zertifizierten Wert im Paper Supplier Hub rechnen sowohl SPINE-04 als auch die 3D-Palettierung mit der exakten Physik Ihres Papiers.',
        },
        {
          q: 'Bleiben unsere individuellen Hauspreise für einzelne Druckereien vertraulich?',
          a: 'Ja. Die Control Plane setzt eine strikte Multi-Tenant-Isolierung (RBAC) durch. Verlage können Ihre Papiersorten technisch auswählen, während jede eingeloggte Druckerei ausschließlich die für sie freigegebene Preisstaffel sieht.',
        },
      ],

      finalCtaHeading: 'Integrieren Sie Ihren Substratkatalog in die industrielle Intelligence Layer',
      finalCtaSub:
        'Registrieren Sie Ihr Lieferantenkonto in der Control Plane und platzieren Sie Ihre Papiersorten genau dort, wo über jede Auflage entschieden wird.',
      finalCtaBtn: 'Papierlieferant registrieren ➔',
      finalCtaSec: 'Paper Hub Dokumentation ↗',
    },
  };

  const t = content[locale] || content.es;
  const activeMod = t.modules[activeModule];

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* 1. HERO BANNER WITH LOCALIZED FEDERATED SUBSTRATE CARD */}
      <HeroPlatform
        variant="particles"
        label={t.heroLabel}
        title={t.heroTitle}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{
          label: t.ctaPrimary,
          href: 'https://control.printprice.pro/supplier/register',
          sublabel: t.badgeNote,
        }}
        secondaryAction={{
          label: t.ctaSecondary,
          href: '#supplier-hub-modules',
        }}
        rightContent={
          <div
            className="rounded-card"
            style={{
              background: 'rgba(19, 19, 20, 0.92)',
              border: '1px solid rgba(220, 0, 0, 0.35)',
              padding: '1.5rem 1.75rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
              maxWidth: '480px',
              marginLeft: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.75rem',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                className="technical-text"
                style={{ fontSize: '0.72rem', fontWeight: 800, color: '#dc0000', letterSpacing: '0.1em' }}
              >
                {t.cardHeader}
              </span>
              <span
                className="technical-text"
                style={{
                  fontSize: '0.65rem',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                  padding: '0.15rem 0.55rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                }}
              >
                {t.cardBadge}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              {t.cardRows.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    paddingBottom: idx < t.cardRows.length - 1 ? '0.55rem' : 0,
                    borderBottom: idx < t.cardRows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <span style={{ color: '#a1a1aa' }}>{row.k}</span>
                  <span
                    className="technical-text"
                    style={{
                      fontWeight: 700,
                      color: row.accent ? '#dc0000' : row.highlight ? '#22c55e' : '#f4f4f5',
                      textAlign: 'right',
                    }}
                  >
                    {row.v}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '0.9rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
              }}
            >
              <div className="technical-text" style={{ fontSize: '0.68rem', color: '#8d8d91', marginBottom: '0.65rem' }}>
                {t.cardFooterNote}
              </div>
              <a
                href="https://control.printprice.pro/supplier/register"
                className="btn-primary"
                style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.82rem', borderRadius: '10px' }}
              >
                {t.cardCta}
              </a>
            </div>
          </div>
        }
      />

      {/* 2. INTERACTIVE 4-MODULE PAPER SUPPLIER HUB EXPLORER */}
      <Section variant="secondary" id="supplier-hub-modules">
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <span className="pill-badge" style={{ marginBottom: '0.85rem' }}>
            {t.hubPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)', marginBottom: '0.85rem' }}>
            {t.hubTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t.hubSub}
          </p>
        </div>

        {/* Module Selector Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
          role="tablist"
          aria-label="Paper Supplier Hub Modules"
        >
          {(
            [
              { id: 'dashboard', label: '/supplier/dashboard' },
              { id: 'catalog', label: '/supplier/catalog (µm & Bulk)' },
              { id: 'orders', label: '/supplier/orders (RFQ)' },
              { id: 'settings', label: '/supplier/settings (Ex-Works ≠ Freight)' },
            ] as { id: SupplierModuleId; label: string }[]
          ).map((tab) => {
            const isActive = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveModule(tab.id)}
                className="technical-text"
                style={{
                  padding: '0.7rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: isActive ? '#ffffff' : 'var(--text-primary)',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Module Card */}
        <div
          className="rounded-card"
          style={{
            maxWidth: '980px',
            margin: '0 auto',
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            border: '1px solid var(--accent-border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <span
              className="technical-text"
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                letterSpacing: '0.08em',
                padding: '0.25rem 0.65rem',
                background: 'var(--accent-container)',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {activeMod.badge}
            </span>
            <span className="technical-text" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              https://control.printprice.pro{activeMod.route}
            </span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', marginBottom: '0.85rem' }}>
            {activeMod.title}
          </h3>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            {activeMod.desc}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '1rem',
            }}
          >
            {activeMod.metrics.map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.1rem 1.25rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  display: 'flex',
                  gap: '0.65rem',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: 'var(--accent-primary)', fontWeight: 900 }}>✓</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. 4-STEP ONBOARDING FLOW */}
      <Section variant="primary" id="how-it-works">
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem' }}>
          <span className="pill-badge" style={{ marginBottom: '0.85rem' }}>
            {t.stepsPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            {t.stepsTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {t.stepsSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {t.steps.map((step) => (
            <div key={step.num} className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div
                style={{
                  fontSize: '2.75rem',
                  fontWeight: 900,
                  color: 'var(--accent-primary)',
                  opacity: 0.22,
                  lineHeight: 1,
                  marginBottom: '0.85rem',
                }}
              >
                {step.num}
              </div>
              <div
                className="technical-text"
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                }}
              >
                {step.tag}
              </div>
              <h3 style={{ fontSize: '1.22rem', marginBottom: '0.55rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. 6 SUPPLIER CAPABILITIES */}
      <Section variant="secondary">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span className="pill-badge" style={{ marginBottom: '0.85rem' }}>
            {t.capsPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            {t.capsTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {t.capsSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {t.caps.map((cap) => {
            const IconComp = cap.icon;
            return (
              <div key={cap.badge} className="rounded-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'var(--accent-container)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComp size={22} strokeWidth={1.8} />
                  </div>
                  <span
                    className="technical-text"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.08em',
                      padding: '0.2rem 0.55rem',
                      background: 'var(--accent-container)',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    {cap.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.22rem', marginTop: '0.25rem' }}>{cap.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 5. FAQ SECTION */}
      <Section variant="primary" showGrid={false}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', marginBottom: '2.25rem', textAlign: 'center' }}>
            {t.faqHeading}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {t.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-card" style={{ padding: '1.65rem 1.85rem' }}>
                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginBottom: '0.55rem' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. FINAL CTA */}
      <ActionCTA
        slogan="FEDERATE. CALIBRATE. SUPPLY AT SCALE."
        title={t.finalCtaHeading}
        description={t.finalCtaSub}
        buttonLabel={t.finalCtaBtn}
        buttonHref="https://control.printprice.pro/supplier/register"
        secondaryButtonLabel={t.finalCtaSec}
        secondaryButtonHref="https://docs.printprice.pro/docs/platform/paper-supplier-hub"
        trackingAction="suppliers_final_cta"
      />
    </main>
  );
}

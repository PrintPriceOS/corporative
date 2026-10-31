'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { useLocale } from '@/lib/i18n';
import {
  BarChart3,
  Library,
  SearchCheck,
  Truck,
  PackageCheck,
  Ruler,
  ShieldCheck,
  TrendingDown,
  Layers,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

type WarehouseKey = 'zeitfracht' | 'arvato' | 'fba';

export default function ForPublishersPage() {
  const { locale } = useLocale();
  const [activeWarehouse, setActiveWarehouse] = useState<WarehouseKey>('zeitfracht');

  const content = {
    es: {
      heroLabel: 'PRINTPRICE FOR PUBLISHERS · CATÁLOGO, COSTE LANDED & LOGÍSTICA 3D',
      heroTitle: 'PRESUPUESTA CATÁLOGOS, OPTIMIZA TIRADAS Y PROTEGE TU MARGEN EN DISTRIBUCIÓN',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'SHIP TO DOCK.'],
      heroSub:
        'Diseñado para directores de producción editorial y gestores de catálogo. Compara curvas de cruce Digital vs. Offset, desglosa matemáticamente Fabricación ≠ Embalaje ≠ Transporte, ajusta tiradas al límite físico del Euro-palet (ΔQ⁻ / ΔQ⁺) y cumple al 100% las normativas de descarga en Zeitfracht, VVA Arvato y Amazon FBA.',
      ctaPrimary: 'Simular tirada editorial ➔',
      ctaSecondary: 'Explorar cumplimiento logístico ↓',
      badgeNote: '✓ COSTE LANDED SEGREGADO · OPTIMIZADOR ΔQ⁻/ΔQ⁺ · GEOMETRÍA SPINE-04 · AUDITORÍA PDF',

      // Hero Right Card
      cardHeader: 'MATRIZ DE TIRADA & COSTE LANDED',
      cardBadge: 'MFG ≠ PACK ≠ FREIGHT',
      cardSpecLabel: 'Título: 148×210 mm · 320 págs · 90g Ahuesado (Bulk 1.20) · Cartoné Cosido',
      matrixHeaders: ['Tirada', 'Tecnología', 'Fab. / ud.', 'Landed / ud.', 'Palets EPAL'],
      matrixRows: [
        { qty: '300 uds', tech: 'Digital Inkjet', mfg: '3,42 €', landed: '3,78 €', pallets: '1 EPAL (14 cajas)' },
        { qty: '750 uds', tech: 'Cruce Offset', mfg: '2,18 €', landed: '2,41 €', pallets: '2 EPAL (35 cajas)', highlight: false },
        { qty: '2.500 uds', tech: 'Offset B1', mfg: '1,85 €', landed: '1,99 €', pallets: '4 EPAL (114 cajas)', highlight: true },
        { qty: '3.168 uds', tech: 'Offset ΔQ⁺ Óptimo', mfg: '1,62 €', landed: '1,73 €', pallets: '4 EPAL (144 cajas)', highlight: false },
      ],
      deltaAlertTitle: 'OPTIMIZADOR VOLUMÉTRICO ΔQ⁻ / ΔQ⁺ ACTIVO (2.500 EJEMPLARES)',
      deltaMinusText: 'ΔQ⁻ (2.376 uds): Ahorra 1 Euro-palet completo (-0,4 LDM) recortando solo 124 libros.',
      deltaPlusText: 'ΔQ⁺ (3.168 uds): Imprime +668 libros adicionales en los mismos 4 palets sin pagar flete extra.',
      cardFooterCta: 'Abrir Calculador Editorial en Vivo ➔',

      // Section 1: 4-Stage Editorial Workflow
      workflowPill: 'FLUJO DE PRODUCCIÓN EDITORIAL END-TO-END',
      workflowTitle: 'De la planificación de colección a la descarga sin penalizaciones en el distribuidor',
      workflowSub:
        'Elimina las hojas de cálculo desconectadas. Cada título conserva su ficha técnica paramétrica, su lomo calculado al micrómetro y su plan de paletizado 3D.',
      steps: [
        {
          num: '01',
          tag: 'SPEC & SPINE-04',
          title: 'Ficha Técnica & Lomo Exacto',
          desc: 'Configura formato cerrado, papel interior con calibre certificado (µm), cartón gris (2,0–3,0 mm), guardas y cabezadas. SPINE-04 calcula el lomo y la cubierta desplegada exacta antes de que diseño exporte el PDF.',
        },
        {
          num: '02',
          tag: 'CROSSOVER & ΔQ',
          title: 'Cruce Digital/Offset y Tirada ΔQ',
          desc: 'Compara escalones simultáneos y detecta en qué tirada exacta el offset supera al digital, ajustando la cantidad al múltiplo exacto de cajas FEFCO 0201 y capas de Euro-palet.',
        },
        {
          num: '03',
          tag: 'PREFLIGHT AUDIT',
          title: 'Auditoría Forense de Artes Finales',
          desc: 'Verifica los PDFs de maquetadores externos: concordancia de ancho de lomo (tolerancia ±0,5 mm), sangrados de 3 mm / bisagra de 8 mm, fuentes incrustadas y cobertura TAC CMYK.',
        },
        {
          num: '04',
          tag: 'DOCK COMPLIANCE',
          title: 'Entrega Certificada en Distribuidora',
          desc: 'La imprenta recibe la orden gobernada junto con el plano de estiba 3D EPAL, etiquetas GS1-128 SSCC y aviso previo de muelle de 48h para evitar recargos de re-paletizado.',
        },
      ],

      // Section 2: Interactive Editorial Warehouse Compliance
      dockPill: 'CUMPLIMIENTO LOGÍSTICO EN DISTRIBUIDORAS EUROPEAS',
      dockTitle: 'Cero penalizaciones de descarga en Zeitfracht, VVA Arvato y Amazon FBA',
      dockSub:
        'Un palet que supera por 2 cm la altura máxima o carece de retranqueo perimetral en Erfurt o Gütersloh genera penalizaciones de 80 € a 150 € por palet y retrasos en el lanzamiento comercial. PrintPrice OS aplica las reglas del almacén directamente durante la cotización.',
      warehouses: {
        zeitfracht: {
          badge: 'ZEITFRACHT MEDIEN · ERFURT (DE)',
          name: 'Zeitfracht Erfurt (KNV Logistik)',
          maxHeight: '1.200 mm (incl. base EPAL 144 mm)',
          maxWeight: '1.000 kg / Euro-palet · Máx. 15,0 kg / caja FEFCO',
          setback: '30 mm retranqueo interior obligatorio (1.140 × 740 mm útiles)',
          topLayer: 'Capa superior 100% plana o facturación forzosa 0,4 LDM no remontable',
          booking: 'Aviso obligatorio 48h antes (avis-wareneingang-va@zeitfracht.de) + SSCC GS1-128',
          penaltyPrevented: 'Evita recargo de 128,00 € por descarga sin ventana horaria o re-paletizado manual en muelle.',
        },
        arvato: {
          badge: 'VVA ARVATO · GÜTERSLOH (DE)',
          name: 'VVA — Vereinigte Verlagsauslieferung (Bertelsmann)',
          maxHeight: '1.300 mm (incl. base EPAL 144 mm)',
          maxWeight: '1.000 kg / Euro-palet · Máx. 15,0 kg / caja FEFCO',
          setback: '20 mm margen interior anti-desbordamiento · Cajas entrelazadas',
          topLayer: 'Prohibición estricta de capas superiores piramidales o incompletas sin relleno',
          booking: 'Etiquetado ISBN/EAN por caja + NVE/SSCC de 18 dígitos en 2 caras adyacentes',
          penaltyPrevented: 'Evita rechazos en túnel de escaneo automático de Gütersloh y cargos por reacondicionamiento.',
        },
        fba: {
          badge: 'AMAZON EU FBA · CENTROS LOGÍSTICOS',
          name: 'Amazon FBA Inbound (DE / ES / FR / IT)',
          maxHeight: '1.800 mm palet simple (1.250 mm en doble apilamiento)',
          maxWeight: '500 kg / palet FBA · Límite estricto 15,0 kg por caja sin etiqueta "Heavy Package"',
          setback: '0 mm voladizo permitido (Overhang 0 mm) · Film estirable transparente',
          topLayer: 'Distribución uniforme por referencia FNSKU / ISBN con manifiesto de cajas',
          booking: 'Reserva en Carrier Central (CARP) + etiquetas FBA Box ID + Pallet Labels',
          penaltyPrevented: 'Elimina bloqueos de recepción FBA por cajas > 15 kg tras absorber el peso real de la tapa dura.',
        },
      },
      dockLabels: {
        maxHeight: 'Altura Máxima Permitida',
        maxWeight: 'Límite de Masa (Palet / Caja)',
        setback: 'Geometría y Retranqueo Perimetral',
        topLayer: 'Regla de Capa Superior / Apilabilidad',
        booking: 'Protocolo de Cita Previa & Etiquetado',
        penaltyPrevented: 'Protección de Margen Editorial',
      },

      // Section 3: 6 Capabilities Grid
      capsPill: 'CAPACIDADES TÉCNICAS PARA SELLOS EDITORIALES',
      capsTitle: 'Ingeniería financiera y física para cada libro de tu catálogo',
      capsSub:
        'Todas las herramientas están conectadas al mismo motor servidor (BPE :8004 + Logistics 3D :8081) para garantizar coherencia absoluta entre presupuesto, preimpresión y albarán.',
      caps: [
        {
          badge: '01 / LANDED COST',
          title: 'Segregación Estricta Mfg ≠ Pack ≠ Freight',
          desc: 'Conoce al céntimo cuánto cuesta imprimir el libro, cuánto suman los Euro-palets EPAL y cajas FEFCO, y cuánto representa el transporte por LDM hasta tu distribuidor.',
          icon: BarChart3,
        },
        {
          badge: '02 / RUN OPTIMIZER',
          title: 'Optimizador de Tirada ΔQ⁻ / ΔQ⁺',
          desc: 'Nunca vuelvas a pagar el flete de un cuarto palet por llevar solo 3 cajas sueltas. El sistema te sugiere la cantidad exacta inferior (ΔQ⁻) o superior (ΔQ⁺) que optimiza el camión.',
          icon: TrendingDown,
        },
        {
          badge: '03 / SPINE-04 ENGINE',
          title: 'Geometría de Lomo y Colecciones Uniformes',
          desc: 'En colecciones y sagas editoriales, cambiar de proveedor de papel altera la mano (bulk). SPINE-04 recalcula el lomo en micrómetros reales para que tus reediciones encajen al milímetro.',
          icon: Ruler,
        },
        {
          badge: '04 / HARDCOVER MASS',
          title: 'Física Real de Tapa Dura (Cartoné 1,20 g/cm³)',
          desc: 'Los calculadores convencionales olvidan el peso del cartón gris, el cromo de recubrimiento y las guardas de 140g. Nuestro motor calcula la masa neta exacta para no exceder 15 kg por caja.',
          icon: Layers,
        },
        {
          badge: '05 / PREFLIGHT GATE',
          title: 'Auditoría de Archivos de Maquetadores',
          desc: 'Valida entregas de estudios externos antes de enviar a planta: detecta fuentes sin incrustar, imágenes RGB o de baja resolución (< 300 DPI) y desviaciones en el ancho del lomo.',
          icon: SearchCheck,
        },
        {
          badge: '06 / REPRINT MEMORY',
          title: 'Memoria Paramétrica de Reediciones',
          desc: 'Guarda cada título con su combinación certificada de papel, acabado y evidencia comercial (evidenceId). Lanza una 2ª o 5ª edición en 10 segundos comparando tiradas al instante.',
          icon: Library,
        },
        {
          badge: '07 / 3D SOFT-PROOF & B2B HUB',
          title: 'Visor 3D Paramétrico y Firma "APPROVE FOR PRESS"',
          desc: 'Inspecciona en 360° el lomo real calculado (PHASE-11A), ceja de cartoné (3 mm) y esquinas TrimBox/BleedBox, emite firma digital SHA-256, sigue los 6 hitos de planta en vivo y descarga albaranes POD y certificados FSC/PEFC.',
          icon: PackageCheck,
        },
        {
          badge: '08 / ESCROW & POD SPLIT-PAYOUT',
          title: 'Escrow Comercial Garantizado y Liquidación por POD',
          desc: 'Tus fondos quedan protegidos en Escrow tras aprobar el libro en 3D (FUNDS_LOCKED_ON_PROOF_APPROVAL) y solo se liberan automáticamente al recibir el Albarán POD firmado en distribuidora, segregando Fabricación ≠ Embalaje ≠ Transporte.',
          icon: ShieldCheck,
        },
      ],

      // FAQ
      faqHeading: 'Preguntas frecuentes de directores de producción editorial',
      faqs: [
        {
          q: '¿Por qué mi presupuesto tradicional de imprenta suele desviarse del coste final entregado en distribuidora?',
          a: 'Porque los presupuestos tradicionales suelen mezclar o estimar a ojo el porte y rara vez calculan el número real de cajas FEFCO 0201 y Euro-palets antes de fabricar. Además, cuando la última capa de un palet queda incompleta, el transportista aplica recargo de no apilabilidad (0,4 LDM completos). PrintPrice OS simula la estiba 3D antes de aprobar el presupuesto.',
        },
        {
          q: '¿Cómo ayuda el optimizador ΔQ⁻ / ΔQ⁺ a reducir el coste unitario de una edición?',
          a: 'Si pides 2.500 ejemplares y los primeros 3 Euro-palets alojan 2.376 libros, los 124 libros restantes obligan a abrir un 4º palet casi vacío. El motor te muestra dos caminos: reducir a 2.376 uds (ΔQ⁻) ahorrando un palet entero de transporte, o subir a 3.168 uds (ΔQ⁺) aprovechando el 100% del 4º palet con flete marginal cero.',
        },
        {
          q: '¿Cómo gestionáis el cambio de papel en una reedición para no descuadrar la cubierta?',
          a: 'El motor SPINE-04 utiliza el calibre físico en micrómetros (µm) o el factor de mano (bulk) certificado del nuevo lote en el Paper Supplier Hub. Si pasas de un offset 90g mano 1.25 a un ahuesado 90g mano 1.35, SPINE-04 te alerta de la variación exacta del lomo en milímetros y verifica si el PDF de cubierta necesita ajuste.',
        },
        {
          q: '¿Soportáis encuadernación industrial de alta gama (cosido hilo, PUR, cartoné con sobrecubierta)?',
          a: 'Sí. El Book Pricing Engine modela rústica fresada PUR, rústica cosida con hilo vegetal en pliegos de 16/32 páginas, tapa dura (cartoné) con lomo recto o redondo, cabezadas, cinta punto de lectura, estampación y plastificados mate, brillo o soft-touch.',
        },
      ],

      finalCtaHeading: 'Toma el control industrial de tus tiradas y entregas editoriales',
      finalCtaSub:
        'Simula ahora mismo un título de tu catálogo con cálculo de lomo SPINE-04, cruce Digital/Offset y cubicaje 3D para tu distribuidor.',
      finalCtaBtn: 'Calcular tirada editorial en vivo ➔',
      finalCtaSec: 'Explorar API para ERP Editorial ➔',
    },

    en: {
      heroLabel: 'PRINTPRICE FOR PUBLISHERS · CATALOG, LANDED COST & 3D LOGISTICS',
      heroTitle: 'QUOTE CATALOGS, OPTIMIZE PRINT RUNS & PROTECT DISTRIBUTION MARGINS',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'SHIP TO DOCK.'],
      heroSub:
        'Built for publishing production directors and catalog managers. Compare Digital vs. Offset crossover curves, mathematically decouple Manufacturing ≠ Packaging ≠ Freight, snap print runs to exact Euro-pallet capacity (ΔQ⁻ / ΔQ⁺), and enforce 100% dock compliance for Zeitfracht, VVA Arvato, and Amazon FBA.',
      ctaPrimary: 'Simulate publishing run ➔',
      ctaSecondary: 'Explore dock compliance ↓',
      badgeNote: '✓ SEGREGATED LANDED COST · ΔQ⁻/ΔQ⁺ RUN OPTIMIZER · SPINE-04 GEOMETRY · PDF PREFLIGHT',

      cardHeader: 'PUBLISHER RUN & LANDED COST MATRIX',
      cardBadge: 'MFG ≠ PACK ≠ FREIGHT',
      cardSpecLabel: 'Title: 148×210 mm · 320 pp · 90gsm Cream Book (Bulk 1.20) · Sewn Hardcover',
      matrixHeaders: ['Print Run', 'Technology', 'Mfg / unit', 'Landed / unit', 'EPAL Pallets'],
      matrixRows: [
        { qty: '300 copies', tech: 'Digital Inkjet', mfg: '€3.42', landed: '€3.78', pallets: '1 EPAL (14 cartons)' },
        { qty: '750 copies', tech: 'Offset Crossover', mfg: '€2.18', landed: '€2.41', pallets: '2 EPAL (35 cartons)', highlight: false },
        { qty: '2,500 copies', tech: 'Sheetfed Offset B1', mfg: '€1.85', landed: '€1.99', pallets: '4 EPAL (114 cartons)', highlight: true },
        { qty: '3,168 copies', tech: 'Offset ΔQ⁺ Optimal', mfg: '€1.62', landed: '€1.73', pallets: '4 EPAL (144 cartons)', highlight: false },
      ],
      deltaAlertTitle: 'VOLUMETRIC RUN OPTIMIZER ΔQ⁻ / ΔQ⁺ ACTIVE (2,500 COPIES)',
      deltaMinusText: 'ΔQ⁻ (2,376 copies): Save 1 full Euro-pallet (-0.4 LDM) by trimming just 124 copies.',
      deltaPlusText: 'ΔQ⁺ (3,168 copies): Print +668 extra copies on the exact same 4 pallets with €0 extra freight.',
      cardFooterCta: 'Launch Live Publisher Estimator ➔',

      workflowPill: 'END-TO-END PUBLISHING PRODUCTION WORKFLOW',
      workflowTitle: 'From seasonal list planning to penalty-free distributor dock delivery',
      workflowSub:
        'Eliminate disconnected spreadsheets. Every title retains its parametric spec sheet, micron-verified spine width, and 3D EPAL palletization blueprint.',
      steps: [
        {
          num: '01',
          tag: 'SPEC & SPINE-04',
          title: 'Parametric Spec & Exact Spine',
          desc: 'Define trim size, interior stock with certified caliper (µm), greyboard (2.0–3.0 mm), endpapers, and headbands. SPINE-04 computes exact spine and full cover spread before designers export PDFs.',
        },
        {
          num: '02',
          tag: 'CROSSOVER & ΔQ',
          title: 'Digital/Offset Crossover & ΔQ Run',
          desc: 'Evaluate multi-quantity tiers simultaneously, pinpoint the exact sheetfed offset crossover, and align copy counts with full FEFCO 0201 cartons and Euro-pallet layers.',
        },
        {
          num: '03',
          tag: 'PREFLIGHT AUDIT',
          title: 'Forensic Artwork Preflight',
          desc: 'Audit external designer PDFs prior to press: spine width match (±0.5 mm tolerance), 3 mm bleed / 8 mm hinge turn-in, embedded fonts, and CMYK TAC ink limits.',
        },
        {
          num: '04',
          tag: 'DOCK COMPLIANCE',
          title: 'Certified Distributor Delivery',
          desc: 'The print plant receives a governed job ticket paired with the 3D EPAL stacking plan, GS1-128 SSCC labels, and 48h dock slot booking to prevent repacking surcharges.',
        },
      ],

      dockPill: 'EUROPEAN EDITORIAL DISTRIBUTOR COMPLIANCE',
      dockTitle: 'Zero receiving penalties at Zeitfracht, VVA Arvato, and Amazon FBA',
      dockSub:
        'A pallet exceeding height limits by 2 cm or missing perimeter setback at Erfurt or Gütersloh triggers €80–€150 per-pallet repacking penalties and delays release dates. PrintPrice OS enforces warehouse physics at quote time.',
      warehouses: {
        zeitfracht: {
          badge: 'ZEITFRACHT MEDIEN · ERFURT (DE)',
          name: 'Zeitfracht Erfurt (KNV Logistik)',
          maxHeight: '1,200 mm (incl. 144 mm EPAL wooden base)',
          maxWeight: '1,000 kg / Euro-pallet · Max. 15.0 kg / FEFCO carton',
          setback: 'Mandatory 30 mm inner perimeter setback (1,140 × 740 mm usable footprint)',
          topLayer: '100% flat top layer required or mandatory 0.4 LDM non-stackable billing',
          booking: 'Mandatory 48h advance slot booking (avis-wareneingang-va@zeitfracht.de) + GS1-128 SSCC',
          penaltyPrevented: 'Prevents €128.00 unbooked dock penalty and manual repacking fees at Erfurt.',
        },
        arvato: {
          badge: 'VVA ARVATO · GÜTERSLOH (DE)',
          name: 'VVA — Vereinigte Verlagsauslieferung (Bertelsmann)',
          maxHeight: '1,300 mm (incl. 144 mm EPAL wooden base)',
          maxWeight: '1,000 kg / Euro-pallet · Max. 15.0 kg / FEFCO carton',
          setback: '20 mm anti-overhang inner margin · Interlocked carton tiling',
          topLayer: 'Strict ban on pyramid or partial top layers without level void fill',
          booking: 'Carton ISBN/EAN barcode + 18-digit NVE/SSCC labels on 2 adjacent pallet faces',
          penaltyPrevented: 'Prevents automated conveyor rejections at Gütersloh and rework charges.',
        },
        fba: {
          badge: 'AMAZON EU FBA · FULFILLMENT CENTERS',
          name: 'Amazon FBA Inbound (DE / ES / FR / IT)',
          maxHeight: '1,800 mm single-deck pallet (1,250 mm double-stacked)',
          maxWeight: '500 kg / FBA pallet · Strict 15.0 kg carton limit without "Heavy Package" tag',
          setback: '0 mm overhang allowed · Clear stretch-wrap film mandatory',
          topLayer: 'Uniform SKU/ISBN distribution with carton-level content manifest',
          booking: 'Carrier Central (CARP) booking + FBA Box ID & 4× Pallet Labels',
          penaltyPrevented: 'Eliminates FBA inbound refusals caused by hardcover board pushing cartons past 15 kg.',
        },
      },
      dockLabels: {
        maxHeight: 'Maximum Allowed Height',
        maxWeight: 'Mass Limit (Pallet / Carton)',
        setback: 'Footprint & Perimeter Setback',
        topLayer: 'Top Layer & Stackability Rule',
        booking: 'Dock Slot & Barcode Protocol',
        penaltyPrevented: 'Publisher Margin Protection',
      },

      capsPill: 'TECHNICAL CAPABILITIES FOR PUBLISHING HOUSES',
      capsTitle: 'Financial and physical engineering for every title on your list',
      capsSub:
        'All tools run on the same server-side engines (BPE :8004 + Logistics 3D :8081) ensuring 100% consistency from initial acquisition P&L to warehouse delivery.',
      caps: [
        {
          badge: '01 / LANDED COST',
          title: 'Strict Mfg ≠ Pack ≠ Freight Segregation',
          desc: 'See down to the cent what goes to press manufacturing, what EPAL pallets and FEFCO cartons cost, and what LDM carrier freight costs to reach your distributor.',
          icon: BarChart3,
        },
        {
          badge: '02 / RUN OPTIMIZER',
          title: 'ΔQ⁻ / ΔQ⁺ Pallet Run Optimizer',
          desc: 'Never pay for a 4th pallet just to ship 3 spillover cartons. The solver recommends the exact lower (ΔQ⁻) or higher (ΔQ⁺) print run that maximizes pallet density.',
          icon: TrendingDown,
        },
        {
          badge: '03 / SPINE-04 ENGINE',
          title: 'Micron Spine & Series Uniformity',
          desc: 'Switching paper mills on a reprint changes bulk factor. SPINE-04 recomputes spine width in physical microns (µm) so multi-volume series and reprints align on the shelf.',
          icon: Ruler,
        },
        {
          badge: '04 / HARDCOVER MASS',
          title: 'True Hardcover Physics (1.20 g/cm³ Board)',
          desc: 'Generic calculators ignore greyboard overhang, wrap paper, and 140gsm endpapers. Our solver models exact trimmed mass so cartons never breach 15.0 kg occupational limits.',
          icon: Layers,
        },
        {
          badge: '05 / PREFLIGHT GATE',
          title: 'External Typesetter & Cover Audit',
          desc: 'Validate freelance designer PDFs before press: catch unembedded fonts, RGB or low-DPI (< 300 DPI) images, and cover spine mismatches automatically.',
          icon: SearchCheck,
        },
        {
          badge: '06 / REPRINT MEMORY',
          title: 'Parametric Reprint & Edition Memory',
          desc: 'Store every title with its certified paper grade, finish, and immutable evidenceId. Quote a 2nd or 5th reprint across multiple run quantities in 10 seconds.',
          icon: Library,
        },
        {
          badge: '07 / 3D SOFT-PROOF & B2B HUB',
          title: 'Parametric 3D Soft-Proofing & "APPROVE FOR PRESS"',
          desc: 'Inspect true 3D spine width (PHASE-11A), 3 mm hardcover overhang, and TrimBox/BleedBox corners in 360°, issue SHA-256 press sign-off, track 6 live manufacturing milestones, and download signed PODs and FSC/PEFC certificates.',
          icon: PackageCheck,
        },
        {
          badge: '08 / ESCROW & POD SPLIT-PAYOUT',
          title: 'Guaranteed Commercial Escrow & Signed POD Settlement',
          desc: 'Funds are locked in commercial Escrow upon 3D proof sign-off (FUNDS_LOCKED_ON_PROOF_APPROVAL) and automatically released via Split-Payout only after signed POD at the distributor dock, strictly isolating Mfg ≠ Pack ≠ Freight.',
          icon: ShieldCheck,
        },
      ],

      faqHeading: 'Frequently Asked Questions for Publishing Production Teams',
      faqs: [
        {
          q: 'Why do traditional printer quotes often diverge from final delivered costs at our distributor?',
          a: 'Traditional quotes bundle rough freight estimates and rarely compute exact FEFCO 0201 carton counts and Euro-pallet layers ahead of production. Furthermore, an uneven top pallet layer forces carriers to charge full non-stackable Loading Meters (0.4 LDM). PrintPrice OS solves 3D cubing at quote time.',
        },
        {
          q: 'How does the ΔQ⁻ / ΔQ⁺ run optimizer lower our per-unit landed cost?',
          a: 'If you quote 2,500 copies and 3 full Euro-pallets hold 2,376 books, the remaining 124 books require a 4th pallet that is mostly air. The engine shows two options: reduce to 2,376 copies (ΔQ⁻) to save an entire pallet of freight, or increase to 3,168 copies (ΔQ⁺) to fill the 4th pallet with zero additional freight cost.',
        },
        {
          q: 'How do you handle paper stock changes on a reprint without ruining the cover spine?',
          a: 'The SPINE-04 engine reads certified physical caliper (µm) and bulk factors from the Paper Supplier Hub. If you switch from a 90gsm 1.25 bulk offset to a 90gsm 1.35 bulk cream stock, SPINE-04 calculates the exact millimeter delta and checks whether the cover PDF needs adjustment.',
        },
        {
          q: 'Do you support trade and luxury editorial bindery (thread sewn, PUR, casebound hardcover)?',
          a: 'Yes. The Book Pricing Engine models PUR perfect binding, thread-sewn softcover in 16/32-page signatures, casebound hardcovers with straight or rounded spines, headbands, ribbon markers, foil stamping, and matte, gloss, or soft-touch laminations.',
        },
      ],

      finalCtaHeading: 'Take industrial control of your print runs and warehouse deliveries',
      finalCtaSub:
        'Simulate a title from your list right now with SPINE-04 spine geometry, Digital/Offset crossover, and 3D distributor cubing.',
      finalCtaBtn: 'Calculate live publishing run ➔',
      finalCtaSec: 'Explore Publishing ERP API ➔',
    },

    de: {
      heroLabel: 'PRINTPRICE FÜR VERLAGE · PROGRAMM, LANDED COST & 3D-LOGISTIK',
      heroTitle: 'PROGRAMME KALKULIEREN, AUFLAGEN OPTIMIEREN & VERTRIEBSMARGEN SICHERN',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'SHIP TO DOCK.'],
      heroSub:
        'Entwickelt für Herstellungsleiter und Verlagsproduktion. Vergleichen Sie Digital/Offset-Schnittpunkte, trennen Sie mathematisch zwischen Druck ≠ Verpackung ≠ Fracht, optimieren Sie Auflagen auf volle Europaletten (ΔQ⁻ / ΔQ⁺) und sichern Sie 100% Richtlinienkonformität für Zeitfracht Erfurt, VVA Arvato und Amazon FBA.',
      ctaPrimary: 'Verlagsauflage simulieren ➔',
      ctaSecondary: 'Anlieferrichtlinien prüfen ↓',
      badgeNote: '✓ GETRENNTE LANDED COSTS · ΔQ⁻/ΔQ⁺ AUFLAGENOPTIMIERER · SPINE-04 · PDF-PREFLIGHT',

      cardHeader: 'AUFLAGEN- & LANDED-COST-MATRIX',
      cardBadge: 'MFG ≠ PACK ≠ FREIGHT',
      cardSpecLabel: 'Titel: 148×210 mm · 320 S. · 90g Werkdruck (Vol. 1.20) · Hardcover Fadenheftung',
      matrixHeaders: ['Auflage', 'Technologie', 'Druck / Ex.', 'Landed / Ex.', 'EPAL-Paletten'],
      matrixRows: [
        { qty: '300 Ex.', tech: 'Digital Inkjet', mfg: '3,42 €', landed: '3,78 €', pallets: '1 EPAL (14 Kartons)' },
        { qty: '750 Ex.', tech: 'Offset-Schnittpunkt', mfg: '2,18 €', landed: '2,41 €', pallets: '2 EPAL (35 Kartons)', highlight: false },
        { qty: '2.500 Ex.', tech: 'Bogenoffset B1', mfg: '1,85 €', landed: '1,99 €', pallets: '4 EPAL (114 Kartons)', highlight: true },
        { qty: '3.168 Ex.', tech: 'Offset ΔQ⁺ Optimal', mfg: '1,62 €', landed: '1,73 €', pallets: '4 EPAL (144 Kartons)', highlight: false },
      ],
      deltaAlertTitle: 'VOLUMETRISCHER AUFLAGENOPTIMIERER ΔQ⁻ / ΔQ⁺ AKTIV (2.500 EX.)',
      deltaMinusText: 'ΔQ⁻ (2.376 Ex.): Spart 1 komplette Europalette (-0,4 LDM) durch Reduktion um nur 124 Bücher.',
      deltaPlusText: 'ΔQ⁺ (3.168 Ex.): +668 zusätzliche Bücher auf denselben 4 Paletten ohne Mehrfracht.',
      cardFooterCta: 'Live-Verlagskalkulator öffnen ➔',

      workflowPill: 'END-TO-END HERSTELLUNGS-WORKFLOW FÜR VERLAGE',
      workflowTitle: 'Von der Vorschauplanung bis zur straffreien Anlieferung an der Verlagsauslieferung',
      workflowSub:
        'Schluss mit isolierten Excel-Tabellen. Jeder Titel speichert seine technischen Parameter, seine mikrometergenaue Rückenbreite und seinen 3D-Palettierplan.',
      steps: [
        {
          num: '01',
          tag: 'SPEC & SPINE-04',
          title: 'Titelspezifikation & Buchrücken',
          desc: 'Definieren Sie Format, Werkdruckpapier mit zertifiziertem Volumen, Graupappe (2,0–3,0 mm), Vorsatz und Kapitalband. SPINE-04 berechnet Rückenbreite und Umschlag-Gesamtformat vor dem PDF-Export.',
        },
        {
          num: '02',
          tag: 'CROSSOVER & ΔQ',
          title: 'Digital/Offset-Schnittpunkt & ΔQ',
          desc: 'Vergleichen Sie Auflagenstaffeln simultan, ermitteln Sie den exakten Offset-Schnittpunkt und runden Sie Auflagen auf volle FEFCO 0201 Kartons und Europaletten-Lagen.',
        },
        {
          num: '03',
          tag: 'PREFLIGHT AUDIT',
          title: 'Forensische Druckdatenprüfung',
          desc: 'Prüfen Sie Satz- und Umschlag-PDFs externer Grafiker vorab: Rückenbreiten-Abgleich (±0,5 mm Toleranz), 3 mm Beschnitt / 8 mm Falz, Schriften und CMYK-Farbauftrag.',
        },
        {
          num: '04',
          tag: 'DOCK COMPLIANCE',
          title: 'Zertifizierte Auslieferungs-Übergabe',
          desc: 'Die Druckerei erhält den verbindlichen Fertigungsauftrag inklusive 3D-EPAL-Packschema, GS1-128 NVE/SSCC-Etiketten und 48h-Zeitfensterbuchung.',
        },
      ],

      dockPill: 'RICHTLINIENKONFORMITÄT FÜR BARSORTIMENT & VERLAGSAUSLIEFERUNG',
      dockTitle: 'Null Strafgebühren bei Zeitfracht Erfurt, VVA Arvato und Amazon FBA',
      dockSub:
        'Eine Palette, die in Erfurt oder Gütersloh 2 cm zu hoch ist oder keinen Innenrücksprung aufweist, verursacht 80 € bis 150 € Umpackgebühren pro Palette und verzögert den Erscheinungstermin. PrintPrice OS prüft diese Vorgaben bereits in der Kalkulation.',
      warehouses: {
        zeitfracht: {
          badge: 'ZEITFRACHT MEDIEN · ERFURT (DE)',
          name: 'Zeitfracht Erfurt (KNV Logistik)',
          maxHeight: '1.200 mm (inkl. 144 mm EPAL-Holzpalette)',
          maxWeight: '1.000 kg / Europalette · Max. 15,0 kg / FEFCO-Karton',
          setback: '30 mm umlaufender Innenrücksprung Pflicht (1.140 × 740 mm Nutzfläche)',
          topLayer: '100% flache oberste Lage oder zwingende 0,4 LDM Nicht-Stapelbar-Abrechnung',
          booking: 'Pflicht-Avisierung 48h vorab (avis-wareneingang-va@zeitfracht.de) + GS1-128 NVE/SSCC',
          penaltyPrevented: 'Verhindert 128,00 € Strafgebühr für unavisierte Anlieferung oder manuelles Umpalettieren.',
        },
        arvato: {
          badge: 'VVA ARVATO · GÜTERSLOH (DE)',
          name: 'VVA — Vereinigte Verlagsauslieferung (Bertelsmann)',
          maxHeight: '1.300 mm (inkl. 144 mm EPAL-Holzpalette)',
          maxWeight: '1.000 kg / Europalette · Max. 15,0 kg / FEFCO-Karton',
          setback: '20 mm Innenrand gegen Überstand · Verbundstapelung (Kreuzverband)',
          topLayer: 'Striktes Verbot von Pyramiden- oder unvollständigen Decklagen ohne Leerlaufausgleich',
          booking: 'Karton-ISBN/EAN-Code + 18-stellige NVE/SSCC-Palettenetiketten auf 2 Nachbarseiten',
          penaltyPrevented: 'Verhindert Rückweisungen an der automatischen Konturenkontrolle in Gütersloh.',
        },
        fba: {
          badge: 'AMAZON EU FBA · LOGISTIKZENTREN',
          name: 'Amazon FBA Inbound (DE / ES / FR / IT)',
          maxHeight: '1.800 mm Einzelpalette (1.250 mm bei Doppelstock-Verladung)',
          maxWeight: '500 kg / FBA-Palette · Striktes 15,0 kg Kartonlimit ohne „Schweres Paket“-Warnung',
          setback: '0 mm Überstand erlaubt · Transparente Stretchfolie vorgeschrieben',
          topLayer: 'Artikelreine Zuordnung nach FNSKU / ISBN inkl. Karton-Inhaltsmanifest',
          booking: 'Carrier Central (CARP) Zeitfenster + FBA Box ID & 4× Palettenetiketten',
          penaltyPrevented: 'Verhindert FBA-Annahmeverweigerungen, wenn Hardcover-Pappe Kartons über 15 kg treibt.',
        },
      },
      dockLabels: {
        maxHeight: 'Maximal zulässige Gesamthöhe',
        maxWeight: 'Gewichtslimit (Palette / Karton)',
        setback: 'Grundfläche & Innenrücksprung',
        topLayer: 'Decklagen- & Stapelbarkeitsregel',
        booking: 'Avisierungs- & Etikettierprotokoll',
        penaltyPrevented: 'Schutz Ihrer Verlagsmarge',
      },

      capsPill: 'TECHNISCHE FUNKTIONEN FÜR BUCHVERLAGE',
      capsTitle: 'Kaufmännische und physikalische Präzision für jeden Buchtitel',
      capsSub:
        'Alle Werkzeuge nutzen dieselben Server-Engines (BPE :8004 + Logistics 3D :8081) für durchgängige Datenkonsistenz von der Vorkalkulation bis zum Lieferschein.',
      caps: [
        {
          badge: '01 / LANDED COST',
          title: 'Strikte Trennung Druck ≠ Pack ≠ Fracht',
          desc: 'Erkennen Sie auf den Cent genau den reinen Druckpreis, die Kosten für EPAL-Paletten und FEFCO-Kartons sowie die LDM-Speditionsfracht bis zur Auslieferung.',
          icon: BarChart3,
        },
        {
          badge: '02 / RUN OPTIMIZER',
          title: 'ΔQ⁻ / ΔQ⁺ Auflagenoptimierer',
          desc: 'Zahlen Sie nie wieder eine 4. Palette für nur 3 überzählige Kartons. Das System empfiehlt die nächstkleinere (ΔQ⁻) oder nächstgrößere (ΔQ⁺) Auflage für optimale Palettenauslastung.',
          icon: TrendingDown,
        },
        {
          badge: '03 / SPINE-04 ENGINE',
          title: 'Mikrometer-Rückenbreite & Reihen-Treue',
          desc: 'Ein Papierwechsel beim Nachdruck verändert das Volumen (Bulk). SPINE-04 berechnet die Rückenbreite in Mikrometern (µm), damit Buchreihen im Regal exakt fluchten.',
          icon: Ruler,
        },
        {
          badge: '04 / HARDCOVER MASS',
          title: 'Echte Hardcover-Physik (1,20 g/cm³ Pappe)',
          desc: 'Herkömmliche Rechner vergessen Graupappe, Überzug und 140g-Vorsatz. Unser Rechner kalkuliert das exakte Buchgewicht, damit Kartons das 15,0-kg-Limit niemals reißen.',
          icon: Layers,
        },
        {
          badge: '05 / PREFLIGHT GATE',
          title: 'Prüfung externer Satz- & Umschlagdaten',
          desc: 'Validieren Sie PDF-Daten externer Grafiker vor Drucklegung: fehlende Schriften, RGB-Bilder, zu geringe Auflösung (< 300 DPI) und Rückenbreiten-Abweichungen.',
          icon: SearchCheck,
        },
        {
          badge: '06 / REPRINT MEMORY',
          title: 'Parametrisches Nachdruck-Gedächtnis',
          desc: 'Speichern Sie jeden Titel mit zertifizierter Papiersorte, Veredelung und evidenceId. Kalkulieren Sie die 2. oder 5. Auflage über mehrere Mengenstaffeln in 10 Sekunden.',
          icon: Library,
        },
        {
          badge: '07 / 3D SOFT-PROOF & B2B HUB',
          title: 'Parametrischer 3D-Softproof & "APPROVE FOR PRESS"',
          desc: 'Prüfen Sie in 360° die exakte Rückenbreite (PHASE-11A), 3 mm Buchdecken-Überstand und TrimBox/BleedBox-Ecken, erteilen Sie die digitale SHA-256-Druckfreigabe, verfolgen Sie 6 Live-Meilensteine und laden Sie signierte POD-Lieferscheine herunter.',
          icon: PackageCheck,
        },
        {
          badge: '08 / ESCROW & POD SPLIT-PAYOUT',
          title: 'Treuhand-Escrow & Automatische POD-Split-Auszahlung',
          desc: 'Ihr Budget wird nach der 3D-Druckfreigabe im Treuhand-Escrow gesichert (FUNDS_LOCKED_ON_PROOF_APPROVAL) und erst nach signiertem Abliefernachweis (POD) getrennt nach Druck ≠ Verpackung ≠ Fracht freigegeben.',
          icon: ShieldCheck,
        },
      ],

      faqHeading: 'Häufig gestellte Fragen von Herstellungsleitern',
      faqs: [
        {
          q: 'Warum weichen klassische Druckereiangebote oft von den finalen Kosten frei Verlagsauslieferung ab?',
          a: 'Klassische Angebote schätzen Frachtkosten pauschal und berechnen selten vorab die genaue Anzahl an FEFCO 0201 Kartons und Europaletten-Lagen. Bleibt die oberste Palettenlage unvollständig, berechnet die Spedition volle 0,4 Lademeter (nicht stapelbar). PrintPrice OS simuliert die 3D-Palettierung bereits im Angebot.',
        },
        {
          q: 'Wie senkt der ΔQ⁻ / ΔQ⁺ Auflagenoptimierer unsere Stückkosten?',
          a: 'Wenn Sie 2.500 Exemplare anfragen und 3 volle Europaletten 2.376 Bücher fassen, erzwingen die restlichen 124 Bücher eine fast leere 4. Palette. Der Rechner zeigt zwei Wege: Reduktion auf 2.376 Ex. (ΔQ⁻) spart eine ganze Palette Fracht, oder Erhöhung auf 3.168 Ex. (ΔQ⁺) füllt die 4. Palette komplett ohne zusätzliche Frachtkosten.',
        },
        {
          q: 'Wie wird ein Papierwechsel beim Nachdruck behandelt, ohne dass der Umschlagrücken nicht mehr passt?',
          a: 'Die SPINE-04 Engine nutzt die physikalische Dicke (µm) bzw. das zertifizierte Volumen aus dem Paper Supplier Hub. Wechseln Sie von 90g 1,25fachem Volumen auf 90g 1,35faches Werkdruckpapier, weist SPINE-04 die exakte Millimeter-Differenz aus und prüft, ob das Umschlag-PDF angepasst werden muss.',
        },
        {
          q: 'Unterstützen Sie hochwertige Verlagsausstattungen (Fadenheftung, PUR, Hardcover mit Schutzumschlag)?',
          a: 'Ja. Die Book Pricing Engine kalkuliert PUR-Klebebindung, Fadenheftung in 16er/32er-Falzbogen, Festeinband (Hardcover) mit geradem oder rundem Rücken, Kapitalband, Lesebändchen, Prägung sowie Matt-, Glanz- und Soft-Touch-Kaschierung.',
        },
      ],

      finalCtaHeading: 'Übernehmen Sie die industrielle Kontrolle über Ihre Auflagen und Auslieferungen',
      finalCtaSub:
        'Simulieren Sie jetzt einen Titel Ihres Programms mit SPINE-04 Rückenberechnung, Digital/Offset-Schnittpunkt und 3D-Palettierung.',
      finalCtaBtn: 'Verlagsauflage live kalkulieren ➔',
      finalCtaSec: 'Verlags-ERP API entdecken ➔',
    },
  };

  const t = content[locale] || content.es;
  const activeWh = t.warehouses[activeWarehouse];

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* 1. HERO BANNER WITH LIVE PUBLISHER RUN & LANDED COST MATRIX */}
      <HeroPlatform
        variant="particles"
        label={t.heroLabel}
        title={t.heroTitle}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{
          label: t.ctaPrimary,
          href: 'https://budget.printprice.pro/',
          sublabel: t.badgeNote,
        }}
        secondaryAction={{
          label: t.ctaSecondary,
          href: '#warehouse-compliance',
        }}
        rightContent={
          <div
            className="rounded-card"
            style={{
              background: 'rgba(19, 19, 20, 0.92)',
              border: '1px solid rgba(220, 0, 0, 0.35)',
              padding: '1.5rem 1.65rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
              maxWidth: '500px',
              marginLeft: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.65rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.65rem',
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
                  background: 'rgba(34, 197, 94, 0.14)',
                  color: '#22c55e',
                  padding: '0.15rem 0.55rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                }}
              >
                {t.cardBadge}
              </span>
            </div>

            <div
              className="technical-text"
              style={{ fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.9rem' }}
            >
              {t.cardSpecLabel}
            </div>

            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#8d8d91', textAlign: 'left' }}>
                    {t.matrixHeaders.map((h, idx) => (
                      <th key={idx} style={{ padding: '0.4rem 0.35rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.matrixRows.map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: row.highlight ? 'rgba(220, 0, 0, 0.12)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '0.45rem 0.35rem', fontWeight: 700, color: '#f4f4f5', whiteSpace: 'nowrap' }}>
                        {row.qty}
                      </td>
                      <td style={{ padding: '0.45rem 0.35rem', color: row.highlight ? '#ffb4a8' : '#a1a1aa', whiteSpace: 'nowrap' }}>
                        {row.tech}
                      </td>
                      <td className="technical-text" style={{ padding: '0.45rem 0.35rem', color: '#e5e2e3', whiteSpace: 'nowrap' }}>
                        {row.mfg}
                      </td>
                      <td
                        className="technical-text"
                        style={{
                          padding: '0.45rem 0.35rem',
                          fontWeight: 800,
                          color: row.highlight ? '#dc0000' : '#22c55e',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.landed}
                      </td>
                      <td className="technical-text" style={{ padding: '0.45rem 0.35rem', color: '#a1a1aa', whiteSpace: 'nowrap' }}>
                        {row.pallets}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Delta Q Alert Box */}
            <div
              style={{
                background: 'rgba(220, 0, 0, 0.08)',
                border: '1px solid rgba(220, 0, 0, 0.28)',
                borderRadius: '10px',
                padding: '0.75rem 0.9rem',
                fontSize: '0.74rem',
                marginBottom: '1rem',
              }}
            >
              <div
                className="technical-text"
                style={{ fontWeight: 800, color: '#ffb4a8', fontSize: '0.68rem', marginBottom: '0.35rem', letterSpacing: '0.05em' }}
              >
                {t.deltaAlertTitle}
              </div>
              <div style={{ color: '#e5e2e3', marginBottom: '0.2rem', lineHeight: 1.4 }}>• {t.deltaMinusText}</div>
              <div style={{ color: '#22c55e', fontWeight: 600, lineHeight: 1.4 }}>• {t.deltaPlusText}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.82rem', textAlign: 'center', borderRadius: '10px' }}
              >
                {t.cardFooterCta}
              </a>
            </div>
          </div>
        }
      />

      {/* 2. 4-STEP EDITORIAL WORKFLOW */}
      <Section variant="secondary" id="how-it-works">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span className="pill-badge" style={{ marginBottom: '0.85rem' }}>
            {t.workflowPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)', marginBottom: '0.85rem' }}>
            {t.workflowTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t.workflowSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
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
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. INTERACTIVE EDITORIAL WAREHOUSE COMPLIANCE (ZEITFRACHT / ARVATO / AMAZON FBA) */}
      <Section variant="primary" id="warehouse-compliance">
        <div style={{ maxWidth: '840px', margin: '0 auto 3rem', textAlign: 'center' }}>
          <span className="pill-badge" style={{ marginBottom: '0.85rem' }}>
            {t.dockPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.65rem)', marginBottom: '0.85rem' }}>
            {t.dockTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            {t.dockSub}
          </p>
        </div>

        {/* Warehouse Selector Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
          role="tablist"
          aria-label="Editorial Warehouse Profiles"
        >
          {(
            [
              { id: 'zeitfracht', label: 'Zeitfracht Erfurt (1200 mm / 30 mm)' },
              { id: 'arvato', label: 'VVA Arvato Gütersloh (1300 mm)' },
              { id: 'fba', label: 'Amazon EU FBA (≤ 15.0 kg)' },
            ] as { id: WarehouseKey; label: string }[]
          ).map((tab) => {
            const isActive = activeWarehouse === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveWarehouse(tab.id)}
                style={{
                  padding: '0.75rem 1.35rem',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: isActive ? '#ffffff' : 'var(--text-primary)',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Warehouse Profile Card */}
        <div
          className="rounded-card"
          style={{
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            maxWidth: '1040px',
            margin: '0 auto',
            border: '1px solid var(--accent-border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '1.25rem',
              marginBottom: '1.75rem',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <div>
              <span
                className="technical-text"
                style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.08em' }}
              >
                {activeWh.badge}
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{activeWh.name}</h3>
            </div>
            <span className="badge-available">
              ✓ {locale === 'es' ? 'PERFIL VERIFICADO EN SERVIDOR' : locale === 'de' ? 'SERVERSEITIG VALIDIERT' : 'SERVER-ENFORCED PROFILE'}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '1.25rem',
            }}
          >
            <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {t.dockLabels.maxHeight}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeWh.maxHeight}</div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {t.dockLabels.maxWeight}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeWh.maxWeight}</div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {t.dockLabels.setback}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeWh.setback}</div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {t.dockLabels.topLayer}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeWh.topLayer}</div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {t.dockLabels.booking}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeWh.booking}</div>
            </div>

            <div
              style={{
                padding: '1.25rem',
                background: 'rgba(34, 197, 94, 0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.3)',
              }}
            >
              <div className="technical-text" style={{ fontSize: '0.7rem', color: '#22c55e', marginBottom: '0.35rem', fontWeight: 800 }}>
                {t.dockLabels.penaltyPrevented}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {activeWh.penaltyPrevented}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. 6 PUBLISHER CAPABILITIES GRID */}
      <Section variant="secondary">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span className="pill-badge" style={{ marginBottom: '0.85rem' }}>
            {t.capsPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.85rem' }}>
            {t.capsTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
        slogan="PRICE IT. FIX IT. SHIP TO DOCK."
        title={t.finalCtaHeading}
        description={t.finalCtaSub}
        buttonLabel={t.finalCtaBtn}
        buttonHref="https://budget.printprice.pro/"
        secondaryButtonLabel={t.finalCtaSec}
        secondaryButtonHref="/developers"
        trackingAction="publishers_final_cta"
      />
    </main>
  );
}

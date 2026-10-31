'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { useLocale } from '@/lib/i18n';
import {
  Calculator,
  BookOpen,
  Ruler,
  Sparkles,
  FileSearch,
  Layers,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowUpRight,
  Cpu,
  Factory,
  Sliders,
  Lock
} from 'lucide-react';

type SpineScenarioKey = 'smooth' | 'highBulk' | 'hardcover';

export default function BudgetPage() {
  const { locale } = useLocale();
  const [activeSpineScenario, setActiveSpineScenario] = useState<SpineScenarioKey>('smooth');

  const spineScenarios: Record<
    SpineScenarioKey,
    {
      label: { es: string; en: string; de: string };
      substrate: string;
      gsm: string;
      caliper: string;
      binding: { es: string; en: string; de: string };
      format: string;
      pages: number;
      blockMm: string;
      spineMm: string;
      netCoverMm: string;
      bleedCoverMm: string;
      provenance: string;
      statusBadge: string;
      note: { es: string; en: string; de: string };
    }
  > = {
    smooth: {
      label: {
        es: 'A. Offset Alisado (98 µm) · Rústica Cosida',
        en: 'A. Smooth Offset (98 µm) · Sewn Softcover',
        de: 'A. Glattes Offsetpapier (98 µm) · Fadenheftung Softcover'
      },
      substrate: 'Amber Graphic (Woodfree Offset)',
      gsm: '100 gsm',
      caliper: '98 µm (Bulk 0.98)',
      binding: {
        es: 'Rústica cosida con hilo (SEWN)',
        en: 'Thread-sewn softcover (SEWN)',
        de: 'Fadengeheftete Broschur (SEWN)'
      },
      format: '170 × 240 mm',
      pages: 200,
      blockMm: '9.80 mm',
      spineMm: '11.5 mm',
      netCoverMm: '351.5 × 240.0 mm',
      bleedCoverMm: '357.5 × 246.0 mm',
      provenance: 'MILL DATASHEET · VERIFIED',
      statusBadge: 'REFERENCE MODEL VALIDATED',
      note: {
        es: 'Mismo gramaje (100 gsm) con calibre compacto de 98 µm: genera un bloque neto de 9,80 mm y un lomo cosido de 11,5 mm.',
        en: 'Same 100 gsm weight with compact 98 µm caliper: produces a 9.80 mm net paper block and an 11.5 mm sewn spine.',
        de: 'Gleiche Grammatur (100 g/m²) mit kompaktem 98 µm Kaliber: ergibt 9,80 mm Buchblock und 11,5 mm Rückenbreite.'
      }
    },
    highBulk: {
      label: {
        es: 'B. Papel Alta Mano (175 µm) · Rústica Cosida',
        en: 'B. High-Bulk Cream (175 µm) · Sewn Softcover',
        de: 'B. Werkdruckpapier 2.0 (175 µm) · Fadenheftung Softcover'
      },
      substrate: 'Holmen Book Cream 2.0',
      gsm: '100 gsm',
      caliper: '175 µm (Bulk 1.75)',
      binding: {
        es: 'Rústica cosida con hilo + Solapas 90 mm',
        en: 'Thread-sewn softcover + 90 mm Flaps',
        de: 'Fadengeheftete Broschur + 90 mm Klappen'
      },
      format: '170 × 240 mm',
      pages: 200,
      blockMm: '17.50 mm',
      spineMm: '20.0 mm',
      netCoverMm: '540.0 × 240.0 mm',
      bleedCoverMm: '546.0 × 246.0 mm',
      provenance: 'SUPPLIER IMPORT · VERIFIED',
      statusBadge: 'REFERENCE MODEL VALIDATED',
      note: {
        es: 'Con idéntico gramaje (100 gsm) pero mano 1,75 (175 µm), el lomo crece de 11,5 mm a 20,0 mm (+8,5 mm) e incorpora solapas de 90 mm.',
        en: 'With identical 100 gsm weight but 1.75 bulk (175 µm), the spine expands from 11.5 mm to 20.0 mm (+8.5 mm) plus 90 mm flaps.',
        de: 'Bei identischen 100 g/m², aber 1,75-fachem Volumen (175 µm), wächst der Rücken von 11,5 mm auf 20,0 mm (+8,5 mm) inkl. 90 mm Klappen.'
      }
    },
    hardcover: {
      label: {
        es: 'C. Tapa Dura Cartoné (Cartón 2,4 mm)',
        en: 'C. Casebound Hardcover (2.4 mm Greyboard)',
        de: 'C. Hardcover Festeinband (2,4 mm Graupappe)'
      },
      substrate: 'Munken Print Cream 1.5 + Guardas 140 gsm',
      gsm: '100 gsm',
      caliper: '150 µm (Bulk 1.50)',
      binding: {
        es: 'Cartoné cosido · Cartón 2,4 mm · Ceja 2,5 mm',
        en: 'Casebound sewn · 2.4 mm Board · 2.5 mm Overhang',
        de: 'Festeinband geheftet · 2,4 mm Pappe · 2,5 mm Kantenüberstand'
      },
      format: '170 × 240 mm',
      pages: 200,
      blockMm: '15.60 mm',
      spineMm: '19.5 mm',
      netCoverMm: '370.5 × 245.0 mm (Rastri 10.5 mm)',
      bleedCoverMm: '406.5 × 281.0 mm (Turn-in 18.0 mm)',
      provenance: 'HARDCOVER PROFILE V2 · GOVERNED',
      statusBadge: 'REQUIRES TECH APPROVAL',
      note: {
        es: 'Calcula cartón de tapa (165 × 245 mm), canal de bisagra (Rastri 10,5 mm) y vuelta de forro (Turn-in 18,0 mm) gobernado por perfil de planta.',
        en: 'Resolves board dimensions (165 × 245 mm), hinge groove (Rastri 10.5 mm), and 18.0 mm turn-in governed by plant profile rules.',
        de: 'Berechnet Buchdeckel (165 × 245 mm), Falz (Rastri 10,5 mm) und Einschlag (Turn-in 18,0 mm) nach zertifiziertem Betriebsprofil.'
      }
    }
  };

  const texts = {
    es: {
      heroLabel: 'MOTOR DE PRESUPUESTO & ORQUESTACIÓN / PRICE IT (v5.3)',
      heroTitle: 'CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      heroSub:
        'Obtén presupuestos técnicos de libros y publicaciones al instante en budget.printprice.pro. Costes de fabricación calculados en servidor con imposición real en pliego, selector federado de papel con micras verificadas (µm), cálculo geométrico de lomo y cubierta, diagnóstico PDF en cliente y asistente conversacional IA.',
      heroCtaPrimary: 'Abrir Calculador en Vivo ➔',
      heroCtaSecondary: 'Explorar capacidades técnicas ↓',
      heroSublabel: 'CÁLCULO EN SERVIDOR BPE · GEOMETRÍA DE LOMO SPINE-04 · OFERTAS FIRMADAS HMAC-SHA256',

      // Hero Right Card
      liveCardBadge: 'BUDGET WORKSTATION · v5.3',
      liveCardStatus: 'BPE + SPINE-04 ACTIVE',
      liveCardTitle: 'Simulación de Cotización y Geometría en Tiempo Real',
      liveCardSpecs: [
        { k: 'Formato & Páginas', v: '170 × 240 mm · 240 págs. (4/4)' },
        { k: 'Papel Interior (Catálogo)', v: 'Holmen Book Cream 90 gsm (158 µm)' },
        { k: 'Encuadernación & Acabado', v: 'Rústica Cosida + Plastificado Soft-Touch' },
        { k: 'Geometría de Lomo (SPINE-04)', v: 'Bloque 18,96 mm → Lomo 21,5 mm' },
        { k: 'Ancho Total de Cubierta', v: '361,5 × 240,0 mm (+3 mm sangre)' }
      ],
      liveCardOfferLabel: 'MEJOR TARIFA MULTI-TALLER (500 EJEMPLARES)',
      liveCardOfferPrice: '1.845,00 EUR',
      liveCardOfferSub: '3,69 € / ud. · Impuestos y porte desglosados · Firma HMAC verificada',
      liveCardCta: 'Cotizar mi libro en Budget ➔',

      // Section 1: 4-Phase Workflow Stepper
      workflowPill: 'FLUJO GUIADO DE 4 ETAPAS',
      workflowTitle: 'De la configuración técnica a la orden de producción certificada',
      workflowSub:
        'La aplicación budget.printprice.pro guía tanto a autores independientes como a directores de producción editorial a través de un recorrido estructurado con bloqueo de seguridad (stateful cart gating) en cada paso.',
      steps: [
        {
          num: '01',
          code: 'CONFIGURE SPECS',
          title: 'Configura Especificaciones, Papel o PDF',
          desc: 'Define tirada, formato cerrado (A5, A4, 170×240 mm, 200×200 mm, 220×220 mm o medida personalizada validada), páginas, tintas, encuadernación, o describe el libro al Asistente IA / sube tu PDF para autocompletar.',
          icon: Sliders
        },
        {
          num: '02',
          code: 'SELECT BPE OFFER',
          title: 'Compara Ofertas Multi-Impresor (BPE)',
          desc: 'El Book Pricing Engine evalúa simultáneamente los parques de maquinaria de los talleres asociados, detecta el cruce óptimo Digital vs. Offset y devuelve ofertas firmadas criptográficamente con plazos ETA.',
          icon: Calculator
        },
        {
          num: '03',
          code: 'PRODUCTION PDFS',
          title: 'Vincula Artes Finales y Preflight',
          desc: 'Sube los archivos PDF de interior y cubierta (o enlaces seguros verificados contra SSRF) con validación binaria %PDF- y lanza la auditoría automática de geometría, sangrado y color.',
          icon: FileSearch
        },
        {
          num: '04',
          code: 'ORDER INTAKE & TRACKING',
          title: 'Contratación, Despacho y Seguimiento',
          desc: 'El sistema bloquea el checkout hasta que interior y cubierta están validados, genera el paquete de despacho seguro para la imprenta y habilita seguimiento en tiempo real (QUEUED → IN_PRODUCTION → SHIPPED).',
          icon: Truck
        }
      ],

      // Section 2: 6 Deep Technical Capabilities
      capsPill: 'CAPACIDADES REALES EN PRODUCCIÓN',
      capsTitle: 'Todo lo que hace por ti el calculador budget.printprice.pro',
      capsSub:
        'Diseñado con tarjetas redondeadas, tipografía clara y motores deterministas en el servidor: cero estimaciones a ojo y cero fórmulas ocultas en el navegador.',
      capabilities: [
        {
          badge: '01 / BOOK PRICING ENGINE (BPE)',
          title: 'Imposición Determinista y Comparador Multi-Taller',
          desc: 'Calcula costes reales de producción resolviendo en servidor la imposición en pliegos (B1, B2, SRA3), tiempos de preparación (makeready), curvas de merma de arranque, planchas CTP y operaciones de encuadernación.',
          bullets: [
            'Etiquetas automáticas RECOMMENDED BY BPE y BEST TARIFF entre múltiples plantas.',
            'Separación estricta entre coste de fabricación, embalaje y transporte en más de 25 países.',
            'Revisión gobernada de cotizaciones (Quote Revision Review) cuando cambian parámetros técnicos.'
          ],
          icon: Cpu
        },
        {
          badge: '02 / PAPER CATALOG & MICRONS',
          title: 'Selector Dual de Papel: Presets y Catálogo Maestro Federado',
          desc: 'Alterna en un clic entre familias estándar (Woodfree Offset, Woodfree MC, Lux Cream, Munken, ArtBoard) y el selector avanzado conectado en vivo al Paper Supplier Hub.',
          bullets: [
            'Atributos físicos verificados: gramaje (70 a 400 gsm), espesor en micras (µm) y factor de mano (bulk).',
            'Trazabilidad explícita del origen del calibre (Mill Datasheet, Supplier Import, Micrometer Measured).',
            'Soporte independiente para papel interior, cartulina de cubierta y guardas (endpapers).'
          ],
          icon: Layers
        },
        {
          badge: '03 / SPINE-04 GEOMETRY ENGINE',
          title: 'Calculadora Oficial de Lomo y Desarrollo de Cubierta',
          desc: 'Integración nativa con el motor geométrico del Control Plane (/api/v1/spine/calculate) sin duplicar constantes en el navegador. Calcula el grosor exacto según el calibre real del papel y el tipo de cosido.',
          bullets: [
            'Calcula bloque neto (mm), ancho de lomo (mm) y ancho total de cubierta abierta con y sin sangrado.',
            'En tapa dura cartoné: resuelve cartón (board), canal de bisagra (Rastri) y vuelta de forro (Turn-in).',
            'Matriz epistémica de 5 niveles de certificación industrial antes de liberar a fabricación.'
          ],
          icon: Ruler
        },
        {
          badge: '04 / CONVERSATIONAL AI ASSISTANT',
          title: 'Asistente IA con Protección de Conflictos y Auto-Recálculo',
          desc: 'Describe tu proyecto en lenguaje natural ("Quiero imprimir 500 ejemplares en tapa dura cosida, 280 páginas en papel ahuesado A5 con plastificado mate") y el asistente estructura el formulario al instante.',
          bullets: [
            'Reconocimiento semántico bilingüe de términos técnicos de imprenta y encuadernación.',
            'Conflict Protection: prioriza siempre los cambios manuales del usuario frente a inferencias de la IA.',
            'Self-Healing Quotes: recalcula automáticamente las ofertas si un ajuste invalida el presupuesto previo.'
          ],
          icon: Sparkles
        },
        {
          badge: '05 / CLIENT-SIDE PDF DIAGNOSTICS',
          title: 'Diagnóstico Binario de PDF al Arrastrar el Archivo',
          desc: 'Antes incluso de subir el arte final al servidor, el analizador local inspecciona el documento PDF en el navegador para extraer su geometría real y prevenir errores de configuración.',
          bullets: [
            'Detección instantánea del número exacto de páginas, orientación (vertical/apaisado) y dimensiones en mm.',
            'Mapeo inteligente hacia formatos estándar (A5, A4, 170×240 mm) o activación de formato Custom.',
            'Muestreo cromático por coordenadas (HTML5 Canvas) para distinguir interior en color (4/4) o negro (1/1).'
          ],
          icon: FileSearch
        },
        {
          badge: '06 / ADVERSARIAL NODE SECURITY',
          title: 'Seguridad Criptográfica y Gestión de Excepciones en Planta',
          desc: 'Arquitectura endurecida (Adversarial Node v5.3) que protege tanto al comprador como al taller gráfico frente a manipulaciones de precio o archivos defectuosos.',
          bullets: [
            'Ofertas firmadas con HMAC-SHA256: cualquier intento de alterar precios o tiradas bloquea el carrito.',
            'Verificación Magic-Byte (%PDF- / %%EOF) y filtrado de subredes privadas anti-SSRF en enlaces remotos.',
            'Flujo de remediación (ACTION_REQUIRED): permite reemplazar un PDF observado por preimpresión sin rehacer el pedido.'
          ],
          icon: ShieldCheck
        }
      ],

      // Section 3: Interactive Spine & Cover Geometry Showcase
      spinePill: 'DEMOSTRACIÓN INTERACTIVA · MOTOR SPINE-04',
      spineTitle: 'Por qué dos libros de 200 páginas y 100 gsm tienen lomos completamente distintos',
      spineSub:
        'Un calculador convencional estima el lomo solo por el gramaje en g/m², provocando que el diseño de portada no encaje en el taller. En budget.printprice.pro el lomo se resuelve a partir de las micras físicas (µm) del sustrato seleccionado y la geometría de encuadernación:',
      spineMetrics: {
        substrate: 'Sustrato del catálogo',
        caliper: 'Gramaje y Calibre físico',
        binding: 'Método de encuadernación',
        block: 'Grosor neto del bloque',
        spine: 'Ancho de lomo calculado',
        netCover: 'Cubierta abierta (neta)',
        bleedCover: 'Cubierta con sangrado / vuelta',
        provenance: 'Trazabilidad de calibre'
      },

      // Section 4: Supported Technical Specifications Matrix
      specsPill: 'MATRIZ DE ESPECIFICACIONES TÉCNICAS',
      specsTitle: 'Parámetros soportados en el configurador de libros',
      specsSub:
        'Todas las combinaciones se validan en tiempo real contra los rangos mecánicos de pliego y encuadernación antes de emitir la cotización.',
      specGroups: [
        {
          category: 'Formatos y Orientación',
          items: [
            'Vertical (Portrait) y Apaisado (Landscape)',
            'Estándar: A5 (148×210 mm), A4 (210×297 mm), 170×240 mm',
            'Cuadrados: 200×200 mm y 220×220 mm',
            'Medida Personalizada (Custom) validada por rangos mecánicos (100×120 mm hasta 297×340 mm)'
          ]
        },
        {
          category: 'Encuadernaciones Profesionales',
          items: [
            'Rústica fresada PUR / EVA (Perfect Bound)',
            'Rústica cosida con hilo vegetal (Thread Sewn Softcover)',
            'Tapa dura cosida cartoné (Thread Sewn Hardcover)',
            'Rústica con solapas (4, 6 u 8 páginas de cubierta), Grapa (Saddle Stitch), Wire-O y Flexibound'
          ]
        },
        {
          category: 'Sustratos, Gramajes y Guardas',
          items: [
            'Interior: 70, 80, 90, 100, 115, 120, 135, 140, 150, 160, 170, 200, 250, 300, 350, 400 gsm',
            'Cubierta: 120 a 400 gsm (Estucado MC, Cartulina gráfica ArtBoard, Offset, UPM)',
            'Guardas (Endpapers): Sin guardas o Estándar en 115, 120, 140, 150 y 170 gsm (impresión 1/0, 4/0, 1/1, 4/4)'
          ]
        },
        {
          category: 'Tintas, Pantone (PMS) y Acabados',
          items: [
            'Impresión interior: Cuatricromía (4/4), Bicolor (2/2) y Monocromo negro (1/1)',
            'Impresión cubierta: 4/0 (exterior), 4/4 (ambas caras) y 1/0 + soporte de 0 a 3 tintas directas PMS',
            'Plastificados de cubierta: Brillo (Gloss), Mate, Mate Anti-rayado (Scratch-proof), Soft-Touch o Sin laminar'
          ]
        }
      ],

      ctaSlogan: 'CALCULADOR EN VIVO · BUDGET.PRINTPRICE.PRO',
      ctaTitle: 'Calcula ahora el presupuesto y la geometría exacta de tu libro',
      ctaDesc:
        'Configura tu tirada en segundos, consulta el ancho de lomo verificado por micras y compara ofertas reales de imprentas asociadas sin compromiso.',
      ctaBtn: 'Ir a budget.printprice.pro ➔'
    },

    en: {
      heroLabel: 'PRICING & ORDER ORCHESTRATION ENGINE / PRICE IT (v5.3)',
      heroTitle: 'CALCULATE PRINT PRODUCTION ESTIMATES IN SECONDS',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      heroSub:
        'Get instant manufacturing quotes for books and publications on budget.printprice.pro. Server-side production pricing resolved from real sheet imposition, a federated paper catalog with verified physical microns (µm), spine & cover spread geometry, client-side PDF diagnostics, and an AI specification assistant.',
      heroCtaPrimary: 'Open Live Calculator ➔',
      heroCtaSecondary: 'Explore technical capabilities ↓',
      heroSublabel: 'SERVER-SIDE BPE PRICING · SPINE-04 GEOMETRY ENGINE · HMAC-SHA256 SIGNED QUOTES',

      // Hero Right Card
      liveCardBadge: 'BUDGET WORKSTATION · v5.3',
      liveCardStatus: 'BPE + SPINE-04 ACTIVE',
      liveCardTitle: 'Live Quote & Spine Geometry Simulation',
      liveCardSpecs: [
        { k: 'Trim Size & Extent', v: '170 × 240 mm · 240 pages (4/4)' },
        { k: 'Interior Paper (Catalog)', v: 'Holmen Book Cream 90 gsm (158 µm)' },
        { k: 'Binding & Finishing', v: 'Thread-Sewn Softcover + Soft-Touch Lam.' },
        { k: 'Spine Geometry (SPINE-04)', v: 'Block 18.96 mm → Spine 21.5 mm' },
        { k: 'Full Cover Spread', v: '361.5 × 240.0 mm (+3 mm bleed)' }
      ],
      liveCardOfferLabel: 'BEST MULTI-PRINTER OFFER (500 COPIES)',
      liveCardOfferPrice: '1,845.00 EUR',
      liveCardOfferSub: '€3.69 / unit · Segregated freight & taxes · Verified HMAC signature',
      liveCardCta: 'Quote my book on Budget ➔',

      // Section 1: 4-Phase Workflow Stepper
      workflowPill: '4-STAGE GUIDED WORKFLOW',
      workflowTitle: 'From technical book specs to a certified manufacturing order',
      workflowSub:
        'The budget.printprice.pro workstation guides independent authors and publishing production teams through a four-stage pipeline enforced by stateful validation gating.',
      steps: [
        {
          num: '01',
          code: 'CONFIGURE SPECS',
          title: 'Configure Specs, Catalog Paper, or PDF',
          desc: 'Select run quantity, trim format (A5, A4, 170×240 mm, 200×200 mm, 220×220 mm, or validated Custom mm), page count, inks, and binding—or describe your book to the AI Assistant / drop your PDF to auto-populate.',
          icon: Sliders
        },
        {
          num: '02',
          code: 'SELECT BPE OFFER',
          title: 'Compare Multi-Printer BPE Offers',
          desc: 'The Book Pricing Engine simultaneously evaluates partner plant machinery, detects the optimal Digital vs. Offset crossover, and returns cryptographically signed quotes with delivery ETAs.',
          icon: Calculator
        },
        {
          num: '03',
          code: 'PRODUCTION PDFS',
          title: 'Bind Production PDFs & Run Preflight',
          desc: 'Upload interior and cover PDFs (or SSRF-filtered cloud storage links) with %PDF- binary verification and launch automated geometry, bleed, and color preflight checks.',
          icon: FileSearch
        },
        {
          num: '04',
          code: 'ORDER INTAKE & TRACKING',
          title: 'Checkout Gating, Dispatch & Live Tracking',
          desc: 'Checkout remains gated until both interior and cover files are verified, generating a self-expiring dispatch bundle for the plant and live status tracking (QUEUED → IN_PRODUCTION → SHIPPED).',
          icon: Truck
        }
      ],

      // Section 2: 6 Deep Technical Capabilities
      capsPill: 'PRODUCTION-GRADE CAPABILITIES',
      capsTitle: 'Everything the budget.printprice.pro calculator does for your book',
      capsSub:
        'Built with clean rounded cards, accessible typography, and deterministic server-side engines: zero guesswork and zero client-side price manipulation.',
      capabilities: [
        {
          badge: '01 / BOOK PRICING ENGINE (BPE)',
          title: 'Deterministic Sheet Imposition & Multi-Plant Quoting',
          desc: 'Resolves real manufacturing costs on the server by modeling sheet layouts (B1, B2, SRA3), press makeready hours, startup waste curves, CTP plates, and post-press bindery lines.',
          bullets: [
            'Automatic RECOMMENDED BY BPE and BEST TARIFF badges across vetted partner facilities.',
            'Strict cost segregation between manufacturing, packaging, and shipping across 25+ countries.',
            'Governed Quote Revision Review workflow whenever technical specifications are updated.'
          ],
          icon: Cpu
        },
        {
          badge: '02 / PAPER CATALOG & MICRONS',
          title: 'Dual Paper Selector: Standard Presets & Federated Master Catalog',
          desc: 'Switch in one click between standard industry presets (Woodfree Offset, Woodfree MC, Lux Cream, Munken, ArtBoard) and the live Advanced Paper Selector powered by Paper Supplier Hub.',
          bullets: [
            'Verified physical attributes: basis weight (70 to 400 gsm), physical caliper in microns (µm), and bulk factor.',
            'Explicit caliper provenance tracking (Mill Datasheet, Supplier Import, Micrometer Measured).',
            'Independent substrate selection for interior book block, cover board, and endpapers.'
          ],
          icon: Layers
        },
        {
          badge: '03 / SPINE-04 GEOMETRY ENGINE',
          title: 'Authoritative Spine & Cover Spread Geometry Calculator',
          desc: 'Connected directly to Control Plane (/api/v1/spine/calculate) with zero duplicated math on the client. Computes exact block thickness and spine width from physical paper microns and binding rules.',
          bullets: [
            'Outputs net paper block (mm), spine width (mm), and flat cover spread dimensions with and without bleed.',
            'For casebound hardcovers: computes greyboard size, hinge groove (Rastri), and cover turn-in.',
            '5-step epistemic industrial certification matrix before releasing files to press.'
          ],
          icon: Ruler
        },
        {
          badge: '04 / CONVERSATIONAL AI ASSISTANT',
          title: 'AI Specification Assistant with Conflict Protection',
          desc: 'Describe your project in plain language ("I want 500 copies of an A5 sewn hardcover, 280 pages on cream paper with matte lamination") and the assistant populates the technical form.',
          bullets: [
            'Multilingual semantic extraction of printing, paper, and bindery specifications.',
            'Conflict Protection: always prioritizes explicit user form edits over AI inferences.',
            'Self-Healing Quotes: automatically triggers a fresh BPE calculation when specs change.'
          ],
          icon: Sparkles
        },
        {
          badge: '05 / CLIENT-SIDE PDF DIAGNOSTICS',
          title: 'Low-Level PDF Binary Diagnostics on Drag & Drop',
          desc: 'Before uploading gigabytes to the server, the in-browser PDF parser inspects the binary structure to extract exact page metrics and prevent configuration mismatches.',
          bullets: [
            'Instant extraction of exact page count, portrait/landscape orientation, and trim dimensions in mm.',
            'Intelligent mapping to standard book formats (A5, A4, 170×240 mm) or validated Custom ranges.',
            'HTML5 Canvas coordinate color sampling to detect full-color (4/4) vs. monochrome (1/1) interiors.'
          ],
          icon: FileSearch
        },
        {
          badge: '06 / ADVERSARIAL NODE SECURITY',
          title: 'Cryptographic Quote Signatures & Exception Remediation',
          desc: 'Hardened Adversarial Node v5.3 architecture protecting both buyers and print plants against tampered quotes or defective production files.',
          bullets: [
            'HMAC-SHA256 signed offers: any frontend tampering with price, quantity, or specs blocks cart checkout.',
            'Magic-Byte PDF verification (%PDF- / %%EOF) and anti-SSRF private subnet filtering on remote links.',
            'Exception & Reupload pipeline (ACTION_REQUIRED): replace flagged PDFs directly without recreating the order.'
          ],
          icon: ShieldCheck
        }
      ],

      // Section 3: Interactive Spine & Cover Geometry Showcase
      spinePill: 'INTERACTIVE SHOWCASE · SPINE-04 ENGINE',
      spineTitle: 'Why two 200-page books on 100 gsm paper have completely different spines',
      spineSub:
        'Conventional calculators guess spine width from paper GSM alone, causing cover artwork to fail at the bindery. On budget.printprice.pro, spine geometry is resolved from the verified physical microns (µm) of the chosen catalog substrate and binding profile:',
      spineMetrics: {
        substrate: 'Catalog Substrate',
        caliper: 'Basis Weight & Physical Caliper',
        binding: 'Binding Method',
        block: 'Net Paper Block Thickness',
        spine: 'Calculated Spine Width',
        netCover: 'Net Cover Spread',
        bleedCover: 'Cover Spread with Bleed / Turn-in',
        provenance: 'Caliper Provenance'
      },

      // Section 4: Supported Technical Specifications Matrix
      specsPill: 'TECHNICAL SPECIFICATION MATRIX',
      specsTitle: 'Supported parameters in the Book Price configurator',
      specsSub:
        'Every combination is validated in real time against mechanical press sheet and bindery constraints before issuing a quote.',
      specGroups: [
        {
          category: 'Trim Formats & Orientation',
          items: [
            'Portrait and Landscape orientations',
            'Standard formats: A5 (148×210 mm), A4 (210×297 mm), 170×240 mm',
            'Square formats: 200×200 mm and 220×220 mm',
            'Validated Custom dimensions across mechanical press ranges (100×120 mm up to 297×340 mm)'
          ]
        },
        {
          category: 'Industrial Binding Methods',
          items: [
            'Perfect Bound softcover (PUR / EVA adhesive)',
            'Thread-Sewn softcover (section-sewn book block)',
            'Thread-Sewn Hardcover (casebound over greyboard)',
            'Softcover with Flaps (4, 6, or 8 cover pages), Saddle Stitch, Wire-O, and Flexibound Integral'
          ]
        },
        {
          category: 'Substrates, GSM Ranges & Endpapers',
          items: [
            'Interior: 70, 80, 90, 100, 115, 120, 135, 140, 150, 160, 170, 200, 250, 300, 350, 400 gsm',
            'Cover: 120 to 400 gsm (Woodfree MC, ArtBoard single-sided, Offset, WFMC UPM > 250 gsm)',
            'Endpapers: None or Standard in 115, 120, 140, 150, and 170 gsm (unprinted or 1/0, 4/0, 1/1, 4/4)'
          ]
        },
        {
          category: 'Inks, Spot PMS & Cover Lamination',
          items: [
            'Interior printing: Full color CMYK (4/4), Two-color (2/2), and Monochrome black (1/1)',
            'Cover printing: 4/0 (outside), 4/4 (both sides), 1/0 + support for 0 to 3 Pantone (PMS) spot inks',
            'Cover finishing: Gloss, Matt, Scratch-Proof Matt, Soft-Touch lamination, or Unlaminated'
          ]
        }
      ],

      ctaSlogan: 'LIVE WORKSTATION · BUDGET.PRINTPRICE.PRO',
      ctaTitle: 'Calculate your book estimate and exact spine geometry now',
      ctaDesc:
        'Configure your print run in seconds, inspect micron-verified cover dimensions, and compare signed offers from partner print plants.',
      ctaBtn: 'Launch budget.printprice.pro ➔'
    },

    de: {
      heroLabel: 'KALKULATIONS- & AUFTRAGS-ENGINE / PRICE IT (v5.3)',
      heroTitle: 'DRUCKANGEBOTE IN SEKUNDEN BERECHNEN',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      heroSub:
        'Erhalten Sie sofortige Fertigungsangebote für Bücher und Publikationen auf budget.printprice.pro. Serverseitige Preiskalkulation mit realer Bogenmontage, föderiertem Papierkatalog mit verifizierten Mikrometern (µm), Buchrücken- & Umschlaggeometrie, clientseitiger PDF-Diagnose und KI-Assistent.',
      heroCtaPrimary: 'Live-Kalkulator öffnen ➔',
      heroCtaSecondary: 'Technische Funktionen ansehen ↓',
      heroSublabel: 'SERVERSEITIGE BPE-KALKULATION · SPINE-04 GEOMETRIE · HMAC-SHA256 SIGNIERTE ANGEBOTE',

      // Hero Right Card
      liveCardBadge: 'BUDGET WORKSTATION · v5.3',
      liveCardStatus: 'BPE + SPINE-04 AKTIV',
      liveCardTitle: 'Live-Angebots- & Buchrückensimulation',
      liveCardSpecs: [
        { k: 'Format & Umfang', v: '170 × 240 mm · 240 Seiten (4/4)' },
        { k: 'Innenpapier (Katalog)', v: 'Holmen Book Cream 90 gsm (158 µm)' },
        { k: 'Bindung & Veredelung', v: 'Fadenheftung Softcover + Soft-Touch' },
        { k: 'Rückengeometrie (SPINE-04)', v: 'Buchblock 18,96 mm → Rücken 21,5 mm' },
        { k: 'Offenes Umschlagformat', v: '361,5 × 240,0 mm (+3 mm Beschnitt)' }
      ],
      liveCardOfferLabel: 'BESTES DRUCKEREI-ANGEBOT (500 EXEMPLARE)',
      liveCardOfferPrice: '1.845,00 EUR',
      liveCardOfferSub: '3,69 € / Stk. · Fracht & Steuern ausgewiesen · HMAC-Signatur geprüft',
      liveCardCta: 'Buch in Budget kalkulieren ➔',

      // Section 1: 4-Phase Workflow Stepper
      workflowPill: 'GEFÜHRTER 4-STUFEN-WORKFLOW',
      workflowTitle: 'Von der technischen Buchspezifikation zum zertifizierten Fertigungsauftrag',
      workflowSub:
        'Die Plattform budget.printprice.pro führt Autoren und Verlagshersteller durch einen vierstufigen Prozess mit verbindlicher Dateiprüfung (Stateful Cart Gating) vor der Produktionsfreigabe.',
      steps: [
        {
          num: '01',
          code: 'CONFIGURE SPECS',
          title: 'Spezifikationen, Katalogpapier oder PDF wählen',
          desc: 'Auflage, Endformat (A5, A4, 170×240 mm, 200×200 mm, 220×220 mm oder geprüftes Wunschformat), Seitenzahl, Farbigkeit und Bindung festlegen – oder per KI-Assistent / PDF-Upload automatisch ausfüllen.',
          icon: Sliders
        },
        {
          num: '02',
          code: 'SELECT BPE OFFER',
          title: 'Multi-Druckerei-Angebote (BPE) vergleichen',
          desc: 'Die Book Pricing Engine prüft parallel die Maschinenparks der Partnerbetriebe, ermittelt den optimalen Digital-/Offset-Schnittpunkt und liefert kryptografisch signierte Angebote inkl. Lieferzeit.',
          icon: Calculator
        },
        {
          num: '03',
          code: 'PRODUCTION PDFS',
          title: 'Produktions-PDFs & Preflight verknüpfen',
          desc: 'Laden Sie Innenteil- und Umschlag-PDFs hoch (inkl. %PDF- Binärprüfung und SSRF-Schutz) und starten Sie die automatische Prüfung von Geometrie, Beschnitt und Farbraum.',
          icon: FileSearch
        },
        {
          num: '04',
          code: 'ORDER INTAKE & TRACKING',
          title: 'Auftragsfreigabe, Dispatch & Live-Tracking',
          desc: 'Der Checkout wird erst nach erfolgreicher Validierung von Inhalt und Umschlag freigegeben, erzeugt das sichere Produktionspaket für die Druckerei und aktiviert das Echtzeit-Tracking (QUEUED → IN_PRODUCTION → SHIPPED).',
          icon: Truck
        }
      ],

      // Section 2: 6 Deep Technical Capabilities
      capsPill: 'REALE PRODUKTIONSFUNKTIONEN',
      capsTitle: 'Alles, was der Kalkulator budget.printprice.pro für Ihr Buchprojekt leistet',
      capsSub:
        'Entwickelt mit abgerundeten Cards, klarer Typografie und deterministischen Server-Engines: keine Schätzwerte und keine clientseitige Preismanipulation.',
      capabilities: [
        {
          badge: '01 / BOOK PRICING ENGINE (BPE)',
          title: 'Deterministische Bogenmontage & Betriebsvergleich',
          desc: 'Berechnet reale Herstellkosten auf dem Server anhand von Bogenformaten (B1, B2, SRA3), Rüstzeiten, Anlaufmakulatur, CTP-Platten und Buchbindereiprozessen.',
          bullets: [
            'Automatische Kennzeichnung von RECOMMENDED BY BPE und BEST TARIFF über Partnerbetriebe hinweg.',
            'Strikte Trennung zwischen Druckfertigung, Verpackung und Versand in über 25 Länder.',
            'Gesteuerter Quote-Revision-Prozess bei nachträglichen Spezifikationsänderungen.'
          ],
          icon: Cpu
        },
        {
          badge: '02 / PAPER CATALOG & MICRONS',
          title: 'Dualer Papierselektor: Standard-Presets & Föderierter Hauptkatalog',
          desc: 'Wechseln Sie per Klick zwischen Standardpapieren (Offset, Bilderdruck MC, Lux Cream, Munken, Chromokarton) und dem erweiterten Katalog des Paper Supplier Hub.',
          bullets: [
            'Verifizierte physikalische Werte: Grammatur (70 bis 400 g/m²), Papierdicke in Mikrometern (µm) und Volumen.',
            'Explizite Herkunftsnachweise des Kalibers (Mill Datasheet, Supplier Import, Micrometer Measured).',
            'Separate Materialauswahl für Buchblock, Umschlagkarton und Vorsatzpapier (Endpapers).'
          ],
          icon: Layers
        },
        {
          badge: '03 / SPINE-04 GEOMETRIE-ENGINE',
          title: 'Präzisionsrechner für Buchrücken & Umschlagabwicklung',
          desc: 'Direkte Anbindung an die Control Plane (/api/v1/spine/calculate) ohne duplizierte Client-Formeln. Berechnet Buchblock- und Rückenbreite exakt aus den Mikrometern (µm) des gewählten Papiers.',
          bullets: [
            'Liefert Netto-Buchblock (mm), Rückenbreite (mm) sowie offene Umschlagbreite mit und ohne Beschnitt.',
            'Für Hardcover Festeinband: berechnet Buchdeckel (Pappe), Falz (Rastri) und Einschlag (Turn-in).',
            '5-stufige epistemische Zertifizierungsmatrix vor der technischen Produktionsfreigabe.'
          ],
          icon: Ruler
        },
        {
          badge: '04 / CONVERSATIONAL AI ASSISTANT',
          title: 'KI-Spezifikationsassistent mit Konfliktschutz',
          desc: 'Beschreiben Sie Ihr Projekt in natürlicher Sprache („500 Exemplare Hardcover fadengeheftet, 280 Seiten A5 auf Werkdruckpapier mit Mattfolienkaschierung“) und das Formular wird sofort strukturiert.',
          bullets: [
            'Semantische Erkennung drucktechnischer Fachbegriffe für Papier, Format und Weiterverarbeitung.',
            'Conflict Protection: Manuelle Formularänderungen des Nutzers haben stets Vorrang vor KI-Vorschlägen.',
            'Self-Healing Quotes: Automatische Neukalkulation, sobald geänderte Parameter ein Angebot ungültig machen.'
          ],
          icon: Sparkles
        },
        {
          badge: '05 / CLIENT-SIDE PDF DIAGNOSTICS',
          title: 'Lokale PDF-Binärdiagnose per Drag & Drop',
          desc: 'Noch vor dem Server-Upload analysiert der Browser-Parser die PDF-Binärstruktur lokal, um reale Seitenmaße auszulesen und Fehleinstellungen zu verhindern.',
          bullets: [
            'Sofortige Erkennung von exakter Seitenzahl, Ausrichtung (Hoch-/Querformat) und Endformat in mm.',
            'Intelligente Zuordnung zu Standardformaten (A5, A4, 170×240 mm) oder geprüften Wunschformaten.',
            'HTML5-Canvas-Farbprüfung zur Unterscheidung zwischen 4/4-Farbdruck und 1/1-Schwarzweißdruck.'
          ],
          icon: FileSearch
        },
        {
          badge: '06 / ADVERSARIAL NODE SECURITY',
          title: 'Kryptografische Angebotssignatur & Reklamations-Pipeline',
          desc: 'Gehärtete Adversarial-Node-Architektur (v5.3) zum Schutz von Auftraggebern und Druckereien vor Preismanipulation und fehlerhaften Druckdaten.',
          bullets: [
            'HMAC-SHA256-signierte Angebote: Jede Manipulation von Preis oder Auflage blockiert den Checkout.',
            'Magic-Byte-Prüfung (%PDF- / %%EOF) und Anti-SSRF-Subnetzfilterung bei externen Dateilinks.',
            'Direkter Dateiaustausch (ACTION_REQUIRED) bei Vorstufen-Rückfragen ohne Neuanlage des Auftrags.'
          ],
          icon: ShieldCheck
        }
      ],

      // Section 3: Interactive Spine & Cover Geometry Showcase
      spinePill: 'INTERAKTIVE VORSCHAU · SPINE-04 ENGINE',
      spineTitle: 'Warum zwei Bücher mit 200 Seiten und 100 g/m² völlig unterschiedliche Rückenbreiten haben',
      spineSub:
        'Herkömmliche Rechner schätzen den Buchrücken nur anhand der Grammatur (g/m²), wodurch Umschlagdaten in der Buchbinderei nicht passen. Auf budget.printprice.pro wird die Geometrie aus den verifizierten Mikrometern (µm) des Katalogpapiers und dem Bindeprofil berechnet:',
      spineMetrics: {
        substrate: 'Katalog-Bedruckstoff',
        caliper: 'Grammatur & Physisches Kaliber',
        binding: 'Bindeverfahren',
        block: 'Netto-Buchblockstärke',
        spine: 'Berechnete Rückenbreite',
        netCover: 'Offenes Umschlagformat (netto)',
        bleedCover: 'Umschlag mit Beschnitt / Einschlag',
        provenance: 'Kaliber-Herkunftsnachweis'
      },

      // Section 4: Supported Technical Specifications Matrix
      specsPill: 'TECHNISCHE SPEZIFIKATIONSMATRIX',
      specsTitle: 'Unterstützte Parameter im Buchpreis-Konfigurator',
      specsSub:
        'Jede Kombination wird in Echtzeit gegen die mechanischen Bogen- und Buchbindereigrenzen geprüft, bevor ein verbindliches Angebot erstellt wird.',
      specGroups: [
        {
          category: 'Endformate & Ausrichtung',
          items: [
            'Hochformat (Portrait) und Querformat (Landscape)',
            'Standardformate: A5 (148×210 mm), A4 (210×297 mm), 170×240 mm',
            'Quadratische Formate: 200×200 mm und 220×220 mm',
            'Geprüftes Wunschformat (Custom) innerhalb realer Maschinengrenzen (100×120 mm bis 297×340 mm)'
          ]
        },
        {
          category: 'Industrielle Bindeverfahren',
          items: [
            'Klebebindung Softcover (Perfect Bound PUR / EVA)',
            'Fadenheftung Softcover (fadengeheftete Broschur)',
            'Fadenheftung Hardcover (Festeinband über Graupappe)',
            'Broschur mit Klappen (4, 6 oder 8 Umschlagseiten), Rückendrahtheftung, Wire-O und Flexibound Integral'
          ]
        },
        {
          category: 'Bedruckstoffe, Grammaturen & Vorsatz',
          items: [
            'Innenteil: 70, 80, 90, 100, 115, 120, 135, 140, 150, 160, 170, 200, 250, 300, 350, 400 g/m²',
            'Umschlag: 120 bis 400 g/m² (Bilderdruck MC, Chromokarton ArtBoard, Offset, WFMC UPM > 250 g/m²)',
            'Vorsatzpapier (Endpapers): Ohne oder Standard in 115, 120, 140, 150 und 170 g/m² (unbedruckt, 1/0, 4/0, 1/1, 4/4)'
          ]
        },
        {
          category: 'Farbigkeit, Pantone (PMS) & Veredelung',
          items: [
            'Innendruck: Euroskala CMYK (4/4), Zweifarbig (2/2) und Schwarzweiß (1/1)',
            'Umschlagdruck: 4/0 (außen), 4/4 (beidseitig), 1/0 + Unterstützung für 0 bis 3 Pantone-Sonderfarben (PMS)',
            'Umschlagveredelung: Glanz-, Matt-, Kratzfeste Matt-, Soft-Touch-Folienkaschierung oder unkaschiert'
          ]
        }
      ],

      ctaSlogan: 'LIVE-WORKSTATION · BUDGET.PRINTPRICE.PRO',
      ctaTitle: 'Kalkulieren Sie jetzt Ihr Buchangebot und die exakte Rückengeometrie',
      ctaDesc:
        'Konfigurieren Sie Ihre Auflage in Sekunden, prüfen Sie Mikrometer-basierte Umschlagmaße und vergleichen Sie signierte Angebote unserer Partnerdruckereien.',
      ctaBtn: 'Zu budget.printprice.pro ➔'
    }
  };

  const t = texts[locale] || texts.es;
  const activeSpine = spineScenarios[activeSpineScenario];

  return (
    <div className="product-page">
      {/* 1. PRODUCT HERO */}
      <HeroPlatform
        label={t.heroLabel}
        title={<span style={{ color: '#e5e2e3' }}>{t.heroTitle}</span>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{
          label: t.heroCtaPrimary,
          href: 'https://budget.printprice.pro/',
          sublabel: t.heroSublabel
        }}
        secondaryAction={{
          label: t.heroCtaSecondary,
          href: '#capabilities'
        }}
        variant="particles"
        rightContent={
          <div
            className="rounded-card"
            style={{
              background: 'rgba(19, 19, 20, 0.92)',
              border: '1px solid rgba(220, 0, 0, 0.35)',
              padding: '1.65rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 28px rgba(220, 0, 0, 0.12)',
              maxWidth: '470px',
              marginLeft: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '0.75rem',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}
            >
              <span
                className="technical-text"
                style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc0000', letterSpacing: '0.1em' }}
              >
                {t.liveCardBadge}
              </span>
              <span
                className="technical-text"
                style={{
                  fontSize: '0.625rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(34, 197, 94, 0.14)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontWeight: 700
                }}
              >
                {t.liveCardStatus}
              </span>
            </div>

            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '0.85rem' }}>
              {t.liveCardTitle}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
              {t.liveCardSpecs.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ color: '#9ca3af' }}>{item.k}:</span>
                  <span
                    className="technical-text"
                    style={{
                      color: idx >= 3 ? '#ffb4a8' : '#e5e2e3',
                      fontWeight: 700,
                      textAlign: 'right'
                    }}
                  >
                    {item.v}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '1.1rem',
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <div
                  className="technical-text"
                  style={{ fontSize: '0.62rem', color: '#dc0000', fontWeight: 800, letterSpacing: '0.08em' }}
                >
                  {t.liveCardOfferLabel}
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {t.liveCardOfferPrice}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{t.liveCardOfferSub}</div>
              </div>
              <a
                href="https://budget.printprice.pro/"
                className="btn btn-primary btn-sm"
                style={{ whiteSpace: 'nowrap', borderRadius: '10px' }}
              >
                {t.liveCardCta}
              </a>
            </div>
          </div>
        }
      />

      {/* 2. 4-STAGE GUIDED WORKFLOW STEPPER */}
      <Section variant="secondary" id="workflow">
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.25rem' }}>
          <span className="pill-badge" style={{ marginBottom: '1rem' }}>
            {t.workflowPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            {t.workflowTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65 }}>
            {t.workflowSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '1.5rem'
          }}
        >
          {t.steps.map((st) => {
            const StepIcon = st.icon;
            return (
              <div
                key={st.num}
                className="rounded-card"
                style={{
                  padding: '1.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  height: '100%'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--accent-container)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <StepIcon size={22} strokeWidth={1.85} />
                  </div>
                  <span
                    className="technical-text"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {st.num} · {st.code}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.25rem 0 0', letterSpacing: '-0.02em' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 3. SIX CORE TECHNICAL CAPABILITIES (ROUNDED CARDS) */}
      <Section variant="primary" id="capabilities">
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem' }}>
          <span className="pill-badge" style={{ marginBottom: '1rem' }}>
            {t.capsPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4.2vw, 2.85rem)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            {t.capsTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65 }}>
            {t.capsSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
            gap: '1.75rem'
          }}
        >
          {t.capabilities.map((cap, idx) => {
            const CapIcon = cap.icon;
            return (
              <div
                key={idx}
                className="rounded-card"
                style={{
                  padding: '2.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  height: '100%'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'var(--accent-container)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <CapIcon size={24} strokeWidth={1.85} />
                  </div>
                  <span
                    className="technical-text"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.08em',
                      textAlign: 'right'
                    }}
                  >
                    {cap.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0.2rem 0 0' }}>
                  {cap.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                  {cap.desc}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: '1rem 0 0',
                    margin: 'auto 0 0',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}
                >
                  {cap.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.55rem',
                        fontSize: '0.84rem',
                        color: 'var(--text-primary)',
                        lineHeight: 1.45
                      }}
                    >
                      <CheckCircle2
                        size={16}
                        style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '0.15rem' }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4. INTERACTIVE SPINE & COVER GEOMETRY SHOWCASE (SPINE-04) */}
      <Section variant="secondary" id="spine-geometry">
        <div style={{ maxWidth: '860px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
          <span className="pill-badge" style={{ marginBottom: '1rem' }}>
            {t.spinePill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.65rem)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            {t.spineTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.65 }}>
            {t.spineSub}
          </p>
        </div>

        {/* Scenario Selector Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}
          role="tablist"
          aria-label="Spine Geometry Scenarios"
        >
          {(['smooth', 'highBulk', 'hardcover'] as SpineScenarioKey[]).map((key) => {
            const isSelected = activeSpineScenario === key;
            const sc = spineScenarios[key];
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveSpineScenario(key)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: isSelected ? '0 6px 20px rgba(220, 0, 0, 0.25)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {sc.label[locale] || sc.label.es}
              </button>
            );
          })}
        </div>

        {/* Active Spine Scenario Card */}
        <div
          className="rounded-card"
          style={{
            padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            maxWidth: '1040px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {/* Left: Verified Telemetry Table */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginBottom: '1.25rem',
                paddingBottom: '0.85rem',
                borderBottom: '1px solid var(--border-color)'
              }}
            >
              <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {activeSpine.format} · {activeSpine.pages} PP
              </span>
              <span className="badge-available">{activeSpine.statusBadge}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.substrate}:</span>
                <span style={{ fontWeight: 700, textAlign: 'right' }}>{activeSpine.substrate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.caliper}:</span>
                <span className="technical-text" style={{ fontWeight: 700, color: 'var(--accent-primary)', textAlign: 'right' }}>
                  {activeSpine.gsm} · {activeSpine.caliper}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.binding}:</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>
                  {activeSpine.binding[locale] || activeSpine.binding.es}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.block}:</span>
                <span className="technical-text" style={{ fontWeight: 700 }}>
                  {activeSpine.blockMm}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.spine}:</span>
                <span
                  className="technical-text"
                  style={{
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    color: 'var(--accent-primary)'
                  }}
                >
                  {activeSpine.spineMm}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.netCover}:</span>
                <span className="technical-text" style={{ fontWeight: 700, textAlign: 'right' }}>
                  {activeSpine.netCoverMm}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.bleedCover}:</span>
                <span className="technical-text" style={{ fontWeight: 700, textAlign: 'right' }}>
                  {activeSpine.bleedCoverMm}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.spineMetrics.provenance}:</span>
                <span className="technical-text" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {activeSpine.provenance}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Proportional Technical Blueprint Representation */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <div
              className="technical-text"
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}
            >
              {locale === 'es'
                ? 'ESQUEMA DE DESARROLLO DE CUBIERTA (C4 · SPINE · C1)'
                : locale === 'de'
                ? 'UMSCHLAGABWICKLUNG (U4 · RÜCKEN · U1)'
                : 'FLAT COVER SPREAD BLUEPRINT (BACK · SPINE · FRONT)'}
            </div>

            {/* Visual Cover Spread Diagram */}
            <div
              style={{
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                height: '150px',
                border: '2px dashed rgba(220, 0, 0, 0.45)',
                borderRadius: '10px',
                padding: '8px',
                background: 'rgba(220, 0, 0, 0.03)'
              }}
            >
              {activeSpineScenario === 'highBulk' && (
                <div
                  style={{
                    width: '14%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRight: '1px dashed var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)'
                  }}
                >
                  90 mm
                </div>
              )}
              <div
                style={{
                  flex: 1,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}
              >
                <span className="technical-text" style={{ fontSize: '0.72rem', fontWeight: 800 }}>
                  {locale === 'de' ? 'U4 (Rückseite)' : locale === 'es' ? 'Contraportada' : 'Back Cover'}
                </span>
                <span className="technical-text" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  170 × 240 mm
                </span>
              </div>

              <div
                style={{
                  width: activeSpineScenario === 'smooth' ? '34px' : '54px',
                  background: 'var(--accent-container)',
                  borderTop: '1px solid var(--accent-primary)',
                  borderBottom: '1px solid var(--accent-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'width 0.25s ease'
                }}
              >
                <span
                  className="technical-text"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    color: 'var(--accent-primary)',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}
                >
                  {activeSpine.spineMm}
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}
              >
                <span className="technical-text" style={{ fontSize: '0.72rem', fontWeight: 800 }}>
                  {locale === 'de' ? 'U1 (Titelseite)' : locale === 'es' ? 'Portada' : 'Front Cover'}
                </span>
                <span className="technical-text" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  170 × 240 mm
                </span>
              </div>

              {activeSpineScenario === 'highBulk' && (
                <div
                  style={{
                    width: '14%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderLeft: '1px dashed var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)'
                  }}
                >
                  90 mm
                </div>
              )}
            </div>

            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                margin: 0,
                textAlign: 'center'
              }}
            >
              {activeSpine.note[locale] || activeSpine.note.es}
            </p>
          </div>
        </div>
      </Section>

      {/* 5. TECHNICAL SPECIFICATION MATRIX */}
      <Section variant="primary" id="specifications">
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.25rem' }}>
          <span className="pill-badge" style={{ marginBottom: '1rem' }}>
            {t.specsPill}
          </span>
          <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            {t.specsTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.65 }}>
            {t.specsSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem'
          }}
        >
          {t.specGroups.map((grp, idx) => (
            <div
              key={idx}
              className="rounded-card"
              style={{
                padding: '1.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                height: '100%'
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-color)',
                  margin: 0
                }}
              >
                {grp.category}
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}
              >
                {grp.items.map((it, iIdx) => (
                  <li
                    key={iIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.55rem',
                      fontSize: '0.86rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5
                    }}
                  >
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 900, lineHeight: 1.2 }}>•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. FINAL CTA */}
      <ActionCTA
        slogan={t.ctaSlogan}
        title={t.ctaTitle}
        description={t.ctaDesc}
        buttonLabel={t.ctaBtn}
        buttonHref="https://budget.printprice.pro/"
        trackingAction="budget_cta_calculate_final"
      />
    </div>
  );
}

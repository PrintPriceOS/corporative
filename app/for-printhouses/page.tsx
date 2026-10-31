'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { useLocale } from '@/lib/i18n';
import {
  Building2,
  Cpu,
  Layers,
  Tag,
  Truck,
  ShieldCheck,
  FileSearch,
  Inbox,
  Wrench,
  Clock,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Lock,
  Sparkles,
  Scale,
  Maximize2,
  ArrowUpDown,
  BarChart3,
  Globe
} from 'lucide-react';

export default function ForPrinthousesPage() {
  const { locale } = useLocale();
  const [activeSetupGroup, setActiveSetupGroup] = useState<number>(0);

  const content = {
    es: {
      heroLabel: 'PRINTPRICE CONTROL PLANE · PRINTHOUSE HUB (B2B)',
      heroTitle: 'EL SISTEMA OPERATIVO INDUSTRIAL PARA IMPRENTAS Y TALLERES GRÁFICOS',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      heroSub:
        'Conecta tu taller gráfico a Control Plane (control.printprice.pro): modela tus prensas offset, digitales y líneas de encuadernación, vincula el catálogo maestro de papel, adopta en 1 clic la matriz de cubicaje 3D EPAL y recibe pedidos con PDF auditados listos para entrar en máquina.',
      ctaPrimary: 'Registrar imprenta en Control Plane ➔',
      ctaSecondary: 'Explorar arquitectura y módulos ↓',
      badgeNote: '✓ Onboarding guiado de 12 módulos · Aislamiento Multi-Tenant RBAC · Cero comisiones ocultas',

      // Hero Right Card (Live Plant Console Preview)
      cardHeader: 'CONTROL PLANE · PRINTHOUSE HUB',
      cardStatus: 'MULTI-TENANT RBAC ACTIVO',
      cardTitle: 'Perfil Operativo de Planta en Vivo',
      cardRows: [
        { k: 'Parque Offset & Digital:', v: 'Speedmaster XL 106 (B1) · HP Indigo 12000 (B2)' },
        { k: 'Líneas de Postimpresión:', v: 'Cosido Hilo · Fresado PUR · Tapa Dura Cartoné' },
        { k: 'Aprovisionamiento Papel:', v: 'Paper Supplier Hub (Micras µm + FSC/PEFC)' },
        { k: 'Matriz Logística & Cubicaje:', v: 'EPAL 1200×800 · Zeitfracht (1,2m) / VVA (1,3m)' },
        { k: 'Motor de Precios (BPE):', v: 'Imposición Determinista en Servidor (:8004)', highlight: true }
      ],
      cardMetricsLabel: 'ESTADO DE ACREDITACIÓN DE TALLER (12/12 MÓDULOS)',
      cardReadyLabel: '100% LISTO',
      cardMetricsSub: 'Snapshot inmutable verificado · Recibiendo ofertas firmadas HMAC-SHA256',
      cardButton: 'Dar de alta mi imprenta ➔',

      // Section 1: End-to-End Architecture Diagram
      archPill: 'ARQUITECTURA CONECTADA DEL ECOSISTEMA',
      archTitle: 'Cómo Control Plane conecta tu planta con editoriales, autores y distribuidores',
      archSub:
        'Control Plane actúa como el cerebro técnico de tu imprenta: traduce tus capacidades reales de fabricación en presupuestos instantáneos, filtra errores de archivo antes de preimpresión y automatiza el cubicaje logístico.',
      archNodes: [
        {
          step: 'NODO 01 · DEMANDA',
          title: 'Editoriales, Autores & API',
          subtitle: 'budget.printprice.pro',
          desc: 'Configuran tiradas o lanzan peticiones API con formato cerrado, páginas, gramaje y destino de entrega.',
          badge: 'SOLICITUD DE COTIZACIÓN'
        },
        {
          step: 'NODO 02 · MOTOR BPE (:8004)',
          title: 'Imposición y Cálculo en Servidor',
          subtitle: 'Book Pricing Engine + SPINE-04',
          desc: 'Cruza la tirada contra tus formatos de pliego (B1/B2/SRA3), curvas de merma, planchas CTP y tarifas privadas.',
          badge: 'PRECIO + LOMO EXACTO'
        },
        {
          step: 'NODO 03 · PREFLIGHT & CUBICAJE',
          title: 'Auditoría PDF + Paletizado 3D',
          subtitle: 'Preflight Engine + Logistics 3D',
          desc: 'Verifica sangrado, cajas TrimBox y color CMYK/1-1, y calcula cajas FEFCO 0201 y palets Euro EPAL.',
          badge: 'ARTES FINALES VALIDADAS'
        },
        {
          step: 'NODO 04 · TU TALLER EN CONTROL PLANE',
          title: 'Cola de Fabricación y Despacho',
          subtitle: 'control.printprice.pro',
          desc: 'Recibes la orden confirmada en Incoming Jobs con especificaciones bloqueadas, archivos verificados y etiqueta logística.',
          badge: 'LISTO PARA IMPRIMIR'
        }
      ],

      // Section 2: Interactive 12-Module Printhouse Setup Hub
      setupPill: 'ONBOARDING GUIADO DE 12 MÓDULOS (/PRINTHOUSE/SETUP)',
      setupTitle: 'El centro de configuración más completo de la industria gráfica',
      setupSub:
        'Cuando registras tu imprenta en Control Plane, un asistente estructurado de 12 paneles te guía paso a paso para modelar la realidad física y económica de tu planta sin hojas de cálculo dispersas.',
      setupTabs: [
        {
          id: 'fleet',
          label: '1. Empresa, Plantas y Maquinaria (01–04)',
          modules: [
            {
              code: '01 · RESUMEN DE CONFIGURACIÓN',
              title: 'Panel de Progreso y Asistente Guiado',
              desc: 'Indicador porcentual en tiempo real del estado de configuración de tu planta, con alertas de campos pendientes y tutorial interactivo paso a paso (GuidedTutorialOverlay).',
              icon: BarChart3
            },
            {
              code: '02 · PERFIL DE EMPRESA',
              title: 'Perfil Fiscal, Moneda y Certificaciones',
              desc: 'Datos societarios, NIF/IVA intracomunitario, divisa operativa (EUR), estándares de gestión de color (ISO 12647-2 / FOGRA) y cadenas de custodia FSC® / PEFC.',
              icon: Building2
            },
            {
              code: '03 · PLANTAS DE PRODUCCIÓN',
              title: 'Sedes y Centros de Producción Multi-Planta',
              desc: 'Registra una o varias plantas físicas con sus coordenadas logísticas, muelles de carga, horarios de expedición y calendarios laborables independientes.',
              icon: Globe
            },
            {
              code: '04 · PARQUE DE MAQUINARIA',
              title: 'Parque de Maquinaria (Prensas y Postimpresión)',
              desc: 'Modela prensas Offset de pliego (B1, B2, B3), rotativas, sistemas Digitales (Tóner / Inkjet de alta velocidad), plegadoras, cosedoras de hilo, líneas PUR/EVA y trenes de tapa dura.',
              icon: Cpu
            }
          ]
        },
        {
          id: 'ops',
          label: '2. Capacidades, Papel y Plazos (05–08)',
          modules: [
            {
              code: '05 · CAPACIDADES TÉCNICAS',
              title: 'Capacidades Técnicas y Encuadernaciones',
              desc: 'Define formatos mínimos y máximos de libro, anchos de lomo soportados, tipos de encuadernación (Rústica PUR, Cosida, Cartoné, Solapas, Wire-O) y acabados (Plastificados, UV, Stamping).',
              icon: Wrench
            },
            {
              code: '06 · SUSTRATOS Y PAPER HUB',
              title: 'Sustratos y Conexión al Paper Supplier Hub',
              desc: 'Gestiona tu stock propio de bobinas/pliegos o vincula en un clic las ofertas en vivo de distribuidores del Paper Supplier Hub con gramajes (gsm), micras físicas (µm) y mano verificada.',
              icon: Layers
            },
            {
              code: '07 · CAPACIDAD Y TURNOS',
              title: 'Capacidad de Planta y Turnos de Trabajo',
              desc: 'Configura turnos activos por centro, límites diarios de pliegos/horas de máquina y umbrales de saturación para evitar cuellos de botella en campañas editoriales.',
              icon: Sparkles
            },
            {
              code: '08 · PLAZOS DE ENTREGA',
              title: 'Plazos de Fabricación (SLAs) por Producto',
              desc: 'Establece días hábiles estándar y exprés según el tipo de encuadernación (ej. 5 días en rústica digital, 10–12 días en tapa dura cosida) y volumen de tirada.',
              icon: Clock
            }
          ]
        },
        {
          id: 'commercial',
          label: '3. Tarifas, Logística 3D y Acreditación (09–12)',
          modules: [
            {
              code: '09 · TARIFAS INDUSTRIALES',
              title: 'Precios Industriales, Calibración Rápida y Simulador',
              desc: 'Editor canónico de tarifas de fabricación (rates_json), calibración rápida por familias de encuadernación, constructor de reglas comerciales y simulador de cotización en vivo.',
              icon: Tag
            },
            {
              code: '10 · TRANSPORTE Y CUBICAJE 3D',
              title: 'Matriz Logística, Transportistas y Cubicaje 3D EPAL',
              desc: 'Adopta en 1 clic la matriz estándar (Dachser, DB Schenker, Raben) o personaliza costes de Euro-Palet EPAL, cajas FEFCO 0201, retractilado y tarifas por tramos de palets con vista previa 3D.',
              icon: Truck
            },
            {
              code: '11 · INTEGRACIONES Y API',
              title: 'Conectividad MIS / ERP, Webhooks y JDF',
              desc: 'Credenciales de acceso programático con scopes granulares, webhooks firmados de eventos de pedido y exportación estructurada de hojas de ruta técnicas hacia tu sistema MIS.',
              icon: Terminal
            },
            {
              code: '12 · ACREDITACIÓN MARKETPLACE',
              title: 'Auditoría de Preparación y Acreditación Gobernada',
              desc: 'Verifica automáticamente que tu cuenta, maquinaria y tarifas no tengan bloqueos y envía un snapshot inmutable para activar tu imprenta en el Marketplace y el motor BPE.',
              icon: ShieldCheck
            }
          ]
        }
      ],

      // Section 3: Daily Operations Console (6 Live Modules)
      opsPill: 'OPERACIÓN DIARIA EN PLANTA',
      opsTitle: 'Los 6 módulos operativos para gestionar el día a día de tu taller',
      opsSub:
        'Una vez completado el onboarding, Control Plane se convierte en tu consola de mando diaria para recibir encargos, auditar archivos, controlar colas de máquina y supervisar márgenes.',
      opsCards: [
        {
          badge: 'MÓDULO 01 · /DASHBOARD & /INTELLIGENCE',
          title: 'Telemetría de Planta e Intelligence Layer',
          desc: 'Panel ejecutivo en tiempo real con volumen de trabajos activos, tasa de cumplimiento de especificaciones, latencia de verificación y análisis predictivo de carga de taller.',
          bullets: [
            'KPIs operativos en vivo por sede de producción.',
            'Alertas tempranas de desviación en colas o incidencias de archivo.',
            'Modo Claro / Oscuro adaptable y densidad Compacta / Cómoda para monitores de planta.'
          ],
          icon: BarChart3
        },
        {
          badge: 'MÓDULO 02 · /JOBS (PEDIDOS ENTRANTES)',
          title: 'Bandeja de Entrada de Pedidos Certificados',
          desc: 'Recibe órdenes de producción que ya han superado el bloqueo de seguridad del carrito con cotización firmada por HMAC-SHA256 y especificaciones técnicas inmutables.',
          bullets: [
            'Ficha técnica completa: formato cerrado, páginas, papel (gsm y µm), lomo SPINE-04 y acabados.',
            'Desglose transparente: importe neto de fabricación separado del embalaje y transporte.',
            'Flujo de remediación (ACTION_REQUIRED) si preimpresión solicita reemplazo de un PDF.'
          ],
          icon: Inbox
        },
        {
          badge: 'MÓDULO 03 · /PREFLIGHT/JOBS',
          title: 'Servicio Preflight PDF y Geometría de Cubierta',
          desc: 'Inspección automatizada de los PDFs de interior y cubierta frente a la geometría oficial calculada por el motor SPINE-04 antes de insolar planchas o lanzar a RIP digital.',
          bullets: [
            'Verificación de TrimBox, BleedBox (+3 mm), vuelta de forro (15 mm) y canal de bisagra (Rastri).',
            'Control de espacios de color CMYK / 1-1 negro, resolución de imágenes e incrustación tipográfica.',
            'Trazabilidad completa mediante evidenceId vinculada al expediente del pedido.'
          ],
          icon: FileSearch
        },
        {
          badge: 'MÓDULO 04 · /MANUFACTURING',
          title: 'Cola de Fabricación y Estados de Planta',
          desc: 'Organiza el flujo físico del trabajo desde preimpresión hasta expedición con estados normalizados que informan automáticamente al cliente editorial.',
          bullets: [
            'Transiciones trazables: EN COLA → PREIMPRESIÓN → EN PRODUCCIÓN → ENCUADERNACIÓN → ENVIADO.',
            'Asignación a máquina específica (Offset o Digital) según el cruce óptimo calculado por BPE.',
            'Eliminación de correos manuales de seguimiento para tu equipo de atención al cliente.'
          ],
          icon: Cpu
        },
        {
          badge: 'MÓDULO 05 · /MATERIALS & SUPPLIER HUB',
          title: 'Aprovisionamiento Conectado de Papel',
          desc: 'Consulta el catálogo federado de distribuidores de papel sin salir de Control Plane, con calibres físicos verificados y tarifas escalonadas por palets o toneladas.',
          bullets: [
            'Sincronización directa de gramaje (70–400 gsm) y micras reales (µm) con el calculador de lomos.',
            'Separación estricta entre precio del papel franco almacén y porte de distribución.',
            'Prevención de errores de lomo causados por cambios de lote o factor de mano (volumen).'
          ],
          icon: Layers
        },
        {
          badge: 'MÓDULO 06 · /OPS/MARKETPLACE & /OPS/FINANCIALS',
          title: 'Gobierno Comercial, Finanzas y Auditoría (/audit)',
          desc: 'Supervisa qué familias de productos están publicadas en la red, audita liquidaciones financieras por pedido y consulta el registro inmutable de eventos de seguridad.',
          bullets: [
            'Activación o pausa instantánea de líneas de producto según la ocupación de tu taller.',
            'Aislamiento estricto Multi-Tenant: ningún competidor puede ver tus tarifas ni tus máquinas.',
            'Registros de auditoría completos de quién modificó una tarifa, aprobó un archivo o liberó un envío.'
          ],
          icon: Scale
        }
      ],

      // Section 4: 3D Cubing & Editorial Warehouse Blueprint Showcase (LOGISTICS-UI-01)
      logPill: 'LOGÍSTICA 3D & ALMACENES EDITORIALES (LOGISTICS-UI-01)',
      logTitle: 'Cubicaje 3D Euro-Palet EPAL y cumplimiento con distribuidoras de libros',
      logSub:
        'Integrado directamente en la pestaña Shipping de Control Plane: calcula automáticamente el peso neto del libro (incluyendo cartón gris de 1,20 g/cm³ y guardas), empaqueta en cajas FEFCO 0201 (≤ 15 kg) y genera el esquema isométrico del palet cumpliendo las normas de Zeitfracht Erfurt, VVA Arvato y Amazon FBA.',
      logFeatures: [
        {
          title: 'Adopción en 1 Clic o Tarifas Propias',
          desc: 'Activa al instante la Matriz Logística Estándar de la plataforma (Dachser, DB Schenker, Raben) o configura tus propios precios de Euro-Palet EPAL (€/ud), cajas FEFCO (€/ud), film estirable y escalones de 1, 2 y 3–5 palets.'
        },
        {
          title: 'Perfiles de Muelle Editorial Preconfigurados',
          desc: 'Valida automáticamente el techo de altura máxima de 1.200 mm (Zeitfracht Medien Erfurt) o 1.300 mm (VVA Arvato Gütersloh), el retranqueo perimetral obligatorio de 30 mm sin desbordamiento (zero overhang) y el límite de 15 kg en Amazon FBA.'
        },
        {
          title: 'Protección Total del Margen de Fabricación',
          desc: 'En PrintPrice OS, el coste de fabricación, el coste de embalaje (cajas + palets + cantoneras) y la tarifa de transporte viajan en partidas separadas. Una subida del recargo de combustible nunca erosiona tu margen industrial.'
        }
      ],
      diagramHeader: 'ESQUEMA ISOMÉTRICO DE PALETIZACIÓN 3D (EUR-EPAL 1200 × 800 MM)',
      diagramBadge: 'Escala Isométrica 3D · Cumplimiento Muelle Editorial',
      diagramLabels: {
        topCardboard: 'Cartón protector superior',
        edgeProtector: 'Cantoneras de protección',
        stretchFoil: 'Film estirable',
        interlockingLayers: 'Cajas FEFCO 0201 entrelazadas',
        bottomCardboard: 'Cartón base antideslizante',
        strappingBands: 'Flejado plástico (2×2)',
        epalPallet: 'Euro-Palet EPAL',
        maxHeight: 'altura máx.'
      },
      diagramKpis: [
        { title: 'Huella Estándar EPAL', val: '1.200 × 800 mm (0,4 LDM)' },
        { title: 'Mosaico Entrelazado', val: 'Capas FEFCO 0201 en cruz' },
        { title: 'Límite de Altura', val: '1.200 mm (Zeitfracht) / 1.300 mm (VVA)' },
        { title: 'Retranqueo: 30 mm', val: 'Cero desbordamiento perimetral' }
      ],
      carrierProtocolCard: {
        badge: 'GOBERNANZA LOGÍSTICA · PPOS-LOG-SLA-2026.1',
        title: 'Protocolo de Integración y Condiciones de Servicio de Transporte',
        desc: 'Marco vinculante de cumplimiento para transportistas de la red PrintPriceOS: tasación 0,40 LDM / Euro-Palet EPAL (1.850 kg/LDM, no apilable en tránsito), cita previa obligatoria en hubs editoriales (Zeitfracht Erfurt GLN 4026635000006 y VVA Arvato Gütersloh GLN 4002693000002), circuito de canje EPAL Palettenschein (14 días / 15,00 € por no restitución) y trazabilidad GS1-128 SSCC-18.',
        linkLabel: 'Consultar Protocolo Oficial de Transporte ➔',
        linkHref: 'https://docs.printprice.pro/docs/logistics/carrier-service-protocol'
      },

      // Section 5: 6 Strategic Benefits for Printhouses
      benPill: 'VENTAJAS COMPETITIVAS PARA TU TALLER',
      benBadgePrefix: 'VENTAJA',
      benTitle: 'Por qué las imprentas modernas operan con Control Plane',
      benCards: [
        {
          title: 'Cero Tiempo Perdido en Presupuestos Manuales',
          desc: 'El motor BPE cotiza en milisegundos aplicando tus velocidades de máquina, horas de preparación, pliegos y mermas reales, incluso para tiradas escalonadas complejas.'
        },
        {
          title: 'Artes Finales Que Entran Directo a Máquina',
          desc: 'Dile adiós a los PDFs sin sangre, con lomos mal calculados o imágenes en RGB. El cliente corrige y valida el archivo en Preflight antes de que llegue a tu bandeja.'
        },
        {
          title: 'Cruce Automático Digital vs. Offset',
          desc: 'Perfila tanto tus prensas digitales como tus máquinas offset: el motor asignará cada tirada a la línea más rentable según tus costes de arranque y pase.'
        },
        {
          title: 'Confidencialidad Absoluta de Tus Costes',
          desc: 'Tus tarifas horarias, precios de plancha y acuerdos de papel están protegidos por aislamiento Multi-Tenant en servidor. El comprador solo ve el precio final ofertado.'
        },
        {
          title: 'Demanda Cualificada Nacional e Internacional',
          desc: 'Conecta con editoriales y autores que buscan capacidad industrial verificada, con transporte internacional calculado automáticamente en más de 25 países europeos.'
        },
        {
          title: 'Sin Cuotas de Entrada ni Permanencias',
          desc: 'Registra tu taller, modela tus máquinas y realiza simulaciones de precios en privado antes de solicitar tu acreditación para recibir pedidos del Marketplace.'
        }
      ],

      // Section 6: FAQ
      faqPill: 'PREGUNTAS FRECUENTES DE DIRECTORES DE PLANTA',
      faqHeading: 'Respuestas claras sobre seguridad, cálculo y operación',
      faqs: [
        {
          q: '¿Quién calcula los presupuestos y dónde residen mis matrices de costes?',
          a: 'Todos los cálculos se ejecutan exclusivamente en el servidor del Book Pricing Engine (:8004) aplicando las matrices de maquinaria, imposición, mermas y tarifas (rates_json) que tú configuras en Control Plane. Nunca se exponen fórmulas ni costes unitarios en el navegador del cliente.'
        },
        {
          q: '¿Pueden otras imprentas ver mis precios, máquinas o descuentos de papel?',
          a: 'Nunca. Control Plane aplica aislamiento estricto de organización (Multi-Tenant Isolation) y control de acceso basado en roles (RBAC: PRINTHOUSE_ADMIN, PRINTHOUSE_OPERATOR, VIEWER). Tus datos técnicos y comerciales son 100% privados.'
        },
        {
          q: '¿Qué ocurre si un cliente sube un PDF con el ancho de lomo incorrecto?',
          a: 'El sistema lo detecta antes de llegar a tu taller. Además, como el calculador oficial de lomos (SPINE-04) calcula el grosor exacto a partir de las micras reales (µm) del papel elegido y el tipo de encuadernación, el diseñador descarga las cotas exactas desde el primer minuto.'
        },
        {
          q: '¿Cómo funciona la configuración logística si trabajamos con nuestras propias agencias?',
          a: 'En el módulo Shipping puedes adoptar en 1 clic la matriz estándar de la plataforma o introducir tus propias tarifas por Euro-Palet EPAL, cajas FEFCO y escalones de transporte con tu agencia habitual o flota propia.'
        }
      ],

      // Final CTA
      finalSlogan: 'CONTROL PLANE · PRINTHOUSE HUB',
      finalTitle: 'Digitaliza la cotización, el preflight y la logística de tu imprenta',
      finalDesc:
        'Crea tu cuenta de taller en Control Plane, completa el onboarding guiado de 12 módulos y empieza a recibir órdenes de producción verificadas.',
      finalBtnPrimary: 'Registrar imprenta ahora ➔',
      finalBtnSecondary: 'Hablar con Ingeniería de Planta ➔'
    },

    en: {
      heroLabel: 'PRINTPRICE CONTROL PLANE · PRINTHOUSE HUB (B2B)',
      heroTitle: 'THE INDUSTRIAL OPERATING SYSTEM FOR PRINT HOUSES & BINDERY PLANTS',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      heroSub:
        'Connect your printing facility to Control Plane (control.printprice.pro): profile your sheetfed offset, digital, and bindery lines, link the federated master paper catalog, adopt the 3D EPAL cubing matrix in 1 click, and receive orders with preflight-verified PDFs ready for press.',
      ctaPrimary: 'Register printhouse on Control Plane ➔',
      ctaSecondary: 'Explore architecture & modules ↓',
      badgeNote: '✓ 12-Module Guided Onboarding · Multi-Tenant RBAC Isolation · Zero Hidden Fees',

      // Hero Right Card
      cardHeader: 'CONTROL PLANE · PRINTHOUSE HUB',
      cardStatus: 'MULTI-TENANT RBAC ACTIVE',
      cardTitle: 'Live Plant Operational Profile',
      cardRows: [
        { k: 'Offset & Digital Fleet:', v: 'Speedmaster XL 106 (B1) · HP Indigo 12000 (B2)' },
        { k: 'Post-Press Bindery:', v: 'Thread Sewn · PUR Perfect Bound · Casebound Hardcover' },
        { k: 'Paper Procurement:', v: 'Paper Supplier Hub (Microns µm + FSC/PEFC)' },
        { k: 'Logistics & 3D Cubing:', v: 'EPAL 1200×800 · Zeitfracht (1.2m) / VVA (1.3m)' },
        { k: 'Pricing Authority (BPE):', v: 'Deterministic Server Imposition (:8004)', highlight: true }
      ],
      cardMetricsLabel: 'PLANT ACCREDITATION STATUS (12/12 MODULES)',
      cardReadyLabel: '100% READY',
      cardMetricsSub: 'Immutable snapshot verified · Receiving HMAC-SHA256 signed orders',
      cardButton: 'Onboard my print plant ➔',

      // Section 1: Architecture Diagram
      archPill: 'CONNECTED ECOSYSTEM ARCHITECTURE',
      archTitle: 'How Control Plane connects your plant with publishers, authors, and suppliers',
      archSub:
        'Control Plane acts as your facility’s technical brain: it translates your real manufacturing capabilities into instant quotes, blocks defective PDFs before prepress, and automates 3D pallet cubing.',
      archNodes: [
        {
          step: 'NODE 01 · DEMAND',
          title: 'Publishers, Authors & API',
          subtitle: 'budget.printprice.pro',
          desc: 'Configure print runs or trigger API requests with trim size, page count, paper gsm, and delivery destination.',
          badge: 'QUOTE REQUEST'
        },
        {
          step: 'NODE 02 · BPE ENGINE (:8004)',
          title: 'Server Imposition & Costing',
          subtitle: 'Book Pricing Engine + SPINE-04',
          desc: 'Evaluates the run against your sheet formats (B1/B2/SRA3), waste curves, CTP plates, and private shop rates.',
          badge: 'PRICE + EXACT SPINE'
        },
        {
          step: 'NODE 03 · PREFLIGHT & CUBING',
          title: 'PDF Audit + 3D Palletization',
          subtitle: 'Preflight Engine + Logistics 3D',
          desc: 'Verifies bleeds, TrimBoxes, and CMYK/1-1 color spaces, and computes FEFCO 0201 cartons and Euro-EPAL pallets.',
          badge: 'VERIFIED ARTWORK'
        },
        {
          step: 'NODE 04 · YOUR PLANT CONSOLE',
          title: 'Manufacturing Queue & Dispatch',
          subtitle: 'control.printprice.pro',
          desc: 'Receive the confirmed job in Incoming Jobs with locked specifications, audited PDFs, and pallet packing labels.',
          badge: 'READY FOR PRESS'
        }
      ],

      // Section 2: 12-Module Setup Hub
      setupPill: '12-MODULE GUIDED ONBOARDING (/PRINTHOUSE/SETUP)',
      setupTitle: 'The most comprehensive plant configuration hub in the printing industry',
      setupSub:
        'When you register your printhouse on Control Plane, a structured 12-panel setup wizard guides you step by step to model the physical and financial reality of your plant—without scattered spreadsheets.',
      setupTabs: [
        {
          id: 'fleet',
          label: '1. Company, Sites & Fleet (01–04)',
          modules: [
            {
              code: '01 · SETUP OVERVIEW',
              title: 'Readiness Tracker & Guided Tutorial',
              desc: 'Real-time completion percentage across your plant setup, highlighting pending requirements with an interactive step-by-step assistant (GuidedTutorialOverlay).',
              icon: BarChart3
            },
            {
              code: '02 · COMPANY PROFILE',
              title: 'Corporate Identity, Currency & Certifications',
              desc: 'Legal entity details, EU VAT ID, operating currency (EUR), color management standards (ISO 12647-2 / FOGRA), and FSC® / PEFC chain-of-custody credentials.',
              icon: Building2
            },
            {
              code: '03 · PRODUCTION SITES',
              title: 'Multi-Site Production Facilities',
              desc: 'Register one or multiple physical manufacturing plants with shipping coordinates, loading dock specifications, dispatch hours, and independent working calendars.',
              icon: Globe
            },
            {
              code: '04 · MACHINERY FLEET',
              title: 'Machinery Fleet (Presses & Bindery Lines)',
              desc: 'Profile sheetfed Offset presses (B1, B2, B3), web presses, Digital presses (Toner / High-Speed Inkjet), folders, thread sewers, PUR/EVA binders, and hardcover casing-in lines.',
              icon: Cpu
            }
          ]
        },
        {
          id: 'ops',
          label: '2. Capabilities, Paper & SLAs (05–08)',
          modules: [
            {
              code: '05 · CAPABILITIES',
              title: 'Technical Capabilities & Binding Rules',
              desc: 'Define min/max trim sizes, supported spine widths, binding styles (PUR Softcover, Thread Sewn, Casebound Hardcover, Flaps, Wire-O), and surface finishes (Lamination, Spot UV, Foil).',
              icon: Wrench
            },
            {
              code: '06 · MATERIALS & PAPER HUB',
              title: 'Substrates & Paper Supplier Hub Link',
              desc: 'Manage your house paper stock or link live distributor offers from the Paper Supplier Hub in one click with verified basis weight (gsm), physical microns (µm), and bulk factor.',
              icon: Layers
            },
            {
              code: '07 · CAPACITY',
              title: 'Plant Capacity & Shift Scheduling',
              desc: 'Configure active daily shifts per site, daily sheet/machine-hour ceilings, and utilization thresholds to prevent bottlenecks during peak publishing seasons.',
              icon: Sparkles
            },
            {
              code: '08 · LEAD TIMES',
              title: 'Production Lead Times (SLAs) by Binding',
              desc: 'Set standard and expedited turnaround days by binding family (e.g., 5 days for digital softcover, 10–12 days for sewn hardcover) and run-length brackets.',
              icon: Clock
            }
          ]
        },
        {
          id: 'commercial',
          label: '3. Pricing, 3D Logistics & Review (09–12)',
          modules: [
            {
              code: '09 · INDUSTRIAL PRICING',
              title: 'Industrial Pricing, Quick Calibration & Simulator',
              desc: 'Canonical manufacturing rate editor (rates_json), quick calibration by binding family, commercial price book rule builder, and live quote simulator.',
              icon: Tag
            },
            {
              code: '10 · SHIPPING & 3D CUBING',
              title: 'Logistics Matrix, Carriers & 3D EPAL Cubing',
              desc: 'Adopt the platform standard matrix in 1 click (Dachser, DB Schenker, Raben) or customize Euro-Pallet EPAL, FEFCO 0201 cartons, stretch wrap, and tiered pallet rates with a live 3D preview.',
              icon: Truck
            },
            {
              code: '11 · INTEGRATIONS & API',
              title: 'MIS / ERP Connectivity, Webhooks & JDF',
              desc: 'Programmatic API credentials with granular scopes, signed order lifecycle webhooks, and structured digital job ticket exports into your internal MIS/ERP.',
              icon: Terminal
            },
            {
              code: '12 · MARKETPLACE REVIEW',
              title: 'Readiness Audit & Governed Accreditation',
              desc: 'Automatically validates that account, fleet, and pricing have zero blocking issues and submits an immutable snapshot to activate your plant in the Marketplace and BPE.',
              icon: ShieldCheck
            }
          ]
        }
      ],

      // Section 3: Daily Operations Console
      opsPill: 'DAILY PLANT OPERATIONS',
      opsTitle: 'The 6 operational modules built to run your daily print floor',
      opsSub:
        'Once onboarding is complete, Control Plane becomes your daily command console to receive verified jobs, inspect artwork, manage press queues, and protect plant margins.',
      opsCards: [
        {
          badge: 'MODULE 01 · /DASHBOARD & /INTELLIGENCE',
          title: 'Plant Telemetry & Intelligence Layer',
          desc: 'Real-time executive dashboard tracking active job volume, specification compliance rate, verification latency, and predictive shop-floor load analytics.',
          bullets: [
            'Live operational KPIs segmented by production site.',
            'Early warning alerts for queue bottlenecks or file anomalies.',
            'Adaptive Light / Dark themes and Compact / Comfortable density for shop-floor terminals.'
          ],
          icon: BarChart3
        },
        {
          badge: 'MODULE 02 · /JOBS (INCOMING JOBS)',
          title: 'Certified Order Intake Queue',
          desc: 'Receive production orders that have passed stateful cart gating with HMAC-SHA256 signed pricing and immutable technical specifications.',
          bullets: [
            'Complete job ticket: trim size, page count, paper (gsm & µm), SPINE-04 width, and finishing.',
            'Strict cost segregation: net manufacturing revenue cleanly separated from packaging and freight.',
            'Built-in remediation flow (ACTION_REQUIRED) if prepress requests a replacement PDF.'
          ],
          icon: Inbox
        },
        {
          badge: 'MODULE 03 · /PREFLIGHT/JOBS',
          title: 'Automated PDF Preflight & Cover Geometry Audit',
          desc: 'Automated inspection of interior and cover PDFs against the authoritative geometry calculated by SPINE-04 before imaging CTP plates or queuing digital RIPs.',
          bullets: [
            'Verifies TrimBox, BleedBox (+3 mm), hardcover turn-in (15 mm), and hinge groove (Rastri).',
            'Checks CMYK / 1-1 monochrome color spaces, effective image resolution, and font embedding.',
            'Full evidentiary traceability via evidenceId permanently linked to the order record.'
          ],
          icon: FileSearch
        },
        {
          badge: 'MODULE 04 · /MANUFACTURING',
          title: 'Manufacturing Queue & Shop-Floor Statuses',
          desc: 'Orchestrate physical job progression from prepress to dispatch with standardized states that automatically notify the publishing client.',
          bullets: [
            'Audited transitions: QUEUED → PREPRESS → IN_PRODUCTION → BINDERY → READY_TO_SHIP → SHIPPED.',
            'Direct assignment to specific Offset or Digital presses based on BPE crossover optimization.',
            'Eliminates manual status-check emails for your customer service and production planners.'
          ],
          icon: Cpu
        },
        {
          badge: 'MODULE 05 · /MATERIALS & SUPPLIER HUB',
          title: 'Connected Paper Procurement',
          desc: 'Browse the federated paper distributor catalog directly inside Control Plane, featuring verified physical calipers and tiered pricing by pallet or ton.',
          bullets: [
            'Direct synchronization of basis weight (70–400 gsm) and physical microns (µm) with the spine engine.',
            'Strict decoupling between ex-warehouse paper price and regional delivery freight.',
            'Prevents spine width mismatches caused by unverified paper bulk factors.'
          ],
          icon: Layers
        },
        {
          badge: 'MODULE 06 · /OPS/MARKETPLACE & /OPS/FINANCIALS',
          title: 'Commercial Governance, Financials & Audit (/audit)',
          desc: 'Control which product families are live on the network, review per-order financial settlements, and inspect the immutable security audit log.',
          bullets: [
            'Instant activation or pausing of product lines based on current plant utilization.',
            'Strict Multi-Tenant isolation: no competitor can ever view your rates or machine profiles.',
            'Complete Audit Logs recording who modified a rate, approved a file, or released a shipment.'
          ],
          icon: Scale
        }
      ],

      // Section 4: 3D Cubing & Editorial Warehouse Blueprint Showcase
      logPill: '3D LOGISTICS & EDITORIAL WAREHOUSES (LOGISTICS-UI-01)',
      logTitle: '3D Euro-Pallet EPAL Cubing & Book Distributor Compliance',
      logSub:
        'Built directly into the Control Plane Shipping tab: automatically computes net book mass (including 1.20 g/cm³ greyboard and endpapers), packs into FEFCO 0201 cartons (≤ 15 kg), and renders the isometric pallet blueprint compliant with Zeitfracht Erfurt, VVA Arvato, and Amazon FBA.',
      logFeatures: [
        {
          title: '1-Click Standard Matrix or Custom Carrier Rates',
          desc: 'Adopt the Platform Standard Logistics Matrix in 1 click (Dachser, DB Schenker, Raben) or customize your own Euro-Pallet EPAL (€/unit), FEFCO carton (€/unit), stretch wrap, and 1, 2, and 3–5 pallet freight tiers.'
        },
        {
          title: 'Pre-Engineered Editorial Receiving Dock Profiles',
          desc: 'Automatically enforces the 1,200 mm max height limit (Zeitfracht Medien Erfurt) or 1,300 mm limit (VVA Arvato Gütersloh), mandatory 30 mm perimeter setback (zero overhang), and the 15 kg carton cap for Amazon FBA.'
        },
        {
          title: 'Complete Protection of Manufacturing Margins',
          desc: 'In PrintPrice OS, manufacturing cost, packaging consumables (cartons + pallets + edge protectors), and carrier freight are strictly segregated. Fuel surcharge fluctuations never erode your press margin.'
        }
      ],
      diagramHeader: '3D ISOMETRIC PALLETIZATION BLUEPRINT (EUR-EPAL 1200 × 800 MM)',
      diagramBadge: '3D Isometric Scale • Editorial Hub Compliant',
      diagramLabels: {
        topCardboard: 'Top protective cardboard',
        edgeProtector: 'Edge protector',
        stretchFoil: 'Stretch foil',
        interlockingLayers: 'Book cartons in interlocking layers',
        bottomCardboard: 'Bottom gray cardboard',
        strappingBands: 'Plastic strapping bands (2×2)',
        epalPallet: 'EPAL Euro-pallet',
        maxHeight: 'max height'
      },
      diagramKpis: [
        { title: 'Standard EPAL Footprint', val: '1,200 × 800 mm (0.4 LDM)' },
        { title: 'Interlocked Tiling Pattern', val: 'Cross-stacked FEFCO 0201 layers' },
        { title: 'Max Height Limit', val: '1,200 mm (Zeitfracht) / 1,300 mm (VVA)' },
        { title: 'Edge Margin: 30 mm', val: 'Zero overhang • 30 mm setback' }
      ],
      carrierProtocolCard: {
        badge: 'CARRIER GOVERNANCE · PPOS-LOG-SLA-2026.1',
        title: 'Carrier Integration Protocol & Transport Service Conditions',
        desc: 'Binding operational framework for carriers serving the PrintPriceOS manufacturing network: 0.40 LDM / Euro-Pallet EPAL conversion (1,850 kg/LDM, strict non-stackable transit), mandatory dock slot booking at editorial hubs (Zeitfracht Erfurt GLN 4026635000006 & VVA Arvato Gütersloh GLN 4002693000002), 14-day EPAL Palettenschein voucher (15.00 EUR non-return fee), and GS1-128 SSCC-18 scanning.',
        linkLabel: 'Read Official Carrier Service Protocol ➔',
        linkHref: 'https://docs.printprice.pro/docs/logistics/carrier-service-protocol'
      },

      // Section 5: 6 Strategic Benefits
      benPill: 'COMPETITIVE ADVANTAGES FOR YOUR PLANT',
      benBadgePrefix: 'BENEFIT',
      benTitle: 'Why modern print houses run on Control Plane',
      benCards: [
        {
          title: 'Zero Time Wasted on Manual Estimating',
          desc: 'The BPE engine quotes in milliseconds using your actual press speeds, makeready hours, sheet sizes, and waste curves—even across multi-tier print runs.'
        },
        {
          title: 'Production PDFs Ready for Immediate Plate Making',
          desc: 'Eliminate missing bleeds, wrong spine widths, and RGB images. Buyers fix and verify their files in Preflight before the job ever hits your intake queue.'
        },
        {
          title: 'Automated Digital vs. Offset Crossover',
          desc: 'Profile both your digital presses and sheetfed offset equipment: the engine routes each run length to your most profitable production line.'
        },
        {
          title: 'Strict Confidentiality of Your Cost Matrices',
          desc: 'Your hourly machine rates, plate costs, and paper terms are protected by server-side Multi-Tenant isolation. Buyers only see the final offered price.'
        },
        {
          title: 'Qualified Domestic & Cross-Border Demand',
          desc: 'Connect with publishers and self-publishing authors seeking verified industrial capacity, complete with automated freight quoting across 25+ European countries.'
        },
        {
          title: 'No Upfront Onboarding Fees or Lock-In',
          desc: 'Register your plant, model your presses, and run private price simulations before submitting your readiness snapshot to receive Marketplace orders.'
        }
      ],

      // Section 6: FAQ
      faqPill: 'PLANT DIRECTOR FAQ',
      faqHeading: 'Clear answers on security, calculation authority, and operations',
      faqs: [
        {
          q: 'Who calculates the quotes and where are my cost matrices stored?',
          a: 'All calculations are executed exclusively on the server by the Book Pricing Engine (:8004) using the machine profiles, imposition rules, waste curves, and rates (rates_json) you configure in Control Plane. Formulas and unit costs are never exposed to the client browser.'
        },
        {
          q: 'Can other printhouses see my rates, machines, or paper discounts?',
          a: 'Never. Control Plane enforces strict organization-level Multi-Tenant Isolation and Role-Based Access Control (RBAC: PRINTHOUSE_ADMIN, PRINTHOUSE_OPERATOR, VIEWER). Your technical and commercial data remain 100% confidential.'
        },
        {
          q: 'What happens if a client uploads a cover PDF with the wrong spine width?',
          a: 'The system catches it before it reaches your prepress queue. Furthermore, because the official spine calculator (SPINE-04) computes exact thickness from the verified physical microns (µm) of the selected paper and binding style, designers get exact cover spread dimensions from day one.'
        },
        {
          q: 'How does logistics setup work if we use our own freight forwarders?',
          a: 'Inside the Shipping module you can adopt the Platform Standard Matrix in 1 click or enter your own rates for Euro-Pallet EPAL, FEFCO cartons, and pallet freight tiers using your preferred carrier or own fleet.'
        }
      ],

      // Final CTA
      finalSlogan: 'CONTROL PLANE · PRINTHOUSE HUB',
      finalTitle: 'Digitize quoting, preflight, and 3D logistics for your print plant',
      finalDesc:
        'Create your printhouse account on Control Plane, complete the 12-module guided setup, and start receiving preflight-verified production orders.',
      finalBtnPrimary: 'Register printhouse now ➔',
      finalBtnSecondary: 'Speak with Plant Engineering ➔'
    },

    de: {
      heroLabel: 'PRINTPRICE CONTROL PLANE · PRINTHOUSE HUB (B2B)',
      heroTitle: 'DAS INDUSTRIELLE BETRIEBSSYSTEM FÜR DRUCKEREIEN & BUCHBINDEREIEN',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      heroSub:
        'Verbinden Sie Ihren grafischen Betrieb mit Control Plane (control.printprice.pro): Modellieren Sie Bogenoffset-, Digitaldruck- und Weiterverarbeitungslinien, verknüpfen Sie den föderierten Papierkatalog, übernehmen Sie mit 1 Klick die 3D-EPAL-Logistikmatrix und empfangen Sie Preflight-geprüfte Druckaufträge.',
      ctaPrimary: 'Druckerei in Control Plane registrieren ➔',
      ctaSecondary: 'Architektur & Module entdecken ↓',
      badgeNote: '✓ Geführtes 12-Module-Onboarding · Multi-Tenant-RBAC-Isolation · Keine versteckten Gebühren',

      // Hero Right Card
      cardHeader: 'CONTROL PLANE · PRINTHOUSE HUB',
      cardStatus: 'MULTI-TENANT RBAC AKTIV',
      cardTitle: 'Live-Betriebsprofil der Druckerei',
      cardRows: [
        { k: 'Offset- & Digitalpark:', v: 'Speedmaster XL 106 (B1) · HP Indigo 12000 (B2)' },
        { k: 'Buchbinderei & Finish:', v: 'Fadenheftung · PUR-Klebebindung · Hardcover' },
        { k: 'Papierbeschaffung:', v: 'Paper Supplier Hub (Mikrometer µm + FSC/PEFC)' },
        { k: 'Logistik & 3D-Palettierung:', v: 'EPAL 1200×800 · Zeitfracht (1,2m) / VVA (1,3m)' },
        { k: 'Kalkulationskern (BPE):', v: 'Deterministisches Server-Ausschießen (:8004)', highlight: true }
      ],
      cardMetricsLabel: 'AKKREDITIERUNGSSTATUS (12/12 MODULE)',
      cardReadyLabel: '100% BEREIT',
      cardMetricsSub: 'Unveränderlicher Snapshot geprüft · Empfang HMAC-SHA256-signierter Aufträge',
      cardButton: 'Meinen Druckbetrieb anbinden ➔',

      // Section 1: Architecture Diagram
      archPill: 'VERNETZTE ÖKOSYSTEM-ARCHITEKTUR',
      archTitle: 'Wie Control Plane Ihren Betrieb mit Verlagen, Autoren und Lieferanten verbindet',
      archSub:
        'Control Plane fungiert als technisches Gehirn Ihrer Druckerei: Es übersetzt Ihre realen Fertigungskapazitäten in Sofortangebote, blockiert fehlerhafte PDFs vor der Vorstufe und automatisiert die 3D-Palettierung.',
      archNodes: [
        {
          step: 'KNOTEN 01 · NACHFRAGE',
          title: 'Verlage, Autoren & API',
          subtitle: 'budget.printprice.pro',
          desc: 'Konfigurieren Auflagen oder senden API-Anfragen mit Endformat, Umfang, Grammatur und Lieferziel.',
          badge: 'PREISANFRAGE'
        },
        {
          step: 'KNOTEN 02 · BPE-KERN (:8004)',
          title: 'Server-Ausschießen & Kalkulation',
          subtitle: 'Book Pricing Engine + SPINE-04',
          desc: 'Prüft die Auflage gegen Ihre Bogenformate (B1/B2/SRA3), Makulaturkurven, CTP-Platten und Stundensätze.',
          badge: 'PREIS + EXAKTER RÜCKEN'
        },
        {
          step: 'KNOTEN 03 · PREFLIGHT & LOGISTIK',
          title: 'PDF-Prüfung + 3D-Palettierung',
          subtitle: 'Preflight Engine + Logistics 3D',
          desc: 'Prüft Anschnitt, TrimBox und CMYK/1-1-Farbraum und berechnet FEFCO 0201-Kartons sowie Euro-EPAL-Paletten.',
          badge: 'GEPRÜFTE DRUCKDATEN'
        },
        {
          step: 'KNOTEN 04 · IHRE BETRIEBSKONSOLE',
          title: 'Fertigungswarteschlange & Versand',
          subtitle: 'control.printprice.pro',
          desc: 'Sie erhalten den bestätigten Auftrag in Incoming Jobs mit gesperrten Spezifikationen, geprüften PDFs und Palettenetikett.',
          badge: 'DRUCKBEREIT'
        }
      ],

      // Section 2: 12-Module Setup Hub
      setupPill: 'GEFÜHRTES 12-MODULE-ONBOARDING (/PRINTHOUSE/SETUP)',
      setupTitle: 'Das umfassendste Einrichtungszentrum der Druckindustrie',
      setupSub:
        'Nach der Registrierung Ihrer Druckerei in Control Plane führt Sie ein strukturierter 12-Panel-Assistent Schritt für Schritt durch die Abbildung Ihrer physischen und kaufmännischen Betriebsrealität.',
      setupTabs: [
        {
          id: 'fleet',
          label: '1. Firma, Standorte & Maschinen (01–04)',
          modules: [
            {
              code: '01 · EINRICHTUNGSÜBERSICHT',
              title: 'Fortschrittsübersicht & Geführter Assistent',
              desc: 'Echtzeit-Fortschrittsanzeige Ihrer Betriebseinrichtung mit Hinweisen auf offene Pflichtfelder und interaktivem Schritt-für-Schritt-Tutorial (GuidedTutorialOverlay).',
              icon: BarChart3
            },
            {
              code: '02 · UNTERNEHMENSPROFIL',
              title: 'Unternehmensprofil, Währung & Zertifikate',
              desc: 'Firmendaten, USt-IdNr., Betriebswährung (EUR), Farbmanagement-Standards (ISO 12647-2 / FOGRA) sowie FSC®- / PEFC-Zertifizierungen.',
              icon: Building2
            },
            {
              code: '03 · PRODUKTIONSSTANDORTE',
              title: 'Produktionsstandorte & Mehrwerk-Steuerung',
              desc: 'Erfassen Sie einen oder mehrere physische Fertigungsstandorte mit Versandkoordinaten, Laderampen, Versandzeiten und eigenen Werkskalendern.',
              icon: Globe
            },
            {
              code: '04 · MASCHINENPARK',
              title: 'Maschinenpark (Druckmaschinen & Weiterverarbeitung)',
              desc: 'Modellieren Sie Bogenoffsetmaschinen (B1, B2, B3), Rollenoffset, Digitaldrucksysteme (Toner / High-Speed Inkjet), Falzmaschinen, Fadenheftung, PUR-Klebebinder und Deckenmaschinen.',
              icon: Cpu
            }
          ]
        },
        {
          id: 'ops',
          label: '2. Fähigkeiten, Papier & Lieferzeiten (05–08)',
          modules: [
            {
              code: '05 · TECHNISCHE FÄHIGKEITEN',
              title: 'Technische Fähigkeiten & Bindungsarten',
              desc: 'Definieren Sie min./max. Buchformate, Rückenbreiten, Bindungsarten (PUR-Broschur, Fadenheftung, Hardcover, Klappenbroschur, Wire-O) und Veredelungen (Kaschierung, UV-Lack, Folienprägung).',
              icon: Wrench
            },
            {
              code: '06 · BEDRUCKSTOFFE & PAPER HUB',
              title: 'Bedruckstoffe & Paper Supplier Hub Anbindung',
              desc: 'Verwalten Sie eigene Hauspapiere oder verknüpfen Sie mit einem Klick Live-Angebote aus dem Paper Supplier Hub inklusive Grammatur (g/m²), Mikrometer-Dicke (µm) und Volumen.',
              icon: Layers
            },
            {
              code: '07 · WERKSKAPAZITÄT & SCHICHTEN',
              title: 'Werkskapazität & Schichtmodelle',
              desc: 'Konfigurieren Sie aktive Schichten pro Standort, tägliche Bogen-/Maschinenstundenlimits und Auslastungsschwellen zur Vermeidung von Engpässen.',
              icon: Sparkles
            },
            {
              code: '08 · PRODUKTIONSLAUFZEITEN',
              title: 'Produktionslaufzeiten (SLAs) nach Produktgruppe',
              desc: 'Hinterlegen Sie Standard- und Express-Arbeitstage je nach Bindungsart (z. B. 5 Tage Digitalbroschur, 10–12 Tage Fadenheftung Hardcover) und Auflagenhöhe.',
              icon: Clock
            }
          ]
        },
        {
          id: 'commercial',
          label: '3. Tarife, 3D-Logistik & Freigabe (09–12)',
          modules: [
            {
              code: '09 · INDUSTRIETARIFE',
              title: 'Industrietarife, Schnellkalibrierung & Simulator',
              desc: 'Kanonischer Fertigungstarif-Editor (rates_json), Schnellkalibrierung nach Produktfamilien, Regelbaukasten für Preisbücher und Live-Kalkulationssimulator.',
              icon: Tag
            },
            {
              code: '10 · VERSAND & 3D-PALETTIERUNG',
              title: 'Logistikmatrix, Speditionen & 3D-EPAL-Palettierung',
              desc: 'Übernehmen Sie mit 1 Klick die Plattform-Standardmatrix (Dachser, DB Schenker, Raben) oder pflegen Sie eigene Tarife für EPAL-Paletten, FEFCO 0201-Kartons, Stretchfolie und Palettenstaffeln inkl. 3D-Vorschau.',
              icon: Truck
            },
            {
              code: '11 · INTEGRATIONEN & API',
              title: 'MIS- / ERP-Anbindung, Webhooks & JDF',
              desc: 'API-Zugangsdaten mit granularen Scopes, signierte Auftrags-Webhooks und strukturierter Export technischer Auftragstaschen in Ihr MIS/ERP.',
              icon: Terminal
            },
            {
              code: '12 · MARKETPLACE-FREIGABE',
              title: 'Bereitschaftsprüfung & Gesteuerte Akkreditierung',
              desc: 'Prüft automatisch, dass Konto, Maschinenpark und Tarife vollständig sind, und reicht einen unveränderlichen Snapshot zur Freischaltung im Marketplace und BPE ein.',
              icon: ShieldCheck
            }
          ]
        }
      ],

      // Section 3: Daily Operations Console
      opsPill: 'TÄGLICHER DRUCKSAAL-BETRIEB',
      opsTitle: 'Die 6 Betriebsmodule für die tägliche Steuerung Ihrer Druckerei',
      opsSub:
        'Nach dem Onboarding wird Control Plane zu Ihrer täglichen Leitstelle für den Auftragseingang, die Druckdatenprüfung, die Maschinenplanung und die Margenkontrolle.',
      opsCards: [
        {
          badge: 'MODUL 01 · /DASHBOARD & /INTELLIGENCE',
          title: 'Betriebstelemetrie & Intelligence Layer',
          desc: 'Echtzeit-Leitstand mit aktiven Aufträgen, Spezifikationstreue, Prüflatenz und prädiktiver Auslastungsanalyse für Ihren Drucksaal.',
          bullets: [
            'Live-KPIs getrennt nach Produktionsstandorten.',
            'Frühwarnungen bei Warteschlangen-Engpässen oder Dateifehlern.',
            'Umschaltbares Light- / Dark-Theme sowie Compact- / Comfortable-Dichte für Saalmonitore.'
          ],
          icon: BarChart3
        },
        {
          badge: 'MODUL 02 · /JOBS (AUFTRAGSEINGANG)',
          title: 'Zertifizierter Auftragseingang',
          desc: 'Empfangen Sie Produktionsaufträge nach erfolgreicher Warenkorb-Freigabe mit HMAC-SHA256-signierter Kalkulation und festen Spezifikationen.',
          bullets: [
            'Vollständige Auftragstasche: Format, Umfang, Papier (g/m² & µm), SPINE-04-Rückenbreite und Veredelung.',
            'Strikte Kostentrennung: Netto-Fertigungserlös sauber getrennt von Verpackung und Fracht.',
            'Integrierter Korrektur-Workflow (ACTION_REQUIRED) bei Bedarf einer Ersatz-PDF.'
          ],
          icon: Inbox
        },
        {
          badge: 'MODUL 03 · /PREFLIGHT/JOBS',
          title: 'Automatisiertes PDF-Preflight & Umschlaggeometrie',
          desc: 'Automatische Prüfung von Innenteil- und Umschlag-PDFs gegen die offizielle SPINE-04-Geometrie vor der Plattenbelichtung oder Übergabe an das Digital-RIP.',
          bullets: [
            'Prüft TrimBox, BleedBox (+3 mm), Einschlag (15 mm) und Falzbereich (Rastri) bei Hardcover.',
            'Kontrolliert CMYK- / 1-1-Schwarzdruck-Farbräume, Bildauflösung und Schrifteinbettung.',
            'Revisionssichere Nachvollziehbarkeit über evidenceId direkt am Auftrag.'
          ],
          icon: FileSearch
        },
        {
          badge: 'MODUL 04 · /MANUFACTURING',
          title: 'Fertigungswarteschlange & Produktionsstatus',
          desc: 'Steuern Sie den physischen Auftragsdurchlauf von der Vorstufe bis zum Versand mit standardisierten Statusmeldungen an den Verlagskunden.',
          bullets: [
            'Nachvollziehbare Schritte: WARTESCHLANGE → VORSTUFE → IM DRUCK → BUCHBINDEREI → VERSANDT.',
            'Gezielte Zuweisung auf Offset- oder Digitalmaschinen gemäß BPE-Break-Even-Optimierung.',
            'Reduziert manuelle Status-Rückfragen für Ihre Auftragsbearbeitung drastisch.'
          ],
          icon: Cpu
        },
        {
          badge: 'MODUL 05 · /MATERIALS & SUPPLIER HUB',
          title: 'Vernetzte Papierbeschaffung',
          desc: 'Greifen Sie direkt in Control Plane auf den föderierten Papiergroßhandelskatalog zu – mit geprüften Mikrometer-Dicken und Paletten-/Tonnenstaffeln.',
          bullets: [
            'Direkte Synchronisation von Grammatur (70–400 g/m²) und Papierdicke (µm) mit dem Rückenrechner.',
            'Saubere Trennung zwischen Papierpreis ab Lager und regionalen Frachtkosten.',
            'Verhindert falsche Buchrückenbreiten durch ungeprüfte Papier-Volumenfaktoren.'
          ],
          icon: Layers
        },
        {
          badge: 'MODUL 06 · /OPS/MARKETPLACE & /OPS/FINANCIALS',
          title: 'Kaufmännische Steuerung, Finanzen & Audit (/audit)',
          desc: 'Steuern Sie freigeschaltete Produktfamilien im Netzwerk, prüfen Sie Auftragsabrechnungen und nutzen Sie das unveränderliche Sicherheits-Audit-Protokoll.',
          bullets: [
            'Sofortiges Aktivieren oder Pausieren von Produktlinien je nach aktueller Werksauslastung.',
            'Strikte Multi-Tenant-Isolation: Kein Wettbewerber sieht Ihre Tarife oder Maschinenprofile.',
            'Lückenlose Audit-Logs über jede Tarifänderung, Dateifreigabe oder Versandbuchung.'
          ],
          icon: Scale
        }
      ],

      // Section 4: 3D Cubing & Editorial Warehouse Blueprint Showcase
      logPill: '3D-LOGISTIK & VERLAGSAUSLIEFERUNGEN (LOGISTICS-UI-01)',
      logTitle: '3D-EPAL-Palettierung & Konformität für Verlagsauslieferungen',
      logSub:
        'Direkt im Reiter Shipping von Control Plane integriert: Berechnet automatisch das Netto-Buchgewicht (inkl. 1,20 g/cm³ Graupappe und Vorsatz), verpackt in FEFCO 0201-Kartons (≤ 15 kg) und erzeugt das isometrische Palettierschema konform mit Zeitfracht Erfurt, VVA Arvato und Amazon FBA.',
      logFeatures: [
        {
          title: '1-Klick-Standardmatrix oder Eigene Speditionstarife',
          desc: 'Übernehmen Sie mit 1 Klick die Plattform-Standardmatrix (Dachser, DB Schenker, Raben) oder hinterlegen Sie eigene Preise für EPAL-Europaletten (€/Stk), FEFCO-Kartons (€/Stk), Stretchfolie und 1-, 2- sowie 3–5-Paletten-Tarife.'
        },
        {
          title: 'Vorkonfigurierte Profile für Verlagsauslieferungen',
          desc: 'Berücksichtigt automatisch die maximale Gesamthöhe von 1.200 mm (Zeitfracht Medien Erfurt) bzw. 1.300 mm (VVA Arvato Gütersloh), den vorgeschriebenen 30-mm-Randrücksprung (kein Überstand) sowie das 15-kg-Kartonlimit für Amazon FBA.'
        },
        {
          title: 'Vollständiger Schutz Ihrer Druckmarge',
          desc: 'In PrintPrice OS werden Fertigungskosten, Packmittel (Kartons + Paletten + Kantenschutz) und Speditionsfracht strikt getrennt ausgewiesen. Treibstoffzuschläge schmälern niemals Ihre industrielle Druckmarge.'
        }
      ],
      diagramHeader: '3D-ISOMETRISCHES PALETTIERSCHEMA (EUR-EPAL 1200 × 800 MM)',
      diagramBadge: '3D-Isometrie • Verlagsauslieferung-konform',
      diagramLabels: {
        topCardboard: 'Obere Schutzpappe (Deckel)',
        edgeProtector: 'Kantenschutzleisten',
        stretchFoil: 'Stretchfolie (Wicklung)',
        interlockingLayers: 'Buchkartons im Kreuzverband',
        bottomCardboard: 'Untere Graupappe (Zwischenlage)',
        strappingBands: 'Kunststoff-Umreifung (2×2)',
        epalPallet: 'EPAL-Europalette',
        maxHeight: 'max. Gesamthöhe'
      },
      diagramKpis: [
        { title: 'EPAL-Standardgrundfläche', val: '1.200 × 800 mm (0,4 LDM)' },
        { title: 'Kreuzverband-Stapelung', val: 'FEFCO 0201 Lagen versetzt' },
        { title: 'Max. Gesamthöhe', val: '1.200 mm (Zeitfracht) / 1.300 mm (VVA)' },
        { title: 'Randrücksprung: 30 mm', val: 'Kein Überstand • 30 mm Rücksprung' }
      ],
      carrierProtocolCard: {
        badge: 'TRANSPORT-GOVERNANCE · PPOS-LOG-SLA-2026.1',
        title: 'Speditions-Integrationsprotokoll & Transport-Servicebedingungen',
        desc: 'Verbindlicher Betriebsstandard für Speditionen im PrintPriceOS-Fertigungsnetzwerk: 0,40 LDM / EPAL-Europalette (1.850 kg/LDM, nicht stapelbar im Transit), verbindliche Zeitfensterbuchung (Avis) bei Verlagsauslieferungen (Zeitfracht Erfurt GLN 4026635000006 & VVA Arvato Gütersloh GLN 4002693000002), 14-Tage-EPAL-Palettenschein (15,00 EUR Ausgleichsgebühr) sowie GS1-128 SSCC-18 Scanpflicht.',
        linkLabel: 'Offizielles Transportprotokoll öffnen ➔',
        linkHref: 'https://docs.printprice.pro/docs/logistics/carrier-service-protocol'
      },

      // Section 5: 6 Strategic Benefits
      benPill: 'WETTBEWERBSVORTEILE FÜR IHREN BETRIEB',
      benBadgePrefix: 'VORTEIL',
      benTitle: 'Warum moderne Druckereien mit Control Plane arbeiten',
      benCards: [
        {
          title: 'Kein Zeitverlust durch manuelle Angebotskalkulation',
          desc: 'Der BPE-Rechenkern kalkuliert in Millisekunden anhand Ihrer realen Maschinengeschwindigkeiten, Rüstzeiten, Bogenformate und Makulaturkurven – auch bei komplexen Auflagenstaffeln.'
        },
        {
          title: 'Druckfertige PDFs direkt für die Plattenbelichtung',
          desc: 'Schluss mit fehlendem Anschnitt, falschen Rückenbreiten oder RGB-Bildern. Kunden korrigieren und validieren ihre Daten im Preflight, bevor der Auftrag bei Ihnen eingeht.'
        },
        {
          title: 'Automatischer Digital- vs. Offset-Wechselpunkt',
          desc: 'Hinterlegen Sie sowohl Digitaldrucksysteme als auch Bogenoffsetmaschinen: Das System wählt für jede Auflage automatisch Ihre wirtschaftlichste Produktionslinie.'
        },
        {
          title: 'Absolute Vertraulichkeit Ihrer Kostenstrukturen',
          desc: 'Ihre Maschinenstundensätze, Plattenkosten und Papierkonditionen sind durch serverseitige Multi-Tenant-Isolation geschützt. Auftraggeber sehen nur den Endpreis.'
        },
        {
          title: 'Qualifizierte nationale & internationale Aufträge',
          desc: 'Gewinnen Sie Verlage und Self-Publisher, die geprüfte Industriekapazität suchen – inklusive automatischer Frachtberechnung in über 25 europäische Länder.'
        },
        {
          title: 'Keine Einstiegsgebühren oder Vertragsbindung',
          desc: 'Registrieren Sie Ihren Betrieb, modellieren Sie Ihren Maschinenpark und testen Sie Preissimulationen intern, bevor Sie die Freischaltung für den Marketplace beantragen.'
        }
      ],

      // Section 6: FAQ
      faqPill: 'HÄUFIGE FRAGEN VON BETRIEBSLEITERN',
      faqHeading: 'Klare Antworten zu Sicherheit, Kalkulationshoheit und Betrieb',
      faqs: [
        {
          q: 'Wer berechnet die Angebote und wo liegen meine Kostenmatrizen?',
          a: 'Alle Berechnungen erfolgen ausschließlich serverseitig im Book Pricing Engine (:8004) auf Basis der Maschinenprofile, Ausschießregeln, Makulaturkurven und Tarife (rates_json), die Sie in Control Plane pflegen. Formeln oder Einzelkosten werden niemals im Browser offengelegt.'
        },
        {
          q: 'Können andere Druckereien meine Tarife, Maschinen oder Papierrabatte einsehen?',
          a: 'Niemals. Control Plane erzwingt strikte Mandantentrennung (Multi-Tenant Isolation) und rollenbasierte Zugriffsrechte (RBAC: PRINTHOUSE_ADMIN, PRINTHOUSE_OPERATOR, VIEWER). Ihre technischen und kaufmännischen Daten bleiben zu 100 % vertraulich.'
        },
        {
          q: 'Was passiert, wenn ein Kunde eine Umschlag-PDF mit falscher Rückenbreite hochlädt?',
          a: 'Das System erkennt die Abweichung vor der Übergabe an Ihre Vorstufe. Da der offizielle Rückenrechner (SPINE-04) die exakte Stärke aus den geprüften Mikrometern (µm) des gewählten Papiers und der Bindungsart berechnet, erhalten Grafiker von Anfang an exakte Umschlagmaße.'
        },
        {
          q: 'Wie funktioniert die Logistikeinrichtung, wenn wir mit eigenen Speditionen fahren?',
          a: 'Im Modul Shipping können Sie mit 1 Klick die Plattform-Standardmatrix übernehmen oder Ihre eigenen Tarife für EPAL-Paletten, FEFCO-Kartons und Palettenstaffeln Ihrer Hausspedition bzw. Ihres eigenen Fuhrparks hinterlegen.'
        }
      ],

      // Final CTA
      finalSlogan: 'CONTROL PLANE · PRINTHOUSE HUB',
      finalTitle: 'Digitalisieren Sie Kalkulation, Preflight und 3D-Logistik Ihrer Druckerei',
      finalDesc:
        'Erstellen Sie Ihr Betriebskonto in Control Plane, durchlaufen Sie das geführte 12-Module-Onboarding und empfangen Sie geprüfte Produktionsaufträge.',
      finalBtnPrimary: 'Druckerei jetzt registrieren ➔',
      finalBtnSecondary: 'Mit Produktionstechnik sprechen ➔'
    }
  };

  const t = content[locale] || content.es;
  const activeTabGroup = t.setupTabs[activeSetupGroup] || t.setupTabs[0];

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* 1. HERO PLATFORM WITH LIVE PLANT CONSOLE CARD */}
      <HeroPlatform
        variant="particles"
        label={t.heroLabel}
        title={t.heroTitle}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{
          label: t.ctaPrimary,
          href: 'https://control.printprice.pro/printhouse/register',
          sublabel: t.badgeNote
        }}
        secondaryAction={{
          label: t.ctaSecondary,
          href: '#ecosystem-architecture'
        }}
        rightContent={
          <div
            className="rounded-card"
            style={{
              background: 'rgba(18, 18, 21, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '1.5rem',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 36px rgba(229, 57, 53, 0.08)',
              maxWidth: '470px',
              width: '100%',
              marginLeft: 'auto'
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '0.75rem',
                marginBottom: '0.9rem',
                borderBottom: '1px solid var(--border-color)'
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.08em'
                }}
              >
                {t.cardHeader}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '999px',
                  background: 'rgba(34, 197, 94, 0.14)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                {t.cardStatus}
              </span>
            </div>

            <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
              {t.cardTitle}
            </div>

            {/* Spec Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.8rem' }}>
              {t.cardRows.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '0.75rem',
                    paddingBottom: '0.45rem',
                    borderBottom: idx < t.cardRows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>{row.k}</span>
                  <span
                    style={{
                      fontWeight: 600,
                      textAlign: 'right',
                      color: row.highlight ? '#ff6b6b' : 'var(--text-primary)',
                      fontFamily: row.highlight ? 'var(--font-mono)' : 'inherit',
                      fontSize: row.highlight ? '0.76rem' : '0.8rem'
                    }}
                  >
                    {row.v}
                  </span>
                </div>
              ))}
            </div>

            {/* Accreditation Status Box */}
            <div
              style={{
                marginTop: '0.95rem',
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: '#22c55e',
                    letterSpacing: '0.06em'
                  }}
                >
                  {t.cardMetricsLabel}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#22c55e', fontFamily: 'var(--font-mono)' }}>
                  {t.cardReadyLabel}
                </span>
              </div>
              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                  marginBottom: '0.45rem'
                }}
              >
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #dc0000 0%, #22c55e 100%)' }} />
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                {t.cardMetricsSub}
              </div>
              <a
                href="https://control.printprice.pro/printhouse/register"
                className="btn-primary"
                style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.82rem' }}
              >
                {t.cardButton}
              </a>
            </div>
          </div>
        }
      />

      {/* 2. ECOSYSTEM ARCHITECTURE DIAGRAM (4 CONNECTED NODES) */}
      <section
        id="ecosystem-architecture"
        style={{
          padding: 'clamp(4rem, 7vw, 5.5rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="pill-badge">{t.archPill}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.6rem)', marginBottom: '0.75rem' }}>
              {t.archTitle}
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t.archSub}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))',
              gap: '1.25rem',
              alignItems: 'stretch'
            }}
          >
            {t.archNodes.map((node, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  padding: '1.65rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: i === 3 ? '1px solid rgba(229, 57, 53, 0.45)' : undefined
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.85rem'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: 'var(--accent-primary)',
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {node.step}
                    </span>
                    <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {node.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      marginBottom: '0.8rem'
                    }}
                  >
                    {node.subtitle}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.1rem' }}>
                    {node.desc}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      background: i === 3 ? 'rgba(34, 197, 94, 0.14)' : 'var(--accent-container)',
                      color: i === 3 ? '#22c55e' : 'var(--accent-primary)'
                    }}
                  >
                    {node.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    0{i + 1}/04
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE 12-MODULE PRINTHOUSE SETUP HUB (/PRINTHOUSE/SETUP) */}
      <Section showGrid={false} id="printhouse-setup-hub">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="pill-badge">{t.setupPill}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.6rem)', marginBottom: '0.75rem' }}>
              {t.setupTitle}
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t.setupSub}
            </p>
          </div>

          {/* Interactive 3-Phase Tab Switcher */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >
            {t.setupTabs.map((tab, idx) => {
              const isActive = activeSetupGroup === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSetupGroup(idx)}
                  style={{
                    padding: '0.7rem 1.25rem',
                    borderRadius: '999px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    background: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 8px 24px rgba(229, 57, 53, 0.3)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 4 Cards for Selected Setup Group */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {activeTabGroup.modules.map((mod, idx) => {
              const IconComp = mod.icon;
              return (
                <div key={idx} className="rounded-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'var(--accent-container)',
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconComp size={20} strokeWidth={1.85} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: 'var(--accent-primary)',
                        letterSpacing: '0.06em',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {mod.code}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', lineHeight: 1.3 }}>
                    {mod.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. 3D CUBING & EDITORIAL WAREHOUSE BLUEPRINT SHOWCASE (LOGISTICS-UI-01) */}
      <section
        id="logistics-3d-blueprint"
        style={{
          padding: 'clamp(4rem, 7vw, 5.5rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="pill-badge">{t.logPill}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.55rem)', marginBottom: '0.75rem' }}>
              {t.logTitle}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t.logSub}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
              gap: '1.75rem',
              alignItems: 'center'
            }}
          >
            {/* Left Column: 3 Logistics & Editorial Compliance Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {t.logFeatures.map((feat, idx) => (
                <div key={idx} className="rounded-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 700 }}>{feat.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Live Isometric 3D EUR-EPAL Pallet Diagram (from Control Plane ShippingPanel) */}
            <div
              className="rounded-card"
              style={{
                padding: '1.35rem',
                background: '#14171f',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              {/* Top Bar */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem',
                  paddingBottom: '0.75rem',
                  marginBottom: '0.85rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#dc0000',
                      display: 'inline-block'
                    }}
                  />
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.06em', color: '#f4f4f5' }}>
                    {t.diagramHeader}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.18rem 0.5rem',
                    borderRadius: '6px',
                    background: '#1e222d',
                    color: '#a1a1aa',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {t.diagramBadge}
                </span>
              </div>

              {/* Isometric SVG Blueprint */}
              <div
                style={{
                  borderRadius: '10px',
                  background: '#191d26',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '0.5rem',
                  marginBottom: '0.9rem',
                  overflow: 'hidden'
                }}
              >
                <svg
                  viewBox="0 0 880 430"
                  style={{ width: '100%', height: 'auto', maxHeight: '310px', display: 'block' }}
                  role="img"
                  aria-label={t.diagramHeader}
                >
                  <defs>
                    <pattern id="isoGridPrinthouse" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#262b38" strokeWidth="0.7" />
                    </pattern>
                    <linearGradient id="cartonLeftFacePh" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#9c8468" />
                      <stop offset="100%" stopColor="#806a50" />
                    </linearGradient>
                    <linearGradient id="cartonRightFacePh" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8b7357" />
                      <stop offset="100%" stopColor="#6e5941" />
                    </linearGradient>
                    <linearGradient id="topLidGradPh" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#9ca3af" />
                      <stop offset="100%" stopColor="#6b7280" />
                    </linearGradient>
                  </defs>

                  <rect x="8" y="8" width="864" height="414" fill="url(#isoGridPrinthouse)" stroke="#2e3444" strokeWidth="1" />

                  {/* EPAL Base */}
                  <polygon points="260,295 405,375 405,402 260,322" fill="#2d333f" stroke="#94a3b8" strokeWidth="1.2" />
                  <polygon points="405,375 615,260 615,287 405,402" fill="#232832" stroke="#94a3b8" strokeWidth="1.2" />
                  <polygon points="260,295 470,180 615,260 405,375" fill="#3b4252" stroke="#cbd5e1" strokeWidth="1.1" />
                  <polygon points="282,315 322,337 322,350 282,328" fill="#111318" stroke="#64748b" strokeWidth="0.8" />
                  <polygon points="348,351 388,373 388,386 348,364" fill="#111318" stroke="#64748b" strokeWidth="0.8" />
                  <polygon points="435,365 488,336 488,350 435,379" fill="#111318" stroke="#64748b" strokeWidth="0.8" />
                  <polygon points="528,314 580,285 580,299 528,328" fill="#111318" stroke="#64748b" strokeWidth="0.8" />
                  <ellipse cx="416" cy="382" rx="11" ry="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="416" y="385" textAnchor="middle" fill="#e2e8f0" fontSize="6.5" fontWeight="bold">EPAL</text>
                  <ellipse cx="601" cy="280" rx="11" ry="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="601" y="283" textAnchor="middle" fill="#e2e8f0" fontSize="6.5" fontWeight="bold">EPAL</text>

                  {/* Bottom Cardboard */}
                  <polygon points="268,288 470,177 607,253 405,364" fill="#6b7280" stroke="#d1d5db" strokeWidth="1" />

                  {/* Stacked FEFCO 0201 Cartons */}
                  <polygon points="268,128 405,204 405,364 268,288" fill="url(#cartonLeftFacePh)" stroke="#e5e7eb" strokeWidth="1.2" />
                  <polygon points="405,204 607,93 607,253 405,364" fill="url(#cartonRightFacePh)" stroke="#e5e7eb" strokeWidth="1.2" />

                  {[1, 2, 3, 4].map((layerIdx) => {
                    const yLeft = 128 + layerIdx * 32;
                    const yMid = 204 + layerIdx * 32;
                    const yRight = 93 + layerIdx * 32;
                    return (
                      <g key={layerIdx} stroke="#3f3326" strokeWidth="1.1">
                        <line x1="268" y1={yLeft} x2="405" y2={yMid} />
                        <line x1="405" y1={yMid} x2="607" y2={yRight} />
                      </g>
                    );
                  })}

                  <line x1="472" y1="167" x2="472" y2="199" stroke="#3f3326" strokeWidth="1.1" />
                  <line x1="540" y1="130" x2="540" y2="162" stroke="#3f3326" strokeWidth="1.1" />
                  <line x1="505" y1="181" x2="505" y2="213" stroke="#3f3326" strokeWidth="1.1" />
                  <line x1="568" y1="146" x2="568" y2="178" stroke="#3f3326" strokeWidth="1.1" />
                  <line x1="472" y1="231" x2="472" y2="263" stroke="#3f3326" strokeWidth="1.1" />
                  <line x1="540" y1="194" x2="540" y2="226" stroke="#3f3326" strokeWidth="1.1" />
                  <line x1="505" y1="245" x2="505" y2="277" stroke="#3f3326" strokeWidth="1.1" />
                  <line x1="472" y1="295" x2="472" y2="327" stroke="#3f3326" strokeWidth="1.1" />

                  {/* Top Lid */}
                  <polygon points="268,128 470,17 607,93 405,204" fill="url(#topLidGradPh)" stroke="#f3f4f6" strokeWidth="1.4" />

                  {/* Edge Protectors */}
                  <polygon points="268,128 286,118 286,142 268,152" fill="#b4834e" stroke="#27272a" strokeWidth="1" />
                  <polygon points="268,128 284,137 284,160 268,151" fill="#9a6b3b" stroke="#27272a" strokeWidth="1" />
                  <polygon points="405,204 388,194 405,184 422,194" fill="#c08e57" stroke="#27272a" strokeWidth="1" />
                  <polygon points="405,204 388,194 388,218 405,228" fill="#9a6b3b" stroke="#27272a" strokeWidth="1" />
                  <polygon points="405,204 422,194 422,218 405,228" fill="#855a2f" stroke="#27272a" strokeWidth="1" />
                  <polygon points="607,93 589,83 607,73 607,93" fill="#b4834e" stroke="#27272a" strokeWidth="1" />

                  {/* Strapping Bands */}
                  <line x1="312" y1="313" x2="312" y2="152" stroke="#1f2937" strokeWidth="4" />
                  <line x1="312" y1="152" x2="514" y2="41" stroke="#1f2937" strokeWidth="4" />
                  <line x1="364" y1="341" x2="364" y2="181" stroke="#1f2937" strokeWidth="4" />
                  <line x1="364" y1="181" x2="566" y2="70" stroke="#1f2937" strokeWidth="4" />
                  <line x1="468" y1="329" x2="468" y2="169" stroke="#1f2937" strokeWidth="4" />
                  <line x1="331" y1="93" x2="468" y2="169" stroke="#1f2937" strokeWidth="4" />
                  <line x1="546" y1="286" x2="546" y2="126" stroke="#1f2937" strokeWidth="4" />
                  <line x1="409" y1="50" x2="546" y2="126" stroke="#1f2937" strokeWidth="4" />

                  {/* GS1-128 Label */}
                  <polygon points="318,185 362,210 362,265 318,240" fill="#f8fafc" stroke="#475569" strokeWidth="1.1" />
                  <line x1="323" y1="198" x2="357" y2="217" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="323" y1="206" x2="352" y2="222" stroke="#64748b" strokeWidth="1" />
                  <line x1="323" y1="214" x2="355" y2="232" stroke="#64748b" strokeWidth="1" />
                  <line x1="323" y1="226" x2="357" y2="245" stroke="#0f172a" strokeWidth="2.2" strokeDasharray="2,1" />

                  {/* Red Dimension Callouts */}
                  <line x1="252" y1="330" x2="395" y2="410" stroke="#dc0000" strokeWidth="1.8" />
                  <line x1="260" y1="322" x2="245" y2="335" stroke="#dc0000" strokeWidth="1" />
                  <line x1="405" y1="402" x2="390" y2="415" stroke="#dc0000" strokeWidth="1" />
                  <text x="312" y="386" fill="#ef4444" fontSize="12" fontWeight="bold" transform="rotate(29 312,386)">
                    800 mm
                  </text>

                  <line x1="418" y1="410" x2="625" y2="295" stroke="#dc0000" strokeWidth="1.8" />
                  <line x1="405" y1="402" x2="422" y2="414" stroke="#dc0000" strokeWidth="1" />
                  <line x1="615" y1="287" x2="630" y2="298" stroke="#dc0000" strokeWidth="1" />
                  <text x="518" y="372" fill="#ef4444" fontSize="12" fontWeight="bold" transform="rotate(-29 518,372)">
                    1200 mm
                  </text>

                  <line x1="607" y1="93" x2="652" y2="68" stroke="#dc0000" strokeWidth="1" />
                  <line x1="615" y1="287" x2="652" y2="266" stroke="#dc0000" strokeWidth="1" />
                  <line x1="646" y1="72" x2="646" y2="269" stroke="#dc0000" strokeWidth="1.8" />
                  <polygon points="646,72 642,81 650,81" fill="#dc0000" />
                  <polygon points="646,269 642,260 650,260" fill="#dc0000" />
                  <text x="666" y="175" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 666,175)">
                    &lt;= 1200 mm
                  </text>
                  <text x="682" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 682,175)">
                    {t.diagramLabels.maxHeight}
                  </text>

                  {/* Callout Leader Lines */}
                  <polyline points="415,82 375,42 290,42" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="415" cy="82" r="2.5" fill="#fbbf24" />
                  <text x="284" y="45" textAnchor="end" fill="#f8fafc" fontSize="11" fontWeight="600">
                    {t.diagramLabels.topCardboard}
                  </text>

                  <polyline points="275,134 240,98 195,98" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="275" cy="134" r="2.5" fill="#fbbf24" />
                  <text x="189" y="101" textAnchor="end" fill="#f8fafc" fontSize="11" fontWeight="600">
                    {t.diagramLabels.edgeProtector}
                  </text>

                  <polyline points="274,195 215,195" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="274" cy="195" r="2.5" fill="#fbbf24" />
                  <text x="209" y="198" textAnchor="end" fill="#f8fafc" fontSize="11" fontWeight="600">
                    {t.diagramLabels.stretchFoil}
                  </text>

                  <polyline points="302,250 230,250" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="302" cy="250" r="2.5" fill="#fbbf24" />
                  <text x="224" y="253" textAnchor="end" fill="#f8fafc" fontSize="11" fontWeight="600">
                    {t.diagramLabels.interlockingLayers}
                  </text>

                  <polyline points="270,290 225,302 195,302" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="270" cy="290" r="2.5" fill="#fbbf24" />
                  <text x="189" y="305" textAnchor="end" fill="#f8fafc" fontSize="11" fontWeight="600">
                    {t.diagramLabels.bottomCardboard}
                  </text>

                  <polyline points="546,245 612,320 655,320" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="546" cy="245" r="2.5" fill="#fbbf24" />
                  <text x="662" y="323" textAnchor="start" fill="#f8fafc" fontSize="11" fontWeight="600">
                    {t.diagramLabels.strappingBands}
                  </text>

                  <polyline points="424,386 458,412 505,412" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="424" cy="386" r="2.5" fill="#fbbf24" />
                  <text x="512" y="415" textAnchor="start" fill="#f8fafc" fontSize="11" fontWeight="600">
                    {t.diagramLabels.epalPallet}
                  </text>
                </svg>
              </div>

              {/* 4 KPI Mini Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.6rem'
                }}
              >
                {t.diagramKpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      background: '#1d222d',
                      border: '1px solid rgba(255,255,255,0.07)'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.15rem' }}>
                      {kpi.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>{kpi.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carrier Service Protocol Governance Card */}
          <div
            className="rounded-card"
            style={{
              marginTop: '1.75rem',
              padding: '1.65rem 1.85rem',
              border: '1px solid rgba(220, 0, 0, 0.35)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            <div style={{ flex: '1 1 540px' }}>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.06em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.35rem'
                }}
              >
                {t.carrierProtocolCard.badge}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.45rem' }}>
                {t.carrierProtocolCard.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {t.carrierProtocolCard.desc}
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <a
                href={t.carrierProtocolCard.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.7rem 1.25rem', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>{t.carrierProtocolCard.linkLabel}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. DAILY OPERATIONS CONSOLE (6 CORE WORKSPACE MODULES) */}
      <Section showGrid={false} id="daily-operations">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.25rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="pill-badge">{t.opsPill}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.6rem)', marginBottom: '0.75rem' }}>
              {t.opsTitle}
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t.opsSub}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {t.opsCards.map((card, i) => {
              const IconComp = card.icon;
              return (
                <div
                  key={i}
                  className="rounded-card"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.15rem'
                      }}
                    >
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
                        <IconComp size={22} strokeWidth={1.8} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          color: 'var(--accent-primary)',
                          letterSpacing: '0.06em',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem', lineHeight: 1.3 }}>
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem'
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: '1rem 0 0 0',
                      margin: 0,
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.55rem'
                    }}
                  >
                    {card.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.82rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5
                        }}
                      >
                        <CheckCircle2
                          size={15}
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
        </Container>
      </Section>

      {/* 6. STRATEGIC BENEFITS FOR PRINTHOUSES */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 5.5rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="pill-badge">{t.benPill}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {t.benTitle}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {t.benCards.map((ben, i) => (
              <div key={i} className="rounded-card" style={{ padding: '1.75rem' }}>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {t.benBadgePrefix} 0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.55rem' }}>
                  {ben.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {ben.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. FAQ SECTION */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <span className="pill-badge">{t.faqPill}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)' }}>{t.faqHeading}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {t.faqs.map((faq, i) => (
                <div key={i} className="rounded-card" style={{ padding: '1.6rem 1.85rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.55rem' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. FINAL ACTION CTA */}
      <ActionCTA
        slogan={t.finalSlogan}
        title={t.finalTitle}
        description={t.finalDesc}
        buttonLabel={t.finalBtnPrimary}
        buttonHref="https://control.printprice.pro/printhouse/register"
        secondaryButtonLabel={t.finalBtnSecondary}
        secondaryButtonHref="/contact/partner"
        trackingAction="printhouses_final_cta"
      />
    </main>
  );
}

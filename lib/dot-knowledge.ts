/**
 * Dot Knowledge Base & Trilingual Sales/Info Concierge Engine
 * PrintPrice Pro (corporative)
 *
 * Rules:
 * - Read-only commercial & informational guidance (NO machine calculations or fake mutations).
 * - Trilingual: ES / EN / DE native support.
 * - Sourced strictly from verified ecosystem infrastructure (mcp.printprice.pro, docs.printprice.pro, corporative).
 */

export type SupportedLocale = 'es' | 'en' | 'de';

export interface ChatCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface ConciergeAnswer {
  text: string;
  ctas?: ChatCta[];
  intent: string;
}

/**
 * Detect language from user prompt with fallback to current site locale.
 */
export function detectLocaleFromPrompt(prompt: string, fallbackLocale: string = 'es'): SupportedLocale {
  const text = prompt.toLowerCase();

  const deWords = [
    'hallo', 'guten tag', 'wie', 'was', 'wer', 'warum', 'kann', 'können', 'ich', 'wir', 'ihr',
    'buch', 'bücher', 'auflage', 'druck', 'drucken', 'druckerei', 'druckereien', 'verlag', 'verlage',
    'papier', 'bedruckstoff', 'rücken', 'rückenbreite', 'seiten', 'preise', 'preis', 'kosten',
    'kalkulieren', 'kalkulation', 'verschnitt', 'fracht', 'palette', 'paletten', 'angebot', 'angebote',
    'kontakt', 'vertrieb', 'ki', 'agenten', 'hilfe', 'danke', 'bitte', 'ja', 'nein'
  ];

  const enWords = [
    'hello', 'hi', 'how', 'what', 'who', 'why', 'can', 'could', 'i', 'we', 'you',
    'book', 'books', 'run', 'print', 'printing', 'printers', 'printhouse', 'publisher', 'publishers',
    'paper', 'substrate', 'spine', 'pages', 'price', 'pricing', 'cost', 'quote', 'estimate',
    'calculate', 'calculation', 'freight', 'pallet', 'pallets', 'offers', 'bids',
    'contact', 'sales', 'ai', 'agents', 'help', 'thanks', 'thank you', 'yes', 'no'
  ];

  const esWords = [
    'hola', 'buenas', 'cómo', 'como', 'qué', 'que', 'quién', 'quien', 'por qué', 'puedo', 'puedes', 'yo', 'nosotros',
    'libro', 'libros', 'tirada', 'impresión', 'imprimir', 'imprenta', 'imprentas', 'editorial', 'editoriales',
    'papel', 'sustrato', 'lomo', 'páginas', 'paginas', 'precio', 'precios', 'coste', 'costes', 'cotizar', 'presupuesto',
    'calcular', 'cálculo', 'merma', 'flete', 'palet', 'palés', 'palets', 'ofertas', 'pedido',
    'contacto', 'ventas', 'ia', 'agentes', 'ayuda', 'gracias', 'sí', 'si', 'no'
  ];

  let deScore = 0;
  let enScore = 0;
  let esScore = 0;

  for (const word of deWords) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(text)) deScore += 1;
  }
  for (const word of enWords) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(text)) enScore += 1;
  }
  for (const word of esWords) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(text)) esScore += 1;
  }

  if (deScore > enScore && deScore > esScore) return 'de';
  if (enScore > deScore && enScore > esScore) return 'en';
  if (esScore > deScore && esScore > enScore) return 'es';

  if (fallbackLocale === 'de' || fallbackLocale === 'en' || fallbackLocale === 'es') {
    return fallbackLocale;
  }
  return 'es';
}

/**
 * Deterministic Trilingual Knowledge Matcher
 */
export function resolveConciergeKnowledge(prompt: string, locale: SupportedLocale): ConciergeAnswer {
  const lower = prompt.toLowerCase();

  // 1. CHIP 1 & QUERIES: ¿Qué es PrintPrice Pro? / What is PrintPrice Pro? / Was ist PrintPrice Pro?
  if (
    lower.includes('qué es') ||
    lower.includes('que es') ||
    lower.includes('what is') ||
    lower.includes('was ist') ||
    lower.includes('quiénes sois') ||
    lower.includes('who are you') ||
    lower.includes('plataforma') ||
    lower.includes('about')
  ) {
    if (locale === 'es') {
      return {
        intent: 'what_is_printprice',
        text: `**PrintPrice Pro** es el sistema operativo industrial y marketplace B2B para la fabricación de libros y material gráfico editorial.

Conectamos a **autores, editoriales, talleres de imprenta y distribuidores de papel** sobre un motor determinista:
- **Price it:** Desglose técnico de costes en 5 ejes industriales (*PPOS_5AXIS_BPE_V2*) y punto de cruce Digital vs. Offset ($Q^*$).
- **Fix it:** Preflight técnico de archivos PDF bajo estándar ISO 12647-2 FOGRA39.
- **Print it:** Marketplace transparente para encargar la tirada directamente a la red de talleres homologados.
- **MCP Server:** Acceso directo para modelos y agentes IA (Claude, Cursor, Windsurf, Antigravity).`,
        ctas: [
          { label: 'Calcular mi libro (Budget) ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'Comprobar PDF (Preflight) ↗', href: 'https://preflight.printprice.pro/', external: true },
          { label: 'Explorar Portal MCP ↗', href: 'https://mcp.printprice.pro/', external: true },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'what_is_printprice',
        text: `**PrintPrice Pro** ist das industrielle Betriebssystem und der B2B-Marketplace für die Buchherstellung und den Akzidenzdruck.

Wir verbinden **Autoren, Verlage, Druckereien und Papierlieferanten** über einen deterministischen Rechenkern:
- **Price it:** Technische Kostenzerlegung in 5 Industrieachsen (*PPOS_5AXIS_BPE_V2*) und Digital- vs. Offset-Schnittpunkt ($Q^*$).
- **Fix it:** Technisches PDF-Preflight nach Industriestandard ISO 12647-2 FOGRA39.
- **Print it:** Transparenter Marketplace zur Vergabe von Druckaufträgen an zertifizierte Partnerbetriebe.
- **MCP Server:** Direkter Zugriff für KI-Modelle und autonome Agenten (Claude, Cursor, Windsurf, Antigravity).`,
        ctas: [
          { label: 'Buch kalkulieren (Budget) ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'PDF prüfen (Preflight) ↗', href: 'https://preflight.printprice.pro/', external: true },
          { label: 'MCP-Portal erkunden ↗', href: 'https://mcp.printprice.pro/', external: true },
        ],
      };
    }
    return {
      intent: 'what_is_printprice',
      text: `**PrintPrice Pro** is the industrial operating system and B2B marketplace for book manufacturing and commercial print procurement.

We connect **authors, publishers, printing plants, and paper mills** onto a server-authoritative deterministic engine:
- **Price it:** 5-axis manufacturing cost breakdown (*PPOS_5AXIS_BPE_V2*) and Digital vs. Offset crossover analysis ($Q^*$).
- **Fix it:** Technical 6-axis PDF preflight under ISO 12647-2 FOGRA39 standards.
- **Print it:** Transparent production marketplace connecting validated files to audited partner plants.
- **MCP Server:** Native Model Context Protocol access for AI agents (Claude, Cursor, Windsurf, Antigravity).`,
      ctas: [
        { label: 'Price my book (Budget) ➔', href: 'https://budget.printprice.pro/', external: true },
        { label: 'Inspect PDF (Preflight) ↗', href: 'https://preflight.printprice.pro/', external: true },
        { label: 'Explore MCP Portal ↗', href: 'https://mcp.printprice.pro/', external: true },
      ],
    };
  }

  // 2. CHIP 2: Soy Editorial / Autor (Publishers & Authors)
  if (
    lower.includes('editorial') ||
    lower.includes('autor') ||
    lower.includes('publisher') ||
    lower.includes('author') ||
    lower.includes('verlag') ||
    lower.includes('verlage') ||
    lower.includes('autoren') ||
    lower.includes('autoedici') ||
    lower.includes('self-publish')
  ) {
    if (locale === 'es') {
      return {
        intent: 'publishers_authors',
        text: `**Soluciones para Editoriales y Autores:**

1. **Cálculo instantáneo sin suscripción:** Cotiza cualquier formato de libro (rústica, tapa dura, cosido, fresado PUR) comparando costes reales de papel, planchas CTP, máquina y flete.
2. **Preflight sin sorpresas:** Sube tu PDF para auditar sangrados, resolución de imágenes (300 DPI) y lomo exacto antes de enviar a taller.
3. **Licitación multi-imprenta:** Elige la oferta más competitiva de la red de imprentas adscritas con trazabilidad completa de entrega y calidad garantizada.`,
        ctas: [
          { label: 'Calcular libro en Budget ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'Auditar archivo en Preflight ↗', href: 'https://preflight.printprice.pro/', external: true },
          { label: 'Guía para Editoriales ↗', href: '/for-publishers', external: false },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'publishers_authors',
        text: `**Lösungen für Verlage und Autoren:**

1. **Sofortige Kalkulation ohne Abo:** Kalkulieren Sie Softcover, Hardcover, Fadenheftung oder PUR-Klebebindung mit getrennt ausgewiesenen Papier-, Rüst- und Frachtkosten.
2. **Preflight-Sicherheit:** Überprüfen Sie Ihr Druck-PDF auf Beschnitt, 300 DPI und exakte Buchrückengeometrie vor dem Maschinendurchlauf.
3. **Multi-Druckerei-Angebote:** Erhalten Sie verbindliche Angebote aus dem Partnernetzwerk mit vollständiger Termin- und Qualitätskontrolle.`,
        ctas: [
          { label: 'Buch in Budget kalkulieren ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'PDF im Preflight prüfen ↗', href: 'https://preflight.printprice.pro/', external: true },
          { label: 'Verlagsleitfaden ↗', href: '/for-publishers', external: false },
        ],
      };
    }
    return {
      intent: 'publishers_authors',
      text: `**Solutions for Publishers and Authors:**

1. **Instant calculation without subscriptions:** Price softcover, hardcover, sewn, or PUR-bound books with itemized paper, plate, machine time, and freight costs.
2. **Guaranteed PDF Preflight:** Inspect bleeds, 300 DPI resolution, and exact spine bulk before sending files to the pressroom.
3. **Multi-plant Marketplace:** Compare verified bids from networked print plants with end-to-end delivery tracking and SLA compliance.`,
      ctas: [
        { label: 'Price book in Budget ➔', href: 'https://budget.printprice.pro/', external: true },
        { label: 'Inspect file in Preflight ↗', href: 'https://preflight.printprice.pro/', external: true },
        { label: 'Guide for Publishers ↗', href: '/for-publishers', external: false },
      ],
    };
  }

  // 3. CHIP 3: Soy Imprenta / Papelera (Printers & Paper Suppliers)
  if (
    lower.includes('imprenta') ||
    lower.includes('taller') ||
    lower.includes('papelera') ||
    lower.includes('proveedor de papel') ||
    lower.includes('printhouse') ||
    lower.includes('printer') ||
    lower.includes('paper mill') ||
    lower.includes('paper supplier') ||
    lower.includes('druckerei') ||
    lower.includes('druckereien') ||
    lower.includes('papierhändler') ||
    lower.includes('papierhersteller')
  ) {
    if (locale === 'es') {
      return {
        intent: 'printers_suppliers',
        text: `**Infraestructura para Talleres de Imprenta y Proveedores de Papel:**

- **Para Imprentas (Control Plane):** Conecta tu parque de maquinaria (offset y digital), calibra tus tarifas horarias y márgenes por familia de producto, y recibe trabajos ya prechequeados listos para plancha o RIP.
- **Para Distribuidores de Papel (Paper Hub):** Publica y sincroniza tu catálogo de sustratos, gramajes, calibres en micras y tarifas oficiales en tiempo real para que miles de compradores coticen con tus papeles.`,
        ctas: [
          { label: 'Acceder a Control Plane ➔', href: 'https://control.printprice.pro/', external: true },
          { label: 'Documentación Paper Supplier Hub ↗', href: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub', external: true },
          { label: 'Afiliar mi Taller a la Red ↗', href: '/contact/partner', external: false },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'printers_suppliers',
        text: `**Infrastruktur für Druckereien und Papiergroßhändler:**

- **Für Druckereien (Control Plane):** Binden Sie Ihren Maschinenpark (Offset & Digital) an, kalibrieren Sie Stundensätze und Deckungsbeiträge und erhalten Sie fehlerfreie, preflight-geprüfte Aufträge.
- **Für Papierhändler (Paper Hub):** Veröffentlichen und synchronisieren Sie Ihre Papiersorten, Grammaturen, Dicken in Mikrometer und Preise in Echtzeit im zentralen Hub.`,
        ctas: [
          { label: 'Control Plane Login ➔', href: 'https://control.printprice.pro/', external: true },
          { label: 'Paper Hub Dokumentation ↗', href: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub', external: true },
          { label: 'Partnerdruckerei werden ↗', href: '/contact/partner', external: false },
        ],
      };
    }
    return {
      intent: 'printers_suppliers',
      text: `**Infrastructure for Printing Plants and Paper Suppliers:**

- **For Printers (Control Plane):** Connect your offset and digital equipment, calibrate hourly press rates and target margins, and receive pre-audited, press-ready jobs directly into your schedule.
- **For Paper Suppliers (Paper Hub):** Publish and synchronize your master catalog, grammages, certified caliper in microns, and pricing tiers in real time.`,
      ctas: [
        { label: 'Access Control Plane ➔', href: 'https://control.printprice.pro/', external: true },
        { label: 'Paper Supplier Hub Docs ↗', href: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub', external: true },
        { label: 'Join Print Partner Network ↗', href: '/contact/partner', external: false },
      ],
    };
  }

  // 4. CHIP 4 & MCP QUERIES: Agentes IA y MCP (AI Agents & Model Context Protocol)
  if (
    lower.includes('mcp') ||
    lower.includes('agente') ||
    lower.includes('agent') ||
    lower.includes('cursor') ||
    lower.includes('claude') ||
    lower.includes('windsurf') ||
    lower.includes('antigravity') ||
    lower.includes('model context protocol') ||
    lower.includes('llm') ||
    lower.includes('llms.txt') ||
    lower.includes('@ppos/mcp-server')
  ) {
    if (locale === 'es') {
      return {
        intent: 'ai_agents_mcp',
        text: `**Servidor Oficial Model Context Protocol (@ppos/mcp-server v1.1.0):**

Permite a agentes de IA interactuar de forma determinista con el motor industrial de PrintPrice OS:
- **10 Herramientas MCP:** Catálogo de papel bilingüe, estimador 5 ejes BPE, geometría de lomo SPINE-01, cubicaje 3D en palets EPAL, imposición en pliego y preflight PDF de 6 ejes.
- **4 Live Resources:** Sustratos, perfiles de encuadernación, normativas de almacén y capacidades preflight.
- **Conexión Remota Streamable HTTP:** \`https://mcp.printprice.pro/mcp\`
- **Ejecución Local stdio:** \`npx -y github:PrintPriceOS/ppos-mcp-server#v1.1.0\``,
        ctas: [
          { label: 'Explorar Portal MCP ➔', href: 'https://mcp.printprice.pro/', external: true },
          { label: 'Guía de Integración y Agent Skill ↗', href: 'https://docs.printprice.pro/docs/api/mcp-server-and-skills', external: true },
          { label: 'Ver Manifiesto llms.txt ↗', href: 'https://mcp.printprice.pro/llms.txt', external: true },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'ai_agents_mcp',
        text: `**Offizieller Model Context Protocol Server (@ppos/mcp-server v1.1.0):**

Ermöglicht KI-Agenten die direkte, deterministische Anbindung an die industrielle PrintPrice OS Engine:
- **10 MCP Tools:** Papierkatalog, 5-Achsen-Kalkulation BPE, Buchrückengeometrie SPINE-01, 3D-EPAL-Palettierung, Bogenmontage und 6-Achsen-PDF-Preflight.
- **4 Live Resources:** Papiere, Buchbindeprofile, Lagerhaus-Docks und Preflight-Matrix.
- **Remote Streamable HTTP:** \`https://mcp.printprice.pro/mcp\`
- **Lokale stdio-Ausführung:** \`npx -y github:PrintPriceOS/ppos-mcp-server#v1.1.0\``,
        ctas: [
          { label: 'MCP-Portal erkunden ➔', href: 'https://mcp.printprice.pro/', external: true },
          { label: 'Integrationsanleitung & Agent Skill ↗', href: 'https://docs.printprice.pro/docs/api/mcp-server-and-skills', external: true },
          { label: 'Manifest llms.txt ansehen ↗', href: 'https://mcp.printprice.pro/llms.txt', external: true },
        ],
      };
    }
    return {
      intent: 'ai_agents_mcp',
      text: `**Official Model Context Protocol Server (@ppos/mcp-server v1.1.0):**

Enables AI agents to interact directly and deterministically with PrintPrice OS industrial engines:
- **10 MCP Tools:** Bilingual substrate search, 5-axis BPE pricing, SPINE-01 spine calculation, 3D EPAL pallet cubing, press imposition, and 6-axis PDF preflight.
- **4 Live Resources:** Paper catalog, binding profiles, warehouse dock rules, and preflight capabilities.
- **Remote Streamable HTTP:** \`https://mcp.printprice.pro/mcp\`
- **Local stdio Execution:** \`npx -y github:PrintPriceOS/ppos-mcp-server#v1.1.0\``,
      ctas: [
        { label: 'Explore MCP Portal ➔', href: 'https://mcp.printprice.pro/', external: true },
        { label: 'Integration Guide & Agent Skill ↗', href: 'https://docs.printprice.pro/docs/api/mcp-server-and-skills', external: true },
        { label: 'View llms.txt Manifest ↗', href: 'https://mcp.printprice.pro/llms.txt', external: true },
      ],
    };
  }

  // 5. SOLICITUD DE CÁLCULO / PRESUPUESTO (Regla Inviolable: NO simular ni ejecutar cálculos de máquina)
  if (
    lower.includes('calcular') ||
    lower.includes('calcula') ||
    lower.includes('presupuesto') ||
    lower.includes('cotizar') ||
    lower.includes('cotiza') ||
    lower.includes('1.000') ||
    lower.includes('1000') ||
    lower.includes('tirada') ||
    lower.includes('ejemplares') ||
    lower.includes('copies') ||
    lower.includes('quote') ||
    lower.includes('kalkulieren') ||
    lower.includes('kalkuliere') ||
    lower.includes('kalkulation') ||
    lower.includes('cost') ||
    lower.includes('cuánto cuesta') ||
    lower.includes('how much') ||
    lower.includes('wieviel')
  ) {
    if (locale === 'es') {
      return {
        intent: 'calculate_quote_redirect',
        text: `Como **guía comercial**, no ejecuto cálculos directos en esta ventana de chat para garantizar que tus costes se resuelvan con precisión estricta.

Para obtener el presupuesto técnico de tu tirada con tarifas actualizadas de papel en kilogramos, planchas CTP, puesta a punto, horas de máquina y flete segregado, utiliza el módulo oficial **Price it (Budget Engine)**:`,
        ctas: [
          { label: 'Abrir Calculador en Vivo (Budget) ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'Conectar vía MCP Server (Cursor/Claude) ↗', href: 'https://mcp.printprice.pro/', external: true },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'calculate_quote_redirect',
        text: `Als **Vertriebsberater** führe ich in diesem Chat-Fenster keine direkten Maschinenberechnungen durch, um höchste mathematische Präzision zu gewährleisten.

Für eine exakte Produktionskalkulation mit aktuellen Kilopreisen für Bedruckstoffe, CTP-Druckplatten, Rüstzeiten, Maschinenstundensätzen und getrenntem Frachtausweis nutzen Sie bitte das offizielle Modul **Price it (Budget Engine)**:`,
        ctas: [
          { label: 'Live-Kalkulator öffnen (Budget) ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'Über MCP Server anbinden ↗', href: 'https://mcp.printprice.pro/', external: true },
        ],
      };
    }
    return {
      intent: 'calculate_quote_redirect',
      text: `As your **commercial concierge**, I do not perform machine calculations directly inside this chat window to ensure absolute mathematical precision.

To get an authoritative manufacturing estimate with live paper kg rates, CTP plates, make-ready, press hours, and segregated EPAL freight, please use the official **Price it (Budget Engine)**:`,
      ctas: [
        { label: 'Open Live Calculator (Budget) ➔', href: 'https://budget.printprice.pro/', external: true },
        { label: 'Connect via MCP Server (Cursor/Claude) ↗', href: 'https://mcp.printprice.pro/', external: true },
      ],
    };
  }

  // 6. SOLICITUD DE PREFLIGHT / AUDITORÍA PDF
  if (
    lower.includes('pdf') ||
    lower.includes('preflight') ||
    lower.includes('sangrado') ||
    lower.includes('bleed') ||
    lower.includes('beschnitt') ||
    lower.includes('cmyk') ||
    lower.includes('dpi') ||
    lower.includes('fogra')
  ) {
    if (locale === 'es') {
      return {
        intent: 'preflight_pdf_redirect',
        text: `El motor **Fix it (Preflight)** audita archivos PDF bajo 6 ejes normativos (ISO 12647-2 FOGRA39, sangrados de 3/5/15 mm, cobertura TAC hasta 300% y resolución efectiva a 300 DPI) con capacidad de autorreparación automática (*MAGIC_FIX*).

Puedes cargar tu archivo directamente en el portal de Preflight para recibir el informe técnico certificado:`,
        ctas: [
          { label: 'Comprobar mi PDF en Preflight ➔', href: 'https://preflight.printprice.pro/', external: true },
          { label: 'Documentación del Motor Preflight ↗', href: 'https://docs.printprice.pro/docs/engines/preflight-engine', external: true },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'preflight_pdf_redirect',
        text: `Die **Fix it (Preflight)** Engine prüft Druck-PDFs nach 6 technischen Industrieachsen (ISO 12647-2 FOGRA39, 3/5/15 mm Beschnitt, Farbauftrag TAC bis 300% und 300 DPI Auflösung) mit automatischer Korrektur (*MAGIC_FIX*).

Laden Sie Ihre Datei direkt im Preflight-Portal hoch, um einen zertifizierten Prüfbericht zu erhalten:`,
        ctas: [
          { label: 'PDF im Preflight prüfen ➔', href: 'https://preflight.printprice.pro/', external: true },
          { label: 'Preflight-Dokumentation ↗', href: 'https://docs.printprice.pro/docs/engines/preflight-engine', external: true },
        ],
      };
    }
    return {
      intent: 'preflight_pdf_redirect',
      text: `The **Fix it (Preflight)** engine audits PDF files across 6 strict industrial axes (ISO 12647-2 FOGRA39, 3/5/15 mm bleed boundaries, TAC ink coverage up to 300%, and 300 DPI resolution) with automated *MAGIC_FIX* repair.

You can upload your PDF directly to the Preflight service for an immediate certified inspection:`,
      ctas: [
        { label: 'Inspect my PDF in Preflight ➔', href: 'https://preflight.printprice.pro/', external: true },
        { label: 'Preflight Engine Documentation ↗', href: 'https://docs.printprice.pro/docs/engines/preflight-engine', external: true },
      ],
    };
  }

  // 7. GEOMETRÍA DE LOMO (SPINE-01)
  if (
    lower.includes('lomo') ||
    lower.includes('spine') ||
    lower.includes('rücken') ||
    lower.includes('espesor') ||
    lower.includes('thickness')
  ) {
    if (locale === 'es') {
      return {
        intent: 'spine_geometry',
        text: `El cálculo de lomo en PrintPrice OS se realiza mediante el estándar micrométrico **SPINE-01**, que evalúa el calibre certificado del papel en micras, el número de páginas, el tipo de encuadernación (fresada PUR o cosida) y el hinchamiento físico del hilo.

Puedes resolver el lomo exacto y descargar la plantilla de cubierta en el calculador o a través de la tool MCP \`ppos_calculate_spine_geometry\`:`,
        ctas: [
          { label: 'Calcular Lomo en Budget ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'Especificación de Geometría de Lomo ↗', href: 'https://docs.printprice.pro/docs/api/mcp-server-and-skills', external: true },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'spine_geometry',
        text: `Die Rückenberechnung in PrintPrice OS folgt dem mikrometrischen Standard **SPINE-01**. Er berücksichtigt die tatsächliche Papierdicke in Mikrometern, Seitenzahl, Bindungsart (PUR-Klebebindung oder Fadenheftung) und Steigungszugaben.

Berechnen Sie die exakte Rückenbreite im Budget-Modul oder über das MCP-Tool \`ppos_calculate_spine_geometry\`:`,
        ctas: [
          { label: 'Rückenbreite in Budget berechnen ➔', href: 'https://budget.printprice.pro/', external: true },
          { label: 'Rückengeometrie Spezifikation ↗', href: 'https://docs.printprice.pro/docs/api/mcp-server-and-skills', external: true },
        ],
      };
    }
    return {
      intent: 'spine_geometry',
      text: `Spine calculation in PrintPrice OS is governed by the certified micrometer **SPINE-01** standard. It calculates block thickness from exact paper caliper in microns, page count, binding process (milled PUR or section-sewn), and sewing swell compensation.

Calculate your exact spine width and open-cover template in Budget or via the MCP tool \`ppos_calculate_spine_geometry\`:`,
      ctas: [
        { label: 'Calculate Spine in Budget ➔', href: 'https://budget.printprice.pro/', external: true },
        { label: 'Spine Geometry Specifications ↗', href: 'https://docs.printprice.pro/docs/api/mcp-server-and-skills', external: true },
      ],
    };
  }

  // 8. CONTACTO / VENTAS / TARIFAS
  if (
    lower.includes('contacto') ||
    lower.includes('contact') ||
    lower.includes('kontakt') ||
    lower.includes('ventas') ||
    lower.includes('sales') ||
    lower.includes('vertrieb') ||
    lower.includes('precio') ||
    lower.includes('precios') ||
    lower.includes('tarifa') ||
    lower.includes('planes') ||
    lower.includes('subscription') ||
    lower.includes('suscripción')
  ) {
    if (locale === 'es') {
      return {
        intent: 'contact_sales',
        text: `**Modelo Comercial y Soporte:**

En PrintPrice Pro **no exigimos suscripciones obligatorias** a compradores ni autores para cotizar o revisar archivos. Las operaciones en el Marketplace aplican comisiones transparentes por pedido completado, y disponemos de acuerdos marco para editoriales con alto volumen de tirada.

¿Deseas hablar con nuestro equipo comercial o plantear un acuerdo de integración?`,
        ctas: [
          { label: 'Formulario de Contacto / Ventas ➔', href: '/contact', external: false },
          { label: 'Preguntas Frecuentes (FAQ) ↗', href: '/faq', external: false },
        ],
      };
    }
    if (locale === 'de') {
      return {
        intent: 'contact_sales',
        text: `**Vertriebsmodell und Support:**

Bei PrintPrice Pro gibt es **keine verpflichtenden Abonnements** für Kunden und Verlage, um Preise zu kalkulieren oder PDFs zu prüfen. Transaktionen im Marketplace erfolgen auf transparenter Auftragsbasis mit Rahmenvereinbarungen für Großkunden.

Möchten Sie mit unserem Vertriebsteam sprechen oder eine Partnerschaft vereinbaren?`,
        ctas: [
          { label: 'Kontakt- und Anfrageformular ➔', href: '/contact', external: false },
          { label: 'Häufige Fragen (FAQ) ↗', href: '/faq', external: false },
        ],
      };
    }
    return {
      intent: 'contact_sales',
      text: `**Commercial Model & Support:**

PrintPrice Pro requires **no compulsory subscriptions** for buyers or authors to quote jobs or inspect artwork. Marketplace production orders operate on transparent per-job terms, with enterprise volume agreements available for publishers.

Would you like to connect with our enterprise sales and partnerships team?`,
      ctas: [
        { label: 'Contact Sales Team ➔', href: '/contact', external: false },
        { label: 'Frequently Asked Questions (FAQ) ↗', href: '/faq', external: false },
      ],
    };
  }

  // 9. FALLBACK GENERAL CONCIERGE
  if (locale === 'es') {
    return {
      intent: 'general_concierge',
      text: `Estoy aquí para orientarte en todo lo relativo a **PrintPrice Pro**:
- **Price it:** Calculador de libros en 5 ejes con costes desglosados.
- **Fix it:** Auditoría técnica de archivos PDF antes de entrar a máquina.
- **Print it:** Marketplace con talleres de imprenta certificados.
- **MCP Server:** Integración para Cursor, Claude Desktop y agentes autónomos.

¿En qué área o perfil te gustaría profundizar?`,
      ctas: [
        { label: 'Price it (Calculador) ➔', href: 'https://budget.printprice.pro/', external: true },
        { label: 'Portal MCP (Agentes IA) ↗', href: 'https://mcp.printprice.pro/', external: true },
        { label: 'Contactar con el Equipo ↗', href: '/contact', external: false },
      ],
    };
  }
  if (locale === 'de') {
    return {
      intent: 'general_concierge',
      text: `Ich bin Ihr persönlicher Ansprechpartner für alle Module von **PrintPrice Pro**:
- **Price it:** Buchdruck-Kalkulation in 5 Achsen mit transparenten Kosten.
- **Fix it:** Technische PDF-Prüfung vor dem Druck.
- **Print it:** Marketplace mit geprüften Partnerdruckereien.
- **MCP Server:** Schnittstelle für Cursor, Claude Desktop und autonome Agenten.

In welchem Bereich kann ich Sie unterstützen?`,
      ctas: [
        { label: 'Price it (Kalkulator) ➔', href: 'https://budget.printprice.pro/', external: true },
        { label: 'MCP-Portal (KI-Agenten) ↗', href: 'https://mcp.printprice.pro/', external: true },
        { label: 'Kontakt aufnehmen ↗', href: '/contact', external: false },
      ],
    };
  }
  return {
    intent: 'general_concierge',
    text: `I'm here to guide you across the entire **PrintPrice Pro** ecosystem:
- **Price it:** 5-axis book pricing engine with itemized manufacturing breakdown.
- **Fix it:** Automated 6-axis PDF preflight inspection before press run.
- **Print it:** Certified marketplace connecting pre-audited jobs to print shops.
- **MCP Server:** Native integration for Cursor, Claude Desktop, and autonomous agents.

Which area or stakeholder profile would you like to explore?`,
    ctas: [
      { label: 'Price it (Calculator) ➔', href: 'https://budget.printprice.pro/', external: true },
      { label: 'MCP Portal (AI Agents) ↗', href: 'https://mcp.printprice.pro/', external: true },
      { label: 'Contact Team ↗', href: '/contact', external: false },
    ],
  };
}

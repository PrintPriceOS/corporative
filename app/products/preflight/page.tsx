'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { useLocale } from '@/lib/i18n';
import { PenTool, Library, Factory, Zap, Check } from 'lucide-react';

export default function PreflightProductPage() {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'individual' | 'pro'>('individual');

  const texts = {
    es: {
      label: 'PRINTPRICE PREFLIGHT / MOTOR FORENSE DE ARTES FINALES',
      title: 'Comprueba tu PDF antes de imprimir.',
      subheadline: 'Identifica problemas técnicos, entiende qué debes revisar y prepara tu archivo para el siguiente paso.',
      ctaPrimary: 'Comprobar mi PDF ➔',
      ctaSecondary: 'Informe de ejemplo ➔',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      badge: 'PROCESAMIENTO DETERMINISTA EN LA NUBE',

      // Who it's for
      audienceTitle: 'Diseñado para cada etapa de la producción gráfica',
      audienceSubtitle: 'Sin tecnicismos oscuros para creadores independientes; con rigor forense para plantas de impresión.',
      audiences: [
        {
          title: 'Autores y Particulares',
          badge: 'FACILIDAD DE USO',
          desc: 'Comprueba sangrados, márgenes de seguridad y resolución de portada e interior sin necesidad de interpretar códigos de error complejos.',
          icon: PenTool
        },
        {
          title: 'Editoriales y Diseñadores',
          badge: 'CONTROL DE CALIDAD',
          desc: 'Audita colecciones y reediciones completas antes de enviar a imprenta. Detecta fuentes problemáticas, colores RGB y desajustes de lomo.',
          icon: Library
        },
        {
          title: 'Imprentas y Talleres',
          badge: 'RECEPCIÓN DE ARCHIVOS',
          desc: 'Automatiza el filtro de entrada de artes finales. Recibe trabajos con fichas técnicas auditadas y elimina horas de revisión manual en preimpresión.',
          icon: Factory
        },
        {
          title: 'Desarrolladores y Plataformas',
          badge: 'API & WORKFLOWS',
          desc: 'Integra el motor de análisis y corrección automática directamente en tu software editorial, ERP o tienda online mediante API REST.',
          icon: Zap
        }
      ],

      // What it checks
      detectionPill: 'DETECCIÓN TÉCNICA',
      checksTitle: 'Qué comprueba el motor de PrintPrice Preflight',
      checksSubtitle: 'Evaluación determinista basada en estándares ISO y políticas reales de fabricación según perfil.',
      checks: [
        { name: 'Cajas de Página (Geometry)', desc: 'Normalización y verificación geométrica de MediaBox, TrimBox y BleedBox para corte exacto.' },
        { name: 'Sangrado según Perfil', desc: 'Comprobación de sangrado parametrizado según producto y encuadernación (ej. 3 mm en rústica, 5 mm en tapa dura, 0 mm en pliegos técnicos), evitando requisitos universales rígidos.' },
        { name: 'Resolución Efectiva (DPI)', desc: 'Cálculo de la resolución efectiva según tecnología de destino (300 DPI recomendados en color comercial, 150-200 DPI en gran formato o 600-1200 DPI en líneas).' },
        { name: 'Fuentes Tipográficas', desc: 'Detección de fuentes no incrustadas, subconjuntos incompletos o fuentes sintéticas propensas a sustitución.' },
        { name: 'Espacios de Color y Tintas', desc: 'Evaluación del espacio cromático (CMYK, escala de grises, RGB con perfil ICC o tintas directas) según la tecnología de la máquina de destino.' },
        { name: 'Límite de Tinta (TAC / TIC)', desc: 'Medición de la cobertura total de tinta para evitar repintados y problemas de secado según el papel.' },
        { name: 'Transparencias y Capas', desc: 'Identificación de modos de fusión, máscaras suaves y transparencias complejas que requieran gestión en preimpresión.' },
        { name: 'Conformidad con Perfiles PDF/X', desc: 'Comprobación determinista de primitivas según directrices ISO (PDF/X-1a, PDF/X-4). La inspección técnica orientativa no sustituye la certificación completa del RIP del taller.' }
      ],

      // How it works: Detectar, Corregir y Revalidar
      workflowTitle: 'Cómo funciona el análisis: Detectar, Corregir y Revalidar',
      workflowSteps: [
        { step: '01', title: 'Carga y perfil de producción', desc: 'Sube tu PDF y selecciona el perfil de destino (tipo de encuadernación, soporte y tecnología de impresión).' },
        { step: '02', title: 'Detectar (Auditoría Forense)', desc: 'Inspección determinista de cajas de página, fuentes, resolución efectiva, espacios de color y tintas.' },
        { step: '03', title: 'Corregir (Remediación Segura)', desc: 'Aplica ajustes automáticos no destructivos compatibles (normalización de cajas, perfiles de color) sin alterar contenidos.' },
        { step: '04', title: 'Revalidar (Verificación del Resultado)', desc: 'Segunda pasada forense sobre el archivo corregido para confirmar que cumple los parámetros antes de enviar al taller.' }
      ],

      // Corrections & limits
      limitsPill: 'TRANSPARENCIA TÉCNICA',
      limitsTitle: 'Correcciones disponibles y sus límites técnicos',
      limitsSubtitle: 'Transparencia absoluta: qué puede resolver el software y qué requiere intervención en el archivo original.',
      limits: [
        {
          feature: 'Expansión de BleedBox',
          action: 'Ajuste geométrico automático',
          limit: 'El motor amplía los límites de la caja de sangrado en el PDF, pero no sintetiza ni estira la ilustración si el fondo no desborda físicamente el corte.',
          type: 'safe'
        },
        {
          feature: 'Imágenes de Baja Resolución',
          action: 'Detección y señalización exacta',
          limit: 'El software nunca reescala artificialmente imágenes de baja calidad, ya que inventaría píxeles falsos. Requiere sustitución en el archivo original.',
          type: 'warning'
        },
        {
          feature: 'Conversión de Color a CMYK',
          action: 'Conversión técnica estandarizada',
          limit: 'Aplica perfiles de color ISO (Fogra51 / PSO Coated). Los colores muy vivos fuera de la gama CMYK pueden experimentar ligeros cambios tonales.',
          type: 'warning'
        },
        {
          feature: 'Fuentes no Incrustadas',
          action: 'Auditoría de glifos y advertencia',
          limit: 'Si el PDF no contiene las curvas vectoriales de la fuente, el motor no puede inventar el trazado tipográfico. Requiere volver a exportar desde maquetación.',
          type: 'warning'
        }
      ],

      demoPill: 'DEMOSTRACIÓN TÉCNICA',
      demoTitle: 'Informe de ejemplo (Demostración interactiva)',
      demoNotice: 'Extracto real de un análisis sobre un documento de prueba (64 páginas, papel estucado 135 g). Etiquetado explícitamente como muestra técnica.',
      demoReport: {
        docLabel: 'DOCUMENTO: guia_editorial_muestra_v2.pdf',
        status: 'REVISIÓN REQUERIDA',
        sampleBadge: 'Caso de ejemplo demostrativo • Perfil: OFFSET_STANDARD_F51 • 64 págs.',
        riskLabel: 'ÍNDICE DE RIESGO',
        items: [
          {
            level: '[AVISO] SANGRE FALTANTE EN PLIEGO',
            title: 'Páginas 1, 14, 28: La ilustración no sobrepasa la línea de corte',
            category: 'GEOMETRÍA',
            desc: 'La caja TrimBox está definida a 148×210 mm, pero no existe el sangrado perimetral establecido para este perfil de edición (3 mm en los bordes superior y exterior).',
            action: 'Acción: Ajustar fondos en InDesign o expandir BleedBox geométrica',
            color: '#eab308',
            type: 'warning'
          },
          {
            level: '[CRÍTICO] RESOLUCIÓN INSUFICIENTE DE IMAGEN',
            title: "Página 7: 'fotografia_portadilla.jpg' a 172 DPI",
            category: 'IMAGEN',
            desc: 'La imagen se imprimirá con pérdida de nitidez frente al umbral recomendado para este perfil editorial (300 DPI efectivos en cuatricromía).',
            action: 'Límite técnico: No es posible reescalar sin inventar píxeles. Sustituir en maqueta por imagen original de alta calidad.',
            color: '#dc2626',
            type: 'critical'
          },
          {
            level: '[OPTIMIZACIÓN] TEXTO EN NEGRO DE 4 TINTAS (RICH BLACK)',
            title: 'Páginas 12, 19: Texto corrido de 9 pt compuesto en C:60 M:50 Y:50 K:100',
            category: 'TINTA / TAC',
            desc: 'Riesgo de falta de registro en prensa offset para tipografía pequeña.',
            action: 'Corrección automática disponible: Re-mapear texto fino exclusivamente a 100% Black (K).',
            color: '#3b82f6',
            type: 'info'
          }
        ]
      },

      // Comparisons
      compPill: 'ANÁLISIS DOCUMENTAL COMPARATIVO',
      compTitle: 'Comparativa objetiva de soluciones de Preflight',
      compSubtitle: 'Basado en la documentación técnica oficial vigente de cada producto (Revisión: Octubre 2026). Entrega de capacidades contrastadas sin superlativos comerciales.',
      tabIndividual: 'A. Particulares y Editoriales',
      tabPro: 'B. Flujos Profesionales e Imprentas',
      scrollTableHint: '⇄ Desplaza horizontalmente para ver la tabla completa',
      docsLink: 'Consulta la documentación técnica completa del motor Preflight en docs.printprice.pro ➔',

      tableA: {
        criteriaHeader: 'Criterio',
        col1: 'PrintPrice Preflight (Web)',
        col2: 'Adobe Acrobat Pro',
        col3: 'Enfocus PitStop Pro',
        rows: [
          {
            criterion: 'Forma de acceso',
            p1Status: 'Disponible',
            p1Desc: 'Navegador web (SaaS cloud). Acceso mediante cuenta gratuita o enlace mágico.',
            p2Status: 'Disponible',
            p2Desc: 'Escritorio local (macOS / Windows).',
            p3Status: 'Disponible',
            p3Desc: 'Plugin ejecutado dentro de Adobe Acrobat.'
          },
          {
            criterion: 'Instalación requerida',
            p1Status: 'No aplica',
            p1Desc: 'Cero instalación local; funciona en cualquier navegador moderno.',
            p2Status: 'Disponible',
            p2Desc: 'Requiere Acrobat Pro y Adobe Creative Cloud.',
            p3Status: 'Disponible',
            p3Desc: 'Requiere instalación de Acrobat + plugin PitStop.'
          },
          {
            criterion: 'Conocimientos necesarios',
            p1Status: 'Disponible',
            p1Desc: 'Nivel accesible: traduce códigos técnicos a recomendaciones prácticas de maquetación.',
            p2Status: 'Disponible',
            p2Desc: 'Nivel medio/avanzado: requiere conocer cajas de página, perfiles ICC y normas ISO.',
            p3Status: 'Disponible',
            p3Desc: 'Especialista de preimpresión: curvas de aprendizaje altas para crear Action Lists.'
          },
          {
            criterion: 'Lectura del informe',
            p1Status: 'Disponible',
            p1Desc: 'Informe web interactivo con índice de riesgo, páginas afectadas y avisos priorizados.',
            p2Status: 'Disponible',
            p2Desc: 'Panel modal en pantalla con exportación de resultados a PDF o XML.',
            p3Status: 'Disponible',
            p3Desc: 'Navegador interactivo con resaltado directo sobre el objeto gráfico en el visor.'
          },
          {
            criterion: 'Corrección y edición',
            p1Status: 'Depende de edición o configuración',
            p1Desc: 'Reparaciones deterministas (TrimBox, BleedBox, OutputIntent). Sin edición vectorial directa.',
            p2Status: 'Disponible',
            p2Desc: 'Fixups automáticos predefinidos. Edición básica de textos y objetos.',
            p3Status: 'Disponible',
            p3Desc: 'Edición quirúrgica profunda de vectores, textos, trazados y tintas en el propio PDF.'
          },
          {
            criterion: 'Modelo de licencia',
            p1Status: 'Disponible',
            p1Desc: 'Uso individual freemium en web; planes por volumen y API para empresas.',
            p2Status: 'Disponible',
            p2Desc: 'Suscripción mensual o anual a Adobe Creative Cloud o Acrobat Pro.',
            p3Status: 'Disponible',
            p3Desc: 'Suscripción anual o compra de licencia perpetua con mantenimiento.'
          }
        ]
      },

      tableB: {
        dimHeader: 'Dimensión',
        col1: 'PrintPrice Preflight OS',
        col2: 'Enfocus PitStop Server',
        col3: 'callas pdfToolbox Server',
        rows: [
          {
            dimension: 'Perfiles configurables',
            p1Status: 'Disponible',
            p1Desc: 'Perfiles deterministas definidos en contratos JSON (Offset, Digital, PDF/X-4).',
            p2Status: 'Disponible',
            p2Desc: 'Perfiles y Action Lists configurables desde interfaz gráfica de PitStop Pro.',
            p3Status: 'Disponible',
            p3Desc: 'Process Plans con lógica condicional avanzada, JavaScript y perfiles GWG.'
          },
          {
            dimension: 'Estándares y alcance',
            p1Status: 'Disponible',
            p1Desc: 'Evaluación de conformidad ISO 15930 (PDF/X-1a, PDF/X-4) con integración veraPDF.',
            p2Status: 'Disponible',
            p2Desc: 'Validación completa de PDF/X-1a hasta PDF/X-6 y especificaciones Ghent Workgroup.',
            p3Status: 'Disponible',
            p3Desc: 'Motor de referencia oficial para la Ghent Workgroup e ISO (PDF/X, PDF/A, PDF/VT).'
          },
          {
            dimension: 'Procesamiento por lotes',
            p1Status: 'Disponible',
            p1Desc: 'Microservicios asíncronos distribuidos en colas Redis para escalado horizontal.',
            p2Status: 'Disponible',
            p2Desc: 'Motor multihilo optimizado para colas concurrentes en servidores locales.',
            p3Status: 'Disponible',
            p3Desc: 'Motor multinúcleo de alto rendimiento para miles de páginas por minuto.'
          },
          {
            dimension: 'Carpetas calientes (Hot Folders)',
            p1Status: 'No aplica (Nativo web)',
            p1Desc: 'Infraestructura 100% cloud/API. Integrable en red local mediante conectores REST.',
            p2Status: 'Disponible',
            p2Desc: 'Monitorización nativa de carpetas de entrada, éxito y error en redes SMB/NFS.',
            p3Status: 'Disponible',
            p3Desc: 'Monitorización automatizada de carpetas locales y almacenamiento compartido.'
          },
          {
            dimension: 'CLI, SDK o API',
            p1Status: 'Disponible (API REST)',
            p1Desc: 'API REST nativa JSON/multipart (/preflight/analyze, /preflight/autofix).',
            p2Status: 'Disponible (CLI)',
            p2Desc: 'Línea de comandos (CLI) incluida para integración con scripts y Switch.',
            p3Status: 'Disponible (CLI y SDK)',
            p3Desc: 'CLI independiente y SDK de integración nativa (C/C++, Java, .NET, Python).'
          },
          {
            dimension: 'Trazabilidad y original',
            p1Status: 'Disponible',
            p1Desc: 'Preservación estricta del original y hash SHA-256 de auditoría técnica.',
            p2Status: 'Disponible',
            p2Desc: 'El archivo original se mueve a la carpeta de archivo; el reparado se crea aparte.',
            p3Status: 'Disponible',
            p3Desc: 'Políticas de backup y conservación de versiones originales antes de transformar.'
          }
        ]
      },

      privacyTitle: 'Políticas de privacidad y tratamiento de archivos',
      privacyPoints: [
        'Los archivos subidos se procesan en entornos volátiles y aislados exclusivamente para el análisis y la corrección técnica.',
        'Borrado automático de archivos temporales tras la generación del informe o descarga del documento corregido.',
        'Tus archivos nunca se utilizan para entrenar modelos de inteligencia artificial ni se comparten con terceros no autorizados.',
        'Cifrado de extremo a extremo mediante TLS 1.3 tanto en la subida como en el análisis y la descarga.'
      ],

      disclaimerTitle: 'LIMITACIÓN DE RESPONSABILIDAD TÉCNICA',
      disclaimerText: 'PrintPrice Preflight evalúa la conformidad técnica de documentos PDF según las especificaciones del perfil seleccionado. Los resultados no constituyen una certificación universal de imprenta ni sustituyen la corrección editorial, la prueba de color de contrato ni la aprobación final de producción por parte del taller gráfico.',

      faqTitle: 'Preguntas frecuentes sobre Preflight',
      faqs: [
        {
          q: '¿Garantiza el Preflight que mi libro se imprimirá sin ningún error?',
          a: 'No. Ninguna herramienta de software puede otorgar una garantía absoluta. Preflight detecta discrepancias técnicas objetivas frente al perfil seleccionado (sangrados, cajas, resolución, fuentes), pero no valida la redacción del texto, errores ortográficos, decisiones artísticas ni las tolerancias mecánicas de corte de cada taller.'
        },
        {
          q: '¿Por qué la herramienta no amplía automáticamente las imágenes de baja resolución?',
          a: 'Porque ampliar una imagen de baja resolución mediante interpolación artificial inventa información visual y puede producir resultados borrosos o pixelados en papel. La solución correcta es sustituir la imagen en el archivo de diseño por la original en alta resolución (mínimo 300 DPI recomendados).'
        },
        {
          q: '¿Qué ocurre si corrijo el sangrado con la herramienta automática?',
          a: 'La herramienta expande la caja técnica de sangrado (BleedBox) en el documento PDF para que el RIP de la imprenta la reconozca. Sin embargo, si el diseño original tiene fondos blancos pegados al borde, deberás extenderlos en tu programa de maquetación (InDesign, Illustrator, Canva) para evitar filos blancos al guillotinar.'
        },
        {
          q: '¿Cómo se conecta Preflight con el presupuesto (Budget) y la producción?',
          a: 'Las características técnicas que defines al presupuestar en Budget (tamaño de corte, número de páginas, tipo de papel) configuran automáticamente las reglas del Preflight. Al aprobar el archivo, se genera una orden técnica que vincula el archivo validado en preflight con la orden del taller.'
        }
      ]
    },
    en: {
      label: 'PRINTPRICE PREFLIGHT / FORENSIC PREPRESS ENGINE',
      title: 'Check your PDF before printing.',
      subheadline: 'Identify technical issues, understand what needs review, and prepare your file for the next step.',
      ctaPrimary: 'Check my PDF ➔',
      ctaSecondary: 'Sample report ➔',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      badge: 'DETERMINISTIC CLOUD PROCESSING',

      audienceTitle: 'Built for every stage of graphic manufacturing',
      audienceSubtitle: 'Clear guidance for creators; forensic precision for industrial printing plants.',
      audiences: [
        {
          title: 'Authors & Self-Publishers',
          badge: 'EASY TO USE',
          desc: 'Verify bleed, safety margins, and resolution for cover and interior without deciphering complex technical codes.',
          icon: PenTool
        },
        {
          title: 'Publishers & Designers',
          badge: 'QUALITY CONTROL',
          desc: 'Audit entire book series and reprints prior to press. Catch font issues, uncalibrated RGB, and spine alignment mismatches.',
          icon: Library
        },
        {
          title: 'Printers & Production Plants',
          badge: 'INBOUND ASSET GATE',
          desc: 'Automate file intake. Receive press-ready PDF packages with technical audit sheets, eliminating manual prepress triage.',
          icon: Factory
        },
        {
          title: 'Developers & Platforms',
          badge: 'API & WORKFLOWS',
          desc: 'Embed forensic PDF analysis and automatic remediation directly into publishing systems, ERPs, or web shops via REST API.',
          icon: Zap
        }
      ],

      detectionPill: 'TECHNICAL DETECTION',
      checksTitle: 'What the PrintPrice Preflight engine verifies',
      checksSubtitle: 'Deterministic inspection calibrated against ISO standards and real manufacturing constraints.',
      checks: [
        { name: 'Page Geometry Boxes', desc: 'Normalized validation of MediaBox, TrimBox, and BleedBox geometry for exact trim accuracy.' },
        { name: 'Profile-Specific Bleed', desc: 'Targeted bleed checking calibrated to binding type (e.g. 3 mm softcover, 5 mm case-bound, 0 mm imposition sheets), avoiding rigid universal rules.' },
        { name: 'Effective Image DPI', desc: 'Evaluation of true effective resolution against print technology (300 DPI for commercial color, 150-200 DPI for large format, or 600-1200 DPI for line art).' },
        { name: 'Font Embedding', desc: 'Detection of non-embedded fonts, partial subsets, or synthetic fonts prone to prepress substitution.' },
        { name: 'Color Spaces & Inks', desc: 'Color space inspection (CMYK, grayscale, calibrated RGB with ICC profile, or spot colors) matched to destination press.' },
        { name: 'Total Area Coverage (TAC / TIC)', desc: 'Ink density evaluation to prevent offsetting, smudging, and extended drying times by substrate.' },
        { name: 'Transparency & Layers', desc: 'Flagging complex blend modes, soft masks, and transparency groups requiring prepress RIP management.' },
        { name: 'PDF/X Compliance', desc: 'Deterministic verification of ISO PDF/X standards (PDF/X-1a, PDF/X-4). Informational inspection does not replace full workshop RIP hardware certification.' }
      ],

      workflowTitle: 'How preflight works: Detect, Fix, and Revalidate',
      workflowSteps: [
        { step: '01', title: 'Upload & select profile', desc: 'Upload your PDF and select the target print specification (binding style, paper weight, and machine type).' },
        { step: '02', title: 'Detect (Forensic Audit)', desc: 'Deterministic analysis of page boxes, typography, resolution, color models, and ink coverage.' },
        { step: '03', title: 'Fix (Safe Remediation)', desc: 'Apply safe, non-destructive fixes (page box normalization, ICC tagging) without altering creative content.' },
        { step: '04', title: 'Revalidate (Verification)', desc: 'Secondary forensic pass on the repaired file to confirm press compliance before routing to the workshop.' }
      ],

      limitsPill: 'TECHNICAL TRANSPARENCY',
      limitsTitle: 'Available fixes and technical boundaries',
      limitsSubtitle: 'Complete transparency: what the software can repair automatically and what requires source layout updates.',
      limits: [
        {
          feature: 'BleedBox Expansion',
          action: 'Automated geometry adjustment',
          limit: 'The engine expands BleedBox boundaries in PDF metadata, but cannot synthesize artwork if layout backgrounds end at the trim line.',
          type: 'safe'
        },
        {
          feature: 'Low-Resolution Images',
          action: 'Precise page and asset pinpointing',
          limit: 'The engine never artificially upsamples low-res images, as it creates fake pixels. Replace the asset in your original layout application.',
          type: 'warning'
        },
        {
          feature: 'CMYK Color Conversion',
          action: 'Standardized ISO profile conversion',
          limit: 'Converts via standard profiles (Fogra51 / PSO Coated). Saturated out-of-gamut RGB tones will naturally shift to their closest printable CMYK equivalents.',
          type: 'warning'
        },
        {
          feature: 'Non-Embedded Fonts',
          action: 'Glyph audit and clear warning',
          limit: 'If the PDF lacks vector glyph outlines, the engine cannot invent the letterforms. Re-export the document with full font embedding.',
          type: 'warning'
        }
      ],

      demoPill: 'TECHNICAL DEMONSTRATION',
      demoTitle: 'Sample Diagnostic Report (Interactive Demo)',
      demoNotice: 'Real extract from an internal audit on a sample book interior (64 pages, 135 gsm coated stock). Explicitly labeled as a demonstration.',
      demoReport: {
        docLabel: 'DOCUMENT: publishing_sample_guide_v2.pdf',
        status: 'REVIEW REQUIRED',
        sampleBadge: 'Demonstrative sample case • Profile: OFFSET_STANDARD_F51 • 64 pp.',
        riskLabel: 'RISK SCORE',
        items: [
          {
            level: '[WARNING] MISSING BLEED ON SHEET',
            title: 'Pages 1, 14, 28: Artwork does not extend past trim line',
            category: 'GEOMETRY',
            desc: 'TrimBox is defined at 148×210 mm, but required perimeter bleed for this publishing profile is missing (3 mm on top and outer edges).',
            action: 'Action: Extend backgrounds in InDesign or expand geometric BleedBox',
            color: '#eab308',
            type: 'warning'
          },
          {
            level: '[CRITICAL] INSUFFICIENT IMAGE RESOLUTION',
            title: "Page 7: 'half_title_photo.jpg' at 172 DPI",
            category: 'IMAGE',
            desc: 'Image will print with reduced sharpness compared to the recommended threshold for this publishing profile (300 effective DPI in process color).',
            action: 'Technical limit: Upscaling cannot create authentic pixels. Replace in layout with original high-resolution asset.',
            color: '#dc2626',
            type: 'critical'
          },
          {
            level: '[OPTIMIZATION] 4-COLOR RICH BLACK TEXT',
            title: 'Pages 12, 19: 9 pt body text composed in C:60 M:50 Y:50 K:100',
            category: 'INK / TAC',
            desc: 'Misregistration risk on offset press for small body typography.',
            action: 'Automated fix available: Remap small body text strictly to 100% Black (K).',
            color: '#3b82f6',
            type: 'info'
          }
        ]
      },

      compPill: 'COMPARATIVE DOCUMENTARY ANALYSIS',
      compTitle: 'Objective Comparison of Preflight Solutions',
      compSubtitle: 'Based on official in-force technical documentation of each product (Revision: October 2026). Clear presentation of verified capabilities without sales superlatives.',
      tabIndividual: 'A. Creators & Publishers',
      tabPro: 'B. Professional Workflows & Plants',
      scrollTableHint: '⇄ Scroll horizontally to view full table',
      docsLink: 'Read the full Preflight engine technical documentation on docs.printprice.pro ➔',

      tableA: {
        criteriaHeader: 'Criteria',
        col1: 'PrintPrice Preflight (Web)',
        col2: 'Adobe Acrobat Pro',
        col3: 'Enfocus PitStop Pro',
        rows: [
          {
            criterion: 'Access Mode',
            p1Status: 'Available',
            p1Desc: 'Web browser (cloud SaaS). Access via free account or magic link.',
            p2Status: 'Available',
            p2Desc: 'Local desktop workstation (macOS / Windows).',
            p3Status: 'Available',
            p3Desc: 'Plugin running inside Adobe Acrobat desktop.'
          },
          {
            criterion: 'Installation Required',
            p1Status: 'Not applicable',
            p1Desc: 'Zero local installation; runs in any modern browser.',
            p2Status: 'Available',
            p2Desc: 'Requires Acrobat Pro and Adobe Creative Cloud client.',
            p3Status: 'Available',
            p3Desc: 'Requires Acrobat installation + PitStop plugin license.'
          },
          {
            criterion: 'Required Knowledge',
            p1Status: 'Available',
            p1Desc: 'Accessible tier: translates technical errors into clear layout recommendations.',
            p2Status: 'Available',
            p2Desc: 'Intermediate/Advanced: requires knowledge of page boxes, ICC profiles, and ISO standards.',
            p3Status: 'Available',
            p3Desc: 'Prepress specialist: steep learning curve for creating Action Lists.'
          },
          {
            criterion: 'Report Inspection',
            p1Status: 'Available',
            p1Desc: 'Interactive web report with risk index, affected pages, and prioritized warnings.',
            p2Status: 'Available',
            p2Desc: 'On-screen modal panel with result export to PDF or XML.',
            p3Status: 'Available',
            p3Desc: 'Interactive navigator highlighting graphics directly in viewer.'
          },
          {
            criterion: 'Fixing & Editing',
            p1Status: 'Depends on plan / setting',
            p1Desc: 'Deterministic fixes (TrimBox, BleedBox, OutputIntent). No direct vector drawing edits.',
            p2Status: 'Available',
            p2Desc: 'Predefined automated fixups. Basic text and object touch-up.',
            p3Status: 'Available',
            p3Desc: 'Surgical in-depth editing of vectors, text curves, paths, and separations in the PDF.'
          },
          {
            criterion: 'Licensing Model',
            p1Status: 'Available',
            p1Desc: 'Individual freemium web tier; volume credits and REST API for enterprise.',
            p2Status: 'Available',
            p2Desc: 'Monthly or annual subscription to Adobe Creative Cloud or Acrobat Pro.',
            p3Status: 'Available',
            p3Desc: 'Annual subscription or perpetual license with paid maintenance.'
          }
        ]
      },

      tableB: {
        dimHeader: 'Dimension',
        col1: 'PrintPrice Preflight OS',
        col2: 'Enfocus PitStop Server',
        col3: 'callas pdfToolbox Server',
        rows: [
          {
            dimension: 'Configurable Profiles',
            p1Status: 'Available',
            p1Desc: 'Deterministic profiles defined in JSON contracts (Offset, Digital, PDF/X-4).',
            p2Status: 'Available',
            p2Desc: 'Profiles and Action Lists configurable via PitStop Pro desktop GUI.',
            p3Status: 'Available',
            p3Desc: 'Process Plans with advanced conditional logic, JavaScript, and GWG profiles.'
          },
          {
            dimension: 'Standards & Scope',
            p1Status: 'Available',
            p1Desc: 'ISO 15930 compliance evaluation (PDF/X-1a, PDF/X-4) with veraPDF integration.',
            p2Status: 'Available',
            p2Desc: 'Full validation from PDF/X-1a through PDF/X-6 and Ghent Workgroup specs.',
            p3Status: 'Available',
            p3Desc: 'Official reference engine for the Ghent Workgroup and ISO (PDF/X, PDF/A, PDF/VT).'
          },
          {
            dimension: 'Batch Processing',
            p1Status: 'Available',
            p1Desc: 'Asynchronous microservices distributed across Redis queues for horizontal scaling.',
            p2Status: 'Available',
            p2Desc: 'Multi-threaded engine optimized for concurrent queues on local servers.',
            p3Status: 'Available',
            p3Desc: 'High-performance multi-core engine processing thousands of pages per minute.'
          },
          {
            dimension: 'Hot Folders',
            p1Status: 'Not applicable (Cloud-native)',
            p1Desc: '100% cloud/API infrastructure. Connects to local network via REST webhooks.',
            p2Status: 'Available',
            p2Desc: 'Native monitoring of input, success, and error folders on SMB/NFS storage.',
            p3Status: 'Available',
            p3Desc: 'Automated monitoring of local folders and shared network volumes.'
          },
          {
            dimension: 'CLI, SDK or API',
            p1Status: 'Available (REST API)',
            p1Desc: 'Native JSON/multipart REST API (/preflight/analyze, /preflight/autofix).',
            p2Status: 'Available (CLI)',
            p2Desc: 'Command-line interface included for integration with scripts and Enfocus Switch.',
            p3Status: 'Available (CLI & SDK)',
            p3Desc: 'Standalone CLI and native integration SDK (C/C++, Java, .NET, Python).'
          },
          {
            dimension: 'Traceability & Original',
            p1Status: 'Available',
            p1Desc: 'Strict original asset preservation with immutable SHA-256 technical audit hash.',
            p2Status: 'Available',
            p2Desc: 'Original file is moved to archive folder; remediated asset is created separately.',
            p3Status: 'Available',
            p3Desc: 'Configurable backup policies and original version retention before transformation.'
          }
        ]
      },

      privacyTitle: 'Privacy and secure file processing',
      privacyPoints: [
        'Files are processed in isolated, ephemeral environments exclusively for analysis and repair.',
        'Automatic permanent purge of all files once the report or repaired file is downloaded.',
        'No AI training: client documents are never used for machine learning or distributed to third parties.',
        'Full TLS 1.3 encryption during upload, processing, and download.'
      ],

      disclaimerTitle: 'TECHNICAL DISCLAIMER',
      disclaimerText: 'PrintPrice Preflight evaluates the technical compliance of PDF files against selected profile specifications. Results do not constitute a universal print certification and do not replace editorial proofreading, contract color proofs, or final workshop production sign-off.',

      faqTitle: 'Frequently Asked Questions (FAQ)',
      faqs: [
        {
          q: 'Does Preflight guarantee an error-free printed book?',
          a: 'No. Software cannot grant an absolute production guarantee. Preflight checks deterministic technical compliance (bleeds, boxes, DPI, fonts), but cannot evaluate editorial copy, artistic intent, or mechanical press trimming tolerances.'
        },
        {
          q: 'Why does the engine not automatically upscale low-resolution photos?',
          a: 'Because artificial upscaling fabricates pixel information, resulting in blurry or pixelated physical prints. The correct solution is replacing the asset with the original high-resolution file in the source layout application.'
        },
        {
          q: 'What happens when I apply the automated bleed fix?',
          a: 'The fix updates the BleedBox coordinates in the PDF metadata so prepress RIPs recognize the trim boundaries. However, if your design left white margins inside the trim area, you must extend the artwork in InDesign or Illustrator to avoid white edges.'
        },
        {
          q: 'How does Preflight connect with Budget and manufacturing?',
          a: 'The physical specifications selected in Budget (trim size, page count, paper stock) automatically configure Preflight policies. Once approved, an audited technical work order is attached, ensuring the plant receives the exact validated file.'
        }
      ]
    },
    de: {
      label: 'PRINTPRICE PREFLIGHT / FORENSISCHE DRUCKDATENPRÜFUNG',
      title: 'Prüfen Sie Ihr PDF vor dem Druck.',
      subheadline: 'Erkennen Sie technische Mängel, verstehen Sie erforderliche Korrekturen und bereiten Sie Ihre Datei optimal vor.',
      ctaPrimary: 'Mein PDF prüfen ➔',
      ctaSecondary: 'Beispielbericht ➔',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      badge: 'DETERMINISTISCHE CLOUD-ANALYSE',

      audienceTitle: 'Entwickelt für jeden Schritt der Druckproduktion',
      audienceSubtitle: 'Verständliche Erklärungen für Autoren; forensische Präzision für industrielle Druckereien.',
      audiences: [
        {
          title: 'Autoren & Selbstverleger',
          badge: 'EINFACHE BEDIENUNG',
          desc: 'Überprüfen Sie Beschnitt, Sicherheitsabstände und Bildauflösung für Umschlag und Innenteil ohne kryptische Fachbegriffe.',
          icon: PenTool
        },
        {
          title: 'Verlage & Buchgestalter',
          badge: 'QUALITÄTSSICHERUNG',
          desc: 'Prüfen Sie Neuerscheinungen und Nachdrucke vor dem Druckgang. Erkennen Sie RGB-Elemente, fehlende Schriften und Rückenbreitenfehler.',
          icon: Library
        },
        {
          title: 'Druckereien & Druckereibetriebe',
          badge: 'DATEIEINGANGSFILTER',
          desc: 'Automatisieren Sie den Dateneingang. Erhalten Sie geprüfte Druckdatenpakete mit technischem Prüfprotokoll und sparen Sie Zeit in der Druckvorstufe.',
          icon: Factory
        },
        {
          title: 'Entwickler & Plattformen',
          badge: 'API & WORKFLOWS',
          desc: 'Integrieren Sie forensische Druckdatenanalyse und automatische Reparatur direkt in Verlagssysteme, ERPs oder Onlineshops via REST-API.',
          icon: Zap
        }
      ],

      detectionPill: 'TECHNISCHE ERKENNUNG',
      checksTitle: 'Was PrintPrice Preflight prüft',
      checksSubtitle: 'Deterministische Prüfung basierend auf ISO-Standards und profilabhängigen Fertigungsregeln.',
      checks: [
        { name: 'Seitenboxen (Geometrie)', desc: 'Normalisierte Prüfung von MediaBox, TrimBox und BleedBox für exakte Endformate.' },
        { name: 'Profilspezifischer Beschnitt', desc: 'Prüfung des Beschnitts nach Produktart und Bindung (z. B. 3 mm bei Softcover, 5 mm bei Hardcover, 0 mm bei technischen Montagebögen) statt starrer Universalwerte.' },
        { name: 'Effektive Bildauflösung (DPI)', desc: 'Ermittlung der tatsächlichen Auflösung im Verhältnis zur Drucktechnologie (300 DPI im Akzidenzdruck, 150-200 DPI im Großformat oder 600-1200 DPI bei Strichgrafik).' },
        { name: 'Schrifteinbettung', desc: 'Prüfung auf nicht eingebettete Schriftarten, unvollständige Subsets und ersetzungsgefährdete Schriften.' },
        { name: 'Farbräume & Druckfarben', desc: 'Prüfung des Farbraums (CMYK, Graustufen, RGB mit ICC-Profil oder Schmuckfarben) passend zur Zielmaschine.' },
        { name: 'Gesamtfarbauftrag (TAC / TIC)', desc: 'Messung des maximalen Farbauftrags zur Vermeidung von Ablegen und Trocknungsverzögerungen nach Papiersorte.' },
        { name: 'Transparenzen & Ebenen', desc: 'Identifikation von Füllmethoden, Soft-Masks und Transparenzgruppen für die Druckvorstufe.' },
        { name: 'PDF/X-Konformitätsprüfung', desc: 'Deterministische Prüfung gegen ISO PDF/X-Vorgaben (PDF/X-1a, PDF/X-4). Die Vorprüfung ersetzt nicht die vollständige RIP-Hardwarezertifizierung der Druckerei.' }
      ],

      workflowTitle: 'Funktionsweise der Prüfung: Erkennen, Korrigieren und Revalidieren',
      workflowSteps: [
        { step: '01', title: 'Upload & Profilauswahl', desc: 'Laden Sie Ihre Datei hoch und wählen Sie das Zielprofil (Bindungsart, Papier und Drucktechnologie).' },
        { step: '02', title: 'Erkennen (Forensische Analyse)', desc: 'Deterministische Prüfung von Seitenboxen, Schriften, DPI-Werten, Farbräumen und Farbauftrag.' },
        { step: '03', title: 'Korrigieren (Sichere Reparatur)', desc: 'Anwendung nicht-destruktiver Reparaturen (Normalisierung von Seitenboxen, Einbettung von Standard-ICC-Profilen).' },
        { step: '04', title: 'Revalidieren (Ergebnisprüfung)', desc: 'Zweiter forensischer Prüflauf zur Bestätigung der Konformität vor der Übermittlung an die Druckerei.' }
      ],

      limitsPill: 'TECHNISCHE TRANSPARENZ',
      limitsTitle: 'Verfügbare Reparaturen und technische Grenzen',
      limitsSubtitle: 'Ehrliche Transparenz: Was die Software reparieren kann und was im Originaldokument gelöst werden muss.',
      limits: [
        {
          feature: 'BleedBox-Erweiterung',
          action: 'Automatische Geometrieanpassung',
          limit: 'Die Engine passt die Beschnittbox im PDF an, kann jedoch keine Bildinhalte künstlich erfinden, wenn das Layout weiß bleibt.',
          type: 'safe'
        },
        {
          feature: 'Bilder mit geringer Auflösung',
          action: 'Exakte Lokalisierung im Dokument',
          limit: 'Die Software rechnet Bilder niemals künstlich hoch (kein Fake-Upsampling). Bitte ersetzen Sie das Bild im Satzprogramm.',
          type: 'warning'
        },
        {
          feature: 'CMYK-Farbkonvertierung',
          action: 'Standardisierte ISO-Farbwandlung',
          limit: 'Wandlung über Fogra51 / PSO Coated Profile. Sehr leuchtende RGB-Töne können im CMYK-Druck naturgemäß dezenter wirken.',
          type: 'warning'
        },
        {
          feature: 'Fehlende Schriftarten',
          action: 'Glyphenprüfung und Warnung',
          limit: 'Fehlt eine Schriftart im PDF, können Vektoren nicht erraten werden. Das Dokument muss mit eingebetteten Schriften exportiert werden.',
          type: 'warning'
        }
      ],

      demoPill: 'TECHNISCHE DEMONSTRATION',
      demoTitle: 'Beispielbericht (Interaktive Demonstration)',
      demoNotice: 'Auszug aus einem internen Testdokument (64 Seiten, 135 g Bilderdruckpapier). Ausdrücklich als Demonstration gekennzeichnet.',
      demoReport: {
        docLabel: 'DOKUMENT: verlagsleitfaden_muster_v2.pdf',
        status: 'PRÜFUNG ERFORDERLICH',
        sampleBadge: 'Demonstrativer Beispielfall • Profil: OFFSET_STANDARD_F51 • 64 S.',
        riskLabel: 'RISIKOINDEX',
        items: [
          {
            level: '[WARNUNG] FEHLENDER BESCHNITT AUF DRUCKBOGEN',
            title: 'Seiten 1, 14, 28: Grafik reicht nicht über die Schnittlinie hinaus',
            category: 'GEOMETRIE',
            desc: 'TrimBox ist auf 148×210 mm definiert, aber der für dieses Verlagsprofil erforderliche Beschnitt fehlt (3 mm an Kopf- und Außenkanten).',
            action: 'Aktion: Hintergründe in InDesign anpassen oder geometrische BleedBox erweitern',
            color: '#eab308',
            type: 'warning'
          },
          {
            level: '[KRITISCH] UNZUREICHENDE BILDGESCHWINDIGKEIT',
            title: "Seite 7: 'schmutztitel_foto.jpg' bei 172 DPI",
            category: 'BILD',
            desc: 'Das Bild wird mit Schärfeverlust gegenüber dem empfohlenen Schwellenwert gedruckt (300 effektive DPI im Vierfarbdruck).',
            action: 'Technische Grenze: Künstliches Hochrechnen kann keine Bilddaten erfinden. Im Layout durch hochauflösendes Original ersetzen.',
            color: '#dc2626',
            type: 'critical'
          },
          {
            level: '[OPTIMIERUNG] 4-FARBIGER TIEFSCHWARZER TEXT',
            title: 'Seiten 12, 19: 9-pt-Fließtext aufgebaut aus C:60 M:50 Y:50 K:100',
            category: 'FARBAUFTRAG / TAC',
            desc: 'Passerungenauigkeitsrisiko im Offsetdruck bei kleiner Fließtexttypografie.',
            action: 'Automatische Korrektur verfügbar: Feinen Text rein auf 100% Schwarz (K) umwandeln.',
            color: '#3b82f6',
            type: 'info'
          }
        ]
      },

      compPill: 'DOKUMENTARISCHE VERGLEICHSANALYSE',
      compTitle: 'Objektiver Vergleich von Preflight-Lösungen',
      compSubtitle: 'Basierend auf der offiziell gültigen technischen Dokumentation der einzelnen Produkte (Stand: Oktober 2026). Sachliche Gegenüberstellung ohne werbliche Übertreibung.',
      tabIndividual: 'A. Privatpersonen & Verlage',
      tabPro: 'B. Professionelle Workflows & Druckereien',
      scrollTableHint: '⇄ Horizontal wischen für die vollständige Tabelle',
      docsLink: 'Vollständige technische Dokumentation der Preflight-Engine auf docs.printprice.pro ansehen ➔',

      tableA: {
        criteriaHeader: 'Kriterium',
        col1: 'PrintPrice Preflight (Web)',
        col2: 'Adobe Acrobat Pro',
        col3: 'Enfocus PitStop Pro',
        rows: [
          {
            criterion: 'Zugangsart',
            p1Status: 'Verfügbar',
            p1Desc: 'Webbrowser (Cloud-SaaS). Zugriff über kostenloses Konto oder Magic Link.',
            p2Status: 'Verfügbar',
            p2Desc: 'Lokaler Desktop (macOS / Windows).',
            p3Status: 'Verfügbar',
            p3Desc: 'In Adobe Acrobat Desktop ausgeführtes Plugin.'
          },
          {
            criterion: 'Erforderliche Installation',
            p1Status: 'Nicht zutreffend',
            p1Desc: 'Keine lokale Installation erforderlich; funktioniert in jedem modernen Browser.',
            p2Status: 'Verfügbar',
            p2Desc: 'Erfordert Acrobat Pro und Adobe Creative Cloud.',
            p3Status: 'Verfügbar',
            p3Desc: 'Erfordert Installation von Acrobat + PitStop-Plugin.'
          },
          {
            criterion: 'Erforderliche Kenntnisse',
            p1Status: 'Verfügbar',
            p1Desc: 'Zugänglich: übersetzt technische Fehlercodes in praktische Layout-Hinweise.',
            p2Status: 'Verfügbar',
            p2Desc: 'Mittel/Fortgeschritten: erfordert Verständnis von Seitenboxen, ICC-Profilen und ISO-Normen.',
            p3Status: 'Verfügbar',
            p3Desc: 'Druckvorstufen-Spezialist: steile Lernkurve zum Erstellen von Action Lists.'
          },
          {
            criterion: 'Berichtsauswertung',
            p1Status: 'Verfügbar',
            p1Desc: 'Interaktiver Webbericht mit Risikoindex, betroffenen Seiten und priorisierten Warnungen.',
            p2Status: 'Verfügbar',
            p2Desc: 'Modaler Bildschirmdialog mit Ergebnisexport als PDF oder XML.',
            p3Status: 'Verfügbar',
            p3Desc: 'Interaktiver Navigator mit visueller Hervorhebung direkt am Grafikobjekt.'
          },
          {
            criterion: 'Korrektur & Bearbeitung',
            p1Status: 'Abhängig von Edition / Plan',
            p1Desc: 'Deterministische Reparaturen (TrimBox, BleedBox, OutputIntent). Keine direkte Vektorbearbeitung.',
            p2Status: 'Verfügbar',
            p2Desc: 'Vordefinierte automatische Fixups. Grundlegende Text- und Objektkorrekturen.',
            p3Status: 'Verfügbar',
            p3Desc: 'Chirurgisch präzise Bearbeitung von Vektoren, Pfaden, Schriften und Farbauszügen im PDF.'
          },
          {
            criterion: 'Lizenzmodell',
            p1Status: 'Verfügbar',
            p1Desc: 'Individuelle Freemium-Nutzung im Web; Volumen-Credits und REST-API für Unternehmen.',
            p2Status: 'Verfügbar',
            p2Desc: 'Monats- oder Jahresabonnement von Adobe Creative Cloud oder Acrobat Pro.',
            p3Status: 'Verfügbar',
            p3Desc: 'Jahresabonnement oder unbefristete Volllizenz mit Wartungsvertrag.'
          }
        ]
      },

      tableB: {
        dimHeader: 'Dimension',
        col1: 'PrintPrice Preflight OS',
        col2: 'Enfocus PitStop Server',
        col3: 'callas pdfToolbox Server',
        rows: [
          {
            dimension: 'Konfigurierbare Profile',
            p1Status: 'Verfügbar',
            p1Desc: 'Deterministische Profile definiert in JSON-Verträgen (Offset, Digital, PDF/X-4).',
            p2Status: 'Verfügbar',
            p2Desc: 'Profile und Action Lists konfigurierbar über die grafische Oberfläche von PitStop Pro.',
            p3Status: 'Verfügbar',
            p3Desc: 'Process Plans mit fortgeschrittener bedingter Logik, JavaScript und GWG-Profilen.'
          },
          {
            dimension: 'Standards & Umfang',
            p1Status: 'Verfügbar',
            p1Desc: 'ISO 15930 Konformitätsprüfung (PDF/X-1a, PDF/X-4) mit veraPDF-Integration.',
            p2Status: 'Verfügbar',
            p2Desc: 'Vollständige Prüfung von PDF/X-1a bis PDF/X-6 sowie Ghent Workgroup Spezifikationen.',
            p3Status: 'Verfügbar',
            p3Desc: 'Offizielle Referenz-Engine für die Ghent Workgroup und ISO (PDF/X, PDF/A, PDF/VT).'
          },
          {
            dimension: 'Stapelverarbeitung',
            p1Status: 'Verfügbar',
            p1Desc: 'Asynchrone Mikrodienste verteilt über Redis-Warteschlangen für horizontale Skalierung.',
            p2Status: 'Verfügbar',
            p2Desc: 'Multithread-Engine optimiert für parallele Warteschlangen auf lokalen Servern.',
            p3Status: 'Verfügbar',
            p3Desc: 'Hochleistungs-Mehrkern-Engine für die Verarbeitung tausender Seiten pro Minute.'
          },
          {
            dimension: 'Hotfolder (Überwachte Ordner)',
            p1Status: 'Nicht zutreffend (Cloud-nativ)',
            p1Desc: '100% Cloud/API-Infrastruktur. Über REST-Konnektoren mit lokalen Netzwerken verbindbar.',
            p2Status: 'Verfügbar',
            p2Desc: 'Native Überwachung von Eingangs-, Erfolgs- und Fehlerordnern in SMB/NFS-Netzwerken.',
            p3Status: 'Verfügbar',
            p3Desc: 'Automatisierte Überwachung lokaler Ordner und freigegebener Netzwerkspeicher.'
          },
          {
            dimension: 'CLI, SDK oder API',
            p1Status: 'Verfügbar (REST API)',
            p1Desc: 'Native JSON/multipart REST-API (/preflight/analyze, /preflight/autofix).',
            p2Status: 'Verfügbar (CLI)',
            p2Desc: 'Kommandozeile (CLI) enthalten zur Integration in Skripte und Switch.',
            p3Status: 'Verfügbar (CLI & SDK)',
            p3Desc: 'Eigenständige CLI und natives Integrations-SDK (C/C++, Java, .NET, Python).'
          },
          {
            dimension: 'Nachvollziehbarkeit & Originalerhalt',
            p1Status: 'Verfügbar',
            p1Desc: 'Strikter Erhalt der Originaldatei und unveränderlicher SHA-256-Prüfhash für die Auditierung.',
            p2Status: 'Verfügbar',
            p2Desc: 'Originaldatei wird in Archivordner verschoben; korrigiertes Dokument separat erstellt.',
            p3Status: 'Verfügbar',
            p3Desc: 'Konfigurierbare Backup-Richtlinien und Aufbewahrung von Originalversionen vor Transformation.'
          }
        ]
      },

      privacyTitle: 'Datenschutz und sichere Dateiverarbeitung',
      privacyPoints: [
        'Dateien werden auf verschlüsselter Infrastruktur ausschließlich zur Berichtserstellung und Reparatur analysiert.',
        'Automatische Löschung aller temporären Dokumente nach Abschluss des Vorgangs oder Ablauf des Download-Tokens.',
        'Kein KI-Training: Kundendateien werden niemals für das Training von Algorithmen verwendet oder an Dritte weitergegeben.',
        'Vollständige SSL/TLS-Verschlüsselung während Upload, forensischer Prüfung und Download.'
      ],

      disclaimerTitle: 'TECHNISCHER HAFTUNGSAUSSCHLUSS',
      disclaimerText: 'PrintPrice Preflight bewertet die technische Konformität von PDF-Dokumenten anhand des gewählten Profils. Die Ergebnisse stellen keine universelle Druckzertifizierung dar und ersetzen weder Lektorat, farbverbindlichen Kontrakt-Proof noch die finale Druckfreigabe durch die Druckerei.',

      faqTitle: 'Häufig gestellte Fragen (FAQ)',
      faqs: [
        {
          q: 'Garantiert PrintPrice Preflight einen fehlerfreien Druck?',
          a: 'Nein. Keine Software der Welt kann eine absolute Druckgarantie aussprechen. Das Ergebnis hängt vom gewählten Profil und den Fertigungstoleranzen der Druckerei ab. Preflight ersetzt weder das Lektorat noch einen zertifizierten Proof oder die Druckfreigabe.'
        },
        {
          q: 'Warum rechnet Preflight niedrig aufgelöste Fotos nicht automatisch hoch?',
          a: 'Weil künstliches Hochrechnen (Upsampling) Bilddaten erfindet und zu unscharfen Drucken führt. Für echte Druckqualität muss das Bild im Layoutprogramm durch die Originaldatei ersetzt werden.'
        },
        {
          q: 'Was bewirkt die automatische Beschnittkorrektur?',
          a: 'Die Funktion definiert die Beschnittbox (BleedBox) im PDF neu, damit der Belichter die Schnittkanten korrekt liest. Verlaufen Bildelemente jedoch nicht bis an den Rand, müssen sie im Layoutprogramm über den Rand gezogen werden.'
        },
        {
          q: 'Wie ist Preflight mit der Preiskalkulation (Budget) verbunden?',
          a: 'Die im Kalkulator gewählten Parameter (Endformat, Seitenzahl, Papiersorte) steuern direkt die Prüfregeln von Preflight. Bei Freigabe wird ein auditierter technischer Auftrag generiert, der sicherstellt, dass die Druckerei exakt diese Datei erhält.'
        }
      ]
    }
  };

  const t = texts[locale as keyof typeof texts] || texts.es;

  return (
    <div className="preflight-product-page">
      {/* 1. Hero Platform with Red Particles */}
      <HeroPlatform
        label={t.label}
        title={t.title}
        slogan={t.slogan}
        isHeadlineSlogan={false}
        subheadline={t.subheadline}
        primaryAction={{
          label: t.ctaPrimary,
          href: 'https://preflight.printprice.pro/'
        }}
        secondaryAction={{
          label: t.ctaSecondary,
          href: '#demo-report'
        }}
        variant="particles"
      />

      {/* Slogan Brand Bar */}
      <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '3.5rem', opacity: 0.6 }}>
        <p className="technical-text" style={{ fontSize: '0.75rem', letterSpacing: '0.25em' }}>
          PRICE IT → FIX IT → PRINT IT
        </p>
      </div>

      {/* 2. Target Audience Profiles */}
      <Section variant="secondary">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '1rem' }}>
              {t.badge}
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              {t.audienceTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {t.audienceSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '1.5rem'
            }}
          >
            {t.audiences.map((aud, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-primary)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <aud.icon size={22} strokeWidth={1.75} />
                    </div>
                    <span
                      className="technical-text"
                      style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 800 }}
                    >
                      {aud.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                    {aud.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {aud.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. What it Checks */}
      <Section variant="primary">
        <Container>
          <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
            <span className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 800 }}>
              {t.detectionPill}
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
              {t.checksTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {t.checksSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '1.25rem'
            }}
          >
            {t.checks.map((check, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.75rem 1.5rem',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: 0 }}></span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{check.name}</h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                  {check.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Workflow: Detect, Fix, Revalidate */}
      <Section variant="secondary">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              {t.workflowTitle}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: '1.5rem'
            }}
          >
            {t.workflowSteps.map((step, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-primary)',
                  padding: '2rem 1.75rem',
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                  {step.step}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {step.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Interactive Demo Report */}
      <Section variant="primary" id="demo-report">
        <Container>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="pill-badge" style={{ marginBottom: '1rem' }}>
                {t.demoPill}
              </span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', marginBottom: '0.75rem' }}>
                {t.demoTitle}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {t.demoNotice}
              </p>
            </div>

            {/* Diagnostic Report Card */}
            <div
              className="rounded-card"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                boxShadow: 'var(--shadow-dropdown)'
              }}
            >
              {/* Header of Report */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                      {t.demoReport.docLabel}
                    </span>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background: 'rgba(234, 179, 8, 0.15)',
                        color: '#eab308',
                        fontSize: '0.7rem',
                        fontWeight: 700
                      }}
                    >
                      {t.demoReport.status}
                    </span>
                  </div>
                  <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {t.demoReport.sampleBadge}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {t.demoReport.riskLabel}
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
                    0.38 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 1.0</span>
                  </div>
                </div>
              </div>

              {/* Finding Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {t.demoReport.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-primary)',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      borderLeft: `4px solid ${item.color}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: item.color, textTransform: 'uppercase' }}>
                          {item.level}
                        </span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>
                          {item.title}
                        </h4>
                      </div>
                      <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        {item.category}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                      {item.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          background: item.type === 'critical' ? 'rgba(220, 38, 38, 0.1)' : item.type === 'info' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                          fontSize: '0.75rem',
                          color: item.type === 'critical' ? '#f87171' : item.type === 'info' ? '#60a5fa' : 'var(--text-secondary)',
                          fontWeight: item.type === 'critical' ? 600 : 400
                        }}
                      >
                        {item.action}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Inside Demo */}
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a
                  href="https://preflight.printprice.pro/"
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                >
                  {t.ctaPrimary}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Technical Limits & Transparency */}
      <Section variant="secondary">
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <span className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 800 }}>
              {t.limitsPill}
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              {t.limitsTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t.limitsSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
              gap: '1.5rem'
            }}
          >
            {t.limits.map((lim, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-primary)',
                  padding: '1.75rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{lim.feature}</h4>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        background: lim.type === 'safe' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                        color: lim.type === 'safe' ? '#22c55e' : '#eab308',
                        fontWeight: 700
                      }}
                    >
                      {lim.action}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {lim.limit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Comprehensive Preflight Comparisons */}
      <Section variant="primary" id="comparisons">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3rem' }}>
            <span className="pill-badge" style={{ marginBottom: '1rem' }}>
              {t.compPill}
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              {t.compTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t.compSubtitle}
            </p>

            {/* Selector de Pestañas */}
            <div className="preflight-tabs-selector">
              <button
                type="button"
                className="preflight-tab-btn"
                onClick={() => setActiveTab('individual')}
                style={{
                  background: activeTab === 'individual' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'individual' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                {t.tabIndividual}
              </button>
              <button
                type="button"
                className="preflight-tab-btn"
                onClick={() => setActiveTab('pro')}
                style={{
                  background: activeTab === 'pro' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'pro' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                {t.tabPro}
              </button>
            </div>
          </div>

          {/* Tabla A */}
          {activeTab === 'individual' && (
            <div>
              <div className="table-scroll-hint">
                <span>{t.scrollTableHint}</span>
              </div>
              <div className="comparison-table-wrapper">
                <table style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '22%' }}>{t.tableA.criteriaHeader}</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%', color: 'var(--accent-primary)', fontWeight: 800 }}>
                        {t.tableA.col1}
                      </th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%' }}>{t.tableA.col2}</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%' }}>{t.tableA.col3}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.tableA.rows.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: 700 }}>{row.criterion}</td>
                        <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                          <strong>{row.p1Status}</strong><br />{row.p1Desc}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <strong>{row.p2Status}</strong><br />{row.p2Desc}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <strong>{row.p3Status}</strong><br />{row.p3Desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tabla B */}
          {activeTab === 'pro' && (
            <div>
              <div className="table-scroll-hint">
                <span>{t.scrollTableHint}</span>
              </div>
              <div className="comparison-table-wrapper">
                <table style={{ width: '100%', minWidth: '950px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '20%' }}>{t.tableB.dimHeader}</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '27%', color: 'var(--accent-primary)', fontWeight: 800 }}>
                        {t.tableB.col1}
                      </th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '27%' }}>{t.tableB.col2}</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%' }}>{t.tableB.col3}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.tableB.rows.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: 700 }}>{row.dimension}</td>
                        <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                          <strong>{row.p1Status}</strong><br />{row.p1Desc}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <strong>{row.p2Status}</strong><br />{row.p2Desc}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <strong>{row.p3Status}</strong><br />{row.p3Desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link
              href="/docs/engines/preflight-engine"
              className="technical-text"
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              {t.docsLink}
            </Link>
          </div>
        </Container>
      </Section>

      {/* 8. Privacy & Data Policies */}
      <Section variant="secondary">
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', marginBottom: '0.75rem' }}>
                {t.privacyTitle}
              </h2>
            </div>

            <div
              className="rounded-card"
              style={{
                background: 'var(--bg-primary)',
                padding: '2rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {t.privacyPoints.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Check size={18} strokeWidth={2.5} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. FAQ Section */}
      <Section variant="primary">
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
                {t.faqTitle}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {t.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-card"
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.75rem 2rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {faq.q}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Technical Disclaimer Notice Box */}
            <div
              style={{
                marginTop: '3rem',
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                border: '1px dashed var(--border-color)',
                textAlign: 'left'
              }}
            >
              <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>
                {t.disclaimerTitle}
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {t.disclaimerText}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final Action CTA with animated grid background */}
      <ActionCTA
        slogan={t.label}
        title={t.title}
        description={t.subheadline}
        buttonLabel={t.ctaPrimary}
        buttonHref="https://preflight.printprice.pro/"
        secondaryButtonLabel={
          locale === 'es'
            ? 'Ver flujo para autores ➔'
            : locale === 'de'
            ? 'Autoren-Workflow ➔'
            : 'Author workflow ➔'
        }
        secondaryButtonHref="/for-authors"
        trackingAction="preflight_final_cta"
      />
    </div>
  );
}

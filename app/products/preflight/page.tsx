'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { useLocale } from '@/lib/i18n';

export default function PreflightProductPage() {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'individual' | 'pro'>('individual');
  const [showDemoModal, setShowDemoModal] = useState(false);

  const texts = {
    es: {
      label: 'PRINTPRICE PREFLIGHT / MOTOR FORENSE DE ARTES FINALES',
      title: 'Comprueba tu PDF antes de imprimir.',
      subheadline: 'Identifica problemas técnicos, entiende qué debes revisar y prepara tu archivo para el siguiente paso.',
      ctaPrimary: 'Comprobar mi PDF →',
      ctaSecondary: 'Ver informe de ejemplo',
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
          icon: '✍️'
        },
        {
          title: 'Editoriales y Diseñadores',
          badge: 'CONTROL DE CALIDAD',
          desc: 'Audita colecciones y reediciones completas antes de enviar a imprenta. Detecta fuentes problemáticas, colores RGB y desajustes de lomo.',
          icon: '📚'
        },
        {
          title: 'Imprentas y Talleres',
          badge: 'RECEPCIÓN DE ARCHIVOS',
          desc: 'Automatiza el filtro de entrada de artes finales. Recibe trabajos con fichas técnicas auditadas y elimina horas de revisión manual en preimpresión.',
          icon: '🏭'
        },
        {
          title: 'Desarrolladores y Plataformas',
          badge: 'API & WORKFLOWS',
          desc: 'Integra el motor de análisis y corrección automática directamente en tu software editorial, ERP o tienda online mediante API REST.',
          icon: '⚡'
        }
      ],

      // What it checks
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
          feature: 'Fuentes no incrustadas',
          action: 'Diagnóstico e indicación de glifos',
          limit: 'Si una fuente no está incrustada en el PDF original, el motor no puede inventar los glifos. Es necesario volver a exportar con fuentes incrustadas.',
          type: 'warning'
        }
      ],

      // Demo Report
      demoTitle: 'Informe de ejemplo (Demostración interactiva)',
      demoNotice: 'Datos extraídos de un archivo de prueba sintético interno (64 páginas, papel estucado semi-mate 135g). Identificado exclusivamente como demostración.',

      // Privacy
      privacyTitle: 'Privacidad y tratamiento seguro de archivos',
      privacyPoints: [
        'Los archivos subidos se procesan en infraestructura cifrada exclusivamente para generar el informe y aplicar correcciones.',
        'Eliminación periódica y automática de los ficheros temporales tras completar el procesado o caducar el enlace de descarga.',
        'Ningún documento se comparte con terceros ni se utiliza para entrenamiento de modelos de inteligencia artificial.',
        'Conexión segura SSL/TLS de extremo a extremo durante la subida, análisis y descarga.'
      ],

      // FAQ
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        {
          q: '¿PrintPrice Preflight garantiza que mi libro se imprimirá sin ningún error?',
          a: 'No. Ningún software puede garantizar un "archivo perfecto" de forma absoluta. El resultado depende del perfil técnico seleccionado y de los requisitos específicos de la imprenta. Preflight no sustituye la corrección ortotipográfica editorial, la prueba de color certificada ni el visado final del impresor.'
        },
        {
          q: '¿Por qué no aumentan automáticamente la resolución de las fotos de mi PDF?',
          a: 'Porque la interpolación o reescalado por software inventa información visual y puede provocar imágenes borrosas en papel. La única forma rigurosa de asegurar nitidez profesional en imprenta es sustituir la imagen por el archivo original de alta resolución en la maqueta.'
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
      ctaPrimary: 'Check my PDF →',
      ctaSecondary: 'View sample report',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      badge: 'DETERMINISTIC CLOUD PROCESSING',

      audienceTitle: 'Built for every stage of graphic manufacturing',
      audienceSubtitle: 'Clear guidance for creators; forensic precision for industrial printing plants.',
      audiences: [
        {
          title: 'Authors & Self-Publishers',
          badge: 'EASY TO USE',
          desc: 'Verify bleed, safety margins, and resolution for cover and interior without deciphering complex technical codes.',
          icon: '✍️'
        },
        {
          title: 'Publishers & Art Directors',
          badge: 'QUALITY ASSURANCE',
          desc: 'Audit frontlist and backlist titles before sending to press. Catch problematic fonts, RGB elements, and spine mismatches.',
          icon: '📚'
        },
        {
          title: 'Printhouses & Factories',
          badge: 'FILE INTAKE',
          desc: 'Automate print file validation. Receive production-ready jobs with audited technical specifications and eliminate prepress labor.',
          icon: '🏭'
        },
        {
          title: 'Developers & Platforms',
          badge: 'API & WORKFLOWS',
          desc: 'Embed automated PDF inspection and non-destructive remediation directly into your MIS, ERP, or web-to-print store via REST API.',
          icon: '⚡'
        }
      ],

      checksTitle: 'What PrintPrice Preflight checks',
      checksSubtitle: 'Deterministic evaluation based on ISO standards and real manufacturing constraints by profile.',
      checks: [
        { name: 'Page Boxes (Geometry)', desc: 'Normalized verification of MediaBox, TrimBox, and BleedBox to ensure exact trim dimensions.' },
        { name: 'Profile-Specific Bleed', desc: 'Checks bleed according to product profile and binding (e.g. 3mm for softcover, 5mm for cased hardcover, 0mm for technical sheet layouts), avoiding rigid universal rules.' },
        { name: 'Effective Image DPI', desc: 'Calculates actual effective resolution relative to output technology (300 DPI for commercial process, 150-200 DPI for large format, or 600-1200 DPI for monochrome line art).' },
        { name: 'Font Embedding', desc: 'Detects non-embedded fonts, partial subsets, and synthetic fonts prone to press substitution.' },
        { name: 'Color Gamut & Inks', desc: 'Evaluates color space (CMYK, grayscale, RGB with ICC profile, or spot/Pantone inks) according to target press specifications.' },
        { name: 'Total Ink Coverage (TAC)', desc: 'Measures ink limit against substrate absorption thresholds to prevent offset smudging and drying delays.' },
        { name: 'Transparencies & Layers', desc: 'Identifies blend modes, soft masks, and complex transparency groups requiring prepress handling.' },
        { name: 'PDF/X Profile Conformance', desc: 'Deterministic primitive inspection against ISO PDF/X guidelines (PDF/X-1a, PDF/X-4). Technical analysis does not replace full target RIP hardware certification.' }
      ],

      // How it works: Detect, Correct & Revalidate
      workflowTitle: 'How the analysis works: Detect, Correct & Revalidate',
      workflowSteps: [
        { step: '01', title: 'Upload & Profile Selection', desc: 'Drop your file and select target specifications (binding, stock, and printing technology).' },
        { step: '02', title: 'Detect (Forensic Audit)', desc: 'Deterministic inspection of page geometry, fonts, effective DPI, color spaces, and ink limits.' },
        { step: '03', title: 'Correct (Safe Remediation)', desc: 'Apply non-destructive adjustments (page box geometry normalization, standard ICC profile embedding).' },
        { step: '04', title: 'Revalidate (Result Verification)', desc: 'Second forensic pass on the output file to verify full compliance before transmitting to the press.' }
      ],

      limitsTitle: 'Available fixes and technical limits',
      limitsSubtitle: 'Absolute transparency: what software can resolve and what requires adjusting the source layout.',
      limits: [
        {
          feature: 'BleedBox Expansion',
          action: 'Automated geometry adjustment',
          limit: 'The engine expands the technical BleedBox dictionary in the PDF, but cannot invent image pixels if the artwork does not extend past the trim edge.',
          type: 'safe'
        },
        {
          feature: 'Low Resolution Images',
          action: 'Precise location flag',
          limit: 'Software never artificially upsamples low-res images, as that would hallucinate fake detail. Replace with high-res source in design software.',
          type: 'warning'
        },
        {
          feature: 'CMYK Color Conversion',
          action: 'Standardized ISO conversion',
          limit: 'Converts via Fogra51 / PSO Coated profiles. Vibrant out-of-gamut RGB colors may experience natural tonal shifts upon CMYK translation.',
          type: 'warning'
        },
        {
          feature: 'Missing Fonts',
          action: 'Glyph diagnosis and warning',
          limit: 'If a font is not embedded in the source PDF, the engine cannot create vector outlines. The document must be re-exported with embedded fonts.',
          type: 'warning'
        }
      ],

      demoTitle: 'Sample Report (Interactive Demonstration)',
      demoNotice: 'Data extracted from an internal synthetic test document (64 pages, 135g coated paper). Identified strictly as a demonstration.',

      privacyTitle: 'Privacy and secure file processing',
      privacyPoints: [
        'Uploaded files are processed in encrypted infrastructure solely to generate diagnostics and apply requested fixes.',
        'Automated scheduled deletion of temporary files upon job completion or download token expiration.',
        'Zero AI training: customer files are never used to train machine learning models nor shared with third parties.',
        'End-to-end SSL/TLS encryption for uploads, analysis pipelines, and artifact downloads.'
      ],

      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'Does PrintPrice Preflight guarantee a 100% error-free print run?',
          a: 'No. No software can guarantee a "perfect file" universally. Verification depends on the selected production profile and the manufacturing tolerances of the target printer. Preflight does not replace editorial proofreading, contract proofs, or press-side approval.'
        },
        {
          q: 'Why does Preflight not automatically upscale low-resolution images?',
          a: 'Because software upscaling invents artificial pixels that often result in blurry, artifact-heavy prints. The only reliable approach in professional printing is to replace the image with a genuine high-resolution source file.'
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
      ctaPrimary: 'Mein PDF prüfen →',
      ctaSecondary: 'Beispielbericht ansehen',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],
      badge: 'DETERMINISTISCHE CLOUD-ANALYSE',

      audienceTitle: 'Entwickelt für jeden Schritt der Druckproduktion',
      audienceSubtitle: 'Verständliche Erklärungen für Autoren; forensische Präzision für industrielle Druckereien.',
      audiences: [
        {
          title: 'Autoren & Selbstverleger',
          badge: 'EINFACHE BEDIENUNG',
          desc: 'Überprüfen Sie Beschnitt, Sicherheitsabstände und Bildauflösung für Umschlag und Innenteil ohne kryptische Fachbegriffe.',
          icon: '✍️'
        },
        {
          title: 'Verlage & Buchgestalter',
          badge: 'QUALITÄTSSICHERUNG',
          desc: 'Prüfen Sie Neuerscheinungen und Nachdrucke vor dem Druckgang. Erkennen Sie RGB-Elemente, fehlende Schriften und Rückenbreitenfehler.',
          icon: '📚'
        },
        {
          title: 'Druckereien & Buchbindereien',
          badge: 'DATEIEINGANGSKONTROLLE',
          desc: 'Automatisieren Sie den Druckdateneingang. Erhalten Sie verifizierte Aufträge mit auditierter technischer Freigabe ohne manuellen Aufwand.',
          icon: '🏭'
        },
        {
          title: 'Entwickler & Plattformen',
          badge: 'API & INTEGRATION',
          desc: 'Integrieren Sie die deterministische PDF-Prüfung und -Reparatur über eine REST-API direkt in Ihr ERP-, MIS- oder Web-to-Print-System.',
          icon: '⚡'
        }
      ],

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

      // How it works: Erkennen, Korrigieren und Revalidieren
      workflowTitle: 'Funktionsweise der Prüfung: Erkennen, Korrigieren und Revalidieren',
      workflowSteps: [
        { step: '01', title: 'Upload & Profilauswahl', desc: 'Laden Sie Ihre Datei hoch und wählen Sie das Zielprofil (Bindungsart, Papier und Drucktechnologie).' },
        { step: '02', title: 'Erkennen (Forensische Analyse)', desc: 'Deterministische Prüfung von Seitenboxen, Schriften, DPI-Werten, Farbräumen und Farbauftrag.' },
        { step: '03', title: 'Korrigieren (Sichere Reparatur)', desc: 'Anwendung nicht-destruktiver Reparaturen (Normalisierung von Seitenboxen, Einbettung von Standard-ICC-Profilen).' },
        { step: '04', title: 'Revalidieren (Ergebnisprüfung)', desc: 'Zweiter forensischer Prüflauf zur Bestätigung der Konformität vor der Übermittlung an die Druckerei.' }
      ],

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

      demoTitle: 'Beispielbericht (Interaktive Demonstration)',
      demoNotice: 'Auszug aus einem internen Testdokument (64 Seiten, 135 g Bilderdruckpapier). Ausdrücklich als Demonstration gekennzeichnet.',

      privacyTitle: 'Datenschutz und sichere Dateiverarbeitung',
      privacyPoints: [
        'Dateien werden auf verschlüsselter Infrastruktur ausschließlich zur Berichtserstellung und Reparatur analysiert.',
        'Automatische Löschung aller temporären Dokumente nach Abschluss des Vorgangs oder Ablauf des Download-Tokens.',
        'Kein KI-Training: Kundendateien werden niemals für das Training von Algorithmen verwendet oder an Dritte weitergegeben.',
        'Vollständige SSL/TLS-Verschlüsselung während Upload, forensischer Prüfung und Download.'
      ],

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
                    <span style={{ fontSize: '2rem' }}>{aud.icon}</span>
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
              DETECCIÓN TÉCNICA
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
                  padding: '1.75rem',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{check.name}</h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {check.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Workflow Steps */}
      <Section variant="secondary">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
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
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                <span
                  className="technical-text"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'var(--accent-primary)',
                    opacity: 0.35,
                    display: 'block',
                    marginBottom: '1rem'
                  }}
                >
                  {step.step}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
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
                DEMOSTRACIÓN TÉCNICA
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
                      DOCUMENTO: guia_editorial_muestra_v2.pdf
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
                      REVISIÓN REQUERIDA
                    </span>
                  </div>
                  <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    Caso de ejemplo demostrativo • Perfil: OFFSET_STANDARD_F51 • 64 págs.
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>ÍNDICE DE RIESGO</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
                    0.38 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 1.0</span>
                  </div>
                </div>
              </div>

              {/* Finding Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Item 1: Bleed */}
                <div
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    borderLeft: '4px solid #eab308'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#eab308', textTransform: 'uppercase' }}>
                        [AVISO] SANGRE FALTANTE EN PLIEGO
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>
                        Páginas 1, 14, 28: La ilustración no sobrepasa la línea de corte
                      </h4>
                    </div>
                    <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      GEOMETRÍA
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    La caja TrimBox está definida a 148×210 mm, pero no existe el sangrado perimetral establecido para este perfil de edición (3 mm en los bordes superior y exterior).
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      Acción: Ajustar fondos en InDesign o expandir BleedBox geométrica
                    </span>
                  </div>
                </div>

                {/* Item 2: Low-res image */}
                <div
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    borderLeft: '4px solid #dc2626'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }}>
                        [CRÍTICO] RESOLUCIÓN INSUFICIENTE DE IMAGEN
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>
                        Página 7: 'fotografia_portadilla.jpg' a 172 DPI
                      </h4>
                    </div>
                    <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      IMAGEN
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    La imagen se imprimirá con pérdida de nitidez frente al umbral recomendado para este perfil editorial (300 DPI efectivos en cuatricromía).
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        background: 'rgba(220, 38, 38, 0.1)',
                        fontSize: '0.75rem',
                        color: '#f87171',
                        fontWeight: 600
                      }}
                    >
                      Límite técnico: No es posible reescalar sin inventar píxeles. Sustituir en maqueta por imagen original de alta calidad.
                    </span>
                  </div>
                </div>

                {/* Item 3: Rich Black */}
                <div
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    borderLeft: '4px solid #3b82f6'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' }}>
                        [OPTIMIZACIÓN] TEXTO EN NEGRO DE 4 TINTAS (RICH BLACK)
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>
                        Páginas 12, 19: Texto corrido de 9 pt compuesto en C:60 M:50 Y:50 K:100
                      </h4>
                    </div>
                    <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      TINTA / TAC
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    Riesgo de falta de registro en prensa offset para tipografía pequeña.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        fontSize: '0.75rem',
                        color: '#60a5fa'
                      }}
                    >
                      Corrección automática disponible: Re-mapear texto fino exclusivamente a 100% Black (K).
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Inside Demo */}
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a
                  href="https://preflight.printprice.pro/"
                  className="btn-primary"
                  style={{ padding: '0.875rem 2rem', fontSize: '1rem', display: 'inline-block' }}
                >
                  {t.ctaPrimary}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Fixes & Limits */}
      <Section variant="secondary">
        <Container>
          <div style={{ maxWidth: '850px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
            <span className="pill-badge" style={{ marginBottom: '1rem' }}>
              TRANSPARENCIA TÉCNICA
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              {t.limitsTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {t.limitsSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '1.5rem' }}>
            {t.limits.map((item, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-primary)',
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{item.feature}</h4>
                    <span
                      className="technical-text"
                      style={{
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: item.type === 'safe' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                        color: item.type === 'safe' ? '#4ade80' : '#facc15',
                        fontWeight: 700
                      }}
                    >
                      {item.action}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {item.limit}
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
              ANÁLISIS DOCUMENTAL COMPARATIVO
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              Comparativa objetiva de soluciones de Preflight
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Basado en la documentación técnica oficial vigente de cada producto (Revisión: Octubre 2026).
            </p>

            {/* Selector de Pestañas */}
            <div
              style={{
                display: 'inline-flex',
                gap: '0.5rem',
                background: 'var(--bg-secondary)',
                padding: '0.35rem',
                borderRadius: '12px',
                marginTop: '1.5rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <button
                onClick={() => setActiveTab('individual')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  background: activeTab === 'individual' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'individual' ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                A. Particulares y Editoriales
              </button>
              <button
                onClick={() => setActiveTab('pro')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  background: activeTab === 'pro' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'pro' ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                B. Flujos Profesionales e Imprentas
              </button>
            </div>
          </div>

          {/* Tabla A */}
          {activeTab === 'individual' && (
            <div>
              <div className="table-scroll-hint">
                <span>⇄ Desplaza horizontalmente para ver la tabla completa</span>
              </div>
              <div className="comparison-table-wrapper">
                <table style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '22%' }}>Criterio</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%', color: 'var(--accent-primary)', fontWeight: 800 }}>
                        PrintPrice Preflight (Web)
                      </th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%' }}>Adobe Acrobat Pro</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%' }}>Enfocus PitStop Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Forma de acceso</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Navegador web (SaaS cloud). Sin registro previo obligatorio.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Escritorio local (macOS / Windows).
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Plugin ejecutado dentro de Adobe Acrobat.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Instalación requerida</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>No aplica</strong><br />Cero instalación local; funciona en cualquier navegador moderno.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Requiere Acrobat Pro y Adobe Creative Cloud.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Requiere instalación de Acrobat + plugin PitStop.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Conocimientos necesarios</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Nivel accesible: traduce códigos técnicos a recomendaciones prácticas de maquetación.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Nivel medio/avanzado: requiere conocer cajas de página, perfiles ICC y normas ISO.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Especialista de preimpresión: curvas de aprendizaje altas para crear Action Lists.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Lectura del informe</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Informe web interactivo con índice de riesgo, páginas afectadas y avisos priorizados.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Panel modal en pantalla con exportación de resultados a PDF o XML.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Navegador interactivo con resaltado directo sobre el objeto gráfico en el visor.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Corrección y edición</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Depende de edición o configuración</strong><br />Reparaciones deterministas (TrimBox, BleedBox, OutputIntent). Sin edición vectorial directa.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Fixups automáticos predefinidos. Edición básica de textos y objetos.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Edición quirúrgica profunda de vectores, textos, trazados y tintas en el propio PDF.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Modelo de licencia</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Uso individual freemium en web; planes por volumen y API para empresas.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Suscripción mensual o anual a Adobe Creative Cloud o Acrobat Pro.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Suscripción anual o compra de licencia perpetua con mantenimiento.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tabla B */}
          {activeTab === 'pro' && (
            <div>
              <div className="table-scroll-hint">
                <span>⇄ Desplaza horizontalmente para ver la tabla completa</span>
              </div>
              <div className="comparison-table-wrapper">
                <table style={{ width: '100%', minWidth: '950px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '20%' }}>Dimensión</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '27%', color: 'var(--accent-primary)', fontWeight: 800 }}>
                        PrintPrice Preflight OS
                      </th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '27%' }}>Enfocus PitStop Server</th>
                      <th style={{ padding: '1.25rem 1rem', textAlign: 'left', width: '26%' }}>callas pdfToolbox Server</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Perfiles configurables</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Perfiles deterministas definidos en contratos JSON (Offset, Digital, PDF/X-4).
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Perfiles y Action Lists configurables desde interfaz gráfica de PitStop Pro.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Process Plans con lógica condicional avanzada, JavaScript y perfiles GWG.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Estándares y alcance</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Evaluación de conformidad ISO 15930 (PDF/X-1a, PDF/X-4) con integración veraPDF.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Validación completa de PDF/X-1a hasta PDF/X-6 y especificaciones Ghent Workgroup.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Motor de referencia oficial para la Ghent Workgroup e ISO (PDF/X, PDF/A, PDF/VT).
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Procesamiento por lotes</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Microservicios asíncronos distribuidos en colas Redis para escalado horizontal.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Motor multihilo optimizado para colas concurrentes en servidores locales.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Motor multinúcleo de alto rendimiento para miles de páginas por minuto.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Hot Folders (Carpetas calientes)</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>No aplica</strong> (Nativo web)<br />Infraestructura 100% cloud/API. Integrable en red local mediante conectores REST.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Monitorización nativa de carpetas de entrada, éxito y error en redes SMB/NFS.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Monitorización automatizada de carpetas locales y almacenamiento compartido.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>CLI, SDK o API</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible (API REST)</strong><br />API REST nativa JSON/multipart (/preflight/analyze, /preflight/autofix).
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible (CLI)</strong><br />Línea de comandos (CLI) incluida para integración con scripts y Switch.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible (CLI y SDK)</strong><br />CLI independiente y SDK de integración nativa (C/C++, Java, .NET, Python).
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>Trazabilidad y original</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>
                        <strong>Disponible</strong><br />Preservación estricta del original y hash SHA-256 de auditoría técnica.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />El archivo original se mueve a la carpeta de archivo; el reparado se crea aparte.
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>Disponible</strong><br />Políticas de backup y conservación de versiones originales antes de transformar.
                      </td>
                    </tr>
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
              Consulta la documentación técnica completa del motor Preflight en docs.printprice.pro ➔
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
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 800, marginTop: '0.1rem' }}>✓</span>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {t.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-card"
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.75rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 10. Disclaimers & Final Action CTA */}
      <Section variant="secondary" style={{ borderTop: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', marginBottom: '1.25rem' }}>
              {t.title}
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {t.subheadline}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a
                href="https://preflight.printprice.pro/"
                className="btn-primary"
                style={{ padding: '1rem 2.5rem', fontSize: '1.05rem', fontWeight: 700 }}
              >
                {t.ctaPrimary}
              </a>
              <Link
                href="/for-authors"
                className="btn-secondary"
                style={{ padding: '1rem 2rem', fontSize: '1rem' }}
              >
                Ver flujo para autores
              </Link>
            </div>

            {/* Mandatory Disclaimer */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                textAlign: 'left'
              }}
            >
              <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>
                LIMITACIÓN DE RESPONSABILIDAD TÉCNICA
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                PrintPrice Preflight evalúa la conformidad técnica de documentos PDF según las especificaciones del perfil seleccionado. 
                Los resultados no constituyen una certificación universal de imprenta ni sustituyen la corrección editorial, la prueba de color de contrato ni la aprobación final de producción por parte del taller gráfico.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Permanent Brand Slogan */}
      <div style={{ textAlign: 'center', padding: '3rem 0 5rem', opacity: 0.5 }}>
        <p className="technical-text" style={{ fontSize: '0.85rem', letterSpacing: '0.25em' }}>
          PRICE IT. FIX IT. PRINT IT.
        </p>
      </div>
    </div>
  );
}

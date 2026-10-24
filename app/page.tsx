'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { useLocale } from '@/lib/i18n';

export default function Home() {
  const { dict, locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'price' | 'fix' | 'print'>('price');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 1. PRODUCTOS — Qué puedes hacer (The 3 Core Pillars)
  const CORE_PRODUCTS = [
    {
      id: 'price-it',
      pillar: '01 / PRICE IT',
      title: 'Price it',
      tagline: locale === 'es' 
        ? 'Calculador de precios de impresión de libros'
        : locale === 'de'
        ? 'Preiskalkulator für den Buchdruck'
        : 'Print book pricing calculator',
      description: locale === 'es'
        ? 'Calcula el coste de producción en segundos. Compara tecnología digital vs offset según tirada, estima el grosor de lomo exacto y vincula precios de papel actualizados sin registro obligatorio ni suscripciones.'
        : locale === 'de'
        ? 'Berechnen Sie reale Produktionskosten in Sekundenschnelle. Vergleichen Sie Digital- und Offsetdruck, berechnen Sie die exakte Rückendicke und binden Sie aktuelle Papierpreise ein.'
        : 'Calculate production costs in seconds. Compare digital vs offset press runs, compute exact spine thickness, and integrate live paper rates with no compulsory sign-up or subscriptions.',
      primaryCtaText: locale === 'es' ? 'Calcular precio ahora ➔' : locale === 'de' ? 'Preis jetzt kalkulieren ➔' : 'Calculate price now ➔',
      primaryCtaHref: 'https://budget.printprice.pro/',
      secondaryCtaText: locale === 'es' ? 'Conocer motor Budget' : locale === 'de' ? 'Budget-Engine Details' : 'About Budget Engine',
      secondaryCtaHref: '/products/budget',
      icon: '💶',
      badge: 'PRICE IT',
    },
    {
      id: 'fix-it',
      pillar: '02 / FIX IT',
      title: 'Fix it',
      tagline: locale === 'es'
        ? 'Preflight técnico de archivos PDF'
        : locale === 'de'
        ? 'Technisches PDF-Preflight'
        : 'Technical PDF preflight inspection',
      description: locale === 'es'
        ? 'Comprueba y prepara tu archivo antes de entrar a máquina. Detecta sangres perimetrales de 3 mm, resolución efectiva a 300 DPI, espacios de color CMYK y tipografías incrustadas con explicaciones claras y directas.'
        : locale === 'de'
        ? 'Prüfen und bereiten Sie Ihre Datei vor dem Druck auf. Erkennt 3 mm Randbeschnitt, 300 DPI Bildauflösung, CMYK-Farbräume und Schrifteinbettung mit verständlichen Hinweisen.'
        : 'Inspect and prepare your artwork file before it reaches the press. Detects 3mm bleeds, 300 DPI effective resolution, CMYK gamuts, and font glyphs with clear, actionable diagnostics.',
      primaryCtaText: locale === 'es' ? 'Comprobar PDF gratis ➔' : locale === 'de' ? 'PDF kostenlos prüfen ➔' : 'Check PDF for free ➔',
      primaryCtaHref: 'https://preflight.printprice.pro/',
      secondaryCtaText: locale === 'es' ? 'Ver capacidades y auditoría' : locale === 'de' ? 'Funktionen & Prüfung' : 'View audit features',
      secondaryCtaHref: '/products/preflight',
      icon: '🛡️',
      badge: 'FIX IT',
    },
    {
      id: 'print-it',
      pillar: '03 / PRINT IT',
      title: 'Print it',
      tagline: locale === 'es'
        ? 'Marketplace de producción con talleres homologados'
        : locale === 'de'
        ? 'Produktions-Marketplace mit Partnerdruckereien'
        : 'Production marketplace with vetted plants',
      description: locale === 'es'
        ? 'Encuentra la imprenta adecuada y encarga la producción. Conecta las especificaciones presupuestadas y tu archivo validado con talleres acreditados mediante trazabilidad inmutable (evidenceId).'
        : locale === 'de'
        ? 'Finden Sie den passenden Betrieb und beauftragen Sie die Fertigung. Verbindet kalkulierte Spezifikationen und geprüfte Daten mit zertifizierten Druckereien über evidenceId.'
        : 'Find the right printer and commission production. Connects budgeted specifications and validated files directly with accredited plants backed by immutable evidenceId traceability.',
      primaryCtaText: locale === 'es' ? 'Configurar y encargar ➔' : locale === 'de' ? 'Projekt konfigurieren ➔' : 'Configure & order ➔',
      primaryCtaHref: 'https://budget.printprice.pro/',
      secondaryCtaText: locale === 'es' ? 'Cómo funciona el marketplace' : locale === 'de' ? 'Marketplace-Ablauf' : 'How the marketplace works',
      secondaryCtaHref: '/products/print',
      icon: '🏭',
      badge: 'PRINT IT',
      disclaimer: locale === 'es'
        ? '* El encargo para compradores se activa a través de Budget conectando con talleres homologados. Control Plane está reservado a la operativa interna de imprentas.'
        : locale === 'de'
        ? '* Auftragserteilung erfolgt über das Budget-Modul an Partnerbetriebe. Control Plane ist Druckereien vorbehalten.'
        : '* Buyer ordering is initiated via Budget connecting with vetted partner plants. Control Plane is strictly the printer operational backend.',
    },
  ];

  // 2. PÚBLICOS — Para quién (The 4 Audiences)
  const STAKEHOLDER_CARDS = [
    {
      id: 'authors',
      title: dict.home.authorsTitle,
      tagline: dict.home.authorsTagline,
      description: dict.home.authorsDesc,
      badge: dict.home.authorsBadge,
      toolsTag: 'PRICE IT · FIX IT · MAQUETA 3D',
      href: '/for-authors',
      ctaText: dict.home.authorsCta,
      icon: '📖',
    },
    {
      id: 'publishers',
      title: dict.home.publishersTitle,
      tagline: dict.home.publishersTagline,
      description: dict.home.publishersDesc,
      badge: dict.home.publishersBadge,
      toolsTag: 'PRICE IT · FIX IT · PRINT IT',
      href: '/for-publishers',
      ctaText: dict.home.publishersCta,
      icon: '📚',
    },
    {
      id: 'printhouses',
      title: dict.home.printhousesTitle,
      tagline: dict.home.printhousesTagline,
      description: dict.home.printhousesDesc,
      badge: dict.home.printhousesBadge,
      toolsTag: 'CONTROL PLANE · PRINT IT INTAKE',
      href: '/for-printhouses',
      ctaText: dict.home.printhousesCta,
      extraLink: {
        text: locale === 'es' ? 'Alta de taller ↗' : locale === 'de' ? 'Druckerei-Registrierung ↗' : 'Printhouse signup ↗',
        href: 'https://control.printprice.pro/printhouse/register'
      },
      icon: '⚙️',
    },
    {
      id: 'suppliers',
      title: dict.home.suppliersTitle,
      tagline: dict.home.suppliersTagline,
      description: dict.home.suppliersDesc,
      badge: dict.home.suppliersBadge,
      toolsTag: 'PAPER SUPPLIER HUB · CONTROL PLANE',
      href: '/for-paper-suppliers',
      ctaText: dict.home.suppliersCta,
      extraLink: {
        text: locale === 'es' ? 'Alta de proveedor ↗' : locale === 'de' ? 'Lieferanten-Registrierung ↗' : 'Supplier signup ↗',
        href: 'https://control.printprice.pro/supplier/register'
      },
      icon: '📄',
    },
  ];

  // 3. COMPARATIVAS ORGANIZADAS POR PRODUCTO (User explicit mandate)
  // Tab 1: PRICE IT (Cálculo y Presupuestación)
  const COMPARISON_PRICE = [
    {
      feature: locale === 'es' ? 'Cálculo de presupuesto inmediato sin registro' : locale === 'de' ? 'Sofortige Kalkulation ohne Registrierungspflicht' : 'Instant budget estimate without compulsory signup',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Manual (24-72h)' : locale === 'de' ? 'Manuell (24-72 Std.)' : 'Manual (24-72h)',
      lulu: locale === 'es' ? 'Mediante registro' : locale === 'de' ? 'Über Registrierung' : 'Via registration',
      gelato: locale === 'es' ? 'Mediante B2B' : locale === 'de' ? 'Über B2B' : 'Via B2B',
      notes: locale === 'es' ? 'Budget calcula de inmediato con matrices reales en servidor.' : locale === 'de' ? 'Budget kalkuliert sofort ohne Vorab-Konto auf dem Server.' : 'Budget computes instantly using live server cost matrices.',
    },
    {
      feature: locale === 'es' ? 'Desglose transparente entre impresión y papel' : locale === 'de' ? 'Transparente Aufteilung von Druck und Papier' : 'Transparent separation between printing and paper',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Opaco / Global' : locale === 'de' ? 'Intransparent / Global' : 'Opaque / Bundled',
      lulu: locale === 'es' ? 'No disponible' : locale === 'de' ? 'Nicht verfügbar' : 'Not available',
      gelato: locale === 'es' ? 'No disponible' : locale === 'de' ? 'Nicht verfügbar' : 'Not available',
      notes: locale === 'es' ? 'Paper Supplier Hub desglosa el coste de sustrato y el porte logístico.' : locale === 'de' ? 'Paper Supplier Hub trennt Materialpreis und Frachtkosten namentlich.' : 'Paper Supplier Hub strictly decouples substrate cost from freight.',
    },
    {
      feature: locale === 'es' ? 'Punto de cruce automático entre digital y offset' : locale === 'de' ? 'Automatische Break-Even-Berechnung Digital vs. Offset' : 'Automatic crossover calculation between digital and offset',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Depende de cotizador' : locale === 'de' ? 'Abhängig von Sachbearbeiter' : 'Estimator dependent',
      lulu: locale === 'es' ? 'Solo digital / POD' : locale === 'de' ? 'Nur Digital / POD' : 'Digital / POD only',
      gelato: locale === 'es' ? 'Solo digital / POD' : locale === 'de' ? 'Nur Digital / POD' : 'Digital / POD only',
      notes: locale === 'es' ? 'Determina en qué volumen exacto de ejemplares conviene cambiar de tecnología.' : locale === 'de' ? 'Bestimmt exakt die Auflagenschwelle für den Technologiewechsel.' : 'Pinpoints the exact copy threshold to transition from digital to offset press.',
    },
    {
      feature: locale === 'es' ? 'Matrices reales calibradas por talleres homologados' : locale === 'de' ? 'Reale Maschinenkosten hinterlegt von Partnerbetrieben' : 'Real machine rates calibrated by accredited plants',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Presupuesto individual' : locale === 'de' ? 'Einzelangebot' : 'Single quote',
      lulu: locale === 'es' ? 'Tarifa fija cerrada' : locale === 'de' ? 'Feste Einheitstarife' : 'Fixed closed pricing',
      gelato: locale === 'es' ? 'Tarifa fija cerrada' : locale === 'de' ? 'Feste Einheitstarife' : 'Fixed closed pricing',
      notes: locale === 'es' ? 'Costes horarios, mermas de arranque y pliegos modelados en Control Plane.' : locale === 'de' ? 'Stundensätze, Rüstzeiten und Bogenformate aus dem Control Plane.' : 'Hourly rates, makeready waste, and imposition sheets from Control Plane.',
    },
    {
      feature: locale === 'es' ? 'Ficha técnica inmutable con identificador único (evidenceId)' : locale === 'de' ? 'Unveränderlicher Prüf- und Kalkulations-Hash (evidenceId)' : 'Immutable technical ticket with hash (evidenceId)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Albarán / Email' : locale === 'de' ? 'Lieferschein / E-Mail' : 'Email / Packing slip',
      lulu: locale === 'es' ? 'Número de pedido' : locale === 'de' ? 'Bestellnummer' : 'Order number',
      gelato: locale === 'es' ? 'ID de encargo' : locale === 'de' ? 'Auftrags-ID' : 'Job ID',
      notes: locale === 'es' ? 'Garantiza que la orden de producción se ejecute con las especificaciones exactas.' : locale === 'de' ? 'Stellt sicher, dass der Auftrag exakt nach Spezifikation gefertigt wird.' : 'Guarantees the job runs against audited specs without drift.',
    },
  ];

  // Tab 2: FIX IT (Preflight y Preparación de PDF) — Official Sources from PREFLIGHT_COMPARISON_SOURCES.md
  const COMPARISON_FIX = [
    {
      feature: locale === 'es' ? 'Comprobación web directa sin instalación de software' : locale === 'de' ? 'Direkte Web-Prüfung ohne Softwareinstallation' : 'Direct browser preflight without desktop software installation',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'No aplica' : locale === 'de' ? 'Nicht anwendbar' : 'Not applicable',
      pitstop: locale === 'es' ? 'Mediante servidor' : locale === 'de' ? 'Über Server' : 'Via server',
      pdftoolbox: locale === 'es' ? 'Mediante servidor' : locale === 'de' ? 'Über Server' : 'Via server',
      notes: locale === 'es' ? 'Preflight se ejecuta directamente en navegador sin licencias de escritorio pesadas.' : locale === 'de' ? 'Preflight läuft browserbasiert ohne Desktop-Lizenzen.' : 'Preflight executes in browser with no heavy desktop licenses required.',
    },
    {
      feature: locale === 'es' ? 'Detección perimetral de sangres (TrimBox y BleedBox)' : locale === 'de' ? 'Beschnittprüfung (TrimBox und BleedBox)' : 'Perimeter bleed audit (TrimBox and BleedBox)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Comprueba los 3 mm obligatorios en los 4 bordes para evitar filos blancos de guillotina.' : locale === 'de' ? 'Prüft 3 mm Randbeschnitt an allen vier Kanten gegen weiße Blitzer.' : 'Verifies mandatory 3mm margins across all 4 edges to prevent trim slivers.',
    },
    {
      feature: locale === 'es' ? 'Auditoría de resolución efectiva con localización por página (<300 DPI)' : locale === 'de' ? 'Effektive Bildauflösung seitengenau (<300 DPI)' : 'Effective image DPI audit with page localization (<300 DPI)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Señala imágenes por debajo de 300 DPI indicando la página exacta donde se ubican.' : locale === 'de' ? 'Lokalisiert Bilder unter 300 DPI seitengenau im Prüfbericht.' : 'Pinpoints images below 300 DPI with exact page coordinates.',
    },
    {
      feature: locale === 'es' ? 'Diagnóstico accesible sin tecnicismos complejos' : locale === 'de' ? 'Verständlicher Prüfbericht ohne Fachchinesisch' : 'Clear actionable diagnostics without esoteric jargon',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Requiere formación' : locale === 'de' ? 'Schulung erforderlich' : 'Requires training',
      pitstop: locale === 'es' ? 'Uso industrial avanzado' : locale === 'de' ? 'Fortgeschrittene Nutzung' : 'Advanced industrial',
      pdftoolbox: locale === 'es' ? 'Uso industrial avanzado' : locale === 'de' ? 'Fortgeschrittene Nutzung' : 'Advanced industrial',
      notes: locale === 'es' ? 'Explica con claridad al autor o diseñador qué debe corregir en su maquetación.' : locale === 'de' ? 'Erklärt Autoren verständlich, wie Fehler im Layout behoben werden.' : 'Guides creators and designers plainly on how to remediate layout flaws.',
    },
    {
      feature: locale === 'es' ? 'Corrección geométrica asistida de sangrado (BleedBox)' : locale === 'de' ? 'Assistiere geometrische Beschnittanpassung (BleedBox)' : 'Assisted geometric bleed remediation (BleedBox)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Depende de edición' : locale === 'de' ? 'Versionsabhängig' : 'Edition dependent',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Ajusta cajas PDF cuando el arte incluye fondo suficiente pero falta caja de sangrado.' : locale === 'de' ? 'Passt PDF-Boxen an, wenn Hintergrundfläche vorhanden ist.' : 'Expands PDF page boxes when background art exceeds trim bounds.',
    },
    {
      feature: locale === 'es' ? 'Firma criptográfica del informe vinculada a producción (evidenceId)' : locale === 'de' ? 'Kryptografische Berichtssignatur für Druckauftrag (evidenceId)' : 'Cryptographic audit signature linked to order (evidenceId)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'No aplica' : locale === 'de' ? 'Nicht anwendbar' : 'Not applicable',
      pitstop: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      pdftoolbox: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      notes: locale === 'es' ? 'Hash SHA-256 inmutable que garantiza que el impresor recibe el archivo auditado.' : locale === 'de' ? 'SHA-256-Hash stellt sicher, dass der Drucker die geprüfte Datei erhält.' : 'SHA-256 hash ensuring plant prints the exact preflighted asset.',
    },
  ];

  // Tab 3: PRINT IT (Búsqueda, Contratación y Seguimiento)
  const COMPARISON_PRINT = [
    {
      feature: locale === 'es' ? 'Enrutamiento con talleres homologados independientes' : locale === 'de' ? 'Vermittlung an unabhängige zertifizierte Druckereien' : 'Routing to independent vetted industrial plants',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      closedNetworks: locale === 'es' ? 'Red cautiva cerrada' : locale === 'de' ? 'Geschlossenes Netzwerk' : 'Closed captive network',
      traditionalBrokers: locale === 'es' ? 'Taller discrecional' : locale === 'de' ? 'Intransparente Vergabe' : 'Discretionary broker plant',
      notes: locale === 'es' ? 'El algoritmo Matchmaker selecciona talleres según el formato de máquina idóneo.' : locale === 'de' ? 'Matchmaker-Algorithmus wählt Betriebe nach optimalem Maschinenformat.' : 'Matchmaker assigns plants according to ideal imposition sheet formats.',
    },
    {
      feature: locale === 'es' ? 'Trazabilidad inmutable de especificaciones (evidenceId)' : locale === 'de' ? 'Unveränderliche Vorgaben-Rückverfolgung (evidenceId)' : 'Immutable job specifications trace (evidenceId)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      closedNetworks: locale === 'es' ? 'No confirmado' : locale === 'de' ? 'Nicht bestätigt' : 'Not confirmed',
      traditionalBrokers: locale === 'es' ? 'Albarán / Email' : locale === 'de' ? 'Lieferschein / E-Mail' : 'Email paper trail',
      notes: locale === 'es' ? 'El identificador vincula presupuesto, archivo validado y orden física de impresión.' : locale === 'de' ? 'Kryptografische ID verbindet Angebot, geprüfte Datei und Auftrag.' : 'Binds quote, validated artwork, and physical job ticket cryptographically.',
    },
    {
      feature: locale === 'es' ? 'Preflight técnico obligatorio antes de entrar a máquina' : locale === 'de' ? 'Verpflichtendes technisches Preflight vor Maschinengang' : 'Mandatory technical preflight before press run',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      closedNetworks: locale === 'es' ? 'Filtro automático básico' : locale === 'de' ? 'Einfacher Basisfilter' : 'Basic automated filter',
      traditionalBrokers: locale === 'es' ? 'Revisión manual / Extra' : locale === 'de' ? 'Manuelle Prüfung / Aufpreis' : 'Manual review / Surcharge',
      notes: locale === 'es' ? 'Evita paradas de prensa costosas por archivos con sangrado ausente o fuentes no incrustadas.' : locale === 'de' ? 'Verhindert Maschinenstillstand durch fehlenden Beschnitt oder Schriften.' : 'Prevents costly plant stop-press due to missing bleeds or raster flaws.',
    },
    {
      feature: locale === 'es' ? 'Espacio operativo independiente para el taller (Control Plane)' : locale === 'de' ? 'Unabhängige Betriebskonsole für Druckereien (Control Plane)' : 'Independent operations console for printers (Control Plane)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      closedNetworks: locale === 'es' ? 'Portal de proveedor cautivo' : locale === 'de' ? 'Geschlossenes Portal' : 'Captive vendor portal',
      traditionalBrokers: locale === 'es' ? 'No disponible' : locale === 'de' ? 'Nicht verfügbar' : 'Not available',
      notes: locale === 'es' ? 'Los talleres modelan sus máquinas y gestionan órdenes con estricto aislamiento de datos.' : locale === 'de' ? 'Druckereien verwalten Maschinen und Aufträge mit strengem Datenschutz.' : 'Plants configure presses and manage jobs under strict tenant data isolation.',
    },
    {
      feature: locale === 'es' ? 'Desacoplamiento estricto de coste de fabricación vs. transporte' : locale === 'de' ? 'Strikte Trennung von Fertigungs- und Frachtkosten' : 'Strict decoupling of manufacturing cost vs. freight logistics',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      closedNetworks: locale === 'es' ? 'Porte empaquetado opaco' : locale === 'de' ? 'In Mischkalkulation verdeckt' : 'Bundled opaque shipping',
      traditionalBrokers: locale === 'es' ? 'Variable discrecional' : locale === 'de' ? 'Intransparenter Zuschlag' : 'Discretionary freight markup',
      notes: locale === 'es' ? 'Desglose nítido para saber exactamente cuánto cuesta imprimir y cuánto transportar.' : locale === 'de' ? 'Klare Aufschlüsselung: Was kostet der Druck, was die Logistik?' : 'Crisp transparency on actual printing production versus shipping freight.',
    },
  ];

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* 
        HERO SECTION WITH FLOATING RED DOT PARTICLES (Approved Onboarding Aesthetic)
      */}
      <HeroPlatform
        variant="particles"
        label={dict.home.heroLabel}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={true}
        subheadline={
          <>
            <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.5rem' }}>
              {dict.home.heroTitle}
            </span>
            <span>{dict.home.heroSubtitle}</span>
          </>
        }
        primaryAction={{
          label: dict.home.heroCtaPrimary,
          href: "https://budget.printprice.pro/",
          sublabel: `${dict.home.heroCheck1} · ${dict.home.heroCheck2} · ${dict.home.heroCheck3}`,
        }}
        secondaryAction={{
          label: locale === 'es' ? 'Ver los tres productos ➔' : locale === 'de' ? 'Die drei Produkte ansehen ➔' : 'Explore the 3 products ➔',
          href: "#productos",
        }}
        rightContent={
          <div
            className="rounded-card"
            style={{
              background: 'rgba(24, 24, 27, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              maxWidth: '460px',
              marginLeft: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
                TECHNICAL BOOK PROFILE
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                PREFLIGHT READY
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Format:</span>
                <span style={{ fontWeight: 600 }}>150 × 210 mm (A5 Custom)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Extent:</span>
                <span style={{ fontWeight: 600 }}>240 pages (B&amp;W 1+1)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Substrate:</span>
                <span style={{ fontWeight: 600 }}>80 gsm Munken Pure Cream</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Binding:</span>
                <span style={{ fontWeight: 600 }}>Thread Sewn Softcover + Flaps</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Calculated Spine:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>14.8 mm ±0.2mm</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>evidenceId: sha256:7f8e...4b</span>
              <a href="https://budget.printprice.pro/" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                {dict.nav.start} ➔
              </a>
            </div>
          </div>
        }
      />

      {/* 
        SECCIÓN 1: PRODUCTOS — QUÉ PUEDES HACER (Explica la propuesta primero: PRICE IT. FIX IT. PRINT IT.)
      */}
      <section
        id="productos"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              PRODUCTOS — QUÉ PUEDES HACER
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.85rem)', marginBottom: '1rem', letterSpacing: '-0.02em', fontWeight: 900 }}>
              PRICE IT. FIX IT. PRINT IT.
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {dict.home.productsSubtitle}
            </p>
          </div>

          {/* 3 Core Product Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {CORE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-card"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  boxShadow: 'var(--shadow-dropdown)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '2.25rem' }}>{prod.icon}</span>
                    <span
                      style={{
                        fontSize: '0.675rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--accent-container)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {prod.pillar}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                    {prod.title}
                  </h3>

                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {prod.tagline}
                  </p>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {prod.description}
                  </p>

                  {prod.disclaimer && (
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                      {prod.disclaimer}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  <a
                    href={prod.primaryCtaHref}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.85rem 1.25rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    {prod.primaryCtaText}
                  </a>

                  <Link
                    href={prod.secondaryCtaHref}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.7rem 1.25rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    {prod.secondaryCtaText} ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Complementary Tool: Maqueta 3D */}
          <div
            className="rounded-card"
            style={{
              padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.04) 0%, var(--bg-secondary) 100%)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.75rem, 2vw, 1.25rem)', flexWrap: 'wrap', flex: '1 1 260px' }}>
              <span style={{ fontSize: '2rem', lineHeight: 1 }}>📖</span>
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.975rem', lineHeight: 1.4 }}>
                    {locale === 'es' ? 'Herramienta complementaria de visualización: Maqueta 3D Interactiva' : locale === 'de' ? 'Ergänzende 3D-Vorschau: Interaktives Buch-Mockup' : 'Complementary visualization tool: Interactive 3D Mockup'}
                  </span>
                  <span style={{ fontSize: '0.625rem', background: 'var(--accent-container)', color: 'var(--accent-primary)', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 800 }}>
                    COMPLEMENTARIA
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {locale === 'es'
                    ? 'Visualiza la cubierta, contraportada y grosor de lomo calculado en tu navegador antes de encargar la tirada física.'
                    : locale === 'de'
                    ? 'Prüfen Sie Umschlag, Rückenstärke und Aufschlagverhalten direkt im Browser vor Auftragserteilung.'
                    : 'Preview cover, back, and computed spine thickness in your browser before ordering the physical run.'}
                </p>
              </div>
            </div>

            <Link
              href="/products/mockup"
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
            >
              {locale === 'es' ? 'Ver Maqueta 3D ➔' : locale === 'de' ? '3D-Mockup ansehen ➔' : 'View 3D Mockup ➔'}
            </Link>
          </div>
        </Container>
      </section>

      {/* 
        SECCIÓN 2: PÚBLICOS — PARA QUIÉN (4 Entradas especializadas conectadas con sus herramientas y registros)
      */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              PÚBLICOS — PARA QUIÉN
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.home.stakeholdersHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.home.stakeholdersSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {STAKEHOLDER_CARDS.map((card) => (
              <div
                key={card.id}
                className="rounded-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '2rem' }}>{card.icon}</span>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--accent-container)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {card.tagline}
                  </p>

                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.04em', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
                    {card.toolsTag}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {card.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    href={card.href}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    {card.ctaText} ➔
                  </Link>

                  {card.extraLink && (
                    <a
                      href={card.extraLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '0.775rem',
                        color: 'var(--accent-primary)',
                        fontWeight: 700,
                        textDecoration: 'none',
                        padding: '0.35rem 0',
                      }}
                    >
                      {card.extraLink.text}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 
        SECCIÓN 3: CÓMO FUNCIONA / WORKFLOW END-TO-END
      */}
      <section
        id="how-it-works"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="pill-badge">
                WORKFLOW INDUSTRIAL
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.home.howHeading}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {dict.home.howSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                01
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRICE IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.home.step1Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.home.step1Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                02
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                FIX IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.home.step3Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.home.step3Desc}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                03
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                VISUALIZAR
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Maqueta 3D</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {locale === 'es'
                  ? 'Simulación tridimensional interactiva del lomo y cubiertas basada en el gramaje y páginas calculadas.'
                  : locale === 'de'
                  ? 'Interaktive 3D-Simulation von Buchrücken und Umschlag basierend auf Papiergrammatur und Seitenzahl.'
                  : 'Interactive 3D simulation of spine and cover based on calculated paper basis weight and page count.'}
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                04
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                PRINT IT.
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.home.step4Title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {dict.home.step4Desc}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 
        SECCIÓN 4: COMPARATIVAS ORGANIZADAS POR PRODUCTO (PRICE IT, FIX IT, PRINT IT)
      */}
      <section
        id="comparativas"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              COMPARATIVAS POR PRODUCTO
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {dict.home.compHeading}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {dict.home.compSubtitle}
            </p>

            {/* Selector de Pestañas: PRICE IT, FIX IT, PRINT IT */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--bg-secondary)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-color)',
                marginTop: '1.5rem',
                gap: '0.25rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('price')}
                style={{
                  border: 'none',
                  background: activeTab === 'price' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'price' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {dict.home.tabPriceIt}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('fix')}
                style={{
                  border: 'none',
                  background: activeTab === 'fix' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'fix' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {dict.home.tabFixIt}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('print')}
                style={{
                  border: 'none',
                  background: activeTab === 'print' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'print' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {dict.home.tabPrintIt}
              </button>
            </div>
          </div>

          {/* TAB 1: PRICE IT — Cálculo y Presupuestación */}
          {activeTab === 'price' && (
            <>
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>{dict.home.compFeature}</th>
                      <th style={{ width: '18%', color: 'var(--accent-primary)' }}>PrintPrice Pro (Budget)</th>
                      <th style={{ width: '14%' }}>Tradicional / Manual</th>
                      <th style={{ width: '14%' }}>Lulu</th>
                      <th style={{ width: '12%' }}>Gelato</th>
                      <th style={{ width: '12%' }}>{dict.home.compScope}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_PRICE.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{row.feature}</td>
                        <td>
                          <span className="badge-available">{row.printprice}</span>
                        </td>
                        <td>
                          <span className="badge-module">{row.traditional}</span>
                        </td>
                        <td>
                          <span className={row.lulu.includes('Disponible') || row.lulu.includes('Available') ? 'badge-available' : 'badge-module'}>
                            {row.lulu}
                          </span>
                        </td>
                        <td>
                          <span className={row.gelato.includes('Disponible') || row.gelato.includes('Available') ? 'badge-available' : 'badge-integration'}>
                            {row.gelato}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-scroll-hint" role="note" aria-label="Desplazamiento horizontal disponible">
                <span>⇄ {locale === 'es' ? 'Desliza horizontalmente para ver todas las columnas' : locale === 'de' ? 'Horizontal wischen für alle Spalten' : 'Scroll horizontally to view all columns'}</span>
              </div>
            </>
          )}

          {/* TAB 2: FIX IT — Preflight y Preparación de PDF */}
          {activeTab === 'fix' && (
            <>
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th style={{ width: '28%' }}>{dict.home.compFeature}</th>
                      <th style={{ width: '18%', color: 'var(--accent-primary)' }}>PrintPrice Preflight</th>
                      <th style={{ width: '15%' }}>Adobe Acrobat Pro</th>
                      <th style={{ width: '15%' }}>Enfocus PitStop</th>
                      <th style={{ width: '12%' }}>callas pdfToolbox</th>
                      <th style={{ width: '12%' }}>{dict.home.compScope}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_FIX.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{row.feature}</td>
                        <td>
                          <span className="badge-available">{row.printprice}</span>
                        </td>
                        <td>
                          <span className={row.acrobat.includes('Disponible') || row.acrobat.includes('Available') ? 'badge-available' : 'badge-module'}>
                            {row.acrobat}
                          </span>
                        </td>
                        <td>
                          <span className={row.pitstop.includes('Disponible') || row.pitstop.includes('Available') ? 'badge-available' : 'badge-integration'}>
                            {row.pitstop}
                          </span>
                        </td>
                        <td>
                          <span className={row.pdftoolbox.includes('Disponible') || row.pdftoolbox.includes('Available') ? 'badge-available' : 'badge-integration'}>
                            {row.pdftoolbox}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-scroll-hint" role="note" aria-label="Desplazamiento horizontal disponible">
                <span>⇄ {locale === 'es' ? 'Desliza horizontalmente para ver todas las columnas' : locale === 'de' ? 'Horizontal wischen für alle Spalten' : 'Scroll horizontally to view all columns'}</span>
              </div>
            </>
          )}

          {/* TAB 3: PRINT IT — Búsqueda, Contratación y Seguimiento */}
          {activeTab === 'print' && (
            <>
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>{dict.home.compFeature}</th>
                      <th style={{ width: '20%', color: 'var(--accent-primary)' }}>PrintPrice Marketplace</th>
                      <th style={{ width: '18%' }}>Redes Cautivas (Lulu / Gelato)</th>
                      <th style={{ width: '18%' }}>Intermediarios Tradicionales</th>
                      <th style={{ width: '14%' }}>{dict.home.compScope}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_PRINT.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{row.feature}</td>
                        <td>
                          <span className="badge-available">{row.printprice}</span>
                        </td>
                        <td>
                          <span className="badge-module">{row.closedNetworks}</span>
                        </td>
                        <td>
                          <span className="badge-integration">{row.traditionalBrokers}</span>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-scroll-hint" role="note" aria-label="Desplazamiento horizontal disponible">
                <span>⇄ {locale === 'es' ? 'Desliza horizontalmente para ver todas las columnas' : locale === 'de' ? 'Horizontal wischen für alle Spalten' : 'Scroll horizontally to view all columns'}</span>
              </div>
            </>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {locale === 'es'
              ? '* Metodología: Datos cotejados a partir de manuales públicos de producto, especificaciones oficiales y documentación técnica (octubre 2026).'
              : locale === 'de'
              ? '* Methodik: Öffentliche Produktdokumentationen und technische Spezifikationen (Stand: Oktober 2026).'
              : '* Methodology: Cross-checked against public product documentation and verified specs (as of October 2026).'}
          </div>
        </Container>
      </section>

      {/* 
        SECCIÓN 5: FAQ SEGMENTADA
      */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
                TRANSPARENCIA TOTAL
              </span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
                {dict.home.faqHeading}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                {dict.home.faqSubtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  q: locale === 'es' 
                    ? '¿En qué se diferencian Price it, Fix it y Print it?'
                    : locale === 'de'
                    ? 'Worin unterscheiden sich Price it, Fix it und Print it?'
                    : 'What is the difference between Price it, Fix it, and Print it?',
                  a: locale === 'es'
                    ? 'Son los tres productos principales de PrintPrice Pro: Price it es el calculador para presupuestar el coste real de producción; Fix it es el motor de preflight para auditar y preparar tu PDF antes de máquina; y Print it es el marketplace para encargar la fabricación física a imprentas homologadas.'
                    : locale === 'de'
                    ? 'Dies sind die drei Kernprodukte: Price it kalkuliert Produktionskosten; Fix it führt das PDF-Preflight vor dem Maschinengang durch; Print it ist der Marketplace zur Auftragsvergabe an zertifizierte Druckbetriebe.'
                    : 'They are the three core products: Price it calculates true production costs; Fix it audits and prepares PDFs before print; Print it is the marketplace connecting jobs to vetted plants.',
                },
                {
                  q: locale === 'es'
                    ? '¿Cómo se encarga la producción en PRINT IT?'
                    : locale === 'de'
                    ? 'Wie wird ein Auftrag in PRINT IT erteilt?'
                    : 'How do buyers commission jobs in PRINT IT?',
                  a: locale === 'es'
                    ? 'El comprador inicia el proyecto en el configurador de Budget (https://budget.printprice.pro/), donde introduce medidas, páginas y sustratos. Al confirmar especificaciones y validar el archivo en Fix it, el motor Matchmaker enruta el pedido a talleres acreditados. Control Plane es exclusivo para la operativa interna del impresor.'
                    : locale === 'de'
                    ? 'Kunden konfigurieren ihr Projekt in Budget, prüfen das PDF in Fix it und der Matchmaker vermittelt den Auftrag an Partnerbetriebe. Das Control Plane dient ausschließlich der internen Druckereiverwaltung.'
                    : 'Buyers configure projects in Budget, validate files via Fix it, and the Matchmaker engine matches the job with accredited plants. Control Plane is exclusively the operational backend for printers.',
                },
                {
                  q: locale === 'es'
                    ? '¿Para qué sirve la Maqueta 3D y por qué no es un cuarto producto independiente?'
                    : locale === 'de'
                    ? 'Welche Rolle spielt das 3D-Mockup und warum ist es kein viertes Produkt?'
                    : 'What is the role of the 3D Mockup and why is it not a fourth pillar?',
                  a: locale === 'es'
                    ? 'La Maqueta 3D es una herramienta complementaria de visualización. Permite previsualizar en el navegador la cubierta, contraportada y grosor de lomo calculado antes de imprimir, pero se integra dentro del flujo de diseño y preparación.'
                    : locale === 'de'
                    ? 'Das 3D-Mockup ist ein ergänzendes Vorschautool. Es visualisiert Umschlag und Buchrücken im Browser, ist aber funktionell in den Vorbereitungsworkflow integriert.'
                    : 'The 3D Mockup is a complementary visualization utility integrated into the design workflow to preview covers and calculated spine thickness before printing.',
                },
                {
                  q: locale === 'es'
                    ? '¿Quién debe acceder a Control Plane?'
                    : locale === 'de'
                    ? 'Wer nutzt das Control Plane?'
                    : 'Who accesses Control Plane?',
                  a: locale === 'es'
                    ? 'Control Plane (https://control.printprice.pro/) es el espacio operativo exclusivo para directores de taller gráfico y proveedores de papel. Permite modelar maquinaria, calibrar costes horarios y recibir órdenes técnicas. No es una entrada para autores ni editoriales compradoras.'
                    : locale === 'de'
                    ? 'Control Plane ist das Betriebsportal für Druckereileiter und Papiergroßhändler zur Maschinenmodellierung und Auftragsabwicklung. Es ist kein Kundenportal.'
                    : 'Control Plane is exclusively the back-office console for printing plant operators and paper mills to profile machinery and process verified tickets. It is not for buyers.',
                },
                {
                  q: locale === 'es'
                    ? '¿Qué es Paper Supplier Hub y en qué se diferencia del marketplace de impresión?'
                    : locale === 'de'
                    ? 'Was ist der Paper Supplier Hub im Vergleich zum Druck-Marketplace?'
                    : 'What is Paper Supplier Hub and how does it differ from the print marketplace?',
                  a: locale === 'es'
                    ? 'Paper Supplier Hub es la capacidad federada para que fabricantes y distribuidores de papel publiquen sus catálogos maestros de sustratos y conecten tarifas técnicas con imprentas. No es un marketplace de venta minorista para particulares ni autores.'
                    : locale === 'de'
                    ? 'Paper Supplier Hub ist die Föderationsplattform für Papierhersteller zur Bereitstellung technischer Substratkataloge an Druckereien, kein Endkunden-Marketplace.'
                    : 'Paper Supplier Hub is the substrate catalog federation connecting mill paper rates to printhouses, strictly decoupled from the book printing marketplace.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    borderColor: openFaq === index ? 'var(--accent-primary)' : 'var(--border-color)',
                  }}
                  onClick={() => toggleFaq(index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                      {faq.q}
                    </h3>
                    <span style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', fontWeight: 700, lineHeight: 1 }}>
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </div>

                  {openFaq === index && (
                    <p style={{ marginTop: '0.85rem', marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 
        CTA FINAL DE CIERRE CON SLOGAN INVARIABLE
      */}
      <section
        style={{
          padding: 'clamp(4.5rem, 8vw, 6.5rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <Container>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(220, 0, 0, 0.08)',
                border: '1px solid var(--accent-border)',
              }}
            >
              <span>PRICE IT.</span>
              <span style={{ color: 'var(--accent-primary)' }}>FIX IT.</span>
              <span>PRINT IT.</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginBottom: '1rem', fontWeight: 800 }}>
              {dict.home.ctaCloseHeading}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {dict.home.ctaCloseSubtitle}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
              >
                {dict.home.ctaClosePrimary}
              </a>
              <Link
                href="/contact"
                className="btn-secondary"
                style={{ padding: '0.9rem 1.75rem', fontSize: '1rem' }}
              >
                {dict.home.ctaCloseSecondary}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

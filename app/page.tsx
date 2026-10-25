'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { useLocale } from '@/lib/i18n';
import { Calculator, ShieldCheck, Factory, BookOpen, Library, Settings, FileText } from 'lucide-react';

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
        ? 'Calcula el coste de producción en segundos. Optimiza el presupuesto aplicando tecnología digital o tecnología offset según el volumen configurado, estima el grosor de lomo exacto y desglosa tarifas de sustratos catalogados y actualizados por talleres y proveedores sin registro obligatorio ni suscripciones.'
        : locale === 'de'
        ? 'Berechnen Sie reale Produktionskosten in Sekundenschnelle. Optimiert nach Digital- oder Offsetdruck je nach Auflage, berechnet die exakte Rückendicke und schlüsselt katalogisierte Papierpreise ohne Registrierungspflicht auf.'
        : 'Calculate production costs in seconds. Optimizes costs across digital or offset press runs based on volume, computes exact spine thickness, and itemizes cataloged substrate rates with no compulsory sign-up or subscriptions.',
      primaryCtaText: locale === 'es' ? 'Calcular precio ahora ➔' : locale === 'de' ? 'Preis jetzt kalkulieren ➔' : 'Calculate price now ➔',
      primaryCtaHref: 'https://budget.printprice.pro/',
      secondaryCtaText: locale === 'es' ? 'Conocer motor Budget' : locale === 'de' ? 'Budget-Engine Details' : 'About Budget Engine',
      secondaryCtaHref: '/products/budget',
      icon: Calculator,
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
        ? 'Comprueba y prepara tu archivo antes de entrar a máquina. Evalúa sangrados, resolución efectiva, espacios de color y tipografías según el perfil de producción configurado (por ejemplo: sangrado de 3 mm en libros estándar, 300 DPI recomendados en color comercial o perfiles CMYK/escala de grises), con diagnósticos claros y directos.'
        : locale === 'de'
        ? 'Prüfen und bereiten Sie Ihre Datei vor dem Druck auf. Erkennt Beschnitt, Bildauflösung, Farbräume und Schriften passend zum gewählten Produktionsprofil (z. B. 3 mm Beschnitt im Buchdruck oder 300 DPI im Farbdruck) mit verständlichen Hinweisen.'
        : 'Inspect and prepare your artwork file before it reaches the press. Detects bleeds, effective resolution, color spaces, and fonts based on your production profile (for example: standard 3mm bleed, 300 DPI recommended for color, or CMYK/grayscale profiles) with clear, actionable diagnostics.',
      primaryCtaText: locale === 'es' ? 'Comprobar mi PDF ➔' : locale === 'de' ? 'Mein PDF prüfen ➔' : 'Check my PDF ➔',
      primaryCtaHref: 'https://preflight.printprice.pro/',
      secondaryCtaText: locale === 'es' ? 'Ver capacidades y auditoría' : locale === 'de' ? 'Funktionen & Prüfung' : 'View audit features',
      secondaryCtaHref: '/products/preflight',
      icon: ShieldCheck,
      badge: 'FIX IT',
    },
    {
      id: 'print-it',
      pillar: '03 / PRINT IT',
      title: 'Print it',
      tagline: locale === 'es'
        ? 'Marketplace de producción con talleres de la red'
        : locale === 'de'
        ? 'Produktions-Marketplace mit Partnerdruckereien'
        : 'Production marketplace with partner print shops',
      description: locale === 'es'
        ? 'Encuentra la imprenta adecuada y encarga la producción. Conecta las especificaciones acordadas en el pedido y tu archivo validado con talleres adscritos a la red de producción de PrintPrice OS, asegurando que el taller reciba la versión comprobada en preflight.'
        : locale === 'de'
        ? 'Finden Sie den passenden Betrieb und beauftragen Sie die Fertigung. Verbindet die im Auftrag vereinbarten Spezifikationen und geprüfte Daten mit Partnerdruckereien im Netzwerk für eine verlässliche Umsetzung.'
        : 'Find the right printer and commission production. Connects agreed order specifications and validated files directly with partner plants in the PrintPrice OS network, ensuring the shop prints the preflight-verified version.',
      primaryCtaText: locale === 'es' ? 'Configurar y encargar ➔' : locale === 'de' ? 'Projekt konfigurieren ➔' : 'Configure & order ➔',
      primaryCtaHref: 'https://budget.printprice.pro/',
      secondaryCtaText: locale === 'es' ? 'Cómo funciona el marketplace' : locale === 'de' ? 'Marketplace-Ablauf' : 'How the marketplace works',
      secondaryCtaHref: '/products/print',
      icon: Factory,
      badge: 'PRINT IT',
      disclaimer: locale === 'es'
        ? '* La solicitud de producción para compradores se inicia a través de Budget conectando con talleres de la red. Control Plane está reservado a la operativa interna de imprentas.'
        : locale === 'de'
        ? '* Auftragserteilung erfolgt über das Budget-Modul an Partnerbetriebe im Netzwerk. Control Plane ist der internen Druckerei-Betriebsführung vorbehalten.'
        : '* Buyer production requests are initiated via Budget connecting with partner plants in the network. Control Plane is strictly the printer operational backend.',
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
      toolsTag: 'PRICE IT · FIX IT · PRINT IT',
      href: '/for-authors',
      ctaText: dict.home.authorsCta,
      icon: BookOpen,
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
      icon: Library,
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
      icon: Settings,
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
      icon: FileText,
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
      traditional: locale === 'es' ? 'Presupuesto conjunto' : locale === 'de' ? 'Pauschalangebot' : 'Bundled quote',
      lulu: locale === 'es' ? 'No disponible' : locale === 'de' ? 'Nicht verfügbar' : 'Not available',
      gelato: locale === 'es' ? 'No disponible' : locale === 'de' ? 'Nicht verfügbar' : 'Not available',
      notes: locale === 'es' ? 'Desglosa el coste de fabricación gráfica y el sustrato catalogado.' : locale === 'de' ? 'Trennt Fertigungsaufwand und katalogisierten Materialpreis.' : 'Separates printing production costs from cataloged substrate costs.',
    },
    {
      feature: locale === 'es' ? 'Optimización de tecnología digital vs offset según volumen' : locale === 'de' ? 'Auflagenoptimierung Digital vs. Offset' : 'Run volume optimization (digital vs offset)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Criterio de cotizador' : locale === 'de' ? 'Nach Sachbearbeiter' : 'Estimator discretion',
      lulu: locale === 'es' ? 'Solo digital / POD' : locale === 'de' ? 'Nur Digital / POD' : 'Digital / POD only',
      gelato: locale === 'es' ? 'Solo digital / POD' : locale === 'de' ? 'Nur Digital / POD' : 'Digital / POD only',
      notes: locale === 'es' ? 'Calcula automáticamente el coste más eficiente aplicando tecnología digital para tiradas cortas u offset para tiradas medias y altas.' : locale === 'de' ? 'Ermittelt automatisch die wirtschaftlichste Technologie (Digital für Kleinauflagen, Offset für mittlere/große Auflagen).' : 'Calculates the optimal cost path applying digital for short runs or offset for volume runs.',
    },
    {
      feature: locale === 'es' ? 'Tarifas y capacidades calibradas por talleres adscritos' : locale === 'de' ? 'Maschinenkosten hinterlegt von Partnerbetrieben' : 'Machine rates calibrated by partner plants',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Presupuesto individual' : locale === 'de' ? 'Einzelangebot' : 'Single quote',
      lulu: locale === 'es' ? 'Tarifa fija cerrada' : locale === 'de' ? 'Feste Einheitstarife' : 'Fixed closed pricing',
      gelato: locale === 'es' ? 'Tarifa fija cerrada' : locale === 'de' ? 'Feste Einheitstarife' : 'Fixed closed pricing',
      notes: locale === 'es' ? 'Costes horarios, mermas de arranque y pliegos modelados en la plataforma.' : locale === 'de' ? 'Stundensätze, Rüstzeiten und Bogenformate aus der Plattform.' : 'Hourly rates, makeready waste, and imposition sheets from the platform.',
    },
    {
      feature: locale === 'es' ? 'Ficha técnica verificada y vinculada a la orden' : locale === 'de' ? 'Verifizierte technische Spezifikation für den Auftrag' : 'Verified technical spec sheet tied to order',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Albarán / Email' : locale === 'de' ? 'Lieferschein / E-Mail' : 'Email / Packing slip',
      lulu: locale === 'es' ? 'Número de pedido' : locale === 'de' ? 'Bestellnummer' : 'Order number',
      gelato: locale === 'es' ? 'ID de encargo' : locale === 'de' ? 'Auftrags-ID' : 'Job ID',
      notes: locale === 'es' ? 'Vincula la orden de producción a las especificaciones acordadas en el pedido.' : locale === 'de' ? 'Bindet den Fertigungsauftrag an die im Auftrag vereinbarten Spezifikationen.' : 'Binds the production order to the agreed order specifications.',
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
      feature: locale === 'es' ? 'Detección perimetral de sangres según perfil de producción' : locale === 'de' ? 'Beschnittprüfung nach Produktionsprofil' : 'Perimeter bleed audit according to production profile',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Verifica el margen configurado (por ejemplo, 3 mm estándar en libros) para evitar filos blancos.' : locale === 'de' ? 'Prüft den definierten Randbeschnitt (z. B. 3 mm im Buchdruck) gegen weiße Blitzer.' : 'Verifies configured bleed margins (e.g. 3mm book standard) to prevent slivers.',
    },
    {
      feature: locale === 'es' ? 'Auditoría de resolución efectiva con localización por página' : locale === 'de' ? 'Effektive Bildauflösung seitengenau' : 'Effective image DPI audit with page localization',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Señala imágenes por debajo del umbral recomendado (por ejemplo, 300 DPI en color comercial) indicando la página.' : locale === 'de' ? 'Lokalisiert Bilder unterhalb des Richtwerts (z. B. 300 DPI im Farbdruck) seitengenau.' : 'Pinpoints images below recommended threshold (e.g. 300 DPI in color) with page numbers.',
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
      feature: locale === 'es' ? 'Firma técnica del informe vinculada a producción' : locale === 'de' ? 'Technische Freigabe signiert für Druckauftrag' : 'Technical audit verification linked to order',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'No aplica' : locale === 'de' ? 'Nicht anwendbar' : 'Not applicable',
      pitstop: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      pdftoolbox: locale === 'es' ? 'Mediante integración' : locale === 'de' ? 'Über Integration' : 'Via integration',
      notes: locale === 'es' ? 'Verificación técnica que vincula el archivo auditado con la orden del impresor.' : locale === 'de' ? 'Verknüpft die geprüfte Datei mit dem Fertigungsauftrag der Druckerei.' : 'Technical check linking the preflighted asset to the printer order.',
    },
  ];

  // Tab 3: PRINT IT (Búsqueda, Contratación y Seguimiento) — Neutral, verifiable dimensions
  const COMPARISON_PRINT = [
    {
      feature: locale === 'es' ? 'Modelo de servicio' : locale === 'de' ? 'Servicemodell' : 'Service model',
      printprice: locale === 'es' ? 'Directo con talleres' : locale === 'de' ? 'Direkt mit Partnerbetrieben' : 'Direct with partner plants',
      podPlatforms: locale === 'es' ? 'Red POD distribuida' : locale === 'de' ? 'Verteiltes POD-Netzwerk' : 'Distributed POD network',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'PrintPrice conecta con plantas industriales adscritas; Lulu y Gelato operan redes globales de centros asociados bajo demanda; la intermediación gráfica tradicional varía entre agencias, brókeres y talleres locales.'
        : locale === 'de'
        ? 'PrintPrice bindet Partnerbetriebe an; Lulu und Gelato nutzen globale POD-Fertigungspartner; traditionelle Vermittlung variiert nach Agentur oder Betrieb.'
        : 'PrintPrice coordinates partner plants; Lulu and Gelato route across distributed POD partner networks; traditional brokering varies by agent or shop.',
    },
    {
      feature: locale === 'es' ? 'Selección de imprenta' : locale === 'de' ? 'Druckereiauswahl' : 'Printer selection',
      printprice: locale === 'es' ? 'Enrutamiento técnico' : locale === 'de' ? 'Technische Zuweisung' : 'Technical routing',
      podPlatforms: locale === 'es' ? 'Asignación automatizada' : locale === 'de' ? 'Automatische Zuweisung' : 'Automated routing',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Matchmaker asigna según pliego y máquina adscrita; Gelato y Lulu enrutan internamente según destino de envío y capacidad (fuente: Gelato Help Center / Lulu Guides); en brókeres tradicionales varía entre acuerdos comerciales o selección manual.'
        : locale === 'de'
        ? 'Matchmaker wählt nach Bogenformat und Maschineneinsatz; Gelato und Lulu weisen intern nach Lieferort und Kapazität zu; bei traditionellen Brokern je nach Vereinbarung oder manuell.'
        : 'Matchmaker assigns by sheet geometry and press fit; Gelato and Lulu route internally by shipping destination and plant availability; traditional brokers vary by agreements or manual assignment.',
    },
    {
      feature: locale === 'es' ? 'Presupuestación' : locale === 'de' ? 'Kalkulation & Preis' : 'Pricing & budgeting',
      printprice: locale === 'es' ? 'Inmediata en servidor' : locale === 'de' ? 'Sofortige Server-Kalkulation' : 'Instant server calculation',
      podPlatforms: locale === 'es' ? 'Tarifas de catálogo POD' : locale === 'de' ? 'POD-Katalogtarife' : 'POD catalog rates',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Budget desglosa fabricación y papel al instante; Lulu y Gelato aplican tarifas unitarias y tramos de catálogo (fuente: calculadora Lulu / tarifas Gelato); en intermediación tradicional varía desde cotizaciones bajo petición hasta tarifas preacordadas.'
        : locale === 'de'
        ? 'Budget schlüsselt Fertigung und Papier sofort auf; Lulu und Gelato nutzen Stücktarife nach Produktkatalog; bei traditionellen Brokern von Angebot auf Anfrage bis zu Rahmenverträgen.'
        : 'Budget itemizes manufacturing and substrate instantly; Lulu and Gelato publish unit catalog rates; traditional brokering ranges from quotes on request to pre-negotiated rates.',
    },
    {
      feature: locale === 'es' ? 'Preparación de archivos' : locale === 'de' ? 'Dateivorbereitung & Preflight' : 'File preparation & preflight',
      printprice: locale === 'es' ? 'Preflight en navegador' : locale === 'de' ? 'In-Browser Preflight' : 'In-browser preflight',
      podPlatforms: locale === 'es' ? 'Validación según producto' : locale === 'de' ? 'Produktbezogene Prüfung' : 'Product-specific check',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Fix it comprueba sangrados, perfiles y resolución según perfil técnico; Lulu valida formato, sangrías y PDF/X en subida; Gelato revisa dimensiones y resolución en editor o API (fuente: Gelato Design Guidelines / Lulu Book Creation Guide); en intermediación tradicional varía entre taller de preimpresión o portales web.'
        : locale === 'de'
        ? 'Fix it prüft Beschnitt, Profile und Auflösung im Browser; Lulu validiert Format, Beschnitt und PDF/X beim Upload; Gelato prüft Maße und Auflösung im Editor/API; bei traditionellen Brokern je nach Vorstufe oder Webportal.'
        : 'Fix it checks bleeds, profiles, and resolution in-browser; Lulu validates trim, bleed, and PDF/X on upload; Gelato checks dimensions and DPI via editor/API; traditional brokering varies by prepress workflow or web portals.',
    },
    {
      feature: locale === 'es' ? 'Pedido y seguimiento' : locale === 'de' ? 'Bestellung & Tracking' : 'Ordering & tracking',
      printprice: locale === 'es' ? 'Orden y registro técnico' : locale === 'de' ? 'Auftrag & technisches Protokoll' : 'Order & technical log',
      podPlatforms: locale === 'es' ? 'Panel de pedidos y tracking' : locale === 'de' ? 'Bestellpanel & Tracking' : 'Order dashboard & tracking',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'El pedido vincula especificaciones acordadas y archivo validado con la planta; Lulu y Gelato disponen de paneles con seguimiento de paquetería (fuente: Lulu Dashboard / Gelato Order Tracking); en gestión tradicional varía entre portal de cliente, albarán o gestor de cuenta.'
        : locale === 'de'
        ? 'Auftrag bindet vereinbarte Spezifikationen und geprüfte Datei an die Fertigung; Lulu und Gelato bieten Tracking-Panels; bei traditionellen Brokern Kundenportale, Lieferschein oder persönliche Betreuung.'
        : 'Order binds agreed specifications and validated file to plant production; Lulu and Gelato provide dashboards with parcel tracking; traditional brokering uses customer portals, slips, or account managers.',
    },
    {
      feature: locale === 'es' ? 'Integraciones' : locale === 'de' ? 'Schnittstellen & Integration' : 'Integrations',
      printprice: locale === 'es' ? 'API REST y Control Plane' : locale === 'de' ? 'REST-API & Control Plane' : 'REST API & Control Plane',
      podPlatforms: locale === 'es' ? 'Plugins e-commerce y API' : locale === 'de' ? 'E-Commerce-Plugins & API' : 'E-commerce plugins & API',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Control Plane para plantas y API técnica de preflight; Lulu Direct integra Shopify/WooCommerce y API propia; Gelato conecta tiendas e-commerce y Gelato API (sin incluir GelatoConnect, software de planta independiente); en intermediación tradicional varía entre intercambio de archivos, ERPs o correo.'
        : locale === 'de'
        ? 'Control Plane für Druckereien und Preflight-API; Lulu Direct bietet Shopify/WooCommerce-Plugins; Gelato bindet E-Commerce und Gelato API an (ohne GelatoConnect-Betriebssoftware); traditionelle Vermittlung variiert nach Datenaustausch oder E-Mail.'
        : 'Control Plane for plants and Preflight API; Lulu Direct supports Shopify/WooCommerce and API; Gelato integrates e-commerce stores and Gelato API (excluding separate GelatoConnect plant software); traditional brokering varies by portal, ERP, or email.',
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
          label: locale === 'es' ? 'Ver productos ➔' : locale === 'de' ? 'Produkte ansehen ➔' : 'View products ➔',
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
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.08em' }}>
                {locale === 'es' ? 'CASO DE MUESTRA · FICHA TÉCNICA' : locale === 'de' ? 'BEISPIELPROFIL · TECHNISCHE DEMO' : 'SAMPLE PROFILE · DEMO SPECS'}
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
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {locale === 'es' ? 'Cálculo de lomo y perfil auditado' : locale === 'de' ? 'Auditiertes Profil & Bundstegdicke' : 'Audited profile & spine calculation'}
              </span>
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
              {dict.home.productsPill}
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
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <prod.icon size={26} strokeWidth={1.75} />
                    </div>
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
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={26} strokeWidth={1.75} />
              </div>
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.975rem', lineHeight: 1.4 }}>
                    {locale === 'es' ? 'Herramienta complementaria de visualización: Maqueta 3D Interactiva' : locale === 'de' ? 'Ergänzende 3D-Vorschau: Interaktives Buch-Mockup' : 'Complementary visualization tool: Interactive 3D Mockup'}
                  </span>
                  <span style={{ fontSize: '0.625rem', background: 'var(--accent-container)', color: 'var(--accent-primary)', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 800 }}>
                    {dict.home.complementaryBadge}
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
              {dict.home.stakeholdersPill}
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
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <card.icon size={24} strokeWidth={1.75} />
                    </div>
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
                {dict.home.workflowPill}
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
                {dict.home.visualizeStep}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{locale === 'es' ? 'Maqueta 3D' : locale === 'de' ? '3D-Mockup' : '3D Mockup'}</h3>
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
              {dict.home.comparisonsPill}
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
                      <th style={{ width: '14%' }}>{dict.home.compTraditional}</th>
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
              <div className="table-scroll-hint" role="note" aria-label={dict.home.scrollHint}>
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
              <div className="table-scroll-hint" role="note" aria-label={dict.home.scrollHint}>
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
                      <th style={{ width: '28%' }}>{dict.home.compFeature}</th>
                      <th style={{ width: '20%', color: 'var(--accent-primary)' }}>PrintPrice Marketplace</th>
                      <th style={{ width: '20%' }}>
                        {locale === 'es' ? 'Plataformas POD (Lulu, Gelato)' : locale === 'de' ? 'Integrierte POD-Plattformen' : 'Integrated POD Platforms (Lulu, Gelato)'}
                      </th>
                      <th style={{ width: '20%' }}>
                        {locale === 'es' ? 'Gestión gráfica tradicional / Brókeres' : locale === 'de' ? 'Traditionelle Druckvermittlung' : 'Traditional Graphic Brokering'}
                      </th>
                      <th style={{ width: '12%' }}>{dict.home.compScope}</th>
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
                          <span className="badge-module">{row.podPlatforms}</span>
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
              <div className="table-scroll-hint" role="note" aria-label={dict.home.scrollHint}>
                <span>⇄ {locale === 'es' ? 'Desliza horizontalmente para ver todas las columnas' : locale === 'de' ? 'Horizontal wischen für alle Spalten' : 'Scroll horizontally to view all columns'}</span>
              </div>
            </>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {locale === 'es'
              ? '* Metodología y fuentes (octubre 2026): Datos contrastados con manuales públicos oficiales: Lulu Book Creation Guide y Lulu Direct API; Gelato Print-on-Demand Help Center y Gelato API (referido a la plataforma POD para creadores, excluyendo GelatoConnect como software de planta independiente); y PrintPrice OS API y Control Plane. Para la categoría general de gestión tradicional, los aspectos no estandarizados se indican como «Varía según proveedor».'
              : locale === 'de'
              ? '* Methodik und Quellen (Oktober 2026): Abgeglichen mit offiziellen Dokumentationen: Lulu Book Creation Guide & Lulu Direct API; Gelato Print-on-Demand Help Center & Gelato API (bezogen auf die POD-Plattform für Ersteller, ohne GelatoConnect-Fertigungssoftware); sowie PrintPrice OS API & Control Plane. Für traditionelle Druckvermittlung wird bei variablen Merkmalen «Variiert je nach Anbieter» ausgewiesen.'
              : '* Methodology & Sources (October 2026): Cross-referenced with official public manuals: Lulu Book Creation Guide & Lulu Direct API; Gelato Print-on-Demand Help Center & Gelato API (referring to the creator POD platform, excluding GelatoConnect standalone plant software); and PrintPrice OS API & Control Plane. For general traditional brokering, non-standardized traits are indicated as "Varies by provider".'}
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
                {dict.home.transparencyPill}
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
                    ? 'Son los tres productos principales de PrintPrice Pro: Price it es el calculador para presupuestar el coste real de producción; Fix it es el motor de preflight para auditar y preparar tu PDF antes de máquina; y Print it es el marketplace para encargar la fabricación física a imprentas asociadas de la red.'
                    : locale === 'de'
                    ? 'Dies sind die drei Kernprodukte: Price it kalkuliert Produktionskosten; Fix it führt das PDF-Preflight vor dem Maschinengang durch; Print it ist der Marketplace zur Auftragsvergabe an Partner-Druckbetriebe im Netzwerk.'
                    : 'They are the three core products: Price it calculates true production costs; Fix it audits and prepares PDFs before print; Print it is the marketplace connecting jobs to network print shops.',
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
        CTA FINAL DE CIERRE CON SLOGAN INVARIABLE Y CUADROS GRID ANIMADOS
      */}
      <ActionCTA
        slogan="PRICE IT. FIX IT. PRINT IT."
        title={dict.home.ctaCloseHeading}
        description={dict.home.ctaCloseSubtitle}
        buttonLabel={dict.home.ctaClosePrimary}
        buttonHref="https://budget.printprice.pro/"
        secondaryButtonLabel={dict.home.ctaCloseSecondary}
        secondaryButtonHref="/contact"
        trackingAction="home_final_cta"
      />
    </main>
  );
}

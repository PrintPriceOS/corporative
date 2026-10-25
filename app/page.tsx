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
      traditional: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      lulu: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      gelato: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      notes: locale === 'es' ? 'Budget calcula de inmediato con matrices de coste en servidor.' : locale === 'de' ? 'Budget kalkuliert sofort ohne Vorab-Konto auf dem Server.' : 'Budget computes instantly using server cost matrices.',
    },
    {
      feature: locale === 'es' ? 'Desglose transparente entre impresión y papel' : locale === 'de' ? 'Transparente Aufteilung von Druck und Papier' : 'Transparent separation between printing and paper',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      lulu: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      gelato: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      notes: locale === 'es' ? 'Desglosa el coste de fabricación gráfica y el sustrato catalogado.' : locale === 'de' ? 'Trennt Fertigungsaufwand und katalogisierten Materialpreis.' : 'Separates printing production costs from cataloged substrate costs.',
    },
    {
      feature: locale === 'es' ? 'Optimización de tecnología digital vs offset según volumen' : locale === 'de' ? 'Auflagenoptimierung Digital vs. Offset' : 'Run volume optimization (digital vs offset)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      lulu: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      gelato: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      notes: locale === 'es' ? 'Calcula el coste aplicando tecnología digital u offset según parámetros de tirada.' : locale === 'de' ? 'Ermittelt Fertigungskosten nach Auflagenhöhe und Bogenformat.' : 'Calculates production costs applying digital or offset based on run parameters.',
    },
    {
      feature: locale === 'es' ? 'Tarifas y capacidades calibradas por talleres adscritos' : locale === 'de' ? 'Maschinenkosten hinterlegt von Partnerbetrieben' : 'Machine rates calibrated by partner plants',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      lulu: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      gelato: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      notes: locale === 'es' ? 'Costes horarios y pliegos modelados en la plataforma.' : locale === 'de' ? 'Stundensätze und Bogenformate aus der Plattform.' : 'Hourly rates and imposition sheets from the platform.',
    },
    {
      feature: locale === 'es' ? 'Ficha técnica verificada y vinculada a la orden' : locale === 'de' ? 'Verifizierte technische Spezifikation für den Auftrag' : 'Verified technical spec sheet tied to order',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      traditional: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      lulu: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      gelato: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      notes: locale === 'es' ? 'Vincula la orden de producción a las especificaciones acordadas en el pedido.' : locale === 'de' ? 'Bindet den Fertigungsauftrag an die im Auftrag vereinbarten Spezifikationen.' : 'Binds the production order to the agreed order specifications.',
    },
  ];

  // Tab 2: FIX IT (Preflight y Preparación de PDF)
  const COMPARISON_FIX = [
    {
      feature: locale === 'es' ? 'Comprobación web directa sin instalación de software' : locale === 'de' ? 'Direkte Web-Prüfung ohne Softwareinstallation' : 'Direct browser preflight without desktop software installation',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Aplicación escritorio' : locale === 'de' ? 'Desktop-Anwendung' : 'Desktop app',
      pitstop: locale === 'es' ? 'Plugin / Servidor' : locale === 'de' ? 'Plugin / Server' : 'Plugin / Server',
      pdftoolbox: locale === 'es' ? 'Servidor / CLI / SDK' : locale === 'de' ? 'Server / CLI / SDK' : 'Server / CLI / SDK',
      notes: locale === 'es' ? 'Preflight se ejecuta directamente en navegador web.' : locale === 'de' ? 'Preflight läuft direkt im Webbrowser.' : 'Preflight executes directly in web browser.',
    },
    {
      feature: locale === 'es' ? 'Detección perimetral de sangres según perfil de producción' : locale === 'de' ? 'Beschnittprüfung nach Produktionsprofil' : 'Perimeter bleed audit according to production profile',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Verifica el margen configurado para el perfil del libro.' : locale === 'de' ? 'Prüft den definierten Randbeschnitt für das Buchprofil.' : 'Verifies configured bleed margin for the book profile.',
    },
    {
      feature: locale === 'es' ? 'Auditoría de resolución efectiva con localización por página' : locale === 'de' ? 'Effektive Bildauflösung seitengenau' : 'Effective image DPI audit with page localization',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Localiza imágenes por debajo del umbral recomendado indicando la página.' : locale === 'de' ? 'Lokalisiert Bilder unterhalb des Schwellenwerts mit Seitenzahl.' : 'Pinpoints images below recommended threshold with page numbers.',
    },
    {
      feature: locale === 'es' ? 'Diagnóstico accesible sin tecnicismos complejos' : locale === 'de' ? 'Verständlicher Prüfbericht ohne Fachchinesisch' : 'Clear actionable diagnostics without esoteric jargon',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Varía según usuario' : locale === 'de' ? 'Variiert je nach Anwender' : 'Varies by user',
      pitstop: locale === 'es' ? 'Varía según usuario' : locale === 'de' ? 'Variiert je nach Anwender' : 'Varies by user',
      pdftoolbox: locale === 'es' ? 'Varía según usuario' : locale === 'de' ? 'Variiert je nach Anwender' : 'Varies by user',
      notes: locale === 'es' ? 'Muestra avisos explicativos orientados a creadores y editores.' : locale === 'de' ? 'Zeigt verständliche Hinweise für Autoren und Verlage.' : 'Displays clear warnings tailored to authors and publishers.',
    },
    {
      feature: locale === 'es' ? 'Corrección geométrica asistida de sangrado (BleedBox)' : locale === 'de' ? 'Assistiere geometrische Beschnittanpassung (BleedBox)' : 'Assisted geometric bleed remediation (BleedBox)',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'Varía según edición' : locale === 'de' ? 'Variiert nach Edition' : 'Varies by edition',
      pitstop: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      pdftoolbox: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      notes: locale === 'es' ? 'Ajusta cajas PDF de sangrado cuando el arte incluye fondo perimetral.' : locale === 'de' ? 'Passt Beschnittboxen an, wenn Hintergrundfläche vorhanden ist.' : 'Expands PDF bleed boxes when background artwork is present.',
    },
    {
      feature: locale === 'es' ? 'Firma técnica del informe vinculada a producción' : locale === 'de' ? 'Technische Freigabe signiert für Druckauftrag' : 'Technical audit verification linked to order',
      printprice: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
      acrobat: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
      pitstop: locale === 'es' ? 'Varía según integración' : locale === 'de' ? 'Variiert nach Integration' : 'Varies by integration',
      pdftoolbox: locale === 'es' ? 'Varía según integración' : locale === 'de' ? 'Variiert nach Integration' : 'Varies by integration',
      notes: locale === 'es' ? 'Vincula el archivo validado con la orden de producción del taller.' : locale === 'de' ? 'Verknüpft die geprüfte Datei mit dem Fertigungsauftrag.' : 'Links the verified file with the printshop production order.',
    },
  ];

  // Tab 3: PRINT IT (Búsqueda, Contratación y Seguimiento)
  const COMPARISON_PRINT = [
    {
      feature: locale === 'es' ? 'Modelo de servicio' : locale === 'de' ? 'Servicemodell' : 'Service model',
      printprice: locale === 'es' ? 'Directo con talleres' : locale === 'de' ? 'Direkt mit Partnerbetrieben' : 'Direct with partner plants',
      podPlatforms: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'PrintPrice conecta con plantas industriales adscritas; los modelos de plataformas POD e intermediación gráfica tradicional varían según proveedor o red comercial.'
        : locale === 'de'
        ? 'PrintPrice bindet Partnerbetriebe an; Modelle von POD-Plattformen und traditioneller Vermittlung variieren je nach Anbieter.'
        : 'PrintPrice coordinates partner plants; POD platforms and traditional brokering models vary by provider.',
    },
    {
      feature: locale === 'es' ? 'Selección de imprenta' : locale === 'de' ? 'Druckereiauswahl' : 'Printer selection',
      printprice: locale === 'es' ? 'Enrutamiento técnico' : locale === 'de' ? 'Technische Zuweisung' : 'Technical routing',
      podPlatforms: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Matchmaker asigna según pliego y máquina adscrita; en redes externas y brókeres tradicionales varía según acuerdos comerciales o enrutamiento interno.'
        : locale === 'de'
        ? 'Matchmaker wählt nach Bogenformat und Maschine; bei externen Netzwerken und traditionellen Brokern variiert die Zuweisung.'
        : 'Matchmaker assigns by sheet format and press; in external networks and traditional brokers, routing varies by agreement or internal assignment.',
    },
    {
      feature: locale === 'es' ? 'Presupuestación' : locale === 'de' ? 'Kalkulation & Preis' : 'Pricing & budgeting',
      printprice: locale === 'es' ? 'Inmediata en servidor' : locale === 'de' ? 'Sofortige Server-Kalkulation' : 'Instant server calculation',
      podPlatforms: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Budget desglosa fabricación y papel al instante; en plataformas externas varía según catálogo, API o cotización bajo petición.'
        : locale === 'de'
        ? 'Budget schlüsselt Fertigung und Papier sofort auf; bei externen Plattformen je nach Katalog, API oder Angebot auf Anfrage.'
        : 'Budget itemizes manufacturing and paper instantly; external platforms vary by catalog, API, or quotes on request.',
    },
    {
      feature: locale === 'es' ? 'Preparación de archivos' : locale === 'de' ? 'Dateivorbereitung & Preflight' : 'File preparation & preflight',
      printprice: locale === 'es' ? 'Preflight en navegador' : locale === 'de' ? 'In-Browser Preflight' : 'In-browser preflight',
      podPlatforms: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Fix it comprueba sangrados, perfiles y resolución en navegador; en otros canales la revisión varía entre validadores web o talleres de preimpresión.'
        : locale === 'de'
        ? 'Fix it prüft Beschnitt, Profile und Auflösung im Browser; in anderen Kanälen variiert die Prüfung zwischen Web-Validatoren oder Vorstufenbetrieb.'
        : 'Fix it checks bleeds, profiles, and resolution in-browser; in other channels checking varies between web validators and prepress shops.',
    },
    {
      feature: locale === 'es' ? 'Pedido y seguimiento' : locale === 'de' ? 'Bestellung & Tracking' : 'Ordering & tracking',
      printprice: locale === 'es' ? 'Orden y registro técnico' : locale === 'de' ? 'Auftrag & technisches Protokoll' : 'Order & technical log',
      podPlatforms: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'El pedido vincula especificaciones acordadas y archivo validado con la planta; en otras plataformas varía según panel, albarán o seguimiento de paquetería.'
        : locale === 'de'
        ? 'Auftrag bindet vereinbarte Spezifikationen und geprüfte Datei an die Fertigung; bei anderen Plattformen je nach Portal, Lieferschein oder Paketverfolgung.'
        : 'Order binds agreed specs and verified file to plant; in other platforms it varies by portal, slip, or parcel tracking.',
    },
    {
      feature: locale === 'es' ? 'Integraciones' : locale === 'de' ? 'Schnittstellen & Integration' : 'Integrations',
      printprice: locale === 'es' ? 'API REST y Control Plane' : locale === 'de' ? 'REST-API & Control Plane' : 'REST API & Control Plane',
      podPlatforms: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
      traditionalBrokers: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
      notes: locale === 'es'
        ? 'Control Plane para plantas y API técnica de preflight; en otras soluciones varía según conectores e-commerce, APIs o intercambio de archivos.'
        : locale === 'de'
        ? 'Control Plane für Druckereien und Preflight-API; bei anderen Lösungen je nach E-Commerce-Plugins, APIs oder Datenaustausch.'
        : 'Control Plane for plants and Preflight API; in other solutions integrations vary by e-commerce plugins, APIs, or file exchange.',
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
                        {locale === 'es' ? 'Plataformas POD' : locale === 'de' ? 'POD-Plattformen' : 'POD Platforms'}
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

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '960px', margin: '1.5rem auto 0' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              {locale === 'es' ? (
                <>
                  * Fuentes oficiales consultadas (Revisión: Octubre 2026): Adobe Acrobat Pro (
                  <a href="https://helpx.adobe.com/acrobat/using/analyzing-documents-preflight-tool.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Adobe Help Center</a>
                  ); Enfocus PitStop Pro (
                  <a href="https://www.enfocus.com/en/pitstop-pro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Enfocus Documentation</a>
                  ); callas software pdfToolbox (
                  <a href="https://help.callassoftware.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>callas Help Center</a>
                  ); Lulu (
                  <a href="https://help.lulu.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Lulu Help Center</a>
                  ); Gelato (
                  <a href="https://support.gelato.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Gelato Help Center</a>
                  ); Ghent Workgroup (
                  <a href="https://gwg.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>GWG Specifications</a>
                  ). Las características no estandarizadas o dependientes de canal se indican como «Varía según proveedor» o «No verificado».
                </>
              ) : locale === 'de' ? (
                <>
                  * Offizielle konsultierte Quellen (Stand: Oktober 2026): Adobe Acrobat Pro (
                  <a href="https://helpx.adobe.com/acrobat/using/analyzing-documents-preflight-tool.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Adobe Help Center</a>
                  ); Enfocus PitStop Pro (
                  <a href="https://www.enfocus.com/en/pitstop-pro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Enfocus Documentation</a>
                  ); callas software pdfToolbox (
                  <a href="https://help.callassoftware.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>callas Help Center</a>
                  ); Lulu (
                  <a href="https://help.lulu.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Lulu Help Center</a>
                  ); Gelato (
                  <a href="https://support.gelato.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Gelato Help Center</a>
                  ); Ghent Workgroup (
                  <a href="https://gwg.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>GWG Specifications</a>
                  ). Nicht standardisierte Merkmale werden als «Variiert je nach Anbieter» oder «Nicht verifiziert» ausgewiesen.
                </>
              ) : (
                <>
                  * Official consulted sources (Revision: October 2026): Adobe Acrobat Pro (
                  <a href="https://helpx.adobe.com/acrobat/using/analyzing-documents-preflight-tool.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Adobe Help Center</a>
                  ); Enfocus PitStop Pro (
                  <a href="https://www.enfocus.com/en/pitstop-pro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Enfocus Documentation</a>
                  ); callas software pdfToolbox (
                  <a href="https://help.callassoftware.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>callas Help Center</a>
                  ); Lulu (
                  <a href="https://help.lulu.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Lulu Help Center</a>
                  ); Gelato (
                  <a href="https://support.gelato.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Gelato Help Center</a>
                  ); Ghent Workgroup (
                  <a href="https://gwg.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>GWG Specifications</a>
                  ). Non-standardized traits are indicated as "Varies by provider" or "Not verified".
                </>
              )}
            </p>
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

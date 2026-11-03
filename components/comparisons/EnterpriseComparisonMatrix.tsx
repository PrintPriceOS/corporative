'use client';

import React, { useState } from 'react';
import { Check, Info, Minus, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { useLocale } from '@/lib/i18n';

export interface ComparisonRow {
  feature: string;
  tooltip: string;
  printprice: string;
  competitors: Array<{
    name: string;
    value: string;
  }>;
}

export const EnterpriseComparisonMatrix: React.FC = () => {
  const { dict, locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'price' | 'fix' | 'print'>('price');
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  // Tab 1: PRICE IT (Cálculo y Presupuestación)
  const COMPARISON_PRICE: ComparisonRow[] = [
    {
      feature:
        locale === 'es'
          ? 'Cálculo de presupuesto inmediato sin registro'
          : locale === 'de'
          ? 'Sofortige Kalkulation ohne Registrierungspflicht'
          : 'Instant budget estimate without compulsory signup',
      tooltip:
        locale === 'es'
          ? 'Budget calcula de inmediato con matrices de coste en servidor y calibración de máquina.'
          : locale === 'de'
          ? 'Budget kalkuliert sofort ohne Vorab-Konto auf dem Server mit hinterlegten Maschinenwerten.'
          : 'Budget computes instantly using server cost matrices and plant-calibrated press curves.',
      printprice:
        locale === 'es'
          ? 'Tarificación instantánea en tiempo real'
          : locale === 'de'
          ? 'Sofortige Echtzeit-Kalkulation'
          : 'Real-time instant pricing',
      competitors: [
        {
          name: dict.home.compTraditional,
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
        {
          name: 'Lulu',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
        {
          name: 'Gelato',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Desglose transparente entre impresión y papel'
          : locale === 'de'
          ? 'Transparente Aufteilung von Druck und Papier'
          : 'Transparent separation between printing and paper',
      tooltip:
        locale === 'es'
          ? 'Desglosa de forma aislada el coste de fabricación gráfica frente al sustrato catalogado por peso y pliego.'
          : locale === 'de'
          ? 'Trennt Fertigungsaufwand und katalogisierten Materialpreis exakt nach Bogen und Tonnage.'
          : 'Separates printing production costs from cataloged substrate costs by weight and imposition sheet.',
      printprice:
        locale === 'es'
          ? 'Desglose Sustrato vs Fabricación'
          : locale === 'de'
          ? 'Trennung Papier vs. Fortdruck'
          : 'Substrate vs Press split',
      competitors: [
        {
          name: dict.home.compTraditional,
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
        {
          name: 'Lulu',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
        {
          name: 'Gelato',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Optimización de tecnología digital vs offset según volumen (Q*)'
          : locale === 'de'
          ? 'Auflagenoptimierung Digital vs. Offset (Q*)'
          : 'Run volume optimization (digital vs offset Q*)',
      tooltip:
        locale === 'es'
          ? 'Calcula la curva de cruce económico (Q*) resolviendo automáticamente entre digital y offset.'
          : locale === 'de'
          ? 'Ermittelt Fertigungskosten nach Auflagenhöhe und dynamischer Übergangskurve (Q*).'
          : 'Calculates production cost crossover curve (Q*) switching automatically between digital and offset.',
      printprice:
        locale === 'es'
          ? 'Cruce dinámico Q* Digital/Offset'
          : locale === 'de'
          ? 'Dynamischer Q*-Übergang Digital/Offset'
          : 'Dynamic Q* crossover',
      competitors: [
        {
          name: dict.home.compTraditional,
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
        {
          name: 'Lulu',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
        {
          name: 'Gelato',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Tarifas y capacidades calibradas por talleres adscritos'
          : locale === 'de'
          ? 'Maschinenkosten hinterlegt von Partnerbetrieben'
          : 'Machine rates calibrated by partner plants',
      tooltip:
        locale === 'es'
          ? 'Costes horarios, velocidades CPH y mermas modelados directamente en el Control Plane del taller.'
          : locale === 'de'
          ? 'Stundensätze, Fortdruckgeschwindigkeiten und Makulatur aus dem Control Plane der Druckerei.'
          : 'Hourly rates, real CPH press speeds, and makeready waste ratios modeled in the workshop Control Plane.',
      printprice:
        locale === 'es'
          ? 'Costes horarios calibrados por planta'
          : locale === 'de'
          ? 'Kalibrierte Maschinenstundensätze'
          : 'Calibrated hourly rates',
      competitors: [
        {
          name: dict.home.compTraditional,
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
        {
          name: 'Lulu',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
        {
          name: 'Gelato',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Ficha técnica verificada y vinculada a la orden'
          : locale === 'de'
          ? 'Verifizierte technische Spezifikation für den Auftrag'
          : 'Verified technical spec sheet tied to order',
      tooltip:
        locale === 'es'
          ? 'Vincula la orden de producción a las especificaciones físicas inmutables y trazadas en el pedido.'
          : locale === 'de'
          ? 'Bindet den Fertigungsauftrag an die im Auftrag vereinbarten Spezifikationen und Papiersorten.'
          : 'Binds the production order to immutable, traceable physical specifications agreed in the run.',
      printprice:
        locale === 'es'
          ? 'Ficha técnica vinculada a la orden'
          : locale === 'de'
          ? 'Auftragsgebundenes Spezifikationsblatt'
          : 'Bound spec sheet',
      competitors: [
        {
          name: dict.home.compTraditional,
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
        {
          name: 'Lulu',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
        {
          name: 'Gelato',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
      ],
    },
  ];

  // Tab 2: FIX IT (Preflight y Preparación de PDF)
  const COMPARISON_FIX: ComparisonRow[] = [
    {
      feature:
        locale === 'es'
          ? 'Comprobación web directa sin instalación de software'
          : locale === 'de'
          ? 'Direkte Web-Prüfung ohne Softwareinstallation'
          : 'Direct browser preflight without desktop software installation',
      tooltip:
        locale === 'es'
          ? 'Preflight se ejecuta directamente en navegador web con motor WebAssembly y validación servidora.'
          : locale === 'de'
          ? 'Preflight läuft direkt im Webbrowser mit WebAssembly und serverseitiger Tiefenanalyse.'
          : 'Preflight executes directly in browser via WebAssembly with deep server validation.',
      printprice:
        locale === 'es'
          ? '100% en navegador (sin software local)'
          : locale === 'de'
          ? '100% im Browser (Keine Desktop-App)'
          : '100% In-browser (No desktop app)',
      competitors: [
        {
          name: 'Adobe Acrobat Pro',
          value: locale === 'es' ? 'Aplicación escritorio' : locale === 'de' ? 'Desktop-Anwendung' : 'Desktop app',
        },
        {
          name: 'Enfocus PitStop',
          value: locale === 'es' ? 'Plugin / Servidor' : locale === 'de' ? 'Plugin / Server' : 'Plugin / Server',
        },
        {
          name: 'callas pdfToolbox',
          value: locale === 'es' ? 'Servidor / CLI / SDK' : locale === 'de' ? 'Server / CLI / SDK' : 'Server / CLI / SDK',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Detección perimetral de sangres según perfil de producción'
          : locale === 'de'
          ? 'Beschnittprüfung nach Produktionsprofil'
          : 'Perimeter bleed audit according to production profile',
      tooltip:
        locale === 'es'
          ? 'Verifica sangrado simétrico (3.0mm estándar) ajustado a las cuchillas de corte y guillotina trilateral.'
          : locale === 'de'
          ? 'Prüft den definierten Randbeschnitt (3.0mm Norm) für Dreischneider und Planschneider.'
          : 'Verifies configured bleed margins (3.0mm standard) tailored to three-knife book trimmers.',
      printprice:
        locale === 'es'
          ? 'Auditoría según perfil de producción'
          : locale === 'de'
          ? 'Prüfung nach Produktionsprofil'
          : 'Production profile audit',
      competitors: [
        {
          name: 'Adobe Acrobat Pro',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
        {
          name: 'Enfocus PitStop',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
        {
          name: 'callas pdfToolbox',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Auditoría de resolución efectiva con localización por página'
          : locale === 'de'
          ? 'Effektive Bildauflösung seitengenau'
          : 'Effective image DPI audit with page localization',
      tooltip:
        locale === 'es'
          ? 'Localiza imágenes por debajo del umbral de 300 DPI indicando la página y coordenadas exactas.'
          : locale === 'de'
          ? 'Lokalisiert Bilder unterhalb des 300-DPI-Schwellenwerts mit exakter Seitenzahl und Koordinaten.'
          : 'Pinpoints images below 300 DPI threshold with exact page numbers and bounding box coordinates.',
      printprice:
        locale === 'es'
          ? 'Mapa preciso de DPI por página'
          : locale === 'de'
          ? 'Präzise DPI-Erfassung je Seite'
          : 'Precise page-level DPI map',
      competitors: [
        {
          name: 'Adobe Acrobat Pro',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
        {
          name: 'Enfocus PitStop',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
        {
          name: 'callas pdfToolbox',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Diagnóstico accesible sin tecnicismos complejos'
          : locale === 'de'
          ? 'Verständlicher Prüfbericht ohne Fachchinesisch'
          : 'Clear actionable diagnostics without esoteric jargon',
      tooltip:
        locale === 'es'
          ? 'Muestra explicaciones claras para creadores y editores con pasos directos de autoreparación.'
          : locale === 'de'
          ? 'Zeigt verständliche Hinweise für Autoren und Verlage mit direkten Hinweisen zur Fehlerbehebung.'
          : 'Displays clear warnings tailored to authors and publishers with actionable autofix remediation steps.',
      printprice:
        locale === 'es'
          ? 'Diagnósticos claros y accionables'
          : locale === 'de'
          ? 'Verständliche & handlungsorientierte Berichte'
          : 'Jargon-free actionable diagnostics',
      competitors: [
        {
          name: 'Adobe Acrobat Pro',
          value: locale === 'es' ? 'Varía según usuario' : locale === 'de' ? 'Variiert je nach Anwender' : 'Varies by user',
        },
        {
          name: 'Enfocus PitStop',
          value: locale === 'es' ? 'Varía según usuario' : locale === 'de' ? 'Variiert je nach Anwender' : 'Varies by user',
        },
        {
          name: 'callas pdfToolbox',
          value: locale === 'es' ? 'Varía según usuario' : locale === 'de' ? 'Variiert je nach Anwender' : 'Varies by user',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Corrección geométrica asistida de sangrado (BleedBox)'
          : locale === 'de'
          ? 'Assistiere geometrische Beschnittanpassung (BleedBox)'
          : 'Assisted geometric bleed remediation (BleedBox)',
      tooltip:
        locale === 'es'
          ? 'Ajusta cajas PDF de sangrado mediante síntesis de píxeles en espejo perimetral cuando falta sangría.'
          : locale === 'de'
          ? 'Passt Beschnittboxen an und erzeugt automatische Spiegelkanten bei fehlendem Beschnitt.'
          : 'Expands PDF bleed boxes with perimeter mirror synthesis when edge artwork is truncated.',
      printprice:
        locale === 'es'
          ? 'Síntesis automática de BleedBox'
          : locale === 'de'
          ? 'Automatische BleedBox-Synthese'
          : 'Automatic BleedBox synthesis',
      competitors: [
        {
          name: 'Adobe Acrobat Pro',
          value: locale === 'es' ? 'Varía según edición' : locale === 'de' ? 'Variiert nach Edition' : 'Varies by edition',
        },
        {
          name: 'Enfocus PitStop',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
        {
          name: 'callas pdfToolbox',
          value: locale === 'es' ? 'Disponible' : locale === 'de' ? 'Verfügbar' : 'Available',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Firma técnica del informe vinculada a producción'
          : locale === 'de'
          ? 'Technische Freigabe signiert für Druckauftrag'
          : 'Technical audit verification linked to order',
      tooltip:
        locale === 'es'
          ? 'Vincula el hash SHA-256 del PDF certificado con el Imprimátur y la orden de producción del taller.'
          : locale === 'de'
          ? 'Verknüpft den SHA-256-Hash der zertifizierten PDF mit der Imprimatur und dem Fertigungsauftrag.'
          : 'Cryptographically binds certified PDF SHA-256 hash to 3D soft-proof imprimatur and plant job ticket.',
      printprice:
        locale === 'es'
          ? 'Enlace nativo de verificación de orden'
          : locale === 'de'
          ? 'Native Auftragsverifikationsbindung'
          : 'Native order verification link',
      competitors: [
        {
          name: 'Adobe Acrobat Pro',
          value: locale === 'es' ? 'No verificado' : locale === 'de' ? 'Nicht verifiziert' : 'Not verified',
        },
        {
          name: 'Enfocus PitStop',
          value: locale === 'es' ? 'Varía según integración' : locale === 'de' ? 'Variiert nach Integration' : 'Varies by integration',
        },
        {
          name: 'callas pdfToolbox',
          value: locale === 'es' ? 'Varía según integración' : locale === 'de' ? 'Variiert nach Integration' : 'Varies by integration',
        },
      ],
    },
  ];

  // Tab 3: PRINT IT (Búsqueda, Contratación y Seguimiento)
  const COMPARISON_PRINT: ComparisonRow[] = [
    {
      feature:
        locale === 'es'
          ? 'Modelo de servicio'
          : locale === 'de'
          ? 'Servicemodell'
          : 'Service model',
      tooltip:
        locale === 'es'
          ? 'PrintPrice conecta con plantas industriales adscritas sin sobreprecios comerciales ocultos.'
          : locale === 'de'
          ? 'PrintPrice bindet Partnerbetriebe direkt an; keine intransparenten Aufschläge.'
          : 'PrintPrice coordinates direct partner plants without hidden brokering markups.',
      printprice:
        locale === 'es' ? 'Directo con talleres' : locale === 'de' ? 'Direkt mit Partnerbetrieben' : 'Direct with partner plants',
      competitors: [
        {
          name: locale === 'es' ? 'Plataformas POD' : locale === 'de' ? 'POD-Plattformen' : 'POD Platforms',
          value: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
        },
        {
          name: locale === 'es' ? 'Gestión gráfica / Brókeres' : locale === 'de' ? 'Druckvermittler' : 'Traditional Brokers',
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Selección y asignación de imprenta'
          : locale === 'de'
          ? 'Druckereiauswahl & Zuweisung'
          : 'Printer selection & dispatch',
      tooltip:
        locale === 'es'
          ? 'Enrutamiento geodésico de 5 ejes considerando formato de máquina B1/B2, SLA, stock y OEE del taller.'
          : locale === 'de'
          ? '5-Achsen-Routing nach Bogenformat (B1/B2), Lieferzeitraum, Materiallager und OEE-Auslastung.'
          : '5-axis geodesic routing evaluating press format (B1/B2), SLA, substrate stock, and plant OEE load.',
      printprice:
        locale === 'es' ? 'Enrutamiento técnico 5-Ejes' : locale === 'de' ? 'Technisches 5-Achsen-Routing' : '5-Axis Technical Routing',
      competitors: [
        {
          name: locale === 'es' ? 'Plataformas POD' : locale === 'de' ? 'POD-Plattformen' : 'POD Platforms',
          value: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
        },
        {
          name: locale === 'es' ? 'Gestión gráfica / Brókeres' : locale === 'de' ? 'Druckvermittler' : 'Traditional Brokers',
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Presupuestación y desglose de costes'
          : locale === 'de'
          ? 'Kalkulation & Preisaufschlüsselung'
          : 'Pricing & itemized cost breakdown',
      tooltip:
        locale === 'es'
          ? 'Budget desglosa fabricación y papel al instante con fórmulas exactas de planchas y velocidad de máquina.'
          : locale === 'de'
          ? 'Budget schlüsselt Fertigung und Papier sofort auf, inklusive Platten- und Rüstzeiten.'
          : 'Budget itemizes manufacturing and substrate instantly with deterministic plate and speed algorithms.',
      printprice:
        locale === 'es' ? 'Inmediata en servidor' : locale === 'de' ? 'Sofortige Server-Kalkulation' : 'Instant server calculation',
      competitors: [
        {
          name: locale === 'es' ? 'Plataformas POD' : locale === 'de' ? 'POD-Plattformen' : 'POD Platforms',
          value: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
        },
        {
          name: locale === 'es' ? 'Gestión gráfica / Brókeres' : locale === 'de' ? 'Druckvermittler' : 'Traditional Brokers',
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Preparación técnica de archivos'
          : locale === 'de'
          ? 'Dateivorbereitung & Preflight'
          : 'File preparation & preflight',
      tooltip:
        locale === 'es'
          ? 'Fix it comprueba sangrados, perfiles Fogra39/51 y resolución en navegador sin necesidad de herramientas de escritorio.'
          : locale === 'de'
          ? 'Fix it prüft Beschnitt, Fogra-Profile und Auflösung direkt im Browser ohne Zusatzsoftware.'
          : 'Fix it audits bleeds, Fogra39/51 profiles, and image DPI directly in-browser without desktop tools.',
      printprice:
        locale === 'es' ? 'Preflight en navegador' : locale === 'de' ? 'In-Browser Preflight' : 'In-browser preflight',
      competitors: [
        {
          name: locale === 'es' ? 'Plataformas POD' : locale === 'de' ? 'POD-Plattformen' : 'POD Platforms',
          value: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
        },
        {
          name: locale === 'es' ? 'Gestión gráfica / Brókeres' : locale === 'de' ? 'Druckvermittler' : 'Traditional Brokers',
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Pedido, custodia y seguimiento'
          : locale === 'de'
          ? 'Bestellung, Treuhand & Tracking'
          : 'Ordering, escrow vault & tracking',
      tooltip:
        locale === 'es'
          ? 'El pedido vincula especificaciones técnicas, custodia Escrow y entrega certificada por albarán CMR/POD.'
          : locale === 'de'
          ? 'Verknüpft Spezifikationen, Escrow-Treuhandkonto und quittierte CMR/POD-Ablieferung.'
          : 'Binds technical specs, Escrow payment lock, and certified CMR/POD delivery tracking.',
      printprice:
        locale === 'es' ? 'Orden y registro Escrow' : locale === 'de' ? 'Auftrag & Escrow-Protokoll' : 'Order & Escrow protocol',
      competitors: [
        {
          name: locale === 'es' ? 'Plataformas POD' : locale === 'de' ? 'POD-Plattformen' : 'POD Platforms',
          value: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
        },
        {
          name: locale === 'es' ? 'Gestión gráfica / Brókeres' : locale === 'de' ? 'Druckvermittler' : 'Traditional Brokers',
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
      ],
    },
    {
      feature:
        locale === 'es'
          ? 'Integraciones y telemetría industrial'
          : locale === 'de'
          ? 'Schnittstellen & Telemetrie'
          : 'Integrations & industrial telemetry',
      tooltip:
        locale === 'es'
          ? 'Control Plane para talleres, webhooks HMAC-SHA256 y API técnica OpenAPI 3.1.'
          : locale === 'de'
          ? 'Control Plane für Werkstätten, HMAC-SHA256 Webhooks und OpenAPI 3.1 Schnittstelle.'
          : 'Plant Control Plane, HMAC-SHA256 webhooks, and full OpenAPI 3.1 technical endpoints.',
      printprice:
        locale === 'es' ? 'API REST + Control Plane' : locale === 'de' ? 'REST-API & Control Plane' : 'REST API & Control Plane',
      competitors: [
        {
          name: locale === 'es' ? 'Plataformas POD' : locale === 'de' ? 'POD-Plattformen' : 'POD Platforms',
          value: locale === 'es' ? 'Varía según plataforma' : locale === 'de' ? 'Variiert je nach Plattform' : 'Varies by platform',
        },
        {
          name: locale === 'es' ? 'Gestión gráfica / Brókeres' : locale === 'de' ? 'Druckvermittler' : 'Traditional Brokers',
          value: locale === 'es' ? 'Varía según proveedor' : locale === 'de' ? 'Variiert je nach Anbieter' : 'Varies by provider',
        },
      ],
    },
  ];

  const currentDataset =
    activeTab === 'price' ? COMPARISON_PRICE : activeTab === 'fix' ? COMPARISON_FIX : COMPARISON_PRINT;

  const getPrintPriceTitle = () => {
    switch (activeTab) {
      case 'price':
        return 'PrintPrice Pro (Budget)';
      case 'fix':
        return 'PrintPrice Preflight';
      case 'print':
        return 'PrintPrice Marketplace';
    }
  };

  const renderStatus = (val: string, isWinning: boolean) => {
    const lower = val.toLowerCase();
    const isMissing =
      lower.includes('no verificado') ||
      lower.includes('nicht verifiziert') ||
      lower.includes('not verified');

    if (isWinning) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.16)',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              color: '#4ade80',
              flexShrink: 0,
              boxShadow: '0 0 14px rgba(34, 197, 94, 0.3)',
            }}
          >
            <Check size={14} strokeWidth={2.8} />
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.35,
            }}
          >
            {val}
          </span>
        </div>
      );
    }

    if (isMissing) {
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            color: '#a1a1aa',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'rgba(39, 39, 42, 0.65)',
              border: '1px solid rgba(82, 82, 91, 0.6)',
              color: '#a1a1aa',
              flexShrink: 0,
            }}
          >
            <Minus size={12} strokeWidth={2.2} />
          </span>
          <span style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 500 }}>{val}</span>
        </div>
      );
    }

    return (
      <span
        style={{
          display: 'inline-block',
          padding: '0.35rem 0.75rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 600,
          backgroundColor: 'rgba(39, 39, 42, 0.75)',
          border: '1px solid rgba(82, 82, 91, 0.55)',
          color: '#e4e4e7',
          lineHeight: 1.3,
          textAlign: 'center',
        }}
      >
        {val}
      </span>
    );
  };

  return (
    <section
      id="comparativas"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
      }}
    >
      <Container>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <span className="pill-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            {dict.home.comparisonsPill}
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 0.75rem 0',
            }}
          >
            {dict.home.compHeading}
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            {dict.home.compSubtitle}
          </p>

          {/* Tab Selector */}
          <div
            style={{
              display: 'inline-flex',
              marginTop: '2rem',
              padding: '5px',
              borderRadius: '9999px',
              backgroundColor: '#111114',
              border: '1px solid rgba(63, 63, 70, 0.8)',
              gap: '4px',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            {(
              [
                { id: 'price', label: dict.home.tabPriceIt },
                { id: 'fix', label: dict.home.tabFixIt },
                { id: 'print', label: dict.home.tabPrintIt },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    position: 'relative',
                    padding: '0.55rem 1.35rem',
                    borderRadius: '9999px',
                    border: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    backgroundColor: isActive ? '#dc0000' : 'transparent',
                    color: isActive ? '#ffffff' : '#a1a1aa',
                    boxShadow: isActive ? '0 0 16px rgba(220, 0, 0, 0.45)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CAD Box Wrapper with Micro-Crosshairs */}
        <div
          style={{
            position: 'relative',
            borderRadius: '20px',
            backgroundColor: '#0c0c0e',
            border: '1px solid rgba(63, 63, 70, 0.65)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            overflow: 'hidden',
          }}
        >
          {/* Micro CAD Crosshairs (+) */}
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '10px',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: 'rgba(220, 0, 0, 0.4)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 10,
            }}
          >
            +
          </span>
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '10px',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: 'rgba(220, 0, 0, 0.4)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 10,
            }}
          >
            +
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '10px',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: 'rgba(220, 0, 0, 0.4)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 10,
            }}
          >
            +
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '10px',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: 'rgba(220, 0, 0, 0.4)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 10,
            }}
          >
            +
          </span>

          {/* Desktop Table View */}
          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                textAlign: 'left',
                minWidth: '780px',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  {/* Feature Header */}
                  <th
                    style={{
                      padding: '1.25rem 1.5rem',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#a1a1aa',
                      width: '32%',
                      backgroundColor: 'rgba(19, 19, 22, 0.85)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {dict.home.compFeature}
                  </th>

                  {/* Winning Column Header with Ambient Glow */}
                  <th
                    style={{
                      padding: '1.25rem 1.5rem',
                      width: '30%',
                      background: 'linear-gradient(180deg, rgba(140, 10, 10, 0.4) 0%, rgba(20, 18, 22, 0.95) 100%)',
                      borderLeft: '1px solid rgba(220, 0, 0, 0.5)',
                      borderRight: '1px solid rgba(220, 0, 0, 0.5)',
                      borderTop: '2px solid #dc0000',
                      borderBottom: '1px solid rgba(220, 0, 0, 0.4)',
                      position: 'relative',
                      boxShadow: '0 0 35px -8px rgba(220, 0, 0, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontFamily: 'monospace',
                          fontSize: '0.65rem',
                          fontWeight: 900,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#f87171',
                        }}
                      >
                        <Sparkles size={11} strokeWidth={2.5} />
                        NATIVE PLATFORM · RECOMMENDED
                      </span>
                      <span
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 900,
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {getPrintPriceTitle()}
                      </span>
                    </div>
                  </th>

                  {/* Competitor Headers - Centered */}
                  {currentDataset[0]?.competitors.map((comp, idx) => (
                    <th
                      key={idx}
                      style={{
                        padding: '1.25rem 1.25rem',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: '#a1a1aa',
                        backgroundColor: 'rgba(14, 14, 17, 0.6)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        textAlign: 'center',
                      }}
                    >
                      {comp.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentDataset.map((row, rowIdx) => {
                  const tooltipKey = `${activeTab}-${rowIdx}`;
                  const isTooltipOpen = hoveredTooltip === tooltipKey;
                  const isEven = rowIdx % 2 === 0;

                  return (
                    <tr
                      key={rowIdx}
                      style={{
                        backgroundColor: isEven ? 'rgba(15, 15, 18, 0.4)' : 'transparent',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      {/* Feature Name & Tooltip */}
                      <td
                        style={{
                          padding: '1.1rem 1.5rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          verticalAlign: 'middle',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: '#f4f4f5',
                              lineHeight: 1.45,
                            }}
                          >
                            {row.feature}
                          </span>

                          <div style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
                            <button
                              type="button"
                              aria-label="More information"
                              onMouseEnter={() => setHoveredTooltip(tooltipKey)}
                              onMouseLeave={() => setHoveredTooltip(null)}
                              onClick={() => setHoveredTooltip(isTooltipOpen ? null : tooltipKey)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '2px',
                                color: isTooltipOpen ? '#f87171' : '#71717a',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'color 0.15s ease',
                              }}
                            >
                              <Info size={14} />
                            </button>

                            {isTooltipOpen && (
                              <div
                                style={{
                                  position: 'absolute',
                                  left: '26px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  zIndex: 100,
                                  width: '280px',
                                  padding: '0.85rem 1rem',
                                  borderRadius: '12px',
                                  backgroundColor: '#18181b',
                                  border: '1px solid rgba(220, 0, 0, 0.4)',
                                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.85)',
                                  color: '#e4e4e7',
                                  fontSize: '0.78rem',
                                  lineHeight: 1.55,
                                  pointerEvents: 'none',
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.65rem',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    color: '#f87171',
                                    letterSpacing: '0.08em',
                                    marginBottom: '0.35rem',
                                  }}
                                >
                                  {locale === 'es'
                                    ? 'Especificación Técnica'
                                    : locale === 'de'
                                    ? 'Technische Spezifikation'
                                    : 'Technical Specification'}
                                </div>
                                {row.tooltip}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Elevated Winning PrintPrice Cell with Ambient Crimson Side Borders & Glow */}
                      <td
                        style={{
                          padding: '1.1rem 1.5rem',
                          background: 'linear-gradient(180deg, rgba(100, 10, 10, 0.22) 0%, rgba(20, 18, 22, 0.65) 100%)',
                          borderLeft: '1px solid rgba(220, 0, 0, 0.45)',
                          borderRight: '1px solid rgba(220, 0, 0, 0.45)',
                          borderBottom: '1px solid rgba(220, 0, 0, 0.2)',
                          verticalAlign: 'middle',
                          boxShadow: 'inset 0 0 20px rgba(220, 0, 0, 0.05)',
                        }}
                      >
                        {renderStatus(row.printprice, true)}
                      </td>

                      {/* Competitor Cells - Centered */}
                      {row.competitors.map((comp, cIdx) => (
                        <td
                          key={cIdx}
                          style={{
                            padding: '1.1rem 1.25rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {renderStatus(comp.value, false)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Citations Footer */}
        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '960px',
            margin: '1.5rem auto 0',
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0' }}>
            {locale === 'es' ? (
              <>
                * Fuentes oficiales consultadas (Revisión: Octubre 2026): Adobe Acrobat Pro (
                <a
                  href="https://helpx.adobe.com/acrobat/using/analyzing-documents-preflight-tool.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Adobe Help Center
                </a>
                ); Enfocus PitStop Pro (
                <a
                  href="https://www.enfocus.com/en/pitstop-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Enfocus Documentation
                </a>
                ); callas software pdfToolbox (
                <a
                  href="https://help.callassoftware.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  callas Help Center
                </a>
                ); Lulu (
                <a
                  href="https://help.lulu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Lulu Help Center
                </a>
                ); Gelato (
                <a
                  href="https://support.gelato.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Gelato Help Center
                </a>
                ); Ghent Workgroup (
                <a
                  href="https://gwg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  GWG Specifications
                </a>
                ). Las características no estandarizadas o dependientes de canal se indican como «Varía según proveedor» o «No verificado».
              </>
            ) : locale === 'de' ? (
              <>
                * Offizielle konsultierte Quellen (Stand: Oktober 2026): Adobe Acrobat Pro (
                <a
                  href="https://helpx.adobe.com/acrobat/using/analyzing-documents-preflight-tool.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Adobe Help Center
                </a>
                ); Enfocus PitStop Pro (
                <a
                  href="https://www.enfocus.com/en/pitstop-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Enfocus Documentation
                </a>
                ); callas software pdfToolbox (
                <a
                  href="https://help.callassoftware.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  callas Help Center
                </a>
                ); Lulu (
                <a
                  href="https://help.lulu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Lulu Help Center
                </a>
                ); Gelato (
                <a
                  href="https://support.gelato.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Gelato Help Center
                </a>
                ); Ghent Workgroup (
                <a
                  href="https://gwg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  GWG Specifications
                </a>
                ). Nicht standardisierte Merkmale werden als «Variiert je nach Anbieter» oder «Nicht verifiziert» ausgewiesen.
              </>
            ) : (
              <>
                * Official consulted sources (Revision: October 2026): Adobe Acrobat Pro (
                <a
                  href="https://helpx.adobe.com/acrobat/using/analyzing-documents-preflight-tool.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Adobe Help Center
                </a>
                ); Enfocus PitStop Pro (
                <a
                  href="https://www.enfocus.com/en/pitstop-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Enfocus Documentation
                </a>
                ); callas software pdfToolbox (
                <a
                  href="https://help.callassoftware.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  callas Help Center
                </a>
                ); Lulu (
                <a
                  href="https://help.lulu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Lulu Help Center
                </a>
                ); Gelato (
                <a
                  href="https://support.gelato.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  Gelato Help Center
                </a>
                ); Ghent Workgroup (
                <a
                  href="https://gwg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: 'inherit' }}
                >
                  GWG Specifications
                </a>
                ). Non-standardized traits are indicated as &quot;Varies by provider&quot; or &quot;Not verified&quot;.
              </>
            )}
          </p>
        </div>
      </Container>
    </section>
  );
};

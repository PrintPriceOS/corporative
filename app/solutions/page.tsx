'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ProductSurfaceGrid } from "@/components/monolith/ProductSurfaceGrid";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { useLocale } from "@/lib/i18n";

export default function SolutionsHub() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'ESCENARIOS DE PRODUCCIÓN GRÁFICA',
      heroTitle: 'DISEÑADO PARA CADA ENTORNO PRODUCTIVO',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Calcula costes, audita PDFs y conecta con talleres asociados con independencia del segmento gráfico: editorial, packaging, folletos o gran formato.',
      heroCtaPrimary: 'Iniciar cotización ➔',
      heroCtaSecondary: 'Ver casos de uso ↓',
      gridTitle: 'Sectores y aplicaciones gráficas',
      gridSubtitle: 'Flujos específicos adaptados a las particularidades mecánicas de cada tipo de trabajo.',
      solutions: [
        {
          name: "Libros y Sector Editorial",
          description: "Cálculo de lomo y pliegos, encuadernación rústica cosida o fresada PUR, tapa dura y auditoría de páginas interiores.",
          code: "EDITORIAL",
          href: "/for-publishers",
          ctaText: "Ver solución editorial ➔",
          icon: "layers"
        },
        {
          name: "Packaging y Estuchería",
          description: "Trazados de troquel complejos, selección de cartoncillos y microcanal, mermas de arranque y cálculo de hendidos.",
          code: "PACKAGING",
          href: "/solutions/packaging",
          ctaText: "Ver solución de packaging ➔",
          icon: "box"
        },
        {
          name: "Impresión Comercial y Folletos",
          description: "Tiradas en offset y digital, optimización de pliego, barnices y plegados para catálogos y folletos publicitarios.",
          code: "COMERCIAL",
          href: "/solutions/commercial",
          ctaText: "Ver impresión comercial ➔",
          icon: "layers"
        },
        {
          name: "Gran Formato y Rotulación",
          description: "Auditoría de resoluciones proporcionales a distancia de visualización, paneles y preparación para corte digital.",
          code: "GRAN FORMATO",
          href: "/solutions/large-format",
          ctaText: "Ver gran formato ➔",
          icon: "expand"
        }
      ],
      ctaSlogan: 'CAPACIDAD DE PLATAFORMA',
      ctaTitle: 'Un sistema determinista para cada flujo gráfico',
      ctaDesc: 'PrintPrice Pro estandariza especificaciones y calcula presupuestos con matrices de máquinas reales.',
      ctaBtn: 'Comenzar un proyecto ➔'
    },
    en: {
      heroLabel: 'PRINT MANUFACTURING SCENARIOS',
      heroTitle: 'ENGINEERED FOR EVERY PRINT SEGMENT',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Calculate costs, validate PDFs, and route production regardless of print segment: books, packaging, commercial collateral, or large format.',
      heroCtaPrimary: 'Start project estimation ➔',
      heroCtaSecondary: 'Explore use cases ↓',
      gridTitle: 'Print Verticals & Segments',
      gridSubtitle: 'Specialized workflows calibrated to the exact mechanical requirements of each product type.',
      solutions: [
        {
          name: "Book Publishing",
          description: "Spine calculation, sheet layout, PUR or section sewn softcover, case binding, and interior page box preflight.",
          code: "PUBLISHING",
          href: "/for-publishers",
          ctaText: "Explore publishing solution ➔",
          icon: "layers"
        },
        {
          name: "Packaging & Folding Cartons",
          description: "Complex dielines, solid bleached sulfate and flute boards, setup waste minimization, and creasing matrices.",
          code: "PACKAGING",
          href: "/solutions/packaging",
          ctaText: "Explore packaging solution ➔",
          icon: "box"
        },
        {
          name: "Commercial Collateral",
          description: "Offset and digital sheet yields, coating options, folding layouts, and fast turnarounds for brochures and flyers.",
          code: "COMMERCIAL",
          href: "/solutions/commercial",
          ctaText: "Explore commercial print ➔",
          icon: "layers"
        },
        {
          name: "Large Format & Signage",
          description: "Resolution verification scaled to viewing distance, panel tiling, and dieline formatting for digital cutting flatbeds.",
          code: "LARGE FORMAT",
          href: "/solutions/large-format",
          ctaText: "Explore large format ➔",
          icon: "expand"
        }
      ],
      ctaSlogan: 'PLATFORM CAPABILITY',
      ctaTitle: 'One deterministic system for every print vertical',
      ctaDesc: 'PrintPrice Pro standardizes specifications and calculates budgets against verified press capabilities.',
      ctaBtn: 'Start project estimation ➔'
    },
    de: {
      heroLabel: 'DRUCKPRODUKTIONS-SZENARIEN',
      heroTitle: 'FÜR JEDES DRUCKSEGMENT ENTWICKELT',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Kalkulieren Sie Kosten, prüfen Sie Druckdaten und verbinden Sie sich mit Partnerdruckereien – für Bücher, Verpackungen, Akzidenzdruck oder Großformat.',
      heroCtaPrimary: 'Kalkulation starten ➔',
      heroCtaSecondary: 'Anwendungsfälle ansehen ↓',
      gridTitle: 'Drucksegmente & Branchenlösungen',
      gridSubtitle: 'Spezifische Workflows, exakt abgestimmt auf die mechanischen Anforderungen jedes Produkttyps.',
      solutions: [
        {
          name: "Buch- & Verlagswesen",
          description: "Rückenstärkenberechnung, Bogenmontage, PUR- oder Fadenheftung, Hardcover und Preflight von Buchseiten.",
          code: "VERLAG",
          href: "/for-publishers",
          ctaText: "Verlagslösung ansehen ➔",
          icon: "layers"
        },
        {
          name: "Verpackung & Faltschachteln",
          description: "Komplexe Stanzkonturen, Karton- und Wellpappenqualitäten, Rüstmakulatur und Rillungsmatrizen.",
          code: "VERPACKUNG",
          href: "/solutions/packaging",
          ctaText: "Verpackungslösung ansehen ➔",
          icon: "box"
        },
        {
          name: "Akzidenzdruck & Broschüren",
          description: "Bogenoptimierung für Digital- und Offsetdruck, Dispersionslacke, Falzarten und terminsichere Produktion.",
          code: "AKZIDENZEN",
          href: "/solutions/commercial",
          ctaText: "Akzidenzdruck ansehen ➔",
          icon: "layers"
        },
        {
          name: "Großformat & Werbetechnik",
          description: "Skalierte Auflösungsprüfung je nach Betrachtungsabstand, Kachelung und Vorbereitung für digitale Schneidplotter.",
          code: "GROSSFORMAT",
          href: "/solutions/large-format",
          ctaText: "Großformat ansehen ➔",
          icon: "expand"
        }
      ],
      ctaSlogan: 'PLATTFORMKAPAZITÄT',
      ctaTitle: 'Ein deterministisches System für jeden Druckbereich',
      ctaDesc: 'PrintPrice Pro standardisiert Spezifikationen und kalkuliert Angebote nach realen Maschinenparametern.',
      ctaBtn: 'Projekt starten ➔'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="solutions-hub">
      {/* Solutions Hero */}
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroCtaPrimary, href: "https://budget.printprice.pro" }}
        secondaryAction={{ label: t.heroCtaSecondary, href: "#use-cases" }}
        variant="particles"
      />

      {/* Solutions Grid */}
      <div id="use-cases">
        <ProductSurfaceGrid 
          title={t.gridTitle}
          subtitle={t.gridSubtitle}
          variant="secondary"
          products={t.solutions as any}
        />
      </div>

      {/* Extensibility CTA */}
      <ActionCTA 
        slogan={t.ctaSlogan}
        title={t.ctaTitle}
        description={t.ctaDesc}
        buttonLabel={t.ctaBtn}
        buttonHref="https://budget.printprice.pro"
        trackingAction="solutions_cta_start_final"
      />
    </div>
  );
}

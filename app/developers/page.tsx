'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { ActionCTA } from '@/components/monolith/ActionCTA';
import { Icon } from '@/components/ui/Icon';
import { SystemCardHover } from '@/components/ui/effects/SystemCardHover';
import { useLocale } from '@/lib/i18n';
import {
  Terminal,
  Cpu,
  PackageCheck,
  Database,
  ShieldCheck,
  Lock,
  Layers,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

type CodeLang = 'curl' | 'typescript' | 'python';
type ShowcaseEndpoint = 'logistics' | 'pricing';

export default function DeveloperPortal() {
  const { locale } = useLocale();
  const [activeLang, setActiveLang] = useState<CodeLang>('curl');
  const [activeEndpoint, setActiveEndpoint] = useState<ShowcaseEndpoint>('logistics');
  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<ShowcaseEndpoint, Record<CodeLang, { title: string; language: string; code: string }>> = {
    logistics: {
      curl: {
        title: 'POST /api/logistics/calculate-quote',
        language: 'bash',
        code: `curl -X POST "https://control.printprice.pro/api/logistics/calculate-quote" \\
  -H "Authorization: Bearer ppos_live_jwt_token_99a8b7c6" \\
  -H "Content-Type: application/json" \\
  -H "x-tenant-id: ph-erfurt-offset-01" \\
  -d '{
    "trimWidthMm": 148,
    "trimHeightMm": 210,
    "pages": 320,
    "interiorGrammageGsm": 90,
    "interiorBulkFactor": 1.20,
    "bindingType": "hardcover",
    "boardThicknessMm": 2.5,
    "quantity": 2500,
    "warehouseProfileCode": "ZEITFRACHT_ERFURT",
    "originCountry": "DE",
    "destCountry": "DE",
    "destPostal": "99098",
    "stackabilityHandling": "STRICT_LDM_NON_STACKABLE",
    "slotBookingManagement": "SHIPPER_MANAGED",
    "trackingIntegrationMode": "MANUAL_PORTAL_OR_CMR"
  }'`
      },
      typescript: {
        title: 'calculate-logistics-quote.ts',
        language: 'typescript',
        code: `// PrintPrice OS — 3D Cubing, Warehouse Compliance & Landed Freight Quote
const response = await fetch('https://control.printprice.pro/api/logistics/calculate-quote', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.PPOS_CONTROL_JWT}\`,
    'Content-Type': 'application/json',
    'x-tenant-id': 'ph-erfurt-offset-01'
  },
  body: JSON.stringify({
    trimWidthMm: 148,
    trimHeightMm: 210,
    pages: 320,
    interiorGrammageGsm: 90,
    interiorBulkFactor: 1.20,
    bindingType: 'hardcover',     // Includes 1.20 g/cm³ greyboard + endpapers
    boardThicknessMm: 2.5,
    quantity: 2500,
    warehouseProfileCode: 'ZEITFRACHT_ERFURT',
    originCountry: 'DE',
    destCountry: 'DE',
    destPostal: '99098',
    stackabilityHandling: 'STRICT_LDM_NON_STACKABLE',
    slotBookingManagement: 'SHIPPER_MANAGED',
    trackingIntegrationMode: 'MANUAL_PORTAL_OR_CMR'
  })
});

const { quote, logisticsCubing } = await response.json();
console.log(\`Pallets: \${logisticsCubing.palletStacking.totalPallets} | Landed Freight: €\${quote.totalLandedLogisticsCostEur}\`);`
      },
      python: {
        title: 'calculate_logistics_quote.py',
        language: 'python',
        code: `import os
import requests

url = "https://control.printprice.pro/api/logistics/calculate-quote"
headers = {
    "Authorization": f"Bearer {os.environ['PPOS_CONTROL_JWT']}",
    "Content-Type": "application/json",
    "x-tenant-id": "ph-erfurt-offset-01",
}
payload = {
    "trimWidthMm": 148,
    "trimHeightMm": 210,
    "pages": 320,
    "interiorGrammageGsm": 90,
    "interiorBulkFactor": 1.20,
    "bindingType": "hardcover",
    "boardThicknessMm": 2.5,
    "quantity": 2500,
    "warehouseProfileCode": "ZEITFRACHT_ERFURT",
    "originCountry": "DE",
    "destCountry": "DE",
    "destPostal": "99098",
    "stackabilityHandling": "STRICT_LDM_NON_STACKABLE",
    "slotBookingManagement": "SHIPPER_MANAGED",
    "trackingIntegrationMode": "MANUAL_PORTAL_OR_CMR",
}

res = requests.post(url, json=payload, headers=headers, timeout=10)
data = res.json()
print("Total Landed Logistics (EUR):", data["quote"]["totalLandedLogisticsCostEur"])`
      }
    },
    pricing: {
      curl: {
        title: 'POST /api/marketplace/offers',
        language: 'bash',
        code: `curl -X POST "https://api.printprice.pro/api/marketplace/offers" \\
  -H "Content-Type: application/json" \\
  -H "x-trace-id: trace_prod_99481a" \\
  -d '{
    "copies": 2500,
    "interior_pages": 320,
    "format": "148x210",
    "paper_inner": "offset_white_90",
    "paper_cover": "couche_matt_150_hardcover",
    "binding_method": "casebound_sewn",
    "delivery_country": "DE",
    "delivery_postal_code": "99098",
    "warehouse_profile_code": "ZEITFRACHT_ERFURT"
  }'`
      },
      typescript: {
        title: 'calculate-book-offers.ts',
        language: 'typescript',
        code: `// PrintPrice OS — Deterministic BPE Manufacturing & Segregated Landed Quote
const response = await fetch('https://api.printprice.pro/api/marketplace/offers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-trace-id': 'trace_prod_99481a'
  },
  body: JSON.stringify({
    copies: 2500,
    interior_pages: 320,
    format: '148x210',
    paper_inner: 'offset_white_90',
    paper_cover: 'couche_matt_150_hardcover',
    binding_method: 'casebound_sewn',
    delivery_country: 'DE',
    delivery_postal_code: '99098',
    warehouse_profile_code: 'ZEITFRACHT_ERFURT'
  })
});

const { offers, evidenceId } = await response.json();
console.log(\`Evidence: \${evidenceId} | Manufacturing: €\${offers[0].manufacturingPrice}\`);`
      },
      python: {
        title: 'calculate_book_offers.py',
        language: 'python',
        code: `import requests

response = requests.post(
    "https://api.printprice.pro/api/marketplace/offers",
    headers={
        "Content-Type": "application/json",
        "x-trace-id": "trace_prod_99481a",
    },
    json={
        "copies": 2500,
        "interior_pages": 320,
        "format": "148x210",
        "paper_inner": "offset_white_90",
        "paper_cover": "couche_matt_150_hardcover",
        "binding_method": "casebound_sewn",
        "delivery_country": "DE",
        "delivery_postal_code": "99098",
        "warehouse_profile_code": "ZEITFRACHT_ERFURT",
    },
    timeout=10,
)
result = response.json()
print("Evidence ID:", result["evidenceId"], "Best Offer:", result["offers"][0]["totalLandedPriceEur"])`
      }
    }
  };

  const responsePayload = `{
  "ok": true,
  "evidenceId": "ev_99812f4c_zeitfracht",
  "costSegregation": {
    "manufacturingPrice": 4625.00,
    "packagingMaterialsCostEur": 147.00,
    "carrierFreightCostEur": 204.48,
    "totalLandedCostEur": 4976.48
  },
  "logisticsCubing": {
    "unitNetWeightGrams": 592.4,
    "cartonSpec": {
      "fefcoCode": "FEFCO_0201_400x300",
      "booksPerCarton": 22,
      "cartonGrossWeightKg": 13.45,
      "totalCartons": 114
    },
    "palletSpec": {
      "palletStandard": "EUR_EPAL_1200x800",
      "palletCount": 4,
      "cartonsPerLayer": 9,
      "layersPerPallet": 4,
      "maxPalletHeightMm": 1064,
      "perimeterSetbackMm": 30,
      "ldmTotal": 1.6,
      "taxableWeightKg": 2960.0
    },
    "runOptimization": {
      "deltaQMinus": { "recommendedQuantity": 2376, "palletsSaved": 1 },
      "deltaQPlus": { "recommendedQuantity": 3168, "additionalBooksOnSamePallets": 668 }
    },
    "slotBookingActionPlan": {
      "warehouseCode": "ZEITFRACHT_ERFURT",
      "managementMode": "SHIPPER_MANAGED",
      "leadTimeHours": 48,
      "dispatchNoticeEmail": "avis-wareneingang-va@zeitfracht.de",
      "unbookedPenaltyExposureEur": 128.00,
      "ssccSample": "(00) 340123450000000105"
    }
  }
}`;

  const handleCopyCode = () => {
    const snippet = codeSnippets[activeEndpoint][activeLang].code;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const texts = {
    es: {
      heroLabel: 'DEVELOPER HUB · CONTROL PLANE & INTELLIGENCE LAYER API',
      heroTitle: 'APIs INDUSTRIALES DE PRODUCCIÓN GRÁFICA Y LOGÍSTICA 3D',
      heroSlogan: ['CALCULA.', 'VALIDA.', 'CUBICA Y ENRUTA VÍA API.'],
      heroSub:
        'Integra el motor determinista de costes (Book Pricing Engine), el solucionador de cubicaje 3D sobre Euro-palets EPAL, la federación de papel y la inspección PDF preflight mediante contratos REST OpenAPI 3.1 con aislamiento estricto de costes y multi-tenancy.',
      ctaReadDocs: 'Read the Docs ➔',
      ctaApiRef: 'API Reference ➔',
      ctaRequestAccess: 'Obtener API Key Instantánea (pp_test_*)',
      showcaseTitle: 'Integración Interactiva & Segregación Estricta de Costes',
      showcaseSub:
        'Cada respuesta del Control Plane separa matemáticamente el coste industrial de fabricación (manufacturingPrice), los consumibles de embalaje EPAL/FEFCO (packagingMaterialsCostEur) y el flete de transporte tasado por LDM o escalones de palets (carrierFreightCostEur).',
      tabLogistics: 'Cubicaje 3D & Landed Cost (POST /api/logistics/calculate-quote)',
      tabPricing: 'Ofertas de Producción & BPE (POST /api/marketplace/offers)',
      responseHeader: 'RESPUESTA AUDITADA · HTTP 200 OK (JSON)',
      modulesTitle: 'Módulos Principales de la API',
      modulesSub: 'Cuatro motores deterministas interconectados bajo un único perímetro de seguridad y trazabilidad.',
      modules: [
        {
          id: 'core-pricing',
          code: '01 / BPE CORE',
          title: 'Core Pricing Engine',
          desc: 'Algoritmos deterministas de imposición en pliego, punto de cruce digital vs. offset, mermas de arranque (makeready) y cálculo de coste marginal por ejemplar en tiempo real.',
          endpoint: 'POST /api/marketplace/offers',
          href: 'https://docs.printprice.pro/docs/api/pricing-api',
          cta: 'Ver Pricing API ➔'
        },
        {
          id: 'logistics-cubing',
          code: '02 / LOGISTICS 3D',
          title: '3D Cubing & Logistics API',
          desc: 'Cálculo de masa neta guillotinada (incluyendo cartón gris a 1,20 g/cm³ y guardas), encajado FEFCO 0201 (≤ 15 kg), mosaico entrelazado en Euro-palet EPAL, peso tasable LDM, cita previa 48h y código GS1-128 SSCC.',
          endpoint: 'POST /api/logistics/calculate-quote',
          href: 'https://docs.printprice.pro/docs/api/logistics-api',
          cta: 'Ver Logistics API ➔'
        },
        {
          id: 'paper-hub',
          code: '03 / PAPER HUB',
          title: 'Paper Supplier Hub & Catalog',
          desc: 'Consulta federada de sustratos maestros, gramajes, volumen específico (bulk/caliper), certificaciones FSC/PEFC y tarifas de distribuidores desacopladas del porte.',
          endpoint: 'GET /api/admin/materials/catalog',
          href: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub',
          cta: 'Ver Paper Hub ➔'
        },
        {
          id: 'preflight-automation',
          code: '04 / PREFLIGHT',
          title: 'Preflight & PDF Automation',
          desc: 'Inspección geométrica de TrimBox/BleedBox hasta 2 GB, detección de resoluciones efectivas (< 300 DPI), espacios de color CMYK/ICC y remediación asistida.',
          endpoint: 'POST /api/preflight/jobs',
          href: 'https://docs.printprice.pro/docs/api/preflight-api',
          cta: 'Ver Preflight API ➔'
        }
      ],
      secTitle: 'Arquitectura, Gobernanza y Estándares de Seguridad',
      secSub: 'Diseñado bajo principios de cero confianza (Zero-Trust) para proteger tarifas privadas de imprentas, acuerdos editoriales y evidencias comerciales.',
      secItems: [
        {
          title: 'Bearer JWT & API Keys Segregadas por Entorno',
          desc: 'Autenticación criptográfica mediante tokens JWT firmados y credenciales aisladas para entornos Sandbox y Production, evitando ejecuciones accidentales en planta.'
        },
        {
          title: 'Aislamiento Multi-Tenant & Anti-Spoofing (RBAC)',
          desc: 'Validación estricta de roles (PRINTHOUSE_ADMIN, PRINTHOUSE_OPERATOR, SUPER_ADMIN) y bloqueo automático (403 FORBIDDEN_TENANT_MISMATCH) ante intentos de suplantación en cabeceras o payloads.'
        },
        {
          title: 'Baja Latencia (< 250 ms) & Outbox Webhooks HMAC-SHA256',
          desc: 'Solucionadores matemáticos en memoria sin bloqueos de I/O y entrega garantizada de eventos de producción y tracking firmados con X-PPOS-Signature.'
        }
      ],
      quickLinksTitle: 'Enlaces Rápidos a la Documentación Oficial',
      quickLinksSub: 'Especificaciones OpenAPI 3.1, diagramas de arquitectura Mermaid y guías de integración verificadas en docs.printprice.pro.',
      quickLinks: [
        {
          badge: 'ENGINE GUIDE',
          title: 'Logistics & 3D Cubing Engine',
          desc: 'Fórmulas de masa neta, perfiles Zeitfracht Erfurt / VVA Arvato, cálculo LDM (740 kg) y optimizador ΔQ- / ΔQ+.',
          href: 'https://docs.printprice.pro/docs/engines/logistics-cubing-engine'
        },
        {
          badge: 'REST REFERENCE',
          title: 'Logistics & Freight Matrices REST API',
          desc: 'Esquemas JSON completos para /api/logistics/warehouses, /calculate-quote y /freight-matrices.',
          href: 'https://docs.printprice.pro/docs/api/logistics-api'
        },
        {
          badge: 'REST REFERENCE',
          title: 'Pricing & Marketplace Orders API',
          desc: 'Contratos de cotización determinista, registro de pedidos, vinculación de archivos y readiness.',
          href: 'https://docs.printprice.pro/docs/api/pricing-api'
        },
        {
          badge: 'ARCHITECTURE',
          title: 'API Overview & OpenAPI 3.1 Bundles',
          desc: 'Mapa completo de endpoints en producción, descarga de especificaciones YAML y políticas de acceso.',
          href: 'https://docs.printprice.pro/docs/api/overview'
        }
      ],
      ctaFinalTitle: '¿Listo para conectar tu ERP, e-commerce o flujo editorial?',
      ctaFinalDesc: 'Genera tu Sandbox API Key al instante (1.000 llamadas/mes gratis, sin tarjeta) o desbloquea llaves Live de producción en el Developer Hub.',
      ctaFinalBtn: 'Obtener API Key Instantánea ➔'
    },
    en: {
      heroLabel: 'DEVELOPER HUB · CONTROL PLANE & INTELLIGENCE LAYER API',
      heroTitle: 'INDUSTRIAL API INFRASTRUCTURE FOR PRINT & 3D LOGISTICS',
      heroSlogan: ['PRICE IT.', 'FIX IT.', 'CUBE & ROUTE VIA API.'],
      heroSub:
        'Integrate the deterministic Book Pricing Engine (BPE), 3D EPAL Euro-pallet cubing solver, substrate catalog federation, and automated PDF preflight via OpenAPI 3.1 REST contracts with strict cost segregation and multi-tenant isolation.',
      ctaReadDocs: 'Read the Docs ➔',
      ctaApiRef: 'API Reference ➔',
      ctaRequestAccess: 'Get Instant API Key (pp_test_*)',
      showcaseTitle: 'Interactive Integration & Strict Cost Segregation',
      showcaseSub:
        'Every Control Plane response mathematically decouples print manufacturing costs (manufacturingPrice), EPAL/FEFCO packaging consumables (packagingMaterialsCostEur), and LDM/stepped-pallet carrier freight (carrierFreightCostEur).',
      tabLogistics: '3D Cubing & Landed Cost (POST /api/logistics/calculate-quote)',
      tabPricing: 'Manufacturing Offers & BPE (POST /api/marketplace/offers)',
      responseHeader: 'VERIFIED RESPONSE · HTTP 200 OK (JSON)',
      modulesTitle: 'Core API Modules',
      modulesSub: 'Four deterministic engines orchestrated under a unified security, tenancy, and commercial evidence boundary.',
      modules: [
        {
          id: 'core-pricing',
          code: '01 / BPE CORE',
          title: 'Core Pricing Engine',
          desc: 'Deterministic sheet imposition algorithms, digital-vs-offset crossover detection, press makeready waste curves, and marginal unit cost calculation.',
          endpoint: 'POST /api/marketplace/offers',
          href: 'https://docs.printprice.pro/docs/api/pricing-api',
          cta: 'Explore Pricing API ➔'
        },
        {
          id: 'logistics-cubing',
          code: '02 / LOGISTICS 3D',
          title: '3D Cubing & Logistics API',
          desc: 'Trimmed book mass (including 1.20 g/cm³ hardcover greyboard & endpapers), FEFCO 0201 carton packing (≤ 15 kg), interlocked EPAL pallet tiling, LDM taxable weight, 48h slot booking, and GS1-128 SSCC barcodes.',
          endpoint: 'POST /api/logistics/calculate-quote',
          href: 'https://docs.printprice.pro/docs/api/logistics-api',
          cta: 'Explore Logistics API ➔'
        },
        {
          id: 'paper-hub',
          code: '03 / PAPER HUB',
          title: 'Paper Supplier Hub & Catalog',
          desc: 'Federated master substrate queries across basis weights (GSM), bulk/caliper ratios, ISO brightness, FSC/PEFC certifications, and distributor price tiers.',
          endpoint: 'GET /api/admin/materials/catalog',
          href: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub',
          cta: 'Explore Paper Hub ➔'
        },
        {
          id: 'preflight-automation',
          code: '04 / PREFLIGHT',
          title: 'Preflight & PDF Automation',
          desc: 'Real-time PDF geometry inspection (TrimBox/BleedBox up to 2 GB), effective image DPI checks (< 300 DPI), CMYK/ICC color auditing, and automated box remediation.',
          endpoint: 'POST /api/preflight/jobs',
          href: 'https://docs.printprice.pro/docs/api/preflight-api',
          cta: 'Explore Preflight API ➔'
        }
      ],
      secTitle: 'Architecture, Governance & Security Standards',
      secSub: 'Engineered with Zero-Trust boundaries to protect private printhouse rate matrices, publisher contracts, and immutable commercial evidence.',
      secItems: [
        {
          title: 'Bearer JWT & Environment-Scoped API Keys',
          desc: 'Cryptographic authentication via signed Bearer JWTs and isolated Sandbox vs. Production credentials to prevent unintended press-floor dispatches.'
        },
        {
          title: 'Strict Multi-Tenant Isolation & Anti-Spoofing (RBAC)',
          desc: 'Enforces granular Control Plane roles (PRINTHOUSE_ADMIN, PRINTHOUSE_OPERATOR, SUPER_ADMIN) and blocks cross-tenant header/body spoofing with 403 FORBIDDEN_TENANT_MISMATCH.'
        },
        {
          title: 'Low-Latency SLAs (< 250ms) & HMAC-SHA256 Webhooks',
          desc: 'Pure in-memory 3D cubing and pricing solvers paired with transactional outbox webhooks signed with X-PPOS-Signature for production and carrier tracking events.'
        }
      ],
      quickLinksTitle: 'Quick Links to Official Documentation',
      quickLinksSub: 'Verified OpenAPI 3.1 contracts, Mermaid architectural diagrams, and implementation guides hosted on docs.printprice.pro.',
      quickLinks: [
        {
          badge: 'ENGINE GUIDE',
          title: 'Logistics & 3D Cubing Engine',
          desc: 'Net book mass formulas, Zeitfracht Erfurt & VVA Arvato dock compliance, LDM taxable weight (740 kg), and ΔQ- / ΔQ+ run optimizer.',
          href: 'https://docs.printprice.pro/docs/engines/logistics-cubing-engine'
        },
        {
          badge: 'REST REFERENCE',
          title: 'Logistics & Freight Matrices REST API',
          desc: 'Complete request/response schemas for /api/logistics/warehouses, /calculate-quote, and /freight-matrices.',
          href: 'https://docs.printprice.pro/docs/api/logistics-api'
        },
        {
          badge: 'REST REFERENCE',
          title: 'Pricing & Marketplace Orders API',
          desc: 'Deterministic quote generation, order intake, file metadata binding, and readiness recomputation contracts.',
          href: 'https://docs.printprice.pro/docs/api/pricing-api'
        },
        {
          badge: 'ARCHITECTURE',
          title: 'API Overview & OpenAPI 3.1 Bundles',
          desc: 'Master production endpoint inventory, downloadable OpenAPI YAML specifications, and partner onboarding gates.',
          href: 'https://docs.printprice.pro/docs/api/overview'
        }
      ],
      ctaFinalTitle: 'Ready to connect your ERP, storefront, or publishing workflow?',
      ctaFinalDesc: 'Provision your instant Sandbox API Key (1,000 free monthly calls, no credit card required) or unlock Production Live keys in the Developer Hub.',
      ctaFinalBtn: 'Get Instant API Key ➔'
    },
    de: {
      heroLabel: 'DEVELOPER HUB · CONTROL PLANE & INTELLIGENCE LAYER API',
      heroTitle: 'INDUSTRIELLE API-PLATTFORM FÜR DRUCK & 3D-LOGISTIK',
      heroSlogan: ['KALKULIEREN.', 'PRÜFEN.', 'PALETTIEREN & ROUTEN VIA API.'],
      heroSub:
        'Integrieren Sie die deterministische Book Pricing Engine (BPE), den 3D-EPAL-Palettierungsrechner, den Paper Supplier Hub und das automatisierte PDF-Preflight über OpenAPI 3.1 REST-Verträge mit strikter Kostentrennung und Mandantenfähigkeit.',
      ctaReadDocs: 'Read the Docs ➔',
      ctaApiRef: 'API Reference ➔',
      ctaRequestAccess: 'Sofortigen API-Key erhalten (pp_test_*)',
      showcaseTitle: 'Interaktive Integration & Strikte Kostentrennung',
      showcaseSub:
        'Jede Antwort der Control Plane trennt mathematisch exakt zwischen reinen Herstellkosten (manufacturingPrice), EPAL/FEFCO-Verpackungsmaterial (packagingMaterialsCostEur) und Speditionsfracht nach Lademetern oder Palettenstaffeln (carrierFreightCostEur).',
      tabLogistics: '3D-Palettierung & Landed Cost (POST /api/logistics/calculate-quote)',
      tabPricing: 'Produktionsangebote & BPE (POST /api/marketplace/offers)',
      responseHeader: 'VERIFIZIERTE ANTWORT · HTTP 200 OK (JSON)',
      modulesTitle: 'Kernmodule der API',
      modulesSub: 'Vier deterministische Berechnungs-Engines unter einer einheitlichen Sicherheits- und Mandantenarchitektur.',
      modules: [
        {
          id: 'core-pricing',
          code: '01 / BPE CORE',
          title: 'Core Pricing Engine',
          desc: 'Deterministische Bogenmontage-Algorithmen, Digital/Offset-Schnittpunktberechnung, Rüstmakulaturkurven und Grenzkostenkalkulation in Echtzeit.',
          endpoint: 'POST /api/marketplace/offers',
          href: 'https://docs.printprice.pro/docs/api/pricing-api',
          cta: 'Pricing API ansehen ➔'
        },
        {
          id: 'logistics-cubing',
          code: '02 / LOGISTICS 3D',
          title: '3D Cubing & Logistics API',
          desc: 'Beschnittenes Buchnettogewicht (inkl. 1,20 g/cm³ Graupappe & Vorsatz), FEFCO 0201 Kartonpackung (≤ 15 kg), Kreuzverband auf EPAL-Europaletten, LDM-Frachtgewicht, 48h-Zeitfenster und GS1-128 SSCC/NVE.',
          endpoint: 'POST /api/logistics/calculate-quote',
          href: 'https://docs.printprice.pro/docs/api/logistics-api',
          cta: 'Logistics API ansehen ➔'
        },
        {
          id: 'paper-hub',
          code: '03 / PAPER HUB',
          title: 'Paper Supplier Hub & Catalog',
          desc: 'Föderierte Abfrage von Bedruckstoffen nach Grammatur, Volumen/Bulk, ISO-Weiße, FSC/PEFC-Zertifikaten und Großhändler-Staffelpreisen.',
          endpoint: 'GET /api/admin/materials/catalog',
          href: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub',
          cta: 'Paper Hub ansehen ➔'
        },
        {
          id: 'preflight-automation',
          code: '04 / PREFLIGHT',
          title: 'Preflight & PDF Automation',
          desc: 'Geometrische PDF-Prüfung (TrimBox/BleedBox bis 2 GB), effektive Bildauflösung (< 300 DPI), CMYK/ICC-Farbprofile und automatische Box-Korrektur.',
          endpoint: 'POST /api/preflight/jobs',
          href: 'https://docs.printprice.pro/docs/api/preflight-api',
          cta: 'Preflight API ansehen ➔'
        }
      ],
      secTitle: 'Architektur, Governance & Sicherheitsstandards',
      secSub: 'Entwickelt nach Zero-Trust-Prinzipien zum Schutz privater Druckereitarife, Verlagskonditionen und kaufmännischer Nachweise.',
      secItems: [
        {
          title: 'Bearer JWT & Getrennte Sandbox/Production API-Keys',
          desc: 'Kryptografische Authentifizierung über signierte JWTs und strikt getrennte Umgebungs-Credentials zum Schutz des produktiven Drucksaals.'
        },
        {
          title: 'Strikte Mandantentrennung & Anti-Spoofing (RBAC)',
          desc: 'Validiert Control-Plane-Rollen (PRINTHOUSE_ADMIN, PRINTHOUSE_OPERATOR, SUPER_ADMIN) und blockiert Cross-Tenant-Zugriffe sofort mit 403 FORBIDDEN_TENANT_MISMATCH.'
        },
        {
          title: 'Niedrige Latenz (< 250 ms) & HMAC-SHA256 Webhooks',
          desc: 'Reine In-Memory-Berechnungskerne kombiniert mit garantiert zugestellten Outbox-Webhooks (X-PPOS-Signature) für Produktions- und Sendungsstatus.'
        }
      ],
      quickLinksTitle: 'Direktlinks zur Offiziellen Dokumentation',
      quickLinksSub: 'Verifizierte OpenAPI 3.1 Spezifikationen, Mermaid-Architekturdiagramme und Integrationsleitfäden auf docs.printprice.pro.',
      quickLinks: [
        {
          badge: 'ENGINE GUIDE',
          title: 'Logistics & 3D Cubing Engine',
          desc: 'Gewichtsformeln, Richtlinien für Zeitfracht Erfurt & VVA Arvato, LDM-Frachtgewicht (740 kg) und Auflagenoptimierer ΔQ- / ΔQ+.',
          href: 'https://docs.printprice.pro/docs/engines/logistics-cubing-engine'
        },
        {
          badge: 'REST REFERENCE',
          title: 'Logistics & Freight Matrices REST API',
          desc: 'Vollständige JSON-Schemata für /api/logistics/warehouses, /calculate-quote und /freight-matrices.',
          href: 'https://docs.printprice.pro/docs/api/logistics-api'
        },
        {
          badge: 'REST REFERENCE',
          title: 'Pricing & Marketplace Orders API',
          desc: 'Deterministische Angebotskalkulation, Auftragseingang, Dateiverknüpfung und Readiness-Prüfung.',
          href: 'https://docs.printprice.pro/docs/api/pricing-api'
        },
        {
          badge: 'ARCHITECTURE',
          title: 'API Overview & OpenAPI 3.1 Bundles',
          desc: 'Vollständiges Endpunktverzeichnis, OpenAPI-YAML-Downloads und Partner-Authentifizierung.',
          href: 'https://docs.printprice.pro/docs/api/overview'
        }
      ],
      ctaFinalTitle: 'Bereit, Ihr ERP, Ihren Shop oder Ihr Verlagssystem anzubinden?',
      ctaFinalDesc: 'Erstellen Sie sofort Ihren kostenlosen Sandbox-API-Key (1.000 Gratis-Aufrufe/Monat, keine Kreditkarte erforderlich) im Developer Hub.',
      ctaFinalBtn: 'Sofortigen API-Key erhalten ➔'
    }
  };

  const t = texts[locale] || texts.en;
  const activeSnippet = codeSnippets[activeEndpoint][activeLang];

  return (
    <div className="developer-portal" style={{ background: '#131314', color: '#e5e2e3' }}>
      {/* 1. HERO DE DESARROLLADORES */}
      <HeroPlatform
        label={t.heroLabel}
        title={<span style={{ color: '#e5e2e3' }}>{t.heroTitle}</span>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{
          label: t.ctaReadDocs,
          href: 'https://docs.printprice.pro/docs/',
          sublabel: 'OPENAPI 3.1 · REST JSON · ZERO PROPRIETARY SDK LOCK-IN'
        }}
        secondaryAction={{
          label: t.ctaApiRef,
          href: 'https://docs.printprice.pro/docs/api/overview'
        }}
        variant="particles"
        rightContent={
          <div
            className="rounded-card"
            style={{
              background: '#0e0e0f',
              border: '1px solid rgba(220, 0, 0, 0.35)',
              padding: '1.5rem 1.75rem',
              boxShadow: '0 0 28px rgba(220, 0, 0, 0.14)',
              maxWidth: '480px',
              marginLeft: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '0.85rem',
                marginBottom: '1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <span
                className="technical-text"
                style={{ fontSize: '0.72rem', fontWeight: 800, color: '#dc0000', letterSpacing: '0.12em' }}
              >
                CONTROL PLANE RUNTIME · v1.1.0
              </span>
              <span
                className="technical-text"
                style={{
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.55rem',
                  background: 'rgba(220, 0, 0, 0.15)',
                  color: '#ffb4a8',
                  fontWeight: 700
                }}
              >
                SLA &lt; 250ms
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: '#8d8d91' }}>Pricing Authority:</span>
                <span className="technical-text" style={{ color: '#e5e2e3', fontWeight: 700 }}>
                  Server-Side BPE (:8004)
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: '#8d8d91' }}>3D Cubing &amp; EPAL Engine:</span>
                <span className="technical-text" style={{ color: '#e5e2e3', fontWeight: 700 }}>
                  FEFCO 0201 + EUR-1
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: '#8d8d91' }}>Editorial Dock Profiles:</span>
                <span className="technical-text" style={{ color: '#ffb4a8', fontWeight: 700 }}>
                  Zeitfracht · VVA · FBA
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: '#8d8d91' }}>Cost Segregation:</span>
                <span className="technical-text" style={{ color: '#e5e2e3', fontWeight: 700 }}>
                  Mfg ≠ Pack ≠ Freight
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: '#8d8d91' }}>Security &amp; Tenancy:</span>
                <span className="technical-text" style={{ color: '#e5e2e3', fontWeight: 700 }}>
                  Bearer JWT + RBAC Guard
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              <a
                href="https://control.printprice.pro/developers"
                style={{
                  fontSize: '0.78rem',
                  color: '#ffb4a8',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                {t.ctaRequestAccess} ➔
              </a>
              <a
                href="https://docs.printprice.pro/openapi/printprice-partner-api.bundle.yaml"
                target="_blank"
                rel="noopener noreferrer"
                className="technical-text"
                style={{
                  fontSize: '0.72rem',
                  color: '#8d8d91',
                  textDecoration: 'none'
                }}
              >
                OpenAPI 3.1 YAML ↗
              </a>
            </div>
          </div>
        }
      />

      {/* 2. BLOQUE DE INTEGRACIÓN INTERACTIVA / CODE SHOWCASE */}
      <section
        id="code-showcase"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) 0',
          background: '#0e0e0f',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        <Container>
          <div style={{ maxWidth: '820px', marginBottom: '2.75rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: '#e5e2e3'
              }}
            >
              {t.showcaseTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#9ca3af', lineHeight: 1.65 }}>
              {t.showcaseSub}
            </p>
          </div>

          {/* Endpoint Selector Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveEndpoint('logistics')}
              style={{
                padding: '0.75rem 1.25rem',
                background: activeEndpoint === 'logistics' ? '#dc0000' : '#18181b',
                color: activeEndpoint === 'logistics' ? '#ffffff' : '#a1a1aa',
                border: activeEndpoint === 'logistics' ? '1px solid #dc0000' : '1px solid rgba(255,255,255,0.1)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-technical)',
                transition: 'all 0.15s ease'
              }}
            >
              {t.tabLogistics}
            </button>
            <button
              type="button"
              onClick={() => setActiveEndpoint('pricing')}
              style={{
                padding: '0.75rem 1.25rem',
                background: activeEndpoint === 'pricing' ? '#dc0000' : '#18181b',
                color: activeEndpoint === 'pricing' ? '#ffffff' : '#a1a1aa',
                border: activeEndpoint === 'pricing' ? '1px solid #dc0000' : '1px solid rgba(255,255,255,0.1)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-technical)',
                transition: 'all 0.15s ease'
              }}
            >
              {t.tabPricing}
            </button>
          </div>

          {/* Split Request / Response Showcase */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(440px, 100%), 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch'
            }}
          >
            {/* Left Column: Multi-language Request Tabs */}
            <div
              style={{
                background: '#131314',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  background: '#18181b',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.4rem' }} role="tablist" aria-label="SDK Language Tabs">
                  {(
                    [
                      { id: 'curl', label: 'cURL' },
                      { id: 'typescript', label: 'TypeScript / Node.js' },
                      { id: 'python', label: 'Python' }
                    ] as { id: CodeLang; label: string }[]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeLang === tab.id}
                      onClick={() => setActiveLang(tab.id)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: activeLang === tab.id ? 'rgba(220, 0, 0, 0.2)' : 'transparent',
                        color: activeLang === tab.id ? '#ffb4a8' : '#8d8d91',
                        border: activeLang === tab.id ? '1px solid #dc0000' : '1px solid transparent',
                        cursor: 'pointer'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#a1a1aa',
                    fontSize: '0.72rem',
                    padding: '0.3rem 0.65rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  {copied ? <Check size={13} color="#dc0000" /> : <Copy size={13} />}
                  <span>{copied ? 'COPIED' : activeSnippet.title}</span>
                </button>
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: '1.5rem',
                  overflowX: 'auto',
                  fontSize: '0.82rem',
                  lineHeight: 1.65,
                  color: '#e5e2e3',
                  fontFamily: 'var(--font-technical)',
                  flex: 1
                }}
              >
                <code>{activeSnippet.code}</code>
              </pre>
            </div>

            {/* Right Column: Segregated JSON Response */}
            <div
              style={{
                background: '#131314',
                border: '1px solid rgba(220, 0, 0, 0.28)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1.25rem',
                  background: 'rgba(220, 0, 0, 0.08)',
                  borderBottom: '1px solid rgba(220, 0, 0, 0.22)'
                }}
              >
                <span
                  className="technical-text"
                  style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffb4a8', letterSpacing: '0.08em' }}
                >
                  {t.responseHeader}
                </span>
                <span
                  className="technical-text"
                  style={{ fontSize: '0.7rem', color: '#dc0000', fontWeight: 800 }}
                >
                  application/json
                </span>
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: '1.5rem',
                  overflowX: 'auto',
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  color: '#d4d4d8',
                  fontFamily: 'var(--font-technical)',
                  flex: 1
                }}
              >
                <code>{responsePayload}</code>
              </pre>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MÓDULOS PRINCIPALES DE LA API (GRID DE TARJETAS TÉCNICAS) */}
      <Section variant="primary">
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '0.85rem'
            }}
          >
            {t.modulesTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#9ca3af', lineHeight: 1.6 }}>
            {t.modulesSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.5rem'
          }}
        >
          {t.modules.map((mod) => (
            <div key={mod.id} style={{ height: '100%' }}>
              <SystemCardHover borderRadius={16}>
                <div
                  className="rounded-card"
                  style={{
                    padding: '2.25rem 2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#0e0e0f',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <span
                      className="technical-text"
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#dc0000',
                        letterSpacing: '0.1em',
                        padding: '0.2rem 0.55rem',
                        background: 'rgba(220, 0, 0, 0.12)'
                      }}
                    >
                      {mod.code}
                    </span>
                    <span
                      className="technical-text"
                      style={{ fontSize: '0.7rem', color: '#8d8d91' }}
                    >
                      {mod.endpoint}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.85rem', color: '#e5e2e3' }}>
                    {mod.title}
                  </h3>

                  <p style={{ fontSize: '0.925rem', color: '#9ca3af', lineHeight: 1.65, marginBottom: '1.75rem', flex: 1 }}>
                    {mod.desc}
                  </p>

                  <a
                    href={mod.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#ffb4a8',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>{mod.cta}</span>
                  </a>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. ARQUITECTURA Y ESTÁNDARES DE SEGURIDAD */}
      <Section variant="secondary">
        <div style={{ maxWidth: '780px', marginBottom: '3.25rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '0.85rem'
            }}
          >
            {t.secTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#9ca3af', lineHeight: 1.6 }}>
            {t.secSub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '1.5rem'
          }}
        >
          {t.secItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-card"
              style={{
                padding: '2.25rem 2rem',
                background: '#131314',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc0000' }}>
                {idx === 0 ? <Lock size={22} /> : idx === 1 ? <ShieldCheck size={22} /> : <Zap size={22} />}
                <span className="technical-text" style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  SECURITY INVARIANT 0{idx + 1}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#e5e2e3', margin: 0 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.65, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. ENLACES RÁPIDOS A LA DOCUMENTACIÓN (docs.printprice.pro) */}
      <Section variant="primary">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '0.75rem'
              }}
            >
              {t.quickLinksTitle}
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>
              {t.quickLinksSub}
            </p>
          </div>
          <a
            href="https://docs.printprice.pro/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.85rem 1.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
          >
            docs.printprice.pro ↗
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: '1.25rem'
          }}
        >
          {t.quickLinks.map((linkItem, i) => (
            <a
              key={i}
              href={linkItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-card"
              style={{
                padding: '1.85rem',
                background: '#0e0e0f',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                textDecoration: 'none',
                color: '#e5e2e3',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'border-color 0.2s ease'
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
                    className="technical-text"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#dc0000',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {linkItem.badge}
                  </span>
                  <ArrowUpRight size={16} color="#dc0000" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: '#e5e2e3' }}>
                  {linkItem.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>
                  {linkItem.desc}
                </p>
              </div>
              <span
                className="technical-text"
                style={{ fontSize: '0.75rem', color: '#ffb4a8', fontWeight: 700 }}
              >
                {linkItem.href.replace('https://docs.printprice.pro', '')} ➔
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* 6. CTA FINAL */}
      <ActionCTA
        slogan="SELF-SERVICE DEVELOPER HUB · INSTANT SANDBOX ACCESS • 1,000 FREE CALLS/MO"
        title={t.ctaFinalTitle}
        description={t.ctaFinalDesc}
        buttonLabel={t.ctaFinalBtn}
        buttonHref="https://control.printprice.pro/developers"
        secondaryButtonLabel={t.ctaReadDocs}
        secondaryButtonHref="https://docs.printprice.pro/docs/api/overview"
        trackingAction="developers_cta_access"
      />
    </div>
  );
}

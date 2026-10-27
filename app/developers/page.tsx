'use client';

import React from 'react';
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

export default function DeveloperPortal() {
  const { locale } = useLocale();

  const quickstartCode = `// Calculate book offers via standard HTTP fetch
const response = await fetch('https://api.printprice.pro/api/marketplace/offers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-trace-id': 'trace_demo_12345'
  },
  body: JSON.stringify({
    copies: 500,
    interior_pages: 192,
    format: '148x210',
    paper_inner: 'offset_white_90',
    paper_cover: 'couche_gloss_250',
    binding_method: 'perfect_bound',
    delivery_country: 'ES'
  })
});

const result = await response.json();
console.log(\`Best Offer: €\${result.offers[0].total_price} (\${result.offers[0].print_house})\`);`;

  const budgetCode = `// POST /api/marketplace/offers
const response = await fetch('https://api.printprice.pro/api/marketplace/offers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-trace-id': 'trace_client_001'
  },
  body: JSON.stringify({
    copies: 500,
    interior_pages: 192,
    format: '148x210',
    paper_inner: 'offset_white_90',
    paper_cover: 'couche_gloss_250',
    binding_method: 'perfect_bound',
    finishing_options: 'matt_lam_scratch'
  })
});

const result = await response.json();
console.log(result.offers);`;

  const preflightCode = `// POST /api/preflight/jobs (Multipart Upload up to 2GB)
const formData = new FormData();
formData.append('file', pdfFileBlob, 'manuscrito_interior.pdf');

const response = await fetch('https://api.printprice.pro/api/preflight/jobs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_PARTNER_TOKEN'
  },
  body: formData
});

const audit = await response.json();
console.log(\`Job enqueued: \${audit.jobId} [\${audit.status}]\`);`;

  const texts = {
    es: {
      heroLabel: 'HERRAMIENTAS PARA DESARROLLADORES',
      heroTitle: 'CONSTRUYE SOBRE LA API DE IMPRESIÓN',
      heroSlogan: ["PRESUPUESTA", "VALIDA", "PRODUCE vía API"],
      heroSub: 'Calcula costes, valida archivos PDF y enruta trabajos a taller directamente por API REST estándar y JSON.',
      heroCtaPrimary: 'Solicitar acceso API ➔',
      heroCtaSecondary: 'Ver documentación API ➔',
      quickstartBadge: 'NODO DE ACTIVACIÓN',
      quickstartTitle: 'Integración en minutos',
      quickstartDesc: 'Realiza tu primera llamada de cálculo o validación en minutos. Peticiones REST nativas y JSON estructurado sin dependencias privativas.',
      quickstartBtn: 'Comenzar ahora ➔',
      budgetTitle: 'Cálculo de costes algorítmico',
      budgetDesc: 'Obtén costes reales de imprenta al instante mediante Book Pricing Engine (BPE). Sincroniza tu e-commerce o ERP con nuestro motor de precios.',
      preflightTitle: 'Validación de archivos automatizada',
      preflightDesc: 'Ejecuta inspecciones preflight antes de enviar a taller. Normaliza geometrías, detecta resoluciones bajas y sangrados insuficientes.',
      useCasesBadge: 'CASOS DE USO',
      useCasesTitle: 'Qué puedes construir',
      cases: [
        { icon: 'web', title: 'Cotizadores Autónomos', desc: 'Construye portales self-service de presupuestos para tus clientes o equipos editoriales.' },
        { icon: 'activity', title: 'Agentes de Producción', desc: 'Permite a agentes automatizados gestionar y enrutar pedidos a imprentas adscritas.' },
        { icon: 'pipeline', title: 'Tuberías de Preflight', desc: 'Valida y normaliza miles de archivos PDF en background antes de la entrada a máquina.' },
        { icon: 'node', title: 'Enrutamiento a Taller', desc: 'Asigna pedidos a las imprentas más idóneas según maquinaria, papel y ubicación.' }
      ],
      ctaActionTitle: '¿Listo para integrar la API?',
      ctaActionDesc: 'Conecta tu software con los motores deterministas de PrintPrice OS. Contacta con ingeniería en api-support@printprice.pro.',
      ctaActionBtn: 'Solicitar acceso API a soporte ➔'
    },
    en: {
      heroLabel: 'DEVELOPER TOOLS',
      heroTitle: 'BUILD ON THE PRINT API',
      heroSlogan: ["ESTIMATE", "VALIDATE", "PRODUCE via API"],
      heroSub: 'Calculate costs, validate PDF files, and route production jobs directly via standard REST APIs and JSON.',
      heroCtaPrimary: 'Request API access ➔',
      heroCtaSecondary: 'View API docs ➔',
      quickstartBadge: 'ACTIVATION NODE',
      quickstartTitle: 'Start in minutes',
      quickstartDesc: 'Make your first pricing or validation call in minutes. Standard REST calls with zero proprietary SDK dependencies.',
      quickstartBtn: 'Get started ➔',
      budgetTitle: 'Deterministic Cost Estimation',
      budgetDesc: 'Get real print costs based on physical specifications instantly via BPE. Sync your storefront or ERP with our precision pricing engine.',
      preflightTitle: 'Validate files automatically',
      preflightDesc: 'Run automated preflight checks and detect issues prior to prepress intake. Enforce ISO compliance and normalize page boxes.',
      useCasesBadge: 'USE CASES',
      useCasesTitle: 'What you can build',
      cases: [
        { icon: 'web', title: 'Automated Quoting', desc: 'Build self-service estimate portals for your clients or internal publishing teams.' },
        { icon: 'activity', title: 'Production Agents', desc: 'Allow automated systems to calculate, trigger, and route jobs to partner print houses.' },
        { icon: 'pipeline', title: 'Validation Pipelines', desc: 'Audit and inspect thousands of files in background workers before physical manufacturing.' },
        { icon: 'node', title: 'Production Routing', desc: 'Orchestrate job delivery to qualified production nodes based on real press capabilities.' }
      ],
      ctaActionTitle: 'Ready to integrate the API?',
      ctaActionDesc: 'Connect your software to the deterministic engines of PrintPrice OS. Contact engineering at api-support@printprice.pro.',
      ctaActionBtn: 'Request API access via support ➔'
    },
    de: {
      heroLabel: 'ENTWICKLER-WERKZEUGE',
      heroTitle: 'BAUEN SIE AUF DER DRUCK-API AUF',
      heroSlogan: ["KALKULIEREN", "PRÜFEN", "PRODUZIEREN via API"],
      heroSub: 'Berechnen Sie Kosten, validieren Sie PDF-Dateien und leiten Sie Druckaufträge direkt via REST-API und JSON weiter.',
      heroCtaPrimary: 'API-Zugang anfragen ➔',
      heroCtaSecondary: 'API-Dokumentation ansehen ➔',
      quickstartBadge: 'AKTIVIERUNGS-KNOTEN',
      quickstartTitle: 'Start in wenigen Minuten',
      quickstartDesc: 'Führen Sie Ihren ersten Preiskalkulations- oder Preflight-Aufruf in Minuten aus. Standard-REST-Aufrufe ohne proprietäre Abhängigkeiten.',
      quickstartBtn: 'Jetzt starten ➔',
      budgetTitle: 'Deterministische Kostenkalkulation',
      budgetDesc: 'Erhalten Sie sofort echte Druckkosten basierend auf technischen Spezifikationen via BPE. Synchronisieren Sie Ihren Shop oder Ihr ERP.',
      preflightTitle: 'Automatische Dateivalidierung',
      preflightDesc: 'Führen Sie Preflight-Prüfungen vor der Weiterleitung an die Druckerei durch. Erkennen Sie Anschnitt- und Geometriefehler automatisch.',
      useCasesBadge: 'ANWENDUNGSFÄLLE',
      useCasesTitle: 'Was Sie entwickeln können',
      cases: [
        { icon: 'web', title: 'Automatisierte Angebote', desc: 'Bauen Sie Self-Service-Kalkulationsportale für Ihre Kunden oder Verlagsredaktionen.' },
        { icon: 'activity', title: 'Produktions-Agenten', desc: 'Automatisierte Systeme übergeben geprüfte Aufträge direkt an angeschlossene Druckereien.' },
        { icon: 'pipeline', title: 'Preflight-Pipelines', desc: 'Prüfen und normalisieren Sie tausende PDF-Dateien in Hintergrund-Worker-Prozessen.' },
        { icon: 'node', title: 'Fertigungs-Routing', desc: 'Verteilen Sie Aufträge an die am besten geeigneten Druckereien nach echten Maschinenprofilen.' }
      ],
      ctaActionTitle: 'Bereit für die API-Integration?',
      ctaActionDesc: 'Verbinden Sie Ihre Software mit den deterministischen Motoren von PrintPrice OS. Kontaktieren Sie uns unter api-support@printprice.pro.',
      ctaActionBtn: 'API-Zugang beim Support anfragen ➔'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="developer-portal">
      {/* Dev Hero */}
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroCtaPrimary, href: "/contact#api-access" }}
        secondaryAction={{ label: t.heroCtaSecondary, href: "https://docs.printprice.pro" }}
        variant="particles"
      />

      {/* Quickstart Section */}
      <Section variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: 'clamp(3rem, 8vw, 6rem)', alignItems: 'center' }}>
          <div>
            <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '1.25rem', letterSpacing: '0.15em', fontWeight: 900 }}>
              {t.quickstartBadge}
            </h4>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              {t.quickstartTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '50ch' }}>
              {t.quickstartDesc}
            </p>
            <a href="https://docs.printprice.pro/docs/api/quickstart" className="btn-primary" style={{ padding: '0.875rem 1.75rem' }}>
              {t.quickstartBtn}
            </a>
          </div>
          <CodeBlock code={quickstartCode} title="request-offers.mjs" language="javascript" />
        </div>
      </Section>

      {/* API Implementation Grid */}
      <Section variant="primary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: 'clamp(3rem, 6vw, 5rem)' }}>
          <div>
            <span className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'block', fontWeight: 900 }}>
              POST /api/marketplace/offers
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              {t.budgetTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '45ch' }}>
              {t.budgetDesc}
            </p>
            <CodeBlock code={budgetCode} title="create-estimate.js" language="javascript" />
          </div>
          <div>
            <span className="technical-text" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'block', fontWeight: 900 }}>
              POST /api/preflight/jobs
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              {t.preflightTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '45ch' }}>
              {t.preflightDesc}
            </p>
            <CodeBlock code={preflightCode} title="trigger-preflight.js" language="javascript" />
          </div>
        </div>
      </Section>

      {/* What You Can Build Section */}
      <Section variant="secondary">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: 900 }}>
            {t.useCasesBadge}
          </h4>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            {t.useCasesTitle}
          </h2>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {t.cases.map((caseItem, i) => (
            <div key={i} style={{ height: '100%' }}>
              <SystemCardHover borderRadius={0}>
                <div style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Icon name={caseItem.icon as any} size={22} style={{ color: 'var(--accent-primary)' }} />
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', opacity: 0.3 }}></div>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>{caseItem.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginTop: 'auto' }}>{caseItem.desc}</p>
                </div>
              </SystemCardHover>
            </div>
          ))}
        </div>
      </Section>

      {/* Ready to Build Section */}
      <ActionCTA 
        slogan="API & DESARROLLADORES PRINTPRICE OS"
        title={t.ctaActionTitle}
        description={t.ctaActionDesc}
        buttonLabel={t.ctaActionBtn}
        buttonHref="/contact#api-access"
        trackingAction="developers_cta_access"
      />
    </div>
  );
}

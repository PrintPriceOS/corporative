'use client';

import React, { useState, useEffect } from 'react';
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { trackEvent, events } from "@/lib/telemetry";
import Link from "next/link";
import { getBreadcrumbJsonLd } from "@/lib/seo";
import { useLocale } from "@/lib/i18n";

type UserType = "print_house" | "publisher" | "author" | "developer";

interface RouteConfig {
  id: UserType;
  title: string;
  category: string;
  description: string;
  cta: string;
  subtext: string;
  reason: string;
  icon: any;
  href: string;
}

export default function ContactPage() {
  const { locale } = useLocale();
  const [inferredType, setInferredType] = useState<UserType | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const texts = {
    es: {
      heroLabel: 'ROUTING OPERATIVO / ASISTENCIA TÉCNICA',
      heroTitle: 'COMIENZA CON EL FLUJO ADECUADO',
      heroSub: 'La forma más directa de calcular presupuestos, validar archivos, acceder a la red de talleres o integrar la API.',
      sloganLine: 'PRICE IT → FIX IT → PRINT IT',
      recommendedBadge: 'RECOMENDADO PARA TI',
      integrationSuffix: 'Acceso directo',
      altButton: 'Deseo ver todas las opciones ➔',
      stateConfident: 'ESTADO: ASIGNACIÓN ACTIVA',
      systemInferred: 'ENRUTAMIENTO DIRECTO',
      channelsTitle: 'Canales oficiales de contacto e ingeniería',
      channelsSubtitle: 'DESDE EL ARCHIVO DIGITAL HASTA LA PLANTA DE IMPRESIÓN',
      channels: [
        { label: 'Información General', val: 'info@printprice.pro' },
        { label: 'Red de Talleres & Partners', val: 'ecosystem@printprice.pro' },
        { label: 'Soporte Técnico API', val: 'api-support@printprice.pro' },
      ],
      routes: [
        {
          id: "publisher" as UserType,
          title: "Editoriales & Empresas",
          category: "GESTIÓN DE CATÁLOGO",
          description: "Calcula presupuestos escalonados, compara tiradas offset y digitales y lanza pedidos a producción.",
          cta: "Calcular presupuesto editorial ➔",
          subtext: "→ Inicia el calculador de costes",
          reason: "Según tu interés en herramientas de cotización masiva",
          icon: "publisher",
          href: "https://budget.printprice.pro"
        },
        {
          id: "developer" as UserType,
          title: "Desarrolladores & Software",
          category: "INTEGRACIÓN TÉCNICA",
          description: "Integra cálculo de costes, validación de PDFs y enrutamiento directamente en tu ERP o tienda online mediante API.",
          cta: "Solicitar acceso API ➔",
          subtext: "→ Escribe a api-support@printprice.pro",
          reason: "Según tu exploración de endpoints y esquemas",
          icon: "developer",
          href: "mailto:api-support@printprice.pro?subject=Solicitud%20de%20Acceso%20API%20PrintPrice%20OS"
        },
        {
          id: "print_house" as UserType,
          title: "Imprentas & Talleres",
          category: "CONEXIÓN DE MAQUINARIA",
          description: "Conecta tu parque de maquinaria a Control Plane, calibra pliegos y recibe trabajos preflight verificados.",
          cta: "Portal de talleres asociados ➔",
          subtext: "→ Abre el registro en Control Plane",
          reason: "Según tu consulta de gestión de producción",
          icon: "factory",
          href: "/contact/partner"
        },
        {
          id: "author" as UserType,
          title: "Autores & Particulares",
          category: "HERRAMIENTAS SIN MÍNIMOS",
          description: "Comprueba tu PDF en el navegador, verifica sangrados y calcula presupuestos de producción para tu libro.",
          cta: "Comprobar mi archivo PDF ➔",
          subtext: "→ Análisis con cuenta gratuita",
          reason: "Según tu consulta de comprobación rápida",
          icon: "author",
          href: "/products/preflight"
        }
      ]
    },
    en: {
      heroLabel: 'OPERATIONAL ROUTING / TECHNICAL ASSISTANCE',
      heroTitle: 'START WITH THE RIGHT WORKFLOW',
      heroSub: 'The most direct path to cost estimation, PDF validation, manufacturing network access, or API integration.',
      sloganLine: 'PRICE IT → FIX IT → PRINT IT',
      recommendedBadge: 'RECOMMENDED FOR YOU',
      integrationSuffix: 'Direct Access',
      altButton: 'View all options ➔',
      stateConfident: 'STATE: ACTIVE MATCH',
      systemInferred: 'DIRECT ROUTING',
      channelsTitle: 'Official contact and engineering channels',
      channelsSubtitle: 'FROM DIGITAL FILE TO PHYSICAL PRINT PRODUCTION',
      channels: [
        { label: 'General Information', val: 'info@printprice.pro' },
        { label: 'Printers & Partners', val: 'ecosystem@printprice.pro' },
        { label: 'API Technical Support', val: 'api-support@printprice.pro' },
      ],
      routes: [
        {
          id: "publisher" as UserType,
          title: "Publishers & B2B",
          category: "CATALOG WORKFLOW",
          description: "Calculate stepped quantity pricing, compare offset vs digital runs, and route approved production orders.",
          cta: "Calculate publisher budget ➔",
          subtext: "→ Launches pricing calculator",
          reason: "Based on interest in multi-title budgeting tools",
          icon: "publisher",
          href: "https://budget.printprice.pro"
        },
        {
          id: "developer" as UserType,
          title: "Developers & Software",
          category: "TECHNICAL INTEGRATION",
          description: "Integrate pricing engines, PDF validation, and order routing into your ERP or storefront via REST API.",
          cta: "Request API access ➔",
          subtext: "→ Write to api-support@printprice.pro",
          reason: "Based on your technical API exploration",
          icon: "developer",
          href: "mailto:api-support@printprice.pro?subject=PrintPrice%20OS%20API%20Access%20Request"
        },
        {
          id: "print_house" as UserType,
          title: "Print Houses & Plants",
          category: "EQUIPMENT ONBOARDING",
          description: "Onboard your presses and finishing units into Control Plane, configure sheet yields, and receive audited jobs.",
          cta: "Partner print house portal ➔",
          subtext: "→ Opens Control Plane registration",
          reason: "Based on manufacturing management exploration",
          icon: "factory",
          href: "/contact/partner"
        },
        {
          id: "author" as UserType,
          title: "Authors & Creators",
          category: "SELF-SERVICE TOOLS",
          description: "Check your PDF in the browser, verify bleeds and safety margins, and calculate print production estimates.",
          cta: "Check my PDF file ➔",
          subtext: "→ Free account preflight analysis",
          reason: "Based on lightweight tool exploration",
          icon: "author",
          href: "/products/preflight"
        }
      ]
    },
    de: {
      heroLabel: 'BETRIEBLICHES ROUTING / TECHNISCHE UNTERSTÜTZUNG',
      heroTitle: 'STARTEN SIE MIT DEM PASSENDEN WORKFLOW',
      heroSub: 'Der direkteste Weg zur Preiskalkulation, PDF-Prüfung, Druckerei-Netzwerk oder API-Integration.',
      sloganLine: 'PRICE IT → FIX IT → PRINT IT',
      recommendedBadge: 'FÜR SIE EMPFOHLEN',
      integrationSuffix: 'Direktzugang',
      altButton: 'Alle Optionen anzeigen ➔',
      stateConfident: 'STATUS: AKTIVE ZUORDNUNG',
      systemInferred: 'DIREKTROUTING',
      channelsTitle: 'Offizielle Kontakt- und Ingenieurskanäle',
      channelsSubtitle: 'VOM DIGITALEN DOKUMENT BIS ZUR DRUCKMASCHINE',
      channels: [
        { label: 'Allgemeine Anfragen', val: 'info@printprice.pro' },
        { label: 'Druckereien & Partnernetzwerk', val: 'ecosystem@printprice.pro' },
        { label: 'Technischer API-Support', val: 'api-support@printprice.pro' },
      ],
      routes: [
        {
          id: "publisher" as UserType,
          title: "Verlage & Geschäftskunden",
          category: "KATALOG-WORKFLOW",
          description: "Kalkulieren Sie Staffelpreise, vergleichen Sie Offset- und Digitaldruck und übergeben Sie Aufträge direkt an die Fertigung.",
          cta: "Verlagsbudget kalkulieren ➔",
          subtext: "→ Startet den Preiskalkulator",
          reason: "Basierend auf Ihrem Interesse an Verlags- und Mengenangeboten",
          icon: "publisher",
          href: "https://budget.printprice.pro"
        },
        {
          id: "developer" as UserType,
          title: "Entwickler & Software",
          category: "TECHNISCHE INTEGRATION",
          description: "Integrieren Sie Preiskalkulation, PDF-Preflight und Fertigungsrouting via REST-API direkt in Ihr MIS oder Webshop.",
          cta: "API-Zugang anfragen ➔",
          subtext: "→ E-Mail an api-support@printprice.pro",
          reason: "Basierend auf Ihrem Interesse an Entwickler-Tools",
          icon: "developer",
          href: "mailto:api-support@printprice.pro?subject=PrintPrice%20OS%20API%20Zugangsanfrage"
        },
        {
          id: "print_house" as UserType,
          title: "Druckereien & Fertigungsbetriebe",
          category: "MASCHINEN-ONBOARDING",
          description: "Konfigurieren Sie Druckmaschinen in Control Plane, hinterlegen Sie Bogenformate und erhalten Sie geprüfte PDF-Dateien.",
          cta: "Partner-Druckerei-Portal ➔",
          subtext: "→ Öffnet Registrierung im Control Plane",
          reason: "Basierend auf Ihrem Interesse an Produktionslösungen",
          icon: "factory",
          href: "/contact/partner"
        },
        {
          id: "author" as UserType,
          title: "Autoren & Selbstdrucker",
          category: "SELF-SERVICE-WERKZEUGE",
          description: "Prüfen Sie Ihre PDF-Datei im Browser, kontrollieren Sie Anschnitt und Randabstände und kalkulieren Sie Fertigungskosten.",
          cta: "PDF-Datei prüfen ➔",
          subtext: "→ Preflight-Prüfung mit kostenlosem Account",
          reason: "Basierend auf Ihrem Interesse an Schnellprüfung",
          icon: "author",
          href: "/products/preflight"
        }
      ]
    }
  };

  const t = texts[locale] || texts.es;

  useEffect(() => {
    setMounted(true);
    trackEvent(events.CONSULT_VIEW);

    const historyRaw = typeof window !== 'undefined' ? localStorage.getItem('ppos_telemetry_history') || '[]' : '[]';
    try {
      const history = JSON.parse(historyRaw);
      const paths = history.map((ev: any) => ev.path || '');
      
      let type: UserType | null = null;
      let conf = 0;
      
      if (paths.some((p: string) => p.includes('/developers') || p.includes('/docs'))) {
        type = "developer"; conf = 0.9;
      } else if (paths.some((p: string) => p.includes('/products/budget'))) {
        type = "publisher"; conf = 0.8;
      } else if (paths.some((p: string) => p.includes('/products/preflight') || p.includes('/for-authors'))) {
        type = "author"; conf = 0.7;
      } else if (paths.some((p: string) => p.includes('/solutions') || p.includes('/platform') || p.includes('/governance') || p.includes('/for-printhouses'))) {
        type = "print_house"; conf = 0.6;
      }

      setInferredType(type);
      setConfidence(conf);

      if (type) {
        trackEvent(events.INTENT_INFERRED, { inferred_user_type: type, confidence_score: conf });
      }
    } catch (e) {}
  }, []);

  const handleAction = (route: RouteConfig) => {
    trackEvent(events.INTENT_SELECTED, { 
      selected_user_type: route.id, 
      inferred_user_type: inferredType,
      is_recommended: route.id === inferredType 
    });
    
    setSelectedId(route.id);
    setIsTransitioning(true);
    
    setTimeout(() => {
      window.location.href = route.href;
    }, 400);
  };

  const recommendedRoute = inferredType ? t.routes.find(r => r.id === inferredType) : null;
  const showRecommendation = Boolean(mounted && inferredType && confidence > 0.6 && !showAll);
  const contactBreadcrumbs = getBreadcrumbJsonLd([
    { name: 'Inicio', path: '/' },
    { name: 'Contacto', path: '/contact' },
  ]);

  return (
    <div className={`contact-page ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbs) }}
      />
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        subheadline={t.heroSub}
        isHeadlineSlogan={false}
      />

      <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '4rem', opacity: 0.7 }}>
        <p className="technical-text" style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 800 }}>
          {t.sloganLine}
        </p>
      </div>

      <Section id="api-access" variant="secondary">
        {showRecommendation && recommendedRoute ? (
          <div 
            style={{ 
              maxWidth: '900px', 
              margin: '0 auto',
              opacity: isTransitioning && selectedId !== recommendedRoute.id ? 0 : 1,
              transform: isTransitioning && selectedId === recommendedRoute.id ? 'scale(1.02)' : 'none',
              transition: 'all 0.4s ease'
            }}
            data-monolith-action="intent_recommended_shown"
          >
            <div style={{ 
              background: 'var(--bg-primary)', 
              border: '1px solid var(--accent-primary)', 
              padding: 'clamp(2rem, 5vw, 4.5rem)',
              position: 'relative',
              boxShadow: '0 0 50px rgba(220, 0, 0, 0.08)'
            }}>
              <div style={{ 
                position: 'absolute', top: 0, left: '2rem', 
                background: 'var(--accent-primary)', color: '#fff', 
                padding: '0.35rem 1rem', fontSize: '0.7rem', 
                fontWeight: 900, transform: 'translateY(-50%)',
                letterSpacing: '0.15em'
              }}>
                {t.recommendedBadge}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 3rem)', alignItems: 'center' }}>
                  <div style={{ 
                    width: '4.5rem', height: '4.5rem', background: 'var(--bg-secondary)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: 'var(--accent-primary)', flexShrink: 0,
                    border: '1px solid var(--border-color)'
                  }}>
                    <Icon name={recommendedRoute.icon as any} size={36} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.35rem', letterSpacing: '-0.03em' }}>
                      {recommendedRoute.title} · {t.integrationSuffix}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }} className="technical-text">
                      {recommendedRoute.reason}
                    </p>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '65ch', lineHeight: 1.6 }}>
                    {recommendedRoute.description}
                  </p>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <Button 
                        size="lg" 
                        onClick={() => handleAction(recommendedRoute)}
                        data-monolith-action="intent_recommended_clicked"
                      >
                        {recommendedRoute.cta}
                      </Button>
                      <span className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6, marginLeft: '4px' }}>
                        {recommendedRoute.subtext}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => { setShowAll(true); trackEvent(events.INTENT_OVERRIDE_CLICKED); }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', letterSpacing: '0.05em', paddingBottom: '2px', borderBottom: '1px solid currentColor' }}
                      data-monolith-action="intent_override_clicked"
                    >
                      {t.altButton}
                    </button>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '3.5rem', opacity: 0.6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="technical-text" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{t.stateConfident}</div>
                <div className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.8 }}>{t.systemInferred}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem',
            opacity: 1,
            transition: 'opacity 0.4s ease'
          }}>
            {t.routes.map((route) => (
              <div 
                key={route.id} 
                className={`intent-card ${selectedId === route.id ? 'selected' : ''} ${selectedId && selectedId !== route.id ? 'dimmed' : ''}`}
                style={{
                  padding: '2.5rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ 
                    width: '3.5rem', height: '3.5rem', background: 'var(--bg-secondary)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    marginBottom: '2rem', color: 'var(--accent-primary)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <Icon name={route.icon as any} size={28} />
                  </div>
                  <h4 className="technical-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '0.12em' }}>{route.category}</h4>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>{route.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>{route.description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Button 
                    variant="secondary" 
                    style={{ width: '100%' }}
                    onClick={() => handleAction(route)}
                    data-monolith-action="intent_selected"
                  >
                    {route.cta}
                  </Button>
                  <span className="technical-text" style={{ fontSize: '0.7rem', opacity: 0.6, marginLeft: '2px' }}>{route.subtext}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section variant="primary">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>{t.channelsTitle}</h3>
          <p className="technical-text" style={{ fontSize: '0.75rem', opacity: 0.7, letterSpacing: '0.15em', color: 'var(--accent-primary)' }}>{t.channelsSubtitle}</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '3.5rem' }}>
          {t.channels.map((channel, i) => (
            <div key={i} style={{ background: 'var(--bg-secondary)', padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h4 className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>{channel.label}</h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 800 }}>{channel.val}</p>
            </div>
          ))}
        </div>
      </Section>

      <style jsx>{`
        .intent-card:hover {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 10px 40px rgba(220, 0, 0, 0.05);
        }
        .dimmed {
          opacity: 0.35;
          filter: grayscale(1);
        }
        .selected {
          border-color: var(--accent-primary) !important;
          transform: scale(1.02);
          z-index: 10;
        }
      `}</style>
    </div>
  );
}

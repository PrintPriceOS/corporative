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

  // Commercial Lead Qualification Form & ROI Calculator State
  const [leadProfile, setLeadProfile] = useState<'print_house' | 'publisher' | 'developer' | 'paper_supplier'>('print_house');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [estimatedVolume, setEstimatedVolume] = useState('15.000 € - 50.000 € / mes');
  const [message, setMessage] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSuccess, setLeadSuccess] = useState<{
    leadId: string;
    planLabel: string;
    assignedChannel: string;
    confirmationText: string;
  } | null>(null);
  const [roiMonthlyVolume, setRoiMonthlyVolume] = useState<number>(20000);

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
          category: "INTEGRACIÓN TÉCNICA AUTOSERVICIO",
          description: "Genera al instante tu Sandbox API Key (pp_test_*) para cálculo determinista de costes BPE, validación PDF 2 GB y cubicaje logístico 3D EPAL sin esperas ni correos manuales.",
          cta: "Obtener API Key Instantánea ➔",
          subtext: "Acceso Sandbox Instantáneo • 1.000 llamadas/mes gratis • Sin tarjeta de crédito",
          reason: "Según tu exploración de endpoints y esquemas OpenAPI 3.1",
          icon: "developer",
          href: "https://control.printprice.pro/developers"
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
          category: "SELF-SERVICE TECHNICAL INTEGRATION",
          description: "Provision your instant Sandbox API Key (pp_test_*) for 5-axis BPE pricing, 2 GB PDF/X-4 preflight, and 3D EPAL cubing directly in the Developer Hub.",
          cta: "Get Instant API Key ➔",
          subtext: "Instant Sandbox Access • 1,000 free monthly calls • No credit card required",
          reason: "Based on your technical API exploration",
          icon: "developer",
          href: "https://control.printprice.pro/developers"
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
          category: "SELF-SERVICE API-INTEGRATION",
          description: "Erstellen Sie sofort Ihren kostenlosen Sandbox-API-Key (pp_test_*) für BPE-Preiskalkulation, 2 GB PDF-Preflight und 3D-EPAL-Palettierung im Developer Hub.",
          cta: "Sofortigen API-Key erhalten ➔",
          subtext: "Sofortiger Sandbox-Zugang • 1.000 Gratis-Aufrufe/Monat • Keine Kreditkarte erforderlich",
          reason: "Basierend auf Ihrem Interesse an Entwickler-Tools",
          icon: "developer",
          href: "https://control.printprice.pro/developers"
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

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prof = params.get('profile');
      if (prof === 'print_house' || prof === 'publisher' || prof === 'developer' || prof === 'paper_supplier') {
        setLeadProfile(prof);
      }
    }

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
                      {recommendedRoute.id === 'developer' && (
                        <a
                          href="https://docs.printprice.pro/docs/api/overview"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="technical-text"
                          style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 800, textDecoration: 'none', marginLeft: '4px', marginTop: '2px' }}
                        >
                          Explore API Reference (OpenAPI 3.1) ↗
                        </a>
                      )}
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
                  {route.id === 'developer' && (
                    <a
                      href="https://docs.printprice.pro/docs/api/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="technical-text"
                      style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 800, textDecoration: 'none', marginLeft: '2px', marginTop: '2px' }}
                    >
                      Explore API Reference (OpenAPI 3.1) ↗
                    </a>
                  )}
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

      {/* EMBEDED COMMERCIAL LEAD QUALIFICATION & ROI CALCULATOR */}
      <Section id="lead-qualification" variant="secondary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* Left Column: Qualified Lead Form (<15 min SLA) */}
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '2.5rem' }}>
            <div className="technical-text" style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>
              {locale === 'de' ? 'DIREKTE QUALIFIZIERUNG · SLA < 15 MIN' : locale === 'en' ? 'FAST-TRACK QUALIFICATION · SLA < 15 MIN' : 'ALTA Y CUALIFICACIÓN DIRECTA · SLA < 15 MIN'}
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              {locale === 'de'
                ? 'Starten Sie Ihre kommerzielle Aktivierung'
                : locale === 'en'
                ? 'Request Commercial Onboarding & Licensing'
                : 'Solicita tu Activación Comercial o Licencia'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '1.5rem' }}>
              {locale === 'de'
                ? 'Wählen Sie Ihr Profil. Unser Spezialistenteam antwortet mit Ihren Zugangsdaten in unter 15 Minuten.'
                : locale === 'en'
                ? 'Select your profile below. Our specialist desk responds with your onboarding credentials in under 15 minutes.'
                : 'Selecciona tu perfil. Nuestro equipo especialista te responde con tus credenciales de activación en menos de 15 minutos.'}
            </p>

            {/* Profile Selector Pills with Official Pricing */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                {
                  id: 'print_house' as const,
                  label: locale === 'de' ? 'Druckerei / Werkstatt' : locale === 'en' ? 'Printhouse / Plant' : 'Imprenta / Taller',
                  tier: locale === 'de' ? '500 €/Jahr + 4% Mkt' : locale === 'en' ? '€500/yr + 4% Mkt' : '500 €/año + 4% Mkt',
                },
                {
                  id: 'publisher' as const,
                  label: locale === 'de' ? 'Verlag / Autor' : locale === 'en' ? 'Publisher / Author' : 'Editorial / Autor',
                  tier: locale === 'de' ? '0 €/Monat (Pay-per-Run)' : locale === 'en' ? '€0/mo (Pay-per-Run)' : '0 €/mes (Pago por uso)',
                },
                {
                  id: 'developer' as const,
                  label: locale === 'de' ? 'Entwickler API / MCP' : locale === 'en' ? 'Developer API / MCP' : 'Desarrollador API / MCP',
                  tier: locale === 'de' ? '45 €/Monat (API & MCP)' : locale === 'en' ? '€45/mo (API & MCP)' : '45 €/mes (API & MCP)',
                },
                {
                  id: 'paper_supplier' as const,
                  label: locale === 'de' ? 'Papierlieferant' : locale === 'en' ? 'Paper Supplier' : 'Proveedor de Papel',
                  tier: 'Paper Supplier Hub',
                },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setLeadProfile(p.id)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 0.9rem',
                    background: leadProfile === p.id ? 'rgba(220, 0, 0, 0.12)' : 'var(--bg-secondary)',
                    border: leadProfile === p.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>{p.label}</div>
                  <div className="technical-text" style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', fontWeight: 700, marginTop: '0.2rem' }}>
                    {p.tier}
                  </div>
                </button>
              ))}
            </div>

            {leadSuccess ? (
              <div style={{ padding: '1.75rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                <div className="technical-text" style={{ fontSize: '0.72rem', fontWeight: 900, color: '#10b981', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                  ✓ {leadSuccess.leadId} · SLA &lt; 15 MIN
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {leadSuccess.planLabel}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {leadSuccess.confirmationText.replace(/\*\*/g, '')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLeadSuccess(null);
                    setMessage('');
                  }}
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {locale === 'de' ? 'Neue Anfrage senden' : locale === 'en' ? 'Submit another inquiry' : 'Enviar otra consulta'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLeadError(null);
                  setLeadSubmitting(true);
                  try {
                    const res = await fetch('/api/leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        profile: leadProfile,
                        companyName,
                        contactName,
                        email,
                        country,
                        estimatedVolume,
                        message,
                        locale,
                      }),
                    });
                    const data = await res.json();
                    if (!res.ok || !data.ok) {
                      setLeadError(data.error || 'Error submitting request');
                    } else {
                      setLeadSuccess(data);
                    }
                  } catch {
                    setLeadError('Network error submitting inquiry');
                  } finally {
                    setLeadSubmitting(false);
                  }
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={locale === 'de' ? 'Unternehmen / Verlag / Druckerei *' : locale === 'en' ? 'Company / Printhouse / Publisher *' : 'Empresa / Imprenta / Editorial *'}
                    style={{ padding: '0.75rem 0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={locale === 'de' ? 'Ansprechpartner *' : locale === 'en' ? 'Contact Name *' : 'Nombre de contacto *'}
                    style={{ padding: '0.75rem 0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <input
                    type="email"
                    required
                    maxLength={140}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={locale === 'de' ? 'Geschäftliche E-Mail *' : locale === 'en' ? 'Business Email *' : 'Email corporativo *'}
                    style={{ padding: '0.75rem 0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={50}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={locale === 'de' ? 'Land (z. B. Deutschland, Spanien) *' : locale === 'en' ? 'Country (e.g. Spain, Germany, UK) *' : 'País (ej. España, Alemania) *'}
                    style={{ padding: '0.75rem 0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />
                </div>

                <textarea
                  rows={3}
                  maxLength={800}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    locale === 'de'
                      ? 'Maschinenpark (Offset B1/B2, Digital), monatliches Druckvolumen oder API/MCP-Anwendungsfall...'
                      : locale === 'en'
                      ? 'Press fleet (Offset B1/B2, Digital), monthly print volume, or API/MCP integration scope...'
                      : 'Parque de maquinaria (Offset B1/B2, Digital), tiradas habituales o alcance de integración API/MCP...'
                  }
                  style={{ padding: '0.75rem 0.9rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem', resize: 'vertical' }}
                />

                {leadError && (
                  <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>
                    {leadError}
                  </div>
                )}

                <Button type="submit" size="lg" disabled={leadSubmitting}>
                  {leadSubmitting
                    ? locale === 'de'
                      ? 'Wird gesendet...'
                      : locale === 'en'
                      ? 'Submitting...'
                      : 'Enviando solicitud...'
                    : locale === 'de'
                    ? 'Qualifizierte Anfrage senden (SLA < 15 Min) ➔'
                    : locale === 'en'
                    ? 'Submit Qualified Request (SLA < 15 min) ➔'
                    : 'Enviar Solicitud Cualificada (SLA < 15 min) ➔'}
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Interactive B2B ROI & Transparent Fee Calculator */}
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '2.5rem' }}>
            <div className="technical-text" style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>
              {locale === 'de' ? 'ROI- & GEBÜHRENRECHNER (TRANSPARENZ)' : locale === 'en' ? 'TRANSPARENT ROI & FEE CALCULATOR' : 'CALCULADORA DE ROI Y TRANSPARENCIA COMERCIAL'}
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              {locale === 'de'
                ? '500 €/Jahr + 4 % vs. Traditionelle Broker (15 %)'
                : locale === 'en'
                ? '€500/yr + 4% vs. Traditional Print Brokers (15%)'
                : '500 €/año + 4 % frente a Brokers y SaaS Legacy (15 %)'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '1.5rem' }}>
              {locale === 'de'
                ? 'Simulieren Sie Ihre jährliche Ersparnis im Vergleich zu klassischen Druckvermittlern (15 % Marge + 350 €/Monat ERP-Gebühr).'
                : locale === 'en'
                ? 'Simulate your annual net savings compared to traditional print brokers (15% commission + €350/mo legacy SaaS fee).'
                : 'Simula el ahorro neto anual de tu imprenta o editorial frente a intermediarios tradicionales (15 % comisión + 350 €/mes cuota SaaS).'}
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="technical-text" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                  {locale === 'de' ? 'MONATLICHES DRUCKVOLUMEN' : locale === 'en' ? 'MONTHLY TRANSACTED PRINT VOLUME' : 'VOLUMEN MENSUAL TRANSACCIONADO'}
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
                  {roiMonthlyVolume.toLocaleString('es-ES')} € / {locale === 'de' ? 'Monat' : locale === 'en' ? 'mo' : 'mes'}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={5000}
                value={roiMonthlyVolume}
                onChange={(e) => setRoiMonthlyVolume(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
            </div>

            {(() => {
              const annualVol = roiMonthlyVolume * 12;
              const pposAnnualCost = 500 + Math.round(annualVol * 0.04);
              const legacyAnnualCost = 350 * 12 + Math.round(annualVol * 0.15);
              const netAnnualSavings = legacyAnnualCost - pposAnnualCost;

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      <div className="technical-text" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 800 }}>
                        {locale === 'de' ? 'BROKER / LEGACY SAAS (15% + 350€/M)' : locale === 'en' ? 'TRADITIONAL BROKER (15% + €350/MO)' : 'BROKER / SAAS LEGACY (15% + 350€/M)'}
                      </div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                        {legacyAnnualCost.toLocaleString('es-ES')} € / {locale === 'de' ? 'Jahr' : locale === 'en' ? 'yr' : 'año'}
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', background: 'rgba(220, 0, 0, 0.08)', border: '1px solid var(--accent-primary)' }}>
                      <div className="technical-text" style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', fontWeight: 900 }}>
                        PRINTPRICE PRO (500€/AÑO + 4%)
                      </div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.4rem' }}>
                        {pposAnnualCost.toLocaleString('es-ES')} € / {locale === 'de' ? 'Jahr' : locale === 'en' ? 'yr' : 'año'}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '1.35rem', background: 'var(--bg-secondary)', borderLeft: '4px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="technical-text" style={{ fontSize: '0.72rem', fontWeight: 900, color: '#10b981' }}>
                        {locale === 'de' ? 'NETTO-ERSPARNIS PRO JAHR' : locale === 'en' ? 'NET ANNUAL MARGIN RETAINED' : 'AHORRO NETO ANUAL RETENIDO'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {locale === 'de'
                          ? `Bei ${annualVol.toLocaleString('es-ES')} € Jahresvolumen`
                          : locale === 'en'
                          ? `On €${annualVol.toLocaleString('es-ES')} annual print volume`
                          : `Sobre ${annualVol.toLocaleString('es-ES')} € de producción anual`}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#10b981' }}>
                      +{netAnnualSavings.toLocaleString('es-ES')} €
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
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

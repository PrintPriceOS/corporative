'use client';

import React from 'react';
import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Icon } from "@/components/ui/Icon";
import { SystemCardHover } from "@/components/ui/effects/SystemCardHover";
import { WorkflowRail } from "@/components/monolith/WorkflowRail";
import { useLocale } from "@/lib/i18n";

export default function MockupPage() {
  const { locale } = useLocale();

  const texts = {
    es: {
      heroLabel: 'HERRAMIENTA COMPLEMENTARIA / VISUALIZACIÓN 3D',
      heroTitle: 'MAQUETAS 3D DE LIBROS PARA COMERCIALIZACIÓN',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Genera previsualizaciones tridimensionales de tu libro a partir de la imagen de cubierta. Una función complementaria para promoción digital y presentaciones comerciales.',
      heroCtaPrimary: 'Abrir visor de maquetas ➔',
      heroCtaSecondary: 'Cómo funciona ↓',
      legalCaveat: 'Aviso técnico: Las maquetas 3D son representaciones comerciales orientativas generadas digitalmente. No constituyen prueba contractual de color certificado (contract proof), acabado físico del papel ni grosor exacto de lomo.',
      pipelineLabel: 'FLUJO DE RENDERIZADO',
      pipelineTitle: 'De la cubierta 2D a la perspectiva 3D',
      pipelineDesc: 'El generador de maquetas es una herramienta visual complementaria. Transforma cubiertas planas en imágenes de producto con perspectiva para catálogos y tiendas online.',
      pipelineFeatures: [
        'Previsualización con iluminación de estudio',
        'Simulación visual de lomo y encuadernación',
        'Formatos estándar para catálogos digitales',
        'Exportación rápida para promoción de obras'
      ],
      flowSteps: [
        { label: "SUBIR CUBIERTA", status: "COMPLETO" },
        { label: "ELEGIR FORMATO", status: "LISTO" },
        { label: "GENERAR VISTA 3D", status: "PENDING" },
      ],
      flowTitle: "FLUJO DE VISUALIZACIÓN",
      surfaceHeading1: 'Ajuste de Parámetros',
      surfaceDesc1: 'Configura el tipo visual de encuadernación (tapa dura o rústica) y una estimación de grosor de lomo según el número aproximado de páginas.',
      surfaceTags1: ['[ Tipo de Encuadernación ]', '[ Lomo Orientativo ]', '[ Textura Visual ]', '[ Simulación de Tapa ]'],
      surfaceHeading2: 'Generación Asistida',
      surfaceDesc2: 'Utiliza modelos de visión e IA generativa para proyectar sombras y reflejos comerciales de forma ágil sobre la cubierta aportada.',
      surfaceHeading3: 'Imágenes Comerciales',
      surfaceDesc3: 'Obtén vistas frontales y en perspectiva listas para compartir en campañas de micromecenazgo, redes sociales o fichas editoriales.',
      capabilitiesBadge: 'CAPACIDADES VISUALES',
      capabilitiesHeading: 'Visualización rápida para difusión',
      capabilities: [
        { icon: 'target', tag: 'ILUMINACIÓN', title: 'Perspectivas de Estudio', desc: 'Previsualizaciones con ambientación de iluminación para destacar el diseño de la portada.' },
        { icon: 'shield', tag: 'PRIVACIDAD', title: 'Tratamiento Seguro', desc: 'Tus archivos se procesan únicamente para generar la imagen solicitada, sin cesión de propiedad intelectual.' },
        { icon: 'specs', tag: 'FORMATOS', title: 'Proporciones Adaptables', desc: 'Simulación visual para libros de bolsillo, formatos estándar de novela y ediciones de gran tamaño.' },
      ],
      audiences: [
        { person: "Autores Independientes", icon: "author", benefit: "Muestra cómo lucirá tu libro en redes sociales y preventas antes de recibir la tirada impresa." },
        { person: "Sellos Editoriales", icon: "publisher", benefit: "Crea recursos gráficos para catálogos de novedades y presentaciones a distribuidoras." },
        { person: "Diseñadores de Portada", icon: "code", benefit: "Presenta propuestas de cubierta a autores en un entorno visual tridimensional." },
        { person: "Equipos de Comunicación", icon: "activity", benefit: "Genera material de prensa y piezas promocionales en segundos sin sesiones de fotografía." },
      ],
      ctaSlogan: 'FUNCIÓN COMPLEMENTARIA',
      ctaTitle: 'Visualiza la cubierta de tu libro en 3D',
      ctaDesc: 'Comprueba el aspecto exterior de tu diseño de forma rápida y sencilla.',
      ctaBtn: 'Ir al generador de maquetas ➔',
      footerNote: 'HERRAMIENTA COMPLEMENTARIA DE VISUALIZACIÓN DIGITAL / PRINTPRICE PRO'
    },
    en: {
      heroLabel: 'COMPLEMENTARY TOOL / 3D VISUALIZATION',
      heroTitle: '3D BOOK MOCKUPS FOR RETAIL & PROMOTION',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Generate three-dimensional visuals of your book from a single cover graphic. A complementary feature for online promotion, crowdfunding, and storefronts.',
      heroCtaPrimary: 'Open Mockup Workstation ➔',
      heroCtaSecondary: 'How it works ↓',
      legalCaveat: 'Technical Notice: 3D mockups are digital visual representations for marketing and preview purposes only. They do not constitute certified contract color proofs, physical substrate samples, or exact physical spine thickness guarantees.',
      pipelineLabel: 'RENDER PIPELINE',
      pipelineTitle: 'From 2D cover to 3D perspective',
      pipelineDesc: 'Mockup Engine is a complementary rendering tool. It converts flat book jacket designs into realistic product renders ready for web stores and promotional kits.',
      pipelineFeatures: [
        'Studio lighting preview environments',
        'Visual binding and spine bulk simulation',
        'Standard image ratios for digital platforms',
        'Instant export for title marketing'
      ],
      flowSteps: [
        { label: "UPLOAD COVER", status: "DONE" },
        { label: "CHOOSE FORMAT", status: "READY" },
        { label: "RENDER 3D", status: "PENDING" },
      ],
      flowTitle: "VISUALIZATION FLOW",
      surfaceHeading1: 'Visual Parameters',
      surfaceDesc1: 'Select approximate binding style (hardcover or softcover) and estimated spine bulk based on page count.',
      surfaceTags1: ['[ Binding Simulation ]', '[ Estimated Spine ]', '[ Surface Texture ]', '[ Hardcover Wrap ]'],
      surfaceHeading2: 'Assisted Generation',
      surfaceDesc2: 'Uses vision and AI model rendering to generate realistic studio shadows and commercial angles from your uploaded graphic.',
      surfaceHeading3: 'Marketing Assets',
      surfaceDesc3: 'Export multi-angle product shots ready for e-commerce listings, author newsletters, and crowdfunding campaigns.',
      capabilitiesBadge: 'VISUAL CAPABILITIES',
      capabilitiesHeading: 'Fast visualization for title promotion',
      capabilities: [
        { icon: 'target', tag: 'LIGHTING', title: 'Studio Environments', desc: 'Clean product visualization environments that bring cover artwork into realistic perspective.' },
        { icon: 'shield', tag: 'PRIVACY', title: 'Secure Processing', desc: 'Uploaded artwork is processed strictly to render your requested mockup, without copyright transfer.' },
        { icon: 'specs', tag: 'FORMATS', title: 'Proportional Formats', desc: 'Proportional preview support for pocket novels, trade paperbacks, and large art volumes.' },
      ],
      audiences: [
        { person: "Independent Authors", icon: "author", benefit: "Showcase your upcoming book on social media and pre-order pages before physical print copies arrive." },
        { person: "Book Publishers", icon: "publisher", benefit: "Quickly generate retail previews for digital distribution platforms and advance trade marketing." },
        { person: "Cover Designers", icon: "code", benefit: "Showcase book jacket drafts in realistic 3D perspective to authors and editors." },
        { person: "Marketing Teams", icon: "activity", benefit: "Create high-impact press visual assets in seconds without studio photography fees." },
      ],
      ctaSlogan: 'COMPLEMENTARY FEATURE',
      ctaTitle: 'Preview your book cover in 3D',
      ctaDesc: 'Check the visual appeal of your design quickly and easily.',
      ctaBtn: 'Launch Mockup Workstation ➔',
      footerNote: 'COMPLEMENTARY DIGITAL PREVIEW WORKSTATION / PRINTPRICE PRO'
    },
    de: {
      heroLabel: 'KOMPLEMENTÄRES WERKZEUG / 3D-VISUALISIERUNG',
      heroTitle: '3D-BUCH-MOCKUPS FÜR VERTRIEB & MARKETING',
      heroSlogan: ["PRICE IT.", "FIX IT.", "PRINT IT."],
      heroSub: 'Erstellen Sie dreidimensionale Produktansichten Ihres Buches aus einer Umschlagdatei. Eine komplementäre Funktion für Online-Marketing, Crowdfunding und Buchkataloge.',
      heroCtaPrimary: 'Mockup-Werkzeug öffnen ➔',
      heroCtaSecondary: 'Funktionsweise ansehen ↓',
      legalCaveat: 'Technischer Hinweis: 3D-Mockups sind unverbindliche digitale Vorschauen zu Marketingzwecken. Sie stellen keinen farbverbindlichen Kontrakt-Proof, keine Papiermuster und keine Garantie für die exakte physische Rückenbreite dar.',
      pipelineLabel: 'RENDERING-WORKFLOW',
      pipelineTitle: 'Vom flachen Umschlag zur 3D-Ansicht',
      pipelineDesc: 'Die Mockup-Engine ist ein komplementäres Visualisierungswerkzeug. Sie verwandelt flache Umschlaggrafiken in plastische Produktbilder für Webshops und Vorankündigungen.',
      pipelineFeatures: [
        'Vorschau mit Studiobeleuchtung',
        'Optische Simulation von Bindung und Rücken',
        'Standardformate für digitale Buchshops',
        'Schneller Export für Buchwerbung'
      ],
      flowSteps: [
        { label: "COVER HOCHLADEN", status: "ERLEDIGT" },
        { label: "FORMAT WÄHLEN", status: "BEREIT" },
        { label: "3D-ANSICHT RENDERN", status: "PENDING" },
      ],
      flowTitle: "VISUALISIERUNGS-ABLAUF",
      surfaceHeading1: 'Geometrische Parameter',
      surfaceDesc1: 'Wählen Sie Bindeart (Hardcover oder Softcover) und eine geschätzte Rückenbreite basierend auf der Seitenzahl.',
      surfaceTags1: ['[ Bindungssimulation ]', '[ Geschätzter Rücken ]', '[ Textursimulation ]', '[ Hardcover-Umschlag ]'],
      surfaceHeading2: 'KI-unterstützte Ansichten',
      surfaceDesc2: 'Generiert mithilfe moderner Bildmodelle fotorealistische Schatten und Perspektiven für Werbematerialien.',
      surfaceHeading3: 'Vertriebsmaterialien',
      surfaceDesc3: 'Erstellen Sie Mehrfachansichten für Vorbestellseiten, Buchmessen-Vorschauen und Social-Media-Kampagnen.',
      capabilitiesBadge: 'VISUELLE FUNKTIONEN',
      capabilitiesHeading: 'Schnelle Visualisierung für Buchankündigungen',
      capabilities: [
        { icon: 'target', tag: 'BELEUCHTUNG', title: 'Studioperspektiven', desc: 'Saubere Produktbeleuchtung, die das Coverdesign in realistischen Blickwinkeln hervorhebt.' },
        { icon: 'shield', tag: 'DATENSCHUTZ', title: 'Sichere Verarbeitung', desc: 'Dateien werden ausschließlich zur Erzeugung des angeforderten Mockups verarbeitet; keine Rechteübertragung.' },
        { icon: 'specs', tag: 'FORMATE', title: 'Proportionale Formate', desc: 'Visuelle Simulation für Taschenbücher, Standard-Belletristik und großformatige Bildbände.' },
      ],
      audiences: [
        { person: "Selfpublisher & Autoren", icon: "author", benefit: "Präsentieren Sie Ihr Werk vor Druckfreigabe auf Social Media und Crowdfunding-Plattformen." },
        { person: "Verlage", icon: "publisher", benefit: "Erstellen Sie Vertriebsvorschauen für Auslieferungen und Buchhandelskataloge in Sekunden." },
        { person: "Buchgestalter", icon: "code", benefit: "Präsentieren Sie Coverentwürfe dreidimensional und ansprechend vor Autoren und Lektoren." },
        { person: "Marketing-Teams", icon: "activity", benefit: "Erzeugen Sie Bildmaterial für Pressemitteilungen ohne aufwändige Studiofotografie." },
      ],
      ctaSlogan: 'KOMPLEMENTÄRE FUNKTION',
      ctaTitle: 'Sehen Sie Ihr Buchcover in 3D',
      ctaDesc: 'Prüfen Sie den visuellen Gesamteindruck Ihres Designs schnell und unkompliziert.',
      ctaBtn: 'Zum Mockup-Generator ➔',
      footerNote: 'KOMPLEMENTÄRES DIGITALES VORSCHAU-WERKZEUG / PRINTPRICE PRO'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <div className="product-page">
      {/* Product Hero */}
      <HeroPlatform 
        label={t.heroLabel}
        title={<><span style={{ color: 'var(--accent-primary)' }}>{t.heroTitle}</span></>}
        slogan={t.heroSlogan}
        isHeadlineSlogan={false}
        subheadline={t.heroSub}
        primaryAction={{ label: t.heroCtaPrimary, href: "https://mockup.printprice.pro/" }}
        secondaryAction={{ label: t.heroCtaSecondary, href: "#workflow" }}
        variant="particles"
        rightContent={
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '16/9', 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: 0.8
              }}
            >
              <source src="/videos/mockup_generation.webm" type="video/webm" />
            </video>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              width: '100%', 
              height: '40%', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              zIndex: 1
            }}></div>
          </div>
        }
      />

      {/* Legal & Technical Caveat Notice Banner */}
      <div style={{ background: 'rgba(220, 0, 0, 0.05)', borderBottom: '1px solid var(--accent-border)', padding: '1.25rem 2rem', textAlign: 'center' }}>
        <p style={{ maxWidth: '900px', margin: '0 auto', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--accent-primary)' }}>ℹ️ </strong>
          {t.legalCaveat}
        </p>
      </div>

      {/* Render Pipeline Section */}
      <Section variant="primary" id="workflow">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '1.25rem', fontWeight: 900 }}>
              {t.pipelineLabel}
            </h4>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', letterSpacing: '-0.04em', marginBottom: '1.5rem', lineHeight: 1.15 }}>
              {t.pipelineTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '48ch' }}>
              {t.pipelineDesc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {t.pipelineFeatures.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Icon name="camera" size={18} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <WorkflowRail 
            title={t.flowTitle}
            steps={t.flowSteps}
          />
        </div>
      </Section>

      {/* Control Surface */}
      <Section variant="secondary" id="engine">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {/* Physical Parameters */}
          <div>
            <div style={{ height: '3px', width: '40px', background: 'var(--accent-primary)', marginBottom: '1.5rem' }}></div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>{t.surfaceHeading1}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {t.surfaceDesc1}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {t.surfaceTags1.map((rule, idx) => (
                <li key={idx} className="technical-text" style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 800 }}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* AI Visualization Engine */}
          <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>{t.surfaceHeading2}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {t.surfaceDesc2}
            </p>
            <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="technical-text" style={{ fontSize: '0.65rem' }}>PORTADA_2D</span>
                <span className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--accent-primary)' }}>➔ PERSPECTIVA_3D</span>
              </div>
              <div style={{ height: '4px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '85%', background: 'var(--accent-primary)' }}></div>
              </div>
            </div>
          </div>

          {/* Output Management */}
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>{t.surfaceHeading3}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {t.surfaceDesc3}
            </p>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>PNG / WebP</div>
                <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {locale === 'es' ? 'FORMATO DIGITAL' : locale === 'de' ? 'DIGITALES FORMAT' : 'DIGITAL FORMAT'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>INSTANT</div>
                <div className="technical-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {locale === 'es' ? 'PREVISUALIZACIÓN' : locale === 'de' ? 'VORSCHAU' : 'PREVIEW'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Target Segments */}
      <Section variant="primary">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h4 className="technical-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: 900 }}>
            {t.capabilitiesBadge}
          </h4>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            {t.capabilitiesHeading}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {t.audiences.map((p, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'inline-flex', padding: '1.25rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <Icon name={p.icon as any} size={28} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>{p.person}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.benefit}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <ActionCTA 
        slogan={t.ctaSlogan}
        title={t.ctaTitle}
        description={t.ctaDesc}
        buttonLabel={t.ctaBtn}
        buttonHref="https://mockup.printprice.pro/"
        trackingAction="mockup_cta_final_v1"
        footerNote={t.footerNote}
      />
    </div>
  );
}

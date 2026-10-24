'use client';

import React from 'react';
import Link from 'next/link';
import { HeroPlatform } from '@/components/monolith/HeroPlatform';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { useLocale } from '@/lib/i18n';
import { Factory, ShieldCheck, CircleDollarSign, Zap } from 'lucide-react';

export default function PrintProductPage() {
  const { locale } = useLocale();

  const texts = {
    es: {
      label: 'PRINT IT / MARKETPLACE DE FABRICACIÓN GRÁFICA',
      title: 'Encuentra la imprenta adecuada y encarga tu producción.',
      subheadline: 'Enrutamiento algorítmico hacia talleres de la red según maquinaria real, pliegos técnicos y especificaciones verificadas.',
      ctaPrimary: 'Configurar proyecto ➔',
      ctaSecondary: 'Cómo funciona ➔',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],

      howItWorksTitle: 'El flujo de contratación en el Marketplace',
      howItWorksSubtitle: 'Modelo directo y transparente: cada pedido se asigna al taller con la máquina y pliego idóneo para tu libro.',
      steps: [
        {
          step: '01',
          title: 'Configura en Budget (Price it)',
          desc: 'Define formato, número de páginas, tirada, papeles y encuadernación. El motor calcula las tarifas exactas de producción.'
        },
        {
          step: '02',
          title: 'Audita tu archivo (Fix it)',
          desc: 'Valida sangrados, tipografías y perfiles de color en Preflight. El archivo queda sellado con su ficha técnica para producción.'
        },
        {
          step: '03',
          title: 'Asignación algorítmica (Print it)',
          desc: 'El motor Matchmaker evalúa las plantas de impresión asociadas y selecciona el taller más eficiente según el pliego y tipo de máquina.'
        },
        {
          step: '04',
          title: 'Fabricación y seguimiento',
          desc: 'La imprenta recibe el arte final verificado y la ficha técnica exacta. Producción predecible y entrega en tus plazos acordados.'
        }
      ],

      pillarsTitle: 'Por qué encargar producción con PrintPrice OS',
      pillars: [
        {
          title: 'Red de Talleres Industriales',
          desc: 'Trabajamos con imprentas industriales y especializadas en artes gráficas con maquinaria offset y digital auditada.',
          icon: Factory
        },
        {
          title: 'Registro Técnico de Archivo y Pedido',
          desc: 'Cada encargo documenta las especificaciones acordadas en el pedido y el archivo validado en preflight para el taller.',
          icon: ShieldCheck
        },
        {
          title: 'Costes Transparentes',
          desc: 'Precios desglosados entre fabricación gráfica y papel. Sin recargos añadidos ni tarifas ocultas.',
          icon: CircleDollarSign
        },
        {
          title: 'Cero Incidencias de Preimpresión',
          desc: 'Al llegar a máquina, el archivo ya ha sido verificado contra las tolerancias mecánicas reales de la máquina asignada.',
          icon: Zap
        }
      ],

      noticeTitle: 'Acceso para Compradores vs. Control Plane',
      noticeText: 'Si eres un autor, particular o editorial que desea encargar producción impresa, tu punto de entrada es el configurador de proyectos en Budget. El espacio Control Plane está reservado exclusivamente para la operativa interna de imprentas asociadas y proveedores de papel.',

      faqTitle: 'Preguntas Frecuentes sobre el Marketplace',
      faqs: [
        {
          q: '¿Cómo elijo la imprenta que producirá mi libro?',
          a: 'Al cotizar en Budget, el motor Matchmaker compara tu proyecto contra los parques de maquinaria de las imprentas de la red (tamaños de pliego, horas disponibles, costes de encuadernación) y selecciona la opción más competitiva en calidad y plazo.'
        },
        {
          q: '¿Qué garantía tengo de que el archivo no sufrirá alteraciones en el taller?',
          a: 'El flujo genera una orden técnica verificada. La imprenta únicamente recibe y procesa el documento exactamente en la versión auditada que aprobaste en el paso de Preflight.'
        },
        {
          q: '¿Puedo encargar desde un único ejemplar o solo grandes tiradas?',
          a: 'La red cuenta tanto con talleres digitales para tiradas cortas y bajo demanda (desde 1 ejemplar) como con grandes plantas offset para tiradas de miles de libros.'
        }
      ]
    },
    en: {
      label: 'PRINT IT / PRODUCTION MANUFACTURING MARKETPLACE',
      title: 'Find the right printhouse and commission your production.',
      subheadline: 'Algorithmic routing to certified industrial printing plants based on real machine profiles, sheet sizes, and audited specifications.',
      ctaPrimary: 'Configure project ➔',
      ctaSecondary: 'How it works ➔',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],

      howItWorksTitle: 'How the Marketplace works',
      howItWorksSubtitle: 'Direct, transparent model: every job is routed to the exact plant with the optimal machine setup for your book.',
      steps: [
        {
          step: '01',
          title: 'Configure in Budget (Price it)',
          desc: 'Select trim size, page count, run length, paper stocks, and binding. The server pricing engine calculates exact production costs.'
        },
        {
          step: '02',
          title: 'Audit your PDF (Fix it)',
          desc: 'Verify bleeds, fonts, and color spaces in Preflight. The file is sealed with its verified job ticket for production.'
        },
        {
          step: '03',
          title: 'Algorithmic routing (Print it)',
          desc: 'The Matchmaker engine evaluates vetted production partners and assigns the job to the most efficient press based on sheet geometry.'
        },
        {
          step: '04',
          title: 'Manufacturing & delivery',
          desc: 'The printhouse receives the verified PDF and exact technical specs. Predictable production delivered on schedule.'
        }
      ],

      pillarsTitle: 'Why commission production through PrintPrice OS',
      pillars: [
        {
          title: 'Vetted Partner Network',
          desc: 'We work with audited industrial printing plants equipped with state-of-the-art offset and digital presses.',
          icon: Factory
        },
        {
          title: 'Technical File and Order Log',
          desc: 'Every work order records the agreed order specifications and validated preflight file for the plant.',
          icon: ShieldCheck
        },
        {
          title: 'Transparent Cost Resolution',
          desc: 'De-coupled material and press costs with clear itemization and no hidden fees.',
          icon: CircleDollarSign
        },
        {
          title: 'Zero Prepress Friction',
          desc: 'Files arrive at the press pre-validated against machine physical constraints and gripper tolerances.',
          icon: Zap
        }
      ],

      noticeTitle: 'Buyer Portal vs. Printhouse Control Plane',
      noticeText: 'If you are an author, individual creator, or publishing house commissioning print production, your gateway is the project configurator on Budget. Control Plane is exclusively the operational dashboard for onboarded printers and paper suppliers.',

      faqTitle: 'Frequently Asked Questions about the Marketplace',
      faqs: [
        {
          q: 'How is the printhouse selected for my order?',
          a: 'When configuring on Budget, the Matchmaker engine compares your book specifications against real machinery profiles (sheet formats, makeready, binding capabilities) to select the optimal plant for cost, quality, and delivery.'
        },
        {
          q: 'How do I know the file will not be altered on press?',
          a: 'The workflow attaches an audited technical job order. The printhouse can only pull and image the exact validated file approved during the Preflight step.'
        },
        {
          q: 'Can I order short runs or only large commercial print runs?',
          a: 'The network supports short digital runs starting from a single proof copy up to high-volume offset production runs of tens of thousands.'
        }
      ]
    },
    de: {
      label: 'PRINT IT / DRUCKAUFTRAGS-MARKETPLACE',
      title: 'Finden Sie die passende Druckerei und starten Sie die Produktion.',
      subheadline: 'Algorithmische Vermittlung an zertifizierte Druckbetriebe basierend auf realen Maschinenprofilen, Bogenformaten und verifizierten Vorgaben.',
      ctaPrimary: 'Projekt konfigurieren ➔',
      ctaSecondary: 'So funktioniert\'s ➔',
      slogan: ['PRICE IT.', 'FIX IT.', 'PRINT IT.'],

      howItWorksTitle: 'Auftragsabwicklung im Marketplace',
      howItWorksSubtitle: 'Direktes, transparentes Modell: Jeder Auftrag wird der Druckerei mit den optimalen Maschinen zugewiesen.',
      steps: [
        {
          step: '01',
          title: 'In Budget kalkulieren (Price it)',
          desc: 'Wählen Sie Format, Seitenzahl, Auflage, Papier und Bindung. Der Server berechnet die exakten Fertigungskosten.'
        },
        {
          step: '02',
          title: 'Druckdaten prüfen (Fix it)',
          desc: 'Prüfen Sie Beschnitt, Schriften und Farbräume im Preflight. Die Datei wird mit den geprüften Spezifikationen versiegelt.'
        },
        {
          step: '03',
          title: 'Algorithmische Zuweisung (Print it)',
          desc: 'Der Matchmaker wählt anhand der Bogengeometrie und Rüstzeiten den am besten geeigneten Partnerbetrieb aus.'
        },
        {
          step: '04',
          title: 'Produktion & termingerechte Lieferung',
          desc: 'Die Druckerei erhält geprüfte Daten und exakte Vorgaben. Berechenbare Fertigung und verlässliche Lieferung.'
        }
      ],

      pillarsTitle: 'Vorteile der Fertigung über PrintPrice OS',
      pillars: [
        {
          title: 'Zertifiziertes Partnernetzwerk',
          desc: 'Ausschließliche Zusammenarbeit mit auditierten Offset- und Digitaldruckereien mit modernstem Maschinenpark.',
          icon: Factory
        },
        {
          title: 'Technisches Datei- und Auftragsprotokoll',
          desc: 'Jeder Auftrag dokumentiert die im Auftrag vereinbarten Spezifikationen und die im Preflight validierte Datei für den Betrieb.',
          icon: ShieldCheck
        },
        {
          title: 'Transparente Kostenaufstellung',
          desc: 'Strikte Trennung von Fertigungs- und Papierkosten ohne versteckte Aufschläge.',
          icon: CircleDollarSign
        },
        {
          title: 'Keine Vorstufenüberraschungen',
          desc: 'Die Druckdatei erreicht die Belichtung abgestimmt auf die realen Maschinentoleranzen und Greiferränder.',
          icon: Zap
        }
      ],

      noticeTitle: 'Auftraggeber-Zugang vs. Control Plane',
      noticeText: 'Für Autoren, Privatpersonen und Verlage erfolgt die Auftragserteilung direkt über den Kalkulator in Budget. Das Control Plane ist die interne Arbeitsumgebung für Druckereien und Papierlieferanten.',

      faqTitle: 'Häufig gestellte Fragen zum Marketplace',
      faqs: [
        {
          q: 'Wie wird die Druckerei für mein Buch ausgewählt?',
          a: 'Beim Kalkulieren in Budget gleicht der Matchmaker-Algorithmus Ihr Projekt mit den Maschinenprofilen der Partnerbetriebe ab und wählt die wirtschaftlichste Option.'
        },
        {
          q: 'Wie wird sichergestellt, dass die Datei unverändert bleibt?',
          a: 'Durch die verifizierte technische Arbeitsorder wird sichergestellt, dass die Druckerei ausschließlich die im Preflight freigegebene Datei belichtet.'
        },
        {
          q: 'Sind auch Kleinauflagen ab einem Einzelexemplar möglich?',
          a: 'Ja. Das Netzwerk umfasst sowohl Digitaldruckbetriebe für Einzelexemplare als auch industrielle Offsetdruckereien für Großauflagen.'
        }
      ]
    }
  };

  const t = texts[locale as keyof typeof texts] || texts.es;

  return (
    <div className="print-product-page">
      {/* Hero Platform */}
      <HeroPlatform
        label={t.label}
        title={t.title}
        slogan={t.slogan}
        isHeadlineSlogan={false}
        subheadline={t.subheadline}
        primaryAction={{
          label: t.ctaPrimary,
          href: 'https://budget.printprice.pro/'
        }}
        secondaryAction={{
          label: t.ctaSecondary,
          href: '#how-it-works'
        }}
        variant="particles"
      />

      {/* Slogan */}
      <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '3.5rem', opacity: 0.6 }}>
        <p className="technical-text" style={{ fontSize: '0.75rem', letterSpacing: '0.25em' }}>
          PRICE IT → FIX IT → PRINT IT
        </p>
      </div>

      {/* Clear Guidance Banner: Where buyers order vs Control Plane */}
      <Section variant="secondary">
        <Container>
          <div
            className="rounded-card"
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              padding: 'clamp(1.75rem, 4vw, 2.5rem)',
              maxWidth: '900px',
              margin: '0 auto',
              borderLeft: '4px solid var(--accent-primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>ℹ️</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                {t.noticeTitle}
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              {t.noticeText}
            </p>
          </div>
        </Container>
      </Section>

      {/* How it Works: 4 Steps */}
      <Section variant="primary" id="how-it-works">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '1rem' }}>
              MATCHMAKER ENGINE
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              {t.howItWorksTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {t.howItWorksSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '1.5rem'
            }}
          >
            {t.steps.map((st, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '2rem',
                  border: '1px solid var(--border-color)'
                }}
              >
                <span
                  className="technical-text"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'var(--accent-primary)',
                    opacity: 0.35,
                    display: 'block',
                    marginBottom: '1rem'
                  }}
                >
                  {st.step}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {st.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pillars of Print It */}
      <Section variant="secondary">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
              {t.pillarsTitle}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '1.5rem'
            }}
          >
            {t.pillars.map((pil, i) => (
              <div
                key={i}
                className="rounded-card"
                style={{
                  background: 'var(--bg-primary)',
                  padding: '2rem',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <pil.icon size={22} strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {pil.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section variant="primary">
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
                {t.faqTitle}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {t.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-card"
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.75rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final Action CTA */}
      <Section variant="secondary" style={{ borderTop: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', marginBottom: '1.25rem' }}>
              {t.title}
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {t.subheadline}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '1rem 2.5rem', fontSize: '1.05rem', fontWeight: 700 }}
              >
                {t.ctaPrimary}
              </a>
              <Link
                href="/products/preflight"
                className="btn-secondary"
                style={{ padding: '1rem 2rem', fontSize: '1rem' }}
              >
                Comprobar archivos en Preflight
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

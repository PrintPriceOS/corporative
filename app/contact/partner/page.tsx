'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { useLocale } from '@/lib/i18n';

export default function PartnerContactPage() {
  const { locale } = useLocale();

  const texts = {
    es: {
      badge: 'Red de Imprentas y Talleres Asociados',
      heroTitle: 'Conecta tu taller a la red de producción de PrintPrice OS.',
      heroSub: 'Recibe proyectos de libros con artes finales preflight auditadas técnicamente y tarifas calculadas según tus máquinas, pliegos y capacidades reales.',
      ctaRegister: 'Registrar mi imprenta en Control Plane ➔',
      ctaLearn: 'Ver capacidades para imprentas',
      trustCheck: '✓ Registro oficial en Control Plane · Aislamiento de datos de taller · Sin duplicidad de formularios',
      onboardingTitle: 'El onboarding canónico de imprenta se realiza en Control Plane',
      onboardingSub: 'Para garantizar la seguridad de tus datos de producción y calibrar tus máquinas con rigor, todo el proceso de configuración se gestiona en nuestra consola técnica oficial.',
      steps: [
        {
          title: '1. Alta y Validación de Taller',
          desc: 'Crea tu perfil con correo profesional y datos fiscales en Control Plane. Tus datos comerciales están protegidos por aislamiento multi-tenant estricto.'
        },
        {
          title: '2. Perfilado de Parque de Máquinas',
          desc: 'Introduce tus especificaciones de pliego (mín/máx), costes horarios de preparación (makeready), velocidades de tirada y matrices de encuadernación.'
        },
        {
          title: '3. Conexión con Proveedores de Papel',
          desc: 'Vincula las referencias del catálogo maestro de sustratos de papel con tarifas actualizadas y separación clara de costes de transporte.'
        },
        {
          title: '4. Recepción de Trabajos Verificados',
          desc: 'Los archivos PDF son auditados por el motor de preflight antes de llegar a taller, reduciendo incidencias y paradas innecesarias en máquina.'
        }
      ],
      calloutTitle: '¿Tienes dudas técnicas o necesitas una llamada con el equipo?',
      calloutSub: 'Contacta con nuestros especialistas en integración de artes gráficas.',
      calloutRegister: 'Ir al registro de imprenta ➔',
      calloutContact: 'Contactar con el equipo'
    },
    en: {
      badge: 'Network of Partner Print Houses & Plants',
      heroTitle: 'Connect your facility to the PrintPrice OS production network.',
      heroSub: 'Receive book manufacturing orders with forensically audited preflight files and pricing calculated against your actual presses, sheet sizes, and capabilities.',
      ctaRegister: 'Register my print house in Control Plane ➔',
      ctaLearn: 'Explore print house capabilities',
      trustCheck: '✓ Official Control Plane onboarding · Strict shop tenant isolation · No duplicate forms',
      onboardingTitle: 'Canonical print house onboarding is managed in Control Plane',
      onboardingSub: 'To secure your proprietary manufacturing data and calibrate your machinery accurately, all onboarding steps are handled directly in our official technical console.',
      steps: [
        {
          title: '1. Plant Registration & Verification',
          desc: 'Create your company profile with corporate email and tax ID in Control Plane. Your commercial data is strictly isolated within your tenant.'
        },
        {
          title: '2. Machinery Profiling',
          desc: 'Configure press sheet sizes (min/max), makeready hourly rates, run speeds, and bindery cost matrices (PUR, thread sewn, hardcover).'
        },
        {
          title: '3. Paper Supplier Catalog Linking',
          desc: 'Link substrates from the federated master paper catalog with real-time tier pricing and transparent freight disaggregation.'
        },
        {
          title: '4. Intake of Audited Print Files',
          desc: 'PDF files undergo automated deterministic preflight checks prior to plant arrival, eliminating costly press stops and manual intake review.'
        }
      ],
      calloutTitle: 'Have technical questions or need an onboarding call?',
      calloutSub: 'Get in touch with our graphic engineering and integration specialists.',
      calloutRegister: 'Go to print house registration ➔',
      calloutContact: 'Contact the team'
    },
    de: {
      badge: 'Netzwerk assoziierter Druckereien & Betriebe',
      heroTitle: 'Verbinden Sie Ihre Druckerei mit dem PrintPrice OS Produktionsnetzwerk.',
      heroSub: 'Erhalten Sie Buchprojekte mit technisch geprüften Druck-PDFs und Preisen, die exakt auf Ihre Druckmaschinen, Bogenformate und Kapazitäten kalibriert sind.',
      ctaRegister: 'Druckerei im Control Plane registrieren ➔',
      ctaLearn: 'Druckerei-Funktionen ansehen',
      trustCheck: '✓ Offizielle Registrierung im Control Plane · Strikte Mandantentrennung · Keine doppelten Formulare',
      onboardingTitle: 'Das offizielle Druckerei-Onboarding erfolgt im Control Plane',
      onboardingSub: 'Um die Vertraulichkeit Ihrer Produktionsdaten zu sichern und Ihre Maschinen präzise zu kalibrieren, erfolgt die Einrichtung in unserer offiziellen technischen Konsole.',
      steps: [
        {
          title: '1. Registrierung & Betriebsprüfung',
          desc: 'Erstellen Sie Ihr Firmenprofil mit geschäftlicher E-Mail und Steuerdaten im Control Plane. Ihre kaufmännischen Daten sind durch strikte Mandantentrennung geschützt.'
        },
        {
          title: '2. Maschinenpark-Profilierung',
          desc: 'Hinterlegen Sie minimale und maximale Bogenformate, Rüstkosten, Fortdruckgeschwindigkeiten und Weiterverarbeitungsmatrizen (PUR, Fadenheftung, Hardcover).'
        },
        {
          title: '3. Verknüpfung mit Papiersortimenten',
          desc: 'Verbinden Sie Qualitäten aus dem föderierten Masterkatalog mit aktuellen Staffelpreisen und transparenter Trennung von Frachtkosten.'
        },
        {
          title: '4. Empfang geprüfter Druckdaten',
          desc: 'Druckfertige PDFs werden durch die Preflight-Engine vor Eintreffen in der Druckerei geprüft, wodurch Maschinenstillstände vermieden werden.'
        }
      ],
      calloutTitle: 'Haben Sie technische Fragen oder wünschen Sie ein Fachgespräch?',
      calloutSub: 'Wenden Sie sich direkt an unsere Spezialisten für Drucktechnik und Schnittstellen.',
      calloutRegister: 'Zur Druckerei-Registrierung ➔',
      calloutContact: 'Team kontaktieren'
    }
  };

  const t = texts[locale] || texts.es;

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0 3rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <span className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              {t.badge}
            </span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
              {t.heroTitle}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              {t.heroSub}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href="https://control.printprice.pro/printhouse/register"
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
              >
                {t.ctaRegister}
              </a>
              <Link
                href="/for-printhouses"
                className="btn-secondary"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
              >
                {t.ctaLearn}
              </Link>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              {t.trustCheck}
            </p>
          </div>
        </Container>
      </section>

      {/* Características del modelo de taller */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              {t.onboardingTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, textAlign: 'center', marginBottom: '3rem' }}>
              {t.onboardingSub}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {t.steps.map((step, idx) => (
                <div key={idx} className="rounded-card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                {t.calloutTitle}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.925rem' }}>
                {t.calloutSub}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://control.printprice.pro/printhouse/register"
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  {t.calloutRegister}
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  {t.calloutContact}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

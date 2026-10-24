'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function PartnerContactPage() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0 3rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <span className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              Red de Imprentas y Talleres Asociados
            </span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
              Conecta tu taller a la red de producción de PrintPrice OS.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Recibe proyectos de libros con artes finales preflight auditadas técnicamente y tarifas calculadas 
              según tus máquinas, pliegos y capacidades reales.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href="https://control.printprice.pro/printhouse/register"
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
              >
                Registrar mi imprenta en Control Plane ➔
              </a>
              <Link
                href="/for-printhouses"
                className="btn-secondary"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
              >
                Ver capacidades para imprentas
              </Link>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
              ✓ Registro oficial en Control Plane · Aislamiento de datos de taller · Sin duplicidad de formularios
            </p>
          </div>
        </Container>
      </section>

      {/* Características del modelo de taller */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              El onboarding canónico de imprenta se realiza en Control Plane
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, textAlign: 'center', marginBottom: '3rem' }}>
              Para garantizar la seguridad de tus datos de producción y calibrar tus máquinas con rigor,
              todo el proceso de configuración se gestiona en nuestra consola técnica oficial.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div className="rounded-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>1. Alta y Validación de Taller</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Crea tu perfil con correo profesional y datos fiscales en Control Plane. Tus datos comerciales 
                  están protegidos por aislamiento multi-tenant estricto.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>2. Perfilado de Parque de Máquinas</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Introduce tus especificaciones de pliego (mín/máx), costes horarios de preparación (makeready), 
                  velocidades de tirada y matrices de encuadernación.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>3. Conexión con Proveedores de Papel</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Vincula las referencias del catálogo maestro de sustratos de papel con tarifas actualizadas 
                  y separación clara de costes de transporte.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>4. Recepción de Trabajos Verificados</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Los archivos PDF son auditados por el motor de preflight antes de llegar a taller, reduciendo incidencias 
                  y paradas innecesarias en máquina.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                ¿Tienes dudas técnicas o necesitas una llamada con el equipo?
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.925rem' }}>
                Contacta con nuestros especialistas en integración de artes gráficas.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://control.printprice.pro/printhouse/register"
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  Ir al registro de imprenta ➔
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Contactar con el equipo
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

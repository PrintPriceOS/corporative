'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

const STAKEHOLDER_CARDS = [
  {
    id: 'authors',
    title: 'Autores y Particulares',
    tagline: 'Imprime tu libro personal sin mínimos ni trámites B2B.',
    description: 'Calcula el presupuesto en segundos, comprueba si tu PDF tiene sangres y perfiles correctos, y visualiza una maqueta 3D interactiva antes de encargar.',
    badge: 'SIN MÍNIMOS',
    href: '/for-authors',
    ctaText: 'Ver recorrido para autores',
    icon: '📖',
  },
  {
    id: 'publishers',
    title: 'Editoriales & Publishers',
    tagline: 'Presupuesta catálogos y compara tiradas offset y digitales.',
    description: 'Compara costes escalonados por tirada, evalúa opciones de encuadernación (PUR, cosido, tapa dura) y audita artes finales técnicas de tus diseñadores.',
    badge: 'CATÁLOGO & VOLUMEN',
    href: '/for-publishers',
    ctaText: 'Ver espacio editorial',
    icon: '📚',
  },
  {
    id: 'printhouses',
    title: 'Imprentas & Talleres',
    tagline: 'Configura maquinaria y recibe trabajos listos para imprimir.',
    description: 'Perfila tus prensas digitales y offset en pliegos, define costes horarios y mermas de arranque, y recibe archivos con preflight técnico verificado.',
    badge: 'CONTROL PLANE',
    href: '/for-printhouses',
    ctaText: 'Ver solución para imprentas',
    icon: '⚙️',
  },
  {
    id: 'suppliers',
    title: 'Proveedores de Papel',
    tagline: 'Publica tu catálogo maestro y conecta tarifas con talleres.',
    description: 'Estandariza fichas técnicas de sustratos (gramajes, mano, FSC) y vincula tus precios por volumen con separación nítida entre material y transporte.',
    badge: 'PAPER HUB',
    href: '/for-paper-suppliers',
    ctaText: 'Ver portal de proveedores',
    icon: '📄',
  },
];

const COMPARISON_AUTHORS = [
  {
    feature: 'Cálculo de presupuesto inmediato sin registro',
    printprice: 'Disponible',
    lulu: 'Mediante módulo / registro',
    gelato: 'Mediante integración B2B',
    notes: 'Budget permite calcular sin crear cuenta previa ni solicitar cotización manual.',
  },
  {
    feature: 'Comprobación técnica de PDF (Preflight de libros)',
    printprice: 'Disponible',
    lulu: 'Disponible (básico)',
    gelato: 'Disponible',
    notes: 'Verifica sangres de 3 mm, espacios de color CMYK, resolución a 300 DPI y TAC.',
  },
  {
    feature: 'Visualización 3D interactiva de lomo y cubiertas',
    printprice: 'Disponible',
    lulu: 'No confirmado',
    gelato: 'No confirmado',
    notes: 'Simulación orientativa en navegador basada en gramaje y número de páginas.',
  },
  {
    feature: 'Elección de taller o conexión con imprenta propia',
    printprice: 'Disponible',
    lulu: 'Red cerrada de Lulu',
    gelato: 'Red cerrada de Gelato',
    notes: 'Permite seleccionar de la red o conectar las máquinas de tu taller homologado.',
  },
  {
    feature: 'Distribución en librerías globales (Amazon / Ingrams)',
    printprice: 'Mediante integración',
    lulu: 'Disponible',
    gelato: 'Disponible',
    notes: 'Lulu y Gelato disponen de red de distribución y venta minorista bajo demanda.',
  },
];

const COMPARISON_PRINTERS = [
  {
    feature: 'Modelado de máquinas (pliegos, makeready, mermas)',
    printprice: 'Disponible',
    printiq: 'Disponible',
    printvis: 'Disponible',
    tharstern: 'Disponible',
    notes: 'Configuración de costes horarios, tamaños de pliego, pinzas y velocidades.',
  },
  {
    feature: 'Catálogo federado de papel (sustratos técnicos)',
    printprice: 'Disponible',
    printiq: 'Disponible (módulo compras)',
    printvis: 'Mediante integración',
    tharstern: 'Mediante integración',
    notes: 'Paper Supplier Hub separa estrictamente el coste de fabricación y el porte.',
  },
  {
    feature: 'Trazabilidad de evidencia inmutable (evidenceId)',
    printprice: 'Disponible',
    printiq: 'Mediante auditoría',
    printvis: 'Mediante registro ERP',
    tharstern: 'Mediante histórico',
    notes: 'Hash e identificador único que vincula presupuesto y archivo validado.',
  },
  {
    feature: 'ERP/MIS contable y laboral integral',
    printprice: 'Mediante integración',
    printiq: 'Disponible',
    printvis: 'Disponible',
    tharstern: 'Disponible',
    notes: 'PrintPrice OS se integra como motor de cotización e inteligencia técnica.',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'authors' | 'printers'>('authors');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: 'clamp(4.5rem, 9vw, 7rem) 0 clamp(3rem, 6vw, 4.5rem)',
          background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span className="pill-badge">
                PRICE IT. FIX IT. PRINT IT.
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Tu libro, del archivo al papel.
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '720px',
                margin: '0 auto 2.5rem',
              }}
            >
              Calcula el presupuesto, comprueba tus archivos y visualiza el resultado.
              Conectamos autores, editoriales, imprentas y proveedores de papel en una misma infraestructura técnica.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
              >
                Calcular presupuesto de libro ➔
              </a>
              <a
                href="https://control.printprice.pro/printhouse/register"
                className="btn-secondary"
                style={{ padding: '0.9rem 1.75rem', fontSize: '1rem' }}
              >
                Registrar mi imprenta
              </a>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1.25rem' }}>
              ✓ Presupuesto técnico inmediato · Sin suscripciones forzosas · Comprobación de PDF antes de taller
            </p>
          </div>
        </Container>
      </section>

      {/* 4 Stakeholder Cards Section */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              Recorridos Especializados
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              ¿Qué rol tienes en el proyecto de impresión?
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Cada persona necesita herramientas distintas: desde la estimación de un único libro hasta la configuración de un parque de maquinaria industrial.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {STAKEHOLDER_CARDS.map((card) => (
              <div
                key={card.id}
                className="rounded-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '2rem' }}>{card.icon}</span>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--accent-container)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {card.tagline}
                  </p>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {card.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={card.href}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    {card.ctaText} ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Cómo funciona */}
      <section
        id="how-it-works"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              Flujo Paso a Paso
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Cómo funciona PrintPrice Pro
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              De la idea inicial al taller gráfico sin intermediarios opacos ni sorpresas de última hora.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Configurar</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Indica formato cerrado, páginas interiores, tipo de papel y acabado de cubierta (tapa blanda, cosido o tapa dura).
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Presupuestar</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                El servidor resuelve el coste estimado aplicando matrices reales de impresión digital y offset según el volumen de ejemplares.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Comprobar &amp; Visualizar</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                El motor de Preflight analiza sangres, color y resolución de tu PDF, mientras la maqueta 3D genera una vista previa del lomo.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, lineHeight: 1, marginBottom: '1rem' }}>
                04
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Imprimir</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                El taller recibe el proyecto con especificaciones exactas e informe técnico firmado mediante un identificador de evidencia (evidenceId).
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Capacidades Técnicas Disponibles */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              Herramientas de Precisión
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Capacidades técnicas reales en producción
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Herramientas diseñadas para resolver la complejidad física de imprimir un libro.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>💶</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Motor de Presupuestación (Budget)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Cálculo instantáneo por servidor. Identifica con rigor el punto de cruce de costes entre tiradas cortas digitales y tiradas medias/largas en offset.
              </p>
              <a href="https://budget.printprice.pro/" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Abrir espacio de presupuestación ↗
              </a>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🛡️</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Auditoría Técnica de PDF (Preflight)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Inspección automática de parámetros de impresión: sangres perimetrales de 3 mm, espacio de color CMYK, sobreimpresiones y cobertura máxima de tinta (TAC).
              </p>
              <Link href="/products/preflight" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Ver detalles de Preflight ➔
              </Link>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>📐</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Maqueta 3D Interactiva</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Previsualización 3D en navegador con grosor de lomo calculado según el gramaje del papel y número de páginas. Permite verificar la orientación de portada y contraportada.
              </p>
              <Link href="/products/mockup" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Ver visualizador 3D ➔
              </Link>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🏭</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Control Plane para Imprentas</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Consola para directores de taller: modelado de prensas, calibración de encuadernación, gestión de órdenes de trabajo y trazabilidad inmutable mediante hash de evidencia.
              </p>
              <a href="https://control.printprice.pro/" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Acceso a Control Plane ↗
              </a>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>📦</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Paper Supplier Hub</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Catálogo maestro federado para fabricantes y distribuidores de papel. Separación rigurosa de coste de fabricación vs. tarifas logísticas de transporte.
              </p>
              <a href="https://docs.printprice.pro/docs/platform/paper-supplier-hub" target="_blank" rel="noopener noreferrer" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Documentación técnica ↗
              </a>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🔌</span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>API &amp; Conectividad</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Especificaciones OpenAPI para conectar tiendas online, sistemas editoriales y software de gestión de taller (MIS/ERP) existentes.
              </p>
              <Link href="/developers" className="nav-dropdown-item" style={{ display: 'inline-flex', padding: '0.4rem 0.6rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Portal de desarrolladores ➔
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Comparativas Objetivas */}
      <section
        id="comparativas"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
              Comparativa Objetiva del Sector
            </span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Comparativa con otras soluciones del mercado
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Evaluación fundamentada en especificaciones públicas oficiales (revisión: octubre de 2026).
              No todas las soluciones tienen el mismo propósito: algunas son plataformas de autopublicación con distribución minorista, y otras son suites completas de gestión de taller.
            </p>

            {/* Selector de Pestañas */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--bg-primary)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-color)',
                marginTop: '1.5rem',
                gap: '0.25rem',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('authors')}
                style={{
                  border: 'none',
                  background: activeTab === 'authors' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'authors' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Autores &amp; Editoriales
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('printers')}
                style={{
                  border: 'none',
                  background: activeTab === 'printers' ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === 'printers' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Imprentas &amp; Proveedores
              </button>
            </div>
          </div>

          {/* Tabla Bloque A */}
          {activeTab === 'authors' && (
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: '32%' }}>Característica</th>
                    <th style={{ width: '18%', color: 'var(--accent-primary)' }}>PrintPrice Pro</th>
                    <th style={{ width: '18%' }}>Lulu</th>
                    <th style={{ width: '18%' }}>GelatoConnect</th>
                    <th style={{ width: '14%' }}>Alcance y Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_AUTHORS.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{row.feature}</td>
                      <td>
                        <span className="badge-available">{row.printprice}</span>
                      </td>
                      <td>
                        <span className={row.lulu.includes('Disponible') ? 'badge-available' : 'badge-module'}>
                          {row.lulu}
                        </span>
                      </td>
                      <td>
                        <span className={row.gelato.includes('Disponible') ? 'badge-available' : 'badge-integration'}>
                          {row.gelato}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tabla Bloque B */}
          {activeTab === 'printers' && (
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: '28%' }}>Característica</th>
                    <th style={{ width: '16%', color: 'var(--accent-primary)' }}>PrintPrice Pro</th>
                    <th style={{ width: '15%' }}>printIQ</th>
                    <th style={{ width: '15%' }}>PrintVis</th>
                    <th style={{ width: '14%' }}>Tharstern</th>
                    <th style={{ width: '12%' }}>Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_PRINTERS.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{row.feature}</td>
                      <td>
                        <span className={row.printprice === 'Disponible' ? 'badge-available' : 'badge-integration'}>
                          {row.printprice}
                        </span>
                      </td>
                      <td>
                        <span className={row.printiq.includes('Disponible') ? 'badge-available' : 'badge-module'}>
                          {row.printiq}
                        </span>
                      </td>
                      <td>
                        <span className={row.printvis.includes('Disponible') ? 'badge-available' : 'badge-integration'}>
                          {row.printvis}
                        </span>
                      </td>
                      <td>
                        <span className={row.tharstern.includes('Disponible') ? 'badge-available' : 'badge-integration'}>
                          {row.tharstern}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            * Metodología: Datos cotejados a partir de manuales públicos de producto, páginas de producto oficiales y documentación técnica (octubre 2026).
            "No confirmado" indica ausencia de referencia pública concluyente, no inexistencia de la función.
          </div>
        </Container>
      </section>

      {/* FAQ Segmentada */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="pill-badge" style={{ marginBottom: '0.75rem' }}>
                Respuestas Claras
              </span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
                Preguntas frecuentes
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                Información transparente sobre precios, cuentas y proceso de impresión.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  q: '¿El cálculo en Budget es un presupuesto exacto o una estimación?',
                  a: 'El cálculo en Budget es una estimación técnica basada en las matrices de costes de producción calibradas por las imprentas adscritas y los precios vigentes de papel. La cotización final se confirma al subir el archivo definitivo y verificar parámetros de transporte y condiciones especiales de taller.',
                },
                {
                  q: '¿Un autor particular necesita empresa, CIF o facturación B2B?',
                  a: 'No. El espacio de presupuestación está diseñado para que cualquier persona particular o autor independiente pueda configurar su libro, comprobar sus archivos y conocer los costes sin necesidad de constituir una empresa ni tener un CIF intracomunitario.',
                },
                {
                  q: '¿Qué revisa el sistema de Preflight en mi PDF?',
                  a: 'Preflight analiza que el documento cumpla las dimensiones de corte deseadas, incluya 3 mm de sangre por lado para evitar filos blancos, mantenga las imágenes con resolución óptima (300 DPI recomendados) y no exceda la cobertura total de tinta (TAC). No sustituye la corrección ortotipográfica ni editorial.',
                },
                {
                  q: '¿Cómo se garantiza la confidencialidad de las imprentas en Control Plane?',
                  a: 'PrintPrice OS aplica un aislamiento estricto de tenants (multi-tenant con control de acceso basado en roles RBAC). Tus costes horarios de máquina, mermas de taller, acuerdos con proveedores y márgenes son estrictamente privados y no son visibles para otros talleres de la red.',
                },
                {
                  q: '¿Puedo integrar PrintPrice con mi tienda online o sistema ERP?',
                  a: 'Sí. Disponemos de especificaciones OpenAPI y webhooks para recibir solicitudes de presupuesto, enviar archivos validados e integrar el motor de cálculo en tus flujos existentes de venta o gestión editorial.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    borderColor: openFaq === index ? 'var(--accent-primary)' : 'var(--border-color)',
                  }}
                  onClick={() => toggleFaq(index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                      {faq.q}
                    </h3>
                    <span style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', fontWeight: 700, lineHeight: 1 }}>
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </div>

                  {openFaq === index && (
                    <p style={{ marginTop: '0.85rem', marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Final de Cierre */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <Container>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginBottom: '1rem', fontWeight: 800 }}>
              Empieza hoy con tu proyecto de libro
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Sin costes ocultos, sin compromisos y con la tecnología de comprobación técnica que utiliza la industria gráfica profesional.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
              >
                Calcular presupuesto en vivo ➔
              </a>
              <Link
                href="/contact"
                className="btn-secondary"
                style={{ padding: '0.9rem 1.75rem', fontSize: '1rem' }}
              >
                Hablar con un asesor técnico
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

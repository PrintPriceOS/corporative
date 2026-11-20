'use client';

import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { useLocale } from '@/lib/i18n';
import { DotInteractiveHero } from '@/components/mascot';
import { Terminal, Cpu, ExternalLink, Copy, Check, Wrench, Layers } from 'lucide-react';

interface McpShowcaseSectionProps {
  id?: string;
}

type SnippetTab = 'http' | 'npx' | 'skill';

export const McpShowcaseSection: React.FC<McpShowcaseSectionProps> = ({ id = 'mcp-section' }) => {
  const { dict } = useLocale();
  const [activeTab, setActiveTab] = useState<SnippetTab>('http');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const SNIPPETS: Record<SnippetTab, { title: string; subtitle: string; code: string }> = {
    http: {
      title: 'Streamable HTTP (Remote MCP)',
      subtitle: 'Configuración para Cursor, Windsurf o Antigravity (~/.cursor/mcp.json o Claude Desktop)',
      code: JSON.stringify(
        {
          mcpServers: {
            'printprice-production': {
              url: 'https://mcp.printprice.pro/mcp',
            },
          },
        },
        null,
        2
      ),
    },
    npx: {
      title: 'Stdio Local (NPM CLI)',
      subtitle: 'Ejecución en local con transporte Stdio y Node.js 18+',
      code: JSON.stringify(
        {
          mcpServers: {
            'ppos-mcp-server': {
              command: 'npx',
              args: ['-y', '@ppos/mcp-server'],
            },
          },
        },
        null,
        2
      ),
    },
    skill: {
      title: 'Agent Skill (printprice-mcp-orchestrator)',
      subtitle: 'Skill YAML para orquestar los 5 dominios industriales con agentes autónomos',
      code: `# Agent Skill: printprice-mcp-orchestrator
name: printprice-mcp-orchestrator
description: Deterministic 5-axis book pricing, spine geometry, EPAL pallet cubing, and PDF preflight.
mcp_server: "https://mcp.printprice.pro/mcp"
tools:
  - ppos_search_paper_catalog
  - ppos_calculate_book_estimate
  - ppos_get_marketplace_offers
  - ppos_calculate_crossover_curve
  - ppos_calculate_spine_geometry
  - ppos_calculate_logistics_cubing_quote
  - ppos_plan_sheet_imposition
  - ppos_inspect_preflight
  - ppos_validate_machine_substrate
  - ppos_manage_marketplace_order`,
    },
  };

  const TOOLS_LIST = [
    { name: 'ppos_search_paper_catalog', desc: 'Bilingual substrate catalog with verified caliper & micron precision' },
    { name: 'ppos_calculate_book_estimate', desc: '5-Axis BPE industrial cost breakdown & digital vs offset crossover' },
    { name: 'ppos_get_marketplace_offers', desc: 'Multi-printhouse commercial bids with BPE fallback detection' },
    { name: 'ppos_calculate_crossover_curve', desc: 'Run-length scaling comparison curve & threshold Q*' },
    { name: 'ppos_calculate_spine_geometry', desc: 'Certified SPINE-01 spine bulk, swell & open cover wrap template' },
    { name: 'ppos_calculate_logistics_cubing_quote', desc: '3D FEFCO & EPAL pallet packing, dock rules & deltaQ optimization' },
    { name: 'ppos_plan_sheet_imposition', desc: 'Industrial sheet imposition (B1/B2/SRA3/Web Rotary) & creep compensation' },
    { name: 'ppos_inspect_preflight', desc: '6-axis PDF preflight verification (spine, bleed, TAC, DPI) & MAGIC_FIX' },
    { name: 'ppos_validate_machine_substrate', desc: 'Mechanical compatibility between press constraints & paper specs' },
    { name: 'ppos_manage_marketplace_order', desc: 'Complete marketplace order lifecycle (create, get, offers, files, bind)' },
  ];

  return (
    <section
      id={id}
      style={{
        padding: 'clamp(3.5rem, 6vw, 6rem) 0',
        background: '#0e0e0f',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220, 0, 0, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220, 0, 0, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container>
        {/* Header Block with Dot Interactive Mascot */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'rgba(220, 0, 0, 0.12)',
                border: '1px solid rgba(220, 0, 0, 0.35)',
                fontSize: '0.725rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffb4a8',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#dc0000',
                  boxShadow: '0 0 8px #dc0000',
                }}
              />
              {dict.mcpSection.badge}
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.25rem',
              }}
            >
              {dict.mcpSection.title}
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#d1d5db',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              {dict.mcpSection.subtitle}
            </p>

            <p
              style={{
                fontSize: '0.925rem',
                color: '#9ca3af',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
              }}
            >
              {dict.mcpSection.description}
            </p>

            {/* Capability badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  background: '#18181b',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#e5e7eb',
                }}
              >
                <Wrench size={14} color="#dc0000" />
                {dict.mcpSection.pill1}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  background: '#18181b',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#e5e7eb',
                }}
              >
                <Layers size={14} color="#dc0000" />
                {dict.mcpSection.pill2}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  background: 'rgba(220, 0, 0, 0.1)',
                  border: '1px solid rgba(220, 0, 0, 0.25)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#ffb4a8',
                }}
              >
                <Cpu size={14} color="#dc0000" />
                {dict.mcpSection.pill3}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DotInteractiveHero size={220} enableEyeTracking={true} />
          </div>
        </div>

        {/* Technical Grid: Interactive Quickstart Snippet + Tools Catalog */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
            marginBottom: '3rem',
          }}
        >
          {/* Card 1: Interactive Client Snippet */}
          <div
            style={{
              background: '#131314',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Snippet Navigation Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: '#18181b',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('http')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: activeTab === 'http' ? 'rgba(220, 0, 0, 0.2)' : 'transparent',
                    color: activeTab === 'http' ? '#ffffff' : '#9ca3af',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Remote HTTP
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('npx')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: activeTab === 'npx' ? 'rgba(220, 0, 0, 0.2)' : 'transparent',
                    color: activeTab === 'npx' ? '#ffffff' : '#9ca3af',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  CLI Stdio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('skill')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: activeTab === 'skill' ? 'rgba(220, 0, 0, 0.2)' : 'transparent',
                    color: activeTab === 'skill' ? '#ffffff' : '#9ca3af',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Agent Skill
                </button>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(SNIPPETS[activeTab].code, `tab-${activeTab}`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  background: copiedKey === `tab-${activeTab}` ? '#059669' : 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {copiedKey === `tab-${activeTab}` ? <Check size={12} /> : <Copy size={12} />}
                {copiedKey === `tab-${activeTab}` ? dict.mcpSection.copied : dict.mcpSection.copy}
              </button>
            </div>

            {/* Code Body */}
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                {SNIPPETS[activeTab].subtitle}
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '1rem',
                  background: '#0a0a0b',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontFamily: 'JetBrains Mono, Menlo, monospace',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  color: '#e5e7eb',
                  overflowX: 'auto',
                  flex: 1,
                }}
              >
                <code>{SNIPPETS[activeTab].code}</code>
              </pre>
            </div>
          </div>

          {/* Card 2: 10 Tools Summary Catalog */}
          <div
            style={{
              background: '#131314',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={18} color="#dc0000" />
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
                  CORE MCP TOOLS CATALOG
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                STRICTLY DETERMINISTIC
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
              {TOOLS_LIST.map((tool) => (
                <div
                  key={tool.name}
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: '#18181b',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#ffb4a8',
                    }}
                  >
                    {tool.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{tool.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <a
            href="https://mcp.printprice.pro/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.65rem',
              background: '#dc0000',
              color: '#ffffff',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(220, 0, 0, 0.35)',
              transition: 'opacity 0.15s ease',
            }}
          >
            <span>{dict.mcpSection.ctaPrimary}</span>
            <ExternalLink size={16} />
          </a>

          <a
            href="https://docs.printprice.pro/docs/api/mcp-server-and-skills"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.65rem',
              background: 'transparent',
              color: '#ffffff',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.9rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'border-color 0.15s ease',
            }}
          >
            <span>{dict.mcpSection.ctaSecondary}</span>
          </a>

          <a
            href="https://mcp.printprice.pro/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#d1d5db',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Terminal size={15} color="#9ca3af" />
            <span>llms.txt (AI Manifest)</span>
          </a>
        </div>
      </Container>
    </section>
  );
};

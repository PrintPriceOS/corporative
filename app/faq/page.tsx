'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/i18n';
import { FAQ_REGISTRY, FaqItem } from './faqData';
import {
  Search,
  BookOpen,
  Building2,
  Factory,
  Layers,
  Truck,
  ChevronDown,
  ExternalLink,
  LifeBuoy,
  Sparkles,
  Command,
  X
} from 'lucide-react';

type RoleFilter = 'all' | 'author' | 'editorial' | 'printhouse' | 'paper' | 'logistics';

export default function FaqHubPage() {
  const { dict, locale } = useLocale();
  const [activeRole, setActiveRole] = useState<RoleFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([FAQ_REGISTRY[0].id]));
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Shortcut Cmd+K / Ctrl+K focus on search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const roleMeta: Record<RoleFilter, { label: string; icon: React.ReactNode }> = {
    all: { label: dict.faqHub.allRoles, icon: <Layers size={14} /> },
    author: { label: dict.faqHub.roleAuthor, icon: <BookOpen size={14} /> },
    editorial: { label: dict.faqHub.roleEditorial, icon: <Building2 size={14} /> },
    printhouse: { label: dict.faqHub.rolePrinthouse, icon: <Factory size={14} /> },
    paper: { label: dict.faqHub.rolePaper, icon: <Layers size={14} /> },
    logistics: { label: dict.faqHub.roleLogistics, icon: <Truck size={14} /> },
  };

  // Filter questions by role and instant search query
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FAQ_REGISTRY.filter((item) => {
      const matchRole = activeRole === 'all' || item.role === activeRole;
      if (!matchRole) return false;
      if (!q) return true;

      const questionText = (dict.faqHub as any)[item.questionKey.replace('faq.hub.', '')] || '';
      const answerText = (dict.faqHub as any)[item.answerKey.replace('faq.hub.', '')] || '';
      const tagsMatch = item.tags.some((t) => t.toLowerCase().includes(q));

      return (
        questionText.toLowerCase().includes(q) ||
        answerText.toLowerCase().includes(q) ||
        tagsMatch
      );
    });
  }, [activeRole, searchQuery, dict.faqHub]);

  // JSON-LD FAQPage Schema for Search Engines
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_REGISTRY.map((item) => {
        const questionText = (dict.faqHub as any)[item.questionKey.replace('faq.hub.', '')] || '';
        const answerText = (dict.faqHub as any)[item.answerKey.replace('faq.hub.', '')] || '';
        return {
          '@type': 'Question',
          name: questionText,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answerText + (item.docsUrl ? ` For technical specifications, explore our docs at ${item.docsUrl}` : ''),
          },
        };
      }),
    };
  }, [dict.faqHub]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Search Engine Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Engineering Blueprint Grid Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 15%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 15%, black, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Crimson Glow behind Hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '350px',
          background: 'radial-gradient(ellipse at center, rgba(220, 0, 0, 0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '5rem 1.5rem 6rem 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(220, 0, 0, 0.08)',
              border: '1px solid rgba(220, 0, 0, 0.3)',
              color: '#ef4444',
              fontFamily: 'monospace',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={12} />
            <span>{dict.faqHub.heroBadge}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              margin: '0 0 1rem 0',
              color: '#ffffff',
            }}
          >
            {dict.faqHub.heroTitle}
          </h1>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: '#a1a1aa',
            }}
          >
            {dict.faqHub.heroSubtitle}
          </p>

          {/* Interactive Search Bar */}
          <div
            style={{
              maxWidth: '680px',
              margin: '2.5rem auto 0 auto',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(19, 19, 22, 0.85)',
                border: '1px solid rgba(63, 63, 70, 0.8)',
                borderRadius: '14px',
                padding: '0.75rem 1.1rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Search size={18} style={{ color: '#ef4444', marginRight: '0.75rem', flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.faqHub.searchPlaceholder}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                }}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#71717a',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label={dict.faqHub.clearSearch}
                >
                  <X size={16} />
                </button>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    color: '#71717a',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    flexShrink: 0,
                  }}
                >
                  <Command size={10} />
                  <span>K</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Role Navigation Segmented Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2.5rem',
          }}
        >
          {(Object.keys(roleMeta) as RoleFilter[]).map((r) => {
            const isActive = activeRole === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRole(r)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  border: isActive
                    ? '1px solid #dc0000'
                    : '1px solid rgba(63, 63, 70, 0.85)',
                  backgroundColor: isActive ? '#dc0000' : 'rgba(19, 19, 22, 0.9)',
                  color: isActive ? '#ffffff' : '#a1a1aa',
                  boxShadow: isActive ? '0 0 16px rgba(220, 0, 0, 0.45)' : 'none',
                  transition: 'all 0.18s ease',
                }}
              >
                {roleMeta[r].icon}
                <span>{roleMeta[r].label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Results Summary Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#71717a',
            paddingBottom: '0.85rem',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span>
            {dict.faqHub.activeRolePrefix}:{' '}
            <strong style={{ color: '#ef4444' }}>{roleMeta[activeRole].label}</strong>
          </span>
          <span>
            {filteredFaqs.length} {dict.faqHub.resultsCount}
          </span>
        </div>

        {/* Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredFaqs.map((faq) => {
              const isOpen = expandedIds.has(faq.id);
              const question = (dict.faqHub as any)[faq.questionKey.replace('faq.hub.', '')] || '';
              const answer = (dict.faqHub as any)[faq.answerKey.replace('faq.hub.', '')] || '';

              return (
                <div
                  key={faq.id}
                  style={{
                    borderRadius: '14px',
                    border: isOpen
                      ? '1px solid rgba(220, 0, 0, 0.45)'
                      : '1px solid rgba(63, 63, 70, 0.75)',
                    backgroundColor: isOpen ? 'rgba(19, 19, 22, 0.96)' : 'rgba(14, 14, 17, 0.85)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease, background-color 0.2s ease',
                  }}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '9999px',
                          backgroundColor: isOpen ? '#dc0000' : '#52525b',
                          boxShadow: isOpen ? '0 0 8px #dc0000' : 'none',
                          flexShrink: 0,
                          transition: 'background-color 0.2s ease',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          letterSpacing: '-0.015em',
                          color: isOpen ? '#ffffff' : '#e4e4e7',
                        }}
                      >
                        {question}
                      </span>
                    </div>

                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isOpen ? '#ef4444' : '#a1a1aa',
                        backgroundColor: isOpen ? 'rgba(220, 0, 0, 0.1)' : 'transparent',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease, color 0.2s ease, background-color 0.2s ease',
                        flexShrink: 0,
                      }}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {/* Accordion Content Area */}
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.35rem 2.45rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '1rem',
                      }}
                    >
                      {/* Strictly One-Paragraph Answer */}
                      <p
                        style={{
                          fontSize: '0.95rem',
                          lineHeight: 1.65,
                          color: '#d4d4d8',
                          margin: '0 0 1rem 0',
                        }}
                      >
                        {answer}
                      </p>

                      {/* Technical Deep Link to docs.printprice.pro */}
                      {faq.docsUrl && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                          <a
                            href={faq.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              fontFamily: 'monospace',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#ef4444',
                              textDecoration: 'none',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(220, 0, 0, 0.08)',
                              border: '1px solid rgba(220, 0, 0, 0.25)',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <span>{dict.faqHub.docsLink}: {faq.docsUrl.replace('https://', '')}</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              borderRadius: '16px',
              border: '1px dashed rgba(63, 63, 70, 0.8)',
              backgroundColor: 'rgba(19, 19, 22, 0.5)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(220, 0, 0, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                marginBottom: '1rem',
              }}
            >
              <LifeBuoy size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              {dict.faqHub.noResultsTitle}
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
              {dict.faqHub.noResultsDesc}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveRole('all');
              }}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: '#dc0000',
                color: '#ffffff',
                border: 'none',
                fontFamily: 'monospace',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {dict.faqHub.clearSearch}
            </button>
          </div>
        )}

        {/* Operational Escalation Footer */}
        <div
          style={{
            marginTop: '4.5rem',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(63, 63, 70, 0.85)',
            backgroundColor: '#0e0e11',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.25rem',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#ef4444',
            }}
          >
            HUMAN OPERATIONS & ESCALATION DESK
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              margin: 0,
              color: '#ffffff',
            }}
          >
            {dict.faqHub.contactTitle}
          </h2>
          <p
            style={{
              maxWidth: '620px',
              color: '#a1a1aa',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {dict.faqHub.contactDesc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '10px',
                backgroundColor: '#dc0000',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(220, 0, 0, 0.45)',
              }}
            >
              {dict.faqHub.contactBtnOperations}
            </Link>
            <a
              href="https://docs.printprice.pro/docs/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f4f4f5',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              {dict.faqHub.contactBtnDocs}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

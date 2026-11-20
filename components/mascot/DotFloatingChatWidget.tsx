'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DotChatAvatar, DotChatState } from './DotChatAvatar';
import { X, Send, Sparkles, RotateCcw, ExternalLink } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { ChatCta, resolveConciergeKnowledge } from '@/lib/dot-knowledge';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  ctas?: ChatCta[];
}

function renderFormattedMessage(text: string) {
  const lines = text.split('\n');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {lines.map((line, lIdx) => {
        if (!line.trim()) return null;
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={lIdx} style={{ margin: 0 }}>
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={pIdx} style={{ color: '#ffffff', fontWeight: 700 }}>
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

export const DotFloatingChatWidget: React.FC = () => {
  const { locale, dict } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<DotChatState>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sequenceTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Sincronizar mensaje de bienvenida según locale si la conversación está limpia
  useEffect(() => {
    setMessages((prev) => {
      if (
        prev.length === 0 ||
        (prev.length === 1 && (prev[0].id.startsWith('init-') || prev[0].id.startsWith('reset-')))
      ) {
        return [{ id: `init-${locale}`, sender: 'bot', text: dict.dotChat.welcomeMessage }];
      }
      return prev;
    });
  }, [locale, dict.dotChat.welcomeMessage]);

  // Auto scroll al final de la conversación
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Al abrir el widget, disparar animación success alegre y luego idle
  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setChatState('success');
      setTimeout(() => setChatState('idle'), 1200);
    } else {
      setIsOpen(false);
      setChatState('idle');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    if (e.target.value.trim().length > 0) {
      if (chatState !== 'listening') setChatState('listening');
      typingTimerRef.current = setTimeout(() => {
        if (chatState === 'listening') setChatState('idle');
      }, 3000);
    } else {
      setChatState('idle');
    }
  };

  const handleInputFocus = () => {
    if (chatState === 'idle') setChatState('listening');
  };

  const handleInputBlur = () => {
    if (!inputValue.trim() && chatState === 'listening') {
      setChatState('idle');
    }
  };

  const executeBotResponse = async (userPrompt: string) => {
    sequenceTimersRef.current.forEach((t) => clearTimeout(t));
    sequenceTimersRef.current = [];

    // Añadir mensaje de usuario
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: userPrompt };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // 1. Fase THINKING (Consulta a la base de conocimiento comercial)
    setChatState('thinking');
    setIsTyping(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, locale }),
      });

      let replyText = '';
      let replyCtas: ChatCta[] | undefined;

      if (res.ok) {
        const data = await res.json();
        replyText = data.reply;
        replyCtas = data.ctas;
      } else {
        const local = resolveConciergeKnowledge(userPrompt, locale);
        replyText = local.text;
        replyCtas = local.ctas;
      }

      // 2. Fase SPEAKING
      setChatState('speaking');
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          ctas: replyCtas,
        },
      ]);

      const t1 = setTimeout(() => {
        setChatState('idle');
      }, 2500);
      sequenceTimersRef.current.push(t1);
    } catch {
      // Fallback local robusto
      const local = resolveConciergeKnowledge(userPrompt, locale);
      setChatState('speaking');
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: local.text,
          ctas: local.ctas,
        },
      ]);
      const t1 = setTimeout(() => {
        setChatState('idle');
      }, 2500);
      sequenceTimersRef.current.push(t1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    executeBotResponse(inputValue.trim());
  };

  const handleResetChat = () => {
    sequenceTimersRef.current.forEach((t) => clearTimeout(t));
    sequenceTimersRef.current = [];
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: dict.dotChat.resetMessage,
      },
    ]);
    setChatState('idle');
    setIsTyping(false);
  };

  return (
    <>
      {/* Botón Flotante Disparador */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
        }}
      >
        {!isOpen && (
          <div
            onClick={handleToggleOpen}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              background: '#131314',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backdropFilter: 'blur(8px)',
              userSelect: 'none',
            }}
            className="desktop-only"
          >
            <Sparkles size={13} color="#dc0000" />
            <span>{dict.dotChat.triggerBadge}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleToggleOpen}
          onMouseEnter={() => {
            if (!isOpen && chatState === 'idle') setChatState('listening');
          }}
          onMouseLeave={() => {
            if (!isOpen && chatState === 'listening') setChatState('idle');
          }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#131314',
            border: '2px solid #dc0000',
            boxShadow: '0 10px 30px rgba(220, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            outline: 'none',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          aria-label={dict.dotChat.triggerAria}
          title={dict.dotChat.triggerBadge}
        >
          {isOpen ? (
            <X size={24} color="#ffffff" />
          ) : (
            <DotChatAvatar size={48} state={chatState} />
          )}
        </button>
      </div>

      {/* Ventana de Chat Flotante */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            width: 'min(410px, 94vw)',
            height: '560px',
            maxHeight: 'calc(100vh - 7rem)',
            borderRadius: '20px',
            background: '#111114',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'var(--font-sans)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Cabecera del Chat con Dot reactivo */}
          <div
            style={{
              padding: '0.85rem 1rem',
              background: '#18181b',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <DotChatAvatar size={36} state={chatState} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
                    {dict.dotChat.headerTitle}
                  </span>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 6px #10b981',
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                  {chatState === 'thinking'
                    ? dict.dotChat.statusThinking
                    : chatState === 'listening'
                    ? dict.dotChat.statusListening
                    : dict.dotChat.headerSubtitle}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={handleResetChat}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  borderRadius: '6px',
                }}
                title={dict.dotChat.resetTitle}
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  borderRadius: '6px',
                }}
                title={dict.dotChat.closeTitle}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <div
            style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              background: '#0c0c0e',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '88%',
                    padding: '0.75rem 1rem',
                    borderRadius:
                      msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background: msg.sender === 'user' ? '#dc0000' : '#18181b',
                    border:
                      msg.sender === 'user'
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}
                >
                  {renderFormattedMessage(msg.text)}

                  {/* CTAs de acción directa */}
                  {msg.ctas && msg.ctas.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.75rem' }}>
                      {msg.ctas.map((cta, idx) => (
                        <a
                          key={idx}
                          href={cta.href}
                          target={cta.external !== false && cta.href.startsWith('http') ? '_blank' : '_self'}
                          rel={cta.external !== false && cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '6px',
                            background: 'rgba(220, 0, 0, 0.15)',
                            border: '1px solid rgba(220, 0, 0, 0.5)',
                            color: '#ffffff',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#dc0000';
                            e.currentTarget.style.borderColor = '#dc0000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(220, 0, 0, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(220, 0, 0, 0.5)';
                          }}
                        >
                          <span>{cta.label}</span>
                          <ExternalLink size={12} style={{ opacity: 0.85 }} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.75rem' }}>
                <span className="dot-pulse-ring" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc0000' }} />
                <span>{dict.dotChat.statusThinking}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 4 Píldoras Rápidas Comerciales */}
          <div
            style={{
              padding: '0.5rem 0.75rem',
              background: '#131314',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {[
              dict.dotChat.chips.whatIs,
              dict.dotChat.chips.publishersAuthors,
              dict.dotChat.chips.printersSuppliers,
              dict.dotChat.chips.aiAgentsMcp,
            ].map((chipText, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => executeBotResponse(chipText)}
                style={{
                  flexShrink: 0,
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  background: '#1c1c1f',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#e5e7eb',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#dc0000';
                  e.currentTarget.style.background = '#27272a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.background = '#1c1c1f';
                }}
              >
                {chipText}
              </button>
            ))}
          </div>

          {/* Formulario Input */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              padding: '0.75rem',
              background: '#18181b',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder={dict.dotChat.inputPlaceholder}
              style={{
                flex: 1,
                padding: '0.6rem 0.85rem',
                borderRadius: '10px',
                background: '#0f0f11',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                padding: '0.6rem 0.85rem',
                borderRadius: '10px',
                background: inputValue.trim() ? '#dc0000' : 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#ffffff',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s ease',
              }}
              aria-label={dict.dotChat.sendAria}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

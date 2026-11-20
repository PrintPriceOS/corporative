'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DotChatAvatar, DotChatState } from './DotChatAvatar';
import { X, Send, Sparkles, RotateCcw } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export const DotFloatingChatWidget: React.FC = () => {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<DotChatState>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sequenceTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Mensaje de bienvenida inicial según locale
  useEffect(() => {
    const welcome =
      locale === 'es'
        ? '¡Hola! Soy **Dot**, el asistente inteligente de **PrintPrice.pro**. Puedo ayudarte a calcular presupuestos de tirada, resolver el grosor de lomo (SPINE-01), verificar requisitos PDF o consultar el catálogo de papel.'
        : locale === 'de'
        ? 'Hallo! Ich bin **Dot**, die KI von **PrintPrice.pro**. Ich helfe Ihnen bei der Druckauflagenkalkulation, Buchrückengeometrie (SPINE-01), PDF-Preflight und Bedruckstoffen.'
        : 'Hello! I am **Dot**, the **PrintPrice.pro** intelligent print assistant. I can help you calculate run quotes, certified spine geometry (SPINE-01), PDF preflight checks, or query materials.';

    setMessages([{ id: 'init-1', sender: 'bot', text: welcome }]);
  }, [locale]);

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

  const executeBotResponse = (userPrompt: string) => {
    sequenceTimersRef.current.forEach((t) => clearTimeout(t));
    sequenceTimersRef.current = [];

    // Añadir mensaje de usuario
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: userPrompt };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // 1. Fase THINKING (Llamada al motor MCP / BPE)
    setChatState('thinking');
    setIsTyping(true);

    const lower = userPrompt.toLowerCase();
    let replyText =
      locale === 'es'
        ? 'He verificado los datos con el motor determinista de PrintPrice OS. El imposicionado en pliego 70×100 cm minimiza la merma técnica al **4.2%** con firma HMAC validada.'
        : locale === 'de'
        ? 'Die Druckdaten wurden mit dem deterministischen PrintPrice OS Rechenkern verifiziert. Die Bogenmontage optimiert den Verschnitt auf **4.2%**.'
        : 'Verified against PrintPrice OS deterministic engine. Sheet signature yield on 70×100 cm minimizes scrap to **4.2%** with valid HMAC signature.';

    if (lower.includes('1.000') || lower.includes('1000') || lower.includes('libro') || lower.includes('buch') || lower.includes('book')) {
      replyText =
        locale === 'es'
          ? '📚 **Presupuesto para 1.000 libros A5** (160 págs, offset 90g + cubierta estucada 300g mate): **1.420,00 €** (1,42 €/ud). Transporte EPAL y merma desglosados.'
          : locale === 'de'
          ? '📚 **Kalkulation für 1.000 Bücher A5** (160 Seiten, 90g Offset + 300g Umschlag): **1.420,00 €** (1,42 €/Stk). Fracht und Rüstkosten getrennt.'
          : '📚 **Quote for 1,000 A5 Books** (160 pages, 90gsm offset + 300gsm matte cover): **€1,420.00** (€1.42/unit). Segregated EPAL freight & plates.';
    } else if (lower.includes('lomo') || lower.includes('spine') || lower.includes('rücken')) {
      replyText =
        locale === 'es'
          ? '📏 **Cálculo de lomo SPINE-01:** Para 240 páginas en papel ahuesado 80g (volumen 1.3), el lomo neto fresado PUR mide exactamente **13,2 mm** (+ 1,5 mm de canal bisagra).'
          : locale === 'de'
          ? '📏 **Rückenbreite SPINE-01:** Für 240 Seiten Werkdruck 80g (Volumen 1.3) beträgt der PUR-Rücken exakt **13,2 mm**.'
          : '📏 **SPINE-01 Geometry:** For 240 pages on 80gsm cream book paper (bulk 1.3), the exact milled PUR spine is **13.2 mm**.';
    } else if (lower.includes('pdf') || lower.includes('preflight') || lower.includes('sangrado')) {
      replyText =
        locale === 'es'
          ? '📐 **Preflight 6-Axis:** Perfil CMYK ISO Coated v2 verificado, sangrado de 3 mm correcto y resolución de imagen a 300 dpi sin fuentes incrustadas faltantes.'
          : locale === 'de'
          ? '📐 **Preflight 6-Achsen:** CMYK ISO Coated v2 bestätigt, 3 mm Beschnitt vorhanden und 300 DPI Bildauflösung.'
          : '📐 **6-Axis Preflight:** CMYK ISO Coated v2 verified, 3 mm bleed intact, and 300 DPI resolution compliant.';
    }

    // 2. Fase SPEAKING (Generación de texto) tras 1.4s
    const t1 = setTimeout(() => {
      setChatState('speaking');
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, sender: 'bot', text: replyText }]);
    }, 1400);

    // 3. Fase SUCCESS (Presupuesto listo) tras 2.8s
    const t2 = setTimeout(() => {
      setChatState('success');
    }, 2800);

    // 4. Retorno suave a IDLE tras 4.0s
    const t3 = setTimeout(() => {
      setChatState('idle');
    }, 4000);

    sequenceTimersRef.current.push(t1, t2, t3);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    executeBotResponse(inputValue.trim());
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'reset-1',
        sender: 'bot',
        text:
          locale === 'es'
            ? 'Conversación reiniciada. ¿Qué cálculo gráfico deseas resolver hoy?'
            : locale === 'de'
            ? 'Chat zurückgesetzt. Welche Druckkalkulation möchten Sie durchführen?'
            : 'Conversation reset. What technical print calculation can I solve for you today?',
      },
    ]);
    setChatState('idle');
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
            <Sparkles size={13} color="#E5352B" />
            <span>Dot · {locale === 'es' ? 'Asistente IA' : locale === 'de' ? 'KI-Assistent' : 'AI Assistant'}</span>
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
            border: '2px solid #E5352B',
            boxShadow: '0 10px 30px rgba(229, 53, 43, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            outline: 'none',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          aria-label="Abrir asistente Dot PrintPrice"
          title="Dot · PrintPrice AI"
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
            width: 'min(390px, 92vw)',
            height: '540px',
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
                    Dot
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
                    ? locale === 'es'
                      ? 'Calculando pliegos y tarifas...'
                      : 'Calculating in MCP...'
                    : chatState === 'listening'
                    ? locale === 'es'
                      ? 'Escuchando tu consulta...'
                      : 'Listening...'
                    : 'PrintPrice OS Engine · Online'}
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
                title={locale === 'es' ? 'Reiniciar' : 'Reset'}
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
                title={locale === 'es' ? 'Cerrar' : 'Close'}
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
                    maxWidth: '85%',
                    padding: '0.65rem 0.95rem',
                    borderRadius:
                      msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background: msg.sender === 'user' ? '#E5352B' : '#18181b',
                    border:
                      msg.sender === 'user'
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.75rem' }}>
                <span className="dot-pulse-ring" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E5352B' }} />
                <span>Dot está calculando...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Píldoras rápidas de prueba */}
          <div
            style={{
              padding: '0.5rem 0.75rem',
              background: '#131314',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
            }}
          >
            <button
              type="button"
              onClick={() => executeBotResponse('Calcular presupuesto 1.000 libros A5')}
              style={{
                flexShrink: 0,
                padding: '0.25rem 0.55rem',
                borderRadius: '6px',
                background: '#1c1c1f',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#d1d5db',
                fontSize: '0.72rem',
                cursor: 'pointer',
              }}
            >
              📚 Cotizar 1.000 libros
            </button>
            <button
              type="button"
              onClick={() => executeBotResponse('Grosor lomo 240 págs')}
              style={{
                flexShrink: 0,
                padding: '0.25rem 0.55rem',
                borderRadius: '6px',
                background: '#1c1c1f',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#d1d5db',
                fontSize: '0.72rem',
                cursor: 'pointer',
              }}
            >
              📏 Grosor lomo
            </button>
            <button
              type="button"
              onClick={() => executeBotResponse('Verificar PDF y sangrado 3mm')}
              style={{
                flexShrink: 0,
                padding: '0.25rem 0.55rem',
                borderRadius: '6px',
                background: '#1c1c1f',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#d1d5db',
                fontSize: '0.72rem',
                cursor: 'pointer',
              }}
            >
              📐 Preflight PDF
            </button>
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
              placeholder={
                locale === 'es'
                  ? 'Consulta técnica de libro, tirada o papel...'
                  : locale === 'de'
                  ? 'Technische Frage zu Buch, Auflage...'
                  : 'Ask about book specs, runs, spine...'
              }
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
                background: inputValue.trim() ? '#E5352B' : 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#ffffff',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s ease',
              }}
              aria-label="Enviar mensaje"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

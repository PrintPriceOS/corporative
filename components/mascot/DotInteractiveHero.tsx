'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './dot-ppp.css';

export interface DotInteractiveHeroProps {
  size?: number;
  enableEyeTracking?: boolean;
  interactiveTags?: boolean;
  className?: string;
  glow?: boolean;
  onToolSelect?: (tool: string) => void;
}

interface ToolTag {
  id: string;
  label: string;
  color: string;
  dotColor: string;
  position: React.CSSProperties;
  targetOffset: { x: number; y: number };
}

const DEFAULT_TOOL_TAGS: ToolTag[] = [
  {
    id: 'calc_spine',
    label: 'calc_spine()',
    color: '#e5e7eb',
    dotColor: '#E5352B',
    position: { top: '8px', left: '-20px' },
    targetOffset: { x: -14, y: -10 },
  },
  {
    id: 'preflight_pdf',
    label: 'preflight_pdf()',
    color: '#e5e7eb',
    dotColor: '#10b981',
    position: { top: '16px', right: '-24px' },
    targetOffset: { x: 14, y: -8 },
  },
  {
    id: 'imposition_sheet',
    label: 'imposition_sheet()',
    color: '#e5e7eb',
    dotColor: '#f59e0b',
    position: { bottom: '24px', left: '-28px' },
    targetOffset: { x: -12, y: 11 },
  },
  {
    id: 'pallet_3d',
    label: 'pallet_3d()',
    color: '#e5e7eb',
    dotColor: '#38bdf8',
    position: { bottom: '20px', right: '-20px' },
    targetOffset: { x: 13, y: 10 },
  },
];

export const DotInteractiveHero: React.FC<DotInteractiveHeroProps> = ({
  size = 220,
  enableEyeTracking = true,
  interactiveTags = false,
  className = '',
  glow = true,
  onToolSelect,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<SVGGElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const eyeLRef = useRef<SVGCircleElement | null>(null);
  const eyeRRef = useRef<SVGCircleElement | null>(null);

  const [squish, setSquish] = useState('scale(1, 1)');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Targets de interpolación física
  const physicsRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    scaleX: 1,
    scaleY: 1,
    velScaleX: 0,
    velScaleY: 0,
    isHovered: false,
    lockTarget: null as { x: number; y: number } | null,
  });

  // Parpadeo orgánico autónomo
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (eyeLRef.current && eyeRRef.current) {
        eyeLRef.current.style.transition = 'transform 0.09s ease-in-out';
        eyeRRef.current.style.transition = 'transform 0.09s ease-in-out';
        eyeLRef.current.style.transform = 'scaleY(0.08) scaleX(1.1)';
        eyeRRef.current.style.transform = 'scaleY(0.08) scaleX(1.1)';

        setTimeout(() => {
          if (eyeLRef.current && eyeRRef.current) {
            eyeLRef.current.style.transform = 'scaleY(1) scaleX(1)';
            eyeRRef.current.style.transform = 'scaleY(1) scaleX(1)';
          }
        }, 120);
      }
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Seguimiento con Eye-Tracking y física de paralaje 3D (30% cuerpo, 100% ojos)
  useEffect(() => {
    if (!enableEyeTracking) return;

    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (physicsRef.current.lockTarget) return; // Si está mirando una herramienta fijada
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / (rect.width * 0.7);
      const dy = (e.clientY - centerY) / (rect.height * 0.7);

      const dist = Math.hypot(dx, dy);
      const maxRadius = 1.0;
      const clampFactor = dist > maxRadius ? maxRadius / dist : 1;

      physicsRef.current.targetX = dx * clampFactor * 16;
      physicsRef.current.targetY = dy * clampFactor * 14;
    };

    const handleMouseLeave = () => {
      if (!physicsRef.current.lockTarget) {
        physicsRef.current.targetX = 0;
        physicsRef.current.targetY = 0;
      }
      physicsRef.current.isHovered = false;
    };

    const handleMouseEnter = () => {
      physicsRef.current.isHovered = true;
    };

    const tick = () => {
      const p = physicsRef.current;

      // Lerp suave para la posición de los ojos
      p.currentX += (p.targetX - p.currentX) * 0.14;
      p.currentY += (p.targetY - p.currentY) * 0.14;

      // Paralaje 3D: Cuerpo se mueve al 30%, Ojos al 100%
      const bodyX = (p.currentX * 0.3).toFixed(2);
      const bodyY = (p.currentY * 0.3).toFixed(2);
      const eyeX = p.currentX.toFixed(2);
      const eyeY = p.currentY.toFixed(2);

      bodyRef.current?.setAttribute('transform', `translate(${bodyX}, ${bodyY})`);
      eyesRef.current?.setAttribute('transform', `translate(${eyeX}, ${eyeY})`);

      // Sombra dinámica de suelo
      if (shadowRef.current) {
        const shadowScale = (1 - Math.abs(p.currentY) / 60).toFixed(3);
        shadowRef.current.style.transform = `scaleX(${shadowScale})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [enableEyeTracking]);

  // Rebote elástico al hacer clic (Squash & Stretch)
  const handleBounce = useCallback(() => {
    setSquish('scale(1.18, 0.84)');
    setTimeout(() => setSquish('scale(0.92, 1.10)'), 120);
    setTimeout(() => setSquish('scale(1.05, 0.96)'), 220);
    setTimeout(() => setSquish('scale(1, 1)'), 320);
  }, []);

  // Control magnético al posarse sobre una herramienta MCP
  const handleTagHover = (tag: ToolTag | null) => {
    if (tag) {
      physicsRef.current.lockTarget = tag.targetOffset;
      physicsRef.current.targetX = tag.targetOffset.x;
      physicsRef.current.targetY = tag.targetOffset.y;
      setActiveTool(tag.id);
    } else {
      physicsRef.current.lockTarget = null;
      physicsRef.current.targetX = 0;
      physicsRef.current.targetY = 0;
      setActiveTool(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        overflow: 'visible',
      }}
    >
      {/* Resplandor ambiental suave en rojo PrintPrice */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            width: size * 1.3,
            height: size * 1.3,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229, 53, 43, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Etiquetas interactivas flotantes MCP */}
      {interactiveTags && (
        <div
          style={{
            position: 'absolute',
            inset: '-30px',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {DEFAULT_TOOL_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onMouseEnter={() => handleTagHover(tag)}
              onMouseLeave={() => handleTagHover(null)}
              onClick={() => {
                handleBounce();
                onToolSelect?.(tag.id);
              }}
              style={{
                position: 'absolute',
                ...tag.position,
                pointerEvents: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                background: activeTool === tag.id ? 'rgba(229, 53, 43, 0.15)' : 'rgba(15, 23, 42, 0.85)',
                border: activeTool === tag.id ? '1px solid #E5352B' : '1px solid rgba(255, 255, 255, 0.15)',
                color: activeTool === tag.id ? '#ffffff' : '#e2e8f0',
                fontSize: '0.725rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
                boxShadow: activeTool === tag.id ? '0 0 16px rgba(229, 53, 43, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: tag.dotColor,
                }}
              />
              <span>{tag.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Contenedor de Flotación Gravedad Cero + Squash & Stretch */}
      <div
        className="dot-hero-float"
        onClick={handleBounce}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          overflow: 'visible',
        }}
        title="Haz clic sobre Dot o mueve el ratón"
      >
        {/* Esfera SVG con transformaciones elásticas */}
        <div
          style={{
            transform: squish,
            transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
              filter: 'drop-shadow(0 20px 35px rgba(229, 53, 43, 0.28))',
            }}
          >
            {/* Grupo Cuerpo: 30% Paralaje */}
            <g ref={bodyRef} className="dot-body-group">
              <circle cx="100" cy="100" r="88" fill="#E5352B" />
            </g>

            {/* Grupo Ojos: 100% Paralaje */}
            <g ref={eyesRef} className="dot-eyes-group">
              <circle
                ref={eyeLRef}
                className="dot-eye"
                cx="74"
                cy="78"
                r="19"
                fill="#FFFFFF"
              />
              <circle
                ref={eyeRRef}
                className="dot-eye"
                cx="126"
                cy="78"
                r="19"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </div>

        {/* Sombra de suelo dinámica */}
        <div
          ref={shadowRef}
          style={{
            position: 'absolute',
            bottom: '-18px',
            width: size * 0.55,
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.35)',
            filter: 'blur(4px)',
            transition: 'transform 0.15s ease-out',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

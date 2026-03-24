'use client';

import { useRef, useCallback, useState, type ReactNode } from 'react';

/**
 * BORDER GLOW v3.3 - "VANTAGE CSS MONITOR"
 * 
 * Immune to React state updates for visibility.
 * Uses CSS variables for hover detection and opacity.
 */

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  backgroundColor?: string;
  borderRadius?: number;
  colors?: string[];
  borderWidth?: number;
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  backgroundColor = 'var(--bg-surface-glass)',
  borderRadius = 0,
  colors = ['#ff0000', '#ff4d4d', '#cc0000'],
  borderWidth = 2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -2000, y: -2000 });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-container group ${className}`}
      style={{
        position: 'relative',
        overflow: 'visible',
        borderRadius: `${borderRadius}px`,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        '--glow-opacity': '0', // Initial state
        ...({} as any)
      }}
    >
      {/* 1. ATMOSPHERIC PROJECTION (BEHIND GLASS LAYER) */}
      <div 
        className="glow-projection absolute inset-[-120px] pointer-events-none"
        style={{
          opacity: 'var(--glow-opacity)', 
          background: `radial-gradient(550px circle at ${mousePos.x + 120}px ${mousePos.y + 120}px, rgba(220, 0, 0, 0.22), transparent 85%)`,
          transition: 'opacity 0.7s ease',
          zIndex: -1,
          ...({} as any)
        }}
      />

      {/* 2. GLASS PANEL REFRACTOR (SEMI-OPAQUE SURFACE) */}
      <div 
        className="glass-panel absolute inset-0 pointer-events-none"
        style={{
          background: backgroundColor,
          backdropFilter: 'blur(35px) saturate(230%)',
          WebkitBackdropFilter: 'blur(35px) saturate(230%)',
          borderRadius: 'inherit',
          border: '1px solid var(--border-color)',
          zIndex: 1,
          transition: 'background-color 0.4s ease',
          ...({} as any)
        }}
      />

      {/* 3. LASER PERIMETER TRACER (TOP LAYER) */}
      <div 
        className="tracer-layer absolute inset-0 pointer-events-none"
        style={{
          opacity: 'var(--glow-opacity)',
          transition: 'opacity 0.2s ease',
          zIndex: 4,
          padding: `${borderWidth}px`,
          background: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, ${colors[0]} 0%, ${colors[1]} 50%, transparent 100%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          ...({} as any)
        }}
      />

      {/* VANTAGE CSS ENGINE (FORCED HOVER LOGIC) */}
      <style>{`
        .border-glow-container:hover {
            --glow-opacity: 1 !important;
            border-color: rgba(220, 0, 0, 0.45) !important;
            transform: translateY(-12px) scale(1.03);
            z-index: 10;
        }
        .product-card-glow {
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
            box-shadow: 0 0 0 0 rgba(220, 0, 0, 0);
        }
        .product-card-glow:hover {
            box-shadow: 0 50px 100px -20px rgba(0,0,0,0.7), 0 0 40px -10px rgba(220, 0, 0, 0.2);
        }
        [data-theme='light'] .border-glow-container:hover {
            background-color: rgba(255, 255, 255, 0.45) !important;
            border-color: var(--accent-primary) !important;
        }
      `}</style>

      {/* 5. CONTENT WRAPPER */}
      <div className="content-wrapper relative z-[3] h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;

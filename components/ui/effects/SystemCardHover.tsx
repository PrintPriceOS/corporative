'use client';

import React, { type ReactNode } from 'react';

/**
 * SYSTEM CARD HOVER v1.0 - "OPERATIONAL FRAME"
 * 
 * A lightweight, CSS-only hover effect for standard system cards.
 * Minimal, sharp, and deterministic. No pointermove overhead.
 */

interface SystemCardHoverProps {
  children?: ReactNode;
  className?: string;
  borderRadius?: number;
  priority?: boolean;
}

export const SystemCardHover: React.FC<SystemCardHoverProps> = ({
  children,
  className = '',
  borderRadius = 0,
  priority = false
}) => {
  return (
    <div
      className={`system-card-hover group ${className} ${priority ? 'priority-card' : ''}`}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {/* 1. Subtle Perimeter Glow (Visible on hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at top center, var(--accent-primary) 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      {/* 2. Top-Edge Highlight (Deterministic Signal) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-accent-primary transition-all duration-400 ease-out z-[2]"
        style={{
            background: 'var(--accent-primary)',
            boxShadow: '0 0 10px var(--accent-primary)',
        }}
      />

      {/* 3. Content Wrapper */}
      <div className="relative z-[1] h-full w-full">
        {children}
      </div>

      <style jsx>{`
        .system-card-hover:hover {
            border-color: rgba(220, 0, 0, 0.3) !important;
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .priority-card {
            border-color: rgba(220, 0, 0, 0.15);
        }
        .priority-card:hover {
            border-color: var(--accent-primary) !important;
            box-shadow: 0 20px 40px rgba(220, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default SystemCardHover;

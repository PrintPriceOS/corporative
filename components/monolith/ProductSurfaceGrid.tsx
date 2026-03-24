'use client';

import React from 'react';
import { Section } from '../ui/Section';
import Link from 'next/link';
import { Icon, IconName } from '../ui/Icon';
import { trackEvent, events } from '@/lib/telemetry';

import { SystemCardHover } from '../ui/effects/SystemCardHover';

interface ProductItem {
  name: string;
  description: string;
  code: string;
  href: string;
  ctaText?: string;
  status?: string;
  category?: string;
  priority?: boolean;
  icon?: IconName;
}

interface ProductSurfaceGridProps {
  products: ProductItem[];
  title: string;
  subtitle?: string;
  variant?: 'primary' | 'secondary';
  showGrid?: boolean;
  showNumbers?: boolean;
}

export const ProductSurfaceGrid: React.FC<ProductSurfaceGridProps> = ({ 
    products, 
    title, 
    subtitle,
    variant = 'secondary', 
    showGrid = true,
    showNumbers = false
}) => {
  // Group products by category if present
  const groups: Record<string, ProductItem[]> = {};
  products.forEach(p => {
    const cat = p.category || 'DEFAULT';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(p);
  });

  const groupKeys = Object.keys(groups);

  return (
    <Section variant={variant} showGrid={showGrid}>
      <style>{`
        .product-grid-header {
          margin-bottom: clamp(4rem, 10vw, 8rem);
        }
        .category-header {
            grid-column: 1 / -1;
            padding: 1rem 0;
            border-bottom: 1px solid var(--border-color);
            margin-top: 4rem;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .category-header:first-child {
            margin-top: 0;
        }
      `}</style>
      <div className="product-grid-header">
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', letterSpacing: '-0.05em', marginBottom: '1.5rem', ...({} as any) }}>{title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2.8vw, 1.3rem)', maxWidth: '800px', lineHeight: 1.5, ...({} as any) }}>
          {subtitle || "Coordinated surfaces engineered for unified orchestration and intent-driven activation."}
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(300px, 100%, 450px), 1fr))', 
        gap: '2.5rem', 
        ...({} as any)
      }}>
        {groupKeys.map((groupKey) => (
          <React.Fragment key={groupKey}>
            {groupKey !== 'DEFAULT' && (
              <div className="category-header">
                <div style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', opacity: 0.5 }} />
                <h4 className="technical-text" style={{ fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.6, fontWeight: 900 }}>{groupKey}</h4>
              </div>
            )}
            {groups[groupKey].map((product, i) => (
              <div 
                key={product.name}
                style={{ 
                    gridColumn: 'auto',
                    height: '100%',
                    ...({} as any)
                }}
              >
                <SystemCardHover 
                    borderRadius={0}
                    priority={product.priority}
                >
                    <div style={{ padding: 'clamp(2.5rem, 8vw, 4rem)', position: 'relative', overflow: 'hidden', height: '100%', ...(product.priority ? { border: '1px solid rgba(220,0,0,0.1)' } : {}), ...({} as any) }} data-monolith-action="icon_visible">
                    
                    {/* FLOW NUMBER - BACKGROUND STYLE */}
                    {showNumbers && (
                        <div className="technical-text" style={{ 
                            position: 'absolute', 
                            top: '2rem', 
                            right: '2.5rem', 
                            fontSize: '4rem', 
                            fontWeight: 900, 
                            color: 'var(--text-primary)', 
                            opacity: 0.03, 
                            pointerEvents: 'none' 
                        }}>
                        0{i + 1}
                        </div>
                    )}

                    {/* TOP ROW: ICON + (CODE / STATUS) */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '3rem', ...({} as any) }}>
                        {product.icon && (
                            <div style={{ 
                            display: 'flex', 
                            height: '3.5rem', 
                            width: '3.5rem', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            border: `1px solid ${product.priority ? 'var(--accent-primary)' : 'var(--border-color)'}`, 
                            background: 'var(--bg-secondary)',
                            opacity: product.priority ? 1 : 0.6,
                            ...({} as any)
                            }}>
                            <Icon name={product.icon} size={32} style={{ color: product.priority ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                            {product.status && (
                                <span className="technical-text" style={{ 
                                    fontSize: '0.6rem', 
                                    padding: '0.2rem 0.6rem', 
                                    border: `1px solid ${product.priority ? 'var(--accent-primary)' : 'var(--text-muted)'}`,
                                    color: product.priority ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    fontWeight: 800,
                                    letterSpacing: '0.1em'
                                }}>
                                    {product.status}
                                </span>
                            )}
                            {product.code && (
                                <span className="technical-text" style={{ 
                                fontSize: '0.6rem', 
                                color: 'var(--text-muted)',
                                letterSpacing: '0.1em',
                                opacity: 0.5,
                                ...({} as any)
                                }}>{product.code}</span>
                            )}
                        </div>
                    </div>

                    <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.75rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem', color: 'var(--text-primary)', ...({} as any) }}>
                        {product.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, marginBottom: '3rem', maxWidth: '30ch', fontWeight: 400, opacity: 0.8, ...({} as any) }}>
                        {product.description}
                    </p>
                    <Link 
                        href={product.href} 
                        className="nav-link-technical" 
                        data-monolith-action={`product_entry_${product.name}`}
                        style={{ 
                            color: product.priority ? 'var(--accent-primary)' : 'var(--text-muted)', 
                            fontSize: '0.75rem', 
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            ...({} as any)
                        }}
                        onClick={() => {
                            trackEvent(events.PRODUCT_CARD_CLICK, { product: product.name, href: product.href });
                            trackEvent(events.DECISION_MADE, { action: "product_entry", target: product.name });
                        }}
                        >
                        {product.ctaText || "AUDIT YOUR COST"}
                        <span style={{ fontSize: '1rem', ...({} as any) }}>→</span>
                    </Link>
                    </div>
                </SystemCardHover>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
};

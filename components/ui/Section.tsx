import React from 'react';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'bright' | 'dark' | 'transparent';
  showGrid?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  variant = 'primary', 
  showGrid = true,
  className = '', 
  style = {},
  ...props 
}) => {
  // THE MONOLITH SURFACE HIERARCHY
  const getBgColor = () => {
    switch (variant) {
      case 'secondary': return 'var(--bg-secondary)'; // #0e0e0f (Lowest Surface)
      case 'bright': return 'var(--bg-elevated)';    // #3a393a (Bright Surface)
      case 'transparent': return 'transparent';
      case 'dark':
      case 'primary': 
      default: return 'var(--bg-primary)';           // #131314 (Base)
    }
  };
  
  return (
    <section 
      className={`section ${className}`}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: getBgColor(),
        backgroundImage: (variant === 'secondary' && showGrid)
          ? `linear-gradient(rgba(220, 0, 0, 0.1) 1px, transparent 1px), 
             linear-gradient(90deg, rgba(220, 0, 0, 0.1) 1px, transparent 1px)` 
          : 'none',
        backgroundSize: '24px 24px',
        position: 'relative',
        overflow: 'hidden',
        ...style,
        ...({} as any)
      }}
      {...props}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
};

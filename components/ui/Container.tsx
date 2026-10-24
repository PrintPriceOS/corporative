import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'normal' | 'wide' | 'narrow';
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  size = 'normal', 
  style,
  ...props 
}) => {
  const maxWidth = size === 'normal' ? 'var(--max-width, 1280px)' : size === 'wide' ? '100%' : '800px';
  
  return (
    <div 
      className={`container ${className}`}
      style={{
        width: '100%',
        maxWidth,
        margin: '0 auto',
        padding: '0 clamp(1rem, 3.5vw, 2rem)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

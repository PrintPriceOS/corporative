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
  const maxWidth = size === 'normal' ? 'var(--max-width)' : size === 'wide' ? '100%' : '800px';
  
  return (
    <div 
      className={`container ${className}`}
      style={{
        width: '100%',
        maxWidth,
        margin: '0 auto',
        padding: '0 2rem',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

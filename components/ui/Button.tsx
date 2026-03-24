import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  style = {},
  ...props 
}) => {
  const getPadding = () => {
    switch(size) {
      case 'sm': return '0.5rem 1rem';
      case 'lg': return '1.25rem 3rem';
      case 'md':
      default: return '0.85rem 2rem';
    }
  };

  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      style={{
        padding: getPadding(),
        ...style,
        ...({} as any)
      }}
      {...props}
    >
      {children}
    </button>
  );
};

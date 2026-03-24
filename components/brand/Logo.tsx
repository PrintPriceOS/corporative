'use client';

import React from 'react';
import Image from 'next/image';

/**
 * PRINTPRICE PRIMARY BRAND LOGO - PNG v2.6
 * Using official raster asset for pixel-perfect brand representation.
 */

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 32
}) => {
  return (
    <div 
        className={`relative ${className}`} 
        style={{ 
            width: size, 
            height: size,
            flexShrink: 0
        }}
    >
        <Image 
            src="/assets/logo.png" 
            alt="PrintPrice Pro Logo"
            width={size}
            height={size}
            className="object-contain"
            priority
        />
    </div>
  );
};

export default Logo;

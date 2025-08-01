import React from 'react';
import logoImage from '../assets/Crmonce logo.png';

interface CRMONCELogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

const CRMONCELogo: React.FC<CRMONCELogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    sm: {
      icon: 'w-12 h-12', // Reduced for better header fit
      text: 'text-lg',
      full: 'text-sm',
      tagline: 'text-xs'
    },
    md: {
      icon: 'w-16 h-16', // Reduced for better header fit
      text: 'text-2xl',
      full: 'text-lg',
      tagline: 'text-sm'
    },
    lg: {
      icon: 'w-20 h-20', // Reduced for better header fit
      text: 'text-3xl',
      full: 'text-xl',
      tagline: 'text-base'
    }
  };

  const LogoIcon = () => (
    <div className={`${sizeClasses[size].icon} relative flex items-center justify-center ${className}`}>
      <img 
        src={logoImage} 
        alt="CRMONCE Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );

  const LogoText = () => (
    <div className={`font-bold ${sizeClasses[size].text} ${className}`}>
      <span className="text-blue-600">
        CRM<span className="text-gray-800 font-normal">|</span>ONCE
      </span>
    </div>
  );

  const LogoFull = () => (
    <div className={`flex items-center ${className}`}>
      <LogoIcon />
    </div>
  );

  switch (variant) {
    case 'icon':
      return <LogoIcon />;
    case 'text':
      return <LogoText />;
    case 'full':
    default:
      return <LogoFull />;
  }
};

export default CRMONCELogo; 
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  as?: 'button' | 'link';
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  disabled,
  as = 'button',
  to,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-200 transform active:scale-95
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-600 to-primary-700 
      hover:from-primary-700 hover:to-primary-800
      text-white shadow-lg hover:shadow-xl
      focus:ring-primary-500
    `,
    secondary: `
      bg-white border-2 border-primary-600 
      hover:bg-primary-50 text-primary-600
      shadow-sm hover:shadow-md
      focus:ring-primary-500
    `,
    accent: `
      bg-gradient-to-r from-accent-500 to-accent-600
      hover:from-accent-600 hover:to-accent-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-accent-500
    `,
    ghost: `
      bg-transparent hover:bg-gray-100
      text-gray-700 hover:text-gray-900
      focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-red-500
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const content = (
    <>
      {loading ? (
        <div className="flex items-center">
          <svg 
            className={`animate-spin -ml-1 mr-2 ${iconSizeClasses[size]}`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className={`mr-2 ${iconSizeClasses[size]}`}>
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className={`ml-2 ${iconSizeClasses[size]}`}>
              {icon}
            </span>
          )}
        </>
      )}
    </>
  );

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  if (as === 'link' && to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
      >
        {content}
      </Link>
    );
  }

  const { onAnimationStart, onAnimationEnd, onDragStart, onDrag, onDragEnd, ...buttonProps } = props;

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {content}
    </motion.button>
  );
};

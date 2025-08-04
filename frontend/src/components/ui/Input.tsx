import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface InputProps extends Omit<HTMLMotionProps<"input">, 'children'> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'minimal';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl border transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-primary-500/20
    disabled:opacity-50 disabled:cursor-not-allowed
    ${leftIcon ? 'pl-12' : ''}
    ${rightIcon ? 'pr-12' : ''}
  `;

  const variantClasses = {
    default: `
      border-gray-300 bg-white
      focus:border-primary-500 hover:border-gray-400
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
    `,
    filled: `
      border-transparent bg-gray-100
      focus:bg-white focus:border-primary-500 hover:bg-gray-50
      ${error ? 'bg-red-50 focus:border-red-500 focus:ring-red-500/20' : ''}
    `,
    minimal: `
      border-transparent border-b-2 border-b-gray-300 rounded-none
      focus:border-b-primary-500 hover:border-b-gray-400
      ${error ? 'border-b-red-500 focus:border-b-red-500 focus:ring-red-500/20' : ''}
    `
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <motion.input
          whileFocus={{ scale: 1.01 }}
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${className}
          `}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
};

'use client';

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Industrial-grade Polymorphic Button
 * Uses standard HTML button attributes to allow for onClick, disabled, type, etc.
 */
export default function PrimaryButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // 1. VARIANT MAPPING
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-500 hover:to-indigo-600 shadow-md shadow-blue-500/20',
    secondary:
      'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    ghost:
      'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5',
  };

  // 2. SIZE MAPPING
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      disabled={loading || disabled}
      className={`
        relative inline-flex items-center justify-center rounded-xl font-bold 
        transition-all duration-300 active:scale-[0.98] 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        overflow-hidden cursor-pointer group
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {/* SHINE EFFECT */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 skew-x-[30deg] pointer-events-none" />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <LoadingSpinner />
            <span className="animate-pulse">Please wait...</span>
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}

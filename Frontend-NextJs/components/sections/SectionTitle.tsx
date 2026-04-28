'use client';

interface SectionTitleProps {
  title: string;
  description?: string;
  align?: 'center' | 'left' | 'right';
  badge?: string;
  variant?: 'default' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SectionTitle({
  title,
  description,
  align = 'center',
  badge = 'Overview',
  variant = 'default',
  size = 'sm',
  className = '',
}: SectionTitleProps) {
  // 1. Logic Mappings (Keeps the Return statement readable)
  const alignments = {
    center: 'text-center items-center mx-auto',
    left: 'text-left items-start',
    right: 'text-right items-end ml-auto',
  };

  const variants = {
    default: 'bg-transparent',
    muted:
      'bg-gray-50 dark:bg-slate-900/60 dark:border-y dark:border-white/5 border-y border-gray-200/60 backdrop-blur-xl',
  };

  const sizes = {
    sm: 'py-12 px-6',
    md: 'py-20 px-8',
    lg: 'py-28 px-12',
  };

  return (
    <section
      className={`transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <div
        className={`max-w-6xl mx-auto flex flex-col ${alignments[align]} ${sizes[size]}`}
      >
        {/* BADGE */}
        <span className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-blue-600/70 dark:text-cyan-400/70">
          {badge}
        </span>

        {/* TITLE */}
        <div className="relative inline-block">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          {/* Animated Underline */}
          <span className="absolute left-0 -bottom-2 h-[2px] w-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-cyan-400 dark:to-blue-500" />
        </div>

        {/* DESCRIPTION */}
        {description && (
          <p className="mt-4 text-sm leading-relaxed max-w-2xl text-slate-500 dark:text-white/60">
            {description}
          </p>
        )}

        {/* DIVIDER */}
        <div
          className={`mt-6 h-[1px] w-24 rounded-full bg-gradient-to-r from-blue-500/50 to-indigo-500/50 dark:from-cyan-400/60 dark:to-blue-500/60 ${align === 'center' ? 'mx-auto' : ''}`}
        />
      </div>
    </section>
  );
}

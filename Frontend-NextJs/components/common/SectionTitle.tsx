'use client';

import { useTheme } from 'next-themes';

type Props = {
  title: string;
  description?: string;
  align?: 'center' | 'left' | 'right';
  badge?: string;
  variant?: 'default' | 'muted';
  size?: 'sm' | 'md' | 'lg';
};

export default function SectionTitle({
  title,
  description,
  align = 'center',
  badge = 'Overview',
  variant = 'default',
  size = 'sm',
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isCentered = align === 'center';
  const isRight = align === 'right';

  /* BACKGROUND (FIXED) */
  const bgClass =
    variant === 'default'
      ? 'bg-transparent'
      : isDark
        ? 'bg-slate-900/60 backdrop-blur-xl border-y border-white/5'
        : 'bg-gray-50 border-y border-gray-200/60';

  /* SPACING SYSTEM (clean naming) */
  const paddingClass = {
    sm: 'py-12 px-6',
    md: 'py-20 px-8',
    lg: 'py-28 px-12',
  };

  /* ALIGNMENT */
  const alignClass = isCentered
    ? 'text-center items-center'
    : isRight
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <section
      className={`
        transition-colors duration-300
        ${bgClass}
      `}
    >
      <div
        className={`
          max-w-6xl mx-auto flex flex-col
          ${alignClass}
          ${paddingClass[size]}
        `}
      >
        {/* BADGE */}
        <span
          className={`
            text-[11px] tracking-[0.25em] uppercase font-medium mb-3

            ${isDark ? 'text-cyan-400/70' : 'text-blue-600/70'}
          `}
        >
          {badge}
        </span>

        {/* TITLE */}
        <h1
          className={`
            relative inline-block
            text-3xl md:text-4xl font-semibold tracking-tight

            ${isDark ? 'text-white' : 'text-slate-900'}
          `}
        >
          {title}

          {/* underline */}
          <span
            className={`
              absolute left-0 -bottom-2
              h-[2px] w-full scale-x-0 origin-left
              hover:scale-x-100
              transition-transform duration-500

              ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              }
            `}
          />
        </h1>

        {/* DESCRIPTION */}
        {description && (
          <p
            className={`
              mt-4 text-sm leading-relaxed max-w-2xl

              ${isDark ? 'text-white/60' : 'text-slate-500'}
            `}
          >
            {description}
          </p>
        )}

        {/* DIVIDER */}
        <div
          className={`
            mt-6 h-[1px] w-24 rounded-full

            ${
              isDark
                ? 'bg-gradient-to-r from-cyan-400/60 to-blue-500/60'
                : 'bg-gradient-to-r from-blue-500/50 to-indigo-500/50'
            }
          `}
        />
      </div>
    </section>
  );
}

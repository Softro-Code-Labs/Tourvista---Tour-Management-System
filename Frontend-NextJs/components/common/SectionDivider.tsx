'use client';

import { useTheme } from 'next-themes';

export default function SectionDivider() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full flex justify-center">
      <div
        className={`
          h-[1px] w-2/3 rounded-full

          ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent'
          }
        `}
      />
    </div>
  );
}

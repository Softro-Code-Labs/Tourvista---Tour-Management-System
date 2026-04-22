'use client';

import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './common/ThemeToggle';

export default function TopBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="h-16 sticky top-0 z-50 bg-slate-900 border-b border-white/10" />
    );
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="h-16 flex items-center justify-between px-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="
              group flex items-center gap-2
              px-4 py-2 rounded-xl

              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white text-sm font-medium

              shadow-lg shadow-cyan-500/20
              hover:shadow-cyan-500/40
              hover:scale-[1.02]

              transition-all duration-300
            "
          >
            <ExternalLink size={16} />
            Go to Website
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* USER */}
          <div className="p-1 rounded-xl border transition border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { ExternalLink, Menu, Globe } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './common/ThemeToggle';

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all duration-300 bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-white/10">
      <div className="h-16 flex items-center justify-between px-4 md:px-8">
        {/* LEFT: NAVIGATION */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>

          <Link
            href="/"
            className="group hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300"
          >
            <Globe
              size={16}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>View Site</span>
            <ExternalLink
              size={14}
              className="opacity-50 group-hover:opacity-100"
            />
          </Link>
        </div>

        {/* RIGHT: USER */}
        <div className="flex items-center gap-2 md:gap-4">
          {mounted ? (
            <>
              <ThemeToggle variant="compact" />

              <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />

              <div className="flex items-center gap-3 pl-1">
                <div className="hidden md:block text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>

                <div className="p-0.5 rounded-full border-2 border-transparent hover:border-blue-500 transition-all">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarWrapper: 'h-8 w-8 shadow-sm',
                      },
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 animate-pulse">
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-white/5" />
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-white/5" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

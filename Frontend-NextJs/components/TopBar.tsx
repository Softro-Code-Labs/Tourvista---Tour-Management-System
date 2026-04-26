'use client';

import { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { ExternalLink, Menu, Globe, Bell, Command } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-all duration-300 bg-white/70 dark:bg-[#020617]/70 border-slate-100 dark:border-slate-800/50">
      <div className="h-[80px] flex items-center justify-between px-6 md:px-10">
        {/* LEFT: NAVIGATION & QUICK ACTIONS */}
        <div className="flex items-center gap-6">
          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 active:scale-95 transition-all"
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>

          {/* VIEW SITE BUTTON */}
          <Link
            href="/"
            className="group hidden sm:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm"
          >
            <Globe
              size={14}
              className="group-hover:rotate-12 transition-transform text-blue-500"
            />
            <span>View Live Site</span>
            <ExternalLink
              size={12}
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </Link>
        </div>

        {/* RIGHT: SYSTEM & USER CONTROL */}
        <div className="flex items-center gap-3">
          {mounted ? (
            <>
              <ThemeToggle variant="default" />

              <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

              {/* USER PROFILE CARD */}
              <div className="group flex items-center gap-4 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="hidden md:block text-right">
                  <p className="text-xs font-black text-slate-900 dark:text-white leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[12px] font-medium text-slate-400 dark:text-slate-500 mt-1 tracking-tighter">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>

                <div className="relative">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarWrapper:
                          'h-10 w-10 shadow-md ring-2 ring-white dark:ring-slate-950 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-800',
                        userButtonTrigger:
                          'focus:shadow-none focus:outline-none',
                      },
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 border-2 border-white dark:border-slate-950 rounded-full flex items-center justify-center">
                    <Command size={8} className="text-white" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-10 w-24 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

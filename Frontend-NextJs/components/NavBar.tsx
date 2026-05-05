'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
  Show,
} from '@clerk/nextjs';
import { Menu, X, LayoutDashboard, ChevronRight } from 'lucide-react';
import { UserRole } from '@/common/enums/role.enum';
import ThemeToggle from './common/ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Attractions', href: '/attractions' },
  { name: 'Culture', href: '/culture' },
  { name: 'Showcases', href: '/showcases' },
  { name: 'Packages', href: '/packages' },
  { name: 'Reservations', href: '/reservations' },
  { name: 'Contact', href: '/contact' },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const isAdmin = isLoaded && user?.publicMetadata?.role === UserRole.ADMIN;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      <div className="backdrop-blur-md border-b transition-all bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
          {/* LOGO */}
          <Link
            href="/"
            className="z-[60] shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.webp"
              alt="TourVista"
              width={120}
              height={35}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle variant="compact" />
              <AuthButtons isAdmin={isAdmin} />
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-[60] p-2 -mr-2 md:hidden text-slate-700 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden bg-slate-950/20 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE DRAWER CONTENT */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[320px] bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col h-full">
          {/* DRAWER HEADER */}
          <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
            <span className="font-bold text-lg">Menu</span>
            <ThemeToggle variant="compact" />
          </div>

          {/* DRAWER LINKS */}
          <nav className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 font-medium transition-all group"
                >
                  {item.name}
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"
                  />
                </Link>
              ))}
            </div>
          </nav>

          {/* DRAWER FOOTER (AUTH) */}
          <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
            <Show when="signed-out">
              <div className="flex flex-col gap-3">
                <SignInButton mode="modal">
                  <button className="w-full py-3 text-sm font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full py-3 text-sm font-bold rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-2">
                  <UserButton
                    appearance={{
                      elements: { userButtonAvatarWrapper: 'h-10 w-10' },
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold truncate">
                      {user?.fullName}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    href="/dashboard/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                  >
                    <LayoutDashboard size={18} />
                    Admin Panel
                  </Link>
                )}
              </div>
            </Show>
          </div>
        </div>
      </aside>
    </header>
  );
}

function AuthButtons({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="text-sm font-medium hover:text-blue-600 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl transition-colors cursor-pointer">
            Login
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-600/10 active:scale-95">
            Sign Up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        {isAdmin && (
          <Link
            href="/dashboard/admin"
            className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition"
          >
            Dashboard
          </Link>
        )}
        <UserButton />
      </Show>
    </>
  );
}

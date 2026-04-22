'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
  Show,
} from '@clerk/nextjs';

import { UserRole } from '@/common/enums/role.enum';
import ThemeToggle from './common/ThemeToggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Attractions', href: '/attractions' },
  { name: 'Culture', href: '/culture' },
  { name: 'Tours', href: '/tours' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, isLoaded } = useUser();
  const role = user?.publicMetadata?.role as UserRole | undefined;

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur-xl border-b transition-colors duration-300 bg-white/70 dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-slate-900 dark:text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.webp" alt="TourVista" width={140} height={40} />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group transition text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
              >
                {item.name}

                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-xl border transition border-gray-300 dark:border-white/10 text-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition">
                  Sign Up
                </button>
              </SignUpButton>

              <ThemeToggle variant="compact" />
            </Show>

            <Show when="signed-in">
              {isLoaded && role === UserRole.ADMIN && (
                <Link
                  href="/dashboard/admin"
                  className="px-4 py-2 rounded-xl border transition bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20"
                >
                  Dashboard
                </Link>
              )}

              <ThemeToggle variant="compact" />

              <UserButton />
            </Show>
          </div>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-slate-900 dark:text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={open ? 'fixed inset-0 z-50' : 'hidden'}>
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <div className="absolute top-0 left-0 h-full w-[85%] max-w-sm p-6 flex flex-col bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-white/10 text-slate-900 dark:text-white">
          <div className="flex justify-between items-center mb-8">
            <Image src="/logo.webp" alt="TourVista" width={130} height={40} />
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 px-2 rounded-lg transition text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <ThemeToggle />

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="w-full py-3 rounded-xl border border-gray-300 dark:border-white/10 text-slate-900 dark:text-white">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              {role === UserRole.ADMIN && (
                <Link
                  href="/dashboard/admin"
                  className="w-full py-3 rounded-xl text-center border bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/10 text-slate-900 dark:text-white"
                >
                  Dashboard
                </Link>
              )}

              <div className="flex items-center justify-center gap-3 px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
                <UserButton />
                <div className="leading-tight">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/50">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}

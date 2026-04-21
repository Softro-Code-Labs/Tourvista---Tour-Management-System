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

import { useTheme } from 'next-themes';
import { UserRole } from '@/features/auth/enums/roles';
import ThemeToggle from './ui/ThemeToggle';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const role = user?.publicMetadata?.role as UserRole | undefined;

  return (
    <header className="sticky top-0 z-50">
      {/* NAVBAR WRAPPER */}
      <div
        className={`
          backdrop-blur-xl border-b transition-colors duration-300
          ${
            isDark
              ? 'bg-slate-950/70 border-white/10 text-white'
              : 'bg-white/70 border-gray-200 text-slate-900'
          }
        `}
      >
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
                className={`
                  relative group transition
                  ${
                    isDark
                      ? 'text-white/70 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                {item.name}

                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] w-0
                    bg-gradient-to-r from-cyan-500 to-blue-500
                    group-hover:w-full transition-all duration-300
                  `}
                />
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className={`
                    px-4 py-2 rounded-xl border transition
                    ${
                      isDark
                        ? 'border-white/10 text-white hover:bg-white/10'
                        : 'border-gray-300 text-slate-700 hover:bg-gray-100'
                    }
                  `}
                >
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  className="
                    px-4 py-2 rounded-xl
                    bg-gradient-to-r from-cyan-500 to-blue-500
                    text-white font-medium
                    hover:opacity-90 transition
                  "
                >
                  Sign Up
                </button>
              </SignUpButton>

              <ThemeToggle variant="compact" />
            </Show>

            <Show when="signed-in">
              {isLoaded && role === UserRole.ADMIN && (
                <Link
                  href="/dashboard/admin"
                  className={`
                    px-4 py-2 rounded-xl border transition
                    ${
                      isDark
                        ? 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-100 border-gray-200 text-slate-900 hover:bg-gray-200'
                    }
                  `}
                >
                  Dashboard
                </Link>
              )}

              <ThemeToggle variant="compact" />

              <UserButton />
            </Show>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className={`
              md:hidden text-2xl
              ${isDark ? 'text-white' : 'text-slate-900'}
            `}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={open ? 'fixed inset-0 z-50' : 'hidden'}>
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* PANEL */}
        <div
          className={`
            absolute top-0 left-0 h-full w-[85%] max-w-sm p-6 flex flex-col
            transition-colors duration-300
            ${
              isDark
                ? 'bg-slate-950 border-white/10 text-white'
                : 'bg-white border-gray-200 text-slate-900'
            }
            border-r
          `}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <Image src="/logo.webp" alt="TourVista" width={130} height={40} />
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  py-2 px-2 rounded-lg transition
                  ${
                    isDark
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-gray-100'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <ThemeToggle />

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className={`
                    w-full py-3 rounded-xl border
                    ${
                      isDark
                        ? 'border-white/10 text-white'
                        : 'border-gray-300 text-slate-900'
                    }
                  `}
                >
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
                  className={`
                    w-full py-3 rounded-xl text-center border
                    ${
                      isDark
                        ? 'bg-white/10 border-white/10 text-white'
                        : 'bg-gray-100 border-gray-200 text-slate-900'
                    }
                  `}
                >
                  Dashboard
                </Link>
              )}

              <div
                className={`
                  flex items-center justify-center gap-3
                  px-3 py-2 rounded-xl border
                  transition-all duration-300

                  ${
                    isDark
                      ? 'border-white/10 bg-white/5 hover:bg-white/10'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }
                `}
              >
                {/* USER INFO */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0">
                    <UserButton />
                  </div>

                  {/* TEXT BLOCK */}
                  <div className="leading-tight min-w-0">
                    <p
                      className={`
                        text-sm font-medium truncate
                        ${isDark ? 'text-white' : 'text-slate-900'}
                      `}
                    >
                      {user?.firstName} {user?.lastName}
                    </p>

                    <p
                      className={`
                        text-xs truncate
                        ${isDark ? 'text-white/50' : 'text-slate-500'}
                      `}
                    >
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}

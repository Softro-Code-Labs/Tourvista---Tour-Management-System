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
import { UserRole } from '@/features/auth/types/roles';

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
      {/* NAVBAR */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="TourVista Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="relative group">
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-xl border border-gray-300 hover:border-blue-500 hover:text-blue-600 cursor-pointer transition">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 cursor-pointer transition shadow-md">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              {isLoaded && role === UserRole.ADMIN && (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition shadow"
                >
                  Dashboard
                </Link>
              )}
              <UserButton />
            </Show>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setOpen(true)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? 'visible' : 'invisible'
        }`}
      >
        {/* OVERLAY */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute top-0 left-0 h-full w-[80%] max-w-sm bg-white shadow-xl p-6 flex flex-col transition-transform duration-300 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <Image
              src="/logo.webp"
              alt="TourVista Logo"
              width={120}
              height={40}
            />
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-col gap-5 text-lg font-medium text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* PUSH AUTH TO BOTTOM */}
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="w-full py-3 rounded-xl border px-4">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              {role === UserRole.ADMIN && (
                <Link
                  href="/dashboard"
                  className="w-full py-3 rounded-xl bg-purple-600 text-white text-center"
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-2">
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}

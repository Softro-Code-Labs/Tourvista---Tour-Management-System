'use client';

import Link from 'next/link';
import { Home, MailQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 transition-colors">
      <div className="text-center max-w-xl animate-in fade-in zoom-in duration-500">
        {/* 404 TEXT */}
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 tracking-tighter">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-slate-900 dark:text-white">
          Lost in Paradise?
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved to
          another destination. Let&apos;s get you back on track.
        </p>

        {/* NAVIGATION BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 group"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            Return Home
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95 group"
          >
            <MailQuestion className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Get Help
          </Link>
        </div>

        {/* HELPFUL SUB-LINK */}
        <p className="mt-12 text-sm text-slate-400">
          Think this is a mistake?{' '}
          <Link href="/contact" className="text-blue-500 hover:underline">
            Report an issue
          </Link>
        </p>
      </div>
    </section>
  );
}

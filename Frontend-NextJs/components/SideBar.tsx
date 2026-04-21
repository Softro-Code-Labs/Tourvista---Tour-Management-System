'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

import {
  LayoutDashboard,
  Map,
  Calendar,
  CreditCard,
  Users,
  MessageSquare,
} from 'lucide-react';

import { UserRole } from '@/features/auth/enums/roles';
import { isAdmin } from '@/lib/auth';

type NavItem = {
  label: string;
  href: string;
  icon: any;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export default function SideBar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const role = user?.publicMetadata?.role as UserRole | undefined;

  const sections: NavSection[] = isAdmin(role)
    ? [
        {
          title: 'Dashboard',
          items: [
            {
              label: 'Overview',
              href: '/dashboard/admin',
              icon: LayoutDashboard,
            },
          ],
        },
        {
          title: 'Management',
          items: [
            {
              label: 'Tour Plans',
              href: '/dashboard/admin/tours',
              icon: Map,
            },
            {
              label: 'Bookings',
              href: '/dashboard/admin/bookings',
              icon: Calendar,
            },
            {
              label: 'Payments',
              href: '/dashboard/admin/payments',
              icon: CreditCard,
            },
          ],
        },
        {
          title: 'Users',
          items: [
            {
              label: 'All Users',
              href: '/dashboard/admin/users',
              icon: Users,
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Messages',
              href: '/dashboard/admin/messages',
              icon: MessageSquare,
            },
          ],
        },
      ]
    : [];

  return (
    <aside
      className={clsx(
        `
        w-64 h-screen sticky top-0 flex flex-col
        border-r backdrop-blur-xl
        transition-colors duration-300
        `,
        isDark
          ? 'bg-slate-950/70 border-white/10 text-white'
          : 'bg-white/70 border-gray-200 text-slate-900',
      )}
    >
      {/* BRAND HEADER */}
      <div
        className={clsx(
          `
          px-6 py-5 border-b
          `,
          isDark ? 'border-white/10' : 'border-gray-200',
        )}
      >
        <div className="flex flex-col gap-1">
          <h2
            className="
              text-lg font-semibold tracking-tight
              bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
              bg-clip-text text-transparent
            "
          >
            Tourvista Tours
          </h2>

          <p
            className={clsx(
              'text-xs',
              isDark ? 'text-white/40' : 'text-slate-500',
            )}
          >
            Admin Control Center
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p
              className={clsx(
                'px-3 mb-2 text-[11px] uppercase tracking-wider',
                isDark ? 'text-white/30' : 'text-slate-400',
              )}
            >
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === pathname
                    ? pathname?.startsWith(item.href)
                    : false;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      `
                      relative flex items-center gap-3
                      px-3 py-2 rounded-lg
                      transition-all duration-300
                      `,
                      isActive
                        ? isDark
                          ? 'text-white'
                          : 'text-slate-900'
                        : isDark
                          ? 'text-white/60 hover:text-white'
                          : 'text-slate-500 hover:text-slate-900',
                    )}
                  >
                    {/* ACTIVE BACKGROUND */}
                    <span
                      className={clsx(
                        `
                        absolute inset-0 rounded-lg transition-all duration-300
                        `,
                        isActive
                          ? isDark
                            ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20'
                            : 'bg-blue-100'
                          : isDark
                            ? 'hover:bg-white/5'
                            : 'hover:bg-gray-100',
                      )}
                    />

                    {/* ACTIVE GLOW (dark only) */}
                    {isActive && isDark && (
                      <span className="absolute inset-0 rounded-lg bg-cyan-500/10 blur-xl opacity-40" />
                    )}

                    {/* ICON */}
                    <Icon
                      size={18}
                      className={clsx(
                        'relative z-10 transition',
                        isActive
                          ? isDark
                            ? 'text-cyan-300'
                            : 'text-blue-600'
                          : isDark
                            ? 'text-white/40 group-hover:text-white'
                            : 'text-slate-400 group-hover:text-slate-900',
                      )}
                    />

                    {/* LABEL */}
                    <span className="relative z-10 text-sm font-medium">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER */}
      <div
        className={clsx(
          `
          px-4 py-4 border-t text-xs
          `,
          isDark
            ? 'border-white/10 text-white/30'
            : 'border-gray-200 text-slate-500',
        )}
      >
        © {new Date().getFullYear()} Tourvista Tours. All rights reserved.
      </div>
    </aside>
  );
}

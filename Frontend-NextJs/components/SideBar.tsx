'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import clsx from 'clsx';

import {
  LayoutDashboard,
  Map,
  Calendar,
  CreditCard,
  Users,
  MessageSquare,
} from 'lucide-react';

import { UserRole } from '@/common/enums/role.enum';
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
            { label: 'Tour Plans', href: '/dashboard/admin/tours', icon: Map },
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
            { label: 'All Users', href: '/dashboard/admin/users', icon: Users },
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
    <aside className="w-64 h-screen sticky top-0 flex flex-col border-r backdrop-blur-xl transition-colors duration-300 bg-white/70 dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-slate-900 dark:text-white">
      {/* BRAND HEADER */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Tourvista Tours
          </h2>

          <p className="text-xs text-slate-500 dark:text-white/40">
            Admin Control Center
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[11px] uppercase tracking-wider text-slate-400 dark:text-white/30">
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
                        hover:bg-gray-100 dark:hover:bg-white/5
                      `,
                      isActive
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white',
                    )}
                  >
                    {/* ACTIVE BACKGROUND */}
                    <span
                      className={clsx(
                        `
                          absolute inset-0 rounded-lg transition-all duration-300
                        `,
                        isActive
                          ? 'bg-blue-100 dark:bg-gradient-to-r dark:from-cyan-950 dark:via-blue-950 dark:to-indigo-950'
                          : '',
                      )}
                    />

                    {/* ACTIVE GLOW (dark only) */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-cyan-500/10 blur-xl opacity-40 dark:block hidden" />
                    )}

                    {/* ICON */}
                    <Icon
                      size={18}
                      className={clsx(
                        'relative z-10 transition',
                        isActive
                          ? 'text-blue-600 dark:text-cyan-300'
                          : 'text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white',
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
      <div className="px-4 py-4 border-t border-gray-200 dark:border-white/10 text-xs text-slate-500 dark:text-white/30">
        © {new Date().getFullYear()} Tourvista Tours. All rights reserved.
      </div>
    </aside>
  );
}

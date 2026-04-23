'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import {
  LayoutDashboard,
  Map,
  Calendar,
  CreditCard,
  Users,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';

import { UserRole } from '@/common/enums/role.enum';
import { isAdmin } from '@/utils/auth-utils';
import { cn } from '@/lib/utils';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function SideBar({ isOpen, setIsOpen }: SideBarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const role = user?.publicMetadata?.role as UserRole | undefined;
  const sections = isAdmin(role) ? adminNav : [];

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm lg:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR ASIDE */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[70] flex flex-col border-r bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 h-full',
          isOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full',
          isCollapsed ? 'lg:w-20' : 'lg:w-64',
        )}
      >
        {/* BRAND HEADER */}
        <header className="px-6 py-6 h-[73px] flex items-center justify-between border-b border-slate-200 dark:border-white/10 shrink-0">
          <div
            className={cn(
              'transition-opacity',
              isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100',
            )}
          >
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              Tourvista Tours
            </h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 text-slate-500"
          >
            <X size={20} />
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400"
          >
            <ChevronLeft
              className={cn(
                'transition-transform duration-300',
                isCollapsed && 'rotate-180',
              )}
              size={18}
            />
          </button>
        </header>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3
                className={cn(
                  'px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/20',
                  isCollapsed ? 'lg:opacity-0' : 'opacity-100',
                )}
              >
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/dashboard/admin' &&
                      pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'w-5 h-5 shrink-0 transition-colors',
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300',
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm font-semibold flex-1 transition-all duration-300',
                          isCollapsed ? 'lg:opacity-0 lg:w-0' : 'opacity-100',
                        )}
                      >
                        {item.label}
                      </span>
                      {isActive && !isCollapsed && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      {isActive && (
                        <div className="absolute left-0 w-1 h-5 bg-blue-600 dark:bg-blue-400 rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <footer className="p-4 border-t border-slate-200 dark:border-white/10 shrink-0">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
            <p
              className={cn(
                'text-[10px] text-slate-500 truncate',
                isCollapsed && 'lg:hidden',
              )}
            >
              © {new Date().getFullYear()} Tourvista{' '}
              {user?.publicMetadata?.role === UserRole.ADMIN ? 'Admin' : 'User'}
            </p>
            {isCollapsed && (
              <span className="text-[10px] font-bold text-blue-600">V1</span>
            )}
          </div>
        </footer>
      </aside>
    </>
  );
}

// ... adminNav data stays the same

const adminNav = [
  {
    title: 'Dashboard',
    items: [
      { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Tour Plans', href: '/dashboard/admin/tours', icon: Map },
      { label: 'Bookings', href: '/dashboard/admin/bookings', icon: Calendar },
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
];

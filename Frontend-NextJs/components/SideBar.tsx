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
  ChevronLeft,
  X,
  Sparkles,
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
          'fixed inset-0 z-[60] bg-slate-950/20 backdrop-blur-sm lg:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR ASIDE */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[70] flex flex-col border-r bg-[#fcfcfd] dark:bg-[#020617] border-slate-100 dark:border-slate-800/50 transition-all duration-500 ease-in-out lg:relative lg:translate-x-0 h-full',
          isOpen ? 'translate-x-0 w-[290px]' : '-translate-x-full',
          isCollapsed ? 'lg:w-24' : 'lg:w-72',
        )}
      >
        {/* BRAND HEADER */}
        <header className="px-6 py-6 h-[81px] flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 shrink-0">
          <div
            className={cn(
              'flex items-center gap-3 transition-opacity duration-300',
              isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100',
            )}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
              T
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                Tourvista<span className="text-blue-500"> Tours</span>
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Admin Studio
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
          >
            <X size={20} />
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ChevronLeft
              className={cn(
                'transition-transform duration-500 ease-in-out',
                isCollapsed && 'rotate-180 text-blue-500',
              )}
              size={18}
            />
          </button>
        </header>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto p-5 space-y-9 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3
                className={cn(
                  'px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80 dark:text-slate-600 transition-opacity duration-300',
                  isCollapsed ? 'lg:opacity-0' : 'opacity-100',
                )}
              >
                {section.title}
              </h3>
              <div className="space-y-1.5">
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
                        'group relative flex items-center transition-all duration-300 ease-in-out rounded-xl',
                        isActive
                          ? 'font-bold bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-800'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white',
                        isCollapsed
                          ? 'lg:justify-center lg:px-0 lg:py-4'
                          : 'gap-3.5 px-4 py-3.5',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'w-5 h-5 shrink-0 transition-all duration-300',
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110',
                        )}
                        strokeWidth={isActive ? 2.5 : 2}
                      />

                      <span
                        className={cn(
                          'text-sm transition-all duration-500 ease-in-out whitespace-nowrap',
                          isCollapsed
                            ? 'lg:opacity-0 lg:w-0 lg:absolute'
                            : 'opacity-100',
                          isActive
                            ? 'font-black tracking-tight text-slate-950 dark:text-white'
                            : 'font-semibold',
                        )}
                      >
                        {item.label}
                      </span>

                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-r-full animate-in fade-in slide-in-from-left-2" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <footer className="p-5 border-t border-slate-100 dark:border-slate-800/50 shrink-0 bg-white/50 dark:bg-black/10">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-inner">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500 border border-slate-200 dark:border-slate-700 shrink-0">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <div
              className={cn(
                'flex-1 overflow-hidden transition-all duration-300',
                isCollapsed && 'lg:hidden',
              )}
            >
              <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                Tourvista{' '}
                {user?.publicMetadata?.role === UserRole.ADMIN
                  ? 'Admin'
                  : 'User'}
              </p>
              <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-1.5 leading-none mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync Active
              </p>
            </div>
          </div>
        </footer>
      </aside>
    </>
  );
}

const adminNav = [
  {
    title: 'Core Activity',
    items: [
      { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Logistics',
    items: [
      { label: 'Tour Packages', href: '/dashboard/admin/tours', icon: Map },
      {
        label: 'Bookings Hub',
        href: '/dashboard/admin/bookings',
        icon: Calendar,
      },
      {
        label: 'Financials',
        href: '/dashboard/admin/payments',
        icon: CreditCard,
      },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Client Base', href: '/dashboard/admin/users', icon: Users },
    ],
  },
  {
    title: 'Communications',
    items: [
      {
        label: 'Inquiry Inbox',
        href: '/dashboard/admin/messages',
        icon: MessageSquare,
      },
    ],
  },
];

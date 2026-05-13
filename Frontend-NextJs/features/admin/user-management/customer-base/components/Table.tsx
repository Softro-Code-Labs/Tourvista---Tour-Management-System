'use client';

import { Mail, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { User } from '../types/users.type';

interface Props {
  data: User[];
}

export function UsersTable({ data }: Props) {
  return (
    <div className="w-full space-y-6">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden xl:block overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl shadow-slate-200/20 dark:shadow-none">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-900/80">
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                User Identity
              </th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                First Name
              </th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Last Name
              </th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Role
              </th>
              <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                Joined Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {data.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

/**
 * DESKTOP ROW COMPONENT
 */
function UserRow({ user }: { user: User }) {
  return (
    <tr className="group hover:bg-cyan-50/30 dark:hover:bg-cyan-500/[0.02] transition-all duration-300">
      <td className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xs font-black border border-cyan-100 dark:border-cyan-500/20">
            <Mail size={14} />
          </div>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {user.email}
          </span>
        </div>
      </td>
      <td className="p-6">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {user.firstName}
        </span>
      </td>
      <td className="p-6">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {user.lastName}
        </span>
      </td>
      <td className="p-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Shield size={10} />
          {user.role}
        </div>
      </td>
      <td className="p-6 text-right">
        <div className="flex items-center justify-end gap-2 text-slate-500 dark:text-slate-400">
          <Calendar size={14} className="text-cyan-500" />
          <span className="text-xs font-medium">
            {format(new Date(user.createdAt), 'dd MMM, yyyy')}
          </span>
        </div>
      </td>
    </tr>
  );
}

/**
 * MOBILE CARD COMPONENT
 */
function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 p-6">
        <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black uppercase tracking-tighter text-cyan-600">
          {user.role}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/20">
            {user.firstName[0]}
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">
              {user.firstName} {user.lastName}
            </h4>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Registered Member
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <Mail size={16} className="text-cyan-500" />
            <span className="text-xs font-bold">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <Calendar size={16} className="text-cyan-500" />
            <span className="text-xs font-bold">
              Joined {format(new Date(user.createdAt), 'MMMM dd, yyyy')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

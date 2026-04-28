'use client';

import { useEffect, useState } from 'react';
import SideBar from '@/components/SideBar';
import TopBar from '@/components/TopBar';
import { isAdmin } from '@/utils/auth-utils';
import { UserRole } from '@/common/enums/role.enum';
import toast from 'react-hot-toast';
import { PageLoadingSpinner } from '@/components/common/PageLoadingSpinner';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const role = user?.publicMetadata?.role as UserRole | undefined;
  const hasAccess = isAdmin(role);

  useEffect(() => {
    if (isLoaded && !hasAccess) {
      toast.error('Access Denied. This area is reserved for admins only.');
      router.push('/');
    }
  }, [isLoaded, hasAccess, router]);

  if (!isLoaded) return <PageLoadingSpinner text="Verifying permissions..." />;

  return hasAccess ? (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 custom-scrollbar">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </>
  ) : null;
}

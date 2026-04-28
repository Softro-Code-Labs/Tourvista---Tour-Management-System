'use client';

import { UserRole } from '@/common/enums/role.enum';
import { PageLoadingSpinner } from '@/components/common/PageLoadingSpinner';
import { isUser } from '@/utils/auth-utils';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  const role = user?.publicMetadata?.role as UserRole | undefined;
  const hasAccess = isUser(role);

  useEffect(() => {
    if (isLoaded && !hasAccess) {
      toast.error('Access Denied. This area is reserved for users only.');
      router.push('/');
    }
  }, [isLoaded, hasAccess, router]);

  if (!isLoaded) return <PageLoadingSpinner text="Verifying permissions..." />;

  return hasAccess ? <>{children}</> : null;
}

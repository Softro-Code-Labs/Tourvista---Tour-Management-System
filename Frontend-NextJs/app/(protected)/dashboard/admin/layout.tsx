import { UserRole } from '@/common/enums/role.enum';
import { isAdmin } from '@/utils/auth-utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as UserRole | undefined;

  if (!isAdmin(role)) redirect('/');

  return <>{children}</>;
}

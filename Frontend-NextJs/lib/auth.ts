import { UserRole } from '@/features/auth/enums/roles';

export function isAdmin(role?: string) {
  return role === UserRole.ADMIN;
}

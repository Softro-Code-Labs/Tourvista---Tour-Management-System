import { UserRole } from '@/common/enums/role.enum';

export function isAdmin(role?: string) {
  return role === UserRole.ADMIN;
}

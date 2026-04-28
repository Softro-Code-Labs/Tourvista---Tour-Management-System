import { UserRole } from '@/common/enums/role.enum';

export function isAdmin(role?: string) {
  return role === UserRole.ADMIN;
}

export function isUser(role?: string) {
  return role === UserRole.USER;
}

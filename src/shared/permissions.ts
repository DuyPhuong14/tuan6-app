export type Role = 'admin' | 'moderator' | 'user';
export type Permission = 'product:read' | 'product:create' | 'product:update' | 'product:delete';

export const PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['product:read', 'product:create', 'product:update', 'product:delete'],
  moderator: ['product:read', 'product:update'],
  user: ['product:read'],
};

export function can(role: Role | undefined, permission: Permission): boolean {
  return role ? PERMISSIONS[role].includes(permission) : false;
}

import type { ComponentType } from 'react';
import { can, type Permission } from '@/shared/permissions';
import { useAuthStore } from '../store/authStore';

export function withPermission<P extends object>(
  Component: ComponentType<P>,
  permission: Permission,
) {
  return function WithPermission(props: P) {
    const role = useAuthStore((s) => s.user?.role);
    return can(role, permission) ? <Component {...props} /> : null;
  };
}

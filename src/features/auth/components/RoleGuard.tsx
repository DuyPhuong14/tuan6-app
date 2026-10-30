import { Navigate, Outlet } from 'react-router-dom';
import type { Role } from '@/shared/permissions';
import { useAuthStore } from '../store/authStore';

export function RoleGuard({ allow }: { allow: Role[] }) {
  const role = useAuthStore((s) => s.user?.role);
  if (!role || !allow.includes(role)) return <Navigate to="/403" replace />;
  return <Outlet />;
}

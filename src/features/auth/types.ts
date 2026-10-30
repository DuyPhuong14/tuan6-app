import type { Role } from '@/shared/permissions';

export interface User {
  id: number;
  username: string;
  firstName: string;
  role: Role;
}

export interface LoginPayload {
  username: string;
  password: string;
}

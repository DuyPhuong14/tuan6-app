import { authClient } from '@/shared/lib/axios';
import type { LoginPayload, User } from '../types';

export async function login(payload: LoginPayload) {
  const { data } = await authClient.post<{ accessToken: string }>('/auth/login', payload);
  const { data: me } = await authClient.get<User>('/auth/me', {
    headers: { Authorization: `Bearer ${data.accessToken}` },
  });
  // Chỉ giữ các trường cần thiết, không lưu cả hồ sơ user vào localStorage
  const user: User = { id: me.id, username: me.username, firstName: me.firstName, role: me.role };
  return { accessToken: data.accessToken, user };
}

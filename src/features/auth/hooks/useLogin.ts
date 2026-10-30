import { useMutation } from '@tanstack/react-query';
import { login } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: login,
    onSuccess: ({ user, accessToken }) => setSession(user, accessToken),
  });
}

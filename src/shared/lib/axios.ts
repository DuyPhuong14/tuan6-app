import axios from 'axios';
// Ngoại lệ có chủ đích: import thẳng store (không qua index.ts) để tránh vòng lặp import.
import { useAuthStore } from '@/features/auth/store/authStore';

export const authClient = axios.create({ baseURL: import.meta.env.VITE_AUTH_URL });
export const apiClient = axios.create({ baseURL: import.meta.env.VITE_API_URL });

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) useAuthStore.getState().logout();
    return Promise.reject(error);
  },
);

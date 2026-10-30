import { apiClient } from '@/shared/lib/axios';
import type { Product, ProductInput } from '../types';

export const productApi = {
  getAll: async () => (await apiClient.get<Product[]>('/products')).data,
  getById: async (id: number) => (await apiClient.get<Product>(`/products/${id}`)).data,
  create: async (body: ProductInput) => (await apiClient.post<Product>('/products', body)).data,
  update: async ({ id, ...body }: Product) =>
    (await apiClient.put<Product>(`/products/${id}`, body)).data,
  remove: async (id: number) => {
    await apiClient.delete(`/products/${id}`);
  },
};

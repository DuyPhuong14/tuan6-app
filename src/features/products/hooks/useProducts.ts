import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/productApi';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
};

export const useProducts = () =>
  useQuery({ queryKey: productKeys.lists(), queryFn: productApi.getAll });

export const useProduct = (id: number | undefined) =>
  useQuery({
    queryKey: productKeys.detail(id as number),
    queryFn: () => productApi.getById(id as number),
    enabled: id !== undefined,
  });

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.lists() }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productApi.update,
    onSuccess: (_data, variables) =>
      Promise.all([
        qc.invalidateQueries({ queryKey: productKeys.lists() }),
        qc.invalidateQueries({ queryKey: productKeys.detail(variables.id) }),
      ]),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.lists() }),
  });
}

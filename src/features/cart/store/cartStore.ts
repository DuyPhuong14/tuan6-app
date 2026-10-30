import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Omit<CartItem, 'qty'>) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((state) => {
          const found = state.items.find((i) => i.id === product.id);
          return {
            items: found
              ? state.items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
              : [...state.items, { ...product, qty: 1 }],
          };
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'cart' },
  ),
);

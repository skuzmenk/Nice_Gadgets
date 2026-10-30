import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { CartItem, CartState } from './cart.types';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem(productId: number) {
        set((state) => {
          const existing = state.items.find(
            (item: CartItem) => item.productId === productId,
          );

          if (existing) {
            return {
              items: state.items.map((item: CartItem) =>
                item.productId === productId ?
                  { ...item, quantity: item.quantity + 1 }
                : item,
              ),
            };
          }

          return {
            items: [...state.items, { productId, quantity: 1 }],
          };
        });
      },

      removeItem(productId: number) {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity(productId, quantity) {
        set((state) => ({
          items:
            quantity <= 0 ?
              state.items.filter((item) => item.productId !== productId)
            : state.items.map((item) =>
                item.productId === productId ? { ...item, quantity } : item,
              ),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);

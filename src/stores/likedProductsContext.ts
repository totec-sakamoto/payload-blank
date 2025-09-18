import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type LikedProductsState = {
  likedProducts: string[]
  toggleLike: (productId: string) => void
  isLiked: (productId: string) => boolean
}

/**
 * Zustand store for managing liked products.
 * Persists liked products to localStorage.
 */

export const useLikedProductsStore = create<LikedProductsState>()(
  persist(
    (set, get) => ({
      likedProducts: [],
      toggleLike: (productId: string) =>
        set((state) => ({
          likedProducts: state.likedProducts.includes(productId)
            ? state.likedProducts.filter((id) => id !== productId)
            : [...state.likedProducts, productId],
        })),
      isLiked: (productId: string) => get().likedProducts.includes(productId),
    }),
    {
      name: 'liked-products',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

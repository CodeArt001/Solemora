import { create } from "zustand";
import { fetchAPI } from "../api";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isLoading: false,

  /**
   * Fetch cart from Redis backend and normalize item structure
   */
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchAPI("/cart");

      // Extract raw items array from backend CartRedisDTO
      const rawItems =
        data?.items || data?.cartItems || (Array.isArray(data) ? data : []);

      // Normalize items so components can consistently access `id`, `productId`, `quantity`, `price`, and `image`
      const normalizedItems = rawItems.map((item) => ({
        id: item.id || item.cartItemId || item.productId,
        productId: item.productId,
        productName: item.productName || item.name || "Product",
        price: item.price || item.unitPrice || 0,
        quantity: item.quantity || 1,
        size: item.size || "42",
        color: item.color || "Black",
        image:
          item.productImageUrl ||
          item.image ||
          item.imageUrl ||
          "/placeholder.png",
      }));

      set({ cartItems: normalizedItems });
    } catch (err) {
      console.error("Failed to fetch cart from backend:", err);
      // Keep empty array on error so UI doesn't break
      set({ cartItems: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Add item to backend Redis cart and re-sync
   */
  addToCart: async (productId, quantity = 1, size = "42", color = "Black") => {
    set({ isLoading: true });
    try {
      await fetchAPI("/cart/items", {
        method: "POST",
        body: JSON.stringify({
          productId: Number(productId),
          quantity: Number(quantity),
          size: String(size),
          color: String(color),
        }),
      });

      // Refetch fresh cart data from Redis immediately after adding
      await get().fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Remove single item from backend Redis cart
   */
  removeItem: async (productIdOrItemId) => {
    if (!productIdOrItemId) return;
    set({ isLoading: true });
    try {
      await fetchAPI(`/cart/items/${productIdOrItemId}`, {
        method: "DELETE",
      });

      // Update state locally for instant UI update
      set((state) => ({
        cartItems: state.cartItems.filter((item) => {
          const idMatch = String(item.id) === String(productIdOrItemId);
          const productMatch =
            String(item.productId) === String(productIdOrItemId);
          return !idMatch && !productMatch;
        }),
      }));
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
      // Refetch from backend if optimistic update fails
      await get().fetchCart();
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Clear entire cart manually or upon checkout
   */
  clearCart: async () => {
    try {
      await fetchAPI("/cart", { method: "DELETE" });
    } catch (err) {
      console.warn("Failed to clear remote cart:", err);
    } finally {
      set({ cartItems: [] });
    }
  },

  /**
   * Process Checkout
   */
  checkout: async (shippingDetails = {}) => {
    set({ isLoading: true });
    try {
      const response = await fetchAPI("/orders/checkout", {
        method: "POST",
        body: JSON.stringify(shippingDetails),
      });

      // Clear cart locally after checkout succeeds (OrderService already cleared Redis)
      set({ cartItems: [] });
      return response;
    } catch (err) {
      console.error("Checkout failed:", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Total quantity calculation helper
   */
  getTotalItems: () => {
    const items = get().cartItems;
    return Array.isArray(items)
      ? items.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0)
      : 0;
  },

  /**
   * Total monetary calculation helper
   */
  getCartTotal: () => {
    const items = get().cartItems;
    return Array.isArray(items)
      ? items.reduce(
          (acc, item) =>
            acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
          0,
        )
      : 0;
  },
}));

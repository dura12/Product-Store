import { create } from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (product) => set({ products: product }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        products: [...state.products, data],
      }));
      return { success: true, message: "Product created successfully" };
    } else {
      return { success: false, message: data.message };
    }
  },
}));

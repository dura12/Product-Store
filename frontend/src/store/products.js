import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: "Please fill in all fields." };
    }
    try {
        const res = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        // Check if the response has a body
        if (!res.ok) {
            return { success: false, message: `Error: ${res.statusText}` };
        }

        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, message: "An error occurred while creating the product." };
    }
},
	fetchProducts: async () => {
		try {
			const res = await fetch("http://localhost:3000/api/products");
			if (!res.ok) {
				console.error(`Error fetching products: ${res.statusText}`);
				return { success: false, message: `Error: ${res.statusText}` };
			}
			const data = await res.json();
			if (!data || !data.data) {
				console.error("Invalid response format while fetching products.");
				return { success: false, message: "Invalid response format." };
			}
      console.log("data", data);
			set({ products: data.data });
			return { success: true, message: "Products fetched successfully." };
		} catch (error) {
			console.error("Error fetching products:", error);
			return { success: false, message: "An error occurred while fetching products." };
		}
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
    console.log("data", data);
		if (!data || !data.success) {
			return { success: false, message: data?.message || "An error occurred." };
		}

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));
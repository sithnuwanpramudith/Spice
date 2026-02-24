import axios from 'axios';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    image?: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

export const productService = {
    getProducts: async (): Promise<Product[]> => {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    },

    addProduct: async (product: Omit<Product, 'id' | 'status'>): Promise<Product> => {
        const response = await axios.post(`${API_BASE_URL}/products`, {
            ...product,
            price: Number(product.price),
            stock: Number(product.stock),
            image: product.image
        });
        return response.data;
    },

    updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
        const cleanUpdates = { ...updates };
        if (updates.price !== undefined) cleanUpdates.price = Number(updates.price);
        if (updates.stock !== undefined) cleanUpdates.stock = Number(updates.stock);
        const response = await axios.put(`${API_BASE_URL}/products/${id}`, cleanUpdates);
        return response.data;
    },

    deleteProduct: async (id: string): Promise<boolean> => {
        const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
        return response.data.success;
    }
};

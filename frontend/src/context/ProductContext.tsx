import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { productService, type Product } from '../services/productService';

interface ProductContextType {
    products: Product[];
    loading: boolean;
    refreshProducts: () => Promise<void>;
    addProduct: (data: Omit<Product, 'id' | 'status'>) => Promise<void>;
    updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshProducts = async () => {
        setLoading(true);
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProducts();
    }, []);

    const addProduct = async (data: Omit<Product, 'id' | 'status'>) => {
        try {
            const newProduct = await productService.addProduct(data);
            setProducts(prev => [...prev, newProduct]);
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    const updateProduct = async (id: string, data: Partial<Product>) => {
        try {
            await productService.updateProduct(id, data);
            setProducts(prev => prev.map(p =>
                p.id === id ? { ...p, ...data, status: (data.stock !== undefined ? (data.stock > 10 ? 'In Stock' : data.stock > 0 ? 'Low Stock' : 'Out of Stock') : p.status) } : p
            ));
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await productService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, refreshProducts, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

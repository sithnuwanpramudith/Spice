export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const mockProducts: Product[] = [
    {
        id: 'PRD-001',
        name: 'Ceylon Cinnamon Sticks',
        category: 'Whole Spice',
        price: 45.00,
        stock: 120,
        description: 'Premium grade Ceylon Cinnamon, directly from the source.',
        status: 'In Stock'
    },
    {
        id: 'PRD-002',
        name: 'Black Pepper Corns',
        category: 'Whole Spice',
        price: 32.50,
        stock: 45,
        description: 'Organic black pepper corns, sun-dried.',
        status: 'Low Stock'
    },
    {
        id: 'PRD-003',
        name: 'Red Chili Powder',
        category: 'Ground Spice',
        price: 18.00,
        stock: 0,
        description: 'Fiery red chili powder, extra hot.',
        status: 'Out of Stock'
    },
    {
        id: 'PRD-004',
        name: 'Cardamom Pods',
        category: 'Whole Spice',
        price: 65.00,
        stock: 85,
        description: 'Green cardamom pods, aromatic and fresh.',
        status: 'In Stock'
    },
    {
        id: 'PRD-005',
        name: 'Turmeric Powder',
        category: 'Ground Spice',
        price: 22.00,
        stock: 200,
        description: 'Bright yellow turmeric powder with high curcumin content.',
        status: 'In Stock'
    }
];

export const productService = {
    getProducts: async (): Promise<Product[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...mockProducts]), 600);
        });
    },

    addProduct: async (product: Omit<Product, 'id' | 'status'>): Promise<Product> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newProduct: Product = {
                    ...product,
                    id: `PRD-${Math.floor(Math.random() * 10000)}`,
                    status: product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'
                };
                resolve(newProduct);
            }, 600);
        });
    },

    updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, this would update the backend
                resolve({ id, ...updates } as Product);
            }, 600);
        });
    },

    deleteProduct: async (_id: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 600);
        });
    }
};

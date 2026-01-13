export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customer: string;
    email: string;
    address: string;
    date: string;
    total: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: OrderItem[];
    timestamp: number;
}

const mockOrders: Order[] = [
    {
        id: 'ORD-8824',
        customer: 'Amara Perera',
        email: 'amara@example.com',
        address: 'No 45, Galle Road, Colombo',
        date: 'Jan 12, 2026',
        total: '$124.50',
        status: 'Pending',
        items: [
            { id: '1', name: 'Black Pepper', quantity: 2, price: 50.00 },
            { id: '2', name: 'Cinnamon Sticks', quantity: 1, price: 24.50 }
        ],
        timestamp: Date.now() - 3600000
    },
    {
        id: 'ORD-8823',
        customer: 'Kasun Silva',
        email: 'kasun@example.com',
        address: '12/1, Kandy Road, Kegalle',
        date: 'Jan 12, 2026',
        total: '$45.00',
        status: 'Shipped',
        items: [
            { id: '3', name: 'Chili Powder', quantity: 3, price: 15.00 }
        ],
        timestamp: Date.now() - 7200000
    },
    {
        id: 'ORD-8822',
        customer: 'Nimali Fernando',
        email: 'nimali@example.com',
        address: '77, Lake Drive, Negombo',
        date: 'Jan 11, 2026',
        total: '$89.20',
        status: 'Delivered',
        items: [
            { id: '1', name: 'Black Pepper', quantity: 1, price: 50.00 },
            { id: '4', name: 'Turmeric Powder', quantity: 2, price: 19.60 }
        ],
        timestamp: Date.now() - 86400000
    },
    {
        id: 'ORD-8821',
        customer: 'Pathum Nissanka',
        email: 'pathum@example.com',
        address: '45/A, Stadium View, Matara',
        date: 'Jan 11, 2026',
        total: '$210.00',
        status: 'Processing',
        items: [
            { id: '5', name: 'Premium Cardamom', quantity: 5, price: 42.00 }
        ],
        timestamp: Date.now() - 100000000
    }
];

export const orderService = {
    getOrders: async (): Promise<Order[]> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockOrders), 500);
        });
    },

    updateOrderStatus: async (id: string, status: Order['status']): Promise<boolean> => {
        // Simulate API call
        console.log(`Updating order ${id} to ${status}`);
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 500);
        });
    }
};

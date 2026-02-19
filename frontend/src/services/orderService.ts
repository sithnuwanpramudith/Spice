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
    whatsapp?: string;
    address: string;
    date: string;
    total: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: OrderItem[];
    timestamp: number;
}

const STORAGE_KEY = 'spices_orders';

// Initial mock data
const initialMockOrders: Order[] = [
    {
        id: 'ORD-8824',
        customer: 'Amara Perera',
        email: 'amara@example.com',
        whatsapp: '+94771234567',
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
        whatsapp: '+94719876543',
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
        whatsapp: '+94765551234',
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

// Helper to get orders from storage
const getStoredOrders = (): Order[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    // Initialize with mock data if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockOrders));
    return initialMockOrders;
};

export const orderService = {
    getOrders: async (): Promise<Order[]> => {
        return new Promise((resolve) => {
            const orders = getStoredOrders();
            // Sort by timestamp newly added first
            orders.sort((a, b) => b.timestamp - a.timestamp);
            setTimeout(() => resolve(orders), 500);
        });
    },

    addOrder: async (order: Order): Promise<Order> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentOrders = getStoredOrders();
                const newOrders = [order, ...currentOrders];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders));
                console.log('Order saved to localStorage:', order);
                resolve(order);
            }, 500);
        });
    },

    updateOrderStatus: async (id: string, status: Order['status']): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentOrders = getStoredOrders();
                const updatedOrders = currentOrders.map(o => o.id === id ? { ...o, status } : o);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
                console.log(`Order ${id} updated to ${status} in localStorage`);
                resolve(true);
            }, 500);
        });
    }
};

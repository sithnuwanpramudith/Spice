import axios from 'axios';

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

const API_BASE_URL = 'http://localhost:5000/api';

export const orderService = {
    getOrders: async (): Promise<Order[]> => {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        return response.data;
    },

    addOrder: async (order: Order): Promise<Order> => {
        // In a real app, this might be a POST to /orders
        // For now, we simulate saving an order
        const response = await axios.post(`${API_BASE_URL}/orders`, order);
        return response.data;
    },

    updateOrderStatus: async (id: string, status: Order['status']): Promise<boolean> => {
        const response = await axios.patch(`${API_BASE_URL}/orders/${id}/status`, { status });
        return response.data.success;
    }
};

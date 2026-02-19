import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Order } from '../services/orderService';
import { orderService } from '../services/orderService';

interface OrderContextType {
    orders: Order[];
    loading: boolean;
    updateOrderStatus: (id: string, newStatus: Order['status']) => Promise<void>;
    addOrder: (order: Order) => Promise<void>;
    refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshOrders = async () => {
        setLoading(true);
        try {
            const data = await orderService.getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshOrders();
    }, []);

    const addOrder = async (order: Order) => {
        try {
            const newOrder = await orderService.addOrder(order);
            setOrders(prev => [newOrder, ...prev]);
        } catch (error) {
            console.error('Failed to add order:', error);
        }
    };

    const updateOrderStatus = async (id: string, newStatus: Order['status']) => {
        try {
            const success = await orderService.updateOrderStatus(id, newStatus);
            if (success) {
                setOrders(prev => prev.map(order =>
                    order.id === id ? { ...order, status: newStatus } : order
                ));
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, loading, updateOrderStatus, addOrder, refreshOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, ArrowLeft, RefreshCw } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import type { Order } from '../../services/orderService';
import OrderCard from './OrderCard';
import '../../styles/pages/dashboard.css';

const OrderTracking: React.FC = () => {
    const { orders, refreshOrders, loading } = useOrders();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Refresh orders on mount to get latest status updates from admin
    useEffect(() => {
        refreshOrders();
    }, []);

    // Filter orders by logged-in user email and search term, memoized for performance
    const filteredOrders = useMemo(() => {
        if (!user) return [];

        return orders.filter(order =>
            // Case-insensitive email match to associate order with user
            order.email.toLowerCase() === user.email.toLowerCase() &&
            // Search filter
            (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.status.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [orders, user, searchTerm]);

    // Helper to determine step status
    const getStepStatus = (stepName: string, currentStatus: string) => {
        const stages = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        const currentIndex = stages.indexOf(currentStatus);
        const stepIndex = stages.indexOf(stepName);

        if (currentIndex > stepIndex) return 'completed';
        if (currentIndex === stepIndex) return 'active';
        return 'pending';
    };

    const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    // Render List View
    const renderOrderList = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px', color: 'white' }}>My Orders</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Track the status of your recent purchases</p>

                {/* Refresh Button */}
                <button
                    onClick={() => refreshOrders()}
                    disabled={loading}
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                    }}
                    className="float-hover"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {/* Search Bar */}
            <div style={{
                marginBottom: '40px',
                background: 'rgba(255,255,255,0.05)',
                padding: '12px 24px',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                border: '1px solid rgba(255,255,255,0.1)',
                maxWidth: '600px',
                margin: '0 auto 40px auto'
            }}>
                <Search size={20} color="var(--text-muted)" />
                <input
                    type="text"
                    placeholder="Search your orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1rem',
                        width: '100%',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Orders Grid */}
            {filteredOrders.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
                    <p style={{ fontSize: '1.1rem' }}>No orders found for your account.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '25px',
                    paddingBottom: '40px'
                }}>
                    {filteredOrders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onClick={setSelectedOrder}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );

    // Render Detail View
    const renderOrderDetail = () => {
        if (!selectedOrder) return null;

        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}
            >
                <button
                    onClick={() => setSelectedOrder(null)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        marginBottom: '30px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                    className="float-hover"
                >
                    <ArrowLeft size={20} /> Back to Orders
                </button>

                <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px' }}>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '5px', color: 'white' }}>{selectedOrder.id}</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Placed on {selectedOrder.date}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Amount</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{selectedOrder.total}</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px' }}>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Shipping To</h4>
                            <p style={{ fontWeight: 600, color: 'white' }}>{selectedOrder.customer}</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{selectedOrder.address}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px' }}>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Items</h4>
                            <p style={{ fontWeight: 600, color: 'white' }}>{selectedOrder.items.length} Items</p>
                            <div style={{ marginTop: '5px' }}>
                                {selectedOrder.items.map(item => (
                                    <p key={item.id} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        {item.quantity}x {item.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '30px', color: 'white' }}>Order Status</h3>
                    <div style={{ position: 'relative', paddingLeft: '20px' }}>
                        <div style={{
                            position: 'absolute',
                            left: '39px',
                            top: '20px',
                            bottom: '20px',
                            width: '2px',
                            background: 'rgba(255,255,255,0.1)'
                        }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            {steps.map((step) => {
                                const status = getStepStatus(step, selectedOrder.status);
                                const isCompleted = status === 'completed';
                                const isActive = status === 'active';
                                const isPending = status === 'pending';

                                let Icon = Clock;
                                if (step === 'Pending') Icon = Package;
                                if (step === 'Processing') Icon = Package;
                                if (step === 'Shipped') Icon = Truck;
                                if (step === 'Delivered') Icon = CheckCircle;

                                return (
                                    <div key={step} style={{ display: 'flex', gap: '25px', alignItems: 'center', position: 'relative', opacity: isPending ? 0.5 : 1 }}>
                                        <div style={{
                                            minWidth: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: isCompleted ? 'var(--primary)' : isActive ? 'var(--bg-dark)' : 'var(--bg-card)',
                                            border: isActive ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 2,
                                            boxShadow: isActive ? '0 0 20px var(--primary-glow)' : 'none'
                                        }}>
                                            <Icon size={18} color={isCompleted ? 'black' : isActive ? 'var(--primary)' : 'white'} />
                                        </div>
                                        <div>
                                            <h4 style={{
                                                fontSize: '1.1rem',
                                                fontWeight: isActive ? 700 : 600,
                                                color: isActive ? 'var(--primary)' : 'white'
                                            }}>{step}</h4>
                                            {isActive && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Current Status</p>}
                                            {isCompleted && <p style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '4px' }}>Completed</p>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '40px auto', minHeight: '600px' }}>
            <AnimatePresence mode="wait">
                {selectedOrder ? renderOrderDetail() : renderOrderList()}
            </AnimatePresence>
        </div>
    );
};

export default OrderTracking;

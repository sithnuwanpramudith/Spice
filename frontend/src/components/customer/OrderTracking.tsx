import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, ArrowLeft, RefreshCw, ShoppingBag, MapPin, Calendar } from 'lucide-react';
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

    useEffect(() => {
        refreshOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        if (!user) return [];
        return orders.filter(order =>
            order.email.toLowerCase() === user.email.toLowerCase() &&
            (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.status.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [orders, user, searchTerm]);

    const getStepStatus = (stepName: string, currentStatus: string) => {
        const stages = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        const currentIndex = stages.indexOf(currentStatus);
        const stepIndex = stages.indexOf(stepName);
        if (currentIndex > stepIndex) return 'completed';
        if (currentIndex === stepIndex) return 'active';
        return 'pending';
    };

    const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    const renderOrderList = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>History & Status</span>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '10px 0', color: 'white' }}>My Orders</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Track your spice journey from our fields to your kitchen.</p>

                <button
                    onClick={() => refreshOrders()}
                    disabled={loading}
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    {loading ? 'Updating...' : 'Refresh List'}
                </button>
            </div>

            <div style={{
                marginBottom: '50px',
                background: 'rgba(255,255,255,0.02)',
                padding: '16px 28px',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                border: '1px solid rgba(255,255,255,0.05)',
                maxWidth: '650px',
                margin: '0 auto 60px auto'
            }}>
                <Search size={22} color="var(--primary)" />
                <input
                    type="text"
                    placeholder="Search by order ID or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.1rem',
                        width: '100%',
                        outline: 'none'
                    }}
                />
            </div>

            {filteredOrders.length === 0 ? (
                <div style={{ padding: '100px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-glass)' }}>
                    <ShoppingBag size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '30px'
                }}>
                    {filteredOrders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <OrderCard
                                order={order}
                                onClick={setSelectedOrder}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );

    const renderOrderDetail = () => {
        if (!selectedOrder) return null;

        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ maxWidth: '900px', margin: '0 auto' }}
            >
                <button
                    onClick={() => setSelectedOrder(null)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        marginBottom: '40px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                    <ArrowLeft size={22} /> Back to History
                </button>

                <div className="glass-card" style={{ padding: '50px', borderRadius: '32px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px' }}>
                        <div>
                            <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Invoice Number</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '5px 0', color: 'white' }}>#{selectedOrder.id}</h2>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> {selectedOrder.date}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> {selectedOrder.address.split(',')[0]}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Grand Total</p>
                            <p style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '5px' }}>LKR {selectedOrder.total}</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <h4 style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Delivery Address</h4>
                            <p style={{ fontWeight: 700, color: 'white', fontSize: '1.2rem', marginBottom: '8px' }}>{selectedOrder.customer}</p>
                            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{selectedOrder.address}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <h4 style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Package Contents</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {selectedOrder.items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.1rem', color: 'white', fontWeight: 600 }}>{item.name}</span>
                                        <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>x{item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div style={{ background: 'rgba(13, 13, 13, 0.4)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '40px', color: 'white', textAlign: 'center' }}>Shipment Progress</h3>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0 40px' }}>
                            {/* Connector Line */}
                            <div style={{
                                position: 'absolute',
                                left: '80px',
                                right: '80px',
                                top: '30px',
                                height: '3px',
                                background: 'rgba(255,255,255,0.05)',
                                zIndex: 0
                            }} />

                            {steps.map((step) => {
                                const status = getStepStatus(step, selectedOrder.status);
                                const isCompleted = status === 'completed';
                                const isActive = status === 'active';

                                let Icon = Clock;
                                if (step === 'Pending') Icon = Package;
                                if (step === 'Processing') Icon = Package;
                                if (step === 'Shipped') Icon = Truck;
                                if (step === 'Delivered') Icon = CheckCircle;

                                return (
                                    <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 1, width: '100px' }}>
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                background: isCompleted ? 'var(--primary)' : isActive ? 'var(--bg-dark)' : 'rgba(255,255,255,0.05)',
                                                borderColor: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                                scale: isActive ? 1.2 : 1
                                            }}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '20px',
                                                border: '2px solid',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: isActive ? '0 0 30px var(--primary-glow)' : 'none'
                                            }}
                                        >
                                            <Icon size={24} color={isCompleted ? 'black' : isActive ? 'var(--primary)' : 'rgba(255,255,255,0.3)'} />
                                        </motion.div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h4 style={{
                                                fontSize: '0.9rem',
                                                fontWeight: 800,
                                                color: isActive ? 'var(--primary)' : isCompleted ? 'white' : 'var(--text-muted)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>{step}</h4>
                                            {isActive && <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginTop: '4px' }}>In Progress</motion.p>}
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
        <div style={{ maxWidth: '1200px', margin: '60px auto', minHeight: '800px', padding: '0 20px' }}>
            <AnimatePresence mode="wait">
                {selectedOrder ? renderOrderDetail() : renderOrderList()}
            </AnimatePresence>
        </div>
    );
};

export default OrderTracking;

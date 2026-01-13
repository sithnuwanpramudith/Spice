import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

const OrderTracking: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [trackingData, setTrackingData] = useState<any>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
            setTrackingData({
                id: orderId.toUpperCase(),
                status: 'In Transit',
                estimatedDelivery: 'January 15, 2026',
                currentLocation: 'Colombo Distribution Center',
                steps: [
                    { status: 'Order Placed', time: 'Jan 10, 2026 10:00 AM', completed: true },
                    { status: 'Processing', time: 'Jan 10, 2026 02:30 PM', completed: true },
                    { status: 'Shipped', time: 'Jan 11, 2026 09:15 AM', completed: true },
                    { status: 'In Transit', time: 'Jan 12, 2026 08:00 AM', completed: false, active: true },
                    { status: 'Out for Delivery', time: 'Expected Jan 15', completed: false },
                    { status: 'Delivered', time: 'Expected Jan 15', completed: false },
                ]
            });
            setIsSearching(false);
        }, 1500);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--primary)' }}>Track Your Journey</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Enter your order ID below to see the current status of your premium spices as they make their way to you.
                </p>
            </motion.div>

            <form onSubmit={handleTrack} style={{ marginBottom: '60px' }}>
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    background: 'var(--bg-card)',
                    padding: '10px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-glass)',
                    boxShadow: 'var(--glow-soft)'
                }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 20px', gap: '15px' }}>
                        <Search size={24} color="var(--primary)" />
                        <input
                            type="text"
                            placeholder="Enter Order ID (e.g., ORD-12345)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.1rem',
                                width: '100%',
                                outline: 'none',
                                height: '50px'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSearching}
                        style={{
                            padding: '0 40px',
                            height: '60px',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '1.1rem'
                        }}
                    >
                        {isSearching ? 'Searching...' : 'Track Now'}
                        {!isSearching && <ArrowRight size={20} />}
                    </button>
                </div>
            </form>

            <AnimatePresence mode="wait">
                {trackingData && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-panel"
                        style={{
                            borderRadius: 'var(--radius-lg)',
                            padding: '40px',
                            border: '1px solid var(--border-glass)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '5px' }}>Order {trackingData.id}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>{trackingData.status}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '5px' }}>Estimated Delivery</p>
                                <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{trackingData.estimatedDelivery}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px' }}>
                            <MapPin size={24} color="var(--primary)" />
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Current Location</p>
                                <p style={{ fontWeight: 600 }}>{trackingData.currentLocation}</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                left: '20px',
                                top: '0',
                                bottom: '0',
                                width: '2px',
                                background: 'rgba(255,255,255,0.1)'
                            }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {trackingData.steps.map((step: any, index: number) => (
                                    <div key={index} style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', position: 'relative' }}>
                                        <div style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '50%',
                                            background: step.completed ? 'var(--primary)' : step.active ? 'var(--bg-dark)' : 'rgba(255,255,255,0.05)',
                                            border: step.active ? '2px solid var(--primary)' : 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                            boxShadow: step.active ? '0 0 15px var(--primary-glow)' : 'none'
                                        }}>
                                            {step.completed ? (
                                                <CheckCircle size={24} color="var(--bg-darker)" />
                                            ) : step.active ? (
                                                <Truck size={20} color="var(--primary)" />
                                            ) : (
                                                <Clock size={20} color="var(--text-muted)" />
                                            )}
                                        </div>
                                        <div>
                                            <p style={{
                                                fontWeight: 700,
                                                fontSize: '1.1rem',
                                                color: step.completed || step.active ? 'white' : 'var(--text-muted)'
                                            }}>{step.status}</p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{step.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!trackingData && !isSearching && (
                <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                    <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                        <Package size={32} color="var(--primary)" style={{ marginBottom: '15px' }} />
                        <h4 style={{ marginBottom: '10px' }}>Securely Packed</h4>
                        <p style={{ fontSize: '0.9rem' }}>Eco-friendly premium packaging.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                        <Truck size={32} color="var(--primary)" style={{ marginBottom: '15px' }} />
                        <h4 style={{ marginBottom: '10px' }}>Global Shipping</h4>
                        <p style={{ fontSize: '0.9rem' }}>Tracked delivery worldwide.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                        <CheckCircle size={32} color="var(--primary)" style={{ marginBottom: '15px' }} />
                        <h4 style={{ marginBottom: '10px' }}>Quality Guaranteed</h4>
                        <p style={{ fontSize: '0.9rem' }}>100% authentic spices.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;

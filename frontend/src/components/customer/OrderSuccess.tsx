import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Download, Truck } from 'lucide-react';

interface OrderSuccessProps {
    orderData: any;
    onContinue: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderData, onContinue }) => {
    return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                style={{ marginBottom: '30px' }}
            >
                <CheckCircle size={80} color="var(--primary)" style={{ margin: '0 auto' }} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Order Confirmed!</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '40px' }}>
                    Thank you for your purchase. Your premium spices are being prepared for shipment.
                </p>

                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-glass)',
                    padding: '30px',
                    maxWidth: '500px',
                    margin: '0 auto 40px',
                    textAlign: 'left'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '15px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Order ID</span>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{orderData.id}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                        {orderData.items.map((item: any) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span style={{ fontWeight: 600 }}>LKR {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid var(--border-glass)' }}>
                        <span style={{ fontWeight: 700 }}>Total Paid</span>
                        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>LKR {orderData.total.toLocaleString()}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button
                        onClick={() => window.print()}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-glass)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        <Download size={18} />
                        Invoice
                    </button>
                    <button
                        onClick={onContinue}
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        Continue Shopping
                        <ArrowRight size={18} />
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '40px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Package size={20} />
                    <span>Handling with care</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Truck size={20} />
                    <span>Fast Delivery</span>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;

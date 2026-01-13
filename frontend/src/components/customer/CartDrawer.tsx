import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1000
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '450px',
                            background: 'var(--bg-darker)',
                            borderLeft: '1px solid var(--border-glass)',
                            boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 1001,
                            padding: '30px'
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <ShoppingBag className="text-primary" size={24} color="var(--primary)" />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Your Cart ({cartCount})</h2>
                            </div>
                            <button
                                onClick={onClose}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '30px', paddingRight: '10px' }}>
                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '100px', opacity: 0.5 }}>
                                    <ShoppingBag size={64} style={{ marginBottom: '20px' }} />
                                    <p>Your cart is empty</p>
                                    <button
                                        onClick={onClose}
                                        className="btn-primary"
                                        style={{ marginTop: '20px' }}
                                    >
                                        Go Shopping
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {cart.map(item => (
                                        <div
                                            key={item.id}
                                            style={{
                                                display: 'flex',
                                                gap: '15px',
                                                padding: '15px',
                                                background: 'var(--bg-card)',
                                                borderRadius: 'var(--radius-md)',
                                                border: '1px solid var(--border-glass)'
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '5px' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '10px' }}>
                                                    LKR {item.price.toLocaleString()}
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        padding: '4px 8px',
                                                        borderRadius: '6px'
                                                    }}>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', opacity: item.quantity <= 1 ? 0.3 : 1 }}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Total Amount</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>LKR {cartTotal.toLocaleString()}</span>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
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
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 2000
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 10,
                            right: 10,
                            bottom: 10,
                            width: 'calc(100% - 20px)',
                            maxWidth: '480px',
                            background: 'rgba(13, 13, 13, 0.95)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '32px',
                            boxShadow: '-20px 0 50px rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 2001,
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '40px 40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Your Selection</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{cartCount} premium items in cart</p>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '100px', opacity: 0.5 }}>
                                    <ShoppingBag size={80} color="var(--primary)" style={{ marginBottom: '30px', opacity: 0.2 }} />
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Your cart is empty.</p>
                                    <button
                                        onClick={onClose}
                                        className="btn-primary"
                                        style={{ marginTop: '30px', padding: '12px 30px', borderRadius: '30px' }}
                                    >
                                        Start Exploring
                                    </button>
                                </div>
                            ) : (
                                cart.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            gap: '20px',
                                            padding: '20px',
                                            background: 'rgba(255,255,255,0.02)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(255,255,255,0.03)'
                                        }}
                                    >
                                        <div style={{ width: '90px', height: '90px', borderRadius: '16px', overflow: 'hidden' }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'color 0.3s ease' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = '#ff4444'}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 800, marginTop: '4px' }}>
                                                LKR {item.price.toLocaleString()}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '12px' }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    padding: '6px 12px',
                                                    borderRadius: '10px',
                                                    border: '1px solid rgba(255,255,255,0.05)'
                                                }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        style={{ background: 'transparent', border: 'none', color: 'white', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', opacity: item.quantity <= 1 ? 0.2 : 1 }}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 800, fontSize: '0.95rem' }}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div style={{
                                padding: '40px',
                                background: 'rgba(255,255,255,0.02)',
                                borderTop: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
                                    <div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Investment</p>
                                        <p style={{ fontSize: '1.2rem', color: 'white', opacity: 0.6 }}>Incl. all taxes</p>
                                    </div>
                                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)' }}>LKR {cartTotal.toLocaleString()}</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onCheckout}
                                    style={{
                                        width: '100%',
                                        padding: '20px',
                                        borderRadius: '20px',
                                        fontSize: '1.1rem',
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        background: 'var(--primary)',
                                        color: 'black',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)'
                                    }}
                                >
                                    Proceed to Checkout <ArrowRight size={20} />
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

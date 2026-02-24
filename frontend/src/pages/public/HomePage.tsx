import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Plus } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import SupplierAddItemForm from '../../components/supplier/SupplierAddItemForm';
import UnifiedLoginModal from '../../components/auth/UnifiedLoginModal';
import { useAuth } from '../../context/AuthContext';
import heroBanner from '../../assets/images/hero-banner.png';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    // const { user } = useAuth(); // Not strictly needed unless hiding sections
    const { products, refreshProducts } = useProducts();
    const { isAuthenticated, logout, user } = useAuth();
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        refreshProducts();
    }, []);

    const memoizedProducts = useMemo(() => products, [products]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white', paddingBottom: '80px' }}>

            {/* Hero Section */}
            <section style={{
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 100px rgba(0,0,0,1)'
            }}>
                {/* Decorative gradients */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1), transparent 70%)',
                    zIndex: 1
                }}></div>
                <div style={{ textAlign: 'center', zIndex: 10, padding: '20px' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}
                    >
                        PREMIUM <span style={{ color: 'var(--primary)' }}>SPICES</span>
                        <br /> FOR YOUR KITCHEN
                    </motion.h1>

                    <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px' }}>
                        {isAuthenticated ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.name}</span>
                                <button className="btn-secondary" onClick={() => navigate(user?.role === 'owner' ? '/admin-dashboard' : '/customer-dashboard')}>Dashboard</button>
                                <button className="btn-icon" onClick={logout} title="Logout"><ArrowRight style={{ transform: 'rotate(180deg)' }} /></button>
                            </div>
                        ) : (
                            <button className="btn-primary" onClick={() => setShowLoginModal(true)}>Login</button>
                        )}
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}
                    >
                        Experience the authentic taste of hand-picked spices delivered directly to your doorstep.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
                    >
                        <button
                            className="btn-primary antigravity-hover"
                            onClick={() => isAuthenticated ? navigate(user?.role === 'owner' ? '/admin-dashboard' : '/customer-dashboard') : setShowLoginModal(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}
                        >
                            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'} <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Supplier Action Section */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', marginBottom: '60px' }}>
                <motion.div
                    className="glass-panel antigravity-hover"
                    whileHover={{ scale: 1.01 }}
                    style={{
                        padding: '60px 40px',
                        borderRadius: '32px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        background: `linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1592323869138-1667b931853a?q=80&w=2070&auto=format&fit=crop')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onClick={() => setShowSupplierModal(true)}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px', color: 'white' }}>Are you a Supplier?</h2>
                        <p style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: 500 }}>Join our premium network. Add your items instantly.</p>
                    </div>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '24px',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black',
                        position: 'relative',
                        zIndex: 2,
                        boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)'
                    }}>
                        <Plus size={35} />
                    </div>
                </motion.div>
            </section>

            {/* Supplier Modal */}
            <AnimatePresence>
                {showSupplierModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <SupplierAddItemForm
                            onClose={() => setShowSupplierModal(false)}
                            onSuccess={() => {
                                refreshProducts();
                                alert('Product added successfully!');
                            }}
                        />
                    </div>
                )}
            </AnimatePresence>

            <UnifiedLoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />

            {/* Products Grid */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>Featured Collection</h2>

                {(!products || products.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Loading premium selection...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                        {memoizedProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                className="glass-panel antigravity-hover"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    padding: '20px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                            >
                                <div style={{
                                    height: '240px',
                                    background: 'rgba(255,255,255,0.02)',
                                    borderRadius: '16px',
                                    marginBottom: '20px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={product.image || (
                                            product.category.toLowerCase().includes('whole') || product.name.toLowerCase().includes('cinnamon')
                                                ? 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=2070&auto=format&fit=crop'
                                                : product.name.toLowerCase().includes('chili')
                                                    ? 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop'
                                                    : product.name.toLowerCase().includes('pepper')
                                                        ? 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=2070&auto=format&fit=crop'
                                                        : 'https://images.unsplash.com/photo-1532336414038-cf0c244b7f14?q=80&w=2076&auto=format&fit=crop'
                                        )}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 70%, rgba(0,0,0,0.7))' }} />
                                </div>
                                <div style={{ marginBottom: 'auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{product.name}</h3>
                                        <span style={{
                                            background: 'rgba(255,255,255,0.1)',
                                            padding: '4px 8px',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem'
                                        }}>{product.category}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>
                                        {product.description}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
                                        LKR {product.price.toLocaleString()}
                                    </span>
                                    <button
                                        className="btn-icon"
                                        style={{
                                            background: 'white',
                                            color: 'black',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <ShoppingBag size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import SupplierAddItemForm from '../components/supplier/SupplierAddItemForm';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    // const { user } = useAuth(); // Not strictly needed unless hiding sections
    const { products, refreshProducts } = useProducts();
    const [showSupplierModal, setShowSupplierModal] = useState(false);

    useEffect(() => {
        refreshProducts();
    }, []);

    const memoizedProducts = useMemo(() => products, [products]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white', paddingBottom: '80px' }}>

            {/* Hero Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15), transparent 70%)'
            }}>
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
                            onClick={() => navigate('/login')}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}
                        >
                            Customer Login <ArrowRight size={20} />
                        </button>
                        <button
                            className="btn-secondary antigravity-hover"
                            onClick={() => navigate('/login')} // Assuming register flow is same as login or similar
                            style={{ fontSize: '1.1rem' }}
                        >
                            Register Now
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
                        padding: '40px',
                        borderRadius: '24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                    }}
                    onClick={() => setShowSupplierModal(true)}
                >
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>Are you a Supplier?</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Click here to add your item instantly.</p>
                    </div>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black'
                    }}>
                        <Plus size={30} />
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
                                    height: '200px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '16px',
                                    marginBottom: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <ShoppingBag size={48} color="rgba(255,255,255,0.2)" />
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
                                        ${product.price.toFixed(2)}
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

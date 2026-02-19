import React from 'react';
// Product Catalog Component
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus } from 'lucide-react';

const getPlaceholderImage = (category: string) => {
    switch (category.toLowerCase()) {
        case 'whole spice': return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop';
        case 'ground spice': return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop';
        default: return 'https://images.unsplash.com/photo-1532336414038-cf0c244b7f14?q=80&w=2076&auto=format&fit=crop';
    }
};

const ProductCatalog: React.FC = () => {
    const { products, loading } = useProducts();
    const { addToCart } = useCart();

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>Loading spices...</div>;
    }

    if (!products || products.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>No products available.</div>;
    }

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '30px', color: 'white' }}>Our Collection</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        className="glass-panel antigravity-hover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>{product.name}</h3>
                                <span style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    color: 'white'
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
                                onClick={() => addToCart({ ...product, image: getPlaceholderImage(product.category) })}
                                className="btn-primary"
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Plus size={16} /> Add
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;

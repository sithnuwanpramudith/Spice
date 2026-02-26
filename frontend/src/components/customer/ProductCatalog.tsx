import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag, Star } from 'lucide-react';

const getPlaceholderImage = (category: string, name: string = '') => {
    const combined = (category + ' ' + name).toLowerCase();
    if (combined.includes('cinnamon') || combined.includes('whole')) {
        return 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=2070&auto=format&fit=crop';
    }
    if (combined.includes('chili') || combined.includes('powder')) {
        return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop';
    }
    if (combined.includes('pepper')) {
        return 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=2070&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1532336414038-cf0c244b7f14?q=80&w=2076&auto=format&fit=crop';
};

const ProductCatalog: React.FC = () => {
    const { products, loading } = useProducts();
    const { addToCart } = useCart();

    if (loading) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'inline-block', marginBottom: '20px' }}
                >
                    <ShoppingBag size={40} color="var(--primary)" />
                </motion.div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Sifting through our premium collection...</div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div style={{ padding: '100px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-glass)' }}>
                <ShoppingBag size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
                <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Our shelves are currently being restocked with fresh arrivals.</div>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 0' }}>
            <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Authentic Selection</span>
                    <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginTop: '10px', color: 'white' }}>The Collection</h2>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Showing <span style={{ color: 'white', fontWeight: 700 }}>{products.length}</span> premium varieties
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px' }}>
                {products.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        style={{
                            padding: '15px',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '25px',
                            left: '25px',
                            zIndex: 2,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(10px)',
                            padding: '6px 14px',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.75rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <Star size={12} fill="var(--primary)" color="var(--primary)" />
                            <span style={{ fontWeight: 700, color: 'white' }}>
                                {product.rating_avg ? product.rating_avg.toFixed(1) : '5.0'}
                            </span>
                            <span style={{ opacity: 0.5, fontSize: '0.65rem' }}>({product.review_count || 0})</span>
                        </div>

                        <div style={{
                            height: '280px',
                            borderRadius: '18px',
                            marginBottom: '20px',
                            position: 'relative',
                            overflow: 'hidden',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                            <img
                                src={product.image || getPlaceholderImage(product.category, product.name)}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                className="product-image"
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))',
                                pointerEvents: 'none'
                            }} />
                            <div style={{ position: 'absolute', top: '25px', right: '25px' }}>
                                <span style={{
                                    background: 'var(--primary)',
                                    color: 'black',
                                    padding: '6px 14px',
                                    borderRadius: '50px',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>{product.category}</span>
                            </div>
                        </div>

                        <div style={{ padding: '0 10px 10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{product.name}</h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                marginBottom: '20px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: '1.5'
                            }}>
                                {product.description}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Price per unit</div>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                                        LKR {product.price.toLocaleString()}
                                    </span>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => addToCart({ ...product, image: product.image || getPlaceholderImage(product.category, product.name) })}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="btn-add-to-cart"
                                    onMouseEnter={(e) => {
                                        const btn = e.currentTarget;
                                        btn.style.background = 'var(--primary)';
                                        btn.style.color = 'black';
                                        btn.style.borderColor = 'var(--primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const btn = e.currentTarget;
                                        btn.style.background = 'rgba(255,255,255,0.05)';
                                        btn.style.color = 'white';
                                        btn.style.borderColor = 'rgba(255,255,255,0.1)';
                                    }}
                                >
                                    <Plus size={24} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;

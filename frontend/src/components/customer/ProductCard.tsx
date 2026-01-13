import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    stock: number;
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    const [showAdded, setShowAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setShowAdded(true);
        setTimeout(() => setShowAdded(false), 2000);
    };

    return (
        <motion.div
            className="glass-card"
            style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            whileHover={{ scale: 1.02 }}
        >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="product-image"
                />
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--bg-glass)',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem',
                    color: 'var(--primary)',
                    border: '1px solid var(--border-glass)'
                }}>
                    {product.category}
                </div>
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{product.name}</h3>
                <p style={{ fontSize: '0.85rem', marginBottom: '16px', flex: 1 }}>{product.description}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>${product.price.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-glass)',
                            color: 'white',
                            padding: '8px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Heart size={18} />
                        </button>
                        <div style={{ position: 'relative' }}>
                            <button
                                className="btn-primary"
                                onClick={handleAddToCart}
                                style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <ShoppingCart size={18} />
                                <span>Add</span>
                            </button>
                            <AnimatePresence>
                                {showAdded && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                                        animate={{ opacity: 1, y: -45, x: '-50%' }}
                                        exit={{ opacity: 0, y: -60, x: '-50%' }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: '50%',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            padding: '6px 12px',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            pointerEvents: 'none',
                                            whiteSpace: 'nowrap',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            zIndex: 10
                                        }}
                                    >
                                        <Check size={14} />
                                        Added to cart!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

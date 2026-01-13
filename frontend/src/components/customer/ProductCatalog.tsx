import { useState } from 'react';
import { MOCK_PRODUCTS, SPICE_CATEGORIES } from '../../utils/constants';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const ProductCatalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>Explore Premium Spices</h2>

                {/* Search and Filter Bar */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search for spices..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '16px 16px 16px 50px',
                                borderRadius: '50px',
                                background: 'var(--bg-glass)',
                                border: '1px solid var(--border-glass)',
                                color: 'white',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {SPICE_CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '50px',
                                    border: '1px solid',
                                    borderColor: selectedCategory === category ? 'var(--primary)' : 'var(--border-glass)',
                                    background: selectedCategory === category ? 'var(--primary)' : 'transparent',
                                    color: selectedCategory === category ? 'var(--bg-dark)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    transition: 'var(--transition-smooth)'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div
                layout
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '30px'
                }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map(product => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
                    <p>No spices found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;

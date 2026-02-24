import React, { useState } from 'react';
import { Package, Plus, Search, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../../components/owner/ProductModal';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pages/dashboard.css';

const ProductsPage: React.FC = () => {
    const { products, loading, updateProduct, deleteProduct } = useProducts();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'stock'>('stock');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleOpenAdd = () => {
        navigate('/admin-dashboard/add-product');
    };

    const handleOpenEdit = (product: any) => {
        navigate(`/admin-dashboard/edit-product/${product.id}`);
    };

    const handleOpenStock = (e: React.MouseEvent, product: any) => {
        e.stopPropagation();
        setModalMode('stock');
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    const handleModalSubmit = async (data: any) => {
        await updateProduct(selectedProduct.id, data);
        setIsModalOpen(false);
    };

    if (loading) return <div className="loading-text">Loading Products...</div>;

    return (
        <div className="animate-fade-in p-4 md:p-6">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>Product Management</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your premium spice inventory</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="btn-primary"
                    style={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)'
                    }}
                >
                    <Plus size={20} /> Add New Product
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '0', borderRadius: '24px', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                        <div className="form-input-group" style={{ marginBottom: 0, width: '300px' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingLeft: '40px', background: 'rgba(255,255,255,0.02)' }}
                                />
                            </div>
                        </div>
                        <select
                            className="glass-input"
                            style={{ width: '180px', marginBottom: 0, paddingLeft: '15px' }}
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Whole Spices">Whole Spices</option>
                            <option value="Powdered Spices">Powdered Spices</option>
                            <option value="Herbs">Herbs</option>
                            <option value="Mixed Spices">Mixed Spices</option>
                            <option value="Organic Herb">Organic Herb</option>
                            <option value="Spice Blend">Spice Blend</option>
                        </select>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Showing {filteredProducts.length} products
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="premium-table">
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ paddingLeft: '32px' }}>Product Details</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock Status</th>
                                <th style={{ textAlign: 'right', paddingRight: '32px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product.id}
                                        className="float-hover-row"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                                    >
                                        <td style={{ padding: '20px 32px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{
                                                    width: '45px', height: '45px',
                                                    borderRadius: '10px',
                                                    background: 'rgba(255,170,0,0.1)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'var(--primary)',
                                                    overflow: 'hidden'
                                                }}>
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <Package size={22} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: '#fff', marginBottom: '3px' }}>{product.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ color: '#ccc' }}>{product.category}</td>
                                        <td>
                                            <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.05rem' }}>
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> / kg</span>
                                        </td>
                                        <td>
                                            <div
                                                onClick={(e) => handleOpenStock(e, product)}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                    padding: '6px 12px', borderRadius: '20px',
                                                    fontSize: '0.85rem', fontWeight: 600,
                                                    cursor: 'pointer',
                                                    background: product.stock > 10 ? 'rgba(74, 222, 128, 0.1)' : product.stock > 0 ? 'rgba(250, 204, 21, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: product.stock > 10 ? '#4ade80' : product.stock > 0 ? '#facc15' : '#ef4444',
                                                    border: `1px solid ${product.stock > 10 ? 'rgba(74, 222, 128, 0.2)' : product.stock > 0 ? 'rgba(250, 204, 21, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                                                }}
                                                title="Click to update stock"
                                            >
                                                {product.stock <= 0 && <AlertTriangle size={12} />}
                                                {product.stock} kg
                                                <span style={{ opacity: 0.7, fontSize: '0.75rem', marginLeft: '4px' }}>({product.status})</span>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: '32px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleOpenEdit(product)}
                                                    className="float-hover"
                                                    style={{
                                                        padding: '8px',
                                                        borderRadius: '8px',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: 'none',
                                                        color: 'white',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="float-hover"
                                                    style={{
                                                        padding: '8px',
                                                        borderRadius: '8px',
                                                        background: 'rgba(239,68,68,0.1)',
                                                        border: 'none',
                                                        color: '#ef4444',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {filteredProducts.length === 0 && (
                        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No products found matching your search.
                        </div>
                    )}
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={selectedProduct}
                mode={modalMode}
            />
        </div>
    );
};

export default ProductsPage;

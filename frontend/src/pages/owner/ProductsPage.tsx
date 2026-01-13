import React, { useState } from 'react';
import { Package, Edit, Trash2, Search, Plus, Database } from 'lucide-react';
import '../../styles/pages/dashboard.css';
import ProductModal from '../../components/owner/ProductModal';
import DeleteModal from '../../components/owner/DeleteModal';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState([
        { id: '1', name: 'Ceylon Cinnamon', category: 'Whole Spice', price: '$24.00', stock: 156, status: 'In Stock' },
        { id: '2', name: 'Black Pepper', category: 'Whole Spice', price: '$18.50', stock: 89, status: 'Low Stock' },
        { id: '3', name: 'Turmeric Powder', category: 'Ground Spice', price: '$12.00', stock: 210, status: 'In Stock' },
        { id: '4', name: 'Cardamom pods', category: 'Whole Spice', price: '$45.00', stock: 12, status: 'Low Stock' },
    ]);

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | 'stock'>('add');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleAdd = () => {
        setModalMode('add');
        setSelectedProduct(null);
        setIsProductModalOpen(true);
    };

    const handleEdit = (product: any) => {
        setModalMode('edit');
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleUpdateStock = (product: any) => {
        setModalMode('stock');
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleDeleteClick = (product: any) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleProductSubmit = (data: any) => {
        if (modalMode === 'add') {
            const newProduct = {
                ...data,
                id: (products.length + 1).toString(),
                price: `$${parseFloat(data.price).toFixed(2)}`,
                stock: parseInt(data.stock),
                status: parseInt(data.stock) > 20 ? 'In Stock' : 'Low Stock'
            };
            setProducts([...products, newProduct]);
        } else if (modalMode === 'edit') {
            setProducts(products.map(p => p.id === selectedProduct.id ? {
                ...p,
                ...data,
                price: `$${parseFloat(data.price).toFixed(2)}`,
                stock: parseInt(data.stock),
                status: parseInt(data.stock) > 20 ? 'In Stock' : 'Low Stock'
            } : p));
        } else if (modalMode === 'stock') {
            setProducts(products.map(p => p.id === selectedProduct.id ? {
                ...p,
                stock: parseInt(data.stock),
                status: parseInt(data.stock) > 20 ? 'In Stock' : 'Low Stock'
            } : p));
        }
    };

    const confirmDelete = () => {
        setProducts(products.filter(p => p.id !== selectedProduct.id));
    };

    return (
        <div className="animate-fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Products Management</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and edit all listed spices in your inventory</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="glass-panel"
                            style={{ padding: '10px 15px 10px 40px', borderRadius: '10px', color: 'white', border: '1px solid var(--border-glass)' }}
                        />
                    </div>
                    <button className="btn-primary float-hover" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>
            </header>

            <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="float-hover-row">
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Package size={20} color="var(--primary)" />
                                        </div>
                                        <p style={{ fontWeight: 600 }}>{p.name}</p>
                                    </div>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{p.category}</td>
                                <td style={{ fontWeight: 700 }}>{p.price}</td>
                                <td>{p.stock} units</td>
                                <td>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '50px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: p.status === 'In Stock' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 170, 0, 0.1)',
                                        color: p.status === 'In Stock' ? '#4ade80' : '#ffaa00'
                                    }}>
                                        {p.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button className="float-hover" onClick={() => handleUpdateStock(p)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }} title="Update Stock">
                                            <Database size={18} />
                                        </button>
                                        <button className="float-hover" onClick={() => handleEdit(p)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }} title="Edit Product">
                                            <Edit size={18} />
                                        </button>
                                        <button className="float-hover" onClick={() => handleDeleteClick(p)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} title="Delete Product">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onSubmit={handleProductSubmit}
                initialData={selectedProduct}
                mode={modalMode}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={selectedProduct?.name || ''}
            />
        </div>
    );
};

export default ProductsPage;

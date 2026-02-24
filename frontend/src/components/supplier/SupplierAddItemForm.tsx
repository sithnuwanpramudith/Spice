import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, DollarSign, Tag, Archive, X } from 'lucide-react';
import { productService } from '../../services/productService';

interface SupplierAddItemFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

const SupplierAddItemForm: React.FC<SupplierAddItemFormProps> = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Whole Spice',
        price: '',
        stock: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            setError(null);
            await productService.addProduct({
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                description: formData.description
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel"
            style={{
                padding: '40px',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                background: 'rgba(20, 20, 20, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
            <button
                onClick={onClose}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
                <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'white' }}>Add New Product</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Fill in the details to list your new spice.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Product Name</label>
                    <div style={{ position: 'relative' }}>
                        <Package size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            required
                            type="text"
                            placeholder="e.g., Ceylon Cinnamon"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Price ($)</label>
                        <div style={{ position: 'relative' }}>
                            <DollarSign size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Stock Qty</label>
                        <div style={{ position: 'relative' }}>
                            <Archive size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="number"
                                placeholder="0"
                                value={formData.stock}
                                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Category</label>
                    <div style={{ position: 'relative' }}>
                        <Tag size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="Whole Spice" style={{ background: '#222' }}>Whole Spice</option>
                            <option value="Ground Spice" style={{ background: '#222' }}>Ground Spice</option>
                            <option value="Blended Spice" style={{ background: '#222' }}>Blended Spice</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>Description</label>
                    <textarea
                        required
                        rows={3}
                        placeholder="Describe product quality, origin..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none' }}
                    />
                </div>

                {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}

                <button
                    type="submit"
                    className="btn-primary antigravity-hover"
                    disabled={loading}
                    style={{ marginTop: '10px' }}
                >
                    {loading ? 'Adding Product...' : 'Submit Product'}
                </button>
            </form>
        </motion.div>
    );
};

export default SupplierAddItemForm;

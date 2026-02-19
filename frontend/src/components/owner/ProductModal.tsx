import React, { useState, useEffect } from 'react';
import { X, Package, DollarSign, List, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateProduct } from '../../utils/validators';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
    mode: 'add' | 'edit' | 'stock';
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [formData, setFormData] = useState<any>({
        name: '',
        price: '',
        category: 'Whole Spice',
        stock: '',
        description: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                price: initialData.price.toString().replace('$', ''),
                stock: initialData.stock.toString()
            });
        } else {
            setFormData({
                name: '',
                price: '',
                category: 'Whole Spice',
                stock: '',
                description: ''
            });
        }
        setErrors({});
    }, [initialData, mode, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev: { [key: string]: string }) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'stock') {
            if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
                setErrors({ stock: 'Please enter a valid stock amount' });
                return;
            }
            onSubmit({ ...initialData, stock: Number(formData.stock) });
            onClose();
            return;
        }

        const { isValid, errors: validationErrors } = validateProduct(formData);
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay">
                    <motion.div
                        className="glass-panel modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={e => e.stopPropagation()}
                        style={{ width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '32px', position: 'relative', margin: 'auto' }}
                    >
                        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>

                        <header style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                                {mode === 'add' ? 'Add New Spice' : mode === 'edit' ? 'Edit Spice' : 'Update Stock'}
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {mode === 'stock' ? `Adjust stock levels for ${initialData?.name}` : 'Fill in the premium spice details below'}
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {mode !== 'stock' && (
                                <>
                                    <div className="form-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                            <Package size={14} /> Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Ceylon Cinnamon"
                                            className="glass-input"
                                            style={{ border: errors.name ? '1px solid #ff4444' : '1px solid var(--border-glass)' }}
                                        />
                                        {errors.name && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px' }}>{errors.name}</p>}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="form-group">
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                                <DollarSign size={14} /> Price ($)
                                            </label>
                                            <input
                                                type="text"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                className="glass-input"
                                                style={{ border: errors.price ? '1px solid #ff4444' : '1px solid var(--border-glass)' }}
                                            />
                                            {errors.price && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px' }}>{errors.price}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                                <List size={14} /> Category
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="glass-input"
                                                style={{ background: 'rgba(20, 20, 20, 0.9)', cursor: 'pointer' }}
                                            >
                                                <option value="Whole Spice">Whole Spice</option>
                                                <option value="Ground Spice">Ground Spice</option>
                                                <option value="Organic Herb">Organic Herb</option>
                                                <option value="Spice Blend">Spice Blend</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    <Database size={14} /> {mode === 'stock' ? 'Update Quantity' : 'Initial Stock'}
                                </label>
                                <input
                                    type="text"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="glass-input"
                                    style={{ border: errors.stock ? '1px solid #ff4444' : '1px solid var(--border-glass)' }}
                                />
                                {errors.stock && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px' }}>{errors.stock}</p>}
                            </div>

                            {mode !== 'stock' && (
                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the spice quality, origin..."
                                        className="glass-input"
                                        rows={3}
                                        style={{ resize: 'none' }}
                                    />
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                <button type="button" onClick={onClose} className="glass-panel float-hover" style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'transparent' }}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary float-hover" style={{ flex: 1, padding: '14px', borderRadius: '12px' }}>
                                    {mode === 'add' ? 'Create Product' : mode === 'edit' ? 'Save Changes' : 'Update Stock'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;

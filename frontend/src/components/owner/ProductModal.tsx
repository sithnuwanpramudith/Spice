import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database } from 'lucide-react';
import '../../styles/pages/dashboard.css';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
    mode: 'stock';
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [formData, setFormData] = useState<any>({
        stock: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                stock: initialData.stock.toString()
            });
        }
        setErrors({});
    }, [initialData, mode, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
            setErrors({ stock: 'Please enter a valid stock amount' });
            return;
        }
        onSubmit({ ...initialData, stock: Number(formData.stock) });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    padding: '20px'
                }}>
                    <motion.div
                        className="glass-panel modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={e => e.stopPropagation()}
                        style={{ width: '100%', maxWidth: '400px', padding: '40px', borderRadius: '32px', position: 'relative' }}
                    >
                        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>

                        <header style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Update Stock</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Adjust stock levels for {initialData?.name}
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    <Database size={14} /> Quantity (kg)
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

                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                <button type="button" onClick={onClose} className="glass-panel float-hover" style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'transparent' }}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary float-hover" style={{ flex: 1, padding: '14px', borderRadius: '12px' }}>
                                    Update Stock
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

import React, { useState } from 'react';
import { validateProduct } from '../../utils/validators';
import { Package, DollarSign, List, Database, CheckCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/dashboard.css';

const AddProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validateProduct(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        console.log('Product submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', price: '', category: '', stock: '', description: '' });
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
            <button
                onClick={() => navigate('/owner/products')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '20px' }}
                className="float-hover"
            >
                <ChevronLeft size={18} />
                <span>Back to Products</span>
            </button>

            <header style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Add New Spice</h2>
                <p style={{ color: 'var(--text-muted)' }}>List a new premium spice in the marketplace</p>
            </header>

            <form onSubmit={handleSubmit} className="glass-panel anti-gravity" style={{ padding: '40px', borderRadius: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div className="form-input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Spice Name</label>
                        <div style={{ position: 'relative' }}>
                            <Package size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: errors.name ? '#ff4444' : 'var(--text-muted)' }} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Premium Ceylon Cinnamon"
                                style={{ paddingLeft: '45px', borderColor: errors.name ? '#ff4444' : '' }}
                            />
                        </div>
                        {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className="form-input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category</label>
                        <div style={{ position: 'relative' }}>
                            <List size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: errors.category ? '#ff4444' : 'var(--text-muted)' }} />
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{ paddingLeft: '45px', borderColor: errors.category ? '#ff4444' : '' }}
                            >
                                <option value="">Select Category</option>
                                <option value="Whole Spices">Whole Spices</option>
                                <option value="Powdered Spices">Powdered Spices</option>
                                <option value="Herbs">Herbs</option>
                                <option value="Mixed Spices">Mixed Spices</option>
                            </select>
                        </div>
                        {errors.category && <p className="form-error">{errors.category}</p>}
                    </div>

                    <div className="form-input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Estimated Price (per kg)</label>
                        <div style={{ position: 'relative' }}>
                            <DollarSign size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: errors.price ? '#ff4444' : 'var(--text-muted)' }} />
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                style={{ paddingLeft: '45px', borderColor: errors.price ? '#ff4444' : '' }}
                            />
                        </div>
                        {errors.price && <p className="form-error">{errors.price}</p>}
                    </div>

                    <div className="form-input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Initial Stock</label>
                        <div style={{ position: 'relative' }}>
                            <Database size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: errors.stock ? '#ff4444' : 'var(--text-muted)' }} />
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Quantity in kg"
                                style={{ paddingLeft: '45px', borderColor: errors.stock ? '#ff4444' : '' }}
                            />
                        </div>
                        {errors.stock && <p className="form-error">{errors.stock}</p>}
                    </div>
                </div>

                <div className="form-input-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Detail the spice quality, origin, and characteristics..."
                        style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                    ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button type="submit" className="btn-primary float-hover" style={{ padding: '15px 40px', fontSize: '1rem' }}>
                        {submitted ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={20} /> Product Added!</span>
                        ) : 'Create Spice Listing'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;

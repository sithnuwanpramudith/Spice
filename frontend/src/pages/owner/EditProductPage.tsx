import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    DollarSign,
    Database,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Sparkles,
    Image as ImageIcon,
    Upload,
    X
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { validateProduct } from '../../utils/validators';
import '../../styles/pages/dashboard.css';

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, updateProduct, loading } = useProducts();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Whole Spices',
        stock: '',
        description: '',
        image: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const categories = [
        'Whole Spices',
        'Powdered Spices',
        'Herbs',
        'Mixed Spices',
        'Organic Herb',
        'Spice Blend'
    ];

    // Load product data
    useEffect(() => {
        if (!loading && products.length > 0) {
            const product = products.find(p => p.id === id);
            if (product) {
                setFormData({
                    name: product.name,
                    price: product.price.toString(),
                    category: product.category,
                    stock: product.stock.toString(),
                    description: product.description || '',
                    image: product.image || ''
                });
                setImagePreview(product.image || null);
            } else {
                // Product not found, navigate back
                navigate('/admin-dashboard/products');
            }
        }
    }, [id, products, loading, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setFormData(prev => ({ ...prev, image: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({ ...prev, image: '' }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateProduct(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsSubmitting(true);
        try {
            if (id) {
                await updateProduct(id, {
                    name: formData.name,
                    category: formData.category,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    description: formData.description,
                    image: formData.image
                });
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/admin-dashboard/products');
                }, 2000);
            }
        } catch (error) {
            console.error('Failed to update product:', error);
            setErrors({ submit: 'Failed to update product. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && products.length === 0) {
        return <div className="loading-text">Loading Product Details...</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100%', paddingBottom: '40px' }}>
            {/* Background decorative elements */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '50px', left: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                    <button
                        onClick={() => navigate('/admin-dashboard/products')}
                        className="glass-panel float-hover"
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-glass)',
                            background: 'rgba(255,255,255,0.03)',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'white', letterSpacing: '-1px', marginBottom: '5px' }}>
                            Edit <span style={{ color: 'var(--primary)', position: 'relative' }}>
                                Spice
                                <Sparkles size={16} style={{ position: 'absolute', top: '-10px', right: '-20px', color: 'var(--primary)' }} />
                            </span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Refine the details of your premium listing</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', alignItems: 'start' }}>
                    {/* Main Form Section */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '40px', borderRadius: '32px', border: '1px solid var(--border-glass)', background: 'rgba(20, 20, 20, 0.4)', backdropFilter: 'blur(10px)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Package size={20} color="var(--primary)" /> Basic Information
                            </h3>

                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Product Name</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Hand-picked Ceylon Cinnamon"
                                        className="glass-input"
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            fontSize: '1rem',
                                            borderColor: errors.name ? 'rgba(239, 68, 68, 0.5)' : 'var(--border-glass)'
                                        }}
                                    />
                                    {errors.name && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <AlertCircle size={12} /> {errors.name}
                                    </div>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="glass-input"
                                        style={{ width: '100%', padding: '16px 20px', background: 'rgba(10, 10, 10, 0.8)', cursor: 'pointer' }}
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Base Price ($)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            step="0.01"
                                            className="glass-input"
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px 16px 45px',
                                                borderColor: errors.price ? 'rgba(239, 68, 68, 0.5)' : 'var(--border-glass)'
                                            }}
                                        />
                                        <DollarSign size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        {errors.price && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{errors.price}</div>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '40px', borderRadius: '32px', border: '1px solid var(--border-glass)', background: 'rgba(20, 20, 20, 0.4)', backdropFilter: 'blur(10px)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ImageIcon size={20} color="var(--primary)" /> Product Visual
                            </h3>

                            <div
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    borderRadius: '20px',
                                    border: '2px dashed var(--border-glass)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    background: 'rgba(255,255,255,0.02)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                                className="upload-zone"
                                onClick={() => document.getElementById('image-upload')?.click()}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                            style={{ position: 'absolute', top: '15px', right: '15px', width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.9)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
                                        >
                                            <X size={18} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ padding: '15px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)' }}>
                                            <Upload size={24} />
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontWeight: 600, color: 'white', marginBottom: '4px' }}>Upload Spice Image</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>JPG, PNG or WEBP (Max 5MB)</p>
                                        </div>
                                    </>
                                )}
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '40px', borderRadius: '32px', border: '1px solid var(--border-glass)', background: 'rgba(20, 20, 20, 0.4)', backdropFilter: 'blur(10px)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Database size={20} color="var(--primary)" /> Inventory & Details
                            </h3>

                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Stock (kg)</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="glass-input"
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderColor: errors.stock ? 'rgba(239, 68, 68, 0.5)' : 'var(--border-glass)'
                                    }}
                                />
                                {errors.stock && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{errors.stock}</div>}
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Product Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the aroma, origin, and quality grade of this spice..."
                                    className="glass-input"
                                    rows={5}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        resize: 'none',
                                        borderColor: errors.description ? 'rgba(239, 68, 68, 0.5)' : 'var(--border-glass)'
                                    }}
                                />
                                {errors.description && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{errors.description}</div>}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '15px' }}>
                            <button
                                type="button"
                                onClick={() => navigate('/admin-dashboard/products')}
                                className="glass-panel float-hover"
                                style={{
                                    flex: 1,
                                    padding: '20px',
                                    borderRadius: '18px',
                                    fontWeight: 700,
                                    background: 'transparent',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer'
                                }}
                            >
                                Discard Changes
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className="btn-primary float-hover"
                                style={{
                                    flex: 2,
                                    padding: '20px',
                                    borderRadius: '18px',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    {isSuccess ? (
                                        <motion.span
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <CheckCircle2 size={24} /> Changes Saved!
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="default"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            {isSubmitting ? 'Updating...' : 'Save Product Changes'}
                                            {!isSubmitting && <ArrowRight size={20} />}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                        {errors.submit && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '10px' }}>{errors.submit}</p>}
                    </form>

                    {/* Preview Sidebar */}
                    <motion.div variants={itemVariants} style={{ position: 'sticky', top: '40px' }}>
                        <div className="glass-panel" style={{ padding: '30px', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(10, 10, 10, 0.4))', border: '1px solid var(--border-glass)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                                <Sparkles size={18} color="var(--primary)" />
                                <h4 style={{ fontWeight: 700, letterSpacing: '0.5px' }}>Live Preview</h4>
                            </div>

                            <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)', marginBottom: '20px', position: 'relative' }}>
                                <div style={{ height: '180px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.1)' }}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Live Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <Package size={60} />
                                    )}
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <div>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>{formData.category || 'Category'}</p>
                                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{formData.name || 'Spice Name'}</h4>
                                        </div>
                                        <div style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(212,175,55,0.1)', color: 'var(--primary)', fontWeight: 800 }}>
                                            ${formData.price || '0.00'}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px', height: '3em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {formData.description || 'Provide a compelling description of your spice to attract potential buyers...'}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: Number(formData.stock) > 0 ? '#4ade80' : '#666' }}></div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formData.stock || '0'} kg available</span>
                                        </div>
                                        <button disabled style={{ padding: '8px 15px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>Details</button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <CheckCircle2 size={16} color="#4ade80" />
                                    <span>Changes will reflect instantly</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <CheckCircle2 size={16} color="#4ade80" />
                                    <span>Updating images may take a second</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <style>{`
                .glass-input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-glass);
                    border-radius: 15px;
                    color: white;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .glass-input:focus {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
                }
                .btn-primary:disabled {
                    cursor: not-allowed;
                }
                .upload-zone:hover {
                    border-color: var(--primary);
                    background: rgba(212, 175, 55, 0.05);
                }
                .loading-text {
                    color: white;
                    text-align: center;
                    padding: 100px;
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                }
            `}</style>
        </div>
    );
};

export default EditProductPage;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Tag, X, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface Props {
    onClose: () => void;
}

const CATEGORIES = ['Pepper', 'Cinnamon', 'Chili', 'Cardamom', 'Turmeric', 'Cloves', 'Mixed Spices', 'Other'];

const SupplierRegisterForm: React.FC<Props> = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', whatsapp: '', category: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/suppliers/register', formData);
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '12px 12px 12px 44px',
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px', color: 'white', outline: 'none', fontSize: '0.95rem',
        boxSizing: 'border-box',
    };
    const iconStyle: React.CSSProperties = {
        position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
        color: 'rgba(212,175,55,0.7)',
    };

    if (success) return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '60px 40px', background: 'rgba(10,10,10,0.97)', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '460px', width: '100%' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(74,222,128,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle size={40} color="#4ade80" />
            </div>
            <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>Application Received!</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', lineHeight: 1.6 }}>
                Thank you for registering. Our team will review your application and contact you soon via WhatsApp or email.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', padding: '14px' }}>Done</button>
        </motion.div>
    );

    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            style={{ background: 'rgba(10,10,10,0.97)', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', width: '100%', maxWidth: '500px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>

            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
            </button>

            <div style={{ marginBottom: '32px' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(212,175,55,0.1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Tag size={24} color="var(--primary)" />
                </div>
                <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Become a Supplier</h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>Join our premium spice network. Fill in your details and we'll get in touch.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Name */}
                <div style={{ position: 'relative' }}>
                    <User size={16} style={iconStyle} />
                    <input required name="name" placeholder="Full Name / Business Name" value={formData.name} onChange={handleChange} style={inputStyle} />
                </div>

                {/* Email */}
                <div style={{ position: 'relative' }}>
                    <Mail size={16} style={iconStyle} />
                    <input required name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} />
                </div>

                {/* Phone + WhatsApp */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ position: 'relative' }}>
                        <Phone size={16} style={iconStyle} />
                        <input required name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <MessageSquare size={16} style={iconStyle} />
                        <input name="whatsapp" placeholder="WhatsApp No." value={formData.whatsapp} onChange={handleChange} style={inputStyle} />
                    </div>
                </div>

                {/* Category */}
                <div style={{ position: 'relative' }}>
                    <Tag size={16} style={iconStyle} />
                    <select required name="category" value={formData.category} onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
                        <option value="" style={{ background: '#111' }}>Select Spice Category</option>
                        {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
                    </select>
                </div>

                {/* Message */}
                <textarea name="message" rows={3} placeholder="Tell us about your products and supply capacity (optional)"
                    value={formData.message} onChange={handleChange}
                    style={{ ...inputStyle, padding: '12px', resize: 'none' }} />

                {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{error}</p>}

                <button type="submit" className="btn-primary" disabled={loading}
                    style={{ marginTop: '8px', padding: '14px', fontSize: '1rem', fontWeight: 700 }}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </motion.div>
    );
};

export default SupplierRegisterForm;

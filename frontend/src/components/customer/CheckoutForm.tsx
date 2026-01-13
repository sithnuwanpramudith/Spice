import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CheckoutFormProps {
    onSuccess: (orderData: any) => void;
    onCancel: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel }) => {
    const { cart, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            // Simulate order processing
            const orderData = {
                id: `ORD-${Math.floor(Math.random() * 1000000)}`,
                items: cart,
                total: cartTotal,
                customer: formData,
                date: new Date().toISOString()
            };
            onSuccess(orderData);
            clearCart();
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
                {[1, 2].map(num => (
                    <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: step === num ? 1 : 0.4 }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: step === num ? 'var(--primary)' : 'var(--border-glass)',
                            color: step === num ? 'var(--bg-dark)' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700
                        }}>
                            {num}
                        </div>
                        <span style={{ fontWeight: 600 }}>{num === 1 ? 'Shipping' : 'Payment'}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {step === 1 ? (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Shipping Information</h3>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Full Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email Address</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Delivery Address</label>
                            <input
                                required
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Spice Street"
                                style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>City</label>
                                <input
                                    required
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Colombo"
                                    style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Zip Code</label>
                                <input
                                    required
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="00100"
                                    style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Payment Details</h3>
                        <div style={{
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
                            padding: '30px',
                            borderRadius: '16px',
                            border: '1px solid var(--border-glass)',
                            marginBottom: '10px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--primary)', opacity: 0.1, borderRadius: '50%' }}></div>
                            <CreditCard size={32} color="var(--primary)" style={{ marginBottom: '20px' }} />
                            <div style={{ fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 600, marginBottom: '20px' }}>
                                {formData.cardNumber || '**** **** **** ****'}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{formData.name || 'YOUR NAME'}</span>
                                <span>{formData.expiry || 'MM/YY'}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Card Number</label>
                            <input
                                required
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="4111 2222 3333 4444"
                                style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Expiry Date</label>
                                <input
                                    required
                                    type="text"
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>CVV</label>
                                <input
                                    required
                                    type="password"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    placeholder="***"
                                    style={{ width: '100%', padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'white' }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                            <ShieldCheck size={20} color="var(--primary)" />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Your payment is secured with industry-standard encryption.</span>
                        </div>
                    </motion.div>
                )}

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '30px' }}>
                    {step === 1 ? (
                        <button type="button" onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Cancel
                        </button>
                    ) : (
                        <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ChevronLeft size={18} />
                            Shipping Info
                        </button>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payable Amount</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>LKR {cartTotal.toLocaleString()}</p>
                        </div>
                        <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>{step === 1 ? 'Next: Payment' : 'Place Order'}</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;

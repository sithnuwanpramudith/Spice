import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

import { useOrders } from '../../context/OrderContext';

interface CheckoutFormProps {
    onSuccess: (orderData: any) => void;
    onCancel: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel }) => {
    const { cart, cartTotal, clearCart } = useCart();
    const { addOrder } = useOrders();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            // Process order
            const orderData: any = {
                id: `ORD-${Math.floor(Math.random() * 1000000)}`,
                items: cart,
                total: `LKR ${cartTotal.toLocaleString()}`,
                customer: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                address: `${formData.address}, ${formData.city}`,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                status: 'Pending',
                timestamp: Date.now()
            };

            await addOrder(orderData);
            onSuccess(orderData);
            clearCart();
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', color: 'white' }}>
            {/* Premium Stepper */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
                {[1, 2].map(num => (
                    <div key={num} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        paddingBottom: '12px',
                        borderBottom: `2px solid ${step === num ? 'var(--primary)' : 'transparent'}`,
                        transition: 'all 0.3s ease',
                        opacity: step === num ? 1 : 0.4
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: step === num ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: step === num ? 'var(--bg-dark)' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                        }}>
                            {num}
                        </div>
                        <span style={{ fontWeight: 700, letterSpacing: '0.5px', fontSize: '0.9rem' }}>{num === 1 ? 'SHIPPING' : 'PAYMENT'}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
                        >
                            <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '25px', color: 'var(--primary)' }}>Delivery Details</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>FULL NAME</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>EMAIL</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>WHATSAPP</label>
                                            <input
                                                required
                                                type="tel"
                                                name="whatsapp"
                                                value={formData.whatsapp}
                                                onChange={handleChange}
                                                placeholder="+94 77..."
                                                style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>STREET ADDRESS</label>
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="House number, Street name"
                                            style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>CITY</label>
                                            <input
                                                required
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>POSTAL CODE</label>
                                            <input
                                                required
                                                type="text"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
                        >
                            <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '25px', color: 'var(--primary)' }}>Secure Payment</h3>

                                {/* Visual Card Representation */}
                                <div style={{
                                    background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                                    padding: '30px',
                                    borderRadius: '20px',
                                    marginBottom: '30px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '180px', height: '180px', background: 'var(--primary)', opacity: 0.05, borderRadius: '50%' }}></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                                        <CreditCard size={40} color="var(--primary)" />
                                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800, letterSpacing: '2px' }}>PREMIUM CARD</span>
                                    </div>
                                    <div style={{ fontSize: '1.3rem', letterSpacing: '4px', fontWeight: 600, color: 'white', marginBottom: '30px', fontFamily: 'monospace' }}>
                                        {formData.cardNumber ? formData.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '**** **** **** ****'}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                                        <div>
                                            <p style={{ fontSize: '0.6rem', marginBottom: '4px' }}>CARD HOLDER</p>
                                            {formData.name || 'YOUR NAME'}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.6rem', marginBottom: '4px' }}>EXPIRES</p>
                                            {formData.expiry || 'MM/YY'}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>CARD NUMBER</label>
                                        <input
                                            required
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            placeholder="0000 0000 0000 0000"
                                            maxLength={16}
                                            style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>EXPIRY</label>
                                            <input
                                                required
                                                type="text"
                                                name="expiry"
                                                value={formData.expiry}
                                                onChange={handleChange}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>CVV</label>
                                            <input
                                                required
                                                type="password"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                placeholder="***"
                                                maxLength={3}
                                                style={{ width: '100%', padding: '14px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', background: 'rgba(74, 222, 128, 0.05)', borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.1)' }}>
                                        <ShieldCheck size={20} color="#4ade80" />
                                        <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 500 }}>Bank-grade encryption active</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
                    {step === 1 ? (
                        <button type="button" onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            CANCEL
                        </button>
                    ) : (
                        <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ChevronLeft size={18} />
                            BACK
                        </button>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800, letterSpacing: '1px' }}>TOTAL</p>
                            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>LKR {cartTotal.toLocaleString()}</p>
                        </div>
                        <button type="submit" className="btn-primary" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            borderRadius: '16px',
                            fontWeight: 800,
                            letterSpacing: '1px',
                            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)'
                        }}>
                            <span>{step === 1 ? 'NEXT' : 'PLACE ORDER'}</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;

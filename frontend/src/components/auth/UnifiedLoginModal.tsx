import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UnifiedLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UnifiedLoginModal: React.FC<UnifiedLoginModalProps> = ({ isOpen, onClose }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // In a real app, the backend would return the user data with role.
            // Our mock AuthContext handles this.
            // For the demo:
            // if email contains 'admin' -> admin role
            // else -> customer role
            const role = email.toLowerCase().includes('admin') ? 'owner' : 'customer';

            await login({ email, password, role });

            onClose();

            // Redirect based on role as requested
            if (role === 'owner') {
                navigate('/admin-dashboard');
            } else {
                navigate('/customer-dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose} style={{
                    position: 'fixed', inset: 0, zIndex: 2000,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px'
                }}>
                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '450px', width: '100%', padding: '40px',
                            borderRadius: '32px', position: 'relative',
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute', right: '20px', top: '20px',
                                background: 'rgba(255,255,255,0.05)', border: 'none',
                                color: 'white', padding: '8px', borderRadius: '12px', cursor: 'pointer'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={{
                                width: '60px', height: '60px', background: 'var(--primary)',
                                borderRadius: '18px', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', margin: '0 auto 20px', color: 'black'
                            }}>
                                <Lock size={30} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Welcome Back</h2>
                            <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Enter your credentials to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{
                                        padding: '12px', borderRadius: '12px',
                                        background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                                        fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px'
                                    }}
                                >
                                    <AlertCircle size={18} />
                                    {error}
                                </motion.div>
                            )}

                            <div className="form-input-group" style={{ marginBottom: 0 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)' }}
                                    />
                                </div>
                            </div>

                            <div className="form-input-group" style={{ marginBottom: 0 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)' }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary antigravity-hover"
                                style={{
                                    marginTop: '10px', width: '100%', padding: '16px',
                                    fontSize: '1rem', fontWeight: 700, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', gap: '10px'
                                }}
                            >
                                {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={20} />
                            </button>
                        </form>

                        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <p>Don't have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Sign up</span></p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UnifiedLoginModal;

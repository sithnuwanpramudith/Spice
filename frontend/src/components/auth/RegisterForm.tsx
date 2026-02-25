import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface RegisterFormProps {
    onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(name, email, password);
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
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
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)' }}
                    />
                </div>
            </div>

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
                {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={20} />
            </button>
        </form>
    );
};

export default RegisterForm;

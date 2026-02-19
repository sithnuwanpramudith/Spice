import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import type { LoginCredentials } from '../../context/AuthContext';

const CustomerLoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!credentials.email) newErrors.email = 'Email is required';
        if (!credentials.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[e.target.name];
                return next;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const user = await login(credentials);
            if (user.role === 'owner') navigate('/admin-dashboard');
            else navigate('/customer-dashboard');
        } catch (error) {
            setErrors({ general: 'Invalid credentials.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--primary)' }}>Customer Login</h2>
            <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>Welcome back! Access your kitchen.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {errors.general && (
                    <div style={{ padding: '10px', background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} /> {errors.general}
                    </div>
                )}

                <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }} />
                    {errors.email && <p style={{ color: '#ff4444', fontSize: '0.75rem' }}>{errors.email}</p>}
                </div>

                <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }} />
                    {errors.password && <p style={{ color: '#ff4444', fontSize: '0.75rem' }}>{errors.password}</p>}
                </div>

                <button type="submit" className="btn-primary antigravity-hover" disabled={loading} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={18} />
                </button>
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <a href="/register" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.3s ease' }} className="hover-text-primary">
                        Don't have an account? <span style={{ textDecoration: 'underline' }}>Register</span>
                    </a>
                </div>
            </form>
        </div>
    );
};

export default CustomerLoginForm;

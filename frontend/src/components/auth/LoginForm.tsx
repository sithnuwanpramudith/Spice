import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import type { LoginCredentials } from '../../context/AuthContext';

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: '',
        role: 'customer'
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!credentials.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(credentials.email)) newErrors.email = 'Email is invalid';

        if (!credentials.password) newErrors.password = 'Password is required';
        else if (credentials.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev: { [key: string]: string }) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await login(credentials);
            if (credentials.role === 'owner') navigate('/owner');
            else navigate('/customer');
        } catch (error) {
            setErrors({ general: 'Invalid credentials. Please try again.' });
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--primary)' }}>Welcome Back</h2>
            <p style={{ marginBottom: '30px' }}>Sign in to access your spices portal</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {errors.general && (
                    <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} />
                        {errors.general}
                    </div>
                )}

                <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: errors.email ? '#ff4444' : 'var(--text-muted)' }} />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={credentials.email}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 40px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(255,255,255,0.05)',
                            border: `1px solid ${errors.email ? '#ff4444' : 'var(--border-glass)'}`,
                            color: 'white',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                    />
                    {errors.email && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px' }}>{errors.email}</p>}
                </div>

                <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: errors.password ? '#ff4444' : 'var(--text-muted)' }} />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 40px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(255,255,255,0.05)',
                            border: `1px solid ${errors.password ? '#ff4444' : 'var(--border-glass)'}`,
                            color: 'white',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                    />
                    {errors.password && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px' }}>{errors.password}</p>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Login as:</label>
                    <select
                        name="role"
                        value={credentials.role}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-glass)',
                            color: 'white',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="customer" style={{ backgroundColor: '#1a1a1a' }}>Customer</option>
                        <option value="owner" style={{ backgroundColor: '#1a1a1a' }}>Business Owner</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px' }}>
                    {loading ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;

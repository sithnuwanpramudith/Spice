import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Users,
    Package,
    ShoppingCart,
    TrendingUp,
    LogOut,
    Settings
} from 'lucide-react';
import OwnerRoutes from '../routes/OwnerRoutes';
import '../styles/pages/dashboard.css';

const OwnerDashboardPage = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: TrendingUp, path: '/owner' },
        { name: 'Suppliers', icon: Users, path: '/owner/suppliers' },
        { name: 'Products', icon: Package, path: '/owner/products' }, // Placeholder for products list if needed
        { name: 'Orders', icon: ShoppingCart, path: '/owner/orders' },
        { name: 'Reports', icon: TrendingUp, path: '/owner/reports' }, // Using TrendingUp for reports too
        { name: 'Settings', icon: Settings, path: '/owner/settings' },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-darker)', color: 'white' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                borderRight: '1px solid var(--border-glass)',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                height: '100vh',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div
                    onClick={() => navigate('/owner')}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 10px', cursor: 'pointer' }}
                >
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', boxShadow: '0 0 15px var(--primary-glow)' }}></div>
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>OWNER PANEL</h1>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path === '/owner' && location.pathname === '/owner/');
                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    width: '100%',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: 600
                                }}
                                className={isActive ? '' : 'float-hover'}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div className="glass-panel float-hover" style={{ padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--accent))' }}></div>
                        <div style={{ overflow: 'hidden' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="float-hover"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'rgba(255, 68, 68, 0.05)',
                            color: '#ff4444',
                            cursor: 'pointer',
                            width: '100%',
                            fontWeight: 600
                        }}
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', position: 'relative' }}>
                <OwnerRoutes />
            </main>
        </div>
    );
};

export default OwnerDashboardPage;

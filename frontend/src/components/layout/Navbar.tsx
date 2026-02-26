import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import '../../styles/components/navbar.css';

import logo from '../../assets/images/logo.png';
import UnifiedLoginModal from '../auth/UnifiedLoginModal';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    activeTab: 'shop' | 'track' | 'summary' | 'rate';
    setActiveTab: (tab: 'shop' | 'track' | 'summary' | 'rate') => void;
    setIsCartOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, setIsCartOpen }) => {
    const { logout, user, isAuthenticated } = useAuth();
    const { cartCount } = useCart();
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <header className="navbar" style={{
            height: '80px',
            background: 'rgba(13, 13, 13, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '0 40px'
        }}>
            <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={logo} alt="Spices Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                <h1 className="hide-on-mobile" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px', color: 'white' }}>SPICES</h1>
            </div>

            <nav className="navbar-nav" style={{ display: 'flex', gap: '40px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                {['shop', 'track', 'summary', 'rate'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className="navbar-btn"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '10px 0',
                            position: 'relative',
                            transition: 'color 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        {tab === 'shop' ? 'The Collection' : tab === 'track' ? 'Orders' : tab === 'summary' ? 'Journal' : 'Rate'}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="nav-underline"
                                style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: 0,
                                    right: 0,
                                    height: '2.5px',
                                    background: 'var(--primary)',
                                    borderRadius: '2px',
                                    boxShadow: '0 0 10px var(--primary-glow)'
                                }}
                            />
                        )}
                    </button>
                ))}
            </nav>

            <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <div
                    className="cart-icon-wrapper"
                    onClick={() => setIsCartOpen(true)}
                    style={{
                        position: 'relative',
                        cursor: 'pointer',
                        padding: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <ShoppingBag size={22} color="var(--primary)" />
                    {cartCount > 0 && (
                        <span className="cart-badge" style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            background: 'white',
                            color: 'black',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid var(--bg-dark)'
                        }}>{cartCount}</span>
                    )}
                </div>

                <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {isAuthenticated ? (
                        <>
                            <div
                                className="user-info hide-on-mobile"
                                onClick={() => navigate(user?.role === 'owner' ? '/admin-dashboard' : '/customer-dashboard')}
                                style={{ cursor: 'pointer', textAlign: 'right' }}
                            >
                                <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>{user?.name || 'User'}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, textTransform: 'capitalize' }}>{user?.role}</p>
                            </div>
                            <div style={{ padding: '8px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
                                <User size={20} />
                            </div>
                            <button
                                onClick={logout}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    transition: 'color 0.3s ease'
                                }}
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </>
                    ) : (
                        <button className="btn-primary" style={{ padding: '10px 25px', borderRadius: '30px' }} onClick={() => setIsLoginOpen(true)}>Login</button>
                    )}
                </div>
            </div>

            <UnifiedLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </header>
    );
};

export default Navbar;

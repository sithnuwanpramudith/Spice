import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import '../../styles/components/navbar.css';

import logo from '../../assets/images/logo.png';
import UnifiedLoginModal from '../auth/UnifiedLoginModal';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    activeTab: 'shop' | 'track';
    setActiveTab: (tab: 'shop' | 'track') => void;
    setIsCartOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, setIsCartOpen }) => {
    const { logout, user, isAuthenticated } = useAuth();
    const { cartCount } = useCart();
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <header className="navbar">
            <div className="navbar-logo" onClick={() => setActiveTab('shop')}>
                <img src={logo} alt="Spices Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                <h1 className="hide-on-mobile">SPICES</h1>
            </div>

            <nav className="navbar-nav">
                <button
                    onClick={() => setActiveTab('shop')}
                    className="navbar-btn"
                    style={{ color: activeTab === 'shop' ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                    Shop
                    {activeTab === 'shop' && (
                        <motion.div
                            layoutId="nav-underline"
                            style={{
                                position: 'absolute',
                                bottom: '-2px',
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: 'var(--primary)'
                            }}
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('track')}
                    className="navbar-btn"
                    style={{ color: activeTab === 'track' ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                    Track Order
                    {activeTab === 'track' && (
                        <motion.div
                            layoutId="nav-underline"
                            style={{
                                position: 'absolute',
                                bottom: '-2px',
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: 'var(--primary)'
                            }}
                        />
                    )}
                </button>
            </nav>

            <div className="navbar-actions">
                <div className="cart-icon-wrapper" onClick={() => setIsCartOpen(true)}>
                    <ShoppingBag size={22} />
                    <span className="cart-badge">{cartCount}</span>
                </div>

                <div className="user-profile">
                    {isAuthenticated ? (
                        <>
                            <div className="user-info hide-on-mobile" onClick={() => navigate(user?.role === 'owner' ? '/admin-dashboard' : '/customer-dashboard')} style={{ cursor: 'pointer' }}>
                                <p>{user?.name || 'User'}</p>
                                <p style={{ textTransform: 'capitalize' }}>{user?.role}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="logout-btn"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <button className="btn-primary" onClick={() => setIsLoginOpen(true)}>Login</button>
                    )}
                </div>
            </div>

            <UnifiedLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </header>
    );
};

export default Navbar;

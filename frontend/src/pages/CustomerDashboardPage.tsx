import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCatalog from '../components/customer/ProductCatalog';
import { LogOut, ShoppingBag, Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from '../components/common/Modal';
import AddProductForm from '../components/supplier/AddProductForm';
import CartDrawer from '../components/customer/CartDrawer';
import CheckoutForm from '../components/customer/CheckoutForm';
import OrderSuccess from '../components/customer/OrderSuccess';
import OrderTracking from '../components/customer/OrderTracking';
import { motion } from 'framer-motion';

const CustomerDashboardPage = () => {
    const { logout, user } = useAuth();
    const { cartCount } = useCart();
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'none' | 'checkout' | 'success'>('none');
    const [orderData, setOrderData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'shop' | 'track'>('shop');

    const handleAddProduct = (data: any) => {
        console.log('Product added:', data);
        setIsProductModalOpen(false);
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        setCheckoutStep('checkout');
    };

    const handleOrderSuccess = (data: any) => {
        setOrderData(data);
        setCheckoutStep('success');
    };

    const handleContinueShopping = () => {
        setCheckoutStep('none');
        setOrderData(null);
        setActiveTab('shop');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Premium Header */}
            <header style={{
                height: '80px',
                borderBottom: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 40px',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(5, 5, 5, 0.8)',
                backdropFilter: 'blur(10px)'
            }}>
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                    onClick={() => setActiveTab('shop')}
                >
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px' }}></div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>SPICES</h1>
                </div>

                <nav style={{ display: 'flex', gap: '30px' }}>
                    <button
                        onClick={() => setActiveTab('shop')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'shop' ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'var(--transition-smooth)',
                            position: 'relative'
                        }}
                    >
                        Shop
                        {activeTab === 'shop' && (
                            <motion.div layoutId="nav-underline" style={{ position: 'absolute', bottom: '-28px', left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('track')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'track' ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'var(--transition-smooth)',
                            position: 'relative'
                        }}
                    >
                        Track Order
                        {activeTab === 'track' && (
                            <motion.div layoutId="nav-underline" style={{ position: 'absolute', bottom: '-28px', left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />
                        )}
                    </button>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <button
                        onClick={() => setIsProductModalOpen(true)}
                        className="btn-primary"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            fontSize: '0.9rem'
                        }}
                    >
                        <Plus size={18} />
                        <span>Supplier Add Items</span>
                    </button>

                    <div
                        onClick={() => setIsCartOpen(true)}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <ShoppingBag size={24} />
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'var(--accent)',
                            color: 'white',
                            fontSize: '0.7rem',
                            padding: '2px 6px',
                            borderRadius: '50px'
                        }}>{cartCount}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-glass)', paddingLeft: '30px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>{user?.name || 'Guest'}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer</p>
                        </div>
                        <button
                            onClick={logout}
                            style={{
                                background: 'rgba(255, 0, 0, 0.1)',
                                color: '#ff4444',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {activeTab === 'shop' ? (
                    <ProductCatalog />
                ) : (
                    <OrderTracking />
                )}
            </main>

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onCheckout={handleCheckout}
            />

            {/* Checkout/Success Modal */}
            <Modal
                isOpen={checkoutStep !== 'none'}
                onClose={() => setCheckoutStep('none')}
                title={checkoutStep === 'checkout' ? "Complete Your Order" : "Order Success"}
            >
                {checkoutStep === 'checkout' ? (
                    <CheckoutForm
                        onSuccess={handleOrderSuccess}
                        onCancel={() => setCheckoutStep('none')}
                    />
                ) : (
                    <OrderSuccess
                        orderData={orderData}
                        onContinue={handleContinueShopping}
                    />
                )}
            </Modal>

            {/* Supplier Add Modal */}
            <Modal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                title="Add New Spice Product"
            >
                <AddProductForm
                    onSubmit={handleAddProduct}
                    onCancel={() => setIsProductModalOpen(false)}
                />
            </Modal>

            {/* Footer */}
            <footer style={{
                padding: '60px 40px',
                borderTop: '1px solid var(--border-glass)',
                marginTop: '60px',
                textAlign: 'center'
            }}>
                <p style={{ color: 'var(--text-muted)' }}>© 2026 SPICES Premium Quality Spices. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CustomerDashboardPage;


import ProductCatalog from '../../components/customer/ProductCatalog';

import { useState } from 'react';
import Modal from '../../components/common/Modal';

import CartDrawer from '../../components/customer/CartDrawer';
import CheckoutForm from '../../components/customer/CheckoutForm';
import OrderSuccess from '../../components/customer/OrderSuccess';
import OrderTracking from '../../components/customer/OrderTracking';
import Navbar from '../../components/layout/Navbar';
import PurchaseSummary from '../../components/customer/PurchaseSummary';
import RateProducts from '../../components/customer/RateProducts';

const CustomerDashboardPage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'none' | 'checkout' | 'success'>('none');
    const [orderData, setOrderData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'shop' | 'track' | 'summary' | 'rate'>('shop');


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
            <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsCartOpen={setIsCartOpen}
            />

            {/* Main Content */}
            <main style={{ padding: '20px 0' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    {activeTab === 'shop' && <ProductCatalog />}
                    {activeTab === 'track' && <OrderTracking />}
                    {activeTab === 'summary' && <PurchaseSummary />}
                    {activeTab === 'rate' && <RateProducts />}
                </div>
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


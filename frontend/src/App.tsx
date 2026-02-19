import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <OrderProvider>
                <ProductProvider>
                    <CartProvider>
                        <AppRoutes />
                    </CartProvider>
                </ProductProvider>
            </OrderProvider>
        </AuthProvider>
    );
}

export default App;

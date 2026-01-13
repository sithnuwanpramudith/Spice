import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <OrderProvider>
                <CartProvider>
                    <AppRoutes />
                </CartProvider>
            </OrderProvider>
        </AuthProvider>
    );
}

export default App;

import CustomerLoginForm from '../../components/auth/CustomerLoginForm';
import { motion } from 'framer-motion';

import '../../styles/pages/dashboard.css';

const LoginPage = () => {

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent), radial-gradient(circle at bottom left, rgba(128, 0, 0, 0.1), transparent)',
            padding: '20px',
            position: 'relative'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        SPICES
                    </h1>
                    <p style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Premium Quality Spices
                    </p>
                </div>
                <CustomerLoginForm />


            </motion.div>
        </div>
    );
};

export default LoginPage;

import OwnerLoginForm from '../components/auth/OwnerLoginForm';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/dashboard.css';

const OwnerLoginPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at bottom right, rgba(0, 0, 0, 0.4), transparent), var(--bg-dark)',
            padding: '20px'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>
                        Administration
                    </h1>
                </div>
                <OwnerLoginForm />

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={() => navigate('/login')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                        &larr; Back to Customer Login
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OwnerLoginPage;

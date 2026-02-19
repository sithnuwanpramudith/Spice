import React from 'react';
import { motion } from 'framer-motion';

const SupplierDashboardPage: React.FC = () => {
    return (
        <div style={{ padding: '40px', color: 'white' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Supplier Dashboard</h1>
                <p>Welcome to the Supplier Portal.</p>
                {/* Future implementation for Add Item will go here or be linked here */}
            </motion.div>
        </div>
    );
};

export default SupplierDashboardPage;

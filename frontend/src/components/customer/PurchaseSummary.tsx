import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Box, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface SummaryItem {
    name: string;
    totalQuantity: number;
    totalSpent: number;
}

const PurchaseSummary = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState<SummaryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            if (!user?.email) return;
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/user/${user.email}`);
                const orders = response.data;

                // Aggregate items
                const itemMap: { [key: string]: SummaryItem } = {};
                orders.forEach((order: any) => {
                    order.items.forEach((item: any) => {
                        if (!itemMap[item.name]) {
                            itemMap[item.name] = { name: item.name, totalQuantity: 0, totalSpent: 0 };
                        }
                        itemMap[item.name].totalQuantity += item.quantity;
                        itemMap[item.name].totalSpent += item.quantity * item.price;
                    });
                });

                setSummary(Object.values(itemMap));
            } catch (error) {
                console.error('Error fetching summary:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [user]);

    if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '40px' }}>Loading summary...</div>;
    if (summary.length === 0) return (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
            <ShoppingBag size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>No orders found yet. Start shopping to see your summary!</p>
        </div>
    );

    return (
        <div className="summary-container" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TrendingUp size={24} style={{ color: 'var(--primary)' }} />
                Your Spices Summary
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {summary.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{
                            padding: '24px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'rgba(255, 184, 0, 0.1)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)'
                        }}>
                            <Box size={24} />
                        </div>
                        <div>
                            <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>{item.name}</h4>
                            <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <span>Total: {item.totalQuantity} units</span>
                                <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
                                <span>LKR {item.totalSpent.toLocaleString()}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseSummary;

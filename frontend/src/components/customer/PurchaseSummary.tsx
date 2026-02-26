import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Box, TrendingUp, Award, Calendar } from 'lucide-react';
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

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <TrendingUp size={48} color="var(--primary)" />
            </motion.div>
        </div>
    );

    if (summary.length === 0) return (
        <div style={{ padding: '100px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-glass)' }}>
            <ShoppingBag size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>You haven't made any purchases yet. Your spice journal is empty!</p>
        </div>
    );

    const totalInvestment = summary.reduce((acc, curr) => acc + curr.totalSpent, 0);
    const totalItems = summary.reduce((acc, curr) => acc + curr.totalQuantity, 0);

    return (
        <div className="summary-container" style={{ padding: '40px 0' }}>
            <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Purchase Analytics</span>
                    <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginTop: '10px', color: 'white' }}>Your Spice Journal</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Investment</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>LKR {totalInvestment.toLocaleString()}</div>
                </div>
            </header>

            {/* Top Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginBottom: '50px' }}>
                <div className="glass-card" style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '16px', color: 'var(--primary)' }}>
                        <Award size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Varieties</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{summary.length}</div>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '16px', color: 'var(--primary)' }}>
                        <Box size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Units</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{totalItems}</div>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '16px', color: 'var(--primary)' }}>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Account Standing</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Premium</div>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '30px' }}>Item Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                {summary.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card"
                        style={{
                            padding: '25px',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            border: '1px solid rgba(255,255,255,0.03)'
                        }}
                    >
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{item.name}</h4>
                            <div style={{ display: 'flex', gap: '15px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <span style={{ fontWeight: 600 }}>{item.totalQuantity} units</span>
                                <span style={{ opacity: 0.3 }}>|</span>
                                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>LKR {item.totalSpent.toLocaleString()}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseSummary;

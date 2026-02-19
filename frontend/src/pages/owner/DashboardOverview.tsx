import React, { useState } from 'react';
import StatCard from '../../components/owner/StatCard';
import { TrendingUp, Users, Package, ShoppingCart } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ProductModal from '../../components/owner/ProductModal';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/dashboard.css';

const DashboardOverview: React.FC = () => {
    const navigate = useNavigate();
    const { addProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalSubmit = async (data: any) => {
        await addProduct(data);
        setIsModalOpen(false);
    };

    const handleQuickAction = (action: any) => {
        if (action.name === 'Add Product') {
            setIsModalOpen(true);
        } else {
            navigate(action.path);
        }
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <header style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Overview</h2>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back. Here's what's happening today.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '30px',
                marginBottom: '40px'
            }}>
                <StatCard title="Total Revenue" value="$42,500" icon={TrendingUp} trend="+12.5%" />
                <StatCard title="Active Suppliers" value="18" icon={Users} trend="+2 new" />
                <StatCard title="Total Products" value="156" icon={Package} trend="+5 this week" />
                <StatCard title="Pending Orders" value="24" icon={ShoppingCart} trend="-4.3%" isPositive={false} />
            </div>

            <div className="dashboard-grid" style={{ marginBottom: '40px' }}>
                <div className="glass-panel anti-gravity" style={{ padding: '30px', borderRadius: '24px', gridColumn: 'span 2', height: '450px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Sales Analytics</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Monthly performance overview</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {['Week', 'Month', 'Year'].map(t => (
                                <button key={t} className="glass-panel" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', color: t === 'Month' ? 'var(--primary)' : 'white' }}>{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="chart-container">
                        {[40, 65, 45, 90, 75, 55, 80, 45, 70, 85, 60, 95].map((h, i) => (
                            <div key={i} className="chart-bar" style={{ height: `${h}%` }}>
                                <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: 'var(--primary)', opacity: 0.8 }}>{h}k</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel float-hover" style={{ padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {[
                            { name: 'Add Product', icon: Package, path: '#', color: 'var(--primary)' },
                            { name: 'Supplier List', icon: Users, path: '/owner/suppliers', color: '#4ade80' },
                            { name: 'Reports', icon: TrendingUp, path: '/owner/reports', color: '#60a5fa' },
                            { name: 'New Order', icon: ShoppingCart, path: '/owner/orders', color: '#f87171' }
                        ].map(action => (
                            <button
                                key={action.name}
                                onClick={() => handleQuickAction(action)}
                                className="glass-panel float-hover"
                                style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'pointer'
                                }}
                            >
                                <action.icon size={24} color={action.color} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{action.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                mode="add"
            />

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default DashboardOverview;

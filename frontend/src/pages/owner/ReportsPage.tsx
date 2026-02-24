import React from 'react';
import { TrendingUp, Award, DollarSign, Calendar } from 'lucide-react';
import '../../styles/pages/dashboard.css';

const ReportsPage: React.FC = () => {
    const stats = [
        { title: 'Avg Order Value', value: 'LKR 8,420', icon: DollarSign, trend: '+5.4%' },
        { title: 'Conversion Rate', value: '3.2%', icon: TrendingUp, trend: '+0.8%' },
        { title: 'Best Seller', value: 'Cinnamon', icon: Award, trend: '420 kg' },
        { title: 'Active Days', value: '28/31', icon: Calendar, trend: '90%' },
    ];

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Business Reports</h2>
                <p style={{ color: 'var(--text-muted)' }}>Detailed analytics and performance metrics for your spice empire</p>
            </header>

            <div className="summary-grid" style={{ marginBottom: '40px' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="glass-panel float-hover" style={{ padding: '25px', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                            <div style={{ padding: '10px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
                                <stat.icon size={20} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 600 }}>{stat.trend}</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '5px' }}>{stat.title}</p>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Revenue Growth (Last 6 Months)</h3>
                    <div className="chart-container" style={{ height: '350px' }}>
                        {[60, 45, 85, 65, 95, 80].map((h, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                <div className="chart-bar" style={{ height: `${h}%`, width: '100%' }}>
                                    <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontWeight: 700, color: 'var(--primary)' }}>LKR {h}k</div>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Top Categories</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                            { name: 'Whole Spices', value: '45%', color: 'var(--primary)' },
                            { name: 'Ground Spices', value: '30%', color: '#4ade80' },
                            { name: 'Organic Herbs', value: '15%', color: '#60a5fa' },
                            { name: 'Mixed Blends', value: '10%', color: '#f87171' }
                        ].map((cat, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                                    <span>{cat.name}</span>
                                    <span style={{ fontWeight: 700 }}>{cat.value}</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: cat.value, background: cat.color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;

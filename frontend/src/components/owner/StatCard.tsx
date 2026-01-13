import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: any;
    trend: string;
    isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, isPositive = true }) => {
    return (
        <div className="glass-card float-hover" style={{ padding: '24px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '12px', borderRadius: '14px' }}>
                    <Icon size={24} style={{ color: 'var(--primary)' }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '50px',
                    background: isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 68, 68, 0.1)',
                    color: isPositive ? '#4ade80' : '#ff4444',
                    fontSize: '0.75rem',
                    fontWeight: 600
                }}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {trend}
                </div>
            </div>
            <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{title}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white' }}>{value}</h3>
                </div>
            </div>
        </div>
    );
};

export default StatCard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supplierService } from '../../services/supplierService';
import type { Supplier } from '../../services/supplierService';
import { User, MoreVertical, Search, Filter, ArrowUpRight } from 'lucide-react';
import '../../styles/pages/dashboard.css';

const SupplierListPage: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        supplierService.getSuppliers().then(data => {
            setSuppliers(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div style={{ color: 'var(--primary)', padding: '40px' }}>Loading suppliers...</div>;

    return (
        <div className="animate-fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Supplier Management</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and monitor all spice suppliers</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            className="glass-panel"
                            style={{ padding: '10px 15px 10px 40px', borderRadius: '10px', color: 'white', border: '1px solid var(--border-glass)' }}
                        />
                    </div>
                    <button className="glass-panel float-hover" style={{ padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </header>

            <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Supplier</th>
                            <th>Category</th>
                            <th>Rating</th>
                            <th>Orders</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(s => (
                            <tr key={s.id} className="float-hover-row" onClick={() => navigate(`/owner/suppliers/${s.id}`)} style={{ cursor: 'pointer' }}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={20} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>{s.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{s.category}</td>
                                <td>
                                    <div style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ fontSize: '1rem' }}>★</span>
                                        {s.rating}
                                    </div>
                                </td>
                                <td style={{ fontWeight: 600 }}>{s.totalOrders}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '50px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: s.status === 'active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                                        color: s.status === 'active' ? '#4ade80' : 'var(--primary)'
                                    }}>
                                        {s.status.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                        <button className="float-hover" style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}>
                                            <ArrowUpRight size={18} />
                                        </button>
                                        <button className="float-hover" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierListPage;

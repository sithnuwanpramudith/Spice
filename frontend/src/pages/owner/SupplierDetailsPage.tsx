import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supplierService } from '../../services/supplierService';
import type { Supplier } from '../../services/supplierService';
import { ChevronLeft, Mail, Phone, MapPin, Package, Star, Clock } from 'lucide-react';
import '../../styles/pages/dashboard.css';

const SupplierDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            supplierService.getSupplierById(id).then(data => {
                setSupplier(data || null);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return <div style={{ color: 'var(--primary)', padding: '40px' }}>Loading supplier details...</div>;
    if (!supplier) return <div style={{ padding: '40px' }}>Supplier not found</div>;

    return (
        <div className="animate-fade-in">
            <button
                onClick={() => navigate('/owner/suppliers')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '20px' }}
                className="float-hover"
            >
                <ChevronLeft size={18} />
                <span>Back to Suppliers</span>
            </button>

            <div className="dashboard-grid">
                <div className="glass-panel" style={{ padding: '40px', borderRadius: '32px', gridColumn: 'span 2', display: 'flex', gap: '40px' }}>
                    <div style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 800, color: 'white' }}>
                        {supplier.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '5px' }}>{supplier.name}</h2>
                                <p style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px' }}>{supplier.category.toUpperCase()}</p>
                            </div>
                            <span style={{
                                padding: '6px 16px',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                background: 'rgba(74, 222, 128, 0.1)',
                                color: '#4ade80',
                                border: '1px solid rgba(74, 222, 128, 0.2)'
                            }}>
                                {supplier.status.toUpperCase()}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Mail size={18} color="var(--text-muted)" />
                                <span style={{ fontSize: '0.9rem' }}>{supplier.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Phone size={18} color="var(--text-muted)" />
                                <span style={{ fontSize: '0.9rem' }}>{supplier.phone}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <MapPin size={18} color="var(--text-muted)" />
                                <span style={{ fontSize: '0.9rem' }}>Sri Lanka</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel float-hover" style={{ padding: '30px', borderRadius: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Performance Rating</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Star size={32} color="var(--primary)" fill="var(--primary)" />
                        <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{supplier.rating}</span>
                        <span style={{ color: 'var(--text-muted)', marginTop: '10px' }}>/ 5.0</span>
                    </div>
                    <p style={{ marginTop: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Based on the last 12 months of delivery accuracy and spice quality.</p>
                </div>

                <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '25px' }}>Recent Deliveries</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="float-hover-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                                        <Package size={18} color="var(--primary)" />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600 }}>Batch #SP-{2034 + i}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{supplier.category.split(',')[0]} - 50kg</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Dec {10 + i}, 2023</p>
                                    <p style={{ fontSize: '0.75rem', color: '#4ade80' }}>Verified</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel float-hover" style={{ padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Clock size={24} color="var(--primary)" />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{supplier.totalOrders}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Deliveries</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetailsPage;

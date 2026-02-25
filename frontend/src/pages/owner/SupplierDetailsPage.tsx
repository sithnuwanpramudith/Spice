import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supplierService } from '../../services/supplierService';
import type { Supplier } from '../../services/supplierService';
import { ChevronLeft, Mail, Phone, Tag, MessageCircle, Star, CheckCircle, Clock, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
    active: { label: 'Active', bg: 'rgba(74,222,128,0.1)', color: '#4ade80', icon: CheckCircle },
    pending: { label: 'Pending Review', bg: 'rgba(212,175,55,0.1)', color: '#d4af37', icon: Clock },
    inactive: { label: 'Inactive', bg: 'rgba(239,68,68,0.1)', color: '#ef4444', icon: XCircle },
};

const normalizePhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('94')) return digits;
    if (digits.startsWith('0')) return '94' + digits.slice(1);
    return '94' + digits;
};

const buildWhatsAppUrl = (whatsapp: string, name: string): string => {
    const number = normalizePhone(whatsapp);
    const msg = encodeURIComponent(`Hi ${name}, I'm the admin of Spices. I'd like to discuss your supplier application and partnership opportunities.`);
    return `https://web.whatsapp.com/send?phone=${number}&text=${msg}`;
};

const SupplierDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (id) {
            supplierService.getSupplierById(id).then(data => {
                setSupplier(data || null);
                setLoading(false);
            });
        }
    }, [id]);

    const handleStatusChange = async (status: Supplier['status']) => {
        if (!supplier) return;
        setUpdating(true);
        await supplierService.updateSupplierStatus(supplier.id, status);
        setSupplier({ ...supplier, status });
        setUpdating(false);
    };

    if (loading) return <div style={{ color: 'var(--primary)', padding: '40px' }}>Loading...</div>;
    if (!supplier) return <div style={{ padding: '40px', color: 'white' }}>Supplier not found</div>;

    const statusCfg = STATUS_CONFIG[supplier.status] || STATUS_CONFIG.pending;
    const StatusIcon = statusCfg.icon;
    const whatsappNum = supplier.whatsapp || supplier.phone;

    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate('/owner/suppliers')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '28px', fontSize: '0.95rem' }}>
                <ChevronLeft size={18} /> Back to Suppliers
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
                {/* Profile Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-panel"
                    style={{ padding: '40px', borderRadius: '28px', gridColumn: 'span 2', display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Avatar */}
                    <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, var(--primary), rgba(212,175,55,0.4))', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', fontWeight: 800, color: 'black', flexShrink: 0 }}>
                        {supplier.name.charAt(0).toUpperCase()}
                    </div>

                    <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>{supplier.name}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                                    <Tag size={14} /> {supplier.category}
                                </div>
                            </div>
                            <span style={{ padding: '8px 18px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 700, background: statusCfg.bg, color: statusCfg.color, display: 'flex', alignItems: 'center', gap: '7px' }}>
                                <StatusIcon size={13} /> {statusCfg.label}
                            </span>
                        </div>

                        {/* Contact Info */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '28px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <Mail size={16} color="var(--text-muted)" /> {supplier.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <Phone size={16} color="var(--text-muted)" /> {supplier.phone}
                            </div>
                            {supplier.whatsapp && supplier.whatsapp !== supplier.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#25d366', fontSize: '0.9rem' }}>
                                    <MessageCircle size={16} /> {supplier.whatsapp}
                                </div>
                            )}
                        </div>

                        {/* Message/Note */}
                        {supplier.message && (
                            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', borderLeft: '3px solid rgba(212,175,55,0.4)' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Supplier Note</p>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>{supplier.message}</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* WhatsApp CTA */}
                <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    href={buildWhatsAppUrl(whatsappNum, supplier.name)} target="_blank" rel="noreferrer"
                    className="glass-panel"
                    style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textDecoration: 'none', cursor: 'pointer', border: '1px solid rgba(37,211,102,0.2)', textAlign: 'center', transition: 'all 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(37,211,102,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageCircle size={30} color="#25d366" />
                    </div>
                    <div>
                        <p style={{ color: '#25d366', fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>Chat on WhatsApp</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{whatsappNum}</p>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Opens WhatsApp with a pre-written message</p>
                </motion.a>

                {/* Rating / Performance */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="glass-panel"
                    style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Performance</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Star size={32} color="var(--primary)" fill="var(--primary)" />
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>{supplier.rating || '—'}</span>
                        <span style={{ color: 'var(--text-muted)', marginTop: '8px' }}>/ 5.0</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total deliveries: <strong style={{ color: 'white' }}>{supplier.totalOrders}</strong></p>
                </motion.div>

                {/* Status Actions */}
                {supplier.status !== 'active' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="glass-panel" style={{ padding: '32px', borderRadius: '24px', gridColumn: 'span 2', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', flex: 1 }}>Review this supplier's application:</p>
                        <button onClick={() => handleStatusChange('active')} disabled={updating}
                            style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontWeight: 700, fontSize: '0.9rem' }}>
                            {updating ? '...' : '✓ Approve Supplier'}
                        </button>
                        <button onClick={() => handleStatusChange('inactive')} disabled={updating}
                            style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, fontSize: '0.9rem' }}>
                            ✕ Reject
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SupplierDetailsPage;

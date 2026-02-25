import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supplierService } from '../../services/supplierService';
import type { Supplier } from '../../services/supplierService';
import { User, Search, MessageCircle, Phone, Mail, ChevronRight, Check, Clock, X, Tag } from 'lucide-react';
import { buildWhatsAppUrl as generateWhatsAppUrl } from '../../utils/whatsapp';

const STATUS_CONFIG = {
    active: { label: 'Active', bg: 'rgba(74,222,128,0.1)', color: '#4ade80', icon: Check },
    pending: { label: 'Pending', bg: 'rgba(212,175,55,0.1)', color: '#d4af37', icon: Clock },
    inactive: { label: 'Inactive', bg: 'rgba(239,68,68,0.1)', color: '#ef4444', icon: X },
};

const buildWhatsAppUrl = (whatsapp: string, name: string): string => {
    const msg = `Hi ${name}, I'm the admin of Spices. I'd like to discuss your supplier application.`;
    return generateWhatsAppUrl(whatsapp, msg);
};

const SupplierListPage: React.FC = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | Supplier['status']>('all');
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchSuppliers = () => {
        setLoading(true);
        supplierService.getSuppliers().then(data => {
            setSuppliers(data);
            setLoading(false);
        });
    };

    useEffect(() => { fetchSuppliers(); }, []);

    const handleStatusChange = async (id: string, status: Supplier['status']) => {
        setUpdatingId(id);
        await supplierService.updateSupplierStatus(id, status);
        setSuppliers(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        setUpdatingId(null);
    };

    const filtered = suppliers.filter(s =>
        (statusFilter === 'all' || s.status === statusFilter) &&
        (s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()) ||
            s.category.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Supplier Network</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                        {suppliers.length} registered &bull; {suppliers.filter(s => s.status === 'pending').length} pending review
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search suppliers..."
                            style={{ padding: '10px 16px 10px 38px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none', minWidth: '200px' }} />
                    </div>
                    {/* Filter Pills */}
                    {(['all', 'active', 'pending', 'inactive'] as const).map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            style={{ padding: '8px 18px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', textTransform: 'capitalize', background: statusFilter === s ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: statusFilter === s ? 'black' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                            {s}
                        </button>
                    ))}
                </div>
            </header>

            {/* Cards Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading suppliers...</div>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
                    <User size={40} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '1.1rem' }}>No suppliers found</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}>
                    <AnimatePresence>
                        {filtered.map((supplier, i) => {
                            const statusCfg = STATUS_CONFIG[supplier.status] || STATUS_CONFIG.pending;
                            const StatusIcon = statusCfg.icon;
                            const whatsappNum = supplier.whatsapp || supplier.phone;
                            return (
                                <motion.div key={supplier.id}
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                                    className="glass-panel"
                                    style={{ padding: '28px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                    {/* Top Row: Avatar + Status */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '54px', height: '54px', background: 'linear-gradient(135deg, var(--primary), rgba(212,175,55,0.4))', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, color: 'black', flexShrink: 0 }}>
                                                {supplier.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', marginBottom: '3px' }}>{supplier.name}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                                                    <Tag size={12} />
                                                    {supplier.category}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status badge */}
                                        <span style={{ padding: '5px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, background: statusCfg.bg, color: statusCfg.color, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <StatusIcon size={11} />
                                            {statusCfg.label}
                                        </span>
                                    </div>

                                    {/* Contact Info */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                            <Mail size={14} style={{ flexShrink: 0 }} /> {supplier.email}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                            <Phone size={14} style={{ flexShrink: 0 }} /> {supplier.phone}
                                        </div>
                                        {supplier.message && (
                                            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', fontStyle: 'italic', marginTop: '4px', lineHeight: 1.5, borderLeft: '2px solid rgba(212,175,55,0.3)', paddingLeft: '10px' }}>
                                                "{supplier.message.slice(0, 80)}{supplier.message.length > 80 ? '...' : ''}"
                                            </p>
                                        )}
                                    </div>

                                    {/* Status change buttons */}
                                    {supplier.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => handleStatusChange(supplier.id, 'active')} disabled={updatingId === supplier.id}
                                                style={{ flex: 1, padding: '9px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontWeight: 700, fontSize: '0.82rem' }}>
                                                {updatingId === supplier.id ? '...' : '✓ Approve'}
                                            </button>
                                            <button onClick={() => handleStatusChange(supplier.id, 'inactive')} disabled={updatingId === supplier.id}
                                                style={{ flex: 1, padding: '9px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, fontSize: '0.82rem' }}>
                                                ✕ Reject
                                            </button>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                                        {/* WhatsApp Chat */}
                                        {whatsappNum && (
                                            <a href={buildWhatsAppUrl(whatsappNum, supplier.name)} target="_blank" rel="noreferrer"
                                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '12px', background: 'rgba(37,211,102,0.1)', color: '#25d366', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(37,211,102,0.2)', transition: 'all 0.2s' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.2)')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.1)')}>
                                                <MessageCircle size={16} />
                                                WhatsApp
                                            </a>
                                        )}
                                        {/* View Details */}
                                        <button onClick={() => navigate(`/owner/suppliers/${supplier.id}`)}
                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                                            Details <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default SupplierListPage;

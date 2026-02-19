// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Clock, Truck, MoreVertical, Search, AlertCircle, X, Package, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Order } from '../../services/orderService';
import '../../styles/pages/dashboard.css';
/* -------------------------------------------
   ORDER DETAILS MODAL
------------------------------------------- */
const OrderDetailsModal: React.FC<{
    order: Order;
    onClose: () => void;
}> = ({ order, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose} style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <motion.div
                className="glass-panel"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '700px', width: '90%', padding: '30px',
                    borderRadius: '24px', position: 'relative', maxHeight: '90vh',
                    overflowY: 'auto', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '30px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '5px' }}>
                            Order {order.id}
                        </h3>
                        <p style={{ color: 'var(--text-muted)' }}>Placed on {order.date}</p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.05)', border: 'none',
                            color: 'white', padding: '8px', borderRadius: '10px', cursor: 'pointer'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                    <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MoreVertical size={16} /> Customer Details
                        </h4>
                        <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '5px' }}>{order.customer}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Mail size={14} /> {order.email}
                        </p>
                        {order.whatsapp && (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MessageSquare size={14} /> {order.whatsapp}
                            </p>
                        )}
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={14} /> {order.address}
                        </p>
                        {order.whatsapp && (
                            <button
                                onClick={() => {
                                    const whatsapp = order.whatsapp;
                                    if (whatsapp) {
                                        const message = `Hello ${order.customer}, your order #${order.id} is currently ${order.status}. Thank you for shopping with Spices!`;
                                        const url = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                                        window.open(url, '_blank');
                                    }
                                }}
                                style={{
                                    marginTop: '15px',
                                    width: '100%',
                                    padding: '10px',
                                    background: '#25D366',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontWeight: 600
                                }}
                            >
                                <MessageSquare size={16} /> Notify via WhatsApp
                            </button>
                        )}
                    </div>
                    <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Package size={16} /> Order Info
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Status</span>
                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{order.status}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Total Amount</span>
                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{order.total}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Items Count</span>
                            <span style={{ fontWeight: 600 }}>{order.items.length} items</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: '15px', fontWeight: 600 }}>Order Items</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '12px', borderRadius: '8px 0 0 8px' }}>Item</th>
                                <th style={{ textAlign: 'center', padding: '12px' }}>Qty</th>
                                <th style={{ textAlign: 'right', padding: '12px', borderRadius: '0 8px 8px 0' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '16px 12px' }}>{item.name}</td>
                                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>x{item.quantity}</td>
                                    <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2} style={{ paddingTop: '20px', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)' }}>Total</td>
                                <td style={{ paddingTop: '20px', textAlign: 'right', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>{order.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </motion.div >
        </div >
    );
};
export default function OrdersPage() {
    const { orders, loading, updateOrderStatus } = useOrders();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [viewOrder, setViewOrder] = useState<Order | null>(null);
    // Status Config matching the requested flow: Pending -> Processing -> Shipped -> Delivered
    const STATUS_OPTIONS = [
        { value: 'Pending', label: 'Pending', icon: Clock, color: '#ffaa00', bg: 'rgba(255,170,0,0.1)' },
        { value: 'Processing', label: 'Processing', icon: AlertCircle, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
        { value: 'Shipped', label: 'Shipped', icon: Truck, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
        { value: 'Delivered', label: 'Delivered', icon: CheckCircle, color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
        { value: 'Cancelled', label: 'Cancelled', icon: X, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
    ];
    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'All' || order.status === filter;
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    // Handle clicking outside to close dropdowns
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (selectedOrderId && !(e.target as Element).closest('.status-dropdown-container')) {
                setSelectedOrderId(null);
            }
        };
        document.addEventListener('click', handleGlobalClick);
        return () => document.removeEventListener('click', handleGlobalClick);
    }, [selectedOrderId]);
    const handleStatusUpdate = (order: Order, newStatus: Order['status']) => {
        updateOrderStatus(order.id, newStatus);
        setSelectedOrderId(null);
        const whatsapp = order.whatsapp;
        if (whatsapp) {
            let message = '';
            switch (newStatus) {
                case 'Pending':
                    message = `Hello ${order.customer}, your order #${order.id} is currently Pending confirmation.`;
                    break;
                case 'Processing':
                    message = `Good news! Your order #${order.id} is now Processing.`;
                    break;
                case 'Shipped':
                    message = `Great news! Your order #${order.id} has been Shipped and is on its way.`;
                    break;
                case 'Delivered':
                    message = `Your order #${order.id} has been Delivered. Thank you for shopping with Spices!`;
                    break;
                case 'Cancelled':
                    message = `Your order #${order.id} has been Cancelled. Please contact us for more details.`;
                    break;
            }
            if (message) {
                const url = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            }
        }
    };
    if (loading) {
        return <div className="loading-container">Loading orders...</div>;
    }
    return (
        <div className="animate-fade-in p-2 md:p-6">
            <AnimatePresence>
                {viewOrder && (
                    <OrderDetailsModal
                        order={viewOrder}
                        onClose={() => setViewOrder(null)}
                    />
                )}
            </AnimatePresence>
            {/* Header Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>Order Management</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Review and manage customer orders</p>
                    </div>
                </div>
                {/* Filter Tabs - Horizontal Scroll */}
                <div className="glass-panel" style={{
                    padding: '8px',
                    borderRadius: '16px',
                    display: 'flex',
                    gap: '10px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    scrollbarWidth: 'none',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                background: filter === f ? 'var(--primary)' : 'transparent',
                                color: filter === f ? 'black' : 'var(--text-secondary)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: filter === f ? '0 4px 20px rgba(212, 175, 55, 0.3)' : 'none'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            {/* Main Table Card */}
            <div className="glass-panel" style={{ borderRadius: '24px', padding: '0', overflow: 'visible' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="form-input-group" style={{ marginBottom: 0, width: '300px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                style={{ paddingLeft: '40px', background: 'rgba(255,255,255,0.02)' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Showing {filteredOrders.length} orders</p>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="premium-table" style={{ borderSpacing: '0' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ paddingLeft: '32px' }}>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Value</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right', paddingRight: '32px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No orders found matching functionality filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => {
                                    const currentStatus = STATUS_OPTIONS.find(s => s.value === order.status) || STATUS_OPTIONS[0];
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            className="float-hover-row"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            style={{
                                                zIndex: selectedOrderId === order.id ? 50 : 1,
                                                position: 'relative',
                                                borderBottom: '1px solid rgba(255,255,255,0.03)'
                                            }}
                                        >
                                            <td style={{ padding: '24px 32px' }}>
                                                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>{order.id}</span>
                                            </td>
                                            <td style={{ padding: '24px 20px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 600, color: '#eee' }}>{order.customer}</span>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.email}</span>
                                                </div>
                                            </td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{order.date}</td>
                                            <td>
                                                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>{order.total}</span>
                                            </td>
                                            <td style={{ width: '200px' }}>
                                                <div className="status-dropdown-container" style={{ position: 'relative' }}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedOrderId(selectedOrderId === order.id ? null : order.id);
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                            padding: '8px 12px',
                                                            borderRadius: '12px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            background: currentStatus.bg,
                                                            color: currentStatus.color,
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            {order.status}
                                                        </div>
                                                        <MoreVertical size={14} opacity={0.7} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {selectedOrderId === order.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 'calc(100% + 8px)',
                                                                    left: 0,
                                                                    width: '200px',
                                                                    background: '#1a1a1a',
                                                                    borderRadius: '16px',
                                                                    boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                                                                    padding: '6px',
                                                                    zIndex: 100,
                                                                    backdropFilter: 'blur(20px)'
                                                                }}
                                                            >
                                                                {STATUS_OPTIONS.map((status) => {
                                                                    const StatusIcon = status.icon;
                                                                    return (
                                                                        <button
                                                                            key={status.value}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleStatusUpdate(order, status.value as any);
                                                                            }}
                                                                            style={{
                                                                                width: '100%',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '12px',
                                                                                padding: '10px 12px',
                                                                                border: 'none',
                                                                                background: 'transparent',
                                                                                color: 'white',
                                                                                borderRadius: '10px',
                                                                                cursor: 'pointer',
                                                                                fontSize: '0.85rem',
                                                                                fontWeight: 500,
                                                                                textAlign: 'left'
                                                                            }}
                                                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                                        >
                                                                            <StatusIcon size={16} color={status.color} />
                                                                            {status.label}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'right', paddingRight: '32px' }}>
                                                <button
                                                    onClick={() => setViewOrder(order)}
                                                    className="float-hover"
                                                    style={{
                                                        padding: '10px',
                                                        background: 'rgba(255,255,255,0.03)',
                                                        border: 'none',
                                                        borderRadius: '12px',
                                                        color: 'var(--text-muted)',
                                                        cursor: 'pointer'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

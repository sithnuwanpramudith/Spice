// OrdersPage.tsx

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    ShoppingCart, Search, Eye, Clock, CheckCircle,
    Truck, AlertCircle, Filter, X, User, MapPin,
    Mail, Package, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '../../context/OrderContext';
import type { Order } from '../../services/orderService';
import '../../styles/pages/dashboard.css';

/* -------------------------------------------
   STATUS BADGE COMPONENT
------------------------------------------- */
const StatusBadge: React.FC<{
    status: Order['status'];
    onClick?: () => void;
    isOpen?: boolean;
}> = ({ status, onClick, isOpen = false }) => {
    const getStatusConfig = (status: Order['status']) => {
        switch (status) {
            case 'Pending':
                return { background: 'rgba(255,170,0,0.1)', color: '#ffaa00', icon: Clock };
            case 'Processing':
                return { background: 'rgba(96,165,250,0.1)', color: '#60a5fa', icon: AlertCircle };
            case 'Shipped':
                return { background: 'rgba(168,85,247,0.1)', color: '#a855f7', icon: Truck };
            case 'Delivered':
                return { background: 'rgba(74,222,128,0.1)', color: '#4ade80', icon: CheckCircle };
            case 'Cancelled':
                return { background: 'rgba(239,68,68,0.1)', color: '#ef4444', icon: X };
            default:
                return { background: 'rgba(255,255,255,0.1)', color: 'white', icon: Clock };
        }
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
        <button
            onClick={onClick}
            style={{
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: config.background,
                color: config.color,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                width: 'fit-content',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                border: isOpen ? '1px solid rgba(255,255,255,0.3)' : 'none',
                outline: 'none'
            }}
            className={onClick ? 'float-hover' : ''}
        >
            <Icon size={14} />
            {status}
            {onClick && <ChevronDown size={14} opacity={0.5} />}
        </button>
    );
};

/* -------------------------------------------
   STATUS DROPDOWN COMPONENT
------------------------------------------- */
const StatusDropdown: React.FC<{
    currentStatus: Order['status'];
    orderId: string;
    onStatusUpdate: (id: string, status: Order['status']) => void;
    onClose: () => void;
}> = ({ currentStatus, orderId, onStatusUpdate, onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const statusOptions = [
        { value: 'Pending' as const, icon: Clock, color: '#ffaa00', gradient: 'linear-gradient(135deg, rgba(255,170,0,0.2), rgba(255,170,0,0.05))' },
        { value: 'Processing' as const, icon: AlertCircle, color: '#60a5fa', gradient: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(96,165,250,0.05))' },
        { value: 'Shipped' as const, icon: Truck, color: '#a855f7', gradient: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))' },
        { value: 'Delivered' as const, icon: CheckCircle, color: '#4ade80', gradient: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(74,222,128,0.05))' },
        { value: 'Cancelled' as const, icon: X, color: '#ef4444', gradient: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))' }
    ];

    return (
        <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.92, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -15 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
            }}
            style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: 0,
                zIndex: 100,
                minWidth: '220px',
                background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(10, 10, 10, 0.98))',
                borderRadius: '16px',
                padding: '8px',
                boxShadow: `
                    0 20px 60px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(255, 255, 255, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
        >
            {/* Header */}
            <div style={{
                padding: '12px 14px 8px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '4px'
            }}>
                <p style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Update Status
                </p>
            </div>

            {/* Status Options */}
            <div style={{ padding: '4px 0' }}>
                {statusOptions.map((option, index) => {
                    const Icon = option.icon;
                    const isActive = currentStatus === option.value;

                    return (
                        <motion.button
                            key={option.value}
                            onClick={() => onStatusUpdate(orderId, option.value)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={{
                                scale: 1.02,
                                x: 4
                            }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '12px 14px',
                                margin: '2px 0',
                                borderRadius: '10px',
                                background: isActive ? option.gradient : 'transparent',
                                border: isActive ? `1px solid ${option.color}40` : '1px solid transparent',
                                color: isActive ? option.color : 'rgba(255, 255, 255, 0.8)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: isActive ? 600 : 500,
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                outline: 'none',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Icon with glow effect */}
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                background: isActive ? `${option.color}20` : 'rgba(255, 255, 255, 0.03)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                boxShadow: isActive ? `0 0 20px ${option.color}40` : 'none'
                            }}>
                                <Icon size={14} style={{
                                    color: isActive ? option.color : 'rgba(255, 255, 255, 0.5)',
                                    filter: isActive ? `drop-shadow(0 0 4px ${option.color})` : 'none'
                                }} />
                            </div>

                            {/* Label */}
                            <span style={{ flex: 1, textAlign: 'left' }}>
                                {option.value}
                            </span>

                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: option.color,
                                        boxShadow: `0 0 10px ${option.color}, 0 0 20px ${option.color}60`
                                    }}
                                />
                            )}

                            {/* Hover glow effect */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: `radial-gradient(circle at center, ${option.color}10, transparent 70%)`,
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                pointerEvents: 'none'
                            }} className="hover-glow" />
                        </motion.button>
                    );
                })}
            </div>

            <style>{`
                .hover-glow {
                    opacity: 0;
                }
                button:hover .hover-glow {
                    opacity: 1;
                }
            `}</style>
        </motion.div>
    );
};

/* -------------------------------------------
   ORDER DETAILS MODAL
------------------------------------------- */
const OrderDetailsModal: React.FC<{
    order: Order;
    onClose: () => void;
}> = ({ order, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                className="modal-content glass-panel"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '700px',
                    width: '90%',
                    padding: '30px',
                    borderRadius: '24px',
                    position: 'relative',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    background: 'rgba(20, 20, 20, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <button
                    onClick={onClose}
                    className="float-hover"
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '10px',
                        cursor: 'pointer'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                        Order {order.id}
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>Placed on {order.date}</p>
                </div>

                <div className="modal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                            <User size={18} /> Customer Info
                        </h4>
                        <p style={{ fontWeight: 600 }}>{order.customer}</p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginTop: '5px' }}>
                            <Mail size={14} /> {order.email}
                        </p>
                        <p style={{ display: 'flex', alignItems: 'start', gap: '8px', color: 'var(--text-muted)', marginTop: '5px' }}>
                            <MapPin size={14} /> {order.address}
                        </p>
                    </div>

                    <div>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                            <Package size={18} /> Order Status
                        </h4>
                        <StatusBadge status={order.status} />
                    </div>
                </div>

                {/* ITEMS */}
                <div style={{ marginTop: '30px' }} className="glass-panel">
                    <h4 style={{ marginBottom: '15px' }}>Order Items</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                                <th>Item</th><th>Qty</th><th style={{ textAlign: 'right' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item: Order['items'][number]) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '12px 0' }}>{item.name}</td>
                                    <td style={{ padding: '12px 0' }}>x{item.quantity}</td>
                                    <td style={{ padding: '12px 0', textAlign: 'right' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2} style={{ paddingTop: '20px', fontWeight: 700 }}>Total</td>
                                <td style={{ paddingTop: '20px', textAlign: 'right', color: 'var(--primary)', fontWeight: 700 }}>
                                    {order.total}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

/* -------------------------------------------
   MAIN ORDERS PAGE
------------------------------------------- */
const OrdersPage: React.FC = () => {
    const { orders, loading, updateOrderStatus } = useOrders();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const filteredOrders = useMemo(
        () =>
            orders.filter((order: Order) =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [orders, searchTerm]
    );

    const handleStatusUpdate = async (id: string, newStatus: Order['status']) => {
        setOpenDropdownId(null);
        await updateOrderStatus(id, newStatus);
    };

    const handleStatusClick = (orderId: string) => {
        setOpenDropdownId(openDropdownId === orderId ? null : orderId);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close dropdown if clicking anywhere outside
            if (openDropdownId) {
                setOpenDropdownId(null);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && openDropdownId) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [openDropdownId]);

    if (loading) {
        return <div className="loading-container">Loading orders...</div>;
    }

    return (
        <div className="animate-fade-in">
            {/* HEADER */}
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Orders Management</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Track and manage customer spice orders</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="glass-panel search-input"
                        />
                    </div>
                    <button className="glass-panel float-hover filter-btn">
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </header>

            {/* TABLE */}
            <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {filteredOrders.map((order: Order) => (
                                <motion.tr
                                    key={order.id}
                                    className="float-hover-row"
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <td>
                                        <div className="table-order-id">
                                            <div className="order-icon">
                                                <ShoppingCart size={20} color="var(--primary)" />
                                            </div>
                                            <p>{order.id}</p>
                                        </div>
                                    </td>

                                    <td>
                                        <p style={{ fontWeight: 600 }}>{order.customer}</p>
                                        <p className="item-count">{order.items.length} items</p>
                                    </td>

                                    <td>{order.date}</td>
                                    <td style={{ fontWeight: 700 }}>{order.total}</td>

                                    <td style={{ position: 'relative', padding: '16px 12px' }}>
                                        <div style={{ display: 'inline-block', position: 'relative' }}>
                                            <StatusBadge
                                                status={order.status}
                                                isOpen={openDropdownId === order.id}
                                                onClick={() => handleStatusClick(order.id)}
                                            />
                                            <AnimatePresence>
                                                {openDropdownId === order.id && (
                                                    <StatusDropdown
                                                        currentStatus={order.status}
                                                        orderId={order.id}
                                                        onStatusUpdate={handleStatusUpdate}
                                                        onClose={() => setOpenDropdownId(null)}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="float-hover"
                                            style={{ background: 'none', border: 'none', color: 'var(--primary)' }}
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {selectedOrder && (
                    <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrdersPage;
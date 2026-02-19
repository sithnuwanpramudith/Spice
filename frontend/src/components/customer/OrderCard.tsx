import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import type { Order } from '../../services/orderService';

interface OrderCardProps {
    order: Order;
    onClick: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = React.memo(({ order, onClick }) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return '#4ade80';
            case 'Shipped': return '#a855f7';
            case 'Processing': return '#60a5fa';
            default: return '#facc15';
        }
    };

    const StatusIcon = () => {
        switch (order.status) {
            case 'Delivered': return <CheckCircle size={16} color={getStatusColor(order.status)} />;
            case 'Shipped': return <Truck size={16} color={getStatusColor(order.status)} />;
            case 'Processing': return <Package size={16} color={getStatusColor(order.status)} />;
            default: return <Clock size={16} color={getStatusColor(order.status)} />;
        }
    };

    return (
        <motion.div
            className="glass-panel antigravity-hover"
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => onClick(order)}
            style={{
                padding: '25px',
                borderRadius: '20px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                        {order.id}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {order.date}
                    </p>
                </div>
                <div style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: `rgba(${getStatusColor(order.status).replace('#', '').match(/.{1,2}/g)?.map((x) => parseInt(x, 16)).join(',')}, 0.1)`,
                    border: `1px solid ${getStatusColor(order.status)}40`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <StatusIcon />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: getStatusColor(order.status) }}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Amount</p>
                    <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {order.total}
                    </p>
                </div>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }}>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>
            </div>
        </motion.div>
    );
});

export default OrderCard;

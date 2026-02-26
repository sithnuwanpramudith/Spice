import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import axios from 'axios';

interface PurchasedItem {
    id: string;
    name: string;
    price: number;
    hasRated?: boolean;
}

const RateProducts = () => {
    const { user } = useAuth();
    const { refreshProducts } = useProducts();
    const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState<{ [key: string]: number }>({});
    const [comment, setComment] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState<{ [key: string]: boolean }>({});
    const [success, setSuccess] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchPurchasedItems = async () => {
            if (!user?.email) return;
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/user/${user.email}`);
                const orders = response.data;

                // Extract unique items from orders
                const itemsMap: { [key: string]: PurchasedItem } = {};
                orders.forEach((order: any) => {
                    order.items.forEach((item: any) => {
                        if (!itemsMap[item.name]) {
                            itemsMap[item.name] = { id: item.productId, name: item.name, price: item.price };
                        }
                    });
                });
                setPurchasedItems(Object.values(itemsMap));
            } catch (error) {
                console.error('Error fetching purchased items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchasedItems();
    }, [user]);

    const handleRate = async (itemName: string, selectedRating: number) => {
        setRating(prev => ({ ...prev, [itemName]: selectedRating }));
    };

    const submitReview = async (item: PurchasedItem) => {
        if (!rating[item.name] || !user?.email) return;

        setSubmitting(prev => ({ ...prev, [item.name]: true }));
        try {
            await axios.post(`http://localhost:5000/api/products/${item.id}/review`, {
                rating: rating[item.name],
                comment: comment[item.name] || '',
                user_email: user.email
            });

            // Refresh global product state so home page updates
            await refreshProducts();

            setSuccess(prev => ({ ...prev, [item.name]: true }));
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setSubmitting(prev => ({ ...prev, [item.name]: false }));
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Star size={40} color="var(--primary)" />
            </motion.div>
        </div>
    );

    if (purchasedItems.length === 0) return (
        <div style={{ padding: '80px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-glass)' }}>
            <ShoppingBag size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>You haven't purchased any spices yet to rate!</p>
        </div>
    );

    return (
        <div className="rate-container" style={{ padding: '40px 0' }}>
            <header style={{ marginBottom: '40px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Community Feedback</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '10px', color: 'white' }}>Rate Your Spices</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Share your thoughts on the premium spices you've received.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
                {purchasedItems.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card"
                        style={{ padding: '30px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
                    >
                        {success[item.name] && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.8)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                                gap: '15px'
                            }}>
                                <CheckCircle2 size={48} color="#4ade80" />
                                <p style={{ fontWeight: 800, color: 'white' }}>Thank you for your rating!</p>
                            </div>
                        )}

                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>{item.name}</h3>
                            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>LKR {item.price.toLocaleString()}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '25px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRate(item.name, star)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    <Star
                                        size={28}
                                        fill={star <= (rating[item.name] || 0) ? 'var(--primary)' : 'transparent'}
                                        color={star <= (rating[item.name] || 0) ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}
                                        style={{ transition: 'all 0.2s ease' }}
                                    />
                                </button>
                            ))}
                        </div>

                        <textarea
                            placeholder="Tell us about the aroma and quality..."
                            value={comment[item.name] || ''}
                            onChange={(e) => setComment(prev => ({ ...prev, [item.name]: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                color: 'white',
                                minHeight: '100px',
                                resize: 'none',
                                marginBottom: '20px',
                                outline: 'none'
                            }}
                        />

                        <button
                            disabled={!rating[item.name] || submitting[item.name]}
                            onClick={() => submitReview(item)}
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: rating[item.name] ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: rating[item.name] ? 'black' : 'rgba(255,255,255,0.2)',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 800,
                                cursor: rating[item.name] ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {submitting[item.name] ? 'SUBMITTING...' : (
                                <>
                                    SUBMIT RATING <Send size={18} />
                                </>
                            )}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RateProducts;

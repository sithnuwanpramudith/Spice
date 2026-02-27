import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, User, Quote, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const TestimonialForm = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [role, setRole] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content || !user?.name) return;

        setIsSubmitting(true);
        setError('');
        try {
            await axios.post('http://localhost:5000/api/testimonials', {
                user_name: user?.name,
                user_role: role || 'Valued Customer',
                content,
                rating,
                user_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=D4AF37&color=fff`
            });
            setIsSuccess(true);
            setContent('');
            setRole('');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to submit feedback');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    textAlign: 'center',
                    padding: '80px 40px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '40px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}
            >
                <div style={{ color: 'var(--primary)', marginBottom: '30px' }}>
                    <CheckCircle2 size={80} strokeWidth={1} />
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px' }}>Feedback Shared!</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 40px' }}>
                    Thank you for sharing your experience with us. Your testimonial helps others discover the magic of Sri Lankan spices.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-secondary"
                    style={{ borderRadius: '50px', padding: '12px 40px' }}
                >
                    Write Another
                </button>
            </motion.div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 0' }}>
            <header style={{ marginBottom: '50px', textAlign: 'center' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>SHARE YOUR EXPERIENCE</span>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '10px' }}>Leave a <span style={{ color: 'var(--primary)' }}>Testimonial</span></h2>
            </header>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{
                    padding: '50px',
                    borderRadius: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{ position: 'absolute', top: '30px', right: '40px', opacity: 0.05 }}>
                    <Quote size={120} />
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ marginBottom: '40px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '15px', fontWeight: 600 }}>Your Overall Experience</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setRating(star)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    <Star
                                        size={36}
                                        fill={star <= rating ? 'var(--primary)' : 'transparent'}
                                        color={star <= rating ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}
                                        style={{ transition: 'all 0.3s ease' }}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.9rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.6 }} />
                                <input
                                    type="text"
                                    value={user?.name || ''}
                                    disabled
                                    style={{
                                        width: '100%',
                                        padding: '16px 16px 16px 45px',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '15px',
                                        color: 'var(--text-secondary)',
                                        cursor: 'not-allowed'
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.9rem' }}>Your Professional Role (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g. Home Chef, Foodie"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '15px',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.9rem' }}>How was the aroma and quality of our spices?</label>
                        <textarea
                            required
                            placeholder="Share your experience..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '20px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '15px',
                                color: 'white',
                                minHeight: '150px',
                                resize: 'none',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {error && (
                        <p style={{ color: '#ef4444', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !content}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            padding: '20px',
                            borderRadius: '15px',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px'
                        }}
                    >
                        {isSubmitting ? 'SHARING...' : (
                            <>
                                SUBMIT TESTIMONIAL <Send size={20} />
                            </>
                        )}
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Your feedback will be displayed in our testimonials section on the home page.
                    </p>
                </div>
            </motion.form>
        </div>
    );
};

export default TestimonialForm;

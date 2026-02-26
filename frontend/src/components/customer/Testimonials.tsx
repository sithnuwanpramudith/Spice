import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Nimal Perera",
        role: "Home Maker",
        text: "The aroma and taste of these spices are exceptional. It's clear that there's no mixing of any artificial additives.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=nimal"
    },
    {
        name: "Sadali Jayasinghe",
        role: "Professional Chef",
        text: "I consistently buy spices from this store for my restaurant. 100% reliability and quality.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sadali"
    },
    {
        name: "Kasun Rajapaksha",
        role: "Executive Officer",
        text: "Very fast service and extremely high-quality packaging. The best place for those looking for pure spices.",
        rating: 4,
        avatar: "https://i.pravatar.cc/150?u=kasun"
    }
];

const Testimonials: React.FC = () => {
    return (
        <section style={{ padding: '60px 0', marginTop: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '15px' }}>
                    Customer <span style={{ color: 'var(--primary)' }}>Testimonials</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Trusted by thousands of customers, Sri Lanka's #1 premium spice supplier.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                padding: '10px'
            }}>
                {testimonials.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="glass-panel antigravity-hover"
                        style={{
                            padding: '30px',
                            borderRadius: '24px',
                            position: 'relative'
                        }}
                    >
                        <Quote size={40} style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            opacity: 0.1,
                            color: 'var(--primary)'
                        }} />

                        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    fill={i < item.rating ? "var(--primary)" : "transparent"}
                                    color={i < item.rating ? "var(--primary)" : "var(--text-muted)"}
                                />
                            ))}
                        </div>

                        <p style={{
                            color: 'var(--text-primary)',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                            marginBottom: '25px',
                            fontStyle: 'italic'
                        }}>
                            "{item.text}"
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img
                                src={item.avatar}
                                alt={item.name}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    border: '2px solid var(--primary)'
                                }}
                            />
                            <div>
                                <h4 style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>{item.name}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;

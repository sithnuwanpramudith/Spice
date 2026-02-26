import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <section style={{
            position: 'relative',
            height: '500px',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '30px',
            marginBottom: '60px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 60px',
            background: 'url("https://images.unsplash.com/photo-1532336414038-cf0c244b7f14?q=80&w=2076&auto=format&fit=crop") center/cover no-repeat'
        }}>
            {/* Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(5,5,5,0.9) 30%, rgba(5,5,5,0.4) 100%)',
                zIndex: 1
            }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{
                        color: 'var(--primary)',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        display: 'block',
                        marginBottom: '10px'
                    }}>
                        Premium Quality Spices
                    </span>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '20px',
                        color: 'white'
                    }}>
                        Experience the <span style={{ color: 'var(--primary)' }}>Premium Spices</span>
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '35px',
                        lineHeight: 1.6
                    }}>
                        Bring the authentic taste of Sri Lanka to your kitchen with our 100% pure and high-quality spices.
                    </p>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button className="btn-primary" style={{
                            padding: '16px 32px',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            Shop Collection <ShoppingBag size={20} />
                        </button>
                        <button className="btn-secondary" style={{
                            padding: '16px 32px',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            About Us <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                right: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                display: 'none' // Hidden on smaller screens
            }} className="desktop-only">
                {/* Floating graphic could go here */}
            </div>
        </section>
    );
};

export default HeroSection;

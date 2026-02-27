import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Truck, ThumbsUp, Quote } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import SupplierRegisterForm from '../../components/supplier/SupplierRegisterForm';
import UnifiedLoginModal from '../../components/auth/UnifiedLoginModal';
import { useAuth } from '../../context/AuthContext';
import heroBanner from '../../assets/images/hero-banner.png';
import axios from 'axios';

interface Testimonial {
    id: string;
    user_name: string;
    user_role: string;
    content: string;
    rating: number;
    user_image: string;
}


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { products, refreshProducts } = useProducts();
    const { isAuthenticated, logout, user } = useAuth();
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [dynamicTestimonials, setDynamicTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        refreshProducts();
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/testimonials');
            setDynamicTestimonials(response.data);
        } catch (err) {
            console.error('Error fetching testimonials:', err);
        }
    };

    const memoizedProducts = useMemo(() => products.slice(0, 4), [products]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white', paddingBottom: '0' }}>

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${heroBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '0 20px'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--primary-glow)',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    zIndex: 0
                }}></div>

                <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '900px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            color: 'var(--primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            marginBottom: '20px',
                            display: 'block'
                        }}>The Essence of Sri Lankan Heritage</span>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                            lineHeight: 1.1,
                            fontWeight: 800,
                            marginBottom: '30px',
                            background: 'linear-gradient(to bottom, #fff, #b0b0b0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            ELEVATE YOUR <br />
                            <span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>CULINARY</span> ART
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '650px', margin: '0 auto 40px' }}
                    >
                        Hand-selected spices from the lush islands of Ceylon, delivered with their full aromatic profile preserved just for you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <button
                            className="btn-primary"
                            onClick={() => isAuthenticated ? navigate('/customer-dashboard') : setShowLoginModal(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '16px 36px', borderRadius: '50px' }}
                        >
                            Shop Collection <ShoppingBag size={20} />
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '16px 36px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)' }}
                        >
                            Our Story
                        </button>
                    </motion.div>
                </div>

                <div style={{ position: 'absolute', top: '30px', right: '40px', display: 'flex', gap: '20px', zIndex: 100 }}>
                    {isAuthenticated ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Welcome back,</div>
                                <div style={{ fontWeight: 600 }}>{user?.name}</div>
                            </div>
                            <button className="btn-secondary" style={{ padding: '8px 20px', borderRadius: '30px' }} onClick={() => navigate(user?.role === 'owner' ? '/admin-dashboard' : '/customer-dashboard')}>Dashboard</button>
                            <button className="btn-icon" onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px' }}><ArrowRight style={{ transform: 'rotate(180deg)' }} /></button>
                        </div>
                    ) : (
                        <button className="btn-primary" style={{ padding: '10px 30px', borderRadius: '30px' }} onClick={() => setShowLoginModal(true)}>Login</button>
                    )}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
                >
                    <div style={{ width: '2px', height: '50px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }}></div>
                </motion.div>
            </section>

            {/* Trust Signals */}
            <section style={{ padding: '80px 20px', background: 'var(--bg-darker)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
                    {[
                        { icon: <ShieldCheck size={32} />, title: "Premium Quality", desc: "100% Organic & Hand-Picked" },
                        { icon: <Truck size={32} />, title: "Global Shipping", desc: "Fast & Secure doorstep delivery" },
                        { icon: <ThumbsUp size={32} />, title: "Authentic Taste", desc: "Preserving traditional Sri Lankan flavors" }
                    ].map((signal, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            style={{ flex: '1', minWidth: '250px', display: 'flex', alignItems: 'center', gap: '20px' }}
                        >
                            <div style={{ color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '20px' }}>
                                {signal.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '5px' }}>{signal.title}</h3>
                                <p style={{ fontSize: '0.9rem' }}>{signal.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px' }}>OUR LEGACY</span>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '20px 0', lineHeight: 1.2 }}>Spices That Tell A <span style={{ color: 'var(--primary)' }}>Story</span></h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                            For generations, our family has been committed to bringing the hidden treasures of Sri Lankan soil to the world. We don't just sell spices; we deliver a piece of our culture, tradition, and the vibrant heat of the tropics.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>50+</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Spices Collected</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>20+</div>
                                <div style={{ color: 'var(--text-secondary)' }}>Local Suppliers</div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ position: 'relative' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1532139154602-272dc273557a?q=80&w=2070&auto=format&fit=crop"
                            alt="Spices"
                            style={{ width: '100%', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                        />
                        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', padding: '30px', background: 'var(--primary)', borderRadius: '30px', color: 'black' }}>
                            <Star fill="currentColor" size={40} />
                            <div style={{ fontWeight: 800, fontSize: '1.5rem', marginTop: '10px' }}>100% Pure</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Selection */}
            <section style={{ padding: '100px 20px', background: 'var(--bg-darker)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '60px' }}>
                        <div>
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>OUR SHOP</span>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '10px' }}>Featured Collection</h2>
                        </div>
                        <button className="btn-secondary" style={{ borderRadius: '30px' }}>View All Products</button>
                    </div>

                    {(!products || products.length === 0) ? (
                        <div style={{ textAlign: 'center', padding: '100px', background: 'var(--bg-card)', borderRadius: '30px' }}>Loading our premium selection...</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                            {memoizedProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className="glass-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    style={{
                                        padding: '15px',
                                        borderRadius: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div style={{
                                        height: '280px',
                                        borderRadius: '18px',
                                        marginBottom: '20px',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <img
                                            src={product.image || 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=2070&auto=format&fit=crop'}
                                            alt={product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            left: '15px',
                                            zIndex: 2,
                                            background: 'rgba(0,0,0,0.6)',
                                            backdropFilter: 'blur(10px)',
                                            padding: '4px 10px',
                                            borderRadius: '50px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            fontSize: '0.7rem',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            <Star size={10} fill="var(--primary)" color="var(--primary)" />
                                            <span style={{ fontWeight: 700 }}>
                                                {product.rating_avg ? product.rating_avg.toFixed(1) : '5.0'}
                                            </span>
                                        </div>
                                        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                            <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: '50px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>{product.category}</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 10px 10px' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>{product.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', height: '40px', overflow: 'hidden' }}>
                                            {product.description}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                                                LKR {product.price.toLocaleString()}
                                            </span>
                                            <button
                                                className="btn-icon"
                                                style={{
                                                    background: 'var(--primary)',
                                                    color: 'black',
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '15px',
                                                    border: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <ShoppingBag size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Community Voice</span>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginTop: '10px' }}>What Our <span style={{ color: 'var(--primary)' }}>Customers</span> Say</h2>
                </div>

                {dynamicTestimonials.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '30px', color: 'var(--text-secondary)' }}>
                        Be the first to share your experience with our premium spices!
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
                        {dynamicTestimonials.map((testimonial, idx) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                whileHover={{ y: -10 }}
                                style={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                                    padding: '45px',
                                    borderRadius: '40px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Quote size={60} style={{ color: 'var(--primary)', opacity: 0.1, position: 'absolute', top: '30px', right: '35px' }} />

                                <div>
                                    <div style={{ display: 'flex', gap: '6px', color: 'var(--primary)', marginBottom: '30px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                fill={i < testimonial.rating ? "var(--primary)" : "transparent"}
                                                stroke={i < testimonial.rating ? "var(--primary)" : "rgba(255,255,255,0.1)"}
                                            />
                                        ))}
                                    </div>

                                    <p style={{
                                        lineHeight: 1.7,
                                        fontSize: '1.15rem',
                                        fontStyle: 'italic',
                                        marginBottom: '40px',
                                        color: 'rgba(255,255,255,0.9)',
                                        fontWeight: 400
                                    }}>
                                        "{testimonial.content}"
                                    </p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={testimonial.user_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.user_name)}&background=D4AF37&color=fff`}
                                            alt={testimonial.user_name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '20px',
                                                objectFit: 'cover',
                                                border: '2px solid rgba(212, 175, 55, 0.2)'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-5px',
                                            right: '-5px',
                                            background: 'var(--primary)',
                                            padding: '4px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'black'
                                        }}>
                                            <Star size={10} fill="currentColor" />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>{testimonial.user_name}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--primary)', opacity: 0.8, fontWeight: 600 }}>{testimonial.user_role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Supplier CTA */}
            <section style={{ maxWidth: '1200px', margin: '100px auto', padding: '0 20px' }}>
                <motion.div
                    whileHover={{ y: -5 }}
                    style={{
                        padding: '80px 60px',
                        borderRadius: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1592323869138-1667b931853a?q=80&w=2070&auto=format&fit=crop')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>Join Our Network</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }}>Are you a spice grower or supplier? We're always looking for authentic partners to join our global journey.</p>
                        <button
                            className="btn-primary"
                            onClick={() => setShowSupplierModal(true)}
                            style={{ padding: '16px 40px', borderRadius: '50px', fontSize: '1.1rem' }}
                        >
                            Register as Supplier
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '100px 20px 40px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg-darker)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>SPICES</h3>
                        <p style={{ fontSize: '0.9rem' }}>Bringing the purest flavors from Sri Lankan hills to your kitchen table. Quality you can taste, heritage you can feel.</p>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '20px' }}>Shop</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li style={{ cursor: 'pointer' }}>All Spices</li>
                            <li style={{ cursor: 'pointer' }}>Whole Spices</li>
                            <li style={{ cursor: 'pointer' }}>Spice Powders</li>
                            <li style={{ cursor: 'pointer' }}>Gift Sets</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '20px' }}>Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li style={{ cursor: 'pointer' }}>Shipping Policy</li>
                            <li style={{ cursor: 'pointer' }}>Returns & Exchanges</li>
                            <li style={{ cursor: 'pointer' }}>Contact Us</li>
                            <li style={{ cursor: 'pointer' }}>FAQs</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '20px' }}>Newsletter</h4>
                        <p style={{ fontSize: '0.85rem', marginBottom: '15px' }}>Join for exclusive offers and spice recipes.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="Your email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 15px', borderRadius: '10px', color: 'white', flex: 1 }} />
                            <button className="btn-primary" style={{ padding: '10px 20px' }}>Join</button>
                        </div>
                    </div>
                </div>
                <div style={{ maxWidth: '1200px', margin: '60px auto 0', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    © 2026 Premium Spices. All Rights Reserved.
                </div>
            </footer>

            {/* Supplier Modal */}
            <AnimatePresence>
                {showSupplierModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <SupplierRegisterForm onClose={() => setShowSupplierModal(false)} />
                    </div>
                )}
            </AnimatePresence>

            <UnifiedLoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </div>
    );
};

export default HomePage;

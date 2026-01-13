import React from 'react';
import { Send, User, Search, Phone, Mail } from 'lucide-react';
import '../../styles/pages/dashboard.css';

const ContactSuppliersPage: React.FC = () => {
    const suppliers = [
        { name: 'Ceylon Spices', status: 'Online', lastMsg: 'The shipment is on its way.' },
        { name: 'Matara Hub', status: 'Offline', lastMsg: 'Price updated for Cinnamon.' },
        { name: 'Kandy Growers', status: 'Online', lastMsg: 'Need more Cardamom?' },
    ];

    return (
        <div className="animate-fade-in" style={{ height: 'calc(100vh - 120px)', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
            {/* Conversations List */}
            <div className="glass-panel" style={{ borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '25px', borderBottom: '1px solid var(--border-glass)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Messages</h3>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            style={{ width: '100%', padding: '10px 15px 10px 35px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '10px', color: 'white', fontSize: '0.85rem' }}
                        />
                    </div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
                    {suppliers.map((s, i) => (
                        <div key={i} className="float-hover" style={{ padding: '15px', borderRadius: '15px', display: 'flex', gap: '15px', cursor: 'pointer', background: i === 0 ? 'rgba(212, 175, 55, 0.05)' : 'transparent', marginBottom: '10px' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={20} color={i === 0 ? 'var(--primary)' : 'var(--text-muted)'} />
                                </div>
                                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', borderRadius: '50%', background: s.status === 'Online' ? '#4ade80' : '#666', border: '2px solid #0a0a0a' }}></div>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{s.name}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{s.lastMsg}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="glass-panel" style={{ borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '20px 30px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={20} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ fontWeight: 700 }}>Ceylon Spices</p>
                            <p style={{ fontSize: '0.75rem', color: '#4ade80' }}>Online</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Phone size={18} /></button>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Mail size={18} /></button>
                    </div>
                </div>

                <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                    <div style={{ alignSelf: 'flex-start', maxWidth: '70%', padding: '15px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px 15px 15px 0', fontSize: '0.9rem' }}>
                        Hello! We have received your inquiry about the premium cinnamon batch.
                    </div>
                    <div style={{ alignSelf: 'flex-end', maxWidth: '70%', padding: '15px 20px', background: 'var(--primary)', color: 'var(--bg-darker)', borderRadius: '15px 15px 0 15px', fontSize: '0.9rem', fontWeight: 600 }}>
                        Great! Can you confirm the moisture content and packing date?
                    </div>
                    <div style={{ alignSelf: 'flex-start', maxWidth: '70%', padding: '15px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px 15px 15px 0', fontSize: '0.9rem' }}>
                        The shipment is on its way. Moistured at 12%, packed Oct 22.
                    </div>
                </div>

                <div style={{ padding: '25px', borderTop: '1px solid var(--border-glass)' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            style={{ flex: 1, padding: '15px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white', outline: 'none' }}
                        />
                        <button className="btn-primary float-hover" style={{ padding: '12px', borderRadius: '12px' }}>
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSuppliersPage;

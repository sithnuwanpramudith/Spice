import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    Store,
    Bell,
    Shield,
    CreditCard,
    Save,
    User,
    Mail,
    Phone,
    MapPin,
    Globe,
    Lock,
    Smartphone
} from 'lucide-react';
import '../../styles/pages/dashboard.css';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'general' | 'shop' | 'notifications' | 'security'>('general');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Initial settings state
    const [settings, setSettings] = useState({
        // General Settings
        storeName: 'Spices Premium',
        contactEmail: 'admin@spices.com',
        contactPhone: '+94 77 123 4567',
        address: '123 Spice Garden, Kandy, Sri Lanka',
        website: 'https://spices.com',

        // Shop Settings
        currency: 'LKR',
        deliveryCharge: 350,
        minOrderAmount: 1000,
        isBakeryOpen: true,

        // Notification Settings
        adminWhatsApp: '+94 77 123 4567',
        orderAlerts: true,
        supplierAlerts: true,
        lowStockAlerts: true,

        // Security Settings
        enableTwoFactor: false,
        sessionTimeout: 60
    });

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('admin_settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;

        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem('admin_settings', JSON.stringify(settings));
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Store },
        { id: 'shop', label: 'Shop Details', icon: CreditCard },
        { id: 'notifications', label: 'Alerts', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    const renderGeneral = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="settings-section">
            <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Store size={20} color="var(--primary)" /> Store Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div className="form-group">
                    <label>STORE NAME</label>
                    <div style={{ position: 'relative' }}>
                        <User size={16} className="input-icon" />
                        <input name="storeName" value={settings.storeName} onChange={handleChange} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>
                <div className="form-group">
                    <label>BUSINESS EMAIL</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={16} className="input-icon" />
                        <input name="contactEmail" value={settings.contactEmail} onChange={handleChange} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>
                <div className="form-group">
                    <label>CONTACT PHONE</label>
                    <div style={{ position: 'relative' }}>
                        <Phone size={16} className="input-icon" />
                        <input name="contactPhone" value={settings.contactPhone} onChange={handleChange} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>
                <div className="form-group">
                    <label>WEBSITE</label>
                    <div style={{ position: 'relative' }}>
                        <Globe size={16} className="input-icon" />
                        <input name="website" value={settings.website} onChange={handleChange} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>OFFICE ADDRESS</label>
                    <div style={{ position: 'relative' }}>
                        <MapPin size={16} className="input-icon" style={{ top: '20px' }} />
                        <textarea
                            name="address"
                            value={settings.address}
                            onChange={handleChange}
                            style={{ paddingLeft: '40px', minHeight: '80px', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', padding: '12px 12px 12px 40px', outline: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const renderShop = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="settings-section">
            <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CreditCard size={20} color="var(--primary)" /> Shop Configuration
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div className="form-group">
                    <label>CURRENCY</label>
                    <select name="currency" value={settings.currency} onChange={handleChange} className="glass-panel" style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <option value="LKR">LKR - Sri Lankan Rupee</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="GBP">GBP - British Pound</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>DELIVERY CHARGE (LKR)</label>
                    <input type="number" name="deliveryCharge" value={settings.deliveryCharge} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>MINIMUM ORDER AMOUNT (LKR)</label>
                    <input type="number" name="minOrderAmount" value={settings.minOrderAmount} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
                    <input type="checkbox" name="isBakeryOpen" checked={settings.isBakeryOpen} onChange={handleChange} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <label style={{ marginBottom: 0 }}>SHOP STATUS (OPEN FOR ORDERS)</label>
                </div>
            </div>
        </motion.div>
    );

    const renderNotifications = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="settings-section">
            <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell size={20} color="var(--primary)" /> Notification Alerts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                    <label>ADMIN WHATSAPP (FOR ALERTS)</label>
                    <div style={{ position: 'relative' }}>
                        <Smartphone size={16} className="input-icon" />
                        <input name="adminWhatsApp" value={settings.adminWhatsApp} onChange={handleChange} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {[
                        { key: 'orderAlerts', label: 'New Order Notifications' },
                        { key: 'supplierAlerts', label: 'New Supplier Registrations' },
                        { key: 'lowStockAlerts', label: 'Low Stock Warnings' }
                    ].map(item => (
                        <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                            <div className={`toggle-switch ${settings[item.key as keyof typeof settings] ? 'active' : ''}`}
                                onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof settings] }))}>
                                <div className="toggle-knob"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    const renderSecurity = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="settings-section">
            <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={20} color="var(--primary)" /> Security & Privacy
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <button className="glass-panel float-hover" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Lock size={20} color="var(--primary)" />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Change Password</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Update your login credentials</p>
                    </div>
                </button>
                <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(96, 165, 250, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={20} color="#60a5fa" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Two-Factor Auth</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Add extra security to your account</p>
                    </div>
                    <div className={`toggle-switch ${settings.enableTwoFactor ? 'active' : ''}`}
                        onClick={() => setSettings(prev => ({ ...prev, enableTwoFactor: !prev.enableTwoFactor }))}>
                        <div className="toggle-knob"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>Global Settings</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your shop preferences and system configurations</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary float-hover"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 24px',
                        borderRadius: '14px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        opacity: isSaving ? 0.7 : 1
                    }}
                >
                    <Save size={18} className={isSaving ? 'animate-spin' : ''} />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            background: 'rgba(74, 222, 128, 0.1)',
                            color: '#4ade80',
                            padding: '15px 25px',
                            borderRadius: '12px',
                            border: '1px solid rgba(74, 222, 128, 0.2)',
                            marginBottom: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontWeight: 600
                        }}
                    >
                        <Shield size={20} /> Settings updated successfully! Persistence local storage.
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
                {/* Tabs Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 18px',
                                    borderRadius: '14px',
                                    border: 'none',
                                    background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 600
                                }}
                                className={isActive ? '' : 'float-hover'}
                            >
                                <Icon size={20} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Panel */}
                <div className="glass-panel" style={{ padding: '35px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {activeTab === 'general' && renderGeneral()}
                    {activeTab === 'shop' && renderShop()}
                    {activeTab === 'notifications' && renderNotifications()}
                    {activeTab === 'security' && renderSecurity()}
                </div>
            </div>

            <style>{`
                .settings-section .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .settings-section label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 1px;
                }
                .settings-section input {
                    width: 100%;
                    padding: 12px 16px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: white;
                    outline: none;
                }
                .input-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                    pointer-events: none;
                }
                .toggle-switch {
                    width: 44px;
                    height: 24px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .toggle-switch.active {
                    background: var(--primary);
                }
                .toggle-knob {
                    width: 18px;
                    height: 18px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .toggle-switch.active .toggle-knob {
                    left: 23px;
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;

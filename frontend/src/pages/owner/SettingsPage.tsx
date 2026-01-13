import React from 'react';

const SettingsPage: React.FC = () => {
    return (
        <div className="anti-gravity">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>Dashboard Settings</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Customize your admin panel preferences</p>

            <div className="glass-panel" style={{ padding: '60px', borderRadius: '24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>Settings configuration coming soon...</p>
            </div>
        </div>
    );
};

export default SettingsPage;

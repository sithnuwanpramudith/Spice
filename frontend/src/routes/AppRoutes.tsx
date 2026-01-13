import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import CustomerDashboardPage from '../pages/CustomerDashboardPage';
import OwnerDashboardPage from '../pages/OwnerDashboardPage';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user?.role || '')) return <Navigate to="/" replace />;

    return <>{children}</>;
};

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                {/* Role-based Redirection */}
                <Route path="/" element={
                    user ? (
                        user.role === 'owner' ? <Navigate to="/owner" /> :
                            <Navigate to="/customer" />
                    ) : <Navigate to="/customer" />
                } />

                {/* Dashboards */}
                <Route path="/customer/*" element={<CustomerDashboardPage />} />

                <Route path="/owner/*" element={
                    <ProtectedRoute allowedRoles={['owner']}>
                        <OwnerDashboardPage />
                    </ProtectedRoute>
                } />


                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

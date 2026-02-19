import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import OwnerLoginPage from '../pages/OwnerLoginPage';
import HomePage from '../pages/HomePage';
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
    // const { user } = useAuth(); // No longer needed for top-level redirect

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/owner-login" element={<OwnerLoginPage />} />

                {/* Role-based Redirection */}
                <Route path="/" element={<HomePage />} />

                {/* Dashboards - Unified Paths */}
                <Route path="/customer-dashboard" element={
                    <ProtectedRoute allowedRoles={['customer']}>
                        <CustomerDashboardPage />
                    </ProtectedRoute>
                } />

                <Route path="/admin-dashboard/*" element={
                    <ProtectedRoute allowedRoles={['owner']}>
                        <OwnerDashboardPage />
                    </ProtectedRoute>
                } />

                {/* Legacy Paths Aliases */}
                <Route path="/customer" element={<Navigate to="/customer-dashboard" replace />} />
                <Route path="/owner/*" element={<Navigate to="/admin-dashboard" replace />} />


                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

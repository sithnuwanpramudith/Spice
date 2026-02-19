import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import OwnerLoginPage from '../pages/OwnerLoginPage';
import CustomerDashboardPage from '../pages/CustomerDashboardPage';
import OwnerDashboardPage from '../pages/OwnerDashboardPage';
import SupplierDashboardPage from '../pages/supplier/SupplierDashboardPage';
import HomePage from '../pages/HomePage';
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

                {/* Dashboards */}
                <Route path="/customer/*" element={<CustomerDashboardPage />} />

                <Route path="/owner/*" element={
                    <ProtectedRoute allowedRoles={['owner']}>
                        <OwnerDashboardPage />
                    </ProtectedRoute>
                } />

                <Route path="/supplier/*" element={
                    <ProtectedRoute allowedRoles={['supplier']}>
                        <SupplierDashboardPage />
                    </ProtectedRoute>
                } />


                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

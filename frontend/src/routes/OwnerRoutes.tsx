import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from '../context/ProductContext';
import DashboardOverview from '../pages/owner/DashboardOverview';
import SupplierListPage from '../pages/owner/SupplierListPage';
import SupplierDetailsPage from '../pages/owner/SupplierDetailsPage';
import ProductsPage from '../pages/owner/ProductsPage';
import OrdersPage from '../pages/owner/OrdersPage';
import ReportsPage from '../pages/owner/ReportsPage';
import AddProductPage from '../pages/owner/AddProductPage';
import SettingsPage from '../pages/owner/SettingsPage';

const OwnerRoutes: React.FC = () => {
    return (
        <ProductProvider>
            <Routes>
                <Route index element={<DashboardOverview />} />
                <Route path="suppliers" element={<SupplierListPage />} />
                <Route path="suppliers/:id" element={<SupplierDetailsPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="add-product" element={<AddProductPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
        </ProductProvider>
    );
};

export default OwnerRoutes;

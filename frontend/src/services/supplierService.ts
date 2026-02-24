import axios from 'axios';

export interface Supplier {
    id: string;
    name: string;
    email: string;
    phone: string;
    category: string;
    status: 'active' | 'pending' | 'inactive';
    rating: number;
    totalOrders: number;
}

const API_BASE_URL = 'http://localhost:5000/api';

export const supplierService = {
    getSuppliers: async (): Promise<Supplier[]> => {
        const response = await axios.get(`${API_BASE_URL}/suppliers`);
        return response.data;
    },
    getSupplierById: async (id: string): Promise<Supplier | undefined> => {
        const response = await axios.get(`${API_BASE_URL}/suppliers/${id}`);
        return response.data;
    },
    updateSupplierStatus: async (id: string, status: Supplier['status']): Promise<void> => {
        await axios.patch(`${API_BASE_URL}/suppliers/${id}/status`, { status });
    }
};

import axios from 'axios';
import { API_BASE_URL } from '../api/config';

export interface Supplier {
    id: string;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    category: string;
    message: string;
    status: 'active' | 'pending' | 'inactive';
    rating: number;
    totalOrders: number;
}


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
    },
    registerSupplier: async (data: {
        name: string; email: string; phone: string;
        whatsapp: string; category: string; message: string;
    }): Promise<void> => {
        await axios.post(`${API_BASE_URL}/suppliers/register`, data);
    }
};

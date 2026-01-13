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

const MOCK_SUPPLIERS: Supplier[] = [
    { id: '1', name: 'Premium Ceylon Spices', email: 'ceylon@spices.com', phone: '+94 11 234 5678', category: 'Cinnamon, Pepper', status: 'active', rating: 4.8, totalOrders: 145 },
    { id: '2', name: 'Matara Spice Hub', email: 'matara@hub.com', phone: '+94 41 876 5432', category: 'Chili, Turmeric', status: 'active', rating: 4.5, totalOrders: 89 },
    { id: '3', name: 'Kandy Spice Growers', email: 'kandy@growers.com', phone: '+94 81 555 1122', category: 'Cardamom, Cloves', status: 'pending', rating: 4.2, totalOrders: 34 },
];

export const supplierService = {
    getSuppliers: async (): Promise<Supplier[]> => {
        // Simulating API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_SUPPLIERS), 500);
        });
    },
    getSupplierById: async (id: string): Promise<Supplier | undefined> => {
        return MOCK_SUPPLIERS.find(s => s.id === id);
    },
    updateSupplierStatus: async (id: string, status: Supplier['status']): Promise<void> => {
        console.log(`Updating supplier ${id} status to ${status}`);
    }
};

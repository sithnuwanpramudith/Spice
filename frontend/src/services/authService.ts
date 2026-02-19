export interface User {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'supplier' | 'customer';
}

export interface LoginResponse {
    user: User;
    token: string;
}

export const authService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Basic validation mock
        if (password.length < 6) {
            throw new Error('Invalid credentials');
        }

        // Role determination simulation (like a backend would do)
        let role: 'owner' | 'supplier' | 'customer' = 'customer';
        if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('owner')) {
            role = 'owner';
        } else if (email.toLowerCase().includes('supplier')) {
            role = 'supplier';
        }

        const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email: email,
            role: role
        };

        return {
            user,
            token: 'mock-jwt-token'
        };
    },

    getCurrentUser: () => {
        const saved = localStorage.getItem('spice_user');
        return saved ? JSON.parse(saved) : null;
    }
};

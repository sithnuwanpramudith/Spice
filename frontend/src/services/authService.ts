import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    },

    register: async (name: string, email: string, password: string): Promise<LoginResponse> => {
        const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
        return response.data;
    },

    getCurrentUser: () => {
        const saved = localStorage.getItem('spice_user');
        return saved ? JSON.parse(saved) : null;
    }
};

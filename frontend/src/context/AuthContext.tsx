import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User } from '../services/authService';

export interface LoginCredentials {
    email: string;
    password?: string;
    role?: 'owner' | 'customer';
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<User>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = authService.getCurrentUser();
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials): Promise<User> => {
        try {
            const response = await authService.login(credentials.email, credentials.password || '');
            setUser(response.user);
            localStorage.setItem('spice_user', JSON.stringify(response.user));
            return response.user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('spice_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

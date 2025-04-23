import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { getToken, setToken as setStorageToken, removeToken } from '../services/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Initialize the authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = getToken();
        return !!token;
    });

    // Listen to the changes of localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const token = getToken();
            setIsAuthenticated(!!token);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = (token: string) => {
        setStorageToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setIsAuthenticated(false);
    };

    const value: AuthContextType = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

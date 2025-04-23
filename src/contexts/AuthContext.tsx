import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, setToken as setStorageToken, removeToken } from '../services/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // initialize the authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = getToken();
        return !!token;
    });

    // listen to the changes of localStorage
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 
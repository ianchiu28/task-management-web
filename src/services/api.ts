import { getToken } from './auth';

interface RegisterData {
    email: string;
    username: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface ApiResponse {
    message: string;
    data: {
        accessToken?: string;        
    };
}

const getHeaders = (includeAuth = false) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

export const register = async (data: RegisterData): Promise<ApiResponse> => {
    const response = await fetch('http://localhost:4010/users', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
};

export const login = async (data: LoginData): Promise<ApiResponse> => {
    const response = await fetch('http://localhost:4010/users/login', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
}; 
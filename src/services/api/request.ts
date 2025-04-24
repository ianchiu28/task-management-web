import { getToken } from '../auth';

const API_BASE_URL = 'http://localhost:4010';

export interface ApiResponse<T> {
    message: string;
    data: T;
}

export const getHeaders = (includeAuth = false) => {
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

export const fetchApi = async <T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = false
): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...getHeaders(includeAuth),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
}; 
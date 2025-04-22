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
    data: object;
}

export const register = async (data: RegisterData): Promise<ApiResponse> => {
    const response = await fetch('http://localhost:4010/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
}; 
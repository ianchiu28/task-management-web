import { fetchApi, ApiResponse } from './request';

interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export const invokeRegisterApi = async (data: RegisterRequest): Promise<ApiResponse> => {
    return fetchApi<ApiResponse>('/users', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
}

export const invokeLoginApi = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return fetchApi<ApiResponse<LoginResponse>>('/users/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}; 
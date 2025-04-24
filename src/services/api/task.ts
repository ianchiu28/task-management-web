import { fetchApi, ApiResponse } from './request';

interface CreateTaskRequest {
    title: string;
    description?: string;
}

interface CreateTaskResponse {
    uuid: string;
}

export const createTask = async (data: CreateTaskRequest): Promise<ApiResponse<CreateTaskResponse>> => {
    return fetchApi<ApiResponse<CreateTaskResponse>>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
    }, true);
};

export interface Task {
    uuid: string;
    title: string;
    description: string;
    status: 'pending' | 'inProgress' | 'completed';
    createdAt: string;
    updatedAt: string;
}

interface TasksResponse {
    tasks: Task[];
} 

export const getTasks = async (): Promise<ApiResponse<TasksResponse>> => {
    return fetchApi<ApiResponse<TasksResponse>>('/tasks', {
        method: 'GET',
    }, true);
};

export const deleteTask = async (uuid: string): Promise<ApiResponse<object>> => {
    return fetchApi<ApiResponse<object>>(`/tasks/${uuid}`, {
        method: 'DELETE',
    }, true);
}; 
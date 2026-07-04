import { Task, CreateTaskInput, ApiResponse } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`);
  const data: ApiResponse<Task[]> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch tasks');
  }

  return data.data || [];
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data: ApiResponse<Task> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to create task');
  }

  return data.data!;
};

export const toggleTaskComplete = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PATCH',
  });
  const data: ApiResponse<Task> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to update task');
  }

  return data.data!;
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  const data: ApiResponse<{}> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to delete task');
  }
};

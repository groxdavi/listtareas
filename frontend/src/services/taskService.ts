import { apiClient } from "../utils/api";
import { Task } from '../types';

const API_URL = '/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get(API_URL);
    return response.data;
  } catch {
    throw new Error('Failed to fetch tasks');
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await apiClient.post(`${API_URL}/createTask`, task, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch {
    throw new Error('Failed to create task');
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await apiClient.delete(`${API_URL}/${taskId}`);
  } catch {
    throw new Error('Failed to delete task');
  }
};

export const editTask = async (taskId: string, updatedTask: Partial<Task>): Promise<Task> => {
  try {
    const response = await apiClient.put(`${API_URL}/${taskId}`, updatedTask, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch {
    throw new Error('Failed to edit task');
  }
};
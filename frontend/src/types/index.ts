export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface Task {
    _id: string;
    title: string;
    completed: boolean;
    userId: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }
import React, { useEffect, useState } from 'react';
import { Task } from '../../types';
import { fetchTasks, createTask, deleteTask, editTask } from '../../services/taskService';
import { useAuth } from '../Auth/AuthContext';
import { TaskContext } from './TaskContext';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadTasks = async () => {
      if (user) {
        const fetchedTasks = await fetchTasks();
        console.log('Fetched tasks:', fetchedTasks); // Log the result of fetchTasks
        setTasks(fetchedTasks);
      } else {
        setTasks([]); // Clear tasks when user logs out
      }
    };
    loadTasks();
  }, [user]);

  const addTask = async (task: Task) => {
    if (user) {
      const createdTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } else {
      throw new Error('User not authenticated');
    }
  };

  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    if (user) {
      const updated = await editTask(taskId, updatedTask);
      setTasks((prevTasks) => prevTasks.map(task => task._id === taskId ? updated : task));
    } else {
      throw new Error('User not authenticated');
    }
  };

  const removeTask = async (taskId: string) => {
    if (user) {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
    } else {
      throw new Error('User not authenticated');
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    const task = tasks.find(task => task._id === taskId);
    if (task) {
      await updateTask(taskId, { completed: !task.completed });
    }
  };


  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, fetchTasks, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
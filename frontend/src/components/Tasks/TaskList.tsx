import React, { useState, useEffect } from 'react';
import { useTask } from './TaskContext';
import TaskItem from './TaskItem';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const TaskList: React.FC = () => {
  const { tasks, fetchTasks, addTask } = useTask();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!user){
      alert("Please login to add task");
      navigate("/login");
    }
    if (title && user) {
      await addTask({ _id: Date.now().toString(), title, completed: false, userId: user.id });
      setTitle('');
    }
  };
  
  return (
    <div>
      <h2>Lista de tareas</h2>
      <form onSubmit={handleAddTask}>
        <div>
          <label>Titulo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Tarea</button>
      </form>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
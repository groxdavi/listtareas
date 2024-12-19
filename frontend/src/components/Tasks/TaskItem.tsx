import React, { useState } from 'react';
import { Task } from '../../types';
import { useTask } from './TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, removeTask, toggleTaskCompletion } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await updateTask(task._id, { title });
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    await removeTask(task._id);
  };

  const handleToggleCompletionClick = async () => {
    await toggleTaskCompletion(task._id);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h3>{task.title}</h3>
      )}
      {isEditing ? (
        <button onClick={handleSaveClick}>Guardar</button>
      ) : (
        <>
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleDeleteClick}>Borrar</button>
          <button onClick={handleToggleCompletionClick}>
            {task.completed ? 'Marcar como Incompleta' : 'Marcar como Completa'}
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
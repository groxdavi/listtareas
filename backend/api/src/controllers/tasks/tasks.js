import Task from "../../models/Task.js";
import User from "../../models/User.js";

// Crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const task = new Task({
      title,
      completed,
      user: req.user._id, // Associate the task with the authenticated user
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

// Obtener todas las tareas de un usuario
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Update fields
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

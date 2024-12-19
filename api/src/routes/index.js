import { Router } from "express";
import { login } from "../controllers/auth/authLogin.js";
import { logout } from "../controllers/auth/authLogout.js";
import { register } from "../controllers/auth/authRegister.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/others/userProfile.js";
import { validateRegister } from "../middleware/validator.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/tasks/tasks.js";

const router = Router();

router.get("/", (req,res)=>{
    res.send("Backend By David")
})

//autenticar
router.post("/api/register", validateRegister, register)
router.post("/api/login", login)
router.post("/api/logout", logout);
// Ruta de autenticación para verificar si el usuario está autenticado
router.get('/authenticate', protectRoute, (req, res) => {
  // Si el middleware de protección pasa, significa que el usuario está autenticado
  return res.json({
    message: 'User authenticated',
    user: req.user,  // Aquí pasas los datos del usuario (sin la contraseña)
  });
});
//Perfil del usuario
router.get("/api/user/profile", protectRoute, getProfile);

//-------------------------------------------------------------------------
//Tareas
// Rutas CRUD para Task
router.post("/tasks/createTask", protectRoute, createTask); // Crear una tarea
router.get("/tasks", protectRoute, getTasks); // Obtener todas las tareas del usuario
router.put("/tasks/:id", protectRoute, updateTask); // Actualizar una tarea por ID
router.delete("/tasks/:id", protectRoute, deleteTask); // Eliminar una tarea por ID

//-------------------------------------------------------------------------

// Ruta para actualizar el perfil del usuario actual
router.put('/api/user/update-profile', protectRoute,updateProfile);
//-------------------------------------------------------------------------







export default router;
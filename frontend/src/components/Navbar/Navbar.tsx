import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/tasks">Mis tareas</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/register">Crear cuenta</Link>
            </li>
          </>
        ) : (
          <><li>
          <Link to="/profile" ><button>Mi perfil</button></Link>
        </li>
        <li>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </li></>
          
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RedirectAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/tasks" />;
  }

  return <>{children}</>;
};

export default RedirectAuth;
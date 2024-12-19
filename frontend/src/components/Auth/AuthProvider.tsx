import React, { useState, useEffect, ReactNode } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout, authenticate as authAuthenticate } from '../../services/authService';
import { AuthContext } from './AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await authAuthenticate();
        console.log('Authenticated user:', userData); // Debugging statement
        setUser(userData);
      } catch (error) {
        console.error('User not authenticated', error);
        setUser(null);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const userData = await authLogin(credentials.email, credentials.password);
    console.log('User logged in:', userData); // Debugging statement
    setUser(userData);
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    await authRegister(userData.name, userData.email, userData.password);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
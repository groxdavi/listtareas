import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthProvider';
import { TaskProvider } from './components/Tasks/TaskProvider';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <AppRoutes />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Required scripts
import { AuthProvider } from './background/auth';
import ProtectedRoute from './background/ProtectedRoute';

// Page views of app
import LoginView from './views/LoginPage';
import HomePage from './views/HomePage';
import Room from './views/Room';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LoginView />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/room/:roomID'
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;

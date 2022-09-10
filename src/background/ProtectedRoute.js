import React from 'react';
import { Navigate } from 'react-router-dom';

// Required scripts
import { useAuthContext } from './auth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;
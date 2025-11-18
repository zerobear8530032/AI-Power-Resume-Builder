import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const currentUser = useSelector((state) => state.loginUser.value);

  // If not logged in, redirect to /login
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // Render the children component if logged in
  return children;
}

export default ProtectedRoute;

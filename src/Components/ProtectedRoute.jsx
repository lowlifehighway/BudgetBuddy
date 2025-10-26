import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axios.js';
// import axios from 'axios';

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // await api.get('/users/profile');
        await api.get('/users/auth');
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        console.error('Authentication check failed:', err);
      }
    };

    verifyUser();
  });

  if (isAuthenticated === null) {
    {
      console.log('not authenticated');
    }
    return <p className="text-center mt-10">Checking authentication...</p>;
  }
  {
    console.log('authenticated');
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

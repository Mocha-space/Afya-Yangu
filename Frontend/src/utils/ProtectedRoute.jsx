import React, { useEffect, useState } from 'react';
import api from '../api';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const endpoint = adminOnly ? '/admin/verify' : '/user/verify';
        await api.get(endpoint);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token'); // Clear invalid token
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [adminOnly]);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to={adminOnly ? '/admin/login' : '/login'} />;
};

export default ProtectedRoute;
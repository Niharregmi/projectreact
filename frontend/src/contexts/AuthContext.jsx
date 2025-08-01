import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { apiClient } from '../lib/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      if (token) {
        apiClient.setToken(token);
        try {
          const userData = await apiClient.get('/auth/profile');
          setUser(userData);
          setIsAuthenticated(true);
          // Ensure we're using the consistent token key
          if (!localStorage.getItem('authToken')) {
            localStorage.setItem('authToken', token);
            localStorage.removeItem('token'); // Remove old key if exists
          }
        } catch (error) {
          // If token is invalid, clear it and redirect to login
          console.error('Token validation failed:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          apiClient.setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password, role = 'staff') => {
    try {
      const response = await apiClient.register(username, email, password, role);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiClient.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('token'); // Remove any old token keys
    apiClient.logout();
    navigate('/'); 
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

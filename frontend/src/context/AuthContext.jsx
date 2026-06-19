import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user from localStorage
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    if (token && email && fullName) {
      setUser({
        token,
        email,
        fullName,
        username: username || '',
        id: userId || null
      });
    }
    setLoading(false);
  }, []);

  const login = async (login, password) => {
    setLoading(true);
    try {
      // Now sends { login, password } instead of { email, password }
      const data = await authAPI.login(login, password);

      // Store all user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('fullName', data.fullName);
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('userId', data.id || '');

      setUser({
        token: data.token,
        email: data.email,
        fullName: data.fullName,
        username: data.username,
        id: data.id,
        emailVerified: data.emailVerified
      });

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, username, email, password) => {
    setLoading(true);
    try {
      // Registration with username
      const data = await authAPI.register(fullName, username, email, password);

      // After successful registration, auto-login happens on backend
      // Store user data from response
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('fullName', data.fullName);
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('userId', data.id || '');

      setUser({
        token: data.token,
        email: data.email,
        fullName: data.fullName,
        username: data.username,
        id: data.id,
        emailVerified: data.emailVerified
      });

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('fullName');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUser(null);
  };

  const getCurrentUser = async () => {
    try {
      const data = await authAPI.getCurrentUser();
      setUser(prev => ({
        ...prev,
        ...data
      }));
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      getCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
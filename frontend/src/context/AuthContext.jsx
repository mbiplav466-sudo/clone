import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/apiService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('healthpulse_jwt_token') || null;
    } catch {
      return null;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('healthpulse_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isCheckingSession, setIsCheckingSession] = useState(false);

  // Restore user session if token exists
  useEffect(() => {
    if (token && !currentUser) {
      setIsCheckingSession(true);
      api.getMe(token)
        .then(res => {
          setCurrentUser(res.user);
          localStorage.setItem('healthpulse_user', JSON.stringify(res.user));
        })
        .catch(err => {
          console.warn('Session expired, logging out:', err);
          logout();
        })
        .finally(() => setIsCheckingSession(false));
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    setToken(res.token);
    setCurrentUser(res.user);
    localStorage.setItem('healthpulse_jwt_token', res.token);
    localStorage.setItem('healthpulse_user', JSON.stringify(res.user));
    setIsAuthModalOpen(false);
    return res;
  };

  const register = async (name, email, password, age, gender) => {
    const res = await api.register({ name, email, password, age, gender });
    setToken(res.token);
    setCurrentUser(res.user);
    localStorage.setItem('healthpulse_jwt_token', res.token);
    localStorage.setItem('healthpulse_user', JSON.stringify(res.user));
    setIsAuthModalOpen(false);
    return res;
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('healthpulse_jwt_token');
    localStorage.removeItem('healthpulse_user');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        isLoggedIn: !!token && !!currentUser,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        isCheckingSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

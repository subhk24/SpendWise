import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('spendwise_token')
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const initAuth = async () => {
    const savedToken = localStorage.getItem('spendwise_token');

    if (savedToken) {
      try {
        const currentUser = await api.getMe();

        setToken(savedToken);
        setUser(currentUser);
      } catch {
        localStorage.removeItem('spendwise_token');
        localStorage.removeItem('spendwise_user');

        setToken(null);
        setUser(null);
      }
    }

    setIsLoading(false);
  };

  initAuth();
}, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('spendwise_token', newToken);
    localStorage.setItem('spendwise_user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const updateUser = (updatedUser: User) => {
  localStorage.setItem(
    'spendwise_user',
    JSON.stringify(updatedUser)
  );

  setUser(updatedUser);
};

  const logout = () => {
    localStorage.removeItem('spendwise_token');
    localStorage.removeItem('spendwise_user');

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authApi from '../api/auth';
import client from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authApi.me();
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Set up an interceptor to handle 401s globally
  useEffect(() => {
    const interceptor = client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      client.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password, rememberMe) => {
    const res = await authApi.login(email, password, rememberMe);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, companyId: user?.company_id, role: user?.role, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

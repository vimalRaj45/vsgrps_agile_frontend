import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/react';
import * as authApi from '../api/auth';
import client from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { getToken, signOut } = useClerkAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync Clerk user with local user state
  useEffect(() => {
    if (clerkLoaded) {
      if (clerkUser) {
        // Map Clerk user to the format expected by the app
        setUser({
          id: clerkUser.id,
          name: clerkUser.fullName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0],
          email: clerkUser.primaryEmailAddress?.emailAddress,
          role: clerkUser.publicMetadata?.role || 'user',
          company_id: clerkUser.publicMetadata?.company_id,
          isClerk: true
        });
      } else {
        // Fallback to traditional auth check if Clerk is not logged in
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
      }
      setLoading(false);
    }
  }, [clerkUser, clerkLoaded]);

  // Set up an interceptor to add Clerk token to requests
  useEffect(() => {
    const requestInterceptor = client.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Failed to get Clerk token:', err);
      }
      return config;
    });

    const responseInterceptor = client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      client.interceptors.request.eject(requestInterceptor);
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [getToken]);

  const login = async (email, password, rememberMe, companyId) => {
    // This is for legacy login, but we keep it for now
    const res = await authApi.login(email, password, rememberMe, companyId);
    if (res.data.user) {
      setUser(res.data.user);
    }
    return res.data;
  };

  const logout = async () => {
    if (clerkUser) {
      await signOut();
    }
    setUser(null);
    try {
      const { unsubscribeFromPush } = await import('../utils/pushManager');
      await unsubscribeFromPush();
    } catch (err) {
      console.warn('Push unsubscription failed during logout:', err);
    }
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout API call failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, companyId: user?.company_id, role: user?.role, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

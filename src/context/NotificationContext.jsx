import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import client from '../api/client';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bannerNotification, setBannerNotification] = useState(null);
  const lastFetchedIds = useRef(new Set());
  const isFirstFetch = useRef(true);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    try {
      const res = await client.get('/notifications');
      const data = Array.isArray(res.data) ? res.data : [];
      
      const newUnread = data.filter(n => !n.read).length;
      setUnreadCount(newUnread);
      
      // Identify new notifications for the banner
      if (!isFirstFetch.current) {
        const newOnes = data.filter(n => !n.read && !lastFetchedIds.current.has(n.id));
        if (newOnes.length > 0) {
          // Show the most recent new notification in the banner
          setBannerNotification(newOnes[0]);
        }
      }

      // Update the set of IDs we've seen
      const currentIds = new Set(data.map(n => n.id));
      lastFetchedIds.current = currentIds;
      setNotifications(data);
      isFirstFetch.current = false;
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Failed to fetch notifications:', err);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000); // Check every 10s
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
      setUnreadCount(0);
      lastFetchedIds.current = new Set();
      isFirstFetch.current = true;
    }
  }, [user, fetchNotifications]);

  const markAsRead = async (id) => {
    try {
      await client.patch(`/notifications/${id}`, { read: true });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const clearBanner = () => setBannerNotification(null);

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      fetchNotifications, 
      markAsRead,
      bannerNotification,
      clearBanner
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

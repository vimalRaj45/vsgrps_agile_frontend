import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import InstallPrompt from './InstallPrompt';
import PushNotificationPrompt from './PushNotificationPrompt';
import BottomNav from './BottomNav';
import { subscribeToPush } from '../../utils/pushManager';




const drawerWidth = 280; // Slightly wider for a premium feel

import NotificationBanner from './NotificationBanner';

const AppLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Attempt to subscribe to push notifications only if permission is already granted
    if (Notification.permission === 'granted') {
      const timer = setTimeout(() => {
        subscribeToPush();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Gradient for Interior App */}
      <div className="bg-gradient" style={{ opacity: 0.5 }} />
      
      <TopBar handleDrawerToggle={handleDrawerToggle} />
      <NotificationBanner />
      <InstallPrompt />
      <PushNotificationPrompt />
      
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4, md: 5 },
          pb: { xs: 12, sm: 4 }, // Extra padding for bottom nav on mobile
          width: { md: `calc(100% - ${drawerWidth}px)` },

          mt: 9,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box className="fade-in">
          {children}
        </Box>
      </Box>
      <BottomNav />
    </Box>
  );
};

export default AppLayout;

import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InfoIcon from '@mui/icons-material/Info';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const NotificationBanner = () => {
  const { bannerNotification, clearBanner, markAsRead } = useNotifications();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    if (bannerNotification) {
      const timer = setTimeout(() => {
        clearBanner();
      }, 6000); // Auto hide after 6s
      return () => clearTimeout(timer);
    }
  }, [bannerNotification, clearBanner]);

  if (!bannerNotification) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircleOutlineIcon sx={{ color: '#10b981' }} />;
      case 'error': return <ErrorOutlineIcon sx={{ color: '#ef4444' }} />;
      case 'warning': return <InfoIcon sx={{ color: '#f59e0b' }} />;
      case 'task_assigned': return <NotificationsActiveIcon sx={{ color: '#6366f1' }} />;
      case 'mention': return <InfoIcon sx={{ color: '#ec4899' }} />;
      case 'meeting_added': return <NotificationsActiveIcon sx={{ color: '#8b5cf6' }} />;
      case 'broadcast': return <InfoIcon sx={{ color: '#f97316' }} />;
      default: return <NotificationsActiveIcon sx={{ color: theme.palette.primary.main }} />;
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case 'task_assigned': return 'Task Assigned';
      case 'mention': return 'New Mention';
      case 'meeting_added': return 'Meeting Scheduled';
      case 'broadcast': return 'Announcement';
      default: return 'New Notification';
    }
  };

  const handleAction = () => {
    if (bannerNotification.link) {
      navigate(bannerNotification.link);
      markAsRead(bannerNotification.id);
      clearBanner();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {bannerNotification && (
        <Box
          component={motion.div}
          initial={{ y: -120, opacity: 0, scale: 0.9 }}
          animate={{ y: 24, opacity: 1, scale: 1 }}
          exit={{ y: -120, opacity: 0, scale: 0.9 }}
          transition={{ 
            type: 'spring', 
            damping: 15, 
            stiffness: 100,
            mass: 0.8
          }}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            px: 2,
            pointerEvents: 'none'
          }}
        >
          <Paper
            elevation={24}
            onClick={handleAction}
            sx={{
              pointerEvents: 'auto',
              width: '100%',
              maxWidth: 480,
              p: 0,
              borderRadius: '24px',
              cursor: bannerNotification.link ? 'pointer' : 'default',
              background: 'rgba(15, 15, 25, 0.8)',
              backdropFilter: 'blur(20px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                background: 'rgba(20, 20, 35, 0.9)',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            <Stack direction="row" spacing={0} alignItems="stretch">
              <Box 
                sx={{ 
                  width: 6, 
                  bgcolor: (t) => {
                    switch (bannerNotification.type) {
                      case 'task_assigned': return '#6366f1';
                      case 'mention': return '#ec4899';
                      case 'meeting_added': return '#8b5cf6';
                      case 'broadcast': return '#f97316';
                      default: return t.palette.primary.main;
                    }
                  }
                }} 
              />
              
              <Stack direction="row" spacing={2} sx={{ p: 2, flexGrow: 1 }} alignItems="center">
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: '16px', 
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                >
                  {getIcon(bannerNotification.type)}
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography 
                      variant="caption" 
                      fontWeight="900" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.5)', 
                        letterSpacing: 1.5, 
                        textTransform: 'uppercase',
                        fontSize: '0.65rem'
                      }}
                    >
                      {getLabel(bannerNotification.type)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>
                      Just now
                    </Typography>
                  </Stack>
                  
                  <Typography variant="body2" sx={{ color: '#fff', mt: 0.5, fontWeight: 600, lineHeight: 1.4 }}>
                    {bannerNotification.message}
                  </Typography>
                  
                  {bannerNotification.link && (
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 800, mt: 0.5, display: 'block', fontSize: '0.7rem' }}>
                      TAP TO VIEW DETAILS →
                    </Typography>
                  )}
                </Box>

                <IconButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    clearBanner();
                  }}
                  sx={{ 
                    alignSelf: 'flex-start',
                    color: 'rgba(255,255,255,0.2)', 
                    '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' } 
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;

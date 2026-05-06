import React, { useState, useEffect } from 'react';
import { Alert, Button, Snackbar, Slide, CircularProgress, Backdrop, Typography, Box } from '@mui/material';
import { NotificationsActive as NotifyIcon } from '@mui/icons-material';
import { subscribeToPush } from '../../utils/pushManager';

const PushNotificationPrompt = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if browser supports notifications
    if (!('Notification' in window)) return;

    const isSubscribed = localStorage.getItem('push_subscribed');

    // Show prompt if (permission is default OR we have no local sub) AND permission isn't denied
    if ((Notification.permission === 'default' || !isSubscribed) && Notification.permission !== 'denied') {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000); // Wait 2 seconds after login
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnable = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await subscribeToPush();
        setOpen(false);
      } else {
        setOpen(false);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 2000,
          flexDirection: 'column',
          gap: 2,
          backdropFilter: 'blur(8px)',
          bgcolor: 'rgba(0, 0, 0, 0.7)'
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Connecting with you...
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Please wait a moment while we set up your real-time updates.
          </Typography>
        </Box>
      </Backdrop>

      <Snackbar
        open={open && !loading}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <Alert
          icon={<NotifyIcon fontSize="inherit" />}
          severity="info"
          variant="filled"
          sx={{ 
            width: '100%', 
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' }
          }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={handleEnable} 
              disabled={loading}
              sx={{ fontWeight: 'bold', minWidth: 80 }}
            >
              ENABLE
            </Button>
          }
        >
          Enable real-time notifications to stay updated!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PushNotificationPrompt;

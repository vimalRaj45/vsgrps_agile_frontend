import React, { useState, useEffect } from 'react';
import { Alert, Button, Snackbar, Slide } from '@mui/material';
import { NotificationsActive as NotifyIcon } from '@mui/icons-material';
import { subscribeToPush } from '../../utils/pushManager';

const PushNotificationPrompt = () => {
  const [open, setOpen] = useState(false);

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
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await subscribeToPush();
        setOpen(false);
        // Show success alert briefly
        alert('Success! You will get updated correctly.');
      } else {
        setOpen(false);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setOpen(false);
    }
  };

  return (
    <Snackbar
      open={open}
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
          <Button color="inherit" size="small" onClick={handleEnable} sx={{ fontWeight: 'bold' }}>
            ENABLE
          </Button>
        }
      >
        Enable real-time notifications to stay updated!
      </Alert>
    </Snackbar>
  );
};

export default PushNotificationPrompt;

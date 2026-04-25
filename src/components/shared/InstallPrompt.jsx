import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, 
  Typography, Box, Stack, useTheme, useMediaQuery
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

// Lottie helper since we can't easily install a new package now
const LottieIcon = ({ src, style }) => (
  <Box sx={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src="https://cdn-icons-png.flaticon.com/512/2583/2583161.png" alt="App Icon" style={{ width: '80%', height: '80%' }} />
  </Box>
);

const InstallPrompt = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleManualTrigger = () => {
      setOpen(true);
    };

    // Check if event already happened
    if (window.deferredPWAEvent) {
      window.dispatchEvent(new CustomEvent('pwa-ready'));
    }

    window.addEventListener('trigger-pwa-prompt', handleManualTrigger);
    return () => {
      window.removeEventListener('trigger-pwa-prompt', handleManualTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = window.deferredPWAEvent;
    if (!promptEvent) return;
    
    // Show the install prompt
    promptEvent.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await promptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      // Also request notification permission
      if ('Notification' in window) {
        await Notification.requestPermission();
      }
      window.deferredPWAEvent = null;
      window.dispatchEvent(new CustomEvent('pwa-ready'));
    }
    
    setOpen(false);
  };

  const handleClose = () => {
    localStorage.setItem('install-prompt-dismissed', 'true');
    setOpen(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: { xs: 3, sm: 4 },
          p: { xs: 0.5, sm: 1 },
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)' 
            : 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          mx: { xs: 2, sm: 'auto' }
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" fontWeight="900" letterSpacing="-1px" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Install VSGRPS Agile
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', py: { xs: 1, sm: 2 } }}>
          <Box sx={{ p: 1, bgcolor: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', display: 'flex' }}>
            <LottieIcon 
              src="https://assets5.lottiefiles.com/packages/lf20_m6cu96p8.json" 
              style={{ width: isMobile ? 80 : 120, height: isMobile ? 80 : 120 }}
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
            Get the full native experience and never miss a critical update with push notifications.
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ width: '100%', mt: 1 }}>
            <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <NotificationsActiveIcon color="primary" sx={{ mb: 0.5, fontSize: 20 }} />
              <Typography variant="caption" fontWeight="bold" display="block">Instant Alerts</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <SmartphoneIcon color="primary" sx={{ mb: 0.5, fontSize: 20 }} />
              <Typography variant="caption" fontWeight="bold" display="block">App Experience</Typography>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 3 }, justifyContent: 'center', gap: 1 }}>
        <Button 
          onClick={handleClose} 
          sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.8rem' }}
        >
          Maybe Later
        </Button>
        <Button 
          variant="contained" 
          onClick={handleInstallClick}
          startIcon={<DownloadIcon />}
          sx={{ 
            borderRadius: 2, 
            px: { xs: 3, sm: 4 }, 
            py: 1, 
            fontWeight: '900',
            fontSize: '0.8rem',
            boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)'
          }}
        >
          Install Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstallPrompt;

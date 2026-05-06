import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Stack, Fade, useTheme } from '@mui/material';

const MESSAGES = [
  "Setting things up for you...",
  "Initializing your workspace...",
  "Connecting everything seamlessly...",
  "Syncing with your team...",
  "Optimizing your workflow...",
  "Fine-tuning performance behind the scenes...",
  "Putting in the work, so you don’t have to...",
  "Crafting a smarter experience for you...",
  "Almost ready, just a moment...",
  "Preparing the Sprintora experience..."
];

const LoadingScreen = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        width: '100vw', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: isDark 
          ? 'linear-gradient(135deg, #020617 0%, #0f172a 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <Stack spacing={4} alignItems="center">
        {/* Animated Loader */}
        <Box sx={{ position: 'relative', display: 'flex' }}>
          <CircularProgress 
            variant="determinate" 
            value={100} 
            size={80} 
            thickness={2} 
            sx={{ color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} 
          />
          <CircularProgress 
            variant="indeterminate" 
            disableShrink 
            size={80} 
            thickness={2} 
            sx={{ 
              color: 'primary.main', 
              position: 'absolute', 
              left: 0,
              filter: isDark ? 'drop-shadow(0 0 10px #6366f1)' : 'none',
              animationDuration: '800ms'
            }} 
          />
        </Box>

        {/* Dynamic Text */}
        <Box sx={{ height: 40, textAlign: 'center' }}>
          <Fade in={true} key={messageIndex} timeout={800}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.primary', 
                fontWeight: 600, 
                letterSpacing: '0.5px',
                opacity: 0.9,
                background: isDark 
                  ? 'linear-gradient(90deg, #fff 0%, #cbd5e1 100%)' 
                  : 'linear-gradient(90deg, #0f172a 0%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {MESSAGES[messageIndex]}
            </Typography>
          </Fade>
        </Box>

        {/* Branding */}
        <Typography 
          variant="caption" 
          sx={{ 
            position: 'absolute', 
            bottom: 40, 
            color: 'text.secondary', 
            opacity: 0.4,
            letterSpacing: 2, 
            fontWeight: 800,
            textTransform: 'uppercase'
          }}
        >
          Sprintora Workspace
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoadingScreen;

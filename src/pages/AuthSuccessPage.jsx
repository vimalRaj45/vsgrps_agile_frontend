import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      // We force a reload or navigate to dashboard. 
      // AuthContext will pick up the token on mount.
      window.location.href = '/dashboard';
    } else {
      navigate('/login?error=auth_failed');
    }
  }, [location, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#0a0a0f', color: 'white' }}>
      <CircularProgress sx={{ mb: 2, color: '#6366f1' }} />
      <Typography variant="h6">Authenticating...</Typography>
    </Box>
  );
};

export default AuthSuccessPage;

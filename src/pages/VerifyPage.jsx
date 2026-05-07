import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Container, useTheme } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import client from '../api/client';

const VerifyPage = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const verificationStarted = React.useRef(false);

  useEffect(() => {
    if (verificationStarted.current) return;
    verificationStarted.current = true;
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Missing token.');
        return;
      }

      try {
        const res = await client.get(`/auth/verify?token=${token}`);
        setStatus('success');
        setMessage(res.data.message);
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Verification failed. The link may be expired or invalid.');
      }
    };

    verifyEmail();
  }, [token]);

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      p: 2
    }}>
      {/* Background Orbs consistent with other auth pages */}
      <Box sx={{ 
        position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', 
        background: `radial-gradient(circle, ${isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)'} 0%, transparent 70%)`, 
        filter: 'blur(80px)', zIndex: 0 
      }} />
      <Box sx={{ 
        position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', 
        background: `radial-gradient(circle, ${isDark ? 'rgba(236, 72, 153, 0.05)' : 'rgba(236, 72, 153, 0.03)'} 0%, transparent 70%)`, 
        filter: 'blur(80px)', zIndex: 0 
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Card sx={{ 
          borderRadius: 6, 
          textAlign: 'center', 
          p: { xs: 2, md: 4 }, 
          bgcolor: 'background.paper',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: isDark 
            ? '0 50px 100px -20px rgba(0,0,0,0.5)' 
            : '0 20px 40px -10px rgba(0,0,0,0.1)'
        }}>
          <CardContent>
            {status === 'verifying' && (
              <>
                <CircularProgress size={60} sx={{ mb: 3 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>Verifying Account</Typography>
                <Typography color="text.secondary">Please wait while we confirm your email address...</Typography>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
                <Typography variant="h4" fontWeight="bold" gutterBottom>Verified!</Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>{message}</Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large" 
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderRadius: 3, 
                    fontWeight: 'bold', 
                    py: 2,
                    boxShadow: isDark 
                      ? '0 8px 16px rgba(99, 102, 241, 0.4)' 
                      : `0 8px 16px ${theme.palette.primary.main}33`
                  }}
                >
                  Go to Login
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>Verification Failed</Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>{message}</Typography>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  size="large" 
                  onClick={() => navigate('/login')}
                  sx={{ borderRadius: 3, fontWeight: 'bold', py: 1.5 }}
                >
                  Back to Login
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VerifyPage;

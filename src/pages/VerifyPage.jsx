import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Container } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import client from '../api/client';

const VerifyPage = () => {
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Card sx={{ 
          borderRadius: 3, 
          textAlign: 'center', 
          p: 4, 
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)'
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
                  sx={{ borderRadius: 3, fontWeight: 'bold', py: 1.5 }}
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
      </Box>
    </Container>
  );
};

export default VerifyPage;

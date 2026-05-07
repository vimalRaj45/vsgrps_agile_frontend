import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Stack, Paper, useTheme
} from '@mui/material';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import BrandLogo from '../components/shared/BrandLogo';

const CompleteSignupPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const signupToken = params.get('token');
    
    if (!signupToken) {
      navigate('/login');
      return;
    }

    setToken(signupToken);

    // Decode token to show info (basic decode as we don't have a library here, or just trust the backend)
    try {
      const base64Url = signupToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      setEmail(decoded.email);
      setName(decoded.name || '');
      setInitLoading(false);
    } catch (e) {
      setError('Invalid signup session. Please try again.');
      setInitLoading(false);
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await client.post('/auth/complete-social-signup', {
        token,
        companyName,
        name
      });
      
      // Use the loginWithToken from AuthContext if implemented, 
      // or just store and redirect
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete signup');
    } finally {
      setLoading(false);
    }
  };

  if (initLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#0a0a0f' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      position: 'relative'
    }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)', bgcolor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center' }}>
              <BrandLogo size={40} sx={{ mb: 2 }} />
              <Typography variant="h4" fontWeight="950" gutterBottom sx={{ letterSpacing: '-1.5px' }}>
                One Last Step
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Finish setting up your workspace for <strong>{email}</strong>
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth label="Your Full Name"
                  value={name} onChange={(e) => setName(e.target.value)} required
                  InputProps={{ sx: { borderRadius: 3 } }}
                />
                <TextField
                  fullWidth label="Organization / Company Name"
                  placeholder="e.g. Acme Corp"
                  value={companyName} onChange={(e) => setCompanyName(e.target.value)} required
                  InputProps={{ sx: { borderRadius: 3 } }}
                />
                
                <Button
                  fullWidth variant="contained" size="large" type="submit" disabled={loading}
                  sx={{ 
                    height: 60, borderRadius: 3, fontWeight: 900, 
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Complete Setup'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CompleteSignupPage;

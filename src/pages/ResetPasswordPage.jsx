import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack 
} from '@mui/material';
import { 
  LockResetOutlined as LockIcon
} from '@mui/icons-material';
import * as authApi from '../api/auth';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Alert severity="error">Invalid reset link. Missing token.</Alert>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link component={RouterLink} to="/login">Back to Login</Link>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      p: 2
    }}>
      <div className="bg-gradient" />
      
      <Container maxWidth="sm" className="fade-in">
        <Box 
          className="glass-card" 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Stack spacing={1} sx={{ alignItems: 'center', mb: 4 }}>
            <Box sx={{ mb: 2 }}>
              <Box 
                sx={{ 
                  p: 2, borderRadius: '50%', bgcolor: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <LockIcon sx={{ fontSize: 60, color: '#6366f1' }} />
              </Box>
            </Box>

            <Typography variant="h4" fontWeight="800" letterSpacing="-1px">
              New Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Set your new secure password below.
            </Typography>
          </Stack>
          
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 1.5 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 1.5 }}>Password reset successful! Redirecting to login...</Alert>}
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading || success}
                sx={{ 
                  height: 56, 
                  fontSize: '1.1rem',
                  mt: 1,
                  boxShadow: '0 8px 16px rgba(99, 102, 241, 0.4)'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;

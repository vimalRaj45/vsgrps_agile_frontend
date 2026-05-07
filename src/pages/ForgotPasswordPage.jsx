import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, useTheme
} from '@mui/material';
import { 
  EmailOutlined as EmailIcon
} from '@mui/icons-material';
import * as authApi from '../api/auth';

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await authApi.forgotPassword(email);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

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
      
      <Container maxWidth="sm" className="fade-in" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 6,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: isDark 
              ? '0 50px 100px -20px rgba(0,0,0,0.5)' 
              : '0 20px 40px -10px rgba(0,0,0,0.1)'
          }}
        >
          <Stack spacing={1} sx={{ alignItems: 'center', mb: 4 }}>
            <Box sx={{ mb: 2 }}>
              <Box 
                sx={{ 
                  p: 2, borderRadius: '50%', 
                  bgcolor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <EmailIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
              </Box>
            </Box>

            <Typography variant="h4" fontWeight="800" letterSpacing="-1px">
              Reset Password
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Enter your email and we'll send you a link to reset your password.
            </Typography>
          </Stack>
          
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 1.5 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 3, borderRadius: 1.5 }}>{message}</Alert>}
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Email Address"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{ 
                  height: 56, 
                  fontSize: '1.1rem',
                  mt: 1,
                  boxShadow: isDark 
                    ? '0 8px 16px rgba(99, 102, 241, 0.4)' 
                    : `0 8px 16px ${theme.palette.primary.main}33`
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
              </Button>
            </Stack>
          </form>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Link 
              component={RouterLink} 
              to="/login" 
              fontWeight="700" 
              color="primary"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Back to Sign In
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;

import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, Grid, IconButton, useTheme, useMediaQuery
} from '@mui/material';
import { 
  AutoAwesome as AutoAwesomeIcon,
  ArrowBack as ArrowBackIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import * as authApi from '../api/auth';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <Container maxWidth="sm">
          <Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>Invalid reset link. Missing token.</Alert>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button variant="outlined" component={RouterLink} to="/login" startIcon={<ArrowBackIcon />}>Back to Login</Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', color: 'text.primary' }}>
      <Grid container>
        {/* Left Side: Visual (Hidden on mobile) */}
        {!isMobile && (
          <Grid item md={6} sx={{ 
            position: 'relative', 
            background: theme.palette.mode === 'dark' 
              ? 'radial-gradient(circle at center, #1e1b4b 0%, #020617 100%)'
              : 'radial-gradient(circle at center, #eff6ff 0%, #ffffff 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            p: 8
          }}>
            <Box sx={{ 
              position: 'absolute', inset: 0, opacity: 0.1, 
              backgroundImage: theme.palette.mode === 'dark'
                ? 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)'
                : 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} />
            <Box component={motion.div} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <Box 
                component="img" src="/assets/login_visual.png" 
                sx={{ 
                  width: '100%', maxWidth: 500, 
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 50px rgba(59, 130, 246, 0.2)'
                    : '0 40px 100px -20px rgba(0,0,0,0.1), 0 0 50px rgba(59, 130, 246, 0.1)'
                }} 
              />
              <Typography variant="h3" fontWeight="950" sx={{ mt: 6, letterSpacing: '-2px' }}>
                Secure Reset <br/> for <Box component="span" sx={{ color: 'primary.main' }}>Sprintora</Box>
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Right Side: Form */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 8 }, bgcolor: 'background.default' }}>
          <Container maxWidth="xs" sx={{ px: { xs: 2, sm: 4 } }}>
            <Box component={motion.div} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <Stack spacing={1} sx={{ mb: 6, alignItems: 'flex-start' }}>
                <Typography variant="h3" fontWeight="950" sx={{ letterSpacing: '-2px' }}>New Password</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>Set your new secure password below.</Typography>
              </Stack>

              {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>Password reset successful! Redirecting to login...</Alert>}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth label="New Password" variant="outlined" required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    InputProps={{ 
                      startAdornment: <LockIcon sx={{ mr: 2, color: 'text.secondary', fontSize: 22 }} />,
                    }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', 
                        borderRadius: 3, height: 64,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: 'primary.light' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' }
                      }, 
                      '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 700, fontSize: '0.9rem', transform: 'translate(14px, -10px) scale(0.9)', bgcolor: 'background.default', px: 1 },
                    }}
                  />
                  <TextField
                    fullWidth label="Confirm New Password" variant="outlined" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{ 
                      startAdornment: <LockIcon sx={{ mr: 2, color: 'text.secondary', fontSize: 22 }} />,
                    }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', 
                        borderRadius: 3, height: 64,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: 'primary.light' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' }
                      }, 
                      '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 700, fontSize: '0.9rem', transform: 'translate(14px, -10px) scale(0.9)', bgcolor: 'background.default', px: 1 },
                    }}
                  />

                  <Button 
                    type="submit" variant="contained" fullWidth disabled={loading || success}
                    sx={{ height: 56, borderRadius: 3, fontWeight: 950, fontSize: '1rem', boxShadow: theme.palette.mode === 'dark' ? '0 20px 40px -10px rgba(59, 130, 246, 0.4)' : '0 10px 20px -5px rgba(59, 130, 246, 0.3)' }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
                  </Button>
                </Stack>
              </form>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPasswordPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, FormControlLabel, Checkbox,
  Divider, IconButton, Grid, Paper, useTheme, useMediaQuery
} from '@mui/material';
import { 
  AutoAwesome as AutoAwesomeIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#030712', display: 'flex' }}>
      <Grid container>
        {/* Left Side: Visual (Hidden on mobile) */}
        {!isMobile && (
          <Grid item md={6} sx={{ 
            position: 'relative', 
            background: 'radial-gradient(circle at center, #1e1b4b 0%, #030712 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            p: 8
          }}>
            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <Box component={motion.div} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} sx={{ textAlign: 'center' }}>
              <Box 
                component="img" src="/assets/login_visual.png" 
                sx={{ 
                  width: '100%', maxWidth: 500, 
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 50px rgba(99, 102, 241, 0.2)' 
                }} 
              />
              <Typography variant="h3" fontWeight="950" sx={{ color: 'white', mt: 6, letterSpacing: '-2px' }}>
                Welcome Back to <br/> <Box component="span" sx={{ color: '#818cf8' }}>Sprintora</Box>
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Right Side: Form */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 8 }, bgcolor: '#030712' }}>
          <Container maxWidth="xs" sx={{ px: { xs: 2, sm: 4 } }}>
            <Box component={motion.div} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <Stack spacing={1} sx={{ mb: 6, alignItems: 'flex-start' }}>
                <IconButton onClick={() => navigate('/')} sx={{ color: 'rgba(255,255,255,0.3)', ml: -1, mb: 1, '&:hover': { color: '#818cf8', bgcolor: 'rgba(99,102,241,0.1)' } }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" fontWeight="950" sx={{ color: 'white', letterSpacing: '-2px' }}>Sign In</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Access your AI-powered workspace.</Typography>
              </Stack>

              {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</Alert>}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth label="Email Address" variant="filled" required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1.5, color: 'rgba(255,255,255,0.3)' }} />, disableUnderline: true }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, '&.Mui-focused': { border: '1px solid #6366f1' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' } }}
                  />
                  <TextField
                    fullWidth label="Password" variant="filled" required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    InputProps={{ startAdornment: <LockIcon sx={{ mr: 1.5, color: 'rgba(255,255,255,0.3)' }} />, disableUnderline: true }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, '&.Mui-focused': { border: '1px solid #6366f1' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' } }}
                  />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormControlLabel control={<Checkbox sx={{ color: 'rgba(255,255,255,0.2)', '&.Mui-checked': { color: '#6366f1' } }} />} label={<Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Remember me</Typography>} />
                    <Link component={RouterLink} to="/forgot-password" variant="caption" sx={{ color: '#818cf8', fontWeight: 700, textDecoration: 'none' }}>Forgot password?</Link>
                  </Stack>

                  <Button 
                    type="submit" variant="contained" fullWidth disabled={loading}
                    sx={{ height: 56, borderRadius: 3, fontWeight: 950, fontSize: '1rem', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In to Workspace'}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                  Don't have an account? {' '}
                  <Link component={RouterLink} to="/register" sx={{ color: '#818cf8', fontWeight: 800, textDecoration: 'none' }}>Create Account</Link>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;

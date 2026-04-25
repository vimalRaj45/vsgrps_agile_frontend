import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, Grid, IconButton, useTheme, useMediaQuery
} from '@mui/material';
import { 
  AutoAwesome as AutoAwesomeIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#030712', display: 'flex' }}>
      <Grid container direction={isMobile ? 'column-reverse' : 'row'}>
        {/* Form Side */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 8 } }}>
          <Container maxWidth="xs">
            <Box component={motion.div} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <Stack spacing={1} sx={{ mb: 4, alignItems: isMobile ? 'center' : 'flex-start' }}>
                <IconButton onClick={() => navigate('/')} sx={{ color: 'rgba(255,255,255,0.5)', mb: 2 }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="950" sx={{ color: 'white', letterSpacing: '-1.5px' }}>Join Sprintora</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Start your journey to perfect execution today.</Typography>
              </Stack>

              {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</Alert>}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth name="name" label="Full Name" variant="filled" required value={formData.name} onChange={handleChange}
                    InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1.5, color: 'rgba(255,255,255,0.3)' }} />, disableUnderline: true }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, '&.Mui-focused': { border: '1px solid #6366f1' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' } }}
                  />
                  <TextField
                    fullWidth name="email" label="Work Email" variant="filled" required type="email" value={formData.email} onChange={handleChange}
                    InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1.5, color: 'rgba(255,255,255,0.3)' }} />, disableUnderline: true }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, '&.Mui-focused': { border: '1px solid #6366f1' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' } }}
                  />
                  <TextField
                    fullWidth name="companyName" label="Workspace/Company Name" variant="filled" required value={formData.companyName} onChange={handleChange}
                    InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 1.5, color: 'rgba(255,255,255,0.3)' }} />, disableUnderline: true }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, '&.Mui-focused': { border: '1px solid #6366f1' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' } }}
                  />
                  <TextField
                    fullWidth name="password" label="Create Password" variant="filled" required type="password" value={formData.password} onChange={handleChange}
                    InputProps={{ startAdornment: <LockIcon sx={{ mr: 1.5, color: 'rgba(255,255,255,0.3)' }} />, disableUnderline: true }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, '&.Mui-focused': { border: '1px solid #6366f1' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' } }}
                  />

                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', mt: 1 }}>
                    By signing up, you agree to our <Link sx={{ color: '#818cf8', textDecoration: 'none' }}>Terms of Service</Link> and <Link sx={{ color: '#818cf8', textDecoration: 'none' }}>Privacy Policy</Link>.
                  </Typography>

                  <Button 
                    type="submit" variant="contained" fullWidth disabled={loading}
                    sx={{ height: 56, mt: 2, borderRadius: 3, fontWeight: 950, fontSize: '1rem', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Create My Workspace'}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                  Already have an account? {' '}
                  <Link component={RouterLink} to="/login" sx={{ color: '#818cf8', fontWeight: 800, textDecoration: 'none' }}>Sign In Instead</Link>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Grid>

        {/* Visual Side (Hidden on mobile or shown at bottom) */}
        {!isMobile && (
          <Grid item md={6} sx={{ 
            position: 'relative', 
            background: 'radial-gradient(circle at center, #1e1b4b 0%, #030712 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            p: 8
          }}>
            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <Box component={motion.div} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
              <Box component="img" src="/assets/register_visual.png" sx={{ width: '100%', maxWidth: 550, filter: 'drop-shadow(0 0 60px rgba(129, 140, 248, 0.4))' }} />
              <Typography variant="h3" fontWeight="950" sx={{ color: 'white', mt: 4, letterSpacing: '-2px', textAlign: 'center' }}>
                Build the Future <br/> with <Box component="span" sx={{ color: '#818cf8' }}>Sprintora</Box>
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RegisterPage;

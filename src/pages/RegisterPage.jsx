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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', color: 'text.primary' }}>
      <Grid container direction={isMobile ? 'column-reverse' : 'row'}>
        {/* Form Side */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 8 }, bgcolor: 'background.default' }}>
          <Container maxWidth="xs" sx={{ px: { xs: 2, sm: 4 } }}>
            <Box component={motion.div} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <Stack spacing={1} sx={{ mb: 6, alignItems: 'flex-start' }}>
                <IconButton onClick={() => navigate('/')} sx={{ color: 'text.secondary', ml: -1, mb: 1, '&:hover': { color: 'primary.main', bgcolor: 'action.hover' } }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" fontWeight="950" sx={{ letterSpacing: '-2px' }}>Join Sprintora</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>Start your journey to perfect execution.</Typography>
              </Stack>

              {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth name="name" label="Full Name" variant="outlined" required value={formData.name} onChange={handleChange}
                    InputProps={{ startAdornment: <PersonIcon sx={{ mr: 2, color: 'text.secondary', fontSize: 22 }} /> }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                         bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', 
                         borderRadius: 3, height: 60,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: 'primary.light' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' }
                      }, 
                      '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 700, fontSize: '0.85rem', transform: 'translate(14px, -10px) scale(0.9)', bgcolor: 'background.default', px: 1 },
                    }}
                  />
                  <TextField
                    fullWidth name="email" label="Work Email" variant="outlined" required type="email" value={formData.email} onChange={handleChange}
                    InputProps={{ startAdornment: <EmailIcon sx={{ mr: 2, color: 'text.secondary', fontSize: 22 }} /> }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                         bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', 
                         borderRadius: 3, height: 60,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: 'primary.light' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' }
                      }, 
                      '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 700, fontSize: '0.85rem', transform: 'translate(14px, -10px) scale(0.9)', bgcolor: 'background.default', px: 1 },
                    }}
                  />
                  <TextField
                    fullWidth name="companyName" label="Workspace Name" variant="outlined" required value={formData.companyName} onChange={handleChange}
                    InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 2, color: 'text.secondary', fontSize: 22 }} /> }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                         bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', 
                         borderRadius: 3, height: 60,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: 'primary.light' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' }
                      }, 
                      '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 700, fontSize: '0.85rem', transform: 'translate(14px, -10px) scale(0.9)', bgcolor: 'background.default', px: 1 },
                    }}
                  />
                  <TextField
                    fullWidth name="password" label="Create Password" variant="outlined" required type="password" value={formData.password} onChange={handleChange}
                    InputProps={{ startAdornment: <LockIcon sx={{ mr: 2, color: 'text.secondary', fontSize: 22 }} /> }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                         bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', 
                         borderRadius: 3, height: 60,
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: 'primary.light' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' }
                      }, 
                      '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 700, fontSize: '0.85rem', transform: 'translate(14px, -10px) scale(0.9)', bgcolor: 'background.default', px: 1 },
                    }}
                  />

                  <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}>
                    By signing up, you agree to our <Link sx={{ color: 'primary.main', textDecoration: 'none' }}>Terms of Service</Link> and <Link sx={{ color: 'primary.main', textDecoration: 'none' }}>Privacy Policy</Link>.
                  </Typography>

                  <Button 
                    type="submit" variant="contained" fullWidth disabled={loading}
                    sx={{ height: 56, mt: 2, borderRadius: 3, fontWeight: 950, fontSize: '1rem', boxShadow: theme.palette.mode === 'dark' ? '0 20px 40px -10px rgba(59, 130, 246, 0.4)' : '0 10px 20px -5px rgba(59, 130, 246, 0.3)' }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Create My Workspace'}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Already have an account? {' '}
                  <Link component={RouterLink} to="/login" sx={{ color: 'primary.main', fontWeight: 800, textDecoration: 'none' }}>Sign In Instead</Link>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Grid>

        {/* Visual Side (Hidden on mobile) */}
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
                component="img" src="/assets/register_visual.png" 
                sx={{ 
                  width: '100%', maxWidth: 550, 
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px rgba(129, 140, 248, 0.3)'
                    : '0 40px 100px -20px rgba(0,0,0,0.1), 0 0 60px rgba(129, 140, 248, 0.1)'
                }} 
              />
              <Typography variant="h3" fontWeight="950" sx={{ mt: 6, letterSpacing: '-2px' }}>
                Build the Future <br/> with <Box component="span" sx={{ color: 'primary.main' }}>Sprintora</Box>
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RegisterPage;

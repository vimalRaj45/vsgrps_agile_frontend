import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Paper, Container,
  Alert, CircularProgress, Stack, IconButton, useTheme, InputAdornment, Grid
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import client from '../api/client';
import LottieIcon from '../components/shared/LottieIcon';
import { useAuth } from '../context/AuthContext';

const InvitePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const theme = useTheme();
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const res = await client.get(`/invite/${token}`);
        setInvite(res.data);
      } catch (err) {
        setError('This invitation link is invalid or has expired.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvite();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Force logout of any existing session before creating the new account
      if (user) {
        await logout();
      }
      
      await client.post(`/invite/${token}/accept`, formData);
      // Explicitly redirect to login
      navigate('/login', { 
        state: { message: 'Account created successfully! Please login with your new credentials.' },
        replace: true // Prevent going back to the invite form
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !invite) {
    return (
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Verifying your invitation...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      py: { xs: 4, md: 8 },
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    }}>
      {/* Animated background element */}
      <Box sx={{ 
        position: 'absolute', 
        top: -100, 
        right: -100, 
        width: 400, 
        height: 400, 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)',
        filter: 'blur(50px)',
        zIndex: 0
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -150, 
        left: -150, 
        width: 500, 
        height: 500, 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ zIndex: 1 }}>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          {/* Left Column: Welcome Message */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box className="fade-in">
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 4 }}>
                <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2 }}>
                  <SecurityIcon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: '-1px' }}>
                  Sprintora <span style={{ color: theme.palette.primary.main }}>Agile</span>
                </Typography>
              </Stack>
              
              <Typography variant="h2" sx={{ 
                fontWeight: 900, 
                mb: 3, 
                lineHeight: 1.1,
                background: 'linear-gradient(90deg, #fff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Welcome to <br/>
                <span style={{ color: theme.palette.primary.main }}>{invite?.company_name || 'the Workspace'}</span>
              </Typography>
              
              <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 500, lineHeight: 1.6 }}>
                You've been invited to collaborate with your team. Set up your secure account to start managing tasks, projects, and meetings.
              </Typography>

              <Box sx={{ width: '100%', maxWidth: 400 }}>
                <LottieIcon 
                  src="/welcome.json" 
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Registration Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: { xs: 3, md: 6 }, 
              borderRadius: 6, 
              bgcolor: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="800" gutterBottom>
                  Create Your Profile
                </Typography>
                <Typography color="text.secondary">
                  Join your team at {invite?.company_name}
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: 'rgba(0,0,0,0.2)'
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    value={invite?.email || ''}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: 'rgba(0,0,0,0.1)'
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Create Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: 'rgba(0,0,0,0.2)'
                      }
                    }}
                  />

                  <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                    By continuing, you agree to the Terms of Service and Privacy Policy.
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={loading}
                    sx={{ 
                      mt: 2, 
                      height: 56, 
                      borderRadius: 3, 
                      fontWeight: 800,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)'
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue to Workspace'}
                  </Button>
                </Stack>
              </form>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account? <Button onClick={() => navigate('/login')} sx={{ fontWeight: 700, textTransform: 'none' }}>Log in</Button>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InvitePage;

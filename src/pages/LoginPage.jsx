import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, FormControlLabel, Checkbox,
  Grid, IconButton, InputAdornment, useTheme, useMediaQuery
} from '@mui/material';
import { 
  Visibility, VisibilityOff, 
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password, rememberMe);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#030712', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 2, md: 4 },
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Orbs */}
      <Box sx={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container sx={{ 
          bgcolor: 'rgba(15, 23, 42, 0.6)', 
          borderRadius: 3, 
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
        }}>
          {/* Illustration Side */}
          {!isMobile && (
            <Grid item md={6} sx={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(15, 23, 42, 0.5) 100%)',
              p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
              <Box component="img" src="/assets/login_auth.png" sx={{ width: '80%', height: 'auto', borderRadius: 3, mb: 4 }} />
              <Typography variant="h4" fontWeight="900" textAlign="center" gutterBottom sx={{ letterSpacing: '-1px' }}>
                Manage with Precision.
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 350 }}>
                Log in to your AI-powered workspace and pick up exactly where you left off.
              </Typography>
            </Grid>
          )}

          {/* Form Side */}
          <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 8 }, bgcolor: 'rgba(3, 7, 18, 0.4)' }}>
            <Stack spacing={4}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4, cursor: 'pointer' }} onClick={() => navigate('/')}>
                  <AutoAwesomeIcon sx={{ color: '#6366f1' }} />
                  <Typography variant="h6" fontWeight="900">Sprintora</Typography>
                </Stack>
                
                <Typography variant="h4" fontWeight="950" gutterBottom sx={{ letterSpacing: '-1px' }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Enter your credentials to access your workspace.
                </Typography>
              </Box>

              {success && <Alert severity="success" sx={{ borderRadius: 3 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth label="Email Address" variant="outlined"
                    value={email} onChange={(e) => setEmail(e.target.value)} required
                    InputProps={{ sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' } }}
                  />
                  <TextField
                    fullWidth label="Password" type={showPassword ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                    InputProps={{ 
                      sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox size="small" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                      label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                    />
                    <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ fontWeight: 700, textDecoration: 'none', color: '#6366f1' }}>
                      Forgot?
                    </Link>
                  </Stack>

                  <Button
                    fullWidth variant="contained" size="large" type="submit" disabled={loading}
                    sx={{ 
                      height: 64, borderRadius: 3, fontWeight: 900, fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)'
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  New to Sprintora?{' '}
                  <Link component={RouterLink} to="/register" sx={{ fontWeight: 900, textDecoration: 'none', color: '#6366f1' }}>
                    Create Account
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;

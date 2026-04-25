import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, FormControlLabel, Checkbox 
} from '@mui/material';
import LottieIcon from '../components/shared/LottieIcon';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              <LottieIcon 
                src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json" 
                style={{ width: 120, height: 120 }}
              />
            </Box>


            <Typography variant="h4" fontWeight="800" letterSpacing="-1px">
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Secure access to VSGRPS Agile Workspace
            </Typography>
          </Stack>
          
          {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 1.5 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 1.5 }}>{error}</Alert>}
          
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
              <TextField
                fullWidth
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={<Checkbox size="small" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ fontWeight: 600, textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Stack>
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
                  boxShadow: '0 8px 16px rgba(99, 102, 241, 0.4)'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Stack>
          </form>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/register" 
                fontWeight="700" 
                color="primary"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Register Company
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;

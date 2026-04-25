import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  Box, Button, TextField, Typography, Container,
  Alert, CircularProgress, Link, Stack
} from '@mui/material';
import LottieIcon from '../components/shared/LottieIcon';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await client.post('/auth/register', formData);
      setSuccessMessage(res.data.message || 'Registration successful! Please check your email.');
      setFormData({ name: '', email: '', password: '', companyName: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
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
      p: 2,
      py: 10
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
                src="https://assets2.lottiefiles.com/packages/lf20_kkflmtur.json" 
                style={{ width: 120, height: 120 }}
              />
            </Box>
            <Typography variant="h4" fontWeight="800" letterSpacing="-1px" sx={{ textAlign: 'center' }}>
              Register Company
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Join the VSGRPS Secure ecosystem
            </Typography>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
              {successMessage}
              <Button 
                component={RouterLink} 
                to="/login" 
                size="small" 
                sx={{ ml: 2, fontWeight: 'bold' }}
              >
                Go to Login
              </Button>
            </Alert>
          )}

          {!successMessage && (
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  placeholder="Acme Corp"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Admin Full Name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
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
                    mt: 1
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                </Button>
              </Stack>
            </form>
          )}

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/login" 
                fontWeight="700" 
                color="primary"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;

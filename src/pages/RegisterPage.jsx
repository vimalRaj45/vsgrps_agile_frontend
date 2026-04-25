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
      p: { xs: 1, sm: 2 },
      py: { xs: 4, sm: 8 },
      background: 'radial-gradient(circle at top left, #1e293b 0%, #0f172a 100%)'
    }}>
      <div className="bg-gradient" style={{ opacity: 0.3 }} />
      
      <Container maxWidth="xs" className="fade-in">
        <Box 
          className="glass-card" 
          sx={{ 
            p: { xs: 3, sm: 5 }, 
            width: '100%',
            borderRadius: { xs: 4, md: 6 },
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <Stack spacing={1} sx={{ alignItems: 'center', mb: { xs: 3, md: 5 } }}>
            <Box 
              sx={{ 
                mb: 1,
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}
            >
              <Box 
                component="img" 
                src="/assets/register_welcome.png" 
                sx={{ width: 100, height: 100, objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="h4" fontWeight="900" letterSpacing="-1.5px" sx={{ 
              background: 'linear-gradient(45deg, #fff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.75rem', sm: '2.125rem' },
              textAlign: 'center'
            }}>
              Join the Team
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Create your secure company workspace
            </Typography>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              <Box sx={{ mb: 1 }}>{successMessage}</Box>
              <Button 
                component={RouterLink} 
                to="/login" 
                variant="outlined"
                color="inherit"
                size="small" 
                sx={{ fontWeight: 'bold' }}
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
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  label="Admin Full Name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={loading}
                  sx={{ 
                    height: 56, 
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)',
                    background: 'linear-gradient(45deg, #6366f1 0%, #4f46e5 100%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #4f46e5 0%, #4338ca 100%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Workspace'}
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
                sx={{ textDecoration: 'none' }}
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

import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import client from '../api/client';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, Grid, useTheme, useMediaQuery
} from '@mui/material';
import { AutoAwesome as AutoAwesomeIcon } from '@mui/icons-material';

const RegisterPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await client.post('/auth/register', {
        name: adminName,
        email,
        password,
        companyName
      });
      setSuccessMessage('Workspace created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 1, md: 2 },
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glows */}
      <Box sx={{ position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255,255,255,0.8)', 
          borderRadius: 3, 
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(25px)',
          boxShadow: theme.palette.mode === 'dark' ? '0 50px 100px -20px rgba(0,0,0,0.6)' : '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          {/* Form Side */}
          <Grid item xs={12} md={6} sx={{ p: { xs: 3, md: 5 }, bgcolor: theme.palette.mode === 'dark' ? 'rgba(3, 7, 18, 0.4)' : 'rgba(0, 0, 0, 0.02)' }}>
            <Stack spacing={3}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4, cursor: 'pointer' }} onClick={() => navigate('/')}>
                  <img src="/favicon.svg" alt="VSGRPS Logo" style={{ width: 24, height: 24 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="900" sx={{ lineHeight: 1 }}>Sprintora</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, fontSize: '0.6rem' }}>by VSGRPS Technologies</Typography>
                  </Box>
                </Stack>
                
                <Typography variant="h4" fontWeight="950" gutterBottom sx={{ letterSpacing: '-1.5px' }}>
                  Create Your Workspace
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join thousands of teams scaling with AI-powered agility.
                </Typography>
              </Box>

              {successMessage && <Alert severity="success" sx={{ borderRadius: 3 }}>{successMessage}</Alert>}
              {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth label="Company / Team Name" placeholder="e.g. Acme Corp"
                    value={companyName} onChange={(e) => setCompanyName(e.target.value)} required
                    InputProps={{ sx: { borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)' } }}
                  />
                  <TextField
                    fullWidth label="Admin Full Name" placeholder="e.g. John Doe"
                    value={adminName} onChange={(e) => setAdminName(e.target.value)} required
                    InputProps={{ sx: { borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)' } }}
                  />
                  <TextField
                    fullWidth label="Work Email Address" placeholder="name@company.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} required
                    InputProps={{ sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' } }}
                  />
                  <TextField
                    fullWidth label="Create Password" type="password" placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                    InputProps={{ sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' } }}
                  />
                  
                  <Button
                    fullWidth variant="contained" size="large" type="submit" disabled={loading}
                    sx={{ 
                      height: 64, mt: 2, borderRadius: 3, fontWeight: 900, fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)'
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Launch Workspace'}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" sx={{ fontWeight: 900, textDecoration: 'none', color: '#6366f1' }}>
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Illustration Side */}
          {!isMobile && (
            <Grid item md={6} sx={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(15, 23, 42, 0.5) 100%)',
              p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
              <Box component="img" src="/assets/register_welcome.png" sx={{ width: '85%', height: 'auto', borderRadius: 3, mb: 4 }} />
              <Typography variant="h4" fontWeight="900" textAlign="center" gutterBottom sx={{ letterSpacing: '-1px' }}>
                Build the Future.
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 350 }}>
                From idea to execution, Sprintora provides the tools you need to ship faster and smarter.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage;

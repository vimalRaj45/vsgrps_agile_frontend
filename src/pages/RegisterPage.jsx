import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import client from '../api/client';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, Grid, useTheme, useMediaQuery
} from '@mui/material';
import BrandLogo from '../components/shared/BrandLogo';

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
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4, cursor: 'pointer' }} onClick={() => navigate('/')}>
                  <BrandLogo size={24} />
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

                  <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ px: 2, fontWeight: 700 }}>OR SIGN UP WITH</Typography>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={
                        <svg width="20" height="20" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      }
                      onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'https://vsgrps-agile-backend.onrender.com'}/auth/login/google`}
                      sx={{ 
                        height: 56, borderRadius: 3, fontWeight: 700, 
                        borderColor: 'divider', color: 'text.primary',
                        textTransform: 'none',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'text.primary' }
                      }}
                    >
                      Google
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={
                        <svg width="20" height="20" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/>
                        </svg>
                      }
                      onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'https://vsgrps-agile-backend.onrender.com'}/auth/login/github`}
                      sx={{ 
                        height: 56, borderRadius: 3, fontWeight: 700,
                        borderColor: 'divider', color: 'text.primary',
                        textTransform: 'none',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'text.primary' }
                      }}
                    >
                      GitHub
                    </Button>
                  </Stack>
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

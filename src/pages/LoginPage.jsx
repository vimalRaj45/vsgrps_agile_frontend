import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Box, Button, TextField, Typography, Container, 
  Alert, CircularProgress, Link, Stack, FormControlLabel, Checkbox,
  List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, IconButton
} from '@mui/material';
import { 
  Business as BusinessIcon, 
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import LottieIcon from '../components/shared/LottieIcon';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const [showOrgSelector, setShowOrgSelector] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      const data = await login(email, password, rememberMe);
      if (data.multipleOrgs) {
        setOrgs(data.orgs);
        setShowOrgSelector(true);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrg = async (companyId) => {
    setError('');
    setLoading(true);
    try {
      await login(email, password, rememberMe, companyId);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to select organization');
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
      background: 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)'
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
          {!showOrgSelector ? (
            <>
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
                  <LottieIcon 
                    src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json" 
                    style={{ width: 80, height: 80 }}
                  />
                </Box>

                <Typography variant="h4" fontWeight="900" letterSpacing="-1.5px" sx={{ 
                  background: 'linear-gradient(45deg, #fff 30%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.75rem', sm: '2.125rem' }
                }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Sign in to manage your workspace
                </Typography>
              </Stack>
              
              {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
              
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
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox size="small" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                      label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                    />
                    <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ 
                      fontWeight: 600, 
                      textDecoration: 'none',
                      color: 'primary.main'
                    }}>
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
                    sx={{ textDecoration: 'none' }}
                  >
                    Register Company
                  </Link>
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <IconButton onClick={() => setShowOrgSelector(false)} size="small" sx={{ color: 'text.secondary' }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="700">Select Workspace</Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your account is associated with multiple organizations. Please choose which one you want to access.
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

              <List sx={{ 
                bgcolor: 'rgba(255,255,255,0.03)', 
                borderRadius: 3, 
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                {orgs.map((org, index) => (
                  <React.Fragment key={org.companyId}>
                    <ListItem disablePadding>
                      <ListItemButton 
                        onClick={() => handleSelectOrg(org.companyId)}
                        disabled={loading}
                        sx={{ 
                          py: 2,
                          '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.1)' }
                        }}
                      >
                        <ListItemIcon>
                          <BusinessIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={org.companyName} 
                          secondary={org.role} 
                          primaryTypographyProps={{ fontWeight: 600 }}
                        />
                        <ArrowForwardIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                      </ListItemButton>
                    </ListItem>
                    {index < orgs.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
                  </React.Fragment>
                ))}
              </List>

              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;

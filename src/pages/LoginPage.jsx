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
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { 
  SignIn
} from '@clerk/react';
import BrandLogo from '../components/shared/BrandLogo';

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      {/* Background Orbs */}
      <Box sx={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255,255,255,0.8)', 
          borderRadius: 3, 
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(20px)',
          boxShadow: theme.palette.mode === 'dark' ? '0 50px 100px -20px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.1)'
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
          <Grid item xs={12} md={6} sx={{ 
            p: { xs: 3, md: 5 }, 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(3, 7, 18, 0.4)' : 'rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Stack spacing={3} sx={{ width: '100%', maxWidth: 400 }}>
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4, cursor: 'pointer' }} onClick={() => navigate('/')}>
                  <BrandLogo size={24} />
                  <Box>
                    <Typography variant="h6" fontWeight="900" sx={{ lineHeight: 1 }}>Sprintora</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, fontSize: '0.6rem' }}>by VSGRPS Technologies</Typography>
                  </Box>
                </Stack>
              </Box>

              <SignIn 
                routing="path" 
                path="/login" 
                signUpUrl="/register"
                appearance={{
                  elements: {
                    rootBox: { width: '100%' },
                    card: { 
                      boxShadow: 'none', 
                      backgroundColor: 'transparent',
                      border: 'none',
                      width: '100%'
                    },
                    headerTitle: { color: theme.palette.text.primary },
                    headerSubtitle: { color: theme.palette.text.secondary },
                    socialButtonsBlockButton: { 
                      borderRadius: '12px',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'white',
                      border: `1px solid ${theme.palette.divider}`
                    },
                    formButtonPrimary: {
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      borderRadius: '12px',
                      height: '48px',
                      fontSize: '1rem',
                      fontWeight: '700'
                    },
                    formFieldInput: {
                      borderRadius: '12px',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'white',
                      border: `1px solid ${theme.palette.divider}`
                    }
                  }
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;

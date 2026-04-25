import React from 'react';
import { 
  Box, Button, Container, Typography, Grid, Stack,
  IconButton, AppBar, Toolbar, useTheme, useMediaQuery, Card
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LockIcon from '@mui/icons-material/Lock';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LottieIcon from '../components/shared/LottieIcon';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const securityFeatures = [
    {
      icon: <LockIcon color="primary" />,
      title: 'PostgreSQL Session Persistence',
      desc: 'Unlike traditional memory-based sessions, our custom Postgres store ensures you stay securely logged in even through server restarts.'
    },
    {
      icon: <StorageIcon color="primary" />,
      title: 'Isolated Multi-Tenancy',
      desc: 'Your company data is strictly isolated at the database level, ensuring zero leakage between different organizations.'
    },
    {
      icon: <VerifiedUserIcon color="primary" />,
      title: 'Secure-Only Cookies',
      desc: 'We enforce SameSite=None and Secure flags on all authentication cookies, protecting your team against CSRF and XSS attacks.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <div className="bg-gradient" />
      
      {/* Navigation */}
      <AppBar position="fixed" className="glass-nav" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', height: { xs: 70, md: 80 }, px: { xs: 1, sm: 2 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: 'primary.main', p: 0.8, borderRadius: 2, display: 'flex' }}>
                <SecurityIcon sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
              </Box>
              <Typography variant="h6" fontWeight="800" sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' }, letterSpacing: '-1px' }}>
                VSGRPS <span style={{ color: theme.palette.primary.main }}>Agile</span>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
              {!isMobile && <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>}
              <Button 
                variant="contained" 
                size={isMobile ? "small" : "medium"}
                onClick={() => navigate('/login')}
                sx={{ borderRadius: 3, fontWeight: 700 }}
              >
                {isMobile ? 'Sign In' : 'Get Started'}
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 20 }, pb: { xs: 8, md: 15 } }}>
        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={7} className="fade-in">
            <Typography variant="overline" fontWeight="800" color="primary" sx={{ mb: 2, display: 'block', letterSpacing: 2, textAlign: { xs: 'center', md: 'left' } }}>
              THE SECURE STANDARD BY VSGRPS
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.8rem', sm: '4rem', md: '5rem' }, fontWeight: 900, mb: 3, textAlign: { xs: 'center', md: 'left' }, letterSpacing: '-2px', lineHeight: 1.1 }}>
              Work Smarter. <br/>
              <span style={{ 
                background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'gradient 3s linear infinite'
              }}>Move Faster.</span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 5, maxWidth: 600, mx: { xs: 'auto', md: 0 }, textAlign: { xs: 'center', md: 'left' }, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              The only VSGRPS Agile Workspace designed to protect your company's progress with industrial-grade encryption and persistent session management.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center' }}>
              <Button variant="contained" size="large" onClick={() => navigate('/register')} endIcon={<ArrowForwardIcon />} sx={{ height: 64, px: 4, width: { xs: '100%', sm: 'auto' }, borderRadius: 4, fontSize: '1.1rem' }}>
                Secure Your Workspace
              </Button>
              <Button variant="outlined" size="large" startIcon={<GitHubIcon />} sx={{ height: 64, px: 4, width: { xs: '100%', sm: 'auto' }, borderColor: 'rgba(255,255,255,0.1)', color: 'text.primary', borderRadius: 4 }}>
                Technical Overview
              </Button>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 300 }}>
              <LottieIcon 
                src="https://assets6.lottiefiles.com/packages/lf20_kyu7xb1v.json" 
                style={{ width: '100%', maxWidth: 500, height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Security Section */}
        <Box sx={{ mt: { xs: 15, md: 25 }, p: { xs: 3, md: 8 }, borderRadius: 8, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
                Your Data, <br/>
                <span style={{ color: '#6366f1' }}>Locked in the Vault.</span>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                At VSGRPS, we believe security isn't a feature—it's the foundation. Our architecture ensures that your project progress, team communications, and sensitive files are protected by the same standards used in modern fintech applications.
              </Typography>
              <Stack spacing={3}>
                {securityFeatures.map((f, i) => (
                  <Stack key={i} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.1)' }}>{f.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="700">{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LottieIcon 
                  src="https://assets5.lottiefiles.com/packages/lf20_2ks3pjua.json" 
                  style={{ width: '100%', maxWidth: 450 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Why Choose Section */}
        <Box sx={{ mt: { xs: 15, md: 25 }, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="800" sx={{ mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
            Why Choose <span style={{ color: '#ec4899' }}>VSGRPS Agile?</span>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}>
            Traditional ERPs are slow and legacy Agile tools are insecure. We bridged the gap.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 5, height: '100%', textAlign: 'left' }} className="fade-in">
                <SpeedIcon sx={{ fontSize: 40, color: '#ec4899', mb: 2 }} />
                <Typography variant="h5" fontWeight="700" gutterBottom>Rapid Deployment</Typography>
                <Typography color="text.secondary">Go from sign-up to your first sprint in under 5 minutes. No complex configuration required.</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 5, height: '100%', textAlign: 'left' }} className="fade-in">
                <GroupsIcon sx={{ fontSize: 40, color: '#6366f1', mb: 2 }} />
                <Typography variant="h5" fontWeight="700" gutterBottom>Team Synergy</Typography>
                <Typography color="text.secondary">Real-time notifications and centralized task management keep every team member in sync.</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 5, height: '100%', textAlign: 'left' }} className="fade-in">
                <SecurityIcon sx={{ fontSize: 40, color: '#6366f1', mb: 2 }} />
                <Typography variant="h5" fontWeight="700" gutterBottom>Ghost-Worker Fix</Typography>
                <Typography color="text.secondary">Our system automatically clears stale service workers to prevent cache conflicts in production.</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: 8, mt: 10, bgcolor: 'rgba(0,0,0,0.2)' }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ justifyContent: 'space-between', alignItems: 'center', textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight="800">VSGRPS Agile Workspace Secure</Typography>
              <Typography color="text.secondary" variant="body2">© 2026 VSGRPS Secure Platform. A Product of VSGRPS.</Typography>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} sx={{ alignItems: 'center' }}>
              <Typography color="text.secondary" variant="body2" sx={{ cursor: 'pointer' }}>Privacy Policy</Typography>
              <Typography color="text.secondary" variant="body2" sx={{ cursor: 'pointer' }}>Terms of Service</Typography>
              <Typography color="text.secondary" variant="body2" sx={{ cursor: 'pointer' }}>Security Whitepaper</Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

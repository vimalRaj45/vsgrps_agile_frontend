import React from 'react';
import { 
  Box, Button, Container, Typography, Grid, Stack,
  IconButton, AppBar, Toolbar, useTheme, useMediaQuery, Card,
  Avatar, AvatarGroup, TextField, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GitHubIcon from '@mui/icons-material/GitHub';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LottieIcon from '../components/shared/LottieIcon';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const benefits = [
    {
      icon: <AutoAwesomeIcon sx={{ color: '#6366f1', fontSize: 32 }} />,
      title: 'Zero-Effort Planning',
      desc: 'Our AI Architect handles the heavy lifting—generating tasks, priorities, and estimates so you can start shipping immediately.'
    },
    {
      icon: <GroupsIcon sx={{ color: '#8b5cf6', fontSize: 32 }} />,
      title: 'Frictionless Teamwork',
      desc: 'No more coordination chaos. Centralized comments, real-time mentions, and instant sync keep everyone on the same page.'
    },
    {
      icon: <SecurityIcon sx={{ color: '#ec4899', fontSize: 32 }} />,
      title: 'Industrial Reliability',
      desc: 'Built on enterprise-grade architecture with persistent sessions and full audit logs. Your data is safe, isolated, and always yours.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      features: ['Up to 5 Projects', 'AI Architect (Basic)', 'Standard Kanban', 'Mobile PWA Access'],
      cta: 'Start for Free',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/mo',
      features: ['Unlimited Projects', 'Advanced AI Architect', 'Analytics Dashboard', 'File Vault (10GB)', 'Priority Support'],
      cta: 'Get Pro Access',
      highlight: true
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflowX: 'hidden',
      background: '#020617',
      color: 'white'
    }}>
      {/* Background Orbs */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '100vh',
        background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }} />
      
      {/* Nav */}
      <AppBar position="fixed" elevation={0} sx={{ 
        bgcolor: 'transparent', 
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        zIndex: 10
      }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', height: { xs: 70, md: 80 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                p: 1, 
                borderRadius: 2, 
                display: 'flex'
              }}>
                <SecurityIcon sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-1px' }}>
                VSGRPS <span style={{ color: '#6366f1' }}>Workspace</span>
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={4}>
                  {['Product', 'Enterprise', 'Pricing'].map((item) => (
                    <Typography 
                      key={item} 
                      variant="body2" 
                      fontWeight="600" 
                      color="text.secondary" 
                      sx={{ cursor: 'pointer', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              )}
              <Button 
                variant="contained" 
                onClick={() => navigate('/login')}
                sx={{ 
                  borderRadius: 2.5, 
                  fontWeight: 800, 
                  px: 3,
                  background: 'white',
                  color: '#020617',
                  '&:hover': { background: '#f8fafc' }
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero */}
      <Container maxWidth="lg" sx={{ pt: { xs: 18, md: 24 }, pb: { xs: 10, md: 15 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 1.5, 
                px: 2, 
                py: 0.8, 
                borderRadius: 10, 
                bgcolor: 'rgba(99, 102, 241, 0.1)', 
                border: '1px solid rgba(99, 102, 241, 0.2)',
                mb: 4
              }}>
                <AutoAwesomeIcon sx={{ color: '#6366f1', fontSize: 18 }} />
                <Typography variant="caption" fontWeight="800" color="#6366f1" sx={{ letterSpacing: 1 }}>
                  THE AI-POWERED WORKSPACE FOR TEAMS
                </Typography>
              </Box>
              
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }, 
                fontWeight: 950, 
                mb: 3, 
                letterSpacing: '-2.5px', 
                lineHeight: 1,
                textAlign: { xs: 'center', md: 'left' }
              }}>
                From Idea to Project <br/>
                <span style={{ 
                  background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Plan in 60 Seconds.</span>
              </Typography>
              
              <Typography variant="h6" color="text.secondary" sx={{ 
                mb: 6, 
                maxWidth: 600, 
                lineHeight: 1.5,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                textAlign: { xs: 'center', md: 'left' }
              }}>
                Stop manual planning. VSGRPS Workspace uses AI to architect your projects, so your team can focus on building, not organizing.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/register')} 
                  endIcon={<ArrowForwardIcon />} 
                  sx={{ 
                    height: 64, 
                    px: 5, 
                    borderRadius: 3, 
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                  }}
                >
                  Build My Project (Free)
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  startIcon={<PlayArrowIcon />} 
                  sx={{ 
                    height: 64, 
                    px: 4, 
                    borderRadius: 3,
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  Watch 1-min Demo
                </Button>
              </Stack>
              
              <Stack direction="row" spacing={2} sx={{ mt: 6, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <AvatarGroup max={4}>
                  {[1, 2, 3, 4].map(i => <Avatar key={i} src={`https://i.pravatar.cc/100?img=${i + 15}`} />)}
                </AvatarGroup>
                <Typography variant="body2" color="text.secondary">
                  Join <strong>2,500+</strong> innovators shipping today
                </Typography>
              </Stack>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
              <Box className="glass-card" sx={{ 
                p: 1.5, 
                borderRadius: 5, 
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <LottieIcon 
                  src="https://assets6.lottiefiles.com/packages/lf20_kyu7xb1v.json" 
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Benefits */}
        <Box sx={{ mt: { xs: 15, md: 25 } }}>
          <Grid container spacing={4}>
            {benefits.map((benefit, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ mb: 3 }}>{benefit.icon}</Box>
                  <Typography variant="h5" fontWeight="800" gutterBottom>{benefit.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>{benefit.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pricing */}
        <Box sx={{ mt: { xs: 15, md: 25 }, textAlign: 'center' }}>
          <Typography variant="overline" color="primary" fontWeight="900" sx={{ mb: 2, display: 'block', letterSpacing: 2 }}>
            PRICING FOR EVERY SCALE
          </Typography>
          <Typography variant="h3" fontWeight="900" sx={{ mb: 8, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Simple plans for <span style={{ color: 'rgba(255,255,255,0.5)' }}>big ideas.</span>
          </Typography>
          
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {pricingPlans.map((plan, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ 
                  p: 6, 
                  height: '100%', 
                  bgcolor: plan.highlight ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.02)', 
                  border: plan.highlight ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 6,
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-10px)' }
                }}>
                  {plan.highlight && (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: -16, 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      bgcolor: '#6366f1', 
                      px: 2, 
                      py: 0.5, 
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      textTransform: 'uppercase'
                    }}>
                      Most Popular
                    </Box>
                  )}
                  <Typography variant="h6" fontWeight="800" gutterBottom>{plan.name}</Typography>
                  <Typography variant="h3" fontWeight="950" sx={{ mb: 1 }}>{plan.price}<span style={{ fontSize: '1rem', fontWeight: 400 }}>{plan.period}</span></Typography>
                  <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.05)' }} />
                  <Stack spacing={2} sx={{ mb: 6, textAlign: 'left' }}>
                    {plan.features.map((f, j) => (
                      <Stack key={j} direction="row" spacing={1.5} alignItems="center">
                        <CheckCircleOutlineIcon sx={{ color: '#10b981', fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">{f}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button 
                    fullWidth 
                    variant={plan.highlight ? "contained" : "outlined"} 
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{ 
                      borderRadius: 3, 
                      height: 56, 
                      fontWeight: 800,
                      background: plan.highlight ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent'
                    }}
                  >
                    {plan.cta}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA */}
        <Box sx={{ 
          mt: { xs: 15, md: 25 }, 
          p: { xs: 6, md: 10 }, 
          borderRadius: 8, 
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          textAlign: 'center',
          boxShadow: '0 40px 100px -20px rgba(99, 102, 241, 0.4)'
        }}>
          <Typography variant="h3" fontWeight="950" sx={{ mb: 3, fontSize: { xs: '2rem', md: '3.5rem' } }}>
            Ready to Build Better?
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            Join thousands of students and founders who are using AI to architect the future.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/register')}
            sx={{ 
              height: 68, 
              px: 6, 
              borderRadius: 3, 
              fontSize: '1.2rem', 
              fontWeight: 900,
              bgcolor: 'white',
              color: '#4f46e5',
              '&:hover': { bgcolor: '#f8fafc' }
            }}
          >
            Get Started for Free
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', py: 10, mt: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight="900">VSGRPS Workspace</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                  The AI-powered engine for professional management and engineering velocity.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={6} sx={{ justifyContent: { md: 'flex-end' } }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2" fontWeight="800">Product</Typography>
                  {['AI Architect', 'Kanban', 'Security'].map(i => <Typography key={i} variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
                </Stack>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2" fontWeight="800">Legal</Typography>
                  {['Privacy', 'Terms', 'Audit Logs'].map(i => <Typography key={i} variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <Typography variant="caption" color="text.disabled">
              © 2026 VSGRPS Workspace. All rights reserved. Securely architected by VSGRPS.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

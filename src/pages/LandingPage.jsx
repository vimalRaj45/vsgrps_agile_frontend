import React, { useEffect, useState } from 'react';
import { 
  Box, Button, Container, Typography, Grid, Stack,
  IconButton, AppBar, Toolbar, useTheme, useMediaQuery, Card,
  Avatar, AvatarGroup, TextField, Divider, Chip, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HubIcon from '@mui/icons-material/Hub';
import InsightsIcon from '@mui/icons-material/Insights';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LottieIcon from '../components/shared/LottieIcon';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const navItems = [
    { label: 'PRODUCT', id: 'features' },
    { label: 'NETWORK', id: 'network' },
    { label: 'ECOSYSTEM', id: 'ecosystem' },
    { label: 'PRICING', id: 'pricing' }
  ];

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ color: '#818cf8', fontSize: 40 }} />,
      label: 'AI CORE',
      title: 'Auto-Task Generation',
      desc: 'Our neural engine decomposes complex goals into granular, manageable tasks instantly.'
    },
    {
      icon: <HubIcon sx={{ color: '#c084fc', fontSize: 40 }} />,
      label: 'GLOBAL SYNC',
      title: 'Real-time Intelligence',
      desc: 'Every node in your workspace stays synchronized across all platforms and team members.'
    },
    {
      icon: <InsightsIcon sx={{ color: '#fb7185', fontSize: 40 }} />,
      label: 'VISUAL METRICS',
      title: 'Predictive Roadmap',
      desc: 'Visualize your velocity and anticipate project bottlenecks with AI-driven analytics.'
    }
  ];

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#020617', 
      color: 'white', 
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Background Mesh */}
      <Box sx={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.05) 1px, transparent 0)',
        backgroundSize: '32px 32px',
        zIndex: 0
      }} />

      {/* Nav */}
      <AppBar position="fixed" elevation={0} sx={{ 
        bgcolor: 'transparent', 
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        zIndex: 1000
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', height: { xs: 70, md: 90 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box sx={{ background: '#6366f1', p: 1, borderRadius: 2, display: 'flex' }}>
                <SecurityIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="h5" fontWeight="950" sx={{ letterSpacing: '-2px', display: { xs: 'none', sm: 'block' } }}>
                VSGRPS
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={5}>
                  {navItems.map((item) => (
                    <Typography 
                      key={item.label} 
                      onClick={() => handleNavClick(item.id)}
                      variant="caption" 
                      fontWeight="800" 
                      color="text.secondary" 
                      sx={{ cursor: 'pointer', letterSpacing: 1.5, '&:hover': { color: 'white' }, transition: '0.3s' }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Stack>
              )}
              
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderRadius: 10, 
                    fontWeight: 900, 
                    px: { xs: 3, md: 5 },
                    bgcolor: 'white',
                    color: '#020617',
                    '&:hover': { bgcolor: '#f8fafc' }
                  }}
                >
                  {isMobile ? 'SIGN IN' : 'GET STARTED'}
                </Button>
                {isMobile && (
                  <IconButton onClick={() => setMobileMenuOpen(true)} sx={{ color: 'white' }}>
                    <MenuIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: '80%', bgcolor: '#020617', backgroundImage: 'none' } }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight="900">MENU</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} onClick={() => handleNavClick(item.id)} sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 900, letterSpacing: 2 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero */}
      <Container maxWidth="xl" sx={{ pt: { xs: 18, md: 32 }, pb: { xs: 10, md: 20 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={7} data-aos="fade-right">
            <Chip 
              label="BETA ACCESS OPEN" 
              sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', fontWeight: 900, mb: 4, letterSpacing: 1 }} 
            />
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '3.2rem', sm: '4.5rem', md: '6.5rem' }, 
              fontWeight: 950, 
              lineHeight: 0.9, 
              letterSpacing: '-4px',
              mb: 4,
              textAlign: { xs: 'center', md: 'left' }
            }}>
              ARCHITECT YOUR <br/>
              <span style={{ 
                background: 'linear-gradient(to right, #818cf8, #c084fc, #fb7185)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <Typewriter
                  options={{
                    strings: ['FUTURE', 'ECOSYSTEM', 'VISION', 'STARTUP'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ 
              maxWidth: 600, 
              lineHeight: 1.6, 
              mb: 8,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}>
              The AI-powered workspace where planning meets execution. Stop manually organizing and start building the future.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigate('/register')}
                sx={{ 
                  height: 72, px: 6, borderRadius: 4, fontWeight: 950, fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)'
                }}
                endIcon={<ArrowForwardIcon />}
              >
                DEPLOY SYSTEM
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  height: 72, px: 4, borderRadius: 4, fontWeight: 800, borderColor: 'rgba(255,255,255,0.1)', color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
                startIcon={<PlayArrowIcon />}
              >
                LIVE DEMO
              </Button>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={5} data-aos="zoom-in" data-aos-delay="200">
             <Box sx={{ position: 'relative' }}>
                <Box className="glass-card" sx={{ 
                  p: 1.5, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)',
                }}>
                  <LottieIcon 
                    src="https://assets4.lottiefiles.com/packages/lf20_gdbe9x7p.json" 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
                {/* Floating Stats */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ position: 'absolute', top: '-10%', right: '-10%' }}
                >
                  <Box className="glass-card" sx={{ p: 2, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', bgcolor: '#020617' }}>
                    <Typography variant="caption" color="#10b981" fontWeight="900">SYSTEM HEALTH</Typography>
                    <Typography variant="h6" fontWeight="950">99.9%</Typography>
                  </Box>
                </motion.div>
             </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features */}
      <Box id="features" sx={{ py: 20 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid item xs={12} md={4} key={i} data-aos="fade-up" data-aos-delay={i * 200}>
                <Card sx={{ 
                  p: 8, height: '100%', bgcolor: 'rgba(255,255,255,0.01)', 
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8,
                  '&:hover': { transform: 'translateY(-10px)', borderColor: 'rgba(99, 102, 241, 0.3)' },
                  transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <Box sx={{ mb: 4 }}>{f.icon}</Box>
                  <Typography variant="caption" color="#818cf8" fontWeight="900" sx={{ letterSpacing: 2, mb: 1, display: 'block' }}>{f.label}</Typography>
                  <Typography variant="h4" fontWeight="950" sx={{ mb: 2, letterSpacing: '-1px' }}>{f.title}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>{f.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing */}
      <Box id="pricing" sx={{ py: 20, bgcolor: 'rgba(2,6,23,0.5)' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight="950" sx={{ textAlign: 'center', mb: 10, letterSpacing: '-3px' }}>
            Scale as you <span style={{ color: 'rgba(255,255,255,0.4)' }}>grow.</span>
          </Typography>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {['FREE', 'PRO'].map((tier, i) => (
              <Grid item xs={12} md={5} key={tier} data-aos="fade-up">
                <Box sx={{ 
                  p: 8, borderRadius: 10, bgcolor: 'rgba(255,255,255,0.01)', 
                  border: i === 1 ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.05)',
                  textAlign: 'center'
                }}>
                  <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: 3, mb: 4 }}>{tier}</Typography>
                  <Typography variant="h2" fontWeight="950" sx={{ mb: 6 }}>{i === 0 ? '$0' : '$19'}</Typography>
                  <Stack spacing={3} sx={{ mb: 8, textAlign: 'left' }}>
                    {['Unlimited Nodes', 'AI Integration', 'Global Access', 'Vault Security'].map(f => (
                      <Stack key={f} direction="row" spacing={2} alignItems="center">
                        <CheckCircleOutlineIcon sx={{ color: '#10b981', fontSize: 20 }} />
                        <Typography variant="body2" fontWeight="700">{f}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button variant={i === 1 ? "contained" : "outlined"} fullWidth size="large" sx={{ height: 64, borderRadius: 3, fontWeight: 900 }}>
                    {i === 0 ? 'START FREE' : 'GET ELITE'}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 15, bgcolor: '#01040a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="950" sx={{ mb: 4 }}>VSGRPS</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.8 }}>
                The next generation of organizational management. High-velocity architecture for elite teams.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="caption" fontWeight="900" color="#818cf8" sx={{ mb: 4, display: 'block', letterSpacing: 2 }}>PRODUCT</Typography>
              <Stack spacing={2}>
                {['Architect', 'Sync', 'Vault'].map(i => <Typography key={i} variant="body2" color="text.secondary">{i}</Typography>)}
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="caption" fontWeight="900" color="#c084fc" sx={{ mb: 4, display: 'block', letterSpacing: 2 }}>RESOURCES</Typography>
              <Stack spacing={2}>
                {['Docs', 'API', 'Security'].map(i => <Typography key={i} variant="body2" color="text.secondary">{i}</Typography>)}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="glass-card" sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="subtitle1" fontWeight="900" sx={{ mb: 2 }}>TERMINAL ACCESS</Typography>
                <Stack direction="row" spacing={1}>
                  <TextField fullWidth size="small" placeholder="email@org.com" sx={{ bgcolor: 'rgba(0,0,0,0.2)' }} />
                  <Button variant="contained" sx={{ px: 3, bgcolor: '#6366f1' }}>JOIN</Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

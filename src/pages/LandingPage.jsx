import React, { useEffect, useState } from 'react';
import { 
  Box, Button, Container, Typography, Grid, Stack,
  IconButton, AppBar, Toolbar, useTheme, useMediaQuery, Card,
  Avatar, AvatarGroup, TextField, Divider, Chip, Drawer, List, ListItem, ListItemText,
  useScrollTrigger, Slide
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppTheme } from '../context/ThemeContext';
import BrandLogo from '../components/shared/BrandLogo';

const SprintoraLanding = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quint'
    });
  }, []);

  const features = [
    {
      icon: <BrandLogo size={32} />,
      title: 'AI Task Generation',
      desc: 'Turn "Build a login system" into 15 structured, prioritized tasks in seconds.'
    },
    {
      icon: <AssignmentIcon sx={{ color: '#c084fc', fontSize: 32 }} />,
      title: 'Smart Kanban Workflow',
      desc: 'Track progress visually from To Do → Done with seamless team accountability.'
    },
    {
      icon: <GroupsIcon sx={{ color: '#fb7185', fontSize: 32 }} />,
      title: 'Real-Time Collaboration',
      desc: 'Tag teammates, comment instantly, and never lose context on your project DNA.'
    },
    {
      icon: <BarChartIcon sx={{ color: '#22d3ee', fontSize: 32 }} />,
      title: 'Analytics Dashboard',
      desc: 'See team velocity and performance trends instantly with AI-driven insights.'
    }
  ];

  const handleNavClick = (id) => {
    if (id === 'mission' || id === 'ourmission') {
      navigate('/mission');
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      color: 'text.primary', 
      overflowX: 'hidden',
      position: 'relative',
      fontFamily: '"Inter", "Roboto", sans-serif'
    }}>
      {/* Aurora Glow Effects */}
      <Box sx={{ 
        position: 'absolute', top: '-10%', left: '10%', width: isSmallMobile ? '300px' : '800px', height: isSmallMobile ? '300px' : '800px', 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0 
      }} />
      
      {/* Navigation */}
      <AppBar position="fixed" elevation={0} sx={{ 
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(3,7,18,0.8)' : 'rgba(255,255,255,0.8)', 
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1000,
        borderRadius: 0
      }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 } }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 60, md: 85 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <BrandLogo size={40} />
              <Box>
                <Typography variant="h6" fontWeight="950" sx={{ letterSpacing: '-1px', color: 'text.primary', lineHeight: 1.1 }}>
                  Sprintora
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, fontSize: '0.65rem', display: 'block', mt: -0.2 }}>
                  by VSGRPS Technologies
                </Typography>
              </Box>
            </Stack>
            
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={5} sx={{ mr: 4 }}>
                  {['Features', 'Workflow', 'Pricing', 'Our Mission'].map((item) => (
                    <Typography 
                      key={item} 
                      onClick={() => handleNavClick(item.toLowerCase().replace(' ', ''))}
                      variant="body2" fontWeight="700" color="text.secondary" 
                      sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' }, transition: '0.2s' }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              )}

              <IconButton onClick={toggleTheme} sx={{ 
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${theme.palette.divider}`,
                p: { xs: 0.8, sm: 1 },
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.primary'
              }}>
                {mode === 'dark' ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
              </IconButton>

              <Button 
                variant="contained" 
                size={isSmallMobile ? "small" : "medium"}
                onClick={() => navigate('/login')}
                sx={{ 
                  borderRadius: 3, fontWeight: 900, px: { xs: 2, md: 4 },
                  height: { xs: 36, md: 44 },
                  background: theme.palette.mode === 'dark' ? 'white' : '#030712', 
                  color: theme.palette.mode === 'dark' ? '#030712' : 'white', 
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  whiteSpace: 'nowrap',
                  '&:hover': { background: theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }
                }}
              >
                Start Free
              </Button>
              {isMobile && (
                <IconButton 
                  onClick={() => setMobileMenuOpen(true)} 
                  sx={{ 
                    color: 'text.primary', 
                    p: 0.8,
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} PaperProps={{ sx: { width: '80%', bgcolor: 'background.default', backgroundImage: 'none' } }}>
        <Box sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight="900">Sprintora</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'text.primary' }}><CloseIcon /></IconButton>
          </Stack>
          <List>
            {['Features', 'Workflow', 'Pricing', 'Our Mission'].map((item) => (
              <ListItem key={item} onClick={() => handleNavClick(item.toLowerCase().replace(' ', ''))} sx={{ py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <ListItemText primary={item} primaryTypographyProps={{ fontWeight: 800 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: { xs: 15, md: 28 }, pb: { xs: 10, md: 20 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={7} data-aos="fade-up">
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Chip 
                label="BETA v2.0" 
                size="small"
                sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', fontWeight: 900, mb: 3, px: 0.5 }} 
              />
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '1.9rem', sm: '3rem', md: '4.8rem' }, 
                fontWeight: 950, lineHeight: { xs: 1.2, md: 0.95 }, letterSpacing: { xs: '-0.5px', md: '-3px' }, mb: 3,
                textAlign: { xs: 'center', md: 'left' },
                color: 'text.primary'
              }}>
                From Idea to Execution <br/>
                <Box component="span" sx={{ 
                  background: 'linear-gradient(to right, #818cf8, #c084fc, #fb7185)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  <Typewriter
                    options={{
                      strings: ['Faster Than Ever', 'With AI Precision', 'In Under 60 Seconds', 'Without the Chaos'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30
                    }}
                  />
                </Box>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ 
                maxWidth: 600, lineHeight: 1.6, mb: 6, fontWeight: 400, mx: { xs: 'auto', md: 0 },
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}>
                AI-powered agile workspace that plans, tracks, and delivers your projects with precision. Build your roadmap in seconds.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button 
                  variant="contained" fullWidth={isSmallMobile} size="large" onClick={() => navigate('/register')}
                  sx={{ 
                    height: { xs: 56, md: 72 }, px: 6, borderRadius: 3, fontWeight: 900, fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Start Free
                </Button>
                <Button 
                  variant="outlined" fullWidth={isSmallMobile} size="large" onClick={() => navigate('/onboarding')}
                  sx={{ 
                    height: { xs: 56, md: 72 }, px: 5, borderRadius: 3, fontWeight: 800, borderColor: theme.palette.divider, color: 'text.primary',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'text.secondary' }
                  }}
                  startIcon={<BrandLogo size={20} />}
                >
                  Learn how it works
                </Button>
              </Stack>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5} data-aos="fade-up" data-aos-delay="200">
             <Box sx={{ position: 'relative', px: { xs: 2, md: 0 } }}>
                <Box sx={{ 
                  p: 0.5, borderRadius: 3, 
                  overflow: 'hidden',
                  position: 'relative',
                  '&::after': {
                    content: '""', position: 'absolute', inset: 0,
                    boxShadow: theme.palette.mode === 'dark' ? 'inset 0 0 100px rgba(0,0,0,0.5)' : 'none', zIndex: 2
                  }
                }}>
                  <Box component="img" src="/assets/developer_hero.png" sx={{ 
                    width: '100%', height: 'auto', borderRadius: 3,
                    filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                  }} />
                </Box>
                <motion.div 
                  animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                  style={{ position: 'absolute', top: '-10%', right: '0%', zIndex: 2 }}
                >
                   <Card sx={{ p: 1.5, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper', minWidth: 140 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <BrandLogo size={18} />
                        <Typography variant="caption" fontWeight="800">AI PLANNER LIVE</Typography>
                      </Stack>
                   </Card>
                </motion.div>
             </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Social Proof */}
      <Box sx={{ py: { xs: 8, md: 12 }, borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}`, position: 'relative' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="overline" fontWeight="900" sx={{ color: 'text.secondary', opacity: 0.5, letterSpacing: 3 }}>TRUSTED BY BUILDERS</Typography>
              <Typography variant="h4" fontWeight="950" sx={{ mt: 1, letterSpacing: '-1px', color: 'text.primary' }}>Powering the next generation of teams.</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 6, md: 10 }} justifyContent={{ md: 'flex-end' }}>
                <Box>
                  <Typography variant="h3" fontWeight="950" sx={{ color: '#818cf8' }}>95%</Typography>
                  <Typography variant="caption" fontWeight="800" sx={{ color: 'text.secondary', letterSpacing: 1 }}>FASTER DELIVERY</Typography>
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="950" sx={{ color: '#c084fc' }}>80%</Typography>
                  <Typography variant="caption" fontWeight="800" sx={{ color: 'text.secondary', letterSpacing: 1 }}>LESS PLANNING</Typography>
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="950" sx={{ color: '#fb7185' }}>98.2%</Typography>
                  <Typography variant="caption" fontWeight="800" sx={{ color: 'text.secondary', letterSpacing: 1 }}>TEAM VELOCITY</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 6, borderColor: theme.palette.divider, opacity: 0.5 }} />
          
          <Stack direction="row" spacing={6} sx={{ overflow: 'hidden', opacity: 0.3, justifyContent: 'center', filter: theme.palette.mode === 'dark' ? 'grayscale(1)' : 'none' }}>
            {['FORBES', 'TECHCRUNCH', 'WIRED', 'VERGE', 'PRODUCT HUNT'].map(logo => (
              <Typography key={logo} variant="h6" fontWeight="900" sx={{ letterSpacing: 4 }}>{logo}</Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Built for Builders Section */}
      <Box id="workflow" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }} data-aos="fade-right">
              <Box sx={{ 
                position: 'relative', 
                '&::before': {
                  content: '""', position: 'absolute', inset: -20, 
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                  filter: 'blur(40px)', zIndex: 0
                }
              }}>
                <Box component="img" src="/assets/hero_dashboard.png" sx={{ 
                  width: '100%', height: 'auto', borderRadius: 3, 
                  boxShadow: theme.palette.mode === 'dark' ? '0 40px 80px -20px rgba(0,0,0,0.5)' : '0 10px 20px rgba(0,0,0,0.05)',
                  position: 'relative', zIndex: 1
                }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }} data-aos="fade-left">
              <Typography variant="overline" fontWeight="900" color="#818cf8" gutterBottom sx={{ letterSpacing: 3 }}>
                ENGINEERED FOR TEAMS
              </Typography>
              <Typography variant="h2" fontWeight="950" sx={{ mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' }, letterSpacing: '-2px', lineHeight: 1, color: 'text.primary' }}>
                Built for the <br/> Modern Builder.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}>
                Sprintora isn't just a project manager—it's a developer's cockpit. We've automated the tedious planning so you can focus on writing code and shipping features.
              </Typography>
              <Stack spacing={2}>
                {[
                  'Code-First Architecture',
                  'Frictionless Task Automation',
                  'Developer Velocity Tracking'
                ].map((item, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', p: 0.5, borderRadius: 1 }}>
                      <CheckCircleOutlineIcon sx={{ color: '#818cf8', fontSize: 20 }} />
                    </Box>
                    <Typography variant="body2" fontWeight="700" color="text.primary">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box id="features" sx={{ py: { xs: 10, md: 20 } }}>
        <Container maxWidth="xl">
          <Typography variant="h2" fontWeight="950" sx={{ textAlign: 'center', mb: { xs: 6, md: 12 }, fontSize: { xs: '2.2rem', md: '3.5rem' }, letterSpacing: '-2px', color: 'text.primary' }}>
            Built for <span style={{ color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}>Performance.</span>
          </Typography>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={3} key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <Card sx={{ 
                  p: { xs: 4, md: 6 }, height: '100%', bgcolor: 'background.paper', 
                  border: `1px solid ${theme.palette.divider}`, borderRadius: 3,
                }}>
                  <Box sx={{ mb: 3, display: 'inline-flex', p: 1.5, borderRadius: 3, bgcolor: 'rgba(99, 102, 241, 0.05)' }}>{f.icon}</Box>
                  <Typography variant="h6" fontWeight="900" sx={{ mb: 1.5, color: 'text.primary' }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{f.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ py: { xs: 10, md: 20 }, position: 'relative', bgcolor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.02)' : 'rgba(99, 102, 241, 0.01)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" fontWeight="900" color="#818cf8" sx={{ letterSpacing: 3 }}>PRICING</Typography>
            <Typography variant="h2" fontWeight="950" sx={{ mb: 2, letterSpacing: '-1.5px', color: 'text.primary' }}>Simple, Transparent.</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              We are currently in early phase. Join the elite teams scaling with AI.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                p: { xs: 4, md: 8 }, 
                borderRadius: 4, 
                border: '2px solid #6366f1', 
                position: 'relative',
                bgcolor: 'background.paper',
                boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.2)'
              }}>
                <Chip 
                  label="EARLY ADOPTER OFFER" 
                  sx={{ 
                    position: { xs: 'static', sm: 'absolute' }, 
                    top: 24, right: 24, 
                    mb: { xs: 2, sm: 0 },
                    fontWeight: 900, bgcolor: '#6366f1', color: 'white' 
                  }} 
                />
                <Typography variant="h5" fontWeight="950" sx={{ letterSpacing: '-0.5px' }}>Scale Plan</Typography>
                <Stack direction="row" alignItems="baseline" spacing={1} sx={{ my: 4 }}>
                  <Typography variant="h2" fontWeight="950" sx={{ color: 'text.primary' }}>₹0</Typography>
                  <Typography variant="h6" color="text.secondary">/month</Typography>
                </Stack>
                <Typography variant="body1" sx={{ mb: 4, fontWeight: 700, color: '#10b981' }}>
                   FREE for the first 5 teams! (Early Phase)
                </Typography>
                <Divider sx={{ mb: 4, opacity: 0.1 }} />
                <Stack spacing={2.5} sx={{ mb: 6 }}>
                  {[
                    'Unlimited AI Tasks',
                    'Real-Time Collaboration',
                    'Advanced Analytics',
                    'Priority Support',
                    'Custom Workflow Architecting'
                  ].map((text, i) => (
                    <Stack key={i} direction="row" spacing={2} alignItems="center">
                      <CheckCircleOutlineIcon sx={{ color: '#10b981' }} />
                      <Typography variant="body2" fontWeight="600">{text}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Button 
                  fullWidth variant="contained" size="large" onClick={() => navigate('/register')}
                  sx={{ height: 64, borderRadius: 3, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
                >
                  Claim Your Spot
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Differentiation */}
      <Box sx={{ py: { xs: 8, md: 15 } }}>
        <Container maxWidth="lg">
          <Card sx={{ p: { xs: 4, md: 8 }, borderRadius: 6, border: `1px solid ${theme.palette.divider}`, textAlign: 'center', bgcolor: 'background.paper' }}>
            <Typography variant={isSmallMobile ? "h4" : "h3"} fontWeight="950" sx={{ mb: 4, color: 'text.primary' }}>Why not Jira?</Typography>
            <Grid container spacing={4} sx={{ mt: 1 }}>
              {[
                { title: 'Simpler UI', desc: 'No cluttered menus.' },
                { title: 'AI-First', desc: 'Automated planning.' },
                { title: 'Built for Speed', desc: 'Instant execution.' }
              ].map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Typography variant="body1" fontWeight="900" color="#818cf8" gutterBottom>{item.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 8, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <BrandLogo size={32} />
                  <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: '-1px', color: 'text.primary' }}>Sprintora</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.6 }}>
                  The AI-powered workspace engineered for high-performance teams. Plan, track, and deliver with industrial precision.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Typography variant="overline" fontWeight="900" color="primary.main" sx={{ letterSpacing: 2 }}>DEVELOPED BY</Typography>
                <Box 
                  component="a" 
                  href="https://vsgrps.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    textDecoration: 'none',
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.04)',
                      transform: 'translateY(-2px)',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <Box component="img" src="/vsgrps_logo.png" sx={{ width: 40, height: 40, borderRadius: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="900" color="text.primary">VSGRPS Technologies</Typography>
                    <Typography variant="caption" color="text.secondary">Visit vsgrps.com</Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={6} sx={{ justifyContent: { md: 'flex-end' } }}>
                <Stack spacing={1.5}>
                  <Typography variant="caption" fontWeight="900" color="#818cf8">SYSTEM</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/features')}>Features</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/mission')}>Our Mission</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/guide')}>User Guide</Typography>
                </Stack>
                <Stack spacing={1.5}>
                  <Typography variant="caption" fontWeight="900" color="#c084fc">LEGAL</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/privacy')}>Privacy</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/terms')}>Terms</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, opacity: 0.1 }} />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
            © {new Date().getFullYear()} VSGRPS Technologies. All rights reserved. Sprintora is a registered trademark.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SprintoraLanding;

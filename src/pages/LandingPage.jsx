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
import SecurityIcon from '@mui/icons-material/Security';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const SprintoraLanding = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
      icon: <AutoAwesomeIcon sx={{ color: '#818cf8', fontSize: 32 }} />,
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

  const steps = [
    { num: '01', title: 'Create Project', desc: 'Initialize your workspace in one click.' },
    { num: '02', title: 'Let AI Plan', desc: 'Our neural engine generates your roadmap.' },
    { num: '03', title: 'Execute & Track', desc: 'Ship faster with visual progress tracking.' }
  ];

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#030712', 
      color: 'white', 
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
        bgcolor: 'rgba(3,7,18,0.8)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        zIndex: 1000
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', height: { xs: 60, md: 85 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
                p: 0.8, borderRadius: 1.5, display: 'flex',
                boxShadow: '0 4px 12px -2px rgba(99, 102, 241, 0.4)'
              }}>
                <AutoAwesomeIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-1px' }}>
                Sprintora
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={5} sx={{ mr: 4 }}>
                  {['Features', 'Workflow', 'Pricing'].map((item) => (
                    <Typography 
                      key={item} 
                      onClick={() => handleNavClick(item.toLowerCase())}
                      variant="body2" fontWeight="600" color="text.secondary" 
                      sx={{ cursor: 'pointer', '&:hover': { color: 'white' }, transition: '0.2s' }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              )}
              <Button 
                variant="contained" 
                size={isSmallMobile ? "small" : "medium"}
                onClick={() => navigate('/login')}
                sx={{ 
                  borderRadius: 3.5, fontWeight: 800, px: { xs: 2, md: 4 },
                  background: 'white', color: '#030712', fontSize: { xs: '0.75rem', md: '0.875rem' },
                  '&:hover': { background: '#f3f4f6' }
                }}
              >
                Start Free
              </Button>
              {isMobile && (
                <IconButton onClick={() => setMobileMenuOpen(true)} sx={{ color: 'white', p: 0.5 }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} PaperProps={{ sx: { width: '80%', bgcolor: '#030712', backgroundImage: 'none' } }}>
        <Box sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight="900">Sprintora</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}><CloseIcon /></IconButton>
          </Stack>
          <List>
            {['Features', 'Workflow', 'Pricing'].map((item) => (
              <ListItem key={item} onClick={() => handleNavClick(item.toLowerCase())} sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
                textAlign: { xs: 'center', md: 'left' }
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
                    height: { xs: 56, md: 72 }, px: 5, borderRadius: 3, fontWeight: 800, borderColor: 'rgba(255,255,255,0.1)', color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.3)' }
                  }}
                  startIcon={<AutoAwesomeIcon />}
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
                    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)', zIndex: 2
                  }
                }}>
                  <Box component="img" src="/assets/developer_hero.png" sx={{ 
                    width: '100%', height: 'auto', borderRadius: 3,
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                  }} />
                </Box>
                <motion.div 
                  animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                  style={{ position: 'absolute', top: '-10%', right: '0%', zIndex: 2 }}
                >
                   <Card sx={{ p: 1.5, borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(3,7,18,0.95)', minWidth: 140 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <AutoAwesomeIcon sx={{ color: '#818cf8', fontSize: 18 }} />
                        <Typography variant="caption" fontWeight="800">AI PLANNER LIVE</Typography>
                      </Stack>
                   </Card>
                </motion.div>
             </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Social Proof */}
      <Box sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="overline" fontWeight="900" sx={{ color: 'rgba(255,255,255,0.3)', letterSpacing: 3 }}>TRUSTED BY BUILDERS</Typography>
              <Typography variant="h4" fontWeight="950" sx={{ mt: 1, letterSpacing: '-1px' }}>Powering the next generation of teams.</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 6, md: 10 }} justifyContent={{ md: 'flex-end' }}>
                <Box>
                  <Typography variant="h3" fontWeight="950" sx={{ color: '#818cf8' }}>1,250+</Typography>
                  <Typography variant="caption" fontWeight="800" sx={{ color: 'text.secondary', letterSpacing: 1 }}>PROJECTS COMPLETED</Typography>
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="950" sx={{ color: '#c084fc' }}>12.4k</Typography>
                  <Typography variant="caption" fontWeight="800" sx={{ color: 'text.secondary', letterSpacing: 1 }}>TASKS ARCHITECTED</Typography>
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="950" sx={{ color: '#fb7185' }}>98.2%</Typography>
                  <Typography variant="caption" fontWeight="800" sx={{ color: 'text.secondary', letterSpacing: 1 }}>TEAM VELOCITY</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.03)' }} />
          
          <Stack direction="row" spacing={6} sx={{ overflow: 'hidden', opacity: 0.4, justifyContent: 'center', filter: 'grayscale(1)' }}>
            {['FORBES', 'TECHCRUNCH', 'WIRED', 'VERGE', 'PRODUCT HUNT'].map(logo => (
              <Typography key={logo} variant="h6" fontWeight="900" sx={{ letterSpacing: 4 }}>{logo}</Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Built for Builders Section */}
      <Box sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
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
                  boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)',
                  position: 'relative', zIndex: 1
                }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }} data-aos="fade-left">
              <Typography variant="overline" fontWeight="900" color="#818cf8" gutterBottom sx={{ letterSpacing: 3 }}>
                ENGINEERED FOR TEAMS
              </Typography>
              <Typography variant="h2" fontWeight="950" sx={{ mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' }, letterSpacing: '-2px', lineHeight: 1 }}>
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
                    <Typography variant="body2" fontWeight="700">{item}</Typography>
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
          <Typography variant="h2" fontWeight="950" sx={{ textAlign: 'center', mb: { xs: 6, md: 12 }, fontSize: { xs: '2.2rem', md: '3.5rem' }, letterSpacing: '-2px' }}>
            Built for <span style={{ color: 'rgba(255,255,255,0.4)' }}>Performance.</span>
          </Typography>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={3} key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <Card sx={{ 
                  p: { xs: 4, md: 6 }, height: '100%', bgcolor: 'rgba(255,255,255,0.01)', 
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: 5,
                }}>
                  <Box sx={{ mb: 3, display: 'inline-flex', p: 1.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)' }}>{f.icon}</Box>
                  <Typography variant="h6" fontWeight="900" sx={{ mb: 1.5 }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{f.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Differentiation */}
      <Box sx={{ py: { xs: 8, md: 15 } }}>
        <Container maxWidth="lg">
          <Card sx={{ p: { xs: 4, md: 8 }, borderRadius: 6, border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center', bgcolor: 'rgba(99, 102, 241, 0.02)' }}>
            <Typography variant={isSmallMobile ? "h4" : "h3"} fontWeight="950" sx={{ mb: 4 }}>Why not Jira?</Typography>
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
      <Box sx={{ py: 8, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: '#01040a' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="900" sx={{ mb: 2 }}>Sprintora</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                The AI-powered agile workspace for modern teams.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={6} sx={{ justifyContent: { md: 'flex-end' } }}>
                <Stack spacing={1.5}>
                  <Typography variant="caption" fontWeight="900" color="#818cf8">SYSTEM</Typography>
                  {['Features', 'Status'].map(i => <Typography key={i} variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
                </Stack>
                <Stack spacing={1.5}>
                  <Typography variant="caption" fontWeight="900" color="#c084fc">LEGAL</Typography>
                  {['Privacy', 'Terms'].map(i => <Typography key={i} variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SprintoraLanding;

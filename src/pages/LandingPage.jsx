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
import LottieIcon from '../components/shared/LottieIcon';

const SprintoraLanding = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    AOS.init({
      duration: 1200,
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
      element.scrollIntoView({ behavior: 'smooth' });
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
        position: 'absolute', top: '-10%', left: '10%', width: '800px', height: '800px', 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        filter: 'blur(120px)', zIndex: 0 
      }} />
      <Box sx={{ 
        position: 'absolute', bottom: '10%', right: '0%', width: '600px', height: '600px', 
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
        filter: 'blur(100px)', zIndex: 0 
      }} />
      
      {/* Navigation */}
      <AppBar position="fixed" elevation={0} sx={{ 
        bgcolor: 'transparent', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        zIndex: 1000
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', height: { xs: 70, md: 85 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
                p: 1.2, borderRadius: 2, display: 'flex',
                boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.5)'
              }}>
                <AutoAwesomeIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: '-1.5px' }}>
                Sprintora
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={6}>
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
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderRadius: 3, fontWeight: 800, px: 4, py: 1.2,
                    background: 'white', color: '#030712',
                    '&:hover': { background: '#f3f4f6', transform: 'translateY(-2px)' },
                    transition: '0.3s'
                  }}
                >
                  Start Free
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
      <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} PaperProps={{ sx: { width: '85%', bgcolor: '#030712', backgroundImage: 'none' } }}>
        <Box sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight="900">MENU</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}><CloseIcon /></IconButton>
          </Stack>
          <List>
            {['Features', 'Workflow', 'Pricing'].map((item) => (
              <ListItem key={item} onClick={() => handleNavClick(item.toLowerCase())} sx={{ py: 2.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <ListItemText primary={item} primaryTypographyProps={{ fontWeight: 800, letterSpacing: 1 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: { xs: 18, md: 28 }, pb: { xs: 10, md: 20 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={7} data-aos="fade-right">
            <Chip 
              label="BETA v2.0" 
              sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', fontWeight: 900, mb: 4, px: 1, border: '1px solid rgba(99, 102, 241, 0.2)' }} 
            />
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '3.5rem', sm: '4.5rem', md: '6rem' }, 
              fontWeight: 950, lineHeight: 0.95, letterSpacing: '-4px', mb: 4,
              textAlign: { xs: 'center', md: 'left' }
            }}>
              From Idea to Done — <br/>
              <span style={{ 
                background: 'linear-gradient(to right, #818cf8, #c084fc, #fb7185)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Faster Than Ever
              </span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ 
              maxWidth: 600, lineHeight: 1.6, mb: 8, fontWeight: 400,
              textAlign: { xs: 'center', md: 'left' }, fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}>
              AI-powered agile workspace that plans, tracks, and delivers your projects with precision. Build your roadmap in seconds.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button 
                variant="contained" size="large" onClick={() => navigate('/register')}
                sx={{ 
                  height: 72, px: 6, borderRadius: 4, fontWeight: 900, fontSize: '1.15rem',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.6)' }
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Start Free
              </Button>
              <Button 
                variant="outlined" size="large"
                sx={{ 
                  height: 72, px: 5, borderRadius: 4, fontWeight: 800, borderColor: 'rgba(255,255,255,0.1)', color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }
                }}
                startIcon={<PlayArrowIcon />}
              >
                See Demo
              </Button>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={5} data-aos="zoom-in" data-aos-delay="200">
             <Box sx={{ position: 'relative' }}>
                <Box className="glass-card" sx={{ 
                  p: 1, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)',
                  overflow: 'hidden'
                }}>
                  <LottieIcon 
                    src="https://lottie.host/80c2f623-e291-4560-84c2-25e2a222383c/7T07v6HkNo.json" 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', top: '-5%', right: '-10%', zIndex: 2 }}
                >
                   <Card className="glass-card" sx={{ p: 2.5, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(3,7,18,0.9)' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', width: 40, height: 40 }}><AutoAwesomeIcon /></Avatar>
                        <Box>
                          <Typography variant="caption" color="text.secondary">AI SUGGESTION</Typography>
                          <Typography variant="body2" fontWeight="900">Add Login Auth Module</Typography>
                        </Box>
                      </Stack>
                   </Card>
                </motion.div>
             </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Trust Section */}
      <Box sx={{ py: 12, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={8} alignItems="center" justifyContent="center">
            <Typography variant="body1" fontWeight="800" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>BUILT FOR MODERN TEAMS</Typography>
            <Stack direction="row" spacing={8}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="950">1,000+</Typography>
                <Typography variant="caption" color="text.secondary">PROJECTS MANAGED</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="950">10,000+</Typography>
                <Typography variant="caption" color="text.secondary">TASKS COMPLETED</Typography>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 20 }}>
        <Container maxWidth="xl">
          <Stack sx={{ mb: 12, textAlign: 'center' }}>
            <Typography variant="overline" color="#818cf8" fontWeight="900" sx={{ letterSpacing: 4, mb: 2 }}>CORE ENGINE</Typography>
            <Typography variant="h2" fontWeight="950" sx={{ letterSpacing: '-3px' }}>Problem → <span style={{ color: 'rgba(255,255,255,0.4)' }}>Solution.</span></Typography>
          </Stack>
          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={3} key={i} data-aos="fade-up" data-aos-delay={i * 150}>
                <Card sx={{ 
                  p: 6, height: '100%', bgcolor: 'rgba(255,255,255,0.01)', 
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8,
                  transition: '0.4s', '&:hover': { transform: 'translateY(-12px)', borderColor: 'rgba(99, 102, 241, 0.3)' }
                }}>
                  <Box sx={{ mb: 4, display: 'inline-flex', p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)' }}>{f.icon}</Box>
                  <Typography variant="h5" fontWeight="900" sx={{ mb: 2, letterSpacing: '-1px' }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{f.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box id="workflow" sx={{ py: 20, bgcolor: 'rgba(255,255,255,0.02)' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight="950" sx={{ textAlign: 'center', mb: 15, letterSpacing: '-3px' }}>How it <span style={{ color: '#818cf8' }}>works.</span></Typography>
          <Grid container spacing={8}>
            {steps.map((s, i) => (
              <Grid item xs={12} md={4} key={i} data-aos="fade-up" data-aos-delay={i * 200}>
                <Stack spacing={3} alignItems="center" sx={{ textAlign: 'center' }}>
                  <Typography variant="h1" fontWeight="950" sx={{ opacity: 0.1, lineHeight: 0.8 }}>{s.num}</Typography>
                  <Typography variant="h5" fontWeight="900">{s.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{s.desc}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Differentiation Section */}
      <Box sx={{ py: 20 }}>
        <Container maxWidth="lg">
          <Card className="glass-card" sx={{ p: { xs: 6, md: 12 }, borderRadius: 10, border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="950" sx={{ mb: 4, letterSpacing: '-2px' }}>Why not Jira?</Typography>
            <Grid container spacing={6} sx={{ mt: 2 }}>
              {[
                { title: 'Simpler UI', desc: 'No more navigating through 50 menus to find a task.' },
                { title: 'AI-First', desc: 'Planning is automated, not manual labor.' },
                { title: 'Built for Speed', desc: 'Optimized for fast-moving startups and dev teams.' }
              ].map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Typography variant="h6" fontWeight="900" color="#818cf8" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box id="pricing" sx={{ py: 20 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }} data-aos="zoom-in">
          <Typography variant="h2" fontWeight="950" sx={{ mb: 4, letterSpacing: '-4px' }}>Start Building Smarter Today</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 8 }}>Join the high-velocity teams using Sprintora to ship faster.</Typography>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Button 
              variant="contained" size="large" onClick={() => navigate('/register')}
              sx={{ 
                height: 72, px: 10, borderRadius: 4, fontWeight: 900, fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              }}
            >
              Start Free
            </Button>
            <Typography variant="caption" color="text.secondary">No Credit Card Required • Instant Access</Typography>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 12, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: '#01040a' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Typography variant="h5" fontWeight="950">Sprintora</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                  The AI-powered agile workspace for the next generation of builders.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={8} sx={{ justifyContent: { md: 'flex-end' } }}>
                <Stack spacing={2}>
                  <Typography variant="caption" fontWeight="900" color="#818cf8">PRODUCT</Typography>
                  {['Features', 'Demo', 'Security'].map(i => <Typography key={i} variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="caption" fontWeight="900" color="#c084fc">COMPANY</Typography>
                  {['Privacy', 'Contact', 'Status'].map(i => <Typography key={i} variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Typography variant="caption" color="text.disabled">© 2026 Sprintora Systems. All Rights Reserved.</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SprintoraLanding;

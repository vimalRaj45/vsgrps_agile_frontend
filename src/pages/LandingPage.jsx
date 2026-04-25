import React from 'react';
import { 
  Box, Button, Container, Typography, Grid, Stack,
  IconButton, AppBar, Toolbar, useTheme, useMediaQuery, Card,
  Avatar, AvatarGroup, TextField, Divider, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GitHubIcon from '@mui/icons-material/GitHub';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HubIcon from '@mui/icons-material/Hub';
import InsightsIcon from '@mui/icons-material/Insights';
import LottieIcon from '../components/shared/LottieIcon';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ color: '#818cf8' }} />,
      label: 'AI ARCHITECT',
      title: 'Automated Roadmapping',
      desc: 'Convert vision into actionable tasks. Our AI handles dependencies, estimates, and task decomposition in milliseconds.'
    },
    {
      icon: <HubIcon sx={{ color: '#c084fc' }} />,
      label: 'TEAM HUB',
      title: 'Centralized Intelligence',
      desc: 'A unified workspace for context-aware collaboration. Every comment and file is linked to the core project DNA.'
    },
    {
      icon: <InsightsIcon sx={{ color: '#fb7185' }} />,
      label: 'ANALYTICS',
      title: 'Predictive Velocity',
      desc: 'Real-time distribution charts and performance metrics that predict bottlenecks before they stall your project.'
    }
  ];

  const pricing = [
    {
      tier: 'STARTER',
      price: '$0',
      desc: 'For individuals and hackers.',
      features: ['5 Active Projects', 'AI Architect (Basic)', 'Community Hub Access', 'Secure File Vault'],
      btn: 'Get Started Free',
      highlight: false
    },
    {
      tier: 'ELITE',
      price: '$12',
      period: '/mo',
      desc: 'For high-velocity teams.',
      features: ['Unlimited Everything', 'Advanced AI Engine', 'Custom Analytics', 'Full Audit Governance', 'Priority Node Support'],
      btn: 'Access Elite Now',
      highlight: true
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#020617', 
      color: 'white', 
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Background Tech Mesh */}
      <Box sx={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />
      
      {/* Dynamic Orbs */}
      <Box sx={{ 
        position: 'absolute', 
        top: '-10%', 
        left: '10%', 
        width: '600px', 
        height: '600px', 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
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
              <Box sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                p: 1.2, 
                borderRadius: 2.5, 
                display: 'flex',
                boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)'
              }}>
                <SecurityIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="h5" fontWeight="950" sx={{ letterSpacing: '-2px' }}>
                VSGRPS <span style={{ color: '#818cf8' }}>WORKSPACE</span>
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={5}>
                  {['Product', 'Network', 'Ecosystem', 'Enterprise'].map((item) => (
                    <Typography 
                      key={item} 
                      variant="caption" 
                      fontWeight="800" 
                      color="text.secondary" 
                      sx={{ 
                        cursor: 'pointer', 
                        letterSpacing: 1,
                        '&:hover': { color: 'white' }, 
                        transition: 'all 0.3s ease' 
                      }}
                    >
                      {item.toUpperCase()}
                    </Typography>
                  ))}
                </Stack>
              )}
              <Button 
                variant="contained" 
                onClick={() => navigate('/login')}
                sx={{ 
                  borderRadius: 10, 
                  fontWeight: 900, 
                  px: 4,
                  py: 1.2,
                  background: 'white',
                  color: '#020617',
                  fontSize: '0.85rem',
                  '&:hover': { background: '#f1f5f9', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                SIGN IN
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero */}
      <Container maxWidth="xl" sx={{ pt: { xs: 20, md: 30 }, pb: { xs: 10, md: 20 }, position: 'relative', zIndex: 1 }}>
        <motion.div style={{ opacity, scale }}>
          <Grid container spacing={12} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 4 }}>
                <Chip 
                  label="V2.0 NOW LIVE" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(99, 102, 241, 0.1)', 
                    color: '#818cf8', 
                    fontWeight: 900, 
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    px: 1,
                    mb: 4
                  }} 
                />
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem' }, 
                  fontWeight: 950, 
                  lineHeight: 0.9, 
                  letterSpacing: '-5px',
                  mb: 4,
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  ARCHITECT THE <br/>
                  <span style={{ 
                    background: 'linear-gradient(to right, #818cf8, #c084fc, #fb7185, #818cf8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '300% auto',
                    animation: 'gradient 6s linear infinite'
                  }}>FUTURE TODAY.</span>
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ 
                  maxWidth: 650, 
                  lineHeight: 1.6, 
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 8,
                  textAlign: { xs: 'center', md: 'left' },
                  fontWeight: 400
                }}>
                  The high-velocity workspace where AI meets industrial-grade management. Built for founders who move fast and break nothing.
                </Typography>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => navigate('/register')}
                    sx={{ 
                      height: 72, 
                      px: 6, 
                      borderRadius: 4, 
                      fontWeight: 900, 
                      fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.6)' }
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    DEPLOY YOUR WORKSPACE
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      height: 72, 
                      px: 4, 
                      borderRadius: 4, 
                      fontWeight: 800, 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }
                    }}
                    startIcon={<PlayArrowIcon />}
                  >
                    SYSTEM OVERVIEW
                  </Button>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ 
                  position: 'absolute', 
                  inset: '-10%', 
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                  zIndex: -1 
                }} />
                <motion.div 
                  initial={{ rotateY: -20, rotateX: 10, scale: 0.9 }}
                  animate={{ rotateY: -10, rotateX: 5, scale: 1 }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                >
                  <Box className="glass-card" sx={{ 
                    p: 1.5, 
                    borderRadius: 6, 
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)',
                    overflow: 'hidden'
                  }}>
                    <LottieIcon 
                      src="https://assets6.lottiefiles.com/packages/lf20_kyu7xb1v.json" 
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Box>
                </motion.div>
                
                {/* Floating Micro-Card */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', top: '10%', left: '-15%' }}
                >
                  <Box className="glass-card" sx={{ p: 2, borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(2,6,23,0.8)' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: '#818cf8', width: 32, height: 32 }}><AutoAwesomeIcon sx={{ fontSize: 18 }} /></Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>AI ESTIMATE</Typography>
                        <Typography variant="body2" fontWeight="900">4.5 DAYS</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Feature Section */}
      <Box sx={{ py: 20, bgcolor: 'rgba(2,6,23,0.5)', position: 'relative' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div whileHover={{ y: -16 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <Card sx={{ 
                    p: 8, 
                    height: '100%', 
                    bgcolor: 'rgba(255,255,255,0.01)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 8,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ mb: 4 }}>{f.icon}</Box>
                    <Typography variant="caption" color="primary" fontWeight="900" sx={{ letterSpacing: 2, mb: 1, display: 'block' }}>{f.label}</Typography>
                    <Typography variant="h4" fontWeight="900" sx={{ mb: 2, letterSpacing: '-1px' }}>{f.title}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>{f.desc}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Advanced Pricing Section */}
      <Box sx={{ py: 20 }}>
        <Container maxWidth="lg">
          <Stack sx={{ textAlign: 'center', mb: 12 }}>
            <Typography variant="caption" color="#818cf8" fontWeight="900" sx={{ letterSpacing: 3, mb: 2 }}>SCALABLE INFRASTRUCTURE</Typography>
            <Typography variant="h2" fontWeight="950" sx={{ letterSpacing: '-3px' }}>Simple tiers for <span style={{ color: 'rgba(255,255,255,0.4)' }}>extraordinary teams.</span></Typography>
          </Stack>
          
          <Grid container spacing={6} sx={{ justifyContent: 'center' }}>
            {pricing.map((p, i) => (
              <Grid item xs={12} md={5} key={i}>
                <Box sx={{ 
                  p: 8, 
                  height: '100%', 
                  bgcolor: p.highlight ? 'rgba(99, 102, 241, 0.03)' : 'rgba(255,255,255,0.01)', 
                  border: p.highlight ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 10,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: 1, color: p.highlight ? '#818cf8' : 'text.secondary', mb: 4 }}>{p.tier}</Typography>
                  <Typography variant="h2" fontWeight="950" sx={{ mb: 1 }}>{p.price}<span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>{p.period}</span></Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>{p.desc}</Typography>
                  
                  <Stack spacing={2.5} sx={{ mb: 8, flexGrow: 1 }}>
                    {p.features.map((f, j) => (
                      <Stack key={j} direction="row" spacing={2} alignItems="center">
                        <CheckCircleOutlineIcon sx={{ color: '#10b981', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{f}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  
                  <Button 
                    fullWidth 
                    variant={p.highlight ? "contained" : "outlined"} 
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{ 
                      height: 64, 
                      borderRadius: 3, 
                      fontWeight: 900, 
                      background: p.highlight ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent',
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 }
                    }}
                  >
                    {p.btn}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Trust Section */}
      <Box sx={{ py: 15, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={8} alignItems="center" justifyContent="center">
            <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{ letterSpacing: 2 }}>TRUSTED BY NEXT-GEN ORGANIZATIONS</Typography>
            <Stack direction="row" spacing={6} sx={{ opacity: 0.5, filter: 'grayscale(1)' }}>
              {/* Simplified Logo Placeholders */}
              {['MODERN', 'ELITE', 'SYNERGY', 'VELOCITY'].map(name => (
                <Typography key={name} variant="h6" fontWeight="900" sx={{ letterSpacing: 2 }}>{name}</Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 15, bgcolor: '#01040a' }}>
        <Container maxWidth="xl">
          <Grid container spacing={10}>
            <Grid item xs={12} md={4}>
              <Stack spacing={4}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ bgcolor: '#6366f1', p: 0.8, borderRadius: 2, display: 'flex' }}>
                    <SecurityIcon sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="900">VSGRPS</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.8 }}>
                  Defining the future of organizational management through high-velocity AI architecture and uncompromised security.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="caption" fontWeight="900" color="#818cf8" sx={{ mb: 4, display: 'block', letterSpacing: 2 }}>SYSTEM</Typography>
              <Stack spacing={2}>
                {['Architect', 'Core Hub', 'Security', 'Vault'].map(i => <Typography key={i} variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="caption" fontWeight="900" color="#c084fc" sx={{ mb: 4, display: 'block', letterSpacing: 2 }}>NETWORK</Typography>
              <Stack spacing={2}>
                {['Ecosystem', 'Partners', 'Open Data', 'API'].map(i => <Typography key={i} variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="glass-card" sx={{ p: 6, borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="subtitle1" fontWeight="900" sx={{ mb: 2 }}>ACCESS SYSTEM UPDATES</Typography>
                <Stack direction="row" spacing={1}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    placeholder="terminal@org.com" 
                    sx={{ 
                      bgcolor: 'rgba(0,0,0,0.3)', 
                      '& .MuiOutlinedInput-root': { borderRadius: 2 } 
                    }} 
                  />
                  <Button variant="contained" sx={{ px: 4, borderRadius: 2, bgcolor: '#6366f1' }}>JOIN</Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 15, pt: 8, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.disabled">© 2026 VSGRPS SYSTEMS. ALL RIGHTS RESERVED.</Typography>
            <Stack direction="row" spacing={4}>
              <GitHubIcon sx={{ fontSize: 20, color: 'text.disabled' }} />
              <SecurityIcon sx={{ fontSize: 20, color: 'text.disabled' }} />
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

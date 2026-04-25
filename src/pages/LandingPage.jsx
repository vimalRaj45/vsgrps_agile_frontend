import React from 'react';
import { 
  Box, Button, Container, Typography, Grid, Stack,
  IconButton, AppBar, Toolbar, useTheme, useMediaQuery, Card,
  Avatar, AvatarGroup, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LockIcon from '@mui/icons-material/Lock';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LottieIcon from '../components/shared/LottieIcon';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const coreModules = [
    {
      icon: <AssignmentIcon sx={{ color: '#6366f1' }} />,
      title: 'Task Management',
      desc: 'Comprehensive task tracking designed for professional organizational workflows.'
    },
    {
      icon: <FolderIcon sx={{ color: '#8b5cf6' }} />,
      title: 'Project Portfolio',
      desc: 'Manage complex project lifecycles with clear milestones and resource visibility.'
    },
    {
      icon: <VideoCallIcon sx={{ color: '#ec4899' }} />,
      title: 'Meeting Suite',
      desc: 'Integrated scheduling and documentation to keep your team aligned and productive.'
    }
  ];

  const securityFeatures = [
    {
      icon: <LockIcon sx={{ color: '#6366f1' }} />,
      title: 'Enterprise Persistence',
      desc: 'Robust session management architecture that ensures continuous, secure access.'
    },
    {
      icon: <StorageIcon sx={{ color: '#8b5cf6' }} />,
      title: 'Data Sovereignty',
      desc: 'Strict multi-tenant isolation protocols protecting your organizational integrity.'
    },
    {
      icon: <VerifiedUserIcon sx={{ color: '#ec4899' }} />,
      title: 'Audit Governance',
      desc: 'End-to-end transparency with automated logs for complete operational compliance.'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflowX: 'hidden',
      background: '#020617'
    }}>
      {/* Dynamic Background */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '100vh',
        background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
        zIndex: 0
      }} />
      
      {/* Navigation */}
      <AppBar position="fixed" elevation={0} sx={{ 
        bgcolor: 'transparent', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', height: { xs: 70, md: 90 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                p: 1, 
                borderRadius: 2.5, 
                display: 'flex',
                boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.5)'
              }}>
                <SecurityIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: '-1.5px', display: { xs: 'none', sm: 'block' } }}>
                VSGRPS <span style={{ color: '#6366f1' }}>Workspace</span>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={4}>
                  {['Workspace', 'Security', 'Management', 'AI Assistant'].map((item) => (
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
                  borderRadius: 3, 
                  fontWeight: 800, 
                  px: 4,
                  py: 1.2,
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

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 18, md: 24 }, pb: { xs: 10, md: 20 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 1.5, 
                px: 2, 
                py: 0.8, 
                borderRadius: 10, 
                bgcolor: 'rgba(99, 102, 241, 0.1)', 
                border: '1px solid rgba(99, 102, 241, 0.2)',
                mb: 3
              }}>
                <AutoAwesomeIcon sx={{ color: '#6366f1', fontSize: 18 }} />
                <Typography variant="caption" fontWeight="800" color="#6366f1" sx={{ letterSpacing: 1.5 }}>
                  NEW: PROFESSIONAL MANAGEMENT SYSTEM
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem' }, 
                fontWeight: 950, 
                mb: 3, 
                letterSpacing: '-3px', 
                lineHeight: 0.95,
                textAlign: { xs: 'center', md: 'left' }
              }}>
                Your System, <br/>
                <span style={{ 
                  background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '300% auto',
                  animation: 'gradient 4s linear infinite'
                }}>Fully Optimized.</span>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ 
                mb: 6, 
                maxWidth: 600, 
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                textAlign: { xs: 'center', md: 'left' }
              }}>
                The mission-critical management workspace for elite teams. Industrial-grade encryption meets enterprise efficiency.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/register')} 
                  endIcon={<ArrowForwardIcon />} 
                  sx={{ 
                    height: 68, 
                    px: 5, 
                    borderRadius: 4, 
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                  }}
                >
                  Get Started Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  startIcon={<GitHubIcon />} 
                  sx={{ 
                    height: 68, 
                    px: 4, 
                    borderRadius: 4,
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  Technical Overview
                </Button>
              </Stack>
              
              <Stack direction="row" spacing={2} sx={{ mt: 6, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <AvatarGroup max={4}>
                  {[1, 2, 3, 4].map(i => <Avatar key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} />)}
                </AvatarGroup>
                <Typography variant="body2" color="text.secondary">
                  Join <strong>2,500+</strong> organizations working smarter
                </Typography>
              </Stack>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Box sx={{ 
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120%',
                  height: '120%',
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                  zIndex: -1
                }
              }}>
                <Box className="glass-card" sx={{ 
                  p: 1, 
                  borderRadius: 6, 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)',
                  transform: 'perspective(1000px) rotateY(-15deg) rotateX(10deg)',
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)' }
                }}>
                  <LottieIcon 
                    src="https://assets6.lottiefiles.com/packages/lf20_kyu7xb1v.json" 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Modules Grid */}
        <Box sx={{ mt: { xs: 20, md: 30 } }}>
          <Typography variant="overline" color="primary" fontWeight="900" sx={{ mb: 2, display: 'block', textAlign: 'center', letterSpacing: 3 }}>
            INTEGRATED TOOLS
          </Typography>
          <Typography variant="h3" fontWeight="900" sx={{ textAlign: 'center', mb: 8, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Management Reimagined. <br/>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>All within your workspace.</span>
          </Typography>
          
          <Grid container spacing={4}>
            {coreModules.map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Card sx={{ 
                    p: 6, 
                    height: '100%', 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 6,
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ mb: 4, display: 'inline-flex', p: 2, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.03)' }}>
                      {f.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="800" gutterBottom>{f.title}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{f.desc}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Governance Section */}
        <Box sx={{ mt: { xs: 20, md: 30 } }}>
          <Typography variant="overline" color="#ec4899" fontWeight="900" sx={{ mb: 2, display: 'block', textAlign: 'center', letterSpacing: 3 }}>
            CORPORATE GOVERNANCE
          </Typography>
          <Typography variant="h3" fontWeight="900" sx={{ textAlign: 'center', mb: 8, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Industrial Security. <br/>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Built for Organizations.</span>
          </Typography>
          
          <Grid container spacing={4}>
            {securityFeatures.map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Card sx={{ 
                    p: 6, 
                    height: '100%', 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 6,
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: `linear-gradient(90deg, transparent, ${i === 0 ? '#6366f1' : i === 1 ? '#8b5cf6' : '#ec4899'}, transparent)`
                    }
                  }}>
                    <Box sx={{ mb: 4, display: 'inline-flex', p: 2, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.03)' }}>
                      {f.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="800" gutterBottom>{f.title}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{f.desc}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', py: 12, mt: 10, bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box sx={{ background: '#6366f1', p: 0.8, borderRadius: 2, display: 'flex' }}>
                    <SecurityIcon sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="900">VSGRPS Workspace</Typography>
                </Stack>
                <Typography color="text.secondary" sx={{ maxWidth: 300 }}>
                  The management workspace for modern organizations. Built by experts, for experts.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 3 }}>Modules</Typography>
              <Stack spacing={2}>
                {['Tasks', 'Projects', 'Meetings', 'Files'].map(i => <Typography key={i} color="text.secondary" variant="body2" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 3 }}>Platform</Typography>
              <Stack spacing={2}>
                {['Security', 'Audit Logs', 'Reports', 'AI Architect'].map(i => <Typography key={i} color="text.secondary" variant="body2" sx={{ cursor: 'pointer' }}>{i}</Typography>)}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="glass-card" sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 1 }}>Stay Updated</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Get the latest updates on your workspace.</Typography>
                <Stack direction="row" spacing={1}>
                  <TextField size="small" placeholder="email@company.com" fullWidth sx={{ bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 2 }} />
                  <Button variant="contained" sx={{ px: 3, borderRadius: 2, background: '#6366f1' }}>Join</Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 10, pt: 4, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <Typography variant="caption" color="text.disabled">
              © 2026 VSGRPS Workspace Secure. All rights reserved. Industrial security by VSGRPS Systems.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

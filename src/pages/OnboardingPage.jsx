import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Avatar, Grid, Card, IconButton, Stepper, Step, StepLabel,
  useTheme, useMediaQuery, Fade, Zoom, TextField, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText, Chip, Divider, MobileStepper, Toolbar
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';


const steps = ['WELCOME', 'AI VISION', 'MAGIC REVEAL', 'TEAM SYNC', 'READY'];

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState([
    { title: "Initialization", sub: "Setup project core and tech stack" },
    { title: "Architecture", sub: "Design database schemas and API" },
    { title: "MVP Development", sub: "Build primary features and logic" },
    { title: "Security Layer", sub: "Implement auth and encryption" },
    { title: "Deployment", sub: "CI/CD pipeline and cloud hosting" }
  ]);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate('/register');
      return;
    }

    setLoading(true);
    // Simulate smooth loading between steps
    const delay = activeStep === 1 ? 2500 : 800; // Longer delay for the "Reveal" step
    
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setLoading(false);
    }, delay);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ py: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', mb: 4 }}>
            <CircularProgress size={isSmallMobile ? 80 : 120} thickness={2} sx={{ color: '#6366f1' }} />
            <AutoAwesomeIcon sx={{ 
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              fontSize: isSmallMobile ? 24 : 40, color: '#6366f1', animation: 'pulse 2s infinite'
            }} />
          </Box>
          <Typography variant={isSmallMobile ? "h6" : "h5"} fontWeight="900" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <Typewriter 
              options={{ 
                strings: ['Processing Step...', 'Syncing AI Models...', 'Polishing View...', 'Architecting...'], 
                autoStart: true, loop: true, delay: 30 
              }} 
            />
          </Typography>
        </Box>
      );
    }

    switch (activeStep) {
      case 0:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center', px: { xs: 1, md: 4 } }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
               <Box component="img" src="/assets/developer_hero.png" sx={{ width: '100%', maxWidth: 500, borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
            </Box>
            <Typography variant={isSmallMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px', lineHeight: 1.1 }}>
              Step into the Future 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontWeight: 400, maxWidth: 500, mx: 'auto', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
              Welcome to Sprintora. Experience how AI redefines project planning and team execution.
            </Typography>
            <Button 
              variant="contained" fullWidth={isSmallMobile} size="large" onClick={handleNext}
              sx={{ height: { xs: 56, md: 72 }, px: 8, borderRadius: 3, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              Start the Experience
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} sx={{ textAlign: 'center', px: { xs: 1, md: 4 } }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
               <Box component="img" src="/assets/hero_dashboard.png" sx={{ width: '100%', maxWidth: 700, borderRadius: 3, boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }} />
            </Box>
            <Typography variant={isSmallMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Full Visibility
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
              Visualize roadmaps, team velocity, and task distribution in one unified command center.
            </Typography>
            <Button 
              variant="contained" size="large" fullWidth={isSmallMobile} onClick={handleNext}
              sx={{ height: { xs: 56, md: 72 }, px: 8, borderRadius: 3, fontWeight: 950, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              Reveal AI Magic
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ textAlign: 'center', px: { xs: 1, md: 4 } }}>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Typography variant={isSmallMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
                The Magic Reveal ⭐
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                AI-driven project architecting at its finest.
              </Typography>
              
              <Stack spacing={1.5} sx={{ mb: 6, textAlign: 'left' }}>
                {aiPlan.map((item, idx) => (
                  <Card key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                      <Box>
                        <Typography variant="body1" fontWeight="800" sx={{ fontSize: '0.9rem' }}>{item.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                      </Box>
                    </Stack>
                  </Card>
                ))}
              </Stack>
              <Button variant="contained" size="large" fullWidth={isSmallMobile} onClick={handleNext} sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900 }}>Next Step</Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center', px: { xs: 1, md: 4 } }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
               <Box component="img" src="/assets/team_sync.png" sx={{ width: '100%', maxWidth: 500, borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
            </Box>
            <Typography variant={isSmallMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Seamless Sync
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
              Real-time collaboration built for speed. No more silos, no more missed updates.
            </Typography>
            <Button variant="contained" size="large" fullWidth={isSmallMobile} onClick={handleNext} sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900 }}>Finalize Tour</Button>
          </Box>
        );
      case 4:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center', px: { xs: 1, md: 4 } }}>
            <Box sx={{ mb: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: '#10b981' }} />
            </Box>
            <Typography variant={isSmallMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Ready to Scale! 🎉
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 8 }}>
              Join thousands of teams shipping faster with Sprintora.
            </Typography>
            
            <Button 
              variant="contained" size="large" onClick={handleNext}
              fullWidth
              sx={{ 
                height: { xs: 64, md: 80 }, borderRadius: 3, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontWeight: 950,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 30px 60px -15px rgba(99, 102, 241, 0.5)'
              }}
            >
              Start Free Now
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', bgcolor: '#030712', color: 'white',
      display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden'
    }}>
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.01) 1px, transparent 0)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
      
      {/* Header */}
      <Box sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`, 
        pt: 1, position: 'relative', zIndex: 100,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(3,7,18,0.8)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 2 } }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <AutoAwesomeIcon sx={{ color: '#6366f1', fontSize: 20 }} />
              <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-1px' }}>Sprintora</Typography>
            </Stack>

            {!isMobile && (
              <Stepper activeStep={activeStep} sx={{ width: '40%' }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#6366f1' } } }}>
                      <Typography variant="caption" fontWeight="800" sx={{ opacity: 0.5 }}>{label}</Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}

            <Button 
              variant="contained"
              size="small" 
              onClick={() => navigate('/register')}
              sx={{ 
                bgcolor: theme.palette.mode === 'dark' ? 'white' : '#030712', 
                color: theme.palette.mode === 'dark' ? '#030712' : 'white', 
                fontWeight: 900, px: 2, borderRadius: 3,
                '&:hover': { bgcolor: theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }
              }}
            >
              Get Started
            </Button>
          </Toolbar>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 6, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ width: '100%' }}>
          <AnimatePresence mode="wait">
            {!loading && (
              <Box key={activeStep} sx={{ width: '100%' }}>
                {renderContent()}
              </Box>
            )}
            {loading && (
              <Box key="loading" sx={{ width: '100%' }}>
                {renderContent()}
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Container>

      {/* Navigation Footer */}
      <Box sx={{ 
        p: 2, 
        borderTop: `1px solid ${theme.palette.divider}`, 
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(3,7,18,0.9)' : 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(15px)',
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        borderRadius: 0
      }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={handleBack} 
              disabled={activeStep === 0 || loading || activeStep === steps.length - 1}
              sx={{ color: 'white', opacity: activeStep === 0 ? 0.3 : 0.8 }}
            >
              Back
            </Button>
            
            <MobileStepper
              variant="dots"
              steps={steps.length}
              position="static"
              activeStep={activeStep}
              sx={{ bgcolor: 'transparent', flexGrow: 1, justifyContent: 'center', '& .MuiMobileStepper-dot': { bgcolor: 'rgba(255,255,255,0.1)' }, '& .MuiMobileStepper-dotActive': { bgcolor: '#6366f1' } }}
              backButton={null}
              nextButton={null}
            />

            {activeStep !== steps.length - 1 && !loading && (
              <Button 
                endIcon={<ArrowForwardIcon />} 
                onClick={handleNext}
                variant="contained"
                sx={{ borderRadius: 3, px: { xs: 2, md: 4 }, bgcolor: '#6366f1' }}
              >
                Next
              </Button>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default OnboardingPage;

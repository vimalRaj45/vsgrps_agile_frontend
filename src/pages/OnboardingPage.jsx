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
import LottieIcon from '../components/shared/LottieIcon';

const steps = ['WELCOME', 'AI VISION', 'MAGIC REVEAL', 'TEAM SYNC', 'READY'];

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [aiPlan, setAiPlan] = useState([]);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleNext = () => {
    if (activeStep === 1) {
      setGenerating(true);
      setTimeout(() => {
        setAiPlan([
          { title: "Initialization", sub: "Setup project core and tech stack" },
          { title: "Architecture", sub: "Design database schemas and API" },
          { title: "MVP Development", sub: "Build primary features and logic" },
          { title: "Security Layer", sub: "Implement auth and encryption" },
          { title: "Deployment", sub: "CI/CD pipeline and cloud hosting" }
        ]);
        setGenerating(false);
        setActiveStep(2);
      }, 3000);
    } else if (activeStep === steps.length - 1) {
      navigate('/');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center', px: 2 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', position: 'relative' }}>
               <Box component="img" src="/assets/developer_hero.png" sx={{ width: '100%', maxWidth: 500, borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
            </Box>
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px', lineHeight: 1.1 }}>
              Step into the Future <br/> of Execution 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontWeight: 400, maxWidth: 500, mx: 'auto' }}>
              Welcome to Sprintora. We've eliminated the manual grind of project management so you can focus on building.
            </Typography>
            <Button 
              variant="contained" fullWidth={isMobile} size="large" onClick={handleNext}
              sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              Take the Tour
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} sx={{ textAlign: 'center', px: 2 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
               <Box component="img" src="/assets/hero_dashboard.png" sx={{ width: '100%', maxWidth: 700, borderRadius: 4, boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }} />
            </Box>
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Visualize Everything
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
              From high-level roadmaps to granular task tracking. Our AI keeps every project component perfectly synchronized across your entire team.
            </Typography>
            <Button 
              variant="contained" size="large" onClick={handleNext}
              sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 950, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              See AI Magic
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ textAlign: 'center', px: 2 }}>
            {generating ? (
              <Box sx={{ py: 10 }}>
                <LottieIcon src="https://lottie.host/8617d3d7-466d-495c-9799-a9a7a0b5a374/tV7H7G1R8f.json" style={{ width: 220, height: 220, margin: '0 auto' }} />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="950" sx={{ mt: 4 }}>
                  <Typewriter options={{ strings: ['Architecting Project...', 'Structuring Tasks...', 'Optimizing Velocity...'], autoStart: true, loop: true, delay: 40 }} />
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                <Typography variant={isMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
                  The Magic Reveal ⭐
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Our AI instantly converts high-level goals into actionable roadmaps.
                </Typography>
                
                <Stack spacing={1.5} sx={{ mb: 6, textAlign: 'left' }}>
                  {aiPlan.map((item, idx) => (
                    <Card key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
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
                <Button variant="contained" size="large" onClick={handleNext} sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900 }}>Continue Tour</Button>
              </Box>
            )}
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center', px: 2 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
               <LottieIcon src="https://lottie.host/80c2f623-e291-4560-84c2-25e2a222383c/7T07v6HkNo.json" style={{ width: 250, height: 250 }} />
            </Box>
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Seamless Team Sync
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
              Real-time comments, role-based access, and instant notifications. Everyone stays in sync, always.
            </Typography>
            <Button variant="contained" size="large" onClick={handleNext} sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900 }}>Finish Tour</Button>
          </Box>
        );
      case 4:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center', px: 2 }}>
            <Box sx={{ mb: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: '#10b981' }} />
            </Box>
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Ready to Launch! 🎉
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 8 }}>
              Experience the power of Sprintora today.
            </Typography>
            
            <Button 
              variant="contained" size="large" onClick={handleNext}
              fullWidth
              sx={{ 
                height: 80, borderRadius: 3, fontSize: '1.4rem', fontWeight: 950,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 30px 60px -15px rgba(99, 102, 241, 0.5)'
              }}
            >
              Go to App
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
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
    }}>
      {/* Aurora Background */}
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.01) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      
      {/* Header with Navigation */}
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', pt: 1 }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 2 } }}>
            <Stack 
              direction="row" 
              spacing={1} 
              alignItems="center" 
              sx={{ cursor: 'pointer' }} 
              onClick={() => navigate('/')}
            >
              <AutoAwesomeIcon sx={{ color: '#6366f1', fontSize: 20 }} />
              <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-1px' }}>Sprintora</Typography>
            </Stack>

            {!isMobile && (
              <Stepper activeStep={activeStep} sx={{ width: '50%' }}>
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
              size="small" 
              onClick={() => navigate('/login')}
              sx={{ color: 'text.secondary', fontWeight: 700, '&:hover': { color: 'white' } }}
            >
              Sign Out
            </Button>
          </Toolbar>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Box sx={{ width: '100%' }}>
          <AnimatePresence mode="wait">
            <Box key={activeStep} sx={{ width: '100%' }}>
              {renderContent()}
            </Box>
          </AnimatePresence>
        </Box>
      </Container>

      {/* Navigation Footer */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        bgcolor: 'rgba(3,7,18,0.8)', 
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        bottom: 0,
        zIndex: 10
      }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={handleBack} 
              disabled={activeStep === 0 || activeStep === 2 || activeStep === steps.length - 1}
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

            {activeStep !== steps.length - 1 && !generating && (
              <Button 
                endIcon={<ArrowForwardIcon />} 
                onClick={handleNext}
                variant="contained"
                sx={{ borderRadius: 2, px: 4, bgcolor: '#6366f1' }}
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

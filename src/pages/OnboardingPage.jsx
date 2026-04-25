import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Avatar, Grid, Card, IconButton, Stepper, Step, StepLabel,
  useTheme, useMediaQuery, Fade, Zoom, TextField, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText, Chip
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

const steps = ['OBJECTIVE', 'IDENTITY', 'ARCHITECT', 'READY'];

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [projectPrompt, setProjectPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [aiTasks, setAiTasks] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleNext = () => {
    if (activeStep === 0 && !projectPrompt) return;
    
    if (activeStep === 2) {
      setGenerating(true);
      setTimeout(() => {
        setAiTasks([
          "System Architecture Mapping",
          "Encrypted Database Initialization",
          "Auth Protocol Configuration",
          "Module Integration Check",
          "Performance Optimization"
        ]);
        setGenerating(false);
        setActiveStep((prev) => prev + 1);
      }, 4000);
    } else if (activeStep === steps.length - 1) {
      navigate('/');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center' }}>
            <Chip label="STEP 01" size="small" sx={{ mb: 3, fontWeight: 900, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }} />
            <Typography variant={isMobile ? "h3" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-3px' }}>
              DEFINE MISSION <br/> OBJECTIVE.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 6, px: 2 }}>
              What system are we architecting today? Tell our AI your core goals.
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={isMobile ? 3 : 4}
              placeholder="e.g. 'Build a secure SaaS dashboard for developers'"
              value={projectPrompt}
              onChange={(e) => setProjectPrompt(e.target.value)}
              sx={{ 
                maxWidth: 600, mb: 4, px: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4, bgcolor: 'rgba(255,255,255,0.01)',
                  fontSize: isMobile ? '1rem' : '1.25rem', p: isMobile ? 2 : 3
                }
              }}
            />
            <Box sx={{ px: 2 }}>
              <Button 
                variant="contained" fullWidth={isMobile} size="large" onClick={handleNext} disabled={!projectPrompt}
                endIcon={<ArrowForwardIcon />}
                sx={{ height: 64, px: 8, borderRadius: 4, fontWeight: 950, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
              >
                START ANALYSIS
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center' }}>
            <Chip label="STEP 02" size="small" sx={{ mb: 3, fontWeight: 900, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }} />
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              IDENTITY.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>Select your system avatar.</Typography>
            
            <Grid container spacing={isMobile ? 2 : 3} sx={{ justifyContent: 'center', mb: 8, px: 2 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item key={i}>
                  <Avatar 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 44}`} 
                    sx={{ 
                      width: isMobile ? 80 : 110, height: isMobile ? 80 : 110, cursor: 'pointer',
                      border: '3px solid transparent', '&:hover': { borderColor: '#6366f1', transform: 'scale(1.1)' },
                      transition: '0.3s'
                    }} 
                  />
                </Grid>
              ))}
            </Grid>
            
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', px: 2 }}>
              <Button onClick={handleBack} variant="outlined" sx={{ borderRadius: 3, px: 4 }}>BACK</Button>
              <Button onClick={handleNext} variant="contained" sx={{ borderRadius: 3, px: 6, fontWeight: 900 }}>CONFIRM</Button>
            </Stack>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LottieIcon 
                src="https://assets10.lottiefiles.com/packages/lf20_m6cu96.json" 
                style={{ width: isMobile ? 250 : 350, height: isMobile ? 250 : 350 }}
              />
              <Typography variant={isMobile ? "h4" : "h2"} fontWeight="950" sx={{ mt: 4, letterSpacing: '-2px' }}>
                <Typewriter
                  options={{
                    strings: ['ANALYZING...', 'ARCHITECTING...', 'ENCRYPTING...', 'INITIALIZING...'],
                    autoStart: true, loop: true, delay: 50
                  }}
                />
              </Typography>
            </Box>
            
            {!generating && (
              <Button 
                variant="contained" size="large" onClick={handleNext}
                sx={{ height: 64, px: 8, borderRadius: 4, fontWeight: 950, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
              >
                VIEW ROADMAP
              </Button>
            )}
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', px: 2 }}>
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-3px' }}>
              SYSTEM READY.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              AI Roadmap initialized for <strong>"{projectPrompt}"</strong>.
            </Typography>
            
            <Stack spacing={2} sx={{ mb: 8, textAlign: 'left' }}>
              {aiTasks.map((task, idx) => (
                <Card key={idx} data-aos="fade-right" data-aos-delay={idx * 150} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CheckCircleIcon sx={{ color: '#10b981' }} />
                    <Typography variant="body1" fontWeight="700">{task.toUpperCase()}</Typography>
                  </Stack>
                </Card>
              ))}
            </Stack>
            
            <Button 
              variant="contained" fullWidth size="large" onClick={handleNext}
              startIcon={<RocketLaunchIcon />}
              sx={{ height: 72, borderRadius: 4, fontSize: '1.2rem', fontWeight: 950, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              INITIALIZE WORKSPACE
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', bgcolor: '#020617', color: 'white',
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background elements */}
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.01) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ width: '100%', maxWidth: 800 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#6366f1' }, '&.Mui-completed': { color: '#10b981' } } }}>
                  {!isMobile && <Typography variant="caption" fontWeight="900">{label}</Typography>}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <Box key={activeStep} sx={{ width: '100%' }}>
              {renderStepContent(activeStep)}
            </Box>
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingPage;

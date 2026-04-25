import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Avatar, Grid, Card, IconButton, Stepper, Step, StepLabel,
  useTheme, useMediaQuery, Fade, Zoom, TextField, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText, Chip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SecurityIcon from '@mui/icons-material/Security';
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

  const handleNext = () => {
    if (activeStep === 0 && !projectPrompt) return;
    
    if (activeStep === 2) {
      setGenerating(true);
      setTimeout(() => {
        setAiTasks([
          "System Architecture & Core Logic Mapping",
          "Distributed Database Schema Initialization",
          "Encrypted Auth & Protocol Security",
          "Module Integration & Logic Verification",
          "Performance Profiling & Scalability Check"
        ]);
        setGenerating(false);
        setActiveStep((prev) => prev + 1);
      }, 3500);
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
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }} sx={{ textAlign: 'center' }}>
            <Chip label="STEP 01/04" size="small" sx={{ mb: 3, fontWeight: 900, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }} />
            <Typography variant="h2" fontWeight="950" gutterBottom sx={{ letterSpacing: '-4px', lineHeight: 1 }}>
              DEFINE YOUR <br/> MISSION OBJECTIVE.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 650, mx: 'auto', mb: 8, fontWeight: 400 }}>
              Specify your project goals. Our system will analyze your requirements and architect a professional management framework.
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="e.g. 'Deploy a secure fintech portal' or 'Scale a collaborative engineering hub'"
              value={projectPrompt}
              onChange={(e) => setProjectPrompt(e.target.value)}
              sx={{ 
                maxWidth: 700, 
                mb: 6,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 6,
                  bgcolor: 'rgba(255,255,255,0.01)',
                  fontSize: '1.25rem',
                  p: 4,
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover fieldset': { borderColor: 'rgba(99, 102, 241, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                }
              }}
            />
            <Box>
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleNext}
                disabled={!projectPrompt}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  height: 72, 
                  px: 8, 
                  borderRadius: 4, 
                  fontSize: '1.2rem',
                  fontWeight: 950,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)'
                }}
              >
                INITIALIZE ANALYSIS
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} sx={{ textAlign: 'center' }}>
             <Chip label="STEP 02/04" size="small" sx={{ mb: 3, fontWeight: 900, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }} />
            <Typography variant="h2" fontWeight="950" gutterBottom sx={{ letterSpacing: '-4px' }}>
              IDENTITY VERIFICATION
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>
              Select your system avatar for workspace recognition.
            </Typography>
            
            <Grid container spacing={4} sx={{ justifyContent: 'center', mb: 10 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item key={i}>
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Avatar 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 33}`} 
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        cursor: 'pointer',
                        border: '4px solid rgba(255,255,255,0.05)',
                        bgcolor: 'rgba(255,255,255,0.02)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#6366f1',
                          boxShadow: '0 15px 40px -10px rgba(99, 102, 241, 0.6)'
                        }
                      }} 
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            <Stack direction="row" spacing={3} sx={{ justifyContent: 'center' }}>
              <Button onClick={handleBack} variant="outlined" sx={{ borderRadius: 3, px: 5, height: 56, fontWeight: 800 }}>BACK</Button>
              <Button onClick={handleNext} variant="contained" sx={{ borderRadius: 3, px: 8, height: 56, fontWeight: 900 }}>CONFIRM IDENTITY</Button>
            </Stack>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ textAlign: 'center' }}>
             <Chip label="STEP 03/04" size="small" sx={{ mb: 3, fontWeight: 900, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }} />
            <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <LottieIcon 
                    src="https://assets10.lottiefiles.com/packages/lf20_m6cu96.json" 
                    style={{ width: 350, height: 350 }}
                  />
                </motion.div>
                {generating && (
                  <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={80} thickness={2} sx={{ color: '#6366f1' }} />
                  </Box>
                )}
              </Box>
              <Typography variant="h2" fontWeight="950" gutterBottom sx={{ mt: 4, letterSpacing: '-3px' }}>
                {generating ? 'ARCHITECTING SYSTEM...' : 'ARCHITECTING COMPLETE.'}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                Synthesizing modules and preparing your secure workspace environment.
              </Typography>
            </Box>
            
            {!generating && (
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleNext}
                sx={{ 
                  height: 72, 
                  px: 10, 
                  borderRadius: 4,
                  fontWeight: 950,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 20px 50px -10px rgba(99, 102, 241, 0.6)'
                }}
              >
                ACCESS ARCHITECTURE
              </Button>
            )}
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            <Chip label="STEP 04/04" size="small" sx={{ mb: 3, fontWeight: 900, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }} />
            <Typography variant="h2" fontWeight="950" gutterBottom sx={{ letterSpacing: '-5px', lineHeight: 1 }}>
              SYSTEM READY <br/> FOR DEPLOYMENT.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 10, fontWeight: 400 }}>
              Your professional management architecture for <strong>"{projectPrompt}"</strong> has been successfully initialized.
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 10 }}>
              {aiTasks.map((task, idx) => (
                <Grid item xs={12} key={idx}>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                    <Card sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(255,255,255,0.01)', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3
                    }}>
                      <CheckCircleIcon sx={{ color: '#10b981' }} />
                      <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>{task.toUpperCase()}</Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleNext}
              fullWidth
              startIcon={<RocketLaunchIcon />}
              sx={{ 
                height: 80, 
                borderRadius: 5,
                fontSize: '1.5rem',
                fontWeight: 950,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 30px 60px -15px rgba(99, 102, 241, 0.6)',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 35px 70px -15px rgba(99, 102, 241, 0.7)' }
              }}
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
      minHeight: '100vh', 
      bgcolor: '#020617',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Mesh & Orbs */}
      <Box sx={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0)',
        backgroundSize: '30px 30px',
        zIndex: 0
      }} />
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: '80%', 
        height: '80%', 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 12, display: 'flex', justifyContent: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ width: '100%', maxWidth: 1000 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel 
                  StepIconProps={{
                    sx: {
                      '&.Mui-active': { color: '#6366f1', transform: 'scale(1.3)' },
                      '&.Mui-completed': { color: '#10b981' },
                    }
                  }}
                >
                  {!isMobile && <Typography color="text.secondary" variant="caption" fontWeight="900" sx={{ letterSpacing: 2 }}>{label}</Typography>}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ minHeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

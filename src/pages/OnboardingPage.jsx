import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Avatar, Grid, Card, IconButton, Stepper, Step, StepLabel,
  useTheme, useMediaQuery, Fade, Zoom
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import GroupsIcon from '@mui/icons-material/Groups';
import LottieIcon from '../components/shared/LottieIcon';

const steps = ['Welcome', 'Your Profile', 'Management Tools', 'Get Started'];

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
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
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <LottieIcon 
                src="https://assets10.lottiefiles.com/packages/lf20_m6cu96.json" 
                style={{ width: 300, height: 300 }}
              />
            </Box>
            <Typography variant="h3" fontWeight="900" gutterBottom sx={{ 
              background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-2px'
            }}>
              Welcome to your Workspace
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              We're excited to have you here. VSGRPS Workspace is a professional management system designed to help your organization manage tasks, projects, and meetings securely.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                height: 56, 
                px: 6, 
                borderRadius: 4, 
                boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)',
                background: 'linear-gradient(45deg, #6366f1 0%, #4f46e5 100%)'
              }}
            >
              Start Setup
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="800" gutterBottom sx={{ letterSpacing: '-1px' }}>
              Let's personalize your profile
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
              Choose an avatar that represents you in the workspace.
            </Typography>
            
            <Grid container spacing={3} sx={{ justifyContent: 'center', mb: 6 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item key={i}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                      sx={{ 
                        width: 100, 
                        height: 100, 
                        cursor: 'pointer',
                        border: '4px solid transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)',
                          borderColor: 'primary.main',
                          boxShadow: '0 10px 30px -5px rgba(99, 102, 241, 0.4)'
                        }
                      }} 
                    />
                    {i === 1 && (
                      <Box sx={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        right: 0, 
                        bgcolor: 'success.main', 
                        borderRadius: '50%',
                        p: 0.5,
                        display: 'flex',
                        border: '2px solid white'
                      }}>
                        <CheckCircleIcon sx={{ fontSize: 16, color: 'white' }} />
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <Button onClick={handleBack} variant="outlined" sx={{ borderRadius: 3, px: 4 }}>Back</Button>
              <Button onClick={handleNext} variant="contained" sx={{ borderRadius: 3, px: 4 }}>Continue</Button>
            </Stack>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="800" gutterBottom sx={{ letterSpacing: '-1px' }}>
              Professional Management Tools
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
              Everything you need to manage your organizational workflow in one place.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 6 }}>
              {[
                { icon: <AssignmentIcon color="primary" />, title: 'Task Tracking', desc: 'Comprehensive management for your daily organizational tasks.' },
                { icon: <FolderIcon color="primary" />, title: 'Project Portfolio', desc: 'Monitor project health, milestones, and deliverables seamlessly.' },
                { icon: <SecurityIcon color="primary" />, title: 'Audit Governance', desc: 'Complete transparency with automated audit logs and secure data.' }
              ].map((f, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="glass-card" sx={{ p: 4, height: '100%', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'rgba(99, 102, 241, 0.1)' }}>{f.icon}</Box>
                    </Box>
                    <Typography variant="h6" fontWeight="700" gutterBottom>{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <Button onClick={handleBack} variant="outlined" sx={{ borderRadius: 3, px: 4 }}>Back</Button>
              <Button onClick={handleNext} variant="contained" sx={{ borderRadius: 3, px: 4 }}>Almost Ready</Button>
            </Stack>
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <LottieIcon 
                src="https://assets9.lottiefiles.com/packages/lf20_hzfmxvpx.json" 
                style={{ width: 350, height: 350 }}
              />
            </Box>
            <Typography variant="h3" fontWeight="900" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Your Workspace is Ready
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 5 }}>
              Your professional management system is initialized. Let's start organizing your organization.
            </Typography>
            
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleNext}
                startIcon={<AutoAwesomeIcon />}
                sx={{ 
                  height: 64, 
                  px: 8, 
                  borderRadius: 4,
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  boxShadow: '0 15px 30px -10px rgba(99, 102, 241, 0.6)',
                  background: 'linear-gradient(45deg, #6366f1 0%, #4f46e5 100%)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.7)',
                  }
                }}
              >
                Enter Workspace
              </Button>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at top right, #0f172a 0%, #020617 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background elements */}
      <Box sx={{ 
        position: 'absolute', 
        top: -100, 
        right: -100, 
        width: 400, 
        height: 400, 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -100, 
        left: -100, 
        width: 400, 
        height: 400, 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
        filter: 'blur(60px)'
      }} />

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ width: '100%', maxWidth: 800 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel 
                  StepIconProps={{
                    sx: {
                      '&.Mui-active': { color: 'primary.main' },
                      '&.Mui-completed': { color: 'success.main' },
                    }
                  }}
                >
                  {!isMobile && <Typography color="text.secondary" variant="caption" fontWeight="600">{label}</Typography>}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

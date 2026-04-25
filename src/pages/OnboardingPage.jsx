import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Avatar, Grid, Card, IconButton, Stepper, Step, StepLabel,
  useTheme, useMediaQuery, Fade, Zoom, TextField, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LottieIcon from '../components/shared/LottieIcon';

const steps = ['The Goal', 'Identity', 'AI Magic', 'Launch'];

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
      // Simulate AI generation
      setTimeout(() => {
        setAiTasks([
          "Initial project architecture & tech stack selection",
          "Database schema design & migration setup",
          "Authentication & Role-based access control",
          "MVP core feature implementation",
          "Final QA & Deployment pipeline setup"
        ]);
        setGenerating(false);
        setActiveStep((prev) => prev + 1);
      }, 3000);
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
            <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              What are we building today?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
              Tell our AI Architect your project idea, and we'll generate your first roadmap in seconds.
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="e.g., 'Build a food delivery app with React and Nodejs' or 'Organize my college hackathon team'"
              value={projectPrompt}
              onChange={(e) => setProjectPrompt(e.target.value)}
              sx={{ 
                maxWidth: 600, 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.02)',
                  fontSize: '1.2rem',
                  p: 3
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
                  height: 64, 
                  px: 8, 
                  borderRadius: 4, 
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                }}
              >
                Let's Architect It
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="900" gutterBottom sx={{ letterSpacing: '-1.5px' }}>
              Your Workspace Identity
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              How should your team see you in the workspace?
            </Typography>
            
            <Grid container spacing={3} sx={{ justifyContent: 'center', mb: 8 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item key={i}>
                  <Avatar 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} 
                    sx={{ 
                      width: 110, 
                      height: 110, 
                      cursor: 'pointer',
                      border: '4px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        borderColor: 'primary.main',
                        boxShadow: '0 10px 30px -5px rgba(99, 102, 241, 0.5)'
                      }
                    }} 
                  />
                </Grid>
              ))}
            </Grid>
            
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <Button onClick={handleBack} variant="outlined" sx={{ borderRadius: 3, px: 4, height: 50 }}>Back</Button>
              <Button onClick={handleNext} variant="contained" sx={{ borderRadius: 3, px: 6, height: 50 }}>Looks Good</Button>
            </Stack>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LottieIcon 
                src="https://assets10.lottiefiles.com/packages/lf20_m6cu96.json" 
                style={{ width: 300, height: 300 }}
              />
              <Typography variant="h4" fontWeight="950" gutterBottom sx={{ mt: 2 }}>
                {generating ? 'AI Architecting...' : 'Architecture Complete!'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Analyzing your requirements and structuring your workflow.
              </Typography>
            </Box>
            
            {generating ? (
               <CircularProgress sx={{ mb: 4 }} />
            ) : (
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleNext}
                sx={{ 
                  height: 64, 
                  px: 8, 
                  borderRadius: 4,
                  fontWeight: 900,
                  boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                }}
              >
                Reveal My Roadmap
              </Button>
            )}
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Ready for Liftoff! 🚀
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
              The AI has generated a 5-step roadmap for <strong>"{projectPrompt}"</strong>.
            </Typography>
            
            <Card className="glass-card" sx={{ p: 4, mb: 6, textAlign: 'left', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <List>
                {aiTasks.map((task, idx) => (
                  <ListItem key={idx} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#10b981' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={task} 
                      primaryTypographyProps={{ fontWeight: 700, fontSize: '1.1rem' }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
            
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleNext}
              fullWidth
              startIcon={<RocketLaunchIcon />}
              sx={{ 
                height: 72, 
                borderRadius: 4,
                fontSize: '1.3rem',
                fontWeight: 950,
                boxShadow: '0 30px 60px -15px rgba(99, 102, 241, 0.6)',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              }}
            >
              Enter My Workspace
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
      background: '#020617',
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
        width: 500, 
        height: 500, 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -100, 
        left: -100, 
        width: 500, 
        height: 500, 
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)',
        filter: 'blur(80px)'
      }} />

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ width: '100%', maxWidth: 900 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel 
                  StepIconProps={{
                    sx: {
                      '&.Mui-active': { color: '#6366f1', transform: 'scale(1.2)' },
                      '&.Mui-completed': { color: '#10b981' },
                    }
                  }}
                >
                  {!isMobile && <Typography color="text.secondary" variant="caption" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>{label}</Typography>}
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

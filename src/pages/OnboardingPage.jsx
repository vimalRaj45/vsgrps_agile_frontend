import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Avatar, Grid, Card, IconButton, Stepper, Step, StepLabel,
  useTheme, useMediaQuery, Fade, Zoom, TextField, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText, Chip, Divider, MobileStepper
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

const steps = ['WELCOME', 'WORKSPACE', 'MISSION', 'AI GEN', 'TEAM', 'READY'];

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [generating, setGenerating] = useState(false);
  const [aiPlan, setAiPlan] = useState([]);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleNext = () => {
    if (activeStep === 2) {
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
        setActiveStep(3);
      }, 3500);
    } else if (activeStep === steps.length - 1) {
      navigate('/');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const categories = ['Web App', 'Mobile App', 'College Project', 'Startup Product'];

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center', px: 2 }}>
            <Box sx={{ mb: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'center' }}>
              <LottieIcon 
                src="https://lottie.host/80c2f623-e291-4560-84c2-25e2a222383c/7T07v6HkNo.json" 
                style={{ width: isMobile ? 220 : 300, height: isMobile ? 220 : 300 }}
              />
            </Box>
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: isMobile ? '-1.5px' : '-3px', lineHeight: 1.1 }}>
              Welcome to <br/> Sprintora 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontWeight: 400, maxWidth: 450, mx: 'auto' }}>
              Let’s set up your workspace in under 60 seconds.
            </Typography>
            <Button 
              variant="contained" fullWidth={isMobile} size="large" onClick={handleNext}
              sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              Get Started
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} sx={{ textAlign: 'center', px: 2 }}>
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Workspace Name
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 6 }}>
              What should we call your team?
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. VSGRPS Team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              sx={{ 
                maxWidth: 500, mb: 6,
                '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)', fontSize: '1.2rem' }
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center', px: 2 }}>
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Define Mission
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Select a category or describe your goal.
            </Typography>
            
            <Grid container spacing={1} sx={{ justifyContent: 'center', mb: 4 }}>
              {categories.map(cat => (
                <Grid item key={cat}>
                  <Chip 
                    label={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    size={isMobile ? "small" : "medium"}
                    sx={{ 
                      px: isMobile ? 1 : 2, py: 2.5, borderRadius: 2, fontWeight: 800,
                      bgcolor: selectedCategory === cat ? '#6366f1' : 'rgba(255,255,255,0.05)',
                    }} 
                  />
                </Grid>
              ))}
            </Grid>

            <TextField
              fullWidth
              multiline
              rows={isMobile ? 2 : 3}
              placeholder="e.g. Certificate Verification System"
              value={projectGoal}
              onChange={(e) => setProjectGoal(e.target.value)}
              sx={{ 
                maxWidth: 600, mb: 6,
                '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)' }
              }}
            />
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ textAlign: 'center', px: 2 }}>
            {generating ? (
              <Box sx={{ py: 10 }}>
                <LottieIcon src="https://lottie.host/8617d3d7-466d-495c-9799-a9a7a0b5a374/tV7H7G1R8f.json" style={{ width: 220, height: 220, margin: '0 auto' }} />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="950" sx={{ mt: 4 }}>
                  <Typewriter options={{ strings: ['Architecting...', 'Structuring...', 'Finalizing...'], autoStart: true, loop: true, delay: 40 }} />
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                <Typography variant={isMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
                  Roadmap Reveal ⭐
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  AI architected a plan for <strong>{selectedCategory || 'Project'}</strong>.
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
              </Box>
            )}
          </Box>
        );
      case 4:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center', px: 2 }}>
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Add Your Team
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 6 }}>
              Collaboration is the key to velocity.
            </Typography>
            <TextField
              fullWidth
              placeholder="teammate@company.com"
              sx={{ 
                maxWidth: 500, mb: 6,
                '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)' }
              }}
            />
          </Box>
        );
      case 5:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center', px: 2 }}>
            <Box sx={{ mb: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: '#10b981' }} />
            </Box>
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              System Ready! 🎉
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              Your workspace <strong>"{teamName}"</strong> is live.
            </Typography>
            
            <Card sx={{ p: 3, mb: 6, bgcolor: 'rgba(16, 185, 129, 0.05)', border: '1px dashed #10b981', borderRadius: 3, maxWidth: 500, mx: 'auto' }}>
              <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 0.5 }}>First Mission</Typography>
              <Typography variant="caption" color="text.secondary">
                Move your first task to <strong>‘In Progress’</strong> to start the cycle.
              </Typography>
            </Card>

            <Button 
              variant="contained" size="large" onClick={handleNext}
              fullWidth
              sx={{ 
                height: 72, borderRadius: 3, fontSize: '1.2rem', fontWeight: 950,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              }}
            >
              Go to Dashboard
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
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)', pt: 1 }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="900" color="#6366f1">Sprintora</Typography>
            {!isMobile && (
              <Stepper activeStep={activeStep} sx={{ width: '60%' }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#6366f1' } } }}>
                      <Typography variant="caption" fontWeight="800" sx={{ opacity: 0.5 }}>{label}</Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            {isMobile && <Typography variant="caption" fontWeight="900" sx={{ opacity: 0.7 }}>STEP {activeStep + 1}/{steps.length}</Typography>}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Box sx={{ width: '100%' }}>
          <AnimatePresence mode="wait">
            <Box key={activeStep} sx={{ width: '100%' }}>
              {renderContent()}
            </Box>
          </AnimatePresence>
        </Box>
      </Container>

      {/* Navigation Footer for Mobile Friendly experience */}
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
              disabled={activeStep === 0 || activeStep === 3 || activeStep === steps.length - 1}
              sx={{ color: 'white', opacity: activeStep === 0 ? 0.3 : 0.8 }}
            >
              Back
            </Button>
            
            {isMobile && (
              <MobileStepper
                variant="dots"
                steps={steps.length}
                position="static"
                activeStep={activeStep}
                sx={{ bgcolor: 'transparent', flexGrow: 1, justifyContent: 'center', '& .MuiMobileStepper-dot': { bgcolor: 'rgba(255,255,255,0.1)' }, '& .MuiMobileStepper-dotActive': { bgcolor: '#6366f1' } }}
                backButton={null}
                nextButton={null}
              />
            )}

            {activeStep !== 0 && activeStep !== steps.length - 1 && !generating && (
              <Button 
                endIcon={<ArrowForwardIcon />} 
                onClick={handleNext}
                variant="contained"
                sx={{ borderRadius: 2, px: 4, bgcolor: '#6366f1' }}
              >
                {activeStep === 2 ? 'Generate' : 'Next'}
              </Button>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default OnboardingPage;

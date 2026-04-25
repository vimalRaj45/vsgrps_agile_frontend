import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Stack, 
  Avatar, Grid, Card, IconButton, Stepper, Step, StepLabel,
  useTheme, useMediaQuery, Fade, Zoom, TextField, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText, Chip, Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleNext = () => {
    if (activeStep === 2) {
      setGenerating(true);
      setTimeout(() => {
        setAiPlan([
          { title: "Initialization", sub: "Setup project core and tech stack" },
          { title: "Architecture", sub: "Design database schemas and API endpoints" },
          { title: "MVP Development", sub: "Build primary features and logic" },
          { title: "Security Layer", sub: "Implement auth and data encryption" },
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

  const categories = ['Web App', 'Mobile App', 'College Project', 'Startup Product'];

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <LottieIcon 
                src="https://assets10.lottiefiles.com/packages/lf20_m6cu96.json" 
                style={{ width: 300, height: 300 }}
              />
            </Box>
            <Typography variant="h2" fontWeight="950" gutterBottom sx={{ letterSpacing: '-3px' }}>
              Welcome to Sprintora 👋
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
              Let’s set up your workspace in under 60 seconds.
            </Typography>
            <Button 
              variant="contained" size="large" onClick={handleNext}
              sx={{ height: 68, px: 8, borderRadius: 4, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              Get Started
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Create Your Workspace
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              What should we call your team or organization?
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. VSGRPS Team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              sx={{ 
                maxWidth: 500, mb: 6,
                '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)', fontSize: '1.2rem', p: 1 }
              }}
            />
            <Box>
              <Button 
                variant="contained" size="large" onClick={handleNext} disabled={!teamName}
                sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900 }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              What are you building?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              Select a category or describe your goal below.
            </Typography>
            
            <Grid container spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
              {categories.map(cat => (
                <Grid item key={cat}>
                  <Chip 
                    label={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    sx={{ 
                      px: 3, py: 3, borderRadius: 3, fontWeight: 800,
                      bgcolor: selectedCategory === cat ? '#6366f1' : 'rgba(255,255,255,0.05)',
                      '&:hover': { bgcolor: selectedCategory === cat ? '#4f46e5' : 'rgba(255,255,255,0.1)' }
                    }} 
                  />
                </Grid>
              ))}
            </Grid>

            <TextField
              fullWidth
              placeholder="e.g. Certificate Verification System"
              value={projectGoal}
              onChange={(e) => setProjectGoal(e.target.value)}
              sx={{ 
                maxWidth: 600, mb: 6,
                '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)', fontSize: '1.2rem' }
              }}
            />
            
            <Box>
              <Button 
                variant="contained" size="large" onClick={handleNext} disabled={!projectGoal && !selectedCategory}
                sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 950, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
              >
                Architect My Project
              </Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ textAlign: 'center' }}>
            {generating ? (
              <Box sx={{ py: 10 }}>
                <LottieIcon src="https://assets9.lottiefiles.com/packages/lf20_m6cu96.json" style={{ width: 250, height: 250, margin: '0 auto' }} />
                <Typography variant="h4" fontWeight="950" sx={{ mt: 4 }}>
                  <Typewriter
                    options={{
                      strings: ['Generating your project plan...', 'Analyzing goals...', 'Structuring tasks...'],
                      autoStart: true, loop: true, delay: 40
                    }}
                  />
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
                  The WOW Moment ⭐
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                  Our AI has architected a complete roadmap for your <strong>{selectedCategory || 'Project'}</strong>.
                </Typography>
                
                <Stack spacing={2} sx={{ mb: 6, textAlign: 'left' }}>
                  {aiPlan.map((item, idx) => (
                    <Card key={idx} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', p: 1.5, borderRadius: 2 }}>
                          <CheckCircleIcon sx={{ color: '#10b981' }} />
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight="900">{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.sub}</Typography>
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
                
                <Button 
                  variant="contained" size="large" onClick={handleNext} fullWidth
                  sx={{ height: 72, borderRadius: 4, fontWeight: 950, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
                >
                  Continue to Team Setup
                </Button>
              </Box>
            )}
          </Box>
        );
      case 4:
        return (
          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>
              Invite Your Team
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              Sprintora is better with teammates. Add them now or skip to dashboard.
            </Typography>
            <TextField
              fullWidth
              placeholder="teammate@company.com"
              sx={{ 
                maxWidth: 500, mb: 6,
                '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)' }
              }}
            />
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <Button variant="outlined" size="large" onClick={handleNext} sx={{ height: 64, px: 6, borderRadius: 3 }}>Skip for now</Button>
              <Button 
                variant="contained" size="large" onClick={handleNext}
                sx={{ height: 64, px: 8, borderRadius: 3, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
              >
                Send Invites
              </Button>
            </Stack>
          </Box>
        );
      case 5:
        return (
          <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 100, color: '#10b981' }} />
            </Box>
            <Typography variant="h2" fontWeight="950" gutterBottom sx={{ letterSpacing: '-3px' }}>
              You're all set! 🎉
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>
              Your workspace <strong>"{teamName}"</strong> is ready to launch.
            </Typography>
            
            <Card sx={{ p: 4, mb: 8, bgcolor: 'rgba(16, 185, 129, 0.05)', border: '1px dashed #10b981', borderRadius: 4, maxWidth: 600, mx: 'auto' }}>
              <Typography variant="h6" fontWeight="900" sx={{ mb: 1 }}>Pro Tip: Your First Action</Typography>
              <Typography variant="body2" color="text.secondary">
                Navigate to your tasks and try moving your first AI-generated task to <strong>‘In Progress’</strong> to get the momentum started.
              </Typography>
            </Card>

            <Button 
              variant="contained" size="large" onClick={handleNext}
              fullWidth
              sx={{ 
                height: 80, borderRadius: 4, fontSize: '1.4rem', fontWeight: 950,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 30px 60px -15px rgba(99, 102, 241, 0.5)'
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
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden'
    }}>
      {/* Aurora Background */}
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.01) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
        filter: 'blur(120px)', zIndex: 0 
      }} />

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ width: '100%', maxWidth: 1000 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: '#6366f1' }, '&.Mui-completed': { color: '#10b981' } } }}>
                  {!isMobile && <Typography color="text.secondary" variant="caption" fontWeight="900" sx={{ letterSpacing: 1 }}>{label}</Typography>}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <Box key={activeStep} sx={{ width: '100%' }}>
              {renderContent()}
            </Box>
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingPage;

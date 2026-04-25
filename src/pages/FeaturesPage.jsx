import React from 'react';
import { Box, Container, Typography, Grid, Stack, Card, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const FeaturesPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const allFeatures = [
    { icon: <AutoAwesomeIcon />, title: 'AI Task Generation', desc: 'Turn vague ideas into structured tasks with neural decomposition.' },
    { icon: <AssignmentIcon />, title: 'Smart Kanban', desc: 'Visual task management with intelligent state transitions.' },
    { icon: <GroupsIcon />, title: 'Team Collaboration', desc: 'Real-time updates and seamless communication for high-velocity teams.' },
    { icon: <BarChartIcon />, title: 'Deep Analytics', desc: 'Track velocity, burnout, and performance with data-driven insights.' },
    { icon: <SecurityIcon />, title: 'Enterprise Security', desc: 'Data isolation and encryption at every layer of the infrastructure.' },
    { icon: <SpeedIcon />, title: 'Instant Execution', desc: 'Zero-latency workspace updates and AI-accelerated roadmapping.' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', py: 15 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="overline" fontWeight="900" color="#6366f1" sx={{ letterSpacing: 4 }}>CAPABILITIES</Typography>
          <Typography variant="h2" fontWeight="950" sx={{ letterSpacing: '-2px', mb: 3 }}>Engineered for <br/> Peak Performance.</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Sprintora combines neural intelligence with agile best practices to give you the ultimate execution environment.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {allFeatures.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ 
                p: 6, borderRadius: 5, bgcolor: 'background.paper', border: `1px solid ${theme.palette.divider}`,
                height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', borderColor: '#6366f1' }
              }}>
                <Box sx={{ mb: 3, display: 'inline-flex', p: 2, borderRadius: 3, bgcolor: 'rgba(99, 102, 241, 0.05)', color: '#6366f1' }}>{f.icon}</Box>
                <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>{f.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{f.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 15, p: 8, borderRadius: 6, bgcolor: 'rgba(99, 102, 241, 0.05)', textAlign: 'center', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
          <Typography variant="h3" fontWeight="950" gutterBottom>Ready to ship?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.2rem' }}>Experience the full power of Sprintora AI today.</Typography>
          <Button 
            variant="contained" size="large" onClick={() => navigate('/register')}
            sx={{ height: 72, px: 8, borderRadius: 3, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
          >
            Create Your Workspace
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesPage;

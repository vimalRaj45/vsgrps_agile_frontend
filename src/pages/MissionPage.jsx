import React from 'react';
import { Box, Container, Typography, Stack, Grid, Card, Button, useTheme, Avatar, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MissionPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box sx={{ py: { xs: 10, md: 20 }, position: 'relative', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, backgroundImage: 'radial-gradient(#6366f1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Chip label="OUR MISSION" sx={{ fontWeight: 900, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }} />
            <Typography variant="h1" fontWeight="950" sx={{ letterSpacing: '-3px', fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 1 }}>
              Why we built <br/>
              <Box component="span" sx={{ background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sprintora.</Box>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, fontWeight: 400, lineHeight: 1.6 }}>
              Project management shouldn't feel like a second job. We built Sprintora to kill the chaos and let builders focus on what matters: Building.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* The Problem Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-1.5px' }}>The Jira Burnout.</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.2rem', lineHeight: 1.8 }}>
              For years, we watched teams spend more time "managing" tasks than actually executing them. Complex menus, cluttered boards, and manual planning were draining developer energy. We knew there was a better way.
            </Typography>
            <Stack spacing={3}>
              {[
                { icon: <CodeIcon />, title: 'Developer First', desc: 'Tools should speak the language of builders, not just project managers.' },
                { icon: <AutoAwesomeIcon />, title: 'AI-Native', desc: 'Why plan manually when a neural engine can architect your roadmap in seconds?' }
              ].map((item, i) => (
                <Stack key={i} direction="row" spacing={3} alignItems="flex-start">
                  <Box sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', p: 1.5, borderRadius: 2, color: '#6366f1' }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="h6" fontWeight="900">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="img" src="/assets/developer_hero.png" sx={{ width: '100%', borderRadius: 6, boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }} />
          </Grid>
        </Grid>
      </Container>

      {/* The Vision Section */}
      <Box sx={{ py: 15, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)', borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { title: 'Velocity', value: '10x', desc: 'Faster planning cycles.' },
              { title: 'Focus', value: '0', desc: 'Distraction-free UI.' },
              { title: 'Intelligence', value: '100%', desc: 'AI-driven insights.' }
            ].map((stat, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ p: 6, borderRadius: 4, textAlign: 'center', bgcolor: 'background.paper', border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h2" fontWeight="950" sx={{ color: '#6366f1', mb: 1 }}>{stat.value}</Typography>
                  <Typography variant="h6" fontWeight="900" sx={{ mb: 1 }}>{stat.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>Join the execution revolution.</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.2rem' }}>
          Stop managing. Start building. Sprintora is here to be your co-pilot from idea to execution.
        </Typography>
        <Button 
          variant="contained" size="large" onClick={() => navigate('/register')}
          sx={{ height: 72, px: 8, borderRadius: 3, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', fontSize: '1.1rem' }}
          endIcon={<ArrowForwardIcon />}
        >
          Get Started for Free
        </Button>
      </Container>
    </Box>
  );
};

export default MissionPage;

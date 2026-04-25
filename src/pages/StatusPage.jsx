import React from 'react';
import { Box, Container, Typography, Stack, Grid, Card, useTheme, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TimerIcon from '@mui/icons-material/Timer';

const StatusPage = () => {
  const theme = useTheme();

  const systems = [
    { name: 'AI Planning Engine', status: 'Operational', uptime: '99.9%' },
    { name: 'Workspace API', status: 'Operational', uptime: '100%' },
    { name: 'Real-time Sync', status: 'Operational', uptime: '99.9%' },
    { name: 'Auth Service', status: 'Operational', uptime: '100%' },
    { name: 'Storage Engine', status: 'Operational', uptime: '100%' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', py: 12 }}>
      <Container maxWidth="md">
        <Stack spacing={2} sx={{ mb: 8, textAlign: 'center' }}>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <AutoAwesomeIcon sx={{ color: '#6366f1' }} />
            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: '-1px' }}>Sprintora Systems</Typography>
          </Stack>
          <Typography variant="h2" fontWeight="950" sx={{ letterSpacing: '-2px' }}>All systems go.</Typography>
          <Typography variant="body1" color="text.secondary">Real-time status updates for our neural infrastructure.</Typography>
        </Stack>

        <Card sx={{ p: 0, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper', overflow: 'hidden' }}>
          <Box sx={{ p: 4, bgcolor: 'rgba(16, 185, 129, 0.05)', borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', gap: 2 }}>
            <CheckCircleIcon sx={{ color: '#10b981' }} />
            <Typography variant="h6" fontWeight="900">Sprintora is fully operational.</Typography>
          </Box>
          <Stack divider={<Box sx={{ borderBottom: `1px solid ${theme.palette.divider}` }} />}>
            {systems.map((system, i) => (
              <Box key={i} sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" fontWeight="700">{system.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TimerIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">{system.uptime} Uptime</Typography>
                  </Stack>
                </Box>
                <Chip label={system.status} size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 800 }} />
              </Box>
            ))}
          </Stack>
        </Card>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ letterSpacing: 2 }}>
            LAST CHECKED: {new Date().toLocaleTimeString()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default StatusPage;

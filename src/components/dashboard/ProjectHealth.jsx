import React from 'react';
import { Box, Typography, Grid, Chip, LinearProgress, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const ProjectHealth = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Project Delivery Health</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        High-level overview of project completion status for stakeholders.
      </Typography>
      
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 3, 
              bgcolor: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-2px)', bgcolor: 'rgba(255,255,255,0.04)' }
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="800">{project.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {project.done_tasks} of {project.total_tasks} milestones completed
                  </Typography>
                </Box>
                <Chip 
                  label={project.status} 
                  size="small"
                  color={project.status === 'Completed' ? 'success' : project.status === 'Active' ? 'primary' : 'warning'}
                  sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}
                />
              </Stack>
              
              <Box sx={{ position: 'relative', pt: 1 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="caption" fontWeight="700">{project.percent}% Completed</Typography>
                  <Typography variant="caption" color={project.percent > 80 ? 'success.main' : 'text.secondary'}>
                    {project.percent > 90 ? 'Finishing Phase' : project.percent > 50 ? 'In Progress' : 'Early Phase'}
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={project.percent} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: project.percent === 100 
                        ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                        : 'linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%)'
                    }
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectHealth;

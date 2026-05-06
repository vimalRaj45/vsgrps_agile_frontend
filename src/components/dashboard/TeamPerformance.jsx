import React from 'react';
import { Box, Typography, Avatar, LinearProgress, Stack, Paper } from '@mui/material';

const TeamPerformance = ({ performance }) => {
  if (!performance || performance.length === 0) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Team Performance</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Tasks completed vs pending by team member
      </Typography>
      <Stack spacing={3}>
        {performance.map((user) => {
          const total = user.completed_tasks + user.pending_tasks;
          const percent = total > 0 ? (user.completed_tasks / total) * 100 : 0;
          
          return (
            <Box key={user.id}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight="700">{user.name}</Typography>
                    <Typography variant="caption" fontWeight="800">
                      {user.completed_tasks} Done / {user.pending_tasks} Left
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={percent} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%)'
                  }
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TeamPerformance;

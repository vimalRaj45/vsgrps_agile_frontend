import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';

const StatsCard = ({ title, value, icon, trend, critical }) => {
  return (
    <Card className="glass-card" sx={{ height: '100%', border: critical ? '1px solid rgba(239, 68, 68, 0.2)' : undefined }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 1.5, 
            bgcolor: critical ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid',
            borderColor: critical ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.08)',
            display: 'flex' 
          }}>
            {icon}
          </Box>
          {trend && (
            <Typography 
              variant="caption" 
              fontWeight="700" 
              sx={{ 
                color: critical ? 'error.main' : 'primary.light',
                bgcolor: critical ? 'rgba(239, 68, 68, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                px: 1.5,
                py: 0.5,
                borderRadius: 1
              }}
            >
              {trend}
            </Typography>
          )}
        </Stack>
        <Box>
          <Typography variant="h3" fontWeight="800" letterSpacing="-1px" sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ mt: 0.5 }}>
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

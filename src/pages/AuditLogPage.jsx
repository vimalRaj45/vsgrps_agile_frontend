import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import AuditLogTable from '../components/shared/AuditLogTable';
import HistoryIcon from '@mui/icons-material/History';

const AuditLogPage = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 5 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 3, 
          bgcolor: 'rgba(99, 102, 241, 0.1)', 
          display: 'flex' 
        }}>
          <HistoryIcon color="primary" sx={{ fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="800" letterSpacing="-1px" sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' } }}>
            Audit Log
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1.25rem' } }}>
            Trace every action and change across your organization.
          </Typography>
        </Box>
      </Stack>

      <AuditLogTable />
    </Box>
  );
};

export default AuditLogPage;

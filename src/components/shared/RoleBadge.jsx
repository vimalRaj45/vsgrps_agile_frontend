import React from 'react';
import { Chip } from '@mui/material';

const RoleBadge = ({ role }) => {
  const getColor = (r) => {
    switch(r) {
      case 'Admin': return 'error';
      case 'Member': return 'primary';
      case 'Viewer': return 'default';
      default: return 'default';
    }
  };

  return (
    <Chip 
      label={role} 
      size="small" 
      color={getColor(role)} 
      sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.65rem' }} 
    />
  );
};

export default RoleBadge;

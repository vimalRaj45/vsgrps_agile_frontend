import React from 'react';
import { Box } from '@mui/material';

const BrandLogo = ({ size = 24, borderRadius = '0', sx = {} }) => {
  return (
    <Box
      component="img"
      src="/favicon.png"
      alt="Sprintora Logo"
      sx={{
        width: size,
        height: size,
        borderRadius: borderRadius,
        objectFit: 'contain',
        ...sx
      }}
    />
  );
};

export default BrandLogo;

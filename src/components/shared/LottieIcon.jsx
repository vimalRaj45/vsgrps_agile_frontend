import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import LottieComponent from 'lottie-react'; // We will use the standard import but handle the warning in config if needed, or check for light.


// Handle potential ESM/CommonJS module mismatch
const Lottie = LottieComponent.default || LottieComponent;

const LottieIcon = ({ animationData, src, loop = true, style = { width: 100, height: 100 }, ...props }) => {
  const [data, setData] = React.useState(animationData);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (src && !animationData) {
      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          // Relaxed check for content type as some CDNs vary
          return res.json();
        })
        .then((json) => setData(json))
        .catch((err) => {
          console.error('Failed to load lottie animation:', err);
          setError(true);
        });
    }
  }, [src, animationData]);

  if (error) return (
    <Box sx={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
      <Typography variant="caption" color="text.disabled">Animation failed</Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}>
      {data ? (
        <LottieComponent animationData={data} loop={loop} {...props} />
      ) : (
        <CircularProgress size={24} thickness={2} sx={{ color: 'rgba(255,255,255,0.1)' }} />
      )}
    </Box>
  );
};

export default LottieIcon;

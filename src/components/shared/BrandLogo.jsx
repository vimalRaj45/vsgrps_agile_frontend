import { Box } from '@mui/material';
import { useAppTheme } from '../../context/ThemeContext';

const BrandLogo = ({ size = 24, borderRadius = '0', sx = {} }) => {
  const { mode } = useAppTheme();
  const logoSrc = mode === 'light' ? '/logo_light.png' : '/logo_dark.png';

  return (
    <Box
      component="img"
      src={logoSrc}
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

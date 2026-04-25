import { createTheme } from '@mui/material/styles';

/**
 * PREMIUM BLUE & WHITE THEME (60-30-10)
 * Dark: Midnight Blue (#020617) -> Navy (#0f172a) -> Electric Blue (#3b82f6)
 * Light: White (#ffffff) -> Sky Tint (#f0f9ff) -> Royal Blue (#1d4ed8)
 */

const baseThemeConfig = {
  typography: {
    fontFamily: '"Outfit", "Inter", -apple-system, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 800, letterSpacing: '-0.025em' },
    h3: { fontWeight: 700, letterSpacing: '-0.025em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 500, letterSpacing: '0.01em' },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px -8px rgba(59, 130, 246, 0.4)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(15, 23, 42, 0.6)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(59, 130, 246, 0.3)',
            boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderRadius: '8px',
          },
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...baseThemeConfig,
  palette: {
    mode: 'dark',
    primary: { 
      main: '#3b82f6', // Electric Blue
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: { 
      main: '#0ea5e9', // Cyan Blue
    },
    background: { 
      default: '#020617', // Midnight
      paper: '#0f172a',   // Navy
    },
    text: { 
      primary: '#f8fafc', 
      secondary: '#94a3b8', 
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    action: {
      hover: 'rgba(59, 130, 246, 0.08)',
    }
  },
});

export const lightTheme = createTheme({
  ...baseThemeConfig,
  palette: {
    mode: 'light',
    primary: { 
      main: '#2563eb', // Royal Blue
    },
    secondary: { 
      main: '#0284c7', 
    },
    background: { 
      default: '#ffffff', 
      paper: '#f8fafc',   // Sky Tint
    },
    text: { 
      primary: '#0f172a', 
      secondary: '#475569', 
    },
    divider: 'rgba(0, 0, 0, 0.06)',
    action: {
      hover: 'rgba(37, 99, 235, 0.04)',
    }
  },
  components: {
    ...baseThemeConfig.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px -20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  }
});

export default darkTheme;


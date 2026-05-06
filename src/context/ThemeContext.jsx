import React, { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '../theme';

const ThemeContext = createContext();

export const useAppTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  // Inject CSS variables for non-MUI elements/classes
  useMemo(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.style.setProperty('--bg-base', '#020617');
      root.style.setProperty('--bg-surface', '#0f172a');
      root.style.setProperty('--text-primary', '#f8fafc');
      root.style.setProperty('--glass-bg', 'rgba(15, 23, 42, 0.7)');
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.05)');
    } else {
      root.style.setProperty('--bg-base', '#f8fafc');
      root.style.setProperty('--bg-surface', '#ffffff');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.05)');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

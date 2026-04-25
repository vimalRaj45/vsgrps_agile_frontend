import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';

const BottomNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  if (!isMobile) return null;

  const getActiveValue = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path.startsWith('/projects')) return 1;
    if (path.startsWith('/tasks')) return 2;
    if (path.startsWith('/meetings')) return 3;
    if (path.startsWith('/files')) return 4;
    return 0;
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        borderRadius: 0, // Proper rectangle
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' ? '0 -10px 40px rgba(0,0,0,0.5)' : '0 -4px 20px rgba(0,0,0,0.08)',
        borderTop: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
        backdropFilter: 'blur(20px)',
        pb: 'env(safe-area-inset-bottom)',
        borderRadius: 0
      }} 
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={getActiveValue()}
        onChange={(event, newValue) => {
          const paths = ['/', '/projects', '/tasks', '/meetings', '/files'];
          navigate(paths[newValue]);
        }}
        sx={{ 
          height: 70,
          bgcolor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
            minWidth: 0,
            padding: '12px 0',
            '&.Mui-selected': {
              color: 'primary.main',
              fontWeight: 900,
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.2)',
                transition: 'transform 0.2s ease'
              }
            }
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Projects" icon={<FolderIcon />} />
        <BottomNavigationAction label="Tasks" icon={<AssignmentIcon />} />
        <BottomNavigationAction label="Meetings" icon={<GroupsIcon />} />
        <BottomNavigationAction label="Files" icon={<DescriptionIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;

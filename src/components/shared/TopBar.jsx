import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Tooltip, Stack, Dialog
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';
import client from '../../api/client';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import LinearProgress from '@mui/material/LinearProgress';

const drawerWidth = 280;

const TopBar = ({ handleDrawerToggle }) => {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useAppTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [storage, setStorage] = useState(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  React.useEffect(() => {
    const fetchStorage = async () => {
      try {
        const res = await client.get('/files/storage');
        setStorage(res.data);
      } catch (err) {
        console.error('Failed to fetch storage');
      }
    };
    fetchStorage();

    const handleRefresh = () => fetchStorage();
    window.addEventListener('storage-refresh', handleRefresh);

    const interval = setInterval(fetchStorage, 30000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage-refresh', handleRefresh);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      className="glass-nav"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },

        color: 'text.primary',
        boxShadow: 'none',
        height: 72,
        justifyContent: 'center',
        bgcolor: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: 2
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%', maxWidth: 400 }}>
          <SearchBar />
        </Box>

        <IconButton 
          sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} 
          color="inherit"
          onClick={() => setMobileSearchOpen(true)}
        >
          <SearchIcon />
        </IconButton>

        <Dialog 
          open={mobileSearchOpen} 
          onClose={() => setMobileSearchOpen(false)}
          fullScreen
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Box sx={{ p: 2, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <IconButton onClick={() => setMobileSearchOpen(false)} color="inherit">
                <MenuIcon sx={{ transform: 'rotate(90deg)' }} />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">Search Workspace</Typography>
            </Stack>
            <SearchBar standalone={true} onSelect={() => setMobileSearchOpen(false)} />
          </Box>
        </Dialog>




        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2.5 }}>

          {storage && (
            <Tooltip title={`Global Storage Used: ${storage.usedFormatted} of ${storage.limitFormatted}`}>
              <Box sx={{ 
                display: { xs: 'none', lg: 'flex' }, 
                alignItems: 'center', 
                gap: 1.5,
                bgcolor: 'rgba(59, 130, 246, 0.05)',
                px: 2,
                py: 0.8,
                borderRadius: 4,
                border: '1px solid rgba(59, 130, 246, 0.1)'
              }}>
                <StorageIcon sx={{ fontSize: 16, color: storage.percent > 90 ? 'error.main' : 'primary.main' }} />
                <Box sx={{ minWidth: 80 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" fontWeight="800" sx={{ fontSize: '0.65rem' }}>
                      {storage.percent.toFixed(4)}% Used
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(storage.percent, 100)} 
                    sx={{ 
                      height: 4, 
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%)'
                      }
                    }}
                  />
                </Box>
              </Box>
            </Tooltip>
          )}

          <Tooltip title="Toggle light/dark mode">
            <IconButton onClick={toggleTheme} color="inherit" sx={{ 
              bgcolor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              p: { xs: 0.5, sm: 1 },
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {mode === 'dark' ? <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
            </IconButton>
          </Tooltip>

          <NotificationBell />

          <Box 
            sx={{ 
              ml: 1, 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              p: { xs: '2px', sm: '4px 12px 4px 6px' },
              borderRadius: 6,
              transition: 'all 0.2s ease',
              border: '1px solid transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.1)'
              }
            }} 
            onClick={handleMenuOpen}
          >
            <Avatar 
              sx={{ 
                width: { xs: 32, sm: 36 }, 
                height: { xs: 32, sm: 36 }, 
                bgcolor: 'primary.main', 
                fontSize: 14,
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <Box sx={{ ml: 1.5, display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" fontWeight="700">
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.5 }}>
                {user?.role}
              </Typography>
            </Box>
          </Box>
        </Stack>


        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 4,
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.08)'
            }
          }}
        >
          <MenuItem onClick={() => { navigate('/settings'); handleMenuClose(); }} sx={{ py: 1.5, borderRadius: 2, mx: 1 }}>
            <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
            <Typography variant="body2" fontWeight="600">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() => { navigate('/settings'); handleMenuClose(); }} sx={{ py: 1.5, borderRadius: 2, mx: 1 }}>
            <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
            <Typography variant="body2" fontWeight="600">Account Settings</Typography>
          </MenuItem>
          <Box sx={{ my: 1, borderTop: '1px solid', borderColor: 'divider' }} />
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, borderRadius: 2, mx: 1, color: 'error.main' }}>
            <ListItemIcon><LogoutIcon fontSize="small" color="inherit" /></ListItemIcon>
            <Typography variant="body2" fontWeight="600">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const ListItemIcon = ({ children }) => (
  <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>{children}</Box>
);

export default TopBar;

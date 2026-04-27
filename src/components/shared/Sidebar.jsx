import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography, Stack, Avatar, Chip, LinearProgress
} from '@mui/material';
import client from '../../api/client';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useAuth } from '../../context/AuthContext';
import { can } from '../../utils/rbac';

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [storage, setStorage] = React.useState(null);

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

    // Refresh storage info occasionally
    const interval = setInterval(fetchStorage, 30000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage-refresh', handleRefresh);
    };
  }, []);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 22 }} />, path: '/' },
    { text: 'Projects', icon: <FolderIcon sx={{ fontSize: 22 }} />, path: '/projects' },
    { text: 'Tasks', icon: <AssignmentIcon sx={{ fontSize: 22 }} />, path: '/tasks' },
    { text: 'Meetings', icon: <GroupsIcon sx={{ fontSize: 22 }} />, path: '/meetings' },
    { text: 'Files', icon: <DescriptionIcon sx={{ fontSize: 22 }} />, path: '/files' },
    { text: 'Reports', icon: <AssessmentIcon sx={{ fontSize: 22 }} />, path: '/reports' },
    { text: 'Users', icon: <PeopleIcon sx={{ fontSize: 22 }} />, path: '/users', permission: 'audit:view' },
    { text: 'Audit Log', icon: <HistoryIcon sx={{ fontSize: 22 }} />, path: '/audit', permission: 'audit:view' },
    { text: 'Settings', icon: <SettingsIcon sx={{ fontSize: 22 }} />, path: '/settings' },
    { text: 'User Guide', icon: <HelpIcon sx={{ fontSize: 22 }} />, path: '/guide' },
  ];

  const filteredMenuItems = menuItems.filter(item => !item.permission || can(user?.role, item.permission));

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      {/* Brand Section */}
      <Box sx={{ px: 2, py: 3, mb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ 
            bgcolor: 'primary.main', 
            p: 0.8, 
            borderRadius: 1.5,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            display: 'flex'
          }}>
            <img src="/favicon.png" alt="VSGRPS Logo" style={{ width: 24, height: 24, borderRadius: '4px' }} />
          </Box>
          <Typography variant="h5" fontWeight="800" letterSpacing="-1px">
            Sprintora
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontWeight: 600, ml: 6 }}>
          by VSGRPS Technologies
        </Typography>
      </Box>

      {/* Menu List */}
      <List sx={{ px: 0 }}>
        {filteredMenuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (mobileOpen) handleDrawerToggle();
                }}
                selected={active}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2.5,
                  transition: 'all 0.2s ease',
                  border: '1px solid transparent',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(59, 130, 246, 0.1)',
                    color: 'primary.main',
                    borderColor: 'rgba(59, 130, 246, 0.2)',
                    '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.15)' },
                    '& .MuiListItemIcon-root': { color: 'primary.main' }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  slotProps={{ 
                    primaryTypography: { 
                      fontWeight: active ? 700 : 500,
                      fontSize: '0.95rem'
                    } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Storage & Organization Info */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        {storage && (
          <Box sx={{ 
            mb: 2, 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" fontWeight="700">Workspace Health</Typography>
              <Typography variant="caption" fontWeight="800" color={storage.percent > 90 ? 'error' : 'primary'}>
                {storage.percent.toFixed(4)}% Used
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(storage.percent, 100)} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.05)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: storage.percent > 90 
                    ? 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)'
                    : 'linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%)'
                }
              }}
            />
          </Box>
        )}

        <Box sx={{ 
          p: 2, 
          borderRadius: 2, 
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
            Organization
          </Typography>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 14 }}>
              {user?.company_name?.charAt(0) || 'C'}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="700" noWrap>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.2, fontWeight: 600 }}>
                {user?.company_name || 'Organization'}
              </Typography>
              <Chip 
                label={user?.role || 'Developer'} 
                size="small" 
                sx={{ 
                  height: 18, 
                  fontSize: '0.6rem', 
                  fontWeight: 900, 
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%)',
                  color: 'white',
                  border: 'none',
                  mt: 0.8
                }} 
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            backgroundImage: 'none',
            bgcolor: 'background.default',
            borderRight: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            backgroundImage: 'none', 
            borderRight: 'none',
            bgcolor: 'transparent', // Let the global gradient show through
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;

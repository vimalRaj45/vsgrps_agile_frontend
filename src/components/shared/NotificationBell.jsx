import React, { useState, useEffect, useCallback } from 'react';
import { IconButton, Badge, Popover, List, ListItem, ListItemButton, ListItemText, Typography, Box, Divider, Button, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import client from '../../api/client';

import { useNotifications } from '../../context/NotificationContext';

const NotificationBell = () => {
  const { notifications, unreadCount, fetchNotifications, markAsRead } = useNotifications();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications(); // Refresh on click
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (id, link) => {
    await markAsRead(id);
    if (link) {
      navigate(link);
      handleClose();
    }
  };


  return (
    <>
      <IconButton color="inherit" onClick={handleClick} sx={{ 
        bgcolor: unreadCount > 0 ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
        transition: 'all 0.3s ease'
      }}>
        <Badge badgeContent={unreadCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="900">Notifications</Typography>
            {unreadCount > 0 && (
               <Typography variant="caption" color="primary" fontWeight="bold">
                 {unreadCount} New
               </Typography>
            )}
          </Stack>
          <Divider sx={{ mb: 1, opacity: 0.5 }} />
          <List sx={{ maxHeight: 400, overflow: 'auto', py: 0 }}>
            {notifications.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4, opacity: 0.6 }}>
                <NotificationsIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
                <Typography variant="body2">No notifications yet</Typography>
              </Box>
            ) : (
              notifications.map((n) => (
                <ListItem key={n.id} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => handleNotificationClick(n.id, n.link)}
                    sx={{
                      bgcolor: n.read ? 'transparent' : 'rgba(99, 102, 241, 0.05)',
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: n.read ? 'rgba(255,255,255,0.03)' : 'rgba(99, 102, 241, 0.1)',
                      }
                    }}
                  >
                    <ListItemText
                      primary={n.message}
                      secondary={new Date(n.created_at).toLocaleString()}
                      primaryTypographyProps={{ 
                        variant: 'body2', 
                        fontWeight: n.read ? 400 : 800,
                        color: n.read ? 'text.secondary' : 'text.primary'
                      }}
                      secondaryTypographyProps={{ 
                        variant: 'caption',
                        sx: { mt: 0.5, display: 'block' }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Popover>
    </>
  );
};


export default NotificationBell;

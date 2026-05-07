import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Divider, List, ListItem,
  ListItemAvatar, Avatar, ListItemText, Chip, Button, Grid,
  CircularProgress, Alert, TextField, MenuItem, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Stack
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import InviteDialog from '../components/auth/InviteDialog';
import LoadingScreen from '../components/shared/LoadingScreen';
import RoleManagement from '../components/settings/RoleManagement';

const SettingsPage = () => {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openInvite, setOpenInvite] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const fetchTeam = async () => {
    try {
      const [teamRes, rolesRes] = await Promise.all([
        client.get('/users'),
        client.get('/users/roles')
      ]);
      setTeam(teamRes.data);
      setRoles(rolesRes.data);
    } catch (err) {
      setError('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true);
    // Implementation for profile update would go here
    setTimeout(() => setIsUpdatingProfile(false), 1000);
  };

  const handleDeleteUser = async () => {
    const memberId = deleteConfirm.id;
    try {
      await client.delete(`/users/${memberId}`);
      fetchTeam();
      setDeleteConfirm({ open: false, id: null });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to remove user');
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    try {
      await client.patch(`/users/${memberId}`, { role: newRole });
      setSuccess('User role updated successfully');
      fetchTeam();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update role');
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'error';
      case 'Product Owner': return 'warning';
      case 'Scrum Master': return 'secondary';
      case 'Developer': return 'primary';
      case 'Stakeholder': return 'success';
      default: return 'default';
    }
  };

  if (loading && team.length === 0) return <LoadingScreen />;

  const isAdmin = user?.role === 'Admin';

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">Settings</Typography>
        {success && <Alert severity="success" sx={{ py: 0 }}>{success}</Alert>}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item="true" xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>My Profile</Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                mt: 3, 
                mb: 4,
                gap: 3 
              }}>
                <Avatar 
                  sx={{ 
                    width: { xs: 80, sm: 64 }, 
                    height: { xs: 80, sm: 64 }, 
                    bgcolor: 'secondary.main', 
                    fontSize: { xs: '2rem', sm: '1.5rem' },
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="800">{user?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mt: 0.5, letterSpacing: 0.5 }}>
                    ORGANIZATION: {user?.company_name?.toUpperCase()}
                  </Typography>
                  <Chip label={user?.role} size="small" color={getRoleColor(user?.role)} sx={{ mt: 1.5, fontWeight: 'bold', borderRadius: 1.5 }} />
                </Box>
              </Box>

              <Divider />
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Personal Information</Typography>
                <Grid container spacing={2}>
                  <Grid item="true" xs={12}>
                    <TextField fullWidth label="Full Name" defaultValue={user?.name} size="small" />
                  </Grid>
                  <Grid item="true" xs={12}>
                    <TextField fullWidth label="Email Address" defaultValue={user?.email} size="small" disabled />
                  </Grid>
                  <Grid item="true" xs={12}>
                    <TextField fullWidth label="Organization" defaultValue={user?.company_name} size="small" disabled />
                  </Grid>
                  <Grid item="true" xs={12}>
                    <Button 
                      variant="contained" 
                      onClick={handleUpdateProfile}
                      disabled={isUpdatingProfile}
                      startIcon={isUpdatingProfile ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item="true" xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Team Members</Typography>
                {isAdmin && (
                  <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    size="small"
                    onClick={() => setOpenInvite(true)}
                  >
                    Invite
                  </Button>
                )}
              </Box>
              <List>
                {team.map((member) => (
                  <ListItem 
                    key={member.id} 
                    sx={{ 
                      px: 0, 
                      flexDirection: { xs: 'column', sm: 'row' }, 
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 1, sm: 0 },
                      py: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', fontSize: 14 }}>{member.name.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="body1" fontWeight="bold">{member.name}</Typography>}
                        secondary={member.email}
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                    
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'space-between', sm: 'flex-end' }, mt: { xs: 1, sm: 0 }, ml: { xs: 0, sm: 2 } }}>
                      {isAdmin && member.id !== user?.id ? (
                        <TextField
                          select
                          size="small"
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          sx={{ minWidth: 120 }}
                          SelectProps={{ sx: { fontSize: '0.875rem', fontWeight: 600 } }}
                        >
                          {roles.map(r => (
                            <MenuItem key={r.id} value={r.name}>{r.name}</MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <Chip label={member.role} size="small" color={getRoleColor(member.role)} variant="outlined" sx={{ fontWeight: 700 }} />
                      )}

                      <Box sx={{ minWidth: 40, textAlign: 'right' }}>
                        {isAdmin && member.id !== user?.id && (
                          <IconButton 
                            color="error" 
                            size="small" 
                            onClick={() => setDeleteConfirm({ open: true, id: member.id })}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {isAdmin && (
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, mt: 1 }}>
              <CardContent>
                <RoleManagement />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <InviteDialog
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        onSuccess={() => {
          setOpenInvite(false);
          fetchTeam();
        }}
      />

      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
        <DialogTitle fontWeight="bold">Remove Team Member?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this team member? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteUser}>Remove Member</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;

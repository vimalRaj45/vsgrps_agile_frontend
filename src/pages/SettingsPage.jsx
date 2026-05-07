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
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const SettingsPage = () => {
  const { user, setUser } = useAuth();
  const [team, setTeam] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openInvite, setOpenInvite] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now());

  // Image Cropper State
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const fetchTeam = async () => {
    try {
      // 1. Fetch team members (requires user:view)
      try {
        const teamRes = await client.get('/users');
        setTeam(teamRes.data);
      } catch (teamErr) {
        console.error('Failed to fetch team members:', teamErr);
        if (teamErr.response?.status !== 403) {
          setError('Failed to fetch team members');
        } else {
          setError('You do not have permission to view team members.');
        }
      }

      // 2. Only fetch roles if user is Admin (requires role:manage)
      if (user?.role === 'Admin') {
        try {
          const rolesRes = await client.get('/users/roles');
          setRoles(rolesRes.data);
        } catch (rolesErr) {
          console.error('Failed to fetch roles:', rolesErr);
          // Don't set global error for roles if team succeeded
        }
      }
    } catch (err) {
      console.error('General Settings fetch error:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageToCrop(reader.result);
      setShowCropper(true);
    });
    reader.readAsDataURL(file);
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };

  const handleSaveCrop = async () => {
    try {
      setIsUploadingAvatar(true);
      const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
      
      const formData = new FormData();
      formData.append('file', croppedImage, 'avatar.png');

      await client.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setShowCropper(false);
      
      // Force refresh the image in UI
      setAvatarTimestamp(Date.now());
      
      // Refresh user context to update avatar_url globally
      const meRes = await client.get('/auth/me');
      if (meRes.data.user) {
        setUser(meRes.data.user);
      }

      setSuccess('Profile picture updated successfully!');
      fetchTeam();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError('Failed to upload profile picture');
    } finally {
      setIsUploadingAvatar(false);
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
                <Box sx={{ position: 'relative' }}>
                  <Avatar 
                    src={`${import.meta.env.VITE_API_URL || 'https://vsgrps-agile-backend.onrender.com'}/users/avatar/${user?.id}?v=${avatarTimestamp}`}
                    sx={{ 
                      width: { xs: 80, sm: 64 }, 
                      height: { xs: 80, sm: 64 }, 
                      bgcolor: 'secondary.main', 
                      fontSize: { xs: '2rem', sm: '1.5rem' },
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                      fontWeight: 'bold'
                    }}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                  <input
                    type="file"
                    id="avatar-upload"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="800">{user?.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{user?.email}</Typography>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    component="label" 
                    htmlFor="avatar-upload"
                    disabled={isUploadingAvatar}
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                  >
                    {isUploadingAvatar ? 'Uploading...' : 'Change Photo'}
                  </Button>
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
                        <Avatar 
                          src={`${import.meta.env.VITE_API_URL || 'https://vsgrps-agile-backend.onrender.com'}/users/avatar/${member.id}?v=${member.id === user?.id ? avatarTimestamp : member.avatar_url}`}
                          sx={{ bgcolor: 'primary.main', fontSize: 14, fontWeight: 'bold' }}
                        >
                          {member.name.charAt(0)}
                        </Avatar>
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

      {/* Image Cropper Dialog */}
      <Dialog 
        open={showCropper} 
        onClose={() => setShowCropper(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, overflow: 'hidden' }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Crop Profile Picture</DialogTitle>
        <DialogContent sx={{ position: 'relative', height: 400, p: 0, bgcolor: '#000' }}>
          {imageToCrop && (
            <Cropper
              image={imageToCrop}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid={false}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Button onClick={() => setShowCropper(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveCrop}
            disabled={isUploadingAvatar}
            startIcon={isUploadingAvatar ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {isUploadingAvatar ? 'Saving...' : 'Apply Crop'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;

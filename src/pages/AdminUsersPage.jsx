import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  MenuItem, Chip, Avatar, Stack, Tooltip, Alert, CircularProgress,
  Divider, useTheme, useMediaQuery
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  VerifiedUser as VerifiedIcon,
  History as HistoryIcon,
  Campaign as BroadcastIcon
} from '@mui/icons-material';
import client from '../api/client';
import LoadingScreen from '../components/shared/LoadingScreen';

const ROLES = ['Admin', 'Product Owner', 'Scrum Master', 'Developer', 'Stakeholder'];

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openBroadcast, setOpenBroadcast] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Developer' });
  const [broadcastData, setBroadcastData] = useState({ message: '', link: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [successMsg, setSuccessMsg] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBroadcast = async () => {
    if (!broadcastData.message) return;
    setIsBroadcasting(true);
    setError('');
    setSuccessMsg('');
    try {
      await client.post('/notifications/broadcast-admin', broadcastData);
      setSuccessMsg('Broadcast sent successfully to all members!');
      setBroadcastData({ message: '', link: '' });
      setTimeout(() => setOpenBroadcast(false), 2000);
    } catch (err) {
      setError('Failed to send broadcast');
    } finally {
      setIsBroadcasting(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await client.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditUser(null);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError('');
    try {
      await client.patch(`/users/${editUser.id}`, formData);
      await fetchUsers();
      handleCloseDialog();
    } catch (err) {
      setError('Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const { id } = deleteConfirm;
    try {
      await client.delete(`/users/${id}`);
      fetchUsers();
      setDeleteConfirm({ open: false, id: null });
    } catch (err) {
      setError('Delete failed');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <Box>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', md: 'center' }} 
        mb={{ xs: 4, md: 6 }} 
        spacing={3}
      >
        <Box>
          <Typography 
            variant="h3" 
            fontWeight="900" 
            letterSpacing="-2px" 
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.1
            }}
          >
            User <span style={{ color: '#3b82f6' }}>Management</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 500 }}>
            Govern organization members, roles, and administrative broadcasts.
          </Typography>
        </Box>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={1} 
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          <Button 
            variant="contained" 
            startIcon={<BroadcastIcon />}
            onClick={() => setOpenBroadcast(true)}
            sx={{ 
              borderRadius: 3, 
              height: { xs: 44, sm: 48 }, 
              px: 3,
              fontSize: '0.85rem',
              bgcolor: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.15)' },
              boxShadow: 'none'
            }}
          >
            Broadcast
          </Button>
          <Button 
            variant="contained" 
            startIcon={<PersonAddIcon />}
            onClick={() => window.location.href = '/settings'}
            sx={{ 
              borderRadius: 3, 
              height: { xs: 44, sm: 48 }, 
              px: 3,
              fontSize: '0.85rem',
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)'
            }}
          >
            Invite Member
          </Button>
        </Stack>
      </Stack>



      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 1.5 }}>{error}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 3, borderRadius: 1.5 }}>{successMsg}</Alert>}


      {isMobile ? (
        <Stack spacing={2}>
          {users.map((user) => (
            <Paper 
              key={user.id} 
              className="glass-card" 
              sx={{ 
                p: 2, 
                borderRadius: 3.5, 
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} spacing={1}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      bgcolor: 'primary.main', 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold' 
                    }} 
                    src={user.avatar_url}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography 
                      variant="body1" 
                      fontWeight="900" 
                      sx={{ 
                        lineHeight: 1.2, 
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block'
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </Stack>
                <Chip 
                  label={user.role} 
                  size="small" 
                  color={user.role === 'Admin' ? 'primary' : 'default'}
                  sx={{ fontWeight: 'bold', borderRadius: 1.5, fontSize: '0.6rem', height: 20 }}
                />
              </Stack>
              
              <Divider sx={{ mb: 2, opacity: 0.05 }} />
              
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, fontSize: '0.6rem' }}>STATUS:</Typography>
                  {user.is_verified ? (
                    <Chip label="Verified" size="small" color="success" variant="outlined" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 900 }} />
                  ) : (
                    <Chip label="Pending" size="small" variant="outlined" sx={{ height: 18, fontSize: '0.6rem' }} />
                  )}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenEdit(user)} 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      width: 32,
                      height: 32
                    }}
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => setDeleteConfirm({ open: true, id: user.id })} 
                    sx={{ 
                      bgcolor: 'rgba(239, 68, 68, 0.03)', 
                      border: '1px solid rgba(239, 68, 68, 0.1)',
                      width: 32,
                      height: 32
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>


      ) : (

        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={user.avatar_url} sx={{ width: 40, height: 40 }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      size="small" 
                      color={user.role === 'Admin' ? 'primary' : 'default'}
                      variant={user.role === 'Admin' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {user.is_verified ? (
                        <Chip 
                          icon={<VerifiedIcon sx={{ fontSize: '16px !important' }} />} 
                          label="Verified" 
                          size="small" 
                          color="success" 
                          variant="outlined" 
                        />
                      ) : (
                        <Chip label="Unverified" size="small" variant="outlined" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit User">
                      <IconButton size="small" onClick={() => handleOpenEdit(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton size="small" color="error" onClick={() => setDeleteConfirm({ open: true, id: user.id })}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
        <DialogTitle fontWeight="bold">Delete User?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this team member? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete User</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>Edit User Permissions</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Email Address"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              select
              label="System Role"
              fullWidth
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              {ROLES.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} disabled={isUpdating}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleUpdate}
            disabled={isUpdating}
            startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openBroadcast} onClose={() => setOpenBroadcast(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <BroadcastIcon color="primary" />
          Organization Broadcast
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Send a push notification and in-app message to every member of your organization.
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Broadcast Message"
              placeholder="e.g. Important meeting in 10 minutes!"
              fullWidth
              multiline
              rows={3}
              value={broadcastData.message}
              onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
            />
            <TextField
              label="Action Link (Optional)"
              placeholder="e.g. /meetings/123"
              fullWidth
              value={broadcastData.link}
              onChange={(e) => setBroadcastData({ ...broadcastData, link: e.target.value })}
              helperText="Users will be redirected here when they click the notification."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenBroadcast(false)} disabled={isBroadcasting}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleBroadcast}
            disabled={isBroadcasting || !broadcastData.message}
            startIcon={isBroadcasting ? <CircularProgress size={20} color="inherit" /> : <BroadcastIcon />}
          >
            {isBroadcasting ? 'Sending...' : 'Send to All Members'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsersPage;

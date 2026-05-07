import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Stack, Chip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Checkbox, FormControlLabel, Grid, Divider,
  CircularProgress, Alert, Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';
import client from '../../api/client';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Dialog state
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleForm, setRoleForm] = useState({ name: '', description: '', selectedPermissions: [] });
  const [saving, setSaving] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [rolesRes, permsRes] = await Promise.all([
        client.get('/users/roles'),
        client.get('/users/permissions')
      ]);
      setRoles(rolesRes.data);
      setPermissions(permsRes.data);
    } catch (err) {
      setError('Failed to fetch roles and permissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (role = null) => {
    if (role) {
      setEditingRole(role);
      setRoleForm({
        name: role.name,
        description: role.description || '',
        selectedPermissions: role.permissions || []
      });
    } else {
      setEditingRole(null);
      setRoleForm({ name: '', description: '', selectedPermissions: [] });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRoleForm({ name: '', description: '', selectedPermissions: [] });
    setEditingRole(null);
  };

  const handlePermissionToggle = (perm) => {
    setRoleForm(prev => ({
      ...prev,
      selectedPermissions: prev.selectedPermissions.includes(perm)
        ? prev.selectedPermissions.filter(p => p !== perm)
        : [...prev.selectedPermissions, perm]
    }));
  };

  const handleSave = async () => {
    if (!roleForm.name) return setError('Role name is required');
    
    setSaving(true);
    setError('');
    try {
      if (editingRole) {
        await client.patch(`/users/roles/${editingRole.id}`, {
          description: roleForm.description,
          permissions: roleForm.selectedPermissions
        });
        setSuccess('Role updated successfully');
      } else {
        await client.post('/users/roles', {
          name: roleForm.name,
          description: roleForm.description,
          permissions: roleForm.selectedPermissions
        });
        setSuccess('Role created successfully');
      }
      fetchData();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save role');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const confirmDelete = async () => {
    const id = deleteConfirm.id;
    try {
      await client.delete(`/users/roles/${id}`);
      setSuccess('Role deleted successfully');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete role');
    } finally {
      setDeleteConfirm({ open: false, id: null });
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">Custom Roles & Permissions</Typography>
          <Typography variant="body2" color="text.secondary">Define access levels for your organization</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Create Role
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid item xs={12} key={role.id}>
            <Card variant="outlined" sx={{ borderRadius: 3, transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(59, 130, 246, 0.02)' } }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">{role.name}</Typography>
                      {role.is_system && (
                        <Chip label="System" size="small" variant="outlined" color="primary" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800 }} />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {role.description || 'No description provided.'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {role.permissions?.map(p => (
                        <Chip key={p} label={p} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                      ))}
                      {!role.permissions?.length && (
                        <Typography variant="caption" color="text.disabled">No permissions assigned</Typography>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    {!role.is_system ? (
                      <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={() => handleOpen(role)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDeleteClick(role.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    ) : (
                      <Tooltip title="System roles cannot be modified">
                        <IconButton size="small" disabled>
                          <SecurityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Role Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">
          {editingRole ? `Edit Role: ${editingRole.name}` : 'Create New Custom Role'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Role Name"
              placeholder="e.g. QA Engineer"
              value={roleForm.name}
              onChange={(e) => setRoleForm(prev => ({ ...prev, name: e.target.value }))}
              disabled={!!editingRole}
              required
            />
            <TextField
              fullWidth
              label="Description"
              placeholder="Describe what this role is for..."
              multiline
              rows={2}
              value={roleForm.description}
              onChange={(e) => setRoleForm(prev => ({ ...prev, description: e.target.value }))}
            />
            
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                Permissions <InfoIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              </Typography>
              <Grid container spacing={1}>
                {permissions.map((perm) => (
                  <Grid item xs={12} sm={6} md={4} key={perm}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          size="small"
                          checked={roleForm.selectedPermissions.includes(perm)}
                          onChange={() => handlePermissionToggle(perm)}
                        />
                      }
                      label={<Typography variant="body2">{perm}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            disabled={saving || (!editingRole && !roleForm.name)}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : editingRole ? 'Save Changes' : 'Create Role'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Confirm Role Deletion
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this custom role? This action cannot be undone. 
            Users assigned to this role will lose their custom permissions.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setDeleteConfirm({ open: false, id: null })}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete}
            color="error"
            variant="contained"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Delete Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;

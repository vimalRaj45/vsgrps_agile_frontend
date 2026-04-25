import React, { useState, useEffect } from 'react';
import {
  Box, Typography, IconButton, Chip, Divider, TextField,
  Button, List, ListItem, Checkbox, ListItemText, Avatar,
  Stack, Select, MenuItem, FormControl, InputLabel, Menu,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import client from '../../api/client';
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext';
import TaskComments from './TaskComments';
import SubtaskList from './SubtaskList';
import TaskActivityLog from './TaskActivityLog';

const TaskDetail = ({ task, onClose, onUpdate }) => {
  const { user: currentUser } = useAuth();
  const [currentTask, setCurrentTask] = useState(task);
  const [loading, setLoading] = useState(false);
  const [statusAnchor, setStatusAnchor] = useState(null);
  const [priorityAnchor, setPriorityAnchor] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const isAdmin = currentUser?.role === 'Admin';
  const isAssigned = currentUser?.id === currentTask.assigned_to;
  const canEditCore = isAdmin;
  const canUpdateStatus = isAdmin || isAssigned;

  const handleUpdate = async (updates) => {
    setLoading(true);
    try {
      const res = await client.patch(`/tasks/${currentTask.id}`, updates);
      setCurrentTask(res.data);
      onUpdate();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to update task', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    try {
      await client.delete(`/tasks/${currentTask.id}`);
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to delete task', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" fontWeight="bold">Task Details</Typography>
        <Stack direction="row" spacing={1}>
          {currentUser?.role === 'Admin' && (
            <IconButton color="error" onClick={() => setDeleteDialogOpen(true)} title="Delete Task" disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
            </IconButton>
          )}
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
      </Stack>

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        <TextField
          fullWidth
          variant="standard"
          value={currentTask.title}
          onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
          onBlur={() => handleUpdate({ title: currentTask.title })}
          InputProps={{ sx: { fontSize: '1.5rem', fontWeight: 'bold' }, disableUnderline: true }}
          sx={{ mb: 2 }}
          disabled={!canEditCore || loading}
        />

        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip
            label={currentTask.status}
            onClick={(e) => canUpdateStatus ? setStatusAnchor(e.currentTarget) : null}
            color={currentTask.status === 'Done' ? 'success' : 'primary'}
            sx={{ fontWeight: 'bold', cursor: canUpdateStatus ? 'pointer' : 'default' }}
            disabled={loading}
            icon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          />
          <Menu
            anchorEl={statusAnchor}
            open={Boolean(statusAnchor)}
            onClose={() => setStatusAnchor(null)}
          >
            {['To Do', 'In Progress', 'Review'].map(s => (
              <MenuItem key={s} onClick={() => { handleUpdate({ status: s }); setStatusAnchor(null); }}>
                {s}
              </MenuItem>
            ))}
            <MenuItem
              disabled={currentUser?.role !== 'Admin'}
              onClick={() => { handleUpdate({ status: 'Done' }); setStatusAnchor(null); }}
            >
              Done {currentUser?.role !== 'Admin' && '(Admin Verification Required)'}
            </MenuItem>
          </Menu>

          <Chip
            label={currentTask.priority}
            onClick={(e) => isAdmin ? setPriorityAnchor(e.currentTarget) : null}
            color={currentTask.priority === 'Critical' ? 'error' : 'warning'}
            sx={{ fontWeight: 'bold', cursor: isAdmin ? 'pointer' : 'default' }}
            disabled={loading}
          />
          <Menu
            anchorEl={priorityAnchor}
            open={Boolean(priorityAnchor)}
            onClose={() => setPriorityAnchor(null)}
          >
            {['Low', 'Medium', 'High', 'Critical'].map(p => (
              <MenuItem key={p} onClick={() => { handleUpdate({ priority: p }); setPriorityAnchor(null); }}>
                {p}
              </MenuItem>
            ))}
          </Menu>
        </Stack>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Description</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Add a description..."
          value={currentTask.description || ''}
          onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
          onBlur={() => handleUpdate({ description: currentTask.description })}
          sx={{ mb: 4 }}
          disabled={!canEditCore || loading}
        />

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Due Date</Typography>
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          size="small"
          value={currentTask.due_date ? dayjs(currentTask.due_date).format('YYYY-MM-DD') : ''}
          onChange={(e) => setCurrentTask({ ...currentTask, due_date: e.target.value })}
          onBlur={() => handleUpdate({ due_date: currentTask.due_date })}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 4, maxWidth: 250 }}
          disabled={!canEditCore || loading}
        />

        <Divider sx={{ mb: 3 }} />

        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Subtasks</Typography>
        <SubtaskList taskId={currentTask.id} canAdd={isAdmin} canToggle={canUpdateStatus} />

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Comments</Typography>
        <TaskComments taskId={currentTask.id} />

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Activity Log</Typography>
        <TaskActivityLog taskId={currentTask.id} />
      </Box>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle fontWeight="bold">Delete Task?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteTask} disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
            {loading ? 'Deleting...' : 'Delete Task'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskDetail;

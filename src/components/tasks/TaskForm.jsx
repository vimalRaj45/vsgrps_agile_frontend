import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, MenuItem, Grid, CircularProgress
} from '@mui/material';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const TaskForm = ({ open, onClose, onSuccess, projectId }) => {
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    due_date: '',
    project_id: projectId || '',
    assigned_to: ''
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, userRes] = await Promise.all([
          client.get('/projects'),
          client.get('/auth/users')
        ]);
        setProjects(projRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (open) fetchData();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.post('/tasks', formData);
      onSuccess();
      setFormData({ title: '', description: '', status: 'To Do', priority: 'Medium', due_date: '', project_id: projectId || '', assigned_to: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold">Create New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item="true" xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                margin="dense"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item="true" xs={12}>
              <TextField
                fullWidth
                label="Description"
                margin="dense"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item="true" xs={6}>
              <TextField
                select
                fullWidth
                label="Status"
                margin="dense"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="Done" disabled={currentUser?.role !== 'Admin'}>
                  Done {currentUser?.role !== 'Admin' && '(Admin Only)'}
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item="true" xs={6}>
              <TextField
                select
                fullWidth
                label="Priority"
                margin="dense"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            </Grid>
            <Grid item="true" xs={12}>
              {!projectId && (
                <TextField
                  select
                  fullWidth
                  label="Project"
                  margin="dense"
                  value={formData.project_id}
                  onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                >
                  <MenuItem value="">None</MenuItem>
                  {projects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                </TextField>
              )}
            </Grid>
            <Grid item="true" xs={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                margin="dense"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </Grid>
            <Grid item="true" xs={6}>
              <TextField
                select
                fullWidth
                label="Assign To"
                margin="dense"
                value={formData.assigned_to}
                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
              >
                <MenuItem value="">Unassigned</MenuItem>
                {users.map(u => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
            {loading ? 'Saving...' : 'Create Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;

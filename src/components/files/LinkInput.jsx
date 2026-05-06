import React, { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Switch, Stack, Typography, MenuItem, InputAdornment } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import client from '../../api/client';
import { dispatchStorageRefresh } from '../../utils/events';

const LinkInput = ({ taskId, meetingId, projectId: propProjectId, onLinkAdded }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [sharedWith, setSharedWith] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(propProjectId || '');

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

  const handleOpen = () => {
    fetchData();
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.post('/files/links', {
        url,
        task_id: taskId,
        meeting_id: meetingId,
        project_id: projectId || null,
        is_private: isPrivate,
        shared_with: sharedWith.length > 0 ? sharedWith : null
      });
      setUrl('');
      if (!propProjectId) setProjectId('');
      setOpen(false);
      dispatchStorageRefresh();
      if (onLinkAdded) onLinkAdded();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outlined" startIcon={<AddLinkIcon />} onClick={handleOpen}>
        Add Link
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle fontWeight="bold">Add External Link</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Paste URL"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              autoFocus
              sx={{ mb: 2 }}
            />
            {!propProjectId && (
              <TextField
                select
                fullWidth
                label="Link to Project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                helperText="Optional: Link this to a specific workspace"
              >
                <MenuItem value="">Global / No Project</MenuItem>
                {projects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                ))}
              </TextField>
            )}

            <Box sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight="600">Private Sharing</Typography>
                <Switch 
                  size="small"
                  checked={isPrivate} 
                  onChange={(e) => setIsPrivate(e.target.checked)} 
                />
              </Stack>
              {isPrivate && (
                <TextField
                  select
                  fullWidth
                  label="Share with Teammates"
                  SelectProps={{ multiple: true }}
                  value={sharedWith}
                  onChange={(e) => setSharedWith(e.target.value)}
                  sx={{ mt: 2 }}
                >
                  {users.map((u) => (u.name && (
                    <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
                  )))}
                </TextField>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={loading || !url}>
              Add Link
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default LinkInput;

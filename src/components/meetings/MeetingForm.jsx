import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, MenuItem, Autocomplete, Chip
} from '@mui/material';
import client from '../../api/client';

const MeetingForm = ({ open, onClose, onSuccess, projectId }) => {
  const [formData, setFormData] = useState({
    title: '',
    scheduled_at: '',
    agenda: '',
    meeting_link: '',
    project_id: projectId || '',
    attendees: []
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
      await client.post('/meetings', formData);
      onSuccess();
      setFormData({ title: '', scheduled_at: '', agenda: '', meeting_link: '', project_id: projectId || '', attendees: [] });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold">Schedule Meeting</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Meeting Title"
            margin="normal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Scheduled Date & Time"
            type="datetime-local"
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            value={formData.scheduled_at}
            onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
            required
          />
          <TextField
            select
            fullWidth
            label="Project"
            margin="normal"
            value={formData.project_id}
            onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
          >
            <MenuItem value="">None / General</MenuItem>
            {projects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
          </TextField>
          <Autocomplete
            multiple
            options={users}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setFormData({ ...formData, attendees: newValue.map(u => u.id) });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Attendees" margin="normal" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option.name} {...getTagProps({ index })} size="small" />
              ))
            }
          />
          <TextField
            fullWidth
            label="Meeting Link (e.g., Zoom, Google Meet)"
            margin="normal"
            value={formData.meeting_link}
            onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
          />
          <TextField
            fullWidth
            label="Agenda"
            margin="normal"
            multiline
            rows={4}
            value={formData.agenda}
            onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={loading}>
            Schedule
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MeetingForm;

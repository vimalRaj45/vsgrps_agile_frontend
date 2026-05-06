import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography
} from '@mui/material';
import client from '../../api/client';

const ProjectForm = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cover_color: '#1976d2'
  });
  const [loading, setLoading] = useState(false);

  const colors = ['#1976d2', '#9c27b0', '#f44336', '#ff9800', '#4caf50', '#607d8b'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.post('/projects', formData);
      onSuccess();
      setFormData({ name: '', description: '', cover_color: '#1976d2' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold">Create New Project</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Project Name"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>Cover Color</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {colors.map(color => (
                <Box
                  key={color}
                  onClick={() => setFormData({ ...formData, cover_color: color })}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: color,
                    cursor: 'pointer',
                    border: formData.cover_color === color ? '3px solid white' : 'none',
                    boxSizing: 'content-box'
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={loading}>
            Create Project
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectForm;

import React, { useRef, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Box, Typography, MenuItem, TextField, Switch, Stack
} from '@mui/material';
import client from '../../api/client';
import { dispatchStorageRefresh } from '../../utils/events';

const FileUpload = ({ taskId, meetingId, projectId: initialProjectId, onUploadSuccess }) => {
  const fileInput = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState(initialProjectId || '');
  const [projects, setProjects] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [sharedWith, setSharedWith] = useState([]);
  const [users, setUsers] = useState([]);

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

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    if (taskId) formData.append('task_id', taskId);
    if (meetingId) formData.append('meeting_id', meetingId);
    if (projectId || initialProjectId) formData.append('project_id', projectId || initialProjectId);
    formData.append('is_private', isPrivate);
    if (sharedWith.length > 0) formData.append('shared_with', sharedWith.join(','));

    try {
      await client.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setOpen(false);
      setSelectedFile(null);
      dispatchStorageRefresh();
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<UploadFileIcon />}
        onClick={handleOpen}
      >
        Upload File
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle fontWeight="bold">Upload New File</DialogTitle>
        <DialogContent>
          <Box 
            onClick={() => fileInput.current.click()}
            sx={{ 
              border: '2px dashed rgba(255,255,255,0.1)', 
              borderRadius: 3, 
              p: 4, 
              textAlign: 'center',
              cursor: 'pointer',
              mb: 3,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.02)', borderColor: 'primary.main' }
            }}
          >
            <input
              type="file"
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <UploadFileIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              {selectedFile ? selectedFile.name : 'Click or drag file to upload'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Max 5MB per file
            </Typography>
          </Box>

          {!initialProjectId && (
            <TextField
              select
              fullWidth
              label="Assign to Project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Global / Unassigned</MenuItem>
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
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
                ))}
              </TextField>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleUpload} 
            disabled={uploading || !selectedFile}
            startIcon={uploading && <CircularProgress size={16} color="inherit" />}
          >
            {uploading ? 'Uploading...' : 'Start Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileUpload;

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Alert, Card, CardContent,
  IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton,
  Chip, Stack, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button
} from '@mui/material';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/shared/LoadingScreen';
import FileUpload from '../components/files/FileUpload';
import LinkInput from '../components/files/LinkInput';

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, type: null, title: '' });
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const [filesRes, linksRes] = await Promise.all([
        client.get('/files'),
        client.get('/files/links')
      ]);
      setFiles(filesRes.data);
      setLinks(linksRes.data);
    } catch (err) {
      setError('Failed to fetch files and links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = (id, filename) => {
    window.open(`${client.defaults.baseURL}/files/${id}/download`, '_blank');
  };

  const confirmDelete = async () => {
    try {
      const endpoint = deleteDialog.type === 'file' ? `/files/${deleteDialog.id}` : `/files/links/${deleteDialog.id}`;
      await client.delete(endpoint);
      fetchData();
      setSnackbar({ open: true, message: `${deleteDialog.type === 'file' ? 'File' : 'Link'} deleted successfully!` });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.error || `Failed to delete ${deleteDialog.type}` });
    } finally {
      setDeleteDialog({ ...deleteDialog, open: false });
    }
  };

  const handleDeleteClick = (id, type, title) => {
    setDeleteDialog({ open: true, id, type, title });
  };

  if (loading) return <LoadingScreen />;

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'center' }, 
        gap: { xs: 3, md: 2 },
        mb: 4 
      }}>
        <Box>
          <Typography variant="h4" fontWeight="800" letterSpacing="-1px" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Files & Links
          </Typography>
          <Typography variant="body2" color="text.secondary">Manage project assets and documentation</Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <LinkInput onLinkAdded={() => { fetchData(); setSnackbar({ open: true, message: 'Link added successfully!' }); }} />
          <FileUpload onUploadSuccess={() => { fetchData(); setSnackbar({ open: true, message: 'File uploaded successfully!' }); }} />
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item="true" xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Recent Files</Typography>
              <List>
                {files.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No files uploaded yet.</Typography>
                ) : (
                  files.map((file) => (
                    <ListItem
                      key={file.id}
                      secondaryAction={
                        <Stack direction="row" spacing={0.5}>
                          <IconButton edge="end" onClick={() => handleDownload(file.id, file.filename)}>
                            <DownloadIcon />
                          </IconButton>
                          {(file.uploaded_by === user?.id || user?.role === 'Admin') && (
                            <IconButton edge="end" color="error" onClick={() => handleDeleteClick(file.id, 'file', file.filename)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Stack>
                      }
                    >
                      <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}><FilePresentIcon /></ListItemIcon>
                      <ListItemText
                        primary={file.filename}
                        primaryTypographyProps={{ 
                          variant: 'body2', 
                          fontWeight: 700,
                          sx: { 
                            wordBreak: 'break-all',
                            pr: 4 // Space for download icon
                          }
                        }}
                        secondary={
                          <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography variant="caption">{(file.size / 1024).toFixed(1)} KB</Typography>
                              <Typography variant="caption">•</Typography>
                              <Typography variant="caption">{new Date(file.created_at).toLocaleDateString()}</Typography>
                            </Stack>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {file.project_name && (
                                <Chip label={file.project_name} size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem', fontWeight: 600 }} />
                              )}
                              {file.task_title && (
                                <Chip label={`Task: ${file.task_title}`} size="small" sx={{ height: 16, fontSize: '0.6rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
                              )}
                              {file.meeting_title && (
                                <Chip label={`Meeting: ${file.meeting_title}`} size="small" sx={{ height: 16, fontSize: '0.6rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
                              )}
                              {!file.project_name && !file.task_title && !file.meeting_title && (
                                <Chip label="Global" size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem', opacity: 0.5 }} />
                              )}
                            </Box>
                          </Stack>
                        }
                        secondaryTypographyProps={{ component: 'div' }}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item="true" xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Pinned Links</Typography>
              <List>
                {links.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No links added yet.</Typography>
                ) : (
                  links.map((link) => (
                    <ListItem disablePadding key={link.id}>
                      <ListItemButton
                        component="a"
                        href={link.url}
                        target="_blank"
                        sx={{ pr: 9 }} // Space for absolute delete button
                      >
                        <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}><LinkIcon /></ListItemIcon>
                        <ListItemText
                          primary={link.title || link.url}
                          secondary={
                            <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                              <Typography variant="caption" noWrap sx={{ maxWidth: { xs: 150, sm: 300 } }}>{link.url}</Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {link.project_name && (
                                  <Chip label={link.project_name} size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem', fontWeight: 600 }} />
                                )}
                                {link.task_title && (
                                  <Chip label={`Task: ${link.task_title}`} size="small" sx={{ height: 16, fontSize: '0.6rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
                                )}
                                {link.meeting_title && (
                                  <Chip label={`Meeting: ${link.meeting_title}`} size="small" sx={{ height: 16, fontSize: '0.6rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
                                )}
                                {!link.project_name && !link.task_title && !link.meeting_title && (
                                  <Chip label="Global" size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem', opacity: 0.5 }} />
                                )}
                              </Box>
                            </Stack>
                          }
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            fontWeight: 700, 
                            noWrap: true,
                            sx: { maxWidth: { xs: 200, sm: '100%' } }
                          }}
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItemButton>
                      {(link.added_by === user?.id || user?.role === 'Admin') && (
                        <IconButton 
                          edge="end" 
                          color="error" 
                          onClick={(e) => { e.stopPropagation(); handleDeleteClick(link.id, 'link', link.title); }}
                          sx={{ 
                            position: 'absolute', 
                            right: 16, 
                            top: '50%', 
                            transform: 'translateY(-50%)',
                            zIndex: 2
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{deleteDialog.title}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}
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
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilesPage;

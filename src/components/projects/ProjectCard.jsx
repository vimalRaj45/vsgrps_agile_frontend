import React from 'react';
import {
  Card, CardContent, Typography, Box, Chip, LinearProgress,
  IconButton, CardActions, AvatarGroup, Avatar, Tooltip, Stack,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Button as MuiButton, TextField, CircularProgress, Menu, MenuItem
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { can } from '../../utils/rbac';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

const ProjectCard = ({ project, onUpdate }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [confirmName, setConfirmName] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState('');
  const [statusAnchor, setStatusAnchor] = React.useState(null);

  const progress = project.total_tasks > 0 ? (project.done_tasks / project.total_tasks) * 100 : 0;
  const isAdmin = user?.role === 'Admin' || user?.role === 'Product Owner';

  const handlePin = async (e) => {
    e.stopPropagation();
    try {
      await client.patch(`/projects/${project.id}`, { pinned: !project.pinned });
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchive = async (e) => {
    e.stopPropagation();
    try {
      await client.patch(`/projects/${project.id}`, { archived: !project.archived });
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setStatusAnchor(null);
    try {
      await client.patch(`/projects/${project.id}`, { status: newStatus });
      onUpdate();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleProjectDelete = async () => {
    if (confirmName.trim().toLowerCase() !== project.name.trim().toLowerCase()) return;
    
    setIsDeleting(true);
    setDeleteError('');
    try {
      await client.delete(`/projects/${project.id}`);
      setOpenDelete(false);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete project:', err);
      setDeleteError(err.response?.data?.error || 'Failed to delete project. Insufficient permissions.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (e) => {
    e.stopPropagation();
    setConfirmName('');
    setDeleteError('');
    setOpenDelete(true);
  };

  return (
    <Card
      className="glass-card"
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          '& .project-cover': { height: 120 }
        }
      }}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <Box 
        className="project-cover"
        sx={{ 
          height: 80, 
          background: `linear-gradient(45deg, ${project.cover_color} 0%, ${project.cover_color}CC 100%)`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FolderSpecialIcon sx={{ color: 'white', fontSize: 40, opacity: 0.8 }} />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Chip
            label={project.status}
            size="small"
            color={project.status === 'Active' ? 'primary' : project.status === 'Planned' ? 'info' : 'default'}
            onClick={(e) => {
              e.stopPropagation();
              if (isAdmin) setStatusAnchor(e.currentTarget);
            }}
            sx={{ 
              fontWeight: '800', 
              borderRadius: 2, 
              fontSize: '0.65rem', 
              textTransform: 'uppercase',
              cursor: isAdmin ? 'pointer' : 'default',
              '&:hover': isAdmin ? { bgcolor: 'primary.dark', color: 'white' } : {}
            }}
          />
          
          <Menu
            anchorEl={statusAnchor}
            open={Boolean(statusAnchor)}
            onClose={() => setStatusAnchor(null)}
            onClick={(e) => e.stopPropagation()}
            PaperProps={{ sx: { borderRadius: 3, mt: 1, minWidth: 140 } }}
          >
            <MenuItem onClick={() => handleStatusUpdate('Active')} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Active</MenuItem>
            <MenuItem onClick={() => handleStatusUpdate('Planned')} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Planned</MenuItem>
            <MenuItem onClick={() => handleStatusUpdate('Inactive')} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Inactive</MenuItem>
          </Menu>

          <IconButton 
            size="small" 
            onClick={handlePin}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.05)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {project.pinned ? <StarIcon color="warning" fontSize="small" /> : <StarBorderIcon fontSize="small" />}
          </IconButton>
        </Box>

        <Typography variant="h5" fontWeight="800" noWrap letterSpacing="-0.5px" gutterBottom>
          {project.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 3, 
          height: 44, 
          overflow: 'hidden', 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.6
        }}>
          {project.description || 'Enterprise project workspace for secure collaboration.'}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary">COMPLETION</Typography>
            <Typography variant="caption" fontWeight="bold" color="primary.main">{Math.round(progress)}%</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ 
              height: 8, 
              borderRadius: 2, 
              bgcolor: 'rgba(255,255,255,0.05)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 2,
                background: `linear-gradient(90deg, ${project.cover_color} 0%, #6366f1 100%)`
              }
            }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.1)', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarMonthIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="caption" fontWeight="600" color="text.secondary">
            {project.done_tasks}/{project.total_tasks} Tasks
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="View Project Report">
            <IconButton 
              size="small" 
              onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}/report`); }} 
              sx={{ color: 'primary.main' }}
            >
              <BarChartIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={project.archived ? "Unarchive Project" : "Archive Project"}>
            <IconButton size="small" onClick={handleArchive} sx={{ color: 'text.secondary' }}>
              <ArchiveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {isAdmin && (
            <Tooltip title="Delete Project">
              <IconButton 
                size="small" 
                onClick={openDeleteDialog} 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main', bgcolor: 'rgba(239, 68, 68, 0.05)' }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </CardActions>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={openDelete} 
        onClose={() => !isDeleting && setOpenDelete(false)}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          sx: { borderRadius: 4, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem', pb: 1 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            This action is <strong>permanent</strong>. To confirm, please type <strong>{project.name}</strong> below.
          </DialogContentText>
          
          {deleteError && (
            <Box sx={{ mb: 2, p: 1.5, bgcolor: 'rgba(239, 68, 68, 0.1)', borderRadius: 2, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <Typography variant="caption" color="error" fontWeight="bold">{deleteError}</Typography>
            </Box>
          )}

          <TextField
            fullWidth
            size="small"
            placeholder="Type project name here"
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            autoComplete="off"
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 3 }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <MuiButton 
            onClick={() => setOpenDelete(false)} 
            disabled={isDeleting}
            sx={{ fontWeight: 700 }}
          >
            Cancel
          </MuiButton>
          <MuiButton 
            variant="contained" 
            color="error" 
            onClick={handleProjectDelete}
            disabled={confirmName.trim().toLowerCase() !== project.name.trim().toLowerCase() || isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
            sx={{ 
              borderRadius: 3, 
              px: 3,
              fontWeight: 800,
              boxShadow: '0 8px 16px rgba(239, 68, 68, 0.2)',
              '&.Mui-disabled': { bgcolor: 'rgba(239, 68, 68, 0.1)', color: 'rgba(239, 68, 68, 0.4)' }
            }}
          >
            {isDeleting ? 'Deleting...' : 'Permanently Delete'}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProjectCard;

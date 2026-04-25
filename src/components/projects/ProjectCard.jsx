import React from 'react';
import {
  Card, CardContent, Typography, Box, Chip, LinearProgress,
  IconButton, CardActions, AvatarGroup, Avatar, Tooltip, Stack
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import client from '../../api/client';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ProjectCard = ({ project, onUpdate }) => {
  const navigate = useNavigate();
  const progress = project.total_tasks > 0 ? (project.done_tasks / project.total_tasks) * 100 : 0;

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
            color={project.status === 'Active' ? 'primary' : 'default'}
            sx={{ fontWeight: '800', borderRadius: 2, fontSize: '0.65rem', textTransform: 'uppercase' }}
          />
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
        <Tooltip title={project.archived ? "Unarchive Project" : "Archive Project"}>
          <IconButton size="small" onClick={handleArchive} sx={{ color: 'text.secondary' }}>
            <ArchiveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;

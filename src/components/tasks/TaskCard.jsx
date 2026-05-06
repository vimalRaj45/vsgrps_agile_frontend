import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar, Tooltip, Stack, Divider, LinearProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TaskCard = ({ task, onClick, onUpdate }) => {
  const isOverdue = task.due_date && dayjs(task.due_date).isBefore(dayjs(), 'day') && task.status !== 'Done';

  const getPriorityInfo = (p) => {
    switch(p) {
      case 'Low': return { color: '#94a3b8', icon: <LowPriorityIcon fontSize="inherit" /> };
      case 'Medium': return { color: '#0ea5e9', icon: <PriorityHighIcon fontSize="inherit" /> };
      case 'High': return { color: '#f59e0b', icon: <PriorityHighIcon fontSize="inherit" /> };
      case 'Critical': return { color: '#ef4444', icon: <ErrorOutlineIcon fontSize="inherit" /> };
      default: return { color: '#94a3b8', icon: <LowPriorityIcon fontSize="inherit" /> };
    }
  };

  const getStatusColor = (s) => {
    switch(s) {
      case 'To Do': return 'default';
      case 'In Progress': return 'primary';
      case 'Review': return 'warning';
      case 'Done': return 'success';
      default: return 'default';
    }
  };

  const priorityInfo = getPriorityInfo(task.priority);

  // Progress logic
  const calculateProgress = () => {
    if (task.status === 'Done') return 100;
    if (!task.created_at || !task.due_date) return 0;
    
    const start = dayjs(task.created_at);
    const end = dayjs(task.due_date);
    const now = dayjs();
    
    const total = end.diff(start);
    const elapsed = now.diff(start);
    
    if (total <= 0) return 0;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const progress = calculateProgress();
  const progressColor = progress > 90 ? '#ef4444' : progress > 70 ? '#f59e0b' : '#6366f1';

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        borderRadius: 3, 
        cursor: 'pointer',
        bgcolor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': { 
          borderColor: 'primary.main',
          bgcolor: 'rgba(255,255,255,0.04)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 1.5 } }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Chip 
            label={task.status} 
            size="small" 
            color={getStatusColor(task.status)} 
            sx={{ fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase', height: 22 }} 
          />
          <Chip 
            icon={priorityInfo.icon}
            label={task.priority} 
            size="small" 
            sx={{ 
              fontWeight: '800', 
              fontSize: '0.6rem', 
              textTransform: 'uppercase', 
              height: 22,
              bgcolor: 'rgba(255,255,255,0.03)',
              color: priorityInfo.color,
              '& .MuiChip-icon': { color: 'inherit' }
            }} 
          />
        </Stack>

        <Typography variant="subtitle1" fontWeight="700" letterSpacing="-0.3px" gutterBottom sx={{ lineHeight: 1.3 }}>
          {task.title}
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Typography variant="caption" color="text.secondary" fontWeight="600">
            {task.project_name || 'General Workspace'}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 1.5, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.06)' }} />

        {task.due_date && task.status !== 'Done' && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight="700">Timeline</Typography>
              <Typography variant="caption" color={progress > 90 ? 'error.main' : 'text.secondary'} fontWeight="800">
                {Math.round(progress)}%
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 6, 
                borderRadius: 3, 
                bgcolor: 'rgba(255,255,255,0.05)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: progressColor,
                  borderRadius: 3
                }
              }} 
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon sx={{ fontSize: 14, color: isOverdue ? 'error.main' : 'text.secondary' }} />
            <Typography variant="caption" fontWeight="600" color={isOverdue ? 'error.main' : 'text.secondary'}>
              {task.due_date ? dayjs(task.due_date).format('MMM D') : 'No due date'}
            </Typography>
          </Stack>
          <Tooltip title={task.assignee_name || 'Awaiting Assignment'}>
            <Avatar 
              sx={{ 
                width: 28, 
                height: 28, 
                fontSize: 10, 
                fontWeight: 'bold',
                bgcolor: 'primary.main',
                border: '2px solid rgba(255,255,255,0.1)'
              }}
            >
              {task.assignee_name?.charAt(0) || '?'}
            </Avatar>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

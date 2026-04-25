import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, CircularProgress, Alert, 
  Stack, TextField, MenuItem, Drawer
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAuth } from '../context/AuthContext';
import { can } from '../utils/rbac';
import * as taskApi from '../api/tasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import TaskDetail from '../components/tasks/TaskDetail';
import LoadingScreen from '../components/shared/LoadingScreen';

const TasksPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assigned_to: ''
  });
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await taskApi.getTasks({
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        assigned_to: filters.assigned_to || undefined
      });
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  if (loading && tasks.length === 0) return <LoadingScreen />;

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        gap: 2,
        mb: 4 
      }}>
        <Typography variant="h4" fontWeight="800" letterSpacing="-1px">Tasks</Typography>
        {can(user?.role, 'task:create') && (
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Add Task
          </Button>
        )}
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <TextField
          select
          label="Status"
          size="small"
          sx={{ minWidth: 150 }}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Review">Review</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>
        <TextField
          select
          label="Priority"
          size="small"
          sx={{ minWidth: 150 }}
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <MenuItem value="">All Priority</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
        </TextField>
        <Button
          variant={filters.assigned_to === user?.id ? 'contained' : 'outlined'}
          startIcon={<PersonIcon />}
          onClick={() => setFilters({ 
            ...filters, 
            assigned_to: filters.assigned_to === user?.id ? '' : user?.id 
          })}
          sx={{ borderRadius: 2, height: 40, px: 3 }}
        >
          Your Tasks
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2}>
        {tasks.map(task => (
          <Grid item="true" xs={12} sm={6} md={4} key={task.id}>
            <TaskCard task={task} onClick={() => setSelectedTask(task)} onUpdate={fetchTasks} />
          </Grid>
        ))}
      </Grid>

      <TaskForm 
        open={openForm} 
        onClose={() => setOpenForm(false)} 
        onSuccess={() => {
          setOpenForm(false);
          fetchTasks();
        }} 
      />

      <Drawer
        anchor="right"
        open={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 500 }, backgroundImage: 'none' } } }}
      >
        {selectedTask && <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={fetchTasks} />}
      </Drawer>
    </Box>
  );
};

export default TasksPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Grid, CircularProgress, Alert,
  Tabs, Tab, Paper, Stack, Chip, Divider
} from '@mui/material';
import TaskList from '../components/tasks/TaskList';
import MeetingList from '../components/meetings/MeetingList';
import FileList from '../components/files/FileList';
import ProjectMembers from '../components/projects/ProjectMembers';
import ProjectProcess from '../components/projects/ProjectProcess';
import { useAuth } from '../context/AuthContext';
import { can } from '../utils/rbac';
import LoadingScreen from '../components/shared/LoadingScreen';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Determine initial tab based on permissions
  const getInitialTab = () => {
    if (can(user, 'task:view')) return 'tasks';
    if (can(user, 'meeting:view')) return 'meetings';
    if (can(user, 'file:view') || can(user, 'link:view')) return 'files';
    return 'process';
  };
  
  const [tabValue, setTabValue] = useState(getInitialTab());

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await client.get(`/projects/${id}`); // Need single project route
        setProject(res.data);
      } catch (err) {
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h4" fontWeight="bold">{project.name}</Typography>
          <Chip label={project.status} color={project.status === 'Active' ? 'primary' : 'default'} />
        </Stack>
        <Typography variant="body1" color="text.secondary">{project.description}</Typography>
      </Box>

      <Tabs 
        value={tabValue} 
        onChange={(e, v) => setTabValue(v)} 
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {can(user, 'task:view') && <Tab value="tasks" label="Tasks" />}
        {can(user, 'meeting:view') && <Tab value="meetings" label="Meetings" />}
        {(can(user, 'file:view') || can(user, 'link:view')) && <Tab value="files" label="Files & Links" />}
        <Tab value="process" label="Process" />
        <Tab value="team" label="Team" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabValue === 'tasks' && <TaskList projectId={id} />}
        {tabValue === 'meetings' && <MeetingList projectId={id} />}
        {tabValue === 'files' && <FileList projectId={id} />}
        {tabValue === 'process' && <ProjectProcess projectId={id} />}
        {tabValue === 'team' && <ProjectMembers projectId={id} />}
      </Box>
    </Box>
  );
};

export default ProjectDetailPage;

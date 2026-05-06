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
import client from '../api/client';
import LoadingScreen from '../components/shared/LoadingScreen';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);

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
        <Tab label="Tasks" />
        <Tab label="Meetings" />
        <Tab label="Files & Links" />
        <Tab label="Process" />
        <Tab label="Team" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <TaskList projectId={id} />}
        {tabValue === 1 && <MeetingList projectId={id} />}
        {tabValue === 2 && <FileList projectId={id} />}
        {tabValue === 3 && <ProjectProcess projectId={id} />}
        {tabValue === 4 && <ProjectMembers projectId={id} />}
      </Box>
    </Box>
  );
};

export default ProjectDetailPage;

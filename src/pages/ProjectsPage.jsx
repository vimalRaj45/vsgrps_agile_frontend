import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, CircularProgress, Alert,
  Tabs, Tab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../context/AuthContext';
import { can } from '../utils/rbac';
import * as projectApi from '../api/projects';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import LoadingScreen from '../components/shared/LoadingScreen';
import ScrollReveal from '../components/shared/ScrollReveal';

const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const archived = tabValue === 1;
      const res = await projectApi.getProjects({ archived });
      setProjects(res.data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setLoading(true);
  };

  if (loading && projects.length === 0) return <LoadingScreen />;

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
        <Box>
          <Typography variant="h4" fontWeight="800" letterSpacing="-1px" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">Organize and monitor your organizational goals</Typography>
        </Box>
        {can(user?.role, 'project:create') && (
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
            sx={{ width: { xs: '100%', sm: 'auto' }, borderRadius: 2 }}
          >
            New Project
          </Button>
        )}
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Active" />
        <Tab label="Archived" />
      </Tabs>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {projects.length === 0 ? (
          <Grid item="true" xs={12}>
            <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'background.paper', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary">No projects found</Typography>
              <Button sx={{ mt: 2 }} onClick={() => setOpenForm(true)}>Create your first project</Button>
            </Box>
          </Grid>
        ) : (
          projects.map((project, index) => (
            <Grid item="true" xs={12} sm={6} md={4} key={project.id}>
              <ScrollReveal delay={index * 0.05}>
                <ProjectCard project={project} onUpdate={fetchProjects} />
              </ScrollReveal>
            </Grid>
          ))
        )}
      </Grid>

      <ProjectForm 
        open={openForm} 
        onClose={() => setOpenForm(false)} 
        onSuccess={() => {
          setOpenForm(false);
          fetchProjects();
        }} 
      />
    </Box>
  );
};

export default ProjectsPage;

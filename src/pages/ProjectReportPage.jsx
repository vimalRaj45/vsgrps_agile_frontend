import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, Divider, Avatar, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Card, Stack, Chip, Button, IconButton,
  Container, useTheme, useMediaQuery
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import client from '../api/client';
import LoadingScreen from '../components/shared/LoadingScreen';
import ScrollReveal from '../components/shared/ScrollReveal';

const ProjectReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await client.get(`/reports/project/${id}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (!data) return <Box p={4}><Typography>Report not found</Typography></Box>;

  const { project, stats, userContributions, meetings } = data;

  const summaryCards = [
    { label: 'Total Tasks', value: stats.totalTasks, icon: <AssignmentIcon />, color: '#6366f1' },
    { label: 'Completed', value: stats.completedTasks, icon: <EventAvailableIcon />, color: '#10b981' },
    { label: 'Overdue', value: stats.overdueTasks, icon: <TrendingUpIcon />, color: '#f43f5e' },
    { label: 'Critical', value: stats.criticalTasks, icon: <TrendingUpIcon />, color: '#f59e0b' },
  ];

  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  }) : 'N/A';

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1.5, sm: 2 } }}>
      <ScrollReveal>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          alignItems={{ xs: 'flex-start', sm: 'center' }} 
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight="950" letterSpacing="-1.5px" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, lineHeight: 1 }}>
                Project Report
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {project.name}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            variant="contained" 
            startIcon={<DownloadIcon />} 
            onClick={() => window.print()}
            fullWidth={isMobile}
            sx={{ 
              borderRadius: 3, 
              bgcolor: 'background.paper', 
              color: 'text.primary',
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
            }}
          >
            Export Report
          </Button>
        </Stack>
      </ScrollReveal>

      <Grid container spacing={3}>
        {/* Project Overview */}
        <Grid item xs={12} md={8}>
          <Paper className="glass-card" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="800" gutterBottom>Project Timeline</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase' }}>Project Started</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body1" fontWeight="600">{formatDate(project.created_at)}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase' }}>First Task Added</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AssignmentIcon sx={{ color: 'info.main', fontSize: 20 }} />
                    <Typography variant="body1" fontWeight="600">{formatDate(project.first_task_date)}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase' }}>Last Activity</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 20 }} />
                    <Typography variant="body1" fontWeight="600">{formatDate(project.last_completed_date)}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body2" fontWeight="700">Overall Completion</Typography>
                <Typography variant="body2" fontWeight="900" color="primary">{stats.completionRate}%</Typography>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={stats.completionRate} 
                sx={{ height: 10, borderRadius: 5, bgcolor: 'rgba(0,0,0,0.05)' }} 
              />
            </Box>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {summaryCards.map((card, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Paper className="glass-card" sx={{ p: 2, textAlign: 'center' }}>
                  <Box sx={{ 
                    display: 'inline-flex', p: 1, borderRadius: 2, 
                    bgcolor: `${card.color}15`, color: card.color, mb: 1 
                  }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h5" fontWeight="900">{card.value}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight="600">{card.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* User Contribution */}
        <Grid item xs={12} lg={7}>
          <Paper className="glass-card" sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
              <GroupIcon color="primary" />
              <Typography variant="h6" fontWeight="800">Team Contribution</Typography>
            </Stack>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Member</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary' }}>Assigned</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary' }}>Done</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Impact</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userContributions.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar src={user.avatar_url} sx={{ width: 32, height: 32 }}>{user.name[0]}</Avatar>
                          <Typography variant="body2" fontWeight="600">{user.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{user.total_assigned}</TableCell>
                      <TableCell align="center">{user.completed_tasks}</TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={user.total_assigned > 0 ? Math.round((user.completed_tasks / user.total_assigned) * 100) + '%' : '0%'} 
                          size="small"
                          sx={{ fontWeight: 800, bgcolor: 'primary.main', color: 'white' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Meetings conducted */}
        <Grid item xs={12} lg={5}>
          <Paper className="glass-card" sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
              <EventAvailableIcon color="primary" />
              <Typography variant="h6" fontWeight="800">Meetings History</Typography>
            </Stack>
            <Stack spacing={2}>
              {meetings.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No meetings conducted yet.</Typography>
              ) : (
                meetings.map((m) => (
                  <Box key={m.id} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight="800">{m.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{formatDate(m.scheduled_at)}</Typography>
                    </Stack>
                    {m.outcome && (
                      <Box sx={{ mt: 1, pt: 1, borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Meeting Outcome</Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary', opacity: 0.9 }}>
                          "{m.outcome}"
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectReportPage;

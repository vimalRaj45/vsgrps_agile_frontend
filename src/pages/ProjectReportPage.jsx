import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, Divider, Avatar, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Card, Stack, Chip, Button, IconButton,
  Container, useTheme, useMediaQuery, Tabs, Tab
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
  const [activeTab, setActiveTab] = useState(0);

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
          alignItems={{ xs: 'stretch', sm: 'center' }} 
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: { xs: 1, sm: 0 } }}>
            <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', width: 40, height: 40 }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight="950" letterSpacing="-1.5px" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, lineHeight: 1.2 }}>
                Project Report
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
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
              bgcolor: 'primary.main', 
              color: 'white',
              boxShadow: '0 8px 20px -6px rgba(99, 102, 241, 0.4)',
              '&:hover': { bgcolor: 'primary.dark' },
              height: { xs: 48, sm: 40 },
              fontSize: { xs: '0.9rem', sm: '0.875rem' }
            }}
          >
            Export Report
          </Button>
        </Stack>
      </ScrollReveal>

      {isMobile && (
        <Tabs 
          value={activeTab} 
          onChange={(e, v) => setActiveTab(v)} 
          variant="fullWidth" 
          sx={{ 
            mb: 3, 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': { fontWeight: 800, fontSize: '0.8rem' }
          }}
        >
          <Tab label="Overview" />
          <Tab label="Team" />
          <Tab label="Meetings" />
        </Tabs>
      )}
      
      <Grid container spacing={3}>
        {/* Project Overview & Stats */}
        {(!isMobile || activeTab === 0) && (
          <>
            <Grid item xs={12} md={8}>
              <Paper className="glass-card" sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
                <Typography variant="h6" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>Project Timeline</Typography>
                <Divider sx={{ mb: { xs: 2, md: 3 } }} />
                <Grid container spacing={{ xs: 2, sm: 4 }}>
                  <Grid item xs={6} sm={4}>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>Started</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2" fontWeight="700">{formatDate(project.created_at)}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>First Task</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AssignmentIcon sx={{ color: 'info.main', fontSize: 16 }} />
                        <Typography variant="body2" fontWeight="700">{formatDate(project.first_task_date)}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>Last Activity</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16 }} />
                        <Typography variant="body2" fontWeight="700">{formatDate(project.last_completed_date)}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                <Box sx={{ mt: { xs: 3, md: 5 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.8rem' }}>Overall Completion</Typography>
                    <Typography variant="body2" fontWeight="900" color="primary" sx={{ fontSize: '0.8rem' }}>{stats.completionRate}%</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={stats.completionRate} 
                    sx={{ height: 8, borderRadius: 5, bgcolor: 'rgba(0,0,0,0.05)' }} 
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                {summaryCards.map((card, i) => (
                  <Grid item xs={6} sm={6} md={12} key={i}>
                    <Paper className="glass-card" sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center', height: '100%' }}>
                      <Box sx={{ 
                        display: 'inline-flex', p: 1, borderRadius: 2, 
                        bgcolor: `${card.color}15`, color: card.color, mb: 1 
                      }}>
                        {card.icon}
                      </Box>
                      <Typography variant="h5" fontWeight="900" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>{card.value}</Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ display: 'block', lineHeight: 1.2 }}>{card.label}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}

        {/* User Contribution */}
        {(!isMobile || activeTab === 1) && (
          <Grid item xs={12} lg={7}>
            <Paper className="glass-card" sx={{ p: { xs: 2, sm: 3 } }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <GroupIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="h6" fontWeight="800" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Team Contribution</Typography>
              </Stack>
              <Box sx={{ overflowX: 'auto', mx: -1 }}>
                <Table size="small" sx={{ minWidth: { xs: 450, sm: '100%' } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', whiteSpace: 'nowrap' }}>Member</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', whiteSpace: 'nowrap' }}>Assigned</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', whiteSpace: 'nowrap' }}>Done</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary', whiteSpace: 'nowrap' }}>Impact</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userContributions.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar src={user.avatar_url} sx={{ width: 28, height: 28, fontSize: '0.8rem' }}>{user.name[0]}</Avatar>
                            <Typography variant="body2" fontWeight="600" sx={{ whiteSpace: 'nowrap' }}>{user.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{user.total_assigned}</TableCell>
                        <TableCell align="center">{user.completed_tasks}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={user.total_assigned > 0 ? Math.round((user.completed_tasks / user.total_assigned) * 100) + '%' : '0%'} 
                            size="small"
                            sx={{ fontWeight: 800, bgcolor: 'primary.main', color: 'white', height: 20, fontSize: '0.7rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Meetings conducted */}
        {(!isMobile || activeTab === 2) && (
          <Grid item xs={12} lg={5}>
            <Paper className="glass-card" sx={{ p: { xs: 2, sm: 3 } }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <EventAvailableIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="h6" fontWeight="800" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Meetings History</Typography>
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
        )}
      </Grid>
    </Container>
  );
};

export default ProjectReportPage;

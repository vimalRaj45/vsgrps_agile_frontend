import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Paper, Stack, TextField, 
  Table, TableBody, TableCell, TableContainer, TableRow,
  CircularProgress, Alert, Chip, useTheme, useMediaQuery,
  TableHead
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import client from '../api/client';
import ScrollReveal from '../components/shared/ScrollReveal';

const ReportsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReport = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await client.get(`/reports/summary?startDate=${startDate}&endDate=${endDate}`);
      setData(res.data);
    } catch (err) {
      setError('Failed to generate report. Please check the dates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleExportCSV = () => {
    if (!data) return;
    const headers = ['Task Title', 'Priority', 'Assignee', 'Completed At'];
    const rows = data.completedTasks.map(t => [
      t.title,
      t.priority,
      t.assignee || 'Unassigned',
      new Date(t.completed_at).toLocaleString()
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Sprintora_report_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box sx={{ pb: 6, px: { xs: 1, sm: 0 } }}>
      <ScrollReveal>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' }, 
          gap: 3,
          mb: 5 
        }}>
          <Box>
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="900" letterSpacing="-1.5px">
              Performance Reports
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Analyze organizational throughput and team efficiency.
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />} 
            onClick={handleExportCSV}
            disabled={!data || loading}
            fullWidth={isMobile}
            sx={{ borderRadius: 3, fontWeight: 'bold', py: 1.5 }}
          >
            Export CSV
          </Button>
        </Box>
      </ScrollReveal>

      {/* Filter Bar */}
      <ScrollReveal delay={0.1}>
        <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" fontWeight="bold" sx={{ mb: 1, display: 'block', ml: 1 }}>START DATE</Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" fontWeight="bold" sx={{ mb: 1, display: 'block', ml: 1 }}>END DATE</Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FilterListIcon />}
                onClick={fetchReport}
                disabled={loading}
                sx={{ py: 1.2, borderRadius: 3, fontWeight: 'bold' }}
              >
                Generate Report
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </ScrollReveal>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {data && (
        <>
          {/* Summary Stats */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { label: 'TASKS COMPLETED', val: data.stats.tasksCompleted, color: 'primary.main', bg: 'rgba(99, 102, 241, 0.05)' },
              { label: 'TASKS CREATED', val: data.stats.tasksCreated, color: 'success.main', bg: 'rgba(16, 185, 129, 0.05)' },
              { label: 'CRITICAL TASKS', val: data.stats.criticalTasks, color: 'error.main', bg: 'rgba(239, 68, 68, 0.05)' },
              { label: 'MEETINGS HELD', val: data.stats.totalMeetings, color: 'info.main', bg: 'rgba(59, 130, 246, 0.05)' }
            ].map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: stat.bg, border: `1px solid ${stat.color}20` }}>
                  <Typography variant="caption" sx={{ color: stat.color }} fontWeight="bold">{stat.label}</Typography>
                  <Typography variant={isMobile ? "h5" : "h4"} fontWeight="900" sx={{ mt: 1 }}>{stat.val}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Completed Tasks Table */}
            <Grid item xs={12} lg={8}>
              <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <Typography variant="h6" fontWeight="bold">Task Completion Log</Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.paper' }}>Task</TableCell>
                        {!isMobile && <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.paper' }}>Assignee</TableCell>}
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.paper' }}>Priority</TableCell>
                        {!isTablet && <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.paper' }}>Date</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.completedTasks.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: 4, opacity: 0.5 }}>No tasks completed in this range.</TableCell>
                        </TableRow>
                      ) : (
                        data.completedTasks.map((row, i) => (
                          <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              <Typography variant="body2" fontWeight="500">{row.title}</Typography>
                              {isMobile && <Typography variant="caption" color="text.secondary">{row.assignee}</Typography>}
                            </TableCell>
                            {!isMobile && <TableCell>{row.assignee}</TableCell>}
                            <TableCell>
                              <Chip 
                                label={row.priority} 
                                size="small" 
                                color={row.priority === 'Critical' ? 'error' : row.priority === 'High' ? 'warning' : 'default'}
                                variant="outlined"
                              />
                            </TableCell>
                            {!isTablet && <TableCell>{new Date(row.completed_at).toLocaleDateString()}</TableCell>}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Team Activity */}
            <Grid item xs={12} lg={4}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Top Performers</Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>Based on tasks completed in range</Typography>
                <Stack spacing={2}>
                  {data.teamActivity.length === 0 ? (
                    <Typography variant="body2" sx={{ opacity: 0.5, textAlign: 'center', py: 4 }}>No activity data available.</Typography>
                  ) : (
                    data.teamActivity.map((user, i) => (
                      <Box key={i} sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>
                            {user.name.charAt(0)}
                          </Box>
                          <Typography variant="body2" fontWeight="bold">{user.name}</Typography>
                        </Stack>
                        <Typography variant="body2" fontWeight="900" color="primary">{user.tasks_done} Tasks</Typography>
                      </Box>
                    ))
                  )}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ReportsPage;

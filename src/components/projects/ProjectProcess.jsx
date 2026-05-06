import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, LinearProgress, 
  Card, CardContent, Stack, Divider, Chip, useTheme, useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../../api/client';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProjectProcess = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await client.get(`/tasks?project_id=${projectId}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'To Do').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    review: tasks.filter(t => t.status === 'Review').length,
    done: tasks.filter(t => t.status === 'Done').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  if (loading) return <LinearProgress sx={{ my: 4, borderRadius: 2 }} />;

  const timelineSteps = [
    {
      title: "Planning Phase",
      subtitle: "Backlog Created",
      desc: "Initial tasks and requirements defined.",
      icon: <AssignmentIcon sx={{ color: 'white' }} />,
      color: '#6366f1',
      stats: `${stats.todo} Tasks`,
      status: stats.todo > 0 ? 'active' : 'upcoming'
    },
    {
      title: "Execution Phase",
      subtitle: "Active Development",
      desc: "Work currently in progress by the team.",
      icon: <SpeedIcon sx={{ color: 'white' }} />,
      color: '#0ea5e9',
      stats: `${stats.inProgress} Active`,
      status: stats.inProgress > 0 ? 'active' : 'upcoming'
    },
    {
      title: "Finalization Phase",
      subtitle: "Project Completion",
      desc: "Successfully delivered and reviewed tasks.",
      icon: <CheckCircleIcon sx={{ color: 'white' }} />,
      color: '#10b981',
      stats: `${stats.done} Done`,
      status: stats.done === stats.total && stats.total > 0 ? 'active' : 'upcoming'
    }
  ];

  return (
    <Box sx={{ py: 2, maxWidth: '100%', overflowX: 'hidden' }}>
      <Stack spacing={3}>
        {/* Health Card - Full Width on Mobile */}
        <Card sx={{ 
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="overline" sx={{ color: 'primary.light', fontWeight: 800, letterSpacing: 2 }}>Project Health</Typography>
            
            <Box sx={{ 
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 3, 
              mb: 2,
              height: { xs: 160, sm: 200 } // Responsive height
            }}>
              {/* Custom Donut Chart - Responsive Size */}
              <Box sx={{ 
                width: { xs: 160, sm: 200 }, 
                height: { xs: 160, sm: 200 },
                position: 'relative'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="15"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="15"
                    strokeDasharray="502.4"
                    initial={{ strokeDashoffset: 502.4 }}
                    animate={{ strokeDashoffset: 502.4 - (502.4 * completionRate) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                  />
                </svg>
                <Box sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  width: '100%'
                }}>
                  <Typography variant="h4" fontWeight="900" sx={{ color: 'white', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>{completionRate}%</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>STABLE</Typography>
                </Box>
              </Box>
            </Box>

            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="800" sx={{ color: 'white' }}>{stats.done}</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Done</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="800" sx={{ color: 'white' }}>{stats.total - stats.done}</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Remaining</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Process Distribution - Full Width */}
        <Paper className="glass-card" sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4, width: '100%' }}>
          <Typography variant="h6" fontWeight="800" letterSpacing="-0.5px" sx={{ mb: 4 }}>Process Distribution</Typography>
          
          <Stack spacing={2.5}>
            {[
              { label: 'Backlog', val: stats.todo, color: '#94a3b8', total: stats.total },
              { label: 'In Progress', val: stats.inProgress, color: '#6366f1', total: stats.total },
              { label: 'In Review', val: stats.review, color: '#f59e0b', total: stats.total },
              { label: 'Completed', val: stats.done, color: '#10b981', total: stats.total }
            ].map((item, i) => (
              <Box key={i} sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="700" color="text.secondary">{item.label}</Typography>
                  <Typography variant="subtitle2" fontWeight="800">{item.val}</Typography>
                </Stack>
                <Box sx={{ height: 8, width: '100%', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 4, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.total > 0 ? `${(item.val / item.total) * 100}%` : 0 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    style={{ height: '100%', backgroundColor: item.color, borderRadius: 4 }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Stack>

      <Typography variant="h5" fontWeight="800" letterSpacing="-1px" sx={{ mt: { xs: 4, sm: 6 }, mb: { xs: 2, sm: 4 }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        Workflow Lifecycle
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        {/* Custom Timeline Container */}
        <Stack spacing={0}>
          {timelineSteps.map((step, index) => (
            <Box key={index} sx={{ display: 'flex', minHeight: { xs: 100, sm: 120 } }}>
              {/* Left Side: Icon and Line */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: { xs: 2, sm: 4 } }}>
                <Box sx={{ 
                  width: { xs: 40, sm: 48 }, 
                  height: { xs: 40, sm: 48 }, 
                  borderRadius: '50%', 
                  bgcolor: step.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: `0 0 20px ${step.color}44`,
                  zIndex: 2,
                  border: '3px solid rgba(255,255,255,0.05)'
                }}>
                  {step.icon}
                </Box>
                {index !== timelineSteps.length - 1 && (
                  <Box sx={{ 
                    width: 2, 
                    flexGrow: 1, 
                    background: `linear-gradient(to bottom, ${step.color}, ${timelineSteps[index+1].color})`,
                    opacity: 0.3,
                    my: 1
                  }} />
                )}
              </Box>

              {/* Right Side: Content */}
              <Box sx={{ pb: { xs: 4, sm: 6 }, pt: 0.5, flexGrow: 1 }}>
                <Paper className="glass-card" sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  borderRadius: 4, 
                  transition: 'transform 0.2s',
                  '&:hover': { transform: { sm: 'translateX(8px)' } }
                }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                    <Box>
                      <Typography variant="caption" fontWeight="900" sx={{ color: step.color, textTransform: 'uppercase', letterSpacing: 2 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="h6" fontWeight="800" sx={{ mt: 0.5 }}>{step.subtitle}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 500 }}>
                        {step.desc}
                      </Typography>
                    </Box>
                    <Chip 
                      label={step.stats} 
                      size="small" 
                      sx={{ 
                        fontWeight: 900, 
                        bgcolor: `${step.color}11`, 
                        color: step.color,
                        border: `1px solid ${step.color}33`
                      }} 
                    />
                  </Stack>
                </Paper>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectProcess;

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert, Stack, Button } from '@mui/material';

import client from '../api/client';
import StatsCard from '../components/dashboard/StatsCard';
import UpcomingMeetings from '../components/dashboard/UpcomingMeetings';
import OverdueTasks from '../components/dashboard/OverdueTasks';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import DownloadIcon from '@mui/icons-material/Download';
import SecurityIcon from '@mui/icons-material/Security';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import LoadingScreen from '../components/shared/LoadingScreen';
import ScrollReveal from '../components/shared/ScrollReveal';
import { useAuth } from '../context/AuthContext';

import TeamPerformance from '../components/dashboard/TeamPerformance';
import ProjectHealth from '../components/dashboard/ProjectHealth';
import VelocityChart from '../components/dashboard/VelocityChart';
import AIArchitect from '../components/ai/AIArchitect';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [backupLoading, setBackupLoading] = useState(false);
  const [showInstallBtn, setShowInstallBtn] = useState(!!window.deferredPWAEvent);

  const isStakeholder = user?.role === 'Stakeholder';
  const isAdmin = user?.role === 'Admin' || user?.role === 'Product Owner';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await client.get('/dashboard');
        setStats(res.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();

    const handlePwaReady = () => {
      setShowInstallBtn(!!window.deferredPWAEvent);
    };

    window.addEventListener('pwa-ready', handlePwaReady);
    
    return () => {
      window.removeEventListener('pwa-ready', handlePwaReady);
    };
  }, []);

  const handleDownloadBackup = async () => {
    try {
      setBackupLoading(true);
      const response = await client.get('/backup/sql', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Sprintora_backup_${user?.company_id}_${Date.now()}.sql.gz`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Backup download failed:', err);
    } finally {
      setBackupLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  
  if (error) return <Alert severity="error" sx={{ borderRadius: 1.5 }}>{error}</Alert>;

  return (
    <Box sx={{ pb: 4 }}>
      <ScrollReveal>
        <Stack spacing={0.5} sx={{ mb: 5 }}>
          <Typography variant="h3" fontWeight="800" letterSpacing="-1px" sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
            {isStakeholder ? 'Executive Summary' : 'Dashboard'}
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight="400" sx={{ fontSize: { xs: '0.9rem', md: '1.25rem' } }}>
            {isStakeholder 
              ? `Welcome back, ${user?.name}. Here is your high-level organization status.`
              : `Welcome back to ${user?.company_name}! Here's an overview of your organization's performance.`}
          </Typography>
        </Stack>
      </ScrollReveal>

      {showInstallBtn && (
        <ScrollReveal delay={0.1}>
          <Box sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: 3, 
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">Sprintora Desktop & Mobile App</Typography>
              <Typography variant="body2" color="text.secondary">Install for real-time native notifications and a faster app-like experience.</Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AppShortcutIcon />}
              onClick={() => window.dispatchEvent(new CustomEvent('trigger-pwa-prompt'))}
              sx={{ 
                borderRadius: 2, 
                fontWeight: '900',
                px: 4,
                boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)'
              }}
            >
              Install App Now
            </Button>
          </Box>
        </ScrollReveal>
      )}

      {/* AI Architect Tool - Available for Admins and POs */}
      {isAdmin && (
        <ScrollReveal delay={0.1}>
          <Box sx={{ mb: 6 }}>
            <AIArchitect />
          </Box>
        </ScrollReveal>
      )}

      <Grid container spacing={3}>
        {/* Top Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <ScrollReveal delay={0.1}>
            <StatsCard 
              title={isStakeholder ? "Project Progress" : "Active Tasks"} 
              value={isStakeholder ? (stats.totalTasks > 0 ? Math.round((stats.doneToday / stats.totalTasks) * 100) : 0) + "%" : stats.totalTasks} 
              icon={<AssignmentIcon sx={{ color: '#3b82f6' }} />} 
              trend={isStakeholder ? "Overall delivery" : "+12% from last week"}
            />
          </ScrollReveal>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScrollReveal delay={0.2}>
            <StatsCard 
              title="Critical Items" 
              value={stats.overdueTasks} 
              icon={<WarningIcon sx={{ color: '#ef4444' }} />} 
              trend="Attention required"
              critical={stats.overdueTasks > 0}
            />
          </ScrollReveal>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScrollReveal delay={0.3}>
            <StatsCard 
              title={isStakeholder ? "Team Velocity" : "Completed"} 
              value={stats.doneToday} 
              icon={<CheckCircleIcon sx={{ color: '#10b981' }} />} 
              trend="Achievements today"
            />
          </ScrollReveal>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScrollReveal delay={0.4}>
            <StatsCard 
              title="Collaboration" 
              value={stats.upcomingMeetingsCount} 
              icon={<GroupsIcon sx={{ color: '#0ea5e9' }} />} 
              trend="Upcoming sessions"
            />
          </ScrollReveal>
        </Grid>

        {/* Charts & Lists */}
        <Grid item xs={12} lg={8}>
          <ScrollReveal delay={0.5}>
            <Box className="glass-card" sx={{ p: 0, overflow: 'hidden', mb: 3, height: { xs: 350, sm: 400, md: 'auto' }, minHeight: { md: 450 } }}>
              <VelocityChart />
            </Box>


            <Box className="glass-card" sx={{ p: 0, overflow: 'hidden' }}>
              <ProjectHealth projects={stats.projectHealth} />
            </Box>
          </ScrollReveal>
        </Grid>

        <Grid item xs={12} lg={4}>
          <ScrollReveal delay={0.6}>
            <Box className="glass-card" sx={{ p: 0, overflow: 'hidden', mb: 3 }}>
              <TeamPerformance performance={stats.userPerformance} />
            </Box>
            <Box className="glass-card" sx={{ p: 0, overflow: 'hidden' }}>
              <UpcomingMeetings meetings={stats.upcomingMeetingsList} />
            </Box>
          </ScrollReveal>
        </Grid>
      </Grid>

      {/* Administration Section - Admin Only */}
      {isAdmin && (
        <ScrollReveal delay={0.7}>
          <Box className="glass-card" sx={{ mt: 6, p: 4, borderRadius: 3, border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.1)', display: 'flex' }}>
                <SecurityIcon color="primary" />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">Governance & Security</Typography>
                <Typography variant="body2" color="text.secondary">Manage organizational data portability and security exports.</Typography>
              </Box>
            </Stack>
            
            <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" fontWeight="bold">Full Organization Backup (.sql)</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Export all your organizational data including projects, tasks, members, and audit logs. 
                    The backup is generated as a standard SQL script compatible with PostgreSQL.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                  <Button 
                    variant="contained" 
                    startIcon={backupLoading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                    onClick={handleDownloadBackup}
                    disabled={backupLoading}
                    sx={{ borderRadius: 2, fontWeight: 'bold' }}
                  >
                    {backupLoading ? 'Preparing Backup...' : 'Download Export'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ScrollReveal>
      )}
    </Box>
  );
};

export default DashboardPage;

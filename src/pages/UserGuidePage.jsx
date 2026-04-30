import React from 'react';
import { 
  Box, Typography, Grid, Paper, Stack, 
  Button, List, ListItem, ListItemIcon, ListItemText,
  Card, CardContent, Divider, Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VerifiedIcon from '@mui/icons-material/Verified';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const UserGuidePage = () => {
  const steps = [
    {
      title: "Getting Started & Team Setup",
      icon: <GroupsIcon color="primary" />,
      description: "Initialize your secure workspace and assemble your high-performance team.",
      details: [
        "Create your Organization profile to centralize operations.",
        "Invite team members via the Users dashboard.",
        "Assign Admin or Developer roles to manage permissions.",
        "Verify your account via the secure activation link in your inbox."
      ]
    },
    {
      title: "Project Lifecycle Management",
      icon: <RocketLaunchIcon color="primary" />,
      description: "Define clear objectives and establish a roadmap for your team's success.",
      details: [
        "Create projects with specific, actionable goals.",
        "Add members to projects to enable collaboration.",
        "Set project status (Planning, In Progress, On Hold) for transparency.",
        "Toggle Public vs Private visibility for organizational privacy."
      ]
    },
    {
      title: "Intelligent Task Orchestration",
      icon: <AssignmentIcon color="primary" />,
      description: "Break down complex requirements into manageable units of work.",
      details: [
        "Create tasks with clear, action-driven titles.",
        "Assign task ownership to ensure accountability.",
        "Set priorities (Critical to Low) and hard deadlines.",
        "Use real-time comments to keep communication context-aware."
      ]
    },
    {
      title: "Smart AI-Driven Insights",
      icon: <PsychologyIcon color="primary" />,
      description: "Leverage our built-in intelligence to stay ahead of technical bottlenecks.",
      details: [
        "AI-Powered Prioritization based on deadlines and velocity.",
        "Predictive risk scores for complex task dependencies.",
        "Automated subtask generation from high-level requirements.",
        "Productivity summaries delivered via the Intelligence Hub."
      ]
    },
    {
      title: "Real-Time Notifications",
      icon: <NotificationsActiveIcon color="primary" />,
      description: "Stay synchronized with your team without the distraction of noise.",
      details: [
        "In-app alerts for assignments, mentions, and updates.",
        "Secure Web Push notifications for off-tab awareness.",
        "Automated email digests for critical milestones.",
        "Customizable preference settings in your Profile."
      ]
    },
    {
      title: "Global Asset Storage (R2)",
      icon: <CloudUploadIcon color="primary" />,
      description: "Centralize your organizational knowledge with high-speed asset management.",
      details: [
        "Upload files up to 50MB with industrial encryption.",
        "Independent 200MB organization storage quota.",
        "Scrape and pin research links with automated metadata.",
        "Directly link assets to tasks, projects, and meetings."
      ]
    },
  ];

  const proTips = [
    {
      title: "Batch Planning",
      content: "Dedicate 10 minutes every Monday to plan your week and set priorities using the AI Intelligence Hub."
    },
    {
      title: "Contextual Chat",
      content: "Use task comments instead of external chat apps to maintain a searchable history of technical decisions."
    },
    {
      title: "Storage Awareness",
      content: "Regularly audit your Files section to manage your 200MB organizational limit efficiently."
    }
  ];

  const troubleshooting = [
    {
      title: "Session Expiry",
      content: "Sessions expire after 24 hours for security. Use 'Remember Me' for a 30-day persistent session."
    },
    {
      title: "File Uploads",
      content: "Ensure files are under 50MB. If uploads fail, verify your organization hasn't exceeded its 200MB quota."
    }
  ];

  return (
    <Box sx={{ pb: 6 }}>
      <Stack spacing={1} sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight="950" letterSpacing="-1.5px" color="primary.main" sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}>
          Platform Masterclass
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: 600, fontWeight: 500 }}>
          Master the AI-driven Agile workflow of Sprintora and activate your team's productivity in minutes.
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" fontWeight="950" sx={{ mb: 3, letterSpacing: 1 }}>THE SPRINTORA FLOW</Typography>
          <Stack spacing={3}>
            {steps.map((step, index) => (
              <Card key={index} sx={{ 
                borderRadius: 5, 
                border: '1px solid rgba(255,255,255,0.05)',
                bgcolor: 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', transform: 'translateY(-4px)' }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} alignItems="flex-start">
                    <Box sx={{ 
                      p: 2, borderRadius: 3, bgcolor: 'rgba(59, 130, 246, 0.1)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {step.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="900" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, mb: 1 }}>
                        {index + 1}. {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, fontSize: { xs: '0.85rem', md: '0.95rem' } }}>
                        {step.description}
                      </Typography>
                      <List dense disablePadding>
                        {step.details.map((detail, dIndex) => (
                          <ListItem key={dIndex} sx={{ px: 0, py: 0.6, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 26, mt: 0.4 }}><VerifiedIcon sx={{ fontSize: 18, color: 'success.main' }} /></ListItemIcon>
                            <ListItemText primary={detail} primaryTypographyProps={{ variant: 'body2', fontWeight: 600, sx: { fontSize: '0.8rem', lineHeight: 1.4, opacity: 0.9 } }} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <Paper sx={{ 
              p: 4, borderRadius: 5, 
              background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)', 
              color: 'white',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <StorageIcon sx={{ fontSize: 40, mb: 2, opacity: 1 }} />
                <Typography variant="h5" fontWeight="900" gutterBottom>Storage Hub</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 3, lineHeight: 1.6, fontWeight: 500 }}>
                  Every organization receives **200MB** of secure R2 asset storage. Files are capped at **50MB** per upload. This quota remains independent of your workspace performance metrics.
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 900, borderRadius: 3, py: 1.2, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                  onClick={() => window.open('mailto:support@vsgrps.com', '_blank')}
                >
                  Request Quota Increase
                </Button>
              </Box>
            </Paper>

            <Typography variant="h6" fontWeight="950" sx={{ mt: 2, mb: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LightbulbIcon color="primary" /> PRO TIPS
            </Typography>
            {proTips.map((tip, index) => (
              <Paper key={index} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(255,255,255,0.01)' }}>
                <Typography variant="subtitle2" fontWeight="900" color="primary.main" sx={{ mb: 1, textTransform: 'uppercase' }}>{tip.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
                  {tip.content}
                </Typography>
              </Paper>
            ))}

            <Typography variant="h6" fontWeight="950" sx={{ mt: 2, mb: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <HelpCenterIcon color="error" /> TROUBLESHOOTING
            </Typography>
            {troubleshooting.map((item, index) => (
              <Paper key={index} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(255,255,255,0.01)' }}>
                <Typography variant="subtitle2" fontWeight="900" color="error.main" sx={{ mb: 1, textTransform: 'uppercase' }}>{item.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
                  {item.content}
                </Typography>
              </Paper>
            ))}

            <Paper sx={{ p: 3, borderRadius: 4, border: '2px dashed rgba(239, 68, 68, 0.2)', bgcolor: 'rgba(239, 68, 68, 0.02)' }}>
              <Typography variant="subtitle2" fontWeight="900" color="error.main" sx={{ mb: 1 }}>TECHNICAL RESET</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, fontWeight: 500, display: 'block', mb: 2 }}>
                If you encounter synchronization issues, loading errors, or UI glitches, performing a **Hard Refresh** will clear temporary cache and resync with the server.
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                fullWidth 
                size="small"
                onClick={() => window.location.href = window.location.href}
                sx={{ fontWeight: 800, borderRadius: 2 }}
              >
                Force App Reload
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserGuidePage;

import React from 'react';
import { 
  Box, Typography, Grid, Paper, Stack, 
  Button, List, ListItem, ListItemIcon, ListItemText,
  Card, CardContent, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VerifiedIcon from '@mui/icons-material/Verified';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BrandLogo from '../components/shared/BrandLogo';

const UserGuidePage = () => {
  const steps = [
    {
      title: "Dashboard & Real-Time Pulse",
      icon: <DashboardIcon color="primary" />,
      description: "Get an executive overview of your workspace health and team velocity.",
      details: [
        "Monitor dynamic Workspace Health (Activity + Completion).",
        "Track pending tasks and upcoming project deadlines.",
        "Quick access to recently modified tasks and meetings."
      ]
    },
    {
      title: "Project Lifecycle Management",
      icon: <RocketLaunchIcon color="primary" />,
      description: "From inception to delivery, manage your project roadmap with precision.",
      details: [
        "Create multi-member projects with specific goals.",
        "Toggle project visibility (Public vs Private).",
        "Archive completed projects to keep your workspace clean."
      ]
    },
    {
      title: "Intelligent AI Architect",
      icon: <PsychologyIcon color="primary" />,
      description: "The core engine that automates task planning and risk forecasting.",
      details: [
        "Generate 15+ subtasks from a single requirement.",
        "Review AI-generated Rationales (Explainable AI).",
        "Analyze Predictive Risk Scores for technical bottlenecks."
      ]
    },
    {
      title: "Advanced Task Orchestration",
      icon: <AssignmentIcon color="primary" />,
      description: "A professional Kanban system designed for high-performance engineers.",
      details: [
        "Manage subtasks with drag-and-drop simplicity.",
        "Assign priority labels (Critical, High, Medium, Low).",
        "Real-time comments and activity tracking per task."
      ]
    },
    {
      title: "Meeting Automation Hub",
      icon: <GroupsIcon color="primary" />,
      description: "Streamline communication with integrated meeting notes and attendee tracking.",
      details: [
        "Schedule meetings and invite team members.",
        "Collaborate on real-time meeting notes and action items.",
        "Link files directly to meeting contexts for quick reference."
      ]
    },
    {
      title: "Cloud Asset Storage (R2)",
      icon: <CloudUploadIcon color="primary" />,
      description: "Secure, high-speed storage for your organizational documentation.",
      details: [
        "Upload files up to 50MB with industrial encryption.",
        "Pin research links with automated metadata scraping.",
        "Independent 200MB quota that doesn't affect health scores."
      ]
    },
  ];

  const faq = [
    {
      title: "RBAC Security",
      icon: <SecurityIcon color="error" />,
      content: "Role-Based Access Control ensures data integrity. Admins can manage users, while Members focus on execution, and Auditors maintain transparency."
    },
    {
      title: "Audit Transparency",
      icon: <VerifiedIcon color="info" />,
      content: "Every action is logged. Audit logs provide a verifiable trail of changes to tasks, projects, and files, ensuring accountability across the team."
    },
    {
      title: "Analytics Reports",
      icon: <TimelineIcon color="success" />,
      content: "Access executive-level velocity reports and project status summaries, optimized for both desktop and mobile decision-making."
    }
  ];

  return (
    <Box sx={{ pb: 6 }}>
      <Stack spacing={1} sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight="800" letterSpacing="-1.5px" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          Platform Masterclass
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1rem', opacity: 0.8 }}>
          Master the AI-driven Agile workflow of Sprintora in 4 simple steps.
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
        <Typography variant="h5" fontWeight="900" sx={{ mb: 3, mt: { xs: 4, lg: 0 }, letterSpacing: 1, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>FEATURE DEEP DIVE</Typography>
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
                      <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, mb: 1 }}>
                        {index + 1}. {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                        {step.description}
                      </Typography>
                      <List dense disablePadding>
                        {step.details.map((detail, dIndex) => (
                          <ListItem key={dIndex} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 24, mt: 0.5 }}><VerifiedIcon sx={{ fontSize: 16, color: 'success.main' }} /></ListItemIcon>
                            <ListItemText primary={detail} primaryTypographyProps={{ variant: 'caption', fontWeight: 600, sx: { fontSize: '0.75rem', lineHeight: 1.4 } }} />
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
            <Typography variant="h5" fontWeight="900" sx={{ mb: 1, letterSpacing: 1 }}>INTELLIGENCE HUB</Typography>
            {faq.map((item, index) => (
              <Paper key={index} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  {item.icon}
                  <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {item.content}
                </Typography>
              </Paper>
            ))}

            <Paper sx={{ 
              p: 4, borderRadius: 4, 
              background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)', 
              color: 'white',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
            }}>
              <StorageIcon sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>Storage Hub</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3, lineHeight: 1.6 }}>
                Every organization receives **200MB** of independent R2 storage. Individual files are capped at **50MB**. This limit is separate from your **Workspace Health** metrics.
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 800, borderRadius: 3, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                onClick={() => window.open('https://vsgrps.com/support', '_blank')}
              >
                Request Increase
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserGuidePage;

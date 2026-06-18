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
import EventNoteIcon from '@mui/icons-material/EventNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const UserGuidePage = () => {
  const steps = [
    {
      title: "Workspace Activation & Team Setup",
      icon: <GroupsIcon color="primary" />,
      description: "Initialize your secure organization, invite your colleagues, and establish roles.",
      details: [
        "Organization Creation: The first registering user automatically sets up the company workspace as an Admin.",
        "Role Hierarchy: Assign Admin (full controls), Product Owner/Scrum Master (scope management), Developer (execution), or Stakeholder (read-only).",
        "Secure Invites: Generate secure registration links to onboard team members directly.",
        "Email Verification: Protect your workspace; all users must verify their email addresses before logging in."
      ]
    },
    {
      title: "Agile Project Governance & Archiving",
      icon: <RocketLaunchIcon color="primary" />,
      description: "Organize tasks by projects, pin critical priorities, and archive completed cycles.",
      details: [
        "Project Scope: Set clear goals, timelines, and status (Planning, In Progress, On Hold).",
        "Project Pinning: Pinned projects automatically float to the top of your workspace dashboard.",
        "Team Assignment: Explicitly assign team members to control workspace access.",
        "Project Archiving: Keep the active workspace clean by archiving closed projects."
      ]
    },
    {
      title: "Kanban Board & Workflows",
      icon: <AssignmentIcon color="primary" />,
      description: "Track execution with custom Kanban board swimlanes and role-based permissions.",
      details: [
        "State Transitions: Move tasks from 'To Do', 'In Progress', 'Review', to 'Done'.",
        "Quality Gate Enforcement: Only Admins can officially transition tasks to 'Done' to ensure verification.",
        "Developer Status Updates: Developers can update the status of tasks assigned specifically to them.",
        "Subtask Breakdown: Divide complex items into granular, checkable subtask checklists."
      ]
    },
    {
      title: "AI Architect & Neural Planning",
      icon: <PsychologyIcon color="primary" />,
      description: "Leverage the Llama-3.3 powered AI Architect to automate task design and roadmapping.",
      details: [
        "AI Task Breakdown: Generate technical tasks automatically from simple prompt requirements.",
        "Smart Estimation: Receive suggestions for task complexity, estimated hours, and ideal roles.",
        "Bulk Board Population: Click 'Create All' to instantly push AI tasks and subtasks to your board.",
        "Predictive Scheduling: AI analyzes velocity trends to forecast realistic project delivery dates."
      ]
    },
    {
      title: "Task Comments & Real-Time @Mentions",
      icon: <LightbulbIcon color="primary" />,
      description: "Keep collaboration context-aware with threaded discussions directly inside tasks.",
      details: [
        "Contextual Threads: Centralize all technical decisions inside task comments instead of external chat apps.",
        "Real-Time @Mentions: Tag users using @username in comments to trigger instant notifications.",
        "Notification Bell: Stay updated on assignments, mentions, and system alerts via the smart bell icon.",
        "One-Click Clear: Use 'Mark All as Read' to clean your notification queue instantly."
      ]
    },
    {
      title: "Meetings, Agendas & Interactive Notes",
      icon: <EventNoteIcon color="primary" />,
      description: "Schedule, coordinate, and log technical syncs inside your team workspace.",
      details: [
        "Meeting Scheduling: Organize sprint planning, standups, or reviews with clear descriptions.",
        "Attendance Logging: Track attendee presence to ensure team alignment.",
        "Interactive Notes: Store meeting notes and action items directly in the project context.",
        "Contextual Linking: Reference tasks directly in meeting notes to maintain history."
      ]
    },
    {
      title: "Global Asset Storage & Link Vault",
      icon: <CloudUploadIcon color="primary" />,
      description: "Manage private file uploads and centralize bookmarks with automatic meta preview.",
      details: [
        "Industrial Encryption: Upload project documents, design assets, and files up to 50MB.",
        "R2 Storage Quota: Benefit from 200MB of high-speed organizational storage.",
        "Link Vaulting: Save Figma, documentation, or staging links with rich automatic metadata scraping.",
        "Asset Linking: Attach uploaded files and link vault cards to specific tasks and meetings."
      ]
    },
    {
      title: "Analytics, Velocity & Performance",
      icon: <BarChartIcon color="primary" />,
      description: "Track execution metrics and team velocity through visual interactive dashboards.",
      details: [
        "Executive Health Cards: Get rapid metrics on project status, pending items, and overall health.",
        "Team Velocity Charting: A rolling 12-week velocity graph showing task completion speed.",
        "Work Distribution: Visual breakdown comparing assigned work versus completed tasks.",
        "Storage Quota Tracking: Real-time progress bar of organizational storage usage."
      ]
    },
    {
      title: "Governance, Audit Trail & Backups",
      icon: <AdminPanelSettingsIcon color="primary" />,
      description: "Enforce company security policies with custom RBAC, full audit logging, and data exports.",
      details: [
        "Custom RBAC Roles: Create custom roles with granular permissions (e.g. system:backup, role:manage).",
        "Audit Logging: Track sensitive actions like project deletions, role creation, or backup downloads.",
        "Database Portability: Admins can download a full backup file containing all organization data.",
        "OTP Master Portal: Secure, secondary authentication panel for system administrators."
      ]
    },
    {
      title: "PWA Offline Readiness & Push Alerts",
      icon: <NotificationsActiveIcon color="primary" />,
      description: "Install Sprintora on desktop or mobile and stay connected with browser push alerts.",
      details: [
        "Desktop & Mobile Installation: Add the app to your home screen for a distraction-free experience.",
        "Browser Push Notifications: Get real-time notifications even when the Sprintora tab is closed.",
        "Responsive Flow: Responsive grids dynamically adapt layout for mobile, tablet, and desktop.",
        "Offline Shell: Fast loads with service worker caching for unreliable connections."
      ]
    }
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
                  sx={{ 
                    background: '#ffffff !important', 
                    color: '#1d4ed8 !important', 
                    fontWeight: 900, 
                    borderRadius: 3, 
                    py: 1.2, 
                    '&:hover': { 
                      background: 'rgba(255,255,255,0.9) !important' 
                    } 
                  }}
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


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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';

const UserGuidePage = () => {
  const sections = [
    {
      title: "Getting Started",
      icon: <RocketLaunchIcon color="primary" />,
      description: "Welcome to VSGRPS Agile Workspace. This platform is designed to streamline your project management with industrial-grade security.",
      steps: [
        "Create or join a workspace (Organization).",
        "Set up your profile and preferences in settings.",
        "Invite team members to collaborate."
      ]
    },
    {
      title: "Managing Projects",
      icon: <DashboardIcon color="primary" />,
      description: "Organize your work into projects. Each project can have its own tasks, meetings, and files.",
      steps: [
        "Click 'New Project' on the Projects page.",
        "Define project status (Active, On Hold, Completed).",
        "Add members to the project to give them access."
      ]
    },
    {
      title: "Tracking Progress",
      icon: <TimelineIcon color="primary" />,
      description: "Use the Process tab within a project to visualize progress.",
      steps: [
        "Monitor task distribution (To Do, In Progress, Review, Done).",
        "View the completion rate to stay on schedule.",
        "Check the workflow timeline for phase-wise progress."
      ]
    },
    {
      title: "Meetings & Outcomes",
      icon: <GroupsIcon color="primary" />,
      description: "Schedule meetings and keep track of outcomes and meeting links.",
      steps: [
        "Add a meeting link (Zoom/Meet) when scheduling.",
        "Record meeting outcomes directly in the detail page.",
        "Export meeting summaries to PDF for documentation."
      ]
    },
    {
      title: "AI Architect",
      icon: <AutoAwesomeIcon color="primary" />,
      description: "Harness the power of AI to decompose requirements into actionable tasks and subtasks.",
      steps: [
        "Navigate to the AI Architect on your Dashboard.",
        "Select a Project (Mandatory) and describe your requirement.",
        "Review AI-generated tasks and bulk-create them instantly.",
        "AI automatically estimates priorities and creates subtask structures."
      ]
    },
    {
      title: "Data Portability & Backups",
      icon: <DownloadIcon color="primary" />,
      description: "Manage your organization's data with enterprise-grade streaming backups.",
      steps: [
        "Go to the 'Governance & Security' section on your Dashboard.",
        "Click 'Download Export' to generate a Gzip-compressed SQL dump.",
        "Exports include projects, tasks, members, and full audit history.",
        "System owners can access the 'Master Portal' for global diagnostics."
      ]
    },
    {
      title: "In-Depth Role Matrix",
      icon: <SecurityIcon color="primary" />,
      description: "VSGRPS Agile uses strict Role-Based Access Control (RBAC) to ensure operational integrity and professional governance.",
      steps: [
        "Administrator: Ultimate authority. Can manage users, export full system backups, view global audit logs, and override any task status (including final verification to 'Done').",
        "Product Owner: Backlog owner. Can create projects, use AI Architect, modify task titles/descriptions, set priorities, and manage project members.",
        "Scrum Master: Process facilitator. Can manage meetings, update task timelines, and unblock team members. Has limited access to core project settings.",
        "Developer: Execution focus. Can ONLY update the status (To Do -> Review) of tasks assigned to them. Can add comments and complete subtasks. Cannot modify titles, descriptions, or deadlines.",
        "Stakeholder: View-only observer. Access to dashboards, progress bars, and meeting notes. Cannot make any changes to the system."
      ]
    },
    {
      title: "Effective Usage Tips",
      icon: <AssignmentIcon color="primary" />,
      description: "How to get the most out of VSGRPS Agile to accelerate your delivery cycles.",
      steps: [
        "AI First Workflow: Use the AI Architect to break down large features. It ensures consistent subtask structures and realistic estimations.",
        "Deadlines & Progress: Keep an eye on the visual 'Timeline consumed' progress bars on tasks. Red indicates immediate action is needed.",
        "Mention Collaboration: Use '@username' in task comments to instantly notify team members and bring their attention to blockers.",
        "Project Health: Use the 'Process' tab regularly. If your completion rate is below 70% mid-sprint, re-prioritize using the PO role.",
        "Audit Integrity: Remember that every change is logged. This provides transparency for retrospective meetings and performance reviews."
      ]
    }
  ];

  return (
    <Box sx={{ pb: 6 }}>
      <Stack spacing={1} sx={{ mb: 5 }}>
        <Typography variant="h3" fontWeight="800" letterSpacing="-1.5px">
          User Guide
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Everything you need to know to master the VSGRPS Agile Workspace.
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Stack spacing={4}>
            {sections.map((section, index) => (
              <Card key={index} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 3, 
                      bgcolor: 'rgba(59, 130, 246, 0.1)', 
                      display: 'flex' 
                    }}>
                      {section.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      {section.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {section.description}
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <List>
                    {section.steps.map((step, sIndex) => (
                      <ListItem key={sIndex} disableGutters>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box sx={{ 
                            width: 24, 
                            height: 24, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            {sIndex + 1}
                          </Box>
                        </ListItemIcon>
                        <ListItemText primary={step} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <Paper sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)', color: 'white' }}>
              <SecurityIcon sx={{ fontSize: 48, mb: 2, opacity: 0.8 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Security First
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                Your data is protected by multi-tenant isolation and persistent session management. Every action is logged for audit purposes.
              </Typography>
              <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
                Security Whitepaper
              </Button>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Our support team is available 24/7 for enterprise customers.
              </Typography>
              <Button variant="outlined" fullWidth sx={{ borderRadius: 3 }}>
                Contact Support
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserGuidePage;

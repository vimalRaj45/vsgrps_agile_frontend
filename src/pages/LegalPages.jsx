import React from 'react';
import { Box, Container, Typography, Stack, Button, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const LegalPageLayout = ({ title, lastUpdated, children }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', py: 8 }}>
      <Container maxWidth="md">
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 6 }}>
          <IconButton onClick={() => navigate(-1)} color="inherit" sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.palette.divider}` }}>
            <ArrowBackIcon />
          </IconButton>
          <Stack direction="row" spacing={1} alignItems="center">
            <AutoAwesomeIcon sx={{ color: '#6366f1' }} />
            <Typography variant="h6" fontWeight="900">Sprintora Legal</Typography>
          </Stack>
        </Stack>

        <Typography variant="h2" fontWeight="950" gutterBottom sx={{ letterSpacing: '-2px' }}>{title}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 6, fontWeight: 700, letterSpacing: 1 }}>
          LAST UPDATED: {lastUpdated}
        </Typography>

        <Box sx={{ 
          '& p': { mb: 3, lineHeight: 1.8, color: 'text.secondary', fontSize: '1.1rem' },
          '& h3': { mt: 6, mb: 3, fontWeight: 900, color: 'text.primary' },
          '& ul': { mb: 4, pl: 2 },
          '& li': { mb: 2, color: 'text.secondary' }
        }}>
          {children}
        </Box>

        <Box sx={{ mt: 12, p: 6, borderRadius: 4, bgcolor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.02)', border: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="900" gutterBottom>Have questions?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Our legal and support teams are here to help you understand our commitments.</Typography>
          <Button variant="contained" sx={{ borderRadius: 3, px: 6, py: 1.5, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
            Contact Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export const PrivacyPage = () => (
  <LegalPageLayout title="Privacy Policy" lastUpdated="APRIL 25, 2026">
    <h3>1. Our Commitment to Your Data</h3>
    <p>At Sprintora, privacy isn't just a legal requirement; it's a core design principle. We believe that your project data, your ideas, and your team's velocity are private assets. Our architecture ensures that data isolation is enforced at every layer of our neural planning engine.</p>
    
    <h3>2. Data Collection</h3>
    <p>We collect only what is necessary to power your workspace:</p>
    <ul>
      <li>Account Information: Name, email, and authentication metadata.</li>
      <li>Workspace Content: Project descriptions, task details, and team comments.</li>
      <li>Usage Metrics: Performance data to optimize our AI models for your specific industry.</li>
    </ul>

    <h3>3. AI and Machine Learning</h3>
    <p>Your data is used to fine-tune the AI assistants within your specific workspace. We do not sell your data to third parties, nor do we use your proprietary project roadmaps to train public models without anonymization and explicit consent.</p>
  </LegalPageLayout>
);

export const TermsPage = () => (
  <LegalPageLayout title="Terms of Service" lastUpdated="APRIL 25, 2026">
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing Sprintora, you agree to be bound by these high-standard terms of service. We provide an AI-accelerated agile environment designed for professional builders and teams who value precision and speed.</p>
    
    <h3>2. Workspace Ownership</h3>
    <p>You retain full ownership of all intellectual property created within your Sprintora workspace. We provide the tools; you provide the vision. Our role is solely to accelerate your execution through neural automation.</p>

    <h3>3. Fair Use of AI Resources</h3>
    <p>Sprintora provides significant computational power for task generation and roadmap architecture. We expect fair use of these resources. Automated scraping or reverse-engineering of our neural planning engine is strictly prohibited.</p>

    <h3>4. Liability</h3>
    <p>While our AI is highly precise, project execution remains a human endeavor. Sprintora is a co-pilot, not a replacement for human judgment and safety protocols in production environments.</p>
  </LegalPageLayout>
);

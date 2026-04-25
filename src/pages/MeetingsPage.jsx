import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Grid, CircularProgress, Alert,
  Card, CardContent, Divider, Chip, AvatarGroup, Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import MeetingForm from '../components/meetings/MeetingForm';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import LoadingScreen from '../components/shared/LoadingScreen';

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  const fetchMeetings = async () => {
    try {
      const res = await client.get('/meetings');
      setMeetings(res.data);
    } catch (err) {
      setError('Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (loading && meetings.length === 0) return <LoadingScreen />;

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        gap: 2,
        mb: 4 
      }}>
        <Box>
          <Typography variant="h4" fontWeight="800" letterSpacing="-1px" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Meetings
          </Typography>
          <Typography variant="body2" color="text.secondary">Sync with your team and stakeholders</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          sx={{ width: { xs: '100%', sm: 'auto' }, borderRadius: 2 }}
        >
          Schedule Meeting
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {meetings.length === 0 ? (
          <Grid item="true" xs={12}>
            <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'background.paper', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary">No meetings scheduled</Typography>
              <Button sx={{ mt: 2 }} onClick={() => setOpenForm(true)}>Schedule your first meeting</Button>
            </Box>
          </Grid>
        ) : (
          meetings.map(meeting => (
            <Grid item="true" xs={12} md={6} lg={4} key={meeting.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  cursor: 'pointer',
                  '&:hover': { border: '1px solid rgba(25, 118, 210, 0.5)' }
                }}
                onClick={() => navigate(`/meetings/${meeting.id}`)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                      label={meeting.status}
                      size="small"
                      color={meeting.status === 'Completed' ? 'success' : 'primary'}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(meeting.scheduled_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{meeting.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Project: {meeting.project_name || 'General'}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" fontWeight="bold">Time: {new Date(meeting.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                    <GroupsIcon color="action" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <MeetingForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => {
          setOpenForm(false);
          fetchMeetings();
        }}
      />
    </Box>
  );
};

export default MeetingsPage;

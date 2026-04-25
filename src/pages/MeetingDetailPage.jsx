import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Grid, CircularProgress, Alert,
  Paper, Divider, Chip, Stack, TextField, Avatar, Tooltip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import MeetingNotes from '../components/meetings/MeetingNotes';
import { jsPDF } from 'jspdf';
import client from '../api/client';
import LoadingScreen from '../components/shared/LoadingScreen';

const MeetingDetailPage = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await client.get(`/meetings/${id}`);
        setMeeting(res.data);
      } catch (err) {
        setError('Failed to fetch meeting details');
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [id]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add background color header
    doc.setFillColor(30, 27, 75); // Dark blue (Indigo-950)
    doc.rect(0, 0, 210, 40, 'F');
    
    // Company "Stamp" / Header
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('Sprintora', 15, 20);
    doc.setFontSize(10);
    doc.text('OFFICIAL MEETING MINUTES', 15, 30);
    
    // Header Info
    doc.setFontSize(9);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 150, 30);
    
    // Meeting Title
    doc.setTextColor(30, 27, 75);
    doc.setFontSize(22);
    doc.text(meeting.title.toUpperCase(), 15, 55);
    
    // Horizontal Line
    doc.setDrawColor(99, 102, 241); // Indigo-500
    doc.setLineWidth(1);
    doc.line(15, 60, 195, 60);
    
    // Details Grid
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('MEETING INFORMATION', 15, 75);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`DATE & TIME:`, 15, 85);
    doc.text(new Date(meeting.scheduled_at).toLocaleString(), 60, 85);
    
    doc.text(`PROJECT:`, 15, 93);
    doc.text(meeting.project_name || 'General Internal', 60, 93);
    
    doc.text(`LOCATION:`, 15, 101);
    doc.text(meeting.meeting_link || 'Physical / Office', 60, 101);
    
    // Attendees
    doc.setFont('helvetica', 'bold');
    doc.text('ATTENDEES:', 15, 115);
    doc.setFont('helvetica', 'normal');
    const attendeeList = meeting.attendees?.map(a => a.name).join(', ') || 'None listed';
    const splitAttendees = doc.splitTextToSize(attendeeList, 135);
    doc.text(splitAttendees, 60, 115);
    
    // Agenda Section
    let y = 130;
    doc.setFillColor(243, 244, 246);
    doc.rect(15, y, 180, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('AGENDA', 20, y + 6);
    
    doc.setFont('helvetica', 'normal');
    y += 15;
    const splitAgenda = doc.splitTextToSize(meeting.agenda || 'No agenda provided.', 170);
    doc.text(splitAgenda, 20, y);
    y += splitAgenda.length * 5 + 10;
    
    // Outcome Section
    doc.setFillColor(243, 244, 246);
    doc.rect(15, y, 180, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('KEY OUTCOMES', 20, y + 6);
    
    doc.setFont('helvetica', 'normal');
    y += 15;
    const splitOutcome = doc.splitTextToSize(meeting.outcome || 'No specific outcomes recorded.', 170);
    doc.text(splitOutcome, 20, y);
    y += splitOutcome.length * 5 + 10;
    
    // Footer / Stamp
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 275, 195, 275);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('This is a system generated document from Sprintora Platform.', 15, 282);
    doc.text('Confidential & Internal Use Only', 160, 282);
    
    doc.save(`Meeting_${meeting.title.replace(/\s+/g, '_')}.pdf`);
  };

  const handleUpdate = async (updates) => {
    setIsUpdating(true);
    setError('');
    try {
      await client.patch(`/meetings/${id}`, updates);
    } catch (err) {
      console.error(err);
      setError('Failed to update meeting details');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error && !meeting) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'stretch', md: 'flex-start' }} 
        spacing={3}
        sx={{ mb: 6 }}
      >
        <Box>
          <Typography variant="h3" fontWeight="900" letterSpacing="-2px" sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }}>
            {meeting.title}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip 
              icon={<AccessTimeIcon sx={{ fontSize: '1rem !important' }} />} 
              label={new Date(meeting.scheduled_at).toLocaleString()} 
              size="small" 
              className="glass-card"
              sx={{ border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.05)' }}
            />
            <Chip 
              label={meeting.status} 
              color={meeting.status === 'Completed' ? 'success' : 'primary'} 
              size="small" 
              sx={{ fontWeight: 'bold' }}
            />
          </Stack>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />} 
          onClick={handleExportPDF}
          fullWidth={{ xs: true, md: false }}
          sx={{ 
            borderRadius: 3, 
            height: { xs: 56, md: 48 },
            px: 4, 
            fontWeight: 'bold', 
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' 
          }}
        >
          Export Minutes
        </Button>
      </Stack>

      <Grid container spacing={{ xs: 3, lg: 5 }}>

        <Grid item xs={12} md={8}>
          <MeetingNotes meetingId={id} />

          <Paper sx={{ p: 4, mt: 3, borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Typography variant="h6" fontWeight="900" gutterBottom>Key Outcomes</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="What was the final outcome of this meeting?"
              value={meeting.outcome || ''}
              onChange={(e) => setMeeting({ ...meeting, outcome: e.target.value })}
              sx={{ 
                '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' } 
              }}
            />
            
            <Typography variant="h6" fontWeight="900" gutterBottom sx={{ mt: 4 }}>Meeting Summary</Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Detailed summary of the meeting..."
              value={meeting.summary || ''}
              onChange={(e) => setMeeting({ ...meeting, summary: e.target.value })}
              sx={{ 
                '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' } 
              }}
            />
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                size="large" 
                disabled={isUpdating}
                startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null}
                onClick={() => handleUpdate({ 
                  outcome: meeting.outcome, 
                  summary: meeting.summary 
                })}
                sx={{ borderRadius: 3, px: 4, fontWeight: 'bold' }}
              >
                {isUpdating ? 'Saving...' : 'Save Meeting Details'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Attendees Section */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <GroupsIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="900">Attendees</Typography>
            </Stack>
            <Stack spacing={1.5}>
              {meeting.attendees?.length > 0 ? (
                meeting.attendees.map(attendee => (
                  <Box key={attendee.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                      {attendee.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{attendee.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{attendee.email}</Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No attendees listed.</Typography>
              )}
            </Stack>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, mb: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <LinkIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="900">Quick Join</Typography>
            </Stack>
            {meeting.meeting_link ? (
              <Button
                variant="contained"
                fullWidth
                href={meeting.meeting_link}
                target="_blank"
                sx={{ mb: 2, borderRadius: 3, fontWeight: 'bold' }}
              >
                Join Meeting
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                No link provided.
              </Typography>
            )}
            <TextField
              fullWidth
              size="small"
              label="Update Link"
              value={meeting.meeting_link || ''}
              onChange={(e) => setMeeting({ ...meeting, meeting_link: e.target.value })}
              onBlur={(e) => handleUpdate({ meeting_link: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, mb: 3, border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(99, 102, 241, 0.03)' }}>
            <Typography variant="subtitle1" fontWeight="900" gutterBottom>Initial Agenda</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', fontStyle: 'italic' }}>
              {meeting.agenda || 'No agenda provided.'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeetingDetailPage;

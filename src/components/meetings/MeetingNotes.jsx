import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, TextField, Button, List, ListItem,
  ListItemText, IconButton, Divider, Chip, Stack, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import client from '../../api/client';

const MeetingNotes = ({ meetingId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ section: 'Discussion', content: '' });

  const fetchNotes = async () => {
    try {
      const res = await client.get(`/meetings/${meetingId}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [meetingId]);

  const handleAddNote = async () => {
    if (!newNote.content) return;
    try {
      await client.post(`/meetings/${meetingId}/notes`, newNote);
      setNewNote({ ...newNote, content: '' });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConvertToTask = async (note) => {
    try {
      await client.post('/tasks', {
        title: note.content,
        description: 'Created from meeting note'
      });

      await client.patch(`/meetings/notes/${note.id}`, { converted_to_task: true });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const sections = ['Discussion', 'Decision', 'Action Item'];

  return (
    <Box>
      <Grid container spacing={2}>
        {sections.map(section => (
          <Grid item="true" xs={12} key={section}>
            <Paper sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
                {section}s
              </Typography>
              <List size="small">
                {notes.filter(n => n.section === section).map(note => (
                  <ListItem
                    key={note.id}
                    sx={{
                      px: 2,
                      py: 1.5,
                      bgcolor: note.section === 'Action Item' && !note.converted_to_task ? 'rgba(255, 152, 0, 0.05)' : 'rgba(255,255,255,0.02)',
                      borderRadius: 2,
                      mb: 1,
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 1
                    }}
                  >
                    <ListItemText 
                      primary={note.content} 
                      sx={{ width: '100%' }}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                    />
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ alignSelf: { xs: 'flex-end', sm: 'center' } }}>
                      {note.converted_to_task && <Chip label="Task Created" size="small" color="success" sx={{ fontWeight: 'bold' }} />}
                      {note.section === 'Action Item' && !note.converted_to_task && (
                        <Button 
                          variant="outlined"
                          size="small" 
                          onClick={() => handleConvertToTask(note)}
                          sx={{ borderRadius: 1.5, fontSize: '0.7rem', height: 24 }}
                        >
                          Convert to Task
                        </Button>
                      )}
                    </Stack>
                  </ListItem>

                ))}
              </List>

              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={`Add a ${section.toLowerCase()}...`}
                  value={newNote.section === section ? newNote.content : ''}
                  onChange={(e) => setNewNote({ section, content: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                />
                <IconButton color="primary" onClick={handleAddNote} disabled={newNote.section !== section || !newNote.content}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MeetingNotes;

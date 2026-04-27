import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, Stack, Card, CardContent,
  Chip, IconButton, Divider, Grid, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Paper, Tooltip
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BrandLogo from '../shared/BrandLogo';
import dayjs from 'dayjs';
import client from '../../api/client';

const AIArchitect = () => {
  const [requirement, setRequirement] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState('');

  // Edit State
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await client.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchUsers = async () => {
      try {
        const res = await client.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
    fetchUsers();
  }, []);

  const handleGenerate = async () => {
    if (!requirement || !selectedProject) return;
    setLoading(true);
    setError('');
    setSuggestions([]);
    try {
      const res = await client.post('/ai/suggest-tasks', { 
        requirement, 
        projectId: selectedProject 
      });
      const tasksWithDefaults = (res.data.tasks || []).map(t => ({
        ...t,
        assigned_to: null, // Default to unassigned
        due_date: dayjs().add(t.days_to_complete || 3, 'day').format('YYYY-MM-DD')
      }));
      setSuggestions(tasksWithDefaults);
    } catch (err) {
      setError('AI failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index) => {
    setSuggestions(suggestions.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(suggestions[index]);
  };

  const handleSaveEdit = () => {
    const newSuggestions = [...suggestions];
    newSuggestions[editIndex] = editData;
    setSuggestions(newSuggestions);
    setEditIndex(-1);
  };

  const handleUpdateAssignee = (index, userId) => {
    const newSuggestions = [...suggestions];
    newSuggestions[index].assigned_to = userId;
    setSuggestions(newSuggestions);
  };

  const handleApproveAll = async () => {
    setCreating(true);
    setSuccess('');
    try {
      // Create all tasks sequentially or in parallel
      await Promise.all(suggestions.map(async task => {
        const taskRes = await client.post('/tasks', {
          ...task,
          project_id: selectedProject || null,
          status: 'To Do'
        });
        
        // Create subtasks if they exist
        if (task.subtasks && task.subtasks.length > 0) {
          await Promise.all(task.subtasks.map(stTitle => 
            client.post(`/tasks/${taskRes.data.id}/subtasks`, { title: stTitle })
          ));
        }
      }));
      setSuccess(`Successfully created ${suggestions.length} tasks!`);
      setSuggestions([]);
      setRequirement('');
    } catch (err) {
      setError('Failed to create tasks.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Box>
      <Card className="glass-card" sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <Box sx={{ 
              p: 1, 
              borderRadius: 2, 
              bgcolor: 'primary.main', 
              display: 'flex',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' 
            }}>
              <BrandLogo size={24} borderRadius="0" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>AI Architect</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Break down high-level requirements into actionable tasks instantly.</Typography>
                <Chip 
                  label="Predictive Intelligence Active" 
                  size="small" 
                  color="success" 
                  variant="outlined"
                  icon={<PsychologyIcon sx={{ fontSize: '0.8rem !important' }} />}
                  sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, borderStyle: 'dashed' }}
                />
              </Stack>
            </Box>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Enter Project Requirement or Feature Description"
                placeholder="e.g., Build a user authentication system with Google OAuth and JWT sessions..."
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                variant="outlined"
                sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <TextField
                  select
                  fullWidth
                  label="Select Project (Required)"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!selectedProject && requirement.length > 0}
                >
                  <option value="" disabled>Choose a project...</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </TextField>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  onClick={handleGenerate}
                  disabled={loading || !requirement || !selectedProject}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <BrandLogo size={20} />}
                  sx={{ height: 56, fontWeight: 'bold' }}
                >
                  {loading ? 'Thinking...' : 'Architect Features'}
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {error && <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 3, borderRadius: 2 }}>{success}</Alert>}
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Box sx={{ mt: 4 }} className="fade-in">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 2, px: 1 }}>
            <Typography variant="h6" fontWeight="bold">AI Suggested Breakdown</Typography>
            <Button 
              variant="contained" 
              color="success" 
              onClick={handleApproveAll}
              disabled={creating}
              fullWidth={{ xs: true, sm: false }}
              startIcon={creating ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
              sx={{ borderRadius: 2, fontWeight: 'bold' }}
            >
              {creating ? 'Creating Tasks...' : 'Approve & Auto-Fill All'}
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {suggestions.map((task, index) => (
              <Grid item xs={12} key={index}>
                <Paper sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  '&:hover': { border: '1px solid rgba(99, 102, 241, 0.3)', bgcolor: 'rgba(255,255,255,0.04)' }
                }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 1 }}>
                        <Typography fontWeight="bold" sx={{ mr: 1 }}>{task.title}</Typography>
                        <Chip 
                          label={task.priority} 
                          size="small" 
                          color={task.priority === 'Critical' ? 'error' : task.priority === 'High' ? 'warning' : 'primary'} 
                          sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800 }}
                        />
                        <Chip 
                          label={`${task.estimated_hours}h`} 
                          size="small" 
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.65rem' }}
                        />
                        {task.recommended_role && (
                          <Chip 
                            label={task.recommended_role} 
                            size="small" 
                            variant="outlined" 
                            color="info"
                            sx={{ height: 20, fontSize: '0.65rem', borderStyle: 'dashed' }}
                          />
                        )}
                        <Chip 
                          label={`Due: ${dayjs(task.due_date).format('MMM D')}`} 
                          size="small" 
                          variant="outlined" 
                          sx={{ height: 20, fontSize: '0.65rem', borderColor: 'primary.main', color: 'primary.main' }}
                        />
                        {task.impact_score && (
                          <Tooltip title="Predictive Project Impact Score">
                            <Chip 
                              label={`Impact: ${task.impact_score}%`} 
                              size="small" 
                              sx={{ 
                                height: 20, fontSize: '0.65rem', fontWeight: 900,
                                bgcolor: 'rgba(168, 85, 247, 0.1)', 
                                color: '#a855f7',
                                border: '1px solid rgba(168, 85, 247, 0.2)'
                              }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{task.description}</Typography>
                      
                      {task.subtasks && task.subtasks.length > 0 && (
                        <Box sx={{ mb: 2, pl: 2, borderLeft: '2px solid rgba(255,255,255,0.05)' }}>
                          <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Subtasks:</Typography>
                          {task.subtasks.map((st, i) => (
                            <Typography key={i} variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>• {st}</Typography>
                          ))}
                        </Box>
                      )}

                      {/* Explainable AI & Predictive Intelligence */}
                      <Grid container spacing={2} sx={{ mb: 2.5 }}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 3, 
                            background: 'rgba(99, 102, 241, 0.03)', 
                            border: '1px solid rgba(99, 102, 241, 0.1)',
                            height: '100%',
                            display: 'flex', 
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0, left: 0, width: 4, height: '100%',
                              bgcolor: 'primary.main'
                            }
                          }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                              <PsychologyIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                              <Typography variant="caption" fontWeight="900" sx={{ letterSpacing: 1, color: 'primary.main' }}>EXPLAINABLE AI RATIONALE</Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1.6, fontStyle: 'italic', flexGrow: 1 }}>
                              {task.estimation_rationale || "Analyzing historical complexity patterns to determine optimal timeframe and priority logic..."}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 3, 
                            background: 'rgba(244, 63, 94, 0.03)', 
                            border: '1px solid rgba(244, 63, 94, 0.1)',
                            height: '100%',
                            display: 'flex', 
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0, left: 0, width: 4, height: '100%',
                              bgcolor: 'error.main'
                            }
                          }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                              <WarningAmberIcon sx={{ fontSize: 18, color: 'error.main' }} />
                              <Typography variant="caption" fontWeight="900" sx={{ letterSpacing: 1, color: 'error.main' }}>PREDICTIVE RISK ANALYSIS</Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1.6, fontStyle: 'italic', flexGrow: 1 }}>
                              {task.predictive_risk_analysis || "Simulating potential technical bottlenecks and resource dependency constraints..."}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <TextField
                        select
                        size="small"
                        label="Assign To"
                        value={task.assigned_to || ''}
                        onChange={(e) => handleUpdateAssignee(index, e.target.value || null)}
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: { xs: '100%', sm: 240 }, mt: 1 }}
                      >
                        <option value="">Unassigned</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                      </TextField>
                    </Box>
                    <Stack direction="row" sx={{ ml: 'auto' }}>
                      <IconButton size="small" onClick={() => handleEdit(index)}><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleRemove(index)}><DeleteIcon fontSize="small" /></IconButton>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={editIndex !== -1} onClose={() => setEditIndex(-1)} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">Edit AI Suggestion</DialogTitle>
        <DialogContent>
          {editData && (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField 
                fullWidth 
                label="Title" 
                value={editData.title} 
                onChange={(e) => setEditData({ ...editData, title: e.target.value })} 
              />
              <TextField 
                fullWidth 
                multiline 
                rows={3} 
                label="Description" 
                value={editData.description} 
                onChange={(e) => setEditData({ ...editData, description: e.target.value })} 
              />
              <Stack direction="row" spacing={2}>
                <TextField 
                  select 
                  fullWidth 
                  label="Priority" 
                  value={editData.priority} 
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                  SelectProps={{ native: true }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </TextField>
                <TextField 
                  fullWidth 
                  type="number" 
                  label="Est. Hours" 
                  value={editData.estimated_hours} 
                  onChange={(e) => setEditData({ ...editData, estimated_hours: parseInt(e.target.value) })} 
                />
              </Stack>
              <TextField
                select
                fullWidth
                label="Assignee"
                value={editData.assigned_to || ''}
                onChange={(e) => setEditData({ ...editData, assigned_to: e.target.value || null })}
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
              >
                <option value="">Unassigned</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
              </TextField>

              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={editData.due_date || ''}
                onChange={(e) => setEditData({ ...editData, due_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Subtasks</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter subtasks, one per line..."
                  value={editData.subtasks?.join('\n')}
                  onChange={(e) => setEditData({ ...editData, subtasks: e.target.value.split('\n').filter(s => s.trim()) })}
                />
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditIndex(-1)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIArchitect;

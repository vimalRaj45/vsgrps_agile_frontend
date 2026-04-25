import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, Checkbox, ListItemText, TextField, IconButton, CircularProgress, Stack, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';

const SubtaskList = ({ taskId, canAdd = true, canToggle = true }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const isPrivileged = ['Admin', 'Product Owner', 'Scrum Master'].includes(user?.role);

  const fetchSubtasks = async () => {
    try {
      const res = await client.get(`/tasks/${taskId}/subtasks`);
      setSubtasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubtasks();
  }, [taskId]);

  const handleToggle = async (id, completed) => {
    if (!canToggle) return;
    try {
      await client.patch(`/tasks/subtasks/${id}`, { completed: !completed });
      fetchSubtasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!isPrivileged) return;
    try {
      await client.delete(`/tasks/subtasks/${id}`);
      fetchSubtasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newSubtask || loading) return;
    setLoading(true);
    try {
      await client.post(`/tasks/${taskId}/subtasks`, { title: newSubtask });
      setNewSubtask('');
      fetchSubtasks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <List size="small">
        {subtasks.map((st) => (
          <ListItem key={st.id} disablePadding>
            <Checkbox 
              checked={st.completed} 
              onChange={() => handleToggle(st.id, st.completed)} 
              size="small" 
              disabled={!canToggle}
            />
            <ListItemText
              primary={st.title}
              primaryTypographyProps={{
                variant: 'body2',
                sx: { textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? 'text.secondary' : 'text.primary' }
              }}
            />
            {isPrivileged && (
              <Tooltip title="Delete Subtask">
                <IconButton size="small" color="error" onClick={() => handleDelete(st.id)} sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
      {canAdd && (
        <Stack direction="row" spacing={1} sx={{ mt: 1, px: 1 }} alignItems="center">
          <TextField
            fullWidth
            size="small"
            variant="standard"
            placeholder="Add a subtask..."
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            disabled={loading}
          />
          <IconButton 
            color="primary" 
            onClick={handleAdd} 
            disabled={!newSubtask || loading}
            size="small"
          >
            {loading ? <CircularProgress size={18} color="inherit" /> : <AddIcon />}
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};

export default SubtaskList;

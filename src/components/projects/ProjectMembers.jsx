import React, { useState, useEffect } from 'react';
import {
  Box, Typography, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, Button, Autocomplete, TextField, Chip
} from '@mui/material';
import client from '../../api/client';

const ProjectMembers = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [memRes, userRes] = await Promise.all([
        client.get(`/projects/${projectId}/members`),
        client.get('/auth/users')
      ]);
      setMembers(memRes.data);
      setAllUsers(userRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleAddMember = async (userId) => {
    if (!userId) return;
    try {
      await client.post(`/projects/${projectId}/members`, { user_id: userId });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>Add Member</Typography>
        <Autocomplete
          options={allUsers.filter(u => !members.find(m => m.id === u.id))}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            if (newValue) handleAddMember(newValue.id);
          }}
          renderInput={(params) => <TextField {...params} label="Search users..." size="small" />}
        />
      </Box>

      <Typography variant="h6" fontWeight="bold" gutterBottom>Project Team</Typography>
      <List>
        {members.map((member) => (
          <ListItem key={member.id} sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>{member.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.name} secondary={member.role} />
            <Chip label={member.role} size="small" variant="outlined" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProjectMembers;

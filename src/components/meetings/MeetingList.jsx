import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, ListItemButton } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import client from '../../api/client';
import { useNavigate } from 'react-router-dom';

const MeetingList = ({ projectId }) => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await client.get(`/meetings?project_id=${projectId}`);
        setMeetings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMeetings();
  }, [projectId]);

  return (
    <Paper sx={{ borderRadius: 3 }}>
      <List>
        {meetings.map((m) => (
          <ListItem disablePadding key={m.id}>
            <ListItemButton onClick={() => navigate(`/meetings/${m.id}`)}>
              <ListItemAvatar>
                <Avatar><GroupsIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={m.title}
                secondary={new Date(m.scheduled_at).toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MeetingList;

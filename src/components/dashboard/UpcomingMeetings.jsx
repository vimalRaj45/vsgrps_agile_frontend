import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Divider } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';

const UpcomingMeetings = ({ meetings }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Upcoming Meetings
        </Typography>
        <List>
          {meetings.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No upcoming meetings</Typography>
          ) : (
            meetings.map((m, index) => (
              <React.Fragment key={m.id}>
                <ListItem 
                  button 
                  onClick={() => navigate(`/meetings/${m.id}`)}
                  sx={{ px: 0, py: 1.5 }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <GroupsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={m.title}
                    secondary={`${new Date(m.scheduled_at).toLocaleDateString()} at ${new Date(m.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                {index < meetings.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetings;

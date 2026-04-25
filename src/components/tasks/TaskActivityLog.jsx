import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import client from '../../api/client';

const TaskActivityLog = ({ taskId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await client.get(`/audit?entity_type=task&entity_id=${taskId}`);
        setActivities(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchActivities();
  }, [taskId]);

  return (
    <Box>
      <List size="small">
        {activities.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No activity recorded yet.</Typography>
        ) : (
          activities.map((a) => (
            <ListItem key={a.id} sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <Box component="span" fontWeight="bold">{a.user_name}</Box> {a.action} the task
                  </Typography>
                }
                secondary={new Date(a.created_at).toLocaleString()}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default TaskActivityLog;

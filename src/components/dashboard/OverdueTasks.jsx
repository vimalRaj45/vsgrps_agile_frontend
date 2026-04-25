import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Chip, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate } from 'react-router-dom';

const OverdueTasks = ({ tasks }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Overdue Tasks
        </Typography>
        <List>
          {tasks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No overdue tasks</Typography>
          ) : (
            tasks.map((t, index) => (
              <React.Fragment key={t.id}>
                <ListItem 
                  button 
                  onClick={() => navigate(`/tasks?id=${t.id}`)}
                  sx={{ px: 0, py: 1.5 }}
                >
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {t.title}
                      </Typography>
                      <Typography variant="caption" color="error">
                        Due: {new Date(t.due_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip label={t.priority} size="small" color={t.priority === 'Critical' ? 'error' : 'warning'} />
                  </Box>
                </ListItem>
                {index < tasks.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default OverdueTasks;

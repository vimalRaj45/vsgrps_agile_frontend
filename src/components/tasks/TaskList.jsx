import React, { useState, useEffect } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import client from '../../api/client';
import TaskCard from './TaskCard';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await client.get(`/tasks?project_id=${projectId}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {tasks.map(task => (
        <Grid item="true" xs={12} sm={6} md={4} key={task.id}>
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;

import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Paper, Typography } from '@mui/material';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DownloadIcon from '@mui/icons-material/Download';
import client from '../../api/client';

const FileList = ({ projectId, taskId, meetingId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        let url = '/files?';
        if (projectId) url += `project_id=${projectId}&`;
        if (taskId) url += `task_id=${taskId}&`;
        if (meetingId) url += `meeting_id=${meetingId}&`;
        const res = await client.get(url);
        setFiles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFiles();
  }, [projectId, taskId, meetingId]);

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <List>
        {files.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No files found.</Typography>
        ) : (
          files.map((file) => (
            <ListItem
              key={file.id}
              secondaryAction={
                <IconButton edge="end" href={`${client.defaults.baseURL}/files/${file.id}/download`} target="_blank">
                  <DownloadIcon />
                </IconButton>
              }
            >
              <ListItemIcon><FilePresentIcon /></ListItemIcon>
              <ListItemText
                primary={file.filename}
                secondary={`${(file.size / 1024).toFixed(1)} KB`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default FileList;

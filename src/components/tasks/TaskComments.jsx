import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, IconButton, Typography, Popper, Paper, ListItemButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import client from '../../api/client';

const TaskComments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [users, setUsers] = useState([]);
  const [mentionAnchor, setMentionAnchor] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await client.get(`/tasks/${taskId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchUsers();
  }, [taskId]);

  const fetchUsers = async () => {
    try {
      const res = await client.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!newComment) return;
    try {
      await client.post(`/tasks/${taskId}/comments`, { content: newComment });
      setNewComment('');
      setMentionAnchor(null);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    setNewComment(val);

    const lastAtPos = val.lastIndexOf('@');
    if (lastAtPos !== -1 && (lastAtPos === 0 || val[lastAtPos - 1] === ' ')) {
      const searchPart = val.substring(lastAtPos + 1).split(' ')[0];
      const matches = users.filter(u => u.name.toLowerCase().includes(searchPart.toLowerCase()));
      setFilteredUsers(matches);
      if (matches.length > 0) {
        setMentionAnchor(e.currentTarget);
      } else {
        setMentionAnchor(null);
      }
    } else {
      setMentionAnchor(null);
    }
  };

  const insertMention = (name) => {
    const lastAtPos = newComment.lastIndexOf('@');
    const beforeAt = newComment.substring(0, lastAtPos);
    const afterAt = newComment.substring(lastAtPos + 1).split(' ').slice(1).join(' ');
    setNewComment(`${beforeAt}@${name.replace(/\s/g, '_')} ${afterAt}`);
    setMentionAnchor(null);
  };

  return (
    <Box>
      <List>
        {comments.map((c) => (
          <ListItem key={c.id} alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
                {c.user_name?.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" fontWeight="bold">{c.user_name}</Typography>
                  <Typography variant="caption" color="text.secondary">{new Date(c.created_at).toLocaleString()}</Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {c.content.split(/(@[\w_]+)/g).map((part, i) =>
                    part.startsWith('@') ? <Box component="span" key={i} sx={{ color: 'primary.main', fontWeight: 'bold' }}>{part}</Box> : part
                  )}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 1, mt: 2, position: 'relative' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Write a comment... (use @ to mention)"
          value={newComment}
          onChange={handleTextChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !mentionAnchor) handleSend();
            if (e.key === 'Escape') setMentionAnchor(null);
          }}
        />
        <IconButton color="primary" onClick={handleSend} disabled={!newComment}>
          <SendIcon />
        </IconButton>

        <Popper open={Boolean(mentionAnchor)} anchorEl={mentionAnchor} placement="top-start" sx={{ zIndex: 1500 }}>
          <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto', width: 200, boxShadow: 3 }}>
            <List size="small">
              {filteredUsers.map(u => (
                <ListItemButton key={u.id} onClick={() => insertMention(u.name)}>
                  <Avatar sx={{ width: 20, height: 20, mr: 1, fontSize: 10 }}>{u.name.charAt(0)}</Avatar>
                  <ListItemText primary={u.name} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </Box>
  );
};

export default TaskComments;

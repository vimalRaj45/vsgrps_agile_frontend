import React, { useState, useEffect, useRef } from 'react';
import { 
  TextField, InputAdornment, Box, Popper, Paper, List, ListItem, 
  ListItemText, Typography, Modal, Backdrop, Fade, Stack, IconButton,
  ListItemIcon, Chip, Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import { useNavigate } from 'react-router-dom';
import client from '../../api/client';

const SearchBar = ({ onSelect, standalone = false }) => {
  const [open, setOpen] = useState(standalone);
  const [query, setQuery] = useState('');

  const [results, setResults] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Global Shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = async (val) => {
    setQuery(val);
    if (val.length < 2) {
      setResults(null);
      return;
    }

    try {
      const res = await client.get(`/search?q=${val}`);
      setResults(res.data);
      setSelectedIndex(0);
    } catch (err) {
      console.error(err);
    }
  };

  const flattenedResults = results ? [
    ...results.projects.map(p => ({ ...p, type: 'Project', icon: <FolderIcon fontSize="small" />, path: `/projects/${p.id}` })),
    ...results.tasks.map(t => ({ ...t, type: 'Task', icon: <AssignmentIcon fontSize="small" />, path: `/tasks?id=${t.id}`, secondary: t.status })),
    ...results.users.map(u => ({ ...u, type: 'Team Member', icon: <PeopleIcon fontSize="small" />, path: `/users`, secondary: u.email })),
    ...results.meetings.map(m => ({ ...m, type: 'Meeting', icon: <GroupsIcon fontSize="small" />, path: `/meetings/${m.id}` })),
    ...results.files.map(f => ({ ...f, type: 'File', icon: <DescriptionIcon fontSize="small" />, path: `/files`, name: f.filename }))
  ] : [];

  const handleNavigate = (item) => {
    navigate(item.path);
    setOpen(false);
    setQuery('');
    setResults(null);
    if (onSelect) onSelect();
  };

  const handleKeyDown = (e) => {
    if (!results) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % flattenedResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + flattenedResults.length) % flattenedResults.length);
    } else if (e.key === 'Enter') {
      if (flattenedResults[selectedIndex]) {
        handleNavigate(flattenedResults[selectedIndex]);
      }
    }
  };

  return (
    <>
      {/* Trigger Area */}
      {!standalone && (
        <Box 
          sx={{ 
            maxWidth: 400, 
            width: '100%', 
            cursor: 'pointer',
            bgcolor: 'rgba(255,255,255,0.03)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 0.8,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.15)'
            }
          }}
          onClick={() => setOpen(true)}
        >
          <SearchIcon sx={{ fontSize: 18, mr: 1.5, opacity: 0.6 }} />
          <Typography variant="body2" sx={{ flexGrow: 1, opacity: 0.5, fontWeight: 500 }}>
            Master search...
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', sm: 'flex' }, opacity: 0.4 }}>
            <KeyboardCommandKeyIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" sx={{ fontWeight: 800 }}>K</Typography>
          </Stack>
        </Box>
      )}

      {/* Master Search Modal (Spotlight Style) */}
      {standalone ? (
        <Box sx={{ width: '100%' }}>
          <SearchContent 
            query={query} 
            handleSearch={handleSearch} 
            handleKeyDown={handleKeyDown}
            setOpen={setOpen}
            results={results}
            flattenedResults={flattenedResults}
            selectedIndex={selectedIndex}
            handleNavigate={handleNavigate}
            standalone={standalone}
          />
        </Box>
      ) : (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            sx: { backdropFilter: 'blur(8px)', bgcolor: 'rgba(2, 6, 23, 0.85)' }
          }}
        >
          <Fade in={open}>
            <Box sx={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: { xs: '95vw', sm: '600px' },
              outline: 'none'
            }}>
              <SearchContent 
                query={query} 
                handleSearch={handleSearch} 
                handleKeyDown={handleKeyDown}
                setOpen={setOpen}
                results={results}
                flattenedResults={flattenedResults}
                selectedIndex={selectedIndex}
                handleNavigate={handleNavigate}
                standalone={standalone}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

const SearchContent = ({ query, handleSearch, handleKeyDown, setOpen, results, flattenedResults, selectedIndex, handleNavigate, standalone }) => (
  <Paper className="glass-card" sx={{ 
    borderRadius: 4, 
    overflow: 'hidden',
    boxShadow: standalone ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    border: standalone ? 'none' : '1px solid rgba(255,255,255,0.1)',
    bgcolor: standalone ? 'transparent' : undefined
  }}>
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <SearchIcon sx={{ color: 'primary.main', mr: 2 }} />
      <TextField
        autoFocus
        fullWidth
        placeholder="Search anything: projects, tasks, members, files..."
        variant="standard"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        InputProps={{
          disableUnderline: true,
          sx: { fontSize: '1.1rem', fontWeight: 500 }
        }}
      />
      {!standalone && (
        <IconButton onClick={() => setOpen(false)} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>

    <Box sx={{ maxHeight: 450, overflowY: 'auto' }}>
      {query.length < 2 ? (
        <Box sx={{ p: 4, textAlign: 'center', opacity: 0.5 }}>
          <Typography variant="body2">Type at least 2 characters to search across the workspace</Typography>
        </Box>
      ) : flattenedResults.length > 0 ? (
        <List sx={{ p: 1 }}>
          {flattenedResults.map((item, index) => (
            <ListItem
              key={`${item.type}-${item.id}`}
              button
              selected={selectedIndex === index}
              onClick={() => handleNavigate(item)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'rgba(59, 130, 246, 0.15)',
                  '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.2)' }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: selectedIndex === index ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={selectedIndex === index ? 700 : 500}>
                    {item.name || item.title}
                  </Typography>
                }
                secondary={item.secondary}
              />
              <Chip 
                label={item.type} 
                size="small" 
                variant="outlined" 
                sx={{ 
                  fontSize: '0.65rem', 
                  height: 20, 
                  opacity: 0.7,
                  borderColor: selectedIndex === index ? 'primary.main' : 'rgba(255,255,255,0.1)'
                }} 
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ p: 4, textAlign: 'center', opacity: 0.5 }}>
          <Typography variant="body2">No results found for "{query}"</Typography>
        </Box>
      )}
    </Box>

    <Box sx={{ 
      p: 1.5, 
      bgcolor: standalone ? 'transparent' : 'rgba(0,0,0,0.2)', 
      display: 'flex', 
      gap: 2, 
      justifyContent: 'center',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Chip label="↑↓" size="small" variant="outlined" sx={{ height: 18, fontSize: '0.6rem' }} />
        <Typography variant="caption" color="text.secondary">Navigate</Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Chip label="↵" size="small" variant="outlined" sx={{ height: 18, fontSize: '0.6rem' }} />
        <Typography variant="caption" color="text.secondary">Select</Typography>
      </Stack>
      {!standalone && (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Chip label="ESC" size="small" variant="outlined" sx={{ height: 18, fontSize: '0.6rem' }} />
          <Typography variant="caption" color="text.secondary">Close</Typography>
        </Stack>
      )}
    </Box>
  </Paper>
);


export default SearchBar;

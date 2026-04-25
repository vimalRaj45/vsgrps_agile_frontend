import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Chip, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, useTheme, Card, CardContent, Avatar, TextField, InputAdornment, alpha } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import client from '../../api/client';
import LoadingScreen from './LoadingScreen';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';

const AuditLogTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailDialog, setDetailDialog] = useState({ open: false, data: null });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await client.get('/audit');
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionColor = (action) => {
    switch (action) {
      case 'created': return 'success';
      case 'updated': return 'info';
      case 'deleted': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    { 
      field: 'user_name', 
      headerName: 'Member', 
      width: 130,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          <Typography variant="body2" fontWeight="600">{params.value}</Typography>
        </Stack>
      )
    },
    { 
      field: 'entity_type', 
      headerName: 'Module', 
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" sx={{ fontWeight: 600, textTransform: 'capitalize' }} />
      )
    },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 90,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          color={getActionColor(params.value)} 
          sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem' }} 
        />
      )
    },
    {
      field: 'changes',
      headerName: 'Details',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => (
        <Typography 
          variant="caption" 
          onClick={() => setDetailDialog({ open: true, data: params.value })}
          sx={{ 
            fontFamily: 'monospace', 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', 
            p: 1, 
            borderRadius: 1,
            display: 'block',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }
          }}
        >
          {JSON.stringify(params.value)}
        </Typography>
      )
    },
    {
      field: 'created_at',
      headerName: 'Time',
      width: 150,
      valueFormatter: (value) => {
        const date = new Date(value);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
    },
  ];

  if (loading) return <LoadingScreen />;

  const filteredLogs = logs.filter(log => {
    const searchLower = searchQuery.toLowerCase();
    const userName = log.user_name?.toLowerCase() || '';
    const dateStr = new Date(log.created_at).toLocaleString().toLowerCase();
    const action = log.action?.toLowerCase() || '';
    const module = log.entity_type?.toLowerCase() || '';

    return userName.includes(searchLower) || 
           dateStr.includes(searchLower) || 
           action.includes(searchLower) ||
           module.includes(searchLower);
  });

  return (
    <Box sx={{ width: '100%' }}>
      {isMobile && (
        <TextField
          fullWidth
          size="small"
          placeholder="Search by member, date, or action..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3, bgcolor: alpha(theme.palette.text.primary, 0.02), borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ opacity: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      {isMobile ? (
        <Stack spacing={2}>
          {filteredLogs.map((log) => (
            <Card key={log.id} sx={{ 
              borderRadius: 3, 
              bgcolor: alpha(theme.palette.text.primary, 0.01), 
              border: `1px solid ${theme.palette.divider}`,
              backdropFilter: 'blur(10px)',
              boxShadow: 'none'
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', fontWeight: 'bold' }}>
                      {log.user_name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="700">{log.user_name}</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ opacity: 0.6 }}>
                        <AccessTimeIcon sx={{ fontSize: 12 }} />
                        <Typography variant="caption">{new Date(log.created_at).toLocaleString()}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <Chip 
                    label={log.action} 
                    size="small" 
                    color={getActionColor(log.action)} 
                    sx={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.6rem', height: 20 }} 
                  />
                </Stack>

                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(theme.palette.text.primary, 0.02), mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={log.entity_type} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                    <Typography variant="caption" sx={{ opacity: 0.5 }}>Module</Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ 
                    mt: 1, 
                    fontFamily: 'monospace', 
                    fontSize: '0.75rem', 
                    wordBreak: 'break-all',
                    color: theme.palette.text.secondary
                  }}>
                    {JSON.stringify(log.changes)}
                  </Typography>
                </Box>

                <Button 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  onClick={() => setDetailDialog({ open: true, data: log.changes })}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, mt: 1 }}
                >
                  View Full Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Paper className="glass-card" sx={{ height: 700, width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: 800, height: '100%' }}>
              <DataGrid
                rows={logs}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                disableRowSelectionOnClick
                sx={{
                  border: 'none',
                  height: '100%',
                  '& .MuiDataGrid-cell:focus': { outline: 'none' },
                  '& .MuiDataGrid-columnHeaders': {
                    bgcolor: alpha(theme.palette.text.primary, 0.02),
                    borderBottom: `1px solid ${theme.palette.divider}`
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: `1px solid ${theme.palette.divider}`
                  }
                }}
              />
            </Box>
          </Box>
        </Paper>
      )}

      <Dialog 
        open={detailDialog.open} 
        onClose={() => setDetailDialog({ open: false, data: null })}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight="bold">Change Details</DialogTitle>
        <DialogContent>
          <Box sx={{ 
            mt: 1,
            p: 2, 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.text.primary, 0.03), 
            border: `1px solid ${theme.palette.divider}`,
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {JSON.stringify(detailDialog.data, null, 2)}
            </pre>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            startIcon={<ContentCopyIcon />}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(detailDialog.data, null, 2));
            }}
          >
            Copy JSON
          </Button>
          <Button variant="contained" onClick={() => setDetailDialog({ open: false, data: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuditLogTable;

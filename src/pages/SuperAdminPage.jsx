import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  Stack, Alert, CircularProgress, Paper, Divider 
} from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DownloadIcon from '@mui/icons-material/Download';
import client from '../api/client';

const SuperAdminPage = () => {
  const [email, setEmail] = useState('vimalraj5207@gmail.com');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Request, 2: Verify, 3: Master Dashboard
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await client.get('/superadmin/status');
        if (res.data.isSuperAdmin) {
          setIsSuperAdmin(true);
          setStep(3);
        }
      } catch (err) {
        // Not super admin, that's fine
      }
    };
    checkStatus();
  }, []);

  const handleRequestOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await client.post('/superadmin/request-otp', { email });
      setMessage('Access code sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to request access code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await client.post('/superadmin/verify-otp', { email, otp });
      setIsSuperAdmin(true);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleMasterBackup = async () => {
    setDownloadLoading(true);
    try {
      const response = await client.get('/backup/master', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Sprintora_MASTER_BACKUP_${Date.now()}.sql.gz`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Master backup failed.');
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#0a0a0f', color: 'white' }}>
      <Container maxWidth="sm">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 5, 
            bgcolor: 'rgba(255,255,255,0.03)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <ShieldIcon sx={{ fontSize: 64, color: '#818cf8', mb: 2 }} />
            <Typography variant="h4" fontWeight="800" sx={{ color: 'white', letterSpacing: '-1px' }}>Master Access</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Restricted to System Owner Only</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 3, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.2)' }}>{message}</Alert>}

          {step === 1 && (
            <Stack spacing={3}>
              <TextField 
                fullWidth 
                label="System Owner Email" 
                value={email} 
                disabled 
                sx={{ 
                  '& .MuiInputBase-input.Mui-disabled': { color: 'rgba(255,255,255,0.7)', WebkitTextFillColor: 'rgba(255,255,255,0.7)' },
                  '& .MuiInputLabel-root.Mui-disabled': { color: 'rgba(255,255,255,0.5)' },
                  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
                }}
              />
              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                onClick={handleRequestOTP}
                disabled={loading}
                sx={{ 
                  height: 56, 
                  bgcolor: '#6366f1', 
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#4f46e5' },
                  boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Access Code'}
              </Button>
            </Stack>
          )}

          {step === 2 && (
            <Stack spacing={3}>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>Enter the 6-digit code sent to your email.</Typography>
              <TextField 
                fullWidth 
                label="Access Code" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                autoFocus
                sx={{ 
                  '& .MuiInputBase-input': { 
                    color: 'white', 
                    textAlign: 'center', 
                    fontSize: 32, 
                    letterSpacing: 10,
                    fontWeight: 'bold'
                  },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' }
                }}
              />
              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                onClick={handleVerifyOTP}
                disabled={loading}
                sx={{ 
                  height: 56, 
                  bgcolor: '#10b981', 
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#059669' },
                  boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Grant Access'}
              </Button>
              <Button variant="text" onClick={() => setStep(1)} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'white' } }}>Back</Button>
            </Stack>
          )}

          {step === 3 && (
            <Stack spacing={4}>
              <Box sx={{ p: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', borderRadius: 2, border: '1px solid #10b981' }}>
                <Typography variant="h6" color="#10b981" fontWeight="bold">Access Granted</Typography>
                <Typography variant="body2">System identity verified as Vimal Raj.</Typography>
              </Box>
              
              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>System-Wide Diagnostics</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Generate a complete database dump containing all company data, user records, and audit history.
                </Typography>
                
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={downloadLoading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                  onClick={handleMasterBackup}
                  disabled={downloadLoading}
                  sx={{ height: 56, color: '#6366f1', borderColor: '#6366f1', fontWeight: 'bold' }}
                >
                  {downloadLoading ? 'Exporting Global Data...' : 'Download Master Backup'}
                </Button>
              </Box>

              <Button 
                variant="text" 
                onClick={async () => {
                  await client.post('/superadmin/logout');
                  setIsSuperAdmin(false);
                  setStep(1);
                }}
                sx={{ color: '#ef4444' }}
              >
                Revoke Access
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default SuperAdminPage;

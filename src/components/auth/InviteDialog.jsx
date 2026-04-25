import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, MenuItem, Typography, Alert, FormControlLabel, Checkbox
} from '@mui/material';
import client from '../../api/client';

const InviteDialog = ({ open, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [loading, setLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');
  const [checkInfo, setCheckInfo] = useState(null); // { exists, sameOrg, companyName }
  const [crossOrgConfirm, setCrossOrgConfirm] = useState(false);

  const handleCheckEmail = async () => {
    if (!email || !email.includes('@')) return;
    try {
      const res = await client.post('/invite/check', { email });
      setCheckInfo(res.data);
    } catch (err) {
      console.error('Email check failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.post('/invite', { email, role });
      setInviteUrl('sent'); // Use as a flag for success state
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle fontWeight="bold">Invite Team Member</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {inviteUrl === 'sent' ? (
            <Box sx={{ py: 2, textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>Invitation Sent!</Alert>
              <Typography variant="body1" fontWeight="500">
                An email has been sent to the invitee with account setup instructions.
              </Typography>
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (checkInfo) {
                    setCheckInfo(null);
                    setCrossOrgConfirm(false);
                  }
                }}
                onBlur={handleCheckEmail}
                required
              />

              {checkInfo?.exists && checkInfo.sameOrg && (
                <Alert severity="warning" sx={{ mb: 2, borderRadius: 1.5 }}>
                  This email is already a member of your organization.
                </Alert>
              )}

              {checkInfo?.exists && !checkInfo.sameOrg && (
                <Box sx={{ mb: 2 }}>
                  <Alert severity="info" sx={{ mb: 1, borderRadius: 1.5 }}>
                    This email is already registered in <strong>{checkInfo.companyName}</strong>. 
                  </Alert>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small" 
                        checked={crossOrgConfirm} 
                        onChange={(e) => setCrossOrgConfirm(e.target.checked)} 
                      />
                    }
                    label={
                      <Typography variant="caption" fontWeight="500">
                        I understand this user is in another organization and I still want to invite them.
                      </Typography>
                    }
                  />
                </Box>
              )}
              <TextField
                select
                fullWidth
                label="Role"
                margin="normal"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Product Owner">Product Owner</MenuItem>
                <MenuItem value="Scrum Master">Scrum Master</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Stakeholder">Stakeholder</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => { setInviteUrl(''); onClose(); }}>
            {inviteUrl === 'sent' ? 'Close' : 'Cancel'}
          </Button>
          {inviteUrl !== 'sent' && (
            <Button 
              variant="contained" 
              type="submit" 
              disabled={
                loading || 
                (checkInfo?.exists && checkInfo.sameOrg) || 
                (checkInfo?.exists && !checkInfo.sameOrg && !crossOrgConfirm)
              }
            >
              {loading ? 'Sending...' : 'Send Invitation'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InviteDialog;

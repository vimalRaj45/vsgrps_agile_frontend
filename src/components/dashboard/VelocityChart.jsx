import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, CircularProgress, useTheme 
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import client from '../../api/client';

const VelocityChart = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVelocity = async () => {
      try {
        const res = await client.get('/dashboard/velocity');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch velocity:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVelocity();
  }, []);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
      <CircularProgress size={24} />
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>Team Velocity</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: { xs: 1, md: 3 }, fontSize: '0.65rem' }}>
        Completed tasks (Last 12 Weeks)
      </Typography>

      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="week" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: theme.palette.text.secondary, fontSize: 10 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: theme.palette.text.secondary, fontSize: 10 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ 
              backgroundColor: 'rgba(23, 23, 23, 0.9)', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
          />
          <Bar dataKey="completed_tasks" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === data.length - 1 ? theme.palette.primary.main : 'rgba(99, 102, 241, 0.4)'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default VelocityChart;

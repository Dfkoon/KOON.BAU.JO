import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import ShinyHeader from '../../components/ui/ShinyHeader';

export default function Dashboard() {
    return (
        <Box>
            <ShinyHeader text="Admin Dashboard" variant="h4" gutterBottom />
            <Paper sx={{ p: 3 }}>
                <Typography variant="body1">
                    Welcome to the Admin Control Panel. Use the sidebar to manage your website content.
                </Typography>
            </Paper>
        </Box>
    );
}

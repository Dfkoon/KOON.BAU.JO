import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ShinyHeader from '../components/ui/ShinyHeader';
import PomodoroTimer from '../components/tools/PomodoroTimer';
import TodoList from '../components/tools/TodoList';
import { useLanguage } from '../context/LanguageContext';

const StudentTools = () => {
    const { t } = useLanguage();

    return (
        <Box sx={{ py: 15, minHeight: '100vh', bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <ShinyHeader text={t('studentToolsTitle') || 'Student Productivity Tools'} />

                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                    {t('studentToolsSubtitle') || 'Boost your productivity with these built-in tools. Stay focused and organized!'}
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <PomodoroTimer />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TodoList />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default StudentTools;

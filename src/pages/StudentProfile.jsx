import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Typography, Paper, Grid, LinearProgress, Chip } from '@mui/material';
import { Navigate } from 'react-router-dom';
import ShinyHeader from '../components/ui/ShinyHeader';
import { CheckCircle } from '@mui/icons-material';

export default function StudentProfile() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const passedSubjects = currentUser.completedMaterials || [];
    // Calculate dummy progress for now, assuming 50 total subjects (or fetch total)
    const totalSubjects = 50;
    const progress = Math.min((passedSubjects.length / totalSubjects) * 100, 100);

    return (
        <Container maxWidth="md" sx={{ py: 15 }}>
            <ShinyHeader text={`Welcome, ${currentUser.displayName || 'Student'}`} variant="h4" />

            <Grid container spacing={4}>
                {/* Progress Card */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Academic Progress
                        </Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
                            <Typography variant="h3" fontWeight="bold">
                                {Math.round(progress)}%
                            </Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            {passedSubjects.length} subjects completed
                        </Typography>
                    </Paper>
                </Grid>

                {/* Details Card */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minHeight: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Your Achievements
                        </Typography>

                        {passedSubjects.length === 0 ? (
                            <Typography color="text.secondary">
                                You haven't marked any subject as complete yet. Go to <a href="/materials">Materials</a> to track your progress.
                            </Typography>
                        ) : (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {passedSubjects.map((subject, index) => (
                                    <Chip
                                        key={index}
                                        icon={<CheckCircle />}
                                        label={subject}
                                        color="success"
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        )}

                        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Account Email: {currentUser.email}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

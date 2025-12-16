import React, { useEffect } from 'react';
import ShinyHeader from '../components/ui/ShinyHeader';
import { Box, Container, Typography, Paper } from '@mui/material';
import { Engineering } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const Exams = () => {
    const { language } = useLanguage();

    useEffect(() => {
        document.title = "صفحة الاختبارات | KOON.BAU";
    }, []);

    return (
        <Container maxWidth="md" sx={{ py: 10 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.light',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        opacity: 0.2
                    }}
                >
                    <Engineering sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>

                <ShinyHeader text="قريباً" variant="h4" sx={{ color: 'primary.main' }} />

                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500, lineHeight: 1.6 }}>
                    سوف يتم اضافة كويزات قريبا انتظرونا
                </Typography>
            </Paper>
        </Container>
    );
};

export default Exams;


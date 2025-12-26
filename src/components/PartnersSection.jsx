import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { VerifiedUser, Computer } from '@mui/icons-material'; // Icons for placeholders
import ShinyHeader from './ui/ShinyHeader';

// Partners Data (Using Icons as placeholders for logos)
const partners = [
    { id: 1, name: "Partner 1", icon: <VerifiedUser sx={{ fontSize: 60 }} /> },
    { id: 2, name: "Partner 2", icon: <Computer sx={{ fontSize: 60 }} /> },
    // { id: 3, name: "Partner 3", icon: <School sx={{ fontSize: 60 }} /> },
];

const PartnersSection = () => {
    return (
        <Box sx={{ py: 10, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <ShinyHeader text="شركاؤنا في النجاح" sx={{ mb: 2 }} />
                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
                >
                    نحن ممتنون للداعمين الذين ساهموا في تطوير هذا الموقع ودعم الطلاب في مسيرتهم الأكاديمية.
                </Typography>

                <Grid container spacing={4} justifyItems="center" justifyContent="center">
                    {partners.map((partner) => (
                        <Grid size="auto" key={partner.id}>
                            <Box
                                sx={{
                                    opacity: 0.6,
                                    filter: 'grayscale(100%)',
                                    transition: 'all 0.4s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 1,
                                        filter: 'grayscale(0%)',
                                        transform: 'scale(1.1)'
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                {/* Using Icon as Placeholder for Image */}
                                <Box sx={{
                                    p: 2,
                                    bgcolor: 'action.hover',
                                    borderRadius: '50%',
                                    color: 'primary.main'
                                }}>
                                    {partner.icon}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default PartnersSection;

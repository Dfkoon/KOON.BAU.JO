import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, List, ListItem, Paper, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
// import './MorningEveningDhikr.css';
import ShinyHeader from './ui/ShinyHeader';
import { useLanguage } from '../context/LanguageContext'; // Import context
import { dhikrData } from '../data/dhikrData'; // Import data

const MorningEveningDhikr = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('morning');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Get current dhikr list
    const currentDhikr = dhikrData[language];

    // Popup logic removed as per user request

    const isAr = language === 'ar';

    return (
        <Box
            component="section"
            id="morning-evening-dhikr"
            sx={{
                py: 8,
                direction: isAr ? 'rtl' : 'ltr',
                bgcolor: 'background.default'
            }}
        >
            <Container maxWidth="md">
                <ShinyHeader text={t('dhikrTitle')} sx={{ mb: 4 }} />

                {/* Intro Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{ mb: 2, lineHeight: 1.8, maxWidth: 800, mx: 'auto' }}
                    >
                        {t('dhikrIntro')}
                    </Typography>

                    <Typography
                        variant="h6"
                        color="primary.main"
                        fontWeight="bold"
                    >
                        {t('dhikrReminder')}
                    </Typography>
                </Box>

                {/* Tabs */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                    <Button
                        variant={activeTab === 'morning' ? "contained" : "outlined"}
                        onClick={() => setActiveTab('morning')}
                        sx={{
                            borderRadius: 8,
                            px: 4,
                            fontWeight: 'bold',
                            borderWidth: 2,
                            '&:hover': { borderWidth: 2 }
                        }}
                    >
                        {t('morningDhikr')}
                    </Button>
                    <Button
                        variant={activeTab === 'evening' ? "contained" : "outlined"}
                        onClick={() => setActiveTab('evening')}
                        sx={{
                            borderRadius: 8,
                            px: 4,
                            fontWeight: 'bold',
                            borderWidth: 2,
                            '&:hover': { borderWidth: 2 }
                        }}
                    >
                        {t('eveningDhikr')}
                    </Button>
                </Box>

                {/* Dhikr Content Card */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper', // Automatically adjusts to dark/light
                        transition: 'all 0.3s ease',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 4px 20px rgba(0,0,0,0.4)'
                            : '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                color: 'error.main',
                                borderBottom: 1,
                                borderColor: 'error.light',
                                pb: 1,
                                display: 'inline-block',
                                mb: 3
                            }}
                        >
                            {activeTab === 'morning' ? t('morningDhikr') : t('eveningDhikr')}
                        </Typography>

                        <List sx={{ p: 0 }}>
                            {activeTab === 'morning'
                                ? currentDhikr.morning.map((item, index) => (
                                    <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 2 }}>
                                            • "{item}"
                                        </Typography>
                                    </ListItem>
                                ))
                                : currentDhikr.evening.map((item, index) => (
                                    <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 2 }}>
                                            • "{item}"
                                        </Typography>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default MorningEveningDhikr;

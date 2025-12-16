import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, List, ListItem, ListItemText, Autocomplete, useTheme } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

import { treePlansData } from '../data/botData';

const majors = [
    { id: 'digitalForensics', ar: 'التحقيقات الجنائية الرقمية', en: 'Digital Forensics' },
    { id: 'cyberSecurity', ar: 'أمن المعلومات والفضاء الإلكتروني', en: 'Cyber Security' },
    { id: 'dataScience', ar: 'علم البيانات', en: 'Data Science' },
    { id: 'aiRobotics', ar: 'الذكاء الاصطناعي والروبوتات', en: 'AI & Robotics' },
    { id: 'vr', ar: 'الواقع الافتراضي', en: 'Virtual Reality' }
];

const TreePlans = () => {
    const { t, language } = useLanguage();
    const theme = useTheme();
    const [selectedMajor, setSelectedMajor] = useState(null); // Default to none (user must select)
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    // Helper for direction
    const isAr = language === 'ar';

    // Dynamic Data Selection based on Language and Major
    // If no major selected, return empty object to prevent errors
    const courseData = selectedMajor ? treePlansData[language][selectedMajor.id] : {};

    // Clear selection when language changes (major stays, but course selection should match language)
    useEffect(() => {
        setSelectedCourse(null);
        setSearchResult(null);
    }, [language, selectedMajor]); // Clear when major changes too

    const handleSearch = () => {
        if (selectedCourse && courseData[selectedCourse]) {
            setSearchResult(courseData[selectedCourse]);
        } else {
            setSearchResult(null);
        }
    };

    return (
        <Box sx={{ py: 4 }} id="tree-plans">
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                {t('treePlansTitle')}
            </Typography>
            <Card sx={{
                p: 4,
                borderRadius: 4,
                background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                mb: 6
            }}>
                <Typography paragraph align="center">
                    {t('treePlansDesc')}
                </Typography>

                {/* Search & Filter Bar */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center', // Align vertically
                    mb: 4,
                    flexWrap: 'wrap',
                    direction: isAr ? 'rtl' : 'ltr' // Ensure correct order in Arabic
                }}>
                    {/* 1. Major Selector */}
                    <Autocomplete
                        options={majors}
                        getOptionLabel={(option) => isAr ? option.ar : option.en}
                        renderInput={(params) => <TextField {...params} placeholder={isAr ? "اختر التخصص" : "Select Major"} variant="outlined" />}
                        sx={{ width: { xs: '100%', md: 300 } }} // Responsive width
                        value={selectedMajor}
                        onChange={(event, newValue) => {
                            if (newValue) setSelectedMajor(newValue);
                        }}
                        disableClearable
                    />

                    {/* 2. Course Selector */}
                    <Autocomplete
                        options={Object.keys(courseData)}
                        renderInput={(params) => <TextField {...params} placeholder={t('searchPlaceholder')} variant="outlined" />}
                        sx={{ width: { xs: '100%', md: 300 } }} // Responsive width
                        value={selectedCourse}
                        onChange={(event, newValue) => setSelectedCourse(newValue)}
                        noOptionsText={isAr ? "لا يوجد خيارات" : "No options"}
                    />

                    {/* 3. Search Button */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSearch}
                        sx={{
                            height: 56, // Match text field height
                            px: 4,
                            width: { xs: '100%', md: 'auto' }
                        }}
                    >
                        {t('search')}
                    </Button>
                </Box>

                {searchResult && (
                    <Box sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(80, 100, 0, 0.05)',
                        p: 3,
                        borderRadius: 2,
                        direction: isAr ? 'rtl' : 'ltr',
                        textAlign: isAr ? 'right' : 'left'
                    }}>
                        <Typography variant="h6" gutterBottom>{t('searchResultsFor')} {selectedCourse}</Typography>
                        <List>
                            <ListItem sx={{ textAlign: isAr ? 'right' : 'left' }}>
                                <ListItemText
                                    primary={t('prerequisiteLabel')}
                                    secondary={searchResult.prerequisite || t('noPrereq')}
                                    primaryTypographyProps={{ align: isAr ? 'right' : 'left' }}
                                    secondaryTypographyProps={{ align: isAr ? 'right' : 'left' }}
                                />
                            </ListItem>
                            {/* Show Concurrent only if it exists */}
                            {searchResult.concurrent && (
                                <ListItem sx={{ textAlign: isAr ? 'right' : 'left' }}>
                                    <ListItemText
                                        primary={t('concurrentLabel')}
                                        secondary={searchResult.concurrent}
                                        primaryTypographyProps={{ align: isAr ? 'right' : 'left' }}
                                        secondaryTypographyProps={{ align: isAr ? 'right' : 'left' }}
                                    />
                                </ListItem>
                            )}
                            <ListItem sx={{ textAlign: isAr ? 'right' : 'left' }}>
                                <ListItemText
                                    primary={t('opensLabel')}
                                    primaryTypographyProps={{ align: isAr ? 'right' : 'left' }}
                                    secondaryTypographyProps={{ component: 'div', align: isAr ? 'right' : 'left' }}
                                    secondary={
                                        searchResult.opens.length > 0 ? (
                                            <ul style={{
                                                margin: 0,
                                                paddingInlineStart: '20px',
                                                textAlign: isAr ? 'right' : 'left',
                                                direction: isAr ? 'rtl' : 'ltr'
                                            }}>
                                                {searchResult.opens.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        ) : t('noPrereq')
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                )}
            </Card>
        </Box>
    );
};

export default TreePlans;

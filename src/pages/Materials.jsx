
// src/pages/Materials.jsx
import React, { useEffect } from 'react';
import ShinyHeader from '../components/ui/ShinyHeader';
import { Box, Container, Typography, IconButton, CssBaseline, ThemeProvider, createTheme, Button } from '@mui/material';
import { VolunteerActivism, Telegram, WhatsApp } from '@mui/icons-material';
// import CourseSearch from '../components/CourseSearch'; // Removed in new design
import CourseSection from '../components/CourseSection';
import {
    universityRequirements,
    universityElectives,
    collegeRequirements,
    majorRequirements,
    supportRequirements,
    labs,
    remedial
} from '../data/coursesData';

const theme = createTheme({
    palette: {
        primary: {
            main: '#506400',
        },
        background: {
            default: '#f4f4f4',
        }
    },
    typography: {
        fontFamily: '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif',
    }
});

import { useLanguage } from '../context/LanguageContext';

const Materials = () => {
    const { language, t } = useLanguage();
    const [searchTerm, setSearchTerm] = React.useState('');

    useEffect(() => {
        document.title = t('materials') + " | KOON.BAU";
    }, [language]);

    // Helper to filter courses
    const filterCourses = (courses) => {
        if (!searchTerm) return courses;
        const term = searchTerm.toLowerCase();
        return courses.filter(c => {
            if (typeof c.title === 'object') {
                return (c.title.ar && c.title.ar.toLowerCase().includes(term)) ||
                    (c.title.en && c.title.en.toLowerCase().includes(term));
            }
            return c.title.toLowerCase().includes(term);
        });
    };

    const isRtl = language === 'ar';

    return (
        <Box sx={{ display: 'flex', direction: isRtl ? 'rtl' : 'ltr', flexDirection: 'column', width: '100%' }}>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 0, width: '100%', minHeight: '100vh', paddingBottom: '100px' }}>

                {/* Minimal Hero Section (No Image/Gradient) */}
                <Box sx={{
                    textAlign: 'center',
                    pt: 8,
                    pb: 4,
                    bgcolor: 'background.default', // Use solid theme background
                    color: 'text.primary',
                    mb: 2
                }}>
                    <Container>
                        <ShinyHeader text={t('materials')} variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.8, color: 'text.secondary' }}>
                            {t('materialsSubtitle')}
                        </Typography>
                    </Container>
                </Box>

                {/* Sticky Search Bar - Improved styling to be more "Material" and less boxy */}
                <Box sx={{
                    position: 'sticky',
                    top: 20,
                    zIndex: 100,
                    mx: 2,
                    mb: 6,
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: 600,
                        bgcolor: 'background.paper', // Changed from hardcoded white to adapt to theme
                        borderRadius: '50px',
                        boxShadow: 3,
                        p: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                padding: '12px 24px',
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                fontFamily: 'inherit',
                                direction: isRtl ? 'rtl' : 'ltr',
                                color: 'inherit' // Inherit text color from parent (good for dark mode)
                            }}
                        />
                    </Box>
                </Box>

                <Container maxWidth="lg">

                    {/* Sections - Only show if they have matching courses */}
                    {filterCourses(universityRequirements).length > 0 && <CourseSection title={t('universityRequirements')} courses={filterCourses(universityRequirements)} />}
                    {filterCourses(universityElectives).length > 0 && <CourseSection title={t('universityElectives')} courses={filterCourses(universityElectives)} />}
                    {filterCourses(collegeRequirements).length > 0 && <CourseSection title={t('collegeRequirements')} courses={filterCourses(collegeRequirements)} />}
                    {filterCourses(majorRequirements).length > 0 && <CourseSection title={t('majorRequirements')} courses={filterCourses(majorRequirements)} />}
                    {filterCourses(supportRequirements).length > 0 && <CourseSection title={t('supportRequirements')} courses={filterCourses(supportRequirements)} />}
                    {filterCourses(labs).length > 0 && <CourseSection title={t('labsList')} courses={filterCourses(labs)} />}
                    {filterCourses(remedial).length > 0 && <CourseSection title={t('remedialCourses')} courses={filterCourses(remedial)} />}

                    {/* Empty Search State */}
                    {searchTerm &&
                        filterCourses([...universityRequirements, ...universityElectives, ...collegeRequirements, ...majorRequirements, ...supportRequirements, ...labs, ...remedial]).length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 10 }}>
                                <Typography variant="h5" color="text.secondary">{t('noSearchResults')} "{searchTerm}"</Typography>
                            </Box>
                        )}


                    {/* Volunteer Section */}
                    <Box sx={{
                        mt: 8,
                        p: 6,
                        textAlign: 'center',
                        bgcolor: 'background.paper', // Changed from linear gradient to paper color
                        borderRadius: 8,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: 3,
                        backgroundImage: 'linear-gradient(135deg, rgba(80, 100, 0, 0.05) 0%, rgba(255,255,255,0) 100%)' // Subtle gradient overlay
                    }}>
                        <VolunteerActivism sx={{ fontSize: 70, color: 'primary.main', mb: 2, opacity: 0.8 }} />
                        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            {t('shareScience')}
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4, color: 'text.secondary' }}>
                            {t('shareScienceDesc')}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                            <Button
                                component="a"
                                href="https://wa.me/qr/664NU4BEEWI6K1"
                                target="_blank"
                                variant="contained"
                                color="success"
                                size="large"
                                startIcon={<WhatsApp />}
                                sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 50, textTransform: 'none', boxShadow: 4 }}
                            >
                                {t('contactWhatsapp')}
                            </Button>
                            <Button
                                component="a"
                                href="https://t.me/Conan_200"
                                target="_blank"
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<Telegram />}
                                sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 50, textTransform: 'none', boxShadow: 4 }}
                            >
                                {t('contactTelegram')}
                            </Button>
                        </Box>
                    </Box>

                </Container>

            </Box>
        </Box>
    );
};

export default Materials;
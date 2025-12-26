import React, { useEffect } from 'react';
import ShinyHeader from '../components/ui/ShinyHeader';
import { Box, Container, Typography } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import CourseSection from '../components/CourseSection';
import { examsList } from '../data/examsData';

const Exams = () => {
    const { language, t } = useLanguage();
    const [searchTerm, setSearchTerm] = React.useState('');

    useEffect(() => {
        document.title = (language === 'ar' ? "الاختبارات" : "Exams") + " | KOON.BAU";
    }, [language]);

    const isRtl = language === 'ar';

    // Helper to filter exams
    const filterExams = (list) => {
        if (!searchTerm) return list;
        const term = searchTerm.toLowerCase();
        return list.filter(item => {
            if (typeof item.title === 'object') {
                return (item.title.ar && item.title.ar.toLowerCase().includes(term)) ||
                    (item.title.en && item.title.en.toLowerCase().includes(term));
            }
            return item.title.toLowerCase().includes(term);
        });
    };

    return (
        <Box sx={{ display: 'flex', direction: isRtl ? 'rtl' : 'ltr', flexDirection: 'column', width: '100%' }}>
            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 0, width: '100%', minHeight: '100vh', paddingBottom: '100px' }}>

                {/* Hero Section */}
                <Box sx={{
                    textAlign: 'center',
                    pt: 8,
                    pb: 4,
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    mb: 2
                }}>
                    <Container>
                        <ShinyHeader text={language === 'ar' ? "الاختبارات والسنوات" : "Exams & Past Papers"} variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.8, color: 'text.secondary', mt: 2 }}>
                            {language === 'ar' ? "نماذج اختبارات وكويزات سابقة لمساعدتك في الدراسة" : "Previous exams and quizzes to help you study"}
                        </Typography>
                    </Container>
                </Box>

                {/* Sticky Search Bar */}
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
                        bgcolor: 'background.paper',
                        borderRadius: '50px',
                        boxShadow: 3,
                        p: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <input
                            type="text"
                            placeholder={language === 'ar' ? "ابحث عن مادة..." : "Search for a subject..."}
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
                                color: 'inherit'
                            }}
                        />
                    </Box>
                </Box>

                <Container maxWidth="lg">
                    {examsList.length > 0 ? (
                        <CourseSection
                            title={language === 'ar' ? "المواد المتوفرة" : "Available Subjects"}
                            courses={filterExams(examsList)}
                        />
                    ) : (
                        <Typography align="center" variant="h6" color="text.secondary">
                            {language === 'ar' ? "لا توجد مواد حالياً" : "No subjects available yet"}
                        </Typography>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default Exams;


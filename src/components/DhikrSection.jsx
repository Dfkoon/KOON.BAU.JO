import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Paper, Fade } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const morningDhikr = [
    "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم. (3 مرات)",
    "أصبحنا وأصبح الملك لله والحمد لله، لا إله إلا الله وحده لا شريك له...",
    "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور.",
    "آية الكرسي...",
    "سورة الإخلاص والمعوذتين (3 مرات)",
    "اللهم إني أسألك العفو والعافية في الدنيا والآخرة...",
];

const eveningDhikr = [
    "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم. (3 مرات)",
    "أمسينا وأمسى الملك لله والحمد لله...",
    "اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير.",
    "آية الكرسي...",
    "سورة الإخلاص والمعوذتين (3 مرات)",
    "اللهم إني أعوذ بك من الكفر والفقر وأعوذ بك من عذاب القبر...",
];

const DhikrSection = () => {
    const [tabValue, setTabValue] = useState(0);

    const { t } = useLanguage();

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ py: 8, background: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' }} id="dhikr">
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {t('dhikrTitle')}
                </Typography>
                <Typography align="center" paragraph sx={{ mb: 4, opacity: 0.8 }}>
                    {t('dhikrSubtitle')}
                </Typography>

                <Tabs value={tabValue} onChange={handleChange} centered sx={{ mb: 3 }}>
                    <Tab label={t('morningDhikr')} />
                    <Tab label={t('eveningDhikr')} />
                </Tabs>

                <Paper sx={{ p: 4, borderRadius: 4, minHeight: 300, bgcolor: 'rgba(255,255,255,0.9)' }}>
                    {tabValue === 0 && (
                        <Fade in={true}>
                            <Box>
                                {morningDhikr.map((dhikr, index) => (
                                    <Typography key={index} paragraph sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
                                        {dhikr}
                                    </Typography>
                                ))}
                            </Box>
                        </Fade>
                    )}
                    {tabValue === 1 && (
                        <Fade in={true}>
                            <Box>
                                {eveningDhikr.map((dhikr, index) => (
                                    <Typography key={index} paragraph sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
                                        {dhikr}
                                    </Typography>
                                ))}
                            </Box>
                        </Fade>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default DhikrSection;

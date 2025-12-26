import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Tabs, Tab, Grid, Paper, Button, useTheme } from '@mui/material';
import { AccountTree, Description, Download } from '@mui/icons-material';
import { treePlans, guidancePlansNew, guidancePlansOld } from '../data/plansData';
import { useLanguage } from '../context/LanguageContext';
import StudyPlanCard from '../components/StudyPlanCard';
import TreePlans from '../components/TreePlans';
import FramerCarousel from '../components/ui/FramerCarousel';
import ShinyHeader from '../components/ui/ShinyHeader';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const Plans = () => {
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const { t } = useLanguage();

    useEffect(() => {
        document.title = `${t('plansTitle')} | KOON.BAU`;
    }, [t]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Helper to get translated title based on index order
    const specializations = ['digitalForensics', 'infoSec', 'aiRobotics', 'dataScience', 'vr'];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {t('plansTitle')}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {t('plansSubtitle')}
                </Typography>
            </Box>

            <Paper sx={{ mb: 4, borderRadius: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab icon={<AccountTree />} iconPosition="start" label={t('treePlans')} sx={{ fontSize: '1.1rem' }} />
                    <Tab icon={<Description />} iconPosition="start" label={t('guidancePlans')} sx={{ fontSize: '1.1rem' }} />
                </Tabs>
            </Paper>

            {/* Tree Plans Section */}
            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
                    {treePlans.map((plan, index) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <StudyPlanCard
                                title={t(specializations[index])}
                                image={plan.image}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Carousel Section */}
                <Typography variant="h4" sx={{ textAlign: 'center', mt: 6, mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                    معرض الخطط الشجرية
                </Typography>

                {/* Prepare data for carousel - merging title translation inside */}
                <FramerCarousel items={treePlans.map((plan, index) => ({
                    ...plan,
                    title: t(specializations[index])
                }))} />

                {/* Search Feature - Moved to bottom */}
                <TreePlans />
            </TabPanel>

            {/* Guidance Plans Section */}
            <TabPanel value={tabValue} index={1}>
                <Grid container spacing={4}>
                    {/* New Plans Column */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 4, height: '100%', borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f0f7ff' }}>
                            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                                {t('newPlans')}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                                {guidancePlansNew.map((plan, index) => (
                                    <Button
                                        key={index}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Description />}
                                        href={plan.link}
                                        target="_blank"
                                        sx={{
                                            justifyContent: 'flex-start',
                                            py: 1.5,
                                            px: 3,
                                            borderRadius: 3,
                                            boxShadow: 2
                                        }}
                                    >
                                        {t(specializations[index]) + t('newSuffix')}
                                    </Button>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Old Plans Column */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 4, height: '100%', borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#fff4e5' }}>
                            <Typography variant="h5" gutterBottom color="warning.main" fontWeight="bold" sx={{ color: '#ed6c02' }}>
                                {t('oldPlans')}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                                {guidancePlansOld.map((plan, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="warning"
                                        startIcon={<Description />}
                                        href={plan.link}
                                        target="_blank"
                                        sx={{
                                            justifyContent: 'flex-start',
                                            py: 1.5,
                                            px: 3,
                                            borderRadius: 3,
                                        }}
                                    >
                                        {t(specializations[index]) + t('oldSuffix')}
                                    </Button>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </TabPanel>
        </Container>
    );
};

export default Plans;

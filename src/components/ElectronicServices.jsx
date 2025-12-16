import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { AppRegistration, Grade, MenuBook, LaptopChromebook, Calculate, RateReview } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import ShinyHeader from './ui/ShinyHeader';

const services = [
    { title: 'regSystem', icon: <AppRegistration fontSize="large" />, desc: 'regSystemDesc', link: 'https://live.bau.edu.jo/Reg.aspx' },
    { title: 'gradesSystem', icon: <Grade fontSize="large" />, desc: 'gradesSystemDesc', link: '#' },
    { title: 'studentGuide', icon: <MenuBook fontSize="large" />, desc: 'studentGuideDesc', link: 'https://www.bau.edu.jo/media/dalel2/mobile/index.html' },
    { title: 'eLearning', icon: <LaptopChromebook fontSize="large" />, desc: 'eLearningDesc', link: 'https://www.bau.edu.jo/elearning.aspx' },
    { title: 'gpaCalc', icon: <Calculate fontSize="large" />, desc: 'gpaCalcDesc', link: 'https://app2.bau.edu.jo:7799/courses/index.jsp?param=1' },
    { title: 'evalSystem', icon: <RateReview fontSize="large" />, desc: 'evalSystemDesc', link: 'https://app2.bau.edu.jo:7799/eval/Login.jsp' },
];

const ElectronicServices = () => {
    const { t } = useLanguage();
    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }} id="electronic-services">
            <Container maxWidth="lg">
                <ShinyHeader text={t('electronicServicesTitle')} />
                <Grid container spacing={3}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                height: '100%',
                                textAlign: 'center',
                                p: 2,
                                borderRadius: 4,
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
                            }}>
                                <CardContent>
                                    <Box sx={{ color: 'primary.main', mb: 2 }}>{service.icon}</Box>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">{t(service.title)}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        {t(service.desc)}
                                    </Typography>
                                    <Button variant="outlined" href={service.link} target="_blank">
                                        {t('visitSystem')}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ElectronicServices;

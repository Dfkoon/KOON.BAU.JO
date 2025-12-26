import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import ShinyHeader from '../components/ui/ShinyHeader';
import { usefulSites } from '../data/usefulSitesData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UsefulSites = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <Box sx={{ py: 15, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <ShinyHeader text={t('usefulSitesTitle')} />

                {usefulSites.map((category, catIndex) => (
                    <Box key={catIndex} sx={{ mb: 8 }} data-aos="fade-up">
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                mb: 4,
                                fontWeight: 'bold',
                                color: 'primary.main',
                                borderBottom: '2px solid',
                                borderColor: 'primary.main',
                                display: 'inline-block',
                                pb: 1,
                                px: 2
                            }}
                        >
                            {t(category.category)}
                        </Typography>

                        <Grid container spacing={4}>
                            {category.items.map((site, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                    <Card sx={{
                                        height: '100%',
                                        textAlign: 'center',
                                        p: 2,
                                        borderRadius: 4,
                                        transition: '0.3s',
                                        '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Box sx={{ color: 'primary.main', mb: 2 }}>{site.icon}</Box>
                                            <Typography variant="h6" gutterBottom fontWeight="bold">{site.name}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                                {t(site.description)}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ pb: 2, px: 2 }}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    if (site.url.startsWith('/')) {
                                                        navigate(site.url);
                                                    } else {
                                                        window.open(site.url, '_blank');
                                                    }
                                                }}
                                                fullWidth
                                                sx={{ borderRadius: 8 }}
                                            >
                                                {t('visitSite')}
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default UsefulSites;

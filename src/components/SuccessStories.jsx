import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { Headphones, Mic } from '@mui/icons-material';

import { useLanguage } from '../context/LanguageContext';
import ShinyHeader from './ui/ShinyHeader';

const SuccessStories = () => {
    const { t } = useLanguage();
    return (
        <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="success-stories">
            <Container maxWidth="md">
                <ShinyHeader text={t('storiesTitle')} sx={{ mb: 1 }} />
                <Typography align="center" paragraph sx={{ mb: 5, opacity: 0.8 }}>
                    {t('storiesSubtitle')}
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid size={{ xs: 12 }}>
                        <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <Headphones sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h5" gutterBottom>{t('newEpisode')}</Typography>
                                <Box sx={{ my: 3, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        (Mock Audio Player) file: audio/mmmmm143134.opus
                                    </Typography>
                                </Box>
                                <Typography variant="body1">
                                    {t('podcastDesc')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card sx={{ height: '100%', borderRadius: 4, textAlign: 'center', p: 3, bgcolor: 'primary.light', color: 'white' }}>
                            <CardContent>
                                <Mic sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>{t('addStory')}</Typography>
                                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                                    {t('addStoryDesc')}
                                </Typography>
                                <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }} href="https://forms.gle/eHKnS3Gy89RGsVNBA" target="_blank">
                                    {t('addStoryBtn')}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default SuccessStories;

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip, CardMedia, Link } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ErrorBoundary from '../components/ErrorBoundary';

// Components
// Components
import SimpleChat from '../components/SimpleChat';
import UpcomingEvents from '../components/UpcomingEvents';
import ShinyHeader from '../components/ui/ShinyHeader';

import MorningEveningDhikr from '../components/MorningEveningDhikr'; // CHANGED: New Component
import ElectronicServices from '../components/ElectronicServices';
import StatisticsSection from '../components/StatisticsSection';
import CleanTestimonials from '../components/CleanTestimonials';
import TestimonialForm from '../components/TestimonialForm';
import SmartToast from '../components/SmartToast';

import { toast } from 'react-hot-toast';

import {
    School,
    QuestionAnswer,
    Laptop,
    CalendarToday,
    TrendingUp,
    DoorFront
} from '@mui/icons-material';

// --- Local Components ---
import AnimatedHero from '../components/AnimatedHero';

// ...

const MarqueeSection = () => {
    const { t, language } = useLanguage();
    const isAr = language === 'ar';

    return (
        <Box sx={{ bgcolor: '#f44336', color: 'white', py: 1, overflow: 'hidden' }}>
            <Container>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    position: 'relative'
                }}>
                    <Typography
                        variant="button"
                        sx={{
                            bgcolor: '#d32f2f',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            position: 'relative',
                            zIndex: 10,
                            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {t('urgent')}
                    </Typography>

                    {/* Masking Container */}
                    <Box sx={{
                        flex: 1,
                        overflow: 'hidden',
                        position: 'relative',
                        height: '100%'
                    }}>
                        <Box sx={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            animation: 'marquee 20s linear infinite',
                            '@keyframes marquee': {
                                '0%': { transform: `translateX(${isAr ? '-100%' : '100%'})` },
                                '100%': { transform: `translateX(${isAr ? '100%' : '-100%'})` }
                            }
                        }}>
                            <Typography component="span" sx={{ px: 4 }}>
                                {t('marqueeText')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

const Hero = () => {
    const { t } = useLanguage();
    return (
        <AnimatedHero>
            <Box id="hero" sx={{
                position: 'relative',
                minHeight: '600px', // Ensure height
                overflow: 'hidden',
                color: 'text.primary', // Restore standard text color for white bg
                display: 'flex',
                alignItems: 'center',
                pt: 10
            }}>
                {/* Content Overlay */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid size={{ xs: 12, md: 10 }} data-aos="fade-up" sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, color: 'inherit' }}>
                                {t('heroTitle')}
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, lineHeight: 1.6, color: 'text.secondary' }}>
                                {t('heroSubtitle')}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pointerEvents: 'auto' }}>
                                <Button variant="contained" size="large" sx={{ borderRadius: 8, px: 4, bgcolor: '#ffd700', color: 'black', '&:hover': { bgcolor: '#ffea00' } }} href="#services">
                                    {t('exploreServices')}
                                </Button>
                                <Button variant="outlined" size="large" sx={{ borderRadius: 8, px: 4, color: 'primary.main', borderColor: 'primary.main', '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' } }} href="#contact">
                                    {t('contactUs')}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AnimatedHero>
    );
};

const ServicesSection = () => {
    const { t } = useLanguage();
    const servicesData = [
        { icon: <School fontSize="large" />, title: 'materials', description: 'materialsSubtitle', link: '/materials' },
        { icon: <QuestionAnswer fontSize="large" />, title: 'exams', description: 'examsSubtitle', link: '/exams' },
        { icon: <Laptop fontSize="large" />, title: 'tutorials', description: 'grades', link: '#' },
        { icon: <CalendarToday fontSize="large" />, title: 'calendar', description: 'calendar', link: '/calendar' },
        { icon: <TrendingUp fontSize="large" />, title: 'grades_system', description: 'grades', link: '/grading-system' },
        { icon: <DoorFront fontSize="large" />, title: 'rooms', description: 'rooms', link: '#' },
    ];

    return (
        <Box sx={{ py: 8 }} id="services">
            <Container maxWidth="lg">
                <ShinyHeader text={t('servicesTitle')} />
                <Grid container spacing={4}>
                    {servicesData.map((service, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} className="perspective-container">
                            <Card className="tilt-card" sx={{ height: '100%', borderRadius: 4, textAlign: 'center', py: 3, transition: '0.3s' }} data-aos="fade-up" data-aos-delay={index * 100}>
                                <CardContent>
                                    <Box sx={{ color: 'primary.main', mb: 2 }}>{service.icon}</Box>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">{t(service.title) || service.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>{t(service.description) || service.description}</Typography>
                                    <Button variant="outlined" size="small" href={service.link}>{t('goToService')}</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

const LangChainChatSection = () => {
    return (
        <Box sx={{ py: 8, bgcolor: 'transparent' }} id="langchain-chat">
            <Container maxWidth="md">
                <SimpleChat />
            </Container>
        </Box>
    );
};

export default function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1500, // Slow motion
            easing: 'ease-out-cubic',
            once: false,
            mirror: true // Animate on scroll back up
        });
    }, []);

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <Hero />
            <MarqueeSection />
            <LangChainChatSection />
            <UpcomingEvents />

            <ServicesSection />

            <ElectronicServices />
            <StatisticsSection />
            <MorningEveningDhikr /> {/* CHANGED: Replaced DhikrSection */}
            <CleanTestimonials />
            <TestimonialForm />



            <SmartToast />
        </Box>
    );
}
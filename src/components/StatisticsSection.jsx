import React, { useEffect, useState, useRef } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { People, Visibility, VolunteerActivism, LibraryBooks } from '@mui/icons-material';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import ShinyHeader from './ui/ShinyHeader';

// Helper component for animated numbers
const AnimatedNumber = ({ value }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    const rounded = useTransform(springValue, (latest) => Math.round(latest));

    return (
        <motion.span ref={ref}>
            {rounded}
        </motion.span>
    );
};

const StatisticsSection = () => {
    const { t } = useLanguage();

    // State for counters
    const [visitors, setVisitors] = useState(0);
    const [beneficiaries, setBeneficiaries] = useState(0);
    const [volunteers, setVolunteers] = useState(100);
    const [lectures, setLectures] = useState(320);

    useEffect(() => {
        // Visitor & Beneficiary Logic
        // We use localStorage to persist the count across refreshes for the user.
        // In a real production app, this would fetch from a database.
        const storedVisits = localStorage.getItem('site_visits');
        let currentVisits = storedVisits ? parseInt(storedVisits, 10) : 0;

        // Increment on every visit (mount)
        currentVisits += 1;
        localStorage.setItem('site_visits', currentVisits.toString());

        setVisitors(currentVisits);
        setBeneficiaries(currentVisits); // logic: every visitor is a beneficiary

        // Static approximate values as requested
        setVolunteers(100);
        setLectures(320);

    }, []);

    const stats = [
        {
            id: 1,
            label: 'beneficiariesCount',
            value: beneficiaries,
            icon: <People sx={{ fontSize: 32, color: 'white' }} />, // Reduced size
            color: '#4caf50',
            animation: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } } // Bounce
        },
        {
            id: 2,
            label: 'visitorsCount',
            value: visitors,
            icon: <Visibility sx={{ fontSize: 32, color: 'white' }} />, // Reduced size
            color: '#2196f3',
            animation: { scaleY: [1, 0.2, 1], transition: { repeat: Infinity, duration: 3, times: [0, 0.1, 0.2] } } // Blink
        },
        {
            id: 3,
            label: 'volunteersCount',
            value: volunteers,
            icon: <VolunteerActivism sx={{ fontSize: 32, color: 'white' }} />, // Reduced size
            color: '#ff9800',
            animation: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1.5 } } // Heartbeat
        },
        {
            id: 4,
            label: 'lecturesCount',
            value: lectures,
            icon: <LibraryBooks sx={{ fontSize: 32, color: 'white' }} />, // Reduced size
            color: '#9c27b0',
            animation: { rotate: [0, -10, 10, 0], transition: { repeat: Infinity, duration: 4, repeatDelay: 1 } } // Shake
        }
    ];

    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }} id="statistics">
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }} data-aos="fade-up">
                    <ShinyHeader text={t('statisticsTitle')} variant="h3" />
                </Box>

                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card sx={{
                                    textAlign: 'center',
                                    borderRadius: 4,
                                    position: 'relative',
                                    overflow: 'visible',
                                    bgcolor: 'background.paper',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -32, // Adjusted for smaller size
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: 64, // Reduced from 80
                                        height: 64, // Reduced from 80
                                        borderRadius: '50%',
                                        bgcolor: stat.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 8px 20px ${stat.color}66`
                                    }}>
                                        <motion.div animate={stat.animation} style={{ display: 'flex' }}>
                                            {stat.icon}
                                        </motion.div>
                                    </Box>
                                    <CardContent sx={{ pt: 6, pb: 4 }}>
                                        <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: 'text.primary', mb: 1 }}>
                                            +<AnimatedNumber value={stat.value} />
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" fontWeight="500">
                                            {t(stat.label)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default StatisticsSection;

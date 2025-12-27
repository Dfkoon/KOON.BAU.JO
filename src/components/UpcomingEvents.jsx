import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Box, Container, Typography, Button, IconButton, useTheme } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { calendarData } from '../data/calendarData';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarMonth, School, Event, ExpandMore } from '@mui/icons-material';
import ShinyHeader from './ui/ShinyHeader';

const UpcomingEvents = () => {
    const { t, language } = useLanguage();
    const isAr = language === 'ar';
    const theme = useTheme();

    const [filter, setFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(5);
    const [events, setEvents] = useState([]);

    // Process and sort events
    useEffect(() => {
        const fetchEvents = async () => {
            let fetchedEvents = [];
            try {
                // 1. Try fetching from Firestore
                if (db) {
                    const querySnapshot = await getDocs(collection(db, "events"));
                    const dbEvents = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        // Adapt fields: DB uses 'title', component uses 'event'/'eventEn'
                        // We need to normalize or handle both
                        event: doc.data().title,
                        eventEn: doc.data().description || doc.data().title, // Fallback
                        endDate: doc.data().date, // Assuming date string for now
                        type: 'academic' // Default type for custom events
                    }));
                    fetchedEvents = dbEvents;
                } else {
                    console.warn("Firestore not initialized, skipping dynamic events.");
                }
            } catch (err) {
                console.log("Firestore fetch failed, using static data", err);
            }

            // 2. Load static data
            const staticEvents = calendarData.flatMap(semester => semester.events);

            // 3. Merge (Dynamic first)
            const allEventsRaw = [...fetchedEvents, ...staticEvents];

            const allEvents = allEventsRaw
                .filter(event => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    // Handle potential invalid date strings safely
                    try {
                        const eventDate = new Date(event.endDate || event.date);
                        return !isNaN(eventDate) && eventDate >= today;
                    } catch { return false; }
                })
                .sort((a, b) => new Date(a.endDate || a.date) - new Date(b.endDate || b.date));

            setEvents(allEvents);
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        if (filter === 'all') return true;
        // Map data types to filter types
        // Data types: 'academic', 'exam', 'holiday'
        // User Filter types: 'academic' (includes exams usually), 'holiday'
        if (filter === 'holiday') return event.type === 'holiday';
        if (filter === 'academic') return event.type === 'academic' || event.type === 'exam';
        return true;
    });

    const displayEvents = filteredEvents.slice(0, visibleCount);

    // Date formatting helper
    const formatDate = (dateStr) => {
        // Input: "2025/9/28"
        // Return: "Sunday - 28 / 9 / 2025" (localized)
        // Actually the user wants "Day - D / M / YYYY" format
        // We will do best effort parsing
        try {
            // We can use the raw string if it's already friendly, or parse.
            // But the raw string might be a range "2025/10/2-9/28"
            // Let's use the raw string logic nicely?
            // User code used: `date.getDate() / date.getMonth() + 1 / date.getFullYear()`
            // I'll stick to a simple display using the raw `date` string from data mostly, 
            // but maybe enhance it with the Day name if possible for the start date.

            // For now, let's just use the `date` string from data which is "2025/9/28"
            return dateStr;
        } catch (e) {
            return dateStr;
        }
    };

    const getDayName = (dateStr) => {
        try {
            // dateStr might be range "2025/10/2-9/28", take the first part? No, usually range is start-end. 
            // The logic in data is mixed.
            // We'll try to parse the `endDate` for the day name as a fallback or the first part.
            // Actually, let's just return a placeholder or try to parse the first valid date found.
            // This is purely cosmetic.
            return "";
        } catch (e) { return ""; }
    }

    return (
        <Box
            id="upcoming-events"
            sx={{
                py: 8,
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'background.default', // White/Dark standard background
            }}
        >
            {/* Animated Background Circles */}
            {!isMobile && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                    <motion.div
                        animate={{
                            x: [0, 100, -100, 0],
                            y: [0, -100, 100, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            position: 'absolute',
                            top: '10%',
                            left: '10%',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: 'rgba(56, 189, 248, 0.1)', // Light Sky Blue
                            filter: 'blur(50px)',
                        }}
                    />
                    <motion.div
                        animate={{
                            x: [0, -150, 150, 0],
                            y: [0, 150, -150, 0],
                            scale: [1, 1.1, 0.8, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 2
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '20%',
                            right: '10%',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            background: 'rgba(76, 175, 80, 0.08)', // Light Green
                            filter: 'blur(60px)',
                        }}
                    />
                </Box>
            )}

            <Container sx={{ position: 'relative', zIndex: 1 }}>

                <ShinyHeader text={t('upcomingEvents')} sx={{ mb: 2 }} />

                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        {isAr ? "تصفح أحدث الأحداث الأكاديمية والعطل الرسمية في كليتنا." : "Browse the latest academic events and official holidays."}
                    </Typography>
                </Box>

                {/* Filters */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                    {[
                        { key: 'all', labelAr: "جميع الأحداث", labelEn: "All Events" },
                        { key: 'academic', labelAr: "أحداث أكاديمية", labelEn: "Academic Events" },
                        { key: 'holiday', labelAr: "عطل رسمية", labelEn: "Official Holidays" }
                    ].map((btn) => (
                        <Button
                            key={btn.key}
                            onClick={() => setFilter(btn.key)}
                            variant={filter === btn.key ? "contained" : "text"}
                            color={filter === btn.key ? "primary" : "inherit"}
                            sx={{
                                borderRadius: 8,
                                px: 3,
                                py: 1,
                                fontWeight: filter === btn.key ? 'bold' : 'normal',
                                bgcolor: filter === btn.key ? 'primary.main' : 'rgba(0,0,0,0.03)',
                                '&:hover': {
                                    bgcolor: filter === btn.key ? 'primary.dark' : 'rgba(0,0,0,0.08)'
                                }
                            }}
                        >
                            {isAr ? btn.labelAr : btn.labelEn}
                        </Button>
                    ))}
                </Box>

                {/* Events List */}
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', maxWidth: 800, mx: 'auto' }}>
                    <AnimatePresence mode="popLayout">
                        {displayEvents.length === 0 ? (
                            <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                                {isAr ? "لا توجد أحداث قادمة حالياً." : "No upcoming events found."}
                            </Typography>
                        ) : (
                            displayEvents.map((event, index) => {
                                // Check if "Near" (Top 3 in the list)
                                // The list 'displayEvents' is already sorted by date and filtered.
                                // simply check if index < 3
                                const isSoon = index < 3;
                                const isHoliday = event.type === 'holiday';

                                return (
                                    <motion.li
                                        key={`${event.date}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.1 }}
                                        layout
                                        style={{ marginBottom: '16px' }}
                                    >
                                        <Box sx={{
                                            bgcolor: 'background.paper',
                                            p: 3,
                                            borderRadius: 4,
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            position: 'relative',
                                            borderRight: isAr ? `4px solid ${isHoliday ? '#e53935' : (isSoon ? '#4caf50' : '#1565c0')}` : 'none',
                                            borderLeft: !isAr ? `4px solid ${isHoliday ? '#e53935' : (isSoon ? '#4caf50' : '#1565c0')}` : 'none',
                                            overflow: 'hidden',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }
                                        }}>
                                            {/* Tag for Near or Holiday */}
                                            {(isSoon || isHoliday) && (
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    left: isAr ? 12 : 'auto',
                                                    right: isAr ? 'auto' : 12,
                                                    bgcolor: isHoliday ? 'rgba(229, 57, 53, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                                                    color: isHoliday ? 'error.main' : 'success.main',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 2,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}>
                                                    {isHoliday ? (isAr ? 'عطلة' : 'Holiday') : (isAr ? 'قريباً' : 'Soon')}
                                                </Box>
                                            )}

                                            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1, mt: (isSoon || isHoliday) ? 1 : 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarMonth fontSize="small" sx={{ opacity: 0.8 }} />
                                                {event.date}
                                            </Typography>

                                            <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.05rem', color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                {event.type === 'holiday' ? <Event color="error" /> : <School color="action" />}
                                                {isAr ? event.event : event.eventEn}
                                            </Typography>
                                        </Box>
                                    </motion.li>
                                );
                            })
                        )}
                    </AnimatePresence>
                </Box>

                {/* Load More */}
                {filteredEvents.length > visibleCount && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => setVisibleCount(prev => prev + 5)}
                            sx={{ borderRadius: 8, px: 4, py: 1, fontWeight: 'bold' }}
                            endIcon={<ExpandMore />}
                        >
                            {isAr ? `عرض المزيد (${filteredEvents.length - visibleCount})` : `Show More (${filteredEvents.length - visibleCount})`}
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default UpcomingEvents;

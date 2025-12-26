import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, useTheme, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lightbulb, Info, MedicalServices, Spa, CalendarMonth,
    SwapHoriz, Memory, Security, School, EmojiEvents,
    EventAvailable, Warning
} from '@mui/icons-material';
import { updatesService } from '../services/updatesService';
import { useLanguage } from '../context/LanguageContext';

// Map icon strings to components
const iconMap = {
    lightbulb: <Lightbulb />,
    info: <Info />,
    medical: <MedicalServices />,
    leaf: <Spa />,
    calendar: <CalendarMonth />,
    exchange: <SwapHoriz />,
    chip: <Memory />,
    shield: <Security />,
    graduate: <School />,
    award: <EmojiEvents />,
    calendar_check: <EventAvailable />,
    warning: <Warning />
};

const LatestUpdates = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const { language, t } = useLanguage();
    const theme = useTheme();
    const isAr = language === 'ar';

    useEffect(() => {
        const fetchUpdates = async () => {
            const data = await updatesService.getAllUpdates();
            // Sort by creation or date field
            // Sort by date string if createdAt is missing, otherwise createdAt
            data.sort((a, b) => {
                if (b.createdAt && a.createdAt) return b.createdAt.seconds - a.createdAt.seconds;
                return 0;
            });
            setUpdates(data);
            setLoading(false);
        };
        fetchUpdates();
    }, []);

    // Filter Logic
    const filteredData = filter === 'all'
        ? updates
        : updates.filter(item => {
            const badgeAr = item.badge?.ar || '';
            const cat = item.category;

            if (filter === 'new') return badgeAr.includes('جديد');
            if (filter === 'important') return badgeAr.includes('هام');
            if (filter === 'urgent') return cat === 'urgent' || badgeAr.includes('عاجل');
            if (filter === 'registration') return cat === 'registration';
            if (filter === 'general') return cat === 'general' || cat === 'academic';
            return true;
        });

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (updates.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h6" color="text.secondary">
                    {isAr ? 'لا توجد إعلانات حالياً.' : 'No updates available at the moment.'}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            component="section"
            sx={{
                mt: 4,
                p: { xs: 2, md: 0 },
                maxWidth: '100%',
                mx: 'auto',
                textAlign: 'center',
                position: 'relative',
                mb: 8
            }}
        >
            {/* Filter Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mb: 6 }}>
                {[
                    { id: 'all', label: isAr ? 'جميع الإعلانات' : 'All Updates' },
                    { id: 'new', label: isAr ? 'جـديـد' : 'New' },
                    { id: 'important', label: isAr ? 'هـــام' : 'Important' },
                    { id: 'registration', label: isAr ? 'قبول وتسجيل' : 'Registration' },
                    { id: 'general', label: isAr ? 'أخبار عامة' : 'General News' },
                    { id: 'urgent', label: isAr ? 'عاجل' : 'Urgent' },
                ].map((btn) => (
                    <Button
                        key={btn.id}
                        onClick={() => setFilter(btn.id)}
                        sx={{
                            borderRadius: '50px',
                            px: 3,
                            py: 1,
                            fontSize: '0.9rem',
                            bgcolor: filter === btn.id ? 'primary.main' : 'background.paper',
                            color: filter === btn.id ? 'white' : 'text.primary',
                            border: `1px solid ${filter === btn.id ? 'transparent' : 'rgba(0,0,0,0.1)'}`,
                            boxShadow: filter === btn.id ? 4 : 1,
                            '&:hover': {
                                bgcolor: filter === btn.id ? 'primary.dark' : 'action.hover',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s'
                        }}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Box>

            {/* Announcements Grid */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <AnimatePresence>
                    {filteredData.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            style={{ width: '100%', maxWidth: '900px' }}
                        >
                            <Box sx={{
                                bgcolor: 'background.paper',
                                borderRadius: '15px',
                                p: { xs: 2.5, md: 4 },
                                boxShadow: theme.palette.mode === 'dark' ? '0 10px 25px rgba(0,0,0,0.4)' : '0 10px 25px rgba(0,0,0,0.08)',
                                textAlign: isAr ? 'right' : 'left',
                                position: 'relative',
                                borderRight: isAr ? `5px solid ${item.badgeColor}` : 'none',
                                borderLeft: !isAr ? `5px solid ${item.badgeColor}` : 'none',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: theme.palette.mode === 'dark' ? '0 15px 30px rgba(0,0,0,0.6)' : '0 15px 30px rgba(0, 0, 0, 0.15)'
                                }
                            }}>
                                {/* Badge */}
                                <Chip
                                    label={item.badge?.[isAr ? 'ar' : 'en'] || item.badge?.ar || 'Update'}
                                    sx={{
                                        position: 'absolute',
                                        top: -15,
                                        left: isAr ? 20 : 'auto',
                                        right: !isAr ? 20 : 'auto',
                                        bgcolor: item.badgeColor,
                                        color: 'white',
                                        fontWeight: 'bold',
                                        height: 32
                                    }}
                                />

                                {/* Header */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3,
                                    flexDirection: isAr ? 'row-reverse' : 'row',
                                    justifyContent: isAr ? 'flex-end' : 'flex-start',
                                    gap: 2
                                }}>
                                    <Box sx={{ flex: 1 }}> {/* Text Container */}
                                        <Typography variant="h6" sx={{ color: item.badgeColor, fontWeight: 'bold', fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.4 }}>
                                            {item.title?.[isAr ? 'ar' : 'en'] || item.title?.ar}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                                            {isAr ? 'تاريخ النشر:' : 'Published:'} {item.date}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        width: 50, height: 50,
                                        bgcolor: `${item.badgeColor}22`, // Light opacity
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: item.badgeColor
                                    }}>
                                        {React.cloneElement(iconMap[item.icon] || <Info />, { fontSize: 'medium' })}
                                    </Box>
                                </Box>

                                {/* Content */}
                                <Box
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '1.05rem',
                                        lineHeight: 1.8,
                                        direction: isAr ? 'rtl' : 'ltr',
                                        '& p': { mb: 1.5 },
                                        '& ul': { mr: isAr ? 2 : 0, ml: !isAr ? 2 : 0, mb: 2 },
                                        '& li': { mb: 0.5 },
                                        '& a': { color: item.badgeColor, textDecoration: 'underline' }
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: typeof item.content === 'string'
                                            ? item.content
                                            : (item.content?.[isAr ? 'ar' : 'en'] || item.content?.ar || '')
                                    }}
                                />

                                {/* Image (if exists) */}
                                {item.image && (
                                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={item.title?.[isAr ? 'ar' : 'en']}
                                            sx={{
                                                maxWidth: '100%',
                                                maxHeight: 400,
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* Footer Logo Text */}
                                <Typography sx={{ mt: 3, fontWeight: 'bold', color: 'primary.main', fontSize: '1.2rem', letterSpacing: 1, textAlign: 'center' }}>
                                    {isAr ? 'مجتمع مكانك' : 'Makanak Community'}
                                </Typography>

                            </Box>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Box>
        </Box>
    );
};

export default LatestUpdates;

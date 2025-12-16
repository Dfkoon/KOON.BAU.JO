import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Chip, Dialog, DialogTitle, DialogContent, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider, Stack, Button } from '@mui/material';
import { Launch, Close, PictureAsPdf, YouTube, Description, Assignment } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyHeader from './ui/ShinyHeader';
import { useLanguage } from '../context/LanguageContext';

const getLinkIcon = (type) => {
    switch (type) {
        case 'PDF': return <PictureAsPdf color="error" />;
        case 'Video': return <YouTube color="error" />;
        case 'Summary': return <Description color="warning" />;
        case 'Exam': return <Assignment color="info" />;
        default: return <Launch color="action" />;
    }
};

const CourseCard = ({ course, onClick }) => {
    const { language } = useLanguage();
    // Helper to get localized title safely
    const getTitle = (c) => {
        if (!c || !c.title) return "";
        if (typeof c.title === 'object') {
            return language === 'ar' ? c.title.ar : c.title.en;
        }
        return c.title;
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05, rotateY: 5, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ height: '100%', perspective: 1000 }}
        >
            <Paper
                onClick={onClick}
                elevation={3}
                sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 4,
                    cursor: 'pointer',
                    bgcolor: 'background.paper', // Uses theme background
                    backgroundImage: 'none', // Removed hardcoded gradient
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                    '&:hover': {
                        boxShadow: 8,
                        borderColor: 'primary.main'
                    }
                }}
            >
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'action.hover', // Theme aware hover/bg color
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        color: 'primary.main'
                    }}
                >
                    {course.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
                    {getTitle(course)}
                </Typography>
            </Paper>
        </motion.div>
    );
};

const CourseModal = ({ open, onClose, course }) => {
    const { language } = useLanguage();
    const isRtl = language === 'ar';

    // Helper to get localized title safely
    const getTitle = (c) => {
        if (!c || !c.title) return "";
        if (typeof c.title === 'object') {
            return language === 'ar' ? c.title.ar : c.title.en;
        }
        return c.title;
    };

    if (!course) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    p: 2,
                    bgcolor: 'background.paper', // Theme aware
                    backgroundImage: 'none',
                    direction: isRtl ? 'rtl' : 'ltr'
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: 'primary.main' }}>{course.icon}</Box>
                    <Typography variant="h6" fontWeight="bold" color="text.primary">{getTitle(course)}</Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ bgcolor: 'action.selected' }}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <Divider sx={{ mb: 2 }} />
            <DialogContent>
                <Stack spacing={2}>
                    {course.links && course.links.map((link, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {getLinkIcon(link.type)}
                                <Box>
                                    <Typography variant="body1" fontWeight="500" color="text.primary">
                                        {/* Handle bilingual labels */}
                                        {typeof link.label === 'object'
                                            ? (language === 'ar' ? link.label.ar : link.label.en)
                                            : link.label}
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                component="a"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                size="small"
                                color="inherit"
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    minWidth: 80,
                                    borderColor: 'divider',
                                    color: 'text.secondary'
                                }}
                            >
                                {link.type}
                            </Button>
                        </Paper>
                    ))}
                </Stack>
                {(!course.links || course.links.length === 0) && (
                    <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                        {isRtl ? 'لا توجد ملفات حالياً لهذه المادة.' : 'No files available for this course yet.'}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

const CourseSection = ({ title, courses }) => {
    const { language } = useLanguage();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const isRtl = language === 'ar';

    // If no courses or empty list, possibly hide section or show empty state.
    if (!courses || courses.length === 0) return null;

    return (
        <Box sx={{ my: 6 }}>
            <Box sx={{ mb: 4 }}>
                <ShinyHeader
                    text={title}
                    align="left"
                    variant="h5"
                    sx={{
                        mb: 1,
                        borderInlineStart: '4px solid #506400',
                        paddingInlineStart: 2
                    }}
                />
            </Box>

            <Grid container spacing={3}>
                {courses.map(course => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                        <CourseCard course={course} onClick={() => setSelectedCourse(course)} />
                    </Grid>
                ))}
            </Grid>

            {/* Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <CourseModal
                        open={Boolean(selectedCourse)}
                        onClose={() => setSelectedCourse(null)}
                        course={selectedCourse}
                    />
                )}
            </AnimatePresence>
        </Box>
    );
};

export default CourseSection;

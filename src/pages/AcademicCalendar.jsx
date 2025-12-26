// Imports updated
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Add, EventNote } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { calendarData } from '../data/calendarData'; // Static data
import { calendarService } from '../services/calendarService'; // Dynamic data
import ShinyHeader from '../components/ui/ShinyHeader';

const AcademicCalendar = () => {
    const { language, t } = useLanguage();
    const isAr = language === 'ar';

    // State for dynamic events and suggestions
    const [dynamicEvents, setDynamicEvents] = useState([]);
    const [openSuggest, setOpenSuggest] = useState(false);
    const [suggestion, setSuggestion] = useState({ title: '', date: '', description: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    // Load dynamic events
    useEffect(() => {
        const loadEvents = async () => {
            const events = await calendarService.getAllEvents();
            setDynamicEvents(events);
        };
        loadEvents();
    }, []);

    // Helper to check if a date is in the past
    const isPast = (dateStr) => {
        const today = new Date();
        let cleanDate = dateStr.replace(/\s/g, '');
        try {
            return new Date(cleanDate) < today;
        } catch (e) {
            return false;
        }
    };

    const handleSuggestSubmit = async () => {
        if (!suggestion.title || !suggestion.date) return;

        const result = await calendarService.suggestEvent({
            event: suggestion.title, // Align naming with static data structure roughly
            eventEn: suggestion.title,
            date: suggestion.date,
            description: suggestion.description
        });

        if (result.success) {
            setStatus({ type: 'success', message: isAr ? 'تم إرسال اقتراحك للمراجعة!' : 'Suggestion sent for review!' });
            setSuggestion({ title: '', date: '', description: '' });
            setTimeout(() => { setOpenSuggest(false); setStatus({ type: '', message: '' }); }, 2000);
        } else {
            setStatus({ type: 'error', message: isAr ? 'حدث خطأ في الإرسال.' : 'Error sending suggestion.' });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <ShinyHeader text={isAr ? "التقويم الجامعي 2026/2025" : "Academic Calendar 2025/2026"} variant="h3" gutterBottom={false} />
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Add />}
                        onClick={() => setOpenSuggest(true)}
                        sx={{ borderRadius: 8, px: 3, fontWeight: 'bold' }}
                    >
                        {isAr ? "اقترح حدثاً" : "Suggest Event"}
                    </Button>
                </Box>

                {/* Combined Data Display: Static Semesters + Dynamic List if needed */}
                {/* For simplicity, we append dynamic events to a "User Submitted / Dynamic" section or merge if possible. 
                    Given the structure of static data (semesters), let's render static first, then a section for "Additional Events" */}

                {calendarData.map((semester, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            mb: 6,
                            borderRadius: 4,
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        <Box sx={{
                            bgcolor: '#506400',
                            color: 'white',
                            p: 3,
                            textAlign: 'center'
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {isAr ? semester.title : semester.titleEn}
                            </Typography>
                        </Box>

                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="calendar table">
                                <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem', width: '30%' }}>
                                            {isAr ? "التاريخ / الفترة" : "Date / Period"}
                                        </TableCell>
                                        <TableCell align={isAr ? "right" : "left"} sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                            {isAr ? "الحدث / النشاط" : "Event / Activity"}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {semester.events.map((row, idx) => {
                                        const passed = isPast(row.endDate);
                                        return (
                                            <TableRow
                                                key={idx}
                                                sx={{
                                                    textDecoration: passed ? 'line-through' : 'none',
                                                    color: passed ? 'text.disabled' : 'text.primary',
                                                    bgcolor: passed ? 'rgba(0,0,0,0.02)' : 'inherit',
                                                    '&:hover': {
                                                        bgcolor: passed ? 'rgba(0,0,0,0.02)' : 'rgba(80, 100, 0, 0.05)'
                                                    }
                                                }}
                                            >
                                                <TableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                    sx={{
                                                        color: passed ? 'text.disabled' : '#506400',
                                                        fontWeight: passed ? 'normal' : 'bold',
                                                        direction: 'ltr' // Keep dates LTR
                                                    }}
                                                >
                                                    {row.date}
                                                </TableCell>
                                                <TableCell
                                                    align={isAr ? "right" : "left"}
                                                    sx={{ color: passed ? 'text.disabled' : 'inherit' }}
                                                >
                                                    {isAr ? row.event : row.eventEn}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ))}

                {/* Dynamic Events Section */}
                {dynamicEvents.length > 0 && (
                    <Paper elevation={3} sx={{ mb: 6, borderRadius: 4, overflow: 'hidden' }}>
                        <Box sx={{ bgcolor: '#1976d2', color: 'white', p: 3, textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {isAr ? "أحداث إضافية" : "Additional Events"}
                            </Typography>
                        </Box>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableBody>
                                    {dynamicEvents.map((row, idx) => (
                                        <TableRow key={idx} hover>
                                            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#1976d2', direction: 'ltr', width: '30%' }}>
                                                {row.date}
                                            </TableCell>
                                            <TableCell align={isAr ? "right" : "left"}>
                                                {isAr ? row.event : (row.eventEn || row.event)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                )}

            </motion.div>

            {/* Suggestion Dialog */}
            <Dialog open={openSuggest} onClose={() => setOpenSuggest(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{isAr ? "اقتراح حدث للتقويم" : "Suggest Calendar Event"}</DialogTitle>
                <DialogContent>
                    {status.message && <Alert severity={status.type} sx={{ mb: 2 }}>{status.message}</Alert>}
                    <TextField
                        autoFocus
                        margin="dense"
                        label={isAr ? "عنوان الحدث" : "Event Title"}
                        fullWidth
                        value={suggestion.title}
                        onChange={(e) => setSuggestion({ ...suggestion, title: e.target.value })}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label={isAr ? "التاريخ (مثال: 2025/10/1)" : "Date (e.g. 2025/10/1)"}
                        fullWidth
                        value={suggestion.date}
                        onChange={(e) => setSuggestion({ ...suggestion, date: e.target.value })}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label={isAr ? "ملاحظات إضافية" : "Start Notes"}
                        fullWidth
                        multiline
                        rows={2}
                        value={suggestion.description}
                        onChange={(e) => setSuggestion({ ...suggestion, description: e.target.value })}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenSuggest(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
                    <Button onClick={handleSuggestSubmit} variant="contained" color="secondary">
                        {isAr ? "إرسال الاقتراح" : "Submit Suggestion"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AcademicCalendar;

import React from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

import { calendarData } from '../data/calendarData';

import ShinyHeader from '../components/ui/ShinyHeader';

const AcademicCalendar = () => {
    const { language } = useLanguage();
    const isAr = language === 'ar';

    // Helper to check if a date (or date range end) is in the past
    // Date format expected: "YYYY/M/D" or "YYYY/M/D-D" (range within same month) or "YYYY/M/D-M/D"
    const isPast = (dateStr) => {
        const today = new Date();
        // Remove spaces
        let cleanDate = dateStr.replace(/\s/g, '');

        // Handle ranges like 2025/10/2-9/28 (mixed up in image sometimes) or 2025/9/28
        // Standardize handling: assume format YYYY/M/D.
        // If range "2025/10/2-9/28", we care about the LAST date. 
        // Actual image text is often "2025/10/2-9/28" meaning 28/9 to 2/10... usually right-to-left in Arabic text but numbers might be left-to-right.
        // Let's normalize: logic is checking against the *latest* date in the string.

        // Simple extraction of all date-like segments
        // We will manually normalize the data in the object below to be YYYY/MM/DD for parsing safety.
        // If it's a future date, return false.

        try {
            // We explain the parsing logic:
            // The data below will have a separate 'endDate' property for logic, and 'displayDate' for showing.
            return new Date(cleanDate) < today;
        } catch (e) {
            return false;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ShinyHeader text={isAr ? "التقويم الجامعي 2026/2025" : "Academic Calendar 2025/2026"} variant="h3" sx={{ mb: 6 }} />

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
            </motion.div>
        </Container>
    );
};

export default AcademicCalendar;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Check, Delete, Add, EventNote } from '@mui/icons-material';
import { calendarService } from '../../services/calendarService';
import ShinyHeader from '../../components/ui/ShinyHeader';

export default function ManageAcademicCalendar() {
    const [suggestions, setSuggestions] = useState([]);
    const [events, setEvents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newEvent, setNewEvent] = useState({ event: '', eventEn: '', date: '' });

    const fetchData = async () => {
        const suggs = await calendarService.getSuggestions();
        const evts = await calendarService.getAllEvents();
        setSuggestions(suggs);
        setEvents(evts);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (sugg) => {
        if (window.confirm('الموافقة على هذا الحدث ونشره؟')) {
            await calendarService.approveSuggestion(sugg.id, {
                event: sugg.event,
                eventEn: sugg.eventEn,
                date: sugg.date,
                description: sugg.description
            });
            fetchData();
        }
    };

    const handleDeleteSuggestion = async (id) => {
        if (window.confirm('حذف الاقتراح؟')) {
            await calendarService.deleteSuggestion(id);
            fetchData();
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('حذف هذا الحدث الرسمي؟')) {
            await calendarService.deleteEvent(id);
            fetchData();
        }
    };

    const handleAddEvent = async () => {
        await calendarService.addEvent({
            ...newEvent,
            isOfficial: true
        });
        setOpenDialog(false);
        setNewEvent({ event: '', eventEn: '', date: '' });
        fetchData();
    };

    return (
        <Box>
            <ShinyHeader text="إدارة التقويم" variant="h4" gutterBottom />

            {/* Suggestions Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'warning.main', fontWeight: 'bold' }}>
                    اقتراحات المستخدمين ({suggestions.length})
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>التاريخ</TableCell>
                                <TableCell>عنوان الحدث</TableCell>
                                <TableCell>الوصف</TableCell>
                                <TableCell align="right">الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suggestions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">لا توجد اقتراحات معلقة</TableCell>
                                </TableRow>
                            )}
                            {suggestions.map((sugg) => (
                                <TableRow key={sugg.id}>
                                    <TableCell>{sugg.date}</TableCell>
                                    <TableCell>{sugg.event}</TableCell>
                                    <TableCell>{sugg.description}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="success" onClick={() => handleApprove(sugg)}>
                                            <Check />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteSuggestion(sugg.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Official Events Section */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        الأحداث الرسمية ({events.length})
                    </Typography>
                    <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
                        إضافة حدث رسمي
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>التاريخ</TableCell>
                                <TableCell>الحدث (عربي)</TableCell>
                                <TableCell>الحدث (إنجليزي)</TableCell>
                                <TableCell align="right">الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((evt) => (
                                <TableRow key={evt.id}>
                                    <TableCell>{evt.date}</TableCell>
                                    <TableCell>{evt.event}</TableCell>
                                    <TableCell>{evt.eventEn}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="error" onClick={() => handleDeleteEvent(evt.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Add Event Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>إضافة حدث للتقويم</DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="التاريخ (مثال: 2026/01/15)"
                        fullWidth
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="عنوان الحدث (عربي)"
                        fullWidth
                        value={newEvent.event}
                        onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="عنوان الحدث (إنجليزي - اختياري)"
                        fullWidth
                        value={newEvent.eventEn}
                        onChange={(e) => setNewEvent({ ...newEvent, eventEn: e.target.value })}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
                    <Button onClick={handleAddEvent} variant="contained">إضافة</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

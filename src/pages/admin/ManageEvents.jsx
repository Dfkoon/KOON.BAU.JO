import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment } from '@mui/material';
import { Delete, Add, Edit, Search, Event as EventIcon, LocationOn } from '@mui/icons-material';
import ShinyHeader from '../../components/ui/ShinyHeader';

export default function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [eventData, setEventData] = useState({ title: '', date: '', location: '', description: '' });
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort by creation time if available, or just by date string loosely
            setEvents(data);
            setFilteredEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const lower = searchTerm.toLowerCase();
        const filtered = events.filter(e =>
            e.title.toLowerCase().includes(lower) ||
            e.date.toLowerCase().includes(lower) ||
            e.location.toLowerCase().includes(lower)
        );
        setFilteredEvents(filtered);
    }, [searchTerm, events]);

    const handleOpen = (event = null) => {
        if (event) {
            setCurrentId(event.id);
            setEventData({ title: event.title, date: event.date, location: event.location, description: event.description });
        } else {
            setCurrentId(null);
            setEventData({ title: '', date: '', location: '', description: '' });
        }
        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (currentId) {
                // Update
                const eventRef = doc(db, "events", currentId);
                await updateDoc(eventRef, {
                    ...eventData,
                    updatedAt: serverTimestamp()
                });
            } else {
                // Create
                await addDoc(collection(db, "events"), {
                    ...eventData,
                    createdAt: serverTimestamp()
                });
            }
            setOpen(false);
            fetchEvents();
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
            try {
                await deleteDoc(doc(db, "events", id));
                fetchEvents();
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <ShinyHeader text="إدارة الفعاليات" variant="h4" gutterBottom={false} />
                <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
                    إضافة فعالية
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="بحث عن الفعاليات بالعنوان، التاريخ، أو الموقع..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    size="small"
                />
            </Paper>

            <Paper elevation={2}>
                <List>
                    {filteredEvents.length === 0 && !loading && (
                        <ListItem><ListItemText primary="لا توجد فعاليات مطابقة لبحثك." /></ListItem>
                    )}
                    {filteredEvents.map((event, index) => (
                        <React.Fragment key={event.id}>
                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <Box>
                                        <IconButton onClick={() => handleOpen(event)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(event.id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" component="div">
                                            {event.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box component="span" sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                                            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <EventIcon fontSize="small" color="action" /> {event.date}
                                            </Box>
                                            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationOn fontSize="small" color="action" /> {event.location}
                                            </Box>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < filteredEvents.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* Add/Edit Event Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{currentId ? 'تعديل الفعالية' : 'إضافة فعالية جديدة'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="عنوان الفعالية"
                        fullWidth
                        value={eventData.title}
                        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                        variant="outlined"
                        sx={{ mb: 2, mt: 1 }}
                    />
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            margin="dense"
                            label="التاريخ"
                            placeholder="مثال: 15 كانون الثاني 2026"
                            fullWidth
                            value={eventData.date}
                            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            label="الموقع"
                            fullWidth
                            value={eventData.location}
                            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                            variant="outlined"
                        />
                    </Box>
                    <TextField
                        margin="dense"
                        label="الوصف"
                        fullWidth
                        multiline
                        rows={4}
                        value={eventData.description}
                        onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)}>إلغاء</Button>
                    <Button onClick={handleSave} variant="contained">
                        {currentId ? 'حفظ التعديلات' : 'إضافة الفعالية'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// Helper for Divider
import Divider from '@mui/material/Divider';

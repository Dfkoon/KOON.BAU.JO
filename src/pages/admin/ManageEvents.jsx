import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import ShinyHeader from '../../components/ui/ShinyHeader';

export default function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', description: '' });
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAddEvent = async () => {
        try {
            await addDoc(collection(db, "events"), {
                ...newEvent,
                createdAt: serverTimestamp()
            });
            setOpen(false);
            setNewEvent({ title: '', date: '', location: '', description: '' });
            fetchEvents(); // Refresh list
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <ShinyHeader text="Manage Events" variant="h4" gutterBottom={false} />
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
                    Add Event
                </Button>
            </Box>

            <Paper elevation={2}>
                <List>
                    {events.length === 0 && !loading && (
                        <ListItem><ListItemText primary="No events found." /></ListItem>
                    )}
                    {events.map((event) => (
                        <React.Fragment key={event.id}>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEvent(event.id)}>
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={event.title}
                                    secondary={`${event.date} - ${event.location}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* Add Event Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Event Title"
                        fullWidth
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        placeholder="e.g. 15 Jan 2026"
                        fullWidth
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Location"
                        fullWidth
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddEvent} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// Helper for Divider
import Divider from '@mui/material/Divider';

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Paper } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { useLanguage } from '../../context/LanguageContext';

const TodoList = () => {
    const { t } = useLanguage();
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('studentTasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem('studentTasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, height: '100%' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                📝 {t('todoTitle') || 'My Tasks'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder={t('addTaskPlaceholder') || 'Add a new task...'}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <Button variant="contained" onClick={addTask} disabled={!newTask.trim()}>
                    <Add />
                </Button>
            </Box>

            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {tasks.length === 0 && (
                    <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
                        {t('noTasks') || 'No tasks yet. Add one to get started!'}
                    </Typography>
                )}
                {tasks.map(task => (
                    <ListItem
                        key={task.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)} color="error">
                                <Delete />
                            </IconButton>
                        }
                        disablePadding
                        sx={{
                            mb: 1,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            transition: '0.2s',
                            opacity: task.completed ? 0.7 : 1
                        }}
                    >
                        <Checkbox
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            color="primary"
                        />
                        <ListItemText
                            primary={task.text}
                            sx={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? 'text.secondary' : 'text.primary'
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TodoList;

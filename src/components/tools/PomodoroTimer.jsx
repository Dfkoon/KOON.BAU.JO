import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, CircularProgress, Card, CardContent, IconButton } from '@mui/material';
import { PlayArrow, Pause, Refresh, CheckCircle } from '@mui/icons-material';
import { useLanguage } from '../../context/LanguageContext';

const PomodoroTimer = () => {
    const { t } = useLanguage();
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'focus') setMinutes(25);
        else if (mode === 'shortBreak') setMinutes(5);
        else setMinutes(15);
        setSeconds(0);
    };

    const changeMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setSeconds(0);
        if (newMode === 'focus') setMinutes(25);
        else if (newMode === 'shortBreak') setMinutes(5);
        else setMinutes(15);
    };

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsActive(false);
                        // Optional: Play sound here
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, minutes]);

    const progress = mode === 'focus'
        ? ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100
        : mode === 'shortBreak'
            ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
            : ((15 * 60 - (minutes * 60 + seconds)) / (15 * 60)) * 100;

    return (
        <Card sx={{ textAlign: 'center', p: 4, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                🍅 {t('pomodoroTitle') || 'Pomodoro Focused Timer'}
            </Typography>

            <Box sx={{ position: 'relative', display: 'inline-flex', my: 4 }}>
                <CircularProgress variant="determinate" value={progress} size={200} thickness={2} sx={{ color: mode === 'focus' ? 'error.main' : 'success.main', opacity: 0.2, position: 'absolute' }} />
                <CircularProgress variant="determinate" value={100} size={200} thickness={2} sx={{ color: 'grey.200', position: 'absolute', zIndex: -1 }} />
                <Box sx={{
                    top: 0, left: 0, bottom: 0, right: 0,
                    position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Typography variant="h2" component="div" fontWeight="bold">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </Typography>
                </Box>
                <Box sx={{ width: 200, height: 200 }} /> {/* Spacer */}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                    variant={mode === 'focus' ? 'contained' : 'outlined'}
                    onClick={() => changeMode('focus')}
                    color="error"
                    size="small"
                >
                    {t('focus') || 'Focus'}
                </Button>
                <Button
                    variant={mode === 'shortBreak' ? 'contained' : 'outlined'}
                    onClick={() => changeMode('shortBreak')}
                    color="success"
                    size="small"
                >
                    {t('shortBreak') || 'Short Break'}
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton onClick={toggleTimer} color="primary" sx={{ border: '2px solid', width: 60, height: 60 }}>
                    {isActive ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </IconButton>
                <IconButton onClick={resetTimer} color="warning" sx={{ border: '2px solid', width: 60, height: 60 }}>
                    <Refresh fontSize="large" />
                </IconButton>
            </Box>
        </Card>
    );
};

export default PomodoroTimer;

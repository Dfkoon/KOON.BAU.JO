import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Fade, Slide } from '@mui/material';
import { Close, Lightbulb } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { tips } from '../data/botData';

const SmartToast = () => {
    const { language } = useLanguage();
    const [open, setOpen] = useState(false);
    const [currentTip, setCurrentTip] = useState(null);

    useEffect(() => {
        // Show a random tip after 3 seconds
        const timer = setTimeout(() => {
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            setCurrentTip(randomTip);
            setOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    if (!currentTip) return null;

    const isAr = language === 'ar';
    const title = isAr ? currentTip.titleAr : currentTip.titleEn;
    const text = isAr ? currentTip.textAr : currentTip.textEn;

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box sx={{
                position: 'fixed',
                bottom: 30,
                left: isAr ? 30 : 'auto',
                right: isAr ? 'auto' : 30,
                zIndex: 9999,
                width: 320,
            }}>
                {/* Background Stack Layers */}
                <Box sx={{
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    right: 10,
                    height: '100%',
                    bgcolor: '#e91e63', // Pink layer
                    borderRadius: '16px',
                    opacity: 0.6,
                    transform: 'scale(0.9)',
                    zIndex: -2,
                    boxShadow: 3
                }} />
                <Box sx={{
                    position: 'absolute',
                    top: -6,
                    left: 5,
                    right: 5,
                    height: '100%',
                    bgcolor: '#2196f3', // Blue layer
                    borderRadius: '16px',
                    opacity: 0.8,
                    transform: 'scale(0.95)',
                    zIndex: -1,
                    boxShadow: 3
                }} />

                {/* Main Card */}
                <Box sx={{
                    bgcolor: '#e8f5e9', // Light Green main bg
                    color: '#2e7d32',
                    p: 2.5,
                    borderRadius: '16px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Box sx={{
                        bgcolor: '#4caf50',
                        color: 'white',
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        boxShadow: 2
                    }}>
                        <Lightbulb fontSize="small" />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.9 }}>
                            {text}
                        </Typography>
                    </Box>

                    <IconButton
                        size="small"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: isAr ? 'auto' : 5,
                            left: isAr ? 5 : 'auto',
                            color: '#9e9e9e'
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Slide>
    );
};

export default SmartToast;

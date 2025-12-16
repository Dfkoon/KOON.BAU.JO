import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';

const FramerCarousel = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            overflow: 'hidden',
            py: 4
        }}>

            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '400px',
                perspective: '1000px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AnimatePresence mode='popLayout'>
                    {items.map((item, index) => {
                        // Calculate offset from active index
                        // We want to show: prev, active, next
                        let offset = index - activeIndex;

                        // Handle infinite wrap logic visually nicely for small counts
                        // For exact 3 items, this visual logic works.
                        // For more, we might need a more complex circular buffer logic, 
                        // but simple center-focus logic works if we strictly hide distant ones.

                        // BUT a simpler approach for a "Carousel" feel:
                        // Show all, but position absolute based on index.
                        // Let's stick to a simple 3D stack logic for active, left, right.

                        // Refined Logic (Circular Distance):
                        const total = items.length;
                        // Distance: 0 is active, 1 is right, -1 is left
                        offset = ((index - activeIndex + total + total / 2) % total) - total / 2;
                        // Make strictly integer for array logic if needed, but here simple math.
                        // We round offset to nearest integer to be safe for 5 items.
                        offset = Math.round(offset);

                        // Only render if within range -2 to 2 (5 items visible max)
                        if (Math.abs(offset) > 2) return null;

                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: Math.abs(offset) > 1 ? 0.5 : 1,
                                    scale: offset === 0 ? 1.1 : 0.8,
                                    x: isMobile ? `${offset * 110}%` : offset * 800, // Responsive spacing: % for mobile to clear screen, px for desktop
                                    zIndex: 100 - Math.abs(offset),
                                    rotateY: offset * -15 // Rotate slightly inward
                                }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                style={{
                                    position: 'absolute',
                                    width: isMobile ? '90vw' : '750px', // Responsive width
                                    height: '400px',
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '10px',
                                    boxShadow: offset === 0
                                        ? '0 20px 50px rgba(0,0,0,0.3)'
                                        : '0 10px 20px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                                onClick={() => setActiveIndex(index)}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '85%',
                                        objectFit: 'contain', // Ensure full chart is visible
                                        borderRadius: '15px'
                                    }}
                                    draggable={false}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,
                                        color: 'text.primary',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </Box>

            {/* Controls */}
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2, zIndex: 10 }}>
                <IconButton onClick={handlePrev} color="primary" sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
                    <ArrowBack />
                </IconButton>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    {items.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: i === activeIndex ? 1.3 : 1,
                                backgroundColor: i === activeIndex ? '#1976d2' : '#ccc'
                            }}
                            onClick={() => handleDotClick(i)}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </Box>

                <IconButton onClick={handleNext} color="primary" sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
                    <ArrowForward />
                </IconButton>
            </Box>
        </Box>
    );
};

export default FramerCarousel;

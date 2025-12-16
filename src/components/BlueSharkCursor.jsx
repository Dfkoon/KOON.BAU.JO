import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fab, Tooltip } from '@mui/material';
import { AutoFixHigh, AutoFixOff } from '@mui/icons-material';

const TRAIL_LIFETIME = 1000; // 1 second exactly

const BlueSharkCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const [isMagicEnabled, setIsMagicEnabled] = useState(true); // Default ON
    const [trail, setTrail] = useState([]);
    const requestRef = useRef();

    useEffect(() => {
        if (!isMagicEnabled) {
            setTrail([]); // Clear trail if disabled
            return;
        }

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add point to trail with timestamp
            setTrail(prev => [
                ...prev,
                { x: e.clientX, y: e.clientY, id: Date.now(), timestamp: Date.now() }
            ]);
        };

        const handleClick = () => {
            setIsVisible(false);
            setTrail([]); // Clear trail on click
            setTimeout(() => {
                setIsVisible(true);
            }, 500);
        };

        // Animation loop to clean up old trail points
        const cleanupTrail = () => {
            setTrail(prev => {
                const now = Date.now();
                // Filter out points older than TRAIL_LIFETIME
                const newTrail = prev.filter(point => now - point.timestamp < TRAIL_LIFETIME);

                // Only trigger update if length changed
                if (newTrail.length !== prev.length) {
                    return newTrail;
                }
                return prev;
            });
            requestRef.current = requestAnimationFrame(cleanupTrail);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('click', handleClick);
        requestRef.current = requestAnimationFrame(cleanupTrail);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(requestRef.current);
        };
    }, [isMagicEnabled]);

    return (
        <>
            {/* Magic Toggle Button (Desktop Only) */}
            <Tooltip title={isMagicEnabled ? "Disable Magic Cursor" : "Enable Magic Cursor"} placement="right">
                <Fab
                    color="primary"
                    size="small"
                    onClick={() => setIsMagicEnabled(!isMagicEnabled)}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        left: 24, // Bottom Left
                        zIndex: 10000,
                        display: { xs: 'none', md: 'flex' }, // Hide on mobile
                        opacity: 0.7,
                        '&:hover': { opacity: 1, transform: 'scale(1.1)' },
                        transition: 'all 0.3s ease',
                        boxShadow: isMagicEnabled ? '0 0 15px rgba(0, 242, 255, 0.6)' : 'none',
                        bgcolor: isMagicEnabled ? 'primary.main' : 'grey.700'
                    }}
                >
                    {isMagicEnabled ? <AutoFixHigh /> : <AutoFixOff />}
                </Fab>
            </Tooltip>

            <AnimatePresence>
                {isMagicEnabled && isVisible && (
                    <>
                        {/* TRAIL */}
                        {trail.map((point) => {
                            const age = Date.now() - point.timestamp;
                            const lifeLeft = 1 - (age / TRAIL_LIFETIME);

                            if (lifeLeft <= 0) return null;

                            const size = lifeLeft * 12; // Start small (12px) and shrink

                            return (
                                <motion.div
                                    key={point.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: lifeLeft * 0.4, scale: lifeLeft }} // Max opacity 0.4
                                    transition={{ duration: 0 }}
                                    style={{
                                        position: 'fixed',
                                        top: point.y - size / 2,
                                        left: point.x - size / 2,
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        borderRadius: '50%',
                                        backgroundColor: '#00f2ff',
                                        pointerEvents: 'none',
                                        zIndex: 9998,
                                    }}
                                />
                            );
                        })}

                        {/* HEAD (The Shark/Beam - Small & Sharp) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                x: mousePosition.x - 8,
                                y: mousePosition.y - 8,
                                opacity: 1,
                                scale: 1,
                                rotate: 45
                            }}
                            exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
                            transition={{
                                type: "spring",
                                damping: 30,
                                stiffness: 500,
                                mass: 0.1
                            }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '16px',
                                height: '16px',
                                borderRadius: '50% 0 50% 50%',
                                backgroundColor: '#fff',
                                pointerEvents: 'none',
                                zIndex: 9999,
                                boxShadow: '0 0 10px 2px rgba(0, 242, 255, 0.4)',
                            }}
                        >
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default BlueSharkCursor;

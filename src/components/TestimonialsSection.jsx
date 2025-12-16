import React, { useRef, useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Grid, IconButton, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FormatQuote, Business, School, VerifiedUser, Computer } from '@mui/icons-material'; // Icons for placeholders
import ShinyHeader from './ui/ShinyHeader';

// Testimonials Data
const testimonials = [
    {
        id: 1,
        name: "سوسن",
        role: "طالبة تخصص تحقيقات جنائية رقمية",
        text: "يعطيكم العافيه من دون مبالغه الموقع رهيبب جهودكم مشكوره مبدعين🫡 +الكتاب تبعك برضو بهنيك عليه رائع واكتر من رائع بالتوفيق يارب منها للاحسن 🫡🌹",
        avatarColor: "#e91e63" // Pink
    },
    {
        id: 2,
        name: "نور",
        role: "طالبة تخصص تحقيقات جنائية رقمية",
        text: "اولاً شكرا كتير ما قصرت عنجد اكيد رح نستفيد ، وصراحة عمل يفتخر به كونك عملته و مو من مجال تخصصنا ، كل الدعم 🔥🔥",
        avatarColor: "#9c27b0" // Purple
    },
    {
        id: 3,
        name: "احمد",
        role: "طالب تخصص تحقيقات جنائية رقمية",
        text: "الموقع رائع جدًا وساعدني كثيرًا في دراستي. شكرًا لكم!",
        avatarColor: "#2196f3" // Blue
    },
    {
        id: 4,
        name: "علي",
        role: "طالب تخصص تحقيقات جنائية رقمية",
        text: "موقع مفيد جدًا وسهل الاستخدام. أتمنى لكم المزيد من النجاح.!",
        avatarColor: "#ff9800" // Orange
    }
];

// Partners Data (Using Icons as placeholders for logos)
const partners = [
    { id: 1, name: "Partner 1", icon: <VerifiedUser sx={{ fontSize: 60 }} /> },
    { id: 2, name: "Partner 2", icon: <Computer sx={{ fontSize: 60 }} /> },
    // { id: 3, name: "Partner 3", icon: <School sx={{ fontSize: 60 }} /> }, // Add more if needed
];

const TestimonialsSection = () => {
    const theme = useTheme();
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-scroll logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Scroll to active card
    useEffect(() => {
        if (carouselRef.current) {
            const cardWidth = 320 + 32; // card max-width + gap
            const scrollPos = activeIndex * cardWidth;
            carouselRef.current.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
        }
    }, [activeIndex]);

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <Box sx={{ py: 10, overflow: 'hidden', bgcolor: 'background.default' }}>
            <Container maxWidth="lg">

                {/* --- Testimonials Section --- */}
                <Box sx={{ mb: 12, position: 'relative' }}>
                    {/* Decorative Background Blur */}
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(80,100,0,0.05) 0%, rgba(0,0,0,0) 70%)',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }} />

                    <ShinyHeader text="ماذا يقول طلابنا؟" sx={{ mb: 6 }} />

                    {/* Carousel Container */}
                    <Box
                        ref={carouselRef}
                        sx={{
                            display: 'flex',
                            gap: 4,
                            overflowX: 'auto',
                            pb: 4,
                            scrollBehavior: 'smooth',
                            '::-webkit-scrollbar': { display: 'none' },
                            px: 2
                        }}
                    >
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={item.id}
                                style={{ minWidth: '320px', maxWidth: '320px' }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: activeIndex === index ? 1.05 : 1,
                                    y: activeIndex === index ? -10 : 0
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: '100%',
                                        borderRadius: 4,
                                        position: 'relative',
                                        overflow: 'visible',
                                        bgcolor: 'background.paper',
                                        boxShadow: theme.palette.mode === 'dark'
                                            ? '0 10px 30px rgba(0,0,0,0.5)'
                                            : '0 10px 30px rgba(0,0,0,0.05)',
                                        border: '1px solid',
                                        borderColor: activeIndex === index ? 'primary.main' : 'divider',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {/* Quote Icon Badge */}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -20,
                                        right: 20,
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main || '#8bc34a'})`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                    }}>
                                        <FormatQuote fontSize="small" />
                                    </Box>

                                    <CardContent sx={{ p: 4, pt: 5 }}>
                                        <Typography variant="body1" paragraph sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.8 }}>
                                            "{item.text}"
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: item.avatarColor, width: 50, height: 50 }}>
                                                {item.name[0]}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {item.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </Box>

                    {/* Indicators */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                        {testimonials.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => handleDotClick(index)}
                                sx={{
                                    width: activeIndex === index ? 30 : 10,
                                    height: 4,
                                    borderRadius: 2,
                                    bgcolor: activeIndex === index ? 'primary.main' : 'action.disabled',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* --- Partners Section --- */}
                <Box>
                    <ShinyHeader text="شركاؤنا في النجاح" sx={{ mb: 2 }} />
                    <Typography
                        align="center"
                        color="text.secondary"
                        sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
                    >
                        نحن ممتنون للداعمين الذين ساهموا في تطوير هذا الموقع ودعم الطلاب في مسيرتهم الأكاديمية.
                    </Typography>

                    <Grid container spacing={4} justifyItems="center" justifyContent="center">
                        {partners.map((partner) => (
                            <Grid item key={partner.id}>
                                <Box
                                    sx={{
                                        opacity: 0.6,
                                        filter: 'grayscale(100%)',
                                        transition: 'all 0.4s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            opacity: 1,
                                            filter: 'grayscale(0%)',
                                            transform: 'scale(1.1)'
                                        },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    {/* Using Icon as Placeholder for Image */}
                                    <Box sx={{
                                        p: 2,
                                        bgcolor: 'action.hover',
                                        borderRadius: '50%',
                                        color: 'primary.main'
                                    }}>
                                        {partner.icon}
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Container>
        </Box>
    );
};

export default TestimonialsSection;

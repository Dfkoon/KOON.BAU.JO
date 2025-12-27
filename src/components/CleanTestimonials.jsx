import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Box, Typography, Container, Avatar, useTheme } from "@mui/material";

// Initial/Fallback Data
const initialTestimonials = [
    {
        id: 1,
        quote: "يعطيكم العافيه من دون مبالغه الموقع رهيبب جهودكم مشكوره مبدعين + الكتاب تبعك برضو بهنيك عليه رائع.",
        author: "سوسن",
        role: "طالبة",
        company: "تحقيقات جنائية",
        avatarColor: "#e91e63"
    },
    {
        id: 2,
        quote: "اولاً شكرا كتير ما قصرت عنجد اكيد رح نستفيد، وصراحة عمل يفتخر به كونك عملته.",
        author: "نور",
        role: "طالبة",
        company: "تحقيقات جنائية",
        avatarColor: "#9c27b0"
    },
    {
        id: 3,
        quote: "الموقع رائع جدًا وساعدني كثيرًا في دراستي. شكرًا لكم!",
        author: "احمد",
        role: "طالب",
        company: "تحقيقات جنائية",
        avatarColor: "#2196f3"
    },
    {
        id: 4,
        quote: "موقع مفيد جدًا وسهل الاستخدام. أتمنى لكم المزيد من النجاح!",
        author: "علي",
        role: "طالب",
        company: "تحقيقات جنائية",
        avatarColor: "#ff9800"
    }
];

function SplitText({ text }) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return <span>{text}</span>;

    const words = text.split(" ");
    return (
        <span style={{ display: "inline" }}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.4,
                        delay: i * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: "inline-block", marginLeft: "0.25em" }} // Adjusted for Arabic RTL
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

const CleanTestimonials = () => {
    const theme = useTheme();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const containerRef = useRef(null);

    useEffect(() => {
        const loadTestimonials = async () => {
            // Dynamic import to avoid circular dependency if any, though standard import is fine here.
            const { testimonialsService } = await import('../services/testimonialsService');
            const approved = await testimonialsService.getApprovedTestimonials();
            if (approved && approved.length > 0) {
                // Combine or replace? Let's append new ones to initial ones, or replace if we want pure dynamic.
                // Ideally replace, but for now let's use initial as base + approved ones to show volume
                // Or just use approved if available. Let's use combined for demo feel.
                setTestimonials([...initialTestimonials, ...approved]);
            }
        };
        loadTestimonials();
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback(
        (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        },
        [mouseX, mouseY]
    );

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[activeIndex];

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "relative",
                width: "100%",
                maxWidth: "md",
                mx: "auto",
                py: isMobile ? 8 : 15,
                px: 4,
                cursor: isMobile ? "auto" : "none",
                bgcolor: "background.default",
                color: "text.primary",
                overflow: 'hidden',
                direction: 'rtl' // Ensure Arabic layout
            }}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onMouseEnter={isMobile ? undefined : () => setIsHovered(true)}
            onMouseLeave={isMobile ? undefined : () => setIsHovered(false)}
            onClick={handleNext}
        >
            {/* Custom Magnetic Cursor */}
            {!isMobile && (
                <motion.div
                    style={{
                        position: "absolute",
                        zIndex: 50,
                        mixBlendMode: theme.palette.mode === 'dark' ? 'difference' : 'normal',
                        pointerEvents: "none",
                        x: cursorX,
                        y: cursorY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                >
                    <motion.div
                        animate={{
                            width: isHovered ? 80 : 0,
                            height: isHovered ? 80 : 0,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        style={{
                            borderRadius: "50%",
                            backgroundColor: theme.palette.text.primary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <motion.span
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                color: theme.palette.background.default,
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                            }}
                        >
                            التالي
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}

            {/* Floating Index Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                    position: "absolute",
                    top: 32,
                    left: 32, // Moved to left for RTL
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                }}
            >
                <motion.span
                    key={activeIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: 300,
                        color: theme.palette.text.primary,
                    }}
                >
                    {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
                <span style={{ color: theme.palette.text.secondary }}>/</span>
                <span style={{ color: theme.palette.text.secondary }}>
                    {String(testimonials.length).padStart(2, "0")}
                </span>
            </motion.div>

            {/* Avatar Previews (Right side for RTL) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.6 }}
                style={{
                    position: "absolute",
                    top: 32,
                    right: 32, // Moved to right for RTL
                    display: "flex",
                    marginLeft: "-8px", // Negative margin for overlap
                }}
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            border: `2px solid ${theme.palette.background.default}`,
                            overflow: "hidden",
                            transition: "all 0.3s",
                            marginLeft: -8, // Stack overlap
                            opacity: i === activeIndex ? 1 : 0.5,
                            filter: i === activeIndex ? "none" : "grayscale(100%)",
                            backgroundColor: t.avatarColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 10
                        }}
                    >
                        {t.author[0]}
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content */}
            <Box sx={{ position: "relative", mt: 8 }}>
                <AnimatePresence mode="wait">
                    <motion.blockquote
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        <Typography
                            variant="h5"
                            component="p"
                            sx={{
                                fontWeight: 300,
                                lineHeight: 1.6,
                                color: "text.primary",
                                fontSize: { xs: '1.25rem', md: '1.75rem' }
                            }}
                        >
                            <SplitText text={currentTestimonial.quote} />
                        </Typography>
                    </motion.blockquote>
                </AnimatePresence>

                {/* Author Info */}
                <motion.div
                    layout
                    style={{ marginTop: 48, position: "relative" }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* Avatar Container */}
                        <Box sx={{ position: "relative", width: 48, height: 48 }}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    position: "absolute",
                                    inset: -6,
                                    borderRadius: "50%",
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    opacity: 0.4,
                                }}
                            />
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.id}
                                    animate={{
                                        opacity: i === activeIndex ? 1 : 0,
                                        zIndex: i === activeIndex ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                        backgroundColor: t.avatarColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: 20
                                    }}
                                >
                                    {t.author[0]}
                                </motion.div>
                            ))}
                        </Box>

                        {/* Author Text */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 10 }} // From right for RTL
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{ position: "relative", paddingRight: 16 }} // PR for RTL
                            >
                                <motion.div
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        position: "absolute",
                                        right: 0, // Right line for RTL
                                        top: 0,
                                        bottom: 0,
                                        width: 1,
                                        backgroundColor: theme.palette.primary.main,
                                        originY: 0,
                                    }}
                                />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                    {currentTestimonial.author}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 1 }}>
                                    {currentTestimonial.role} — {currentTestimonial.company}
                                </Typography>
                            </motion.div>
                        </AnimatePresence>
                    </Box>
                </motion.div>

                {/* Progress Bar */}
                <Box sx={{ mt: 8, height: 1, bgcolor: "divider", position: "relative", overflow: "hidden" }}>
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0, // RTL progress from right
                            bottom: 0,
                            backgroundColor: theme.palette.primary.main,
                        }}
                    />
                </Box>
            </Box>

            {/* Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.4 : 0.2 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "absolute",
                    bottom: 32,
                    right: 32,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 1 }}>
                    اضغط في أي مكان
                </Typography>
            </motion.div>
        </Box>
    );
};

export default CleanTestimonials;

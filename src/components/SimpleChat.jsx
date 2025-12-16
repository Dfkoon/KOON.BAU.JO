import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Paper, Typography, IconButton, Avatar } from '@mui/material';
import { Send, SmartToy, Person } from '@mui/icons-material';
import { chatResponses, defaultResponseAr, defaultResponseEn } from '../data/chatResponses';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SimpleChat = () => {
    const { language } = useLanguage();
    const isAr = language === 'ar';

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // Set initial greeting based on language
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    role: 'assistant',
                    content: isAr
                        ? 'مرحباً! أنا "كون" (Koon Bot) 🤖. اسألني عن الخطط، الامتحانات، أو المواد وبجاوبك!'
                        : 'Hello! I am "Koon Bot" 🤖. Ask me about Plans, Exams, or Materials!'
                }
            ]);
        }
    }, [language, messages.length, isAr]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getResponse = (text) => {
        const lowerText = text.toLowerCase();
        for (const item of chatResponses) {
            if (item.keywords.some(keyword => lowerText.includes(keyword))) {
                return item.response;
            }
        }
        return isAr ? defaultResponseAr : defaultResponseEn;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        // Simulate thinking delay with variable time for realism
        setTimeout(() => {
            const reply = getResponse(userMessage);
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            setLoading(false);
        }, 800 + Math.random() * 500);
    };

    const quickActions = isAr ? [
        "الخطط الدراسية", "الامتحانات", "مواعيد السحب",
        "حساب المعدل", "تبادل المواد", "من نحن",
        "التواصل مع المطور", "أذكار", "المواد الدراسية"
    ] : [
        "Study Plans", "Exams", "Add/Drop Dates",
        "GPA Calculator", "Book Exchange", "Who are you?",
        "Contact Dev", "Goals", "Study Materials"
    ];

    return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 650, mx: 'auto', mt: 6, mb: 4 }}>

            {/* Ambient Background Glow */}
            <Box sx={{
                position: 'absolute',
                top: '-20px', left: '-20px', right: '-20px', bottom: '-20px',
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(156, 39, 176, 0.2))',
                filter: 'blur(40px)',
                zIndex: 0,
                borderRadius: '50px'
            }} />

            <Paper
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                elevation={10}
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    p: 0,
                    borderRadius: '24px',
                    height: '750px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
                }}
            >
                {/* Header */}
                <Box sx={{
                    p: 2.5,
                    background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                    direction: isAr ? 'rtl' : 'ltr'
                }}>
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Avatar sx={{
                            bgcolor: 'white',
                            color: '#2196F3',
                            width: 50,
                            height: 50,
                            boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                        }}>
                            <SmartToy sx={{ fontSize: 30 }} />
                        </Avatar>
                    </motion.div>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 0.5 }}>
                            {isAr ? 'كون (Koon Bot)' : 'Koon Bot'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ width: 8, height: 8, bgcolor: '#00e676', borderRadius: '50%' }} />
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                                {isAr ? 'متصل الآن 🇯🇴' : 'Online Now 🇯🇴'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Chat Area */}
                <Box
                    ref={chatContainerRef}
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #f0f7ff 0%, #ffffff 100%)',
                        scrollBehavior: 'smooth'
                    }}
                >
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    alignSelf: msg.role === 'user' ? (isAr ? 'flex-start' : 'flex-end') : (isAr ? 'flex-end' : 'flex-start'),
                                    maxWidth: '85%',
                                    display: 'flex',
                                    gap: '10px',
                                    flexDirection: isAr ? (msg.role === 'user' ? 'row' : 'row-reverse') : (msg.role === 'user' ? 'row-reverse' : 'row'),
                                    direction: isAr ? 'rtl' : 'ltr'
                                }}
                            >
                                <Avatar sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: msg.role === 'user' ? '#1976d2' : '#ffffff',
                                    color: msg.role === 'user' ? '#fff' : '#2196F3',
                                    border: msg.role === 'user' ? 'none' : '1px solid #e0e0e0',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                }}>
                                    {msg.role === 'user' ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
                                </Avatar>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: msg.role === 'user' ? '#1976d2' : '#ffffff',
                                    color: msg.role === 'user' ? '#ffffff' : '#333333',
                                    borderRadius: isAr
                                        ? (msg.role === 'user' ? '20px 20px 20px 4px' : '20px 20px 4px 20px') // RTL Radius
                                        : (msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px'), // LTR Radius
                                    boxShadow: msg.role === 'user' ? '0 4px 10px rgba(25, 118, 210, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                                    border: msg.role === 'user' ? 'none' : '1px solid #f0f0f0',
                                    position: 'relative'
                                }}>
                                    <Typography
                                        variant="body1"
                                        dir={isAr ? "rtl" : "ltr"}
                                        sx={{
                                            lineHeight: 1.6,
                                            fontSize: '0.95rem',
                                            '& a': { color: msg.role === 'user' ? '#fff' : '#2196F3', fontWeight: 600 }
                                        }}
                                        dangerouslySetInnerHTML={{ __html: msg.content }}
                                    />
                                </Paper>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                alignSelf: isAr ? 'flex-end' : 'flex-start',
                                marginLeft: isAr ? 0 : '46px',
                                marginRight: isAr ? '46px' : 0
                            }}
                        >
                            <Paper sx={{ p: 1.5, borderRadius: '20px', bgcolor: 'white', display: 'flex', gap: 1 }}>
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        style={{ width: 8, height: 8, background: '#90caf9', borderRadius: '50%' }}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </Paper>
                        </motion.div>
                    )}
                </Box>

                {/* Quick Actions & Input Area */}
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    {/* Quick Buttons Scroll */}
                    <Box sx={{
                        display: 'flex',
                        gap: 1.2,
                        p: 2,
                        overflowX: 'auto',
                        direction: isAr ? 'rtl' : 'ltr',
                        '&::-webkit-scrollbar': { height: '0px' },
                        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                    }}>
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Paper
                                    onClick={() => { setInput(action); setTimeout(handleSend, 0); }} // Auto-send
                                    elevation={0}
                                    sx={{
                                        px: 2.5, py: 1,
                                        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
                                        color: '#444',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        border: '1px solid #fff',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                                            color: 'white',
                                            boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)'
                                        },
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {action}
                                </Paper>
                            </motion.div>
                        ))}
                    </Box>

                    {/* Input Field */}
                    <Box sx={{ p: 2, display: 'flex', gap: 1.5, pt: 0, pb: 2.5, direction: isAr ? 'rtl' : 'ltr' }}>
                        <TextField
                            fullWidth
                            placeholder={loading ? "..." : (isAr ? "اكتب سؤالك هنا..." : "Type your question here...")}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                            multiline
                            maxRows={3}
                            InputProps={{
                                sx: {
                                    borderRadius: '24px',
                                    bgcolor: '#f8f9fa',
                                    '&.Mui-focused': { bgcolor: '#fff', boxShadow: '0 0 0 2px #2196F3' },
                                    transition: 'all 0.3s',
                                    border: 'none',
                                    pl: 3
                                }
                            }}
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                        />
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                sx={{
                                    background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                                    color: 'white',
                                    width: 56,
                                    height: 56,
                                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1976D2 0%, #00B0FF 100%)',
                                        boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
                                    },
                                    '&.Mui-disabled': { background: '#bdbdbd', color: '#fff' },
                                    transform: isAr ? 'rotate(180deg)' : 'none'
                                }}
                            >
                                <Send />
                            </IconButton>
                        </motion.div>
                    </Box>
                </Box>
            </Paper >
        </Box >
    );
};

export default SimpleChat;

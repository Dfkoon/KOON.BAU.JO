import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, Grid, Chip, Tabs, Tab, InputAdornment, Paper } from '@mui/material';
import { Delete, Reply, Search, QuestionAnswer, CheckCircle, HourglassEmpty } from '@mui/icons-material';
import { qnaService } from '../../services/qnaService';
import ShinyHeader from '../../components/ui/ShinyHeader';

export default function AdminQnA() {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [replyText, setReplyText] = useState({});
    const [tabValue, setTabValue] = useState(0); // 0: All, 1: Pending, 2: Answered
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        const data = await qnaService.getAllMessages();
        // Sort by date descending
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMessages(data);
    };

    useEffect(() => {
        let result = messages;

        // Filter by Tab
        if (tabValue === 1) { // Pending
            result = result.filter(m => !m.answer);
        } else if (tabValue === 2) { // Answered
            result = result.filter(m => m.answer);
        }

        // Filter by Search
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(m =>
                m.text.toLowerCase().includes(lower) ||
                (m.answer && m.answer.toLowerCase().includes(lower))
            );
        }

        setFilteredMessages(result);
    }, [messages, tabValue, searchTerm]);

    const handleReply = async (id) => {
        if (!replyText[id]) return;

        await qnaService.answerQuestion(id, replyText[id]);
        setReplyText({ ...replyText, [id]: '' });
        loadMessages();
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
            await qnaService.deleteQuestion(id);
            loadMessages();
        }
    };

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <ShinyHeader text="إدارة الأسئلة" variant="h4" gutterBottom />

            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={handleChangeTab} indicatorColor="primary" textColor="primary" variant="fullWidth">
                    <Tab label={`الكل (${messages.length})`} />
                    <Tab label={`قيد الانتظار (${messages.filter(m => !m.answer).length})`} icon={<HourglassEmpty fontSize="small" />} iconPosition="start" />
                    <Tab label={`مجابة (${messages.filter(m => m.answer).length})`} icon={<CheckCircle fontSize="small" />} iconPosition="start" />
                </Tabs>
                <Box sx={{ p: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="بحث عن الأسئلة..."
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
                </Box>
            </Paper>

            <Grid container spacing={3}>
                {filteredMessages.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Paper sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography>لا توجد أسئلة.</Typography>
                        </Paper>
                    </Grid>
                )}

                {filteredMessages.map((msg) => (
                    <Grid size={{ xs: 12 }} key={msg.id}>
                        <Card sx={{
                            borderLeft: msg.answer ? '4px solid #4caf50' : '4px solid #ff9800',
                            transition: '0.3s',
                            '&:hover': { boxShadow: 3 }
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'flex-start' }}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                            المعرف: {msg.id}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={msg.answer ? "تمت الإجابة" : "قيد الانتظار"}
                                        color={msg.answer ? "success" : "warning"}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <QuestionAnswer color="action" sx={{ mt: 0.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                        {msg.text}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {msg.answer ? (
                                    <Box sx={{ bgcolor: 'rgba(76, 175, 80, 0.08)', p: 2, borderRadius: 1, border: '1px solid rgba(76, 175, 80, 0.2)' }}>
                                        <Typography variant="subtitle2" color="success.main" gutterBottom fontWeight="bold">
                                            رد المشرف:
                                        </Typography>
                                        <Typography variant="body1">{msg.answer}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => handleDelete(msg.id)}
                                            >
                                                حذف السؤال
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box sx={{ mt: 2 }}>
                                        <TextField
                                            fullWidth
                                            label="اكتب الرد..."
                                            value={replyText[msg.id] || ''}
                                            onChange={(e) => setReplyText({ ...replyText, [msg.id]: e.target.value })}
                                            multiline
                                            rows={3}
                                            variant="outlined"
                                            sx={{ mb: 2, bgcolor: '#fff' }}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button
                                                color="error"
                                                onClick={() => handleDelete(msg.id)}
                                            >
                                                حذف
                                            </Button>
                                            <Button
                                                variant="contained"
                                                startIcon={<Reply />}
                                                onClick={() => handleReply(msg.id)}
                                                disabled={!replyText[msg.id]}
                                            >
                                                نشر الرد
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

// Helper imports
import Divider from '@mui/material/Divider';

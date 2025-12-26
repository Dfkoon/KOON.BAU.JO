import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Divider, Chip } from '@mui/material';
import { QuestionAnswer, Person } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import ShinyHeader from '../components/ui/ShinyHeader';
import { qnaService } from '../services/qnaService';
import AOS from 'aos';

const QnA = () => {
    const { t } = useLanguage();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await qnaService.getPublicMessages();
            setMessages(data);
        };
        fetchMessages();
    }, []);

    return (
        <Box sx={{ py: 15, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <ShinyHeader text={t('qnaTitle')} />
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }} data-aos="fade-up">
                    {t('qnaSubtitle')}
                </Typography>

                {messages.length === 0 ? (
                    <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
                        {t('noQuestions')}
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {messages.map((msg, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={msg.id} data-aos="fade-up" data-aos-delay={index * 100}>
                                <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 3 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                            <Person color="disabled" />
                                            <Typography variant="body1" fontWeight="bold">
                                                {msg.text}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Box sx={{ display: 'flex', gap: 2, bgcolor: 'primary.soft', p: 2, borderRadius: 2 }}>
                                            <QuestionAnswer color="primary" />
                                            <Box>
                                                <Typography variant="subtitle2" color="primary.main" fontWeight="bold" gutterBottom>
                                                    Admin Reply
                                                </Typography>
                                                <Typography variant="body2" color="text.primary">
                                                    {msg.answer}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default QnA;

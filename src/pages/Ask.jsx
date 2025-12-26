import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import ShinyHeader from '../components/ui/ShinyHeader';
import { qnaService } from '../services/qnaService';
import AOS from 'aos';

const Ask = () => {
    const { t } = useLanguage();
    const [question, setQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) {
            setStatus({ type: 'warning', message: t('yourQuestion') + ' مطلوب' }); // "Question is required" roughly
            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
            return;
        }

        setIsSubmitting(true);
        const result = await qnaService.sendQuestion(question);
        setIsSubmitting(false);

        if (result.success) {
            setStatus({ type: 'success', message: t('questionSent') });
            setQuestion('');
        } else {
            setStatus({ type: 'error', message: 'Error sending question. Check connection.' });
        }

        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    };

    return (
        <Box sx={{ py: 15, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="md">
                <ShinyHeader text={t('askTitle')} />
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }} data-aos="fade-up">
                    {t('askSubtitle')}
                </Typography>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 600, mx: 'auto' }} data-aos="zoom-in">
                    {status.message && (
                        <Alert severity={status.type} sx={{ mb: 3 }}>
                            {status.message}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label={t('yourQuestion')}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            variant="outlined"
                            disabled={isSubmitting}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isSubmitting}
                            endIcon={!isSubmitting && <Send sx={{ transform: t('dir') === 'rtl' ? 'scaleX(-1)' : 'none' }} />}
                            sx={{ borderRadius: 8, py: 1.5 }}
                        >
                            {isSubmitting ? (t('lang') === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t('sendQuestion')}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Ask;

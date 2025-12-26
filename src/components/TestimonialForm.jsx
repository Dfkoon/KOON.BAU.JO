import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Snackbar, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';
import { testimonialsService } from '../services/testimonialsService';
import ShinyHeader from './ui/ShinyHeader';

const TestimonialForm = () => {
    const [formData, setFormData] = useState({
        author: '',
        role: 'طالب', // Default
        company: '', // Using company field for "Major" as per request
        quote: ''
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await testimonialsService.addTestimonial(formData);

        if (result.success) {
            setToast({
                open: true,
                message: 'شكراً لك! تم إرسال تعليقك للمراجعة وسيظهر قريباً.',
                severity: 'success'
            });
            setFormData({ author: '', role: 'طالب', company: '', quote: '' });
        } else {
            setToast({
                open: true,
                message: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
                severity: 'error'
            });
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    شاركنا رأيك
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    رأيك يهمنا! شارك تجربتك مع موقع كـُن لتساعدنا في التحسين ولتشجيع زملائك.
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <TextField
                                label="الاسم (المقطع الأول)"
                                name="author"
                                required
                                fullWidth
                                value={formData.author}
                                onChange={handleChange}
                                variant="outlined"
                            />
                            <TextField
                                label="التخصص"
                                name="company"
                                required
                                fullWidth
                                value={formData.company}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Box>

                        <TextField
                            label="تعليقك / رأيك في الموقع"
                            name="quote"
                            required
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.quote}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="اكتب رأيك بصراحة..."
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            endIcon={<Send sx={{ transform: 'scaleX(-1)' }} />} // Flip icon for RTL
                            sx={{
                                alignSelf: 'flex-start',
                                px: 4,
                                borderRadius: 2,
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'primary.dark' }
                            }}
                        >
                            {loading ? 'جاري الإرسال...' : 'إرسال التعليق'}
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Snackbar
                open={toast.open}
                autoHideDuration={6000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TestimonialForm;

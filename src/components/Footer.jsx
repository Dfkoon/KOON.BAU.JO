import React, { useState } from 'react';
import { Box, Typography, Container, Grid, IconButton, TextField, Button, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Send, Email } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import AnimatedLogo from './AnimatedLogo';
import { subscribersService } from '../services/subscribersService';

const Footer = () => {
    const { t, language } = useLanguage();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ open: false, type: 'success', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isAr = language === 'ar';

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        const result = await subscribersService.subscribe(email);
        setIsSubmitting(false);

        if (result.success) {
            setStatus({
                open: true,
                type: 'success',
                message: isAr ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!'
            });
            setEmail('');
        } else if (result.message === 'already_subscribed') {
            setStatus({
                open: true,
                type: 'info',
                message: isAr ? 'أنت مشترك بالفعل!' : 'Already subscribed!'
            });
        } else if (result.message === 'invalid_email') {
            setStatus({
                open: true,
                type: 'warning',
                message: isAr ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address'
            });
        } else if (result.message === 'db_unavailable') {
            setStatus({
                open: true,
                type: 'error',
                message: isAr ? 'عذراً، الخدمة غير متوفرة حالياً (تأكد من الإعدادات)' : 'Service unavailable (check config)'
            });
        } else {
            setStatus({
                open: true,
                type: 'error',
                message: isAr ? 'حدث خطأ، حاول مرة أخرى.' : 'Error occurring, try again.'
            });
        }
    };

    return (
        <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', pt: 8, pb: 4, mt: 'auto', position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand Section */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ mb: 2 }}>
                            <AnimatedLogo size="100px" />
                        </Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                            {t('heroSubtitle')}
                        </Typography>
                    </Grid>

                    {/* Newsletter Section */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {isAr ? 'النشرة البريدية' : 'Newsletter'}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                            {isAr ? 'اشترك ليصلك كل جديد' : 'Subscribe to get the latest updates'}
                        </Typography>

                        <form onSubmit={handleSubscribe}>
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder={isAr ? 'البريد الإلكتروني' : 'Email Address'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="small"
                                    disabled={isSubmitting}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-root': {
                                            color: 'white',
                                            '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                            '&.Mui-focused fieldset': { borderColor: 'white' },
                                            '&.Mui-disabled': { opacity: 0.6 }
                                        },
                                        '& ::placeholder': { color: 'rgba(255,255,255,0.6)' }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: 'rgba(255,255,255,0.7)' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    disabled={isSubmitting}
                                    endIcon={!isSubmitting && !isAr ? <Send /> : null}
                                    startIcon={!isSubmitting && isAr ? <Send sx={{ transform: 'rotate(180deg)' }} /> : null}
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {isSubmitting ? (isAr ? 'جاري الاشتراك...' : 'Subscribing...') : (isAr ? 'اشترك' : 'Subscribe')}
                                </Button>
                            </Box>
                        </form>
                    </Grid>

                    {/* Copyright & Social */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: isAr ? 'left' : 'right' }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h4" sx={{
                                fontFamily: "'Great Vibes', cursive",
                                fontSize: '2.5rem',
                                opacity: 0.9,
                                transform: 'rotate(-5deg)',
                                display: 'inline-block'
                            }}>
                                Hussien
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton color="inherit" component="a" href="#"><Facebook /></IconButton>
                            <IconButton color="inherit" component="a" href="#"><Twitter /></IconButton>
                            <IconButton color="inherit" component="a" href="#"><Instagram /></IconButton>
                            <IconButton color="inherit" component="a" href="#"><LinkedIn /></IconButton>
                        </Box>

                        <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 2 }}>
                            © {new Date().getFullYear()} KOON.BAU. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={status.open}
                autoHideDuration={4000}
                onClose={() => setStatus({ ...status, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={status.type} sx={{ width: '100%' }}>
                    {status.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Footer;

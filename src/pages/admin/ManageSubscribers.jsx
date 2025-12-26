import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Alert } from '@mui/material';
import { Delete, ContentCopy, Add, Send, MarkEmailRead } from '@mui/icons-material';
import { subscribersService } from '../../services/subscribersService';
import ShinyHeader from '../../components/ui/ShinyHeader';

export default function ManageSubscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // To force re-render if needed

    // Dialog States
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openNewsletterDialog, setOpenNewsletterDialog] = useState(false);

    // Form States
    const [newEmail, setNewEmail] = useState('');
    const [newsletterData, setNewsletterData] = useState({ title: '', image: '', content: '' });

    // Feedback States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

    // Always RTL for Admin
    const isAr = true;

    useEffect(() => {
        loadSubscribers();
    }, [refreshTrigger]);

    const loadSubscribers = async () => {
        setLoading(true);
        // Add getAllSubscribers method to service if not exists or use getDocs logic here
        // Assuming service has been updated as per plan
        const data = await subscribersService.getAllSubscribers();
        setSubscribers(data || []);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        const confirmMsg = 'هل أنت متأكد من حذف هذا المشترك؟';
        if (window.confirm(confirmMsg)) {
            await subscribersService.deleteSubscriber(id);
            setRefreshTrigger(prev => prev + 1);
        }
    };

    const handleDeleteAll = async () => {
        const confirmMsg = 'تحذير: هذا سيحذف جميع المشتركين! هل أنت متأكد؟';
        if (window.confirm(confirmMsg)) {
            if (window.confirm('تأكيد نهائي: هل تريد حذف قاعدة البيانات بالكامل؟')) {
                await subscribersService.deleteAllSubscribers();
                setRefreshTrigger(prev => prev + 1);
            }
        }
    };

    const handleCopyEmails = () => {
        const emails = subscribers.map(s => s.email).join(', ');
        navigator.clipboard.writeText(emails);
        alert('تم نسخ جميع الإيميلات إلى الحافظة');
    };

    // Manual Add Subscriber
    const handleAddSubscriber = async () => {
        if (!newEmail) return;
        setIsSubmitting(true);
        const result = await subscribersService.subscribe(newEmail);
        setIsSubmitting(false);

        if (result.success) {
            setOpenAddDialog(false);
            setNewEmail('');
            setRefreshTrigger(prev => prev + 1);
            // Show success toast?
        } else {
            alert(result.message === 'already_subscribed' ? 'هذا الإيميل مشترك بالفعل' : 'البريد الإلكتروني غير صالح');
        }
    };

    // Debug logging state
    const [statusMsg, setStatusMsg] = useState('');

    // Send Newsletter
    const handleSendNewsletter = async () => {
        if (!newsletterData.title || !newsletterData.content) return;

        setStatusMsg('1. Checking keys...');
        // Debug Check Env Vars directly here
        const sKey = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const tKey = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const pKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!sKey || !tKey || !pKey) {
            alert(`STOP: Missing Keys! \nService: ${sKey}\nTemplate: ${tKey}\nPublic: ${pKey}\n\nDid you restart the server?`);
            setStatusMsg('Failed: Missing Keys');
            return;
        }

        if (subscribers.length === 0) {
            alert('لا يوجد مشتركين لإرسال النشرة إليهم!');
            return;
        }

        // Removed blocking confirm for debugging
        // if (!window.confirm(`هل أنت متأكد من إرسال هذه النشرة إلى ${subscribers.length} مشترك؟`)) return;

        setStatusMsg('2. Starting submission...');
        await new Promise(r => setTimeout(r, 500)); // Visible delay

        setIsSubmitting(true);
        setStatusMsg('3. Calling Service...');

        try {
            const result = await subscribersService.sendNewsletter(newsletterData);
            setStatusMsg('3. Service finished. Processing result...');
            setIsSubmitting(false);

            if (result.success) {
                setOpenNewsletterDialog(false);
                setNewsletterData({ title: '', image: '', content: '' });
                setStatusMsg('');

                let msg = `تمت العملية!\n- تم الإرسال بنجاح لـ: ${result.recipientCount}\n- فشل الإرسال لـ: ${result.failed}`;
                if (result.failed > 0) {
                    msg += `\n\nتأكد من إعدادات EmailJS أو صحة الإيميلات.`;
                }
                alert(msg);
            } else {
                console.error(result);
                setStatusMsg(`Error: ${JSON.stringify(result)}`);
                if (result.message === 'missing_keys') {
                    alert('خطأ: مفاتيح الربط مع EmailJS غير موجودة في ملف .env');
                } else {
                    alert(`حدث خطأ أثناء الإرسال: ${JSON.stringify(result.error)}`);
                }
            }
        } catch (e) {
            setIsSubmitting(false);
            setStatusMsg(`CRITICAL ERROR: ${e.message}`);
            alert(`CRITICAL ERROR: ${e.message}`);
        }
    };

    return (
        <Box dir='rtl'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <ShinyHeader text="المشتركين في النشرة" variant="h4" gutterBottom={false} />
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button variant="contained" color="secondary" startIcon={<MarkEmailRead />} onClick={() => setOpenNewsletterDialog(true)}>
                        إنشاء نشرة إخبارية
                    </Button>
                    <Button variant="outlined" startIcon={<Add />} onClick={() => setOpenAddDialog(true)}>
                        إضافة مشترك
                    </Button>
                    <Button variant="outlined" color="primary" startIcon={<ContentCopy />} onClick={handleCopyEmails}>
                        نسخ الإيميلات
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDeleteAll}>
                        حذف الجميع
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'right' }}>
                                البريد الإلكتروني
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'right' }}>
                                تاريخ الاشتراك
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                                إجراءات
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscribers.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    <Typography color="text.secondary">لا يوجد مشتركين حتى الآن.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {subscribers.map((sub, index) => (
                            <TableRow key={sub.id} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{sub.email}</TableCell>
                                <TableCell>
                                    {new Date(sub.subscribedAt).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    })}
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="حذف">
                                        <IconButton onClick={() => handleDelete(sub.id)} color="error" size="small">
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Subscriber Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle>إضافة مشترك جديد</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="البريد الإلكتروني"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>إلغاء</Button>
                    <Button onClick={handleAddSubscriber} variant="contained" disabled={isSubmitting}>
                        {isSubmitting ? 'جاري الإضافة...' : 'إضافة'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Newsletter Dialog */}
            <Dialog open={openNewsletterDialog} onClose={() => setOpenNewsletterDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>إنشاء نشرة إخبارية جديدة</DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 3 }}>
                        سيتم إرسال هذه النشرة إلى <strong>{subscribers.length}</strong> مشتركين.
                    </Alert>

                    {/* DEBUG STATUS MESSAGE */}
                    {statusMsg && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            Status: {statusMsg}
                        </Alert>
                    )}

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="عنوان النشرة (Subject)"
                                fullWidth
                                required
                                value={newsletterData.title}
                                onChange={(e) => setNewsletterData({ ...newsletterData, title: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="رابط الصورة (اختياري)"
                                fullWidth
                                value={newsletterData.image}
                                onChange={(e) => setNewsletterData({ ...newsletterData, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="محتوى النشرة"
                                fullWidth
                                required
                                multiline
                                rows={8}
                                value={newsletterData.content}
                                onChange={(e) => setNewsletterData({ ...newsletterData, content: e.target.value })}
                                placeholder="اكتب نص الخبر هنا..."
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Button onClick={() => setOpenNewsletterDialog(false)} size="large">إلغاء</Button>
                    <Button
                        onClick={handleSendNewsletter}
                        variant="contained"
                        color="secondary"
                        size="large"
                        endIcon={<Send sx={{ transform: 'scaleX(-1)' }} />}
                        disabled={isSubmitting || subscribers.length === 0}
                    >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال النشرة'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

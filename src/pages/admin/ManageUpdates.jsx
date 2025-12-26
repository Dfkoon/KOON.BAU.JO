import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Chip, MenuItem } from '@mui/material';
import { Delete, Add, Edit, CloudUpload } from '@mui/icons-material';
import ShinyHeader from '../../components/ui/ShinyHeader';
import { updatesService } from '../../services/updatesService';
import { updatesData as initialData } from '../../data/updatesData'; // Import static data for seeding

const categories = [
    { value: 'general', label: 'عام' },
    { value: 'academic', label: 'أكاديمي' },
    { value: 'important', label: 'هام' },
    { value: 'urgent', label: 'عاجل' },
    { value: 'registration', label: 'قبول وتسجيل' },
    { value: 'exams', label: 'امتحانات' },
    { value: 'competition', label: 'مسابقات' },
    { value: 'finance', label: 'مالية' },
];

const icons = [
    'lightbulb', 'info', 'medical', 'leaf', 'calendar', 'exchange', 'chip', 'shield', 'graduate', 'award', 'calendar_check', 'warning'
];

export default function ManageUpdates() {
    const [updates, setUpdates] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        titleAr: '', titleEn: '',
        contentAr: '', contentEn: '',
        date: '',
        badgeAr: '', badgeEn: '',
        badgeColor: '#1976d2',
        category: 'general',
        icon: 'info',
        image: ''
    });

    useEffect(() => {
        loadUpdates();
    }, []);

    const loadUpdates = async () => {
        setLoading(true);
        const data = await updatesService.getAllUpdates();
        // Sort by creation time (simulated by just reversing or standard sort if we had timestamp)
        // Since 'date' string isn't reliable for sort, we rely on createdAt if available, else loose sort
        data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setUpdates(data);
        setLoading(false);
    };

    const handleOpen = (update = null) => {
        if (update) {
            setCurrentId(update.id);
            setFormData({
                titleAr: update.title?.ar || '',
                titleEn: update.title?.en || '',
                contentAr: update.content?.ar || (typeof update.content === 'string' ? update.content : '') || '', // Handle legacy string content if any
                contentEn: update.content?.en || '',
                date: update.date || '',
                badgeAr: update.badge?.ar || '',
                badgeEn: update.badge?.en || '',
                badgeColor: update.badgeColor || '#1976d2',
                category: update.category || 'general',
                icon: update.icon || 'info',
                image: update.image || ''
            });
        } else {
            setCurrentId(null);
            setFormData({
                titleAr: '', titleEn: '',
                contentAr: '', contentEn: '',
                date: new Date().toLocaleDateString('en-GB'), // Default to today DD/MM/YYYY
                badgeAr: 'جديد', badgeEn: 'New',
                badgeColor: '#1976d2',
                category: 'general',
                icon: 'info',
                image: ''
            });
        }
        setOpen(true);
    };

    const handleSave = async () => {
        const payload = {
            title: { ar: formData.titleAr, en: formData.titleEn },
            content: { ar: formData.contentAr, en: formData.contentEn },
            date: formData.date,
            badge: { ar: formData.badgeAr, en: formData.badgeEn },
            badgeColor: formData.badgeColor,
            category: formData.category,
            icon: formData.icon,
            image: formData.image
        };

        if (currentId) {
            await updatesService.updateUpdate(currentId, payload);
        } else {
            await updatesService.addUpdate(payload);
        }
        setOpen(false);
        loadUpdates();
    };

    const handleDelete = async (id) => {
        if (window.confirm('حذف هذا الخبر؟')) {
            await updatesService.deleteUpdate(id);
            loadUpdates();
        }
    };

    const handleSeedData = async () => {
        if (!window.confirm('سيتم استيراد جميع البيانات الثابتة إلى قاعدة البيانات. هل تريد المتابعة؟')) return;

        setLoading(true);
        for (const item of initialData) {
            // Transform legacy structure if needed
            // The static data already has similar structure but `content` in some items is string, some object
            // Wait, looking at updatesData.js, most content is string (HTML). 
            // Also title is string in some, badge is string.
            // We need to normalize it to our new schema {ar, en}.

            // Heuristic for migration:
            // Since original content is mostly Arabic, we map it to 'ar'. 'en' will be same or empty.

            const payload = {
                title: typeof item.title === 'string' ? { ar: item.title, en: item.title } : item.title,
                content: typeof item.content === 'string' ? { ar: item.content, en: item.content } : item.content,
                date: item.date,
                badge: typeof item.badge === 'string' ? { ar: item.badge, en: 'Update' } : item.badge,
                badgeColor: item.badgeColor,
                category: item.category,
                icon: item.icon,
                image: item.image || ''
            };

            await updatesService.addUpdate(payload);
        }
        loadUpdates();
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <ShinyHeader text="إدارة الأخبار" variant="h4" gutterBottom={false} />
                <Box>
                    {/* Only show seed button if empty for safety, or just keep it for now */}
                    {updates.length === 0 && (
                        <Button startIcon={<CloudUpload />} onClick={handleSeedData} color="warning" sx={{ mr: 2 }}>
                            استيراد بيانات تجريبية
                        </Button>
                    )}
                    <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
                        إضافة خبر
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ p: 2 }}>
                <List>
                    {updates.map((item) => (
                        <React.Fragment key={item.id}>
                            <ListItem
                                secondaryAction={
                                    <Box>
                                        <IconButton onClick={() => handleOpen(item)} color="primary"><Edit /></IconButton>
                                        <IconButton onClick={() => handleDelete(item.id)} color="error"><Delete /></IconButton>
                                    </Box>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="h6">{item.title?.ar || item.title?.en}</Typography>
                                            <Chip label={item.category} size="small" variant="outlined" />
                                        </Box>
                                    }
                                    secondary={`${item.date} | Badge: ${item.badge?.ar}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                    {updates.length === 0 && !loading && (
                        <Typography sx={{ p: 2, textAlign: 'center' }}>لا توجد أخبار في قاعدة البيانات. قم بإضافة خبر جديد أو استيراد بيانات.</Typography>
                    )}
                </List>
            </Paper>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>{currentId ? 'تعديل الخبر' : 'خبر جديد'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth label="العنوان (عربي)" value={formData.titleAr} onChange={e => setFormData({ ...formData, titleAr: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth label="العنوان (إنجليزي - اختياري)" value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth label="التاريخ" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} helperText="مثال: 2025/9/22" />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField select fullWidth label="التصنيف" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                {categories.map(cat => <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth label="الشارة (عربي)" value={formData.badgeAr} onChange={e => setFormData({ ...formData, badgeAr: e.target.value })} />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth label="الشارة (إنجليزي - اختياري)" value={formData.badgeEn} onChange={e => setFormData({ ...formData, badgeEn: e.target.value })} />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth type="color" label="لون الشارة" value={formData.badgeColor} onChange={e => setFormData({ ...formData, badgeColor: e.target.value })} sx={{ input: { height: 40 } }} />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <TextField select fullWidth label="الأيقونة" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })}>
                                {icons.map(ic => <MenuItem key={ic} value={ic}>{ic}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth label="رابط الصورة (اختياري)" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="caption" color="text.secondary">يدعم تنسيق HTML</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="المحتوى (عربي)"
                                value={formData.contentAr}
                                onChange={e => setFormData({ ...formData, contentAr: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="المحتوى (إنجليزي - اختياري)"
                                value={formData.contentEn}
                                onChange={e => setFormData({ ...formData, contentEn: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>إلغاء</Button>
                    <Button onClick={handleSave} variant="contained">حفظ</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// Helper
import Divider from '@mui/material/Divider';

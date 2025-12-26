import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Chip, Grid, Tabs, Tab, Paper, Divider } from '@mui/material';
import { CheckCircle, Cancel, HourglassEmpty, Delete } from '@mui/icons-material';
import { testimonialsService } from '../../services/testimonialsService';
import ShinyHeader from '../../components/ui/ShinyHeader';

export default function ManageTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [tabValue, setTabValue] = useState(0); // 0: Pending, 1: Approved, 2: Rejected

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await testimonialsService.getAllTestimonials();
        setTestimonials(data);
    };

    useEffect(() => {
        let status = 'pending';
        if (tabValue === 1) status = 'approved';
        if (tabValue === 2) status = 'rejected';

        setFilteredData(testimonials.filter(t => t.status === status));
    }, [testimonials, tabValue]);

    const handleStatusUpdate = async (id, status) => {
        await testimonialsService.updateStatus(id, status);
        loadData();
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذه التوصية؟')) {
            await testimonialsService.deleteTestimonial(id);
            loadData();
        }
    };

    return (
        <Box>
            <ShinyHeader text="آراء الزائرين (Visitor Opinions)" variant="h4" gutterBottom />

            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} indicatorColor="primary" textColor="primary" variant="fullWidth">
                    <Tab label={`قيد الانتظار (${testimonials.filter(t => t.status === 'pending').length})`} icon={<HourglassEmpty fontSize="small" />} iconPosition="start" />
                    <Tab label={`تمت الموافقة (${testimonials.filter(t => t.status === 'approved').length})`} icon={<CheckCircle fontSize="small" />} iconPosition="start" />
                    <Tab label={`مرفوضة (${testimonials.filter(t => t.status === 'rejected').length})`} icon={<Cancel fontSize="small" />} iconPosition="start" />
                </Tabs>
            </Paper>

            <Grid container spacing={3}>
                {filteredData.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Paper sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography>لا توجد توصيات في هذه القائمة.</Typography>
                        </Paper>
                    </Grid>
                )}

                {filteredData.map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{item.author}</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.role} - {item.company}</Typography>
                                    </Box>
                                    <Chip
                                        label={item.status}
                                        color={item.status === 'approved' ? 'success' : item.status === 'rejected' ? 'error' : 'warning'}
                                        size="small"
                                    />
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1" sx={{ mt: 2, mb: 2, fontStyle: 'italic' }}>
                                    "{item.quote}"
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                    Date: {new Date(item.createdAt).toLocaleString()}
                                </Typography>

                                <Box sx={{ mt: 'auto', display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                    {item.status === 'pending' && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                startIcon={<CheckCircle />}
                                                onClick={() => handleStatusUpdate(item.id, 'approved')}
                                            >
                                                قبول
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<Cancel />}
                                                onClick={() => handleStatusUpdate(item.id, 'rejected')}
                                            >
                                                رفض
                                            </Button>
                                        </>
                                    )}
                                    {item.status === 'approved' && (
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            size="small"
                                            onClick={() => handleStatusUpdate(item.id, 'pending')}
                                        >
                                            نقل للمراجعة
                                        </Button>
                                    )}
                                    <Button
                                        color="error"
                                        size="small"
                                        startIcon={<Delete />}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        حذف
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

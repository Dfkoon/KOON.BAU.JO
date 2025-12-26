import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { Event, QuestionAnswer, DoneAll, Pending } from '@mui/icons-material';
import ShinyHeader from '../../components/ui/ShinyHeader';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalQuestions: 0,
        pendingQuestions: 0,
        answeredQuestions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Events Count
                const eventsSnap = await getDocs(collection(db, "events"));
                const totalEvents = eventsSnap.size;

                // Fetch Q&A Counts
                const qnaSnap = await getDocs(collection(db, "qna"));
                const totalQuestions = qnaSnap.size;
                const pendingQuestions = qnaSnap.docs.filter(doc => !doc.data().answer).length;
                const answeredQuestions = totalQuestions - pendingQuestions;

                setStats({
                    totalEvents,
                    totalQuestions,
                    pendingQuestions,
                    answeredQuestions
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, count, icon, color }) => (
        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 2, bgcolor: color, color: '#fff' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {icon}
            </Box>
            <CardContent sx={{ p: '0 !important', flexGrow: 1 }}>
                <Typography variant="h4" fontWeight="bold">
                    {loading ? <CircularProgress size={30} sx={{ color: '#fff' }} /> : count}
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <Box>
            <ShinyHeader text="لوحة القيادة" variant="h4" gutterBottom />

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="إجمالي الفعاليات"
                        count={stats.totalEvents}
                        icon={<Event fontSize="large" />}
                        color="#1976d2"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="إجمالي الأسئلة"
                        count={stats.totalQuestions}
                        icon={<QuestionAnswer fontSize="large" />}
                        color="#4caf50"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="أسئلة قيد الانتظار"
                        count={stats.pendingQuestions}
                        icon={<Pending fontSize="large" />}
                        color="#ff9800"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="أسئلة مجابة"
                        count={stats.answeredQuestions}
                        icon={<DoneAll fontSize="large" />}
                        color="#9c27b0"
                    />
                </Grid>
            </Grid>

            <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary', bgcolor: '#f9fafb' }}>
                <Typography variant="h6">
                    مرحباً بك في لوحة تحكم موقع كـُن
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    استخدم القائمة الجانبية لإدارة الفعاليات، الإجابة على أسئلة الطلاب، وتحديث المحتوى.
                </Typography>
            </Paper>
        </Box>
    );
}

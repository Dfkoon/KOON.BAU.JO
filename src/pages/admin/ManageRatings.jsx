import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Card, CardContent } from '@mui/material';
import { ratingsService } from '../../services/ratingsService';

export default function ManageRatings() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await ratingsService.getStats();
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getEmoji = (val) => {
        const map = {
            1: "😔",
            2: "😕",
            3: "😐",
            4: "🙂",
            5: "😍"
        };
        return map[val] || "?";
    };

    const getLabel = (val) => {
        const map = {
            1: "Terrible",
            2: "Poor",
            3: "Okay",
            4: "Good",
            5: "Amazing"
        };
        return map[val] || "Unknown";
    };

    if (loading) return <LinearProgress />;

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                إدارة التقييمات
            </Typography>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6">إجمالي التقييمات</Typography>
                            <Typography variant="h3" fontWeight="bold">{stats?.total || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>توزيع التقييمات</Typography>
                            {stats?.breakdown.map((item) => (
                                <Box key={item.rating} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography sx={{ width: 40, fontSize: '1.5rem', mr: 2 }}>{getEmoji(item.rating)}</Typography>
                                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={item.percentage}
                                            sx={{ height: 10, borderRadius: 5 }}
                                            color={item.rating >= 4 ? "success" : item.rating === 3 ? "warning" : "error"}
                                        />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60 }}>
                                        {item.percentage}% ({item.count})
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Ratings Table */}
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>أحدث التقييمات</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>التقييم</TableCell>
                            <TableCell>المستوى</TableCell>
                            <TableCell>التاريخ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stats?.recent.map((rating) => (
                            <TableRow key={rating.id}>
                                <TableCell sx={{ fontSize: '1.5rem' }}>{getEmoji(rating.value)}</TableCell>
                                <TableCell>{getLabel(rating.value)}</TableCell>
                                <TableCell>
                                    {rating.timestamp ? new Date(rating.timestamp.seconds * 1000).toLocaleString('ar-EG') : 'Checking...'}
                                </TableCell>
                            </TableRow>
                        ))}
                        {stats?.recent.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">لا توجد تقييمات بعد</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

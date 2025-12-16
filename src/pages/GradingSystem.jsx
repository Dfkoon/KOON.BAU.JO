import React from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Divider, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ShinyHeader from '../components/ui/ShinyHeader';

const GradingSystem = () => {
    const { language, t } = useLanguage();
    const isAr = language === 'ar';
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // New System Data (from Image)
    const newSystemData = [
        { symbol: "A", points: "4", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "A-", points: "3.75", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "B+", points: "3.5", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "B", points: "3.25", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "B-", points: "3", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "C+", points: "2.75", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "C", points: "2.5", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "C-", points: "2", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "D+", points: "1.75", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "D", points: "1.25", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "D-", points: "1", statusAr: "ناجح", statusEn: "Pass" },
        { symbol: "F", points: "0.5", statusAr: "راسب", statusEn: "Fail" },
    ];

    // Legacy "Average" System Data
    const averageSystemData = [
        { grade: "A", percentage: "95-100", points: "4.0" },
        { grade: "-A", percentage: "88-94", points: "3.75" },
        { grade: "+B", percentage: "79-87", points: "3.5" },
        { grade: "B", percentage: "71-78", points: "3.0" },
        { grade: "-B", percentage: "67-70", points: "2.75" },
        { grade: "+C", percentage: "61-66", points: "2.5" },
        { grade: "C", percentage: "57-60", points: "2.0" },
        { grade: "-C", percentage: "53-56", points: "1.75" },
        { grade: "+D", percentage: "49-52", points: "1.5" },
        { grade: "D", percentage: "45-48", points: "1.0" },
        { grade: "-D", percentage: "36-44", points: "0.75" },
        { grade: "F", percentage: "0-35", points: "0.35" },
    ];

    // Legacy "Scale" System Data
    const scaleSystemData = [
        { grade: "A", percentage: "90-100", points: "4.0" },
        { grade: "-A", percentage: "88-89.99", points: "3.75" },
        { grade: "+B", percentage: "85-87.99", points: "3.5" },
        { grade: "B", percentage: "80-84.99", points: "3.0" },
        { grade: "-B", percentage: "78-79.99", points: "2.75" },
        { grade: "+C", percentage: "74-77.99", points: "2.5" },
        { grade: "C", percentage: "70-73.99", points: "2.0" },
        { grade: "-C", percentage: "65-69.99", points: "1.75" },
        { grade: "+D", percentage: "63-64.99", points: "1.5" },
        { grade: "D", percentage: "60-62.99", points: "1.0" },
        { grade: "-D", percentage: "45-59.99", points: "0.75" },
        { grade: "F", percentage: "0-44.99", points: "0.35" },
    ];

    // Legacy "Letter" System Data
    const letterSystemData = [
        { gradeAr: "ممتاز", gradeEn: "Excellent", points: "4.0 – 3.65" },
        { gradeAr: "جيد جدا", gradeEn: "Very Good", points: "3.64 – 3.0" },
        { gradeAr: "جيد", gradeEn: "Good", points: "2.99 – 2.5" },
        { gradeAr: "مقبول", gradeEn: "Acceptable", points: "2.49 – 2.0" },
        { gradeAr: "ضعيف", gradeEn: "Weak", points: isAr ? "دون 2" : "Below 2" },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {isAr ? "نظام العلامات" : "Grading System"}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ mb: 6, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
                    {isAr ? "دليلك الشامل لأنظمة العلامات والتقديرات في جامعة البلقاء التطبيقية" : "Comprehensive guide to grading systems at Al-Balqa Applied University"}
                </Typography>

                <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 4 }}>
                    <Tab label={isAr ? "النظام الجديد (2025/2026)" : "New System (2025/2026)"} />
                    <Tab label={isAr ? "الأنظمة السابقة" : "Legacy Systems"} />
                </Tabs>

                {tabValue === 0 && (
                    <Box sx={{ mb: 6 }}>
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', mb: 4 }}>
                            <Box sx={{ bgcolor: 'error.main', color: 'error.contrastText', p: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {isAr ? "نظام العلامات الجديد (بداية من الفصل الأول 2026/2025)" : "New Grading System (Starting First Semester 2025/2026)"}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 99, 99, 0.1)' : '#fff5f5' }}>
                                <Typography variant="body2" align="center" color="text.secondary">
                                    {isAr ? "تم اعتماد هذا النظام لجميع الدرجات العلمية اعتباراً من العام الجامعي 2026/2025" : "This system is approved for all degrees starting from the academic year 2025/2026"}
                                </Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "الرمز" : "Symbol"}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "النقاط (القيمة)" : "Points (Value)"}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "النتيجة" : "Status"}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {newSystemData.map((row, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: row.symbol === 'F' ? 'error.main' : 'primary.main',
                                                        fontSize: '1.2rem'
                                                    }}
                                                >
                                                    {row.symbol}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: row.symbol === 'F' ? 'error.main' : 'inherit'
                                                    }}
                                                >
                                                    {row.points}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={isAr ? row.statusAr : row.statusEn}
                                                        color={row.symbol === 'F' ? "error" : "success"}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                )}

                {tabValue === 1 && (
                    <Box>
                        {/* Average System */}
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', mb: 6 }}>
                            <Box sx={{ bgcolor: '#065106', color: 'white', p: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {isAr ? "نظام العلامات (الأفريج)" : "Grading System (Average)"}
                                </Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "التقدير" : "Grade"}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "العلامة المئوية" : "Percentage"}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "النقاط" : "Points"}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {averageSystemData.map((row, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.grade}</TableCell>
                                                <TableCell align="center">{row.percentage}</TableCell>
                                                <TableCell align="center">{row.points}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        {/* Scale System */}
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', mb: 6 }}>
                            <Box sx={{ bgcolor: '#065106', color: 'white', p: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {isAr ? "نظام العلامات (السكيل)" : "Grading System (Scale)"}
                                </Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "التقدير" : "Grade"}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "العلامة المئوية" : "Percentage"}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "النقاط" : "Points"}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {scaleSystemData.map((row, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.grade}</TableCell>
                                                <TableCell align="center">{row.percentage}</TableCell>
                                                <TableCell align="center">{row.points}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        {/* Letter System */}
                        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', mb: 6 }}>
                            <Box sx={{ bgcolor: '#333', color: 'white', p: 2, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {isAr ? "نظام العلامات بالحروف" : "Letter Grade System"}
                                </Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "التقدير" : "Grade"}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? "النقاط" : "Points"}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {letterSystemData.map((row, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{isAr ? row.gradeAr : row.gradeEn}</TableCell>
                                                <TableCell align="center">{row.points}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                )}

            </motion.div>
        </Container>
    );
};

export default GradingSystem;

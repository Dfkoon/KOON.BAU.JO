import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Quiz } from '@mui/icons-material';

const QuizCard = ({ quiz, onStart }) => {
    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: '0.3s',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
            borderRadius: 2,
            border: '1px solid #e0e0e0'
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Quiz color="primary" sx={{ fontSize: 30, mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                        {quiz.title}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    عدد الأسئلة: {quiz.questions.length}
                </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => onStart(quiz)}
                    sx={{ backgroundColor: '#506400', '&:hover': { backgroundColor: '#3e4e00' } }}
                >
                    ابدأ الاختبار
                </Button>
            </Box>
        </Card>
    );
};

export default QuizCard;

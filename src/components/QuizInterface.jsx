import React, { useState } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper, CircularProgress, Alert } from '@mui/material';
import { CheckCircle, Cancel, Replay } from '@mui/icons-material';

const QuizInterface = ({ quiz, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = quiz.questions;
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange = (event) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: parseInt(event.target.value)
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.answer) {
                score++;
            }
        });
        return score;
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const score = calculateScore();
        const percentage = (score / questions.length) * 100;
        let message = "";
        let color = "success";

        if (percentage === 100) message = "ممتاز! علامة كاملة 🎉";
        else if (percentage >= 80) message = "رائع جداً! 👏";
        else if (percentage >= 50) message = "جيد، حاول تحسين نتيجتك 👍";
        else { message = "حاول مرة أخرى 💪"; color = "error"; }

        return (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                    نتيجة الاختبار
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                    <CircularProgress variant="determinate" value={percentage} size={100} thickness={4} color={color} />
                    <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h5" component="div" color="text.secondary">
                            {`${Math.round(percentage)}%`}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h5" gutterBottom>
                    نتيجتك: {score} من {questions.length}
                </Typography>
                <Alert severity={percentage >= 50 ? "success" : "warning"} sx={{ mb: 3, justifyContent: 'center' }}>
                    {message}
                </Alert>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" startIcon={<Replay />} onClick={resetQuiz}>
                        إعادة الاختبار
                    </Button>
                    <Button variant="outlined" color="primary" onClick={onBack}>
                        العودة للقائمة
                    </Button>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 700, mx: 'auto', mt: 4, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                    {quiz.title}
                </Typography>
                <Typography variant="body2" sx={{ bgcolor: '#e3f2fd', px: 2, py: 0.5, borderRadius: 2, color: '#1565c0' }}>
                    سؤال {currentQuestionIndex + 1} من {questions.length}
                </Typography>
            </Box>

            <Typography variant="h5" sx={{ mb: 4, fontWeight: 'medium' }}>
                {currentQuestion.question}
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%', mb: 'auto' }}>
                <RadioGroup
                    value={selectedAnswers[currentQuestionIndex] !== undefined ? selectedAnswers[currentQuestionIndex] : ''}
                    onChange={handleAnswerChange}
                >
                    {currentQuestion.options.map((option, index) => (
                        <Paper
                            key={index}
                            variant="outlined"
                            sx={{
                                mb: 2,
                                p: 1,
                                borderRadius: 2,
                                bgcolor: selectedAnswers[currentQuestionIndex] === index ? 'action.selected' : 'background.paper',
                                '&:hover': { bgcolor: 'action.hover' },
                                borderColor: selectedAnswers[currentQuestionIndex] === index ? 'primary.main' : 'divider',
                                borderWidth: selectedAnswers[currentQuestionIndex] === index ? 2 : 1,
                                transition: '0.2s'
                            }}
                        >
                            <FormControlLabel
                                value={index}
                                control={<Radio sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }} />}
                                label={<Typography variant="body1" color="text.primary" fontWeight={selectedAnswers[currentQuestionIndex] === index ? 'bold' : 'normal'}>{option}</Typography>}
                                sx={{ width: '100%', m: 0 }}
                            />
                        </Paper>
                    ))}
                </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button disabled={currentQuestionIndex === 0} onClick={handlePrevious} sx={{ color: '#555' }}>
                    السابق
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    sx={{ backgroundColor: '#506400', '&:hover': { backgroundColor: '#3e4e00' }, px: 4 }}
                >
                    {currentQuestionIndex === questions.length - 1 ? "إنهـاء" : "التالي"}
                </Button>
            </Box>
        </Paper>
    );
};

export default QuizInterface;

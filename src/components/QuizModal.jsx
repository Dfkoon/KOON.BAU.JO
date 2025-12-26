import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Box, IconButton, LinearProgress } from '@mui/material';
import { Close, CheckCircle, Cancel, Help } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const QuizModal = ({ open, onClose, quiz }) => {
    const { language } = useLanguage();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    if (!quiz) return null;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    const handleOptionChange = (event) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion.id]: event.target.value
        });
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowResult(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        quiz.questions.forEach(q => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    const restartQuiz = () => {
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        setShowResult(false);
    };

    const isRtl = language === 'ar';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 4, direction: isRtl ? 'rtl' : 'ltr' }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6" fontWeight="bold">
                    {typeof quiz.title === 'object' ? (language === 'ar' ? quiz.title.ar : quiz.title.en) : quiz.title}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>
                {!showResult ? (
                    <>
                        {/* Progress Bar */}
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LinearProgress
                                variant="determinate"
                                value={((currentQuestionIndex + 1) / totalQuestions) * 100}
                                sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {currentQuestionIndex + 1}/{totalQuestions}
                            </Typography>
                        </Box>

                        {/* Question */}
                        <Box sx={{ minHeight: 180 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                {language === 'ar' ? `السؤال ${currentQuestionIndex + 1}:` : `Question ${currentQuestionIndex + 1}:`}
                            </Typography>

                            {/* Render Question Text/Image */}
                            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.2rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {currentQuestion.text}
                            </Typography>

                            {/* Options */}
                            <FormControl component="fieldset" fullWidth>
                                <RadioGroup
                                    value={selectedAnswers[currentQuestion.id] || ''}
                                    onChange={handleOptionChange}
                                >
                                    {currentQuestion.options.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={option}
                                            control={<Radio />}
                                            label={<Typography sx={{ fontFamily: 'monospace' }}>{option}</Typography>}
                                            sx={{
                                                mb: 1,
                                                p: 1,
                                                border: '1px solid',
                                                borderColor: selectedAnswers[currentQuestion.id] === option ? 'primary.main' : 'divider',
                                                borderRadius: 2,
                                                bgcolor: selectedAnswers[currentQuestion.id] === option ? 'primary.50' : 'transparent'
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </>
                ) : (
                    // Results View
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h4" gutterBottom color="primary">
                            {language === 'ar' ? 'النتيجة النهائية' : 'Final Results'}
                        </Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex', my: 3 }}>
                            <Typography variant="h2" fontWeight="bold">
                                {calculateScore()} / {totalQuestions}
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 3, textAlign: 'left' }}>
                            {quiz.questions.map((q, idx) => {
                                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                                return (
                                    <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: isCorrect ? 'success.50' : 'error.50', borderRadius: 2 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {idx + 1}. {q.text.split('\n')[0]}...
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            {isCorrect ? <CheckCircle color="success" /> : <Cancel color="error" />}
                                            <Typography variant="body2">
                                                {isCorrect ? (language === 'ar' ? 'إجابة صحيحة' : 'Correct') : (language === 'ar' ? `خطأ. الإجابة الصحيحة: ${q.correctAnswer}` : `Wrong. Correct: ${q.correctAnswer}`)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                {!showResult ? (
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!selectedAnswers[currentQuestion.id]}
                        size="large"
                        fullWidth
                    >
                        {isLastQuestion ? (language === 'ar' ? 'إنهاء الاختبار' : 'Finish Quiz') : (language === 'ar' ? 'التالي' : 'Next')}
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={restartQuiz} fullWidth>
                        {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default QuizModal;

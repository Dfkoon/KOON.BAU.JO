import React, { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import { ExpandMore, HelpOutline, School, Calculate, Description } from '@mui/icons-material';
import ShinyHeader from './ui/ShinyHeader';

const faqs = [
    {
        id: 1,
        question: "كيف أحسب المعدل التراكمي (GPA)؟",
        answer: "يمكنك حساب المعدل التراكمي بضرب علامة كل مادة في عدد ساعاتها المعتمدة، ثم جمع النواتج وقسمتها على مجموع الساعات المعتمدة للفصل الدراسي. نوفر أداة خاصة لحساب المعدل قريباً!",
        icon: <Calculate color="primary" />
    },
    {
        id: 2,
        question: "أين أجد المواد الدراسية والملخصات؟",
        answer: "تتوفر جميع المواد والملخصات في قسم 'المواد الدراسية' (Materials) في القائمة العلوية. يتم تحديثها دورياً بواسطة متطوعين وطلاب متميزين.",
        icon: <Description color="secondary" />
    },
    {
        id: 3,
        question: "هل هناك خطة دراسية معتمدة للتخصص؟",
        answer: "نعم، يمكنك الاطلاع على الخطة الشجرية والخطة الاسترشادية في صفحة 'الخطط الدراسية'. ننصح باتباع الخطة لتجنب تعارض المواد في المستقبل.",
        icon: <School color="success" />
    },
    {
        id: 4,
        question: "كيف يمكنني التواصل مع القسم أو المدرسين؟",
        answer: "يفضل التواصل عبر البريد الإلكتروني الجامعي الرسمي أو خلال الساعات المكتبية المعلنة لكل مدرس. يمكنك إيجاد معلومات الاتصال في صفحة 'اتصل بنا'.",
        icon: <HelpOutline color="warning" />
    }
];

const FAQSection = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ py: 10, bgcolor: 'transparent' }} id="faq">
            <Container maxWidth="md">
                <ShinyHeader text="الأسئلة الشائعة" sx={{ mb: 6 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {faqs.map((faq) => (
                        <Accordion
                            key={faq.id}
                            expanded={expanded === `panel${faq.id}`}
                            onChange={handleChange(`panel${faq.id}`)}
                            disableGutters
                            elevation={0}
                            sx={{
                                borderRadius: '16px !important',
                                '&:before': { display: 'none' }, // Remove default divider
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: expanded === `panel${faq.id}` ? 'primary.main' : 'divider',
                                transition: 'all 0.3s ease',
                                boxShadow: expanded === `panel${faq.id}`
                                    ? `0 10px 30px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`
                                    : 'none',
                                overflow: 'hidden'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore sx={{ color: expanded === `panel${faq.id}` ? 'primary.main' : 'text.disabled' }} />}
                                sx={{
                                    py: 1,
                                    '& .MuiAccordionSummary-content': {
                                        alignItems: 'center',
                                        gap: 2
                                    }
                                }}
                            >
                                <Box sx={{
                                    p: 1,
                                    borderRadius: '50%',
                                    bgcolor: expanded === `panel${faq.id}` ? 'primary.light' : 'action.hover',
                                    color: expanded === `panel${faq.id}` ? 'primary.contrastText' : 'text.secondary',
                                    display: 'flex',
                                    transition: 'all 0.3s'
                                }}>
                                    {faq.icon}
                                </Box>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: expanded === `panel${faq.id}` ? 'primary.main' : 'text.primary' }}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 4, pb: 4, pt: 0 }}>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default FAQSection;

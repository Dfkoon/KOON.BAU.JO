// src/pages/About.jsx
import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShinyHeader from '../components/ui/ShinyHeader';

const About = () => {
    return (
        <Container maxWidth="md">
            <ShinyHeader text="عن جامعة البلقاء التطبيقية" variant="h3" sx={{ mt: 4 }} />
            <Typography variant="body1" paragraph>
                جامعة البلقاء التطبيقية (BAU) هي مؤسسة رائدة في التعليم العالي في الأردن، ملتزمة بتقديم تعليم تطبيقي متميز يخدم المجتمع ويساهم في التنمية المستدامة.
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography component="h3" variant="h5">رؤيتنا</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            الريادة والتميز في التعليم التطبيقي والبحث العلمي على المستويين الإقليمي والدولي.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                        <Typography component="h3" variant="h5">رسالتنا</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            إعداد خريجين مؤهلين علمياً وعملياً، وتقديم حلول مبتكرة وتقنيات متطورة من خلال شراكات مجتمعية فاعلة.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                        <Typography component="h3" variant="h5">تاريخنا</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            تأسست الجامعة في عام 1997، ومنذ ذلك الحين وهي تساهم في إثراء الحركة الأكاديمية والبحثية في المملكة.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
};

export default About;
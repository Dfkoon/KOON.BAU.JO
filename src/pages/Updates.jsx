import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import LatestUpdates from '../components/LatestUpdates';
import ShinyHeader from '../components/ui/ShinyHeader';

const Updates = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{ py: 4, minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4, mt: 4 }}>
                    <ShinyHeader text="الأخبار والمستجدات" variant="h3" />
                </Box>
                <LatestUpdates />
            </Container>
        </Box>
    );
};

export default Updates;

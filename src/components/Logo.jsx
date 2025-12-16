// src/components/Logo.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Logo = () => {
    const navigate = useNavigate();

    return (
        <>
            <style>{fadeInAnimation}</style>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    animation: 'fadeIn 1s ease-out',
                    '&:hover .k-letter': {
                        color: 'secondary.main',
                        transform: 'rotate(-10deg) scale(1.1)',
                    },
                    '&:hover .oon-letters': { color: 'primary.main' },
                    '&:hover .bau-letters': { color: 'text.secondary' }
                }}
                onClick={() => navigate('/')}
            >
                <Typography className="k-letter" variant="h4" component="span" sx={{ fontWeight: 'bold', color: 'primary.main', transition: 'all 0.3s ease-in-out', transformOrigin: 'left center' }}>
                    K
                </Typography>
                <Typography className="oon-letters" variant="h4" component="span" sx={{ fontWeight: 'bold', color: 'secondary.main', ml: -0.5, transition: 'all 0.3s ease-in-out' }}>
                    OON
                </Typography>
                <Typography className="bau-letters" variant="h6" component="span" sx={{ color: 'text.secondary', ml: 1, alignSelf: 'flex-end', paddingBottom: '4px', transition: 'all 0.3s ease-in-out' }}>
                    .BAU
                </Typography>
            </Box>
        </>
    );
};

export default Logo;
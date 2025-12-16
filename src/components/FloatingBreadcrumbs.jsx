import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Home, NavigateNext } from '@mui/icons-material';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const FloatingBreadcrumbs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const isAr = language === 'ar';

    // Don't show on Home page
    if (location.pathname === '/') return null;

    const pathnames = location.pathname.split('/').filter((x) => x);

    const getBreadcrumbName = (path) => {
        switch (path) {
            case 'materials': return t('materials');
            case 'exams': return t('exams');
            case 'plans': return t('plans');
            default: return path;
        }
    };

    return (
        <Box sx={{
            position: 'fixed',
            top: 85, // Below Navbar
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <Box sx={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '50px',
                px: 3,
                py: 1,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <Breadcrumbs
                    separator={<NavigateNext fontSize="small" sx={{ color: '#666', transform: isAr ? 'rotate(180deg)' : 'none' }} />}
                    aria-label="breadcrumb"
                >
                    <MuiLink
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        <Home fontSize="small" />
                    </MuiLink>

                    {pathnames.map((value, index) => {
                        const last = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const name = getBreadcrumbName(value);

                        return last ? (
                            <Typography color="text.primary" key={to} fontWeight="bold" variant="body2">
                                {name}
                            </Typography>
                        ) : (
                            <MuiLink
                                component={Link}
                                to={to}
                                key={to}
                                underline="hover"
                                color="inherit"
                                variant="body2"
                            >
                                {name}
                            </MuiLink>
                        );
                    })}
                </Breadcrumbs>
            </Box>
            <style>
                {`@keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } }`}
            </style>
        </Box>
    );
};

export default FloatingBreadcrumbs;

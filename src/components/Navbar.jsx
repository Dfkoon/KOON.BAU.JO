import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useColorMode } from '../context/ThemeContext';
import AnimatedLogo from './AnimatedLogo';
import ThemeSwitch from './ThemeSwitch';
import GlobalSearchInput from './GlobalSearchInput';

const Navbar = ({ onMenuClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const { toggleLanguage, language, t } = useLanguage();
    const { toggleColorMode, mode } = useColorMode();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const logoSize = isMobile ? '40px' : isTablet ? '50px' : '70px';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AppBar position="fixed" sx={{ bgcolor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.95)', boxShadow: scrolled ? 4 : 1, color: '#333', py: 1, transition: 'all 0.3s' }}>
            <Toolbar dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <Box sx={{ flexGrow: 1, cursor: 'pointer', display: 'flex', justifyContent: language === 'ar' ? 'flex-start' : 'flex-start' }} onClick={() => navigate('/')}>
                    <AnimatedLogo size={logoSize} />
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                    <Button onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>{t('home')}</Button>
                    <Button onClick={() => navigate('/plans')}>{t('plans')}</Button>
                    <Button onClick={() => navigate('/materials')}>{t('materials')}</Button>
                    <Button onClick={() => navigate('/exams')}>{t('exams')}</Button>
                    <Button onClick={() => navigate('/calendar')}>{language === 'ar' ? 'التقويم الجامعي' : 'Calendar'}</Button>
                    <Button onClick={() => navigate('/grading-system')}>{language === 'ar' ? 'نظام العلامات' : 'Grading System'}</Button>
                    <Button onClick={() => navigate('/updates')}>{language === 'ar' ? 'الأخبار' : 'News'}</Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, ml: language === 'ar' ? 0 : 2, mr: language === 'ar' ? 2 : 0 }}>
                    <GlobalSearchInput /> {/* Added Global Search */}
                    <IconButton onClick={toggleLanguage} color="inherit">
                        {language === 'ar' ? 'EN' : 'AR'}
                    </IconButton>
                    <ThemeSwitch checked={mode === 'dark'} onChange={toggleColorMode} />
                </Box>

                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ display: { xs: 'flex', md: 'none' }, ml: language === 'ar' ? 0 : 1, mr: language === 'ar' ? 1 : 0 }}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

import React from 'react';
import { Drawer, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ open, onClose }) => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    const menuItems = [
        { text: t('home'), path: '/' },
        { text: t('plans'), path: '/plans' },
        { text: t('materials'), path: '/materials' },
        { text: t('exams'), path: '/exams' },
        { text: t('calendar'), path: '/calendar' },
        { text: t('grades'), path: '/grading-system' },
        { text: t('studentToolsTitle'), path: '/tools' },
        { text: t('usefulSites'), path: '/useful-sites' },
        { text: t('askTitle'), path: '/ask' },
        { text: language === 'ar' ? 'الأخبار' : 'News', path: '/updates' },
    ];

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 280, p: 2, pt: { xs: 8, md: 10 } }} role="presentation">
                {/* Close button removed as the Hamburger button handles toggling */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem button key={item.text} onClick={() => { navigate(item.path); onClose(); }}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;

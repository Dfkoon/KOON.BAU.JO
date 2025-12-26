import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Avatar, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Event, Description, Home, Logout, QuestionAnswer, Dashboard as DashboardIcon, People, Menu as MenuIcon, Language, EventNote } from '@mui/icons-material';
import { useLanguage } from '../../context/LanguageContext';

const drawerWidth = 260;

export default function AdminLayout() {
    const { currentUser, logout } = useAuth();
    const { language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Sidebar state
    const [open, setOpen] = useState(!isMobile);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    // Force Arabic for Admin
    const isAr = true;

    const menuItems = [
        { text: 'لوحة القيادة', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { text: 'إدارة الفعاليات', icon: <Event />, path: '/admin/events' },
        { text: 'إدارة التقويم', icon: <EventNote />, path: '/admin/calendar' },
        { text: 'إدارة الأسئلة', icon: <QuestionAnswer />, path: '/admin/qna' },
        { text: 'آراء الزائرين', icon: <Description />, path: '/admin/testimonials' },
        { text: 'التقييمات', icon: <Description />, path: '/admin/ratings' },
        { text: 'المشتركين', icon: <People />, path: '/admin/subscribers' },
    ];

    return (
        <Box sx={{ display: 'flex', direction: 'rtl' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1a237e' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        لوحة تحكم كـُن
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, opacity: 0.8 }}>
                            {currentUser.email}
                        </Typography>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>A</Avatar>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                open={open}
                onClose={isMobile ? handleDrawerToggle : undefined}
                anchor="right"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#f5f5f5' },
                }}
            >
                <Toolbar /> {/* Spacer for AppBar */}
                <Box sx={{ overflow: 'auto', mt: 2 }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                component={Link}
                                to={item.path}
                                key={item.path}
                                selected={location.pathname === item.path}
                                onClick={isMobile ? handleDrawerToggle : undefined}
                                sx={{
                                    mb: 1,
                                    mx: 1,
                                    borderRadius: 1,
                                    textAlign: 'right',
                                    '&.Mui-selected': {
                                        bgcolor: '#e3f2fd',
                                        color: '#1565c0',
                                        '& .MuiListItemIcon-root': {
                                            color: '#1565c0',
                                        },
                                        '&:hover': {
                                            bgcolor: '#bbdefb',
                                        }
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? '#1565c0' : 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 600 : 400 }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <List>
                        <ListItem button onClick={handleLogout} sx={{ mx: 1, borderRadius: 1, color: 'error.main' }}>
                            <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary='تسجيل الخروج' />
                        </ListItem>
                        <ListItem button component={Link} to="/" sx={{ mx: 1, borderRadius: 1 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary='العودة للموقع' />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, transition: 'all 0.3s' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

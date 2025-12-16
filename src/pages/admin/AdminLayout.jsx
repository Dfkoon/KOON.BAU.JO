import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox, IconButton, Button } from '@mui/material';
import { Event, Description, Home, Logout } from '@mui/icons-material';

const drawerWidth = 240;

export default function AdminLayout() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // Protect route: Redirect to login if no user
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error('Failed to log out');
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        KOON.BAU Admin Panel
                    </Typography>
                    <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar /> {/* Spacer for AppBar */}
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button component={Link} to="/admin/dashboard">
                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/events">
                            <ListItemIcon><Event /></ListItemIcon>
                            <ListItemText primary="Manage Events" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar /> {/* Spacer for AppBar */}
                <Outlet />
            </Box>
        </Box>
    );
}

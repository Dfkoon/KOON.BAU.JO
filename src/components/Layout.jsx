import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import PixelCursorTrail from './PixelCursorTrail';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FloatingBreadcrumbs from './FloatingBreadcrumbs';
import BackgroundPattern from './BackgroundPattern';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import GlobalAnimatedBackground from './GlobalAnimatedBackground';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <AnimatedLogo size="100px" />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {t('heroSubtitle')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 2 }}>
              © {new Date().getFullYear()} KOON.BAU. All rights reserved.
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Great Vibes', cursive",
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '3.5rem',
                  transform: 'rotate(-5deg)',
                  textShadow: '0 0 10px rgba(0,0,0,0.3)',
                  userSelect: 'none'
                }}
              >
                Hussien
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
            <Box>
              <IconButton color="inherit"><Facebook /></IconButton>
              <IconButton color="inherit"><Twitter /></IconButton>
              <IconButton color="inherit"><Instagram /></IconButton>
              <IconButton color="inherit"><LinkedIn /></IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'transparent', color: 'text.primary', position: 'relative' }}>
      {/* Global Animated Background */}
      <GlobalAnimatedBackground />

      <PixelCursorTrail />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* <FloatingBreadcrumbs /> */}

      <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
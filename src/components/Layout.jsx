import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import PixelCursorTrail from './PixelCursorTrail';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GlobalAnimatedBackground from './GlobalAnimatedBackground';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'transparent', color: 'text.primary', position: 'relative' }}>
      {/* Global Animated Background */}
      <GlobalAnimatedBackground />

      <PixelCursorTrail />
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
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
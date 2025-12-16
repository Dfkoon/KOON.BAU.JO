// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Exams from './pages/Exams';
import Plans from './pages/Plans';
import InitialLoader from './components/InitialLoader';
import AcademicCalendar from './pages/AcademicCalendar';
import GradingSystem from './pages/GradingSystem';
import Updates from './pages/Updates';

// Admin Imports
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import ManageEvents from './pages/admin/ManageEvents';
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <AuthProvider>
            {loading && <InitialLoader onFinished={() => setLoading(false)} />}
            {!loading && (
                <>
                    <ScrollToTop />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/materials" element={<Layout><Materials /></Layout>} />
                        <Route path="/exams" element={<Layout><Exams /></Layout>} />
                        <Route path="/plans" element={<Layout><Plans /></Layout>} />
                        <Route path="/calendar" element={<Layout><AcademicCalendar /></Layout>} />
                        <Route path="/grading-system" element={<Layout><GradingSystem /></Layout>} />
                        <Route path="/updates" element={<Layout><Updates /></Layout>} />

                        {/* Admin Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="events" element={<ManageEvents />} />
                        </Route>
                    </Routes>
                </>
            )}
        </AuthProvider>
    );
}

export default App;
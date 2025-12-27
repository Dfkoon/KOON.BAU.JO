// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Exams from './pages/Exams';
import Plans from './pages/Plans';
import InitialLoader from './components/InitialLoader';
import AcademicCalendar from './pages/AcademicCalendar';
import GradingSystem from './pages/GradingSystem';
import Updates from './pages/Updates';
import UsefulSites from './pages/UsefulSites';
import Ask from './pages/Ask';
import QnA from './pages/QnA';
import StudentTools from './pages/StudentTools';
import Signup from './pages/Signup';
import StudentProfile from './pages/StudentProfile';


// Admin Imports
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import ManageEvents from './pages/admin/ManageEvents';
import ManageUpdates from './pages/admin/ManageUpdates';
import ManageSubscribers from './pages/admin/ManageSubscribers';
import Dashboard from './pages/admin/Dashboard';
import AdminQnA from './pages/admin/AdminQnA';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageAcademicCalendar from './pages/admin/ManageAcademicCalendar';
import ManageRatings from './pages/admin/ManageRatings';
import { AuthProvider } from './context/AuthContext';

function App() {
    const [loading, setLoading] = useState(true);

    // Initialize Google Analytics
    React.useEffect(() => {
        if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
            ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
        }
    }, []);

    const location = useLocation();

    React.useEffect(() => {
        if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [location]);

    React.useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: false,
            mirror: true,
            disable: 'mobile' // Disable animations on mobile devices
        });
    }, []);

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
                        <Route path="/useful-sites" element={<Layout><UsefulSites /></Layout>} />
                        <Route path="/ask" element={<Layout><Ask /></Layout>} />
                        <Route path="/qna" element={<Layout><QnA /></Layout>} />
                        <Route path="/tools" element={<Layout><StudentTools /></Layout>} />


                        <Route path="/qna" element={<Layout><QnA /></Layout>} />

                        {/* Student Routes */}
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Layout><StudentProfile /></Layout>} />

                        {/* Admin Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="login" element={<Navigate to="/login" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="events" element={<ManageEvents />} />
                            <Route path="updates" element={<ManageUpdates />} />
                            <Route path="qna" element={<AdminQnA />} />
                            <Route path="testimonials" element={<ManageTestimonials />} />
                            <Route path="ratings" element={<ManageRatings />} />
                            <Route path="calendar" element={<ManageAcademicCalendar />} />
                            <Route path="subscribers" element={<ManageSubscribers />} />
                        </Route>
                    </Routes>
                </>
            )}
        </AuthProvider>
    );
}

export default App;
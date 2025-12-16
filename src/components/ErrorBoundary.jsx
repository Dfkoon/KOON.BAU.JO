import React, { Component } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Refresh } from '@mui/icons-material';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        bgcolor: '#121212',
                        color: 'white',
                        textAlign: 'center',
                        p: 3
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="h2" sx={{ mb: 2 }}>😔</Typography>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            عذراً، حدث خطأ غير متوقع
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.7 }}>
                            نواجه مشكلة بسيطة في تحميل الموقع. يرجى محاولة تحديث الصفحة.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Refresh />}
                            onClick={this.handleReload}
                            size="large"
                            sx={{ borderRadius: 8, px: 4 }}
                        >
                            تحديث الصفحة
                        </Button>

                        {/* Hidden Dev Details for debugging if needed */}
                        <Box sx={{ mt: 4, display: 'none' }}>
                            <code>{this.state.error && this.state.error.toString()}</code>
                        </Box>
                    </Container>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

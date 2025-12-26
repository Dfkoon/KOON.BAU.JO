import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Alert, Paper, Link } from '@mui/material';
import ShinyHeader from '../components/ui/ShinyHeader';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, {
                displayName: name,
                completedMaterials: []
            });
            navigate('/profile'); // Redirect to profile/dashboard after signup
        } catch (err) {
            console.error(err);
            setError('Failed to create an account. ' + err.message);
        }

        setLoading(false);
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', borderRadius: 3 }}>
                <ShinyHeader text="Student Signup" variant="h5" gutterBottom={false} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                    Create your academic profile
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Full Name"
                        name="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

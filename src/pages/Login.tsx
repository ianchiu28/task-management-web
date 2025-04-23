import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material';
import { login } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { FormContainer } from '../components/forms/FormContainer';
import { EmailField } from '../components/forms/EmailField';
import { PasswordField } from '../components/forms/PasswordField';

function Login() {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await login(formData);
            if (response.data.accessToken) {
                authLogin(response.data.accessToken);
                navigate('/todos', { replace: true });
            } else {
                throw new Error('No token received');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <FormContainer>
            <Typography component="h1" variant="h5">Login</Typography>
            {error && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                <EmailField
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoFocus
                />
                <PasswordField
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
                <Button
                    component={Link}
                    to="/register"
                    fullWidth
                    variant="text"
                    sx={{ mt: 1 }}
                    disabled={isLoading}
                >
                    Don't have an account? Register
                </Button>
            </Box>
        </FormContainer>
    );
}

export default Login;

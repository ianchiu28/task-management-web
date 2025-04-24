import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Alert, Box } from '@mui/material';
import { invokeLoginApi } from '../services/api/users';
import { useAuth } from '../hooks/useAuth';
import { FormContainer } from '../components/forms/FormContainer';
import { EmailField } from '../components/forms/EmailField';
import { PasswordField } from '../components/forms/PasswordField';
import { SubmitButton } from '../components/forms/SubmitButton';
import { NavButton } from '../components/forms/NavButton';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
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
            const response = await invokeLoginApi(formData);
            if (response.data.accessToken) {
                login(response.data.accessToken);
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
                <SubmitButton
                    isLoading={isLoading}
                    text="Login"
                />
                <NavButton
                    to="/register"
                    text="Don't have an account? Register"
                />
            </Box>
        </FormContainer>
    );
}

export default Login;

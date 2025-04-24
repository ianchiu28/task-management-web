import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import { invokeRegisterApi } from '../services/api/users';
import { FormContainer } from '../components/forms/FormContainer';
import { EmailField } from '../components/forms/EmailField';
import { UsernameField } from '../components/forms/UsernameField';
import { PasswordField } from '../components/forms/PasswordField';
import { ConfirmPasswordField } from '../components/forms/ConfirmPasswordField';
import { SubmitButton } from '../components/forms/SubmitButton';
import { NavButton } from '../components/forms/NavButton';

interface FormErrors {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
}

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Please enter your email';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Please enter your username';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Please enter your password';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters and include letters and numbers';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);

        if (validateForm()) {
            setIsLoading(true);
            try {
                const { email, username, password } = formData;
                await invokeRegisterApi({ email, username, password });
                navigate('/login');
            } catch (error) {
                setApiError(error instanceof Error ? error.message : 'Registration failed');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when input changes
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <FormContainer>
            <Typography component="h1" variant="h5">Register</Typography>
            {apiError && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{apiError}</Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <EmailField
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={isLoading}
                    autoFocus
                />
                <UsernameField
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                    disabled={isLoading}
                />
                <PasswordField
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    disabled={isLoading}
                />
                <ConfirmPasswordField
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                />
                <SubmitButton
                    isLoading={isLoading}
                    text="Register"
                />
                <NavButton
                    to="/login"
                    text="Already have an account? Login"
                />
            </Box>
        </FormContainer>
    );
}

export default Register;
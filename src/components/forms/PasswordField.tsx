import { TextField, TextFieldProps } from '@mui/material';

interface PasswordFieldProps extends Omit<TextFieldProps, 'type' | 'autoComplete' | 'id' | 'label' | 'name' | 'error' | 'helperText'> {
    error?: string;
}

export const PasswordField = ({ error, ...props }: PasswordFieldProps) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            error={!!error}
            helperText={error}
            {...props}
        />
    );
}; 
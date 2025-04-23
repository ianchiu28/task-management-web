import { TextField, TextFieldProps } from '@mui/material';

interface ConfirmPasswordFieldProps extends Omit<TextFieldProps, 'type' | 'autoComplete' | 'id' | 'label' | 'name' | 'error' | 'helperText'> {
    error?: string;
}

export const ConfirmPasswordField = ({ error, ...props }: ConfirmPasswordFieldProps) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            error={!!error}
            helperText={error}
            {...props}
        />
    );
}; 
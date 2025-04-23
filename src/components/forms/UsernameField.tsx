import { TextField, TextFieldProps } from '@mui/material';

interface UsernameFieldProps extends Omit<TextFieldProps, 'autoComplete' | 'id' | 'label' | 'name' | 'error' | 'helperText'> {
    error?: string;
}

export const UsernameField = ({ error, ...props }: UsernameFieldProps) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            error={!!error}
            helperText={error}
            {...props}
        />
    );
}; 
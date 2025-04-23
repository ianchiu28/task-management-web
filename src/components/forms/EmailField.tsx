import { TextField, TextFieldProps } from '@mui/material';

interface EmailFieldProps extends Omit<TextFieldProps, 'type' | 'autoComplete' | 'id' | 'label' | 'name' | 'error' | 'helperText'> {
    error?: string;
}

export const EmailField = ({ error, ...props }: EmailFieldProps) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            error={!!error}
            helperText={error}
            {...props}
        />
    );
}; 
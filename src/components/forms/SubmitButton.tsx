import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
    isLoading?: boolean;
    text: string;
}

export const SubmitButton = ({ isLoading, text, ...props }: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <CircularProgress size={24} /> : text}
        </Button>
    );
}; 
import { Button, ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavButtonProps extends Omit<ButtonProps, 'component'> {
    to: string;
    text: string;
}

export const NavButton = ({ to, text, ...props }: NavButtonProps) => {
    return (
        <Button
            component={Link as React.ElementType}
            to={to}
            fullWidth
            variant="text"
            sx={{ mt: 1, textTransform: 'none' }}
            {...props}
        >
            {text}
        </Button>
    );
}; 
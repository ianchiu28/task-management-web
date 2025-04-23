import { ReactNode } from 'react';
import { Container, Box, Paper } from '@mui/material';

interface FormContainerProps {
    children: ReactNode;
}

export const FormContainer = ({ children }: FormContainerProps) => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    {children}
                </Paper>
            </Box>
        </Container>
    );
}; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  // TODO: Implement authentication
  const isAuthenticated = true;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#dcdddf',
          overflow: 'auto',
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/todos"
              element={
                isAuthenticated ? <TodoList /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;

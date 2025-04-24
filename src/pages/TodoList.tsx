import { useState } from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Todo {
    id: number;
    text: string;
}

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();

        if (newTodo.trim()) {
            setTodos([
                ...todos,
                { id: Date.now(), text: newTodo },
            ]);
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>Todo List</Typography>
                    <Box component="form" onSubmit={handleAddTodo} sx={{ mb: 4 }}>
                        <TextField
                            fullWidth
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Add a new task"
                            variant="outlined"
                            sx={{ mr: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Add
                        </Button>
                    </Box>

                    <List>
                        {todos.map((todo) => (
                            <ListItem 
                                key={todo.id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteTodo(todo.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={todo.text} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
}

export default TodoList;

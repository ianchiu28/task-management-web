import { useState, useEffect } from 'react';
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
import { getTasks, Task } from '../services/api/task';

function TodoList() {
    const [todos, setTodos] = useState<Task[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks();
                setTodos(response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();

        if (newTodo.trim()) {
            setTodos([
                ...todos,
                { 
                    uuid: Date.now().toString(),
                    title: newTodo,
                    description: '',
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
            ]);
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (uuid: string) => {
        setTodos(todos.filter((todo) => todo.uuid !== uuid));
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
                                key={todo.uuid}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteTodo(todo.uuid)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={todo.title} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
}

export default TodoList;

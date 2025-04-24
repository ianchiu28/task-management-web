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
import { getTasks, createTask, Task, deleteTask } from '../services/api/task';

function TodoList() {
    const [todos, setTodos] = useState<Task[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTodos(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newTodo.trim()) {
            try {
                await createTask({
                    title: newTodo,
                    description: 'test'
                });
                setNewTodo('');
                // Refresh the task list after creating a new task
                await fetchTasks();
            } catch (error) {
                console.error('Error creating task:', error);
            }
        }
    };

    const handleDeleteTodo = async (uuid: string) => {
        try {
            await deleteTask(uuid);
            // Refresh the task list after deleting a task
            await fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

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

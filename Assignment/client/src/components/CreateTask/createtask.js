import React, { useState,  } from 'react';
import { Button, Card, TextField } from "@material-ui/core";



function CreateTask({ addTask }) {
    const [todo, setTodo] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!todo || !status) return;
        addTask(todo,status);
        setTodo('');
        setStatus('');
    }
    return (
          <Card elevation={3} className="p-6 border-radius-8">
            <TextField
              className="mb-5"
              label="Add a new task"
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              value={todo}
              onChange={e => setTodo(e.target.value)}

            />
            <TextField
              className="mb-5"
              label="Priority"
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              value={status}
              onChange={e => setStatus(e.target.value)}

            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Add Todo</Button>
          </Card>
        
    );
}
export default CreateTask;
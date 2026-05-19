const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Database file path
const TODO_FILE = path.join(__dirname, '../todos.json');

// Initialize todos.json if it doesn't exist
if (!fs.existsSync(TODO_FILE)) {
  fs.writeFileSync(TODO_FILE, JSON.stringify([]), 'utf-8');
}

// Helper function to read todos
function getTodos() {
  const data = fs.readFileSync(TODO_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper function to write todos
function saveTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos), 'utf-8');
}

// GET /todos - Fetch all todos
app.get('/todos', (req, res) => {
  const todos = getTodos();
  res.json({ todos });
});

// POST /todos - Add a new todo
app.post('/todos', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const todos = getTodos();
  const newTodo = {
    id: Date.now().toString(),
    content
  };

  todos.push(newTodo);
  saveTodos(todos);

  res.status(201).json({ message: 'Todo created', todo: newTodo });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

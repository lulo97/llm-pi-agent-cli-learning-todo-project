const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// --- Database Setup ---
const dbPath = path.join(__dirname, 'todo.json');

// Load tasks from JSON file
const loadTodos = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing todo.json. Starting with empty list.", error.message);
    return [];
  }
};

// Save tasks to JSON file
const saveTodos = (todos) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error writing to todo.json", error.message);
  }
};

// Initialize database and load tasks
let todos = loadTodos();

// Middleware to parse JSON bodies
app.use(express.json());

// --- Health Check (from Task 1) ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'todo-api' });
});

// --- CRUD API Endpoints (Task 2) ---

// GET all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// GET single todo by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.status(200).json(todo);
});

// POST (Create) a new todo
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title,
    description: description || '',
    completed: false
  };

  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json(newTodo);
});

// PUT (Update) an existing todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { title, description, completed } = req.body;

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    description: description || todos[todoIndex].description,
    completed: typeof completed === 'boolean' ? completed : todos[todoIndex].completed
  };

  saveTodos(todos);
  res.status(200).json(todos[todoIndex]);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  
  todos = todos.filter(t => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  saveTodos(todos);
  res.status(204).send(); // No content on successful deletion
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
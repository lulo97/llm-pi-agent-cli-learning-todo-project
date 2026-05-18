const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('.'));

const DB_FILE = path.join(__dirname, 'todos.json');

// Read todos from file
function readTodos() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading todos:', error);
    return [];
  }
}

// Write todos to file
function writeTodos(todos) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error('Error writing todos:', error);
  }
}

// GET /todos - Read all todos with filter/search
app.get('/todos', (req, res) => {
  const todos = readTodos();
  const search = req.query.search;
  const filter = req.query.filter;
  
  let filtered = todos;
  
  // Filter by complete status
  if (filter && filter !== 'all') {
    filtered = todos.filter(t => t.complete.toString().toLowerCase() === filter);
  }
  
  // Filter by search text
  if (search) {
    filtered = filtered.filter(t => 
      t.content.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(filtered);
});

// GET /filter - Filter todos by filter value
app.get('/filter', (req, res) => {
  const filter = req.query.filter;
  if (!filter) {
    return res.json([]);
  }
  const todos = readTodos();
  let filtered = todos;
  // Case-insensitive filter
  filtered = filtered.filter(t => t.content.toLowerCase().includes(filter.toLowerCase()));
  res.json(filtered);
});

// GET /todos/:id - Read single todo
app.get('/todos/:id', (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// PUT /todos/:id/toggle-complete - Toggle complete status
app.put('/todos/:id/toggle-complete', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos[index].complete = !todos[index].complete;
  todos[index].updatedAt = new Date().toISOString();
  writeTodos(todos);
  res.json(todos);
});

// PUT /todos/:id - Update todo
app.put('/todos/:id', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST /todos - Add new todo
app.post('/todos', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Todo content required' });
  }
  const todos = readTodos();
  todos.push({ content, createdAt: new Date().toISOString() });
  writeTodos(todos);
  res.status(201).json(todos);
});

// PUT /todos/:id - Update todo
app.put('/todos/:id', (req, res) => {
  const { id, content } = req.body;
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos[index].content = content;
  todos[index].updatedAt = new Date().toISOString();
  writeTodos(todos);
  res.json(todos);
});

// DELETE /todos/:id - Delete todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  writeTodos(todos);
  res.json({ success: true });
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Catch port conflicts or initialization crashes
server.on('error', (error) => {
  console.error('SERVER CRASHED WITH ERROR:', error);
});
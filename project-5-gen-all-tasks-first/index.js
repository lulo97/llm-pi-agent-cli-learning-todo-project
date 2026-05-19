const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic health check API
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'todo-api' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
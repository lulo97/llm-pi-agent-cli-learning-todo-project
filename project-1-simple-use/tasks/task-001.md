# Task 1: Set Up Basic Project Structure

## INPUT
- Project directory exists with README.md
- Need basic Express server setup with JSON file database

## PROCESS
1. Initialize Node.js project with `npm init -y`
2. Install Express: `npm install express`
3. Create `server.js` with:
   - Express server on port 3000
   - JSON file storage (read/write CRUD operations)
4. Create `index.html` with basic UI:
   - Title: "Todo App"
   - Form to add new todos
   - List to display todos
   - Delete button for each todo

## OUTPUT
- Working Express server running on port 3000
- JSON file at `/tmp/todos.json` (or similar) storing todos
- `index.html` rendering todos from database
- Ability to add and delete todos via HTML form

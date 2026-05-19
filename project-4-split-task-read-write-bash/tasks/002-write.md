# INPUT
Node.js project with Express.js app running on port 3000. The app has CRUD endpoints for todos stored in a JSON file.

# PROCESS
1. Open app.js in the src/ directory
2. Add a GET /todos/:id endpoint to retrieve a specific todo by ID
3. The endpoint should:
   - Read the ID from the URL parameters
   - Find the matching todo in the todos.json file
   - Return the todo if found, or return a 404 error with an appropriate message if not found
4. Test the new endpoint with curl: `curl http://localhost:3000/todos/1779172399514`

# OUTPUT
- Modified app.js with GET /todos/:id endpoint
- The new endpoint successfully retrieves todos by ID
  - GET /todos/1779172399514 returns: {"todo": {"id": "1779172399514", "content": "Learn bash commands"}}
  - GET /todos/123456 returns: {"error": "Todo not found"}
- All original endpoints still working:
  - GET /todos returns all todos
  - POST /todos creates new todos

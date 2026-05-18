# Task 4: Add Todo Feature

## INPUT
- Project exists with Express server and JSON database
- Need to add ability to create new todos via UI

## PROCESS
1. Add to server.js:
   - POST endpoint /todos
   - Accept JSON body with `content` field
   - Generate unique ID for new todo
   - Write todos array back to file

2. Add to script.js:
   - Listen for form submission on `#addForm`
   - Read content from `#todoInput`
   - Validate content is not empty
   - Send POST request to `/todos`
   - Clear input field
   - Re-render todos list

3. Add to index.html:
   - Data-test-id="form-add" for the form
   - Data-test-id="todo-input" for the input field
   - Data-test-id="btn-add" for the add button

## OUTPUT

## STATUS: IN PROGRESS
- Server accepts POST /todos with JSON body
- Server creates new todo with auto-generated ID
- Server writes updated todos array to file
- Client UI shows add form with input and button
- Form submits POST request to server
- Todo appears in list after creation
- Input field clears after submission
- Server handles missing content field (returns 400 error)
- Server handles invalid JSON (returns 500 error)

### Files Modified
- `server.js` - Added POST /todos endpoint
- `script.js` - Added form submission handler
- `index.html` - Added data-test-id attributes for testing

### Verification
- POST /todos creates new todo with auto-generated ID
- GET /todos returns updated list with new todo
- GET /todos/:id returns the newly created todo
- Form validation rejects empty submissions
- Empty JSON body is rejected
- Invalid JSON payloads are rejected
- Form clears input after successful submission
- New todo appears immediately in the list without page refresh
- Todo list updates after form submission without page reload

### E2E Test Scenario
1. Navigate to http://localhost:3000
2. Enter a todo title in the input field
3. Click the "Add" button
4. Verify the todo appears in the list
5. Verify the input field is cleared
6. Check the count reflects the new total

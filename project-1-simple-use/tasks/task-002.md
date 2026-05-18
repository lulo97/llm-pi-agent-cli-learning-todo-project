# Task 2: Add Toggle Complete Feature

## INPUT
- Project exists with Express server and JSON database
- Need to add ability to mark todos as complete/incomplete

## PROCESS
1. Add to server.js:
   - New endpoint GET /todos/:id (returns single todo)
   - New endpoint PUT /todos/:id/toggle-complete (toggles complete status)

2. Add to script.js:
   - Fetch single todo on page load
   - Add checkbox for each todo item
   - Add toggle button (checked/unchecked style)
   - Update complete status on toggle

## OUTPUT

## STATUS: IN PROGRESS
- Server supports reading single todo and toggling complete status
- HTML shows checkbox next to each todo
- Toggle button changes color based on complete/incomplete state
- Clicking checkbox or toggle button updates database


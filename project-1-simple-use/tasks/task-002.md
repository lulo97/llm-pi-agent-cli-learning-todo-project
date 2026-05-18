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

## STATUS: COMPLETED

### Changes Made
- Added `GET /todos/:id` endpoint to read single todo with complete status
- Added `PUT /todos/:id/toggle-complete` endpoint to toggle complete status
- Added checkbox to each todo item
- Added toggle functionality that updates database on change

### Files Modified
- `server.js` - Added endpoints for single todo and toggle complete
- `script.js` - Added checkbox rendering and toggle event handling

### Verification
- GET /todos/:id returns single todo with complete status
- PUT /todos/:id/toggle-complete toggles complete status
- GET / serves index.html (fixed static file serving)
- HTML shows checkbox next to each todo item
- Checkbox changes state on change event
- Server supports reading single todo and toggling complete status
- HTML shows checkbox next to each todo
- Toggle button changes color based on complete/incomplete state
- Clicking checkbox or toggle button updates database


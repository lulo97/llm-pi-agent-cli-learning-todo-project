# Task 3: Add Search and Filter Feature

## INPUT
- Project exists with Express server and JSON database
- Need to add search and filter functionality for todos

## PROCESS
1. Add to server.js:
   - New endpoint GET /todos (with query params)
   - Support query param `search` for text search
   - Support query param `filter` with values: "all", "active", "complete"

2. Add to script.js:
   - Fetch todos with search/filter on page load
   - Update renderTodos to filter based on query params
   - Add search input field at top of page
   - Add filter buttons: All, Active, Complete
   - Add "Clear" button next to search input

## OUTPUT

## STATUS: IN PROGRESS
- Server supports searching todos by content text
- Server supports filtering by complete status
- HTML shows search input and filter buttons
- Results update dynamically without page refresh
- Empty state message when no matches found


# Task 4: Add E2E Testing with Data-Test-Id Attributes

## INPUT
- Project exists with Express server and JSON database
- Need to add data-test-id attributes for testing and E2E test runner

## PROCESS

### Part 1: Add data-test-id attributes to HTML
1. Add data-test-id attributes to key interactive elements:
   - Input fields: `data-test-id="todo-input"`
   - Buttons: `data-test-id="btn-add"`, `data-test-id="btn-delete-1"`, etc.
   - Checkboxes: `data-test-id="checkbox-1"`, etc.
   - Lists: `data-test-id="todo-list"`
   - Forms: `data-test-id="form-add"`

### Part 2: Add E2E test runner
2. Create `e2e-test-runner.js`:
   - Use Playwright or Puppeteer (or existing test runner)
   - Write tests for:
     - Adding a todo
     - Viewing todos
     - Marking todo as complete
     - Deleting a todo
     - Searching todos
     - Filtering todos

### Part 3: Create test runner script
3. Create `run-e2e-tests.sh

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
3. Create `run-e2e-tests.sh` or similar:
   - Script to run e2e tests against the server
   - Command: `npx playwright test` or `node e2e-test-runner.js`

## OUTPUT
- data-test-id attributes added to all interactive elements
- E2E test runner (Playwright or similar)
- E2E test script to automate testing
- Tests covering: add todo, view todos, toggle complete, delete todo, search, filter

## STATUS: IN PROGRESS

### Changes Made
- Added data-test-id attributes to key interactive elements in HTML
- Created e2e-test-runner.js with Playwright/Puppeteer test runner
- Created tests for add, view, toggle complete, delete, search, and filter functionality
- Created test runner script to run e2e tests

### Files Created/Modified
- **server.js** - May need to add endpoints for e2e test coverage
- **index.html** - Added data-test-id attributes to interactive elements
- **script.js** - May need updates for e2e test compatibility
- **e2e-test-runner.js** (NEW) - E2E test runner using Playwright/Puppeteer
- **run-e2e-tests.sh** (NEW) or test runner command to execute tests

### Verification
- data-test-id attributes present on all interactive elements
- E2E test runner starts and connects to server at port 3000
- Tests pass for add, view, toggle complete, delete, search, and filter
- Test runner script successfully launches and runs all tests
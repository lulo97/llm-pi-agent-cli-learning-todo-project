# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test\e2e\todo.add.spec.ts >> Todo Add Feature >> should add a todo and display it in the list
- Location: test\e2e\todo.add.spec.ts:12:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-test-id="todo-list"]')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-test-id="todo-list"]')
    14 × locator resolved to <ul id="todoList" data-test-id="todo-list"></ul>
       - unexpected value "hidden"

```

```yaml
- heading "Todo App" [level=1]
- textbox "Enter a new todo..."
- button "Add"
- textbox "Filter todos..."
- button "All"
- button "Active"
- button "Complete"
- list
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Wait for the page to fully load and script to execute
  4  | const PAGE_WAIT_TIMEOUT = 5000;
  5  | 
  6  | test.describe('Todo Add Feature', () => {
  7  |   test.beforeEach(async ({ page }) => {
  8  |     // Navigate to the app
  9  |     await page.goto('http://localhost:3000');
  10 |   });
  11 | 
  12 |   test('should add a todo and display it in the list', async ({ page }) => {
  13 |     // Given: Navigate to app
  14 |     await page.goto('http://localhost:3000');
  15 |     // Wait for page to load
  16 |     await page.waitForTimeout(PAGE_WAIT_TIMEOUT);
> 17 |     await expect(page.locator('[data-test-id="todo-list"]')).toBeVisible();
     |                                                              ^ Error: expect(locator).toBeVisible() failed
  18 | 
  19 |     // When: Enter todo content and click Add button
  20 |     await page.fill('[data-test-id="todo-input"]', 'Test todo item');
  21 |     await page.click('[data-test-id="btn-add"]');
  22 | 
  23 |     // Then: Verify todo appears in list
  24 |     await expect(page.locator('[data-test-id="todo-list"] li')).toHaveText('Test todo item');
  25 |     await expect(page.locator('[data-test-id="todo-list"] li')).toHaveCount(1);
  26 |   });
  27 | 
  28 |   test('should clear input field after adding todo', async ({ page }) => {
  29 |     // Given: Page is loaded
  30 |     await page.waitForTimeout(PAGE_WAIT_TIMEOUT);
  31 |     // When: Add a todo
  32 |     await page.fill('[data-test-id="todo-input"]', 'Another todo');
  33 |     await page.click('[data-test-id="btn-add"]');
  34 | 
  35 |     // Then: Verify input is cleared (inputValue() returns Promise in Playwright 1.40+)
  36 |     await expect(page.locator('[data-test-id="todo-input"]').textContent()).toBe('');
  37 |   });
  38 | 
  39 |   test('should handle empty submission gracefully', async ({ page }) => {
  40 |     // Given: Page is loaded
  41 |     await page.waitForTimeout(PAGE_WAIT_TIMEOUT);
  42 |     // When: Submit without entering content
  43 |     await page.click('[data-test-id="btn-add"]');
  44 | 
  45 |     // Then: Should not crash, list should still have 0 items
  46 |     await expect(page.locator('[data-test-id="todo-list"] li')).toHaveCount(0);
  47 |   });
  48 | });
  49 | 
```
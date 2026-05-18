# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\delete-todo.spec.js >> should delete a todo
- Location: tests\delete-todo.spec.js:3:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('should delete a todo', async ({ page }) => {
  4  |   // Navigate to the app
> 5  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  6  |   
  7  |   // Wait for page to load
  8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
  9  |   
  10 |   // Add a todo
  11 |   await page.fill('#todo-input', 'To delete');
  12 |   await page.click('#btn-add');
  13 |   
  14 |   // Wait for todo to appear
  15 |   await page.waitForSelector('#todo-list li', { timeout: 10000 });
  16 |   
  17 |   // Click delete button
  18 |   await page.click('[data-test-id="btn-delete-1"]');
  19 |   
  20 |   // Verify todo was deleted
  21 |   await expect(page.locator('#todo-list li')).toHaveCount(0);
  22 | });
  23 | 
```
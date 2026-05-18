# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\add-todo.spec.js >> should add a todo
- Location: tests\add-todo.spec.js:3:1

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
  3  | test('should add a todo', async ({ page }) => {
  4  |   // Navigate to the app
> 5  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  6  |   
  7  |   // Wait for page to load
  8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
  9  |   
  10 |   // Enter todo content
  11 |   await page.fill('#todo-input', 'Buy groceries');
  12 |   
  13 |   // Click add button
  14 |   await page.click('#btn-add');
  15 |   
  16 |   // Check todo was added
  17 |   await expect(page.locator('#todo-list li')).toHaveCount(1);
  18 |   
  19 |   // Verify todo content is displayed
  20 |   await expect(page.locator('#todo-list li').first().textContent()).toContain('Buy groceries');
  21 | });
  22 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\view-todos.spec.js >> should view all todos
- Location: tests\view-todos.spec.js:3:1

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
  3  | test('should view all todos', async ({ page }) => {
  4  |   // Navigate to the app
> 5  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  6  |   
  7  |   // Wait for page to load
  8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
  9  |   
  10 |   // Check todos list exists
  11 |   await expect(page.locator('#todo-list')).toBeVisible();
  12 | });
  13 | 
  14 | test('should view empty todos list', async ({ page }) => {
  15 |   // Navigate to the app
  16 |   await page.goto('/');
  17 |   
  18 |   // Wait for page to load
  19 |   await page.waitForSelector('#todo-list', { timeout: 10000 });
  20 |   
  21 |   // Check todos list is empty
  22 |   await expect(page.locator('#todo-list li')).toHaveCount(0);
  23 | });
  24 | 
```
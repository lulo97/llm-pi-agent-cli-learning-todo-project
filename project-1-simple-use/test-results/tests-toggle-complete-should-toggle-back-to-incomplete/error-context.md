# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\toggle-complete.spec.js >> should toggle back to incomplete
- Location: tests\toggle-complete.spec.js:25:1

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
  3  | test('should toggle todo complete status', async ({ page }) => {
  4  |   // Navigate to the app
  5  |   await page.goto('/');
  6  |   
  7  |   // Wait for page to load
  8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
  9  |   
  10 |   // Add a todo
  11 |   await page.fill('#todo-input', 'Test todo');
  12 |   await page.click('#btn-add');
  13 |   
  14 |   // Wait for todo to appear
  15 |   await page.waitForSelector('#todo-list li', { timeout: 10000 });
  16 |   
  17 |   // Click the checkbox to toggle complete
  18 |   await page.click('[data-test-id="checkbox-1"]');
  19 |   
  20 |   // Verify todo is marked complete
  21 |   await expect(page.locator('#todo-list li').first()).toHaveClass('completed');
  22 |   await expect(page.locator('#todo-list li').first().textContent()).toContain('Test todo');
  23 | });
  24 | 
  25 | test('should toggle back to incomplete', async ({ page }) => {
  26 |   // Navigate to the app
> 27 |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  28 |   
  29 |   // Wait for page to load
  30 |   await page.waitForSelector('#todo-list', { timeout: 10000 });
  31 |   
  32 |   // Add a todo
  33 |   await page.fill('#todo-input', 'Test todo 2');
  34 |   await page.click('#btn-add');
  35 |   
  36 |   // Click checkbox twice to toggle back
  37 |   await page.click('[data-test-id="checkbox-2"]');
  38 |   await page.click('[data-test-id="checkbox-2"]');
  39 |   
  40 |   // Verify todo is not marked complete
  41 |   await expect(page.locator('#todo-list li').last()).not.toHaveClass('completed');
  42 | });
  43 | 
```
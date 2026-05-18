# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\toggle-complete.spec.js >> should toggle todo complete status
- Location: tests\toggle-complete.spec.js:3:1

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#todo-list') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Todo App" [level=1] [ref=e3]
  - generic [ref=e4]:
    - textbox "Enter a new todo..." [ref=e5]
    - button "Add" [ref=e6] [cursor=pointer]
  - generic [ref=e7]:
    - textbox "Filter todos..." [ref=e8]
    - button "All" [ref=e9] [cursor=pointer]
    - button "Active" [ref=e10] [cursor=pointer]
    - button "Complete" [ref=e11] [cursor=pointer]
  - list
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
> 8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
     |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
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
  27 |   await page.goto('/');
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
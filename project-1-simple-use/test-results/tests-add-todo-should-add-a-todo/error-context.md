# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\add-todo.spec.js >> should add a todo
- Location: tests\add-todo.spec.js:3:1

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
  3  | test('should add a todo', async ({ page }) => {
  4  |   // Navigate to the app
  5  |   await page.goto('/');
  6  |   
  7  |   // Wait for page to load
> 8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
     |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
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
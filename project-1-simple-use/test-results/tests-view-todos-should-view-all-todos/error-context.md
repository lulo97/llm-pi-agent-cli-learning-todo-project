# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\view-todos.spec.js >> should view all todos
- Location: tests\view-todos.spec.js:3:1

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
  3  | test('should view all todos', async ({ page }) => {
  4  |   // Navigate to the app
  5  |   await page.goto('/');
  6  |   
  7  |   // Wait for page to load
> 8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
     |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
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
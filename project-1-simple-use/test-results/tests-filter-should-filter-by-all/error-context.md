# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\filter.spec.js >> should filter by all
- Location: tests\filter.spec.js:42:1

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
  3  | test('should filter todos by complete status', async ({ page }) => {
  4  |   // Navigate to the app
  5  |   await page.goto('/');
  6  |   
  7  |   // Wait for page to load
  8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
  9  |   
  10 |   // Add a few todos
  11 |   await page.fill('#todo-input', 'Complete todo');
  12 |   await page.click('#btn-add');
  13 |   
  14 |   await page.fill('#todo-input', 'Incomplete todo');
  15 |   await page.click('#btn-add');
  16 |   
  17 |   await page.fill('#todo-input', 'Another complete');
  18 |   await page.click('#btn-add');
  19 |   
  20 |   // Wait for todos to appear
  21 |   await page.waitForSelector('#todo-list li', { timeout: 10000 });
  22 |   
  23 |   // Mark some todos as complete
  24 |   await page.click('[data-test-id="checkbox-1"]');
  25 |   await page.click('[data-test-id="checkbox-3"]');
  26 |   
  27 |   // Filter by "Complete"
  28 |   await page.fill('#filter', 'Complete');
  29 |   
  30 |   // Verify only complete todos are shown
  31 |   await expect(page.locator('#todo-list li').filter({ hasText: /Complete/i })).toHaveCount(2);
  32 |   await expect(page.locator('#todo-list li').filter({ hasText: /Incomplete/i })).toHaveCount(0);
  33 |   
  34 |   // Filter by "Incomplete"
  35 |   await page.fill('#filter', 'Incomplete');
  36 |   
  37 |   // Verify only incomplete todos are shown
  38 |   await expect(page.locator('#todo-list li').filter({ hasText: /Incomplete/i })).toHaveCount(1);
  39 |   await expect(page.locator('#todo-list li').filter({ hasText: /Complete/i })).toHaveCount(0);
  40 | });
  41 | 
  42 | test('should filter by all', async ({ page }) => {
  43 |   // Navigate to the app
  44 |   await page.goto('/');
  45 |   
  46 |   // Wait for page to load
> 47 |   await page.waitForSelector('#todo-list', { timeout: 10000 });
     |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  48 |   
  49 |   // Add a few todos
  50 |   await page.fill('#todo-input', 'Todo 1');
  51 |   await page.click('#btn-add');
  52 |   
  53 |   await page.fill('#todo-input', 'Todo 2');
  54 |   await page.click('#btn-add');
  55 |   
  56 |   // Filter by "All"
  57 |   await page.fill('#filter', 'All');
  58 |   
  59 |   // Verify all todos are shown
  60 |   await expect(page.locator('#todo-list li')).toHaveCount(2);
  61 | });
  62 | 
```
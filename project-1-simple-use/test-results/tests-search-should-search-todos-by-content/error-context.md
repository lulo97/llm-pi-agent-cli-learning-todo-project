# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\search.spec.js >> should search todos by content
- Location: tests\search.spec.js:3:1

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
  3  | test('should search todos by content', async ({ page }) => {
  4  |   // Navigate to the app
  5  |   await page.goto('/');
  6  |   
  7  |   // Wait for page to load
> 8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
     |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  9  |   
  10 |   // Add a few todos
  11 |   await page.fill('#todo-input', 'Apple');
  12 |   await page.click('#btn-add');
  13 |   
  14 |   await page.fill('#todo-input', 'Orange');
  15 |   await page.click('#btn-add');
  16 |   
  17 |   await page.fill('#todo-input', 'Banana');
  18 |   await page.click('#btn-add');
  19 |   
  20 |   // Wait for todos to appear
  21 |   await page.waitForSelector('#todo-list li', { timeout: 10000 });
  22 |   
  23 |   // Search for "Apple"
  24 |   await page.fill('#filter', 'Apple');
  25 |   
  26 |   // Verify only Apple is shown
  27 |   await expect(page.locator('#todo-list li').filter({ hasText: /Apple/i })).toHaveCount(1);
  28 |   await expect(page.locator('#todo-list li').filter({ hasText: /Orange/i })).toHaveCount(0);
  29 |   await expect(page.locator('#todo-list li').filter({ hasText: /Banana/i })).toHaveCount(0);
  30 | });
  31 | 
```
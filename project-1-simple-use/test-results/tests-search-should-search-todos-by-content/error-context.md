# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\search.spec.js >> should search todos by content
- Location: tests\search.spec.js:3:1

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
  3  | test('should search todos by content', async ({ page }) => {
  4  |   // Navigate to the app
> 5  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  6  |   
  7  |   // Wait for page to load
  8  |   await page.waitForSelector('#todo-list', { timeout: 10000 });
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
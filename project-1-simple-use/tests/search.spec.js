const { test, expect } = require('@playwright/test');

test('should search todos by content', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Add a few todos
  await page.fill('#todo-input', 'Apple');
  await page.click('#btn-add');
  
  await page.fill('#todo-input', 'Orange');
  await page.click('#btn-add');
  
  await page.fill('#todo-input', 'Banana');
  await page.click('#btn-add');
  
  // Wait for todos to appear
  await page.waitForSelector('#todo-list li', { timeout: 10000 });
  
  // Search for "Apple"
  await page.fill('#filter', 'Apple');
  
  // Verify only Apple is shown
  await expect(page.locator('#todo-list li').filter({ hasText: /Apple/i })).toHaveCount(1);
  await expect(page.locator('#todo-list li').filter({ hasText: /Orange/i })).toHaveCount(0);
  await expect(page.locator('#todo-list li').filter({ hasText: /Banana/i })).toHaveCount(0);
});

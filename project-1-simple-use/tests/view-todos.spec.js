const { test, expect } = require('@playwright/test');

test('should view all todos', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Check todos list exists
  await expect(page.locator('#todo-list')).toBeVisible();
});

test('should view empty todos list', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Check todos list is empty
  await expect(page.locator('#todo-list li')).toHaveCount(0);
});

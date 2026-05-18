const { test, expect } = require('@playwright/test');

test('should add a todo', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Enter todo content
  await page.fill('#todo-input', 'Buy groceries');
  
  // Click add button
  await page.click('#btn-add');
  
  // Check todo was added
  await expect(page.locator('#todo-list li')).toHaveCount(1);
  
  // Verify todo content is displayed
  await expect(page.locator('#todo-list li').first().textContent()).toContain('Buy groceries');
});

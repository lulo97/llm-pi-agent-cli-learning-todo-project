const { test, expect } = require('@playwright/test');

test('should delete a todo', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Add a todo
  await page.fill('#todo-input', 'To delete');
  await page.click('#btn-add');
  
  // Wait for todo to appear
  await page.waitForSelector('#todo-list li', { timeout: 10000 });
  
  // Click delete button
  await page.click('[data-test-id="btn-delete-1"]');
  
  // Verify todo was deleted
  await expect(page.locator('#todo-list li')).toHaveCount(0);
});

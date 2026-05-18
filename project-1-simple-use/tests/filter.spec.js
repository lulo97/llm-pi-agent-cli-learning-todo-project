const { test, expect } = require('@playwright/test');

test('should filter todos by complete status', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Add a few todos
  await page.fill('#todo-input', 'Complete todo');
  await page.click('#btn-add');
  
  await page.fill('#todo-input', 'Incomplete todo');
  await page.click('#btn-add');
  
  await page.fill('#todo-input', 'Another complete');
  await page.click('#btn-add');
  
  // Wait for todos to appear
  await page.waitForSelector('#todo-list li', { timeout: 10000 });
  
  // Mark some todos as complete
  await page.click('[data-test-id="checkbox-1"]');
  await page.click('[data-test-id="checkbox-3"]');
  
  // Filter by "Complete"
  await page.fill('#filter', 'Complete');
  
  // Verify only complete todos are shown
  await expect(page.locator('#todo-list li').filter({ hasText: /Complete/i })).toHaveCount(2);
  await expect(page.locator('#todo-list li').filter({ hasText: /Incomplete/i })).toHaveCount(0);
  
  // Filter by "Incomplete"
  await page.fill('#filter', 'Incomplete');
  
  // Verify only incomplete todos are shown
  await expect(page.locator('#todo-list li').filter({ hasText: /Incomplete/i })).toHaveCount(1);
  await expect(page.locator('#todo-list li').filter({ hasText: /Complete/i })).toHaveCount(0);
});

test('should filter by all', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Add a few todos
  await page.fill('#todo-input', 'Todo 1');
  await page.click('#btn-add');
  
  await page.fill('#todo-input', 'Todo 2');
  await page.click('#btn-add');
  
  // Filter by "All"
  await page.fill('#filter', 'All');
  
  // Verify all todos are shown
  await expect(page.locator('#todo-list li')).toHaveCount(2);
});

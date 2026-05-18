const { test, expect } = require('@playwright/test');

test('should toggle todo complete status', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Add a todo
  await page.fill('#todo-input', 'Test todo');
  await page.click('#btn-add');
  
  // Wait for todo to appear
  await page.waitForSelector('#todo-list li', { timeout: 10000 });
  
  // Click the checkbox to toggle complete
  await page.click('[data-test-id="checkbox-1"]');
  
  // Verify todo is marked complete
  await expect(page.locator('#todo-list li').first()).toHaveClass('completed');
  await expect(page.locator('#todo-list li').first().textContent()).toContain('Test todo');
});

test('should toggle back to incomplete', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#todo-list', { timeout: 10000 });
  
  // Add a todo
  await page.fill('#todo-input', 'Test todo 2');
  await page.click('#btn-add');
  
  // Click checkbox twice to toggle back
  await page.click('[data-test-id="checkbox-2"]');
  await page.click('[data-test-id="checkbox-2"]');
  
  // Verify todo is not marked complete
  await expect(page.locator('#todo-list li').last()).not.toHaveClass('completed');
});

import { test, expect } from '@playwright/test';

// Wait for the page to fully load and script to execute
const PAGE_WAIT_TIMEOUT = 5000;

test.describe('Todo Add Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');
  });

  test('should add a todo and display it in the list', async ({ page }) => {
    // Given: Navigate to app
    await page.goto('http://localhost:3000');
    // Wait for page to load
    await page.waitForTimeout(PAGE_WAIT_TIMEOUT);
    await expect(page.locator('[data-test-id="todo-list"]')).toBeVisible();

    // When: Enter todo content and click Add button
    await page.fill('[data-test-id="todo-input"]', 'Test todo item');
    await page.click('[data-test-id="btn-add"]');

    // Then: Verify todo appears in list
    await expect(page.locator('[data-test-id="todo-list"] li')).toHaveText('Test todo item');
    await expect(page.locator('[data-test-id="todo-list"] li')).toHaveCount(1);
  });

  test('should clear input field after adding todo', async ({ page }) => {
    // Given: Page is loaded
    await page.waitForTimeout(PAGE_WAIT_TIMEOUT);
    // When: Add a todo
    await page.fill('[data-test-id="todo-input"]', 'Another todo');
    await page.click('[data-test-id="btn-add"]');

    // Then: Verify input is cleared (inputValue() returns Promise in Playwright 1.40+)
    await expect(page.locator('[data-test-id="todo-input"]').textContent()).toBe('');
  });

  test('should handle empty submission gracefully', async ({ page }) => {
    // Given: Page is loaded
    await page.waitForTimeout(PAGE_WAIT_TIMEOUT);
    // When: Submit without entering content
    await page.click('[data-test-id="btn-add"]');

    // Then: Should not crash, list should still have 0 items
    await expect(page.locator('[data-test-id="todo-list"] li')).toHaveCount(0);
  });
});

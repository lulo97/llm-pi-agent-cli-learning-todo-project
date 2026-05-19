import { test, expect } from '@playwright/test';

test.describe('Update Todo', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Add a todo for testing
    await page.getByTestId('todo-title').fill('Task to Update');
    await page.getByTestId('todo-description').fill('Initial description');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    // Wait for the todo to appear in the list
    await page.waitForTimeout(500);
  });

  test('should update a todo title', async ({ page }) => {
    // Find the todo item
    await page.getByText('Task to Update').click();
    await page.waitForTimeout(500);

    // Enter new title
    await page.keyboard.press('Enter');
    await page.getByPlaceholder('Enter new title:').fill('Updated Title');
    await page.keyboard.press('Enter');

    // Verify the update
    await expect(page.getByText('Updated Title')).toBeVisible();
  });

  test('should update a todo description', async ({ page }) => {
    // Find the todo item
    await page.getByText('Task to Update').click();
    await page.waitForTimeout(500);

    // Enter new description
    await page.keyboard.press('Enter');
    await page.getByPlaceholder('Enter new description:').fill('Updated description');
    await page.keyboard.press('Enter');

    // Verify the update
    await expect(page.getByText('Task to Update (Updated description)')).toBeVisible();
  });

  test('should not update if no new title is provided', async ({ page }) => {
    // Find the todo item
    await page.getByText('Task to Update').click();
    await page.waitForTimeout(500);

    // Enter empty title (should not update)
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');

    // Verify the title is still the same
    await expect(page.getByText('Task to Update')).toBeVisible();
  });
});

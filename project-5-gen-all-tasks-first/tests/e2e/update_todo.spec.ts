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

    // Click update button and enter new title
    await page.getByTestId('update-todo').click();
    await page.getByPlaceholder('Enter new title:').fill('Updated Title');
    await page.getByTestId('update-todo').click();

    // Verify the update
    await expect(page.getByText('Updated Title')).toBeVisible();
  });

  test('should update a todo description', async ({ page }) => {
    // Find the todo item
    await page.getByText('Task to Update').click();
    await page.waitForTimeout(500);

    // Click update button and enter new description
    await page.getByTestId('update-todo').click();
    await page.getByPlaceholder('Enter new description:').fill('Updated description');
    await page.getByTestId('update-todo').click();

    // Verify the update
    await expect(page.getByText('Task to Update (Updated description)')).toBeVisible();
  });

  test('should not update if no new title is provided', async ({ page }) => {
    // Find the todo item
    await page.getByText('Task to Update').click();
    await page.waitForTimeout(500);

    // Click update button and submit without entering title (should not update)
    await page.getByTestId('update-todo').click();
    await page.getByTestId('update-todo').click();

    // Verify the title is still the same
    await expect(page.getByText('Task to Update')).toBeVisible();
  });
});

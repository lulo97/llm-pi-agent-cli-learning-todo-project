import { test, expect } from '@playwright/test';

test.describe('Delete Todo', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Add a todo for testing
    await page.getByTestId('todo-title').fill('Task to Delete');
    await page.getByTestId('todo-description').fill('This will be deleted');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    // Wait for the todo to appear in the list
    await page.waitForTimeout(500);
  });

  test('should delete a todo', async ({ page }) => {
    // Find the todo item
    await page.getByText('Task to Delete').click();
    await page.waitForTimeout(500);

    // Click delete button
    await page.getByTestId('delete-todo').click();

    // Confirm deletion (default to yes)
    await page.getByRole('button', { name: /Are you sure/i }).check();
    await page.getByRole('button', { name: /Yes/i }).click();

    // Verify the todo is deleted
    await expect(page.getByText('Task to Delete')).not.toBeVisible();
  });

  test('should handle multiple deletions', async ({ page }) => {
    // Add multiple todos
    await page.getByTestId('todo-title').fill('Todo 1');
    await page.getByTestId('todo-description').fill('First todo');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    await page.getByTestId('todo-title').fill('Todo 2');
    await page.getByTestId('todo-description').fill('Second todo');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    await page.getByTestId('todo-title').fill('Todo 3');
    await page.getByTestId('todo-description').fill('Third todo');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    // Delete all todos
    for (const todo of ['Todo 1', 'Todo 2', 'Todo 3']) {
      await page.getByText(todo).click();
      await page.waitForTimeout(300);
      await page.getByTestId('delete-todo').click();
      await page.getByRole('button', { name: /Are you sure/i }).check();
      await page.getByRole('button', { name: /Yes/i }).click();
    }

    // Verify no todos remain
    await expect(page.getByText(/Todo \d+/g)).not.toBeVisible();
  });
});

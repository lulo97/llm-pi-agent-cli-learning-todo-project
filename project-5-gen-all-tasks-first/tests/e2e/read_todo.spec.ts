import { test, expect } from '@playwright/test';

test.describe('Read Todo', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Add todos for testing
    await page.getByTestId('todo-title').fill('Read Todo Test 1');
    await page.getByTestId('todo-description').fill('First test todo');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    await page.getByTestId('todo-title').fill('Read Todo Test 2');
    await page.getByTestId('todo-description').fill('Second test todo with more details');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    await page.getByTestId('todo-title').fill('Read Todo Test 3');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);
  });

  test('should display all todos', async ({ page }) => {
    // Verify all todos are displayed
    await expect(page.getByText('Read Todo Test 1')).toBeVisible();
    await expect(page.getByText('Read Todo Test 2')).toBeVisible();
    await expect(page.getByText('Read Todo Test 3')).toBeVisible();
  });

  test('should display todo description', async ({ page }) => {
    // Check that descriptions are displayed
    await expect(page.getByText('Read Todo Test 1 (First test todo)')).toBeVisible();
    await expect(page.getByText('Read Todo Test 2 (Second test todo with more details)')).toBeVisible();
  });

  test('should display completed todos with strikethrough', async ({ page }) => {
    // Mark a todo as completed
    await page.getByText('Read Todo Test 1').click();
    await page.getByTestId('todo-checkbox-1').check();
    await page.waitForTimeout(300);

    // Verify strikethrough styling
    await expect(page.getByText('Read Todo Test 1')).toHaveCSS('text-decoration', 'line-through');
    await expect(page.getByText('Read Todo Test 1')).toHaveCSS('color', '#888');
  });

  test('should handle empty todo list', async ({ page }) => {
    // Clear todos
    await page.getByTestId('todo-title').fill('Empty Test');
    await page.getByTestId('add-todo').click();
    await page.waitForTimeout(500);

    // Delete the todo
    await page.getByText('Empty Test').click();
    await page.getByTestId('delete-todo').click();
    await page.getByRole('button', { name: /Are you sure/i }).check();
    await page.getByRole('button', { name: /Yes/i }).click();
    await page.waitForTimeout(500);

    // Verify empty state message
    await expect(page.getByText('No tasks yet! Add one above.')).toBeVisible();
  });
});

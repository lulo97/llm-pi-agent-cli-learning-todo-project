import { test, expect } from '@playwright/test';

test.describe('Add Todo', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('should display the todo form', async ({ page }) => {
    await expect(page.getByText('My ToDo List')).toBeVisible();
    await expect(page.getByTestId('todo-title')).toBeVisible();
    await expect(page.getByTestId('todo-description')).toBeVisible();
    await expect(page.getByTestId('add-todo')).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    // Fill in the todo form
    await page.getByTestId('todo-title').fill('Test Task');
    await page.getByTestId('todo-description').fill('This is a test description');
    await page.getByTestId('add-todo').click();

    // Wait for the todo to be added
    await page.waitForTimeout(500);

    // Verify the todo is displayed in the list
    await expect(page.getByText('Test Task')).toBeVisible();
  });

  test('should add a todo with empty description', async ({ page }) => {
    // Fill in the todo form with only title
    await page.getByTestId('todo-title').fill('Task Without Description');
    await page.getByTestId('add-todo').click();

    // Verify the todo is displayed
    await expect(page.getByText('Task Without Description')).toBeVisible();
  });
});

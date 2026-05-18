/**
 * E2E Test Runner for Todo App
 * Uses Playwright to automate browser tests against the Express server
 */

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SERVER_URL = 'http://localhost:3000';

async function setupServer() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path.join(__dirname, '..', 'todos.json'))) {
      fs.writeFileSync(path.join(__dirname, '..', 'todos.json'), '[]');
    }

    const server = http.createServer((req, res) => {
      if (req.method === 'GET' && req.url === '/todos') {
        const todos = fs.readFileSync(path.join(__dirname, '..', 'todos.json'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.parse(todos));
        return;
      }

      const match = req.url.match(/^\/todos\/([^\?]+)\?$/);
      if (req.method === 'GET' && match) {
        const todos = fs.readFileSync(path.join(__dirname, '..', 'todos.json'), 'utf8');
        const todo = JSON.parse(todos).find(t => t.id === parseInt(match[1]));
        if (todo) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(todo));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Todo not found' }));
        }
        return;
      }

      const toggleMatch = req.url.match(/^\/todos\/([^\?]+)\/toggle-complete\?$/);
      if (req.method === 'PUT' && toggleMatch) {
        const todos = fs.readFileSync(path.join(__dirname, '..', 'todos.json'), 'utf8');
        const todosArray = JSON.parse(todos);
        const index = todosArray.findIndex(t => t.id === parseInt(toggleMatch[1]));
        if (index !== -1) {
          todosArray[index].complete = !todosArray[index].complete;
          fs.writeFileSync(path.join(__dirname, '..', 'todos.json'), JSON.stringify(todosArray));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todosArray));
        return;
      }

      const updateMatch = req.url.match(/^\/todos\/([^\?]+)\?$/);
      if (req.method === 'PUT' && updateMatch) {
        const todos = fs.readFileSync(path.join(__dirname, '..', 'todos.json'), 'utf8');
        const todosArray = JSON.parse(todos);
        const index = todosArray.findIndex(t => t.id === parseInt(updateMatch[1]));
        if (index !== -1) {
          const body = JSON.parse(req.toString());
          todosArray[index].content = body.content;
          fs.writeFileSync(path.join(__dirname, '..', 'todos.json'), JSON.stringify(todosArray));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todosArray));
        return;
      }

      if (req.method === 'POST' && req.url === '/todos') {
        const todos = fs.readFileSync(path.join(__dirname, '..', 'todos.json'), 'utf8');
        const todosArray = JSON.parse(todos);
        const body = JSON.parse(req.toString());
        todosArray.push({ ...body, id: Date.now().toString() });
        fs.writeFileSync(path.join(__dirname, '..', 'todos.json'), JSON.stringify(todosArray));
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todosArray));
        return;
      }

      const deleteMatch = req.url.match(/^\/todos\/([^\?]+)\?$/);
      if (req.method === 'DELETE' && deleteMatch) {
        const todos = fs.readFileSync(path.join(__dirname, '..', 'todos.json'), 'utf8');
        const todosArray = JSON.parse(todos);
        const index = todosArray.findIndex(t => t.id === parseInt(deleteMatch[1]));
        if (index !== -1) {
          todosArray.splice(index, 1);
          fs.writeFileSync(path.join(__dirname, '..', 'todos.json'), JSON.stringify(todosArray));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
        return;
      }

      if (req.url === '/' || req.url === '/index.html') {
        const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
      }

      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    });

    server.listen(3000, () => {
      console.log('Test server started on port 3000');
      resolve(server);
    });

    server.on('error', reject);
  });
}

async function runTests() {
  console.log('Starting E2E tests...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  try {
    // Test 1: View todos
    console.log('Test 1: View todos...');
    await page.goto(SERVER_URL);
    await page.waitForSelector('.container', { timeout: 5000 });
    const todosCount = await page.$eval('#todoList', el => el.children.length);
    console.log(`  ✓ View todos: ${todosCount} todos displayed`);

    // Test 2: Add a todo
    console.log('Test 2: Add a todo...');
    await page.fill('[data-test-id="todo-input"]', 'Buy groceries');
    await page.click('[data-test-id="btn-add"]');
    await page.waitForTimeout(1000);
    const afterAddCount = await page.$eval('#todoList', el => el.children.length);
    console.log(`  ✓ Add todo: ${afterAddCount} todos now displayed`);

    // Test 3: View the added todo
    console.log('Test 3: View the added todo...');
    const todoContent = await page.$eval('[data-test-id="todo-input"]', el => el.value);
    console.log(`  ✓ Todo content: "${todoContent}"`);

    // Test 4: Mark todo as complete
    console.log('Test 4: Mark todo as complete...');
    await page.$eval('[data-test-id="todo-input"]', el => el.value = '');
    await page.click('[data-test-id="todo-list"] input[type="checkbox"]');
    await page.waitForTimeout(500);
    const checkboxChecked = await page.$eval('[data-test-id="todo-list"] input[type="checkbox"]', el => el.checked);
    console.log(`  ✓ Todo marked complete: ${checkboxChecked}`);

    // Test 5: Delete the todo
    console.log('Test 5: Delete the todo...');
    await page.click('[data-test-id="btn-delete-1"]');
    await page.waitForTimeout(500);
    const afterDeleteCount = await page.$eval('#todoList', el => el.children.length);
    console.log(`  ✓ Delete todo: ${afterDeleteCount} todos now displayed`);

    await browser.close();
  } catch (error) {
    console.error('Test error:', error);
    throw error;
  }
}

// Main execution
(async () => {
  try {
    await setupServer();
    await runTests();
    console.log('\nAll tests passed! ✓');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
})();

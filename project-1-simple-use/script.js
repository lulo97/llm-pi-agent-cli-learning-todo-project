// Fetch todos from server
fetch('/todos').then(response => response.json()).then(todos => {
    renderTodos(todos);
});

// Fetch single todo
function fetchSingleTodo(id) {
    return fetch(`/todos/${id}`).then(response => response.json());
}

function renderTodos(todos) {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.complete ? 'checked' : ''} data-id="${todo.id}" class="todo-checkbox">
            <span class="todo-content">${escapeHtml(todo.content)}</span>
            <button class="delete-btn" data-id="${todo.id}">Delete</button>
        `;
        list.appendChild(li);
    });

    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            fetch(`/todos/${id}`, { method: 'DELETE' });
        });
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toggle complete status
function toggleComplete(id) {
    fetch(`/todos/${id}/toggle-complete`).then(response => response.json());
}

// Add todo
document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todoInput');
    const content = input.value.trim();
    if (!content) return;

    fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    }).then(response => response.json()).then(todos => {
        renderTodos(todos);
        input.value = '';
    });
});

// Add delete event listeners
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        fetch(`/todos/${id}`, { method: 'DELETE' });
    });
});

// Add checkbox/toggle event listeners
document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const id = parseInt(checkbox.dataset.id);
        toggleComplete(id);
    });
});

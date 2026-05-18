// Fetch todos from server
fetch('/todos').then(response => response.json()).then(todos => {
    renderTodos(todos);
});

function renderTodos(todos) {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
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

document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    loadTodos();

    async function loadTodos() {
        try {
            const response = await fetch('/api/todos');
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    }

    function renderTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <div class="todo-content" onclick="toggleTodo(${todo.id})">
                    <div class="todo-checkbox">
                        ${todo.completed ? '<i class="fa-solid fa-check"></i>' : ''}
                    </div>
                    <span>${todo.text}</span>
                </div>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener('submit', async (e) => {

        const text = todoInput.value.trim();
        if (!text) return;

        try {
            const response = await fetch('api/todo', {
                method: 'POST',
                body: JSON.stringify({ text })
            });

            if (response.ok) {
                todoInput.value = '';
                loadTodos();
            } else {
                alert("Failed to add task!");
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    });

    window.toggleTodo = async (id) => {
        try {
            await fetch(`/api/todos/${id}`, { method: 'PUT' });
            loadTodos();
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    window.deleteTodo = async (id) => {
        try {
            await fetch(`/api/todos/${id}`, { method: 'DELETE' });
            loadTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
});

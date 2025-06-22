let todos = [];
let filter = 'all';

function render() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const item = document.createElement('div');
    item.className = 'todo-item' + (todo.completed ? ' completed' : '');
    item.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${index})">✖</button>
    `;
    list.appendChild(item);
  });

  document.getElementById('itemsLeft').textContent = `${todos.filter(t => !t.completed).length} items left`;

  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filters button[onclick*="${filter}"]`).classList.add('active');
}

function handleKey(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('newTodo');
    const value = input.value.trim();
    if (value) {
      todos.push({ text: value, completed: false });
      input.value = '';
      render();
    }
  }
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

function setFilter(f) {
  filter = f;
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  render();
}

function toggleTheme() {
  const theme = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  document.querySelector('.theme-toggle').textContent = theme === 'dark' ? '🌙' : '☀️';
  render();
}

// Initialize the app
render();

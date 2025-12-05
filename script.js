// Load tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('task-category');
const dueDateInput = document.getElementById('task-due-date');
const taskList = document.getElementById('task-list');
const totalCountEl = document.getElementById('total-count');
const completedCountEl = document.getElementById('completed-count');

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task counters
function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  totalCountEl.textContent = total;
  completedCountEl.textContent = completed;
}

// Render tasks dynamically
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <div class="task-info">
        <span class="task-text">${task.text}</span>
        <div class="category">${task.category}</div>
        ${task.dueDate ? `<div>Due: ${task.dueDate}</div>` : ''}
      </div>
      <div class="task-buttons">
        <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Add event listeners
    const completeBtn = li.querySelector('.complete-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    completeBtn.addEventListener('click', () => {
      toggleComplete(task.id);
    });

    deleteBtn.addEventListener('click', () => {
      deleteTask(task.id);
    });

    taskList.appendChild(li);
  });

  updateCounters();
}

// Add new task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = taskInput.value.trim();
  const category = categorySelect.value;
  const dueDate = dueDateInput.value;

  if (text === '') {
    alert('Task name cannot be empty!');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    category: category,
    dueDate: dueDate || null,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskForm.reset();
});

// Toggle complete status
function toggleComplete(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();
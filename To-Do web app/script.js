let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        dateTime: taskDateTime.value,
        completed: false
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = '';
    taskDateTime.value = '';
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text} (Due: ${task.dateTime})</span>
            <div class="task-actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})" class="delete">Delete</button>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Edit your task:', task.text);
    const newDateTime = prompt('Edit the date and time:', task.dateTime);

    if (newText !== null && newDateTime !== null) {
        task.text = newText;
        task.dateTime = newDateTime;
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    renderTasks();
}

// Initial render
renderTasks();
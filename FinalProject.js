// Fetch tasks from tasks.json and store them in local storage
fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify(data.tasks));
        }
        displayTasks();
    });

function displayTasks() {
    // First function to initially display tasks
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    taskList.innerHTML = ''; // Clear the task list

    tasks.forEach((task, index) => {
        if (task.completed === true) {
            return;
        }

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task', task.priority);
        taskDiv.setAttribute('data-tag', task.tag);
        taskDiv.innerHTML = `
            <button class="complete" data-index="${index}">Complete</button>
            <h3>${task.name}</h3>
            <p>Priority: ${task.priority}</p>
            <p>Due: ${task.due}</p>
            <p>${task.tag}</p>
        `;
        taskList.appendChild(taskDiv);
    });

    document.querySelectorAll('.complete').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            completeTask(index);
        });
    });
}

function showTasks(tag) {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    taskList.innerHTML = ''; // Clear the task list

    tasks.forEach((task, index) => {
        if (task.completed === true || (tag !== 'reset' && task.tag !== tag)) {
            return;
        }

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task', task.priority);
        taskDiv.setAttribute('data-tag', task.tag);
        taskDiv.innerHTML = `
            <button class="complete" data-index="${index}">Complete</button>
            <h3>${task.name}</h3>
            <p>Priority: ${task.priority}</p>
            <p>Due: ${task.due}</p>
            <p>${task.tag}</p>
        `;
        taskList.appendChild(taskDiv);
    });

    document.querySelectorAll('.complete').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            completeTask(index);
        });
    });
}

function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks('reset');
}

document.getElementById('reset').addEventListener('click', () => showTasks('reset'));
document.getElementById('work').addEventListener('click', () => showTasks('work'));
document.getElementById('personal').addEventListener('click', () => showTasks('personal'));
document.getElementById('school').addEventListener('click', () => showTasks('school'));
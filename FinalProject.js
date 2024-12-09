/**
 * Fetch tasks from `tasks.json` and store them in local storage if not already present,
 * then displays the tasks by calling `displayTasks`.
 */
fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify(data.tasks));
        }
        displayTasks();
    });

/**
 * Displays tasks from local storage in the task list container.
 * Filters out completed tasks and adds event listeners for completion buttons.
 */
function displayTasks() {
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

/**
 * Displays tasks filtered by a specific tag. If the tag is "reset", shows all incomplete tasks.
 * @param {string} tag - The tag to filter tasks by. Use "reset" to display all tasks.
 */
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

/**
 * Marks a task as completed by updating its `completed` status in local storage
 * and refreshes the task list display.
 * @param {number} index - The index of the task to mark as completed.
 */
function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks('reset');
}

// Add event listeners for tag-based filtering
document.getElementById('reset').addEventListener('click', () => showTasks('reset'));
document.getElementById('work').addEventListener('click', () => showTasks('work'));
document.getElementById('personal').addEventListener('click', () => showTasks('personal'));
document.getElementById('school').addEventListener('click', () => showTasks('school'));

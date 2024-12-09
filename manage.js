let showCompleted = false;

/**
 * Fetches tasks from `tasks.json` and stores them in local storage if not already present.
 * Then calls `displayTasks` to display the tasks.
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
 * Adds a new task to the list and updates local storage.
 * @param {Event} event - The event object for the form submission.
 */
function addTask(event) {
    event.preventDefault();

    const task = document.getElementById('task').value;
    const priority = document.getElementById('priority').value;
    const due = document.getElementById('due-date').value;
    const tag = document.getElementById('tag').value;

    const newTask = {
        name: task,
        priority: priority,
        due: due,
        tag: tag,
        completed: false
    };

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
}

// Add event listener to the "Add Task" button
document.getElementById('addTask').addEventListener('click', addTask);

/**
 * Displays tasks from local storage in the task list container.
 * Completed tasks are hidden by default.
 */
function displayTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    taskList.innerHTML = ''; // Clear the task list

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task', task.priority);
        taskDiv.setAttribute('data-tag', task.tag);

        if (task.completed === true) {
            taskDiv.classList.add('completed');
        }

        taskDiv.innerHTML = `
            <h3>${task.name}</h3>
            <p>Priority: ${task.priority}</p>
            <p>Due: ${task.due}</p>
            <p>${task.tag}</p>
        `;

        // Hide completed tasks
        if (task.completed === true) {
            taskDiv.style.display = 'none';
        }

        taskList.appendChild(taskDiv);
    });
}

/**
 * Toggles the visibility of completed tasks when the "Show Completed" button is clicked.
 */
document.getElementById('showCompleted').addEventListener('click', function () {
    console.log('showCompleted clicked');
    const tasks = document.querySelectorAll('.task');

    if (showCompleted) {
        tasks.forEach(task => {
            if (task.classList.contains('completed')) {
                task.style.display = 'none';
            }
        });
        showCompleted = false;
    } else {
        tasks.forEach(task => {
            task.style.display = 'flex';
        });
        showCompleted = true;
    }
});

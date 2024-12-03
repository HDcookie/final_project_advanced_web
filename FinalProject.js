

fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');

        data.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task', task.priority);
            taskDiv.setAttribute('data-tag', task.tag);
            taskDiv.innerHTML = `
                <h3>${task.name}</h3>
                <p>Priority: ${task.priority}</p>
                <p>Due: ${task.due}</p>
                <p>${task.tag}</p>
            `;
            taskList.appendChild(taskDiv);
        })
    });

function showTasks(tag) {
    // This function will hide all tasks that do not have the tag that was clicked on
    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.children);
    console.log(tag);


    tasks.forEach(task => {
        if (task.getAttribute('data-tag') === tag) {
            console.log("we will show this task, " + task.getAttribute('data-tag'));

            task.style.display = 'flex';
        } else if (tag === 'reset') {
            console.log("we will show this task, " + task.getAttribute('data-tag'));
            task.style.display = 'flex';

        }else {
            console.log("we will hide this task, " + task.getAttribute('data-tag'));
            task.style.display = 'none';
        }

    });

}

document.getElementById('reset').addEventListener('click', () => showTasks('reset'));
document.getElementById('work').addEventListener('click', () => showTasks('work'));
document.getElementById('personal').addEventListener('click', () => showTasks('personal'));
document.getElementById('school').addEventListener('click', () => showTasks('school'));
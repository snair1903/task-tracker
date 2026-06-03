// Browser based storage for semi-persistent operation. Can handle reloads during usage
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

//Adding new tasks into the List
function addTask() {
    let taskInput = document.getElementById('taskInput')
    let taskDisc = document.getElementById('taskDisc')
    let taskdate = document.getElementById('dueDate')
    let taskName = taskInput.value.trim()
    let taskD = taskDisc.value.trim()
    let dueD = taskdate.value
    if (taskName === '') {
        alert("Please Enter a Task");
        return;
    }
    if (dueD === '') {
        alert("Please Enter a duedate");
        return;
    }
    if (new Date(dueD)<new Date()) {
        alert("Past dates not allowed");
        return;
    }
    else {

        let task = { taskName, taskD,dueD, status: 'InProgress', taskid: Date.now() }
        tasks.push(task);
        console.log(tasks);
        taskInput.value = ''
        taskDisc.value = ''
        taskdate.value = ''
        localStorage.setItem('tasks', JSON.stringify(tasks))

        displayTasks()

    }


}


// Render all the tasks in the list into a tabular display
function displayTasks() {
    // diplay all tasks for debugging
    console.log(tasks)

// Pending tasks
    let tableBody2 = document.getElementById('pTableBody');
    tableBody2.innerHTML = '';
    tasks.sort((a,b)=>new Date(a.dueD) - new Date(b.dueD))
    tasks.forEach((task, index) => {
        if (task.status !== 'Complete') {
            tableBody2.innerHTML += `
        <tr >
        <td> ${task.taskName} </td>
        <td> ${task.taskD} </td>
        <td> ${task.dueD} </td>
        <td> <button class="${task.status === 'Complete' ? 'btn btn-success' : 'btn btn-warning'}" id="statusBtn" onClick="toggle(${task.taskid})"> ${task.status} </button> </td>
        <td> <button class="btn btn-danger" onClick="deleteTask(${task.taskid})"> Delete</button> </td>
        </tr>
        `;
        }
    });




// Completed tasks
    let tableBody1 = document.getElementById('cTableBody');
    tableBody1.innerHTML = '';
    tasks.forEach((task, index) => {
        if (task.status === 'Complete') {
            tableBody1.innerHTML += `
        <tr >
        <td> ${task.taskName} </td>
        <td> ${task.taskD} </td>
        <td> ${task.dueD} </td>
        <td> <button class="${task.status === 'Complete' ? 'btn btn-success' : 'btn btn-warning'}" id="statusBtn" onClick="toggle(${task.taskid})"> ${task.status} </button> </td>
        <td> <button class="btn btn-danger" onClick="deleteTask(${task.taskid})"> Delete</button> </td>
        </tr>
        `;
        }
    });
}

// Remove task from List
function deleteTask(id) {
    tasks.forEach((task, index) => {
        if (task.taskid == id) {
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
    displayTasks()
}
// Toggles status button
function toggle(id) {
    tasks.forEach((task) => {
        if (task.taskid === id) {
            task.status = task.status === 'Complete' ? 'InProgress' : "Complete"
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
    displayTasks();
}
displayTasks();
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

loadTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);

    saveTask(taskText);

    taskInput.value = "";
}

function createTaskElement(taskText) {

    const li = document.createElement("li");
    li.className = "list-group-item";

    const span = document.createElement("span");
    span.innerText = taskText;

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        updateLocalStorage();
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "task-buttons";

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "btn btn-warning btn-sm";

    editBtn.addEventListener("click", () => {

        const updatedTask = prompt("Edit Task:", span.innerText);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            span.innerText = updatedTask;
            updateLocalStorage();
        }
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn btn-danger btn-sm";

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonDiv);

    taskList.appendChild(li);
}

function saveTask(task) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        const span = li.querySelector("span");

        tasks.push({
            text: span.innerText,
            completed: span.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        createTaskElement(task.text);

        const lastTask =
            taskList.lastElementChild.querySelector("span");

        if (task.completed) {
            lastTask.classList.add("completed");
        }
    });
}
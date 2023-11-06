document.addEventListener("DOMContentLoaded", function () {
       const dueDateInput = document.getElementById("dueDateInput");
    const taskInput = document.getElementById("inputBox");

    const taskList = document.getElementById("list");
    const addButton = document.getElementById("addTask");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        
        if (taskText !== "") {
            const task = { text: taskText, completed: false, priority: false, dueDate: dueDate };
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = "";
            dueDateInput.value = "";
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function togglePriority(index) {
        tasks[index].priority = !tasks[index].priority;
        saveTasks();
        renderTasks();
    }

    function renderTasks() {
        // Sorting task priority (high priority first)
        tasks.sort((a, b) => (a.priority === b.priority) ? 0 : a.priority ? -1 : 1);
        
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""} ${task.priority ? "high-priority" : ""}">
                ${task.text}  (Due Date: ${task.dueDate}) 
                </span>

                <span> 
                    <button class="priority-button">${task.priority ? "Low Priority" : "High Priority"}</button>
                    <button class="complete-button">${task.completed ? "Uncomplete" : "Complete"}</button>
                    <button class="delete-button">    X    </button>
                </span>
            `;

            const deleteButton = li.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => deleteTask(index));

            const completeButton = li.querySelector(".complete-button");
            completeButton.addEventListener("click", () => toggleCompletion(index));

            const priorityButton = li.querySelector(".priority-button");
            priorityButton.addEventListener("click", () => togglePriority(index));

            taskList.appendChild(li);
        });
    }

    addButton.addEventListener("click" , addTask);
       //adding enter key keyboared functionality to preform the same as add task button
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    renderTasks();
});


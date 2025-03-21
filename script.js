document.addEventListener("DOMContentLoaded", function () {
    loadList();

    document.querySelector("form[name='todo-adder']").addEventListener("submit", function (event) {
        event.preventDefault();
        addToDo();
    });
});

function addToDo() {
    let itemText = document.getElementById("todo-entry-box").value.trim();
    if (itemText === "") return;
    
    let todoList = document.getElementById("todo-list");
    let newItem = document.createElement("li");
    newItem.textContent = itemText;
    newItem.addEventListener("dblclick", toggleComplete);
    todoList.appendChild(newItem);
    
    document.getElementById("todo-entry-box").value = "";
    saveList();
}

function toggleComplete(event) {
    event.target.classList.toggle("completed");
    saveList();
    let status = event.target.classList.contains("completed") ? "completed" : "active";
    alert(`Task "${event.target.textContent}" marked as ${status}.`);
}

function clearCompletedToDoItems() {
    let todoList = document.getElementById("todo-list");
    let items = todoList.getElementsByTagName("li");
    let removedCount = 0;

    for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].classList.contains("completed")) {
            todoList.removeChild(items[i]);
            removedCount++;
        }
    }

    if (removedCount > 0) {
        alert(`${removedCount} completed task(s) removed.`);
    } else {
        alert("No completed tasks to remove.");
    }

    saveList();
}

function emptyList() {
    let todoList = document.getElementById("todo-list");
    if (todoList.children.length === 0) {
        alert("Your to-do list is already empty.");
        return;
    }

    document.getElementById("todo-list").innerHTML = "";
    localStorage.removeItem("todos");
    alert("All tasks have been deleted.");
}

function saveList() {
    let items = document.querySelectorAll("#todo-list li");
    let todos = [];
    
    items.forEach(item => {
        todos.push({
            text: item.textContent,
            completed: item.classList.contains("completed")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    alert("All tasks have been saved.");
}

function loadList() {
    let todoList = document.getElementById("todo-list");
    let storedTodos = localStorage.getItem("todos");
    if (!storedTodos) return;
    
    let todos = JSON.parse(storedTodos);
    todos.forEach(todo => {
        let newItem = document.createElement("li");
        newItem.textContent = todo.text;
        if (todo.completed) newItem.classList.add("completed");
        newItem.addEventListener("dblclick", toggleComplete);
        todoList.appendChild(newItem);
    });
}

"use strict"

const taskInput = document.body.querySelector("#task-input")
const addButton = document.body.querySelector("#add-button")
const taskContainer = document.body.querySelector("#task-container")
const dateInput = document.body.querySelector("#date-input")
const timeInput = document.body.querySelector("#time-input")
const todoFiler = document.body.querySelector("#todo-filter")
const doneFiler = document.body.querySelector("#done-filter")

let todos = localStorage.getItem("todos") === null ? [] : JSON.parse(localStorage.getItem("todos"))
let done = localStorage.getItem("done") === null ? [] : JSON.parse(localStorage.getItem("done"))

const renderTask = (val) => {
    const task = document.createElement("div")
    task.className = "card"

    const taskTitleDiv = document.createElement("div")
    taskTitleDiv.className = "title pretty p-curve p-jelly p-thick"
    const check = document.createElement("input")
    check.type = "checkbox"
    taskTitleDiv.appendChild(check)

    const labelDiv = document.createElement("div")
    labelDiv.className = "state p-success"
    const label = document.createElement("label")
    label.innerHTML = val.title
    labelDiv.appendChild(label)
    taskTitleDiv.appendChild(labelDiv)

    task.appendChild(taskTitleDiv)

    const taskDesc = document.createElement("p")
    taskDesc.className = "card-text"
    taskDesc.innerHTML = val.description
    task.appendChild(taskDesc)


    taskContainer.appendChild(task)
}

const renderTasks = (array) => {
    taskContainer.replaceChildren()
    array.forEach(task => {
        renderTask(task)
    });
}

renderTasks(todos)

doneFiler.addEventListener("click", e => {
    e.preventDefault()
    doneFiler.classList.add("active")
    todoFiler.classList.remove("active")

    renderTasks(done)

})

todoFiler.addEventListener("click", e => {
    e.preventDefault()
    todoFiler.classList.add("active")
    doneFiler.classList.remove("active")

    renderTasks(todos)
})

const markAsDone = (task) => {
    todos = todos.filter(t => t.title !== task.title)
    done.push(task)
    localStorage.setItem("done", JSON.stringify(done))
    localStorage.setItem("todos", JSON.stringify(todos))
}

taskContainer.addEventListener("click", e => {
    const isCheckbox = e.target.type == "checkbox"
    const getTaskName = () => { return e.target.parentElement.childNodes[1].childNodes[0].innerHTML }
    if (isCheckbox) {
        const taskSelected = todos.find(t => t.title === getTaskName())
        markAsDone(taskSelected)
    }
})

const getDate = () => {
    date = new Date()
    const d = [
        date.getMonth() + 1,
        date.getDate(),
        date.getFullYear(),
    ];

    return d
}

addButton.addEventListener("click", e => {
    if (taskInput.value !== "") {
        let timeDate = ""

        if (timeInput.value !== "") {
            timeDate = `Due: ${timeInput.value}`
            timeDate += dateInput.value ? ` ${dateInput.value}` : ` ${getDate()[2]}-${getDate()[1]}-${getDate()[0]}`
        }

        const task = createTask(taskInput.value, timeDate ? timeDate : "")
        addTask(task)
        renderTask(task)
    }

    taskInput.value = ""
    timeInput.value = ""
    dateInput.value = ""
})

const createTask = (titleVal, descriptionVal) => {
    return { title: titleVal, description: descriptionVal }
}

const addTask = (task) => {
    todos.push(task)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function notifyMe() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification("Hi there!");
        // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Hi there!");
                // …
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
}

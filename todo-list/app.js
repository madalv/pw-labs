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

    const delBtn = document.createElement("button")
    delBtn.className = "btn btn-outline-danger"
    delBtn.type = "button"
    delBtn.innerHTML = "Delete"
    delBtn.id = "delete-button"
    task.appendChild(delBtn)

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
    const isDeleteBtn = e.target.id == "delete-button"

    if (isCheckbox) {
        const name = e.target.parentElement.childNodes[1].childNodes[0].innerHTML
        const taskSelected = todos.find(t => t.title === name)
        markAsDone(taskSelected)
    }

    if (isDeleteBtn) {
        e.preventDefault()
        const name = e.target.parentElement.childNodes[0].childNodes[1].childNodes[0].innerHTML
        deleteTask(name)
    }
})

const getDate = () => {
    const date = new Date()
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
        let title = taskInput.value

        if (timeInput.value !== "") {

            setNotification(dateInput.value, timeInput.value, title)

            timeDate = `Due: ${timeInput.value}`
            timeDate += dateInput.value ? ` ${dateInput.value}` : ` ${getDate()[2]}-${getDate()[1]}-${getDate()[0]}`
        }

        const task = createTask(title, timeDate ? timeDate : "")
        addTask(task)
        renderTask(task)
    }

    taskInput.value = ""
    timeInput.value = ""
    dateInput.value = ""
})

const setNotification = (dateInput, timeInput, title) => {
    const now = new Date()
    let data = dateInput.split("-")
    let time = timeInput.split(":")

    const then = new Date(data[0], data[1] - 1, data[2], time[0], time[1], 0, 0)

    setTimeout(() => {
        const n = new Notification(`${title} is due!`)
    }, then - now)
}

const createTask = (titleVal, descriptionVal) => {
    return { title: titleVal, description: descriptionVal }
}

const addTask = (task) => {
    todos.push(task)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const deleteTask = (taskName) => {
    if (todos.find(task => task.title === taskName)) {
        _.remove(todos, task => task.title === taskName)
        localStorage.setItem("todos", JSON.stringify(todos))
        renderTasks(todos)
    } else {
        _.remove(done, task => task.title === taskName)
        localStorage.setItem("done", JSON.stringify(done))
        renderTasks(done)
    }
}

